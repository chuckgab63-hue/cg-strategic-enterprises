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

export const DM_RESCUE_PATH = '/dm-rescue';

/**
 * The self-serve app: where "Start free trial" goes.
 *
 * One constant for the whole site. At go-live this becomes
 * https://app.cgstrategic.dev and nothing else changes — see
 * docs/GO-LIVE-CHECKLIST.md in the dm-rescue-app repo, which lists this as
 * one of the URLs to move. Until then it is the Vercel domain, which is where
 * the app actually answers, because a trial button that 404s is worse than one
 * on a domain we have not branded yet.
 */
export const DM_RESCUE_APP_URL = 'https://dm-rescue-app.vercel.app';

/**
 * What DM Rescue includes, in the order the page lists it. Same shape as the
 * missed-call offer above: the keys are the contract, and src/i18n/dmRescue.ts
 * is a Record over them, so an item added here fails the build until both
 * languages describe it.
 *
 * These are the features, not the plan. Both ways of buying DM Rescue — the
 * self-serve app and the done-for-you install — deliver all six.
 */
export type DmInclusionKey =
  | 'autoReply'
  | 'keywords'
  | 'commentToDm'
  | 'textAlert'
  | 'oncePerConversation'
  | 'existingAccounts';

/**
 * DM Rescue, which can now be bought two ways.
 *
 * **Self-serve** (`trialDays`, `fromMonthlyPrice`): the customer signs up at
 * DM_RESCUE_APP_URL, connects their own Instagram and writes their own
 * replies. This is what the page leads with.
 *
 * **Done-for-you** (`doneForYouSetupPrice`, `doneForYouMonthlyPrice`,
 * `liveInBusinessDays`): we build it with them. Unchanged, and still what the
 * Rescue Bundle below is made of, because the bundle is two done-for-you
 * installs on one invoice.
 *
 * `fromMonthlyPrice` is the only figure on this site that is also a figure in
 * Stripe. The app itself never prints a price — it reads STRIPE_PRICE_ID — so
 * nothing downstream catches a mismatch. If the live plan price changes, this
 * is the line to change, and "Plans from $97/mo" follows everywhere.
 */
export const DM_RESCUE = {
  /** Free trial length, in days. Matches TRIAL_DAYS in the app. */
  trialDays: 7,
  /** The headline figure: "Plans from $97/mo". Must match the live Stripe price. */
  fromMonthlyPrice: 97,
  /** Done-for-you: one-time setup fee, in OFFER_CURRENCY. */
  doneForYouSetupPrice: 397,
  /** Done-for-you: then this much a month, month to month, cancel anytime. */
  doneForYouMonthlyPrice: 129,
  /** Done-for-you: usually live within this many business days of the kickoff call. */
  liveInBusinessDays: 3,
  inclusions: [
    'autoReply',
    'keywords',
    'commentToDm',
    'textAlert',
    'oncePerConversation',
    'existingAccounts',
  ] as DmInclusionKey[],
} as const;

/**
 * The signup link, tagged like every other outbound link on the site so a
 * trial can be attributed to the page and placement that sent it.
 *
 * The app ignores unknown query parameters, so these ride along harmlessly
 * and show up in its logs and in Vercel analytics.
 */
export function dmRescueSignupUrl(placement: string, medium = 'offer', source = 'site'): string {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_content: placement,
    utm_campaign: 'dm-rescue-self-serve',
  });
  return `${DM_RESCUE_APP_URL}/signup?${params.toString()}`;
}

export const RESCUE_BUNDLE_PATH = '/missed-call-rescue';

/** The anchor the bundle card carries, on whichever offer page shows it. */
export const RESCUE_BUNDLE_ANCHOR = 'rescue-bundle';

/**
 * Missed-Call Rescue and DM Rescue bought together: the phone and the inbox
 * on one invoice. Both done-for-you — the bundle is not a self-serve plan, so
 * it compares against the done-for-you figures above and is unaffected by the
 * self-serve price.
 *
 * The two prices are a decision, so they are typed. Everything the card
 * compares them against is arithmetic, so it is derived here and nowhere
 * else — change either offer's price above and the struck-through totals and
 * both savings follow, in both languages, on every page that shows them.
 * That is the whole reason this block exists rather than four more numbers in
 * the copy files.
 */
const SEPARATE_SETUP = MISSED_CALL_RESCUE.setupPrice + DM_RESCUE.doneForYouSetupPrice;
const SEPARATE_MONTHLY = MISSED_CALL_RESCUE.monthlyPrice + DM_RESCUE.doneForYouMonthlyPrice;

export const RESCUE_BUNDLE = {
  /** One-time setup fee for both, in OFFER_CURRENCY. */
  setupPrice: 697,
  /** Then this much a month for both, month to month, cancel anytime. */
  monthlyPrice: 199,
  /** The same two offers bought apart. Derived: never type this. */
  separateSetupPrice: SEPARATE_SETUP,
  separateMonthlyPrice: SEPARATE_MONTHLY,
  /** What the bundle takes off each figure. Derived, so it cannot drift. */
  setupSaving: SEPARATE_SETUP - 697,
  monthlySaving: SEPARATE_MONTHLY - 199,
} as const;

/** utm_campaign on every booking link from the bundle card. */
export const RESCUE_BUNDLE_CAMPAIGN = 'rescue-bundle';
