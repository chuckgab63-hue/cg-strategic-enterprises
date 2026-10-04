import { describe, it, expect } from 'vitest';
import { calculate, DEFAULT_INPUTS, type MealPrepInputs } from './mealPrepModel';
import {
  buildCalculatorSearch, calculatorPath, calculatorUrl, parseCalculatorParams, CALCULATOR_PATH,
} from './mealPrepUrl';

const ORIGIN = 'https://www.cgstrategic.dev';

// Build the link, open it the way the page does (parse the query, then hold
// each number as the string a form field shows), and get back what's on screen.
function reopen(inputs: MealPrepInputs) {
  const url = new URL(calculatorUrl(inputs, ORIGIN));
  const parsed = parseCalculatorParams(url.searchParams);
  const { sourcing, ...numbers } = parsed;
  const onScreen = {
    ...Object.fromEntries(Object.entries(numbers).map(([k, v]) => [k, Number(String(v))])),
    sourcing,
  } as MealPrepInputs;
  return { url, inputs: onScreen };
}

function expectExactRoundTrip(inputs: MealPrepInputs) {
  const back = reopen(inputs).inputs;
  expect(back).toEqual(inputs);
  expect(calculate(back)).toEqual(calculate(inputs));
}

const parse = (query: string) => parseCalculatorParams(new URLSearchParams(query));

describe('calculator URL', () => {
  it('gives the defaults a clean URL with no query string', () => {
    expect(buildCalculatorSearch(DEFAULT_INPUTS)).toBe('');
    expect(calculatorPath(DEFAULT_INPUTS)).toBe(CALCULATOR_PATH);
    expect(calculatorUrl(DEFAULT_INPUTS, ORIGIN)).toBe(`${ORIGIN}/meal-prep-calculator`);
    expect(parse('')).toEqual(DEFAULT_INPUTS);
  });

  it('writes only what changed, under short readable names', () => {
    expect(calculatorPath({ ...DEFAULT_INPUTS, mealsPerWeek: 90, pricePerMeal: 13.5 }))
      .toBe('/meal-prep-calculator?meals=90&price=13.5');
    expect(buildCalculatorSearch({ ...DEFAULT_INPUTS, sourcing: 'local', ownerHourlyTarget: 30 }))
      .toBe('rate=30&sourcing=local');
  });

  it('names every input, so none is left out of the link', () => {
    const everything: MealPrepInputs = {
      mealsPerWeek: 120, pricePerMeal: 14.25, foodCostPerMeal: 4.1, packagingPerMeal: 0.75,
      kitchenCostMonthly: 950, deliverySharePct: 35, deliveryCostPerDrop: 7.5, mealsPerOrder: 6,
      ownerHoursPerWeek: 32, ownerHourlyTarget: 28, spoilagePct: 8, sourcing: 'local',
    };
    expect(buildCalculatorSearch(everything)).toBe(
      'meals=120&price=14.25&food=4.1&pack=0.75&waste=8&kitchen=950&delivered=35&drop=7.5&order=6&hours=32&rate=28&sourcing=local',
    );
    expectExactRoundTrip(everything);
  });

  it('round-trips each input on its own', () => {
    const changed: MealPrepInputs[] = [
      { ...DEFAULT_INPUTS, mealsPerWeek: 61 },
      { ...DEFAULT_INPUTS, pricePerMeal: 12.01 },
      { ...DEFAULT_INPUTS, foodCostPerMeal: 3.8 },
      { ...DEFAULT_INPUTS, packagingPerMeal: 0.65 },
      { ...DEFAULT_INPUTS, kitchenCostMonthly: 625 },
      { ...DEFAULT_INPUTS, deliverySharePct: 55 },
      { ...DEFAULT_INPUTS, deliveryCostPerDrop: 6.5 },
      { ...DEFAULT_INPUTS, mealsPerOrder: 3 },
      { ...DEFAULT_INPUTS, ownerHoursPerWeek: 21 },
      { ...DEFAULT_INPUTS, ownerHourlyTarget: 21 },
      { ...DEFAULT_INPUTS, spoilagePct: 6 },
      { ...DEFAULT_INPUTS, sourcing: 'local' },
    ];
    for (const inputs of changed) expectExactRoundTrip(inputs);
  });

  it('round-trips edge values exactly', () => {
    const zeros: MealPrepInputs = {
      mealsPerWeek: 0, pricePerMeal: 0, foodCostPerMeal: 0, packagingPerMeal: 0,
      kitchenCostMonthly: 0, deliverySharePct: 0, deliveryCostPerDrop: 0, mealsPerOrder: 0,
      ownerHoursPerWeek: 0, ownerHourlyTarget: 0, spoilagePct: 0, sourcing: 'broadline',
    };
    expectExactRoundTrip(zeros);
    expectExactRoundTrip({ ...DEFAULT_INPUTS, deliverySharePct: 100, spoilagePct: 100 });
    // Losing money on every meal: no break-even to restore, and that must survive too.
    expectExactRoundTrip({ ...DEFAULT_INPUTS, pricePerMeal: 3 });
    expect(calculate(reopen({ ...DEFAULT_INPUTS, pricePerMeal: 3 }).inputs).breakEvenMeals).toBeNull();
    // Float noise, huge and tiny values: String() writes these as 0.30000000000000004, 1e+21, 1e-7.
    expectExactRoundTrip({ ...DEFAULT_INPUTS, pricePerMeal: 0.1 + 0.2 });
    expectExactRoundTrip({ ...DEFAULT_INPUTS, kitchenCostMonthly: 1e21, mealsPerWeek: 1e6 });
    expectExactRoundTrip({ ...DEFAULT_INPUTS, packagingPerMeal: 1e-7 });
    expectExactRoundTrip({ ...DEFAULT_INPUTS, spoilagePct: 99.99, deliverySharePct: 0.5 });
  });

  it('writes values the model would correct as the values it actually uses', () => {
    // A negative typed into the field, a blank field (NaN) and an over-100% share.
    const typed = { ...DEFAULT_INPUTS, foodCostPerMeal: -2, packagingPerMeal: NaN, deliverySharePct: 140 };
    const { url, inputs } = reopen(typed);
    expect(url.search).toBe('?food=0&pack=0&delivered=100');
    expect(calculate(inputs)).toEqual(calculate(typed));
  });

  it('accepts the price-and-meals links the home-page preview has always made', () => {
    expect(parse('price=14&meals=80')).toEqual({ ...DEFAULT_INPUTS, pricePerMeal: 14, mealsPerWeek: 80 });
  });

  it('ignores malformed and out-of-range values but keeps the good ones', () => {
    const inputs = parse(
      'meals=abc&price=-5&food=&pack=%20&waste=101&delivered=-1&drop=0x10&order=Infinity&hours=1e999&rate=NaN&kitchen=700&sourcing=organic',
    );
    expect(inputs).toEqual({ ...DEFAULT_INPUTS, kitchenCostMonthly: 700 });
    expect(Object.values(calculate(inputs)).every(v => v === null || Number.isFinite(v))).toBe(true);
  });

  it('ignores parameters it does not know and repeated ones after the first', () => {
    expect(parse('utm_source=email&foo=bar')).toEqual(DEFAULT_INPUTS);
    expect(parse('meals=70&meals=999')).toEqual({ ...DEFAULT_INPUTS, mealsPerWeek: 70 });
  });

  it('accepts the boundaries themselves', () => {
    expect(parse('waste=100&delivered=0&sourcing=broadline')).toEqual({ ...DEFAULT_INPUTS, spoilagePct: 100, deliverySharePct: 0 });
    expect(parse('price=.5&food=4.').pricePerMeal).toBe(0.5);
    expect(parse('food=4.').foodCostPerMeal).toBe(4);
  });

  it('copes with a trailing slash on the origin', () => {
    expect(calculatorUrl(DEFAULT_INPUTS, `${ORIGIN}/`)).toBe(`${ORIGIN}/meal-prep-calculator`);
  });
});
