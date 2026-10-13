import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SPANISH_PUBLIC, localizePath, readStoredLang, storeLang } from '../i18n/lang';
import { useLang } from '../i18n/useLang';
import common from '../i18n/common';

const DISMISSED_KEY = 'cg-es-prompt-dismissed';

function wasDismissed() {
  try {
    return localStorage.getItem(DISMISSED_KEY) === '1';
  } catch {
    return false;
  }
}

// A small, dismissible "¿Prefiere español?" offer on English pages for
// visitors whose browser prefers Spanish. Never redirects on its own. Always
// shown in Spanish, since that's who it's for.
export default function SpanishPrompt() {
  const lang = useLang();
  const { pathname, search, hash } = useLocation();
  const [show, setShow] = useState(false);
  const t = common.es.spanishPrompt;

  useEffect(() => {
    const prefersSpanish = (navigator.languages ?? [navigator.language]).some(l => l?.toLowerCase().startsWith('es'));
    setShow(SPANISH_PUBLIC && prefersSpanish && readStoredLang() === null && !wasDismissed());
  }, []);

  if (!show || lang !== 'en') return null;

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // Not remembered; it just shows again next visit.
    }
  };

  return (
    <aside lang="es" aria-label={t.question} className="fixed bottom-4 left-4 right-4 sm:right-auto z-[55] flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/95 px-4 py-3 shadow-2xl text-left">
      <p className="text-sm text-slate-300">
        <span className="font-bold text-white">{t.question}</span>{' '}
        <Link
          to={localizePath(pathname, 'es') + search + hash}
          hrefLang="es"
          onClick={() => { storeLang('es'); setShow(false); }}
          className="text-brand-orange font-semibold underline underline-offset-4"
        >
          {t.action}
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.dismiss}
        className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </aside>
  );
}
