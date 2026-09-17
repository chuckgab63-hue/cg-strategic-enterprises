import React, { useState } from 'react';
import type { ReactNode } from 'react';

interface MobileExpandWidgetProps {
  children: ReactNode;
  label: string;
}

const MobileExpandWidget: React.FC<MobileExpandWidgetProps> = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop (lg and up): inline scaled widget, unchanged from before */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center">
        <div className="transform scale-[0.80] xl:scale-90 origin-center">
          {children}
        </div>
      </div>

      {/* Mobile/tablet (below lg): tap-to-launch card */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full h-full hover:border-slate-500 transition-colors"
        >
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-white font-black uppercase tracking-widest text-sm text-center">
            Tap to Try the Live Demo
          </span>
          <span className="text-slate-500 text-xs">{label}</span>
        </button>
      </div>

      {/* Mobile/tablet: fullscreen modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/95 flex flex-col overflow-y-auto p-4">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close demo"
            className="self-end mb-4 text-white bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex-1 flex items-start justify-center">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileExpandWidget;
