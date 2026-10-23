import { GoogleGenAI } from '@google/genai';
import { nodeFetchDeps } from './_lib/nodeFetch.js';
import {
  WebsiteCheckError, fetchPublicPage, normalizeWebsiteUrl, pageLabel, siteDomain,
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
import { errorBody, receivedBody, resultsBody } from '../src/lib/websiteCheck/response.js';

// The free Website Check on /website-check. Checks the visitor's homepage
// (PageSpeed Insights plus our own HTML checks), has Gemini explain the result
// in plain language, sends the full report to Make for the follow-up email,
// and returns a short summary for the page. See src/lib/websiteCheck/.
//
// Time budget, inside the 60 s maxDuration in vercel.json: the HTML fetch
// (10 s) runs alongside both PageSpeed tests (45 s, in parallel), then Gemini
// (8 s) and Make (5 s). Responses follow src/lib/websiteCheck/response.ts.
// Bad input, a blocked URL, or a page that neither we nor Google could load
// is an error; any other failed step returns status 'partial' with the
// results we do have and an `unavailable` list.

const DAY_MS = 24 * 60 * 60 * 1000;
const GEMINI_TIMEOUT_MS = 8_000;
const MAKE_TIMEOUT_MS = 5_000;

const rateLimiter = createRateLimiter(3, 60 * 60 * 1000);
// Keyed by page (domain + path). Measurements are shared by both languages;
// the AI text is per language.
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

// Errors where we must not show anything for the URL (SSRF guard, redirect loops).
const FATAL_HTML_ERRORS = new Set(['invalid_url', 'blocked_url', 'too_many_redirects']);

/** Measures the page. Throws only if the URL is blocked or nothing at all could be measured. */
async function measure(url: URL): Promise<Measurement> {
  const key = process.env.PAGESPEED_API_KEY;
  // PageSpeed starts right away (Google fetches the page itself and follows
  // its redirects) so the slow part overlaps our own HTML fetch. If our fetch
  // is blocked for safety, the PageSpeed requests are cancelled.
  const cancelPageSpeed = new AbortController();
  const pagespeed = Promise.all([
    runPageSpeed(url.href, 'mobile', key, { signal: cancelPageSpeed.signal }),
    runPageSpeed(url.href, 'desktop', key, { signal: cancelPageSpeed.signal }),
  ]);
  let page: Awaited<ReturnType<typeof fetchPublicPage>> | null = null;
  let htmlError: WebsiteCheckError | null = null;
  try {
    page = await fetchPublicPage(url, nodeFetchDeps);
  } catch (error) {
    htmlError = error instanceof WebsiteCheckError ? error : new WebsiteCheckError('unreachable');
    const upstream = htmlError.upstreamStatus ? ` upstream=${htmlError.upstreamStatus}` : '';
    logFailure('html-fetch', htmlError.upstreamStatus, htmlError.code + upstream);
    if (FATAL_HTML_ERRORS.has(htmlError.code)) {
      cancelPageSpeed.abort();
      await pagespeed;
      throw htmlError;
    }
  }
  const [mobile, desktop] = await pagespeed;
  for (const [strategy, run] of [['mobile', mobile], ['desktop', desktop]] as [string, PageSpeedRun][]) {
    if (run.error) logFailure('pagespeed', run.error.status, `${strategy}:${run.error.code}`);
  }
  // Nothing measured at all: report why our own fetch failed.
  if (!page && !mobile.result && !desktop.result) throw htmlError;

  const finalUrl = page ? page.finalUrl : url;
  return {
    domain: siteDomain(finalUrl),
    page: pageLabel(finalUrl),
    finalUrl: finalUrl.href,
    checkedAt: new Date().toISOString(),
    htmlTruncated: page ? page.truncated : false,
    checks: page ? checkHtml(page.html, page.finalUrl) : null,
    htmlError: htmlError ? htmlError.code : null,
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

/** True if Make accepted the report. Never fatal: the visitor still gets their results. */
async function sendToMake(lead: Lead, report: ReturnType<typeof buildReport>, cached: boolean): Promise<boolean> {
  const webhook = process.env.MAKE_WEBSITE_CHECK_WEBHOOK;
  if (!webhook) {
    logFailure('make', null, 'webhook_not_set');
    return false;
  }
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(makePayload(lead, report, { now: new Date(), cached })),
      signal: AbortSignal.timeout(MAKE_TIMEOUT_MS),
    });
    if (!response.ok) logFailure('make', response.status, 'http_error');
    return response.ok;
  } catch (error) {
    logFailure('make', null, errorCode(error));
    return false;
  }
}

async function handle(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json(errorBody('method_not_allowed'));
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const parsed = parseWebsiteCheckRequest(body);
  // Bots that filled the honeypot get an ordinary-looking answer and nothing is checked or sent.
  if (parsed.kind === 'spam') {
    logFailure('validate', 200, 'honeypot');
    return res.status(200).json(receivedBody());
  }
  if (parsed.kind === 'invalid') {
    logFailure('validate', 400, `invalid_fields:${parsed.errors.join(',')}`);
    return res.status(400).json(errorBody('invalid', { fields: parsed.errors }));
  }

  let url: URL;
  try {
    url = normalizeWebsiteUrl(parsed.websiteUrl);
  } catch (error) {
    const code = error instanceof WebsiteCheckError ? error.code : 'invalid_url';
    logFailure('validate', 400, code);
    return res.status(400).json(errorBody(code));
  }

  const ip = clientIp(req.headers ?? {});
  if (!(await verifyTurnstile(parsed.turnstileToken, ip, process.env.TURNSTILE_SECRET_KEY))) {
    logFailure('validate', 403, 'bot_check_failed');
    return res.status(403).json(errorBody('bot_check_failed'));
  }

  const limit = rateLimiter.take(ip);
  if (!limit.ok) {
    logFailure('validate', 429, 'rate_limited');
    res.setHeader('Retry-After', String(limit.retryAfterSec));
    return res.status(429).json(errorBody('rate_limited', { retry_after_sec: limit.retryAfterSec }));
  }

  const cacheKey = pageLabel(url);
  let measurement = measurements.get(cacheKey);
  const cached = Boolean(measurement);
  if (!measurement) {
    try {
      measurement = await measure(url);
    } catch (error) {
      // Already logged in measure(): blocked, or neither we nor Google could load the page.
      const code = error instanceof WebsiteCheckError ? error.code : 'unreachable';
      return res.status(422).json(errorBody(code));
    }
    // Only complete results are kept, so one bad moment isn't cached for a day.
    if (measurement.checks && measurement.pagespeed.mobile && measurement.pagespeed.desktop) {
      measurements.set(cacheKey, measurement);
    }
  }

  const aiKey = `${cacheKey}:${parsed.language}`;
  let ai = aiTexts.get(aiKey) ?? null;
  if (!ai) {
    ai = await explain(measurement, parsed.language);
    if (ai) aiTexts.set(aiKey, ai);
  }
  const report = buildReport(measurement, parsed.language, ai);
  const emailed = await sendToMake(parsed.lead, report, cached);

  return res.status(200).json(resultsBody(report, pageSummary(report), emailed));
}

export default async function handler(req: any, res: any) {
  try {
    return await handle(req, res);
  } catch (error) {
    logFailure('internal', 500, (error as Error)?.name || 'unknown');
    if (!res.headersSent) return res.status(500).json(errorBody('internal'));
  }
}
