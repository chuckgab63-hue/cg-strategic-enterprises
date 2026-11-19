import NarratedVideo from './NarratedVideo';
import { TOUR_VIDEO, videoJsonLdText } from '../config/videos';
import { useLang } from '../i18n/useLang';

// The tour section on /pest-control and /lawn-care: a narrated walk through a
// site we built and the admin area behind it, plus the VideoObject that
// describes it. Both pages render this one component, so the two sections can
// only ever differ in the clip they play and the words around it.
//
// English only, and the guard is here rather than in the pages so neither page
// has to remember. The narration is in English and there is no Spanish
// recording of either tour, so /es/pest-control and /es/lawn-care show nothing
// at all -- not the player with English audio, and not a placeholder promising
// a clip that does not exist. The rest of both Spanish pages is untouched.

/** The anchor on the section, so /pest-control#tour and /lawn-care#tour land on it. */
export const TOUR_ANCHOR = 'tour';

/**
 * The words around each clip. They are here and not in src/i18n because they
 * are English by nature: this whole section only renders on the English page,
 * so a Spanish half would be a translation nobody ever reads and one more
 * string waiting in docs/SPANISH_REVIEW.md for a reviewer who has real copy to
 * get through.
 *
 * `label` is the player's accessible name, and the figure has no visible
 * heading of its own, so it has to say what the clip is and how long it runs.
 * The two lengths here are the round numbers the outreach emails use: the
 * files themselves run 73.7s and 71.2s, which is what the VideoObject's
 * duration reports (PT1M14S and PT1M12S, rounded up as everywhere else). Worth
 * knowing before "fixing" one to match the other.
 */
const TOUR_COPY: Record<keyof typeof TOUR_VIDEO, { title: string; intro: string; label: string; caption: string }> = {
  pest: {
    title: 'A tour of the site and the admin area',
    intro: 'A narrated walk through One Source Total Pest Control: the site a customer lands on, then the admin area the office works in.',
    label: '75-second tour of a pest control website and admin area built by CG Strategic',
    caption: 'What your customers see, then what the office works in. Nothing downloads until you press play.',
  },
  lawn: {
    title: 'A tour of the site and the admin area',
    intro: 'A narrated walk through By The C of Jax: the site a homeowner or a property manager lands on, then the admin area the crews are run from.',
    label: '70-second tour of a lawn care website and admin area built by CG Strategic',
    caption: 'What your customers see, then what the office works in. Nothing downloads until you press play.',
  },
};

export default function TourVideo({ tour }: { tour: keyof typeof TOUR_VIDEO }) {
  const lang = useLang();
  if (lang !== 'en') return null;

  const video = TOUR_VIDEO[tour];
  const copy = TOUR_COPY[tour];

  return (
    // ServiceSection's markup rather than ServiceSection itself, which is the
    // one thing in this file that is not obvious. Importing it would put
    // src/components/ServicePage.tsx into this shared chunk's graph, and
    // measured over a full build that reshuffles Rollup's chunking for the
    // whole site: react-dom, the Alex voice module and LetsTalkChooser split
    // out of the entry bundle and every page on the site, tour or not, picks
    // up three more preloads. Two duplicated class strings is the cheaper
    // price. scroll-mt-28 clears the fixed 80px header, so #tour lands below
    // it rather than under it.
    <section id={TOUR_ANCHOR} className="mt-16 md:mt-20 scroll-mt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: videoJsonLdText(video) }} />
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{copy.title}</h2>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{copy.intro}</p>
      {/* Capped at the width of the copy above it rather than the full page: a
          16:9 frame across all 64rem would stand taller than the fold on a
          laptop and push the rest of the page out of sight. */}
      <div className="mt-6 max-w-3xl">
        <NarratedVideo video={video} label={copy.label} caption={copy.caption} />
      </div>
    </section>
  );
}
