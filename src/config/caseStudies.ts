// Case study pages with their own URL. vite.config.ts also writes each one's
// title, description and Open Graph tags into a prerendered HTML file, so link
// previews and crawlers get them without running JavaScript. public/sitemap.xml
// lists the paths; add new ones there too.

export const ONE_SOURCE_CASE_STUDY = {
  path: '/work/one-source-total-pest-control',
  title: 'One Source Total Pest Control: Case Study | CG Strategic',
  description:
    'How we rebuilt a Jacksonville pest control website in Astro: a page for every service and pest, an AI pest photo analyzer, an AI voice assistant and one automated lead intake.',
  ogImage: '/portfolio/onesource/onesource-og.jpg',
  ogImageAlt: 'One Source Total Pest Control home page: "Friendly, local pest control in Jacksonville, FL" over a palm-tree hero video',
  // TODO(launch): switch to One Source's real domain once it moves to the new site.
  liveSiteUrl: 'https://onesourcewsv2.vercel.app',
};

export const CASE_STUDY_PAGES = [ONE_SOURCE_CASE_STUDY];
