import { Link } from 'react-router-dom';
import { watchPageFor, watchPath, watchVideo } from '../config/watchPages';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import videoPages from '../i18n/videoPages';

// The one line each service page gains: a link to that page's watch page.
//
// The length in the label is read from the clip itself rather than typed, so
// it cannot drift from the file — and so the Spanish link says 95 seconds on
// the meal-prep page where the English one says 81, because those are two
// different recordings.
//
// `kind` picks the noun: the tours and walkthroughs are demos, the vertical
// reels are videos.
export default function WatchDemoLink({ slug, kind = 'demo' }: { slug: string; kind?: 'demo' | 'video' }) {
  const lang = useLang();
  const lp = useLocalePath();
  const t = useT(videoPages);
  const page = watchPageFor(slug);
  if (!page) return null;

  // On a Spanish page whose clip has no Spanish recording, the link still
  // points at the English watch page and the length is the English file's.
  const file = watchVideo(page, lang) ?? page.video.en;
  const hasOwnPage = Boolean(watchVideo(page, lang));
  const label = kind === 'video' ? t.watchVideo(file.seconds) : t.watchDemo(file.seconds);
  // On a Spanish page the four English-only clips are labelled rather than
  // hidden: it is a link to a watch page, not a player embedded in this one,
  // and the visitor should know which language before they click.
  const note = !hasOwnPage && t.hub.englishOnly ? ` ${t.hub.englishOnly}` : '';

  return (
    <p className="mt-6">
      <Link
        to={hasOwnPage ? lp(watchPath(slug)) : watchPath(slug)}
        className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors"
      >
        {label}{note} <span aria-hidden="true">&rarr;</span>
      </Link>
    </p>
  );
}
