import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSequences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
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

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Hero Section */}
      <section className="hero-section h-screen w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-midnight/40 via-slate-950 to-slate-950"></div>
        
        <div className="z-10 w-full flex flex-col items-center justify-center h-full pt-20">
          
          {/* Inline Nav - Matching UIPolish styling */}
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
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-brand-orange opacity-70">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Container */}
      <section ref={horizontalRef} className="h-screen flex flex-nowrap w-full overflow-hidden bg-[#020617] relative border-t border-slate-900">
        
        {/* Background wireframe grid for depth across the whole horizontal span */}
        <div className="absolute top-0 left-0 h-full w-[300%] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>

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
            <button className="bg-brand-orange text-white px-12 py-5 rounded-md font-bold tracking-widest uppercase hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105 cursor-pointer">
              Start Your Transformation
            </button>
          </div>
        </div>

      </section>

      {/* Outro Spacer (gives the user scrolling room to exit the pin) */}
      <section className="h-[40vh] w-full bg-slate-950 flex flex-col items-center justify-center border-t border-slate-900">
         <p className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-4">Efficiency Engineered. Growth Automated.</p>
         <div className="w-12 h-1 bg-brand-orange/50 rounded-full"></div>
      </section>

    </div>
  );
}