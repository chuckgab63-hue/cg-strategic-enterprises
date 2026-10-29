// Starting the Website Check from elsewhere on the site (the homepage section,
// src/components/HomeWebsiteCheck.tsx): a light check of what the visitor
// typed, and the /website-check?url= link that pre-fills the form. The real
// validation happens on the server (url.ts) when the check runs.

/** The query parameter /website-check reads to pre-fill the website field. */
export const WEBSITE_CHECK_URL_PARAM = 'url';

const MAX_LENGTH = 2048;

/**
 * The address as typed, trimmed, if it looks like a website: an optional
 * http:// or https://, then a host with at least one dot. Null for anything
 * empty, with spaces, or without a dot ("mysite").
 */
export function cleanWebsiteInput(raw: string): string | null {
  const value = raw.trim();
  if (!value || value.length > MAX_LENGTH || /\s/.test(value)) return null;
  const host = value.replace(/^https?:\/\//i, '').split(/[/?#]/)[0];
  return /^[^.:@]+(\.[^.:@]+)+(:\d+)?$/.test(host) ? value : null;
}

/** The /website-check path (without any /es prefix) that pre-fills this address. */
export function websiteCheckPath(website: string): string {
  return `/website-check?${new URLSearchParams({ [WEBSITE_CHECK_URL_PARAM]: website })}`;
}

/** The pre-fill value from /website-check's query string, or '' if there's none worth using. */
export function prefillFromSearch(params: URLSearchParams): string {
  return cleanWebsiteInput(params.get(WEBSITE_CHECK_URL_PARAM) ?? '') ?? '';
}
