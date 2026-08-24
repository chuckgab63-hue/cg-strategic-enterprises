import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimationShowcase from '../components/AnimationShowcase';
import FramerPlayground from '../components/FramerPlayground';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">
      <header className="flex flex-col items-center justify-center text-center max-w-4xl w-full p-6 min-h-[90vh]">
        
        {/* Wrapper: Adjusted to rounded-3xl to stop cropping the text */}
        <motion.div
          className="mb-6 rounded-3xl"
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -15, 0],
            boxShadow: [
              '0 10px 40px rgba(255, 95, 31, 0.3)',
              '0 20px 100px rgba(255, 95, 31, 0.9)',
              '0 10px 40px rgba(255, 95, 31, 0.3)'
            ] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Image: Scaled down to max-w-lg and rounded-3xl, src updated to root public folder */}
          <motion.img
            src="/hero.png"
            alt="CG Strategic Enterprises"
            className="w-full max-w-lg h-auto rounded-3xl bg-white"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px) hue-rotate(0deg)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: [
                "blur(0px) hue-rotate(0deg)", 
                "blur(0px) hue-rotate(45deg)",
                "blur(0px) hue-rotate(0deg)"
              ]
            }}
            transition={{ 
              opacity: { duration: 1.2, ease: "easeOut" },
              scale: { duration: 1.2, ease: "easeOut" },
              filter: { 
                duration: 5,
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.2
              } 
            }}
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Paragraph: Scaled down slightly to match the new image size */}
        <motion.p
          className="text-lg md:text-xl text-brand-midnight mb-10 max-w-2xl"
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
          
          <Link to="/portfolio">
            <button className="bg-transparent border-2 border-brand-midnight text-brand-midnight px-8 py-3 rounded-md font-bold tracking-wide hover:bg-brand-midnight hover:text-white transition-all cursor-pointer hover:scale-105">
              View Our Work
            </button>
          </Link>
          
        </motion.div>
      </header>

      <AnimationShowcase />
      <FramerPlayground />
    </div>
  );
}