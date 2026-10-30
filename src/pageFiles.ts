// Which file in src/pages renders each English path. App.tsx loads each page
// as its own chunk from this list, and the build (vite.config.ts) uses it to
// preload the right chunk in every pre-rendered page. Plain TypeScript with
// no React, so vite.config.ts can import it.
//
// Aliases render the same page; SeoHead points their canonical at the main
// path (src/i18n/meta.ts).
export const PAGE_FILES: [path: string, file: string][] = [
  ['', 'Home'],
  ['/automations', 'Automations'],
  ['/portfolio', 'Portfolio'],
  ['/case-studies', 'Portfolio'],
  ['/case-study', 'Portfolio'],
  ['/work/one-source-total-pest-control', 'OneSourceCaseStudy'],
  ['/cinematic', 'CinematicSequences'],
  ['/fluid', 'FluidDynamics'],
  ['/fluid-dynamics', 'FluidDynamics'],
  ['/ui-polish', 'UIPolish'],
  ['/skunkworks', 'Skunkworks'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
  ['/contact', 'Contact'],
  ['/meal-prep-calculator', 'MealPrepCalculator'],
  ['/website-check', 'WebsiteCheck'],
  ['/missed-call-calculator', 'MissedCallCalculator'],
  ['/faq', 'Faq'],
  ['/answering-service', 'AnsweringService'],
  ['/meal-prep-ordering', 'MealPrepOrdering'],
  ['/demo-guide', 'DemoGuide'],
  ['/search-ai-visibility', 'SearchAiVisibility'],
];

/** The page file for an English path ("/" for the home page), if it has one. */
export function pageFileFor(englishPath: string): string | undefined {
  const path = englishPath === '/' ? '' : englishPath;
  return PAGE_FILES.find(([p]) => p === path)?.[1];
}
