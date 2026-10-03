// The arithmetic behind the meal-prep planning calculator (/meal-prep-calculator).
// Pure functions only — no React — so every number on the page can be unit
// tested in mealPrepModel.test.ts. Percentages are 0–100 throughout, matching
// what the page shows and what the Make.com scenario expects.

export type Sourcing = 'broadline' | 'local';

export interface MealPrepInputs {
  mealsPerWeek: number;
  pricePerMeal: number;
  /** Ingredient cost per meal at broadline (distributor) prices. */
  foodCostPerMeal: number;
  packagingPerMeal: number;
  kitchenCostMonthly: number;
  /** Share of orders delivered rather than picked up, 0–100. */
  deliverySharePct: number;
  deliveryCostPerDrop: number;
  /** Meals in a typical order. Delivery and the $0.30 card fee are charged per order, not per meal. */
  mealsPerOrder: number;
  ownerHoursPerWeek: number;
  ownerHourlyTarget: number;
  /** Food bought but never sold: trim, over-production, unsold meals. 0–100. */
  spoilagePct: number;
  sourcing: Sourcing;
}

export const WEEKS_PER_MONTH = 52 / 12;
export const PROCESSING_RATE = 0.029;
export const PROCESSING_FEE_PER_ORDER = 0.3;
/**
 * Uplift applied to food cost when sourcing locally. Local protein and produce
 * run meaningfully higher than broadline; 25% is our planning assumption, not
 * a published benchmark, and the page says so.
 */
export const LOCAL_SOURCING_PREMIUM = 0.25;
/** The kitchen-shift example on the page: four hours at $25/hour. */
export const EXAMPLE_SHIFT_COST = 100;

// Industry ranges to measure against, not targets to price to.
export const BENCHMARKS = {
  foodCost: { low: 28, high: 35 },
  foodCostTiers: [
    { label: 'Budget', low: 25, high: 28 },
    { label: 'Standard', low: 28, high: 32 },
    { label: 'Premium / organic', low: 35, high: 40 },
  ],
  primeCost: { max: 65, target: 60 },
  labour: { low: 25, high: 35 },
  netMargin: { low: 10, high: 20 },
  trueCogsWarning: 55,
} as const;

export interface MealPrepResults {
  /** Food cost per meal after sourcing premium and spoilage. */
  foodCostPerMeal: number;
  packagingPerMeal: number;
  deliveryPerMeal: number;
  processingPerMeal: number;
  variableCostPerMeal: number;
  /** What each meal leaves over after its own costs, toward the kitchen and your pay. */
  contributionMargin: number;
  kitchenCostWeekly: number;
  ownerPayWeekly: number;
  /** Meals per week to cover the kitchen alone. null when no volume ever covers it. */
  breakEvenKitchenOnly: number | null;
  /** Meals per week to cover the kitchen and pay yourself. null when no volume ever covers it. */
  breakEvenMeals: number | null;
  foodCostPct: number | null;
  labourPct: number | null;
  primeCostPct: number | null;
  /** What the grocery receipt suggests: food (before spoilage) plus packaging, over price. */
  receiptCogsPct: number | null;
  /** Food, spoilage, packaging, delivery and labour as a share of revenue. */
  trueCogsPct: number | null;
  netMarginPct: number | null;
  weeklyRevenue: number;
  monthlyRevenue: number;
  weeklyProfit: number;
  /** Profit after the kitchen, every per-meal cost, and paying yourself your target rate. */
  monthlyProfit: number;
  /** What's actually left for you each month if you don't pay yourself first. */
  ownerTakeHomeMonthly: number;
  /** ownerTakeHome spread over your hours. null when hours are zero. */
  ownerEffectiveHourly: number | null;
}

const clampPct = (pct: number) => Math.min(100, Math.max(0, pct));
const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const pctOf = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : null);

/**
 * Smallest whole number of meals per week whose contribution covers `fixedWeekly`.
 * null when each meal loses money (or breaks exactly even), because then no
 * volume ever covers a fixed cost.
 */
export function breakEvenVolume(fixedWeekly: number, contributionMargin: number): number | null {
  if (fixedWeekly <= 0) return 0;
  if (contributionMargin <= 0) return null;
  // Round away float noise first so 100 / 8.3333… lands on 12, not 13.
  return Math.ceil(Number((fixedWeekly / contributionMargin).toFixed(9)));
}

export function calculate(raw: MealPrepInputs): MealPrepResults {
  const meals = nonNegative(raw.mealsPerWeek);
  const price = nonNegative(raw.pricePerMeal);
  const mealsPerOrder = Math.max(1, nonNegative(raw.mealsPerOrder));
  const deliveryShare = clampPct(nonNegative(raw.deliverySharePct)) / 100;
  const spoilage = clampPct(nonNegative(raw.spoilagePct)) / 100;
  const sourcingMultiplier = raw.sourcing === 'local' ? 1 + LOCAL_SOURCING_PREMIUM : 1;

  const purchasedFoodPerMeal = nonNegative(raw.foodCostPerMeal) * sourcingMultiplier;
  const foodCostPerMeal = purchasedFoodPerMeal * (1 + spoilage);
  const packagingPerMeal = nonNegative(raw.packagingPerMeal);
  const deliveryPerMeal = (deliveryShare * nonNegative(raw.deliveryCostPerDrop)) / mealsPerOrder;
  const processingPerMeal = price * PROCESSING_RATE + PROCESSING_FEE_PER_ORDER / mealsPerOrder;
  const variableCostPerMeal = foodCostPerMeal + packagingPerMeal + deliveryPerMeal + processingPerMeal;
  const contributionMargin = price - variableCostPerMeal;

  const kitchenCostWeekly = nonNegative(raw.kitchenCostMonthly) / WEEKS_PER_MONTH;
  const ownerPayWeekly = nonNegative(raw.ownerHoursPerWeek) * nonNegative(raw.ownerHourlyTarget);

  const weeklyRevenue = meals * price;
  const weeklyFood = meals * foodCostPerMeal;
  const weeklyProfit = meals * contributionMargin - kitchenCostWeekly - ownerPayWeekly;
  const trueCogsWeekly = meals * (foodCostPerMeal + packagingPerMeal + deliveryPerMeal) + ownerPayWeekly;

  const monthlyProfit = weeklyProfit * WEEKS_PER_MONTH;
  const ownerTakeHomeMonthly = (weeklyProfit + ownerPayWeekly) * WEEKS_PER_MONTH;
  const ownerHours = nonNegative(raw.ownerHoursPerWeek);

  return {
    foodCostPerMeal,
    packagingPerMeal,
    deliveryPerMeal,
    processingPerMeal,
    variableCostPerMeal,
    contributionMargin,
    kitchenCostWeekly,
    ownerPayWeekly,
    breakEvenKitchenOnly: breakEvenVolume(kitchenCostWeekly, contributionMargin),
    breakEvenMeals: breakEvenVolume(kitchenCostWeekly + ownerPayWeekly, contributionMargin),
    // Food cost % is a per-meal ratio, so it still means something at zero volume.
    foodCostPct: pctOf(foodCostPerMeal, price),
    labourPct: pctOf(ownerPayWeekly, weeklyRevenue),
    primeCostPct: pctOf(weeklyFood + ownerPayWeekly, weeklyRevenue),
    receiptCogsPct: pctOf(purchasedFoodPerMeal + packagingPerMeal, price),
    trueCogsPct: pctOf(trueCogsWeekly, weeklyRevenue),
    netMarginPct: pctOf(weeklyProfit, weeklyRevenue),
    weeklyRevenue,
    monthlyRevenue: weeklyRevenue * WEEKS_PER_MONTH,
    weeklyProfit,
    monthlyProfit,
    ownerTakeHomeMonthly,
    ownerEffectiveHourly: ownerHours > 0 ? (weeklyProfit + ownerPayWeekly) / ownerHours : null,
  };
}

export type RangePosition = 'below' | 'within' | 'above';

export function compareToRange(value: number, low: number, high: number): RangePosition {
  if (value < low) return 'below';
  if (value > high) return 'above';
  return 'within';
}

/**
 * The food-cost tier a percentage falls in, or null when it's between or outside
 * tiers. A shared edge (28%) goes to the higher tier.
 */
export function foodCostTier(pct: number): string | null {
  return BENCHMARKS.foodCostTiers.findLast(t => pct >= t.low && pct <= t.high)?.label ?? null;
}
