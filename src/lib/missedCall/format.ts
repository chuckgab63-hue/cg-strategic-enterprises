// Number formatting for the missed-call calculator, in the page language.
// Rounding happens here, for display only; the model keeps full precision.

import { LOCALE, type Lang } from '../../i18n/lang';

/** Whole dollars: "$1,559". */
export function formatMoney(n: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0, minimumFractionDigits: 0,
  }).format(Math.round(n));
}

/** Calls and customers: one decimal place, dropped when it's .0 ("4.8", "12"). */
export function formatCount(n: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 1 }).format(Math.round(n * 10) / 10);
}

/** A percentage input as typed ("20%", "12.5%"). */
export function formatPct(n: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE[lang], { style: 'percent', maximumFractionDigits: 1 }).format(n / 100);
}
