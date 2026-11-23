import { Link } from 'react-router-dom';
import WatchDemoLink from '../components/WatchDemoLink';
import {
  BookCallButton, ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection,
  StepList, TalkToAlexButton, primaryButtonClass, secondaryButtonClass,
} from '../components/ServicePage';
import TierPackages from '../components/TierPackages';
import TourVideo from '../components/TourVideo';
import { statusLabel, statusMeaning } from '../config/featureStatus';
import { BY_THE_C_URL, LAWN_CARE_PATH, LAWN_PACKAGE_GROUPS } from '../config/lawnPackages';
import { TIER_HEADLINE, TIER_KEYS, TIER_NAME, TIER_PROMISE } from '../config/tiers';
import { LEGAL_BUSINESS_NAME, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from '../config/site';
import { breadcrumbJsonLdText } from '../i18n/breadcrumbs';
import { localizePath, type Lang } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import lawnCare from '../i18n/lawnCare';

// /lawn-care and /es/lawn-care: the lawn care and landscaping offer, the
// feature showcase and the Basic / Pro / Advanced packages.
//
// Same shape as /pest-control, and deliberately so: the packages come from the
// shared src/config/tiers.ts and are drawn by the shared TierPackages, the
// feature rows are data (src/config/lawnPackages.ts), the copy is
// src/i18n/lawnCare.ts, and this file is the layout and the structured data.
// Status labels come from src/config/featureStatus.ts, so the same words appear
// on the chips here, in the table legend and on /skunkworks.
//
// No screenshots. The client's public site is linked rather than pictured, and
// the four panels below use recreated interfaces with sample figures, so no
// customer or crew record is ever shown.

/** One outline icon per showcase group, matching `key` in src/i18n/lawnCare.ts. */
const GROUP_ICONS: Record<'found' | 'win' | 'run' | 'finance', string> = {
  // A magnifier over a map pin.
  found: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm5 12 5 5',
  // A handshake, reduced to two arms meeting.
  win: 'M3 12l4-4 5 5 5-5 4 4M7 8v8m10-8v8',
  // Three blades of grass: the crew's work and the crew list at once.
  run: 'M5 20c0-5 2-8 4-10m3 10c0-7 2-11 5-14M8 20c0-4 1-7 3-9m-6 9h14',
  // A document with lines and a corner turned: a worksheet.
  finance: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6m-6 4h6',
};

const CHIP_TONE: Record<string, string> = {
  'in-use': 'border-emerald-400/40 text-emerald-200 bg-emerald-400/10',
  ready: 'border-amber-400/50 text-amber-300 bg-amber-400/10',
  service: 'border-sky-400/40 text-sky-200 bg-sky-400/10',
};

/**
 * Service structured data for the page, in the page's own language. Three
 * packages as an offer catalog with no price: pricing follows the free audit,
 * so a number here would be a figure we have not quoted.
 */
function serviceJsonLd(lang: Lang, t: typeof lawnCare.en): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.title,
    description: t.intro,
    serviceType: t.schema.serviceType,
    url: SITE_URL + localizePath(LAWN_CARE_PATH, lang),
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

export default function LawnCare() {
  const t = useT(lawnCare);
  const lang = useLang();
  const lp = useLocalePath();

  const crumbs = [
    { name: t.breadcrumbs.home, path: '/' },
    { name: t.breadcrumbs.here, path: LAWN_CARE_PATH },
  ];

  const ctas = (placement: string) => (
    <div className="flex flex-wrap gap-3">
      <TalkToAlexButton label={t.ctaAlex} />
      <BookCallButton medium="lawn-care" content={placement} className={primaryButtonClass} />
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

      {/* --- The tour, English only, directly under the hero: showing the work
              beats describing it, and #tour is the anchor the outreach emails
              point at. Renders nothing on /es/lawn-care. --- */}
      <TourVideo tour="lawn" />
      <WatchDemoLink slug="lawn-care-site-tour" />

      {/* --- The problems --- */}
      <ServiceSection title={t.problems.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.problems.intro}</p>
        <StepList steps={t.problems.items} />
      </ServiceSection>

      {/* --- The showcase: four groups, each line labelled --- */}
      <ServiceSection title={t.showcase.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.showcase.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.showcase.groups.map(group => (
            <section key={group.key} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-11 h-11 rounded-2xl border border-brand-orange/40 bg-brand-orange/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d={GROUP_ICONS[group.key]} />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-black text-white">{group.title}</h3>
                  <p className="text-slate-400 leading-relaxed mt-1">{group.blurb}</p>
                </div>
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map(item => (
                  <li key={item.text} className="flex gap-2 text-slate-300 leading-relaxed">
                    <span aria-hidden="true" className="text-brand-orange shrink-0">&#10003;</span>
                    <span>
                      {item.text}
                      {/* Only the lines that are not already live carry a chip.
                          Five identical green ones in a row is noise, and the
                          sentence above the groups says what no chip means —
                          the same convention as the package cards. */}
                      {item.status !== 'in-use' && (
                        <>{' '}
                          <span className={`inline-block px-2.5 py-1 rounded-2xl text-[10px] font-bold uppercase tracking-widest border align-middle ${CHIP_TONE[item.status]}`}>
                            {statusLabel(item.status, lang)}
                          </span>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </ServiceSection>

      {/* --- Feature deep-dives --- */}
      <ServiceSection title={t.deepDives.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{t.deepDives.intro}</p>
        {/* The two labels, defined once in the shared config, so a chip below is
            never a guess. */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {(['in-use', 'ready'] as const).map(status => (
            <div key={status} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <dt>
                <span className={`inline-block border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${CHIP_TONE[status]}`}>
                  {statusLabel(status, lang)}
                </span>
              </dt>
              <dd className="text-slate-400 text-sm leading-relaxed mt-2">{statusMeaning(status, lang)}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-6">
          {t.deepDives.items.map(item => (
            <article key={item.key} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
              <div className="lg:col-span-2">
                <p className={`inline-block border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${CHIP_TONE[item.status]}`}>
                  {statusLabel(item.status, lang)}
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
                <figure className="m-0">
                  {/* Recreated interface rather than a screenshot: no customer or
                      crew record is involved, and it reads correctly in both
                      languages. */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
                    <p className="px-4 py-2.5 border-b border-slate-800 text-[11px] font-black uppercase tracking-widest text-slate-400">
                      {item.mock.title}
                    </p>
                    <ul className="divide-y divide-slate-800">
                      {item.mock.rows.map(row => (
                        <li key={row.label} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                          <span className="text-slate-200 text-sm font-semibold break-words min-w-0">{row.label}</span>
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
              </div>
            </article>
          ))}
        </div>
      </ServiceSection>

      {/* --- The live client build --- */}
      <section className="mt-16 md:mt-20 bg-slate-900/50 border border-brand-orange/40 rounded-3xl p-6 md:p-10">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">{t.caseStudy.eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3">{t.caseStudy.title}</h2>
        <p className="text-slate-300 text-lg leading-relaxed mt-3 max-w-3xl">{t.caseStudy.body}</p>
        {/* Their own site, so it opens in a new tab and says so in its
            accessible name rather than only in the note underneath. */}
        <a
          href={BY_THE_C_URL}
          target="_blank"
          rel="noopener"
          aria-label={`${t.caseStudy.link} ${t.newTab}`}
          className={`${primaryButtonClass} mt-6`}
        >
          {t.caseStudy.link} <span aria-hidden="true">&rarr;</span>
        </a>
        <p className="text-slate-400 text-sm leading-relaxed mt-3">{t.caseStudy.note}</p>
      </section>

      {/* --- Packages --- */}
      <ServiceSection title={t.packages.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.packages.intro}</p>
        <TierPackages groups={LAWN_PACKAGE_GROUPS} copy={t.packages} medium="lawn-care" event="lawn_tier_cta" />
      </ServiceSection>

      <ServiceFaq title={t.faqTitle} items={t.faq} path={LAWN_CARE_PATH} />

      <ServiceClosing title={t.closing.title} body={t.closing.body}>
        {ctas('closing')}
      </ServiceClosing>
    </ServicePage>
  );
}
