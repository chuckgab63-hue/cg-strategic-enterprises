// What goes in <head> for a given URL: language, title, description,
// canonical, hreflang alternates, robots and Open Graph. Used by SeoHead in
// the browser and by vite.config.ts when it pre-renders each page, so the two
// can't drift apart. Plain TypeScript, no React.

import { SITE_URL, LEGAL_BUSINESS_NAME } from '../config/site.ts';
import { LANGS, LOCALE, SPANISH_PUBLIC, langFromPath, localizePath, stripLang, type Lang } from './lang.ts';
import { NOT_FOUND_META, findRoute } from './meta.ts';

export interface HeadData {
  lang: Lang;
  /** <html lang>: plain "en" / "es". */
  htmlLang: string;
  title: string;
  description: string;
  /** Absent on the 404 page. */
  canonical?: string;
  alternates: { hreflang: string; href: string }[];
  noindex: boolean;
  og?: { type: string; url: string; title: string; description: string; image: string; imageWidth: number; imageHeight: number; imageAlt: string; locale: string; siteName: string };
}

const absolute = (path: string) => SITE_URL + path;

export function headFor(pathname: string): HeadData {
  const lang = langFromPath(pathname);
  const route = findRoute(stripLang(pathname));
  if (!route) {
    return { lang, htmlLang: lang, ...NOT_FOUND_META[lang], alternates: [], noindex: true };
  }

  const { title, description } = route.meta[lang];
  const canonical = absolute(localizePath(route.path, lang));
  // While Spanish is hidden, don't point search engines at it.
  const alternates = SPANISH_PUBLIC
    ? [
        ...LANGS.map(l => ({ hreflang: l, href: absolute(localizePath(route.path, l)) })),
        { hreflang: 'x-default', href: absolute(route.path) },
      ]
    : [];

  return {
    lang,
    htmlLang: lang,
    title,
    description,
    canonical,
    alternates,
    noindex: lang === 'es' && !SPANISH_PUBLIC,
    og: route.og && {
      type: route.og.type,
      url: canonical,
      title,
      description,
      image: absolute(route.og.image),
      imageWidth: route.og.width,
      imageHeight: route.og.height,
      imageAlt: route.og.alt[lang],
      locale: LOCALE[lang].replace('-', '_'),
      siteName: LEGAL_BUSINESS_NAME,
    },
  };
}
