import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAfterPageLoad } from '../lib/deferred';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import home from '../i18n/home';
import common from '../i18n/common';
import { bookingUrl } from '../config/booking';
import { PHOENIX_MP4, PHOENIX_POSTER, PHOENIX_WEBM } from '../config/phoenixHero';
import { trackEvent } from '../lib/analytics';

// The home page's hero: a full-width 16:9 frame of the phoenix clip, carrying
// the page's only h1 and the three industry highlights. On a desktop the copy
// and the cards sit over the foot of the picture; below lg they stack under it.
//
// The picture is shown as shot. Nothing sits over the video but a wash across
// the bottom 35%, where the words are, and nothing dims the element itself --
// no opacity, no filter, no blend mode.
//
// Phoenix video: generated with Runway (Kling 4.0) from an original photo by
// Chuck Gabbard. The site has no media credits page or footer credit line
// today, so this comment is the only place it is recorded -- move it to a
// visible credit if one is ever added.
//
// Above the fold now, so the loading rules changed with it:
//   * The poster is eager and fetchPriority high, in three formats, and the
//     build preloads the AVIF (src/i18n/prerender.ts), so the page's largest
//     paint is 37KB and starts downloading with the markup. The <video> has
//     no poster attribute of its own: this picture is underneath it and shows
//     through until the first frame decodes, and a poster attribute would
//     fetch the JPEG a second time.
//   * The <video> still carries preload="none" and still only mounts once the
//     page has loaded AND an IntersectionObserver has seen the frame, so
//     1.6MB of video never competes with the first screen. Above the fold the
//     observer fires at once, which is why the load gate is what holds it
//     back; without it the clip would start downloading beside the poster.
//   * prefers-reduced-motion, prefers-reduced-data and the Save-Data header
//     keep it at the poster for good: no video element, no fetch, and no
//     pause button, because nothing moves.
//   * It pauses itself whenever the tab is hidden, and resumes only if the
//     viewer had not paused it by hand.
// The files live in src/config/phoenixHero.ts, because the build's poster
// preload has to name the same URL this asks for.
const WEBM = PHOENIX_WEBM;
const MP4 = PHOENIX_MP4;

/** One outline icon per industry card, keyed by the card's `key`. */
const INDUSTRY_ICONS: Record<'pest-control' | 'lawn-care' | 'meal-prep', string> = {
  // A bug: body, antennae and legs.
  'pest-control': 'M12 7a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0v-3a4 4 0 0 1 4-4zm0 0V4m-2-1 2 1 2-1M8 11H4m4 3H5m11-3h4m-4 3h3',
  // Blades of grass over the ground line.
  'lawn-care': 'M5 20c0-5 2-8 4-10m3 10c0-7 2-11 5-14M8 20c0-4 1-7 3-9m-6 9h14',
  // A shopping bag.
  'meal-prep': 'M6 8h12l-1 12H7L6 8zm3 0V6a3 3 0 0 1 6 0v2',
};

/** True when the viewer has asked for less motion or less data. Read in an effect: it is false in the server markup, so hydration matches. */
function quietMedia(): boolean {
  const asks = (q: string) => window.matchMedia?.(q).matches === true;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return saveData || asks('(prefers-reduced-motion: reduce)') || asks('(prefers-reduced-data: reduce)');
}

export default function PhoenixHero() {
  const t = useT(home).phoenix;
  const c = useT(common);
  const lang = useLang();
  const lp = useLocalePath();
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
        {/* The page's largest paint: eager, high priority, and preloaded in the
            pre-rendered HTML so it starts before this markup is parsed.
            width/height give the box its shape before it arrives. Decorative:
            the h1 beside it says everything it says. */}
        <picture>
          <source type="image/avif" srcSet={PHOENIX_POSTER.avif} />
          <source type="image/webp" srcSet={PHOENIX_POSTER.webp} />
          <img
            src={PHOENIX_POSTER.jpeg}
            width={PHOENIX_POSTER.width}
            height={PHOENIX_POSTER.height}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

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

        {/* The only wash on the picture, and only under the words: the bottom
            45%, weighted into the bottom-left corner where the copy and the
            cards sit, and clear at its top edge. The bird erupts centre-left
            and leaves through the top, so nothing covers it.

            There is no panel behind the headline any more. What carries the
            contrast here is this wash plus the text-shadow, and the measured
            result is in the comment on the copy block below. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-[45%] lg:block"
          style={{
            background: [
              'radial-gradient(85% 100% at 0% 100%, rgba(2, 6, 23, 0.7) 0%, rgba(2, 6, 23, 0.52) 40%, rgba(2, 6, 23, 0.18) 70%, rgba(2, 6, 23, 0) 100%)',
              'linear-gradient(to top, rgba(2, 6, 23, 0.7) 0%, rgba(2, 6, 23, 0.34) 45%, rgba(2, 6, 23, 0) 100%)',
            ].join(', '),
          }}
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
          twice). Below lg it is ordinary flow under the frame: a 390px phone
          gives a 219px-tall video, which this copy and three cards would bury.
          From lg up it is lifted over the foot of the picture, with the cards
          on its own row at the bottom.

          The text-shadow is load-bearing, not decoration. The wash is capped at
          0.6, and the brightest pixels the clip puts behind these words reach
          rgb(255, 237, 218) as the fire sweeps through, so the shadow is what
          keeps the letters legible on those frames. It costs the picture
          nothing, which a deeper wash would not. The cards do not depend on it:
          each one carries its own surface. */}
      <div className="phoenix-copy site-container flex flex-col gap-6 py-9 lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-row-reverse lg:items-end lg:justify-end lg:gap-6 lg:py-0 lg:pb-6">
        {/* The copy column. From lg it sits to the RIGHT of the cards, both
            bottom-aligned, the pair anchored to the container's left edge --
            flex-row-reverse rather than reordering the markup, so the h1 stays
            first in the document and the mobile order (copy, then cards) is
            the DOM order.

            Nothing is painted behind the block: the bird has the frame. Each
            LINE carries its own brand-ink backing instead (phoenix-line in
            src/index.css), because the clip puts pixels up to
            rgb(255, 237, 218) behind these words, where white is 1:1. 0.62 is
            the lowest step that held 4.5:1 on 100% of the area at every
            viewport tested, including a tall narrow window where the wash
            contributes nothing. */}
        <div className="flex flex-col items-center gap-4 text-center lg:max-w-[26rem] lg:items-start lg:gap-2 lg:text-left">
          <h1
            id="phoenix-hero-title"
            className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-3xl lg:phoenix-shadow"
          >
            <span className="lg:phoenix-line lg:box-decoration-clone">{t.headline}</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg lg:text-sm lg:leading-relaxed lg:phoenix-shadow">
            <span className="lg:phoenix-line lg:box-decoration-clone">{t.subline}</span>
          </p>
          <span className="inline-flex flex-col items-center gap-1 lg:items-start">
            <a
              href={bookingUrl('home', 'phoenix-hero')}
              target="_blank"
              rel="noopener"
              data-book-call="phoenix-hero"
              className="inline-block cursor-pointer rounded-md bg-brand-orange px-8 py-3 font-bold tracking-wide text-brand-ink shadow-md transition-all hover:scale-105 hover:opacity-90 lg:px-6 lg:py-2.5 lg:text-sm"
            >
              {t.cta}
            </a>
            {c.bookCall.note && <small className="text-[11px] leading-4 text-slate-300 lg:phoenix-shadow">{c.bookCall.note}</small>}
          </span>

        </div>

        {/* The three industries, in the same order at every width: one row from
            sm, a column from lg. From lg they sit to the LEFT of the copy, and
            the pair is short enough (about 170px) to live in the bottom of the
            frame at 1366x768, which is why the old "cards as a row under 900px
            tall" rule is gone -- two columns made it unnecessary.

            The cards are transparent now, so the picture reads through them.
            What holds their text is the same per-line backing the copy uses,
            on the label and on the line, rather than a surface behind the
            whole card.

            The outline is two lines, not one, and that is deliberate: a single
            translucent white border measured 1.23:1 against the brighter
            frames, because white on bright water is white on white. A white
            border with a brand-ink ring immediately outside it always has an
            edge to contrast with -- the pair reads at 5.7:1 or better whatever
            the frame does, which is what keeps the card's boundary visible. */}
        <ul aria-label={t.industriesLabel} className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[17rem] lg:shrink-0 lg:grid-cols-1 lg:gap-1.5">
          {t.industries.map(card => (
            <li key={card.key} className="flex">
              <Link
                to={lp(card.path)}
                onClick={() => trackEvent('home_industry_click', lang, { industry: card.key })}
                className="group flex w-full flex-col gap-1 rounded-2xl border border-slate-700/80 bg-brand-ink/90 p-4 text-left transition-colors hover:border-brand-orange/60 lg:gap-1 lg:rounded-xl lg:border-white/55 lg:bg-transparent lg:px-3 lg:py-2 lg:shadow-[0_0_0_1px_rgba(2,6,23,0.6)] lg:hover:border-brand-orange"
              >
                <span className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white lg:gap-0 lg:text-xs">
                  {/* Two placements of the same icon and arrow rather than one:
                      on a phone they sit on the card's own surface, the arrow
                      pushed to the right edge; from lg the card has no surface,
                      so both have to sit INSIDE the backing or they are orange
                      on bare video, which is where they would fail 3:1. */}
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-orange lg:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={INDUSTRY_ICONS[card.key]} />
                  </svg>
                  <span className="lg:phoenix-line lg:box-decoration-clone lg:inline-flex lg:items-center lg:gap-1.5 lg:transition-colors lg:group-hover:text-brand-orange">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden h-3.5 w-3.5 shrink-0 text-brand-orange lg:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={INDUSTRY_ICONS[card.key]} />
                    </svg>
                    {card.label}
                    <span aria-hidden="true" className="hidden text-brand-orange transition-transform group-hover:translate-x-1 lg:inline">&rarr;</span>
                  </span>
                  <span aria-hidden="true" className="ml-auto text-brand-orange transition-transform group-hover:translate-x-1 lg:hidden">&rarr;</span>
                </span>
                <span className="text-sm leading-snug text-slate-300 lg:text-[11px] lg:leading-relaxed">
                  <span className="lg:phoenix-line lg:box-decoration-clone">{card.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
