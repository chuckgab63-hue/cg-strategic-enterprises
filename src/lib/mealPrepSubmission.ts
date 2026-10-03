// Builds the POST body for the meal-prep calculator's "email me my numbers"
// form. The Make.com scenario maps fields by name, so a renamed key fails
// silently into a blank spreadsheet cell — mealPrepSubmission.test.ts pins
// the exact key list. Numbers go out as plain values; the emails and the
// sheet add the $ and % themselves.

import type { MealPrepInputs, MealPrepResults } from './mealPrepModel';

export const CALCULATOR_SOURCE = 'Meal Prep Calculator';

export interface CalculatorContact {
  name: string;
  email: string;
  emailMarketingConsent: boolean;
  consentText: string;
  /** When the form was sent, as an ISO string. Only recorded if consent was given. */
  submittedAt: string;
}

const money = (n: number) => Math.round(n * 100) / 100;
const pct = (n: number | null) => (n === null ? null : Math.round(n * 10) / 10);

export function buildCalculatorSubmission(
  contact: CalculatorContact,
  inputs: MealPrepInputs,
  results: MealPrepResults,
) {
  return {
    name: contact.name.trim(),
    email: contact.email.trim(),
    source: CALCULATOR_SOURCE,
    email_marketing_consent: contact.emailMarketingConsent,
    marketing_consent_text: contact.consentText,
    marketing_consent_timestamp: contact.emailMarketingConsent ? contact.submittedAt : '',

    meals_per_week: inputs.mealsPerWeek,
    price_per_meal: money(inputs.pricePerMeal),
    food_cost_per_meal: money(inputs.foodCostPerMeal),
    packaging_per_meal: money(inputs.packagingPerMeal),
    kitchen_cost_monthly: money(inputs.kitchenCostMonthly),
    delivery_share: inputs.deliverySharePct,
    delivery_cost_per_drop: money(inputs.deliveryCostPerDrop),
    meals_per_order: inputs.mealsPerOrder,
    spoilage_pct: inputs.spoilagePct,
    owner_hours_per_week: inputs.ownerHoursPerWeek,
    owner_hourly_target: money(inputs.ownerHourlyTarget),
    sourcing: inputs.sourcing === 'local' ? 'Local' : 'Broadline',

    food_cost_pct: pct(results.foodCostPct),
    prime_cost_pct: pct(results.primeCostPct),
    contribution_margin: money(results.contributionMargin),
    // null (a blank cell) when no volume breaks even at these prices.
    break_even_meals: results.breakEvenMeals,
    monthly_revenue: money(results.monthlyRevenue),
    monthly_profit: money(results.monthlyProfit),
  };
}
