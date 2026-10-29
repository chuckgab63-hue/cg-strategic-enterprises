import { describe, it, expect } from 'vitest';
import { checkHtml } from './htmlChecks';
import { parsePageSpeed, runPageSpeed } from './pagespeed';
import { aiInput, buildReport, parseAiOutput, scoreMeasurement, type Measurement } from './report';
import {
  WEBSITE_CHECK_HONEYPOT, contactIntakePayload, pageSummary, parseWebsiteCheckRequest, reportMessage, type Lead,
} from './lead';
import { createRateLimiter, createTtlCache, clientIp, verifyTurnstile } from './limits';

const psiJson = {
  loadingExperience: {
    metrics: {
      LARGEST_CONTENTFUL_PAINT_MS: { percentile: 3200 },
      CUMULATIVE_LAYOUT_SHIFT_SCORE: { percentile: 12 },
      INTERACTION_TO_NEXT_PAINT: { percentile: 240 },
    },
  },
  lighthouseResult: {
    categories: { performance: { score: 0.48 } },
    audits: {
      'largest-contentful-paint': { score: 0.2, numericValue: 5100.4 },
      'cumulative-layout-shift': { score: 0.9, numericValue: 0.0512 },
      'render-blocking-resources': { score: 0.3, title: 'Eliminate render-blocking resources', details: { overallSavingsMs: 900 } },
      'uses-optimized-images': { score: 0.5, title: 'Efficiently encode images', details: { overallSavingsMs: 1500 } },
      'unused-javascript': { score: 0.4, title: 'Reduce unused JavaScript', details: { overallSavingsMs: 300 } },
      'font-display': { score: 0.5, title: 'Font display', metricSavings: { FCP: 20 } },
      'is-on-https': { score: 1, title: 'Uses HTTPS' },
    },
  },
};

describe('parsePageSpeed', () => {
  it('prefers field data and lists the biggest savings first', () => {
    const r = parsePageSpeed(psiJson, 'mobile');
    expect(r).toEqual({
      strategy: 'mobile',
      performance: 48,
      lcpMs: 3200,
      cls: 0.12,
      inpMs: 240,
      metricsSource: 'field',
      opportunities: [
        { id: 'uses-optimized-images', title: 'Efficiently encode images', savingsMs: 1500 },
        { id: 'render-blocking-resources', title: 'Eliminate render-blocking resources', savingsMs: 900 },
        { id: 'unused-javascript', title: 'Reduce unused JavaScript', savingsMs: 300 },
      ],
    });
  });

  it('falls back to lab numbers without field data, and copes with an empty response', () => {
    const lab = parsePageSpeed({ lighthouseResult: psiJson.lighthouseResult }, 'desktop');
    expect(lab).toMatchObject({ lcpMs: 5100, cls: 0.051, inpMs: null, metricsSource: 'lab' });
    expect(parsePageSpeed({}, 'mobile')).toMatchObject({ performance: null, lcpMs: null, opportunities: [] });
  });
});

describe('runPageSpeed', () => {
  const respond = (status: number, body: unknown) => (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

  it('returns the parsed result on success', async () => {
    const run = await runPageSpeed('https://example.com/', 'mobile', 'k', { fetchImpl: respond(200, psiJson) });
    expect(run.error).toBeNull();
    expect(run.result?.performance).toBe(48);
  });

  it('reports Google’s status and error code instead of throwing', async () => {
    const quota = { error: { code: 429, status: 'RESOURCE_EXHAUSTED', errors: [{ reason: 'rateLimitExceeded' }] } };
    expect(await runPageSpeed('https://example.com/', 'mobile', 'k', { fetchImpl: respond(429, quota) }))
      .toEqual({ result: null, error: { status: 429, code: 'RESOURCE_EXHAUSTED' } });
    expect(await runPageSpeed('https://example.com/', 'desktop', undefined, { fetchImpl: respond(500, 'oops') }))
      .toEqual({ result: null, error: { status: 500, code: 'http_error' } });
  });

  it('times out, and can be cancelled', async () => {
    const hang = ((_url: string, init: RequestInit) => new Promise((_, reject) => {
      init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
    })) as unknown as typeof fetch;
    expect(await runPageSpeed('https://example.com/', 'mobile', 'k', { fetchImpl: hang, timeoutMs: 20 }))
      .toEqual({ result: null, error: { status: null, code: 'timeout' } });
    const cancel = new AbortController();
    const run = runPageSpeed('https://example.com/', 'mobile', 'k', { fetchImpl: hang, signal: cancel.signal });
    cancel.abort();
    expect((await run).error).toEqual({ status: null, code: 'cancelled' });
  });
});

const html = `<html><head><title>Bob's Plumbing</title><meta name="viewport" content="width=device-width"></head>
  <body><h1>Bob's Plumbing</h1><a href="tel:9045550100">Call</a><form><input type="email"></form>
  <p>${'Plumbing repairs across Duval County. '.repeat(10)}</p></body></html>`;

const measurement: Measurement = {
  domain: 'bobsplumbing.com',
  page: 'bobsplumbing.com',
  htmlError: null,
  finalUrl: 'https://www.bobsplumbing.com/',
  checkedAt: '2026-10-23T14:00:00.000Z',
  htmlTruncated: false,
  checks: checkHtml(html, new URL('https://www.bobsplumbing.com/')),
  pagespeed: {
    mobile: parsePageSpeed(psiJson, 'mobile'),
    desktop: parsePageSpeed({ lighthouseResult: { ...psiJson.lighthouseResult, categories: { performance: { score: 0.81 } } } }, 'desktop'),
  },
};
const input = aiInput(measurement, scoreMeasurement(measurement));

const goodAi = {
  summary: 'Your mobile speed scored 48 and your desktop speed 81. Visitors can call or use your form, but nothing answers after hours.',
  fixes: [
    { title: 'Compress your images', detail: 'Google estimates about 1.5 seconds could be saved on mobile.' },
    { title: 'Add a chat assistant', detail: 'It can answer questions 24/7 and take details.' },
    { title: 'Write a meta description', detail: 'Add 1-2 sentences about your services.' },
  ],
};

describe('parseAiOutput', () => {
  it('accepts three fixes that only use measured numbers', () => {
    expect(parseAiOutput(JSON.stringify(goodAi), input)).toEqual(goodAi);
    expect(parseAiOutput('```json\n' + JSON.stringify(goodAi) + '\n```', input)).toEqual(goodAi);
  });

  it('rejects made-up numbers', () => {
    const invented = { ...goodAi, summary: 'Fixing this could bring you 40% more leads.' };
    expect(parseAiOutput(JSON.stringify(invented), input)).toBeNull();
    const ranking = { ...goodAi, fixes: [...goodAi.fixes.slice(0, 2), { title: 'Rank higher', detail: 'Get to position 15 on Google.' }] };
    expect(parseAiOutput(JSON.stringify(ranking), input)).toBeNull();
  });

  it('rejects the wrong shape, missing text and non-JSON', () => {
    expect(parseAiOutput(JSON.stringify({ ...goodAi, fixes: goodAi.fixes.slice(0, 2) }), input)).toBeNull();
    expect(parseAiOutput(JSON.stringify({ ...goodAi, summary: '' }), input)).toBeNull();
    expect(parseAiOutput('Here are your results!', input)).toBeNull();
    expect(parseAiOutput(undefined, input)).toBeNull();
  });
});

describe('buildReport', () => {
  it('uses rule-based fixes and summary in the visitor’s language without Gemini', () => {
    const en = buildReport(measurement, 'en', null);
    expect(en.ai.generatedBy).toBe('rules');
    expect(en.ai.fixes).toHaveLength(3);
    expect(en.ai.fixes[0].title).toBe('Answer visitors when you can’t');
    expect(en.ai.summary).toContain(`scored ${en.scores.overall} out of 100`);
    const es = buildReport(measurement, 'es', null);
    expect(es.ai.fixes[0].title).toBe('Atienda a los visitantes cuando usted no puede');
    expect(es.risk?.reasonText[0]).toMatch(/^No hay reservas/);
  });

  it('keeps the scores deterministic whatever the AI says', () => {
    const report = buildReport(measurement, 'en', goodAi);
    expect(report.scores).toEqual({ overall: report.scores.overall, speed: 81, mobile: 48, searchBasics: 60, missedCallRisk: 'medium' });
    expect(report.ai).toEqual({ ...goodAi, generatedBy: 'gemini' });
    expect(report.status).toBe('complete');
    expect(report.unavailable).toEqual([]);
  });

  it('is partial, not an error, when PageSpeed is down', () => {
    const report = buildReport({ ...measurement, pagespeed: { mobile: null, desktop: null } }, 'en', null);
    expect(report.status).toBe('partial');
    expect(report.unavailable).toEqual(['pagespeed_mobile', 'pagespeed_desktop', 'ai_summary']);
    expect(report.scores).toMatchObject({ speed: null, mobile: null, searchBasics: 60, missedCallRisk: 'medium' });
    expect(report.scores.overall).toBe(Math.round((60 * 25 + 55 * 25) / 50));
    expect(report.ai.summary).toContain('Google couldn’t measure the speed this time.');
  });

  it('is partial with speed scores only when the page HTML couldn’t be read', () => {
    const report = buildReport({ ...measurement, checks: null, htmlError: 'unreachable' }, 'es', null);
    expect(report.status).toBe('partial');
    expect(report.unavailable).toEqual(['html_checks', 'ai_summary']);
    expect(report.scores).toEqual({ overall: Math.round((48 * 30 + 81 * 20) / 50), speed: 81, mobile: 48, searchBasics: null, missedCallRisk: null });
    expect(report.risk).toBeNull();
    expect(report.search).toBeNull();
    // Mobile 48 is under 50, so the speed fix is the one rule-based fix left.
    expect(report.ai.fixes.map(f => f.title)).toEqual(['Acelere el sitio en celulares']);
    expect(report.ai.summary).toMatch(/No pudimos leer la página/);
    const summary = pageSummary(report);
    expect(summary).toMatchObject({ search_missed: null, risk_reasons: [], risk_missed: null, content_limited: false });
    // The emailed report says what's missing instead of a score.
    const message = reportMessage(report);
    expect(message).toContain('Básicos de búsqueda: no disponible esta vez');
    expect(message).toContain('Riesgo de llamadas perdidas: no disponible esta vez');
    expect(message).toContain('Algunas partes no se pudieron revisar esta vez');
  });
});

const validBody = {
  website_url: 'bobsplumbing.com',
  first_name: ' Bob ',
  email: 'bob@bobsplumbing.com',
  business_name: "Bob's Plumbing",
  phone: '(904) 555-0100',
  language: 'es',
  sms_consent: true,
  sms_consent_text: 'Acepto recibir mensajes de texto…',
  sms_marketing_consent: false,
  email_marketing_consent: true,
  turnstile_token: 'tok',
};

describe('parseWebsiteCheckRequest', () => {
  it('accepts a valid request', () => {
    const parsed = parseWebsiteCheckRequest(validBody);
    expect(parsed.kind).toBe('ok');
    if (parsed.kind !== 'ok') return;
    expect(parsed.lead.firstName).toBe('Bob');
    expect(parsed.language).toBe('es');
    expect(parsed.websiteUrl).toBe('bobsplumbing.com');
  });

  it('treats a filled honeypot as spam', () => {
    expect(parseWebsiteCheckRequest({ ...validBody, [WEBSITE_CHECK_HONEYPOT]: 'http://spam.example' }).kind).toBe('spam');
  });

  it('lists every missing field, and needs a phone for text consent', () => {
    expect(parseWebsiteCheckRequest({ sms_marketing_consent: true, email: 'nope' })).toEqual({
      kind: 'invalid', language: 'en',
      errors: ['website_required', 'first_name_required', 'email_invalid', 'phone_required'],
    });
  });

  it('only counts real booleans as consent', () => {
    const parsed = parseWebsiteCheckRequest({ ...validBody, phone: '', sms_consent: 'true', email_marketing_consent: 'yes' });
    expect(parsed.kind === 'ok' && [parsed.lead.smsConsent, parsed.lead.emailMarketingConsent]).toEqual([false, false]);
  });
});

describe('contactIntakePayload', () => {
  it('sends the lead and consent with the contact form\'s field names, and the report as text', () => {
    const parsed = parseWebsiteCheckRequest(validBody);
    const lead = (parsed as { lead: Lead }).lead;
    const report = buildReport(measurement, 'es', goodAi);
    const payload = contactIntakePayload(lead, report, { now: new Date('2026-10-23T14:05:00.000Z') });
    expect(payload).toMatchObject({
      source: 'website-check',
      language: 'es',
      first_name: 'Bob',
      last_name: '',
      name: 'Bob',
      email: 'bob@bobsplumbing.com',
      business_name: "Bob's Plumbing",
      phone: '(904) 555-0100',
      sms_consent: true,
      sms_consent_timestamp: '2026-10-23T14:05:00.000Z',
      sms_marketing_consent: false,
      email_marketing_consent: true,
      marketing_consent_timestamp: '2026-10-23T14:05:00.000Z',
    });
    expect(payload).not.toHaveProperty('sms_marketing_consent_text');
    expect(payload.message).toBe(reportMessage(report));
  });

  it('writes the URL, overall score, four sub-scores and top fixes as plain text', () => {
    const report = buildReport(measurement, 'en', goodAi);
    const message = reportMessage(report);
    const lines = message.split('\n');
    expect(lines[0]).toBe('Website check for https://www.bobsplumbing.com/');
    expect(lines).toContain(`Overall score: ${report.scores.overall}/100`);
    expect(lines).toContain('Mobile speed: 48/100');
    expect(lines).toContain('Desktop speed: 81/100');
    expect(lines).toContain('Search basics: 60/100');
    expect(lines).toContain('Missed-call risk: Medium');
    expect(message).toContain(`Summary:\n${goodAi.summary}`);
    goodAi.fixes.forEach((fix, i) => expect(lines).toContain(`${i + 1}. ${fix.title}: ${fix.detail}`));
    expect(message).not.toContain('bob@');
  });

  it('keeps lead details out of the page summary', () => {
    const summary = pageSummary(buildReport(measurement, 'en', goodAi));
    expect(JSON.stringify(summary)).not.toContain('bob@');
    expect(summary.scores.missed_call_risk).toBe('medium');
    // The page's checklist gets the same reasons the risk level was scored from.
    expect(summary.risk_missed).toEqual(buildReport(measurement, 'en', goodAi).risk?.reasons);
    expect(summary.risk_missed?.length).toBeGreaterThan(0);
    expect(summary.fixes).toHaveLength(3);
  });
});

describe('limits', () => {
  it('allows 3 checks an hour per IP', () => {
    const limiter = createRateLimiter(3, 3_600_000);
    const t = 1_000_000;
    expect([1, 2, 3].map(i => limiter.take('1.2.3.4', t + i).ok)).toEqual([true, true, true]);
    expect(limiter.take('1.2.3.4', t + 10)).toEqual({ ok: false, retryAfterSec: 3600 });
    expect(limiter.take('5.6.7.8', t + 10)).toEqual({ ok: true, retryAfterSec: 0 });
    expect(limiter.take('1.2.3.4', t + 3_600_002).ok).toBe(true);
  });

  it('expires cached entries after the TTL and evicts the oldest past the cap', () => {
    const cache = createTtlCache<number>(1000, 2);
    cache.set('a', 1, 0);
    expect(cache.get('a', 999)).toBe(1);
    expect(cache.get('a', 1000)).toBeUndefined();
    cache.set('a', 1, 0); cache.set('b', 2, 0); cache.set('c', 3, 0);
    expect([cache.get('a', 1), cache.get('b', 1), cache.get('c', 1)]).toEqual([undefined, 2, 3]);
  });

  it('reads the client IP from Vercel’s headers', () => {
    expect(clientIp({ 'x-real-ip': '1.2.3.4', 'x-forwarded-for': '9.9.9.9' })).toBe('1.2.3.4');
    expect(clientIp({ 'x-forwarded-for': '5.6.7.8, 10.0.0.1' })).toBe('5.6.7.8');
    expect(clientIp({})).toBe('unknown');
  });

  it('skips Turnstile without a secret and requires a valid token with one', async () => {
    const ok = (async () => new Response(JSON.stringify({ success: true }))) as unknown as typeof fetch;
    const bad = (async () => new Response(JSON.stringify({ success: false }))) as unknown as typeof fetch;
    expect(await verifyTurnstile('', '1.2.3.4', undefined, bad)).toBe(true);
    expect(await verifyTurnstile('', '1.2.3.4', 'secret', ok)).toBe(false);
    expect(await verifyTurnstile('tok', '1.2.3.4', 'secret', ok)).toBe(true);
    expect(await verifyTurnstile('tok', '1.2.3.4', 'secret', bad)).toBe(false);
  });
});
