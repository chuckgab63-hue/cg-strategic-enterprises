import { build, defineConfig, type Plugin } from 'vite'
import { configDefaults } from 'vitest/config'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  LEGAL_BUSINESS_NAME, SITE_URL, PHONE_INTL, EMAIL, ADDRESS,
} from './src/config/site.ts'
import {
  FALLBACK_FILE, addToHead, applyBody, applyFallbackHead, applyHead, headFor, pagePreloadTags, prerenderTargets, sitemapXml, type BuildManifest,
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

// Pre-renders the site. For every page in both languages, write a copy of the
// built index.html with that page's <html lang>, title, description,
// canonical, hreflang and Open Graph tags (src/i18n/prerender.ts) and the
// app's own HTML in #root (src/entry-server.tsx), so the content, nav, buttons
// and contact details are there before any JavaScript runs. Also a noindex
// shell for every other URL, and the sitemap. vercel.json routes each URL to
// its file; src/main.tsx then hydrates the page and SeoHead keeps the head
// current as the visitor navigates.
function prerenderedPages(): Plugin {
  let outDir = 'dist'
  let root = process.cwd()
  return {
    name: 'prerendered-pages',
    apply: 'build',
    configResolved: (config) => {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      // Bundle the app for Node, separately from the browser build. The
      // throwaway bundle lives outside dist so it's never deployed.
      const ssrDir = join(root, 'node_modules', '.prerender')
      await build({
        configFile: false,
        root,
        logLevel: 'warn',
        plugins: [react()],
        build: { ssr: 'src/entry-server.tsx', outDir: ssrDir, emptyOutDir: true, copyPublicDir: false },
      })
      const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href) as { render: (path: string) => Promise<string> }

      // build.manifest maps each page's source file to its chunk, for the preloads.
      const manifestDir = join(outDir, '.vite')
      const manifest = JSON.parse(readFileSync(join(manifestDir, 'manifest.json'), 'utf8')) as BuildManifest
      const html = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const { path, file } of prerenderTargets()) {
        const target = join(outDir, file)
        mkdirSync(dirname(target), { recursive: true })
        const page = applyBody(applyHead(html, headFor(path)), await render(path))
        writeFileSync(target, addToHead(page, pagePreloadTags(manifest, path)))
      }
      writeFileSync(join(outDir, FALLBACK_FILE), applyFallbackHead(html))
      writeFileSync(join(outDir, 'sitemap.xml'), sitemapXml())
      rmSync(manifestDir, { recursive: true, force: true })
      rmSync(ssrDir, { recursive: true, force: true })
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
  // Read by prerenderedPages(), then deleted so it isn't deployed.
  build: { manifest: true },
  test: {
    // claude-seo/ is a separate plugin repo checked out locally (gitignored).
    exclude: [...configDefaults.exclude, 'claude-seo/**'],
  },
})
