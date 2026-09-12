import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ContactModal from '../components/ContactModal';

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

export default function FluidDynamics() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Global Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const filteredProjects = projects.filter(p => activeFilter === 'ALL' || p.category === activeFilter);

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white pb-32">
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      <div className="pt-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 min-h-[60vh]">
        
        <div className="w-full flex justify-center mb-10">
          <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm">
            &larr; BACK TO HUB
          </Link>
        </div>

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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
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

      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 md:p-6 pt-28 md:pt-32">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              layoutId={`card-container-${selectedProject.id}`}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-y-auto max-h-[calc(100vh-140px)] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col cursor-default"
            >
              <div className={`w-full p-5 md:p-6 bg-gradient-to-br ${selectedProject.color} relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 pr-12">
                  <motion.span layoutId={`category-${selectedProject.id}`} className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2 bg-white/20 text-white backdrop-blur-md border border-white/30">
                    {selectedProject.category}
                  </motion.span>
                  <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-xl md:text-2xl font-black mb-1 text-white drop-shadow-md">
                    {selectedProject.title}
                  </motion.h3>
                  <motion.p layoutId={`desc-${selectedProject.id}`} className="text-sm text-white/90 drop-shadow-md max-w-md">
                    {selectedProject.desc}
                  </motion.p>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 md:top-5 md:right-5 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors z-20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.1 }}
                className="p-5 md:p-6 flex flex-col gap-4 bg-[#020617]"
              >
                <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-1.5">Architectural Overview</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {selectedProject.details}
                  </p>
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
                  <button 
                    onClick={() => {
                      setContactMessage(`System Inquiry: Requesting integration details for the ${selectedProject.title} module.`);
                      setSelectedProject(null);
                      setTimeout(() => setIsContactModalOpen(true), 300); // Wait for card to close before opening comms
                    }}
                    className="bg-brand-orange hover:bg-white text-white hover:text-brand-orange px-6 py-2.5 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300 shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                  >
                    Request Integration
                  </button>
                </div>
              </motion.div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Global Communication Modal --- */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        initialMessage={contactMessage} 
      />

    </div>
  );
}