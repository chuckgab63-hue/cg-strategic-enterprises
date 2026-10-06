// Server side of the static SMS opt-in page (public/sms-opt-in.html), used by
// api/sms-opt-in.ts. That page exists because carrier (A2P 10DLC) reviewers
// fetch pages without JavaScript and see nothing of the React /contact form.
//
// The page posts a plain urlencoded form here rather than straight to Make so
// that it works without JavaScript: this builds the same JSON ContactForm sends
// (real booleans, a consent timestamp, the consent text from site.ts), drops
// honeypot hits before they reach the Leads sheet, and lets the function
// redirect to a thank-you page instead of leaving the visitor on Make's JSON.
//
// Imports carry .js extensions because the Vercel function runs this as native
// ESM, which doesn't resolve extensionless paths.

import {
  SMS_CONSENT_TEXT, BUSINESS_NAME, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF,
} from '../config/site.js';
import { smsPhoneError } from './smsPhone.js';

export const SMS_OPT_IN_SOURCE = 'SMS opt-in page';
export const SMS_OPT_IN_THANKS_PATH = '/sms-opt-in-thanks.html';

/** Hidden field real visitors never see or fill in. */
export const HONEYPOT_FIELD = 'website';

/**
 * US numbers in the usual shapes: 9045550100, (904) 555-0100, +1 904.555.0100.
 * public/sms-opt-in.html uses this same string as its `pattern` attribute, so it
 * has to stay valid under the `v` flag browsers compile patterns with.
 */
export const PHONE_PATTERN = String.raw`\+?1?[\s.\-]*\(?[0-9]{3}\)?[\s.\-]*[0-9]{3}[\s.\-]*[0-9]{4}`;
const PHONE_RE = new RegExp(`^(?:${PHONE_PATTERN})$`, 'v');

const MAX_LENGTH = { name: 100, email: 254, phone: 30, message: 5000 };

export interface OptInPayload {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  message: string;
  phone: string;
  source: string;
  sms_consent: boolean;
  sms_consent_text: string;
  sms_consent_timestamp?: string;
  sms_marketing_consent: boolean;
  email_marketing_consent: boolean;
}

export type OptInResult =
  | { kind: 'ok'; payload: OptInPayload }
  | { kind: 'spam' }
  | { kind: 'invalid'; errors: string[] };

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  // A repeated field arrives as an array; only the first copy counts.
  const first = Array.isArray(value) ? value[0] : value;
  return typeof first === 'string' ? first.trim() : '';
}

/** Validate a parsed form body and build the webhook payload. */
export function processOptIn(body: Record<string, unknown>, now: Date = new Date()): OptInResult {
  if (field(body, HONEYPOT_FIELD)) return { kind: 'spam' };

  const firstName = field(body, 'first_name');
  const lastName = field(body, 'last_name');
  const email = field(body, 'email');
  const phone = field(body, 'phone');
  const message = field(body, 'message');
  // Unticked checkboxes aren't sent at all; a ticked one sends its value.
  const smsConsent = field(body, 'sms_consent') !== '';

  const errors: string[] = [];
  if (!firstName) errors.push('Please enter your first name.');
  if (!lastName) errors.push('Please enter your last name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
  if (!message) errors.push('Please enter a message.');
  const smsError = smsPhoneError(phone, smsConsent);
  if (smsError) errors.push(smsError);
  else if (phone && !PHONE_RE.test(phone)) errors.push('Please enter a 10-digit US mobile phone number.');
  if (
    firstName.length > MAX_LENGTH.name || lastName.length > MAX_LENGTH.name
    || email.length > MAX_LENGTH.email || phone.length > MAX_LENGTH.phone
    || message.length > MAX_LENGTH.message
  ) {
    errors.push('One of the fields is too long. Please shorten it and try again.');
  }
  if (errors.length) return { kind: 'invalid', errors };

  return {
    kind: 'ok',
    payload: {
      first_name: firstName,
      last_name: lastName,
      name: `${firstName} ${lastName}`,
      email,
      message,
      phone,
      source: SMS_OPT_IN_SOURCE,
      sms_consent: smsConsent,
      sms_consent_text: SMS_CONSENT_TEXT,
      ...(smsConsent && { sms_consent_timestamp: now.toISOString() }),
      // This page only offers the service-message box; sent so the Leads sheet
      // columns read the same as rows from the contact form.
      sms_marketing_consent: false,
      email_marketing_consent: false,
    },
  };
}

/**
 * A bare HTML page for when the form can't be accepted. Visitors with
 * JavaScript, or a browser that enforces the form's own attributes, rarely see
 * it. The messages are fixed strings, never echoed input.
 */
export function renderProblemPage(heading: string, lines: string[]): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${heading} | ${BUSINESS_NAME}</title>
<style>
  body { margin: 0; min-height: 100vh; background: #020617; color: #cbd5e1; font: 16px/1.6 system-ui, 'Segoe UI', Roboto, sans-serif; }
  main { max-width: 36rem; margin: 0 auto; padding: 4rem 1rem; }
  h1 { color: #fff; font-size: 1.75rem; margin: 0 0 1rem; }
  li { color: #f87171; }
  a { color: #FF5F1F; }
</style>
</head>
<body>
<main>
<h1>${heading}</h1>
<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>
<p><a href="/sms-opt-in.html">Back to the form</a>. You can also email <a href="${EMAIL_HREF}">${EMAIL}</a> or call <a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>.</p>
</main>
</body>
</html>`;
}
