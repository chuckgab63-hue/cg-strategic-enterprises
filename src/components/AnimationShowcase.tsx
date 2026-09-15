import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

export default function AnimationShowcase() {
  const gsapCardRef = useRef<HTMLDivElement>(null);
  const gsapIconRef = useRef<HTMLDivElement>(null);

  // GSAP Animation Logic (Cinematic Sequences card)
  useGSAP(() => {
    const el = gsapCardRef.current;
    const icon = gsapIconRef.current;
    
    if (el && icon) {
      el.addEventListener('mouseenter', () => {
        gsap.to(icon, { rotation: 360, duration: 0.8, ease: "back.out(1.7)" });
        gsap.to(el, { scale: 1.05, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(icon, { rotation: 0, duration: 0.8, ease: "power2.out" });
        gsap.to(el, { scale: 1, duration: 0.3 });
      });
    }
  });

  return (
    <section className="pb-32 w-full flex flex-col items-center justify-center px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        
        {/* Card 1: Tailwind CSS (Lightweight / Micro-interactions) */}
        <Link to="/ui-polish" className="block h-full">
          <div className="group h-full bg-slate-900/40 p-8 rounded-2xl shadow-md border border-slate-800 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-brand-orange/50 cursor-pointer">
            <div className="w-12 h-12 bg-brand-midnight rounded-lg mb-6 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:bg-brand-orange">
              <span className="text-white font-bold">CSS</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">UI Polish</h3>
            <p className="text-slate-400 text-sm">
              Powered natively by Tailwind. Perfect for crisp, lightweight hover states, button interactions, and fast-loading micro-animations.
            </p>
          </div>
        </Link>

        {/* Card 2: Framer Motion (Fluid / Modern App Feel) */}
        <Link to="/fluid-dynamics" className="block h-full">
          <motion.div 
            className="bg-slate-900/40 p-8 rounded-2xl shadow-md border border-slate-800 backdrop-blur-md cursor-pointer h-full hover:border-brand-orange/50 transition-colors duration-500"
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="w-12 h-12 bg-brand-midnight rounded-lg mb-6 flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <span className="text-white font-bold">FM</span>
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Fluid Dynamics</h3>
            <p className="text-slate-400 text-sm">
              Powered by Framer Motion. Ideal for modern web portals, physics-based scaling, smooth page transitions, and continuous looping elements.
            </p>
          </motion.div>
        </Link>

        {/* Card 3: GSAP (Cinematic / Heavyweight) */}
        <Link to="/cinematic" className="block h-full">
          <div 
            ref={gsapCardRef}
            className="bg-slate-900/40 p-8 rounded-2xl shadow-md border border-slate-800 backdrop-blur-md cursor-pointer h-full hover:border-brand-orange/50 transition-colors duration-500"
          >
            <div 
              ref={gsapIconRef}
              className="w-12 h-12 bg-brand-midnight rounded-lg mb-6 flex items-center justify-center"
            >
              <span className="text-white font-bold">GS</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cinematic Sequences</h3>
            <p className="text-slate-400 text-sm">
              Powered by GSAP. The industry standard for complex timeline scrubbing, scroll-driven narratives, and high-end interactive brand work.
            </p>
          </div>
        </Link>

      </div>
    </section>
  );
}
