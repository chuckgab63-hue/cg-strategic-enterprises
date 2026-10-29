import { Link } from 'react-router-dom';
import PestCaseStudyCard from '../components/PestCaseStudyCard';
import { useLocalePath, useT } from '../i18n/useLang';
import portfolio from '../i18n/portfolio';

// /portfolio (also /case-studies, /case-study): the case studies index, one
// card per case study. The services and their demos live on the service pages.

export default function Portfolio() {
  const t = useT(portfolio);
  const lp = useLocalePath();

  return (
    <div className="portfolio-page bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white pb-32">

      {/* The bare `h1`, `h2` and `p` rules in index.css (fixed sizes, weight 500, their
          own colour and margins; `p { margin: 0 }`) are unlayered, so they beat the
          Tailwind classes on this page's headings and paragraphs. revert-layer hands
          those properties back to Tailwind. Not redundant: removing it shrinks the
          title and card headings to the global sizes and runs card paragraphs together. */}
      <style>{`
        .portfolio-page p {
          margin: revert-layer;
        }
        /* Card copy stays readable (~70-75 characters a line) now that cards are wider. */
        .portfolio-page .text-left p {
          max-width: 68ch;
        }
        .portfolio-page h1,
        .portfolio-page h2 {
          font-family: revert-layer;
          font-size: revert-layer;
          font-weight: revert-layer;
          line-height: revert-layer;
          letter-spacing: revert-layer;
          color: revert-layer;
          margin: revert-layer;
        }
      `}</style>

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      <div className="pt-20 site-container flex flex-col items-center relative z-10">
        
        {/* Navigation */}
        <div className="w-full flex justify-center mb-10">
          <Link to={lp('/')} className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm">
            &larr; {t.backToHome}
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            {t.title[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-brand-orange to-amber-500">{t.title[1]}</span>
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* --- Case studies, newest first --- */}
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 mb-16">
          <PestCaseStudyCard heading="h2" />
          <p className="text-center text-slate-400 leading-relaxed">
            {t.comingSoon.text}{' '}
            <Link to={lp('/website-check')} className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
              {t.comingSoon.cta} &rarr;
            </Link>
          </p>
        </div>

        {/* --- Next Page Runway CTA: Skunkworks --- */}
        <div className="w-full max-w-5xl mx-auto mt-12 mb-8 relative z-10">
          <Link 
            to={lp('/skunkworks')}
            className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
          >
            {/* Glowing Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            
            {/* Inner Content Card */}
            <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">
                  {t.next.eyebrow}
                </h3>
                <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 transition-all duration-500">
                  {t.next.title}
                </h2>
              </div>
              
              {/* Arrow Button */}
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-[#020617] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,95,31,0.5)] shrink-0">
                <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}