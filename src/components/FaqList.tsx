import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLocalePath } from '../i18n/useLang';
import type { FaqItem } from '../i18n/faq';

// Questions are native <details>/<summary>, so they open and close with the
// keyboard and screen readers, and without JavaScript. Used by /faq and the
// service pages; each page also renders its FAQPage JSON-LD.
export default function FaqList({ items }: { items: FaqItem[] }) {
  const lp = useLocalePath();
  const { hash } = useLocation();

  // Deep links like /faq#ownership: open that question and jump to it, after
  // ScrollToTop has sent the route change to the top.
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target instanceof HTMLDetailsElement) target.open = true;
      target?.scrollIntoView();
    }, 0);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="flex flex-col gap-3">
      {items.map(item => (
        // scroll-mt clears the fixed 80px header when jumping to an anchor.
        <details key={item.id} id={item.id} className="group scroll-mt-28 bg-slate-900/50 border border-slate-800 open:border-brand-orange/40 rounded-2xl">
          <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-white font-bold text-lg rounded-2xl hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-brand-orange transition-colors">
            <span>{item.question}</span>
            <svg className="w-5 h-5 shrink-0 text-brand-orange transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-300 text-base leading-relaxed">
            <p>{item.answer}</p>
            {item.more && (
              // Spacing sits on the div: index.css's unlayered p { margin: 0 } beats mt-* on a <p>.
              <div className="mt-3">
                <Link to={lp(item.more.path)} className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
                  {item.more.label} &rarr;
                </Link>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
