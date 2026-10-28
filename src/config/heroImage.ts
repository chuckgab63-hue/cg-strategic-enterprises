// The home page hero image: its largest paint on phones and desktops. Its
// fetchPriority="high" in src/pages/Home.tsx makes React put a matching
// <link rel="preload"> in the pre-rendered HTML, so it downloads with the page.
export const HERO_IMAGE = {
  src: '/hero-live.webp',
  /** 640px for phones (hero-live-640.webp, made from the 1024px original), full size above. */
  srcSet: '/hero-live-640.webp 640w, /hero-live.webp 1024w',
  /** Matches the img's max-w-sm / md:max-w-md / lg:max-w-lg. */
  sizes: '(min-width: 1024px) 512px, (min-width: 768px) 448px, 384px',
  width: 1024,
  height: 1024,
};
