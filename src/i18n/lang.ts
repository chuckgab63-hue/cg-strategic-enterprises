// Language routing for the Spanish site. English keeps its existing URLs;
// Spanish lives under /es (/es, /es/portfolio, ...). Plain TypeScript with no
// React so vite.config.ts can use it at build time.

export type Lang = 'en' | 'es';
export const LANGS: Lang[] = ['en', 'es'];

// Spanish is live. Set to false to hide it again: the header toggle then only
// shows on /es pages (or once a visitor has used it), /es pages are noindex,
// and neither hreflang links nor the sitemap mention them. The copy still
// awaits native review (see docs/SPANISH_REVIEW.md).
export const SPANISH_PUBLIC = true;

/** BCP 47 tag for <html lang>, hreflang and Intl formatting. */
export const LOCALE: Record<Lang, string> = { en: 'en-US', es: 'es-US' };

export function langFromPath(pathname: string): Lang {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

/** The English path for any path: "/es/portfolio" -> "/portfolio", "/es" -> "/". */
export function stripLang(pathname: string): string {
  if (pathname === '/es' || pathname === '/es/') return '/';
  return pathname.startsWith('/es/') ? pathname.slice(3) : pathname;
}

/** The same page in the given language: ("/portfolio", "es") -> "/es/portfolio". */
export function localizePath(pathname: string, lang: Lang): string {
  const base = stripLang(pathname);
  if (lang === 'en') return base;
  return base === '/' ? '/es' : `/es${base}`;
}

// Remembered choice (set when the visitor uses the toggle). Storage can throw
// in private windows or with site data blocked, so every access is guarded.
const STORAGE_KEY = 'cg-lang';

export function readStoredLang(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'en' || value === 'es' ? value : null;
  } catch {
    return null;
  }
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Not remembered; the toggle still works.
  }
}

/**
 * Until Spanish launches, the EN | ES toggle only shows to people who've been
 * on a Spanish page or used the toggle, so reviewers can always switch back.
 */
export function langToggleVisible(lang: Lang): boolean {
  return SPANISH_PUBLIC || lang === 'es' || readStoredLang() !== null;
}
