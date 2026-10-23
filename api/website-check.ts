import { GoogleGenAI } from '@google/genai';
import { nodeFetchDeps } from './_lib/nodeFetch.js';
import {
  WebsiteCheckError, fetchPublicPage, normalizeWebsiteUrl, siteDomain,
} from '../src/lib/websiteCheck/url.js';
import { checkHtml } from '../src/lib/websiteCheck/htmlChecks.js';
import { runPageSpeed, type PageSpeedRun } from '../src/lib/websiteCheck/pagespeed.js';
import {
  aiInput, aiPrompt, buildReport, parseAiOutput, scoreMeasurement, type Measurement,
} from '../src/lib/websiteCheck/report.js';
import type { Fix, ReportLang } from '../src/lib/websiteCheck/reportCopy.js';
import {
  makePayload, pageSummary, parseWebsiteCheckRequest, type Lead,
} from '../src/lib/websiteCheck/lead.js';
import {
  clientIp, createRateLimiter, createTtlCache, verifyTurnstile,
} from '../src/lib/websiteCheck/limits.js';

// The free Website Check on /website-check. Checks the visitor's homepage
// (PageSpeed Insights plus our own HTML checks), has Gemini explain the result
// in plain language, sends the full report to Make for the follow-up email,
// and returns a short summary for the page. See src/lib/websiteCheck/.
//
// Time budget, inside the 60 s maxDuration in vercel.json: the HTML fetch
// (10 s) runs alongside both PageSpeed tests (45 s, in parallel), then Gemini
// (8 s) and Make (5 s). Only a failed HTML fetch or bad input is an error for
// the visitor; PageSpeed, Gemini and Make failures still return results.

const DAY_MS = 24 * 60 * 60 * 1000;
const GEMINI_TIMEOUT_MS = 8_000;
const MAKE_TIMEOUT_MS = 5_000;

const rateLimiter = createRateLimiter(3, 60 * 60 * 1000);
// Measurements are shared by both languages; the AI text is per language.
const measurements = createTtlCache<Measurement>(DAY_MS);
const aiTexts = createTtlCache<{ summary: string; fixes: Fix[] }>(DAY_MS);

type Stage = 'validate' | 'pagespeed' | 'html-fetch' | 'gemini' | 'make' | 'internal';

/**
 * One line per failed stage, for Vercel's logs. Status and error code only:
 * never the URL, the visitor's details, or a key.
 */
function logFailure(stage: Stage, status: number | null, code: string) {
  console.error(`website-check stage=${stage} status=${status ?? '-'} code=${code}`);
}

const errorCode = (error: unknown) =>
  (error as Error)?.name === 'TimeoutError' || (error as Error)?.name === 'AbortError' ? 'timeout' : 'request_failed';

async function measure(url: URL): Promise<Measurement> {
  const key = process.env.PAGESPEED_API_KEY;
  // PageSpeed starts right away (Google fetches the site itself and follows
  // its redirects) so the slow part overlaps our own HTML fetch. If the HTML
  // fetch fails, the PageSpeed requests are cancelled.
  const cancelPageSpeed = new AbortController();
  const pagespeed = Promise.all([
    runPageSpeed(url.href, 'mobile', key, { signal: cancelPageSpeed.signal }),
    runPageSpeed(url.href, 'desktop', key, { signal: cancelPageSpeed.signal }),
  ]);
  let page;
  try {
    page = await fetchPublicPage(url, nodeFetchDeps);
  } catch (error) {
    cancelPageSpeed.abort();
    await pagespeed;
    throw error;
  }
  const [mobile, desktop] = await pagespeed;
  for (const [strategy, run] of [['mobile', mobile], ['desktop', desktop]] as [string, PageSpeedRun][]) {
    if (run.error) logFailure('pagespeed', run.error.status, `${strategy}:${run.error.code}`);
  }
  return {
    domain: siteDomain(page.finalUrl),
    finalUrl: page.finalUrl.href,
    checkedAt: new Date().toISOString(),
    htmlTruncated: page.truncated,
    checks: checkHtml(page.html, page.finalUrl),
    pagespeed: { mobile: mobile.result, desktop: desktop.result },
  };
}

async function explain(m: Measurement, lang: ReportLang) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    logFailure('gemini', null, 'no_api_key');
    return null;
  }
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
        abortSignal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      },
    });
    const parsed = parseAiOutput(response.text, input);
    // The rule-based summary and fixes are used instead.
    if (!parsed) logFailure('gemini', 200, 'invalid_output');
    return parsed;
  } catch (error) {
    const status = typeof (error as { status?: unknown }).status === 'number' ? (error as { status: number }).status : null;
    logFailure('gemini', status, errorCode(error));
    return null;
  }
}

async function sendToMake(lead: Lead, report: ReturnType<typeof buildReport>, cached: boolean) {
  const webhook = process.env.MAKE_WEBSITE_CHECK_WEBHOOK;
  // Not fatal: the visitor still gets their results on the page.
  if (!webhook) return logFailure('make', null, 'webhook_not_set');
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(makePayload(lead, report, { now: new Date(), cached })),
      signal: AbortSignal.timeout(MAKE_TIMEOUT_MS),
    });
    if (!response.ok) logFailure('make', response.status, 'http_error');
  } catch (error) {
    logFailure('make', null, errorCode(error));
  }
}

async function handle(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const parsed = parseWebsiteCheckRequest(body);
  // Bots that filled the honeypot get an ordinary-looking answer and nothing is checked or sent.
  if (parsed.kind === 'spam') {
    logFailure('validate', 200, 'honeypot');
    return res.status(200).json({ ok: true, report: null });
  }
  if (parsed.kind === 'invalid') {
    logFailure('validate', 400, `invalid_fields:${parsed.errors.join(',')}`);
    return res.status(400).json({ error: 'invalid', fields: parsed.errors });
  }

  let url: URL;
  try {
    url = normalizeWebsiteUrl(parsed.websiteUrl);
  } catch (error) {
    const code = error instanceof WebsiteCheckError ? error.code : 'invalid_url';
    logFailure('validate', 400, code);
    return res.status(400).json({ error: code });
  }

  const ip = clientIp(req.headers ?? {});
  if (!(await verifyTurnstile(parsed.turnstileToken, ip, process.env.TURNSTILE_SECRET_KEY))) {
    logFailure('validate', 403, 'bot_check_failed');
    return res.status(403).json({ error: 'bot_check_failed' });
  }

  const limit = rateLimiter.take(ip);
  if (!limit.ok) {
    logFailure('validate', 429, 'rate_limited');
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
      const upstream = error instanceof WebsiteCheckError && error.upstreamStatus ? ` upstream=${error.upstreamStatus}` : '';
      logFailure('html-fetch', 422, code + upstream);
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
  await sendToMake(parsed.lead, report, cached);

  return res.status(200).json({ ok: true, report: pageSummary(report) });
}

export default async function handler(req: any, res: any) {
  try {
    return await handle(req, res);
  } catch (error) {
    logFailure('internal', 500, (error as Error)?.name || 'unknown');
    if (!res.headersSent) return res.status(500).json({ error: 'internal' });
  }
}
