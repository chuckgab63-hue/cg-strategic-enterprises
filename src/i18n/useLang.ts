import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { langFromPath, localizePath, type Lang } from './lang';

/** The current page's language, from the URL. */
export function useLang(): Lang {
  return langFromPath(useLocation().pathname);
}

/**
 * Picks the current language's half of a dictionary. Dictionaries live in
 * src/i18n/*.ts as { en, es }, with `es` typed against `en` so a missing or
 * misspelled key fails the build.
 */
export function useT<T>(dict: Record<Lang, T>): T {
  return dict[useLang()];
}

/** Turns an English site path into the current language's: lp('/contact') -> '/es/contact' on Spanish pages. */
export function useLocalePath() {
  const lang = useLang();
  return useCallback((path: string) => {
    const cut = path.search(/[?#]/);
    if (cut === -1) return localizePath(path, lang);
    return localizePath(path.slice(0, cut), lang) + path.slice(cut);
  }, [lang]);
}
