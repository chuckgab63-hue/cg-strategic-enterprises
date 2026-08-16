import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CinematicSequences() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all sections we want to animate on scroll
    const panels = gsap.utils.toArray('.panel');

    panels.forEach((panel: any) => {
      gsap.fromTo(
        panel.querySelector('.content'),
        { opacity: 0, y: 150, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%', // Triggers when the top of the panel hits 80% down the screen
            end: 'top 20%',
            toggleActions: 'play none none reverse', // Reverses animation if they scroll back up
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Sticky Navigation */}
      <div className="fixed top-0 left-0 w-full p-6 z-50">
        <Link to="/" className="text-white/70 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm">
          &larr; Back to Hub
        </Link>
      </div>

      {/* Hero Intro - Takes up 100vh */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-midnight/40 via-slate-950 to-slate-950"></div>
        <div className="z-10 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            CINEMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">SCALE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto">
            Scroll down to experience how we transform chaotic workflows into streamlined, automated engines.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-brand-orange opacity-70">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* Timeline Panel 1 */}
      <section className="panel min-h-screen flex items-center justify-center relative px-6 border-t border-slate-900">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black text-slate-900/60 z-0 select-none">01</div>
         <div className="content z-10 max-w-4xl">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-brand-orange"></span> Phase 1
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-6">The Audit.</h3>
            <p className="text-2xl text-slate-300 leading-relaxed font-light">
              We don't guess. We map your exact processes, find the hidden revenue leaks, and identify the manual, repetitive work that is stealing your time.
            </p>
         </div>
      </section>

      {/* Timeline Panel 2 - Shifted text to the right for visual rhythm */}
      <section className="panel min-h-screen flex items-center justify-end relative px-6 md:px-24 border-t border-slate-900 bg-slate-900/20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black text-slate-900/60 z-0 select-none">02</div>
         <div className="content z-10 max-w-3xl text-right">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center justify-end gap-4">
              Phase 2 <span className="w-12 h-[2px] bg-brand-orange"></span>
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-6">The Engineering.</h3>
            <p className="text-2xl text-slate-300 leading-relaxed font-light">
              We build custom digital infrastructure. From seamless CRM integrations to client portals, we engineer the systems that allow you to scale without adding headcount.
            </p>
         </div>
      </section>

      {/* Timeline Panel 3 */}
      <section className="panel min-h-screen flex items-center justify-center relative px-6 border-t border-slate-900 pb-24">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black text-slate-900/60 z-0 select-none">03</div>
         <div className="content z-10 max-w-4xl text-center flex flex-col items-center">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4">Phase 3</h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-6">Automated Growth.</h3>
            <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
              Lead routing, automated invoicing, and intelligent support. Your business runs 24/7, delivering flawless client experiences while you step back from the daily grind.
            </p>
            <button className="bg-brand-orange text-white px-12 py-5 rounded-md font-bold tracking-widest uppercase hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105">
              Start Your Transformation
            </button>
         </div>
      </section>
      
    </div>
  );
}