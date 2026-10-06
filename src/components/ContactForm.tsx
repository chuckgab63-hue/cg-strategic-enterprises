import React, { useState, useEffect, useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_WEBHOOK_URL } from '../config/webhooks';
import {
  SMS_CONSENT_TEXT, SMS_MARKETING_CONSENT_TEXT, EMAIL_MARKETING_CONSENT_TEXT,
  EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF,
} from '../config/site';
import { smsPhoneError } from '../lib/smsPhone';

export interface ContactFormCopy {
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successMessage: string;
}

interface ContactFormProps {
  /** Tags this submission so the leads sheet shows where it came from. */
  source: string;
  copy: ContactFormCopy;
  initialMessage?: string;
  /**
   * Called a few seconds after a successful send (the modal uses this to close
   * itself). Without it, the success message stays up with a "send another" option.
   */
  onSuccess?: () => void;
}

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', phone: '', message: '',
  smsConsent: false, smsMarketingConsent: false, emailMarketingConsent: false,
};

type ConsentField = 'smsConsent' | 'smsMarketingConsent' | 'emailMarketingConsent';

const inputClass = 'w-full bg-slate-950 border focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors';
const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

// Render consent labels straight from the shared constants so the on-screen
// wording and the consent text sent to Make.com can never drift apart.
// "Privacy Policy" and "SMS Terms" become links wherever they appear.
function ConsentText({ text }: { text: string }) {
  return text.split(/(Privacy Policy|SMS Terms)/).map((part, i) => {
    if (part === 'Privacy Policy') return <Link key={i} to="/privacy" className={linkClass}>Privacy Policy</Link>;
    if (part === 'SMS Terms') return <Link key={i} to="/terms#sms" className={linkClass}>SMS Terms</Link>;
    return part;
  });
}

export default function ContactForm({ source, copy, initialMessage = '', onSuccess }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ ...EMPTY_FORM, message: initialMessage });
  const [phoneError, setPhoneError] = useState('');
  const [nameErrors, setNameErrors] = useState({ firstName: '', lastName: '' });
  const phoneRef = useRef<HTMLInputElement>(null);
  const phoneId = useId();
  const phoneErrorId = useId();
  const firstNameErrorId = useId();
  const lastNameErrorId = useId();

  // Pre-fill the message if the user clicked a specific workflow button
  useEffect(() => {
    setFormData(prev => ({ ...prev, message: initialMessage }));
  }, [initialMessage]);

  // Callers usually pass an inline arrow, so read it through a ref rather than
  // restarting the timer on every parent re-render.
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => { onSuccessRef.current = onSuccess; });

  useEffect(() => {
    if (formStatus !== 'success' || !onSuccessRef.current) return;
    const timer = setTimeout(() => onSuccessRef.current?.(), 3000);
    return () => clearTimeout(timer);
  }, [formStatus]);

  const wantsTexts = formData.smsConsent || formData.smsMarketingConsent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    // `required` catches empty fields; this also catches whitespace-only ones.
    if (!firstName || !lastName) {
      setNameErrors({
        firstName: firstName ? '' : 'Please enter your first name.',
        lastName: lastName ? '' : 'Please enter your last name.',
      });
      return;
    }
    const smsError = smsPhoneError(formData.phone, wantsTexts);
    if (smsError) {
      setPhoneError(smsError);
      phoneRef.current?.focus();
      return;
    }
    setFormStatus('submitting');
    const { firstName: _first, lastName: _last, phone, smsConsent, smsMarketingConsent, emailMarketingConsent, ...fields } = formData;
    const now = new Date().toISOString();
    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          // Kept alongside the split fields so existing Make.com mappings keep working.
          name: `${firstName} ${lastName}`.trim(),
          ...fields,
          phone: phone.trim(),
          source,
          sms_consent: smsConsent,
          sms_consent_text: SMS_CONSENT_TEXT,
          ...(smsConsent && { sms_consent_timestamp: now }),
          sms_marketing_consent: smsMarketingConsent,
          ...(smsMarketingConsent && { sms_marketing_consent_text: SMS_MARKETING_CONSENT_TEXT }),
          email_marketing_consent: emailMarketingConsent,
          ...((smsMarketingConsent || emailMarketingConsent) && { marketing_consent_timestamp: now }),
        }),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
      setFormStatus('success');
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error('Webhook failed:', error);
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div role="status" className="h-full flex flex-col items-center justify-center text-center py-10">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h5 className="text-emerald-400 font-bold mb-2">{copy.successTitle}</h5>
        <p className="text-slate-400 text-sm">{copy.successMessage}</p>
        {!onSuccess && (
          <button
            type="button"
            onClick={() => setFormStatus('idle')}
            className="mt-6 text-xs font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors cursor-pointer"
          >
            Send another message
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {formStatus === 'error' && (
        <p role="alert" className="text-red-400 text-xs font-semibold leading-relaxed">
          Something went wrong sending your message. Please try again, or reach us directly at{' '}
          <a href={EMAIL_HREF} className={linkClass}>{EMAIL}</a> or{' '}
          <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([
          ['firstName', 'given-name', 'First name', copy.firstNamePlaceholder, firstNameErrorId],
          ['lastName', 'family-name', 'Last name', copy.lastNamePlaceholder, lastNameErrorId],
        ] as const).map(([field, autoComplete, label, placeholder, errorId]) => (
          <div key={field} className="flex flex-col gap-2">
            <input
              type="text" required autoComplete={autoComplete} placeholder={placeholder}
              aria-label={label}
              aria-invalid={nameErrors[field] ? true : undefined}
              aria-describedby={nameErrors[field] ? errorId : undefined}
              value={formData[field]}
              onChange={(e) => { setFormData({...formData, [field]: e.target.value}); setNameErrors({...nameErrors, [field]: ''}); }}
              className={`${inputClass} ${nameErrors[field] ? 'border-red-400' : 'border-slate-700'}`}
            />
            {nameErrors[field] && (
              <p id={errorId} role="alert" className="text-red-400 text-xs font-semibold">
                {nameErrors[field]}
              </p>
            )}
          </div>
        ))}
      </div>
      <input
        type="email" required autoComplete="email" placeholder={copy.emailPlaceholder}
        aria-label="Email"
        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
        className={`${inputClass} border-slate-700`}
      />
      <textarea
        required placeholder={copy.messagePlaceholder} rows={4}
        aria-label="Message"
        value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
        className={`${inputClass} border-slate-700 resize-none`}
      />
      {/* The phone sits directly above the SMS consent box so carrier (A2P) reviewers
          can see which number the consent applies to. Optional unless a text box is ticked. */}
      <div className="flex flex-col gap-2">
        <label htmlFor={phoneId} className="text-xs font-semibold text-slate-300">
          Mobile phone number
        </label>
        <input
          ref={phoneRef} id={phoneId}
          type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555"
          aria-required={wantsTexts}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? phoneErrorId : undefined}
          value={formData.phone}
          onChange={(e) => {
            setFormData({...formData, phone: e.target.value});
            // Catches clearing the number after ticking a text box, not just on submit.
            setPhoneError(smsPhoneError(e.target.value, wantsTexts));
          }}
          className={`${inputClass} ${phoneError ? 'border-red-400' : 'border-slate-700'}`}
        />
        {phoneError && (
          <p id={phoneErrorId} role="alert" className="text-red-400 text-xs font-semibold">
            {phoneError}
          </p>
        )}
      </div>
      {([
        ['smsConsent', SMS_CONSENT_TEXT],
        ['smsMarketingConsent', SMS_MARKETING_CONSENT_TEXT],
        ['emailMarketingConsent', EMAIL_MARKETING_CONSENT_TEXT],
      ] as [ConsentField, string][]).map(([field, text]) => (
        <label key={field} className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData[field]}
            onChange={(e) => {
              const next = {...formData, [field]: e.target.checked};
              setFormData(next);
              setPhoneError(smsPhoneError(next.phone, next.smsConsent || next.smsMarketingConsent));
            }}
            className="mt-0.5 w-4 h-4 shrink-0 accent-brand-orange cursor-pointer"
          />
          <span className="text-xs text-slate-300 leading-relaxed">
            <ConsentText text={text} />
          </span>
        </label>
      ))}
      <button
        type="submit" disabled={formStatus === 'submitting'}
        className={`w-full mt-2 py-3 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] ${
          formStatus === 'submitting'
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
            : 'bg-brand-orange text-white hover:bg-white hover:text-brand-orange border border-transparent cursor-pointer'
        }`}
      >
        {formStatus === 'submitting' ? copy.submittingLabel : copy.submitLabel}
      </button>
    </form>
  );
}
