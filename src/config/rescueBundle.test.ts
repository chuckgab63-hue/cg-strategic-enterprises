import { describe, it, expect } from 'vitest';
import {
  DM_RESCUE, MISSED_CALL_RESCUE, RESCUE_BUNDLE as BUNDLE, RESCUE_BUNDLE_ANCHOR,
  RESCUE_BUNDLE_CAMPAIGN, RESCUE_BUNDLE_PATH, offerMoney,
} from './offers';
import { bookingUrl } from './booking';
import rescueBundle from '../i18n/rescueBundle';
import dmRescue from '../i18n/dmRescue';
import { pageFileFor } from '../pageFiles';

// The bundle's own two prices are a decision and are typed. Everything else
// the card prints is arithmetic over the two offers' prices, and these tests
// are mostly about that: that nothing in the copy restates a figure, so
// changing either offer's price moves the card instead of leaving it lying.

const LANGS = ['en', 'es'] as const;

describe('Rescue Bundle prices', () => {
  it('is $697 setup and $199 a month, in whole dollars', () => {
    expect(BUNDLE.setupPrice).toBe(697);
    expect(BUNDLE.monthlyPrice).toBe(199);
    for (const amount of [BUNDLE.setupPrice, BUNDLE.monthlyPrice]) {
      expect(Number.isInteger(amount)).toBe(true);
      expect(amount).toBeGreaterThan(0);
    }
  });

  it('adds the separate totals up from the two offers rather than typing them', () => {
    expect(BUNDLE.separateSetupPrice).toBe(MISSED_CALL_RESCUE.setupPrice + DM_RESCUE.setupPrice);
    expect(BUNDLE.separateMonthlyPrice).toBe(MISSED_CALL_RESCUE.monthlyPrice + DM_RESCUE.monthlyPrice);
    // Today's figures, so a change to either offer shows up here as well as
    // in the derivation above.
    expect(BUNDLE.separateSetupPrice).toBe(894);
    expect(BUNDLE.separateMonthlyPrice).toBe(278);
  });

  it('derives both savings, and they are the agreed $197 and $79', () => {
    expect(BUNDLE.setupSaving).toBe(BUNDLE.separateSetupPrice - BUNDLE.setupPrice);
    expect(BUNDLE.monthlySaving).toBe(BUNDLE.separateMonthlyPrice - BUNDLE.monthlyPrice);
    expect(BUNDLE.setupSaving).toBe(197);
    expect(BUNDLE.monthlySaving).toBe(79);
  });

  it('actually saves money, which is the only reason to show the comparison', () => {
    expect(BUNDLE.setupPrice).toBeLessThan(BUNDLE.separateSetupPrice);
    expect(BUNDLE.monthlyPrice).toBeLessThan(BUNDLE.separateMonthlyPrice);
    expect(BUNDLE.setupSaving).toBeGreaterThan(0);
    expect(BUNDLE.monthlySaving).toBeGreaterThan(0);
  });

  it('prints every figure the same way in both languages', () => {
    for (const lang of LANGS) {
      expect(offerMoney(BUNDLE.setupPrice, lang)).toBe('$697');
      expect(offerMoney(BUNDLE.monthlyPrice, lang)).toBe('$199');
      expect(offerMoney(BUNDLE.separateSetupPrice, lang)).toBe('$894');
      expect(offerMoney(BUNDLE.separateMonthlyPrice, lang)).toBe('$278');
      expect(offerMoney(BUNDLE.setupSaving, lang)).toBe('$197');
      expect(offerMoney(BUNDLE.monthlySaving, lang)).toBe('$79');
    }
  });
});

describe('Rescue Bundle copy', () => {
  it('uses the agreed name and line in both languages', () => {
    expect(rescueBundle.en.title).toBe('Rescue Bundle: Calls + DMs');
    expect(rescueBundle.es.title).toBe('Paquete Rescate: Llamadas + Mensajes');
    expect(rescueBundle.en.body).toBe('Every missed call gets a text back. Every DM gets an instant reply. You get a text alert for both.');
    expect(rescueBundle.es.body).not.toBe(rescueBundle.en.body);
  });

  it('badges the savings with the derived figures', () => {
    expect(rescueBundle.en.badge).toBe('Save $197 up front and $79/mo');
    for (const lang of LANGS) {
      const t = rescueBundle[lang];
      expect(t.badge, lang).toContain(offerMoney(BUNDLE.setupSaving, lang));
      expect(t.badge, lang).toContain(offerMoney(BUNDLE.monthlySaving, lang));
      expect(t.setup, lang).toContain(offerMoney(BUNDLE.setupPrice, lang));
      expect(t.monthly, lang).toContain(offerMoney(BUNDLE.monthlyPrice, lang));
      expect(t.separateSetup, lang).toContain(offerMoney(BUNDLE.separateSetupPrice, lang));
      expect(t.separateMonthly, lang).toContain(offerMoney(BUNDLE.separateMonthlyPrice, lang));
      // The struck-through figures need naming for a screen reader, since
      // line-through is not announced.
      expect(t.separateLabel.length, lang).toBeGreaterThan(5);
    }
  });

  it('puts the up-front saving in the homepage line', () => {
    expect(rescueBundle.en.homeLink).toBe('Need both? Get the Rescue Bundle and save $197');
    for (const lang of LANGS) {
      expect(rescueBundle[lang].homeLink, lang).toContain(offerMoney(BUNDLE.setupSaving, lang));
      expect(rescueBundle[lang].jumpLink.length, lang).toBeGreaterThan(10);
    }
    expect(rescueBundle.es.homeLink).not.toBe(rescueBundle.en.homeLink);
  });

  it('is the only place the bundle figures are written', () => {
    // The old one-line mention on /dm-rescue stated $697 and $199 itself.
    // It is gone: the card is the one source now, so these must not come
    // back into the offer pages' own copy.
    for (const lang of LANGS) {
      const pricing = JSON.stringify(dmRescue[lang].pricing);
      expect(pricing, lang).not.toContain('697');
      expect(pricing, lang).not.toContain('199');
    }
  });
});

describe('where the bundle card lives', () => {
  it('is anchored on a page that exists', () => {
    expect(RESCUE_BUNDLE_PATH).toBe('/missed-call-rescue');
    expect(pageFileFor(RESCUE_BUNDLE_PATH)).toBe('MissedCallRescue');
    expect(RESCUE_BUNDLE_ANCHOR).toBe('rescue-bundle');
  });

  it('tags its booking link with the bundle campaign and the page it sold from', () => {
    for (const medium of ['missed-call-rescue', 'dm-rescue']) {
      const url = new URL(bookingUrl(medium, RESCUE_BUNDLE_ANCHOR, 'website', RESCUE_BUNDLE_CAMPAIGN));
      expect(url.searchParams.get('utm_campaign'), medium).toBe('rescue-bundle');
      expect(url.searchParams.get('utm_medium'), medium).toBe(medium);
      expect(url.searchParams.get('utm_content'), medium).toBe('rescue-bundle');
    }
    expect(RESCUE_BUNDLE_CAMPAIGN).toBe('rescue-bundle');
  });
});
