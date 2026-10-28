import type React from 'react';
import { Suspense, lazy, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';

// Global Components
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import ScrollToTop from './components/ScrollToTop';

import SeoHead from './i18n/SeoHead';
import SpanishPrompt from './components/SpanishPrompt';
import { analyticsBeforeSend, listenForAlexCalls } from './lib/analytics';
import { PAGE_FILES } from './pageFiles';

// Each page is its own chunk, so a visitor only downloads the page they're on.
// Pre-rendered pages already show their HTML while the chunk loads: React
// keeps the server markup inside the Suspense boundary until it can hydrate it.
const pageModules = import.meta.glob<{ default: React.ComponentType }>('./pages/*.tsx');
const pageCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>();
function page(file: string) {
  if (!pageCache.has(file)) pageCache.set(file, lazy(pageModules[`./pages/${file}.tsx`]));
  return pageCache.get(file)!;
}
const NotFound = page('NotFound');
const IgnoreMe = page('IgnoreMe');

// The router lives outside App: BrowserRouter in the browser (src/main.tsx),
// StaticRouter when the build pre-renders each page (src/entry-server.tsx).
export default function App() {
  useEffect(listenForAlexCalls, []);

  return (
    <>
      <ScrollToTop />
      <SeoHead />
      {/* Vercel Web Analytics: page views for every route, /es included, and
          client-side navigation. URLs go without query strings, and nothing is sent
          from a browser that opted out at /ignore-me (src/lib/analytics.ts). */}
      <Analytics beforeSend={analyticsBeforeSend} />

      <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-brand-orange selection:text-white">
        {/* Fixed Navigation */}
        <GlobalHeader />

        {/* Main Routing Canvas */}
        <main className="flex-grow w-full">
          <Suspense fallback={null}>
            <Routes>
              {/* Every page also lives under /es (src/i18n/lang.ts). */}
              {['', '/es'].flatMap(prefix => [
                ...PAGE_FILES.map(([path, file]) => {
                  const Page = page(file);
                  return <Route key={prefix + path} path={prefix + path || '/'} element={<Page />} />;
                }),
                <Route key={`${prefix}*`} path={`${prefix}/*`} element={<NotFound />} />,
              ])}
              {/* Unlisted owner tool: not in SITE_ROUTES, so no sitemap, no prerender, noindex. */}
              <Route path="/ignore-me" element={<IgnoreMe />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <GlobalFooter />
        <SpanishPrompt />
      </div>
    </>
  );
}
