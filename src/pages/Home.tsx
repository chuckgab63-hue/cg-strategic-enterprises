import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Restored Components ---
import FramerPlayground from '../components/FramerPlayground';
import ContactModal from '../components/ContactModal';


// MAIN COMPONENT: CONTINUOUS SCROLL HOME
// ==========================================
export default function Home() {
  
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
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white relative">
      
      {/* Global Background Wireframe */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      {/* =========================================
          SECTION 1: ORIGINAL HERO 
          ========================================= */}
      <header className="flex flex-col lg:flex-row items-center justify-center text-left max-w-7xl mx-auto w-full p-6 py-12 lg:py-24 gap-10 lg:gap-16 min-h-[85vh] relative z-10">
        
        {/* Left Column: Visual Hook */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-8 lg:ml-8">
          <motion.div
            className="rounded-3xl"
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
            <motion.img
              src="/hero-live.webp"
              alt="CG Strategic Enterprises"
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
          </motion.div>
        </div>

        {/* Right Column: High-Impact Abbreviated Copy */}
        <div className="flex-1 w-full flex flex-col items-start text-left z-20">
          <motion.h1 
            className="text-4xl lg:text-6xl font-black mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-white">Look established.</span><br />
            <span className="text-brand-orange">Or BE established.</span>
          </motion.h1>

          <motion.div 
            className="space-y-4 text-base md:text-lg text-slate-400 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p>
              In an industry obsessed with "faking it," we operate differently. CG Strategic Enterprises is built on forty-five years of enterprise architecture experience. 
            </p>
            <p>
              No smoke, mirrors, or marketing fluff. Just tested code, secure integrations, and relentless execution to streamline your operations so your team runs leaner and faster.
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
              Start a Project
            </button>
            <Link to="/portfolio">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold tracking-wide hover:bg-white hover:text-slate-900 transition-all cursor-pointer hover:scale-105">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* =========================================
          TRANSITION HEADER
          ========================================= */}
      <div className="w-full text-center py-32 relative z-10 border-t border-slate-900 mt-20">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6">Elevate Your Digital Presence</h2>
        <div className="text-center w-full max-w-3xl mx-auto px-6">
          <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed bg-brand-orange text-white py-2 px-4 rounded-xl shadow-[0_0_30px_rgba(255,95,31,0.3)] inline-block">
            We transform flat, static websites into dynamic digital experiences. Here is a live demonstration of our rendering capabilities.
          </p>
        </div>
      </div>

      {/* =========================================
          SECTION 5: FRAMER PLAYGROUND (GAMIFIED)
          ========================================= */}
      <div className="relative z-10 w-full border-t border-slate-900 bg-slate-950">
        <FramerPlayground />
      </div>


      {/* =========================================
          NEXT PAGE RUNWAY CTA (The Engine)
          ========================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-16 mb-24 relative z-10">
        <Link 
          to="/automations" 
          className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">Continue Exploring</h3>
              <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 transition-all duration-500">
                Enter The Engine.
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