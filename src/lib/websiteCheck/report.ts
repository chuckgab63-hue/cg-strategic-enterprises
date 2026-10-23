// Puts a Website Check together: the measured data, the scores, and the plain-
// language summary. Gemini only writes the summary and the fixes from the
// measured data; scores always come from scoring.ts.
//
// Any one part can be missing (PageSpeed down, homepage unreadable, Gemini
// down). The report then says which parts are unavailable and status is
// 'partial'; the page shows what we have instead of an error.

import type { HtmlChecks } from './htmlChecks.js';
import type { PageSpeedResult } from './pagespeed.js';
import {
  missedCallRisk, overallScore, searchBasics, type MissedCallRisk, type SearchCheck,
} from './scoring.js';
import { RISK_REASON_TEXT, fallbackFixes, fallbackSummary, type Fix, type ReportLang } from './reportCopy.js';

/** A part of the check that couldn't be done this time. */
export type UnavailablePart = 'pagespeed_mobile' | 'pagespeed_desktop' | 'html_checks' | 'ai_summary';

/** What we measured about a page. Cached for 24 hours when complete, shared by both languages. */
export interface Measurement {
  domain: string;
  /** Domain plus path, e.g. "bythecjax.com/onesourcepest". */
  page: string;
  finalUrl: string;
  checkedAt: string;
  htmlTruncated: boolean;
  /** Null when we couldn't read the page's HTML; htmlError says why. */
  checks: HtmlChecks | null;
  htmlError: string | null;
  pagespeed: { mobile: PageSpeedResult | null; desktop: PageSpeedResult | null };
}

export interface Scores {
  overall: number | null;
  speed: number | null;
  mobile: number | null;
  searchBasics: number | null;
  missedCallRisk: MissedCallRisk['level'] | null;
}

export interface Report extends Measurement {
  language: ReportLang;
  status: 'complete' | 'partial';
  unavailable: UnavailablePart[];
  scores: Scores;
  search: { passed: SearchCheck[]; missed: SearchCheck[] } | null;
  risk: (MissedCallRisk & { reasonText: string[] }) | null;
  ai: { summary: string; fixes: Fix[]; generatedBy: 'gemini' | 'rules' };
}

/** The parts of a measurement that are missing (before the AI step). */
export function missingParts(m: Measurement): UnavailablePart[] {
  const missing: UnavailablePart[] = [];
  if (!m.pagespeed.mobile) missing.push('pagespeed_mobile');
  if (!m.pagespeed.desktop) missing.push('pagespeed_desktop');
  if (!m.checks) missing.push('html_checks');
  return missing;
}

export function scoreMeasurement(m: Measurement) {
  const risk = m.checks ? missedCallRisk(m.checks) : null;
  const search = m.checks ? searchBasics(m.checks) : null;
  const speed = m.pagespeed.desktop?.performance ?? null;
  const mobile = m.pagespeed.mobile?.performance ?? null;
  const scores: Scores = {
    overall: overallScore({ speed, mobile, search: search?.score ?? null, risk: risk?.level ?? null }),
    speed,
    mobile,
    searchBasics: search?.score ?? null,
    missedCallRisk: risk?.level ?? null,
  };
  return { scores, risk, search };
}

/** The measured facts Gemini gets, and nothing else. */
export function aiInput(m: Measurement, scored: ReturnType<typeof scoreMeasurement>) {
  const psi = (r: PageSpeedResult | null) => r && {
    performance_score: r.performance,
    lcp_ms: r.lcpMs,
    cls: r.cls,
    inp_ms: r.inpMs,
    metrics_source: r.metricsSource,
    top_opportunities: r.opportunities.map(o => ({ title: o.title, estimated_savings_ms: o.savingsMs })),
  };
  const c = m.checks;
  return {
    page: m.page,
    overall_score: scored.scores.overall ?? 'not available',
    pagespeed_mobile: psi(m.pagespeed.mobile) ?? 'not available',
    pagespeed_desktop: psi(m.pagespeed.desktop) ?? 'not available',
    search_basics: scored.search && c
      ? { score: scored.search.score, passed: scored.search.passed, missed: scored.search.missed, h1_count: c.h1.count }
      : 'not available: we could not read the page',
    missed_call_risk: scored.risk ? { level: scored.risk.level, reasons: scored.risk.reasons } : 'not available: we could not read the page',
    found_on_homepage: c
      ? {
          tap_to_call_link: c.telLink,
          contact_form: c.contactForm,
          booking_tools: c.booking.tools,
          chat_or_voice_tools: c.chatWidget.tools,
          after_hours_signs: c.afterHours.evidence,
        }
      : 'not available',
    page_built_with_javascript_so_checks_may_miss_content: c?.contentLimited ?? false,
  };
}

export function aiPrompt(input: ReturnType<typeof aiInput>, lang: ReportLang): { system: string; user: string } {
  const language = lang === 'es'
    ? 'Write in natural Latin American Spanish, addressing the reader as "usted".'
    : 'Write in plain American English.';
  return {
    system: [
      'You explain a free website check to a small local business owner who is not technical.',
      'Use ONLY the measured data you are given. Do not invent numbers, percentages, rankings, revenue or lead figures, and do not estimate anything that was not measured.',
      'Never promise or guarantee results (no "will rank", "will double", "guaranteed").',
      'If a number appears in your text it must be copied exactly from the data.',
      'If a part is "not available", say in a few words that it could not be checked this time; do not guess it.',
      'If page_built_with_javascript_so_checks_may_miss_content is true, say briefly that some items may exist but were not visible to the check.',
      'No jargon without a short plain explanation. No markdown.',
      language,
      'Return JSON: {"summary": "2-3 sentences", "fixes": [{"title": "max 8 words", "detail": "1-2 sentences"}, ... exactly 3, most impactful first]}.',
    ].join(' '),
    user: `Measured data:\n${JSON.stringify(input, null, 2)}`,
  };
}

/** Every number in the measured data, as strings ("72", "2.5", "2500"). */
function numbersIn(value: unknown, into = new Set<string>()): Set<string> {
  if (typeof value === 'number') {
    into.add(String(value));
    into.add(String(Math.round(value)));
    // ms values are often read back as seconds: 2500 -> 2.5
    if (value >= 100) into.add(String(Math.round(value / 100) / 10)).add(String(Math.round(value / 1000)));
  } else if (typeof value === 'string') {
    // Digits in names, like a domain or a PageSpeed audit title.
    for (const n of value.match(/\d+(?:\.\d+)?/g) ?? []) into.add(n);
  } else if (value && typeof value === 'object') {
    for (const v of Object.values(value)) numbersIn(v, into);
  }
  return into;
}

// Numbers the AI may use without them being measured: list counts and "24/7".
const ALWAYS_ALLOWED = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '24', '100']);

/**
 * Gemini's JSON, checked: three fixes with titles and details, a summary, and
 * no number that isn't in the measured data. Null if it doesn't pass.
 */
export function parseAiOutput(text: string | undefined, input: ReturnType<typeof aiInput>): { summary: string; fixes: Fix[] } | null {
  if (!text) return null;
  let data: any;
  try {
    data = JSON.parse(text.replace(/^```(json)?\s*|\s*```$/g, ''));
  } catch {
    return null;
  }
  const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
  const summary = clean(data?.summary, 700);
  const fixes: Fix[] = Array.isArray(data?.fixes)
    ? data.fixes.slice(0, 3).map((f: any) => ({ title: clean(f?.title, 120), detail: clean(f?.detail, 400) }))
    : [];
  if (!summary || fixes.length !== 3 || fixes.some(f => !f.title || !f.detail)) return null;

  const allowed = numbersIn(input);
  const allText = [summary, ...fixes.flatMap(f => [f.title, f.detail])].join(' ');
  for (const n of allText.match(/\d+(?:[.,]\d+)?/g) ?? []) {
    const normalized = n.replace(',', '.');
    if (!allowed.has(normalized) && !ALWAYS_ALLOWED.has(normalized)) return null;
  }
  return { summary, fixes };
}

export function buildReport(m: Measurement, lang: ReportLang, ai: { summary: string; fixes: Fix[] } | null): Report {
  const scored = scoreMeasurement(m);
  const unavailable = missingParts(m);
  if (!ai) unavailable.push('ai_summary');
  const fixes = ai?.fixes ?? fallbackFixes(lang, {
    riskReasons: scored.risk?.reasons ?? [],
    mobileScore: scored.scores.mobile,
    searchMissed: scored.search?.missed ?? [],
  });
  return {
    ...m,
    language: lang,
    status: unavailable.length ? 'partial' : 'complete',
    unavailable,
    scores: scored.scores,
    search: scored.search && { passed: scored.search.passed, missed: scored.search.missed },
    risk: scored.risk && { ...scored.risk, reasonText: scored.risk.reasons.map(r => RISK_REASON_TEXT[lang][r]) },
    ai: {
      summary: ai?.summary ?? fallbackSummary(lang, {
        page: m.page,
        overall: scored.scores.overall,
        risk: scored.risk?.level ?? null,
        searchMissedCount: scored.search?.missed.length ?? null,
        contentLimited: m.checks?.contentLimited ?? false,
        pagespeedMissing: !m.pagespeed.mobile && !m.pagespeed.desktop,
      }),
      fixes,
      generatedBy: ai ? 'gemini' : 'rules',
    },
  };
}
