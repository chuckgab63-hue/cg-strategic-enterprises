import { useCallback, useEffect, useRef, useState } from 'react';

import { useAfterPageLoad } from '../lib/deferred';
import { useT } from '../i18n/useLang';
import home from '../i18n/home';
import common from '../i18n/common';
import { bookingUrl } from '../config/booking';

// The second hero on the home page: a full-width 16:9 frame of the phoenix
// clip, with the headline over its foot on a desktop and under it on a phone.
// It sits below the first hero and above the Free Website Check, so it is
// never the first paint and never the LCP candidate on either language.
//
// The picture is shown as shot. Nothing sits over the video but a wash across
// the bottom 30%, where the words are, and nothing dims the element itself --
// no opacity, no filter, no blend mode.
//
// Phoenix video: generated with Runway (Kling 4.0) from an original photo by
// Chuck Gabbard. The site has no media credits page or footer credit line
// today, so this comment is the only place it is recorded -- move it to a
// visible credit if one is ever added.
//
// How the clip is kept cheap:
//   * The poster is a plain lazy <img>, so the band costs one below-the-fold
//     image on first load and the <video> element does not exist yet.
//   * The <video> (with its two <source>s) only mounts once the page has
//     loaded AND an IntersectionObserver says the band is within 300px of the
//     viewport, so 1.6MB of video is never fetched by someone who never
//     scrolls, and never while the first screen is still painting. On a
//     desktop the band is already that close at the top of the page, so
//     without the load gate the clip would start downloading beside the hero
//     image.
//   * prefers-reduced-motion, prefers-reduced-data and the Save-Data header
//     keep it at the poster for good: no video element, no fetch, and no
//     pause button, because nothing moves.
//   * It pauses itself whenever the tab is hidden, and resumes only if the
//     viewer had not paused it by hand.
const POSTER = '/video/phoenix-hero-poster.jpg';
const WEBM = '/video/phoenix-hero.webm';
const MP4 = '/video/phoenix-hero.mp4';

/** True when the viewer has asked for less motion or less data. Read in an effect: it is false in the server markup, so hydration matches. */
function quietMedia(): boolean {
  const asks = (q: string) => window.matchMedia?.(q).matches === true;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return saveData || asks('(prefers-reduced-motion: reduce)') || asks('(prefers-reduced-data: reduce)');
}

export default function PhoenixHero() {
  const t = useT(home).phoenix;
  const c = useT(common);
  const pageLoaded = useAfterPageLoad();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mount the <video> only when the band is near the viewport and the viewer
  // has not asked for less motion or less data.
  const [wantsVideo, setWantsVideo] = useState(false);
  // Drives the button's icon and its accessible name, nothing else.
  const [paused, setPaused] = useState(false);
  // Set when the viewer uses the button, so the tab-visibility handler below
  // does not restart a clip they stopped on purpose.
  const pausedByViewer = useRef(false);

  useEffect(() => {
    if (!pageLoaded) return;
    if (quietMedia()) return;
    const band = sectionRef.current;
    if (!band) return;
    if (!('IntersectionObserver' in window)) {
      setWantsVideo(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setWantsVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, [pageLoaded]);

  // autoPlay covers most browsers; this catches the ones that need the call
  // (and the promise rejection when autoplay is blocked, which must not throw).
  useEffect(() => {
    if (!wantsVideo) return;
    videoRef.current?.play().catch(() => {});
  }, [wantsVideo]);

  // A hidden tab should not decode video.
  useEffect(() => {
    if (!wantsVideo) return;
    const onVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else if (!pausedByViewer.current) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [wantsVideo]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByViewer.current = false;
      video.play().catch(() => {});
    } else {
      pausedByViewer.current = true;
      video.pause();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="phoenix-hero-title"
      className="phoenix-hero relative z-10 w-full bg-brand-ink"
    >
      {/* The frame, at its own 16:9 and nothing else. No max-height in vh and no
          min-height: at an exact 16:9 box object-cover has nothing to crop, so
          the whole shot is on screen at every width -- the bird's wingtips at
          the top, the beach at the foot. */}
      <div className="relative w-full overflow-hidden aspect-[16/9]">
        {/* The poster, as an image rather than only the <video poster>
            attribute, so a viewer who never scrolls this far pays for nothing.
            width/height give the box its shape before it arrives. Decorative:
            the headline says everything it says. */}
        <img
          src={POSTER}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Nothing dims this: no opacity, no filter, no blend mode, and no
            overlay across it. It plays at the brightness of the file. The
            poster underneath covers the moment before the first frame decodes,
            and the element's own poster attribute covers it too, so no fade is
            needed to avoid a flash. */}
        {wantsVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={POSTER}
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPaused(false)}
            onPause={() => setPaused(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={WEBM} type="video/webm" />
            <source src={MP4} type="video/mp4" />
          </video>
        )}

        {/* The only wash on the picture, and only where the words sit: the
            bottom 30%, clear at its top edge and 0.6 brand-ink at the very
            bottom. Above that line the footage is untouched.

            It is only drawn from md up, because that is the only width where
            the copy is over the video at all. The text-shadow on the copy does
            the rest of the work -- see the comment there. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-[30%] md:block"
          style={{ background: 'linear-gradient(to top, rgba(2, 6, 23, 0.6) 0%, rgba(2, 6, 23, 0) 100%)' }}
        />

        {/* WCAG 2.2.2: the clip moves for more than five seconds and loops, so
            it needs a visible way to stop it. Only rendered when there is a
            video to stop. */}
        {wantsVideo && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={paused ? t.play : t.pause}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-brand-ink/70 text-white transition-colors hover:bg-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
              {paused ? <path d="M8 5l11 7-11 7z" /> : <path d="M7 5h4v14H7zm6 0h4v14h-4z" />}
            </svg>
          </button>
        )}
      </div>

      {/* One copy block, placed two ways rather than written twice (two of these
          would mean a duplicate heading id and a screen reader reading it
          twice). Below md it is ordinary flow under the frame: a 390px phone
          gives a 219px-tall video, which these three lines would cover
          entirely. From md up (a 768px window is a 432px-tall frame) it is
          lifted over the foot of the picture.

          The text-shadow is load-bearing, not decoration. The wash is capped at
          0.6, and the brightest pixels the clip puts behind these words reach
          rgb(255, 237, 218) as the fire sweeps through, so the shadow is what
          keeps the letters legible on those frames. It costs the picture
          nothing, which a deeper wash would not. */}
      <div className="phoenix-copy site-container flex flex-col items-center gap-5 py-9 text-center md:absolute md:inset-x-0 md:bottom-0 md:items-start md:gap-4 md:py-0 md:pb-7 md:text-left lg:pb-9">
        <h2
          id="phoenix-hero-title"
          className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl md:[text-shadow:0_2px_12px_rgba(2,6,23,0.95),0_1px_3px_rgba(2,6,23,0.9)]"
        >
          {t.headline}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-slate-200 md:text-lg md:[text-shadow:0_1px_8px_rgba(2,6,23,0.95),0_1px_2px_rgba(2,6,23,0.9)]">
          {t.subline}
        </p>
        <span className="inline-flex flex-col items-center gap-1 md:items-start">
          <a
            href={bookingUrl('home', 'phoenix-hero')}
            target="_blank"
            rel="noopener"
            data-book-call="phoenix-hero"
            className="inline-block cursor-pointer rounded-md bg-brand-orange px-8 py-3 font-bold tracking-wide text-brand-ink shadow-md transition-all hover:scale-105 hover:opacity-90"
          >
            {t.cta}
          </a>
          {c.bookCall.note && <small className="text-[11px] leading-4 text-slate-300 md:[text-shadow:0_1px_6px_rgba(2,6,23,0.95)]">{c.bookCall.note}</small>}
        </span>
      </div>
    </section>
  );
}
