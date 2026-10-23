// The Website Check form as the server sees it: validation, the honeypot, and
// the JSON sent to Make (MAKE_WEBSITE_CHECK_WEBHOOK). The page posts JSON
// (src/pages/WebsiteCheck.tsx); the lead fields and consent fields use the same
// names ContactForm sends, so existing Make mappings carry over.

import { smsPhoneError } from '../smsPhone.js';
import type { Report } from './report.js';
import type { ReportLang } from './reportCopy.js';

export const WEBSITE_CHECK_SOURCE = 'website-check';

/** Hidden field real visitors never see or fill in. Not "website": that's the real URL field here. */
export const WEBSITE_CHECK_HONEYPOT = 'company_site';

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

/** The full report as posted to Make. Field names are snake_case like the other Make webhooks. */
export function makePayload(lead: Lead, report: Report, opts: { now: Date; cached: boolean }) {
  const now = opts.now.toISOString();
  const psi = (r: Report['pagespeed']['mobile']) => r && {
    performance_score: r.performance,
    lcp_ms: r.lcpMs,
    cls: r.cls,
    inp_ms: r.inpMs,
    metrics_source: r.metricsSource,
    opportunities: r.opportunities.map(o => ({ id: o.id, title: o.title, savings_ms: o.savingsMs })),
  };
  const c = report.checks;
  return {
    source: WEBSITE_CHECK_SOURCE,
    language: report.language,
    submitted_at: now,
    first_name: lead.firstName,
    email: lead.email,
    business_name: lead.businessName,
    phone: lead.phone,
    sms_consent: lead.smsConsent,
    sms_consent_text: lead.smsConsentText,
    ...(lead.smsConsent && { sms_consent_timestamp: now }),
    sms_marketing_consent: lead.smsMarketingConsent,
    ...(lead.smsMarketingConsent && { sms_marketing_consent_text: lead.smsMarketingConsentText }),
    email_marketing_consent: lead.emailMarketingConsent,
    ...((lead.smsMarketingConsent || lead.emailMarketingConsent) && { marketing_consent_timestamp: now }),
    website: {
      domain: report.domain,
      final_url: report.finalUrl,
      checked_at: report.checkedAt,
      from_cache: opts.cached,
    },
    scores: {
      overall: report.scores.overall,
      speed: report.scores.speed,
      mobile: report.scores.mobile,
      search_basics: report.scores.searchBasics,
      missed_call_risk: report.scores.missedCallRisk,
    },
    pagespeed: {
      mobile: psi(report.pagespeed.mobile),
      desktop: psi(report.pagespeed.desktop),
    },
    checks: {
      https: c.https,
      title: c.title.present,
      title_text: c.title.text,
      meta_description: c.metaDescription.present,
      meta_description_length: c.metaDescription.length,
      h1_count: c.h1.count,
      single_h1: c.h1.single,
      viewport: c.viewport,
      structured_data: c.structuredData.present,
      structured_data_types: c.structuredData.types,
      tel_link: c.telLink,
      contact_form: c.contactForm,
      booking: c.booking.present,
      booking_tools: c.booking.tools,
      chat_widget: c.chatWidget.present,
      chat_tools: c.chatWidget.tools,
      after_hours: c.afterHours.present,
      after_hours_evidence: c.afterHours.evidence,
      content_limited: c.contentLimited,
      html_truncated: report.htmlTruncated,
    },
    search_basics: {
      passed: report.search.passed,
      missed: report.search.missed,
    },
    missed_call_risk: {
      level: report.risk.level,
      reasons: report.risk.reasons,
      reason_text: report.risk.reasonText,
    },
    ai: {
      summary: report.ai.summary,
      fixes: report.ai.fixes,
      generated_by: report.ai.generatedBy,
    },
  };
}

export type MakePayload = ReturnType<typeof makePayload>;

/** The short version the page shows right away: no lead details, no raw checks. */
export function pageSummary(report: Report) {
  const metrics = (r: Report['pagespeed']['mobile']) => r && { lcp_ms: r.lcpMs, cls: r.cls, inp_ms: r.inpMs, metrics_source: r.metricsSource };
  return {
    domain: report.domain,
    scores: {
      overall: report.scores.overall,
      speed: report.scores.speed,
      mobile: report.scores.mobile,
      search_basics: report.scores.searchBasics,
      missed_call_risk: report.scores.missedCallRisk,
    },
    metrics: { mobile: metrics(report.pagespeed.mobile), desktop: metrics(report.pagespeed.desktop) },
    search_missed: report.search.missed,
    risk_reasons: report.risk.reasonText,
    summary: report.ai.summary,
    fixes: report.ai.fixes,
    content_limited: report.checks.contentLimited,
  };
}

export type PageSummary = ReturnType<typeof pageSummary>;
