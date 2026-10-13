import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LEGAL_LAST_UPDATED } from '../config/site';
import { LOCALE, localizePath } from '../i18n/lang';
import { useLang, useT } from '../i18n/useLang';
import legal from '../i18n/legal';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

// Shared shell for /privacy and /terms. Carrier (A2P 10DLC) reviewers read
// these pages directly, so they're plain, left-aligned and high contrast.
export default function LegalPage({ title, children }: LegalPageProps) {
  const { hash, pathname } = useLocation();
  const lang = useLang();
  const t = useT(legal);
  const updated = lang === 'en'
    ? LEGAL_LAST_UPDATED
    : new Date(LEGAL_LAST_UPDATED).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' });


  // ScrollToTop sends every route change to the top, so deep links like
  // /terms#sms need to jump to their section after that has run.
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    }, 0);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <article className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-left text-slate-300 text-base leading-relaxed">
      <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">
        {t.lastUpdated} {updated}
      </p>
      <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-10">{title}</h1>
      {/* Spacing sits on the div: index.css's unlayered p { margin: 0 } beats mb-* on a <p>. */}
      {t.governingNote && (
        <div className="mb-10 rounded-xl border border-brand-orange/40 bg-brand-orange/10 p-4 text-sm text-slate-200">
          <p>
            {t.governingNote}{' '}
            <Link to={localizePath(pathname, 'en') + hash} hrefLang="en" lang="en" className="text-brand-orange underline hover:text-white transition-colors">
              {t.governingLink}
            </Link>
          </p>
        </div>
      )}
      <div className="flex flex-col gap-10">{children}</div>
    </article>
  );
}

interface LegalSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    // scroll-mt clears the fixed 80px header when jumping to an anchor.
    <section id={id} className="scroll-mt-28 flex flex-col gap-4">
      <h2 className="text-white font-bold text-xl">{title}</h2>
      {children}
    </section>
  );
}
