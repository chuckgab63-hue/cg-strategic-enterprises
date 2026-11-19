// The meal-prep demo video in the hero of /meal-prep-ordering: the files, the
// facts about them, and the VideoObject that describes them to crawlers. One
// module, so the player and the structured data can never disagree about which
// file plays, how long it runs, or what it shows.
//
// Narration is English only, which is why the Spanish page keeps its own hero
// and links here instead of embedding the same clip (src/pages/MealPrepOrdering.tsx).

import { BUSINESS_NAME, ORGANIZATION_ID, SITE_URL } from './site';

/**
 * The files, served straight from public/videos. The width and height are the
 * mp4's own, given to the element so the 16:9 box has its shape before the
 * poster arrives rather than collapsing and pushing the hero copy around.
 */
export const DEMO_VIDEO = {
  mp4: '/videos/mealprep-demo-hero.mp4',
  poster: '/videos/mealprep-demo-hero-poster.jpg',
  captions: '/videos/mealprep-demo-hero.en.vtt',
  width: 1280,
  height: 720,
  /**
   * 80.7s in the file, rounded up: it is the number in the line under the video
   * and in the duration below, and "81-second tour" is honest about a clip that
   * runs 80.67s while "80-second" would not be.
   */
  seconds: 81,
  /** The date the clip was published, for the VideoObject's uploadDate. */
  uploadDate: '2026-11-19',
};

/**
 * The anchor the Spanish page's link lands on. ScrollToTop.tsx scrolls to it by
 * id after the route change, so it has to be on an element that exists in the
 * pre-rendered markup — the figure, not the video.
 */
export const DEMO_VIDEO_ANCHOR = 'demo-video';

/** Seconds as a schema.org ISO 8601 duration: 81 -> PT1M21S. */
function isoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}

/**
 * The VideoObject for /meal-prep-ordering, and that page alone: one video, one
 * page claiming it. The Spanish page links to this one rather than describing
 * the same file again.
 *
 * `publisher` points at the Organization node by @id instead of repeating the
 * company's details. vite.config.ts puts that node in the head of every page,
 * this one included, so the reference always resolves.
 */
export const DEMO_VIDEO_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: `Meal-prep online ordering demo — ${BUSINESS_NAME}`,
  description:
    "An 81-second walkthrough of online ordering for a meal prep business. The customer side: this week's menu with a live countdown to the order cutoff, macros and portion sizes on every meal, a cart with a free-delivery bar, weekly plans customers can skip or pause themselves, and delivery, pickup, coupons and gift cards at checkout. The kitchen side: every order in one list, prep and shopping lists built when the cutoff hits, nutrition labels for the week in one click, delivery routes in stop order, and revenue, repeat customers and best sellers.",
  thumbnailUrl: `${SITE_URL}${DEMO_VIDEO.poster}`,
  contentUrl: `${SITE_URL}${DEMO_VIDEO.mp4}`,
  uploadDate: DEMO_VIDEO.uploadDate,
  duration: isoDuration(DEMO_VIDEO.seconds),
  publisher: { '@id': ORGANIZATION_ID },
};

/** The JSON-LD as the text of a script tag, escaped as the other nodes are. */
export function demoVideoJsonLdText(): string {
  return JSON.stringify(DEMO_VIDEO_JSON_LD).replace(/</g, '\\u003c');
}
