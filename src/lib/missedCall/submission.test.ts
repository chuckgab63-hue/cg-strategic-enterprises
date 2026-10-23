import { describe, it, expect } from 'vitest';
import consent from '../../i18n/consent';
import { DEFAULT_INPUTS } from './model';
import { buildEstimateSubmission, estimateMessage, MISSED_CALL_CALCULATOR_SOURCE, type EstimateContact } from './submission';

const NOW = '2026-10-23T15:00:00.000Z';
const CONTACT: EstimateContact = {
  firstName: '  Pat ', email: ' pat@example.org ', businessName: ' Pat’s Plumbing ', phone: '',
  smsConsent: false, smsMarketingConsent: false, emailMarketingConsent: false,
};

describe('missed-call estimate submission', () => {
  it('uses the contact webhook field names', () => {
    const body = buildEstimateSubmission(CONTACT, DEFAULT_INPUTS, 'en', consent.en, NOW);
    expect(Object.keys(body).sort()).toEqual([
      'business_name', 'email', 'email_marketing_consent', 'first_name', 'language', 'last_name',
      'message', 'name', 'phone', 'sms_consent', 'sms_consent_text', 'sms_marketing_consent', 'source',
    ]);
    expect(body).toMatchObject({
      first_name: 'Pat', last_name: '', name: 'Pat', email: 'pat@example.org', business_name: 'Pat’s Plumbing',
      source: MISSED_CALL_CALCULATOR_SOURCE, language: 'en', sms_consent_text: consent.en.sms,
    });
    expect(MISSED_CALL_CALCULATOR_SOURCE).toBe('missed-call-calculator');
  });

  it('records consent text and timestamps only for what was ticked', () => {
    const body = buildEstimateSubmission(
      { ...CONTACT, phone: '904-555-0100', smsConsent: true, smsMarketingConsent: true, emailMarketingConsent: true },
      DEFAULT_INPUTS, 'es', consent.es, NOW,
    );
    expect(body).toMatchObject({
      sms_consent_timestamp: NOW, marketing_consent_timestamp: NOW,
      sms_marketing_consent_text: consent.es.smsMarketing, sms_consent_text: consent.es.sms, language: 'es',
    });
  });

  it('summarizes inputs, results and a link back in the page language', () => {
    const en = estimateMessage(DEFAULT_INPUTS, 'en');
    expect(en).toContain('- Calls per week: 40');
    expect(en).toContain('- Calls missed: 20%');
    expect(en).toContain('- Recurring: no');
    expect(en).toContain('- Customers lost a month: 6.2');
    expect(en).toContain('- Revenue missed a month: $1,559');
    expect(en).toContain('- Revenue missed a year: $18,706');
    expect(en).toContain('Open this estimate: https://www.cgstrategic.dev/missed-call-calculator');
    expect(en).not.toContain('Value of each customer');

    const es = estimateMessage({ ...DEFAULT_INPUTS, recurring: true }, 'es');
    expect(es).toContain('- Recurrente: 4 visitas al año durante 2 años');
    expect(es).toContain('- Valor de cada cliente: $2,000');
    expect(es).toContain('- Ingresos perdidos por mes: $12,470');
    expect(es).toContain('https://www.cgstrategic.dev/es/missed-call-calculator?repeat=1');
  });
});
