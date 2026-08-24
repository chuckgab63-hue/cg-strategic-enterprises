import React, { useState } from 'react';
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

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white pb-32">
      
      {/* Background Wireframe Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 z-0"></div>

      <div className="pt-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Navigation */}
        <div className="w-full flex justify-center mb-10">
          <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold inline-flex items-center gap-2 tracking-widest uppercase text-sm">
            &larr; BACK TO HUB
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          System <span className="text-brand-orange">Automations.</span>
        </h1>
        
        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-16">
          Efficiency Engineered. Growth Automated. Click any module to map its logical workflow and evaluate deployment requirements.
        </p>

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
                    <button className="w-full bg-brand-orange hover:bg-white text-white hover:text-brand-orange py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition-colors duration-300 shadow-[0_0_20px_rgba(255,95,31,0.3)]">
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

    </div>
  );
}