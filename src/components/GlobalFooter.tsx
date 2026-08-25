import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalFooter() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // Stop background scrolling when modal is open
  React.useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  return (
    <>
      <footer className="bg-[#020617] border-t border-slate-900 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
            {/* Column 1: Brand, Slogan & Location */}
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

            {/* Column 2: Navigation */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Explore</h4>
              <Link to="/" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">
                Hub
              </Link>
              <Link to="/engine" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">
                The Engine
              </Link>
              <Link to="/portfolio" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">
                Case Studies
              </Link>
            </div>

            {/* Column 3: Legal (Now Buttons) */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Legal</h4>
              <button 
                onClick={() => setActiveModal('privacy')}
                className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setActiveModal('terms')}
                className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>

            {/* Column 4: CTA */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Initiate</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] text-center md:text-left font-medium">
                Ready to upgrade your digital infrastructure? Let's build.
              </p>
              <button className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] mt-2">
                Let's Talk
              </button>
            </div>
          </div>

          {/* Bottom Bar: Copyright */}
          <div className="border-t border-slate-900 pt-8 flex justify-center md:justify-start">
            <p className="text-xs text-slate-600 font-bold tracking-widest uppercase">
              &copy; {new Date().getFullYear()} CG Strategic Enterprises LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* --- Legal Modals --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 pt-24">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-[#020617] shrink-0">
                <h3 className="text-2xl font-black text-white">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6 text-slate-300 text-sm leading-relaxed custom-scrollbar">
                
                {activeModal === 'privacy' ? (
                  <>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">Last Updated: August 2026</p>
                    <p>CG Strategic Enterprises LLC ("we," "our," or "us") respects your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or engage our engineering and automation services.</p>
                    
                    <h4 className="text-white font-bold text-base mt-2">1. Information We Collect</h4>
                    <p>We may collect personal information such as your name, email address, phone number, and business details when you submit forms, request integration, or communicate with our team. We also collect automated telemetry data (e.g., IP addresses, browser types) to analyze site traffic and improve performance.</p>

                    <h4 className="text-white font-bold text-base mt-2">2. How We Use Your Information</h4>
                    <p>Your information is used strictly to provide and improve our services, route leads, architect system integrations, and communicate project updates. We do not sell or rent your personal data to third parties.</p>

                    <h4 className="text-white font-bold text-base mt-2">3. Third-Party Integrations</h4>
                    <p>Because our core service involves building automated workflows (via APIs, CRMs, and webhooks), your data may be processed through secure third-party platforms utilized for your specific deployment. These services are governed by their respective privacy policies.</p>

                    <h4 className="text-white font-bold text-base mt-2">4. Data Security</h4>
                    <p>We implement industry-standard security measures to protect your data. However, no digital transmission is entirely secure, and we cannot guarantee absolute security of data transmitted through our systems.</p>
                  </>
                ) : (
                  <>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">Last Updated: August 2026</p>
                    <p>By accessing or using the services provided by CG Strategic Enterprises LLC ("Company", "we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</p>

                    <h4 className="text-white font-bold text-base mt-2">1. Services Provided</h4>
                    <p>CG Strategic Enterprises LLC provides digital infrastructure engineering, custom web applications, AI integration, and workflow automation services. Specific deliverables, timelines, and costs will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) for your specific project.</p>

                    <h4 className="text-white font-bold text-base mt-2">2. Intellectual Property</h4>
                    <p>Unless explicitly stated otherwise in your specific contract, all pre-existing codebases, automation templates, and proprietary frameworks used to construct your solution remain the intellectual property of CG Strategic Enterprises LLC. Clients receive a license to use the deployed final product as intended.</p>

                    <h4 className="text-white font-bold text-base mt-2">3. Limitation of Liability</h4>
                    <p>In no event shall CG Strategic Enterprises LLC be liable for any indirect, incidental, special, or consequential damages resulting from the use of our web platforms, automations, or API integrations. Our total liability in any matter related to our services is limited to the total amount paid by you for those specific services.</p>

                    <h4 className="text-white font-bold text-base mt-2">4. Governing Law</h4>
                    <p>These terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any legal action or proceeding shall be brought exclusively in the state or federal courts located in Florida.</p>
                  </>
                )}

              </div>
              
              {/* Footer Actions */}
              <div className="p-6 md:p-8 border-t border-slate-800 bg-[#020617] shrink-0 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-brand-orange text-white px-8 py-3 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                >
                  Acknowledge
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}