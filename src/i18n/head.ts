// What goes in <head> for a given URL: language, title, description,
// canonical, hreflang alternates, robots and Open Graph. Used by SeoHead in
// the browser and by vite.config.ts when it pre-renders each page, so the two
// can't drift apart. Plain TypeScript, no React.

import { SITE_URL, LEGAL_BUSINESS_NAME } from '../config/site.ts';
import { LOCALE, SPANISH_PUBLIC, langFromPath, localizePath, stripLang, type Lang } from './lang.ts';
import { NOT_FOUND_META, findRoute, routeLangs } from './meta.ts';

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
  og?: { type: string; url: string; title: string; description: string; image: string; imageWidth: number; imageHeight: number; imageAlt: string; locale: string; siteName: string;
    /** Only the video watch pages: the file itself, so a share card can play it. */
    video?: { url: string; type: string; width: number; height: number } };
}

const absolute = (path: string) => SITE_URL + path;

/** Unlisted page that turns analytics off for the owner's browser (src/pages/IgnoreMe.tsx). */
export const ANALYTICS_OPTOUT_PATH = '/analytics-optout';
/** Its older address, kept working. */
export const IGNORE_ME_PATH = '/ignore-me';

export function headFor(pathname: string): HeadData {
  const lang = langFromPath(pathname);
  // Unlisted owner page: a real title, but noindex and no canonical.
  const bare = pathname.replace(/\/+$/, '');
  if (bare === ANALYTICS_OPTOUT_PATH || bare === IGNORE_ME_PATH) {
    return { lang: 'en', htmlLang: 'en', title: 'Analytics opt-out', description: '', alternates: [], noindex: true };
  }
  const route = findRoute(stripLang(pathname));
  // A route can exist in English only (a clip with no Spanish recording). Its
  // /es/ URL is not a page: no canonical, no alternates, noindex.
  if (route && !routeLangs(route).includes(lang)) {
    return { lang, htmlLang: lang, ...NOT_FOUND_META[lang], alternates: [], noindex: true };
  }
  if (!route) {
    return { lang, htmlLang: lang, ...NOT_FOUND_META[lang], alternates: [], noindex: true };
  }

  const { title, description } = route.meta[lang];
  const canonical = absolute(localizePath(route.path, lang));
  // While Spanish is hidden, don't point search engines at it.
  // Only the languages this route exists in: a page with no Spanish twin
  // advertises no Spanish alternate, and gets no x-default pair either.
  const langs = routeLangs(route);
  const alternates = SPANISH_PUBLIC && langs.length > 1
    ? [
        ...langs.map(l => ({ hreflang: l, href: absolute(localizePath(route.path, l)) })),
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
      image: absolute(typeof route.og.image === 'string' ? route.og.image : route.og.image[lang]),
      imageWidth: route.og.width,
      imageHeight: route.og.height,
      imageAlt: route.og.alt[lang],
      locale: LOCALE[lang].replace('-', '_'),
      siteName: LEGAL_BUSINESS_NAME,
      video: route.og.video && { ...route.og.video, url: absolute(route.og.video.path) },
    },
  };
}
