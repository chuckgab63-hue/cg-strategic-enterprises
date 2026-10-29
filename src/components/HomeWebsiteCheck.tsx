import { useId, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import home from '../i18n/home';
import { trackEvent } from '../lib/analytics';
import { cleanWebsiteInput, websiteCheckPath } from '../lib/websiteCheck/prefill';

// The homepage's Free Website Check section: the visitor types their website
// and goes to /website-check with it filled in (?url=), where they add their
// name and email and run the check. Plain markup and inline SVG only, so the
// homepage loads nothing new.

// One small outline icon per thing the check scores, in the order of t.checks.
const CHECK_ICONS = [
  // Speed: a lightning bolt.
  'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
  // Mobile: a phone.
  'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm3 17h2',
  // Search basics: a magnifying glass.
  'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm5 12 5 5',
  // Missed-call risk: a phone handset.
  'M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
];

export default function HomeWebsiteCheck() {
  const t = useT(home).websiteCheck;
  const lang = useLang();
  const lp = useLocalePath();
  const navigate = useNavigate();
  const [website, setWebsite] = useState('');
  const [invalid, setInvalid] = useState(false);
  const inputId = useId();
  const errorId = useId();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const clean = cleanWebsiteInput(website);
    setInvalid(!clean);
    if (!clean) return;
    trackEvent('home_website_check_click', lang, { placement: 'section' });
    navigate(lp(websiteCheckPath(clean)));
  };

  return (
    <section className="site-container relative z-10 pb-12">
      <div className="text-left bg-[#020617]/80 border border-brand-orange/40 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(255,95,31,0.08)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mt-5">{t.title}</h2>
          <p className="text-slate-400 leading-relaxed mt-4">{t.body}</p>
        </div>

        <div className="flex flex-col gap-5">
          <form onSubmit={submit} noValidate className="flex flex-col gap-2">
            <label htmlFor={inputId} className="sr-only">{t.label}</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id={inputId}
                type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false}
                placeholder={t.placeholder}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? errorId : undefined}
                value={website}
                onChange={e => { setWebsite(e.target.value); setInvalid(false); }}
                className={`flex-1 min-w-0 bg-slate-950 border focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-base transition-colors ${invalid ? 'border-red-400' : 'border-slate-700'}`}
              />
              <button
                type="submit"
                className="shrink-0 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] cursor-pointer"
              >
                {t.submit}
              </button>
            </div>
            {invalid && <p id={errorId} role="alert" className="text-red-400 text-xs font-semibold">{t.error}</p>}
          </form>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.checks.map((label, i) => (
              <li key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={CHECK_ICONS[i]} />
                </svg>
                {label}
              </li>
            ))}
          </ul>

          <p className="text-xs text-slate-500">{t.note}</p>
        </div>
      </div>
    </section>
  );
}
