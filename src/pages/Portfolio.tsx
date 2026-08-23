import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnalysisWidget from '../components/AnalysisWidget';
import PropertyWidget from '../components/PropertyWidget';
import TaxWidget from '../components/TaxWidget';

export default function Portfolio() {
  const [activeAudio, setActiveAudio] = useState<number | null>(null);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);

  const toggleMute = (id: number) => {
    setActiveAudio((prevActive) => {
      const newActive = prevActive === id ? null : id;
      
      // Video 1 Engine Force
      if (video1Ref.current) {
        video1Ref.current.muted = newActive !== 1;
        if (newActive === 1) {
          video1Ref.current.volume = 1.0;
          video1Ref.current.play().catch(e => console.error("Playback error V1:", e));
        }
      }
      
      // Video 2 Engine Force
      if (video2Ref.current) {
        video2Ref.current.muted = newActive !== 2;
        if (newActive === 2) {
          video2Ref.current.volume = 1.0;
          video2Ref.current.play().catch(e => console.error("Playback error V2:", e));
        }
      }
      
      // Video 3 Engine Force
      if (video3Ref.current) {
        video3Ref.current.muted = newActive !== 3;
        if (newActive === 3) {
          video3Ref.current.volume = 1.0;
          video3Ref.current.play().catch(e => console.error("Playback error V3:", e));
        }
      }

      return newActive;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center py-16 px-6 relative overflow-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-midnight/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="max-w-6xl w-full z-10 flex flex-col gap-12">
        
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Studies.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We do not just build websites. We engineer digital infrastructure that solves operational bottlenecks and drives revenue.
          </p>
        </header>

        {/* Flagship Case Study 1: Front-End AI (One Source Pest Control) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-brand-midnight text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full">
                  Front-End UI
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  One Source Total Pest Control
                </span>
              </div>
              
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                The AI Diagnostic <br/> Lead Magnet.
              </h2>
              
              <div className="space-y-6 text-slate-400 leading-relaxed mb-8">
                <p>
                  <strong className="text-white">The Problem:</strong> Property managers and homeowners often misidentify pest threats, leading to DIY failures, wasted truck rolls, and lost time for field technicians.
                </p>
                <p>
                  <strong className="text-white">The Solution:</strong> We engineered the <span className="text-[#CCFF00]">Duval Hub Architect</span>—a custom AI vision analyzer integrated directly into the client's web portal. 
                </p>
                <p>
                  Users upload a photo of the pest or damage. The system cross-references local databases, calculates structural risk, and instantly generates a professional dispatch report. It provides immediate value to the user while simultaneously converting high-intent leads directly to the dispatch team.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-black text-white mb-1">24/7</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Lead Qualification</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">Vision</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">AI Image Processing</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#CCFF00]/10 rounded-full blur-[100px] pointer-events-none"></div>
              <AnalysisWidget />
            </div>
          </div>
        </motion.div>

        {/* Case Study 2: Back-End Infrastructure (CRM Routing) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="order-2 lg:order-1 bg-[#020617] rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[400px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-30"></div>

              <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                <div className="bg-slate-900 border border-brand-orange shadow-[0_0_15px_rgba(255,95,31,0.3)] rounded-xl px-6 py-3 text-white font-bold text-sm w-48 text-center z-10 relative">
                  Captured Web Lead
                </div>
                <div className="w-0.5 h-10 bg-slate-700 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-brand-orange animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                </div>
                <div className="bg-slate-800 border border-slate-600 rounded-xl px-6 py-3 text-slate-300 font-bold text-sm w-56 text-center z-10">
                  Data Transformation
                </div>
                <div className="w-full max-w-[200px] h-10 flex justify-between relative mt-[-2px]">
                  <div className="w-1/2 h-full border-r-2 border-b-2 border-slate-700 rounded-br-lg"></div>
                  <div className="w-1/2 h-full border-l-2 border-b-2 border-slate-700 rounded-bl-lg"></div>
                </div>
                <div className="flex gap-4 w-full justify-center pt-2">
                  <div className="bg-slate-900 border border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-xl px-4 py-3 text-white font-bold text-[11px] w-44 text-center z-10">
                    Target CRM (FUB / Buildium)
                  </div>
                  <div className="bg-slate-900 border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] rounded-xl px-4 py-3 text-white font-bold text-[11px] w-44 text-center z-10">
                    Client Welcome SMS
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-brand-midnight text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full">
                  Back-End Architecture
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  Zero-Touch Operations
                </span>
              </div>
              
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                The Zero-Touch <br/> Data Pipeline.
              </h2>
              
              <div className="space-y-6 text-slate-400 leading-relaxed mb-8">
                <p>
                  <strong className="text-white">The Problem:</strong> Generating leads across varying divisions is useless if your team still has to manually copy and paste data from email alerts into multiple different software platforms.
                </p>
                <p>
                  <strong className="text-white">The Solution:</strong> We build automated, asynchronous data pipelines that connect your front-end web portals directly into your entire operational stack.
                </p>
                <p>
                  By leveraging webhook architecture, the moment a client submits a request, their data is instantly transformed and securely pushed into the correct system (like Follow Up Boss, Buildium, or GorillaDesk). Simultaneously, a personalized SMS is triggered, guaranteeing a sub-5-minute response time without human intervention.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-black text-white mb-1">&lt; 5m</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Lead Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">0</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Manual Data Entries</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Study 3: Cross-Discipline AI (Real Estate/Construction) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="relative order-2 lg:order-1">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <PropertyWidget />
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-brand-midnight text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-widest rounded-full">
                  Operations & Triage
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  Real Estate & Construction
                </span>
              </div>
              
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                The Omni-Triage <br/> Property Hub.
              </h2>
              
              <div className="space-y-6 text-slate-400 leading-relaxed mb-8">
                <p>
                  <strong className="text-white">The Problem:</strong> Managing Real Estate, Property Management, and Construction creates a massive communications bottleneck. The phone never stops ringing with routine questions, site updates, and maintenance requests, stalling actual growth.
                </p>
                <p>
                  <strong className="text-white">The Solution:</strong> We deploy the <span className="text-blue-400">Omni-Triage Hub</span>—a unified AI interface designed to classify and route operational requests instantly.
                </p>
                <p>
                  Whether a tenant is reporting a leaky sink, a buyer is scheduling a showing, or a field crew is uploading photos of site framing, the AI analyzes the intent. It categorizes the data, prioritizes urgency, and fires off a Make.com webhook to automatically alert the correct vendor, update the daily log, or book the calendar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-black text-white mb-1">24/7</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Unified Dispatch</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">Visual</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Context Routing</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Study 4: E-Commerce API Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-brand-midnight text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest rounded-full">
                  E-Commerce Integration
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  Retail Compliance
                </span>
              </div>
              
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                The Real-Time <br/> Tax Engine.
              </h2>
              
              <div className="space-y-6 text-slate-400 leading-relaxed mb-8">
                <p>
                  <strong className="text-white">The Problem:</strong> E-commerce retailers lose conversions and face severe audit risks by relying on static, outdated sales tax tables. Municipal rates change constantly, and miscalculating at checkout destroys profit margins.
                </p>
                <p>
                  <strong className="text-white">The Solution:</strong> We engineer embeddable, real-time calculation modules that integrate directly into the checkout flow.
                </p>
                <p>
                  By establishing a live API connection to enterprise tax databases (like TaxJar or Stripe Tax), the widget intercepts the cart payload, references the buyer's exact zip code against live municipal records, and returns the mathematically perfect tax rate in milliseconds—ensuring absolute compliance before the payment gateway is ever fired.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-black text-white mb-1">Live</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">API Data Retrieval</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-1">100%</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Audit Compliance</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <TaxWidget />
            </div>
          </div>
        </motion.div>

        {/* Case Study 5: Omni-Channel Traffic & Cinematic AI Media */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-10">
            
            {/* Header & Strategic Copy */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-brand-midnight text-pink-400 border border-pink-500/30 text-xs font-bold uppercase tracking-widest rounded-full">
                  Traffic & Conversion
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  Omni-Channel Lead Gen
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Cinematic Creative. <br/> Algorithmic Scale.
              </h2>
              
              <div className="space-y-4 text-slate-400 leading-relaxed text-base">
                <p>
                  <strong className="text-white">The Problem:</strong> Service businesses need high-intent traffic to fuel their automation pipelines, but producing scroll-stopping, cinematic video assets with memorable audio branding is traditionally slow and cost-prohibitive.
                </p>
                <p>
                  <strong className="text-white">The Solution:</strong> We engineer the top of the funnel using advanced AI video generation (Google Veo) to rapidly produce hyper-realistic, conversion-optimized campaigns.
                </p>
                <p>
                  By pairing cinematic visuals and high-retention audio jingles with targeted ad architecture—spanning TikTok lead generation, Google LSA, and Facebook Media—we consistently feed automated triage systems with qualified traffic.
                </p>
              </div>
            </div>

            {/* 3-Video Widescreen Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Video 1 */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#020617] shadow-xl group aspect-video">
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-pink-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-pink-500/30">
                    Campaign 01
                  </span>
                </div>
                
                <button 
                  onClick={() => toggleMute(1)}
                  className="absolute bottom-3 right-3 z-20 bg-black/70 hover:bg-black backdrop-blur-md border border-white/10 text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-lg cursor-pointer"
                  title={activeAudio === 1 ? "Mute Audio" : "Unmute Audio"}
                >
                  {activeAudio !== 1 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                <video 
                  ref={video1Ref}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  src="/veo-ad-1.mp4" 
                />
              </div>

              {/* Video 2 */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#020617] shadow-xl group aspect-video">
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-pink-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-pink-500/30">
                    Campaign 02
                  </span>
                </div>
                
                <button 
                  onClick={() => toggleMute(2)}
                  className="absolute bottom-3 right-3 z-20 bg-black/70 hover:bg-black backdrop-blur-md border border-white/10 text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-lg cursor-pointer"
                  title={activeAudio === 2 ? "Mute Audio" : "Unmute Audio"}
                >
                  {activeAudio !== 2 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                <video 
                  ref={video2Ref}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  src="/veo-ad-2.mp4" 
                />
              </div>

              {/* Video 3 */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#020617] shadow-xl group aspect-video">
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-pink-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-pink-500/30">
                    Campaign 03
                  </span>
                </div>
                
                <button 
                  onClick={() => toggleMute(3)}
                  className="absolute bottom-3 right-3 z-20 bg-black/70 hover:bg-black backdrop-blur-md border border-white/10 text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-lg cursor-pointer"
                  title={activeAudio === 3 ? "Mute Audio" : "Unmute Audio"}
                >
                  {activeAudio !== 3 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                <video 
                  ref={video3Ref}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  src="/veo-ad-3.mp4" 
                />
              </div>

            </div>

          </div>
        </motion.div>

        {/* Continue to Automations Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mt-12 pb-16"
        >
          <Link to="/automations">
            <button className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-slate-900 border border-slate-700 rounded-full hover:border-brand-orange hover:shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105">
              <span className="uppercase tracking-widest text-sm mr-4">Explore Make.com Automations</span>
              <svg className="w-5 h-5 text-brand-orange group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}