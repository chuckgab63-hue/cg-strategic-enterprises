import { describe, expect, it } from 'vitest';
import { BOOKING_BASE_URL, bookingUrl } from './booking';
import common from '../i18n/common';

describe('booking link', () => {
  it('points at the Cal.com intro call', () => {
    expect(BOOKING_BASE_URL).toBe('https://cal.com/cgstrategic/intro-call');
  });

  it('tags each placement with source, medium and content', () => {
    const url = new URL(bookingUrl('meal-prep-ordering', 'hero'));
    expect(url.origin + url.pathname).toBe(BOOKING_BASE_URL);
    expect(url.searchParams.get('utm_source')).toBe('website');
    expect(url.searchParams.get('utm_medium')).toBe('meal-prep-ordering');
    expect(url.searchParams.get('utm_content')).toBe('hero');
  });

  it('accepts another source (demo, guide)', () => {
    expect(new URL(bookingUrl('chat-widget', 'daily-cap', 'demo')).searchParams.get('utm_source')).toBe('demo');
  });

  it('uses the agreed labels, and says the Spanish booking page is in English', () => {
    expect(common.en.bookCall.label).toBe('Book a free intro call');
    expect(common.en.bookCall.note).toBe('');
    expect(common.es.bookCall.label).toBe('Agende una llamada introductoria gratuita');
    expect(common.es.bookCall.note).toBe('(página en inglés)');
  });
});
