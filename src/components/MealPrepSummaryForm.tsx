import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { MEAL_PREP_CALCULATOR_WEBHOOK_URL } from '../config/webhooks';
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '../config/site';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import summaryForm from '../i18n/mealPrepSummaryForm';
import type { MealPrepInputs, MealPrepResults } from '../lib/mealPrepModel';
import { buildCalculatorSubmission } from '../lib/mealPrepSubmission';

interface MealPrepSummaryFormProps {
  inputs: MealPrepInputs;
  results: MealPrepResults;
}

const EMPTY_FORM = { name: '', email: '', followUpConsent: false };

// Same classes as ContactForm so the two forms read as one family.
const inputClass = 'w-full bg-slate-950 border focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-base sm:text-sm transition-colors';
const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

// Optional: the calculator works fully without it. Sends whatever numbers are
// on screen at the moment of sending.
export default function MealPrepSummaryForm({ inputs, results }: MealPrepSummaryFormProps) {
  const t = useT(summaryForm);
  const lang = useLang();
  const lp = useLocalePath();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sentTo, setSentTo] = useState('');
  const [nameError, setNameError] = useState('');
  const nameErrorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // `required` catches an empty field; this also catches a whitespace-only one.
    if (!formData.name.trim()) {
      setNameError(t.nameRequired);
      return;
    }
    setFormStatus('submitting');
    const body = buildCalculatorSubmission(
      {
        name: formData.name,
        email: formData.email,
        emailMarketingConsent: formData.followUpConsent,
        // The wording the visitor actually saw, in their language.
        consentText: t.consent,
        submittedAt: new Date().toISOString(),
      },
      inputs,
      results,
      lang,
    );
    try {
      const response = await fetch(MEAL_PREP_CALCULATOR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
      setSentTo(body.email);
      setFormStatus('success');
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div role="status" className="flex flex-col items-center justify-center text-center py-8">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-emerald-400 font-bold mb-2">{t.successTitle}</h3>
        <p className="text-slate-400 text-sm">
          {t.successBefore}<span className="text-slate-200 break-all">{sentTo}</span>{t.successAfter}
        </p>
        <button
          type="button"
          onClick={() => setFormStatus('idle')}
          className="mt-6 text-xs font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors cursor-pointer"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {formStatus === 'error' && (
        <p role="alert" className="text-red-400 text-xs font-semibold leading-relaxed">
          {t.errorBefore}{' '}
          <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a> {t.errorOr}{' '}
          <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="text" required autoComplete="name" placeholder={t.name}
            aria-label={t.name}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? nameErrorId : undefined}
            value={formData.name}
            onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setNameError(''); }}
            className={`${inputClass} ${nameError ? 'border-red-400' : 'border-slate-700'}`}
          />
          {nameError && (
            <p id={nameErrorId} role="alert" className="text-red-400 text-xs font-semibold">{nameError}</p>
          )}
        </div>
        <input
          type="email" required autoComplete="email" placeholder={t.email}
          aria-label={t.email}
          value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`${inputClass} border-slate-700`}
        />
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.followUpConsent}
          onChange={(e) => setFormData({ ...formData, followUpConsent: e.target.checked })}
          className="mt-0.5 w-4 h-4 shrink-0 accent-brand-orange cursor-pointer"
        />
        <span className="text-xs text-slate-300 leading-relaxed">
          {t.consent}
          {t.consentGoverns && <span className="block mt-1 text-slate-500">{t.consentGoverns}</span>}
        </span>
      </label>
      <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
        {t.optional} {t.see} <Link to={lp('/privacy')} className={linkClass}>{t.privacy}</Link>.
      </p>
      <button
        type="submit" disabled={formStatus === 'submitting'}
        className={`w-full mt-1 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
          formStatus === 'submitting'
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
            : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent cursor-pointer'
        }`}
      >
        {formStatus === 'submitting' ? t.sending : t.submit}
      </button>
    </form>
  );
}
