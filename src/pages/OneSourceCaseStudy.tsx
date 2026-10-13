import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ONE_SOURCE_CASE_STUDY as STUDY } from '../config/caseStudies';

const PROBLEMS = [
  {
    title: 'A site search engines struggled to read',
    body: 'Everything lived on one JavaScript page, so services and pests had no pages of their own for Google to find and rank.',
  },
  {
    title: 'Contact buttons that went nowhere',
    body: 'Some buttons were broken, so people who were ready to book hit a dead end.',
  },
  {
    title: 'AI endpoints left open',
    body: 'AI features called paid APIs with no rate limits, so anyone could run up the bill.',
  },
  {
    title: 'Messy lead handling',
    body: 'Leads reached their GorillaDesk CRM by different routes and in different formats, which made follow-up harder than it needed to be.',
  },
];

const BUILT = [
  {
    title: 'Ground-up rebuild in Astro',
    body: 'A fast multi-page site on Vercel with its own search-friendly page for every service and pest, structured data, and a light, family-friendly design.',
  },
  {
    title: 'Video hero with a 3D flip',
    body: 'The home page rotates through background videos with a 3D flip transition, and falls back to a still image for visitors who prefer reduced motion.',
  },
  {
    title: 'Pest Analyzer',
    body: 'Customers upload a photo of a bug and get an AI first-guess ID. An optional follow-up form turns that visit into a lead.',
  },
  {
    title: '"Talk to Jess" voice assistant',
    body: 'An AI voice assistant built on Retell AI answers pest questions from a Northeast Florida knowledge base drawn from University of Florida extension research, then takes the caller\'s details as a lead.',
  },
  {
    title: 'Service area checker and map',
    body: 'Visitors check their ZIP code in one step, next to a shaded county map built from where One Source\'s customers actually are.',
  },
  {
    title: 'One lead intake in Make.com',
    body: 'Every form, analyzer follow-up and voice call flows into a single intake that formats the data, checks for an existing customer, and routes it to the CRM and the right notifications.',
  },
  {
    title: 'Real photos, real compliance',
    body: 'Licensed pest photos with a credits page, plus the details that matter in this industry: the state license and SMS consent built into every form.',
  },
  {
    title: 'Cost guardrails',
    body: 'Rate limits on every AI feature and a daily cap on voice calls, so usage costs stay predictable.',
  },
];

const STACK = ['Astro', 'React', 'Vercel', 'Supabase', 'Make.com', 'Retell AI', 'Google Gemini', 'GorillaDesk'];

const ADMIN_FEATURES = [
  {
    title: 'Role-based access',
    body: 'Owner, office admin and technician roles, with permissions enforced in the database, not just hidden on the screen.',
  },
  {
    title: 'Licensing and compliance tracker',
    body: 'FDACS ID cards, certified operator credentials and the business license, each with an expiration date, plus a dashboard of what expires in the next 30, 60 and 90 days.',
  },
  {
    title: 'Training and route-ready status',
    body: 'A supervised training log for each technician and a clear route-ready status, so the owner can see who is ready to run their own route.',
  },
  {
    title: 'Applicant pipeline',
    body: 'The new Careers page sends applications straight into the admin area. Each one moves from New to Interview to Hired, and hiring creates the staff record and onboarding checklist automatically.',
  },
  {
    title: 'Onboarding checklists',
    body: 'Every new hire gets a checklist with due dates, such as the deadline to apply for their FDACS ID card.',
  },
  {
    title: 'Daily email digest',
    body: 'One email a day lists anything expiring or overdue, so nothing slips.',
  },
  {
    title: '"My status" for technicians',
    body: 'Technicians get a phone-friendly view of their own credentials, training progress and checklist.',
  },
];

// Static mock built from the admin area's own styles with fake DEMO data (design/onesource-admin-mock),
// never the client's real staff, applicant or license records.
const ADMIN_SCREENS = [
  {
    key: 'dashboard',
    caption: 'Dashboard',
    alt: 'Mock of the One Source admin dashboard filled with demo data: tiles for expired and soon-to-expire credentials, techs not yet route-ready and new applicants, above a table of credentials needing attention',
  },
  {
    key: 'staff-readiness',
    caption: 'A technician\'s readiness',
    alt: 'Mock of a demo technician\'s page in the One Source admin area: supervised training progress for each license category, ID card status, onboarding progress and what\'s left before they are route-ready',
  },
  {
    key: 'applicants-pipeline',
    caption: 'Applicant pipeline',
    alt: 'Mock of the One Source admin applicants list with demo applicants from the Careers page, filtered by stage: New, Contacted, Interview, Offer, Hired and Not hired',
  },
];

const adminShot = (key: string, width: number) => `/portfolio/onesource/onesource-admin-${key}-mock-${width}w.webp`;

const SCREENS = [
  {
    key: 'home-hero',
    caption: 'Home page hero',
    desktopAlt: 'One Source home page on a desktop screen: palm-tree background video behind the headline "Friendly, local pest control in Jacksonville, FL" with Book Online, Talk to Jess and Call buttons',
    phoneAlt: 'One Source home page on a phone: the same hero headline and buttons, with the sticky Call, Book Online and Talk to Jess bar at the bottom',
  },
  {
    key: 'service-page',
    caption: 'A service page',
    desktopAlt: 'Termite Treatment and Protection in Jacksonville, FL page on desktop, with breadcrumbs, a short intro and booking buttons',
    phoneAlt: 'Termite treatment page on a phone, with the headline, intro and booking buttons above the fold',
  },
  {
    key: 'pest-analyzer',
    caption: 'Pest Analyzer',
    desktopAlt: 'Pest Analyzer on desktop: a photo drop area beside the upload field, an optional notes box and an Analyze my photo button',
    phoneAlt: 'Pest Analyzer on a phone, with the photo upload field, notes box and Analyze my photo button stacked',
  },
  {
    key: 'talk-to-jess',
    caption: 'Talk to Jess panel',
    desktopAlt: 'Talk to Jess panel open on the termite page, explaining that calls are with an AI assistant, with Start call and Cancel buttons',
    phoneAlt: 'Talk to Jess panel open on a phone, with Start call and Cancel buttons above the sticky action bar',
  },
  {
    key: 'service-area-map',
    caption: 'Service area checker and map',
    desktopAlt: 'Service area page on desktop: a ZIP code checker beside a shaded map of Northeast Florida counties with core and extended service rings',
    phoneAlt: 'Shaded Northeast Florida service area map on a phone, with the core and extended area legend',
  },
];

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
          <Link to="/portfolio" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm mb-10">
            &larr; All case studies
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 xl:gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Website Rebuild &amp; Lead Automation
                </span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Jacksonville, FL</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05] mb-6">
                One Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Total Pest Control.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-8">
                One Source is a licensed pest control company in Jacksonville, Florida. We rebuilt their website from the ground up and connected every way a customer can reach them to one lead intake.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={STUDY.liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-brand-orange text-white font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_25px_rgba(255,95,31,0.3)]"
                >
                  Visit the site
                  <ExternalIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-slate-700 text-slate-200 font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  Start a project like this
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
                alt={SCREENS[0].desktopAlt}
                className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
              />
              <img
                src={shot('home-hero', 'phone-780w')}
                width={780}
                height={1688}
                decoding="async"
                alt={SCREENS[0].phoneAlt}
                className="absolute right-0 bottom-0 w-[24%] h-auto rounded-2xl border-4 border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.7)] translate-y-[12%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- The problem --- */}
      <section className="w-full py-20 md:py-28">
        <div className="site-container">
          <SectionLabel>The starting point</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">What wasn't working.</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-12">
            The old site was a single-page app that looked fine in a browser but held the business back everywhere else.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
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
          <SectionLabel>What we built</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">A site that does the work.</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-12">
            Fast pages for search, useful tools for customers, and one pipeline behind all of it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {BUILT.map((b, i) => (
              <div key={b.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-brand-orange/40 transition-colors">
                <span className="block text-brand-orange font-black text-xs tracking-widest mb-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-white mb-3">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Tech stack</h3>
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
          <SectionLabel>Screenshots</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">On desktop and phone.</h2>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-10 gap-y-16">
            {SCREENS.slice(1).map((s) => (
              <figure key={s.key} className="m-0">
                <div className="grid grid-cols-[minmax(0,1fr)_22%] gap-4 md:gap-6 items-end">
                  <img
                    src={shot(s.key, 'desktop-1440w')}
                    srcSet={`${shot(s.key, 'desktop-800w')} 800w, ${shot(s.key, 'desktop-1440w')} 1440w`}
                    sizes="(min-width: 1536px) 36vw, 72vw"
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    alt={s.desktopAlt}
                    className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
                  />
                  <img
                    src={shot(s.key, 'phone-780w')}
                    width={780}
                    height={1688}
                    loading="lazy"
                    decoding="async"
                    alt={s.phoneAlt}
                    className="w-full h-auto rounded-xl border-2 border-slate-700 shadow-2xl"
                  />
                </div>
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- Admin area (colour band, full bleed) --- */}
      <section className="w-full py-20 md:py-28 mb-20 md:mb-28 bg-[#020617] border-y border-slate-900">
        <div className="site-container">
          <SectionLabel>Behind the scenes</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">An admin area built for growth.</h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-4">
            One Source's CRM (GorillaDesk) and payment system (Square) handle jobs and payments. Neither covers the people side of growing the business: licenses, training and hiring.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed max-w-prose mb-12">
            So we built a private, invite-only admin area that fills that gap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {ADMIN_FEATURES.map((f, i) => (
              <div key={f.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-brand-orange/40 transition-colors">
                <span className="block text-brand-orange font-black text-xs tracking-widest mb-3">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black text-white mb-3">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-prose mt-10">
            <span className="font-bold text-slate-200">The build:</span> Astro and Supabase (Postgres, sign-in and private file storage) on Vercel, with Make.com sending the daily email digest.
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mt-14">
            {ADMIN_SCREENS.map((s) => (
              <figure key={s.key} className="m-0">
                <img
                  src={adminShot(s.key, 1440)}
                  srcSet={`${adminShot(s.key, 800)} 800w, ${adminShot(s.key, 1440)} 1440w`}
                  sizes="(min-width: 1280px) 30vw, 92vw"
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  alt={s.alt}
                  className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl"
                />
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {s.caption} <span className="normal-case tracking-normal font-normal">(mock-up with demo data)</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* --- Client feedback --- */}
          <div className="mt-16 border-2 border-dashed border-amber-500/60 bg-amber-500/5 rounded-3xl p-8 md:p-12">
            {/* TODO(client quote): Use the client's exact words only, with written permission.
                Do not write or paraphrase a testimonial. Until then this block stays a placeholder. */}
            <span className="inline-block px-3 py-1 bg-amber-500 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-full mb-5">
              TODO: Client quote
            </span>
            {/* TODO(confirm wording with the client before launch): keep this sentence only if the owner
                and office manager agree it reflects what they said. */}
            <p className="text-slate-300 leading-relaxed max-w-prose">
              Early feedback from the owner and office manager: it handles the work their CRM and payment system don't, in real time, so they can focus on growth.
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
              TODO: Results
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Results coming after launch.</h2>
            <p className="text-slate-400 leading-relaxed max-w-prose">
              The new site is ready and goes live on One Source's own domain soon. We'll add real numbers here once there's data to report: lead volume, page speed scores and more.
            </p>
          </div>
        </div>
      </section>

      {/* --- Next step --- */}
      <section className="w-full pb-32">
        <div className="site-container">
          <Link
            to="/portfolio"
            className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
          >
            <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">Keep exploring</h3>
                <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-brand-orange transition-colors duration-500">
                  More case studies.
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
