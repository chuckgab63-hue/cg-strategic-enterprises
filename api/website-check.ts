import { GoogleGenAI } from '@google/genai';
import { nodeFetchDeps } from './_lib/nodeFetch.js';
import {
  WebsiteCheckError, fetchPublicPage, normalizeWebsiteUrl, siteDomain,
} from '../src/lib/websiteCheck/url.js';
import { checkHtml } from '../src/lib/websiteCheck/htmlChecks.js';
import { runPageSpeed } from '../src/lib/websiteCheck/pagespeed.js';
import {
  aiInput, aiPrompt, buildReport, parseAiOutput, scoreMeasurement, type Measurement,
} from '../src/lib/websiteCheck/report.js';
import type { Fix, ReportLang } from '../src/lib/websiteCheck/reportCopy.js';
import {
  makePayload, pageSummary, parseWebsiteCheckRequest,
} from '../src/lib/websiteCheck/lead.js';
import {
  clientIp, createRateLimiter, createTtlCache, verifyTurnstile,
} from '../src/lib/websiteCheck/limits.js';

// The free Website Check on /website-check. Checks the visitor's homepage
// (PageSpeed Insights plus our own HTML checks), has Gemini explain the result
// in plain language, sends the full report to Make for the follow-up email,
// and returns a short summary for the page. See src/lib/websiteCheck/.

const DAY_MS = 24 * 60 * 60 * 1000;
const rateLimiter = createRateLimiter(3, 60 * 60 * 1000);
// Measurements are shared by both languages; the AI text is per language.
const measurements = createTtlCache<Measurement>(DAY_MS);
const aiTexts = createTtlCache<{ summary: string; fixes: Fix[] }>(DAY_MS);

async function measure(url: URL): Promise<Measurement> {
  // Our own HTML fetch first (10 s at most): if the site is unreachable or
  // redirects somewhere private, we stop before spending PageSpeed quota.
  // Google then tests the address the redirects ended on.
  const page = await fetchPublicPage(url, nodeFetchDeps);
  const [mobile, desktop] = await Promise.all([
    runPageSpeed(page.finalUrl.href, 'mobile', process.env.PAGESPEED_API_KEY),
    runPageSpeed(page.finalUrl.href, 'desktop', process.env.PAGESPEED_API_KEY),
  ]);
  return {
    domain: siteDomain(page.finalUrl),
    finalUrl: page.finalUrl.href,
    checkedAt: new Date().toISOString(),
    htmlTruncated: page.truncated,
    checks: checkHtml(page.html, page.finalUrl),
    pagespeed: { mobile, desktop },
  };
}

async function explain(m: Measurement, lang: ReportLang) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const input = aiInput(m, scoreMeasurement(m));
  const prompt = aiPrompt(input, lang);
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts: [{ text: prompt.user }] }],
      config: {
        systemInstruction: prompt.system,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });
    const parsed = parseAiOutput(response.text, input);
    if (!parsed) console.error('Website check: Gemini output failed validation, using rule-based fixes');
    return parsed;
  } catch (error) {
    console.error('Website check: Gemini failed:', (error as Error).message);
    return null;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const parsed = parseWebsiteCheckRequest(body);
  // Bots that filled the honeypot get an ordinary-looking answer and nothing is checked or sent.
  if (parsed.kind === 'spam') return res.status(200).json({ ok: true, report: null });
  if (parsed.kind === 'invalid') return res.status(400).json({ error: 'invalid', fields: parsed.errors });

  let url: URL;
  try {
    url = normalizeWebsiteUrl(parsed.websiteUrl);
  } catch (error) {
    const code = error instanceof WebsiteCheckError ? error.code : 'invalid_url';
    return res.status(400).json({ error: code });
  }

  const ip = clientIp(req.headers ?? {});
  if (!(await verifyTurnstile(parsed.turnstileToken, ip, process.env.TURNSTILE_SECRET_KEY))) {
    return res.status(403).json({ error: 'bot_check_failed' });
  }

  const limit = rateLimiter.take(ip);
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfterSec));
    return res.status(429).json({ error: 'rate_limited', retry_after_sec: limit.retryAfterSec });
  }

  const domain = siteDomain(url);
  let measurement = measurements.get(domain);
  const cached = Boolean(measurement);
  if (!measurement) {
    try {
      measurement = await measure(url);
    } catch (error) {
      const code = error instanceof WebsiteCheckError ? error.code : 'unreachable';
      // The domain only, never the visitor's details.
      console.error(`Website check failed for ${domain}: ${code}`);
      return res.status(422).json({ error: code });
    }
    // Don't keep a result for a day because PageSpeed happened to be down.
    if (measurement.pagespeed.mobile && measurement.pagespeed.desktop) measurements.set(domain, measurement);
  }

  const aiKey = `${domain}:${parsed.language}`;
  let ai = aiTexts.get(aiKey) ?? null;
  if (!ai) {
    ai = await explain(measurement, parsed.language);
    if (ai) aiTexts.set(aiKey, ai);
  }
  const report = buildReport(measurement, parsed.language, ai);

  const webhook = process.env.MAKE_WEBSITE_CHECK_WEBHOOK;
  if (!webhook) {
    console.log(`Website check: MAKE_WEBSITE_CHECK_WEBHOOK not set, report for ${report.domain} not sent`);
  } else {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(makePayload(parsed.lead, report, { now: new Date(), cached })),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    } catch (error) {
      // The visitor still gets their results on the page.
      console.error(`Website check webhook failed for ${report.domain}:`, (error as Error).message);
    }
  }

  return res.status(200).json({ ok: true, report: pageSummary(report) });
}
