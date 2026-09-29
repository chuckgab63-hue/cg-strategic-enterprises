import { Link } from 'react-router-dom';
import { PHONE_HREF, PHONE_DISPLAY, CALL_ARIA_LABEL, EMAIL, EMAIL_HREF, EMAIL_ARIA_LABEL } from '../config/site';

export default function GlobalFooter() {
  return (
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
            <Link to="/automations" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">The Engine</Link>
            <Link to="/portfolio" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">Case Studies</Link>
            <Link to="/skunkworks" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">Skunkworks</Link>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Legal</h4>
            <Link to="/privacy" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors">Terms</Link>
          </div>

          {/* Column 4: CTA */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">Initiate</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] text-center md:text-left font-medium">
              Ready to upgrade your digital infrastructure? Let's build.
            </p>
            <a
              href={PHONE_HREF}
              className="text-sm font-bold tracking-widest text-slate-300 hover:text-brand-orange transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              aria-label={EMAIL_ARIA_LABEL}
              className="text-sm md:text-xs xl:text-sm font-bold tracking-widest text-slate-300 hover:text-brand-orange transition-colors"
            >
              {EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}
            </a>
            <a
              href={PHONE_HREF}
              aria-label={CALL_ARIA_LABEL}
              className="inline-block bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] mt-2 cursor-pointer"
            >
              Let's Talk
            </a>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex justify-center md:justify-start">
          <p className="text-xs text-slate-600 font-bold tracking-widest uppercase">&copy; {new Date().getFullYear()} CG Strategic Enterprises LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}