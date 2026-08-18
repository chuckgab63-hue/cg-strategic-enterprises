import { Link } from 'react-router-dom';

export default function GlobalFooter() {
  return (
    <footer className="bg-[#020617] border-t border-white/10 pt-20 pb-10 text-slate-400 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-[#FF5F1F]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="text-white font-black text-3xl tracking-tighter block mb-3">
              CG <span className="text-[#FF5F1F]">STRATEGIC</span>
            </Link>
            <p className="text-xl font-black text-white mb-4 tracking-tight">
              Efficiency Engineered. Growth Automated.
            </p>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed font-medium">
              We design, build, and automate digital infrastructure for service businesses that demand high-performance growth without the operational bloat.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-[#FF5F1F] transition-colors">The Hub</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#FF5F1F] transition-colors">Case Studies</Link></li>
              <li><Link to="/automations" className="hover:text-[#FF5F1F] transition-colors">The Engine</Link></li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Operations</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#FF5F1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Jacksonville, FL
              </li>
              <li>
                <a href="#contact" className="text-[#FF5F1F] font-bold hover:text-amber-400 transition-colors">
                  Start a Project &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} CG Strategic Enterprises LLC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}