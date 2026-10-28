import { describe, it, expect } from 'vitest';
import { checkHtml } from './htmlChecks';
import { missedCallRisk, overallScore, searchBasics } from './scoring';

const HTTPS = new URL('https://example.com/');
const HTTP = new URL('http://example.com/');
const filler = '<p>' + 'We fix roofs across Jacksonville and the beaches. '.repeat(8) + '</p>';

// A bare brochure site: none of the basics, only an email address.
const BARE = `<!doctype html><html><head></head><body>
  <h2>Welcome</h2><h3>Our services</h3>${filler}<p>Email us at info@example.com</p></body></html>`;

// A strong local-business homepage.
const STRONG = `<!doctype html><html lang="en"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Acme Roofing | Roof Repair in Jacksonville, FL</title>
  <meta name="description" content="Roof repair and replacement in Jacksonville. Call or book online.">
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"Acme"},{"@type":["RoofingContractor"],"name":"Acme Roofing","telephone":"+1-904-555-0100"}]}</script>
  <script src="https://widget.intercom.io/widget/abc123"></script>
</head><body>
  <h1>Roof repair in Jacksonville</h1>
  <a href="tel:+19045550100">(904) 555-0100</a>
  <a href="https://calendly.com/acme/estimate">Book an estimate</a>
  ${filler}
  <p>24/7 emergency service for storm damage.</p>
  <form action="/contact" method="post"><input type="text" name="name"><input type="email" name="email"><textarea name="message"></textarea></form>
</body></html>`;

// Phone and form, nothing that answers when nobody picks up.
const TYPICAL = `<html><head>
  <meta name='viewport' content='width=device-width'>
  <title>Bob&#39;s Plumbing</title>
  <script type="application/ld+json">{ not valid json </script>
</head><body>
  <h1>Bob's Plumbing</h1><h1>Call today</h1>
  <a href="tel:9045550100">Call</a>
  <!-- <a href="https://calendly.com/old">old booking link</a> -->
  ${filler}
  <form><input name="your-phone"><input type="submit"></form>
</body></html>`;

// A Spanish page with an embedded form tool, a WhatsApp link and after-hours wording.
const SPANISH = `<html lang="es"><head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Limpieza Sol</title>
  <meta name="description" content="">
  <div itemscope itemtype="https://schema.org/LocalBusiness"></div>
</head><body><h1>Limpieza Sol</h1>${filler}
  <p>Atendemos las 24 horas.</p>
  <a href="https://wa.me/19045550100">WhatsApp</a>
  <script src="https://form.jotform.com/jsform/123"></script>
</body></html>`;

// A JavaScript-built page: the HTML is an empty shell.
const SPA = `<!doctype html><html><head><title>App</title><meta name="viewport" content="width=device-width">
  <script type="module" src="/assets/index.js"></script></head><body><div id="root"></div></body></html>`;

describe('checkHtml', () => {
  it('finds everything on a strong homepage', () => {
    const c = checkHtml(STRONG, HTTPS);
    expect(c.https).toBe(true);
    expect(c.title).toEqual({ present: true, text: 'Acme Roofing | Roof Repair in Jacksonville, FL', length: 46 });
    expect(c.metaDescription.present).toBe(true);
    expect(c.h1).toEqual({ count: 1, single: true });
    expect(c.viewport).toBe(true);
    expect(c.structuredData).toEqual({ present: true, types: ['RoofingContractor'] });
    expect(c.telLink).toBe(true);
    expect(c.contactForm).toBe(true);
    expect(c.booking.tools).toEqual(['Calendly']);
    expect(c.chatWidget.tools).toEqual(['Intercom']);
    expect(c.afterHours.evidence).toEqual(['24/7', 'emergency service']);
    expect(c.contentLimited).toBe(false);
  });

  it('finds nothing on a bare page', () => {
    const c = checkHtml(BARE, HTTP);
    expect(c.https).toBe(false);
    expect(c.title.present).toBe(false);
    expect(c.metaDescription.present).toBe(false);
    expect(c.h1).toEqual({ count: 0, single: false });
    expect(c.viewport).toBe(false);
    expect(c.structuredData.present).toBe(false);
    expect(c.telLink).toBe(false);
    expect(c.contactForm).toBe(false);
    expect(c.booking.present).toBe(false);
    expect(c.chatWidget.present).toBe(false);
    expect(c.afterHours.present).toBe(false);
  });

  it('handles single quotes, entities, broken JSON-LD, two H1s and commented-out links', () => {
    const c = checkHtml(TYPICAL, HTTPS);
    expect(c.viewport).toBe(true);
    expect(c.title.text).toBe("Bob's Plumbing");
    expect(c.structuredData.present).toBe(false);
    expect(c.h1).toEqual({ count: 2, single: false });
    expect(c.telLink).toBe(true);
    expect(c.contactForm).toBe(true);
    expect(c.booking.present).toBe(false);
  });

  it('reads microdata, embedded form tools, messaging links and Spanish after-hours wording', () => {
    const c = checkHtml(SPANISH, HTTPS);
    expect(c.metaDescription.present).toBe(false); // empty content doesn't count
    expect(c.structuredData.types).toEqual(['LocalBusiness']);
    expect(c.contactForm).toBe(true);
    expect(c.chatWidget.tools).toEqual(['WhatsApp']);
    expect(c.afterHours.present).toBe(true);
  });

  it('finds voice agents loaded by script, including Retell from a CDN and Alex', () => {
    const retell = checkHtml(`<script type="module">import { RetellWebClient } from "https://cdn.jsdelivr.net/npm/retell-client-js-sdk@3.0.2/+esm";</script>`, HTTPS);
    expect(retell.chatWidget.tools).toEqual(['Retell voice agent']);
    // How cgstrategic.dev loads Alex: an inline loader, plus a button once a chooser opens.
    const loader = checkHtml(`<body><script>function load() { return import('/alex-voice.js'); }</script></body>`, HTTPS);
    expect(loader.chatWidget.tools).toEqual(['Alex voice agent (CG Strategic)']);
    const button = checkHtml(`<button type="button" data-alex-call>Talk to Alex</button>`, HTTPS);
    expect(button.chatWidget.tools).toEqual(['Alex voice agent (CG Strategic)']);
  });

  it("doesn't count a voice agent that's only mentioned in a comment", () => {
    const c = checkHtml(`<body><!-- Alex (public/alex-voice.js) pulls in the Retell SDK --><p>Hello</p></body>`, HTTPS);
    expect(c.chatWidget.present).toBe(false);
  });

  it('flags pages built with JavaScript', () => {
    expect(checkHtml(SPA, HTTPS).contentLimited).toBe(true);
  });

  it('does not count a bare schema.org Service as the business', () => {
    const html = `<script type="application/ld+json">{"@type":"Service","name":"Roof repair"}</script>`;
    expect(checkHtml(html, HTTPS).structuredData.present).toBe(false);
  });
});

describe('missedCallRisk', () => {
  it('is high when there is no way to reach the business but email', () => {
    const risk = missedCallRisk(checkHtml(BARE, HTTP));
    expect(risk.level).toBe('high');
    expect(risk.reasons).toEqual(['no_tel_link', 'no_contact_form', 'no_booking', 'no_chat', 'no_after_hours']);
  });

  it('is low when calls, forms, booking, chat and after-hours are covered', () => {
    expect(missedCallRisk(checkHtml(STRONG, HTTPS))).toEqual({ level: 'low', points: 0, reasons: [] });
  });

  it('is medium with a phone and a form but nothing that answers after hours', () => {
    const risk = missedCallRisk(checkHtml(TYPICAL, HTTPS));
    expect(risk.level).toBe('medium');
    expect(risk.reasons).toEqual(['no_booking', 'no_chat', 'no_after_hours', 'phone_only']);
  });

  it('is high with a phone number and nothing else', () => {
    const phoneOnly = `<title>x</title><a href="tel:+19045550100">Call</a>${filler}`;
    expect(missedCallRisk(checkHtml(phoneOnly, HTTPS)).level).toBe('high');
  });
});

describe('searchBasics and overallScore', () => {
  it('scores search basics from the six checks', () => {
    expect(searchBasics(checkHtml(STRONG, HTTPS)).score).toBe(100);
    expect(searchBasics(checkHtml(BARE, HTTP))).toEqual({
      score: 0, passed: [],
      missed: ['https', 'title', 'meta_description', 'single_h1', 'viewport', 'structured_data'],
    });
    // https 15 + title 20 + viewport 10
    expect(searchBasics(checkHtml(TYPICAL, HTTPS)).score).toBe(45);
  });

  it('weights the parts and leaves out PageSpeed scores that failed', () => {
    expect(overallScore({ speed: 100, mobile: 100, search: 100, risk: 'low' })).toBe(100);
    expect(overallScore({ speed: 80, mobile: 40, search: 60, risk: 'medium' })).toBe(Math.round((40 * 30 + 80 * 20 + 60 * 25 + 55 * 25) / 100));
    expect(overallScore({ speed: null, mobile: null, search: 100, risk: 'high' })).toBe(Math.round((100 * 25 + 15 * 25) / 50));
  });
});
