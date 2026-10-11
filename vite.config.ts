import { defineConfig, type Plugin } from 'vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  LEGAL_BUSINESS_NAME, SITE_URL, PHONE_INTL, EMAIL, ADDRESS,
} from './src/config/site.ts'
import { CASE_STUDY_PAGES } from './src/config/caseStudies.ts'

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

// The app is a single-page app, so link previews (which don't run JavaScript)
// would only ever see index.html's generic head. For each case study, write a
// copy of the built index.html at <path>/index.html with that page's title,
// description, canonical and Open Graph tags. vercel.json routes the clean URL
// to it; the React app then boots as usual. data-site-title / data-prerendered
// let usePageMeta put the generic head back when the visitor navigates away.
function prerenderedCaseStudyHeads(): Plugin {
  let outDir = 'dist'
  const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return {
    name: 'prerendered-case-study-heads',
    apply: 'build',
    configResolved: (config) => { outDir = config.build.outDir },
    closeBundle() {
      const html = readFileSync(join(outDir, 'index.html'), 'utf8')
      const siteTitle = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
      for (const page of CASE_STUDY_PAGES) {
        const url = SITE_URL + page.path
        const image = SITE_URL + page.ogImage
        const head = [
          `<title data-site-title="${esc(siteTitle)}">${esc(page.title)}</title>`,
          `<meta name="description" content="${esc(page.description)}" data-prerendered />`,
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:type" content="article" />`,
          `<meta property="og:site_name" content="${esc(LEGAL_BUSINESS_NAME)}" />`,
          `<meta property="og:title" content="${esc(page.title)}" />`,
          `<meta property="og:description" content="${esc(page.description)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${image}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${esc(page.ogImageAlt)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
        ].join('\n    ')
        const dir = join(outDir, page.path)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), html.replace(/<title>[^<]*<\/title>/, head))
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    organizationJsonLd(),
    prerenderedCaseStudyHeads(),
  ],
})
