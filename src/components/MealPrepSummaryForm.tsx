import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { MEAL_PREP_CALCULATOR_WEBHOOK_URL } from '../config/webhooks';
import { MEAL_PREP_FOLLOW_UP_CONSENT_TEXT, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '../config/site';
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
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sentTo, setSentTo] = useState('');
  const [nameError, setNameError] = useState('');
  const nameErrorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // `required` catches an empty field; this also catches a whitespace-only one.
    if (!formData.name.trim()) {
      setNameError('Please enter your name.');
      return;
    }
    setFormStatus('submitting');
    const body = buildCalculatorSubmission(
      {
        name: formData.name,
        email: formData.email,
        emailMarketingConsent: formData.followUpConsent,
        consentText: MEAL_PREP_FOLLOW_UP_CONSENT_TEXT,
        submittedAt: new Date().toISOString(),
      },
      inputs,
      results,
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
        <h3 className="text-emerald-400 font-bold mb-2">Summary on Its Way</h3>
        <p className="text-slate-400 text-sm">
          We've sent your numbers to <span className="text-slate-200 break-all">{sentTo}</span>. Check your spam folder if it isn't there in a few minutes.
        </p>
        <button
          type="button"
          onClick={() => setFormStatus('idle')}
          className="mt-6 text-xs font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors cursor-pointer"
        >
          Send another version
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {formStatus === 'error' && (
        <p role="alert" className="text-red-400 text-xs font-semibold leading-relaxed">
          Something went wrong sending your summary. Please try again, or reach us directly at{' '}
          <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a> or{' '}
          <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="text" required autoComplete="name" placeholder="Your name"
            aria-label="Your name"
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
          type="email" required autoComplete="email" placeholder="Email address"
          aria-label="Email address"
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
        <span className="text-xs text-slate-300 leading-relaxed">{MEAL_PREP_FOLLOW_UP_CONSENT_TEXT}</span>
      </label>
      <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
        Optional. Leave it unticked and we'll send the summary and nothing else.
        See our <Link to="/privacy" className={linkClass}>Privacy Policy</Link>.
      </p>
      <button
        type="submit" disabled={formStatus === 'submitting'}
        className={`w-full mt-1 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
          formStatus === 'submitting'
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
            : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent cursor-pointer'
        }`}
      >
        {formStatus === 'submitting' ? 'Sending...' : 'Email Me This Summary'}
      </button>
    </form>
  );
}
