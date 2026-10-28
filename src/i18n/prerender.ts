// Build-time output for SEO: one HTML file per page and language with that
// page's <head> already filled in (the body still renders in the browser),
// and the sitemap. vite.config.ts writes the files; vercel.json routes each
// URL to its file. Plain TypeScript so it runs in the build and in tests.

import { SITE_URL, BUSINESS_NAME } from '../config/site.ts';
import { headFor, type HeadData } from './head.ts';
import { LANGS, SPANISH_PUBLIC, langFromPath, localizePath, stripLang } from './lang.ts';
import faq, { FAQ_PATH, faqJsonLdText, faqPageJsonLdText, type FaqItem } from './faq.ts';
import answeringService, { ANSWERING_SERVICE_PATH } from './answeringService.ts';
import mealPrepOrdering, { MEAL_PREP_ORDERING_PATH } from './mealPrepOrdering.ts';
import { SITE_ROUTES } from './meta.ts';

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The tags SeoHead manages, as HTML. Each carries data-seo so SeoHead can replace them. */
export function renderHeadTags(head: HeadData): string {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" data-seo />`,
  ];
  if (head.noindex) tags.push('<meta name="robots" content="noindex" data-seo />');
  if (head.canonical) tags.push(`<link rel="canonical" href="${head.canonical}" data-seo />`);
  for (const a of head.alternates) tags.push(`<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" data-seo />`);
  if (head.og) {
    const og = head.og;
    const props: [string, string][] = [
      ['og:type', og.type], ['og:site_name', og.siteName], ['og:locale', og.locale],
      ['og:title', og.title], ['og:description', og.description], ['og:url', og.url],
      ['og:image', og.image], ['og:image:width', String(og.imageWidth)],
      ['og:image:height', String(og.imageHeight)], ['og:image:alt', og.imageAlt],
    ];
    for (const [p, c] of props) tags.push(`<meta property="${p}" content="${esc(c)}" data-seo />`);
    tags.push('<meta name="twitter:card" content="summary_large_image" data-seo />');
  }
  return tags.join('\n    ');
}

/** Puts a page's head into the built index.html: sets <html lang> and swaps the <title> for the page's tags. */
export function applyHead(indexHtml: string, head: HeadData): string {
  return indexHtml
    .replace(/<html lang="[^"]*"/, `<html lang="${head.htmlLang}"`)
    .replace(/<title>[^<]*<\/title>/, renderHeadTags(head));
}

interface StaticFaqPage {
  eyebrow: string;
  title: string;
  intro: string;
  /** Heading over the questions, when they're one section of a longer page. */
  faqTitle?: string;
  items: FaqItem[];
  jsonLd: string;
  contactLabel: string;
}

/** The pages with questions and answers that must be readable without JavaScript. */
function staticFaqPage(path: string): StaticFaqPage | null {
  const lang = langFromPath(path);
  const contactLabel = faq[lang].cta.button;
  switch (stripLang(path)) {
    case FAQ_PATH: {
      const t = faq[lang];
      return { eyebrow: t.eyebrow, title: t.title, intro: t.intro, items: t.items, jsonLd: faqJsonLdText(lang), contactLabel };
    }
    case ANSWERING_SERVICE_PATH: {
      const t = answeringService[lang];
      return { eyebrow: t.eyebrow, title: t.title, intro: t.intro, faqTitle: t.faqTitle, items: t.faq, jsonLd: faqPageJsonLdText(t.faq, ANSWERING_SERVICE_PATH, lang), contactLabel };
    }
    case MEAL_PREP_ORDERING_PATH: {
      const t = mealPrepOrdering[lang];
      return { eyebrow: t.eyebrow, title: t.title, intro: t.intro, faqTitle: t.faqTitle, items: t.faq, jsonLd: faqPageJsonLdText(t.faq, MEAL_PREP_ORDERING_PATH, lang), contactLabel };
    }
    default:
      return null;
  }
}

/**
 * Page content for visitors and crawlers that don't run JavaScript, written
 * inside #root; React replaces it when the app loads. Only the FAQ and the
 * service pages have any: their answers and FAQPage JSON-LD must be readable
 * without the app (the pages render the same questions once it boots).
 */
export function staticBodyFor(path: string): string {
  const page = staticFaqPage(path);
  if (!page) return '';
  const lang = langFromPath(path);
  // Every answer starts open: there's no script to open the one a link like /faq#ownership points at.
  const items = page.items.map(item => [
    `<details id="${item.id}" open class="scroll-mt-28 bg-slate-900/50 border border-slate-800 rounded-2xl">`,
    `<summary class="p-5 md:p-6 cursor-pointer text-white font-bold text-lg">${esc(item.question)}</summary>`,
    `<div class="px-5 md:px-6 pb-5 md:pb-6 text-slate-300 text-base leading-relaxed"><p>${esc(item.answer)}</p>`,
    item.more ? `<p class="mt-3"><a href="${localizePath(item.more.path, lang)}" class="text-brand-orange underline">${esc(item.more.label)}</a></p>` : '',
    '</div></details>',
  ].join(''));
  return [
    `<script type="application/ld+json">${page.jsonLd}</script>`,
    '<div class="flex-grow bg-slate-950 font-sans">',
    '<section class="max-w-3xl mx-auto px-6 pt-16 pb-24 text-left">',
    `<p class="text-brand-orange font-bold uppercase tracking-widest text-xs">${esc(page.eyebrow)}</p>`,
    `<h1 class="text-4xl md:text-5xl font-black text-white mt-3 mb-0">${esc(page.title)}</h1>`,
    `<p class="text-slate-300 text-base leading-relaxed mt-4 mb-10">${esc(page.intro)}</p>`,
    page.faqTitle ? `<h2 class="text-white font-bold text-xl mb-6">${esc(page.faqTitle)}</h2>` : '',
    `<div class="flex flex-col gap-3">${items.join('')}</div>`,
    `<p class="mt-12"><a href="${localizePath('/contact', lang)}" class="text-brand-orange underline">${esc(page.contactLabel)}</a></p>`,
    '</section>',
    '</div>',
  ].join('');
}

/** Puts a page's static content (if it has any) inside the built index.html's empty #root. */
export function applyStaticBody(indexHtml: string, path: string): string {
  const body = staticBodyFor(path);
  return body ? indexHtml.replace('<div id="root"></div>', `<div id="root">${body}</div>`) : indexHtml;
}

/** Every page in every language: its URL path and the HTML file that serves it. */
export function prerenderTargets(): { path: string; file: string }[] {
  return SITE_ROUTES.flatMap(route =>
    LANGS.map(lang => {
      const path = localizePath(route.path, lang);
      return { path, file: path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html` };
    }),
  );
}

/**
 * The shell for every other URL (route aliases, 404s): generic title, noindex.
 * SeoHead fills in the real head once the app loads.
 */
export const FALLBACK_FILE = 'app-shell.html';
export function applyFallbackHead(indexHtml: string): string {
  return indexHtml.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(BUSINESS_NAME)}</title>\n    <meta name="robots" content="noindex" data-seo />`,
  );
}

export function sitemapXml(): string {
  const langs = SPANISH_PUBLIC ? LANGS : (['en'] as const);
  const urls = SITE_ROUTES.flatMap(route =>
    langs.map(lang => {
      const loc = SITE_URL + localizePath(route.path, lang);
      const alternates = SPANISH_PUBLIC
        ? [...LANGS.map(l => [l, SITE_URL + localizePath(route.path, l)]), ['x-default', SITE_URL + route.path]]
            .map(([hreflang, href]) => `\n    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
            .join('')
        : '';
      return `  <url>\n    <loc>${loc}</loc>${alternates}\n  </url>`;
    }),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

export { headFor };
