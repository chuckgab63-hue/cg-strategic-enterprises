import { describe, it, expect } from 'vitest';
// ?raw: read as text through Vite, so the test needs no Node types.
import vercelJson from '../../vercel.json?raw';
import { langFromPath, localizePath, stripLang, SPANISH_PUBLIC } from './lang';
import { headFor } from './head';
import { SITE_ROUTES, findRoute } from './meta';
import { applyHead, prerenderTargets, sitemapXml } from './prerender';

describe('language paths', () => {
  it('keeps English at the existing URLs and puts Spanish under /es', () => {
    expect(localizePath('/portfolio', 'en')).toBe('/portfolio');
    expect(localizePath('/portfolio', 'es')).toBe('/es/portfolio');
    expect(localizePath('/', 'es')).toBe('/es');
    expect(localizePath('/es/portfolio', 'en')).toBe('/portfolio');
    expect(localizePath('/es', 'en')).toBe('/');
  });

  it('reads the language from the path without matching look-alikes', () => {
    expect(langFromPath('/es')).toBe('es');
    expect(langFromPath('/es/contact')).toBe('es');
    expect(langFromPath('/estimates')).toBe('en');
    expect(stripLang('/estimates')).toBe('/estimates');
  });
});

describe('page meta', () => {
  it('has a title and description in both languages for every page', () => {
    for (const route of SITE_ROUTES) {
      for (const lang of ['en', 'es'] as const) {
        expect(route.meta[lang].title, `${lang} ${route.path}`).toBeTruthy();
        expect(route.meta[lang].description, `${lang} ${route.path}`).toBeTruthy();
      }
      expect(route.meta.es.title).not.toBe(route.meta.en.title);
    }
  });

  it('points aliases at their main page', () => {
    expect(findRoute('/case-studies')?.path).toBe('/portfolio');
    expect(findRoute('/fluid')?.path).toBe('/fluid-dynamics');
  });

  it('gives each page its own-language canonical', () => {
    expect(headFor('/es/contact').canonical).toBe('https://www.cgstrategic.dev/es/contact');
    expect(headFor('/contact').canonical).toBe('https://www.cgstrategic.dev/contact');
    expect(headFor('/es/contact').htmlLang).toBe('es');
  });

  it('marks unknown URLs noindex with no canonical', () => {
    const head = headFor('/es/no-such-page');
    expect(head.noindex).toBe(true);
    expect(head.canonical).toBeUndefined();
    expect(head.title).toMatch(/^Página no encontrada/);
  });

  // The convention behind these dates is written out on SiteRoute.lastmod in
  // meta.ts: the day the page's own visible copy last changed, styling-only
  // commits excluded. A test cannot tell whether the words changed; it can
  // tell that every route was given a real date and that none of them is in
  // the future, which is what makes a sitemap worth reading.
  it('gives every route a lastmod, as a date that is not in the future', () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const route of SITE_ROUTES) {
      expect(route.lastmod, route.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      // Parsed back, so 2026-02-31 and 2026-13-01 fail rather than pass the shape check.
      expect(new Date(`${route.lastmod}T00:00:00Z`).toISOString().slice(0, 10), route.path).toBe(route.lastmod);
      expect(route.lastmod <= today, `${route.path} is dated in the future`).toBe(true);
    }
  });

  it('puts a lastmod under every URL in the sitemap, English and Spanish', () => {
    const xml = sitemapXml();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>(\n    <lastmod>([^<]+)<\/lastmod>)?/g)];
    expect(locs.length).toBe(SITE_ROUTES.length * (SPANISH_PUBLIC ? 2 : 1));
    for (const [, loc, , lastmod] of locs) expect(lastmod, loc).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    // A page and its Spanish twin share the route's date.
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/pest-control</loc>\n    <lastmod>2026-11-08</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/es/pest-control</loc>\n    <lastmod>2026-11-08</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/contact</loc>\n    <lastmod>2026-11-02</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/</loc>\n    <lastmod>2026-11-06</lastmod>');
  });

  it('keeps /analytics-optout and /ignore-me out of search and the sitemap', () => {
    for (const path of ['/analytics-optout', '/ignore-me', '/analytics-optout/']) {
      const head = headFor(path);
      expect(head.noindex).toBe(true);
      expect(head.canonical).toBeUndefined();
      expect(head.title).toBe('Analytics opt-out');
    }
    expect(sitemapXml()).not.toContain('ignore-me');
    expect(sitemapXml()).not.toContain('analytics-optout');
  });

  it('keeps Spanish out of search until it launches', () => {
    expect(headFor('/es/contact').noindex).toBe(!SPANISH_PUBLIC);
    expect(headFor('/contact').noindex).toBe(false);
    expect(headFor('/contact').alternates.length).toBe(SPANISH_PUBLIC ? 3 : 0);
    expect(sitemapXml().includes('/es')).toBe(SPANISH_PUBLIC);
  });
});

describe('pre-rendered pages', () => {
  it('writes <html lang> and the page head into the shell', () => {
    const shell = '<html lang="en"><head><title>x</title></head></html>';
    const out = applyHead(shell, headFor('/es/portfolio'));
    expect(out).toContain('<html lang="es">');
    expect(out).toContain('<title>Casos de estudio | CG Strategic Enterprises</title>');
    expect(out).toContain('<link rel="canonical" href="https://www.cgstrategic.dev/es/portfolio" data-seo />');
  });

  it('has a vercel.json rewrite for every pre-rendered page', () => {
    const { rewrites } = JSON.parse(vercelJson) as { rewrites: { source: string; destination: string }[] };
    const bySource = new Map(rewrites.map(r => [r.source, r.destination]));
    for (const { path, file } of prerenderTargets()) {
      if (path === '/') continue; // served straight from dist/index.html
      expect(bySource.get(path), path).toBe(`/${file}`);
    }
    expect(rewrites.at(-1)).toEqual({ source: '/(.*)', destination: '/app-shell.html' });
  });
});
