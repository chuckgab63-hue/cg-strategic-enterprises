import { useState } from 'react';
import { isAnalyticsIgnored, setAnalyticsIgnored } from '../lib/analytics';

// Unlisted owner tool at /ignore-me: turns Vercel Web Analytics off (or back on)
// for this browser only, so our own visits don't count. Not in the nav, the
// sitemap or SITE_ROUTES, and noindex (src/i18n/head.ts). English only.
export default function IgnoreMe() {
  const [ignored, setIgnored] = useState(isAnalyticsIgnored);
  const [storageBlocked, setStorageBlocked] = useState(false);

  const toggle = () => {
    const next = !ignored;
    const saved = setAnalyticsIgnored(next);
    setStorageBlocked(!saved);
    // Read back rather than trusting `next`, so the page shows what's really stored.
    setIgnored(isAnalyticsIgnored());
  };

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-xl mx-auto px-4 sm:px-6 pt-32 pb-24 text-left">
      <h1 className="text-3xl md:text-4xl font-black text-white">Analytics opt-out</h1>
      <p className="text-slate-400 text-sm leading-relaxed mt-4">
        Stops Vercel Web Analytics counting visits from this browser, for us to use on our own devices.
        It only affects this browser on this device, and clearing site data turns it off.
      </p>

      <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
        <p role="status" className="flex items-center gap-3 text-sm font-bold">
          <span className={`w-2.5 h-2.5 rounded-full ${ignored ? 'bg-emerald-400' : 'bg-slate-500'}`} aria-hidden="true"></span>
          <span className={ignored ? 'text-emerald-300' : 'text-slate-200'}>
            {ignored ? 'Ignored: this browser sends no analytics.' : 'Counted: this browser sends analytics as normal.'}
          </span>
        </p>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={ignored}
          className="self-start bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors cursor-pointer"
        >
          {ignored ? 'Count my visits again' : 'Ignore my visits'}
        </button>
        {storageBlocked && (
          <p role="alert" className="text-amber-300 text-xs leading-relaxed">
            This browser is blocking site storage (private mode or a privacy setting), so the setting couldn't be saved.
          </p>
        )}
      </div>
    </section>
  );
}
