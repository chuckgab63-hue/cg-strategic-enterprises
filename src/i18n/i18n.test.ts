import { describe, it, expect } from 'vitest';
// ?raw: read as text through Vite, so the test needs no Node types.
import vercelJson from '../../vercel.json?raw';
import { langFromPath, localizePath, stripLang, SPANISH_PUBLIC } from './lang';
import { headFor } from './head';
import { SITE_ROUTES, findRoute, routeLangs } from './meta';
import { applyHead, prerenderTargets, renderHeadTags, sitemapXml } from './prerender';

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
    expect(findRoute('/fluid')?.path).toBe('/fluid-dynamics');
  });

  it('has no route for the retired /portfolio, which redirects in vercel.json', () => {
    expect(findRoute('/portfolio')).toBeUndefined();
    expect(sitemapXml()).not.toContain('/portfolio');
    const { redirects } = JSON.parse(vercelJson) as { redirects: { source: string; destination: string; statusCode: number }[] };
    const bySource = new Map(redirects.map(r => [r.source, r]));
    for (const [from, to] of [['/portfolio', '/meal-prep-ordering'], ['/es/portfolio', '/es/meal-prep-ordering'], ['/case-studies', '/meal-prep-ordering']]) {
      expect(bySource.get(from)?.destination, from).toBe(to);
      expect(bySource.get(from)?.statusCode, from).toBe(301);
    }
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
    // Not simply routes x languages any more: a watch page built from an
    // English-only recording has no Spanish URL at all (SiteRoute.langs).
    const expected = SITE_ROUTES.reduce(
      (n, r) => n + routeLangs(r).filter(l => SPANISH_PUBLIC || l === 'en').length, 0);
    expect(locs.length).toBe(expected);
    for (const [, loc, , lastmod] of locs) expect(lastmod, loc).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    // A page and its Spanish twin share the route's date. /pest-control moved
    // to the 23rd when its title was shortened, and /es/pest-control moved
    // with it although only the title changed: the date belongs to the route.
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/pest-control</loc>\n    <lastmod>2026-11-23</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/es/pest-control</loc>\n    <lastmod>2026-11-23</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/contact</loc>\n    <lastmod>2026-11-18</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/</loc>\n    <lastmod>2026-11-18</lastmod>');
    // The starter offer page, its title shortened on the 23rd, both languages.
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/missed-call-rescue</loc>\n    <lastmod>2026-11-23</lastmod>');
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/es/missed-call-rescue</loc>\n    <lastmod>2026-11-23</lastmod>');
    // And a page whose copy has not moved keeps its own, so "today everywhere" would fail here.
    expect(xml).toContain('<loc>https://www.cgstrategic.dev/automations</loc>\n    <lastmod>2026-10-29</lastmod>');
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
    const out = applyHead(shell, headFor('/es/skunkworks'));
    expect(out).toContain('<html lang="es">');
    expect(out).toContain(`<title>${findRoute('/skunkworks')!.meta.es.title}</title>`);
    expect(out).toContain('<link rel="canonical" href="https://www.cgstrategic.dev/es/skunkworks" data-seo />');
  });

  it('has a vercel.json rewrite for every pre-rendered page', () => {
    const { rewrites } = JSON.parse(vercelJson) as { rewrites: { source: string; destination: string }[] };
    const bySource = new Map(rewrites.map(r => [r.source, r.destination]));
    for (const { path, file } of prerenderTargets()) {
      if (path === '/') continue; // served straight from dist/index.html
      expect(bySource.get(path), path).toBe(`/${file}`);
    }
    expect(rewrites.at(-1)?.destination).toBe('/app-shell.html');
  });

  it('sends a missing static asset to a real 404 instead of the shell', () => {
    const { rewrites } = JSON.parse(vercelJson) as { rewrites: { source: string; destination: string }[] };
    const last = rewrites.at(-1)!;
    expect(last.destination).toBe('/app-shell.html');
    // The last rewrite is the fallback for everything the filesystem did not
    // answer. Its source is a path-to-regexp pattern with one unnamed group,
    // which Vercel compiles to exactly `^(?:<source>)$` -- so testing that
    // regex here is testing the rule Vercel will apply. A path it does NOT
    // match reaches no rewrite at all, which is a 404.
    const shell = new RegExp(`^(?:${last.source})$`);

    // Asset-shaped URLs: a crawler holding a dead image or video URL gets a
    // 404 it can drop, not a 200 of the noindex app shell.
    for (const url of [
      '/videos/nope.mp4',
      '/videos/mealprep-demo-hero-poster.jpg',
      '/guides/nope.pdf',
      '/guides/screens/nope.png',
      '/images/logo.png',
      '/og/missing.jpg',
      '/feature-screens/missing.webp',
      '/es/videos/missing.mp4',
      '/deep/path/photo.jpeg',
      '/captions.vtt',
      '/brochure.pdf',
      '/icon.svg',
    ]) {
      expect(shell.test(url), url).toBe(false);
    }

    // Page routes still fall back to the shell, which is what makes an unknown
    // URL render the app's own not-found page in the right language.
    for (const url of [
      '/',
      '/no-such-page',
      '/es/no-such-page',
      '/meal-prep-ordering/features/not-real',
      '/estimates',
    ]) {
      expect(shell.test(url), url).toBe(true);
    }

    // Known limit: the extension list is lower case, so an upper-case asset
    // URL outside the three directories above still gets the shell. Nothing on
    // the site ever links one. Inside those directories the folder rule covers
    // it whatever the case of the extension.
    expect(shell.test('/og/missing.PNG')).toBe(true);
    expect(shell.test('/videos/nope.MP4')).toBe(false);
  });

  it('redirects the retired JPEG posters to the WebP files that replaced them', () => {
    const { redirects } = JSON.parse(vercelJson) as { redirects: { source: string; destination: string; statusCode: number }[] };
    const bySource = new Map(redirects.map(r => [r.source, r]));
    for (const name of ['mealprep-demo-hero-poster', 'mealprep-demo-hero-es-poster']) {
      const from = `/videos/${name}.jpg`;
      expect(bySource.get(from)?.destination, from).toBe(`/videos/${name}.webp`);
      expect(bySource.get(from)?.statusCode, from).toBe(301);
    }
  });
});

// A broken link-preview image fails silently: the page is fine, the card is
// blank, and nobody notices until a post is already out. These are the parts
// that can be checked without fetching anything.
describe('social preview images', () => {
  /** One path, or one per language: the files an og block points at. */
  const imagePaths = (image: string | Record<string, string>) =>
    typeof image === 'string' ? [image] : Object.values(image);

  it('declares 1200x630 and alt text in both languages wherever a page has one', () => {
    const withOg = SITE_ROUTES.filter(r => r.og);
    expect(withOg.length).toBeGreaterThan(0);
    for (const route of withOg) {
      const og = route.og!;
      // The size every scraper crops to. Anything else gets letterboxed or cut.
      expect(og.width, route.path).toBe(1200);
      expect(og.height, route.path).toBe(630);
      for (const path of imagePaths(og.image)) expect(path.startsWith('/'), route.path).toBe(true);
      for (const lang of ['en', 'es'] as const) {
        expect(og.alt[lang], `${lang} ${route.path}`).toBeTruthy();
      }
    }
  });

  it('never points a preview tag at a WebP, which LinkedIn will not render', () => {
    for (const route of SITE_ROUTES) {
      if (!route.og) continue;
      for (const path of imagePaths(route.og.image)) expect(path, route.path).toMatch(/[.](?:jpe?g|png)$/);
    }
  });

  it('gives /lawn-care an absolute image URL and the full tag set, in both languages', () => {
    for (const [path, alt] of [
      ['/lawn-care', findRoute('/lawn-care')!.og!.alt.en],
      ['/es/lawn-care', findRoute('/lawn-care')!.og!.alt.es],
    ] as const) {
      const tags = renderHeadTags(headFor(path));
      // Absolute, not /og/lawn-care.jpg: a scraper has no page to resolve it against.
      expect(tags, path).toContain('<meta property="og:image" content="https://www.cgstrategic.dev/og/lawn-care.jpg" data-seo />');
      expect(tags, path).toContain('<meta property="og:image:width" content="1200" data-seo />');
      expect(tags, path).toContain('<meta property="og:image:height" content="630" data-seo />');
      expect(tags, path).toContain('og:image:alt');
      expect(tags, path).toContain(alt.replace(/"/g, '&quot;'));
      expect(tags, path).toContain('<meta name="twitter:card" content="summary_large_image" data-seo />');
      expect(tags, path).toContain('<meta name="twitter:image" content="https://www.cgstrategic.dev/og/lawn-care.jpg" data-seo />');
    }
  });

  it('gives every service page a card, in both languages', () => {
    for (const path of ['/pest-control', '/lawn-care', '/meal-prep-ordering']) {
      expect(findRoute(path)!.og, path).toBeTruthy();
      for (const url of [path, `/es${path}`]) {
        const tags = renderHeadTags(headFor(url));
        expect(tags, url).toContain('<meta property="og:image" content="https://www.cgstrategic.dev/og/');
        expect(tags, url).toContain('<meta name="twitter:image" content="https://www.cgstrategic.dev/og/');
      }
    }
  });

  it('serves the Spanish meal-prep card on the Spanish page and the English one on the English page', () => {
    // The one route with a picture per language: its words are part of the
    // image, so a shared card would put English on the Spanish page.
    const en = renderHeadTags(headFor('/meal-prep-ordering'));
    const es = renderHeadTags(headFor('/es/meal-prep-ordering'));
    expect(en).toContain('content="https://www.cgstrategic.dev/og/meal-prep-ordering.jpg"');
    expect(en).not.toContain('meal-prep-ordering-es.jpg');
    expect(es).toContain('content="https://www.cgstrategic.dev/og/meal-prep-ordering-es.jpg"');
    // And a route with one shared image still gives both languages that image.
    expect(renderHeadTags(headFor('/es/pest-control'))).toContain('content="https://www.cgstrategic.dev/og/pest-control.jpg"');
  });
});
