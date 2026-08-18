import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-white font-black text-2xl tracking-tighter group flex items-center gap-2">
          CG <span className="text-[#FF5F1F] group-hover:text-amber-400 transition-colors">STRATEGIC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-xs font-black uppercase tracking-[0.2em] hover:text-[#FF5F1F] transition-colors ${location.pathname === '/' ? 'text-[#FF5F1F]' : 'text-slate-400'}`}
          >
            Hub
          </Link>
          <Link 
            to="/portfolio" 
            className={`text-xs font-black uppercase tracking-[0.2em] hover:text-[#FF5F1F] transition-colors ${location.pathname === '/portfolio' ? 'text-[#FF5F1F]' : 'text-slate-400'}`}
          >
            Case Studies
          </Link>
          <Link 
            to="/automations" 
            className={`text-xs font-black uppercase tracking-[0.2em] hover:text-[#FF5F1F] transition-colors ${location.pathname === '/automations' ? 'text-[#FF5F1F]' : 'text-slate-400'}`}
          >
            The Engine
          </Link>
        </nav>

        {/* CTA Button */}
        <a 
          href="#contact" 
          className="hidden md:inline-flex px-6 py-2.5 bg-[#FF5F1F] hover:bg-amber-500 text-[#020617] text-xs font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,95,31,0.3)]"
        >
          Let's Talk
        </a>

        {/* Mobile Menu Button (Placeholder for future expansion) */}
        <button className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </motion.header>
  );
}