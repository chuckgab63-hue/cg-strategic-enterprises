// The video watch pages: one page per clip, at /videos/<slug>.
//
// Why these exist: Search Console's Video indexing report will not index a
// clip that only ever appears as a decorative background or as one element
// inside a page about something else — it reports "Video isn't on a watch
// page". A watch page is a page whose main subject is the video: the player
// first and largest, a title, a description and a transcript, and a
// VideoObject that describes exactly the file the player loads.
//
// The clips themselves are src/config/videos.ts, which already carries every
// field the VideoObject needs. This file only says which clip is the subject
// of which page, and which offer that page sends a visitor to.
//
// Language: a page exists in a language only when the clip exists in that
// language. Four of the six are English-only recordings, so they have no
// /es/ page at all rather than a Spanish page playing English narration —
// the same rule /es/pest-control already follows by showing no tour. The
// Spanish hub still lists all six and labels those four.

import type { Lang } from '../i18n/lang.ts';
import { DEMO_VIDEO, REEL_VIDEO, RESCUE_VIDEO, TOUR_VIDEO, type VideoFile } from './videos.ts';
import { DM_RESCUE_PATH, MISSED_CALL_RESCUE_PATH, RESCUE_BUNDLE_ANCHOR } from './offers.ts';

export const VIDEOS_HUB_PATH = '/videos';

/** The watch page path for a slug: "dm-rescue-demo" -> "/videos/dm-rescue-demo". */
export function watchPath(slug: string): string {
  return `${VIDEOS_HUB_PATH}/${slug}`;
}

export interface WatchPage {
  slug: string;
  /**
   * The clip this page is about, per language. A slug with no `es` row has no
   * Spanish page: it is not routed, not pre-rendered, not in the sitemap, and
   * carries no Spanish hreflang.
   */
  video: { en: VideoFile; es?: VideoFile };
  /** The offer page this clip sells; the page's main call to action. */
  offer: string;
  /** utm_campaign on this page's booking link. */
  campaign: string;
}

export const WATCH_PAGES: WatchPage[] = [
  {
    slug: 'missed-call-rescue-demo',
    video: { en: RESCUE_VIDEO.en, es: RESCUE_VIDEO.es },
    offer: MISSED_CALL_RESCUE_PATH,
    campaign: 'video-missed-call-rescue',
  },
  {
    slug: 'dm-rescue-demo',
    video: { en: REEL_VIDEO.dmRescue },
    offer: DM_RESCUE_PATH,
    campaign: 'video-dm-rescue',
  },
  {
    slug: 'meal-prep-ordering-tour',
    video: { en: DEMO_VIDEO.en, es: DEMO_VIDEO.es },
    offer: '/meal-prep-ordering',
    campaign: 'video-meal-prep',
  },
  {
    slug: 'lawn-care-site-tour',
    video: { en: TOUR_VIDEO.lawn },
    offer: '/lawn-care',
    campaign: 'video-lawn-care',
  },
  {
    slug: 'pest-control-site-tour',
    video: { en: TOUR_VIDEO.pest },
    offer: '/pest-control',
    campaign: 'video-pest-control',
  },
  {
    // Both offers at once, so it sends people to the bundle card rather than
    // to one of the two pages.
    slug: 'never-miss-a-customer',
    video: { en: REEL_VIDEO.manta },
    offer: `${MISSED_CALL_RESCUE_PATH}#${RESCUE_BUNDLE_ANCHOR}`,
    campaign: 'video-rescue-bundle',
  },
];

/** The watch page for a slug, if there is one. */
export function watchPageFor(slug: string): WatchPage | undefined {
  return WATCH_PAGES.find(p => p.slug === slug);
}

/** The languages a watch page exists in. English always; Spanish only with a Spanish recording. */
export function watchPageLangs(page: WatchPage): Lang[] {
  return page.video.es ? ['en', 'es'] : ['en'];
}

/**
 * The clip a given language's page plays. Undefined when that language has no
 * page — callers treat that as "not found" rather than falling back to the
 * English file, which is the whole point of the split.
 */
export function watchVideo(page: WatchPage, lang: Lang): VideoFile | undefined {
  return lang === 'es' ? page.video.es : page.video.en;
}
