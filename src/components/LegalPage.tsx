import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { BUSINESS_NAME, LEGAL_LAST_UPDATED } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

// Shared shell for /privacy and /terms. Carrier (A2P 10DLC) reviewers read
// these pages directly, so they're plain, left-aligned and high contrast.
export default function LegalPage({ title, children }: LegalPageProps) {
  const { hash } = useLocation();

  usePageMeta(`${title} | ${BUSINESS_NAME}`);

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
        Last updated: {LEGAL_LAST_UPDATED}
      </p>
      <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-10">{title}</h1>
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
