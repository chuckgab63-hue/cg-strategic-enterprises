import { describe, it, expect } from 'vitest';
import { DEFAULT_INPUTS, type MissedCallInputs } from './model';
import { buildMissedCallSearch, missedCallCalculatorUrl, parseMissedCallParams } from './url';

const parse = (search: string) => parseMissedCallParams(new URLSearchParams(search));

describe('missed-call calculator URL', () => {
  it('writes nothing for the example numbers', () => {
    expect(buildMissedCallSearch(DEFAULT_INPUTS)).toBe('');
    expect(missedCallCalculatorUrl(DEFAULT_INPUTS, 'https://www.cgstrategic.dev/es/')).toBe('https://www.cgstrategic.dev/es/missed-call-calculator');
  });

  it('round-trips every input exactly', () => {
    const inputs: MissedCallInputs = {
      callsPerWeek: 120, missedPct: 12.5, noCallbackPct: 0, conversionPct: 45,
      customerValue: 1800, recurring: true, visitsPerYear: 12, yearsRetained: 3,
    };
    const search = buildMissedCallSearch(inputs);
    expect(search).toBe('calls=120&missed=12.5&gone=0&close=45&value=1800&visits=12&years=3&repeat=1');
    expect(parse(search)).toEqual(inputs);
  });

  it('keeps defaults for missing, malformed or out-of-range values', () => {
    expect(parse('calls=abc&missed=150&gone=-5&close=&value=1e3&visits=0x10')).toEqual(DEFAULT_INPUTS);
    expect(parse('repeat=yes').recurring).toBe(false);
  });

  it('ignores anything that is not a calculator input', () => {
    expect(parse('email=a@b.com&name=Pat&calls=50')).toEqual({ ...DEFAULT_INPUTS, callsPerWeek: 50 });
    expect(buildMissedCallSearch({ ...DEFAULT_INPUTS, callsPerWeek: 50 })).not.toMatch(/email|name/);
  });

  it('writes what the calculator uses for out-of-range inputs', () => {
    expect(buildMissedCallSearch({ ...DEFAULT_INPUTS, missedPct: 140, callsPerWeek: -3 })).toBe('calls=0&missed=100');
    expect(buildMissedCallSearch({ ...DEFAULT_INPUTS, customerValue: Number.NaN })).toBe('value=0');
  });
});
