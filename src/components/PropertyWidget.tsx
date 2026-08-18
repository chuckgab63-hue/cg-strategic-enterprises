import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  imageUrl?: string | null;
}

const PropertyWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isXHovered, setIsXHovered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: "Omni-Triage System Online. Are you submitting a maintenance request, logging site construction progress, or inquiring about a listing? Upload a photo or describe the request."
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isSearching]);

  const quickQuestions = [
    "LOG SITE PROGRESS",
    "REPORT MAINTENANCE",
    "SCHEDULE SHOWING"
  ];

  const handleCameraClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      e.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setIsXHovered(false);
  };

  const handleSend = () => {
    if (!inputValue.trim() && !selectedImage) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      imageUrl: selectedImage
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setSelectedImage(null);
    setSelectedFile(null);
    setIsXHovered(false);
    setIsSearching(true);

    // Simulated AI response for the portfolio demo
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "Image analysis complete. Categorized as: **Site Progress / Framing**. Extracting metadata and logging to the daily construction report. Dispatching update to project manager."
      }]);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-slate-50 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col h-[650px] border border-white/10">
      
      {/* Header */}
      <div className="bg-[#020617] px-6 py-5 flex items-center justify-between shrink-0 border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="text-blue-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-black text-base uppercase tracking-wider leading-none mb-1">
              Omni-Triage Hub
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
              <span className="text-blue-400 text-[8px] font-black uppercase tracking-widest">
                AI Routing Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6" ref={scrollContainerRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`w-full md:max-w-[90%] rounded-3xl p-5 ${
              msg.role === 'user' 
                ? 'bg-[#020617] text-white rounded-tr-sm shadow-md' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
            }`}>
              {msg.role === 'assistant' && (
                <strong className="text-[#020617] font-black tracking-tight block mb-3 text-xs uppercase tracking-widest">
                  PROPERTY OPS AI
                </strong>
              )}
              
              {msg.imageUrl && (
                <img src={msg.imageUrl} alt="Upload" className="w-40 h-40 rounded-xl mb-3 object-cover border border-slate-200 shadow-sm" />
              )}
              
              <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                {msg.text.split(/(\*\*.*?\*\*)/g).map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={i} className="font-black text-blue-600">{part.slice(2, -2)}</strong> 
                    : <span key={i}>{part}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isSearching && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-3xl rounded-tl-sm p-4 shadow-sm flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-70">
                Classifying Intent...
              </span>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="grid grid-cols-1 gap-2 mt-2 animate-in fade-in duration-500">
            {quickQuestions.map((question, idx) => (
              <button 
                key={idx}
                onClick={() => setInputValue(question)}
                className="bg-white border border-slate-200 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-[#020617] hover:shadow-md transition-all text-left"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex flex-col">
        {selectedImage && (
          <div className="mb-3 relative w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-[#020617] rounded-2xl p-2 shadow-xl border border-white/10 w-full flex items-center gap-3">
              <div className="relative rounded-lg overflow-hidden h-14 w-14 bg-slate-800 shrink-0 border border-white/20">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest block mb-0.5">Asset Attached</span>
                <span className="text-slate-400 text-xs">Ready for triage</span>
              </div>
              <button onClick={handleRemoveImage} onMouseEnter={() => setIsXHovered(true)} onMouseLeave={() => setIsXHovered(false)} className="bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-500 rounded-full p-2 transition-colors mr-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <button onClick={handleCameraClick} disabled={isSearching} className="p-3 text-slate-400 hover:text-[#020617] transition-colors bg-slate-50 rounded-xl border border-slate-200 shadow-sm disabled:opacity-50">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
          </button>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Property request..."
            className="flex-1 bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50"
            disabled={isSearching}
          />
          <button onClick={handleSend} disabled={isSearching} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors group shadow-md shrink-0 ${isSearching ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-600 hover:bg-[#020617]'}`}>
            <svg className={`w-5 h-5 text-blue-400 transition-all ${isSearching ? '' : 'group-hover:scale-110 group-hover:-translate-y-0.5'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default PropertyWidget;