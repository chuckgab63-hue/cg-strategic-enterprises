import { Link } from 'react-router-dom';
import {
  BookCallButton, ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection,
  TalkToAlexButton, primaryButtonClass, secondaryButtonClass,
} from '../components/ServicePage';
import FeatureSwitchDemo from '../components/FeatureSwitchDemo';
import PestPackages from '../components/PestPackages';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies';
import { PEST_CONTROL_PATH, TIER_HEADLINE, TIER_KEYS, TIER_NAME, TIER_PROMISE } from '../config/pestPackages';
import { LEGAL_BUSINESS_NAME, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from '../config/site';
import { breadcrumbJsonLdText } from '../i18n/breadcrumbs';
import { localizePath, type Lang } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import pestControl from '../i18n/pestControl';

// /pest-control and /es/pest-control: the pest control offer, the feature-switch
// demo and the Basic / Pro / Advanced packages.
//
// The packages and the switch list are data (src/config/pestPackages.ts); the
// copy is src/i18n/pestControl.ts; this file is the layout and the structured
// data. Status labels come from the config, so "rolling out" cannot drift
// between the cards, the table and the deep-dives.

/**
 * Screenshots already cleared for the One Source case study, reused here rather
 * than taken again. The other three deep-dives use recreated interfaces, so no
 * screenshot of anybody's records is needed for them.
 */
const SHOTS: Record<string, { base: string; width: number; height: number }> = {
  voice: { base: 'talk-to-jess-desktop', width: 1440, height: 900 },
  analyzer: { base: 'pest-analyzer-desktop', width: 1440, height: 900 },
  licensing: { base: 'admin-staff-readiness-mock', width: 1440, height: 900 },
};

const shotSrc = (base: string, width: number) => `/portfolio/onesource/onesource-${base}-${width}w.webp`;

/**
 * Service structured data for the page, in the page's own language. Three
 * packages as an offer catalog with no price: pricing follows the free audit,
 * so a number here would be a figure we have not quoted.
 */
function serviceJsonLd(lang: Lang, t: typeof pestControl.en): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.title,
    description: t.intro,
    serviceType: t.schema.serviceType,
    url: SITE_URL + localizePath(PEST_CONTROL_PATH, lang),
    provider: { '@type': 'Organization', name: LEGAL_BUSINESS_NAME, url: SITE_URL },
    areaServed: [
      { '@type': 'State', name: 'Florida' },
      { '@type': 'State', name: 'Georgia' },
    ],
    audience: { '@type': 'BusinessAudience', name: t.schema.audience },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.packages.title,
      itemListElement: TIER_KEYS.map(tier => ({
        '@type': 'Offer',
        name: `${TIER_NAME[tier][lang]} — ${TIER_HEADLINE[tier][lang]}`,
        description: TIER_PROMISE[tier][lang],
      })),
    },
  }).replace(/</g, '\\u003c');
}

export default function PestControl() {
  const t = useT(pestControl);
  const lang = useLang();
  const lp = useLocalePath();

  const crumbs = [
    { name: t.breadcrumbs.home, path: '/' },
    { name: t.breadcrumbs.here, path: PEST_CONTROL_PATH },
  ];

  const ctas = (placement: string) => (
    <div className="flex flex-wrap gap-3">
      <TalkToAlexButton label={t.ctaAlex} />
      <BookCallButton medium="pest-control" content={placement} className={primaryButtonClass} />
      {/* The accessible name has to contain the visible text, or someone using
          voice control says "Call us" and nothing happens. So the number is
          appended to the visible label rather than replacing it. */}
      <a href={PHONE_HREF} aria-label={`${t.ctaCall}: ${PHONE_DISPLAY}`} className={secondaryButtonClass}>{t.ctaCall}</a>
    </div>
  );

  return (
    <ServicePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd(lang, t) }} />

      <nav aria-label={t.breadcrumbs.label} className="text-sm text-slate-400 mb-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLdText(crumbs, lang) }} />
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li className="flex items-center gap-2">
            <Link to={lp('/')} className="underline underline-offset-4 hover:text-brand-orange transition-colors">{t.breadcrumbs.home}</Link>
            <span aria-hidden="true">/</span>
          </li>
          <li><span aria-current="page" className="text-slate-200">{t.breadcrumbs.here}</span></li>
        </ol>
      </nav>

      <ServiceHero eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        {ctas('hero')}
      </ServiceHero>

      {/* --- The switch demo --- */}
      <ServiceSection title={t.demo.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.demo.intro}</p>
        {/* Where the panel itself stands. It sits above the demo on purpose:
            somebody who only reads this far should still have been told. */}
        <p className="text-amber-200/90 leading-relaxed max-w-3xl mt-4 bg-amber-400/5 border border-amber-400/30 rounded-2xl p-4">
          <span className="inline-block border border-amber-400/50 bg-amber-400/10 text-amber-300 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mr-2">
            {t.deepDives.statusLabels['rolling-out']}
          </span>
          {t.demo.status}
        </p>
        <div className="mt-8">
          <FeatureSwitchDemo />
        </div>
      </ServiceSection>

      {/* --- Packages --- */}
      <ServiceSection title={t.packages.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.packages.intro}</p>
        <PestPackages />
      </ServiceSection>

      {/* --- Feature deep-dives --- */}
      <ServiceSection title={t.deepDives.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{t.deepDives.intro}</p>
        {/* The two labels, defined once, so a chip below is never a guess. */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {(['in-use', 'rolling-out'] as const).map(status => (
            <div key={status} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <dt>
                <span className={`inline-block border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${status === 'rolling-out' ? 'border-amber-400/50 text-amber-300 bg-amber-400/10' : 'border-emerald-400/40 text-emerald-200 bg-emerald-400/10'}`}>
                  {t.deepDives.statusLabels[status]}
                </span>
              </dt>
              <dd className="text-slate-400 text-sm leading-relaxed mt-2">{t.deepDives.statusMeanings[status]}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-6">
          {t.deepDives.items.map(item => {
            const shot = SHOTS[item.key];
            return (
              <article key={item.key} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
                <div className="lg:col-span-2">
                  <p className={`inline-block border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${item.status === 'rolling-out' ? 'border-amber-400/50 text-amber-300 bg-amber-400/10' : 'border-emerald-400/40 text-emerald-200 bg-emerald-400/10'}`}>
                    {t.deepDives.statusLabels[item.status]}
                  </p>
                  <h3 className="text-xl md:text-2xl font-black text-white mt-3">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed mt-3">{item.body}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {item.points.map(point => (
                      <li key={point} className="flex gap-2 text-slate-300 leading-relaxed">
                        <span aria-hidden="true" className="text-brand-orange shrink-0">&#10003;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  {shot && item.shot && (
                    <figure className="m-0">
                      <img
                        src={shotSrc(shot.base, 1440)}
                        srcSet={`${shotSrc(shot.base, 800)} 800w, ${shotSrc(shot.base, 1440)} 1440w`}
                        sizes="(min-width: 1024px) 34rem, 92vw"
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        alt={item.shot.alt}
                        className="w-full h-auto rounded-2xl border border-slate-700"
                      />
                      <figcaption className="text-slate-400 text-sm leading-relaxed mt-2">{item.shot.caption}</figcaption>
                    </figure>
                  )}
                  {item.mock && (
                    <figure className="m-0">
                      {/* Recreated interface rather than a screenshot: no customer
                          record is involved, and it reads correctly in both languages. */}
                      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
                        <p className="px-4 py-2.5 border-b border-slate-800 text-[11px] font-black uppercase tracking-widest text-slate-400">
                          {item.mock.title}
                        </p>
                        <ul className="divide-y divide-slate-800">
                          {item.mock.rows.map(row => (
                            <li key={row.label} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                              <span className="text-slate-200 text-sm font-semibold">{row.label}</span>
                              <span className="flex items-center gap-2">
                                <span className="text-slate-400 text-xs">{row.value}</span>
                                {row.badge && (
                                  <span className="px-2.5 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                                    {row.badge}
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="px-4 py-3 border-t border-slate-800 text-brand-orange text-xs font-bold">{item.mock.footer}</p>
                      </div>
                      <figcaption className="text-slate-400 text-sm leading-relaxed mt-2">{t.deepDives.mockNote}</figcaption>
                    </figure>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </ServiceSection>

      {/* --- The case study --- */}
      <section className="mt-16 md:mt-20 bg-slate-900/50 border border-brand-orange/40 rounded-3xl p-6 md:p-10">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">{t.caseStudy.eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3">{t.caseStudy.title}</h2>
        <p className="text-slate-300 text-lg leading-relaxed mt-3 max-w-3xl">{t.caseStudy.body}</p>
        <Link to={lp(ONE_SOURCE_CASE_STUDY.path)} className={`${primaryButtonClass} mt-6`}>
          {t.caseStudy.link} <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      <ServiceFaq title={t.faqTitle} items={t.faq} path={PEST_CONTROL_PATH} />

      <ServiceClosing title={t.closing.title} body={t.closing.body}>
        {ctas('closing')}
      </ServiceClosing>
    </ServicePage>
  );
}
