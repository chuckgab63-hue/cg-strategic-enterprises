import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// DATA: UI POLISH HOVER FEATURES
// ==========================================
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

// ==========================================
// DATA: FLUID DYNAMICS PROJECTS
// ==========================================
interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  color: string;
  details: string;
  capabilities: string[];
}

const projects: Project[] = [
  { 
    id: 1, 
    title: 'Enterprise Lead Pipeline', 
    category: 'WEB', 
    desc: 'High-conversion lead generation architecture with automated CRM handoffs.', 
    color: 'from-blue-500 to-cyan-400',
    details: 'We engineer front-end landing pages that don’t just look good—they convert. By directly routing form submissions into your CRM via secure webhooks, we eliminate manual data entry and ensure your sales team responds to leads in seconds.',
    capabilities: ['Real-time CRM Sync', 'A/B Tested Layouts', 'Zero-Latency Routing']
  },
  { 
    id: 2, 
    title: 'Field Service Sync Engine', 
    category: 'AUTOMATION', 
    desc: 'Event-driven data pipelines synchronizing field service workflows.', 
    color: 'from-brand-orange to-amber-500',
    details: 'Stop doing duplicate data entry. We build custom automation layers that listen for field service updates, automatically generating invoices, notifying customers, and updating your central dashboard without human intervention.',
    capabilities: ['Webhook Listening', 'Automated Invoicing', 'Multi-App Sync']
  },
  { 
    id: 3, 
    title: 'Procurement Ops Widget', 
    category: 'AI', 
    desc: 'Intelligent dashboard interface for real-time asset tracking and forecasting.', 
    color: 'from-emerald-500 to-teal-400',
    details: 'An embedded AI module designed to sit inside your existing ERP. It analyzes historical purchasing data, flags supply chain bottlenecks before they happen, and generates automated procurement requests for approval.',
    capabilities: ['ERP Integration', 'Predictive Analytics', 'Automated Purchasing']
  },
  { 
    id: 4, 
    title: 'AI Campaign Generator', 
    category: 'AI', 
    desc: 'Algorithmic video prompting matrix for scalable digital media deployment.', 
    color: 'from-purple-600 to-pink-500',
    details: 'Scale your social presence exponentially. We utilize generative AI models to programmatically generate and iterate high-quality promotional video content based on your brand guidelines and trending audio profiles.',
    capabilities: ['Programmatic Rendering', 'Brand Guardrails', 'A/B Prompting']
  },
  { 
    id: 5, 
    title: 'Dynamic Lead Routing', 
    category: 'AUTOMATION', 
    desc: 'Logic-based form routing ensuring zero latency from capture to contact.', 
    color: 'from-[#CCFF00] to-green-500',
    details: 'Not all leads are created equal. Our routing engine scores incoming inquiries based on budget and urgency, instantly pinging the right closer via Slack or SMS while sending a personalized holding email to the prospect.',
    capabilities: ['Lead Scoring', 'Instant SMS/Slack Pings', 'Conditional Logic']
  },
  { 
    id: 6, 
    title: 'CG Strategic Hub', 
    category: 'WEB', 
    desc: 'Interactive deployment center featuring high-fidelity frontend engineering.', 
    color: 'from-slate-500 to-slate-400',
    details: 'Your digital presence should be an experience. We utilize React, Tailwind, and GSAP/Framer Motion to build immersive, hardware-accelerated web applications that prove your technical competence before a client ever speaks to you.',
    capabilities: ['State-Driven UI', 'Physics Animations', 'Component Architecture']
  }
];

const filters = ['ALL', 'WEB', 'AUTOMATION', 'AI'];

// ==========================================
// COMPONENT: 3D TILT CARD (Fluid Dynamics)
// ==========================================
const TiltCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-80 w-full rounded-3xl p-8 cursor-pointer flex flex-col justify-end group shadow-2xl border border-slate-700 bg-slate-900 overflow-hidden"
    >
      <div 
        style={{ transform: "translateZ(-30px)" }}
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
      />
      
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${project.color} blur-[80px] opacity-0 group-hover:opacity-80 transition-opacity duration-700 rounded-full z-0 pointer-events-none`} />
      
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 pointer-events-none">
        <motion.span layoutId={`category-${project.id}`} className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 bg-white/20 text-white backdrop-blur-md border border-white/30">
          {project.category}
        </motion.span>
        <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-black mb-2 text-white drop-shadow-md">
          {project.title}
        </motion.h3>
        <motion.p layoutId={`desc-${project.id}`} className="text-sm leading-relaxed text-slate-200 drop-shadow-md">
          {project.desc}
        </motion.p>
      </div>

      <div 
        style={{ transform: "translateZ(10px)" }}
        className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/40 transition-colors duration-500 pointer-events-none"
      />
    </motion.div>
  );
};


// ==========================================
// MAIN COMPONENT: CONTINUOUS SCROLL HOME
// ==========================================
export default function Home() {
  
  // --- Global Form/Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // --- UI Polish State ---
  const [securityKey, setSecurityKey] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const requirements = [
    { id: 'length', text: 'At least 8 characters', met: securityKey.length >= 8 },
    { id: 'number', text: 'Contains a number', met: /\d/.test(securityKey) },
    { id: 'special', text: 'Special character (!@#$%)', met: /[!@#$%^&*(),.?":{}|<>]/.test(securityKey) }
  ];
  const allMet = requirements.every(req => req.met);

  // --- Fluid Dynamics State ---
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filteredProjects = projects.filter(p => activeFilter === 'ALL' || p.category === activeFilter);

  // --- Cinematic Sequences Refs ---
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isModalOpen || selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen, selectedProject]);

  // Handle Make.com Webhook Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await fetch('YOUR_MAKE_WEBHOOK_URL_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('idle');
    }
  };

  // GSAP Animations for Cinematic Section
  useGSAP(() => {
    gsap.to(heroTextRef.current, {
      scale: 15,
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '.cinematic-hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      },
    });

    gsap.to('.cinematic-fade-element', {
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cinematic-hero-section',
        start: 'top top',
        end: '30% top',
        scrub: true,
      },
    });

    const panels = gsap.utils.toArray('.horizontal-panel');
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1, 
        snap: 1 / (panels.length - 1),
        end: () => "+=" + (horizontalRef.current?.offsetWidth || 0),
      },
    });
  }, { scope: containerRef });


  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white relative">
      
      {/* Global Background Wireframe */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      {/* =========================================
          SECTION 1: ORIGINAL HERO 
          ========================================= */}
      <header className="flex flex-col lg:flex-row items-center justify-center text-left max-w-7xl mx-auto w-full p-6 py-12 lg:py-24 gap-10 lg:gap-16 min-h-[85vh] relative z-10">
        
        {/* Left Column: Visual Hook */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-8 lg:ml-8">
          <motion.div
            className="rounded-3xl"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -15, 0],
              boxShadow: [
                '0 10px 40px rgba(255, 95, 31, 0.3)',
                '0 20px 80px rgba(255, 95, 31, 0.7)',
                '0 10px 40px rgba(255, 95, 31, 0.3)'
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src="/hero.png"
              alt="CG Strategic Enterprises"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl bg-white relative z-10"
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
                filter: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 } 
              }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </div>

        {/* Right Column: High-Impact Abbreviated Copy */}
        <div className="flex-1 w-full flex flex-col items-start text-left z-20">
          <motion.h1 
            className="text-4xl lg:text-6xl font-black mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-white">Look established.</span><br />
            <span className="text-brand-orange">Or BE established.</span>
          </motion.h1>

          <motion.div 
            className="space-y-4 text-base md:text-lg text-slate-400 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p>
              In an industry obsessed with "faking it," we operate differently. CG Strategic Enterprises is built on forty-five years of enterprise architecture experience. 
            </p>
            <p>
              No smoke, mirrors, or marketing fluff. Just tested code, secure integrations, and relentless execution to streamline your operations so your team runs leaner and faster.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-8 py-3 rounded-md font-bold tracking-wide hover:opacity-90 transition-all shadow-md cursor-pointer hover:scale-105"
            >
              Start a Project
            </button>
            <Link to="/portfolio">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold tracking-wide hover:bg-white hover:text-slate-900 transition-all cursor-pointer hover:scale-105">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* =========================================
          TRANSITION HEADER
          ========================================= */}
      <div className="w-full text-center py-32 relative z-10 border-t border-slate-900 mt-20">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6">Elevate Your Digital Presence</h2>
        <div className="text-center w-full max-w-3xl mx-auto px-6">
          <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed bg-brand-orange text-white py-2 px-4 rounded-xl shadow-[0_0_30px_rgba(255,95,31,0.3)] inline-block">
            We transform flat, static websites into dynamic digital experiences. Here is a live demonstration of our rendering capabilities.
          </p>
        </div>
      </div>


      {/* =========================================
          SECTION 2: UI POLISH
          ========================================= */}
      <section className="pt-10 pb-32 px-6 max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 border-b border-slate-900">
        
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Native <span className="text-brand-orange">UI Polish.</span>
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-20">
          Showcasing crisp, lightweight component interactions powered by Tailwind utility classes, combined with real-time, state-driven form validation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full text-left">
          
          {/* Left Card: CSS Hover Mastery */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
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
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
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
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
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
              <AnimatePresence mode="wait">
                {isInitialized ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-6 text-center backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-emerald-400 font-black tracking-wide text-lg mb-1">Sequence Initialized</h4>
                    <p className="text-slate-300 text-xs font-light leading-relaxed mb-6">Security parameters validated. Digital infrastructure ready for automated deployment.</p>
                    <button
                      onClick={() => { setIsInitialized(false); setSecurityKey(''); setShowPassword(false); }}
                      className="px-6 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-white rounded-lg font-bold tracking-widest uppercase text-xs transition-colors cursor-pointer"
                    >
                      Reset Input
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                        <AnimatePresence>
                          {allMet && (
                            <motion.div 
                              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                              className="text-emerald-500"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-500 hover:text-slate-300 transition-colors p-1 focus:outline-none"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Dropdown Validation Panel */}
                    <AnimatePresence>
                      {(isFocused || securityKey.length > 0) && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
                          className="overflow-hidden w-full mt-4"
                        >
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-2xl">
                            {requirements.map((req) => (
                              <div key={req.id} className="flex items-center gap-3">
                                <motion.div
                                  animate={{ backgroundColor: req.met ? '#10b981' : 'transparent', borderColor: req.met ? '#10b981' : '#334155' }}
                                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 shrink-0"
                                >
                                  {req.met && (
                                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></motion.svg>
                                  )}
                                </motion.div>
                                <span className={`text-sm transition-colors duration-300 ${req.met ? 'text-white font-bold' : 'text-slate-500'}`}>{req.text}</span>
                              </div>
                            ))}
                            <motion.button
                              onClick={() => { if(allMet) setIsInitialized(true); }}
                              disabled={!allMet}
                              animate={{ opacity: allMet ? 1 : 0.4, scale: allMet ? 1 : 0.98 }}
                              className={`mt-2 w-full py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300 ${allMet ? 'bg-brand-orange text-white shadow-[0_0_20px_rgba(255,95,31,0.4)] hover:bg-white hover:text-brand-orange cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                            >
                              {allMet ? 'Initialize Sequence' : 'Awaiting Input'}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-4"></div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: FLUID DYNAMICS
          ========================================= */}
      <section className="pt-32 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 border-b border-slate-900">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-brand-orange to-amber-500">Dynamics.</span>
        </h1>
        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-16">
          Interact with physics-based layout transitions. Click any module to evaluate architectural specifications and request integration.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-16 p-2 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-xl transition-colors duration-300 z-10 ${
                activeFilter === filter ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-brand-orange rounded-xl -z-10 shadow-[0_0_20px_rgba(255,95,31,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full perspective-[1000px] min-h-[400px]">
          {filteredProjects.length > 0 ? (
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  className="w-full"
                >
                  <TiltCard project={project} onClick={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full py-20 text-slate-500 font-mono text-sm">
              // NO MODULES FOUND MATCHING CURRENT FILTER PARAMETERS
            </div>
          )}
        </motion.div>
      </section>

      {/* =========================================
          SECTION 4: CINEMATIC SEQUENCES (GSAP)
          ========================================= */}
      {/* GSAP Hero Section (Pinned & Scrubbed) */}
      <section className="cinematic-hero-section h-screen w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-midnight/40 via-slate-950 to-slate-950"></div>
        
        <div className="z-10 w-full flex flex-col items-center justify-center h-full pt-20">
          <h1 ref={heroTextRef} className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none whitespace-nowrap origin-center">
            CINEMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">SCALE.</span>
          </h1>
          
          <div className="cinematic-fade-element flex flex-col items-center mt-10">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-lg mb-4">
              Efficiency Engineered. Growth Automated.
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto opacity-70">
              Scroll down to initialize the timeline.
            </p>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-brand-orange opacity-70">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Horizontal Scroll Section */}
      <section ref={horizontalRef} className="h-screen flex flex-nowrap w-full overflow-hidden bg-[#020617] relative border-t border-slate-900">
        <div className="absolute top-0 left-0 h-full w-[300%] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>

        {/* Panel 1 */}
        <div className="horizontal-panel w-full h-full flex items-center justify-center relative px-6 md:px-24 shrink-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[40rem] font-black text-slate-900/40 z-0 select-none tracking-tighter">01</div>
          <div className="z-10 max-w-4xl backdrop-blur-sm bg-slate-950/60 p-8 md:p-16 rounded-3xl border border-slate-800 shadow-2xl">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-brand-orange"></span> Phase 1
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-6">The Audit.</h3>
            <p className="text-2xl text-slate-300 leading-relaxed font-light">
              We don't guess. We map your exact processes, find the hidden revenue leaks, and identify the manual, repetitive work that is stealing your time.
            </p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="horizontal-panel w-full h-full flex items-center justify-center relative px-6 md:px-24 shrink-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[40rem] font-black text-slate-900/40 z-0 select-none tracking-tighter">02</div>
          <div className="z-10 max-w-4xl backdrop-blur-sm bg-slate-950/60 p-8 md:p-16 rounded-3xl border border-brand-orange/20 shadow-[0_0_50px_rgba(255,95,31,0.1)]">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-brand-orange"></span> Phase 2
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-6">The Engineering.</h3>
            <p className="text-2xl text-slate-300 leading-relaxed font-light">
              We build custom digital infrastructure. From seamless CRM integrations to client portals, we engineer the systems that allow you to scale without adding headcount.
            </p>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="horizontal-panel w-full h-full flex items-center justify-center relative px-6 md:px-24 shrink-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[40rem] font-black text-slate-900/40 z-0 select-none tracking-tighter">03</div>
          <div className="z-10 max-w-4xl text-center flex flex-col items-center">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4">Phase 3</h2>
            <h3 className="text-6xl md:text-8xl font-black mb-6">Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Growth.</span></h3>
            <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
              Lead routing, automated invoicing, and intelligent support. Your business runs 24/7, delivering flawless client experiences while you step back from the daily grind.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-12 py-5 rounded-md font-bold tracking-widest uppercase hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_30px_rgba(255,95,31,0.3)] hover:scale-105 cursor-pointer"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </section>


      {/* =========================================
          NEXT PAGE RUNWAY CTA (The Engine)
          ========================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-16 mb-24 relative z-10">
        <Link 
          to="/automations" 
          className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">Continue Exploring</h3>
              <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 transition-all duration-500">
                Enter The Engine.
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-[#020617] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,95,31,0.5)] shrink-0">
              <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
        </Link>
      </div>


      {/* =========================================
          GLOBAL OVERLAYS & MODALS
          ========================================= */}
      
      {/* 1. Fluid Dynamics Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 md:p-6 pt-28 md:pt-32">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer" />
            <motion.div layoutId={`card-container-${selectedProject.id}`} className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-y-auto max-h-[calc(100vh-140px)] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col cursor-default">
              <div className={`w-full p-5 md:p-6 bg-gradient-to-br ${selectedProject.color} relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 pr-12">
                  <motion.span layoutId={`category-${selectedProject.id}`} className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2 bg-white/20 text-white backdrop-blur-md border border-white/30">{selectedProject.category}</motion.span>
                  <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-xl md:text-2xl font-black mb-1 text-white drop-shadow-md">{selectedProject.title}</motion.h3>
                  <motion.p layoutId={`desc-${selectedProject.id}`} className="text-sm text-white/90 drop-shadow-md max-w-md">{selectedProject.desc}</motion.p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 md:top-5 md:right-5 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors z-20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.1 }} className="p-5 md:p-6 flex flex-col gap-4 bg-[#020617]">
                <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-1.5">Architectural Overview</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">{selectedProject.details}</p>
                </div>
                <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-1.5">Core Capabilities</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-slate-300 text-sm bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                        <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button onClick={() => { setSelectedProject(null); setIsModalOpen(true); }} className="bg-brand-orange hover:bg-white text-white hover:text-brand-orange px-6 py-2.5 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300 shadow-[0_0_20px_rgba(255,95,31,0.3)]">
                    Request Integration
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Global Communication Webhook Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pt-20 text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", bounce: 0.1, duration: 0.4 }} className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]">
              <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-[#020617] shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-white">Initialize Communication</h3>
                  <p className="text-slate-400 text-sm mt-1">Select your preferred routing protocol.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <div className="p-6 md:p-8 md:pb-12 overflow-y-auto custom-scrollbar flex flex-col md:flex-row items-start gap-8 bg-[#020617]">
                <div className="flex-1 w-full bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all group shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">AI Voice Interface</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Bypass the form. Instantly connect with our intelligent voice agent to ask questions and route your inquiry directly to the right engineer.</p>
                  <a href="tel:+15555555555" className="w-full bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2">Initiate Call</a>
                </div>
                <div className="flex-[1.2] w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shrink-0">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
                     <h4 className="text-white font-bold text-lg">Secure Data Transmission</h4>
                  </div>
                  {formStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <h5 className="text-emerald-400 font-bold mb-2">Payload Delivered</h5>
                      <p className="text-slate-400 text-sm">Your data has been successfully routed to our internal systems.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input type="text" required placeholder="System / Commander Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors" />
                      <input type="email" required placeholder="Secure Comm Link (Email)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors" />
                      <textarea required placeholder="Define your operational objective..." rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors resize-none" />
                      <button type="submit" disabled={formStatus === 'submitting'} className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${formStatus === 'submitting' ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600' : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent'}`}>
                        {formStatus === 'submitting' ? 'Transmitting...' : 'Transmit Payload'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}