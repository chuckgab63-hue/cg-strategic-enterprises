// Calculator inputs <-> URL query string, so a link (the summary email, a
// bookmark, the home-page preview) reopens the calculator on the same numbers.
// Only inputs that differ from the defaults are written, so the starting plan
// is a bare /meal-prep-calculator. Reading is forgiving: a parameter that is
// missing, malformed or out of range keeps its default and nothing else changes.
// mealPrepUrl.test.ts checks the round trip is exact.

import { DEFAULT_INPUTS, type MealPrepInputs } from './mealPrepModel';

export const CALCULATOR_PATH = '/meal-prep-calculator';

type NumericInput = Exclude<keyof MealPrepInputs, 'sourcing'>;

/**
 * Parameter name and upper bound for each numeric input, in URL order. The
 * names are short but readable; `price` and `meals` predate the rest (the
 * home-page preview links with them) and must not change.
 */
const NUMERIC_PARAMS: { key: NumericInput; param: string; max?: number }[] = [
  { key: 'mealsPerWeek', param: 'meals' },
  { key: 'pricePerMeal', param: 'price' },
  { key: 'foodCostPerMeal', param: 'food' },
  { key: 'packagingPerMeal', param: 'pack' },
  { key: 'spoilagePct', param: 'waste', max: 100 },
  { key: 'kitchenCostMonthly', param: 'kitchen' },
  { key: 'deliverySharePct', param: 'delivered', max: 100 },
  { key: 'deliveryCostPerDrop', param: 'drop' },
  { key: 'mealsPerOrder', param: 'order' },
  { key: 'ownerHoursPerWeek', param: 'hours' },
  { key: 'ownerHourlyTarget', param: 'rate' },
];
const SOURCING_PARAM = 'sourcing';

// A plain non-negative decimal, optionally with an exponent (String() writes
// very large or very small numbers that way). Rejects '', whitespace, hex, signs.
const DECIMAL = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

const inRange = (n: number, max?: number) => Number.isFinite(n) && n >= 0 && (max === undefined || n <= max);

/** The calculator inputs a query string describes, with defaults for anything absent or unusable. */
export function parseCalculatorParams(params: URLSearchParams): MealPrepInputs {
  const inputs: MealPrepInputs = { ...DEFAULT_INPUTS };
  for (const { key, param, max } of NUMERIC_PARAMS) {
    const raw = params.get(param);
    if (raw === null || !DECIMAL.test(raw)) continue;
    const n = Number(raw);
    if (inRange(n, max)) inputs[key] = n;
  }
  const sourcing = params.get(SOURCING_PARAM);
  if (sourcing === 'local' || sourcing === 'broadline') inputs.sourcing = sourcing;
  return inputs;
}

/**
 * The query string for a set of inputs, without the leading '?'. Empty for the
 * defaults. A value the page would treat as something else (a negative, a
 * share over 100%, a blank field) is written as the value the model actually
 * uses, so the link reproduces the results on screen.
 */
export function buildCalculatorSearch(inputs: MealPrepInputs): string {
  const params = new URLSearchParams();
  for (const { key, param, max } of NUMERIC_PARAMS) {
    const raw = inputs[key];
    const n = !Number.isFinite(raw) || raw < 0 ? 0 : max !== undefined && raw > max ? max : raw;
    if (n !== DEFAULT_INPUTS[key]) params.set(param, String(n));
  }
  if (inputs.sourcing !== DEFAULT_INPUTS.sourcing) params.set(SOURCING_PARAM, inputs.sourcing);
  return params.toString();
}

/** Site-relative link to the calculator on these inputs. */
export function calculatorPath(inputs: MealPrepInputs): string {
  const search = buildCalculatorSearch(inputs);
  return search ? `${CALCULATOR_PATH}?${search}` : CALCULATOR_PATH;
}

/** Absolute link, for anywhere outside the site (emails, the clipboard). */
export function calculatorUrl(inputs: MealPrepInputs, origin: string): string {
  return `${origin.replace(/\/+$/, '')}${calculatorPath(inputs)}`;
}
