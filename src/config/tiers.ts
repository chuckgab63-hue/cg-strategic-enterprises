// Basic / Pro / Advanced, and the feature × package matrix behind the
// comparison table, for every industry page that sells the three packages
// (/pest-control, /lawn-care).
//
// The packages themselves are the same three everywhere: the same names, the
// same promise, the same pricing presentation. Only the feature rows differ by
// industry, so those live in the industry's own config (pestPackages.ts,
// lawnPackages.ts) and are handed to src/components/TierPackages.tsx.
//
// Prices live here and only here, behind SHOW_PRICES. While that is false no
// figure reaches any page: the cards and the tables say "Pricing after a free
// 30-minute audit" instead. Flipping it to true is the only change needed to
// start showing them — and it would show them on every industry page at once,
// which is the point of having one place for it.
//
// Honesty rules (the same ones /skunkworks follows): `status` is what is true
// today, not what is nearly true. The words themselves live in one place,
// src/config/featureStatus.ts, so every page says the same thing. A feature
// moves to 'in-use' on the day a client is actually using it, and not before.
//
// Plain TypeScript with no React so config and build code can import it.
// Spanish strings in the industry configs: NEEDS NATIVE REVIEW
// (docs/SPANISH_REVIEW.md).

import type { Lang } from '../i18n/lang.ts';
import type { StatusKey } from './featureStatus.ts';

export type TierKey = 'basic' | 'pro' | 'advanced';

/** Cheapest first; the cards and the table columns follow this order. */
export const TIER_KEYS: TierKey[] = ['basic', 'pro', 'advanced'];

/** The card that carries the "Most popular" ribbon. */
export const MOST_POPULAR: TierKey = 'pro';

/**
 * No prices on any page by default. Every project is quoted after the free
 * audit, so a number here would be a guess the visitor reads as a promise.
 * Set to true only when there is a figure we are willing to be held to.
 */
export const SHOW_PRICES = false;

/**
 * Only read when SHOW_PRICES is true. Kept as numbers, not strings, so a page
 * can format them for the visitor's language when that day comes.
 */
export const TIER_PRICES: Record<TierKey, { setup: number; monthly: number }> = {
  basic: { setup: 0, monthly: 0 },
  pro: { setup: 0, monthly: 0 },
  advanced: { setup: 0, monthly: 0 },
};

export const TIER_NAME: Record<TierKey, Record<Lang, string>> = {
  basic: { en: 'Basic', es: 'Básico' },
  pro: { en: 'Pro', es: 'Pro' },
  advanced: { en: 'Advanced', es: 'Avanzado' },
};

/** The two or three words under the package name. */
export const TIER_HEADLINE: Record<TierKey, Record<Lang, string>> = {
  basic: { en: 'Get found', es: 'Que lo encuentren' },
  pro: { en: 'Answer every lead', es: 'Responda a cada cliente' },
  advanced: { en: 'Run the office', es: 'Maneje la oficina' },
};

/** One sentence on what the package is for. */
export const TIER_PROMISE: Record<TierKey, Record<Lang, string>> = {
  basic: {
    en: 'A site people find, and a lead that always reaches you.',
    es: 'Un sitio que la gente encuentra y un cliente potencial que siempre le llega.',
  },
  pro: {
    en: 'Nobody waits for the office to open.',
    es: 'Nadie espera a que abra la oficina.',
  },
  advanced: {
    en: 'The paperwork and the phone look after themselves.',
    es: 'El papeleo y el teléfono se encargan solos.',
  },
};

/**
 * What we can say about a feature today. The four words, and what each one
 * means, are defined once in src/config/featureStatus.ts.
 *
 * in-use:      a client is using it in production right now.
 * ready:       built and working in the platform; switched on for a client on
 *              the day they are ready.
 * ready-esign: the same, except switching it on needs the client's own
 *              e-signature account connected first.
 * service:     something CG Strategic runs alongside the platform rather than
 *              a feature of the platform itself.
 */
export type FeatureStatus = StatusKey;

export interface PackageFeature {
  key: string;
  /** The cheapest package that includes it; every package above it has it too. */
  tier: TierKey;
  label: Record<Lang, string>;
  /** A caveat shown under the label, in the table and the card. */
  note?: Record<Lang, string>;
  /** Left off for 'in-use'; statusOf() fills it in. */
  status?: Exclude<FeatureStatus, 'in-use'>;
}

/**
 * A feature's status, with the default spelled out. The cards show a chip only
 * for the ones that are not already in use with a client; the tables label
 * every row, so nothing there depends on the reader knowing what an absent chip
 * means.
 */
export const statusOf = (f: PackageFeature): FeatureStatus => f.status ?? 'in-use';

export interface PackageGroup {
  key: string;
  label: Record<Lang, string>;
  features: PackageFeature[];
}

const TIER_RANK: Record<TierKey, number> = { basic: 0, pro: 1, advanced: 2 };

/** Does this package include that feature? Packages are cumulative. */
export function tierHas(tier: TierKey, feature: PackageFeature): boolean {
  return TIER_RANK[tier] >= TIER_RANK[feature.tier];
}

/** Every feature in a set of groups, in table order. */
export const allFeatures = (groups: PackageGroup[]): PackageFeature[] => groups.flatMap(g => g.features);

/** The features a package adds over the one below it, in table order. */
export function featuresAddedBy(groups: PackageGroup[], tier: TierKey): PackageFeature[] {
  return allFeatures(groups).filter(f => f.tier === tier);
}
