// The company's profiles elsewhere. One list, so the footer links, the /contact
// line and the sameAs in the Organization and LocalBusiness JSON-LD can never
// disagree about where we are. Plain TypeScript, no React, so vite.config.ts can
// import it for the structured data it injects at build time.
//
// LinkedIn is the founder's own profile for now; a company page replaces it when
// there is one. That matters for the markup as well as the link: a founder's
// profile belongs on a Person's sameAs, a company page on the Organization's.
// Until the company page exists this URL is the only LinkedIn presence there is,
// so it stands in for the organization. Nothing on the site marks the founder up
// as a Person yet; if that is ever added, its sameAs takes this same URL.

export interface SocialProfile {
  /** Matches a key in common.ts's `social` block, which holds the labels. */
  key: 'facebook' | 'linkedin';
  url: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  { key: 'facebook', url: 'https://www.facebook.com/cgstrategic' },
  { key: 'linkedin', url: 'https://www.linkedin.com/in/chuckgabbard' },
];

/**
 * Every profile URL, for schema.org sameAs. Add a Google Business Profile or any
 * other claimed listing here and it joins the markup everywhere at once.
 */
export const SOCIAL_SAME_AS: string[] = SOCIAL_PROFILES.map(p => p.url);
