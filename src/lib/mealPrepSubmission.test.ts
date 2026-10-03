import { describe, it, expect } from 'vitest';
import { calculate, type MealPrepInputs } from './mealPrepModel';
import { buildCalculatorSubmission, CALCULATOR_SOURCE } from './mealPrepSubmission';

const INPUTS: MealPrepInputs = {
  mealsPerWeek: 60,
  pricePerMeal: 12,
  foodCostPerMeal: 3.75,
  packagingPerMeal: 0.6,
  kitchenCostMonthly: 600,
  deliverySharePct: 50,
  deliveryCostPerDrop: 6,
  mealsPerOrder: 4,
  ownerHoursPerWeek: 20,
  ownerHourlyTarget: 20,
  spoilagePct: 5,
  sourcing: 'broadline',
};

const CONTACT = {
  name: '  Sam Rivera ',
  email: ' sam@example.com ',
  emailMarketingConsent: false,
  consentText: 'Consent wording',
  submittedAt: '2026-10-02T15:04:05.000Z',
};

const build = (contact = CONTACT, inputs = INPUTS) =>
  buildCalculatorSubmission(contact, inputs, calculate(inputs));

// The Make.com scenario's field names, verbatim.
const EXPECTED_KEYS = [
  'name', 'email', 'source',
  'email_marketing_consent', 'marketing_consent_text', 'marketing_consent_timestamp',
  'meals_per_week', 'price_per_meal', 'food_cost_per_meal', 'packaging_per_meal',
  'kitchen_cost_monthly', 'delivery_share', 'delivery_cost_per_drop',
  'meals_per_order', 'spoilage_pct',
  'owner_hours_per_week', 'owner_hourly_target', 'sourcing',
  'food_cost_pct', 'prime_cost_pct', 'contribution_margin',
  'break_even_meals', 'monthly_revenue', 'monthly_profit',
];

describe('buildCalculatorSubmission', () => {
  it('sends exactly the keys the Make.com scenario maps', () => {
    expect(EXPECTED_KEYS).toHaveLength(24);
    expect(Object.keys(build()).sort()).toEqual([...EXPECTED_KEYS].sort());
  });

  it('tags the source and trims contact details', () => {
    const body = build();
    expect(body.source).toBe(CALCULATOR_SOURCE);
    expect(body.source).toBe('Meal Prep Calculator');
    expect(body.name).toBe('Sam Rivera');
    expect(body.email).toBe('sam@example.com');
  });

  it('sends numbers as plain values with no currency or percent signs', () => {
    const body = build();
    for (const key of EXPECTED_KEYS.slice(6)) {
      if (key === 'sourcing') continue;
      expect(typeof body[key as keyof typeof body], key).toBe('number');
    }
    expect(JSON.stringify(body)).not.toMatch(/[$%]/);
  });

  it('rounds money to cents and percentages to one decimal', () => {
    const body = build();
    const r = calculate(INPUTS);
    expect(body.contribution_margin).toBe(Math.round(r.contributionMargin * 100) / 100);
    expect(body.food_cost_pct).toBe(Math.round(r.foodCostPct! * 10) / 10);
    expect(body.monthly_profit).toBe(Math.round(r.monthlyProfit * 100) / 100);
    expect(body.delivery_share).toBe(50); // a percentage, not 0.5
    expect(body.spoilage_pct).toBe(5); // likewise
    expect(body.meals_per_order).toBe(4);
  });

  it('records the consent wording always, but a consent timestamp only when consent is given', () => {
    const declined = build();
    expect(declined.email_marketing_consent).toBe(false);
    expect(declined.marketing_consent_text).toBe('Consent wording');
    expect(declined.marketing_consent_timestamp).toBe('');

    const agreed = build({ ...CONTACT, emailMarketingConsent: true });
    expect(agreed.email_marketing_consent).toBe(true);
    expect(agreed.marketing_consent_timestamp).toBe('2026-10-02T15:04:05.000Z');
  });

  it('labels sourcing for the email', () => {
    expect(build().sourcing).toBe('Broadline');
    expect(build(CONTACT, { ...INPUTS, sourcing: 'local' }).sourcing).toBe('Local');
  });

  it('sends a blank break-even when no volume ever breaks even', () => {
    const body = build(CONTACT, { ...INPUTS, pricePerMeal: 3 });
    expect(body.break_even_meals).toBeNull();
  });

  it('sends a blank prime cost at zero volume rather than NaN or Infinity', () => {
    const body = build(CONTACT, { ...INPUTS, mealsPerWeek: 0 });
    expect(body.prime_cost_pct).toBeNull();
    expect(JSON.stringify(body)).not.toMatch(/NaN|Infinity/);
  });
});
