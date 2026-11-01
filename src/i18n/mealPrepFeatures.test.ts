import { describe, it, expect } from 'vitest';
import { CATALOG } from '../config/mealPrepFeatureCatalog';
import { FEATURE_SCREENS } from '../config/featureScreens';
import vercelJson from '../../vercel.json?raw';
import { PAGE_FILES } from '../pageFiles';
import { headFor } from './head';
import { SITE_ROUTES } from './meta';
import { prerenderTargets, sitemapXml } from './prerender';
import { FEATURES_UI, FEATURE_SLUGS, MEAL_PREP_FEATURES_PATH, featurePath, loadFeaturePages, slugFromPath } from './mealPrepFeatures';
import { FEATURE_PAGES_EN } from './mealPrepFeaturesEn';
import { FEATURE_PAGES_ES } from './mealPrepFeaturesEs';
import { breadcrumbJsonLd } from './breadcrumbs';

const en = FEATURE_PAGES_EN;
const es = FEATURE_PAGES_ES;
const content = { en: { ui: FEATURES_UI.en, pages: en }, es: { ui: FEATURES_UI.es, pages: es } };

/** Every string on every page, in both languages. */
function allText(): string[] {
  const out: string[] = [];
  for (const lang of ['en', 'es'] as const) {
    for (const p of content[lang].pages) {
      out.push(p.navTitle, p.eyebrow, p.title, p.intro, p.card, ...p.problem);
      for (const b of p.how) out.push(b.title, b.body, ...(b.points ?? []), b.screen?.alt ?? '', b.screen?.caption ?? '');
      for (const g of p.grow) out.push(g.title, g.body);
      for (const d of p.demo) out.push(d.label);
      for (const f of p.faq) out.push(f.question, f.answer);
    }
  }
  return out.filter(Boolean);
}

describe('meal-prep feature pages: content', () => {
  it('has all eleven pages, in the same order, in both languages', () => {
    expect(en.map(p => p.slug)).toEqual([...FEATURE_SLUGS]);
    expect(es.map(p => p.slug)).toEqual([...FEATURE_SLUGS]);
  });

  it('keeps the Spanish page in step with the English one', () => {
    for (const e of en) {
      const s = es.find(p => p.slug === e.slug)!;
      expect(s.how.map(b => [b.side, b.screen?.id, b.points?.length ?? 0]), e.slug).toEqual(e.how.map(b => [b.side, b.screen?.id, b.points?.length ?? 0]));
      expect(s.features, e.slug).toEqual(e.features);
      expect(s.grow.length, e.slug).toBe(e.grow.length);
      expect(s.demo.map(d => [d.path, d.side]), e.slug).toEqual(e.demo.map(d => [d.path, d.side]));
      expect(s.faq.map(f => f.id), e.slug).toEqual(e.faq.map(f => f.id));
      expect(s.related, e.slug).toEqual(e.related);
    }
  });

  it('covers every feature in the app registry exactly once, except getting started', () => {
    const covered = en.flatMap(p => p.features);
    expect(new Set(covered).size).toBe(covered.length);
    expect([...covered].sort()).toEqual(CATALOG.map(f => f.key).sort());
    expect(en.find(p => p.slug === 'getting-started')!.features).toEqual([]);
  });

  it('has 3 to 5 FAQs per detail page, with unique ids', () => {
    for (const p of [...en, ...es]) {
      expect(p.faq.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(p.faq.length, p.slug).toBeLessThanOrEqual(5);
      expect(new Set(p.faq.map(f => f.id)).size, p.slug).toBe(p.faq.length);
    }
  });

  it('only uses screenshots that exist, and demo paths that are paths', () => {
    for (const p of en) {
      for (const b of p.how) {
        if (b.screen) {
          const entry = FEATURE_SCREENS[b.screen.id];
          expect(entry, `${p.slug}: ${b.screen.id}`).toBeTruthy();
          if (b.screen.forceLang === 'es') expect(entry.es, b.screen.id).toBeTruthy();
        }
      }
      for (const d of p.demo) expect(d.path.startsWith('/'), d.path).toBe(true);
      expect(p.demo.length, p.slug).toBeGreaterThan(0);
      expect(p.related.length, p.slug).toBe(3);
      expect(p.related.includes(p.slug), p.slug).toBe(false);
    }
  });

  it('keeps every screenshot small', () => {
    for (const [id, entry] of Object.entries(FEATURE_SCREENS)) {
      expect(entry.en.kb, id).toBeLessThanOrEqual(100);
      if (entry.es) expect(entry.es.kb, id).toBeLessThanOrEqual(100);
    }
  });
});

describe('meal-prep feature pages: copy rules', () => {
  const text = allText();

  it('shows no prices', () => {
    for (const t of text) expect(t, t).not.toMatch(/\$\s?\d|\d\s?(USD|dólares|dollars)/i);
  });

  it('names no competitors', () => {
    const banned = /\b(square|squarespace|wix|woocommerce|shopify|toast|mealtrap|trainerize|stripe connect|sysco|circuit|optimoroute)\b/i;
    for (const t of text) expect(t, t).not.toMatch(banned);
  });

  it('has no coming-soon copy, regulatory claims or invented statistics', () => {
    for (const t of text) {
      expect(t, t).not.toMatch(/coming soon|próximamente|subliminal|\bFDA\b|certified|certificad[oa]|guarantee|garantiz/i);
      expect(t, t).not.toMatch(/\b\d{2,3}\s?%/);
    }
  });

  it('never says a meal is safe for someone', () => {
    for (const t of text) expect(t, t).not.toMatch(/safe for you|seguro para usted|100% safe|allergy[- ]safe|allergen[- ]free|libre de alérgenos|sin alérgenos/i);
  });
});

describe('meal-prep feature pages: SEO and routing', () => {
  const routes = SITE_ROUTES.filter(r => r.path === MEAL_PREP_FEATURES_PATH || r.path.startsWith(`${MEAL_PREP_FEATURES_PATH}/`));

  it('has a route, a page file and a vercel rewrite for the hub and every page, in both languages', () => {
    expect(routes.map(r => r.path)).toEqual([MEAL_PREP_FEATURES_PATH, ...FEATURE_SLUGS.map(featurePath)]);
    const { rewrites } = JSON.parse(vercelJson) as { rewrites: { source: string }[] };
    for (const r of routes) {
      expect(PAGE_FILES.some(([p]) => p === r.path), r.path).toBe(true);
      expect(rewrites.some(x => x.source === r.path), r.path).toBe(true);
      expect(rewrites.some(x => x.source === `/es${r.path}`), `/es${r.path}`).toBe(true);
    }
    expect(prerenderTargets().filter(t => t.path.includes('/features')).length).toBe(routes.length * 2);
  });

  it('gives each page a unique title and description of a sensible length', () => {
    const titles = new Set<string>();
    for (const r of routes) {
      for (const lang of ['en', 'es'] as const) {
        const { title, description } = r.meta[lang];
        expect(title.length, `${lang} ${r.path} title`).toBeLessThanOrEqual(80);
        expect(description.length, `${lang} ${r.path} description`).toBeGreaterThanOrEqual(80);
        expect(description.length, `${lang} ${r.path} description`).toBeLessThanOrEqual(170);
        expect(titles.has(`${lang}|${title}`), `${lang} ${title}`).toBe(false);
        titles.add(`${lang}|${title}`);
      }
    }
  });

  it('writes canonical and hreflang for both languages', () => {
    const head = headFor('/es/meal-prep-ordering/features/labels');
    expect(head.canonical).toBe('https://www.cgstrategic.dev/es/meal-prep-ordering/features/labels');
    expect(head.alternates.map(a => a.hreflang)).toEqual(['en', 'es', 'x-default']);
    expect(head.alternates[0].href).toBe('https://www.cgstrategic.dev/meal-prep-ordering/features/labels');
    expect(head.noindex).toBe(false);
  });

  it('lists every page in the sitemap, in both languages', () => {
    const xml = sitemapXml();
    for (const r of routes) {
      expect(xml).toContain(`<loc>https://www.cgstrategic.dev${r.path}</loc>`);
      expect(xml).toContain(`<loc>https://www.cgstrategic.dev/es${r.path}</loc>`);
    }
  });

  it('loads each language copy on demand', async () => {
    expect(await loadFeaturePages('en')).toBe(FEATURE_PAGES_EN);
    expect(await loadFeaturePages('es')).toBe(FEATURE_PAGES_ES);
  });

  it('reads the slug from a path', () => {
    expect(slugFromPath('/meal-prep-ordering/features/labels')).toBe('labels');
    expect(slugFromPath('/meal-prep-ordering/features/labels/')).toBe('labels');
    expect(slugFromPath('/meal-prep-ordering/features')).toBeUndefined();
    expect(slugFromPath('/meal-prep-ordering/features/nope')).toBeUndefined();
  });

  it('builds BreadcrumbList data with absolute, localized URLs', () => {
    const ld = breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Features', path: MEAL_PREP_FEATURES_PATH }], 'es');
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement.map(i => i.item)).toEqual(['https://www.cgstrategic.dev/es', 'https://www.cgstrategic.dev/es/meal-prep-ordering/features']);
    expect(ld.itemListElement.map(i => i.position)).toEqual([1, 2]);
  });
});
