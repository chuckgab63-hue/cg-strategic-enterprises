import { describe, it, expect } from 'vitest';
import { checkHtml } from './htmlChecks';
import { WEBSITE_CHECK_HONEYPOT, pageSummary } from './lead';
import { buildReport, type Measurement } from './report';
import { errorBody, readCheckResponse, receivedBody, resultsBody } from './response';

// The API builds bodies with resultsBody/receivedBody/errorBody and the page
// reads them with readCheckResponse. These go through JSON like the real thing.
const roundTrip = (body: unknown) => JSON.parse(JSON.stringify(body));

const measurement: Measurement = {
  domain: 'bythecjax.com',
  page: 'bythecjax.com/onesourcepest',
  finalUrl: 'https://bythecjax.com/onesourcepest/',
  checkedAt: '2026-10-23T14:00:00.000Z',
  htmlTruncated: false,
  checks: checkHtml(`<title>One Source</title><a href="tel:9045550100">Call</a>${'<p>Pest control in Jacksonville.</p>'.repeat(10)}`, new URL('https://bythecjax.com/onesourcepest/')),
  htmlError: null,
  pagespeed: { mobile: null, desktop: null },
};

describe('API ↔ page response contract', () => {
  it('shows results for a 200 with a report, even when parts are missing', () => {
    const report = buildReport(measurement, 'en', null);
    const read = readCheckResponse(200, roundTrip(resultsBody(report, pageSummary(report), false)));
    expect(read.kind).toBe('results');
    if (read.kind !== 'results') return;
    expect(read.status).toBe('partial');
    expect(read.unavailable).toEqual(['pagespeed_mobile', 'pagespeed_desktop', 'ai_summary']);
    expect(read.emailed).toBe(false);
    expect(read.report.page).toBe('bythecjax.com/onesourcepest');
    expect(read.report.scores.speed).toBeNull();
    expect(read.report.scores.missed_call_risk).toBe('high');
  });

  it('shows a neutral confirmation, not an error, for an accepted request with no report', () => {
    expect(readCheckResponse(200, roundTrip(receivedBody()))).toEqual({ kind: 'received' });
  });

  it('passes error codes and field errors through', () => {
    expect(readCheckResponse(422, roundTrip(errorBody('unreachable')))).toEqual({ kind: 'error', code: 'unreachable', fields: [] });
    expect(readCheckResponse(400, roundTrip(errorBody('invalid', { fields: ['email_invalid'] }))))
      .toEqual({ kind: 'error', code: 'invalid', fields: ['email_invalid'] });
    expect(readCheckResponse(429, roundTrip(errorBody('rate_limited', { retry_after_sec: 60 })))).toMatchObject({ code: 'rate_limited' });
  });

  it('treats a non-JSON platform error as an error, with timeouts named', () => {
    expect(readCheckResponse(504, null)).toEqual({ kind: 'error', code: 'timeout', fields: [] });
    expect(readCheckResponse(500, null)).toEqual({ kind: 'error', code: 'generic', fields: [] });
    // The first version's honeypot answer: 200 but nothing to show. No longer produced.
    expect(readCheckResponse(200, { ok: true, report: null })).toEqual({ kind: 'error', code: 'generic', fields: [] });
  });
});

describe('honeypot field', () => {
  it('has a name browser autofill won’t recognise', () => {
    // Autofill matches names and labels like company, website, url, organization, email, phone, name.
    expect(WEBSITE_CHECK_HONEYPOT).not.toMatch(/company|site|web|url|org|mail|phone|tel|name|address/i);
  });
});
