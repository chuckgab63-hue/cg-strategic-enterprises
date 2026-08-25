import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalFooter() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  React.useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

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
        setActiveModal(null);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('idle');
    }
  };

  return (
    <>
      <footer className="bg-[#020617] border-t border-slate-900 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl font-black text-white tracking-tighter">CG</span>
                <span className="text-2xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
              </Link>
              <div className="flex flex-col gap-3 mt-1">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  Efficiency Engineered.<br />Growth Automated.
                </span>
                <span className="text-xs text-slate-400 font-semibold tracking-widest flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-4 h-4 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Jacksonville, FL
                </span>
              </div>
            </div>

            {/* Column 2: Nav */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Explore</h4>
              <Link to="/" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">Hub</Link>
              {/* Perfectly mapped to /automations */}
              <Link to="/automations" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">The Engine</Link>
              <Link to="/portfolio" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">Case Studies</Link>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Legal</h4>
              <button onClick={() => setActiveModal('privacy')} className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setActiveModal('terms')} className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors cursor-pointer">Terms of Service</button>
            </div>

            {/* Column 4: CTA */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Initiate</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] text-center md:text-left font-medium">
                Ready to upgrade your digital infrastructure? Let's build.
              </p>
              <button 
                onClick={() => setActiveModal('contact')}
                className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] mt-2 cursor-pointer"
              >
                Let's Talk
              </button>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex justify-center md:justify-start">
            <p className="text-xs text-slate-600 font-bold tracking-widest uppercase">&copy; {new Date().getFullYear()} CG Strategic Enterprises LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* --- Unified Modals (Contact, Privacy, Terms) --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 pt-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className={`relative w-full ${activeModal === 'contact' ? 'max-w-4xl' : 'max-w-3xl'} bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]`}
            >
              
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-[#020617] shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {activeModal === 'privacy' ? 'Privacy Policy' : activeModal === 'terms' ? 'Terms of Service' : 'Initialize Communication'}
                  </h3>
                  {activeModal === 'contact' && <p className="text-slate-400 text-sm mt-1">Select your preferred routing protocol.</p>}
                </div>
                <button onClick={() => setActiveModal(null)} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className={`p-6 md:p-8 md:pb-12 overflow-y-auto custom-scrollbar flex ${activeModal === 'contact' ? 'flex-col md:flex-row items-start gap-8 bg-[#020617]' : 'flex-col gap-6 text-slate-300 text-sm leading-relaxed'}`}>
                
                {/* --- CONTACT MODAL CONTENT --- */}
                {activeModal === 'contact' && (
                  <>
                    <div className="flex-1 w-full shrink-0 bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all group">
                      <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">AI Voice Interface</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                        Bypass the form. Instantly connect with our intelligent voice agent to ask questions and route your inquiry directly to the right engineer.
                      </p>
                      <a href="tel:+15555555555" className="w-full bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2">Initiate Call</a>
                    </div>

                    <div className="flex-[1.2] w-full shrink-0 bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
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
                          <input type="text" required placeholder="System / Commander Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors" />
                          <input type="email" required placeholder="Secure Comm Link (Email)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors" />
                          <textarea required placeholder="Define your operational objective..." rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors resize-none" />
                          <button type="submit" disabled={formStatus === 'submitting'} className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${formStatus === 'submitting' ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600' : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent'}`}>
                            {formStatus === 'submitting' ? 'Transmitting...' : 'Transmit Payload'}
                          </button>
                        </form>
                      )}
                    </div>
                  </>
                )}

                {/* --- PRIVACY POLICY CONTENT --- */}
                {activeModal === 'privacy' && (
                  <>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">Last Updated: August 2026</p>
                    <p>CG Strategic Enterprises LLC ("we," "our," or "us") respects your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or engage our engineering and automation services.</p>
                    <h4 className="text-white font-bold text-base mt-2">1. Information We Collect</h4>
                    <p>We may collect personal information such as your name, email address, phone number, and business details when you submit forms, request integration, or communicate with our team. We also collect automated telemetry data (e.g., IP addresses, browser types) to analyze site traffic and improve performance.</p>
                    <h4 className="text-white font-bold text-base mt-2">2. How We Use Your Information</h4>
                    <p>Your information is used strictly to provide and improve our services, route leads, architect system integrations, and communicate project updates. We do not sell or rent your personal data to third parties.</p>
                  </>
                )}

                {/* --- TERMS OF SERVICE CONTENT --- */}
                {activeModal === 'terms' && (
                  <>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">Last Updated: August 2026</p>
                    <p>By accessing or using the services provided by CG Strategic Enterprises LLC ("Company", "we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</p>
                    <h4 className="text-white font-bold text-base mt-2">1. Services Provided</h4>
                    <p>CG Strategic Enterprises LLC provides digital infrastructure engineering, custom web applications, AI integration, and workflow automation services. Specific deliverables, timelines, and costs will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) for your specific project.</p>
                    <h4 className="text-white font-bold text-base mt-2">2. Intellectual Property</h4>
                    <p>Unless explicitly stated otherwise in your specific contract, all pre-existing codebases, automation templates, and proprietary frameworks used to construct your solution remain the intellectual property of CG Strategic Enterprises LLC. Clients receive a license to use the deployed final product as intended.</p>
                  </>
                )}

              </div>
              
              {/* Legal Acknowledge Footer (Only for terms/privacy) */}
              {(activeModal === 'privacy' || activeModal === 'terms') && (
                <div className="p-6 md:p-8 border-t border-slate-800 bg-[#020617] shrink-0 flex justify-end">
                  <button onClick={() => setActiveModal(null)} className="bg-brand-orange text-white px-8 py-3 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_20px_rgba(255,95,31,0.3)]">
                    Acknowledge
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}