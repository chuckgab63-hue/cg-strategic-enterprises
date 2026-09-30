import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  LEGAL_BUSINESS_NAME, SITE_URL, PHONE_INTL, EMAIL, ADDRESS,
} from './src/config/site.ts'

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    organizationJsonLd(),
  ],
})
