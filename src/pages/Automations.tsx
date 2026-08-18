import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const automationFeatures = [
  {
    icon: "🔄",
    title: "Omni-Channel Lead Capture",
    description: "Instantly catch leads from Facebook Ads, TikTok forms, your website, or Google Local Services, and funnel them into one unified database."
  },
  {
    icon: "💬",
    title: "Zero-Touch SMS Dispatch",
    description: "Trigger an immediate, personalized text message to a new lead within 10 seconds of form submission. Never lose a lead to a competitor again."
  },
  {
    icon: "🔌",
    title: "Cross-Industry CRM Syncing",
    description: "Push data directly into industry-specific CRMs like Follow Up Boss (Real Estate), Buildium (Property Management), or GorillaDesk (Home Services)."
  },
  {
    icon: "📄",
    title: "Dynamic Invoice Generation",
    description: "Auto-generate PDF invoices based on completed job statuses and email them directly to the client with a secure payment link."
  },
  {
    icon: "⭐",
    title: "Automated Review Requests",
    description: "Set a trigger that automatically sends a Google Review link via SMS 24 hours after a job is marked 'Completed' in your CRM."
  },
  {
    icon: "🤖",
    title: "AI Payload Processing",
    description: "Route incoming emails or messy form data through AI logic blocks to extract key entities (like square footage or pest type) before creating a ticket."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Automations() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center py-16 px-6 relative overflow-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:24px_32px] pointer-events-none"></div>
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-[#A855F7]/10 rounded-full blur-[120px] pointer-events-none"></div> {/* Make.com Purple Ambient */}

      <div className="max-w-6xl w-full z-10">
        
        {/* Navigation */}
        <Link to="/portfolio" className="text-slate-400 hover:text-[#A855F7] transition-colors font-bold mb-12 inline-flex items-center gap-2 uppercase tracking-widest text-sm">
          &larr; Back to Case Studies
        </Link>
        
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-900 border border-[#A855F7]/30 text-[#A855F7] text-xs font-bold uppercase tracking-widest rounded-full">
                Powered by Make.com
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              The Engine <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#D8B4FE]">Under The Hood.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Visual, node-based architecture allows us to connect thousands of apps, APIs, and CRMs. If your software has an endpoint, we can automate the workflow.
            </p>
          </motion.div>
        </header>

        {/* Dynamic Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {automationFeatures.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm hover:border-[#A855F7]/50 hover:bg-slate-900 transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 group-hover:border-[#A855F7]/50 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A855F7] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 p-1 bg-gradient-to-r from-brand-midnight via-[#A855F7]/30 to-brand-orange/30 rounded-3xl"
        >
          <div className="bg-slate-950 p-10 md:p-16 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Ready to map your workflow?</h2>
              <p className="text-slate-400">Let's audit your repetitive tasks and engineer an automated solution.</p>
            </div>
            <button className="shrink-0 bg-white text-slate-950 px-8 py-4 rounded-xl font-black tracking-widest uppercase hover:bg-[#A855F7] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              Schedule Audit
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}