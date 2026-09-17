import React, { useState, useEffect } from 'react';
import { ASSET_DROP_OFF_WEBHOOK_URL, ASSET_RETURN_WEBHOOK_URL, ASSET_GET_LOCATIONS_WEBHOOK_URL } from '../config/webhooks';

interface ActiveLocation {
  address: string;
  clientEmail: string;
  droppedAt: string;
}

const DEPOTS = ['North Yard', 'South Yard', 'Main Depot'];

type Mode = 'idle' | 'drop-off' | 'return';

const AssetTrackerWidget: React.FC = () => {
  const [mode, setMode] = useState<Mode>('idle');
  const [clientEmail, setClientEmail] = useState('');
  const [address, setAddress] = useState('');
  const [depot, setDepot] = useState(DEPOTS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [locations, setLocations] = useState<ActiveLocation[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  const fetchLocations = async () => {
    setIsLoadingLocations(true);
    try {
      const response = await fetch(ASSET_GET_LOCATIONS_WEBHOOK_URL, { method: 'POST' });
      const data = await response.json();
      setLocations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch active locations:', error);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const resetToIdle = () => {
    setMode('idle');
    setAddress('');
    setStatusMessage(null);
  };

  const handleSubmit = async () => {
    if (!clientEmail.trim() || !address.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setStatusMessage(null);

    const webhookUrl = mode === 'drop-off' ? ASSET_DROP_OFF_WEBHOOK_URL : ASSET_RETURN_WEBHOOK_URL;
    const payload = mode === 'drop-off'
      ? { clientEmail, address }
      : { clientEmail, address, depot };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
      const data = await response.json().catch(() => ({}));

      if (data.limitReached) {
        setStatusMessage("You've reached today's usage limit for this demo (10 submissions). Check your email for details.");
      } else if (mode === 'drop-off') {
        setStatusMessage(`Logged. A confirmation with a map link has been sent to ${clientEmail}.`);
      } else {
        setStatusMessage(`Logged as returned to ${depot}.`);
      }
      setAddress('');
      await fetchLocations();
    } catch (error) {
      console.error('Asset Tracker submission failed:', error);
      setStatusMessage('Something went wrong \u2014 please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const staticMapUrl = (() => {
    if (!mapsApiKey || locations.length === 0) return null;
    const base = 'https://maps.googleapis.com/maps/api/staticmap?size=640x320&maptype=roadmap';
    const markers = locations
      .map((loc) => `&markers=color:red%7C${encodeURIComponent(loc.address)}`)
      .join('');
    return `${base}${markers}&key=${mapsApiKey}`;
  })();

  return (
    <div className="relative w-full max-w-md mx-auto bg-slate-50 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col border border-white/10">

      {/* Header */}
      <div className="bg-[#020617] px-6 py-5 flex items-center justify-between shrink-0 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="text-amber-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-black text-base uppercase tracking-wider leading-none mb-1">
              Asset Tracker
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span className="text-amber-400 text-[8px] font-black uppercase tracking-widest">
                Live Demo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-slate-200 w-full h-[200px] flex items-center justify-center shrink-0 overflow-hidden">
        {staticMapUrl ? (
          <img src={staticMapUrl} alt="Map of active dumpster locations" className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest px-6 text-center">
            {isLoadingLocations ? 'Loading map...' : locations.length === 0 ? 'No active locations yet' : 'Map unavailable (API key not configured)'}
          </span>
        )}
      </div>

      {/* Active locations list */}
      <div className="max-h-40 overflow-y-auto border-b border-slate-200 bg-white">
        {locations.length === 0 && !isLoadingLocations ? (
          <p className="text-xs text-slate-400 text-center py-4">No dumpsters currently deployed.</p>
        ) : (
          locations.map((loc, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2 border-b border-slate-100 last:border-0">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#020617] truncate">{loc.address}</p>
                <p className="text-[10px] text-slate-400">{loc.droppedAt}</p>
              </div>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(loc.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 text-[10px] font-black uppercase tracking-widest shrink-0 ml-2 hover:underline"
              >
                Open &rarr;
              </a>
            </div>
          ))
        )}
      </div>

      {/* Control area */}
      <div className="p-4 bg-white shrink-0 flex flex-col gap-3">

        {statusMessage && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
            {statusMessage}
          </div>
        )}

        {mode === 'idle' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMode('drop-off'); setStatusMessage(null); }}
              className="bg-white border border-slate-200 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-amber-500 hover:text-[#020617] hover:shadow-md transition-all"
            >
              Drop Off
            </button>
            <button
              onClick={() => { setMode('return'); setStatusMessage(null); }}
              className="bg-white border border-slate-200 p-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:border-amber-500 hover:text-[#020617] hover:shadow-md transition-all"
            >
              Mark Returned
            </button>
          </div>
        )}

        {(mode === 'drop-off' || mode === 'return') && (
          <>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Your email"
              disabled={isSubmitting}
              className="bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50 w-full"
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Job site address"
              disabled={isSubmitting}
              className="bg-slate-50 text-[#020617] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50 w-full"
            />

            {mode === 'return' && (
              <select
                value={depot}
                onChange={(e) => setDepot(e.target.value)}
                disabled={isSubmitting}
                className="bg-slate-50 text-[#020617] border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all shadow-sm disabled:opacity-50 w-full"
              >
                {DEPOTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !clientEmail.trim() || !address.trim()}
              className={`h-12 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${
                isSubmitting || !clientEmail.trim() || !address.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#020617] text-amber-400 hover:bg-slate-800 cursor-pointer'
              }`}
            >
              {isSubmitting ? 'Submitting...' : mode === 'drop-off' ? 'Log Drop-off' : 'Log Return'}
            </button>

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

export default AssetTrackerWidget;
