import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const NAV_LINKS = [
  { to: '/', label: 'Hub' },
  { to: '/automations', label: 'The Engine' },
  { to: '/portfolio', label: 'Case Studies' },
  { to: '/skunkworks', label: 'Skunkworks' },
];

export default function GlobalHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const openContactFromMenu = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-2 lg:grid-cols-3 items-center">
          
          <Link to="/" className="flex items-center gap-2 justify-self-start">
            <span className="text-2xl font-black text-white tracking-tighter">CG</span>
            <span className="text-2xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 justify-self-center">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 justify-self-end">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] whitespace-nowrap cursor-pointer"
            >
              Let's Talk
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-slate-800 text-slate-300 hover:text-brand-orange hover:border-brand-orange/50 transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
        </div>
      </header>

      {/* --- Mobile Nav Drawer --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <div id="mobile-nav-menu" className="fixed inset-0 z-[55] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.35 }}
              className="relative bg-slate-900 border-b border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.6)] pt-6 pb-8 px-6"
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <span className="text-xl font-black text-white tracking-tighter">CG</span>
                  <span className="text-xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold tracking-widest uppercase text-slate-200 hover:text-brand-orange transition-colors py-3 border-b border-slate-800/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <button
                onClick={openContactFromMenu}
                className="w-full mt-6 bg-brand-orange text-white py-3.5 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] cursor-pointer"
              >
                Let's Talk
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Global Communication Modal --- */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} source="Header Contact Modal" />
    </>
  );
}
