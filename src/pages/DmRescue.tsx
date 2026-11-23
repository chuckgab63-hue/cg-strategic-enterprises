import { Link } from 'react-router-dom';
import WatchDemoLink from '../components/WatchDemoLink';
import {
  PriceTiles, ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection, StepList,
  primaryButtonClass, secondaryButtonClass,
} from '../components/ServicePage';
import RescueBundleCard from '../components/RescueBundleCard';
import { bookingUrl } from '../config/booking';
import { DM_RESCUE as OFFER, OFFER_CURRENCY, RESCUE_BUNDLE_ANCHOR } from '../config/offers';
import rescueBundle from '../i18n/rescueBundle';
import { INSTAGRAM_DM_URL } from '../config/social';
import { ORGANIZATION_ID, SITE_URL } from '../config/site';
import { breadcrumbJsonLdText } from '../i18n/breadcrumbs';
import { localizePath, type Lang } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import dmRescue, { DM_RESCUE_CAMPAIGN, DM_RESCUE_MEDIUM, DM_RESCUE_PATH, DM_RESCUE_SOURCE } from '../i18n/dmRescue';

// /dm-rescue and /es/dm-rescue: the DM Rescue offer.
//
// Same split as /missed-call-rescue: the offer is data (src/config/offers.ts:
// prices and the ordered list of inclusions), the words are
// src/i18n/dmRescue.ts, and this file is the layout and the structured data.
// The page reuses the service-page building blocks rather than styling its
// own — ServiceHero, StepList, ServiceFaq and ServiceClosing all come from
// src/components/ServicePage.tsx.

/**
 * Service with the two prices as Offers, in the page's own language — the same
 * shape /missed-call-rescue uses, for the same reason: this offer has a fixed
 * price, so it can state one. The monthly Offer gets a UnitPriceSpecification
 * so the figure reads as "per month" rather than as a second one-time charge,
 * and the provider is the Organization node vite.config.ts puts in every
 * page's head, by @id rather than described again.
 */
function serviceJsonLd(lang: Lang, t: typeof dmRescue.en): string {
  const url = SITE_URL + localizePath(DM_RESCUE_PATH, lang);
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

/**
 * The phone-style chat mock beside the live-demo block: the exact exchange a
 * visitor is about to have with the account.
 *
 * Drawn in HTML and CSS rather than shipped as a picture, so it stays sharp at
 * any size, translates with the rest of the page and costs no request. It is
 * decorative in the sense that every word in it is said in the copy beside it,
 * but it is still a conversation, so it is a figure with a label rather than
 * `aria-hidden`: a screen reader reads the two bubbles in order.
 */
function ChatMock({ t }: { t: typeof dmRescue.en.demo.mock }) {
  return (
    <figure
      role="group"
      aria-label={t.label}
      className="mx-auto w-full max-w-[20rem] rounded-[2rem] border border-slate-700 bg-slate-950 p-3 shadow-[0_0_40px_rgba(2,6,23,0.8)]"
    >
      {/* The notch, and the account the conversation is with. */}
      <div className="flex items-center gap-2 border-b border-slate-800 px-2 pb-3">
        <span aria-hidden="true" className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-deep" />
        <span className="text-sm font-bold text-white">{t.header}</span>
      </div>

      <div className="flex flex-col gap-3 px-2 py-4">
        {/* The customer, on the right. */}
        <p className="self-end max-w-[80%] rounded-2xl rounded-br-md bg-brand-orange px-4 py-2 text-sm font-bold text-brand-ink">
          {t.customer}
        </p>
        {/* The business, on the left: the automatic reply, then the two links
            it sends with it. They are drawn as link text rather than real
            links because they are a picture of someone else's screen — the
            real buttons are in the copy beside this. */}
        <div className="self-start max-w-[90%] rounded-2xl rounded-bl-md bg-slate-800 px-4 py-3">
          <p className="text-sm leading-relaxed text-slate-100">{t.business}</p>
          <ul className="mt-3 flex flex-col gap-2 border-t border-slate-700 pt-3">
            {t.links.map(line => (
              <li key={line} className="text-sm font-bold text-sky-300 underline underline-offset-4">{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <figcaption className="px-2 pb-1 text-right text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        {t.timestamp}
      </figcaption>
    </figure>
  );
}

export default function DmRescue() {
  const t = useT(dmRescue);
  const bundle = useT(rescueBundle);
  const lang = useLang();
  const lp = useLocalePath();

  const crumbs = [
    { name: t.breadcrumbs.home, path: '/' },
    { name: t.breadcrumbs.here, path: DM_RESCUE_PATH },
  ];

  /**
   * The live demo, which is the whole argument of this page: it opens the
   * Instagram thread with the account that answers. A new tab with
   * rel="noopener", like every off-site link on the site.
   */
  const demoButton = (label: string, className = primaryButtonClass) => (
    <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener" className={className}>
      {label}<span className="sr-only"> {t.newTab}</span>
    </a>
  );

  // The booking link, with this offer's own source, medium and campaign on top
  // of the placement every booking link carries. The note under it says what
  // the calendar actually offers (one free 30-minute slot), and on Spanish
  // pages it also says the Cal.com page is in English.
  const bookButton = (placement: string, className = secondaryButtonClass) => (
    <span className="inline-flex flex-col items-start gap-1">
      <a
        href={bookingUrl(DM_RESCUE_MEDIUM, placement, DM_RESCUE_SOURCE, DM_RESCUE_CAMPAIGN)}
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
    <div className="flex flex-wrap items-start gap-3">
      {demoButton(t.ctaDemo)}
      {bookButton(placement)}
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

      <WatchDemoLink slug="dm-rescue-demo" kind="video" />

      {/* The live demo, directly under the hero, in its own framed block: it is
          the one thing on this page a visitor can check for themselves, so it
          comes before anything the page claims. Copy first and the mock second
          in the source, so on a phone the text stacks above the picture. */}
      <section className="mt-12 md:mt-16 bg-gradient-to-br from-slate-900 to-[#020617] border border-brand-orange/30 rounded-3xl p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{t.demo.title}</h2>
            <p className="text-slate-300 text-lg leading-relaxed mt-4">{t.demo.body}</p>
            <div className="mt-6">{demoButton(t.demo.button)}</div>
          </div>
          <ChatMock t={t.demo.mock} />
        </div>
      </section>

      <ServiceSection title={t.problem.title}>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.problem.cards.map(card => (
            <li key={card} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-slate-200 text-lg leading-relaxed">
              {card}
            </li>
          ))}
        </ul>
      </ServiceSection>

      <ServiceSection title={t.included.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.included.intro}</p>
        {/* The order is the config's order. */}
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OFFER.inclusions.map(key => {
            const item = t.included.items[key];
            return (
              <li key={key} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <p className="text-white font-bold leading-snug">{item.title}</p>
                    <p className="text-slate-400 leading-relaxed mt-1">{item.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </ServiceSection>

      <ServiceSection title={t.how.title}>
        <StepList steps={t.how.steps} />
      </ServiceSection>

      <ServiceSection title={t.who.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.who.body}</p>
      </ServiceSection>

      <ServiceFaq title={t.faqTitle} items={t.faq} path={DM_RESCUE_PATH} />

      <ServiceSection title={t.pricing.title}>
        {/* The figures as their own row, the way /missed-call-rescue prints
            them: it is a fixed-price offer, so the figures are the offer. */}
        <PriceTiles
          tiles={[
            { label: t.pricing.setup },
            { label: t.pricing.monthly, detail: t.pricing.term },
            { label: t.pricing.live },
          ]}
        />
        {/* The bundle price is stated once, on the card below, so this is a
            link to it rather than a second copy of the figures. */}
        <p className="mt-6">
          <a href={`#${RESCUE_BUNDLE_ANCHOR}`} className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
            {bundle.jumpLink} <span aria-hidden="true">&darr;</span>
          </a>
        </p>
        <div className="mt-6">{ctas('pricing')}</div>
      </ServiceSection>

      {/* Both offers together, directly after this page's own prices. */}
      <RescueBundleCard medium="dm-rescue" />

      <ServiceClosing title={t.closing.title} body={t.closing.body}>
        <div className="flex flex-wrap items-start gap-3">
          {demoButton(t.ctaDemo)}
          {bookButton('closing')}
        </div>
      </ServiceClosing>
    </ServicePage>
  );
}
