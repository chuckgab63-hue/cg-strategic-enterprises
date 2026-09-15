import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactModal from '../components/ContactModal';

interface Phase {
  number: string;
  label: string;
  title: React.ReactNode;
  description: string;
  cardClass: string;
  rotate: number;
  cta?: boolean;
}

const PHASES: Phase[] = [
  {
    number: '01',
    label: 'Phase 1',
    title: 'The Audit.',
    description: "We don't guess. We map your exact processes, find the hidden revenue leaks, and identify the manual, repetitive work that is stealing your time.",
    cardClass: 'bg-slate-950/80 border-slate-800 shadow-2xl',
    rotate: -2,
  },
  {
    number: '02',
    label: 'Phase 2',
    title: 'The Engineering.',
    description: 'We build custom digital infrastructure. From seamless CRM integrations to client portals, we engineer the systems that allow you to scale without adding headcount.',
    cardClass: 'bg-slate-950/80 border-brand-orange/30 shadow-[0_0_60px_rgba(255,95,31,0.2)]',
    rotate: 1.5,
  },
  {
    number: '03',
    label: 'Phase 3',
    title: (
      <>Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Growth.</span></>
    ),
    description: 'Lead routing, automated invoicing, and intelligent support. Your business runs 24/7, delivering flawless client experiences while you step back from the daily grind.',
    cardClass: 'bg-slate-950/80 border-pink-500/30 shadow-[0_0_60px_rgba(236,72,153,0.25)]',
    rotate: -1.5,
    cta: true,
  },
];

export default function CinematicSequences() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white relative">
      
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-midnight/40 via-slate-950 to-slate-950"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="z-10 w-full flex flex-col items-center justify-center h-full pt-20"
        >
          <div className="w-full flex justify-center mb-10">
            <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm relative z-50">
              &larr; BACK TO HUB
            </Link>
          </div>

          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none whitespace-nowrap origin-center">
            CINEMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">SCALE.</span>
          </h1>
          
          <div className="flex flex-col items-center mt-10">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-lg mb-4">
              Efficiency Engineered. Growth Automated.
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto opacity-70">
              Scroll down to see how it works.
            </p>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center">
              <div className="absolute w-14 h-14 bg-brand-orange/50 rounded-full blur-xl animate-pulse"></div>
              <svg className="relative w-10 h-10 text-brand-orange animate-bounce drop-shadow-[0_0_10px_rgba(255,95,31,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stacked Phase Cards — each sticks to the top and the next tiles over it as you scroll */}
      <section className="relative w-full bg-[#020617] border-t border-slate-900">
        {PHASES.map((phase, i) => (
          <div
            key={phase.number}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ zIndex: i + 1 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] md:text-[40rem] font-black text-slate-900/40 select-none tracking-tighter pointer-events-none">
              {phase.number}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9, rotate: phase.rotate }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: phase.rotate }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`relative z-10 max-w-4xl mx-6 backdrop-blur-sm p-8 md:p-16 rounded-3xl border ${phase.cardClass} ${phase.cta ? 'text-center flex flex-col items-center' : ''}`}
            >
              <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-brand-orange"></span> {phase.label}
              </h2>
              <h3 className={phase.cta ? 'text-6xl md:text-8xl font-black mb-6' : 'text-5xl md:text-7xl font-bold mb-6'}>
                {phase.title}
              </h3>
              <p className={`text-2xl text-slate-300 leading-relaxed font-light ${phase.cta ? 'mb-12' : ''}`}>
                {phase.description}
              </p>
              {phase.cta && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-brand-orange text-white px-12 py-5 rounded-md font-bold tracking-widest uppercase hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105 cursor-pointer"
                >
                  Start Your Transformation
                </button>
              )}
            </motion.div>
          </div>
        ))}
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
