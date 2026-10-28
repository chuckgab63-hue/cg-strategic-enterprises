// The Website Check form as the server sees it: validation, the honeypot, and
// the lead sent to Make. The page posts JSON (src/pages/WebsiteCheck.tsx).
// The report goes to the same Make webhook as the contact form and the
// missed-call calculator (CONTACT_WEBHOOK_URL, scenario "Website Contact
// Intake"), with the same field names, so it lands in the Leads sheet; that
// scenario emails the visitor their report when source is "website-check".
//
// Spanish report labels: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { smsPhoneError } from '../smsPhone.js';
import type { Report } from './report.js';
import type { ReportLang } from './reportCopy.js';

export const WEBSITE_CHECK_SOURCE = 'website-check';

/**
 * Hidden field real visitors never see or fill in. Deliberately meaningless:
 * the first version was "company_site" and browser autofill filled it for
 * real visitors, who then got the bot response instead of their results.
 * The page also marks it readOnly, which autofill skips.
 */
export const WEBSITE_CHECK_HONEYPOT = 'cg_hp_7f3';

export type LeadError = 'website_required' | 'first_name_required' | 'email_invalid' | 'phone_required';

export interface Lead {
  firstName: string;
  email: string;
  businessName: string;
  phone: string;
  smsConsent: boolean;
  smsConsentText: string;
  smsMarketingConsent: boolean;
  smsMarketingConsentText: string;
  emailMarketingConsent: boolean;
}

export type ParsedRequest =
  | { kind: 'spam' }
  | { kind: 'invalid'; errors: LeadError[]; language: ReportLang }
  | { kind: 'ok'; lead: Lead; websiteUrl: string; language: ReportLang; turnstileToken: string };

const str = (body: Record<string, unknown>, key: string, max: number) => {
  const v = body[key];
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
};
const bool = (body: Record<string, unknown>, key: string) => body[key] === true;

export function parseWebsiteCheckRequest(body: Record<string, unknown>): ParsedRequest {
  if (str(body, WEBSITE_CHECK_HONEYPOT, 500)) return { kind: 'spam' };
  const language: ReportLang = body.language === 'es' ? 'es' : 'en';

  const lead: Lead = {
    firstName: str(body, 'first_name', 100),
    email: str(body, 'email', 254),
    businessName: str(body, 'business_name', 200),
    phone: str(body, 'phone', 30),
    smsConsent: bool(body, 'sms_consent'),
    // The wording the visitor saw (Spanish on /es), as ContactForm sends it.
    smsConsentText: str(body, 'sms_consent_text', 1000),
    smsMarketingConsent: bool(body, 'sms_marketing_consent'),
    smsMarketingConsentText: str(body, 'sms_marketing_consent_text', 1000),
    emailMarketingConsent: bool(body, 'email_marketing_consent'),
  };
  const websiteUrl = str(body, 'website_url', 2048);

  const errors: LeadError[] = [];
  if (!websiteUrl) errors.push('website_required');
  if (!lead.firstName) errors.push('first_name_required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push('email_invalid');
  if (smsPhoneError(lead.phone, lead.smsConsent || lead.smsMarketingConsent)) errors.push('phone_required');
  if (errors.length) return { kind: 'invalid', errors, language };

  return { kind: 'ok', lead, websiteUrl, language, turnstileToken: str(body, 'turnstile_token', 4096) };
}

// Labels for the plain-text report, worded like the results page (src/i18n/websiteCheck.ts).
const MESSAGE_LABELS = {
  en: {
    heading: 'Website check for',
    overall: 'Overall score',
    mobile: 'Mobile speed',
    speed: 'Desktop speed',
    search: 'Search basics',
    risk: 'Missed-call risk',
    riskLevels: { low: 'Low', medium: 'Medium', high: 'High' },
    notMeasured: 'not available this time',
    partial: "Some parts couldn't be checked this time, so their scores are missing.",
    summary: 'Summary',
    fixes: 'Top fixes',
  },
  es: {
    heading: 'Revisión del sitio web',
    overall: 'Puntuación general',
    mobile: 'Velocidad en celulares',
    speed: 'Velocidad en computadora',
    search: 'Básicos de búsqueda',
    risk: 'Riesgo de llamadas perdidas',
    riskLevels: { low: 'Bajo', medium: 'Medio', high: 'Alto' },
    notMeasured: 'no disponible esta vez',
    partial: 'Algunas partes no se pudieron revisar esta vez, así que falta su puntuación.',
    summary: 'Resumen',
    fixes: 'Mejoras principales',
  },
} satisfies Record<ReportLang, unknown>;

/**
 * The report as plain text for the "message" field: the checked URL, the
 * overall score, the four sub-scores and the top fixes. Make puts it in the
 * Leads sheet, the lead email to us and the report email to the visitor.
 */
export function reportMessage(report: Report): string {
  const t = MESSAGE_LABELS[report.language];
  const score = (n: number | null) => (n === null ? t.notMeasured : `${n}/100`);
  const s = report.scores;
  const lines = [
    `${t.heading} ${report.finalUrl}`,
    '',
    `${t.overall}: ${score(s.overall)}`,
    `${t.mobile}: ${score(s.mobile)}`,
    `${t.speed}: ${score(s.speed)}`,
    `${t.search}: ${score(s.searchBasics)}`,
    `${t.risk}: ${s.missedCallRisk ? t.riskLevels[s.missedCallRisk] : t.notMeasured}`,
  ];
  if (report.status === 'partial') lines.push('', t.partial);
  lines.push('', `${t.summary}:`, report.ai.summary);
  if (report.ai.fixes.length) {
    lines.push('', `${t.fixes}:`);
    report.ai.fixes.forEach((fix, i) => lines.push(`${i + 1}. ${fix.title}: ${fix.detail}`));
  }
  return lines.join('\n');
}

/**
 * The lead and report as posted to the contact webhook. Same fields as the
 * contact form and the missed-call calculator, so the Leads sheet columns and
 * the scenario's mappings line up.
 */
export function contactIntakePayload(lead: Lead, report: Report, opts: { now: Date }) {
  const now = opts.now.toISOString();
  return {
    first_name: lead.firstName,
    // The form only asks for a first name; kept so the sheet's columns line up.
    last_name: '',
    name: lead.firstName,
    email: lead.email,
    phone: lead.phone,
    business_name: lead.businessName,
    message: reportMessage(report),
    source: WEBSITE_CHECK_SOURCE,
    language: report.language,
    sms_consent: lead.smsConsent,
    sms_consent_text: lead.smsConsentText,
    ...(lead.smsConsent && { sms_consent_timestamp: now }),
    sms_marketing_consent: lead.smsMarketingConsent,
    ...(lead.smsMarketingConsent && { sms_marketing_consent_text: lead.smsMarketingConsentText }),
    email_marketing_consent: lead.emailMarketingConsent,
    ...((lead.smsMarketingConsent || lead.emailMarketingConsent) && { marketing_consent_timestamp: now }),
  };
}

export type ContactIntakePayload = ReturnType<typeof contactIntakePayload>;

/** The short version the page shows right away: no lead details, no raw checks. */
export function pageSummary(report: Report) {
  const metrics = (r: Report['pagespeed']['mobile']) => r && { lcp_ms: r.lcpMs, cls: r.cls, inp_ms: r.inpMs, metrics_source: r.metricsSource };
  return {
    domain: report.domain,
    page: report.page,
    scores: {
      overall: report.scores.overall,
      speed: report.scores.speed,
      mobile: report.scores.mobile,
      search_basics: report.scores.searchBasics,
      missed_call_risk: report.scores.missedCallRisk,
    },
    metrics: { mobile: metrics(report.pagespeed.mobile), desktop: metrics(report.pagespeed.desktop) },
    search_missed: report.search?.missed ?? null,
    risk_reasons: report.risk?.reasonText ?? [],
    summary: report.ai.summary,
    fixes: report.ai.fixes,
    content_limited: report.checks?.contentLimited ?? false,
  };
}

export type PageSummary = ReturnType<typeof pageSummary>;
