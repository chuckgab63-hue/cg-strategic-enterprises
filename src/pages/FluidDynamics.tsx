import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, category: 'Automation', title: 'CRM Lead Routing', desc: 'Zero-touch data pipeline.' },
  { id: 2, category: 'Web', title: 'Client Portal', desc: 'Secure document access.' },
  { id: 3, category: 'Automation', title: 'Invoice Engine', desc: 'Automated billing cycles.' },
  { id: 4, category: 'AI', title: 'Support Agent', desc: '24/7 intelligent routing.' },
];

const tabs = ['All', 'Web', 'Automation', 'AI'];

// Extracted 3D Tilt Card Component
function TiltCard({ project }: { project: typeof projects[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col items-start h-full cursor-crosshair hover:border-brand-orange/50 transition-colors"
      >
        <span className="text-xs font-bold text-brand-orange mb-4 uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-slate-400">{project.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FluidDynamics() {
  const [activeTab, setActiveTab] = useState('All');
  const filteredProjects = projects.filter(p => activeTab === 'All' || p.category === activeTab);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950 flex flex-col items-center py-16 px-6 relative selection:bg-brand-orange selection:text-white"
    >
      {/* Ambient Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-5xl w-full z-10">
        
        {/* Navigation */}
        <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold mb-12 inline-flex items-center gap-2 uppercase tracking-widest text-sm">
          &larr; Back to Hub
        </Link>
        
        <header className="mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-midnight via-brand-orange to-amber-400">Dynamics.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Interact with physics-based layout transitions. Hover over the cards to experience 3D spatial tracking calculated in real-time by Framer Motion.
          </p>
        </header>

        <div>
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                } relative px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-brand-orange rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* 3D Filterable Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <TiltCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}