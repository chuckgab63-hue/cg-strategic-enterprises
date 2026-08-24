import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for the Hover Descriptions ---
const hoverFeatures: Record<string, { title: string; desc: string }> = {
  plasma: {
    title: "Plasma Sweep",
    desc: "Translates a hidden pseudo-element across the X-axis using group-hover states, creating a fluid, hardware-accelerated magnetic fill without JavaScript."
  },
  cyber: {
    title: "Cyber Override",
    desc: "Combines Tailwind's native animate-ping utility with delayed opacity transitions to render a high-frequency glitch effect on demand."
  },
  neon: {
    title: "Neon Elevation",
    desc: "Leverages complex drop-shadow utilities and negative Y-axis translations to simulate physical depth and volumetric light emission."
  },
  frosted: {
    title: "Frosted Glass",
    desc: "Applies backdrop-blur filters over a multi-stop gradient with an opacity toggle, mimicking modern glassmorphism architecture natively."
  }
};

export default function UIPolish() {
  const [securityKey, setSecurityKey] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // State to track which button description is open
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Real-time validation logic
  const requirements = [
    { id: 'length', text: 'At least 8 characters', met: securityKey.length >= 8 },
    { id: 'number', text: 'Contains a number', met: /\d/.test(securityKey) },
    { id: 'special', text: 'Special character (!@#$%)', met: /[!@#$%^&*(),.?":{}|<>]/.test(securityKey) }
  ];

  const allMet = requirements.every(req => req.met);

  const handleInitialize = () => {
    if (allMet) {
      setIsInitialized(true);
    }
  };

  const handleReset = () => {
    setIsInitialized(false);
    setSecurityKey('');
    setShowPassword(false);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white pb-24">
      
      <div className="pt-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Navigation */}
        <div className="w-full flex justify-center mb-10">
          <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm relative z-50">
            &larr; BACK TO HUB
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Native <span className="text-brand-orange">UI Polish.</span>
        </h1>
        
        <h2 className="text-brand-orange font-bold tracking-widest uppercase text-lg mb-6">
          Efficiency Engineered. Growth Automated.
        </h2>
        
        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-20">
          Showcasing crisp, lightweight component interactions powered by Tailwind utility classes, combined with real-time, state-driven form validation.
        </p>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full text-left">
          
          {/* Left Card: CSS Hover Mastery (Fully Loaded) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            
            {/* Dynamic Card Backgrounds */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/20 group-hover:scale-150 transition-all duration-1000 ease-out"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-orange/20 group-hover:scale-150 transition-all duration-1000 ease-out"></div>
            
            <h3 className="text-2xl font-black text-white mb-2 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-500">Hover State Mastery</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-8 relative z-10">Tailwind Utility Engine</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 h-auto">
              
              {/* Button 1: Plasma Sweep */}
              <button 
                onClick={() => setActiveFeature(activeFeature === 'plasma' ? null : 'plasma')}
                className={`relative px-4 py-6 border rounded-xl font-bold tracking-widest uppercase text-xs overflow-hidden group/btn1 hover:border-brand-orange/50 hover:shadow-[0_0_30px_-5px_rgba(255,95,31,0.5)] transition-all duration-300 ${activeFeature === 'plasma' ? 'border-brand-orange bg-brand-orange/10' : 'bg-slate-950 border-slate-800'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-amber-500 translate-x-[-100%] group-hover/btn1:translate-x-0 transition-transform duration-500 ease-out"></div>
                <span className={`relative z-10 transition-colors duration-300 ${activeFeature === 'plasma' ? 'text-brand-orange group-hover/btn1:text-white' : 'text-slate-400 group-hover/btn1:text-white'}`}>Plasma Sweep</span>
              </button>

              {/* Button 2: Cyber Override */}
              <button 
                onClick={() => setActiveFeature(activeFeature === 'cyber' ? null : 'cyber')}
                className={`relative px-4 py-6 border rounded-xl font-bold tracking-widest uppercase text-xs group/btn2 overflow-hidden hover:bg-[#CCFF00] hover:shadow-[0_0_30px_-5px_rgba(204,255,0,0.6)] transition-all duration-300 ${activeFeature === 'cyber' ? 'border-[#CCFF00] bg-[#CCFF00]/10' : 'bg-[#020617] border-[#CCFF00]/30'}`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn2:animate-ping transition-opacity duration-300"></div>
                <span className={`relative z-10 transition-colors duration-300 ${activeFeature === 'cyber' ? 'text-[#CCFF00] group-hover/btn2:text-black' : 'text-[#CCFF00] group-hover/btn2:text-black'}`}>Cyber Override</span>
              </button>

              {/* Button 3: Neon Elevation */}
              <button 
                onClick={() => setActiveFeature(activeFeature === 'neon' ? null : 'neon')}
                className={`relative px-4 py-6 border rounded-xl font-bold tracking-widest uppercase text-xs group/btn3 hover:-translate-y-2 hover:bg-blue-600 hover:border-blue-400 hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.6)] transition-all duration-300 ${activeFeature === 'neon' ? 'border-blue-500 bg-blue-500/20 shadow-[0_5px_20px_-5px_rgba(37,99,235,0.4)]' : 'bg-slate-900 border-slate-700'}`}
              >
                <span className={`relative z-10 transition-colors duration-300 ${activeFeature === 'neon' ? 'text-blue-400 group-hover/btn3:text-white' : 'text-slate-300 group-hover/btn3:text-white'}`}>Neon Elevation</span>
              </button>

              {/* Button 4: Frosted Glass */}
              <button 
                onClick={() => setActiveFeature(activeFeature === 'frosted' ? null : 'frosted')}
                className={`relative px-4 py-6 border rounded-xl font-bold tracking-widest uppercase text-xs group/btn4 overflow-hidden backdrop-blur-md hover:border-pink-500 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] transition-all duration-300 ${activeFeature === 'frosted' ? 'border-pink-500 bg-pink-500/10' : 'border-slate-700'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 opacity-0 group-hover/btn4:opacity-100 transition-opacity duration-500"></div>
                <span className={`relative z-10 transition-colors duration-300 ${activeFeature === 'frosted' ? 'text-pink-400 group-hover/btn4:text-pink-300' : 'text-slate-400 group-hover/btn4:text-pink-300'}`}>Frosted Glass</span>
              </button>

            </div>

            {/* Description Terminal (Animated) */}
            <div className="relative z-10 mt-6 min-h-[120px]"> 
              <AnimatePresence mode="wait">
                {activeFeature ? (
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full bg-[#020617]/80 border border-slate-700/50 rounded-xl p-5 backdrop-blur-md flex flex-col justify-center"
                  >
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                      {hoverFeatures[activeFeature].title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {hoverFeatures[activeFeature].desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex items-center justify-center border border-dashed border-slate-800 rounded-xl"
                  >
                    <span className="text-slate-600 text-sm font-bold uppercase tracking-widest">Select a module for specs</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Hardware LEDs */}
            <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center relative z-10">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Compiler Ready</span>
              <div className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-brand-orange group-hover:animate-pulse transition-colors duration-500 shadow-[0_0_10px_rgba(255,95,31,0)] group-hover:shadow-[0_0_10px_rgba(255,95,31,0.8)]"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-blue-500 group-hover:animate-pulse delay-75 transition-colors duration-500 shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-[#CCFF00] group-hover:animate-pulse delay-150 transition-colors duration-500 shadow-[0_0_10px_rgba(204,255,0,0)] group-hover:shadow-[0_0_10px_rgba(204,255,0,0.8)]"></span>
              </div>
            </div>
          </div>

          {/* Right Card: Smart Input Architecture */}
          <div className="bg-[#020617] border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-700"></div>
            
            <div>
              <h3 className="text-2xl font-black text-white mb-2 relative z-10">Smart Input Architecture</h3>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-8 relative z-10">Real-Time Validation</p>
            </div>
            
            <div className="relative z-10 w-full max-w-sm mx-auto">
              
              {/* Success Deployment Message */}
              <AnimatePresence>
                {isInitialized ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-6 text-center backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <h4 className="text-emerald-400 font-black tracking-wide text-lg mb-1">
                      Sequence Initialized
                    </h4>
                    <p className="text-slate-300 text-xs font-light leading-relaxed mb-6">
                      Security parameters validated. Digital infrastructure ready for automated deployment.
                    </p>

                    <button
                      onClick={handleReset}
                      className="px-6 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-white rounded-lg font-bold tracking-widest uppercase text-xs transition-colors cursor-pointer"
                    >
                      Reset Input
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    {/* The Input Field Wrapper */}
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={securityKey}
                        onChange={(e) => setSecurityKey(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Configure Security Key..."
                        className={`w-full bg-slate-950 border-2 rounded-xl pl-6 pr-20 py-4 text-white placeholder:text-slate-600 focus:outline-none transition-all duration-300 relative z-20 ${allMet ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800 focus:border-brand-orange focus:shadow-[0_0_20px_rgba(255,95,31,0.2)]'}`}
                      />

                      {/* Right Action Icons (Checkmark & Eye Toggle) */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2">
                        
                        {/* Validation Checkmark */}
                        <AnimatePresence>
                          {allMet && (
                            <motion.div 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="text-emerald-500"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Password Visibility Toggle Button */}
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-500 hover:text-slate-300 transition-colors p-1 focus:outline-none"
                          title={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            // Eye Off Icon
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            // Eye Open Icon
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Dropdown Validation Panel */}
                    <AnimatePresence>
                      {(isFocused || securityKey.length > 0) && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="overflow-hidden w-full mt-4"
                        >
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-2xl">
                            
                            {requirements.map((req) => (
                              <div key={req.id} className="flex items-center gap-3">
                                <motion.div
                                  animate={{
                                    backgroundColor: req.met ? '#10b981' : 'transparent',
                                    borderColor: req.met ? '#10b981' : '#334155'
                                  }}
                                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 shrink-0"
                                >
                                  {req.met && (
                                    <motion.svg 
                                      initial={{ scale: 0 }} animate={{ scale: 1 }} 
                                      className="w-3 h-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                    </motion.svg>
                                  )}
                                </motion.div>
                                <span className={`text-sm transition-colors duration-300 ${req.met ? 'text-white font-bold' : 'text-slate-500'}`}>
                                  {req.text}
                                </span>
                              </div>
                            ))}
                            
                            {/* Dynamic Submit Button */}
                            <motion.button
                              onClick={handleInitialize}
                              disabled={!allMet}
                              animate={{
                                opacity: allMet ? 1 : 0.4,
                                scale: allMet ? 1 : 0.98,
                              }}
                              className={`mt-2 w-full py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300 ${allMet ? 'bg-brand-orange text-white shadow-[0_0_20px_rgba(255,95,31,0.4)] hover:bg-white hover:text-brand-orange cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                            >
                              {allMet ? 'Initialize Sequence' : 'Awaiting Input'}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </AnimatePresence>

            </div>

            <div className="h-4"></div>
          </div>

        </div>
      </div>
    </div>
  );
}