// The <video:video> block a watch page's sitemap entry carries.
//
// Google reads the video sitemap extension separately from the page's
// VideoObject JSON-LD, and the two are checked against each other: the
// thumbnail, title, description, file and duration here must describe the
// same clip the page's markup describes, or the video is dropped rather than
// merged. Both sides therefore read the same row in src/config/videos.ts.
//
// Only the watch pages get one. A page with a decorative background clip does
// not, which is the distinction Search Console is drawing when it reports
// "Video isn't on a watch page".

import { SITE_URL } from '../config/site.ts';
import { VIDEOS_HUB_PATH, WATCH_PAGES, watchVideo } from '../config/watchPages.ts';
import type { Lang } from './lang.ts';

/** XML text escaping; the descriptions carry apostrophes and the odd ampersand. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Seconds, which is what <video:duration> wants — not the ISO 8601 the JSON-LD uses. */
function seconds(value: number): string {
  return String(value);
}

/**
 * The <video:video> element for a route, or '' when the route is not a watch
 * page. Returned as text with a leading newline so it drops straight into the
 * <url> template in prerender.ts.
 */
export function videoSitemapEntry(routePath: string, lang: Lang): string {
  if (!routePath.startsWith(`${VIDEOS_HUB_PATH}/`)) return '';
  const slug = routePath.slice(VIDEOS_HUB_PATH.length + 1);
  const page = WATCH_PAGES.find(p => p.slug === slug);
  if (!page) return '';
  const file = watchVideo(page, lang);
  if (!file) return '';

  return [
    '',
    '    <video:video>',
    `      <video:thumbnail_loc>${esc(SITE_URL + file.poster)}</video:thumbnail_loc>`,
    `      <video:title>${esc(file.name)}</video:title>`,
    `      <video:description>${esc(file.description)}</video:description>`,
    `      <video:content_loc>${esc(SITE_URL + file.mp4)}</video:content_loc>`,
    `      <video:duration>${seconds(file.seconds)}</video:duration>`,
    '    </video:video>',
  ].join('\n');
}
