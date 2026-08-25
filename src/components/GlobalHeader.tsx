import React from 'react';
import { Link } from 'react-router-dom';

export default function GlobalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[50] bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
      {/* 3-Column Grid guarantees absolute centering for the nav */}
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* Column 1: Logo (Left aligned) */}
        <Link to="/" className="flex items-center gap-2 justify-self-start">
          <span className="text-2xl font-black text-white tracking-tighter">CG</span>
          <span className="text-2xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
        </Link>

        {/* Column 2: Desktop Nav (Perfectly centered) */}
        <nav className="hidden md:flex items-center gap-8 justify-self-center">
          <Link to="/" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors">
            Hub
          </Link>
          <Link to="/engine" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors">
            The Engine
          </Link>
          <Link to="/portfolio" className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors">
            Case Studies
          </Link>
        </nav>

        {/* Column 3: CTA (Right aligned) */}
        <div className="justify-self-end">
          <button className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] whitespace-nowrap">
            Let's Talk
          </button>
        </div>
        
      </div>
    </header>
  );
}