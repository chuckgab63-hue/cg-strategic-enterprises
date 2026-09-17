import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Top-Level Widgets ---
import AnalysisWidget from '../components/AnalysisWidget';
import PropertyWidget from '../components/PropertyWidget';
import AssetTrackerWidget from '../components/AssetTrackerWidget';
import IslandFreshWidget from '../components/IslandFreshWidget';
import TaxWidget from '../components/TaxWidget';
import MobileExpandWidget from '../components/MobileExpandWidget';

// --- Custom AI Video Player Component ---
const VideoAd = ({ 
  id, src, title, tag, activeVideoId, onActivate 
}: { 
  id: number; src: string; title: string; tag: string; activeVideoId: number | null; onActivate: (id: number | null) => void 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Check if this specific video is the one currently playing
  const isActive = activeVideoId === id;
  // Check if another video in the grid is playing
  const isOtherPlaying = activeVideoId !== null && activeVideoId !== id;

  // React to the activeVideoId changing from the parent container
  useEffect(() => {
    if (isActive) {
      if (videoRef.current) {
        videoRef.current.muted = false; // Auto-unmute when activated
        setIsMuted(false);
        videoRef.current.play().catch(e => console.log("Playback prevented by browser: ", e));
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to the beginning when paused
        videoRef.current.muted = true; // Mute when deactivated
        setIsMuted(true);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isActive) {
      onActivate(null); // Pause and reset if it's already playing
    } else {
      onActivate(id); // Play this one, reset/pause others, and auto-unmute
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the background play/pause click
    if (isOtherPlaying) return; // Strictly prevent unmuting if disabled
    
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="relative w-full aspect-[9/16] md:aspect-[4/5] bg-[#020617] rounded-3xl overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] group cursor-pointer"
      onClick={togglePlay}
    >
      <video 
        ref={videoRef} 
        src={src} 
        loop 
        playsInline 
        muted={isMuted}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
      />
      
      {/* Top Overlay: Tag & Mute Button */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent z-10">
        <span className="bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
          {tag}
        </span>
        <button 
          onClick={toggleMute}
          disabled={isOtherPlaying}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
            isOtherPlaying 
              ? 'bg-black/30 border border-white/10 text-white/20 cursor-not-allowed' // Disabled State
              : 'bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black' // Active State
          }`}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
        </button>
      </div>

      {/* Center Play Button Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-16 h-16 rounded-full bg-brand-orange/90 text-white flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(255,95,31,0.6)] group-hover:scale-110 transition-transform duration-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
        </div>
      </div>

      {/* Bottom Overlay: Title */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
        <h4 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h4>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white pb-32">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      <div className="pt-20 px-6 max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Navigation */}
        <div className="w-full flex justify-center mb-10">
          <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm">
            &larr; BACK TO HUB
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-brand-orange to-amber-500">Studies.</span>
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            A selection of high-fidelity frontend engineering and automated infrastructure deployments.
          </p>
        </div>

        <div className="w-full flex flex-col gap-20 mb-32">

          {/* --- Case Study 0: Island Fresh (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Full Ordering Platform
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Island Fresh Meals
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Order Ahead, <br className="hidden md:block" /> Simplified.
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">A Complete Ordering Experience</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    Built around Island Fresh's real menu and their actual weekly ordering cadence — order by Sunday 9AM, delivery Wednesday. Customers browse real meals, build a cart, and check out with delivery or pickup, all without leaving the page.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    This demonstrates what a fully custom-built ordering platform could look like — fast, focused, and tailored entirely to their menu and cutoff schedule, with instant order confirmation to the customer and immediate notification to the kitchen.
                  </p>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-green-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-green-400 block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-green-400 font-black uppercase tracking-widest text-xs">
                      Try it out! Interact with the live demo.
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>

            {/* Right Column: Island Fresh Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label="Island Fresh Ordering Demo">
                 <IslandFreshWidget />
               </MobileExpandWidget>
            </div>
          </div>

          {/* --- Case Study 1: One Source (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
                    System Architecture & UI
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    One Source Total Pest Control
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  The AI Diagnostic <br className="hidden md:block" /> Lead Magnet.
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-orange/10 border border-brand-orange/30 rounded-lg flex items-center justify-center text-brand-orange">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">Interactive Lead Pipeline</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    We engineered a frictionless front-end diagnostic tool designed to convert casual web traffic into highly qualified, actionable leads. When homeowners face an active pest threat or suspect property damage, they simply snap a picture and upload it directly to the centralized hub. 
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    The platform immediately provides value by suggesting targeted DIY mitigation steps. However, as users realize the complexity of the infestation and exhaust those over-the-counter methods, the psychology of the UI seamlessly pivots them into a priority scheduling flow.
                  </p>
                  <div className="text-sm text-slate-400 leading-relaxed border-l-2 border-brand-orange pl-4 bg-brand-orange/5 p-4 rounded-r-lg mt-2 mb-4">
                    <strong className="text-brand-orange text-xs uppercase tracking-widest block mb-1">Live in Production</strong>
                    The hub is actively driving high-intent inbound leads and handing off comprehensive damage reports to dispatch. Additionally, One Source field technicians use these AI-generated, pre-arrival diagnostics to narrow down their treatment options and chemical loadouts before they ever reach the property.
                  </div>
                  
                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#CCFF00] hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-[#CCFF00] block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-[#CCFF00] font-black uppercase tracking-widest text-xs">
                      Try it out! Interact with the live demo.
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>
            
            {/* Right Column: Analysis Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label="Pest Diagnostic Demo">
                 <AnalysisWidget />
               </MobileExpandWidget>
            </div>
          </div>

          {/* --- Case Study 2: Property Ops AI (Widget Left, Text Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Property Widget (Drops to bottom on mobile) */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2 lg:order-1">
               <MobileExpandWidget label="Property Ops Hub Demo">
                 <PropertyWidget />
               </MobileExpandWidget>
            </div>

            {/* Right Column: Text (Rises to top on mobile) */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Time-Saving Automation
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    3 Workflows, One Hub
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Property Ops <br className="hidden md:block" /> Intelligence.
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">Three Workflows. One Widget.</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    This single widget handles three of the most common property management workflows: logging site progress with photos, triaging and routing maintenance requests, and letting prospective tenants book their own property showings.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Instead of juggling separate apps, text threads, and phone tag, property managers get one place where field updates, repair requests, and showing bookings all flow in — automatically organized, routed, and ready to act on.
                  </p>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-emerald-400 block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-emerald-400 font-black uppercase tracking-widest text-xs">
                      Try it out! Interact with the live demo.
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>
            
          </div>

          {/* --- Case Study 2.5: Asset Tracker (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Real-Time Tracking
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Logistics & Fleet Ops
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Asset Tracking <br className="hidden md:block" /> Intelligence.
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">See Every Dumpster, Instantly.</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    Built for a dumpster rental operation serving demolition and remodeling contractors. A driver logs a drop-off with the job site address, and it instantly appears as a pin on a live, aggregated map — no separate app, no manual spreadsheet updates.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Every drop-off and return triggers a real-time email, and a daily digest rolls up the day's activity automatically. When a unit heads back to the yard, one tap marks it returned and clears it from the active map.
                  </p>

                  {/* --- INTERACTIVE CTA --- */}
                  <div className="flex items-center gap-3 animate-pulse mt-2">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-amber-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      <svg className="w-4 h-4 text-amber-400 block lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="text-amber-400 font-black uppercase tracking-widest text-xs">
                      Try it out! Interact with the live demo.
                    </span>
                  </div>
                  {/* ------------------------- */}
                </div>
              </div>
            </div>

            {/* Right Column: Asset Tracker Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label="Asset Tracker Demo">
                 <AssetTrackerWidget />
               </MobileExpandWidget>
            </div>

          </div>

          {/* --- Case Study 3: Tax Engine (Text Left, Widget Right) --- */}
          <div className="w-full relative z-10 bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Text */}
            <div className="flex flex-col gap-6 order-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Financial Data
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Automated Compliance
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Algorithmic <br className="hidden md:block" /> Tax Routing.
                </h2>
              </div>

              <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-white">Real-Time Liability Calculation</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    Eliminating the friction of quarterly corporate tax documentation. This component acts as a listener on central revenue streams, intercepting transaction data as it settles.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    It calculates state and federal liabilities dynamically, updating a live dashboard so executives have total clarity on operational margins and tax reserves without waiting for end-of-month reconciliations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Tax Widget */}
            <div className="relative w-full h-[500px] lg:h-[550px] flex items-center justify-center order-2">
               <MobileExpandWidget label="Tax Engine Demo">
                 <TaxWidget />
               </MobileExpandWidget>
            </div>
          </div>

        </div>

        {/* --- FULL SERVICE / AI ADS SECTION --- */}
        <div className="w-full max-w-5xl mx-auto border-t border-slate-800 pt-24 mb-16 relative z-20 flex flex-col items-center">
          
          <div className="text-center mb-12 w-full max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-[#020617] border border-slate-700 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              Full-Service Digital Presence
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Omni-Channel <br className="block sm:hidden" /> Acquisition.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 text-center">
              We don't just build the infrastructure; we drive the traffic. CG Strategic executes aggressive, data-driven acquisition campaigns across <strong className="text-white">TikTok for Business</strong>, <strong className="text-white">Google Local Services Ads (LSA)</strong>, and <strong className="text-white">Facebook Ads</strong>, leveraging cognitive earworms as a high-retention hook to capture and hold consumer attention. 
            </p>
            
            {/* Centered Helper Text with Clean Separation Space */}
            <div className="w-full text-center mt-8 pt-2">
              <p className="text-sm text-slate-400 font-medium tracking-wide">
                Below are three examples of AI-generated media (Google Veo) deployed successfully in recent ad cycles. <span className="text-brand-orange font-bold">Tap to play independently.</span>
              </p>
            </div>
          </div>

          {/* Responsive Video Ad Grid with Centralized State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <VideoAd 
              id={1}
              src="/veo-live-1.mp4" 
              title="Brand Awareness V1" 
              tag="TikTok Ad"
              activeVideoId={activeVideoId}
              onActivate={setActiveVideoId}
            />
            <VideoAd 
              id={2}
              src="/veo-live-2.mp4" 
              title="Service Retargeting" 
              tag="FB Carousel"
              activeVideoId={activeVideoId}
              onActivate={setActiveVideoId}
            />
            <VideoAd 
              id={3}
              src="/veo-live-3.mp4" 
              title="Direct Response AI" 
              tag="Google LSA"
              activeVideoId={activeVideoId}
              onActivate={setActiveVideoId}
            />
          </div>

        </div>

        {/* --- Next Page Runway CTA: Skunkworks --- */}
        <div className="w-full max-w-5xl mx-auto mt-12 mb-8 relative z-10">
          <Link 
            to="/skunkworks" 
            className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
          >
            {/* Glowing Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            
            {/* Inner Content Card */}
            <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">
                  Next Frontier
                </h3>
                <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 transition-all duration-500">
                  Explore Skunkworks.
                </h2>
              </div>
              
              {/* Arrow Button */}
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-[#020617] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,95,31,0.5)] shrink-0">
                <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}