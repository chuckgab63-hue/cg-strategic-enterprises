// The company's profiles elsewhere. One list, so the footer links, the /contact
// line and the sameAs in the Organization and LocalBusiness JSON-LD can never
// disagree about where we are. Plain TypeScript, no React, so vite.config.ts can
// import it for the structured data it injects at build time.
//
// LinkedIn is the founder's own profile for now; a company page replaces it when
// there is one. That matters for the markup as well as the link: a founder's
// profile belongs on a Person's sameAs, a company page on the Organization's.
// Until the company page exists this URL is the only LinkedIn presence there is,
// so it stands in for the organization as well as describing the Person below.
// When a company page arrives, it replaces this URL in SOCIAL_PROFILES and the
// founder's own profile moves to FOUNDER_PERSON's sameAs alone.

// .ts extension because vite.config.ts pulls this file into the node-side
// tsconfig, which resolves like Node and wants the extension spelled out.
import { FOUNDER_NAME, SITE_URL } from './site.ts';

export interface SocialProfile {
  /** Matches a key in common.ts's `social` block, which holds the labels. */
  key: 'facebook' | 'linkedin';
  url: string;
}

const FACEBOOK_URL = 'https://www.facebook.com/cgstrategic';
const FOUNDER_LINKEDIN_URL = 'https://www.linkedin.com/in/chuckgabbard';

export const SOCIAL_PROFILES: SocialProfile[] = [
  { key: 'facebook', url: FACEBOOK_URL },
  { key: 'linkedin', url: FOUNDER_LINKEDIN_URL },
];

/**
 * Every profile URL, for schema.org sameAs. Add a Google Business Profile or any
 * other claimed listing here and it joins the markup everywhere at once.
 */
export const SOCIAL_SAME_AS: string[] = SOCIAL_PROFILES.map(p => p.url);

/**
 * The founder as a schema.org Person, for the `founder` property on both the
 * site-wide Organization node and the home page's LocalBusiness. One object, so
 * the two nodes never describe them differently, and the LinkedIn URL sits on a
 * Person as well as on the organization it currently stands in for.
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
