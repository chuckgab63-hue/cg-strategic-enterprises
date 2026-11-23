import { Link } from 'react-router-dom';
import { ServicePage } from '../components/ServicePage';
import { VIDEOS_HUB_PATH, WATCH_PAGES, watchPath, watchVideo } from '../config/watchPages';
import { localizePath } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import videoPages from '../i18n/videoPages';

// /videos and /es/videos: the hub.
//
// Both languages list all six clips. Four of them are English recordings with
// no Spanish watch page, so on the Spanish hub those cards link to the English
// page and say so — better than hiding half the library from Spanish visitors,
// and better than a Spanish page playing English narration.

export default function Videos() {
  const lang = useLang();
  const lp = useLocalePath();
  const t = useT(videoPages);
  const enCopy = videoPages.en;

  return (
    <ServicePage>
      <header className="max-w-3xl">
        <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{t.hub.eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mt-3">{t.hub.heading}</h1>
        <p className="text-slate-300 text-lg leading-relaxed mt-5">{t.hub.intro}</p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {WATCH_PAGES.map(page => {
          // The clip in this language if there is one, else the English clip.
          const file = watchVideo(page, lang) ?? page.video.en;
          const hasOwnPage = Boolean(watchVideo(page, lang));
          // A Spanish card for an English-only clip links to the English page,
          // so the link is absolute rather than localised.
          const href = hasOwnPage ? lp(watchPath(page.slug)) : localizePath(watchPath(page.slug), 'en');
          const copy = hasOwnPage
            ? (t.pages as Record<string, { heading: string } | undefined>)[page.slug]
            : enCopy.pages[page.slug as keyof typeof enCopy.pages];
          return (
            <li key={page.slug}>
              <Link
                to={href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-brand-orange/50"
              >
                <img
                  src={file.poster}
                  alt=""
                  loading="lazy"
                  width={file.width}
                  height={file.height}
                  className="aspect-video w-full bg-black object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-bold leading-snug text-white">{copy?.heading}</p>
                  <p className="mt-2 text-sm text-slate-400">
                    {t.hub.length(file.seconds)}
                    {!hasOwnPage && t.hub.englishOnly ? ` · ${t.hub.englishOnly}` : ''}
                  </p>
                  <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-widest text-brand-orange">
                    {t.hub.watch} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Nothing else on the page: the hub's job is to get a visitor, or a
          crawler, from here to a watch page. */}
      <p className="sr-only">{VIDEOS_HUB_PATH}</p>
    </ServicePage>
  );
}
