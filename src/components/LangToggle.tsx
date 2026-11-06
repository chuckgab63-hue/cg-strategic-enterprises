import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LANGS, langToggleVisible, localizePath, storeLang } from '../i18n/lang';
import { useLang, useT } from '../i18n/useLang';
import common from '../i18n/common';

// Each language's own name, so it reads right whatever page you're on.
const NAMES = { en: 'English', es: 'Español' } as const;

// "EN | ES" in the header. Each is a real link to the same page in that
// language, keeping the query string and #section.
export default function LangToggle() {
  const lang = useLang();
  const { pathname, search, hash } = useLocation();
  const t = useT(common).langToggle;

  if (!langToggleVisible(lang)) return null;

  return (
    <div role="group" aria-label={t.groupLabel} className="flex items-center text-xs font-bold tracking-widest">
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden="true" className="text-slate-400">|</span>}
          <Link
            to={localizePath(pathname, l) + search + hash}
            lang={l}
            hrefLang={l}
            aria-current={l === lang ? 'true' : undefined}
            onClick={() => storeLang(l)}
            className={`px-1.5 py-2 transition-colors ${l === lang ? 'text-brand-orange' : 'text-slate-400 hover:text-white'}`}
          >
            {/* The full name extends the visible "EN"/"ES" rather than replacing
                it with aria-label. An accessible name that does not contain the
                visible text leaves anyone using voice control saying "EN" at a
                link that will not answer to it. */}
            {l.toUpperCase()}
            <span className="sr-only"> {NAMES[l]}</span>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
