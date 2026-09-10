import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export default function ContactModal({ isOpen, onClose, initialMessage = '' }: ContactModalProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [callText, setCallText] = useState('Initiate Call');

  // Pre-fill the message if the user clicked a specific workflow button
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [isOpen, initialMessage]);

  // Reset the "Coming Soon" button when the modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCallText('Initiate Call'), 300);
    }
  }, [isOpen]);

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
        onClose();
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pt-20 text-left">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
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
                <h3 className="text-2xl font-black text-white">Let's Connect</h3>
                <p className="text-slate-400 text-sm mt-1">Choose how you'd like to reach us.</p>
              </div>
              <button 
                onClick={onClose}
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
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setCallText('Coming Soon');
                  }}
                  className="w-full bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {callText}
                </button>
              </div>

              {/* Option 2: Webhook Form */}
              <div className="flex-[1.2] w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shrink-0">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
                   <h4 className="text-white font-bold text-lg">Direct Message</h4>
                </div>
                
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h5 className="text-emerald-400 font-bold mb-2">Message Sent</h5>
                    <p className="text-slate-400 text-sm">We've received your message and will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                      type="text" required placeholder="Your Name" 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
                    />
                    <input 
                      type="email" required placeholder="Email Address" 
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
                    />
                    <textarea 
                      required placeholder="How can we help you?" rows={4}
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors resize-none"
                    />
                    <button 
                      type="submit" disabled={formStatus === 'submitting'}
                      className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
                        formStatus === 'submitting' 
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600' 
                          : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent'
                      }`}
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}