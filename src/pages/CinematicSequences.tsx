import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSequences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  // --- Modal & Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  // Handle Make.com Webhook Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      // Replace with your actual Make.com webhook URL
      await fetch('YOUR_MAKE_WEBHOOK_URL_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('idle');
    }
  };

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
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-brand-orange opacity-70">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Container */}
      <section ref={horizontalRef} className="h-screen flex flex-nowrap w-full overflow-hidden bg-[#020617] relative border-t border-slate-900">
        
        {/* Background wireframe grid */}
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
            {/* Trigger Communication Modal */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-12 py-5 rounded-md font-bold tracking-widest uppercase hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105 cursor-pointer"
            >
              Start Your Transformation
            </button>
          </div>
        </div>

      </section>

      {/* Outro Spacer */}
      <section className="h-[40vh] w-full bg-slate-950 flex flex-col items-center justify-center border-t border-slate-900 relative z-20">
         <p className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-4">Efficiency Engineered. Growth Automated.</p>
         <div className="w-12 h-1 bg-brand-orange/50 rounded-full"></div>
      </section>

      {/* --- Global Communication Modal (Stacked over GSAP) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pt-20">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-[#020617] shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-white">Initialize Communication</h3>
                  <p className="text-slate-400 text-sm mt-1">Select your preferred routing protocol.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 md:pb-12 overflow-y-auto custom-scrollbar flex flex-col md:flex-row items-start gap-8 bg-[#020617]">
                
                {/* Option 1: AI Voicebot */}
                <div className="flex-1 w-full bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all group shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">AI Voice Interface</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                    Bypass the form. Instantly connect with our intelligent voice agent to ask questions and route your inquiry directly to the right engineer.
                  </p>
                  <a 
                    href="tel:+15555555555" 
                    className="w-full bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    Initiate Call
                  </a>
                </div>

                {/* Option 2: Webhook Form */}
                <div className="flex-[1.2] w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shrink-0">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
                     <h4 className="text-white font-bold text-lg">Secure Data Transmission</h4>
                  </div>
                  
                  {formStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <h5 className="text-emerald-400 font-bold mb-2">Payload Delivered</h5>
                      <p className="text-slate-400 text-sm">Your data has been successfully routed to our internal systems.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input 
                        type="text" 
                        required
                        placeholder="System / Commander Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
                      />
                      <input 
                        type="email" 
                        required
                        placeholder="Secure Comm Link (Email)" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
                      />
                      <textarea 
                        required
                        placeholder="Define your operational objective..." 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors resize-none"
                      />
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
                          formStatus === 'submitting' 
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600' 
                            : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent'
                        }`}
                      >
                        {formStatus === 'submitting' ? 'Transmitting...' : 'Transmit Payload'}
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}