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

  it('gives a page its lastmod in the sitemap, only when it has one', () => {
    const xml = sitemapXml();
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/demo-guide</loc>\n    <lastmod>2026-10-31</lastmod>');
    expect(xml).toMatch(/<loc>https:\/\/www\.cgstrategic\.dev\/<\/loc>\n    <xhtml|<loc>https:\/\/www\.cgstrategic\.dev\/<\/loc>\n  <\/url>/);
  });

  it('keeps /ignore-me out of search and the sitemap', () => {
    const head = headFor('/ignore-me');
    expect(head.noindex).toBe(true);
    expect(head.canonical).toBeUndefined();
    expect(head.title).toBe('Analytics opt-out');
    expect(sitemapXml()).not.toContain('ignore-me');
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
