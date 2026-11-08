import {
  MOST_POPULAR, PACKAGE_GROUPS, SHOW_PRICES, TIER_HEADLINE, TIER_KEYS, TIER_NAME,
  TIER_PRICES, TIER_PROMISE, featuresAddedBy, statusOf, tierHas,
  type FeatureStatus, type PackageFeature, type TierKey,
} from '../config/pestPackages';
import { bookingUrl } from '../config/booking';
import { statusLabel, statusMeaning } from '../config/featureStatus';
import { LOCALE } from '../i18n/lang';
import { trackEvent } from '../lib/analytics';
import { useLang, useT } from '../i18n/useLang';
import common from '../i18n/common';
import pestControl from '../i18n/pestControl';

// Basic / Pro / Advanced on /pest-control: three cards, then the full
// feature × package table. Both read src/config/pestPackages.ts, so a feature
// added there shows up in both without being written twice.
//
// No figure reaches this component while SHOW_PRICES is false — the cards and
// the table say "Pricing after a free 30-minute audit" instead.

/** The four statuses shown in the legend, in the order they are read. */
const LEGEND: FeatureStatus[] = ['in-use', 'ready', 'ready-esign', 'service'];

// rounded-2xl, not rounded-full: the e-signature label wraps to several lines
// on a phone, and a full radius turns a wrapped pill into an ellipse that cuts
// across its own text. A fixed radius still reads as a chip on one line.
const STATUS_PILL = 'inline-block px-2.5 py-1 rounded-2xl text-[10px] font-bold uppercase tracking-widest border';
const STATUS_TONE: Record<FeatureStatus, string> = {
  'in-use': 'border-emerald-400/40 text-emerald-200 bg-emerald-400/10',
  ready: 'border-amber-400/50 text-amber-300 bg-amber-400/10',
  'ready-esign': 'border-amber-400/50 text-amber-300 bg-amber-400/10',
  service: 'border-sky-400/40 text-sky-200 bg-sky-400/10',
};

/**
 * The status pill. In the cards it only shows the three that are not already in
 * use with a client, so the lists stay readable; in the table it shows every
 * one, because that is the reference list and an absent pill there would be
 * something to interpret. The words come from src/config/featureStatus.ts.
 */
function StatusPill({ feature, always = false }: { feature: PackageFeature; always?: boolean }) {
  const lang = useLang();
  const status = statusOf(feature);
  if (status === 'in-use' && !always) return null;
  return <span className={`${STATUS_PILL} ${STATUS_TONE[status]}`}>{statusLabel(status, lang)}</span>;
}

export default function PestPackages() {
  const t = useT(pestControl).packages;
  const { bookCall } = useT(common);
  const lang = useLang();

  const price = (tier: TierKey) =>
    new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
      .format(TIER_PRICES[tier].monthly);

  return (
    <>
      {/* ---------------- The three cards ---------------- */}
      <ol className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TIER_KEYS.map((tier, i) => {
          const popular = tier === MOST_POPULAR;
          const previous = i > 0 ? TIER_NAME[TIER_KEYS[i - 1]][lang] : null;
          return (
            <li
              key={tier}
              className={`relative flex flex-col bg-slate-900/60 border rounded-3xl p-6 ${popular ? 'border-brand-orange/60 shadow-[0_0_30px_rgba(255,95,31,0.08)]' : 'border-slate-800'}`}
            >
              {popular && (
                <p className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-brand-orange text-brand-ink text-[10px] font-black uppercase tracking-widest">
                  {t.mostPopular}
                </p>
              )}

              <h3 className="text-2xl font-black text-white">{TIER_NAME[tier][lang]}</h3>
              <p className="text-brand-orange font-bold mt-1">{TIER_HEADLINE[tier][lang]}</p>
              <p className="text-slate-300 leading-relaxed mt-3">{TIER_PROMISE[tier][lang]}</p>

              {previous && <p className="text-slate-300 font-semibold mt-5">{t.includesPrevious(previous)}</p>}

              <ul className={`${previous ? 'mt-2' : 'mt-5'} flex flex-col gap-2`}>
                {featuresAddedBy(tier).map(f => (
                  <li key={f.key} className="flex gap-2 text-slate-400 leading-relaxed">
                    <span aria-hidden="true" className="text-brand-orange shrink-0">&#10003;</span>
                    <span>
                      {f.label[lang]}
                      {f.status && <> <StatusPill feature={f} /></>}
                      {f.note && <span className="block text-slate-400 text-sm mt-0.5">{f.note[lang]}</span>}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pushed to the bottom so all three cards line up however long the lists are. */}
              <div className="mt-auto pt-6">
                <p className="text-white font-bold">
                  {SHOW_PRICES ? price(tier) : t.pricingNote}
                </p>
                {SHOW_PRICES && <p className="text-slate-400 text-sm mt-1">{t.pricingNote}</p>}
                <a
                  href={bookingUrl('pest-control', `tier-${tier}`)}
                  target="_blank"
                  rel="noopener"
                  data-book-call={`tier-${tier}`}
                  onClick={() => trackEvent('pest_tier_cta', lang, { tier })}
                  className={`mt-4 inline-flex items-center justify-center w-full px-5 py-3 rounded-full font-bold tracking-widest uppercase text-xs transition-colors ${popular ? 'bg-brand-orange text-brand-ink hover:bg-white hover:text-brand-orange-deep' : 'border border-slate-600 text-slate-200 hover:border-brand-orange hover:text-brand-orange-deep'}`}
                >
                  {t.cta}
                </a>
                {bookCall.note && <small className="block text-[11px] leading-4 text-slate-400 mt-2">{bookCall.note}</small>}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="text-slate-400 text-sm leading-relaxed mt-5">{t.cardsStatusNote}</p>

      {/* ---------------- The full table ---------------- */}
      <div className="mt-14">
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">{t.tableTitle}</h3>
        <p className="text-slate-400 leading-relaxed mt-2">{t.tableIntro}</p>

        {/* What each label means, spelled out rather than left to the colour. */}
        <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.statusLegendTitle}</p>
          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEGEND.map(status => (
              <div key={status}>
                <dt><span className={`${STATUS_PILL} ${STATUS_TONE[status]}`}>{statusLabel(status, lang)}</span></dt>
                <dd className="text-slate-400 text-sm leading-relaxed mt-2">{statusMeaning(status, lang)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* No min-width on the table: one wide enough to need sideways scrolling
            adds its overflow to the document on a phone, however the wrapper is
            set up, and the whole page then scrolls sideways. The package columns
            shrink instead, which leaves the feature names the room they need. */}
        <div className="mt-6">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.tableTitle}</caption>
            <thead>
              <tr className="border-b border-slate-700">
                <th scope="col" className="py-3 pr-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  {t.featureColumn}
                </th>
                {TIER_KEYS.map(tier => (
                  <th
                    key={tier}
                    scope="col"
                    className={`py-3 px-1 sm:px-2 w-14 sm:w-[5.5rem] text-center text-[10px] sm:text-[11px] font-black uppercase tracking-wide sm:tracking-widest ${tier === MOST_POPULAR ? 'text-brand-orange' : 'text-slate-400'}`}
                  >
                    {TIER_NAME[tier][lang]}
                  </th>
                ))}
              </tr>
            </thead>
            {PACKAGE_GROUPS.map(group => (
              <tbody key={group.key}>
                <tr className="bg-slate-900/60">
                  <th scope="colgroup" colSpan={TIER_KEYS.length + 1} className="py-2.5 px-3 text-xs font-black uppercase tracking-widest text-white">
                    {group.label[lang]}
                  </th>
                </tr>
                {group.features.map(f => (
                  <tr key={f.key} className="border-b border-slate-800/80">
                    <th scope="row" className="py-3 pr-3 font-normal text-slate-300 text-sm sm:text-base leading-relaxed align-top">
                      {f.label[lang]}
                      {/* Every row is labelled here, so no reader has to work out what a missing pill means. */}
                      <span className="block mt-1.5"><StatusPill feature={f} always /></span>
                      {f.note && <span className="block text-slate-400 text-sm mt-1">{f.note[lang]}</span>}
                    </th>
                    {TIER_KEYS.map(tier => (
                      <td key={tier} className="py-3 px-1 sm:px-2 text-center align-top">
                        {tierHas(tier, f) ? (
                          <>
                            <span aria-hidden="true" className="text-brand-orange font-black">&#10003;</span>
                            <span className="sr-only">{t.included}</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true" className="text-slate-400">&ndash;</span>
                            <span className="sr-only">{t.notIncluded}</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mt-4">{t.pricingNote}</p>
      </div>
    </>
  );
}
