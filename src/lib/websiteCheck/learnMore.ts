// The arithmetic behind the Website Check's "Learn more" panels
// (src/components/WebsiteCheckDetails.tsx): Google's Core Web Vitals ratings
// for the two speed numbers, and the short missed-call estimator, which runs
// on the full calculator's model so its numbers match the calculator.

import { DEFAULT_INPUTS, type MissedCallInputs } from '../missedCall/model';

export type VitalRating = 'good' | 'needs_work' | 'poor';

/** Google's LCP thresholds: up to 2.5 s good, up to 4 s needs work, slower is poor. */
export function rateLcp(ms: number): VitalRating {
  return ms <= 2500 ? 'good' : ms <= 4000 ? 'needs_work' : 'poor';
}

/** Google's CLS thresholds: up to 0.1 good, up to 0.25 needs work, more is poor. */
export function rateCls(cls: number): VitalRating {
  return cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs_work' : 'poor';
}

/** The estimator's four inputs. */
export interface QuickEstimate {
  callsPerWeek: number;
  missedPct: number;
  conversionPct: number;
  customerValue: number;
}

/** Example values, labelled as such on the page: the calculator's own defaults. */
export const QUICK_ESTIMATE_DEFAULTS: QuickEstimate = {
  callsPerWeek: DEFAULT_INPUTS.callsPerWeek,
  missedPct: DEFAULT_INPUTS.missedPct,
  conversionPct: DEFAULT_INPUTS.conversionPct,
  customerValue: DEFAULT_INPUTS.customerValue,
};

/**
 * The full calculator's inputs for a quick estimate. The estimator doesn't ask
 * how many missed callers try again, so it counts all of them as lost
 * (noCallbackPct 100, which the page says), and a single job per customer.
 * The same inputs go into the "Get the full estimate" link, so the calculator
 * opens on the same numbers.
 */
export function quickEstimateInputs(q: QuickEstimate): MissedCallInputs {
  return { ...DEFAULT_INPUTS, ...q, noCallbackPct: 100, recurring: false };
}
