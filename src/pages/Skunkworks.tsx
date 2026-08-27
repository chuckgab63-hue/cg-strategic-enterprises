import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Voicebot Architecture Data ---
const voicebots = [
  {
    id: 'inbound-dispatch',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>,
    title: '24/7 Intelligent Dispatcher',
    shortDesc: 'Replacing the traditional IVR. The AI answers natively, triages the emergency level, and instantly fires webhooks.',
    fullDesc: 'Instead of forcing callers through frustrating phone trees ("Press 1 for Sales"), the AI answers natively and converses naturally. It listens to the issue, assesses urgency based on your custom criteria (e.g., active leak vs. billing question), and routes the data immediately via Make.com to on-call technicians or internal ticketing systems.',
    trigger: 'Inbound Call Received',
    actions: ['Transcribe & Analyze Intent', 'Assess Urgency Matrix', 'Fire Make.com Webhook'],
    outcome: 'Instant Routing & Alert'
  },
  {
    id: 'stale-lead',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    title: 'Stale Lead Reactivator',
    shortDesc: 'Voicebots that dial. Triggers outbound check-in calls to dormant leads to book appointments directly onto your calendar.',
    fullDesc: 'Stop letting old leads gather dust in your CRM. When a prospect goes dormant for a set period (e.g., 60 days), the system automatically triggers the voicebot to initiate an outbound call. It engages them with a personalized, contextual script and can securely book follow-up appointments directly into your sales calendar live on the phone.',
    trigger: 'CRM Status == Dormant > 60 Days',
    actions: ['Initiate Outbound Call', 'Execute Contextual Script', 'Sync Live with Calendar API'],
    outcome: 'Reactivated Revenue'
  },
  {
    id: 'order-lookup',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>,
    title: 'API-Driven Order Lookup',
    shortDesc: 'Connecting voice to data. Customers speak their order number, and the bot dynamically reads back live shipping statuses.',
    fullDesc: 'Eliminate Tier-1 support queries entirely. When a customer calls asking "Where is my order?", the voicebot captures their order number and instantly queries your Shopify, Stripe, or fulfillment API webhooks. It synthesizes the live tracking data into natural speech, providing accurate ETAs without ever involving a human agent.',
    trigger: 'Caller Requests Order Status',
    actions: ['Extract Order ID', 'Query E-Commerce Webhook', 'Synthesize ETA Response'],
    outcome: 'Zero-Touch Deflection'
  },
  {
    id: 'conversational-qual',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
    title: 'Conversational Qualification',
    shortDesc: 'Replacing web forms with conversation. The AI guides callers through discovery and posts formatted data to your CRM.',
    fullDesc: 'Drop click-to-call links in your ad campaigns and let the AI do the heavy lifting. The voicebot navigates your custom discovery framework—asking about budget, timeline, and project scope. It processes the entire conversation, structures the extracted data into a clean JSON payload, and posts it directly into your CRM for the sales team.',
    trigger: 'Click-to-Call Ad Engaged',
    actions: ['Conduct Discovery Framework', 'Extract BANT Data', 'Post JSON Payload to CRM'],
    outcome: 'Pre-Qualified Pipeline'
  }
];

export default function Skunkworks() {
  const [selectedVoicebot, setSelectedVoicebot] = useState<typeof voicebots[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isModalOpen || selectedVoicebot) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen, selectedVoicebot]);

  // Handle Make.com Webhook Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      // Replace with your actual Make.com webhook URL
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center py-24 px-6 relative overflow-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Ambient Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-orange/10 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="max-w-6xl w-full z-10 flex flex-col gap-16">
        
        {/* Header */}
        <header className="text-center relative">
          <div className="inline-block mb-4 px-4 py-1.5 bg-brand-orange/10 border border-brand-orange/30 rounded-full">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Active R&D Laboratory</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Skunkworks.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            A look inside our active development pipeline. These are the bleeding-edge systems, prototypes, and integrations we are engineering to define the next era of automated growth.
          </p>
        </header>

        {/* Project 1: Advanced Voicebot Architecture */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="bg-[#020617]/80 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-blue-500/10"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Advanced Voicebot Architecture</h2>
              <p className="text-slate-400 font-light">Conversational AI routed directly into your operational stack.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">In Prototyping</span>
            </div>
          </div>

          {/* Interactive Voicebot Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <AnimatePresence>
              {voicebots.map((bot) => (
                <motion.div
                  key={bot.id}
                  layoutId={`voicebot-card-${bot.id}`}
                  onClick={() => setSelectedVoicebot(bot)}
                  className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl cursor-pointer hover:border-blue-500/30 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
                    {bot.icon}
                  </div>
                  <motion.h3 layoutId={`voicebot-title-${bot.id}`} className="text-white font-bold text-lg mb-2">
                    {bot.title}
                  </motion.h3>
                  <motion.p layoutId={`voicebot-desc-${bot.id}`} className="text-slate-400 text-sm leading-relaxed">
                    {bot.shortDesc}
                  </motion.p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-10 flex justify-end relative z-10">
            <button 
              onClick={() => {
                setFormData({ ...formData, message: `Skunkworks Inquiry: Let's discuss deploying the Voicebot Architecture for my business.` });
                setIsModalOpen(true);
              }}
              className="bg-blue-600/20 border border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
            >
              Discuss Deployment
            </button>
          </div>
        </motion.div>

        {/* Project 2: AI Virtual Staging */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="bg-[#020617]/80 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-brand-orange/10"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">AI Virtual Staging Engine</h2>
              <p className="text-slate-400 font-light">Real-time interior design rendering powered by generative AI models.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Classified // Initializing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-center">
            <div className="space-y-6 text-slate-400 leading-relaxed text-sm">
               <p>
                 <strong className="text-white">The Competitive Edge:</strong> Unlike standard real estate platforms that force rigid, all-or-nothing room overrides, this engine integrates granular, object-level masking. Clients can keep the existing hardwood floors but instantly swap out a dated sofa for a modern sectional. Furthermore, generated assets can be tied to live retail APIs, turning a visualizer into a shoppable affiliate pipeline.
               </p>
               <p>
                 <strong className="text-white">The Cost Advantage:</strong> Traditional manual virtual staging averages $30-$50 per photo with 24-hour turnaround times. By engineering this widget on Serverless GPU infrastructure with aggressive edge-caching, compute costs are fractionalized to pennies per generation—delivering a vastly superior product at a disruptive profit margin for agencies and brokerages.
               </p>
               <p>
                 <strong className="text-white">Status:</strong> Base React canvas and Replicate/fal.ai API integration scheduled for engineering block.
               </p>
            </div>

            {/* Cinematic Empty Room Placeholder */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl aspect-video relative overflow-hidden shadow-inner group/stage">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80" 
                alt="Empty high-end room awaiting virtual staging"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover/stage:mix-blend-normal group-hover/stage:opacity-50 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite] pointer-events-none"></div>
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-orange/70"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand-orange/70"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand-orange/70"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-orange/70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
                  <span className="text-slate-200 font-bold tracking-widest uppercase text-[10px]">Awaiting AI Generation Model</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* --- Voicebot Workflow Mapping Modal --- */}
      <AnimatePresence>
        {selectedVoicebot && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 pt-20">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedVoicebot(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              layoutId={`voicebot-card-${selectedVoicebot.id}`}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-y-auto max-h-[calc(100vh-100px)] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col cursor-default"
            >
              {/* Modal Header */}
              <div className="w-full p-6 border-b border-slate-800 bg-[#020617] flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center">
                    {selectedVoicebot.icon}
                  </div>
                  <motion.h3 layoutId={`voicebot-title-${selectedVoicebot.id}`} className="text-xl md:text-2xl font-black text-white">
                    {selectedVoicebot.title}
                  </motion.h3>
                </div>
                <button 
                  onClick={() => setSelectedVoicebot(null)}
                  className="w-8 h-8 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Modal Body - Split Layout */}
              <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 bg-slate-900">
                
                {/* Left Column: Context & CTA */}
                <div className="flex-1 flex flex-col gap-6">
                  <div>
                    <h4 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-2">Strategic Context</h4>
                    <motion.p layoutId={`voicebot-desc-${selectedVoicebot.id}`} className="text-slate-300 leading-relaxed text-sm">
                      {selectedVoicebot.fullDesc}
                    </motion.p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-800">
                    <button 
                      onClick={() => {
                        setFormData({ ...formData, message: `System Inquiry: Requesting architecture specs for the ${selectedVoicebot.title} voicebot.` });
                        setSelectedVoicebot(null);
                        setTimeout(() => setIsModalOpen(true), 300); // Wait for card to close before opening comms
                      }}
                      className="w-full bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300"
                    >
                      Request Architecture Specs
                    </button>
                  </div>
                </div>

                {/* Right Column: Logic Visualizer */}
                <div className="flex-[1.5] bg-[#020617] border border-slate-800 rounded-2xl p-6 relative">
                  <h4 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-6 absolute top-6 left-6">Execution Sequence</h4>
                  
                  <div className="flex flex-col gap-2 mt-8">
                    {/* Trigger Node */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                      className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg flex items-center gap-3 relative z-10"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                      <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Trigger:</span>
                      <span className="text-slate-200 text-sm">{selectedVoicebot.trigger}</span>
                    </motion.div>

                    {/* Action Nodes */}
                    <div className="flex flex-col gap-2 pl-6 border-l-2 border-slate-800 ml-4 py-2">
                      {selectedVoicebot.actions.map((action, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
                          className="bg-slate-800/50 border border-slate-700 p-3 rounded-lg flex items-center gap-3 relative"
                        >
                          <div className="absolute -left-[26px] top-1/2 w-6 h-[2px] bg-slate-800"></div>
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Action:</span>
                          <span className="text-slate-300 text-sm">{action}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Outcome Node */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg flex items-center gap-3 relative z-10"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                      <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Outcome:</span>
                      <span className="text-slate-100 text-sm font-bold">{selectedVoicebot.outcome}</span>
                    </motion.div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Global Communication Modal (Let's Talk) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pt-20">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-[#020617] shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-white">Initialize Communication</h3>
                  <p className="text-slate-400 text-sm mt-1">Select your preferred routing protocol.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 md:pb-12 overflow-y-auto custom-scrollbar flex flex-col md:flex-row items-start gap-8 bg-[#020617]">
                
                {/* Option 1: AI Voicebot */}
                <div className="flex-1 w-full bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all group shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">AI Voice Interface</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                    Bypass the form. Instantly connect with our intelligent voice agent to ask questions and route your inquiry directly to the right engineer.
                  </p>
                  <a 
                    href="tel:+15555555555" 
                    className="w-full bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    Initiate Call
                  </a>
                </div>

                {/* Option 2: Webhook Form */}
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
                      <input 
                        type="text" 
                        required
                        placeholder="System / Commander Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
                      />
                      <input 
                        type="email" 
                        required
                        placeholder="Secure Comm Link (Email)" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
                      />
                      <textarea 
                        required
                        placeholder="Define your operational objective..." 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors resize-none"
                      />
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
                          formStatus === 'submitting' 
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600' 
                            : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent'
                        }`}
                      >
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