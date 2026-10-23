// Turns the measured checks into the four score cards and the overall score.
// Everything here is deterministic, so the numbers on the page and in the
// report come from what we measured, never from the AI.

import type { HtmlChecks } from './htmlChecks.js';

export type RiskLevel = 'low' | 'medium' | 'high';

export type RiskReason =
  | 'no_tel_link' | 'no_contact_form' | 'no_booking' | 'no_chat' | 'no_after_hours' | 'phone_only';

export interface MissedCallRisk {
  level: RiskLevel;
  points: number;
  reasons: RiskReason[];
}

// Points per missing way to reach the business when nobody picks up the phone.
const RISK_POINTS: Record<RiskReason, number> = {
  no_tel_link: 1,
  no_contact_form: 2,
  no_booking: 1,
  no_chat: 2,
  no_after_hours: 1,
  phone_only: 1,
};

/**
 * How likely a caller who doesn't get an answer is to leave without a way to
 * reach the business: 0-2 points low, 3-5 medium, 6+ high.
 */
export function missedCallRisk(c: HtmlChecks): MissedCallRisk {
  const reasons: RiskReason[] = [];
  if (!c.telLink) reasons.push('no_tel_link');
  if (!c.contactForm) reasons.push('no_contact_form');
  if (!c.booking.present) reasons.push('no_booking');
  if (!c.chatWidget.present) reasons.push('no_chat');
  if (!c.afterHours.present) reasons.push('no_after_hours');
  // A tap-to-call number with nothing else to catch the caller: every lead depends on someone answering.
  if (c.telLink && !c.booking.present && !c.chatWidget.present && !c.afterHours.present) reasons.push('phone_only');
  const points = reasons.reduce((sum, r) => sum + RISK_POINTS[r], 0);
  return { level: points >= 6 ? 'high' : points >= 3 ? 'medium' : 'low', points, reasons };
}

export type SearchCheck = 'https' | 'title' | 'meta_description' | 'single_h1' | 'viewport' | 'structured_data';

const SEARCH_WEIGHTS: Record<SearchCheck, number> = {
  https: 15,
  title: 20,
  meta_description: 20,
  single_h1: 15,
  viewport: 10,
  structured_data: 20,
};

/** The search basics this page passed and missed, and a 0-100 score weighted by SEARCH_WEIGHTS. */
export function searchBasics(c: HtmlChecks): { score: number; passed: SearchCheck[]; missed: SearchCheck[] } {
  const results: Record<SearchCheck, boolean> = {
    https: c.https,
    title: c.title.present,
    meta_description: c.metaDescription.present,
    single_h1: c.h1.single,
    viewport: c.viewport,
    structured_data: c.structuredData.present,
  };
  const keys = Object.keys(results) as SearchCheck[];
  return {
    score: keys.reduce((sum, k) => sum + (results[k] ? SEARCH_WEIGHTS[k] : 0), 0),
    passed: keys.filter(k => results[k]),
    missed: keys.filter(k => !results[k]),
  };
}

/** Missed-call risk as a 0-100 score, only for the overall average. */
const RISK_SCORE: Record<RiskLevel, number> = { low: 100, medium: 55, high: 15 };

/**
 * Weighted average of what we could measure: mobile speed 30, desktop speed 20,
 * search basics 25, missed-call risk 25. A PageSpeed score that failed to load
 * is left out and the rest are re-weighted.
 */
export function overallScore(parts: { speed: number | null; mobile: number | null; search: number; risk: RiskLevel }): number {
  const weighted: [number | null, number][] = [
    [parts.mobile, 30],
    [parts.speed, 20],
    [parts.search, 25],
    [RISK_SCORE[parts.risk], 25],
  ];
  let total = 0;
  let weights = 0;
  for (const [score, weight] of weighted) {
    if (score === null) continue;
    total += score * weight;
    weights += weight;
  }
  return Math.round(total / weights);
}
