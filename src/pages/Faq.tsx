import { Link } from 'react-router-dom';
import FaqList from '../components/FaqList';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import faqDict, { faqJsonLdText } from '../i18n/faq';

// The pre-rendered HTML for /faq and /es/faq carries the same answers and
// JSON-LD for visitors and crawlers that don't run JavaScript
// (src/i18n/prerender.ts); React replaces that markup with this page when it loads.
export default function Faq() {
  const t = useT(faqDict);
  const lang = useLang();
  const lp = useLocalePath();

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-left">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLdText(lang) }} />
      <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{t.eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-0">{t.title}</h1>
      <p className="text-slate-300 text-base leading-relaxed mt-4 mb-10">{t.intro}</p>

      <FaqList items={t.items} />

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
