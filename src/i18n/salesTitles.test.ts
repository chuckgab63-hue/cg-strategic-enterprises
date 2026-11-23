import { describe, it, expect } from 'vitest';
import { findRoute } from './meta';

// The six sales pages' titles, held to the length a search result actually
// shows.
//
// Bing's URL Inspection raises "Title too long" past about 65 characters, and
// Google truncates around the same point. On 2026-11-23 all twelve of these
// (six routes, two languages) were over it — the worst at 101 — because every
// one carried the full "CG Strategic Enterprises" suffix, which costs 27
// characters on its own. They now use SHORT_NAME.
//
// `keep` is the part that must survive any future rewrite: the phrase someone
// searches for and the trade word. Shortening a title is easy; shortening it
// into something nobody searches for is the mistake this guards against.
//
// Deliberately scoped to these six routes. Most of the rest of the site is
// still over 65 and that is a separate decision, not a rule this file sets.

const LANGS = ['en', 'es'] as const;

/** The limit Bing enforces. */
const MAX = 65;

const SALES_PAGES: { path: string; keep: Record<(typeof LANGS)[number], string[]> }[] = [
  {
    path: '/missed-call-rescue',
    keep: { en: ['Missed-Call Rescue', 'AI Receptionist'], es: ['Missed-Call Rescue', 'recepcionista'] },
  },
  {
    path: '/search-ai-visibility',
    keep: { en: ['Search', 'AI Visibility'], es: ['Visibilidad', 'buscadores'] },
  },
  {
    // "answering service", "AI answering service" and "virtual receptionist"
    // are the three phrases with real Bing volume for this page, so all three
    // stay in the English title.
    path: '/answering-service',
    keep: { en: ['AI Answering Service', 'Virtual Receptionist'], es: ['Atención telefónica', 'recepcionista virtual'] },
  },
  {
    path: '/pest-control',
    keep: { en: ['Pest Control', 'Answering Service'], es: ['Control de plagas'] },
  },
  {
    path: '/lawn-care',
    keep: { en: ['Lawn Care', 'Landscaping', 'Answering Service'], es: ['Jardinería', 'paisajismo'] },
  },
  {
    path: '/meal-prep-ordering',
    keep: { en: ['Meal Prep', 'Ordering'], es: ['Comidas preparadas', 'pedidos'] },
  },
];

describe('sales page titles', () => {
  it('fit inside what a search result shows, in both languages', () => {
    for (const { path } of SALES_PAGES) {
      const route = findRoute(path)!;
      expect(route, path).toBeTruthy();
      for (const lang of LANGS) {
        const title = route.meta[lang].title;
        expect(title.length, `${path} [${lang}] is ${title.length}: ${title}`).toBeLessThanOrEqual(MAX);
      }
    }
  });

  it('keep the phrase people search for and the trade word', () => {
    for (const { path, keep } of SALES_PAGES) {
      const route = findRoute(path)!;
      for (const lang of LANGS) {
        for (const phrase of keep[lang]) {
          expect(route.meta[lang].title, `${path} [${lang}] lost "${phrase}"`).toContain(phrase);
        }
      }
    }
  });

  it('uses the short brand suffix on every one of them', () => {
    for (const { path } of SALES_PAGES) {
      const route = findRoute(path)!;
      for (const lang of LANGS) {
        expect(route.meta[lang].title, `${path} [${lang}]`).toContain('| CG Strategic');
        // The long form is what pushed these over the limit in the first place.
        expect(route.meta[lang].title, `${path} [${lang}]`).not.toContain('CG Strategic Enterprises');
      }
    }
  });

  it('leaves the descriptions alone, which are not length-limited here', () => {
    // A guard on scope rather than on length: this change was titles only, so
    // the descriptions should still be the full sentences they were.
    for (const { path } of SALES_PAGES) {
      const route = findRoute(path)!;
      for (const lang of LANGS) {
        expect(route.meta[lang].description.length, `${path} [${lang}]`).toBeGreaterThan(100);
      }
    }
  });
});
