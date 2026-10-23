// Calculator inputs <-> URL query string, so an estimate can be bookmarked or
// shared. Numbers and an on/off flag only, never anything personal. Only inputs
// that differ from the defaults are written, so the starting example is a bare
// /missed-call-calculator. Reading is forgiving: a parameter that is missing,
// malformed or out of range keeps its default. url.test.ts checks the round trip.

import { DEFAULT_INPUTS, type MissedCallInputs } from './model';

export const MISSED_CALL_CALCULATOR_PATH = '/missed-call-calculator';

type NumericInput = Exclude<keyof MissedCallInputs, 'recurring'>;

/** Parameter name and bounds for each numeric input, in URL order. */
export const NUMERIC_PARAMS: { key: NumericInput; param: string; max: number }[] = [
  { key: 'callsPerWeek', param: 'calls', max: 10000 },
  { key: 'missedPct', param: 'missed', max: 100 },
  { key: 'noCallbackPct', param: 'gone', max: 100 },
  { key: 'conversionPct', param: 'close', max: 100 },
  { key: 'customerValue', param: 'value', max: 1000000 },
  { key: 'visitsPerYear', param: 'visits', max: 365 },
  { key: 'yearsRetained', param: 'years', max: 50 },
];
const RECURRING_PARAM = 'repeat';

// A plain non-negative decimal. Rejects '', whitespace, hex, signs, exponents.
const DECIMAL = /^(\d+\.?\d*|\.\d+)$/;

export function parseMissedCallParams(params: URLSearchParams): MissedCallInputs {
  const inputs: MissedCallInputs = { ...DEFAULT_INPUTS };
  for (const { key, param, max } of NUMERIC_PARAMS) {
    const raw = params.get(param);
    if (raw === null || !DECIMAL.test(raw)) continue;
    const n = Number(raw);
    if (Number.isFinite(n) && n <= max) inputs[key] = n;
  }
  const recurring = params.get(RECURRING_PARAM);
  if (recurring === '1') inputs.recurring = true;
  if (recurring === '0') inputs.recurring = false;
  return inputs;
}

/**
 * The query string for a set of inputs, without the leading '?'. Empty for the
 * defaults. Values outside the allowed range are written as the value the
 * calculator actually uses, so the link reproduces what's on screen.
 */
export function buildMissedCallSearch(inputs: MissedCallInputs): string {
  const params = new URLSearchParams();
  for (const { key, param, max } of NUMERIC_PARAMS) {
    const raw = inputs[key];
    const n = !Number.isFinite(raw) || raw < 0 ? 0 : Math.min(raw, max);
    if (n !== DEFAULT_INPUTS[key]) params.set(param, String(n));
  }
  if (inputs.recurring !== DEFAULT_INPUTS.recurring) params.set(RECURRING_PARAM, inputs.recurring ? '1' : '0');
  return params.toString();
}

/** Absolute link to the calculator on these inputs; `base` is the site origin plus any /es prefix. */
export function missedCallCalculatorUrl(inputs: MissedCallInputs, base: string): string {
  const search = buildMissedCallSearch(inputs);
  return `${base.replace(/\/+$/, '')}${MISSED_CALL_CALCULATOR_PATH}${search ? `?${search}` : ''}`;
}
