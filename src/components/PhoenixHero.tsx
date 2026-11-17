import { useCallback, useEffect, useRef, useState } from 'react';

import { useAfterPageLoad } from '../lib/deferred';
import { useT } from '../i18n/useLang';
import home from '../i18n/home';
import common from '../i18n/common';
import { bookingUrl } from '../config/booking';

// The second hero on the home page: a full-width band with the phoenix clip
// playing behind the headline. It sits below the first hero and above the Free
// Website Check, so it is never the first paint and never the LCP candidate on
// either language.
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

// The crop. Only one axis is ever cut: a band wider than 16:9 (any desktop)
// loses top and bottom, a band narrower than it (a phone, where the band is
// 390x420) loses left and right. So one pair covers both. The bird flies in the
// upper left, and a centred horizontal crop cut it in half on a phone; 20%
// keeps it whole there and changes nothing on a desktop, where the full width
// already shows.
const CROP = 'object-cover [object-position:20%_center]';

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
  // Painted the first frame: only then does the video fade over the poster, so
  // a slow connection shows the poster rather than a black rectangle.
  const [playing, setPlaying] = useState(false);
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
      className="phoenix-hero relative z-10 w-full overflow-hidden bg-brand-ink aspect-[16/9] min-h-[420px] max-h-[70vh] sm:min-h-[360px]"
    >
      {/* The poster, as an image rather than the <video poster> attribute, so a
          viewer who never scrolls this far pays for nothing. width/height give
          the box its shape before it arrives. Decorative: the headline beside
          it says everything it says. */}
      <img
        src={POSTER}
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${CROP}`}
      />

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
          onPlaying={() => { setPlaying(true); setPaused(false); }}
          onPause={() => setPaused(true)}
          className={`absolute inset-0 h-full w-full ${CROP} transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      )}

      {/* The brand-ink wash the text sits on: clear at the top, where the
          phoenix is, and deep over the lower half, where the words are.

          It has to be this deep. The clip is not reliably dark behind the
          text: sampling the headline's and subline's own rectangles across ten
          frames found pixels at rgb(255, 237, 218) and rgb(255, 251, 233) as
          the fire sweeps through. White on white is 1:1, so the wash is what
          makes the contrast, not the footage. At the headline's top edge it is
          ~0.81 opaque, which puts white text at about 10:1 over the worst
          frame; the subline sits lower and darker still. Thinning it fails
          4.5:1 on the bright frames. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.88) 40%, rgba(2, 6, 23, 0.72) 60%, rgba(2, 6, 23, 0.28) 80%, rgba(2, 6, 23, 0) 100%)' }}
      />

      {/* Text over the lower third: left-aligned from sm up, centred on a phone. */}
      <div className="absolute inset-0 flex items-end">
        <div className="site-container flex flex-col items-center gap-5 pb-10 text-center sm:items-start sm:pb-14 sm:text-left md:pb-16">
          <h2
            id="phoenix-hero-title"
            className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl"
          >
            {t.headline}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
            {t.subline}
          </p>
          <span className="inline-flex flex-col items-center gap-1 sm:items-start">
            <a
              href={bookingUrl('home', 'phoenix-hero')}
              target="_blank"
              rel="noopener"
              data-book-call="phoenix-hero"
              className="inline-block cursor-pointer rounded-md bg-brand-orange px-8 py-3 font-bold tracking-wide text-brand-ink shadow-md transition-all hover:scale-105 hover:opacity-90"
            >
              {t.cta}
            </a>
            {c.bookCall.note && <small className="text-[11px] leading-4 text-slate-300">{c.bookCall.note}</small>}
          </span>
        </div>
      </div>

      {/* WCAG 2.2.2: the clip moves for more than five seconds and loops, so it
          needs a visible way to stop it. Only rendered when there is a video to
          stop. */}
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
    </section>
  );
}
