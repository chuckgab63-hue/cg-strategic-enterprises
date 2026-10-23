import { describe, it, expect, vi, beforeEach } from 'vitest';

const track = vi.fn();
vi.mock('@vercel/analytics/react', () => ({ track: (...args: unknown[]) => track(...args) }));

const { stripQueryAndHash, trackEvent } = await import('./analytics');

describe('analytics privacy', () => {
  beforeEach(() => track.mockClear());

  it('drops query strings and fragments from page views and events', () => {
    expect(stripQueryAndHash({ type: 'pageview', url: 'https://www.cgstrategic.dev/es/meal-prep-calculator?price=12&ref=abc#chart' }))
      .toEqual({ type: 'pageview', url: 'https://www.cgstrategic.dev/es/meal-prep-calculator' });
    expect(stripQueryAndHash({ type: 'event', url: 'https://www.cgstrategic.dev/contact?source=website-check' }))
      .toEqual({ type: 'event', url: 'https://www.cgstrategic.dev/contact' });
    expect(stripQueryAndHash({ type: 'pageview', url: 'not a url?email=a@b.com' }).url).toBe('');
  });

  it('sends only the event name and language', () => {
    trackEvent('contact_form_submitted', 'es');
    expect(track).toHaveBeenCalledWith('contact_form_submitted', { language: 'es' });
  });

  it('sends the calculator events with no values', () => {
    trackEvent('calculator_used', 'en');
    trackEvent('calculator_emailed', 'es');
    expect(track.mock.calls).toEqual([
      ['calculator_used', { language: 'en' }],
      ['calculator_emailed', { language: 'es' }],
    ]);
  });
});
