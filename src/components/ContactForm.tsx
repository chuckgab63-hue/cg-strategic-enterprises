import React, { useState, useEffect, useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_WEBHOOK_URL } from '../config/webhooks';
import { SMS_CONSENT_TEXT, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '../config/site';

export interface ContactFormCopy {
  namePlaceholder: string;
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

// Render the consent label straight from the shared constant so the on-screen
// wording and the sms_consent_text sent to Make.com can never drift apart.
const [CONSENT_BEFORE_PRIVACY, CONSENT_AFTER_PRIVACY] = SMS_CONSENT_TEXT.split('Privacy Policy');
const [CONSENT_BETWEEN_LINKS, CONSENT_AFTER_TERMS] = CONSENT_AFTER_PRIVACY.split('SMS Terms');

const EMPTY_FORM = { name: '', email: '', phone: '', message: '', smsConsent: false };

const inputClass = 'w-full bg-slate-950 border focus:border-brand-orange focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors';
const linkClass = 'text-brand-orange underline hover:text-white transition-colors';

export default function ContactForm({ source, copy, initialMessage = '', onSuccess }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ ...EMPTY_FORM, message: initialMessage });
  const [phoneError, setPhoneError] = useState('');
  const phoneErrorId = useId();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.smsConsent && !formData.phone.trim()) {
      setPhoneError('Please enter a mobile number so we can text you, or uncheck the text message box.');
      return;
    }
    setFormStatus('submitting');
    const { smsConsent, ...fields } = formData;
    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          source,
          sms_consent: smsConsent,
          sms_consent_text: SMS_CONSENT_TEXT,
          ...(smsConsent && { sms_consent_timestamp: new Date().toISOString() }),
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
      <input
        type="text" required autoComplete="name" placeholder={copy.namePlaceholder}
        aria-label="Name"
        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
        className={`${inputClass} border-slate-700`}
      />
      <input
        type="email" required autoComplete="email" placeholder={copy.emailPlaceholder}
        aria-label="Email"
        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
        className={`${inputClass} border-slate-700`}
      />
      <input
        type="tel" autoComplete="tel" placeholder="Mobile phone (optional)"
        aria-label="Mobile phone (optional)"
        aria-invalid={phoneError ? true : undefined}
        aria-describedby={phoneError ? phoneErrorId : undefined}
        value={formData.phone}
        onChange={(e) => { setFormData({...formData, phone: e.target.value}); setPhoneError(''); }}
        className={`${inputClass} ${phoneError ? 'border-red-400' : 'border-slate-700'}`}
      />
      {phoneError && (
        <p id={phoneErrorId} role="alert" className="text-red-400 text-xs font-semibold -mt-2">
          {phoneError}
        </p>
      )}
      <textarea
        required placeholder={copy.messagePlaceholder} rows={4}
        aria-label="Message"
        value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
        className={`${inputClass} border-slate-700 resize-none`}
      />
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.smsConsent}
          onChange={(e) => { setFormData({...formData, smsConsent: e.target.checked}); setPhoneError(''); }}
          className="mt-0.5 w-4 h-4 shrink-0 accent-brand-orange cursor-pointer"
        />
        <span className="text-xs text-slate-300 leading-relaxed">
          {CONSENT_BEFORE_PRIVACY}
          <Link to="/privacy" className={linkClass}>Privacy Policy</Link>
          {CONSENT_BETWEEN_LINKS}
          <Link to="/terms#sms" className={linkClass}>SMS Terms</Link>
          {CONSENT_AFTER_TERMS}
        </span>
      </label>
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
