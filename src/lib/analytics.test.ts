import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const track = vi.fn();
vi.mock('@vercel/analytics/react', () => ({ track: (...args: unknown[]) => track(...args) }));

const { stripQueryAndHash, trackEvent, analyticsBeforeSend, isAnalyticsIgnored, setAnalyticsIgnored, IGNORE_ANALYTICS_KEY, LEGACY_IGNORE_ANALYTICS_KEY } = await import('./analytics');

describe('analytics privacy', () => {
  beforeEach(() => track.mockClear());

  it('drops query strings and fragments from page views and events', () => {
    expect(stripQueryAndHash({ type: 'pageview', url: 'https://www.cgstrategic.dev/es/meal-prep-calculator?price=12&ref=abc#chart' }))
      .toEqual({ type: 'pageview', url: 'https://www.cgstrategic.dev/es/meal-prep-calculator' });
    expect(stripQueryAndHash({ type: 'event', url: 'https://www.cgstrategic.dev/contact?source=website-check' }))
      .toEqual({ type: 'event', url: 'https://www.cgstrategic.dev/contact' });
    expect(stripQueryAndHash({ type: 'pageview', url: 'not a url?email=a@b.com' }).url).toBe('');
  });

  it('keeps the campaign tags, and only those, so campaign visits are attributed', () => {
    expect(
      stripQueryAndHash({
        type: 'pageview',
        url: 'https://www.cgstrategic.dev/demo-guide?ref=abc&utm_content=guide&utm_source=email&email=a@b.com&utm_campaign=follow-up&utm_medium=email&utm_term=x#top',
      })
    ).toEqual({
      type: 'pageview',
      // Always in the same order; anything else, utm_term included, is dropped.
      url: 'https://www.cgstrategic.dev/demo-guide?utm_source=email&utm_medium=email&utm_campaign=follow-up&utm_content=guide',
    });
    expect(stripQueryAndHash({ type: 'event', url: 'https://www.cgstrategic.dev/es/demo-guide?utm_campaign=otoño 2026' }).url)
      .toBe('https://www.cgstrategic.dev/es/demo-guide?utm_campaign=oto%C3%B1o+2026');
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

  it('sends the website check events with only the card name', () => {
    trackEvent('check_learn_more', 'en', { card: 'missed_call' });
    trackEvent('check_estimator_used', 'es');
    expect(track.mock.calls).toEqual([
      ['check_learn_more', { language: 'en', card: 'missed_call' }],
      ['check_estimator_used', { language: 'es' }],
    ]);
  });

  it('sends the homepage website check clicks with only where they came from', () => {
    trackEvent('home_website_check_click', 'es', { placement: 'section' });
    expect(track).toHaveBeenCalledWith('home_website_check_click', { language: 'es', placement: 'section' });
    trackEvent('home_case_study_click', 'en');
    expect(track).toHaveBeenLastCalledWith('home_case_study_click', { language: 'en' });
  });

  describe('opt-out flag', () => {
    const store = new Map<string, string>();
    const memoryStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => { store.set(k, v); },
      removeItem: (k: string) => { store.delete(k); },
    };
    const event = { type: 'pageview' as const, url: 'https://www.cgstrategic.dev/contact?source=x' };

    beforeEach(() => { store.clear(); vi.stubGlobal('window', { localStorage: memoryStorage }); });
    afterEach(() => vi.unstubAllGlobals());

    it('sends events (without the query string) when the flag is not set', () => {
      expect(isAnalyticsIgnored()).toBe(false);
      expect(analyticsBeforeSend(event)).toEqual({ type: 'pageview', url: 'https://www.cgstrategic.dev/contact' });
    });

    it('drops every event while the flag is "1", and sends again once cleared', () => {
      expect(setAnalyticsIgnored(true)).toBe(true);
      expect(store.get(IGNORE_ANALYTICS_KEY)).toBe('1');
      expect(analyticsBeforeSend(event)).toBeNull();
      expect(analyticsBeforeSend({ type: 'event', url: event.url })).toBeNull();
      expect(setAnalyticsIgnored(false)).toBe(true);
      expect(store.has(IGNORE_ANALYTICS_KEY)).toBe(false);
      expect(analyticsBeforeSend(event)).not.toBeNull();
    });

    it('uses the cg-ignore-analytics key', () => {
      expect(IGNORE_ANALYTICS_KEY).toBe('cg-ignore-analytics');
    });

    it('still honours the older /ignore-me key, and clearing removes it too', () => {
      store.set(LEGACY_IGNORE_ANALYTICS_KEY, '1');
      expect(isAnalyticsIgnored()).toBe(true);
      expect(analyticsBeforeSend(event)).toBeNull();
      expect(setAnalyticsIgnored(false)).toBe(true);
      expect(store.has(LEGACY_IGNORE_ANALYTICS_KEY)).toBe(false);
      expect(analyticsBeforeSend(event)).not.toBeNull();
    });

    it('keeps campaign tags on events from a browser that is counted', () => {
      const tagged = { type: 'pageview' as const, url: 'https://www.cgstrategic.dev/demo-guide?utm_source=outreach&utm_medium=email&utm_campaign=mealprep&utm_content=followup1-guide&ref=abc#top' };
      expect(analyticsBeforeSend(tagged)?.url).toBe('https://www.cgstrategic.dev/demo-guide?utm_source=outreach&utm_medium=email&utm_campaign=mealprep&utm_content=followup1-guide');
    });

    it('only honours exactly "1"', () => {
      store.set(IGNORE_ANALYTICS_KEY, 'true');
      expect(analyticsBeforeSend(event)).not.toBeNull();
    });

    it('keeps sending, and reports failure, when storage throws', () => {
      const throwing = () => { throw new DOMException('blocked', 'SecurityError'); };
      vi.stubGlobal('window', { get localStorage() { return throwing(); } });
      expect(isAnalyticsIgnored()).toBe(false);
      expect(setAnalyticsIgnored(true)).toBe(false);
      expect(analyticsBeforeSend(event)).not.toBeNull();
    });
  });
});
