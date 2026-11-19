import { useAfterPageLoad } from '../lib/deferred';
import type { VideoFile } from '../config/videos';

// The player for every narrated clip on the site: the meal-prep demo in the
// hero of /meal-prep-ordering (English and Spanish), and the site-and-admin
// tours on /pest-control and /lawn-care. Which file, which captions track and
// which track label all come from the one row in src/config/videos.ts that the
// caller hands over, so a page can never end up playing one language under
// another's captions.
//
// It plays only when the visitor asks for it. There is no autoplay of any kind,
// muted or not: these clips are narrated, each is the reason its section exists
// rather than decoration behind the copy, and 4-6MB has no business downloading
// for someone who came to read. preload="none" means the browser fetches no
// video at all until the play button is pressed.
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
// holds back the video but not the poster attribute, so without this the still
// downloads alongside the copy that IS the LCP element. Measured on the
// meal-prep page, three Lighthouse runs each: eager, it cost 2 points (97-98 ->
// 95) and pushed LCP from 2.10s to 2.63s. Deferred, the first screen is
// byte-for-byte the page it was before the video existed, and the still appears
// a moment later over a frame that is already the right shape and the right
// colour. useAfterPageLoad is false in the server markup too, so hydration
// matches.
//
// Every poster is 960px WebP, 45-60KB. The LCP element on all of these pages is
// a PARAGRAPH, so a poster is never the LCP candidate, and the deferral keeps
// it off the first screen -- but a tour section is still not free. Measured
// against the same page with the section removed, three Lighthouse runs each:
//
//   /lawn-care    95 -> 94 with a 78KB JPEG still, back to 95 at 45KB WebP
//   /pest-control 95 -> 94 with a 105KB JPEG still, still 94 at 59KB WebP
//
// So the encoding bought /lawn-care its point back and /pest-control nothing:
// cutting 46KB off its still moved LCP by 11ms (2650 -> 2639), while removing
// the whole section moves it 223ms (-> 2416). The cost that remains is the
// section's own JS -- two more preloaded chunks -- and not the picture. Both
// pages hold CLS 0 and TBT ~0, and nothing fetches a byte of video until the
// play button is pressed. Keep posters small anyway; just don't expect the
// last point back from them.
export default function NarratedVideo({
  video,
  label,
  caption,
  anchor,
}: {
  video: VideoFile;
  /** The player's accessible name, since a video element has no text of its own. */
  label: string;
  /** The line under the player. Omitted where the section's own copy says it already. */
  caption?: string;
  /** An id for the figure, where this player is itself a link target. */
  anchor?: string;
}) {
  const pageLoaded = useAfterPageLoad();

  return (
    // scroll-mt-28 clears the fixed 80px header when the figure is the anchor,
    // as the other anchor targets on the site do (src/components/ScrollToTop.tsx).
    <figure id={anchor} className="m-0 scroll-mt-28">
      {/* Matches the cards on these pages: the same rounded-3xl, the same
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
          {/* srclang is the clip's own narration language: there is no second
              track to choose between. */}
          <track kind="captions" srcLang={video.lang} label={video.captionsLabel} src={video.captions} default />
        </video>
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-relaxed text-slate-400">{caption}</figcaption>}
    </figure>
  );
}
