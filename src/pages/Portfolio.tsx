import { Link } from 'react-router-dom';

// --- Top-Level Widgets ---
import AnalysisWidget from '../components/AnalysisWidget';
import PropertyWidget from '../components/PropertyWidget';
import AssetTrackerWidget from '../components/AssetTrackerWidget';
import MealPrepOrderWidget from '../components/MealPrepOrderWidget';
import TaxWidget from '../components/TaxWidget';
import MobileExpandWidget from '../components/MobileExpandWidget';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies';
import { useLocalePath, useT } from '../i18n/useLang';
import portfolio from '../i18n/portfolio';

// Icons for the Search & AI Visibility cards, in the same order as
// searchVisibility.cards in src/i18n/portfolio.ts.
const SEARCH_CARD_ICONS = [
  { tone: 'bg-teal-500/10 border-teal-500/30 text-teal-400', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { tone: 'bg-blue-500/10 border-blue-500/30 text-blue-400', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { tone: 'bg-amber-500/10 border-amber-500/30 text-amber-400', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { tone: 'bg-purple-500/10 border-purple-500/30 text-purple-400', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { tone: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', d: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { tone: 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export default function Portfolio() {
  const t = useT(portfolio);
  const lp = useLocalePath();
  const { whiteLabel: wl, mealPrep: mp, oneSource: os, property: pr, asset: at, tax: tx, searchVisibility: sv } = t;

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
            &larr; {t.backToHub}
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

        <div className="w-full flex flex-col gap-20 mb-32">

          {/* --- Case Study 0: White-Label Platform (Text Left, Screenshots Right) --- */}
          {/* Each card's text column carries text-left to counter the global
              `#root { text-align: center }` in index.css, which otherwise centres
              the copy under a left-aligned tag row. */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-teal-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {wl.tag}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {wl.sub}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {wl.heading[0]} <br className="hidden md:block" /> {wl.heading[1]}
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/30 rounded-lg flex items-center justify-center text-teal-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">{wl.subheading}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {wl.body[0]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {wl.body[1]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {wl.body[2]}
                  </p>
                  <div className="text-sm text-slate-400 leading-relaxed border-l-2 border-teal-400 pl-4 bg-teal-400/5 p-4 rounded-r-lg mt-2 mb-6">
                    <strong className="text-teal-400 text-xs uppercase tracking-widest block mb-1">{wl.privateTitle}</strong>
                    {wl.privateBody}
                  </div>

                  {/* Storefront first (primary), admin second (outline) with its demo sign-in underneath */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <a
                      href="https://demo.cgstrategic.dev/menu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-center gap-2 bg-teal-400 text-[#020617] font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full border border-teal-400 hover:bg-teal-300 hover:border-teal-300 transition-colors shadow-[0_0_25px_rgba(45,212,191,0.3)]"
                    >
                      {wl.openStorefront}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5h5m0 0v5m0-5L10 14M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"></path></svg>
                      <span className="sr-only">{t.opensNewTab}</span>
                    </a>

                    <div className="flex flex-col items-stretch sm:items-start gap-2">
                      <a
                        href="https://demo.cgstrategic.dev/admin/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-center gap-2 border border-teal-400/40 text-teal-400 font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-teal-400/10 hover:border-teal-400 transition-colors"
                      >
                        {wl.adminDashboard}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5h5m0 0v5m0-5L10 14M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"></path></svg>
                        <span className="sr-only">{t.opensNewTab}</span>
                      </a>
                      <p className="text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">{wl.demoLogin}</span>
                        <span className="whitespace-nowrap"><code className="text-slate-300 select-all">admin@demo.example</code> / <code className="text-slate-300 select-all">demo-admin</code></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: stretches to the row height on lg so the screenshots stay
                centred where they were, while the calculator callout sits in the empty
                space above them, level with the heading. It's absolute on lg so it can
                never make the card taller; in the stacked layout it follows the screenshots. */}
            <div className="order-2 relative flex flex-col gap-8 lg:self-stretch lg:justify-center">

              {/* Screenshots of the live demo (it can't be iframed) */}
              <a
                href="https://demo.cgstrategic.dev"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="relative w-full aspect-[16/12] block group"
              >
                <img
                  src="/portfolio/white-label-storefront-800w.webp"
                  srcSet="/portfolio/white-label-storefront-800w.webp 800w, /portfolio/white-label-storefront-1600w.webp 1600w"
                  sizes="(min-width: 1024px) 520px, 90vw"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  alt={wl.storefrontAlt}
                  className="absolute top-0 left-0 w-[88%] rounded-xl border border-slate-700 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1"
                />
                <img
                  src="/portfolio/white-label-admin-800w.webp"
                  srcSet="/portfolio/white-label-admin-800w.webp 800w, /portfolio/white-label-admin-1600w.webp 1600w"
                  sizes="(min-width: 1024px) 360px, 62vw"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  alt={wl.adminAlt}
                  className="absolute bottom-0 right-0 w-[62%] rounded-xl border border-slate-700 shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:translate-y-1"
                />
              </a>

              {/* Related tool, deliberately not styled like the teal demo buttons: no pill,
                  no fill, an orange text link. It's a pointer elsewhere, not another demo. */}
              <Link
                to={lp('/meal-prep-calculator')}
                className="group lg:absolute lg:top-[3.05rem] lg:left-0 lg:right-0 block text-left border-l-2 border-brand-orange/50 hover:border-brand-orange pl-4 transition-colors"
              >
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {wl.relatedEyebrow}
                </span>
                <span className="block text-sm text-slate-300 leading-snug mt-1">
                  {wl.relatedBody}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange group-hover:text-white transition-colors">
                  {wl.relatedCta}
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* --- Case Study 0.5: Meal Prep Ordering (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {mp.tag}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {mp.sub}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {mp.heading[0]} <br className="hidden md:block" /> {mp.heading[1]}
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">{mp.subheading}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {mp.body[0]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {mp.body[1]}
                  </p>
                  <div className="text-sm text-slate-400 leading-relaxed border-l-2 border-green-400 pl-4 bg-green-400/5 p-4 rounded-r-lg mb-6">
                    <strong className="text-green-400 text-xs uppercase tracking-widest block mb-1">{mp.planningTitle}</strong>
                    {mp.planningBody}
                    <Link
                      to={lp('/meal-prep-calculator')}
                      className="mt-3 flex w-fit items-center gap-2 text-green-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
                    >
                      {mp.runNumbers} &rarr;
                    </Link>
                  </div>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-green-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-green-400 block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-green-400 font-black uppercase tracking-widest text-xs">
                      {t.tryDemo}
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>

            {/* Right Column: Meal Prep Ordering Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label={mp.widgetLabel}>
                 <MealPrepOrderWidget />
               </MobileExpandWidget>
            </div>
          </div>

          {/* --- Case Study 1: One Source (Text Left, Widget Right). Full write-up: /work/one-source-total-pest-control --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {os.tag}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    One Source Total Pest Control
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {os.heading[0]} <br className="hidden md:block" /> {os.heading[1]}
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-orange/10 border border-brand-orange/30 rounded-lg flex items-center justify-center text-brand-orange">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">{os.subheading}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {os.body[0]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {os.body[1]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {os.body[2]}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6">
                    <Link
                      to={lp(ONE_SOURCE_CASE_STUDY.path)}
                      className="inline-flex items-center justify-center text-center gap-2 bg-brand-orange text-white font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_25px_rgba(255,95,31,0.3)]"
                    >
                      {os.readCaseStudy}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                    <a
                      href={ONE_SOURCE_CASE_STUDY.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-center gap-2 border border-brand-orange/40 text-brand-orange font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-brand-orange/10 hover:border-brand-orange transition-colors"
                    >
                      {os.visitSite}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5h5m0 0v5m0-5L10 14M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"></path></svg>
                      <span className="sr-only">{t.opensNewTab}</span>
                    </a>
                  </div>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#CCFF00] hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-[#CCFF00] block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-[#CCFF00] font-black uppercase tracking-widest text-xs">
                      {os.tryDemo}
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>
            
            {/* Right Column: Analysis Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label={os.widgetLabel}>
                 <AnalysisWidget />
               </MobileExpandWidget>
            </div>
          </div>

          {/* --- Case Study 2: Property Ops AI (Widget Left, Text Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Property Widget (Drops to bottom on mobile) */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2 lg:order-1">
               <MobileExpandWidget label={pr.widgetLabel}>
                 <PropertyWidget />
               </MobileExpandWidget>
            </div>

            {/* Right Column: Text (Rises to top on mobile) */}
            <div className="flex flex-col gap-6 order-1 lg:order-2 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {pr.tag}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {pr.sub}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {pr.heading[0]} <br className="hidden md:block" /> {pr.heading[1]}
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">{pr.subheading}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {pr.body[0]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {pr.body[1]}
                  </p>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-emerald-400 block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-emerald-400 font-black uppercase tracking-widest text-xs">
                      {t.tryDemo}
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>
            
          </div>

          {/* --- Case Study 2.5: Asset Tracker (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {at.tag}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {at.sub}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {at.heading[0]} <br className="hidden md:block" /> {at.heading[1]}
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">{at.subheading}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {at.body[0]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {at.body[1]}
                  </p>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-amber-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-amber-400 block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-amber-400 font-black uppercase tracking-widest text-xs">
                      {t.tryDemo}
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>

            {/* Right Column: Asset Tracker Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label={at.widgetLabel}>
                 <AssetTrackerWidget />
               </MobileExpandWidget>
            </div>

          </div>

          {/* --- Case Study 3: Tax Engine (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {tx.tag}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {tx.sub}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {tx.heading[0]} <br className="hidden md:block" /> {tx.heading[1]}
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">{tx.subheading}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {tx.body[0]}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {tx.body[1]}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Tax Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label={tx.widgetLabel}>
                 <TaxWidget />
               </MobileExpandWidget>
            </div>
          </div>

        </div>

        {/* --- SEARCH & AI VISIBILITY --- */}
        <div className="w-full max-w-5xl mx-auto border-t border-slate-800 pt-24 mb-16 relative z-20 flex flex-col items-center">

          <div className="text-center mb-12 w-full max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              {sv.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {sv.heading[0]} <br className="block sm:hidden" /> {sv.heading[1]}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed text-center">
              {sv.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {sv.cards.map((card, i) => (
              <div key={card.title} className="text-left bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-4">
                <div className={`w-10 h-10 border rounded-lg flex items-center justify-center ${SEARCH_CARD_ICONS[i].tone}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={SEARCH_CARD_ICONS[i].d}></path></svg>
                </div>
                <h3 className="text-xl font-black text-white">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
            <p className="text-slate-300 leading-relaxed">{sv.closing}</p>
            <Link
              to={lp('/website-check')}
              className="inline-flex items-center justify-center bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs text-center hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)]"
            >
              {sv.button} &rarr;
            </Link>
          </div>

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