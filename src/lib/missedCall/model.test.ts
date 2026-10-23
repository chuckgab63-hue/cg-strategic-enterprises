import { describe, it, expect } from 'vitest';
import { calculateMissedCalls, DEFAULT_INPUTS, WEEKS_PER_MONTH, type MissedCallInputs } from './model';
import { formatCount, formatMoney, formatPct } from './format';

const run = (overrides: Partial<MissedCallInputs>) => calculateMissedCalls({ ...DEFAULT_INPUTS, ...overrides });

describe('calculateMissedCalls', () => {
  it('works through the example numbers step by step', () => {
    const r = calculateMissedCalls(DEFAULT_INPUTS);
    expect(r.missedPerWeek).toBeCloseTo(8);              // 40 × 20%
    expect(r.lostCallersPerWeek).toBeCloseTo(4.8);       // 8 × 60%
    expect(r.lostCustomersPerMonth).toBeCloseTo(6.2352); // 4.8 × 30% × 4.33
    expect(r.lifetimeFactor).toBe(1);
    expect(r.valuePerCustomer).toBe(250);
    expect(r.lostRevenuePerMonth).toBeCloseTo(1558.8);   // 6.2352 × $250
    expect(r.lostRevenuePerYear).toBeCloseTo(18705.6);
    expect(WEEKS_PER_MONTH).toBe(4.33);
  });

  it.each([
    ['calls per week', { callsPerWeek: 0 }],
    ['missed %', { missedPct: 0 }],
    ['no-callback %', { noCallbackPct: 0 }],
    ['conversion %', { conversionPct: 0 }],
    ['customer value', { customerValue: 0 }],
  ])('loses nothing when %s is 0', (_name, overrides) => {
    const r = run(overrides);
    expect(r.lostRevenuePerMonth).toBe(0);
    expect(r.lostRevenuePerYear).toBe(0);
  });

  it('keeps the earlier steps when only a later one is 0', () => {
    const r = run({ conversionPct: 0 });
    expect(r.missedPerWeek).toBeCloseTo(8);
    expect(r.lostCallersPerWeek).toBeCloseTo(4.8);
    expect(r.lostCustomersPerMonth).toBe(0);
  });

  it('handles 100% everywhere', () => {
    const r = run({ callsPerWeek: 10, missedPct: 100, noCallbackPct: 100, conversionPct: 100, customerValue: 100 });
    expect(r.lostCallersPerWeek).toBe(10);
    expect(r.lostRevenuePerMonth).toBeCloseTo(4330);
  });

  it('multiplies by visits × years when customers come back', () => {
    const r = run({ recurring: true, visitsPerYear: 4, yearsRetained: 2 });
    expect(r.lifetimeFactor).toBe(8);
    expect(r.valuePerCustomer).toBe(2000);
    expect(r.lostRevenuePerMonth).toBeCloseTo(1558.8 * 8);
    expect(r.lostRevenuePerYear).toBeCloseTo(1558.8 * 8 * 12);
  });

  it('ignores the recurring fields while recurring is off', () => {
    expect(run({ recurring: false, visitsPerYear: 12, yearsRetained: 10 }).lostRevenuePerMonth).toBeCloseTo(1558.8);
  });

  it('gives 0 when recurring is on with 0 visits or 0 years', () => {
    expect(run({ recurring: true, visitsPerYear: 0 }).lostRevenuePerMonth).toBe(0);
    expect(run({ recurring: true, yearsRetained: 0 }).lostRevenuePerMonth).toBe(0);
  });

  it('treats negative, NaN and infinite inputs as 0 and caps percentages at 100', () => {
    expect(run({ callsPerWeek: -5 }).lostRevenuePerMonth).toBe(0);
    expect(run({ customerValue: Number.NaN }).lostRevenuePerMonth).toBe(0);
    expect(run({ callsPerWeek: Number.POSITIVE_INFINITY }).lostRevenuePerMonth).toBe(0);
    expect(run({ missedPct: 250 }).missedPerWeek).toBe(40);
  });
});

describe('formatting', () => {
  it('rounds money to whole dollars and counts to one decimal', () => {
    expect(formatMoney(1558.8, 'en')).toBe('$1,559');
    expect(formatMoney(18705.6, 'es')).toBe('$18,706');
    expect(formatMoney(0, 'en')).toBe('$0');
    expect(formatCount(6.2352, 'en')).toBe('6.2');
    expect(formatCount(8, 'en')).toBe('8');
    expect(formatPct(20, 'en')).toBe('20%');
    expect(formatPct(12.5, 'es')).toBe('12.5%');
  });
});
