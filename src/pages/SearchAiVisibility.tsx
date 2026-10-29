import { Link } from 'react-router-dom';
import { ServiceClosing, ServicePage, TalkToAlexButton, primaryButtonClass } from '../components/ServicePage';
import { useLocalePath, useT } from '../i18n/useLang';
import searchAiVisibility from '../i18n/searchAiVisibility';

// /search-ai-visibility: the Search & AI Visibility service. The header and
// cards are the section that used to sit on /portfolio, with the same design;
// the heading is now the page's H1.

// Icons for the cards, in the same order as cards in src/i18n/searchAiVisibility.ts.
const CARD_ICONS = [
  { tone: 'bg-teal-500/10 border-teal-500/30 text-teal-400', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { tone: 'bg-blue-500/10 border-blue-500/30 text-blue-400', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { tone: 'bg-amber-500/10 border-amber-500/30 text-amber-400', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { tone: 'bg-purple-500/10 border-purple-500/30 text-purple-400', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { tone: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', d: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { tone: 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export default function SearchAiVisibility() {
  const t = useT(searchAiVisibility);
  const lp = useLocalePath();

  return (
    <ServicePage>
      <header className="text-center mb-12 w-full max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block shadow-[0_0_15px_rgba(204,255,0,0.2)]">
          {t.tag}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
          {t.heading[0]} <br className="block sm:hidden" /> {t.heading[1]}
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed text-center">
          {t.intro}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {t.cards.map((card, i) => (
          <div key={card.title} className="text-left bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-4">
            <div className={`w-10 h-10 border rounded-lg flex items-center justify-center ${CARD_ICONS[i].tone}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={CARD_ICONS[i].d}></path></svg>
            </div>
            <h2 className="text-xl font-black text-white">{card.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
        <p className="text-slate-300 leading-relaxed">{t.closing}</p>
        <Link to={lp('/website-check')} className={`${primaryButtonClass} text-center`}>
          {t.button} &rarr;
        </Link>
      </div>

      <ServiceClosing title={t.alex.title} body={t.alex.body}>
        <TalkToAlexButton label={t.alex.cta} />
      </ServiceClosing>
    </ServicePage>
  );
}
