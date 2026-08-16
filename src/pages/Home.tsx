import { motion } from 'framer-motion';
import heroLogo from '../assets/hero.png';
import AnimationShowcase from '../components/AnimationShowcase';
import FramerPlayground from '../components/FramerPlayground';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <header className="flex flex-col items-center justify-center text-center max-w-4xl w-full p-6 min-h-[90vh]">
        <motion.div
          className="mb-6"
          initial={{ y: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: '0 30px 60px rgba(255,140,0,0.18), 0 6px 18px rgba(255,140,0,0.08)' }}
        >
          <motion.img
            src={heroLogo}
            alt="CG Strategic Enterprises"
            className="w-full max-w-2xl h-auto rounded-md"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>
        <motion.p
          className="text-xl md:text-2xl text-brand-midnight mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          We remove repetitive data entry, capture every lead automatically, and streamline your day-to-day operations so your team runs leaner and faster — giving you back the time to focus on growing the business. Efficiency Engineered. Growth Automated.
        </motion.p>
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button className="bg-brand-orange text-white px-8 py-3 rounded-md font-bold tracking-wide hover:opacity-90 transition-all shadow-md cursor-pointer hover:scale-105">
            Start a Project
          </button>
          <button className="bg-transparent border-2 border-brand-midnight text-brand-midnight px-8 py-3 rounded-md font-bold tracking-wide hover:bg-brand-midnight hover:text-white transition-all cursor-pointer hover:scale-105">
            View Our Work
          </button>
        </motion.div>
      </header>

      <AnimationShowcase />
      <FramerPlayground />
    </div>
  );
}