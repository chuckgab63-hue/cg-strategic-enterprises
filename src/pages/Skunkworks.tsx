import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from '../components/ContactModal';

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

// --- Spatial Commerce Walkthrough Data ---
type RoomKey = 'livingRoom' | 'kitchen' | 'bedroom';
type StyleKey = 'source' | 'cleared' | 'midCentury' | 'industrial';

const roomData: Record<RoomKey, Record<StyleKey, string> & { name: string }> = {
  livingRoom: {
    name: "Living Room",
    source: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop", 
    cleared: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", 
    midCentury: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop", 
    industrial: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=1200&auto=format&fit=crop" 
  },
  kitchen: {
    name: "Kitchen",
    source: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    cleared: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    midCentury: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200&auto=format&fit=crop",
    industrial: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?q=80&w=1200&auto=format&fit=crop"
  },
  bedroom: {
    name: "Master Suite",
    source: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200&auto=format&fit=crop",
    cleared: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop",
    midCentury: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop",
    industrial: "https://images.unsplash.com/photo-1522771731535-648c39452b47?q=80&w=1200&auto=format&fit=crop"
  }
};

export default function Skunkworks() {
  const [selectedVoicebot, setSelectedVoicebot] = useState<typeof voicebots[0] | null>(null);
  
  // Modals specific to Contact
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  
  // Spatial Commerce Prototype States
  const [renderMode, setRenderMode] = useState<'2D' | '3D'>('2D');
  const [activeRoom, setActiveRoom] = useState<RoomKey>('livingRoom');
  const [activeStyle, setActiveStyle] = useState<StyleKey>('midCentury');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Product Hotspot State
  const [activeProduct, setActiveProduct] = useState<{title: string, price: string, store: string} | null>(null);

  // 2.5D Parallax Panning States
  const [zoom, setZoom] = useState(1.1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setZoom(1.1);
    setPan({ x: 0, y: 0 });
    setActiveProduct(null);
  }, [activeRoom, renderMode, isFullscreen, activeStyle]);

  useEffect(() => {
    if (isContactModalOpen || selectedVoicebot || isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isContactModalOpen, selectedVoicebot, isFullscreen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (renderMode !== '3D' || !isFullscreen) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || renderMode !== '3D' || !isFullscreen) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPan(prev => ({
      x: Math.max(-25, Math.min(25, prev.x + (dx * 0.05))),
      y: Math.max(-25, Math.min(25, prev.y + (dy * 0.05)))
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // --- Extracted Viewer Content ---
  const viewerContent = (
    <div 
      className={`relative w-full overflow-hidden shadow-2xl group/stage bg-slate-900 border border-slate-700 transition-all duration-500 select-none ${isFullscreen ? 'max-w-7xl h-[75vh] md:h-[80vh] rounded-2xl' : 'aspect-video rounded-2xl'} ${renderMode === '3D' && isFullscreen ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      
      {/* Dynamic Image Layer */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: renderMode === '3D' && isFullscreen ? `scale(${zoom}) translate(${pan.x}%, ${pan.y}%)` : 'scale(1) translate(0%, 0%)',
          transition: renderMode === '3D' && !isDragging && isFullscreen ? 'transform 0.3s ease-out' : (renderMode === '2D' ? 'transform 0.8s ease-in-out' : 'none')
        }}
      >
        <img 
          key={activeRoom + renderMode + activeStyle}
          src={renderMode === '3D' ? roomData[activeRoom][activeStyle] : roomData[activeRoom].source}
          alt="Virtual Staging Engine"
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out pointer-events-none ${renderMode === '3D' ? 'opacity-100' : 'opacity-90'}`}
        />

        {/* Shoppable Hotspot (Only visible in 3D Staged Modes) */}
        <AnimatePresence>
          {renderMode === '3D' && activeStyle !== 'cleared' && activeRoom === 'livingRoom' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
              className="absolute top-[55%] left-[45%] z-30 pointer-events-auto"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              <div 
                onClick={(e) => { e.stopPropagation(); setActiveProduct({ title: "Moda Sectional Sofa", price: "$2,499.00", store: "West Elm API" }); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center cursor-pointer hover:bg-brand-orange/50 transition-colors group shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                <div className="w-2 h-2 bg-white rounded-full group-hover:bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"></div>
              </div>

              {/* Product Card Pop-up */}
              {activeProduct && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute top-10 -left-20 w-48 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl p-3 shadow-2xl flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">{activeProduct.store}</span>
                    <button onClick={(e) => { e.stopPropagation(); setActiveProduct(null); }} className="text-slate-400 hover:text-white"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </div>
                  <p className="text-white font-bold text-sm leading-tight">{activeProduct.title}</p>
                  <p className="text-emerald-400 font-bold text-xs">{activeProduct.price}</p>
                  <button onClick={(e) => e.stopPropagation()} className="w-full mt-1 bg-white text-slate-900 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors">Buy Now</button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Overlay Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] pointer-events-none transition-all duration-500 ${renderMode === '3D' ? 'bg-[size:16px_16px] opacity-20' : 'bg-[size:32px_32px] opacity-40'}`}></div>

      {/* --- AI ARCHITECT TOOLBAR (Only in 3D Mode) --- */}
      <AnimatePresence>
        {renderMode === '3D' && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 flex flex-col gap-2 shadow-2xl z-30 pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="px-2 py-3 border-b border-slate-800 mb-1 text-center">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">AI Restage</span>
            </div>
            
            <button onClick={() => setActiveStyle('source')} className={`p-3 rounded-xl flex items-center justify-center transition-all ${activeStyle === 'source' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`} title="Original Room">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </button>
            <button onClick={() => setActiveStyle('cleared')} className={`p-3 rounded-xl flex items-center justify-center transition-all ${activeStyle === 'cleared' ? 'bg-brand-orange text-white shadow-[0_0_15px_rgba(255,95,31,0.5)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`} title="Clear Room (Inpainting)">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            <div className="w-full h-px bg-slate-800 my-1"></div>
            <button onClick={() => setActiveStyle('midCentury')} className={`p-3 rounded-xl flex items-center justify-center transition-all ${activeStyle === 'midCentury' ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`} title="Mid-Century Modern">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </button>
            <button onClick={() => setActiveStyle('industrial')} className={`p-3 rounded-xl flex items-center justify-center transition-all ${activeStyle === 'industrial' ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`} title="Industrial Loft">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Room Label (Top Left) - ONLY IN FULLSCREEN */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute top-6 left-8 drop-shadow-md z-20 pointer-events-none ml-20"
          >
            <h3 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }} className="text-white font-black text-2xl md:text-3xl tracking-tight">
              {roomData[activeRoom].name}
            </h3>
            <p className="text-slate-300 font-bold uppercase tracking-widest text-xs mt-1 drop-shadow-lg">
              Style: {activeStyle === 'source' ? 'Original' : activeStyle === 'cleared' ? 'Cleared' : activeStyle === 'midCentury' ? 'Mid-Century' : 'Industrial'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand Fullscreen Icon (Bottom Left) */}
      {!isFullscreen && (
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bottom-6 left-6 w-10 h-10 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer shadow-lg z-20"
          title="Enter Fullscreen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
        </button>
      )}

      {/* --- 3D WALKTHROUGH NAVIGATION --- */}
      <AnimatePresence>
        {renderMode === '3D' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            {activeRoom === 'livingRoom' && (
              <div onClick={(e) => { e.stopPropagation(); setActiveRoom('kitchen'); }} onPointerDown={(e) => e.stopPropagation()} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-80 hover:opacity-100 cursor-pointer transition-all hover:scale-110 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-auto z-30">
                <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} className="text-white font-bold text-sm mb-1 tracking-widest uppercase">Walk to Kitchen</span>
                <div className="w-16 h-6 bg-white/20 backdrop-blur-md rounded-[100%] flex items-center justify-center border border-white/40 hover:bg-brand-orange/50 transition-colors shadow-inner"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path></svg></div>
              </div>
            )}
            
            {(activeRoom === 'kitchen' || activeRoom === 'bedroom') && (
              <div onClick={(e) => { e.stopPropagation(); setActiveRoom('livingRoom'); }} onPointerDown={(e) => e.stopPropagation()} className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 cursor-pointer transition-all hover:scale-110 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-auto z-30">
                <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} className="text-white font-bold text-sm mb-1 tracking-widest uppercase">Back to Living Room</span>
                <div className="w-16 h-6 bg-white/20 backdrop-blur-md rounded-[100%] flex items-center justify-center border border-white/40 hover:bg-brand-orange/50 transition-colors shadow-inner"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg></div>
              </div>
            )}

            {isFullscreen && (
              <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full px-4 py-2 flex items-center gap-4 shadow-lg pointer-events-auto z-30" onPointerDown={(e) => e.stopPropagation()}>
                 <button onClick={(e) => { e.stopPropagation(); setZoom(Math.max(1.0, zoom - 0.2)); }} className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
                 <div className="w-24 h-1 bg-slate-700 rounded-full relative"><div className="absolute top-0 left-0 h-full bg-brand-orange rounded-full transition-all duration-200" style={{ width: `${((zoom - 1.0) / 1.5) * 100}%` }}></div></div>
                 <button onClick={(e) => { e.stopPropagation(); setZoom(Math.min(2.5, zoom + 0.2)); }} className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
              </div>
            )}

            {isFullscreen && (
              <div className="absolute right-4 top-4 bg-slate-950/80 backdrop-blur-xl border border-slate-700 rounded-xl p-4 w-48 shadow-2xl hidden md:block pointer-events-auto z-30" onPointerDown={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Floor 1</span>
                </div>
                <div className="relative w-full h-32 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center p-2 shadow-inner">
                  <div className="w-16 h-24 border-2 border-slate-600 relative rounded-sm">
                     <div className="absolute top-10 left-0 right-0 border-t-2 border-slate-600"></div>
                     <div className="absolute top-0 bottom-0 left-8 border-l-2 border-slate-600"></div>
                     <div onClick={(e) => { e.stopPropagation(); setActiveRoom('livingRoom'); }} className={`absolute top-14 left-2 w-3.5 h-3.5 rounded-full cursor-pointer hover:scale-125 transition-all duration-300 ${activeRoom === 'livingRoom' ? 'bg-brand-orange shadow-[0_0_12px_rgba(255,95,31,1)] ring-2 ring-white z-40' : 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)] z-30'}`} title="Living Room"></div>
                     <div onClick={(e) => { e.stopPropagation(); setActiveRoom('kitchen'); }} className={`absolute top-4 left-3 w-3.5 h-3.5 rounded-full cursor-pointer hover:scale-125 transition-all duration-300 ${activeRoom === 'kitchen' ? 'bg-brand-orange shadow-[0_0_12px_rgba(255,95,31,1)] ring-2 ring-white z-40' : 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)] z-30'}`} title="Kitchen"></div>
                     <div onClick={(e) => { e.stopPropagation(); setActiveRoom('bedroom'); }} className={`absolute top-16 left-11 w-3.5 h-3.5 rounded-full cursor-pointer hover:scale-125 transition-all duration-300 ${activeRoom === 'bedroom' ? 'bg-brand-orange shadow-[0_0_12px_rgba(255,95,31,1)] ring-2 ring-white z-40' : 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)] z-30'}`} title="Master Suite"></div>
                  </div>
                </div>
                <p className="text-[9px] text-slate-400 mt-3 text-center leading-tight">Jump to panorama by tapping a blue dot.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
                setContactMessage(`Skunkworks Inquiry: Let's discuss deploying the Voicebot Architecture for my business.`);
                setIsContactModalOpen(true);
              }}
              className="bg-blue-600/20 border border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
            >
              Discuss Deployment
            </button>
          </div>
        </motion.div>

        {/* Project 2: Spatial Commerce & AI Restaging */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="bg-[#020617]/80 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-brand-orange/10"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Spatial Commerce & AI Restaging</h2>
              <p className="text-slate-400 font-light">Interactive virtual environments wired to retail APIs and generative models.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Classified // Initializing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-start">
            <div className="space-y-6 text-slate-400 leading-relaxed text-sm">
               <p>
                 <strong className="text-white">Beyond the Read-Only Panorama:</strong> Legacy tools like Zillow 3D Home provide static, read-only tours. We are engineering interactive spatial commerce. Instead of a dead photo, our engine allows users to interact with the environment in real-time.
               </p>
               <p>
                 <strong className="text-white">Generative Clearing & Restyling:</strong> Using Serverless GPUs running Segment Anything (SAM 2) and Stable Diffusion XL, users can instantly "Clear the Room" of existing clutter via AI inpainting, and then drop in completely new design sets (Mid-Century, Industrial) that respect the original room geometry.
               </p>
               <p>
                 <strong className="text-white">Shoppable Real Estate:</strong> Bounding boxes generated by the AI are mapped to multimodal embeddings, querying live retail feeds. Buyers can click a generated sofa during a tour and instantly buy the physical counterpart via an affiliate link. Initialize the engine and click the couch below to test the payload.
               </p>
            </div>

            {/* Inline Viewer Canvas (Rendered here when NOT fullscreen) */}
            {!isFullscreen && (
              <div className="w-full flex flex-col relative z-10">
                {viewerContent}
                
                {/* 2D / 3D Toggle Controller */}
                <div className="flex justify-center mt-6 w-full shrink-0">
                  <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full p-1.5 flex shadow-2xl transition-all">
                    <button 
                      onClick={() => { setRenderMode('2D'); setActiveStyle('source'); }}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${renderMode === '2D' ? 'bg-slate-700 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                    >
                      Source 2D
                    </button>
                    <button 
                      onClick={() => setRenderMode('3D')}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${renderMode === '3D' ? 'bg-brand-orange text-white shadow-[0_0_15px_rgba(255,95,31,0.4)]' : 'text-slate-400 hover:text-white'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                      Initialize 3D Engine
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </motion.div>

      </div>

      {/* --- Fullscreen Spatial Viewer Portal (Escapes all Stacking Contexts) --- */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isFullscreen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-[#020617]/95 backdrop-blur-xl p-4 md:p-12 flex flex-col items-center justify-center"
            >
              {/* Fullscreen Header */}
              <div className="w-full max-w-7xl flex justify-between items-center mb-6 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-brand-orange rounded-full animate-pulse shadow-[0_0_15px_rgba(255,95,31,0.8)]"></div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-xl">Interactive Spatial Viewer</h3>
                </div>
                <button 
                  onClick={() => setIsFullscreen(false)} 
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full font-bold tracking-widest uppercase text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer z-20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Close Tour (Esc)
                </button>
              </div>

              {/* Render the extracted Viewer Component */}
              <div className="w-full max-w-7xl relative flex flex-col">
                 {viewerContent}
                 
                 {/* 2D / 3D Toggle Controller for Fullscreen */}
                 <div className="flex justify-center mt-6 w-full shrink-0 z-20">
                   <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full p-1.5 flex shadow-2xl transition-all">
                     <button 
                       onClick={() => { setRenderMode('2D'); setActiveStyle('source'); }}
                       className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${renderMode === '2D' ? 'bg-slate-700 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                     >
                       Source 2D
                     </button>
                     <button 
                       onClick={() => setRenderMode('3D')}
                       className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${renderMode === '3D' ? 'bg-brand-orange text-white shadow-[0_0_15px_rgba(255,95,31,0.4)]' : 'text-slate-400 hover:text-white'}`}
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                       Initialize 3D Engine
                     </button>
                   </div>
                 </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

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
                        setContactMessage(`System Inquiry: Requesting architecture specs for the ${selectedVoicebot.title} voicebot.`);
                        setSelectedVoicebot(null);
                        setTimeout(() => setIsContactModalOpen(true), 300); // Wait for card to close before opening comms
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

      {/* --- Global Communication Modal --- */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        initialMessage={contactMessage} 
        source="Skunkworks Page"
      />
    </div>
  );
}