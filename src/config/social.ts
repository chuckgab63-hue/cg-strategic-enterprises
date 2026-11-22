// The company's profiles elsewhere. One list, so the footer links, the /contact
// line and the sameAs in the Organization and LocalBusiness JSON-LD can never
// disagree about where we are. Plain TypeScript, no React, so vite.config.ts can
// import it for the structured data it injects at build time.
//
// There are two LinkedIn URLs below and they are not interchangeable. The
// company page is the organization's own profile, so it is the one in
// SOCIAL_PROFILES: it draws the footer icon and it is what belongs on the
// Organization's and LocalBusiness's sameAs. The founder's personal profile
// describes a person, not a company, so it stays on FOUNDER_PERSON's sameAs
// alone and gets no icon of its own — one "in" glyph, pointing at the company.

// .ts extension because vite.config.ts pulls this file into the node-side
// tsconfig, which resolves like Node and wants the extension spelled out.
import { FOUNDER_NAME, SITE_URL } from './site.ts';

export interface SocialProfile {
  /** Matches a key in common.ts's `social` block, which holds the labels. */
  key: 'facebook' | 'linkedin' | 'instagram' | 'google';
  url: string;
  /**
   * How the profile is shown. 'icon' is a brand glyph in the footer and on
   * /contact; 'text' is a text link on /contact only. The Google Business
   * Profile is text: its glyph is a four-colour "G" that cannot be drawn in one
   * currentColor path like the others, and a bare grey G reads as nothing.
   *
   * An 'icon' profile needs a path in SocialLinks.tsx's ICONS map, and the types
   * there say so — switch one to 'icon' without drawing it and the build fails.
   */
  display: 'icon' | 'text';
}

const FACEBOOK_URL = 'https://www.facebook.com/cgstrategic';
// cgstrategic.dev, not cgstrategic: the plain handle was already taken on
// Instagram by a dead account, so this one matches the domain instead.
const INSTAGRAM_URL = 'https://www.instagram.com/cgstrategic.dev';
/**
 * The "message this account" deep link for the same handle. ig.me is
 * Instagram's own short domain for it: on a phone it opens the Instagram app
 * straight into a new thread, and on a desktop it lands on the web inbox.
 *
 * This is the live DM Rescue demo — anyone who sends the word DEMO to the
 * account gets the automated reply back — so every "try it" button on the site
 * points here, and it lives beside the profile URL so the two can never name
 * different accounts.
 */
export const INSTAGRAM_DM_URL = 'https://ig.me/m/cgstrategic.dev';
/** The word a visitor sends to set the demo reply off. Shown in the copy, so it is data. */
export const DEMO_KEYWORD = 'DEMO';
/** The handle as it is written on the page, @ included. */
export const INSTAGRAM_HANDLE = '@cgstrategic.dev';
const LINKEDIN_COMPANY_URL = 'https://www.linkedin.com/company/cgstrategic';
// The founder's own profile. Reachable only through FOUNDER_PERSON below, never
// through SOCIAL_PROFILES: see the note at the top of this file.
const FOUNDER_LINKEDIN_URL = 'https://www.linkedin.com/in/chuckgabbard';
/**
 * The Google Business Profile, by its cid: the link Google itself hands out for
 * the listing, which survives a name or address edit as a /place/ URL would not.
 * Also the home page's hasMap, since it is the map of this business.
 */
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://www.google.com/maps?cid=6494469241290480803';

// `as const` so each entry keeps its literal key and display, which is what
// lets ICON_PROFILES below be typed down to just the keys that have glyphs.
export const SOCIAL_PROFILES = [
  { key: 'facebook', url: FACEBOOK_URL, display: 'icon' },
  { key: 'linkedin', url: LINKEDIN_COMPANY_URL, display: 'icon' },
  { key: 'instagram', url: INSTAGRAM_URL, display: 'icon' },
  { key: 'google', url: GOOGLE_BUSINESS_PROFILE_URL, display: 'text' },
] as const satisfies readonly SocialProfile[];

type Profile = (typeof SOCIAL_PROFILES)[number];

/** The profiles drawn as brand glyphs, and only those: see `display` above. */
export type IconProfile = Extract<Profile, { display: 'icon' }>;
export const ICON_PROFILES: readonly IconProfile[] =
  SOCIAL_PROFILES.filter((p): p is IconProfile => p.display === 'icon');

/** The profiles shown as a text link on /contact. */
export type TextProfile = Extract<Profile, { display: 'text' }>;
export const TEXT_PROFILES: readonly TextProfile[] =
  SOCIAL_PROFILES.filter((p): p is TextProfile => p.display === 'text');

/**
 * Every profile URL, for schema.org sameAs — including the ones with no icon,
 * because sameAs is about who we are, not about what the footer draws. Add any
 * other claimed listing to SOCIAL_PROFILES and it joins the markup everywhere
 * at once.
 */
export const SOCIAL_SAME_AS: string[] = SOCIAL_PROFILES.map(p => p.url);

/**
 * The founder as a schema.org Person, for the `founder` property on both the
 * site-wide Organization node and the home page's LocalBusiness. One object, so
 * the two nodes never describe them differently, and the founder's own LinkedIn
 * profile is attached to the person it describes rather than to the company.
 *
 * The `@id` is what makes those two mentions one person rather than two who
 * happen to share a name: a crawler that meets the same @id twice merges them.
 */
export const FOUNDER_PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#founder`,
  name: FOUNDER_NAME,
  jobTitle: 'Founder',
  sameAs: [FOUNDER_LINKEDIN_URL],
};
