import { describe, it, expect } from 'vitest';
import { SMS_CONSENT_TEXT } from '../config/site';
import { SMS_PHONE_REQUIRED_MESSAGE } from './smsPhone';
import { PHONE_PATTERN, HONEYPOT_FIELD } from './smsOptIn';
import html from '../../public/sms-opt-in.html?raw';

// public/sms-opt-in.html is hand-maintained static HTML (it has to work with no
// JavaScript and no build step), so these checks stop it drifting from the
// constants the React form and api/sms-opt-in.ts use.

const decode = (s: string) => s
  .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const visibleText = (s: string) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ');

describe('public/sms-opt-in.html', () => {
  it('shows the SMS consent text word for word', () => {
    const label = html.match(/<label class="consent">([\s\S]*?)<\/label>/)?.[1] ?? '';
    expect(visibleText(label).trim()).toBe(SMS_CONSENT_TEXT);
  });

  it('labels the phone "Mobile phone number" and puts it directly above the consent box', () => {
    const form = html.match(/<form[\s\S]*?<\/form>/)?.[0] ?? '';
    const controls = [...form.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)]
      .map(m => m[1])
      .filter(name => name !== HONEYPOT_FIELD);
    expect(controls).toEqual(['first_name', 'last_name', 'email', 'message', 'phone', 'sms_consent']);
    expect(form).toMatch(/<label class="field-label" for="phone">Mobile phone number<\/label>/);
  });

  it('posts to the opt-in function', () => {
    expect(html).toMatch(/<form id="opt-in-form" method="post" action="\/api\/sms-opt-in">/);
  });

  it('uses the same phone pattern as the server', () => {
    expect(decode(html.match(/pattern="([^"]+)"/)?.[1] ?? '')).toBe(PHONE_PATTERN);
  });

  it('uses the shared phone-required message', () => {
    expect(html).toContain(SMS_PHONE_REQUIRED_MESSAGE);
  });

  it('links the privacy policy and terms', () => {
    expect(html).toContain('href="/privacy"');
    expect(html).toContain('href="/terms#sms"');
  });
});
