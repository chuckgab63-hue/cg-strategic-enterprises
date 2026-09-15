import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ContactModal from '../components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSequences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Mobile Swipe Carousel State (Horizontal Scroll Container is scroll-driven
  // via GSAP on desktop; below 1024px it becomes a touch-swipeable carousel instead) ---
  const [mobilePanel, setMobilePanel] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );
  const touchStartX = useRef<number | null>(null);

  const goToPanel = (index: number) => setMobilePanel(Math.max(0, Math.min(index, 2)));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (deltaX < -threshold) goToPanel(mobilePanel + 1);
    else if (deltaX > threshold) goToPanel(mobilePanel - 1);
    touchStartX.current = null;
  };

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useGSAP(() => {
    // Desktop-only scroll-jacked effects: GSAP's scroll-scrubbed animations rely on
    // stable viewport height math, which mobile browsers break by resizing the
    // address bar mid-scroll — so all three scroll-tied hero/panel effects are
    // gated to desktop here. Mobile gets the plain, always-visible version instead.
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        // Fade out the surrounding UI elements early so the scale effect is clean
        gsap.to('.fade-element', {
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: '30% top',
            scrub: true,
          },
        });

        // 1. Hero Text Scale (Scrubbed to scrollbar)
        gsap.to(heroTextRef.current, {
          scale: 15,
          opacity: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
          },
        });

        // 2. Horizontal Scroll Section (The Film Strip)
        const panels = gsap.utils.toArray('.horizontal-panel');

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1, // Smooth 1-second delay on the scrub
            snap: 1 / (panels.length - 1),
            end: () => "+=" + (horizontalRef.current?.offsetWidth || 0),
          },
        });
      },
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white relative">
      
      {/* Hero Section */}
      <section className="hero-section h-screen w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-midnight/40 via-slate-950 to-slate-950"></div>
        
        <div className="z-10 w-full flex flex-col items-center justify-center h-full pt-20">
          
          {/* Inline Nav */}
          <div className="fade-element w-full flex justify-center mb-10">
            <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm relative z-50">
              &larr; BACK TO HUB
            </Link>
          </div>

          <h1 ref={heroTextRef} className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none whitespace-nowrap origin-center">
            CINEMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">SCALE.</span>
          </h1>
          
          <div className="fade-element flex flex-col items-center mt-10">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-lg mb-4">
              Efficiency Engineered. Growth Automated.
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto opacity-70">
              Scroll down to initialize the timeline.
            </p>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center">
              <div className="absolute w-14 h-14 bg-brand-orange/50 rounded-full blur-xl animate-pulse"></div>
              <svg className="relative w-10 h-10 text-brand-orange animate-bounce drop-shadow-[0_0_10px_rgba(255,95,31,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Container: scroll-jacked on desktop, swipeable on mobile */}
      <section ref={horizontalRef} className="h-screen w-full overflow-hidden bg-[#020617] relative border-t border-slate-900">
        
        {/* Background wireframe grid */}
        <div className="absolute top-0 left-0 h-full w-[300%] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>

        <motion.div
          className="flex flex-nowrap w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          animate={{ x: isMobile ? `-${mobilePanel * 100}%` : 0 }}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
        >
          {/* Panel 1 */}
          <div className="horizontal-panel w-full h-full flex items-center justify-center relative px-6 md:px-24 shrink-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[40rem] font-black text-slate-900/40 z-0 select-none tracking-tighter">01</div>
            <div className="z-10 max-w-4xl backdrop-blur-sm bg-slate-950/60 p-8 md:p-16 rounded-3xl border border-slate-800 shadow-2xl">
              <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-brand-orange"></span> Phase 1
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-6">The Audit.</h3>
              <p className="text-2xl text-slate-300 leading-relaxed font-light">
                We don't guess. We map your exact processes, find the hidden revenue leaks, and identify the manual, repetitive work that is stealing your time.
              </p>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="horizontal-panel w-full h-full flex items-center justify-center relative px-6 md:px-24 shrink-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[40rem] font-black text-slate-900/40 z-0 select-none tracking-tighter">02</div>
            <div className="z-10 max-w-4xl backdrop-blur-sm bg-slate-950/60 p-8 md:p-16 rounded-3xl border border-brand-orange/20 shadow-[0_0_50px_rgba(255,95,31,0.1)]">
              <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-brand-orange"></span> Phase 2
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-6">The Engineering.</h3>
              <p className="text-2xl text-slate-300 leading-relaxed font-light">
                We build custom digital infrastructure. From seamless CRM integrations to client portals, we engineer the systems that allow you to scale without adding headcount.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="horizontal-panel w-full h-full flex items-center justify-center relative px-6 md:px-24 shrink-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[40rem] font-black text-slate-900/40 z-0 select-none tracking-tighter">03</div>
            <div className="z-10 max-w-4xl text-center flex flex-col items-center">
              <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4">Phase 3</h2>
              <h3 className="text-6xl md:text-8xl font-black mb-6">Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Growth.</span></h3>
              <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
                Lead routing, automated invoicing, and intelligent support. Your business runs 24/7, delivering flawless client experiences while you step back from the daily grind.
              </p>
              {/* Trigger Communication Modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-orange text-white px-12 py-5 rounded-md font-bold tracking-widest uppercase hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105 cursor-pointer"
              >
                Start Your Transformation
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile swipe indicator dots + directional nav arrows */}
        <button
          onClick={() => goToPanel(mobilePanel - 1)}
          disabled={mobilePanel === 0}
          aria-label="Previous phase"
          className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-white z-20 disabled:opacity-30 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goToPanel(mobilePanel + 1)}
          disabled={mobilePanel === 2}
          aria-label="Next phase"
          className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-white z-20 disabled:opacity-30 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => goToPanel(i)}
              aria-label={`Go to phase ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                mobilePanel === i ? 'w-6 bg-brand-orange' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

      </section>

      {/* Outro Spacer */}
      <section className="h-[40vh] w-full bg-slate-950 flex flex-col items-center justify-center border-t border-slate-900 relative z-20">
         <p className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-4">Efficiency Engineered. Growth Automated.</p>
         <div className="w-12 h-1 bg-brand-orange/50 rounded-full"></div>
      </section>

      {/* --- Global Communication Modal --- */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="cinematic"
        source="Cinematic Sequences Page"
      />

    </div>
  );
}