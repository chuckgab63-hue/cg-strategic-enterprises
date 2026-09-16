import React, { useState, useRef, useEffect } from 'react';
import { SITE_PROGRESS_WEBHOOK_URL } from '../config/webhooks';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  imageUrl?: string | null;
}

type Mode = 'idle' | 'log-progress' | 'coming-soon';

const PropertyWidget: React.FC = () => {
  const [mode, setMode] = useState<Mode>('idle');
  const [comingSoonLabel, setComingSoonLabel] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [siteLocation, setSiteLocation] = useState('');
  const [crewNumber, setCrewNumber] = useState('');
  const [comment, setComment] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: 'Property Ops Hub online. Choose an action below to get started.'
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
  }, [messages, isSubmitting]);

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
  };

  const resetToIdle = () => {
    setMode('idle');
    setSiteLocation('');
    setCrewNumber('');
    setComment('');
    setSelectedImage(null);
    setSelectedFile(null);
  };

  const selectComingSoon = (label: string) => {
    setComingSoonLabel(label);
    setMode('coming-soon');
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      text: `${label} is still being built for this demo. "Log Site Progress" is fully working \u2014 try that one.`
    }]);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const MAX_DIMENSION = 1600;
        let { width, height } = img;
        if (width > height && width > MAX_DIMENSION) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Canvas not supported'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load image'));
      };
      img.src = objectUrl;
    });
  };

  const handleSubmitProgress = async () => {
    if (!selectedFile || !siteLocation.trim() || !crewNumber.trim() || !clientEmail.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: comment.trim() ? `Site: ${siteLocation} \u00b7 Crew #${crewNumber}\n${comment}` : `Site: ${siteLocation} \u00b7 Crew #${crewNumber}`,
      imageUrl: selectedImage
    }]);

    try {
      const base64Data = await compressImage(selectedFile);
      const fileData = base64Data.split(',')[1];
      const mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0];

      const response = await fetch(SITE_PROGRESS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteLocation, crewNumber, comment, clientEmail, fileData, mimeType }),
      });

      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);

      const data = await response.json().catch(() => ({}));

      if (data.limitReached) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: "You've reached today's usage limit for this demo (10 submissions). Check your email for details, or reach out to CG Strategic Enterprises directly to discuss your own embedded version."
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: "Logged. The photo is saved to the shared Drive folder, and this entry will roll up into tonight's digest email."
        }]);
      }
      resetToIdle();
    } catch (error) {
      console.error('Site progress upload failed:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Something went wrong uploading that \u2014 please try again.'
      }]);
    } finally {
      setIsSubmitting(false);
    }
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
              Property Ops Hub
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
              <span className="text-blue-400 text-[8px] font-black uppercase tracking-widest">
                Live Demo
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

        {isSubmitting && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-slate-100 border border-slate-200 text-slate-500 rounded-3xl rounded-tl-sm p-4 shadow-sm flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-70">
                Uploading...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Control Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex flex-col gap-3">

        {mode === 'idle' && (
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setMode('log-progress')}
              className="bg-white border border-slate-200 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-[#020617] hover:shadow-md transition-all text-left"
            >
              Log Site Progress
            </button>
            <button
              onClick={() => selectComingSoon('Report Maintenance')}
              className="bg-white border border-slate-200 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-[#020617] hover:shadow-md transition-all text-left"
            >
              Report Maintenance
            </button>
            <button
              onClick={() => selectComingSoon('Schedule Showing')}
              className="bg-white border border-slate-200 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-[#020617] hover:shadow-md transition-all text-left"
            >
              Schedule Showing
            </button>
          </div>
        )}

        {mode === 'coming-soon' && (
          <button
            onClick={resetToIdle}
            className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#020617] transition-colors self-start"
          >
            &larr; Back to menu ({comingSoonLabel})
          </button>
        )}

        {mode === 'log-progress' && (
          <>
            {selectedImage && (
              <div className="relative w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-[#020617] rounded-2xl p-2 shadow-xl border border-white/10 w-full flex items-center gap-3">
                  <div className="relative rounded-lg overflow-hidden h-14 w-14 bg-slate-800 shrink-0 border border-white/20">
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest block mb-0.5">Photo attached</span>
                    <span className="text-slate-400 text-xs">Ready to log</span>
                  </div>
                  <button onClick={handleRemoveImage} aria-label="Remove attached photo" className="bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-500 rounded-full p-2 transition-colors mr-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            )}

            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Your email"
              disabled={isSubmitting}
              className="bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50 w-full"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                placeholder="Site location"
                disabled={isSubmitting}
                className="bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50"
              />
              <input
                type="text"
                value={crewNumber}
                onChange={(e) => setCrewNumber(e.target.value)}
                placeholder="Crew #"
                disabled={isSubmitting}
                className="bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50"
              />
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment (optional)"
              disabled={isSubmitting}
              rows={2}
              className="bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50 resize-none"
            />

            <div className="flex items-center gap-2">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <button onClick={handleCameraClick} disabled={isSubmitting} aria-label="Upload a photo" className="p-3 text-slate-400 hover:text-[#020617] transition-colors bg-slate-50 rounded-xl border border-slate-200 shadow-sm disabled:opacity-50 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
              </button>
              <button
                onClick={handleSubmitProgress}
                disabled={isSubmitting || !selectedFile || !siteLocation.trim() || !crewNumber.trim() || !clientEmail.trim()}
                className={`flex-1 h-12 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${
                  isSubmitting || !selectedFile || !siteLocation.trim() || !crewNumber.trim() || !clientEmail.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#020617] text-blue-400 hover:bg-slate-800 cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Uploading...' : 'Submit Progress'}
              </button>
            </div>

            <button
              onClick={resetToIdle}
              disabled={isSubmitting}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors self-start disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default PropertyWidget;
