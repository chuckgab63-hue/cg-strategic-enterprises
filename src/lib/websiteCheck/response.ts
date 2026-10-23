// The JSON contract between api/website-check.ts and src/pages/WebsiteCheck.tsx.
// The API builds every body with the functions below and the page reads them
// with readCheckResponse, so the two can't drift apart (response.test.ts).

import type { PageSummary } from './lead.js';
import type { Report, UnavailablePart } from './report.js';
import type { CheckErrorCode } from './url.js';

export type ApiErrorCode =
  | CheckErrorCode | 'invalid' | 'rate_limited' | 'bot_check_failed' | 'method_not_allowed' | 'internal';

export type WebsiteCheckResponse =
  | {
      ok: true;
      /** 'complete': everything was checked. 'partial': see `unavailable`. */
      status: 'complete' | 'partial';
      unavailable: UnavailablePart[];
      /** Whether the full report reached Make, which emails it. */
      emailed: boolean;
      report: PageSummary;
    }
  | {
      ok: true;
      /** Accepted, nothing to show (honeypot hits get this, so bots see an ordinary answer). */
      status: 'received';
      unavailable: [];
      emailed: false;
      report: null;
    }
  | { ok: false; error: ApiErrorCode; fields?: string[]; retry_after_sec?: number };

export function resultsBody(report: Report, summary: PageSummary, emailed: boolean): WebsiteCheckResponse {
  return { ok: true, status: report.status, unavailable: report.unavailable, emailed, report: summary };
}

export function receivedBody(): WebsiteCheckResponse {
  return { ok: true, status: 'received', unavailable: [], emailed: false, report: null };
}

export function errorBody(error: ApiErrorCode, extra: { fields?: string[]; retry_after_sec?: number } = {}): WebsiteCheckResponse {
  return { ok: false, error, ...extra };
}

export type ReadResponse =
  | { kind: 'results'; status: 'complete' | 'partial'; unavailable: UnavailablePart[]; emailed: boolean; report: PageSummary }
  | { kind: 'received' }
  | { kind: 'error'; code: string; fields: string[] };

/**
 * What the page should do with a response. Goes by the body's `ok` and
 * `status`, not the HTTP status alone, and treats anything it doesn't
 * recognise (e.g. a platform error page that isn't JSON) as an error.
 */
export function readCheckResponse(httpStatus: number, body: unknown): ReadResponse {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  if (b.ok === true && b.report && typeof b.report === 'object' && (b.status === 'complete' || b.status === 'partial')) {
    return {
      kind: 'results',
      status: b.status,
      unavailable: Array.isArray(b.unavailable) ? b.unavailable as UnavailablePart[] : [],
      emailed: b.emailed === true,
      report: b.report as PageSummary,
    };
  }
  if (b.ok === true && b.status === 'received') return { kind: 'received' };
  const fields = Array.isArray(b.fields) ? b.fields.filter((f): f is string => typeof f === 'string') : [];
  const code = typeof b.error === 'string' ? b.error : httpStatus === 504 ? 'timeout' : 'generic';
  return { kind: 'error', code, fields };
}
