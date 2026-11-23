import { describe, it, expect } from 'vitest';
import { DM_RESCUE as OFFER, DM_RESCUE_PATH, OFFER_CURRENCY, offerMoney, type DmInclusionKey } from './offers';
import { bookingUrl } from './booking';
import { DEMO_KEYWORD, INSTAGRAM_DM_URL, INSTAGRAM_HANDLE, SOCIAL_PROFILES } from './social';
import dmRescue, { DM_RESCUE_CAMPAIGN, DM_RESCUE_MEDIUM, DM_RESCUE_SOURCE } from '../i18n/dmRescue';
import missedCallRescue from '../i18n/missedCallRescue';
import mealPrepOrdering from '../i18n/mealPrepOrdering';
import home from '../i18n/home';
import common from '../i18n/common';
import { findRoute } from '../i18n/meta';
import { pageFileFor } from '../pageFiles';

// The DM Rescue offer, held to the same rules as the missed-call one in
// offers.test.ts: the figures live in the config, both languages describe
// every inclusion, and no page types a price of its own beside them.

const LANGS = ['en', 'es'] as const;

describe('DM Rescue offer', () => {
  it('is a fixed price in whole dollars, month to month', () => {
    for (const amount of [OFFER.setupPrice, OFFER.monthlyPrice]) {
      expect(Number.isInteger(amount)).toBe(true);
      expect(amount).toBeGreaterThan(0);
    }
    expect(OFFER.setupPrice).toBe(397);
    expect(OFFER.monthlyPrice).toBe(129);
    expect(OFFER.liveInBusinessDays).toBe(3);
  });

  it('prints the same figures in both languages', () => {
    expect(OFFER_CURRENCY).toBe('USD');
    for (const lang of LANGS) {
      expect(offerMoney(OFFER.setupPrice, lang)).toBe('$397');
      expect(offerMoney(OFFER.monthlyPrice, lang)).toBe('$129');
    }
  });

  it('lists each inclusion once', () => {
    expect(OFFER.inclusions.length).toBe(6);
    expect(new Set(OFFER.inclusions).size).toBe(OFFER.inclusions.length);
  });

  it('has a route, a page file and a title in both languages', () => {
    expect(DM_RESCUE_PATH).toBe('/dm-rescue');
    expect(pageFileFor(DM_RESCUE_PATH)).toBe('DmRescue');
    const route = findRoute(DM_RESCUE_PATH);
    expect(route?.lastmod).toBe('2026-11-23');
    for (const lang of LANGS) {
      // src/i18n/meta.ts writes the figures out rather than importing the
      // offer config, because that file is in the bundle every page loads. So
      // this is the check that keeps a price change from leaving a stale
      // number in a search result — if it fails, meta.ts is the file to fix.
      expect(route?.meta[lang].description, lang).toContain(offerMoney(OFFER.setupPrice, lang));
      expect(route?.meta[lang].description, lang).toContain(offerMoney(OFFER.monthlyPrice, lang));
    }
    expect(route?.meta.en.title).toBe('DM Rescue: Instant Instagram & Facebook Replies | CG Strategic');
    expect(route?.og?.image).toBe('/og/dm-rescue.jpg');
  });

  it('keeps both titles inside the length a search result shows', () => {
    // Bing URL Inspection reported "Title too long" for this page on
    // 2026-11-23, which is why the titles use SHORT_NAME. 65 is the limit it
    // enforces. Plenty of other pages on the site are still over it — this
    // guards the two that were fixed, it is not a site-wide rule yet.
    const route = findRoute(DM_RESCUE_PATH)!;
    for (const lang of LANGS) {
      expect(route.meta[lang].title.length, `${lang}: ${route.meta[lang].title}`).toBeLessThanOrEqual(65);
    }
    // And the shortening kept the words that matter: the offer's name and,
    // in English, both platforms.
    expect(route.meta.en.title).toContain('DM Rescue');
    expect(route.meta.en.title).toContain('Instagram');
    expect(route.meta.en.title).toContain('Facebook');
    expect(route.meta.es.title).toContain('Rescate de Mensajes');
    expect(route.meta.es.title).toContain('Instagram');
  });
});

describe('the Instagram demo link', () => {
  it('is the ig.me deep link for the handle the profile points at', () => {
    expect(INSTAGRAM_DM_URL).toBe('https://ig.me/m/cgstrategic.dev');
    expect(INSTAGRAM_HANDLE).toBe('@cgstrategic.dev');
    expect(DEMO_KEYWORD).toBe('DEMO');
    // The thread and the profile have to be the same account, or the page
    // tells people to message somewhere nobody is answering.
    const profile = SOCIAL_PROFILES.find(p => p.key === 'instagram')!.url;
    const handle = INSTAGRAM_HANDLE.slice(1);
    expect(profile).toContain(handle);
    expect(INSTAGRAM_DM_URL).toContain(handle);
  });

  it('is what every "try it" line on the site points at', () => {
    for (const lang of LANGS) {
      const card = home[lang].services.cards.find(c => c.path === DM_RESCUE_PATH)!;
      expect(card.secondary?.href, lang).toBe(INSTAGRAM_DM_URL);
      expect(card.secondary?.label, lang).toContain(DEMO_KEYWORD);
      expect(mealPrepOrdering[lang].dmDemo, lang).toContain(DEMO_KEYWORD);
    }
    expect(mealPrepOrdering.es.dmDemo).not.toBe(mealPrepOrdering.en.dmDemo);
  });
});

describe('DM Rescue page copy', () => {
  it('describes every inclusion in both languages, and differently', () => {
    for (const key of OFFER.inclusions) {
      for (const lang of LANGS) {
        const item = dmRescue[lang].included.items[key as DmInclusionKey];
        expect(item.title.length, `${lang} ${key}`).toBeGreaterThan(10);
        expect(item.body.length, `${lang} ${key}`).toBeGreaterThan(30);
      }
      expect(dmRescue.es.included.items[key].body).not.toBe(dmRescue.en.included.items[key].body);
    }
  });

  it('takes the prices from the config rather than typing them', () => {
    for (const lang of LANGS) {
      const t = dmRescue[lang];
      expect(t.pricing.setup, lang).toContain(offerMoney(OFFER.setupPrice, lang));
      expect(t.pricing.monthly, lang).toContain(offerMoney(OFFER.monthlyPrice, lang));
      expect(t.pricing.live, lang).toContain(String(OFFER.liveInBusinessDays));
      // The bundle price is not stated here any more: it comes from
      // RESCUE_BUNDLE, through the card (src/config/rescueBundle.test.ts).
      expect(JSON.stringify(t.pricing), lang).not.toContain('697');
      // The headline and the tagline are the offer's own words, unchanged.
      expect(t.intro.length, lang).toBeGreaterThan(100);
      expect(t.tagline.length, lang).toBeGreaterThan(40);
    }
    expect(dmRescue.en.title).toBe('Stop losing customers in your DMs.');
  });

  it('shows the demo exchange in both languages, keyword first', () => {
    for (const lang of LANGS) {
      const mock = dmRescue[lang].demo.mock;
      expect(mock.customer, lang).toBe(DEMO_KEYWORD);
      expect(mock.header, lang).toBe(INSTAGRAM_HANDLE);
      expect(mock.business.length, lang).toBeGreaterThan(40);
      expect(mock.links.length, lang).toBe(2);
      expect(dmRescue[lang].demo.body, lang).toContain(DEMO_KEYWORD);
    }
    expect(dmRescue.es.demo.mock.business).not.toBe(dmRescue.en.demo.mock.business);
  });

  it('names the three problems and asks the five agreed questions, under the same ids', () => {
    const ids = ['cold-messages', 'reply-myself', 'what-i-need', 'setup-time', 'contract'];
    for (const lang of LANGS) {
      expect(dmRescue[lang].problem.cards.length, lang).toBe(3);
      expect(dmRescue[lang].faq.map(f => f.id), lang).toEqual(ids);
      for (const item of dmRescue[lang].faq) {
        expect(item.question.length, `${lang} ${item.id}`).toBeGreaterThan(10);
        expect(item.answer.length, `${lang} ${item.id}`).toBeGreaterThan(20);
      }
      expect(dmRescue[lang].how.steps.length, lang).toBe(3);
    }
    // No cold outreach, in either language: the platforms do not allow it and
    // the page says so rather than implying otherwise anywhere else.
    expect(dmRescue.en.faq[0].answer).toContain('No.');
  });

  it('tags its booking links with the offer source, medium and campaign', () => {
    const url = new URL(bookingUrl(DM_RESCUE_MEDIUM, 'hero', DM_RESCUE_SOURCE, DM_RESCUE_CAMPAIGN));
    expect(url.searchParams.get('utm_source')).toBe('site');
    expect(url.searchParams.get('utm_medium')).toBe('offer');
    expect(url.searchParams.get('utm_campaign')).toBe('dm-rescue');
    // The placement rides along, as it does on every other booking link.
    expect(url.searchParams.get('utm_content')).toBe('hero');
  });
});

describe('the rest of the site points at it', () => {
  it('puts the card straight after Missed-Call Rescue, with the price in its body and no badge', () => {
    for (const lang of LANGS) {
      const paths = home[lang].services.cards.map(c => c.path);
      expect(paths.indexOf(DM_RESCUE_PATH), lang).toBe(paths.indexOf('/missed-call-rescue') + 1);
      const card = home[lang].services.cards[paths.indexOf(DM_RESCUE_PATH)];
      expect(card.body, lang).toContain(offerMoney(OFFER.setupPrice, lang));
      expect(card.body, lang).toContain(offerMoney(OFFER.monthlyPrice, lang));
      // The starter offer keeps the grid's one badge (src/config/offers.test.ts).
      expect(card.badge, lang).toBeUndefined();
      expect(card.icon, lang).toBe('dm');
    }
    expect(home.es.services.cards.find(c => c.path === DM_RESCUE_PATH)!.body)
      .not.toBe(home.en.services.cards.find(c => c.path === DM_RESCUE_PATH)!.body);
  });

  it('cross-links from Missed-Call Rescue and names it in the footer, in both languages', () => {
    for (const lang of LANGS) {
      expect(missedCallRescue[lang].dmCrossLink.text.length, lang).toBeGreaterThan(20);
      expect(common[lang].nav.dmRescue, lang).toBeTruthy();
    }
    expect(missedCallRescue.en.dmCrossLink.text).toBe('Get leads from Instagram too? Pair it with DM Rescue');
    expect(missedCallRescue.es.dmCrossLink.text).not.toBe(missedCallRescue.en.dmCrossLink.text);
  });
});
