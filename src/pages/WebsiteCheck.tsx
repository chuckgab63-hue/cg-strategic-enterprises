import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ConsentText } from '../components/ContactForm';
import { OPEN_LETS_TALK_EVENT } from '../components/LetsTalkChooser';
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '../config/site';
import { smsPhoneError } from '../lib/smsPhone';
import { WEBSITE_CHECK_HONEYPOT, WEBSITE_CHECK_SOURCE, type PageSummary } from '../lib/websiteCheck/lead';
import { readCheckResponse, type ReadResponse } from '../lib/websiteCheck/response';
import { prefillFromSearch } from '../lib/websiteCheck/prefill';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import consentDict from '../i18n/consent';
import websiteCheckDict from '../i18n/websiteCheck';
import { trackEvent, type CheckCard } from '../lib/analytics';
import { DetailsPanel, RiskDetails, SearchDetails, SpeedDetails } from '../components/WebsiteCheckDetails';

// The free Website Check lead magnet. The form posts to api/website-check.ts,
// which checks the site, sends the full report to Make for the follow-up email,
// and returns the short summary shown here. The response is read with
// readCheckResponse (src/lib/websiteCheck/response.ts), the same contract the
// API builds its answers with.

type ResultsResponse = Extract<ReadResponse, { kind: 'results' }>;

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}
declare global {
  interface Window { turnstile?: TurnstileApi }
}

/**
 * Cloudflare Turnstile, only when VITE_TURNSTILE_SITE_KEY is set. Loaded with
 * a plain script tag, so no npm dependency. Returns the token and a reset.
 */
function useTurnstile(container: React.RefObject<HTMLDivElement | null>, lang: string) {
  const [token, setToken] = useState('');
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !container.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !window.turnstile || !container.current) return;
      widgetId.current = window.turnstile.render(container.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        language: lang,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };
    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
      if (!script) {
        script = document.createElement('script');
        script.src = TURNSTILE_SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', render, { once: true });
    }
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      setToken('');
    };
  }, [container, lang]);

  const reset = () => {
    setToken('');
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  };
  return { token, reset, enabled: Boolean(TURNSTILE_SITE_KEY) };
}

const EMPTY_FORM = {
  websiteUrl: '', firstName: '', email: '', businessName: '', phone: '', [WEBSITE_CHECK_HONEYPOT]: '',
  smsConsent: false, smsMarketingConsent: false, emailMarketingConsent: false,
};

type ConsentField = 'smsConsent' | 'smsMarketingConsent' | 'emailMarketingConsent';
type FieldError = 'website_required' | 'first_name_required' | 'email_invalid' | 'phone_required';

const inputClass = 'w-full bg-slate-950 border focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors';
const labelClass = 'text-xs font-semibold text-slate-300';
const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

/** Google's own thresholds: 90+ good, 50-89 needs work, under 50 poor. */
function scoreTone(score: number | null) {
  if (score === null) return 'text-slate-400 border-slate-700';
  if (score >= 90) return 'text-emerald-400 border-emerald-500/50';
  if (score >= 50) return 'text-amber-400 border-amber-500/50';
  return 'text-red-400 border-red-500/50';
}
const RISK_TONE = { low: scoreTone(100), medium: scoreTone(70), high: scoreTone(0) };

/** A card's "Learn more" button and the panel it opens (WebsiteCheckDetails.tsx). */
interface LearnMore { id: string; controls: string; open: boolean; onToggle: () => void }

function ScoreCard({ label, note, value, suffix, tone, learnMore, children }: {
  label: string; note: string; value: string; suffix?: string; tone: string; learnMore?: LearnMore; children?: React.ReactNode;
}) {
  const t = useT(websiteCheckDict).learnMore;
  return (
    <div className={`bg-slate-900/50 border rounded-2xl p-5 flex flex-col gap-2 ${tone.split(' ')[1]}`}>
      <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">{label}</h3>
      <p className={`text-4xl font-black ${tone.split(' ')[0]}`}>
        {value}{suffix && <span className="text-sm font-bold text-slate-500 ml-1">{suffix}</span>}
      </p>
      <p className="text-xs text-slate-400 leading-5">{note}</p>
      {children}
      {learnMore && (
        <button
          type="button"
          id={learnMore.id}
          aria-expanded={learnMore.open}
          aria-controls={learnMore.controls}
          onClick={learnMore.onToggle}
          className="mt-auto self-start inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-brand-orange hover:text-white transition-colors cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          {learnMore.open ? t.close : t.open}
          <svg aria-hidden="true" viewBox="0 0 12 12" className={`w-3 h-3 transition-transform ${learnMore.open ? 'rotate-180' : ''}`}>
            <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

function Results({ result, onReset }: { result: ResultsResponse; onReset: () => void }) {
  const lang = useLang();
  const all = useT(websiteCheckDict);
  const t = all.results;
  const lp = useLocalePath();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [openCard, setOpenCard] = useState<CheckCard | null>(null);
  const cardsId = useId();
  const buttonId = (card: CheckCard) => `${cardsId}-${card}`;
  const panelId = (card: CheckCard) => `${cardsId}-${card}-panel`;
  const learnMore = (card: CheckCard): LearnMore => ({
    id: buttonId(card),
    controls: panelId(card),
    open: openCard === card,
    onToggle: () => {
      const opening = openCard !== card;
      setOpenCard(opening ? card : null);
      if (opening) trackEvent('check_learn_more', lang, { card });
    },
  });
  // Escape in a panel closes it and puts focus back on its button.
  const closePanel = (card: CheckCard) => {
    setOpenCard(null);
    document.getElementById(buttonId(card))?.focus();
  };
  const panel = (card: CheckCard, title: string, children: React.ReactNode) => (
    <DetailsPanel id={panelId(card)} title={title} open={openCard === card} onClose={() => closePanel(card)}>
      {children}
    </DetailsPanel>
  );
  const { report } = result;
  const s = report.scores;
  // Missing parts are explained in the notice above the cards, not as an error.
  const shown = result.unavailable.filter(part => part !== 'ai_summary' || report.fixes.length === 0);

  useEffect(() => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const metricLine = (m: PageSummary['metrics']['mobile']) => {
    if (!m) return null;
    const parts = [
      m.lcp_ms !== null && `${t.lcp} ${(m.lcp_ms / 1000).toFixed(1)}${t.seconds}`,
      m.cls !== null && `${t.cls} ${m.cls.toFixed(2)}`,
      m.inp_ms !== null && `${t.inp} ${m.inp_ms}${t.ms}`,
    ].filter(Boolean);
    return (
      <p className="text-xs text-slate-300 leading-5">
        {parts.join(' · ')}
        <span className="block text-slate-500">{m.metrics_source === 'field' ? t.fieldData : t.labData}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className={`shrink-0 w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center ${scoreTone(s.overall)}`}>
          <span className="text-4xl font-black">{s.overall ?? '—'}</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{t.outOf}</span>
        </div>
        <div className="min-w-0">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl md:text-3xl font-black text-white scroll-mt-28 focus:outline-none break-words">
            {t.title} <span className="text-brand-orange">{report.page}</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">{report.summary}</p>
          <p className="text-slate-400 text-xs mt-2">{result.emailed ? t.emailed : t.notEmailed}</p>
        </div>
      </div>

      {result.status === 'partial' && shown.length > 0 && (
        <div role="status" className="text-xs text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 leading-5">
          <p className="font-bold">{t.partialTitle}</p>
          <ul className="list-disc pl-5 mt-1">
            {shown.map(part => <li key={part}>{t.unavailable[part]}</li>)}
          </ul>
        </div>
      )}

      {/* Each card's panel comes right after it and spans the whole row. Dense
          packing lets the cards after it fill the row first, so the panel
          sits under its own card on phones and under the row of cards on
          wider screens, and the cards never move. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-4">
        <ScoreCard
          label={t.speed}
          note={s.speed === null ? t.notAvailableNote : t.speedNote}
          value={s.speed === null ? '—' : String(s.speed)}
          suffix={s.speed === null ? t.notAvailable : undefined}
          tone={scoreTone(s.speed)}
          learnMore={s.speed === null ? undefined : learnMore('speed')}
        >
          {metricLine(report.metrics.desktop)}
        </ScoreCard>
        {s.speed !== null && panel('speed', all.learnMore.speedTitle, <SpeedDetails strategy="desktop" metrics={report.metrics.desktop} />)}
        <ScoreCard
          label={t.mobile}
          note={s.mobile === null ? t.notAvailableNote : t.mobileNote}
          value={s.mobile === null ? '—' : String(s.mobile)}
          suffix={s.mobile === null ? t.notAvailable : undefined}
          tone={scoreTone(s.mobile)}
          learnMore={s.mobile === null ? undefined : learnMore('mobile')}
        >
          {metricLine(report.metrics.mobile)}
        </ScoreCard>
        {s.mobile !== null && panel('mobile', all.learnMore.mobileTitle, <SpeedDetails strategy="mobile" metrics={report.metrics.mobile} />)}
        <ScoreCard
          label={t.search}
          note={s.search_basics === null ? t.notReadableNote : t.searchNote}
          value={s.search_basics === null ? '—' : String(s.search_basics)}
          suffix={s.search_basics === null ? t.notAvailable : undefined}
          tone={scoreTone(s.search_basics)}
          learnMore={report.search_missed === null ? undefined : learnMore('search')}
        />
        {report.search_missed !== null && panel('search', all.learnMore.searchTitle, <SearchDetails missed={report.search_missed} />)}
        <ScoreCard
          label={t.risk}
          note={s.missed_call_risk === null ? t.notReadableNote : t.riskNote}
          value={s.missed_call_risk === null ? '—' : t.riskLevels[s.missed_call_risk]}
          suffix={s.missed_call_risk === null ? t.notAvailable : undefined}
          tone={s.missed_call_risk === null ? scoreTone(null) : RISK_TONE[s.missed_call_risk]}
          learnMore={s.missed_call_risk === null ? undefined : learnMore('missed_call')}
        />
        {s.missed_call_risk !== null && panel('missed_call', all.learnMore.riskPanelTitle, (
          <RiskDetails missed={report.risk_missed ?? null} idPrefix={panelId('missed_call')} />
        ))}
      </div>

      {report.content_limited && (
        <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">{t.limitedNote}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {report.fixes.length > 0 && <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">{t.fixesTitle}</h3>
          <ol className="flex flex-col gap-4">
            {report.fixes.map((fix, i) => (
              <li key={fix.title} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-brand-orange/15 border border-brand-orange text-brand-orange text-xs font-black flex items-center justify-center">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm">{fix.title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">{fix.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>}
        {report.risk_reasons.length > 0 && (
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">{t.whyRisk}</h3>
            <ul className="flex flex-col gap-3 list-disc pl-5 marker:text-brand-orange">
              {report.risk_reasons.map(reason => (
                <li key={reason} className="text-slate-400 text-sm leading-relaxed">{reason}</li>
              ))}
            </ul>
            {(s.missed_call_risk === 'medium' || s.missed_call_risk === 'high') && (
              <Link
                to={lp('/missed-call-calculator')}
                className="inline-block mt-5 text-sm font-bold text-brand-orange underline underline-offset-4 hover:text-white transition-colors"
              >
                {t.missedCallCost}
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_LETS_TALK_EVENT))}
          className="bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] cursor-pointer"
        >
          {t.talkToAlex}
        </button>
        <Link
          to={lp(`/contact?source=${WEBSITE_CHECK_SOURCE}`)}
          className="text-center border border-slate-600 text-slate-200 px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          {t.bookCall}
        </Link>
        <Link
          to={lp('/missed-call-calculator')}
          className="text-center text-xs font-bold tracking-widest uppercase text-slate-300 underline underline-offset-4 hover:text-brand-orange transition-colors py-3"
        >
          {t.missedCallCalculator}
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="sm:ml-auto text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors cursor-pointer py-3"
        >
          {t.checkAnother}
        </button>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">{t.disclaimer}</p>
    </div>
  );
}

export default function WebsiteCheck() {
  const lang = useLang();
  const t = useT(websiteCheckDict);
  const consent = useT(consentDict);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [error, setError] = useState<string>('');
  const [outcome, setOutcome] = useState<ReadResponse | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(turnstileRef, lang);
  const ids = { url: useId(), first: useId(), email: useId(), business: useId(), phone: useId() };

  // ?url= from the homepage section fills in the website. The check still
  // needs a name and email (and the bot check), so it never starts by itself:
  // focus moves to the first name instead. Read after the first render so the
  // pre-rendered HTML (always empty) hydrates cleanly.
  const [searchParams] = useSearchParams();
  const prefill = prefillFromSearch(searchParams);
  useEffect(() => {
    if (!prefill) return;
    setForm(prev => ({ ...prev, websiteUrl: prefill }));
    document.getElementById(ids.first)?.focus();
  }, [prefill, ids.first]);

  const wantsTexts = form.smsConsent || form.smsMarketingConsent;
  const set = (field: keyof typeof EMPTY_FORM, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFieldErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FieldError[] = [];
    if (!form.websiteUrl.trim()) errors.push('website_required');
    if (!form.firstName.trim()) errors.push('first_name_required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.push('email_invalid');
    if (smsPhoneError(form.phone, wantsTexts)) errors.push('phone_required');
    setFieldErrors(errors);
    setError('');
    if (errors.length) return;

    setStatus('submitting');
    trackEvent('website_check_submitted', lang);
    try {
      const response = await fetch('/api/website-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website_url: form.websiteUrl.trim(),
          first_name: form.firstName.trim(),
          email: form.email.trim(),
          business_name: form.businessName.trim(),
          phone: form.phone.trim(),
          [WEBSITE_CHECK_HONEYPOT]: form[WEBSITE_CHECK_HONEYPOT],
          language: lang,
          sms_consent: form.smsConsent,
          // The wording the visitor actually saw (Spanish on /es pages), as ContactForm sends it.
          sms_consent_text: consent.sms,
          sms_marketing_consent: form.smsMarketingConsent,
          sms_marketing_consent_text: consent.smsMarketing,
          email_marketing_consent: form.emailMarketingConsent,
          turnstile_token: turnstile.token,
        }),
      });
      // A platform error page (e.g. a timeout) isn't JSON; readCheckResponse turns it into an error.
      const read = readCheckResponse(response.status, await response.json().catch(() => null));
      if (read.kind !== 'error') {
        setOutcome(read);
        setStatus('done');
        return;
      }
      if (read.fields.length) setFieldErrors(read.fields as FieldError[]);
      setError(read.fields.length ? '' : read.code in t.errors ? read.code : 'generic');
    } catch (err) {
      console.error('Website check failed:', err);
      setError('generic');
    }
    turnstile.reset();
    setStatus('idle');
  };

  const reset = () => {
    setOutcome(null);
    setStatus('idle');
    setForm(prev => ({ ...prev, websiteUrl: '' }));
    turnstile.reset();
  };

  const fieldError = (code: FieldError, id: string) => fieldErrors.includes(code) && (
    <p id={id} role="alert" className="text-red-400 text-xs font-semibold">{t.errors[code]}</p>
  );
  const invalid = (code: FieldError) => fieldErrors.includes(code);
  const borderFor = (code: FieldError) => (invalid(code) ? 'border-red-400' : 'border-slate-700');

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24 text-left">
      <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">{t.eyebrow}</p>
      <h1 className="text-3xl md:text-5xl font-black text-white mt-3">{t.title}</h1>
      <p className="text-slate-300 text-base leading-relaxed mt-4 max-w-3xl">{t.intro}</p>
      <p className="text-slate-400 text-sm leading-relaxed mt-2 max-w-3xl">{t.howItWorks}</p>

      <div className="mt-10">
        {status === 'done' && outcome?.kind === 'results' ? (
          <Results result={outcome} onReset={reset} />
        ) : status === 'done' && outcome?.kind === 'received' ? (
          <div role="status" className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-2xl">
            <h2 className="text-white font-bold text-lg">{t.received.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">{t.received.body}</p>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
              <h2 className="text-white font-bold text-lg">{t.form.title}</h2>
            </div>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 relative">
              {error && (
                <p role="alert" className="text-red-400 text-xs font-semibold leading-relaxed">
                  {error === 'generic' ? (
                    <>
                      {t.errors.generic}{' '}
                      <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a> {t.errors.or}{' '}
                      <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
                    </>
                  ) : t.errors[error as keyof typeof t.errors]}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor={ids.url} className={labelClass}>{t.form.websiteUrl} <span className="text-brand-orange" aria-hidden="true">*</span></label>
                <input
                  id={ids.url} type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} required
                  placeholder={t.form.websitePlaceholder}
                  aria-invalid={invalid('website_required') || undefined}
                  aria-describedby={invalid('website_required') ? `${ids.url}-e` : undefined}
                  value={form.websiteUrl} onChange={e => set('websiteUrl', e.target.value)}
                  className={`${inputClass} ${borderFor('website_required')}`}
                />
                {fieldError('website_required', `${ids.url}-e`)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor={ids.first} className={labelClass}>{t.form.firstName} <span className="text-brand-orange" aria-hidden="true">*</span></label>
                  <input
                    id={ids.first} type="text" autoComplete="given-name" required placeholder={t.form.firstNamePlaceholder}
                    aria-invalid={invalid('first_name_required') || undefined}
                    aria-describedby={invalid('first_name_required') ? `${ids.first}-e` : undefined}
                    value={form.firstName} onChange={e => set('firstName', e.target.value)}
                    className={`${inputClass} ${borderFor('first_name_required')}`}
                  />
                  {fieldError('first_name_required', `${ids.first}-e`)}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={ids.email} className={labelClass}>{t.form.email} <span className="text-brand-orange" aria-hidden="true">*</span></label>
                  <input
                    id={ids.email} type="email" autoComplete="email" required placeholder={t.form.emailPlaceholder}
                    aria-invalid={invalid('email_invalid') || undefined}
                    aria-describedby={invalid('email_invalid') ? `${ids.email}-e` : undefined}
                    value={form.email} onChange={e => set('email', e.target.value)}
                    className={`${inputClass} ${borderFor('email_invalid')}`}
                  />
                  {fieldError('email_invalid', `${ids.email}-e`)}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={ids.business} className={labelClass}>{t.form.businessName}</label>
                <input
                  id={ids.business} type="text" autoComplete="organization" placeholder={t.form.businessPlaceholder}
                  value={form.businessName} onChange={e => set('businessName', e.target.value)}
                  className={`${inputClass} border-slate-700`}
                />
              </div>

              {/* As on the contact form: the phone sits directly above the SMS consent
                  box, and is required only when a text box is ticked. */}
              <div className="flex flex-col gap-2">
                <label htmlFor={ids.phone} className={labelClass}>{t.form.phone}</label>
                <input
                  id={ids.phone} type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555"
                  aria-required={wantsTexts}
                  aria-invalid={invalid('phone_required') || undefined}
                  aria-describedby={invalid('phone_required') ? `${ids.phone}-e` : undefined}
                  value={form.phone} onChange={e => set('phone', e.target.value)}
                  className={`${inputClass} ${borderFor('phone_required')}`}
                />
                {fieldError('phone_required', `${ids.phone}-e`)}
              </div>

              {/* Honeypot: off-screen rather than display:none, which some bots skip.
                  A meaningless name and label plus readOnly keep browser autofill and
                  password managers out of it (they filled the first version, so real
                  visitors were treated as bots); scripts that set values still fill it. */}
              <div aria-hidden="true" className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden">
                <label>
                  Leave this field empty
                  <input
                    type="text" name={WEBSITE_CHECK_HONEYPOT} tabIndex={-1} autoComplete="off" readOnly
                    data-lpignore="true" data-1p-ignore="true" data-form-type="other"
                    value={form[WEBSITE_CHECK_HONEYPOT]} onChange={e => set(WEBSITE_CHECK_HONEYPOT, e.target.value)}
                  />
                </label>
              </div>

              {consent.governingNote && (
                <p className="text-xs text-slate-400 italic">{consent.governingNote}</p>
              )}
              {([
                ['smsConsent', consent.sms],
                ['smsMarketingConsent', consent.smsMarketing],
                ['emailMarketingConsent', consent.emailMarketing],
              ] as [ConsentField, string][]).map(([field, text]) => (
                <label key={field} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form[field]}
                    onChange={e => set(field, e.target.checked)}
                    className="mt-0.5 w-4 h-4 shrink-0 accent-brand-orange cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    <ConsentText text={text} />
                  </span>
                </label>
              ))}

              {turnstile.enabled && <div ref={turnstileRef} className="min-h-[65px]" />}

              <button
                type="submit" disabled={status === 'submitting' || (turnstile.enabled && !turnstile.token)}
                aria-busy={status === 'submitting'}
                className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
                  status === 'submitting'
                    ? 'bg-slate-700 text-slate-400 cursor-wait border border-slate-600'
                    : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                }`}
              >
                {status === 'submitting' ? t.form.submitting : t.form.submit}
              </button>
              <p className="sr-only" aria-live="polite">{status === 'submitting' ? t.form.submitting : ''}</p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
