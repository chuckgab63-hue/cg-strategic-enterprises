import { defineConfig, type Plugin } from 'vite'
import { configDefaults } from 'vitest/config'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  LEGAL_BUSINESS_NAME, SITE_URL, PHONE_INTL, EMAIL, ADDRESS,
} from './src/config/site.ts'
import {
  FALLBACK_FILE, applyFallbackHead, applyHead, applyStaticBody, headFor, prerenderTargets, sitemapXml,
} from './src/i18n/prerender.ts'

// Writes Organization structured data into index.html at build time, straight
// from src/config/site.ts, so crawlers see it without running any JavaScript.
function organizationJsonLd(): Plugin {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: LEGAL_BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_INTL,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
  }
  return {
    name: 'organization-json-ld',
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(data).replace(/</g, '\\u003c'),
        injectTo: 'head',
      },
    ],
  }
}

// The app is a single-page app, so crawlers and link previews that don't run
// JavaScript would only ever see index.html's generic head. For every page in
// both languages, write a copy of the built index.html with that page's
// <html lang>, title, description, canonical, hreflang and Open Graph tags
// (src/i18n/prerender.ts), plus a noindex shell for every other URL and the
// sitemap. The FAQ also gets its answers and JSON-LD in the body, readable
// without JavaScript. vercel.json routes each URL to its file; the React app then boots
// as usual and SeoHead keeps the head current as the visitor navigates.
function prerenderedPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'prerendered-pages',
    apply: 'build',
    configResolved: (config) => { outDir = config.build.outDir },
    closeBundle() {
      const html = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const { path, file } of prerenderTargets()) {
        const target = join(outDir, file)
        mkdirSync(dirname(target), { recursive: true })
        writeFileSync(target, applyStaticBody(applyHead(html, headFor(path)), path))
      }
      writeFileSync(join(outDir, FALLBACK_FILE), applyFallbackHead(html))
      writeFileSync(join(outDir, 'sitemap.xml'), sitemapXml())
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    organizationJsonLd(),
    prerenderedPages(),
  ],
  test: {
    // claude-seo/ is a separate plugin repo checked out locally (gitignored).
    exclude: [...configDefaults.exclude, 'claude-seo/**'],
  },
})
