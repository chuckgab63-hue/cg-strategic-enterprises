import { useAfterPageLoad } from '../lib/deferred';
import { DEMO_VIDEO, DEMO_VIDEO_ANCHOR } from '../config/demoVideo';
import { useLang } from '../i18n/useLang';

// The meal-prep demo clip, in the hero of /meal-prep-ordering -- the English
// clip on the English page, the Spanish one on /es/meal-prep-ordering. Which
// file, which captions track and which label all come from the one row in
// src/config/demoVideo.ts that the page's own language picks, so a page can
// never end up playing one language under another's captions.
//
// It plays only when the visitor asks for it. There is no autoplay of any kind,
// muted or not: the clip is narrated, it is the reason the page exists rather
// than decoration behind the copy, and 4.6MB (5.7MB in Spanish) has no business
// downloading for someone who came to read. preload="none" means the browser
// fetches no video at all until the play button is pressed.
//
// That also settles prefers-reduced-motion without a media query: nothing moves
// until a person starts it. The home page's phoenix clip needs all that
// machinery (src/components/PhoenixHero.tsx) because it plays itself.
//
// Captions are a real track, not burnt in, and marked `default` so they are on
// from the first frame -- the narration carries the whole tour, and a visitor
// watching in a quiet office is the normal case, not the exception.
//
// The poster arrives after the load event, not with the markup. preload="none"
// holds back the video but not the poster attribute, and that still is 103KB of
// detailed storefront UI that does not shrink much (a 960px WebP was 54KB).
// Measured on this page, three Lighthouse runs each: eager, it cost 2 points
// (97-98 -> 95) and pushed LCP from 2.10s to 2.63s, because on a throttled
// connection it downloads alongside the hero copy that IS the LCP element.
// Deferred, the first screen is byte-for-byte the page it was before the video
// existed, and the still appears a moment later over a frame that is already
// the right shape and the right colour. useAfterPageLoad is false in the server
// markup too, so hydration matches. The Spanish poster is the same weight as
// the English one and is handled the same way.
export default function DemoVideo({ label, caption }: { label: string; caption: string }) {
  const pageLoaded = useAfterPageLoad();
  const lang = useLang();
  const video = DEMO_VIDEO[lang];

  return (
    // The player's own anchor, on the figure rather than the video so landing
    // on #demo-video brings the line underneath into view with it, and
    // scroll-mt-28 clears the fixed 80px header, as the other anchor targets on
    // the site do (src/components/ScrollToTop.tsx).
    <figure id={DEMO_VIDEO_ANCHOR} className="m-0 scroll-mt-28">
      {/* Matches the cards on this page: the same rounded-3xl, the same
          slate-800 hairline, over the dark surface. overflow-hidden is what
          makes the video's own corners follow the border's. */}
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-[0_8px_30px_rgba(2,6,23,0.6)]">
        {/* aspect-video plus the file's own width and height: the box is 16:9
            from the first paint, before the poster or a single frame arrives,
            so nothing shifts under it (CLS stayed 0 in every run). */}
        <video
          controls
          playsInline
          preload="none"
          poster={pageLoaded ? video.poster : undefined}
          width={video.width}
          height={video.height}
          aria-label={label}
          className="block aspect-video h-auto w-full bg-brand-ink"
        >
          {/* Sources before tracks: the parser expects them in that order. */}
          <source src={video.mp4} type="video/mp4" />
          {/* srclang is the page's language because the clip is narrated in it:
              there is no second track to choose between. */}
          <track kind="captions" srcLang={lang} label={video.captionsLabel} src={video.captions} default />
        </video>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate-400">{caption}</figcaption>
    </figure>
  );
}
