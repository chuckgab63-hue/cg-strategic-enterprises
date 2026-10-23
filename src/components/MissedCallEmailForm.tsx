import React, { useId, useRef, useState } from 'react';
import { CONTACT_WEBHOOK_URL } from '../config/webhooks';
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '../config/site';
import { useLang, useT } from '../i18n/useLang';
import consentDict from '../i18n/consent';
import calculatorDict from '../i18n/missedCallCalculator';
import { ConsentText } from './ContactForm';
import { smsPhoneError } from '../lib/smsPhone';
import { trackEvent } from '../lib/analytics';
import type { MissedCallInputs } from '../lib/missedCall/model';
import { buildEstimateSubmission, MISSED_CALL_HONEYPOT } from '../lib/missedCall/submission';

const EMPTY_FORM = {
  firstName: '', email: '', businessName: '', phone: '',
  smsConsent: false, smsMarketingConsent: false, emailMarketingConsent: false,
  [MISSED_CALL_HONEYPOT]: '',
};

type ConsentField = 'smsConsent' | 'smsMarketingConsent' | 'emailMarketingConsent';

// Same classes as ContactForm so the forms read as one family.
const inputClass = 'w-full bg-slate-950 border focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-base sm:text-sm transition-colors';
const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

// Optional "Email me this estimate" form on /missed-call-calculator. Posts to the
// contact webhook (src/lib/missedCall/submission.ts) with whatever inputs are on
// screen when it's sent. The estimate stays visible whether or not it's used.
export default function MissedCallEmailForm({ inputs }: { inputs: MissedCallInputs }) {
  const t = useT(calculatorDict).form;
  const consent = useT(consentDict);
  const lang = useLang();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sentTo, setSentTo] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameErrorId = useId();
  const phoneId = useId();
  const phoneErrorId = useId();
  const wantsTexts = formData.smsConsent || formData.smsMarketingConsent;
  const phoneCheck = (phone: string, texts: boolean) => smsPhoneError(phone, texts, consent.phoneRequired);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // `required` catches an empty field; this also catches a whitespace-only one.
    if (!formData.firstName.trim()) {
      setNameError(t.firstNameRequired);
      return;
    }
    const smsError = phoneCheck(formData.phone, wantsTexts);
    if (smsError) {
      setPhoneError(smsError);
      phoneRef.current?.focus();
      return;
    }
    const email = formData.email.trim();
    // A filled honeypot is a bot: look like it worked, send nothing.
    if (formData[MISSED_CALL_HONEYPOT]) {
      setSentTo(email);
      setFormStatus('success');
      return;
    }
    setFormStatus('submitting');
    const body = buildEstimateSubmission(formData, inputs, lang, consent, new Date().toISOString());
    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
      setSentTo(email);
      setFormStatus('success');
      setFormData(EMPTY_FORM);
      trackEvent('calculator_emailed', lang);
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
            type="text" required autoComplete="given-name" placeholder={t.firstName}
            aria-label={t.firstName}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? nameErrorId : undefined}
            value={formData.firstName}
            onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); setNameError(''); }}
            className={`${inputClass} ${nameError ? 'border-red-400' : 'border-slate-700'}`}
          />
          {nameError && <p id={nameErrorId} role="alert" className="text-red-400 text-xs font-semibold">{nameError}</p>}
        </div>
        <input
          type="email" required autoComplete="email" placeholder={t.email}
          aria-label={t.email}
          value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`${inputClass} border-slate-700`}
        />
      </div>
      <input
        type="text" autoComplete="organization" placeholder={t.businessName}
        aria-label={t.businessName}
        value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
        className={`${inputClass} border-slate-700`}
      />
      {/* Honeypot, as on /website-check: off-screen, out of the tab order, and
          readOnly with password-manager opt-outs so autofill never trips it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden">
        <label>
          {t.honeypot}
          <input
            type="text" name={MISSED_CALL_HONEYPOT} tabIndex={-1} autoComplete="off" readOnly
            data-lpignore="true" data-1p-ignore="true" data-form-type="other"
            value={formData[MISSED_CALL_HONEYPOT]}
            onChange={(e) => setFormData({ ...formData, [MISSED_CALL_HONEYPOT]: e.target.value })}
          />
        </label>
      </div>
      {/* The phone sits directly above the SMS consent boxes, as on the contact form,
          so it's clear which number the consent applies to. */}
      <div className="flex flex-col gap-2">
        <label htmlFor={phoneId} className="text-xs font-semibold text-slate-300">{t.phone}</label>
        <input
          ref={phoneRef} id={phoneId}
          type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555"
          aria-required={wantsTexts}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? phoneErrorId : undefined}
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
            setPhoneError(phoneCheck(e.target.value, wantsTexts));
          }}
          className={`${inputClass} ${phoneError ? 'border-red-400' : 'border-slate-700'}`}
        />
        {phoneError && <p id={phoneErrorId} role="alert" className="text-red-400 text-xs font-semibold">{phoneError}</p>}
      </div>
      {consent.governingNote && <p className="text-xs text-slate-400 italic">{consent.governingNote}</p>}
      {([
        ['smsConsent', consent.sms],
        ['smsMarketingConsent', consent.smsMarketing],
        ['emailMarketingConsent', consent.emailMarketing],
      ] as [ConsentField, string][]).map(([field, text]) => (
        <label key={field} className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData[field]}
            onChange={(e) => {
              const next = { ...formData, [field]: e.target.checked };
              setFormData(next);
              setPhoneError(phoneCheck(next.phone, next.smsConsent || next.smsMarketingConsent));
            }}
            className="mt-0.5 w-4 h-4 shrink-0 accent-brand-orange cursor-pointer"
          />
          <span className="text-xs text-slate-300 leading-relaxed"><ConsentText text={text} /></span>
        </label>
      ))}
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
