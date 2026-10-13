import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ONE_SOURCE_CASE_STUDY as STUDY } from '../config/caseStudies';
import { useLocalePath, useT } from '../i18n/useLang';
import copy from '../i18n/oneSourceCaseStudy';

const STACK = ['Astro', 'React', 'Vercel', 'Supabase', 'Make.com', 'Retell AI', 'Google Gemini', 'GorillaDesk'];

// Static mock built from the admin area's own styles with fake DEMO data (design/onesource-admin-mock),
// never the client's real staff, applicant or license records.
const ADMIN_SCREENS = ['dashboard', 'staff-readiness', 'applicants-pipeline'] as const;

const adminShot = (key: string, width: number) => `/portfolio/onesource/onesource-admin-${key}-mock-${width}w.webp`;

const SCREENS = ['home-hero', 'service-page', 'pest-analyzer', 'talk-to-jess', 'service-area-map'] as const;

const shot = (key: string, variant: string) => `/portfolio/onesource/onesource-${key}-${variant}.webp`;

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5h5m0 0v5m0-5L10 14M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"></path></svg>
);

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-5">
    {children}
  </span>
);

export default function OneSourceCaseStudy() {
  const t = useT(copy);
  const lp = useLocalePath();

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <div className="case-study-page bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white text-left">

      {/* Same reason as on /portfolio: hand the bare h1/h2/p rules in index.css back to Tailwind. */}
      <style>{`
        .case-study-page p { margin: revert-layer; }
        .case-study-page h1,
        .case-study-page h2 {
          font-family: revert-layer;
          font-size: revert-layer;
          font-weight: revert-layer;
          line-height: revert-layer;
          letter-spacing: revert-layer;
          color: revert-layer;
          margin: revert-layer;
        }
      `}</style>

      {/* --- Hero band (full bleed) --- */}
      <section className="relative w-full pt-28 md:pt-32 pb-16 md:pb-24 border-b border-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>
        <div className="absolute -top-40 right-0 w-[700px] max-w-full h-[700px] bg-brand-orange/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="site-container relative z-10">
          <Link to={lp('/portfolio')} className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm mb-10">
            {t.backToAll}
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 xl:gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {t.category}
                </span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Jacksonville, FL</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05] mb-6">
                One Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Total Pest Control.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-8">
                {t.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={STUDY.liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-brand-orange text-white font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_25px_rgba(255,95,31,0.3)]"
                >
                  {t.visitSite}
                  <ExternalIcon />
                  <span className="sr-only">{t.opensInNewTab}</span>
                </a>
                <Link
                  to={lp('/contact')}
                  className="inline-flex items-center justify-center gap-2 text-center border border-slate-700 text-slate-200 font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {t.startProject}
                </Link>
              </div>
            </div>

            {/* Desktop and phone screenshots of the home hero */}
            <div className="relative pb-10 sm:pb-0 sm:pr-[14%]">
              <img
                src={shot('home-hero', 'desktop-1440w')}
                srcSet={`${shot('home-hero', 'desktop-800w')} 800w, ${shot('home-hero', 'desktop-1440w')} 1440w`}
                sizes="(min-width: 1280px) 50vw, 92vw"
                width={1440}
                height={900}
                fetchPriority="high"
                decoding="async"
                alt={t.screens['home-hero'].desktopAlt}
                className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
              />
              <img
                src={shot('home-hero', 'phone-780w')}
                width={780}
                height={1688}
                decoding="async"
                alt={t.screens['home-hero'].phoneAlt}
                className="absolute right-0 bottom-0 w-[24%] h-auto rounded-2xl border-4 border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.7)] translate-y-[12%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- The problem --- */}
      <section className="w-full py-20 md:py-28">
        <div className="site-container">
          <SectionLabel>{t.problemsLabel}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">{t.problemsTitle}</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-12">
            {t.problemsIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
            {t.problems.map((p) => (
              <div key={p.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-black text-white mb-3">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- What we built (colour band, full bleed) --- */}
      <section className="w-full py-20 md:py-28 bg-[#020617] border-y border-slate-900">
        <div className="site-container">
          <SectionLabel>{t.builtLabel}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">{t.builtTitle}</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-12">
            {t.builtIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {t.built.map((b, i) => (
              <div key={b.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-brand-orange/40 transition-colors">
                <span className="block text-brand-orange font-black text-xs tracking-widest mb-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-white mb-3">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">{t.techStack}</h3>
            <ul className="flex flex-wrap gap-3">
              {STACK.map((s) => (
                <li key={s} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-sm font-bold text-slate-200">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Screenshots --- */}
      <section className="w-full py-20 md:py-28">
        <div className="site-container">
          <SectionLabel>{t.screenshotsLabel}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">{t.screenshotsTitle}</h2>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-10 gap-y-16">
            {SCREENS.slice(1).map((key) => (
              <figure key={key} className="m-0">
                <div className="grid grid-cols-[minmax(0,1fr)_22%] gap-4 md:gap-6 items-end">
                  <img
                    src={shot(key, 'desktop-1440w')}
                    srcSet={`${shot(key, 'desktop-800w')} 800w, ${shot(key, 'desktop-1440w')} 1440w`}
                    sizes="(min-width: 1536px) 36vw, 72vw"
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    alt={t.screens[key].desktopAlt}
                    className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
                  />
                  <img
                    src={shot(key, 'phone-780w')}
                    width={780}
                    height={1688}
                    loading="lazy"
                    decoding="async"
                    alt={t.screens[key].phoneAlt}
                    className="w-full h-auto rounded-xl border-2 border-slate-700 shadow-2xl"
                  />
                </div>
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">{t.screens[key].caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- Admin area (colour band, full bleed) --- */}
      <section className="w-full py-20 md:py-28 mb-20 md:mb-28 bg-[#020617] border-y border-slate-900">
        <div className="site-container">
          <SectionLabel>{t.adminLabel}</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">{t.adminTitle}</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-4">
            {t.adminIntro1}
          </p>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-12">
            {t.adminIntro2}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {t.adminFeatures.map((f, i) => (
              <div key={f.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-brand-orange/40 transition-colors">
                <span className="block text-brand-orange font-black text-xs tracking-widest mb-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-white mb-3">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-prose mt-10">
            <span className="font-bold text-slate-200">{t.theBuild}</span>{t.theBuildBody}
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mt-14">
            {ADMIN_SCREENS.map((key) => (
              <figure key={key} className="m-0">
                <img
                  src={adminShot(key, 1440)}
                  srcSet={`${adminShot(key, 800)} 800w, ${adminShot(key, 1440)} 1440w`}
                  sizes="(min-width: 1280px) 30vw, 92vw"
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  alt={t.adminScreens[key].alt}
                  className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
                />
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {t.adminScreens[key].caption} <span className="normal-case tracking-normal font-normal">{t.mockNote}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* --- Client feedback --- */}
          <div className="mt-16 border-2 border-dashed border-amber-500/60 bg-amber-500/5 rounded-3xl p-8 md:p-12">
            {/* TODO(client quote): Use the client's exact words only, with written permission.
                Do not write or paraphrase a testimonial. Until then this block stays a placeholder. */}
            <span className="inline-block px-3 py-1 bg-amber-500 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-full mb-5">
              {t.quoteBadge}
            </span>
            {/* TODO(confirm wording with the client before launch): keep this sentence only if the owner
                and office manager agree it reflects what they said. */}
            <p className="text-slate-300 leading-relaxed max-w-prose">
              {t.quoteText}
            </p>
          </div>
        </div>
      </section>

      {/* --- Results: placeholder until there are real numbers --- */}
      <section className="w-full pb-20 md:pb-28">
        <div className="site-container">
          {/* TODO(after launch): replace this block with real results (lead volume, page speed scores, etc.).
              Only real, verifiable numbers. No invented metrics, testimonials or quotes. */}
          <div className="border-2 border-dashed border-amber-500/60 bg-amber-500/5 rounded-3xl p-8 md:p-12">
            <span className="inline-block px-3 py-1 bg-amber-500 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-full mb-5">
              {t.resultsBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{t.resultsTitle}</h2>
            <p className="text-slate-400 leading-relaxed max-w-prose">
              {t.resultsBody}
            </p>
          </div>
        </div>
      </section>

      {/* --- Next step --- */}
      <section className="w-full pb-32">
        <div className="site-container">
          <Link
            to={lp('/portfolio')}
            className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
          >
            <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">{t.keepExploring}</h3>
                <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-brand-orange transition-colors duration-500">
                  {t.moreCaseStudies}
                </h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-[#020617] transition-all duration-300 shrink-0">
                <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
