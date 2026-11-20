// Fixed-price starter offers. One file for the numbers and the promises, so a
// price, a timeline or an inclusion changes in exactly one place and the page,
// the homepage card and the structured data all follow.
//
// Only facts here: prices, the timeline, the term, and the ordered list of what
// is included. The words a visitor reads live in src/i18n/missedCallRescue.ts,
// keyed by the inclusion keys below, and `es: typeof en` plus
// Record<InclusionKey, ...> mean a key added here fails the build until both
// languages describe it.
//
// Plain TypeScript with no React, so src/i18n/meta.ts (and through it
// vite.config.ts) can take the path from here.

import { LOCALE, type Lang } from '../i18n/lang.ts';

export const MISSED_CALL_RESCUE_PATH = '/missed-call-rescue';

/**
 * What a visitor is told they get, in the order the page lists it.
 *
 * `note: 'a2p'` marks the one inclusion that does not switch on with the rest:
 * automatic text-back waits for the business's own carrier texting
 * registration (A2P 10DLC). The page shows that note beside the item rather
 * than in fine print at the bottom, because it is the one promise with a date
 * we do not control.
 */
export type InclusionKey =
  | 'answers'
  | 'captures'
  | 'alerts'
  | 'weeklyReport'
  | 'forwarding'
  | 'textBack';

export interface Inclusion {
  key: InclusionKey;
  note?: 'a2p';
}

export const MISSED_CALL_RESCUE = {
  /** One-time setup fee, in OFFER_CURRENCY. */
  setupPrice: 497,
  /** Then this much a month, month to month, cancel anytime. */
  monthlyPrice: 149,
  /** Working days are not promised: this is calendar days from the kickoff call. */
  liveInDays: 14,
  /**
   * The setup fee is credited against a full Pest Control / Lawn Care / Meal
   * Prep package if they upgrade within this many days.
   */
  upgradeCreditDays: 90,
  /**
   * How long carrier texting registration (A2P 10DLC) usually takes, in weeks.
   * A range because it is the carriers' queue, not ours — never state it as a
   * single number, and never promise a date.
   */
  textBackApprovalWeeks: [1, 3] as const,
  inclusions: [
    { key: 'answers' },
    { key: 'captures' },
    { key: 'alerts' },
    { key: 'weeklyReport' },
    { key: 'forwarding' },
    { key: 'textBack', note: 'a2p' },
  ] as Inclusion[],
} as const;

export const OFFER_CURRENCY = 'USD';

/**
 * A price for display, in the page's language: "$497". Whole dollars, narrow
 * symbol, so both languages read the same figure the Offer JSON-LD carries.
 */
export function offerMoney(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    style: 'currency',
    currency: OFFER_CURRENCY,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}
