import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Restored Components ---
import FramerPlayground from '../components/FramerPlayground';
import AnimationShowcase from '../components/AnimationShowcase';
import ContactModal from '../components/ContactModal';
import MealPrepPreview from '../components/MealPrepPreview';
import { useLocalePath, useT } from '../i18n/useLang';
import home from '../i18n/home';
import { BUSINESS_NAME, EMAIL, PHONE_INTL, SITE_URL } from '../config/site';
import { HERO_IMAGE } from '../config/heroImage';

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
  const lp = useLocalePath();
  
  // --- Global Form/Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <motion.div
            className="rounded-3xl relative w-full max-w-sm md:max-w-md lg:max-w-lg"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -15, 0],
              boxShadow: [
                '0 10px 40px rgba(255, 95, 31, 0.3)',
                '0 20px 80px rgba(255, 95, 31, 0.7)',
                '0 10px 40px rgba(255, 95, 31, 0.3)'
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* width/height give the box its square shape before the image arrives. */}
            <motion.img
              src={HERO_IMAGE.src}
              srcSet={HERO_IMAGE.srcSet}
              sizes={HERO_IMAGE.sizes}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              fetchPriority="high"
              alt={t.hero.imageAlt}
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl bg-white relative z-10"
              initial={{ opacity: 0, scale: 0.96, filter: "blur(8px) hue-rotate(0deg)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: [
                  "blur(0px) hue-rotate(0deg)", 
                  "blur(0px) hue-rotate(45deg)",
                  "blur(0px) hue-rotate(0deg)"
                ]
              }}
              transition={{ 
                opacity: { duration: 1.2, ease: "easeOut" },
                scale: { duration: 1.2, ease: "easeOut" },
                filter: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 } 
              }}
              whileHover={{ scale: 1.05 }}
            />

            {/* Breathing glow over the medallion's outer ring \u2014 the image itself is untouched; this is a separate pulsing, hue-cycling glow layered on top */}
            <motion.div
              className="absolute rounded-full pointer-events-none z-20"
              style={{ top: '13%', left: '18%', right: '18%', bottom: '26%' }}
              animate={{
                boxShadow: [
                  '0 0 28px 8px rgba(59,130,246,0.55)',
                  '0 0 48px 18px rgba(59,130,246,0.9)',
                  '0 0 28px 8px rgba(59,130,246,0.55)',
                ],
                filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
              }}
              transition={{
                boxShadow: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                filter: { duration: 9, repeat: Infinity, ease: 'linear' },
              }}
            />

            {/* Slow-turning gears, layered over the mechanical side of the lion's head \u2014 three shapes: large magenta, small teal, small dark-pink. Each cycles hue as it spins. */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{ top: '48%', left: '37%', width: '9%', aspectRatio: '1 / 1' }}
              animate={{ rotate: 360, filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
              transition={{
                rotate: { duration: 7, repeat: Infinity, ease: 'linear' },
                filter: { duration: 5, repeat: Infinity, ease: 'linear' },
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
                <path fill="#d946a8" d="M50 8 l6 12 13-4 2 13 13 2-4 13 12 6-8 11 8 11-12 6 4 13-13 2-2 13-13-4-6 12-6-12-13 4-2-13-13-2 4-13-12-6 8-11-8-11 12-6-4-13 13-2 2-13 13 4z M50 33a17 17 0 100 34 17 17 0 000-34z" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{ top: '53%', left: '42%', width: '5.5%', aspectRatio: '1 / 1' }}
              animate={{ rotate: -360, filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
                filter: { duration: 4, repeat: Infinity, ease: 'linear' },
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
                <path fill="#2dd4bf" d="M50 8 l6 12 13-4 2 13 13 2-4 13 12 6-8 11 8 11-12 6 4 13-13 2-2 13-13-4-6 12-6-12-13 4-2-13-13-2 4-13-12-6 8-11-8-11 12-6-4-13 13-2 2-13 13 4z M50 33a17 17 0 100 34 17 17 0 000-34z" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{ top: '60%', left: '49%', width: '4.5%', aspectRatio: '1 / 1' }}
              animate={{ rotate: 360, filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                filter: { duration: 6, repeat: Infinity, ease: 'linear' },
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
                <path fill="#be185d" d="M50 8 l6 12 13-4 2 13 13 2-4 13 12 6-8 11 8 11-12 6 4 13-13 2-2 13-13-4-6 12-6-12-13 4-2-13-13-2 4-13-12-6 8-11-8-11 12-6-4-13 13-2 2-13 13 4z M50 33a17 17 0 100 34 17 17 0 000-34z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: High-Impact Abbreviated Copy */}
        <div className="flex-1 w-full flex flex-col items-start text-left z-20">
          <motion.h1 
            className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-white">{t.hero.titleA}</span><br />
            <span className="text-brand-orange">{t.hero.titleB}</span>
          </motion.h1>

          <motion.div 
            className="space-y-4 text-base md:text-lg text-slate-400 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p>
              {t.hero.p1}
            </p>
            <p>
              {t.hero.p2}
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
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
          </motion.div>
        </div>
      </header>

      {/* =========================================
          SERVICES: one card per service page
          ========================================= */}
      <section className="site-container relative z-10 pb-12">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6 text-center">{t.services.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.cards.map(card => (
            <Link
              key={card.path}
              to={lp(card.path)}
              className="group block text-left bg-slate-900/60 border border-slate-800 hover:border-brand-orange/50 rounded-3xl p-6 md:p-8 transition-colors"
            >
              <h3 className="text-xl md:text-2xl font-black text-white">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed mt-3">{card.body}</p>
              <span className="inline-block mt-5 text-xs font-bold tracking-widest uppercase text-brand-orange">
                {t.services.learnMore} <span aria-hidden="true" className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
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
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} source="Home Page" />

    </div>
  );
}