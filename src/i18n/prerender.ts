// Build-time output: one HTML file per page and language with that page's
// <head> filled in and the app's HTML already in #root (rendered by
// src/entry-server.tsx), plus the sitemap. vite.config.ts writes the files;
// vercel.json routes each URL to its file. Plain TypeScript so it runs in the
// build and in tests.

import { SITE_URL, BUSINESS_NAME } from '../config/site.ts';
import { headFor, type HeadData } from './head.ts';
import { LANGS, SPANISH_PUBLIC, localizePath, stripLang } from './lang.ts';
import { SITE_ROUTES } from './meta.ts';
import { pageFileFor } from '../pageFiles.ts';

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

/** Puts the app's pre-rendered HTML inside the built index.html's empty #root. */
export function applyBody(indexHtml: string, appHtml: string): string {
  return indexHtml.replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
}

/** Adds tags at the end of <head>. */
export function addToHead(indexHtml: string, tags: string[]): string {
  return tags.length ? indexHtml.replace('</head>', () => `  ${tags.join('\n    ')}\n  </head>`) : indexHtml;
}

/** The parts of Vite's build manifest (build.manifest) used here. */
export type BuildManifest = Record<string, { file: string; imports?: string[]; isEntry?: boolean }>;

/**
 * <link rel="modulepreload"> for a page's own chunk and the chunks it imports,
 * so the browser fetches them alongside the main bundle instead of after it.
 * Chunks index.html already preloads are left out.
 */
export function pagePreloadTags(manifest: BuildManifest, path: string): string[] {
  const file = pageFileFor(stripLang(path));
  const page = file && manifest[`src/pages/${file}.tsx`];
  if (!page) return [];
  const already = new Set<string>();
  const collect = (key: string, into: Set<string>) => {
    const chunk = manifest[key];
    if (!chunk || into.has(chunk.file)) return;
    into.add(chunk.file);
    chunk.imports?.forEach(k => collect(k, into));
  };
  for (const [key, chunk] of Object.entries(manifest)) if (chunk.isEntry) collect(key, already);
  const wanted = new Set<string>();
  collect(`src/pages/${file}.tsx`, wanted);
  return [...wanted].filter(f => !already.has(f)).map(f => `<link rel="modulepreload" crossorigin href="/${f}">`);
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
