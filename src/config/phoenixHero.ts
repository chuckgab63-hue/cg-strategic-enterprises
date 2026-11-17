// The home page hero's video and its poster. Shared by the component that
// renders them (src/components/PhoenixHero.tsx) and the build's
// <link rel="preload"> (src/i18n/prerender.ts), so both ask for the same file
// and the preload is a head start rather than a second download.
//
// Phoenix video: generated with Runway (Kling 4.0) from an original photo by
// Chuck Gabbard.

/**
 * The still behind the clip, and the page's largest paint, so it is worth the
 * three formats: 1280x720 at 37 KB (AVIF), 64 KB (WebP) and 82 KB (JPEG). The
 * AVIF is what the preload asks for, marked with its type, so a browser
 * without AVIF skips it and takes a <source> below instead of downloading a
 * file it cannot show.
 */
export const PHOENIX_POSTER = {
  avif: '/video/phoenix-hero-poster.avif',
  webp: '/video/phoenix-hero-poster.webp',
  jpeg: '/video/phoenix-hero-poster.jpg',
  width: 1280,
  height: 720,
};

export const PHOENIX_WEBM = '/video/phoenix-hero.webm';
export const PHOENIX_MP4 = '/video/phoenix-hero.mp4';
