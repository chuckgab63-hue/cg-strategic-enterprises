// Site-wide contact settings. Change the number or email here and every
// click-to-call and mailto link on the site picks it up.

export const PHONE_DISPLAY = '(904) 822-8929';
export const PHONE_HREF = 'tel:+19048228929';
export const PHONE_INTL = '+1-904-822-8929';
export const CALL_ARIA_LABEL = `Call CG Strategic Enterprises at ${PHONE_DISPLAY}`;

export const EMAIL = 'info@cgstrategic.dev';
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const EMAIL_ARIA_LABEL = `Email CG Strategic Enterprises at ${EMAIL}`;

export const BUSINESS_NAME = 'CG Strategic Enterprises';
export const LEGAL_BUSINESS_NAME = 'CG Strategic Enterprises, LLC';
export const BUSINESS_LOCATION = 'Jacksonville, FL';
export const SITE_URL = 'https://www.cgstrategic.dev';

// Mailing address, used in the footer, /contact, the legal pages, and the
// Organization JSON-LD that vite.config.ts injects into index.html.
export const ADDRESS = {
  street: '12220 Atlantic Blvd, Ste 130 1506',
  city: 'Jacksonville',
  region: 'FL',
  postalCode: '32225',
  country: 'US',
};
export const MAILING_ADDRESS_LINES = [
  LEGAL_BUSINESS_NAME,
  ADDRESS.street,
  `${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
];

// Shown on /privacy and /terms. Bump it whenever either page's wording changes.
export const LEGAL_LAST_UPDATED = 'September 30, 2026';

// A2P 10DLC opt-in language. Carrier reviewers check this against the live
// site word for word, and the exact text is sent with every contact-form
// submission as proof of what the visitor agreed to — don't reword casually.
export const SMS_CONSENT_TEXT =
  'I agree to receive text messages from CG Strategic Enterprises about my inquiry, appointments, and project updates. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our Privacy Policy and SMS Terms.';

// Separate, optional marketing opt-ins (A2P 10DLC promotional program and
// CAN-SPAM email). Same rule as above: exact wording, sent with submissions.
export const SMS_MARKETING_CONSENT_TEXT =
  'Yes, send me occasional news, tips, and offers from CG Strategic Enterprises by text. Up to 4 msgs/month. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our Privacy Policy and SMS Terms.';
export const EMAIL_MARKETING_CONSENT_TEXT =
  'Yes, send me occasional news, tips, and offers from CG Strategic Enterprises by email. Unsubscribe anytime.';
