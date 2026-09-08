import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Automation Workflow Data ---
const automations = [
  {
    id: 'lead-capture',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    title: 'Omni-Channel Lead Capture',
    desc: 'Instantly catch leads from social forms, your website, or Google Local Services, and funnel them into one unified database.',
    trigger: 'New Lead Submission (Any Source)',
    actions: ['Normalize Data Payload', 'Check for Duplicates', 'Route to Central DB'],
    outcome: '100% Lead Retention'
  },
  {
    id: 'sms-dispatch',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    title: 'Zero-Touch SMS Dispatch',
    desc: 'Trigger an immediate, personalized text message to a new lead within 10 seconds of form submission. Never lose a lead to a competitor again.',
    trigger: 'New Record Created in DB',
    actions: ['Evaluate Lead Score', 'Select Template', 'Dispatch via SMS API'],
    outcome: 'Instant Engagement'
  },
  {
    id: 'crm-sync',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    title: 'Enterprise CRM Syncing',
    desc: 'Push data directly into industry-specific CRMs. Keep your sales, support, and field teams perfectly aligned in real-time.',
    trigger: 'Lifecycle Stage Change',
    actions: ['Format Payload for API', 'Push to Target CRM', 'Sync Unique IDs'],
    outcome: 'Data Parity Across Stack'
  },
  {
    id: 'invoice-gen',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: 'Automated Invoicing',
    desc: 'Generate and dispatch digital invoices the moment a job is marked complete in the field, accelerating cash flow.',
    trigger: 'Job Status -> Complete',
    actions: ['Calculate Line Items', 'Generate PDF Document', 'Email to Client'],
    outcome: 'Zero-Day Billing'
  },
  {
    id: 'review-request',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    title: 'Reputation Management Loop',
    desc: 'Automatically request reviews from satisfied clients while routing negative feedback to an internal escalation queue.',
    trigger: 'Invoice Marked Paid',
    actions: ['Send NPS Survey', 'Filter by Score', 'Request Review / Alert Manager'],
    outcome: 'Organic Rating Growth'
  },
  {
    id: 'stale-nurture',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Stale Lead Revival',
    desc: 'Detect leads that have gone dark and automatically drop them into a long-term SMS and email nurture sequence.',
    trigger: 'Inactivity > 30 Days',
    actions: ['Tag as Stale in CRM', 'Add to Nurture Campaign', 'Monitor for Reply'],
    outcome: 'Reactivated Revenue'
  }
];

export default function Automations() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof automations[0] | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // Progressive group count state: cycles 1 -> 2 -> 3 -> 4 -> resets to 1
  const [packetCount, setPacketCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll if either modal is open
  useEffect(() => {
    if (selectedWorkflow || isContactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedWorkflow, isContactModalOpen]);

  // Handle Webhook Submission
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
        setIsContactModalOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('idle');
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white pb-32">
      
      {/* Background Wireframe Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      <div className="pt-20 px-6 max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Navigation */}
        <div className="w-full flex justify-center mb-10">
          <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm">
            &larr; BACK TO HUB
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            System <span className="text-brand-orange">Automations.</span>
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            Efficiency Engineered. Growth Automated. Fast integrations that save time and close deals.
          </p>
        </div>

        {/* --- Immersive Telemetry Hero Banner --- */}
        <div className="relative w-full h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-800 mb-20 group">
          <img 
            src="/automations-hero.png" 
            alt="Enterprise Infrastructure & Telemetry" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Animated SVG Telemetry Pipes Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
            {/* Background Data Pipes */}
            <path d="M 0,200 Q 300,50 600,200 T 1200,200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <path d="M 0,300 Q 400,100 800,300 T 1200,100" stroke="#ff5f1f" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* TOP PIPE */}
            {Array.from({ length: packetCount }).map((_, i) => (
              <motion.circle
                key={`top-group-${packetCount}-${i}`}
                r={4.5 + (i % 2) * 2}
                fill={i === 0 ? "#ffffff" : "#38bdf8"}
                filter="drop-shadow(0px 0px 8px #ffffff)"
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{
                  duration: 3.2 + (i * 0.08),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.14
                }}
                style={{ offsetPath: "path('M 0,200 Q 300,50 600,200 T 1200,200')" }}
              />
            ))}

            {/* BOTTOM PIPE */}
            {Array.from({ length: packetCount }).map((_, i) => (
              <motion.circle
                key={`bottom-group-${packetCount}-${i}`}
                r={4 + (i % 3) * 1.5}
                fill={i === 0 ? "#ff5f1f" : "#ffffff"}
                filter="drop-shadow(0px 0px 8px #ff5f1f)"
                animate={{ offsetDistance: ["100%", "0%"] }}
                transition={{
                  duration: 3.4 + (i * 0.1),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6 + (i * 0.14)
                }}
                style={{ offsetPath: "path('M 0,300 Q 400,100 800,300 T 1200,100')" }}
              />
            ))}
          </svg>

          {/* Banner Text Content */}
          <div className="absolute bottom-8 left-8 right-8 text-left z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                Active Telemetry & Sync ({packetCount} {packetCount === 1 ? 'Cluster' : 'Clusters'})
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
                Real-Time Data Orchestration
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl backdrop-blur-md">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider">Pipelines Online</span>
            </div>
          </div>
        </div>

        {/* --- Make.com / API Architecture Highlight --- */}
        <div className="w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-white">The Make.com Advantage</h3>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              We leverage <strong className="text-white">Make.com</strong> as the central nervous system for our automation stacks. Unlike rigid, out-of-the-box software, Make allows us to visually construct complex, multi-step API integrations that map perfectly to your unique business logic.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm border-l-2 border-purple-500 pl-4 bg-purple-500/5 p-4 rounded-r-lg">
              <strong className="text-purple-400 block mb-1">Unmatched Speed & Response</strong>
              By intercepting webhooks and pushing raw data payloads instantly across your CRM, dispatch software, and communication tools, we guarantee that your leads are contacted, logged, and evaluated within seconds—drastically improving conversion rates and saving your team hundreds of manual hours.
            </p>
          </div>

          <div className="bg-[#020617] rounded-2xl border border-slate-800 p-6 shadow-inner flex flex-col justify-center gap-4 relative overflow-hidden h-full min-h-[250px]">
            {/* Abstract background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between w-full relative z-10 px-4">
              
              {/* Node 1: Webhook In */}
              <div className="w-14 h-14 bg-slate-800 rounded-full border-2 border-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] z-20 relative bg-slate-900">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              </div>
              
              {/* Line 1: Webhook -> Logic (Framer Motion Packets) */}
              <div className="flex-1 h-1 mx-[-2px] relative bg-slate-800 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50"></div>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`line1-${i}`}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full z-10"
                    style={{ boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.8)" }}
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      repeatDelay: 1.5,
                      ease: "linear",
                      delay: i * 0.15 // cluster spacing
                    }}
                  />
                ))}
              </div>
              
              {/* Node 2: Make Logic */}
              <motion.div 
                className="w-14 h-14 bg-slate-900 rounded-full border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] z-20 relative"
                animate={{ 
                  boxShadow: ["0 0 15px rgba(59,130,246,0.4)", "0 0 30px rgba(59,130,246,0.8)", "0 0 15px rgba(59,130,246,0.4)"],
                  borderColor: ["rgba(59,130,246,1)", "rgba(147,197,253,1)", "rgba(59,130,246,1)"]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} // Pulses as the packets cross it
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </motion.div>
              
              {/* Line 2: Logic -> API Out (Cascading Framer Motion Packets) */}
              <div className="flex-1 h-1 mx-[-2px] relative bg-slate-800 pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-50"></div>
                 {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`line2-${i}`}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full z-10"
                    style={{ boxShadow: "0 0 8px 2px rgba(16, 185, 129, 0.8)" }}
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      repeatDelay: 1.5,
                      ease: "linear",
                      delay: 1 + (i * 0.15) // Wait 1s for Line 1 to finish, then cascade
                    }}
                  />
                ))}
              </div>
              
              {/* Node 3: API Out */}
              <div className="w-14 h-14 bg-slate-900 rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] z-20 relative">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            
            <div className="flex justify-between w-full px-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span className="w-16 text-center">Webhook In</span>
              <span className="w-16 text-center text-blue-400">Make Logic</span>
              <span className="w-16 text-center">API Out</span>
            </div>
          </div>
        </div>
        {/* ------------------------------------------- */}

        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-2">Pre-Engineered Workflows</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">Click any module to map its logical execution sequence.</p>
        </div>

        {/* Automation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <AnimatePresence>
            {automations.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`card-${item.id}`}
                onClick={() => setSelectedWorkflow(item)}
                className="bg-slate-900 border border-slate-800 hover:border-brand-orange/50 rounded-2xl p-8 cursor-pointer flex flex-col items-center text-center group transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(255,95,31,0.15)] relative overflow-hidden"
              >
                <div className="w-14 h-14 bg-slate-950 border border-slate-800 text-brand-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {item.icon}
                </div>
                <motion.h3 layoutId={`title-${item.id}`} className="text-xl font-bold mb-3 relative z-10">
                  {item.title}
                </motion.h3>
                <motion.p layoutId={`desc-${item.id}`} className="text-sm text-slate-400 leading-relaxed relative z-10">
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- Next Page Runway CTA (Case Studies) --- */}
        <div className="w-full mt-24 mb-8 relative z-10">
          <Link 
            to="/portfolio" 
            className="block w-full group relative p-1 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 shadow-2xl"
          >
            {/* Glowing Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            
            {/* Inner Content Card */}
            <div className="relative bg-[#020617] rounded-[1.35rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">
                  See It In Action
                </h3>
                <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-amber-500 transition-all duration-500">
                  Explore Case Studies.
                </h2>
              </div>
              
              {/* Arrow Button */}
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-[#020617] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,95,31,0.5)] shrink-0">
                <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>

      {/* --- Workflow Mapping Modal --- */}
      <AnimatePresence>
        {selectedWorkflow && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 md:p-6 pt-28 md:pt-32">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedWorkflow(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              layoutId={`card-${selectedWorkflow.id}`}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl overflow-y-auto max-h-[calc(100vh-140px)] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col cursor-default"
            >
              {/* Modal Header */}
              <div className="w-full p-6 border-b border-slate-800 bg-[#020617] flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange rounded-lg flex items-center justify-center">
                    {selectedWorkflow.icon}
                  </div>
                  <motion.h3 layoutId={`title-${selectedWorkflow.id}`} className="text-xl md:text-2xl font-black text-white">
                    {selectedWorkflow.title}
                  </motion.h3>
                </div>
                <button 
                  onClick={() => setSelectedWorkflow(null)}
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
                    <h4 className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-2">Workflow Context</h4>
                    <motion.p layoutId={`desc-${selectedWorkflow.id}`} className="text-slate-300 leading-relaxed text-sm">
                      {selectedWorkflow.desc}
                    </motion.p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-800">
                    <button 
                      onClick={() => {
                        setFormData({ ...formData, message: `System Inquiry: Requesting deployment protocols for the ${selectedWorkflow.title} engine.` });
                        setIsContactModalOpen(true);
                      }}
                      className="w-full bg-brand-orange hover:bg-white text-white hover:text-brand-orange py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300 shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                    >
                      Deploy This Engine
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
                      <span className="text-slate-200 text-sm">{selectedWorkflow.trigger}</span>
                    </motion.div>

                    {/* Action Nodes */}
                    <div className="flex flex-col gap-2 pl-6 border-l-2 border-slate-800 ml-4 py-2">
                      {selectedWorkflow.actions.map((action, i) => (
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
                      <span className="text-slate-100 text-sm font-bold">{selectedWorkflow.outcome}</span>
                    </motion.div>
                    
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Global Communication Modal --- */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pt-20">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
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
                  onClick={() => setIsContactModalOpen(false)}
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