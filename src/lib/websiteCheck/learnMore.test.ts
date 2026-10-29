import { describe, expect, it } from 'vitest';
import { QUICK_ESTIMATE_DEFAULTS, quickEstimateInputs, rateCls, rateLcp } from './learnMore';
import { calculateMissedCalls } from '../missedCall/model';
import { buildMissedCallSearch, parseMissedCallParams } from '../missedCall/url';

describe('speed ratings', () => {
  it('uses Google’s LCP thresholds', () => {
    expect([1200, 2500, 2501, 4000, 4001].map(rateLcp)).toEqual(['good', 'good', 'needs_work', 'needs_work', 'poor']);
  });

  it('uses Google’s CLS thresholds', () => {
    expect([0, 0.1, 0.11, 0.25, 0.26].map(rateCls)).toEqual(['good', 'good', 'needs_work', 'needs_work', 'poor']);
  });
});

describe('quick missed-call estimate', () => {
  it('works out the example: 40 calls, 20% unanswered, 30% would buy, $250', () => {
    const r = calculateMissedCalls(quickEstimateInputs(QUICK_ESTIMATE_DEFAULTS));
    // 40 × 20% = 8 unanswered a week; 8 × 30% × 4.33 weeks = 10.392 customers a month.
    expect(r.missedPerWeek).toBe(8);
    expect(r.lostCustomersPerMonth).toBeCloseTo(10.392, 6);
    expect(r.lostRevenuePerMonth).toBeCloseTo(2598, 6);
    expect(r.lostRevenuePerYear).toBeCloseTo(31176, 6);
  });

  it('counts every unanswered caller as lost, one job each', () => {
    const inputs = quickEstimateInputs({ callsPerWeek: 100, missedPct: 10, conversionPct: 50, customerValue: 1000 });
    expect(inputs).toMatchObject({ noCallbackPct: 100, recurring: false });
    expect(calculateMissedCalls(inputs).lostRevenuePerMonth).toBeCloseTo(100 * 0.1 * 0.5 * 4.33 * 1000, 6);
  });

  it('opens the full calculator on the same numbers', () => {
    const inputs = quickEstimateInputs({ callsPerWeek: 60, missedPct: 25, conversionPct: 40, customerValue: 500 });
    const search = buildMissedCallSearch(inputs);
    expect(search).toBe('calls=60&missed=25&gone=100&close=40&value=500');
    expect(calculateMissedCalls(parseMissedCallParams(new URLSearchParams(search))).lostRevenuePerMonth)
      .toBeCloseTo(calculateMissedCalls(inputs).lostRevenuePerMonth, 6);
  });
});
