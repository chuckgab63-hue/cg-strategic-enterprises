import { Link, useLocation } from 'react-router-dom';
import { ServicePage, ServiceSection, primaryButtonClass, secondaryButtonClass } from '../components/ServicePage';
import NotFound from './NotFound';
import { bookingUrl } from '../config/booking';
import { videoJsonLdText } from '../config/videos';
import { VIDEOS_HUB_PATH, watchPageFor, watchVideo } from '../config/watchPages';
import { breadcrumbJsonLdText } from '../i18n/breadcrumbs';
import { stripLang } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import videoPages from '../i18n/videoPages';

// /videos/<slug> and, where a Spanish recording exists, /es/videos/<slug>.
//
// One component for every watch page; which clip it is about comes from the
// URL, through src/config/watchPages.ts.
//
// The shape of this page is the point of it. Search Console will not index a
// clip that is decoration or a sidebar on a page about something else — it
// reports "Video isn't on a watch page". So: the player is the first and
// largest element, it is a plain `controls` player rather than an
// autoplay-muted-loop background, and the words of the clip are printed
// underneath as a transcript, in the pre-rendered HTML, where a crawler that
// runs no JavaScript will still find them.

export default function VideoWatch() {
  const lang = useLang();
  const lp = useLocalePath();
  const t = useT(videoPages);
  // The slug is the last segment: /videos/dm-rescue-demo -> dm-rescue-demo.
  const slug = stripLang(useLocation().pathname).replace(/\/+$/, '').split('/').pop() ?? '';
  const page = watchPageFor(slug);
  const file = page && watchVideo(page, lang);

  // Four of the six clips are English recordings with no Spanish version, so
  // their /es/ URL is not a page. Rather than show Spanish copy wrapped around
  // an English video, it is the site's own not-found page — which is what the
  // sitemap, the hreflang tags and the pre-render already say (SiteRoute.langs).
  const copy = (t.pages as Record<string, (typeof videoPages.en.pages)[keyof typeof videoPages.en.pages] | undefined>)[slug];
  if (!page || !file || !copy) return <NotFound />;

  const crumbs = [
    { name: videoPages.en.hub.heading, path: '/' },
    { name: t.hub.eyebrow, path: VIDEOS_HUB_PATH },
  ];

  return (
    <ServicePage>
      {/* The clip this page is about. No other page claims this file. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: videoJsonLdText(file) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLdText(crumbs, lang) }} />

      <nav aria-label={t.hub.eyebrow} className="text-sm text-slate-400 mb-6">
        <Link to={lp(VIDEOS_HUB_PATH)} className="underline underline-offset-4 hover:text-brand-orange transition-colors">
          &larr; {t.backToHub}
        </Link>
      </nav>

      {/* First and largest: the player. `controls`, not autoplay/muted/loop —
          a looping muted background is exactly what marks a clip decorative.
          The poster gives the box its shape before the file arrives, and
          width/height stop the copy below from jumping when it does. */}
      <figure className="m-0">
        <video
          controls
          preload="metadata"
          poster={file.poster}
          width={file.width}
          height={file.height}
          className={`w-full h-auto rounded-3xl border border-slate-800 bg-black ${file.height > file.width ? 'max-w-sm mx-auto' : ''}`}
        >
          <source src={file.mp4} type="video/mp4" />
          {file.captions && (
            <track kind="captions" srcLang={file.lang} label={file.captionsLabel} src={file.captions} default />
          )}
        </video>
        <figcaption className="text-slate-400 text-sm leading-relaxed mt-3">
          {file.seconds} {lang === 'es' ? 'segundos' : 'seconds'} &middot;{' '}
          {file.captions ? t.captionsNote : t.noCaptionsNote}
        </figcaption>
      </figure>

      <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mt-10">{copy.heading}</h1>
      <p className="text-slate-300 text-lg leading-relaxed mt-5 max-w-3xl">{copy.intro}</p>

      <div className="flex flex-wrap items-start gap-3 mt-8">
        <Link to={lp(page.offer)} className={primaryButtonClass}>{copy.cta}</Link>
        <span className="inline-flex flex-col items-start gap-1">
          <a
            href={bookingUrl('video', page.slug, 'website', page.campaign)}
            target="_blank"
            rel="noopener"
            data-book-call={page.slug}
            className={secondaryButtonClass}
          >
            {t.bookCta}
          </a>
          <small className="text-[11px] leading-4 text-slate-400 max-w-[18rem]">{t.bookNote}</small>
        </span>
      </div>

      {/* The words, in the HTML. This is the part a crawler reads to decide
          the page is about the video rather than merely containing one. */}
      <ServiceSection title={t.transcriptHeading}>
        <div className="max-w-3xl flex flex-col gap-4">
          {copy.transcript.map((line, i) => (
            <p key={i} className="text-slate-300 leading-relaxed">{line}</p>
          ))}
        </div>
      </ServiceSection>
    </ServicePage>
  );
}
