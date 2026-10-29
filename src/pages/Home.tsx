import { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { deferredSection, useAfterPageLoad } from '../lib/deferred';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import home from '../i18n/home';
import { BUSINESS_NAME, EMAIL, PHONE_INTL, SITE_URL } from '../config/site';
import { HERO_IMAGE } from '../config/heroImage';
import { trackEvent } from '../lib/analytics';
import HomeWebsiteCheck from '../components/HomeWebsiteCheck';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies';
import type { ServiceIcon } from '../i18n/home';

// Everything below the hero, and the contact modal, uses framer-motion or
// GSAP. Their code loads after the page (src/lib/deferred.tsx), so a phone
// spends its first seconds on the HTML and the hero image. The hero itself
// animates with CSS (the keyframes in the <style> below) for the same reason.
const MealPrepPreview = deferredSection(() => import('../components/MealPrepPreview'));
const AnimationShowcase = deferredSection(() => import('../components/AnimationShowcase'));
const FramerPlayground = deferredSection(() => import('../components/FramerPlayground'));
const ContactModal = lazy(() => import('../components/ContactModal'));

// One small outline icon per service card (the card's `icon` in src/i18n/home.ts).
const SERVICE_ICONS: Record<ServiceIcon, string> = {
  // Two steps joined by a line: a workflow.
  automation: 'M4 4h6v5H4zM14 15h6v5h-6zM7 9v4a2 2 0 0 0 2 2h5',
  phone: 'M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  // A shopping bag.
  ordering: 'M6 8h12l-1 12H7L6 8zm3 0V6a3 3 0 0 1 6 0v2',
  search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm5 12 5 5',
  // A browser window.
  website: 'M3 5h18v14H3zM3 9h18',
  // A tick in a circle.
  check: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-4 9 3 3 5-6',
};

// The case study card's screenshot: the build's admin dashboard (demo data), 27 KB, lazy-loaded.
const CASE_STUDY_IMAGE = '/portfolio/onesource/onesource-admin-dashboard-mock-800w.webp';

// LocalBusiness structured data for the home page. No street address: the
// business serves all of Florida rather than customers at an office. (The
// site-wide Organization JSON-LD from vite.config.ts carries the mailing address.)
const LOCAL_BUSINESS_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS_NAME,
  url: SITE_URL,
  telephone: PHONE_INTL,
  email: EMAIL,
  areaServed: 'Florida',
}).replace(/</g, '\\u003c');


// MAIN COMPONENT: CONTINUOUS SCROLL HOME
// ==========================================
export default function Home() {
  const t = useT(home);
  const lang = useLang();
  const lp = useLocalePath();
  
  // --- Global Form/Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalReady = useAfterPageLoad() || isModalOpen;

  // Lock body scroll when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <div className="home-page bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LOCAL_BUSINESS_JSON_LD }} />

      {/* The bare `h1`, `h2` and `p` rules in index.css (fixed sizes, weight 500, their
          own colour and margins; `p { margin: 0 }`) are unlayered, so they beat every
          Tailwind class on this page's headings and paragraphs — including `mx-auto`.
          revert-layer hands each of those properties back to Tailwind, so the classes
          apply as written. Not redundant: removing it shrinks the headings back to the
          global sizes and un-centres the section intros. The contact modal is skipped
          so it looks the same here as on every other page that opens it. */}
      <style>{`
        .home-page p:not(.contact-modal p) {
          margin: revert-layer;
        }
        .home-page h1:not(.contact-modal h1),
        .home-page h2:not(.contact-modal h2) {
          font-family: revert-layer;
          font-size: revert-layer;
          font-weight: revert-layer;
          line-height: revert-layer;
          letter-spacing: revert-layer;
          color: revert-layer;
          margin: revert-layer;
        }

        /* The hero's motion, as CSS so it runs without waiting for any JavaScript.
           Same movement, timing and easing it had as framer-motion animations
           (CSS ease-out and ease-in-out are framer's easeOut and easeInOut). */
        .home-hero-float {
          animation: home-hero-float 3s ease-in-out infinite;
        }
        @keyframes home-hero-float {
          0%, 100% { transform: translateY(0); box-shadow: 0 10px 40px rgba(255, 95, 31, 0.3); }
          50% { transform: translateY(-15px); box-shadow: 0 20px 80px rgba(255, 95, 31, 0.7); }
        }
        /* Settles in from slightly smaller; the hue shift starts at 1.2s. */
        .home-hero-img {
          animation: home-hero-settle 1.2s ease-out, home-hero-hue 5s ease-in-out 1.2s infinite backwards;
          transition: scale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .home-hero-img:hover {
          scale: 1.05;
        }
        @keyframes home-hero-settle {
          from { scale: 0.96; }
          to { scale: 1; }
        }
        @keyframes home-hero-hue {
          0%, 100% { filter: blur(0px) hue-rotate(0deg); }
          50% { filter: blur(0px) hue-rotate(45deg); }
        }
        @keyframes home-glow-pulse {
          0%, 100% { box-shadow: 0 0 28px 8px rgba(59, 130, 246, 0.55); }
          50% { box-shadow: 0 0 48px 18px rgba(59, 130, 246, 0.9); }
        }
        @keyframes home-hue-spin {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(360deg); }
        }
        @keyframes home-spin {
          to { rotate: 360deg; }
        }
        .home-rise {
          animation: home-rise 0.8s ease-out both;
        }
        @keyframes home-rise {
          from { opacity: 0; transform: translateY(20px); }
        }
      `}</style>

      {/* Global Background Wireframe */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      {/* =========================================
          SECTION 1: ORIGINAL HERO 
          ========================================= */}
      <header className="flex flex-col lg:flex-row items-center justify-center text-left site-container py-12 lg:py-24 gap-10 lg:gap-16 min-h-[85vh] relative z-10">
        
        {/* Left Column: Visual Hook */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-8 lg:ml-8">
          {/* The wrapper takes the image's own width limits (the img is w-full of it).
              Shrink-wrapped, it had no width until the image downloaded, so on a slow
              connection the hero painted at zero height and the text below jumped. */}
          <div className="home-hero-float rounded-3xl relative w-full max-w-sm md:max-w-md lg:max-w-lg">
            {/* The page's largest paint, so: AVIF/WebP/JPEG at 480/768/1024px (phones get a
                small one), preloaded in the pre-rendered HTML (src/i18n/prerender.ts), and
                width/height give the box its square shape before it arrives. It starts fully
                opaque: an opacity-0 start meant it didn't count as painted until the
                JavaScript loaded and the fade began. It still settles in from slightly
                smaller. */}
            <picture>
              <source type="image/avif" srcSet={HERO_IMAGE.avif} sizes={HERO_IMAGE.sizes} />
              <source type="image/webp" srcSet={HERO_IMAGE.webp} sizes={HERO_IMAGE.sizes} />
              <img
                src={HERO_IMAGE.src}
                srcSet={HERO_IMAGE.jpeg}
                sizes={HERO_IMAGE.sizes}
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                alt={t.hero.imageAlt}
                className="home-hero-img w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl bg-white relative z-10"
              />
            </picture>

            {/* Breathing glow over the medallion's outer ring \u2014 the image itself is untouched; this is a separate pulsing, hue-cycling glow layered on top */}
            <div
              className="absolute rounded-full pointer-events-none z-20"
              style={{
                top: '13%', left: '18%', right: '18%', bottom: '26%',
                animation: 'home-glow-pulse 6s ease-in-out infinite, home-hue-spin 9s linear infinite',
              }}
            />

            {/* Slow-turning gears, layered over the mechanical side of the lion's head \u2014 three shapes: large magenta, small teal, small dark-pink. Each cycles hue as it spins. */}
            <div
              className="absolute pointer-events-none z-20"
              style={{
                top: '48%', left: '37%', width: '9%', aspectRatio: '1 / 1',
                animation: 'home-spin 7s linear infinite, home-hue-spin 5s linear infinite',
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
                <path fill="#d946a8" d="M50 8 l6 12 13-4 2 13 13 2-4 13 12 6-8 11 8 11-12 6 4 13-13 2-2 13-13-4-6 12-6-12-13 4-2-13-13-2 4-13-12-6 8-11-8-11 12-6-4-13 13-2 2-13 13 4z M50 33a17 17 0 100 34 17 17 0 000-34z" />
              </svg>
            </div>
            <div
              className="absolute pointer-events-none z-20"
              style={{
                top: '53%', left: '42%', width: '5.5%', aspectRatio: '1 / 1',
                animation: 'home-spin 6s linear infinite reverse, home-hue-spin 4s linear infinite',
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
                <path fill="#2dd4bf" d="M50 8 l6 12 13-4 2 13 13 2-4 13 12 6-8 11 8 11-12 6 4 13-13 2-2 13-13-4-6 12-6-12-13 4-2-13-13-2 4-13-12-6 8-11-8-11 12-6-4-13 13-2 2-13 13 4z M50 33a17 17 0 100 34 17 17 0 000-34z" />
              </svg>
            </div>
            <div
              className="absolute pointer-events-none z-20"
              style={{
                top: '60%', left: '49%', width: '4.5%', aspectRatio: '1 / 1',
                animation: 'home-spin 8s linear infinite, home-hue-spin 6s linear infinite',
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
                <path fill="#be185d" d="M50 8 l6 12 13-4 2 13 13 2-4 13 12 6-8 11 8 11-12 6 4 13-13 2-2 13-13-4-6 12-6-12-13 4-2-13-13-2 4-13-12-6 8-11-8-11 12-6-4-13 13-2 2-13 13 4z M50 33a17 17 0 100 34 17 17 0 000-34z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Abbreviated Copy */}
        <div className="flex-1 w-full flex flex-col items-start text-left z-20">
          <h1
            className="home-rise text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-white">{t.hero.titleA}</span><br />
            <span className="text-brand-orange">{t.hero.titleB}</span>
          </h1>

          <div
            className="home-rise space-y-4 text-base md:text-lg text-slate-400 mb-8 max-w-xl leading-relaxed"
            style={{ animationDelay: '0.4s' }}
          >
            <p>
              {t.hero.p1}
            </p>
            <p>
              {t.hero.p2}
            </p>
          </div>

          <div
            className="home-rise flex flex-wrap gap-4"
            style={{ animationDelay: '0.6s' }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-8 py-3 rounded-md font-bold tracking-wide hover:opacity-90 transition-all shadow-md cursor-pointer hover:scale-105"
            >
              {t.hero.startProject}
            </button>
            <Link to={lp('/portfolio')}>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold tracking-wide hover:bg-white hover:text-slate-900 transition-all cursor-pointer hover:scale-105">
                {t.hero.viewWork}
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================
          FREE WEBSITE CHECK: type a website, continue on /website-check
          ========================================= */}
      <HomeWebsiteCheck />

      {/* =========================================
          SERVICES: one card per service (the header's "Services" link lands
          here), then the featured case study
          ========================================= */}
      <section id="services" className="site-container relative z-10 pb-12 scroll-mt-28">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6 text-center">{t.services.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.cards.map(card => (
            <Link
              key={card.path}
              to={lp(card.path)}
              onClick={card.path === '/website-check' ? () => trackEvent('home_website_check_click', lang, { placement: 'card' }) : undefined}
              className="group block text-left bg-slate-900/60 border border-slate-800 hover:border-brand-orange/50 rounded-3xl p-6 md:p-8 transition-colors"
            >
              <span className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-5">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={SERVICE_ICONS[card.icon]} />
                </svg>
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed mt-3">{card.body}</p>
              <span className="inline-block mt-5 text-xs font-bold tracking-widest uppercase text-brand-orange">
                {card.cta ?? t.services.learnMore} <span aria-hidden="true" className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Featured case study. The screenshot is cropped (object-bottom) to leave
            out the admin's sidebar logo: the card doesn't name the client. */}
        <Link
          to={lp(ONE_SOURCE_CASE_STUDY.path)}
          onClick={() => trackEvent('home_case_study_click', lang)}
          className="group mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left bg-gradient-to-br from-slate-900 to-[#020617] border border-brand-orange/30 hover:border-brand-orange/60 rounded-3xl p-6 md:p-10 transition-colors shadow-[0_0_30px_rgba(255,95,31,0.08)]"
        >
          <div>
            <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
              {t.caseStudy.badge}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mt-5">{t.caseStudy.title}</h3>
            <p className="text-slate-400 leading-relaxed mt-4">{t.caseStudy.body}</p>
            <ul className="flex flex-wrap gap-2 mt-5">
              {t.caseStudy.chips.map(chip => (
                <li key={chip} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-950/60 text-xs font-semibold text-slate-300">{chip}</li>
              ))}
            </ul>
            <span className="inline-block mt-6 bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs group-hover:bg-white group-hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)]">
              {t.caseStudy.cta} <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 aspect-[800/464] bg-[#fdfaf3]">
            <img
              src={CASE_STUDY_IMAGE}
              alt={t.caseStudy.imageAlt}
              width={800} height={500}
              loading="lazy" decoding="async"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </Link>
      </section>

      {/* =========================================
          SECTION 2: MEAL-PREP CALCULATOR (LIVE SLICE)
          Sits above the transition banner: the banner's "Here is a live
          demonstration" introduces the rendering demos, so the two stay together.
          ========================================= */}
      <MealPrepPreview />

      {/* =========================================
          TRANSITION HEADER
          ========================================= */}
      <div className="w-full text-center py-32 relative z-10 border-t border-slate-900 mt-20">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6">{t.banner.eyebrow}</h2>
        <div className="text-center w-full max-w-3xl mx-auto px-6">
          <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed bg-brand-orange text-white py-2 px-4 rounded-xl shadow-[0_0_30px_rgba(255,95,31,0.3)] inline-block">
            {t.banner.body}
          </p>
        </div>
      </div>

      <AnimationShowcase />

      {/* =========================================
          SECTION 5: FRAMER PLAYGROUND (GAMIFIED)
          ========================================= */}
      <div className="relative z-10 w-full border-t border-slate-900 bg-slate-950">
        <FramerPlayground />
      </div>


      {/* =========================================
          NEXT PAGE RUNWAY CTA (The Engine)
          ========================================= */}
      <div className="site-container mt-16 mb-24 relative z-10">
        <Link 
          to={lp('/automations')}
          className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">{t.runway.eyebrow}</h3>
              <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 transition-all duration-500">
                {t.runway.title}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-[#020617] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,95,31,0.5)] shrink-0">
              <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
        </Link>
      </div>


      {/* =========================================
          GLOBAL OVERLAYS & MODALS
          ========================================= */}
      
      {/* 2. Global Communication Webhook Modal */}
      {modalReady && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} source="Home Page" />
        </Suspense>
      )}

    </div>
  );
}