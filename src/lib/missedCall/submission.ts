// Builds the POST body for the missed-call calculator's "Email me this estimate"
// form. It goes to the existing contact webhook, so it uses the contact form's
// field names (Make.com maps fields by name; submission.test.ts pins the keys).
// The inputs and results travel as a readable `message` in the page language.

import { SITE_URL } from '../../config/site';
import calculatorDict from '../../i18n/missedCallCalculator';
import type { Lang } from '../../i18n/lang';
import { calculateMissedCalls, type MissedCallInputs } from './model';
import { formatCount, formatMoney, formatPct } from './format';
import { missedCallCalculatorUrl } from './url';

export const MISSED_CALL_CALCULATOR_SOURCE = 'missed-call-calculator';

/**
 * Hidden form field that people never see or fill in. Bots that fill every
 * field get a normal-looking success and nothing is sent. A neutral name so
 * browsers don't autofill it (see the Website Check fix in 2539ff8).
 */
export const MISSED_CALL_HONEYPOT = 'cg_hp_mc4';

export interface EstimateContact {
  firstName: string;
  email: string;
  businessName: string;
  phone: string;
  smsConsent: boolean;
  smsMarketingConsent: boolean;
  emailMarketingConsent: boolean;
}

/** The consent wording the visitor saw, in their language (src/i18n/consent.ts). */
export interface ConsentWording {
  sms: string;
  smsMarketing: string;
}

/** Link back to these inputs on the canonical site, never localhost or a preview. */
export function estimateLink(inputs: MissedCallInputs, lang: Lang): string {
  return missedCallCalculatorUrl(inputs, lang === 'es' ? `${SITE_URL}/es` : SITE_URL);
}

/** The readable estimate that goes in `message`. */
export function estimateMessage(inputs: MissedCallInputs, lang: Lang): string {
  const r = calculateMissedCalls(inputs);
  const count = (n: number) => formatCount(n, lang);
  const money = (n: number) => formatMoney(n, lang);
  const pct = (n: number) => formatPct(n, lang);
  return calculatorDict[lang].summary({
    calls: count(inputs.callsPerWeek),
    missedPct: pct(inputs.missedPct),
    noCallbackPct: pct(inputs.noCallbackPct),
    conversionPct: pct(inputs.conversionPct),
    value: money(inputs.customerValue),
    recurring: inputs.recurring,
    visits: count(inputs.visitsPerYear),
    years: count(inputs.yearsRetained),
    missed: count(r.missedPerWeek),
    lostCallers: count(r.lostCallersPerWeek),
    lostCustomers: count(r.lostCustomersPerMonth),
    valuePerCustomer: money(r.valuePerCustomer),
    perMonth: money(r.lostRevenuePerMonth),
    perYear: money(r.lostRevenuePerYear),
    link: estimateLink(inputs, lang),
  });
}

export function buildEstimateSubmission(
  contact: EstimateContact,
  inputs: MissedCallInputs,
  lang: Lang,
  consent: ConsentWording,
  /** When the form was sent, as an ISO string. */
  now: string,
) {
  const firstName = contact.firstName.trim();
  return {
    first_name: firstName,
    // The calculator only asks for a first name; kept so the sheet's columns line up.
    last_name: '',
    name: firstName,
    email: contact.email.trim(),
    phone: contact.phone.trim(),
    business_name: contact.businessName.trim(),
    message: estimateMessage(inputs, lang),
    source: MISSED_CALL_CALCULATOR_SOURCE,
    language: lang,
    sms_consent: contact.smsConsent,
    sms_consent_text: consent.sms,
    ...(contact.smsConsent && { sms_consent_timestamp: now }),
    sms_marketing_consent: contact.smsMarketingConsent,
    ...(contact.smsMarketingConsent && { sms_marketing_consent_text: consent.smsMarketing }),
    email_marketing_consent: contact.emailMarketingConsent,
    ...((contact.smsMarketingConsent || contact.emailMarketingConsent) && { marketing_consent_timestamp: now }),
  };
}
