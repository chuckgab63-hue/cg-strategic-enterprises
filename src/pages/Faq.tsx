import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import faqDict, { faqJsonLdText } from '../i18n/faq';

// Questions are native <details>/<summary>, so they open and close with the
// keyboard and screen readers, and without JavaScript. The pre-rendered HTML
// for /faq and /es/faq carries the same answers and JSON-LD for visitors and
// crawlers that don't run it (src/i18n/prerender.ts); React replaces that
// markup with this page when it loads.
export default function Faq() {
  const t = useT(faqDict);
  const lang = useLang();
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
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLdText(lang) }} />
      <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{t.eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-0">{t.title}</h1>
      <p className="text-slate-300 text-base leading-relaxed mt-4 mb-10">{t.intro}</p>

      <div className="flex flex-col gap-3">
        {t.items.map(item => (
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
            </div>
          </details>
        ))}
      </div>

      <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col items-start gap-4">
        <h2 className="text-white font-bold text-lg m-0">{t.cta.title}</h2>
        <p className="text-slate-300 text-base leading-relaxed">{t.cta.body}</p>
        <Link to={lp('/contact')} className="bg-brand-orange text-white px-6 py-3 rounded-md font-bold tracking-wide hover:opacity-90 transition-opacity">
          {t.cta.button}
        </Link>
      </div>
    </section>
  );
}
