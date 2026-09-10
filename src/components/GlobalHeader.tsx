import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

export default function GlobalHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-2 lg:grid-cols-3 items-center">
          
          <Link to="/" className="flex items-center gap-2 justify-self-start">
            <span className="text-2xl font-black text-white tracking-tighter">CG</span>
            <span className="text-2xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 justify-self-center">
            <Link to="/" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap">
              Hub
            </Link>
            <Link to="/automations" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap">
              The Engine
            </Link>
            <Link to="/portfolio" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap">
              Case Studies
            </Link>
            <Link to="/skunkworks" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap">
              Skunkworks
            </Link>
          </nav>

          <div className="justify-self-end">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] whitespace-nowrap cursor-pointer"
            >
              Let's Talk
            </button>
          </div>
          
        </div>
      </header>

      {/* --- Global Communication Modal --- */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}