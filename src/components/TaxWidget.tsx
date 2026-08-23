import React, { useState } from 'react';

const TaxWidget: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [taxData, setTaxData] = useState<{ rate: number; amount: number; location: string } | null>(null);
  const [error, setError] = useState(false);

  const subtotal = 1250.00; // Simulated cart subtotal

  const handleCalculate = () => {
    if (zipCode.length < 5) {
      setError(true);
      return;
    }
    
    setError(false);
    setIsCalculating(true);
    setTaxData(null);

    // Simulate API call to a live tax database
    setTimeout(() => {
      // Fake logic for demo purposes
      let rate = 0.07;
      let location = "Local Municipality";
      
      if (zipCode.startsWith('32')) {
        rate = 0.075; // FL rate simulation
        location = "Jacksonville, FL";
      } else if (zipCode.startsWith('90')) {
        rate = 0.095; // CA rate simulation
        location = "Los Angeles, CA";
      } else if (zipCode.startsWith('10')) {
        rate = 0.08875; // NY rate simulation
        location = "New York, NY";
      }

      setTaxData({
        rate: rate,
        amount: subtotal * rate,
        location: location
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col border border-slate-800">
      
      {/* Header */}
      <div className="bg-[#020617] px-6 py-5 flex items-center gap-3 border-b border-emerald-500/20">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-wider leading-none mb-1">
            Dynamic Tax Engine
          </h3>
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            API Connected
          </span>
        </div>
      </div>

      {/* Cart Body */}
      <div className="p-6 flex flex-col gap-6">
        
        {/* Order Summary */}
        <div className="space-y-3">
          <h4 className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Order Summary</h4>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Premium Tech Bundle</span>
            <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Tax Input */}
        <div className="bg-[#020617] p-4 rounded-xl border border-slate-800">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
            Calculate Local Tax
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Zip Code (e.g. 32224)"
              className={`flex-1 bg-slate-900 text-white placeholder:text-slate-600 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors`}
            />
            <button 
              onClick={handleCalculate}
              disabled={isCalculating || zipCode.length === 0}
              className="bg-emerald-500 hover:bg-emerald-400 text-[#020617] px-4 py-2 rounded-lg font-black uppercase tracking-widest text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? '...' : 'Update'}
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          <div className="flex justify-between text-sm items-center">
            <span className="text-slate-400">Sales Tax</span>
            {isCalculating ? (
              <span className="text-emerald-500 animate-pulse text-xs font-bold uppercase tracking-widest">Fetching...</span>
            ) : taxData ? (
              <span className="text-white font-medium">+ ${taxData.amount.toFixed(2)}</span>
            ) : (
              <span className="text-slate-600 font-medium">Pending</span>
            )}
          </div>
          
          {taxData && (
            <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg animate-in fade-in duration-300">
              <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {taxData.location} ({(taxData.rate * 100).toFixed(3)}%)
              </span>
            </div>
          )}

          <div className="flex justify-between text-lg border-t border-slate-800 pt-3">
            <span className="text-white font-black">Total</span>
            <span className="text-white font-black">
              ${taxData ? (subtotal + taxData.amount).toFixed(2) : subtotal.toFixed(2)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaxWidget;