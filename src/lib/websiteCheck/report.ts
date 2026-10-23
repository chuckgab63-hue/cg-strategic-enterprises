// Puts a Website Check together: the measured data, the scores, and the plain-
// language summary. Gemini only writes the summary and the fixes from the
// measured data; scores always come from scoring.ts.

import type { HtmlChecks } from './htmlChecks.js';
import type { PageSpeedResult } from './pagespeed.js';
import {
  missedCallRisk, overallScore, searchBasics, type MissedCallRisk, type SearchCheck,
} from './scoring.js';
import { RISK_REASON_TEXT, fallbackFixes, fallbackSummary, type Fix, type ReportLang } from './reportCopy.js';

/** What we measured about a site. Cached per domain for 24 hours, shared by both languages. */
export interface Measurement {
  domain: string;
  finalUrl: string;
  checkedAt: string;
  htmlTruncated: boolean;
  checks: HtmlChecks;
  pagespeed: { mobile: PageSpeedResult | null; desktop: PageSpeedResult | null };
}

export interface Scores {
  overall: number;
  speed: number | null;
  mobile: number | null;
  searchBasics: number;
  missedCallRisk: MissedCallRisk['level'];
}

export interface Report extends Measurement {
  language: ReportLang;
  scores: Scores;
  search: { passed: SearchCheck[]; missed: SearchCheck[] };
  risk: MissedCallRisk & { reasonText: string[] };
  ai: { summary: string; fixes: Fix[]; generatedBy: 'gemini' | 'rules' };
}

export function scoreMeasurement(m: Measurement) {
  const risk = missedCallRisk(m.checks);
  const search = searchBasics(m.checks);
  const speed = m.pagespeed.desktop?.performance ?? null;
  const mobile = m.pagespeed.mobile?.performance ?? null;
  const scores: Scores = {
    overall: overallScore({ speed, mobile, search: search.score, risk: risk.level }),
    speed,
    mobile,
    searchBasics: search.score,
    missedCallRisk: risk.level,
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
  return {
    domain: m.domain,
    overall_score: scored.scores.overall,
    pagespeed_mobile: psi(m.pagespeed.mobile) ?? 'not available',
    pagespeed_desktop: psi(m.pagespeed.desktop) ?? 'not available',
    search_basics: { score: scored.search.score, passed: scored.search.passed, missed: scored.search.missed, h1_count: m.checks.h1.count },
    missed_call_risk: { level: scored.risk.level, reasons: scored.risk.reasons },
    found_on_homepage: {
      tap_to_call_link: m.checks.telLink,
      contact_form: m.checks.contactForm,
      booking_tools: m.checks.booking.tools,
      chat_or_voice_tools: m.checks.chatWidget.tools,
      after_hours_signs: m.checks.afterHours.evidence,
    },
    page_built_with_javascript_so_checks_may_miss_content: m.checks.contentLimited,
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
  const fixes = ai?.fixes ?? fallbackFixes(lang, {
    riskReasons: scored.risk.reasons,
    mobileScore: scored.scores.mobile,
    searchMissed: scored.search.missed,
  });
  return {
    ...m,
    language: lang,
    scores: scored.scores,
    search: { passed: scored.search.passed, missed: scored.search.missed },
    risk: { ...scored.risk, reasonText: scored.risk.reasons.map(r => RISK_REASON_TEXT[lang][r]) },
    ai: {
      summary: ai?.summary ?? fallbackSummary(lang, {
        domain: m.domain,
        overall: scored.scores.overall,
        risk: scored.risk.level,
        searchMissedCount: scored.search.missed.length,
        contentLimited: m.checks.contentLimited,
      }),
      fixes,
      generatedBy: ai ? 'gemini' : 'rules',
    },
  };
}
