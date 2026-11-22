import { PriceTiles, primaryButtonClass } from './ServicePage';
import { bookingUrl } from '../config/booking';
import { RESCUE_BUNDLE_ANCHOR, RESCUE_BUNDLE_CAMPAIGN } from '../config/offers';
import { useT } from '../i18n/useLang';
import rescueBundle from '../i18n/rescueBundle';

// The Rescue Bundle: Missed-Call Rescue and DM Rescue on one invoice.
//
// One component, shown on both offer pages directly under each page's own
// pricing block, so the bundle price is stated in exactly one place. The
// figures all come from RESCUE_BUNDLE in src/config/offers.ts, where the
// separate totals and the savings are derived from the two offers' prices
// rather than typed.
//
// Styled as the orange-bordered gradient panel the site already uses for the
// one thing it wants read first — the same treatment as the homepage demo
// feature and the live-demo block on /dm-rescue — rather than a new look.

/**
 * `medium` is the page the card is on, so a booking reports which offer page
 * sold the bundle; utm_campaign is the bundle either way.
 */
export default function RescueBundleCard({ medium }: { medium: string }) {
  const t = useT(rescueBundle);

  return (
    <section
      id={RESCUE_BUNDLE_ANCHOR}
      aria-labelledby={`${RESCUE_BUNDLE_ANCHOR}-title`}
      className="mt-8 scroll-mt-28 bg-gradient-to-br from-slate-900 to-[#020617] border-2 border-brand-orange/60 rounded-3xl p-6 md:p-10"
    >
      <p className="text-xs font-black tracking-widest uppercase text-brand-orange">{t.eyebrow}</p>
      <h3 id={`${RESCUE_BUNDLE_ANCHOR}-title`} className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3">
        {t.title}
      </h3>
      <p className="text-slate-300 text-lg leading-relaxed mt-4 max-w-2xl">{t.body}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <PriceTiles
          tiles={[
            { label: t.setup },
            { label: t.monthly, detail: t.term },
          ]}
        />
        {/* What the two cost apart. `line-through` alone is not read out, so
            the label names it for a screen reader and `aria-hidden` keeps the
            struck figures themselves from being read as a live price. */}
        <p className="text-slate-500">
          <span className="sr-only">{t.separateLabel} </span>
          <span aria-hidden="true" className="line-through decoration-2">{t.separateSetup}</span>
          <span aria-hidden="true" className="mx-2">·</span>
          <span aria-hidden="true" className="line-through decoration-2">{t.separateMonthly}</span>
        </p>
      </div>

      <p className="inline-block mt-5 rounded-full border border-brand-orange/50 bg-brand-orange/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-orange">
        {t.badge}
      </p>

      <div className="mt-6">
        <span className="inline-flex flex-col items-start gap-1">
          <a
            href={bookingUrl(medium, RESCUE_BUNDLE_ANCHOR, 'website', RESCUE_BUNDLE_CAMPAIGN)}
            target="_blank"
            rel="noopener"
            data-book-call={RESCUE_BUNDLE_ANCHOR}
            className={primaryButtonClass}
          >
            {t.cta}
          </a>
          <small className="text-[11px] leading-4 text-slate-400 max-w-[18rem]">{t.ctaNote}</small>
        </span>
      </div>
    </section>
  );
}
