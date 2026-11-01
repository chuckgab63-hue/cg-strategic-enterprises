// BreadcrumbList structured data for the pages that show a breadcrumb trail
// (the meal-prep feature pages). Plain TypeScript, no React.

import { SITE_URL } from '../config/site.ts';
import { localizePath, type Lang } from './lang.ts';

export interface Crumb {
  name: string;
  /** The English site path; the language's own path is worked out here. */
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: SITE_URL + localizePath(crumb.path, lang),
    })),
  };
}

/** BreadcrumbList JSON-LD as text that's safe inside a <script> element. */
export function breadcrumbJsonLdText(crumbs: Crumb[], lang: Lang): string {
  return JSON.stringify(breadcrumbJsonLd(crumbs, lang)).replace(/</g, '\\u003c');
}
