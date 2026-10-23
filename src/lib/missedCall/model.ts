// Missed-call cost calculator: the arithmetic behind /missed-call-calculator.
// Every number comes from the visitor's own inputs; nothing here is an
// industry statistic. The defaults are example numbers the page labels as such.
// model.test.ts covers the worked example, the 0% cases and recurring customers.

export interface MissedCallInputs {
  callsPerWeek: number;
  /** Share of calls that go unanswered (after hours, on a job, on another line), 0–100. */
  missedPct: number;
  /** Share of missed callers who don't try again, 0–100. */
  noCallbackPct: number;
  /** Share of answered callers who become customers, 0–100. */
  conversionPct: number;
  /** Average value of a new customer, in dollars. */
  customerValue: number;
  /** Customers come back for recurring service. */
  recurring: boolean;
  visitsPerYear: number;
  yearsRetained: number;
}

export const DEFAULT_INPUTS: MissedCallInputs = {
  callsPerWeek: 40,
  missedPct: 20,
  noCallbackPct: 60,
  conversionPct: 30,
  customerValue: 250,
  recurring: false,
  visitsPerYear: 4,
  yearsRetained: 2,
};

/** Average weeks in a month (52 / 12, rounded as the page shows it). */
export const WEEKS_PER_MONTH = 4.33;

export interface MissedCallResults {
  missedPerWeek: number;
  lostCallersPerWeek: number;
  lostCustomersPerMonth: number;
  /** 1 unless recurring is on; then visits per year × years retained. */
  lifetimeFactor: number;
  /** Value of one lost customer: average value × lifetime factor. */
  valuePerCustomer: number;
  lostRevenuePerMonth: number;
  lostRevenuePerYear: number;
}

/** A count or amount: anything negative, blank or not a number counts as 0. */
const amount = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
/** A percentage as a fraction, kept within 0–100%. */
const share = (pct: number) => Math.min(amount(pct), 100) / 100;

export function calculateMissedCalls(inputs: MissedCallInputs): MissedCallResults {
  const missedPerWeek = amount(inputs.callsPerWeek) * share(inputs.missedPct);
  const lostCallersPerWeek = missedPerWeek * share(inputs.noCallbackPct);
  const lostCustomersPerMonth = lostCallersPerWeek * share(inputs.conversionPct) * WEEKS_PER_MONTH;
  const lifetimeFactor = inputs.recurring ? amount(inputs.visitsPerYear) * amount(inputs.yearsRetained) : 1;
  const valuePerCustomer = amount(inputs.customerValue) * lifetimeFactor;
  const lostRevenuePerMonth = lostCustomersPerMonth * valuePerCustomer;
  return {
    missedPerWeek,
    lostCallersPerWeek,
    lostCustomersPerMonth,
    lifetimeFactor,
    valuePerCustomer,
    lostRevenuePerMonth,
    lostRevenuePerYear: lostRevenuePerMonth * 12,
  };
}
