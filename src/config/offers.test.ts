import { describe, it, expect } from 'vitest';
import { MISSED_CALL_RESCUE as OFFER, MISSED_CALL_RESCUE_PATH, OFFER_CURRENCY, offerMoney, type InclusionKey } from './offers';
import missedCallRescue from '../i18n/missedCallRescue';
import home from '../i18n/home';
import { findRoute } from '../i18n/meta';
import { pageFileFor } from '../pageFiles';

// The offer config is the one place the price, the timeline and the list of
// inclusions live. These tests are about that: that the figures are whole
// numbers a page can print, that both languages describe every inclusion, and
// that no page states a price of its own beside them.

const LANGS = ['en', 'es'] as const;

describe('Missed-Call Rescue offer', () => {
  it('is a fixed price in whole dollars, month to month', () => {
    expect(OFFER_CURRENCY).toBe('USD');
    for (const amount of [OFFER.setupPrice, OFFER.monthlyPrice]) {
      expect(Number.isInteger(amount)).toBe(true);
      expect(amount).toBeGreaterThan(0);
    }
    expect(OFFER.setupPrice).toBe(497);
    expect(OFFER.monthlyPrice).toBe(149);
    expect(OFFER.liveInDays).toBe(14);
    expect(OFFER.upgradeCreditDays).toBe(90);
  });

  it('gives the carrier texting wait as a range, low end first', () => {
    const [from, to] = OFFER.textBackApprovalWeeks;
    expect(from).toBeGreaterThan(0);
    expect(to).toBeGreaterThan(from);
  });

  it('prints the same figures in both languages', () => {
    for (const lang of LANGS) {
      expect(offerMoney(OFFER.setupPrice, lang)).toBe('$497');
      expect(offerMoney(OFFER.monthlyPrice, lang)).toBe('$149');
    }
  });

  it('lists each inclusion once, with the carrier note on text-back alone', () => {
    const keys = OFFER.inclusions.map(i => i.key);
    expect(keys.length).toBe(6);
    expect(new Set(keys).size).toBe(keys.length);
    expect(OFFER.inclusions.filter(i => i.note === 'a2p').map(i => i.key)).toEqual(['textBack']);
  });

  it('has a route, a page file and a title in both languages', () => {
    expect(MISSED_CALL_RESCUE_PATH).toBe('/missed-call-rescue');
    expect(pageFileFor(MISSED_CALL_RESCUE_PATH)).toBe('MissedCallRescue');
    const route = findRoute(MISSED_CALL_RESCUE_PATH);
    expect(route?.lastmod).toBe('2026-11-20');
    for (const lang of LANGS) {
      // src/i18n/meta.ts writes these figures out rather than importing the
      // offer config, because that file is in the bundle every page loads. So
      // this is the check that keeps a price change from leaving a stale
      // number in a search result — if it fails, meta.ts is the file to fix.
      expect(route?.meta[lang].description, lang).toContain(offerMoney(OFFER.setupPrice, lang));
      expect(route?.meta[lang].description, lang).toContain(offerMoney(OFFER.monthlyPrice, lang));
      expect(route?.meta[lang].title, lang).toContain(String(OFFER.liveInDays));
      expect(route?.meta[lang].title, lang).toContain('Missed-Call Rescue');
    }
  });
});

describe('Missed-Call Rescue page copy', () => {
  it('describes every inclusion in both languages, and differently', () => {
    for (const { key } of OFFER.inclusions) {
      for (const lang of LANGS) {
        const item = missedCallRescue[lang].included.items[key as InclusionKey];
        expect(item.title.length, `${lang} ${key}`).toBeGreaterThan(10);
        expect(item.body.length, `${lang} ${key}`).toBeGreaterThan(30);
      }
      expect(missedCallRescue.es.included.items[key].body).not.toBe(missedCallRescue.en.included.items[key].body);
    }
  });

  it('takes the price and the timeline from the config rather than typing them', () => {
    for (const lang of LANGS) {
      const t = missedCallRescue[lang];
      expect(t.intro, lang).toContain(offerMoney(OFFER.setupPrice, lang));
      expect(t.intro, lang).toContain(offerMoney(OFFER.monthlyPrice, lang));
      expect(t.intro, lang).toContain(String(OFFER.liveInDays));
      expect(t.included.upgrade, lang).toContain(String(OFFER.upgradeCreditDays));
      // The carrier wait is always the range, never a single number or a date.
      expect(t.included.a2pNote, lang).toContain(String(OFFER.textBackApprovalWeeks[0]));
      expect(t.included.a2pNote, lang).toContain(String(OFFER.textBackApprovalWeeks[1]));
    }
  });

  it('keeps the fair-use note free of any number, because there is not one yet', () => {
    for (const lang of LANGS) {
      expect(missedCallRescue[lang].included.finePrint, lang).not.toMatch(/\d/);
    }
  });

  it('asks the six agreed questions, under the same ids in both languages', () => {
    const ids = ['keep-my-number', 'i-answer-myself', 'spanish', 'text-back-start', 'cancel', 'after-14-days'];
    for (const lang of LANGS) {
      expect(missedCallRescue[lang].faq.map(f => f.id), lang).toEqual(ids);
      for (const item of missedCallRescue[lang].faq) {
        expect(item.question.length, `${lang} ${item.id}`).toBeGreaterThan(10);
        expect(item.answer.length, `${lang} ${item.id}`).toBeGreaterThan(40);
      }
    }
  });

  it('sends the Spanish proof link to a page that has the section it names', () => {
    // The narrated tour is English only (src/components/TourVideo.tsx), so only
    // the English copy may point at #tour.
    expect(missedCallRescue.en.proof.link.path).toBe('/pest-control#tour');
    expect(missedCallRescue.es.proof.link.path).toBe('/pest-control');
  });
});

describe('the home page card', () => {
  it('leads the services grid in both languages, with the price on its badge', () => {
    for (const lang of LANGS) {
      const [first, ...rest] = home[lang].services.cards;
      expect(first.path, lang).toBe(MISSED_CALL_RESCUE_PATH);
      expect(first.badge, lang).toContain(offerMoney(OFFER.setupPrice, lang));
      expect(first.body, lang).toContain(String(OFFER.liveInDays));
      expect(first.icon, lang).toBe('voicemail');
      // The one badge on the grid: the other cards are services we quote.
      expect(rest.some(card => card.badge), lang).toBe(false);
    }
    expect(home.es.services.cards[0].body).not.toBe(home.en.services.cards[0].body);
  });
});
