import type React from 'react';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Automations from './pages/Automations';
import Portfolio from './pages/Portfolio';
import OneSourceCaseStudy from './pages/OneSourceCaseStudy';
import CinematicSequences from './pages/CinematicSequences';
import FluidDynamics from './pages/FluidDynamics';
import UIPolish from './pages/UIPolish';
import Skunkworks from './pages/Skunkworks';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import MealPrepCalculator from './pages/MealPrepCalculator';
import WebsiteCheck from './pages/WebsiteCheck';
import MissedCallCalculator from './pages/MissedCallCalculator';
import NotFound from './pages/NotFound';
import IgnoreMe from './pages/IgnoreMe';
import SeoHead from './i18n/SeoHead';
import SpanishPrompt from './components/SpanishPrompt';
import { analyticsBeforeSend, listenForAlexCalls } from './lib/analytics';

// [English path, page]. Aliases render the same page; SeoHead points their
// canonical at the main path (src/i18n/meta.ts).
const PAGES: [string, React.ComponentType][] = [
  ['', Home],
  ['/automations', Automations],
  ['/portfolio', Portfolio],
  ['/case-studies', Portfolio],
  ['/case-study', Portfolio],
  ['/work/one-source-total-pest-control', OneSourceCaseStudy],
  ['/cinematic', CinematicSequences],
  ['/fluid', FluidDynamics],
  ['/fluid-dynamics', FluidDynamics],
  ['/ui-polish', UIPolish],
  ['/skunkworks', Skunkworks],
  ['/privacy', Privacy],
  ['/terms', Terms],
  ['/contact', Contact],
  ['/meal-prep-calculator', MealPrepCalculator],
  ['/website-check', WebsiteCheck],
  ['/missed-call-calculator', MissedCallCalculator],
];

export default function App() {
  useEffect(listenForAlexCalls, []);

  return (
    <Router>
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
          <Routes>
            {/* Every page also lives under /es (src/i18n/lang.ts). */}
            {['', '/es'].flatMap(prefix => [
              ...PAGES.map(([path, Page]) => (
                <Route key={prefix + path} path={prefix + path || '/'} element={<Page />} />
              )),
              <Route key={`${prefix}*`} path={`${prefix}/*`} element={<NotFound />} />,
            ])}
            {/* Unlisted owner tool: not in SITE_ROUTES, so no sitemap, no prerender, noindex. */}
            <Route path="/ignore-me" element={<IgnoreMe />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <GlobalFooter />
        <SpanishPrompt />
      </div>
    </Router>
  );
}
