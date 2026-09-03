import React, { useState, useRef, useEffect } from 'react';

interface AnalysisOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  imageUrl?: string | null;
}

const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isXHovered, setIsXHovered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: "Senior Diagnostic Architect online. I am reviewing pest data for Northeast Florida properties. Upload a photo or describe the threat, and I will cross-reference local databases to confirm the species."
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSearching]);

  if (!isOpen) return null;

  const quickQuestions = [
    "ARE PALMETTO BUGS DANGEROUS?",
    "SIGNS OF TERMITES IN JACKSONVILLE?",
    "BEST WAY TO STOP FIRE ANTS?",
    "SAFE PEST CONTROL FOR PETS?"
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

  const handleSend = async () => {
    if (!inputValue.trim() && !selectedImage) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      imageUrl: selectedImage
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    
    const currentInput = inputValue;
    const currentFile = selectedFile;

    setInputValue('');
    setSelectedImage(null);
    setSelectedFile(null);
    setIsXHovered(false);
    setIsSearching(true);

    try {
      let fileData = null;
      let mimeType = null;

      // This logic perfectly converts your image to Base64 for the future API
      if (currentFile) {
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(currentFile);
        });

        fileData = base64Data.split(',')[1];
        mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0];
      }

      // --- MOCK API CALL FOR UI TESTING ---
      // Simulating a 3-second network request to an AI model
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulating the exact text structure needed to trigger your UI card
      const data = {
        text: `Based on the visual analysis of the uploaded image and cross-referencing with Northeast Florida pest databases, I have identified the threat.\n\nDUVAL HUB REPORT\nPRIORITY: HIGH STATUS\nPEST SPECIES: Reticulitermes flavipes (Eastern Subterranean Termite)\nSTRUCTURAL RISK: 8.5/10\nASSIGNED HUB: Jax Beach Outpost\nTARGET AREA: Duval County`
      };
      // -------------------------------------

      let responseText = data.text || "Diagnostic review complete, but no text was returned.";

      const dispatchMessage = "\n\nOur Duval/Beaches dispatch team is currently optimizing routes for your area; we will contact you shortly with the next available window. For further assistance, you can reach our local hub at 904-249-6994.\n\n";

      if (responseText.includes('DUVAL HUB REPORT')) {
        responseText = responseText.replace('DUVAL HUB REPORT', dispatchMessage + 'DUVAL HUB REPORT');
      } else {
        responseText += dispatchMessage;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText
      }]);

    } catch (error: any) {
      console.error("AI Error Details:", error);
      let errorMessage = "Error: Communication with Duval Hub intercepted. Check the console for routing failures.";
      const message = (error?.message || "").toLowerCase();
      const status = error?.status || error?.error?.code;
      
      if (status === 429 || message.includes('429') || message.includes('quota')) {
         errorMessage = "RESOURCE_EXHAUSTED: The Duval Hub Architect is currently at capacity. Please call **904-249-6994** to reach a technician directly.";
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        text: errorMessage
      }]);
    } finally {
      setIsSearching(false);
    }
  };

  const renderMessageText = (text: string) => {
    const reportIndex = text.indexOf('DUVAL HUB REPORT');
    let mainContent = text;
    let reportData = null;

    if (reportIndex !== -1) {
      mainContent = text.substring(0, reportIndex).replace(/###/g, '').trim();
      const reportText = text.substring(reportIndex);

      const extract = (label: string) => {
        const regex = new RegExp(`${label}:\\s*([^\\n]+)`, 'i');
        const match = reportText.match(regex);
        return match ? match[1].replace(/\*/g, '').trim() : 'N/A';
      };

      const rawRisk = extract('STRUCTURAL RISK');
      const riskNumberMatch = rawRisk.match(/([\d.]+)/);
      const riskNum = riskNumberMatch ? parseFloat(riskNumberMatch[1]) : 0;

      reportData = {
        priority: extract('PRIORITY').split(' ')[0], 
        species: extract('PEST SPECIES'),
        riskNum,
        hub: extract('ASSIGNED HUB'),
        area: extract('TARGET AREA')
      };
    }

    const formattedMain = mainContent.split(/(904-249-6994)/g).map((part, i) => {
      if (part === '904-249-6994') {
        return (
          <a key={i} href="tel:904-249-6994" className="bg-[#CCFF00] text-[#020617] font-black px-2 py-0.5 rounded-md inline-block hover:scale-105 transition-transform mx-1 no-underline">
            {part}
          </a>
        );
      }
      return (
        <span key={i}>
          {part.split(/(\*\*.*?\*\*)/g).map((subPart, j) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
              return <strong key={j} className="font-black text-[#020617]">{subPart.slice(2, -2)}</strong>;
            }
            return <span key={j}>{subPart}</span>;
          })}
        </span>
      );
    });

    return (
      <div className="flex flex-col gap-5">
        <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
          {formattedMain}
        </div>

        {reportData && (
          <div className="bg-[#020617] rounded-xl overflow-hidden shadow-xl border border-white/10 flex flex-col mt-2">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-white/5">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">
                Duval Hub Report
              </span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] text-[9px] font-black uppercase tracking-widest">
                  {reportData.priority} STATUS
                </span>
              </div>
            </div>

            <div className="p-5 grid grid-cols-2 gap-y-5 gap-x-6">
              <div>
                <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1.5">Pest Species</div>
                <div className="text-white text-xs font-bold uppercase line-clamp-2" title={reportData.species}>{reportData.species}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1.5">Structural Risk</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#CCFF00] transition-all duration-1000" style={{ width: `${(reportData.riskNum / 10) * 100}%` }} />
                  </div>
                  <span className="text-[#CCFF00] text-[10px] font-black">{reportData.riskNum}/10</span>
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1.5">Assigned Hub</div>
                <div className="text-white text-xs font-bold uppercase truncate">{reportData.hub}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1.5">Target Area</div>
                <div className="text-white text-xs font-bold uppercase truncate">{reportData.area}</div>
              </div>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="w-full bg-[#CCFF00] hover:bg-lime-400 text-[#020617] font-black text-[11px] tracking-widest uppercase py-4 transition-colors flex justify-center border-t border-[#CCFF00]/20"
            >
              Sync to Duval Dispatch
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-md bg-slate-50 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[650px] max-h-[90vh] animate-in fade-in zoom-in-95 duration-300 border border-white/10">
        
        <div className="bg-[#020617] px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-[#CCFF00]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-black text-base uppercase tracking-wider leading-none mb-1">
                Duval Hub
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse shadow-[0_0_8px_#CCFF00]" />
                <span className="text-[#CCFF00] text-[8px] font-black uppercase tracking-widest">
                  Protocol Active
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`w-full md:max-w-[90%] rounded-3xl p-5 ${
                msg.role === 'user' 
                  ? 'bg-[#020617] text-white rounded-tr-sm shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
              }`}>
                {msg.role === 'assistant' && (
                  <strong className="text-[#020617] font-black tracking-tight block mb-3 text-xs uppercase tracking-widest">
                    ONE SOURCE DUVAL HUB
                  </strong>
                )}
                
                {msg.imageUrl && (
                  <img src={msg.imageUrl} alt="User Upload" className="w-full rounded-xl mb-4 max-h-48 object-cover border border-white/20" />
                )}
                
                {msg.role === 'assistant' ? renderMessageText(msg.text) : (
                  <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                )}
              </div>
            </div>
          ))}

          {isSearching && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-3xl rounded-tl-sm p-4 shadow-sm flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest opacity-70">
                  Analyzing...
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
                  className="bg-white border border-slate-200 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-[#CCFF00] hover:text-[#020617] hover:shadow-md transition-all text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex flex-col">
          {selectedImage && (
            <div className="mb-3 relative w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-[#020617] rounded-2xl p-2 shadow-xl border border-white/10 w-full flex items-center gap-3">
                
                <div className="relative rounded-lg overflow-hidden h-14 w-14 bg-slate-800 shrink-0 border border-white/20">
                  <img src={selectedImage} alt="Upload preview" className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-[#020617]/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isXHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="bg-[#020617] w-2 h-2 rounded-full"></span>
                  </div>
                </div>

                <div className="flex-1">
                  <span className="text-[#CCFF00] text-[9px] font-black uppercase tracking-widest block mb-0.5">
                    Image Attached
                  </span>
                  <span className="text-slate-400 text-xs">Ready for analysis</span>
                </div>

                <button
                  onClick={handleRemoveImage}
                  onMouseEnter={() => setIsXHovered(true)}
                  onMouseLeave={() => setIsXHovered(false)}
                  className="bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-500 rounded-full p-2 transition-colors mr-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <button onClick={handleCameraClick} disabled={isSearching} className="p-3 text-slate-400 hover:text-[#020617] transition-colors bg-slate-50 rounded-xl border border-slate-200 shadow-sm disabled:opacity-50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </button>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Diagnostics..."
              className="flex-1 bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50"
              disabled={isSearching}
            />
            <button 
              onClick={handleSend}
              disabled={isSearching}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors group shadow-md shrink-0 ${isSearching ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-600 hover:bg-[#020617]'}`}
            >
              <svg className={`w-5 h-5 text-[#CCFF00] transition-all ${isSearching ? '' : 'group-hover:scale-110 group-hover:-translate-y-0.5'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisOverlay;