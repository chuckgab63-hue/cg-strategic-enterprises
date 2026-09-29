import React from 'react';
import { Link } from 'react-router-dom';
import { PHONE_HREF, CALL_ARIA_LABEL, EMAIL, EMAIL_HREF, EMAIL_ARIA_LABEL } from '../config/site';

const NAV_LINKS = [
  { to: '/', label: 'Hub' },
  { to: '/automations', label: 'The Engine' },
  { to: '/portfolio', label: 'Case Studies' },
  { to: '/skunkworks', label: 'Skunkworks' },
  { to: '/contact', label: 'Contact' },
];

export default function GlobalHeader() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-end lg:grid lg:grid-cols-3">
          
          <Link to="/" className="hidden lg:flex items-center gap-2 lg:justify-self-start">
            <span className="text-2xl font-black text-white tracking-tighter">CG</span>
            <span className="text-2xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 lg:justify-self-center">
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

          <div className="flex items-center gap-3 lg:justify-self-end">
            {/* The main nav is desktop-only, so give small screens their own Contact link. */}
            <Link
              to="/contact"
              className="lg:hidden text-xs font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
            <a
              href={EMAIL_HREF}
              aria-label={EMAIL_ARIA_LABEL}
              title={EMAIL}
              className="flex items-center p-2 text-slate-300 hover:text-brand-orange transition-colors"
            >
              <svg className="w-5 h-5 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
            <div className="flex flex-col items-center gap-1">
              <a
                href={PHONE_HREF}
                aria-label={CALL_ARIA_LABEL}
                className="inline-block bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] whitespace-nowrap cursor-pointer"
              >
                Let's Talk
              </a>
              <Link
                to="/contact"
                className="text-[10px] font-semibold tracking-wide text-slate-400 hover:text-brand-orange transition-colors whitespace-nowrap"
              >
                Or send us a message
              </Link>
            </div>
          </div>
          
        </div>
      </header>
    </>
  );
}
