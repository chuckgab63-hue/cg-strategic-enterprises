// The home page hero image: its largest paint on phones and desktops. Used by
// the <picture> in src/pages/Home.tsx and the build's <link rel="preload">
// (src/i18n/prerender.ts), so both ask for the same file.
//
// Every size is made from hero-live.webp (1024x1024, the largest original we
// have; the hero shows at most 576 CSS px, so 1024 covers most 2x screens).
// AVIF first, WebP next, JPEG for anything else; the image has no transparency.
const srcset = (files: [width: number, file: string][]) => files.map(([w, file]) => `${file} ${w}w`).join(', ');

export const HERO_IMAGE = {
  width: 1024,
  height: 1024,
  avif: srcset([[480, '/hero-live-480.avif'], [768, '/hero-live-768.avif'], [1024, '/hero-live-1024.avif']]),
  webp: srcset([[480, '/hero-live-480.webp'], [768, '/hero-live-768.webp'], [1024, '/hero-live.webp']]),
  jpeg: srcset([[480, '/hero-live-480.jpg'], [768, '/hero-live-768.jpg'], [1024, '/hero-live-1024.jpg']]),
  /** Fallback src for browsers without srcset. */
  src: '/hero-live-1024.jpg',
  /**
   * The rendered width. rem is 18px from 1024px up and 16px below (index.css),
   * so: max-w-lg is 576px from lg, max-w-md 448px from md, otherwise max-w-sm
   * (384px) or the phone's width minus the 24px side gutters.
   */
  sizes: '(min-width: 1024px) 576px, (min-width: 768px) 448px, (min-width: 432px) 384px, calc(100vw - 48px)',
};
