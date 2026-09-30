import type { ReactNode } from 'react';
import ContactForm, { type ContactFormCopy } from '../components/ContactForm';
import usePageMeta from '../hooks/usePageMeta';
import MailingAddress from '../components/MailingAddress';
import {
  BUSINESS_NAME, BUSINESS_LOCATION, EMAIL, EMAIL_HREF, EMAIL_ARIA_LABEL, PHONE_DISPLAY, PHONE_HREF, CALL_ARIA_LABEL,
} from '../config/site';

const FORM_COPY: ContactFormCopy = {
  firstNamePlaceholder: 'First name',
  lastNamePlaceholder: 'Last name',
  emailPlaceholder: 'Email Address',
  messagePlaceholder: 'How can we help you?',
  submitLabel: 'Send Message',
  submittingLabel: 'Sending...',
  successTitle: 'Message Sent',
  successMessage: "Thanks for reaching out. We've received your message and will be in touch shortly.",
};

const ICON_PATHS = {
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
};

function ContactMethod({ icon, label, className = '', children }: { icon: keyof typeof ICON_PATHS; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 ${className}`.trim()}>
      <svg className="w-5 h-5 mt-0.5 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={ICON_PATHS[icon]}></path>
      </svg>
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-bold tracking-widest uppercase text-slate-500">{label}</span>
        {children}
      </div>
    </div>
  );
}

const methodLinkClass = 'text-sm font-bold tracking-wide text-slate-200 hover:text-brand-orange transition-colors break-words';

export default function Contact() {
  usePageMeta(
    `Contact | ${BUSINESS_NAME}`,
    `Contact ${BUSINESS_NAME} in ${BUSINESS_LOCATION}. Call ${PHONE_DISPLAY}, email ${EMAIL}, or send us a message about your web, AI, or automation project.`,
  );

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-left">
      <h1 className="text-4xl md:text-5xl font-black text-white">Contact {BUSINESS_NAME}</h1>
      <p className="text-slate-300 text-base leading-relaxed mt-4 mb-10">
        Tell us about your project or ask a question. Call, email, or send a message below and
        we'll get back to you shortly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <ContactMethod icon="phone" label="Phone">
          <a href={PHONE_HREF} aria-label={CALL_ARIA_LABEL} className={methodLinkClass}>{PHONE_DISPLAY}</a>
        </ContactMethod>
        <ContactMethod icon="email" label="Email">
          <a href={EMAIL_HREF} aria-label={EMAIL_ARIA_LABEL} className={methodLinkClass}>
            {EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}
          </a>
        </ContactMethod>
        <ContactMethod icon="location" label="Mailing Address" className="sm:col-span-2">
          <MailingAddress className="text-sm font-bold tracking-wide leading-relaxed text-slate-200" />
        </ContactMethod>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
          <h2 className="text-white font-bold text-lg">Send Us a Message</h2>
        </div>
        <ContactForm source="Contact page" copy={FORM_COPY} />
      </div>
    </section>
  );
}
