import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FramerPlayground() {
  // --- LEFT CARD: Sequencer State ---
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- RIGHT CARD: Catch Me Game State ---
  const [catchPos, setCatchPos] = useState({ x: 0, y: 0 });
  const [isEvading, setIsEvading] = useState(true);
  const [hasStartedEvading, setHasStartedEvading] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const handleCatchHover = () => {
    if (isEvading && !isExploding) {
      if (!hasStartedEvading) {
        setHasStartedEvading(true);
        setTimeout(() => {
          setIsEvading(false);
        }, 3500); 
      }
      
      setCatchPos({
        x: Math.random() * 200 - 100,
        y: Math.random() * 120 - 60,
      });
    }
  };

  const handleCatchClick = () => {
    if (!isEvading && !isExploding) {
      setIsExploding(true);
      
      setTimeout(() => {
        setIsExploding(false);
        setIsEvading(true);
        setHasStartedEvading(false);
        setCatchPos({ x: 0, y: 0 });
      }, 3000);
    }
  };

  return (
    <div className="w-full bg-slate-950 py-24 relative overflow-hidden border-t border-slate-900">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col gap-16">
        
        {/* Section Header */}
        <header className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Rendering.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Interact with our high-fidelity front-end engineering. Catch the node to test frame-rate physics, or watch the DOM orchestrate sequential rendering.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Card: Orchestrated Workflows */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-white mb-8">Orchestrated Workflows</h3>
            
            <div className="flex flex-col gap-4">
              
              {/* Step 1: The Cyber Scan */}
              <motion.div 
                animate={activeStep === 1 ? { scale: 1.03, borderColor: "#3b82f6", backgroundColor: "rgba(15, 23, 42, 0.8)" } : { scale: 1, borderColor: "#1e293b", backgroundColor: "#020617" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-6 p-4 rounded-2xl border relative overflow-hidden"
              >
                {activeStep === 1 && (
                  <motion.div 
                    initial={{ x: "-100%" }} 
                    animate={{ x: "400%" }} 
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent skew-x-12 z-0"
                  />
                )}
                <motion.div 
                  animate={activeStep === 1 ? { scale: [1, 1.15, 1], boxShadow: "0 0 20px rgba(59,130,246,0.5)" } : { scale: 1, boxShadow: "none" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`w-12 h-12 shrink-0 rounded-full border flex items-center justify-center font-black z-10 transition-colors duration-300 ${activeStep === 1 ? 'bg-blue-900 border-blue-400 text-blue-400' : 'bg-brand-midnight border-slate-700 text-slate-500'}`}
                >
                  01
                </motion.div>
                <div className={`font-bold tracking-wide z-10 transition-colors duration-300 ${activeStep === 1 ? 'text-white' : 'text-slate-500'}`}>
                  Audit Digital Infrastructure
                </div>
              </motion.div>

              {/* Step 2: The Mechanical Slide */}
              <motion.div 
                animate={activeStep === 2 ? { x: 10, borderColor: "#ff5f1f", backgroundColor: "rgba(15, 23, 42, 0.8)" } : { x: 0, borderColor: "#1e293b", backgroundColor: "#020617" }}
                transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
                className="flex items-center gap-6 p-4 rounded-2xl border relative overflow-hidden"
              >
                <motion.div 
                  animate={activeStep === 2 ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                  className={`w-12 h-12 shrink-0 rounded-full border flex items-center justify-center font-black z-10 transition-colors duration-300 ${activeStep === 2 ? 'bg-brand-orange/20 border-brand-orange text-brand-orange shadow-[0_0_15px_rgba(255,95,31,0.4)]' : 'bg-brand-midnight border-slate-700 text-slate-500'}`}
                >
                  02
                </motion.div>
                <div className={`font-bold tracking-wide z-10 transition-colors duration-300 ${activeStep === 2 ? 'text-white' : 'text-slate-500'}`}>
                  Engineer Efficiency
                </div>
              </motion.div>

              {/* Step 3: The Neon Flip */}
              <motion.div 
                animate={activeStep === 3 ? { y: -5, borderColor: "#CCFF00", backgroundColor: "rgba(15, 23, 42, 0.8)", boxShadow: "0 10px 30px -10px rgba(204,255,0,0.3)" } : { y: 0, borderColor: "#1e293b", backgroundColor: "#020617", boxShadow: "none" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-6 p-4 rounded-2xl border relative overflow-hidden"
              >
                <motion.div 
                  animate={activeStep === 3 ? { rotateY: 360 } : { rotateY: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-12 h-12 shrink-0 rounded-full border flex items-center justify-center font-black z-10 transition-colors duration-300 ${activeStep === 3 ? 'bg-[#CCFF00]/20 border-[#CCFF00] text-[#CCFF00]' : 'bg-brand-midnight border-slate-700 text-slate-500'}`}
                >
                  03
                </motion.div>
                <div className={`font-bold tracking-wide z-10 transition-colors duration-300 ${activeStep === 3 ? 'text-white' : 'text-slate-500'}`}>
                  Automate Growth
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Card: Evasion Game (The Sandbox) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#020617] border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40"></div>
            
            <h3 className="text-2xl font-black text-white mb-2 relative z-10">State & Event Hooks</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-12 relative z-10">Catch it if you can</p>
            
            <div className="flex-1 flex items-center justify-center relative z-10 w-full min-h-[220px]">
              
              <div className="relative flex items-center justify-center">
                
                {/* Massive Particle Explosion */}
                {isExploding && Array.from({ length: 120 }).map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const velocity = 60 + Math.random() * 140; 
                  const size = 4 + Math.random() * 6;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * velocity,
                        y: Math.sin(angle) * velocity,
                        scale: 0,
                        opacity: 0,
                        rotate: Math.random() * 360
                      }}
                      transition={{ 
                        duration: 0.6 + Math.random() * 0.8, 
                        ease: "easeOut" 
                      }}
                      className="absolute rounded-full z-0"
                      style={{
                        width: size,
                        height: size,
                        backgroundColor: ['#ff5f1f', '#3b82f6', '#CCFF00', '#ec4899', '#10b981', '#a855f7', '#facc15'][i % 7]
                      }}
                    />
                  );
                })}

                <motion.div
                  onMouseEnter={handleCatchHover}
                  onClick={handleCatchClick}
                  animate={{ 
                    x: catchPos.x, 
                    y: catchPos.y,
                    scale: isExploding ? 1.2 : 1,
                    backgroundColor: isExploding ? "#10b981" : "#ff5f1f" 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: isEvading ? 600 : 300, 
                    damping: isEvading ? 15 : 20 
                  }}
                  className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer border-4 border-slate-900 z-10 transition-shadow ${isExploding ? 'shadow-[0_0_50px_rgba(16,185,129,0.8)]' : 'shadow-[0_0_40px_rgba(255,95,31,0.4)]'}`}
                >
                  <span className="text-white font-black uppercase tracking-widest text-sm drop-shadow-md text-center">
                    {isExploding ? (
                      <span>CAUGHT!<br/><span className="text-[10px] font-normal tracking-normal text-emerald-200">Resetting...</span></span>
                    ) : (
                      isEvading && hasStartedEvading ? "TOO SLOW!" : "CATCH ME"
                    )}
                  </span>
                </motion.div>
              </div>

            </div>
            
            <p className="text-slate-500 text-sm mt-8 relative z-10 h-10">
              {isExploding 
                ? "Got 'em. State updated, events fired, UI rendered." 
                : "Hover to trigger evasion logic. It tires out after 3.5s."}
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}