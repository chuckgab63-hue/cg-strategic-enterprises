import { Link } from 'react-router-dom';
import {
  ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection, StepList,
  TalkToAlexButton, primaryButtonClass, secondaryButtonClass,
} from '../components/ServicePage';
import NarratedVideo from '../components/NarratedVideo';
import { bookingUrl } from '../config/booking';
import { RESCUE_VIDEO, RESCUE_VIDEO_ANCHOR, videoJsonLdText } from '../config/videos';
import { MISSED_CALL_RESCUE as OFFER, OFFER_CURRENCY } from '../config/offers';
import { ORGANIZATION_ID, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from '../config/site';
import { breadcrumbJsonLdText } from '../i18n/breadcrumbs';
import { localizePath, type Lang } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import missedCallRescue, { MISSED_CALL_RESCUE_CAMPAIGN, MISSED_CALL_RESCUE_PATH } from '../i18n/missedCallRescue';

// /missed-call-rescue and /es/missed-call-rescue: the fixed-price starter offer.
//
// The offer is data (src/config/offers.ts: price, timeline, what is included),
// the words are src/i18n/missedCallRescue.ts, and this file is the layout and
// the structured data — the same split as /pest-control. The page reuses the
// service-page building blocks rather than styling its own: ServiceHero,
// StepList, ServiceFaq and ServiceClosing all come from
// src/components/ServicePage.tsx.

/**
 * Service with the two prices as Offers, in the page's own language. This is
 * the one service page on the site that can state a price, because this one is
 * fixed: the industry packages are quoted after an audit, so they carry an
 * offer catalog with no figures. The monthly Offer gets a
 * UnitPriceSpecification so the $149 reads as "per month" rather than as a
 * second one-time charge, and the provider is the Organization node
 * vite.config.ts puts in every page's head, by @id rather than described again.
 */
function serviceJsonLd(lang: Lang, t: typeof missedCallRescue.en): string {
  const url = SITE_URL + localizePath(MISSED_CALL_RESCUE_PATH, lang);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.schema.name,
    description: t.intro,
    serviceType: t.schema.serviceType,
    url,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: [
      { '@type': 'State', name: 'Florida' },
      { '@type': 'State', name: 'Georgia' },
    ],
    audience: { '@type': 'BusinessAudience', name: t.schema.audience },
    offers: [
      {
        '@type': 'Offer',
        name: t.schema.setupOffer,
        price: OFFER.setupPrice,
        priceCurrency: OFFER_CURRENCY,
        url,
      },
      {
        '@type': 'Offer',
        name: t.schema.monthlyOffer,
        price: OFFER.monthlyPrice,
        priceCurrency: OFFER_CURRENCY,
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: OFFER.monthlyPrice,
          priceCurrency: OFFER_CURRENCY,
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
        },
      },
    ],
  }).replace(/</g, '\\u003c');
}

export default function MissedCallRescue() {
  const t = useT(missedCallRescue);
  const lang = useLang();
  const lp = useLocalePath();

  const crumbs = [
    { name: t.breadcrumbs.home, path: '/' },
    { name: t.breadcrumbs.here, path: MISSED_CALL_RESCUE_PATH },
  ];

  // The booking link, with this offer's own utm_campaign on top of the page and
  // placement tags every booking link carries. The note under it says what the
  // calendar actually offers (one free 30-minute slot), and on Spanish pages it
  // also says the Cal.com page is in English.
  const bookButton = (placement: string, className = primaryButtonClass) => (
    <span className="inline-flex flex-col items-start gap-1">
      <a
        href={bookingUrl('missed-call-rescue', placement, 'website', MISSED_CALL_RESCUE_CAMPAIGN)}
        target="_blank"
        rel="noopener"
        data-book-call={placement}
        className={className}
      >
        {t.ctaBook}
      </a>
      <small className="text-[11px] leading-4 text-slate-400 max-w-[18rem]">{t.ctaBookNote}</small>
    </span>
  );

  const ctas = (placement: string) => (
    <>
      <div className="flex flex-wrap items-start gap-3">
        {bookButton(placement)}
        <TalkToAlexButton label={t.ctaAlex} className={secondaryButtonClass} />
        {/* The number is appended to the visible label rather than replacing
            it, so voice control can say "Call us" and reach this link. */}
        <a href={PHONE_HREF} aria-label={`${t.ctaCall}: ${PHONE_DISPLAY}`} className={secondaryButtonClass}>{t.ctaCall}</a>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mt-4">{t.tryNote}</p>
    </>
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

      {/* The intro clip is the hero's second column, as on /meal-prep-ordering:
          each language's page plays the clip narrated in its own language. */}
      <ServiceHero
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
        media={<NarratedVideo video={RESCUE_VIDEO[lang]} anchor={RESCUE_VIDEO_ANCHOR} label={t.video.label} caption={t.video.caption} />}
      >
        {/* The price, the term and the timeline as their own row above the
            buttons: it is a fixed-price offer, so the figures are the offer. */}
        <dl className="flex flex-wrap gap-3">
          {[
            { label: t.priceSetup, detail: null },
            { label: t.priceMonthly, detail: t.priceTerm },
            { label: t.priceLive, detail: null },
          ].map(item => (
            <div key={item.label} className="bg-slate-900/60 border border-brand-orange/40 rounded-2xl px-4 py-3">
              <dt className="text-white font-black tracking-tight">{item.label}</dt>
              {item.detail && <dd className="text-slate-400 text-xs leading-4 mt-1">{item.detail}</dd>}
            </div>
          ))}
        </dl>
        <div className="mt-6">{ctas('hero')}</div>
      </ServiceHero>

      {/* Each page claims the one clip it plays. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: videoJsonLdText(RESCUE_VIDEO[lang]) }} />

      <ServiceSection title={t.who.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.who.body}</p>
      </ServiceSection>

      <ServiceSection title={t.how.title}>
        <StepList steps={t.how.steps} />
      </ServiceSection>

      <ServiceSection title={t.included.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.included.intro}</p>
        {/* The order is the config's order, and the one inclusion that waits on
            a carrier (text-back) carries its note inside its own card rather
            than in fine print at the bottom of the page. */}
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OFFER.inclusions.map(inclusion => {
            const item = t.included.items[inclusion.key];
            return (
              <li key={inclusion.key} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <p className="text-white font-bold leading-snug">{item.title}</p>
                    <p className="text-slate-400 leading-relaxed mt-1">{item.body}</p>
                  </div>
                </div>
                {inclusion.note === 'a2p' && (
                  <p className="text-amber-200/90 text-sm leading-relaxed mt-4 bg-amber-400/5 border border-amber-400/30 rounded-xl p-3">
                    {t.included.a2pNote}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <p className="text-slate-300 leading-relaxed max-w-3xl mt-6">{t.included.upgrade}</p>
        <p className="text-slate-500 text-sm leading-relaxed max-w-3xl mt-3">{t.included.finePrint}</p>
      </ServiceSection>

      <ServiceSection title={t.calculator.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.calculator.body}</p>
        <div className="mt-5">
          <Link to={lp('/missed-call-calculator')} className={secondaryButtonClass}>{t.calculator.link}</Link>
        </div>
      </ServiceSection>

      <ServiceSection title={t.proof.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.proof.body}</p>
        <div className="mt-5">
          {/* English goes to the tour section; the Spanish copy points at the
              page itself, because the narrated tour is English only and
              /es/pest-control does not render it. */}
          <Link to={lp(t.proof.link.path)} className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
            {t.proof.link.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </ServiceSection>

      <ServiceFaq title={t.faqTitle} items={t.faq} path={MISSED_CALL_RESCUE_PATH} />

      <ServiceClosing title={t.closing.title} body={t.closing.body}>
        <div className="flex flex-wrap items-start gap-3">
          {bookButton('closing')}
          <a href={PHONE_HREF} aria-label={`${t.ctaCall}: ${PHONE_DISPLAY}`} className={secondaryButtonClass}>
            {PHONE_DISPLAY}
          </a>
        </div>
      </ServiceClosing>
    </ServicePage>
  );
}
