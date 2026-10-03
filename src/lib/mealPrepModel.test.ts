import { describe, it, expect } from 'vitest';
import {
  calculate, breakEvenVolume, compareToRange, foodCostTier,
  WEEKS_PER_MONTH, LOCAL_SOURCING_PREMIUM, type MealPrepInputs,
} from './mealPrepModel';

// A deliberately simple plan so the expected numbers can be worked by hand:
// pickup only, one meal per order, no spoilage, no packaging.
const SIMPLE: MealPrepInputs = {
  mealsPerWeek: 50,
  pricePerMeal: 10,
  foodCostPerMeal: 3,
  packagingPerMeal: 0,
  kitchenCostMonthly: 0,
  deliverySharePct: 0,
  deliveryCostPerDrop: 6,
  mealsPerOrder: 1,
  ownerHoursPerWeek: 0,
  ownerHourlyTarget: 0,
  spoilagePct: 0,
  sourcing: 'broadline',
};

const plan = (overrides: Partial<MealPrepInputs>) => calculate({ ...SIMPLE, ...overrides });

describe('breakEvenVolume', () => {
  it('rounds up to whole meals', () => {
    expect(breakEvenVolume(100, 8)).toBe(13); // 12.5 meals isn't enough
    expect(breakEvenVolume(100, 10)).toBe(10);
  });

  it('does not round up float noise on an exact division', () => {
    // 100 / (100 / 12) is 12.000000000000002 in floating point.
    expect(breakEvenVolume(100, 100 / 12)).toBe(12);
  });

  it('is zero when there are no fixed costs', () => {
    expect(breakEvenVolume(0, 5)).toBe(0);
    expect(breakEvenVolume(0, -5)).toBe(0);
  });

  it('is null when each meal loses money or exactly breaks even', () => {
    expect(breakEvenVolume(100, -1)).toBeNull();
    expect(breakEvenVolume(100, 0)).toBeNull();
  });
});

describe('the kitchen-shift insight', () => {
  it('a $12 meal needs about 12 meals a week to cover a $100 four-hour kitchen shift', () => {
    const r = plan({
      pricePerMeal: 12,
      foodCostPerMeal: 2.7,
      packagingPerMeal: 0.5,
      mealsPerOrder: 4,
      kitchenCostMonthly: 100 * WEEKS_PER_MONTH,
    });
    // 12 − 2.70 food − 0.50 packaging − (0.348 + 0.075) processing = 8.377
    expect(r.contributionMargin).toBeCloseTo(8.377, 3);
    expect(r.kitchenCostWeekly).toBeCloseTo(100, 9);
    expect(r.breakEvenKitchenOnly).toBe(12);
  });
});

describe('contribution margin and break-even', () => {
  it('subtracts food, packaging, delivery and card processing per meal', () => {
    const r = plan({ packagingPerMeal: 0.5, deliverySharePct: 50, deliveryCostPerDrop: 6, mealsPerOrder: 3 });
    expect(r.deliveryPerMeal).toBeCloseTo(1, 9); // half of orders × $6 ÷ 3 meals
    expect(r.processingPerMeal).toBeCloseTo(0.29 + 0.1, 9); // 2.9% of $10 + $0.30 ÷ 3
    expect(r.variableCostPerMeal).toBeCloseTo(3 + 0.5 + 1 + 0.39, 9);
    expect(r.contributionMargin).toBeCloseTo(10 - 4.89, 9);
  });

  it('separates covering the kitchen from also paying yourself', () => {
    // CM = 10 − 3 − 0.59 = 6.41. Kitchen $300/wk; owner 10 h × $20 = $200/wk.
    const r = plan({ kitchenCostMonthly: 300 * WEEKS_PER_MONTH, ownerHoursPerWeek: 10, ownerHourlyTarget: 20 });
    expect(r.contributionMargin).toBeCloseTo(6.41, 9);
    expect(r.breakEvenKitchenOnly).toBe(Math.ceil(300 / 6.41)); // 47
    expect(r.breakEvenMeals).toBe(Math.ceil(500 / 6.41)); // 79
  });

  it('weekly profit is zero-or-better at break-even and negative one meal below it', () => {
    const base = { kitchenCostMonthly: 600, ownerHoursPerWeek: 15, ownerHourlyTarget: 18 };
    const be = plan(base).breakEvenMeals!;
    expect(plan({ ...base, mealsPerWeek: be }).weeklyProfit).toBeGreaterThanOrEqual(0);
    expect(plan({ ...base, mealsPerWeek: be - 1 }).weeklyProfit).toBeLessThan(0);
  });

  it('turns weekly figures into monthly ones at 52/12 weeks a month', () => {
    const r = plan({ kitchenCostMonthly: 433 });
    expect(r.monthlyRevenue).toBeCloseTo(500 * 52 / 12, 9);
    expect(r.monthlyProfit).toBeCloseTo((50 * 6.41) * 52 / 12 - 433, 9);
  });

  it('reports what the owner actually takes home and the hourly rate that works out to', () => {
    const r = plan({ ownerHoursPerWeek: 10, ownerHourlyTarget: 20 });
    // 50 meals × 6.41 = 320.50/wk before paying the owner, over 10 hours.
    expect(r.ownerEffectiveHourly).toBeCloseTo(32.05, 9);
    expect(r.ownerTakeHomeMonthly).toBeCloseTo(320.5 * WEEKS_PER_MONTH, 9);
    expect(r.monthlyProfit).toBeCloseTo((320.5 - 200) * WEEKS_PER_MONTH, 9);
  });
});

describe('percentages', () => {
  it('food cost % is food cost over menu price', () => {
    expect(plan({}).foodCostPct).toBeCloseTo(30, 9);
  });

  it('food + packaging % adds packaging to the same food figure, over menu price', () => {
    // (3 × 1.05 spoilage + 0.60) / 10
    expect(plan({ packagingPerMeal: 0.6, spoilagePct: 5 }).foodPackagingPct).toBeCloseTo(37.5, 9);
    expect(plan({ pricePerMeal: 0 }).foodPackagingPct).toBeNull();
  });

  it('prime cost % is food plus labour over revenue', () => {
    // Food $150 + labour $100 over $500 revenue.
    const r = plan({ ownerHoursPerWeek: 5, ownerHourlyTarget: 20 });
    expect(r.labourPct).toBeCloseTo(20, 9);
    expect(r.primeCostPct).toBeCloseTo(50, 9);
  });

  it('true COGS adds packaging, delivery and labour to food, and spoilage inflates food', () => {
    const r = plan({
      packagingPerMeal: 1, deliverySharePct: 100, deliveryCostPerDrop: 5, mealsPerOrder: 5,
      ownerHoursPerWeek: 5, ownerHourlyTarget: 20, spoilagePct: 10,
    });
    // Per meal: food 3.30 + packaging 1 + delivery 1, ×50 = 265, plus labour 100, over 500.
    expect(r.foodCostPerMeal).toBeCloseTo(3.3, 9);
    expect(r.trueCogsPct).toBeCloseTo(73, 9);
    // The receipt view sees only food as bought plus packaging: (3 + 1) / 10.
    expect(r.receiptCogsPct).toBeCloseTo(40, 9);
  });

  it('net margin % is weekly profit over weekly revenue', () => {
    expect(plan({}).netMarginPct).toBeCloseTo(64.1, 9); // 6.41 of every 10
  });

  it('local sourcing raises food cost by the stated premium', () => {
    const r = plan({ sourcing: 'local' });
    expect(r.foodCostPerMeal).toBeCloseTo(3 * (1 + LOCAL_SOURCING_PREMIUM), 9);
    expect(r.foodCostPct).toBeCloseTo(30 * (1 + LOCAL_SOURCING_PREMIUM), 9);
  });
});

describe('edge cases', () => {
  it('zero volume: no revenue, revenue-based percentages are null, fixed costs still bite', () => {
    const r = plan({ mealsPerWeek: 0, kitchenCostMonthly: 500, ownerHoursPerWeek: 10, ownerHourlyTarget: 20 });
    expect(r.weeklyRevenue).toBe(0);
    expect(r.monthlyRevenue).toBe(0);
    expect(r.primeCostPct).toBeNull();
    expect(r.labourPct).toBeNull();
    expect(r.trueCogsPct).toBeNull();
    expect(r.netMarginPct).toBeNull();
    expect(r.foodCostPct).toBeCloseTo(30, 9); // per-meal ratio, still meaningful
    expect(r.monthlyProfit).toBeCloseTo(-500 - 200 * WEEKS_PER_MONTH, 9);
    expect(r.breakEvenMeals).toBe(Math.ceil((500 / WEEKS_PER_MONTH + 200) / 6.41));
  });

  it('price below food cost: negative contribution, food cost over 100%, never breaks even', () => {
    const r = plan({ pricePerMeal: 4, foodCostPerMeal: 5, kitchenCostMonthly: 400 });
    expect(r.contributionMargin).toBeLessThan(0);
    expect(r.foodCostPct).toBeCloseTo(125, 9);
    expect(r.breakEvenKitchenOnly).toBeNull();
    expect(r.breakEvenMeals).toBeNull();
    // Selling more only loses more.
    expect(plan({ pricePerMeal: 4, foodCostPerMeal: 5, mealsPerWeek: 100 }).weeklyProfit)
      .toBeLessThan(plan({ pricePerMeal: 4, foodCostPerMeal: 5, mealsPerWeek: 50 }).weeklyProfit);
  });

  it('price above food cost but below all variable costs still never breaks even', () => {
    // $5 meal, $3 food, $2.50 delivered one-meal orders: CM = 5 − 3 − 2.5 − 0.445 < 0.
    const r = plan({ pricePerMeal: 5, deliverySharePct: 100, deliveryCostPerDrop: 2.5, kitchenCostMonthly: 100 });
    expect(r.contributionMargin).toBeLessThan(0);
    expect(r.breakEvenMeals).toBeNull();
  });

  it('100% delivery charges every order a drop', () => {
    const r = plan({ deliverySharePct: 100, deliveryCostPerDrop: 8, mealsPerOrder: 4 });
    expect(r.deliveryPerMeal).toBeCloseTo(2, 9);
  });

  it('clamps delivery share and spoilage to 0–100%', () => {
    expect(plan({ deliverySharePct: 150, deliveryCostPerDrop: 6 }).deliveryPerMeal).toBeCloseTo(6, 9);
    expect(plan({ deliverySharePct: -20 }).deliveryPerMeal).toBe(0);
    expect(plan({ spoilagePct: 250 }).foodCostPerMeal).toBeCloseTo(6, 9);
  });

  it('treats fewer than one meal per order as one', () => {
    expect(plan({ mealsPerOrder: 0 }).processingPerMeal).toBeCloseTo(0.29 + 0.3, 9);
  });

  it('zero price: per-meal percentages are null rather than infinite', () => {
    expect(plan({ pricePerMeal: 0 }).foodCostPct).toBeNull();
    expect(plan({ pricePerMeal: 0 }).receiptCogsPct).toBeNull();
  });

  it('treats blank or negative entries as zero', () => {
    const r = plan({ mealsPerWeek: Number.NaN, foodCostPerMeal: -3, kitchenCostMonthly: Number.NaN });
    expect(r.weeklyRevenue).toBe(0);
    expect(r.foodCostPerMeal).toBe(0);
    expect(r.kitchenCostWeekly).toBe(0);
  });

  it('effective hourly is null with no hours entered', () => {
    expect(plan({ ownerHoursPerWeek: 0 }).ownerEffectiveHourly).toBeNull();
  });
});

describe('benchmarks', () => {
  it('compares a value to a range', () => {
    expect(compareToRange(27.9, 28, 35)).toBe('below');
    expect(compareToRange(28, 28, 35)).toBe('within');
    expect(compareToRange(35, 28, 35)).toBe('within');
    expect(compareToRange(35.1, 28, 35)).toBe('above');
  });

  it('names the food-cost tier, giving a shared edge to the higher tier', () => {
    expect(foodCostTier(26)).toBe('Budget');
    expect(foodCostTier(28)).toBe('Standard');
    expect(foodCostTier(30)).toBe('Standard');
    expect(foodCostTier(33)).toBeNull(); // between standard and premium
    expect(foodCostTier(38)).toBe('Premium / organic');
    expect(foodCostTier(45)).toBeNull();
  });
});
