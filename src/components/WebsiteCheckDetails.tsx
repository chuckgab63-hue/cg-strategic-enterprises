import { useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { OPEN_LETS_TALK_EVENT } from './LetsTalkChooser';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import websiteCheckDict from '../i18n/websiteCheck';
import { trackEvent } from '../lib/analytics';
import { calculateMissedCalls } from '../lib/missedCall/model';
import { formatCount, formatMoney } from '../lib/missedCall/format';
import { buildMissedCallSearch, MISSED_CALL_CALCULATOR_PATH } from '../lib/missedCall/url';
import type { PageSummary } from '../lib/websiteCheck/lead';
import type { RiskReason, SearchCheck } from '../lib/websiteCheck/scoring';
import {
  QUICK_ESTIMATE_DEFAULTS, quickEstimateInputs, rateCls, rateLcp, type QuickEstimate, type VitalRating,
} from '../lib/websiteCheck/learnMore';

// The "Learn more" panels under the Website Check's score cards
// (src/pages/WebsiteCheck.tsx). Everything shown comes from the visitor's own
// results or, in the estimator, their own numbers.

// In the order scoring.ts scores them.
const SEARCH_CHECKS: SearchCheck[] = ['https', 'title', 'meta_description', 'single_h1', 'viewport', 'structured_data'];
// The ways to reach the business that missedCallRisk() looks for. 'phone_only'
// isn't one of them: it's the extra point for having nothing but the phone.
const RISK_SIGNALS: Exclude<RiskReason, 'phone_only'>[] = ['no_tel_link', 'no_contact_form', 'no_booking', 'no_chat', 'no_after_hours'];

const RATING_TONE: Record<VitalRating, string> = {
  good: 'text-emerald-400 border-emerald-500/50',
  needs_work: 'text-amber-400 border-amber-500/50',
  poor: 'text-red-400 border-red-500/50',
};

const primaryButton = 'text-center bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] cursor-pointer';
const secondaryButton = 'text-center border border-slate-600 text-slate-200 px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer';

/**
 * One card's panel. Always in the page, `hidden` while closed so it takes no
 * space and the card's button can point at it. In the cards' grid it spans the
 * full row: under its own card on phones, under the row of cards on wider
 * screens. Escape closes it.
 */
export function DetailsPanel({ id, title, open, onClose, children }: {
  id: string; title: string; open: boolean; onClose: () => void; children: ReactNode;
}) {
  return (
    <section
      id={id}
      hidden={!open}
      aria-labelledby={`${id}-title`}
      onKeyDown={e => { if (e.key === 'Escape') onClose(); }}
      className="col-span-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6"
    >
      <h3 id={`${id}-title`} className="text-white font-bold text-lg mb-4">{title}</h3>
      {children}
    </section>
  );
}

function Mark({ ok }: { ok: boolean }) {
  const t = useT(websiteCheckDict).learnMore;
  return (
    <>
      <span
        aria-hidden="true"
        className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-black ${ok ? 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10' : 'text-red-400 border-red-500/50 bg-red-500/10'}`}
      >
        {ok ? '✓' : '✗'}
      </span>
      <span className="sr-only">{ok ? t.passed : t.missing}: </span>
    </>
  );
}

/** The Speed (desktop) and Mobile cards. */
export function SpeedDetails({ strategy, metrics }: { strategy: 'desktop' | 'mobile'; metrics: PageSummary['metrics']['mobile'] }) {
  const { learnMore: t, results: r } = useT(websiteCheckDict);
  const rows = metrics ? [
    metrics.lcp_ms !== null && { label: r.lcp, value: `${(metrics.lcp_ms / 1000).toFixed(1)}${r.seconds}`, rating: rateLcp(metrics.lcp_ms), what: t.lcpWhat },
    metrics.cls !== null && { label: r.cls, value: metrics.cls.toFixed(2), rating: rateCls(metrics.cls), what: t.clsWhat },
  ].filter(row => row !== false) : [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm leading-relaxed">
      <div className="flex flex-col gap-3">
        <p className="text-slate-300">{strategy === 'mobile' ? t.mobileWhat : t.speedWhat}</p>
        <p className="text-slate-400">{t.variesNote}</p>
        <p className="text-slate-300"><strong className="text-white">{t.whyLabel}</strong> {t.speedWhy}</p>
      </div>
      {rows.length > 0 && metrics && (
        <div className="flex flex-col gap-3">
          <dl className="flex flex-col gap-3">
            {rows.map(row => (
              <div key={row.label} className="flex flex-col gap-1">
                <dt className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-white font-bold">{row.label}</span>
                  <span className={`text-xs font-bold border rounded-full px-2 py-0.5 ${RATING_TONE[row.rating]}`}>{t.ratings[row.rating]}</span>
                </dt>
                <dd className="flex flex-col gap-0.5">
                  <span className="text-2xl font-black text-white tabular-nums">{row.value}</span>
                  <span className="text-slate-400">{row.what}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-slate-500">{metrics.metrics_source === 'field' ? t.fieldSource : t.labSource}</p>
        </div>
      )}
    </div>
  );
}

/** The Search basics card: all six checks, passed or missing, with a fix for each one missing. */
export function SearchDetails({ missed }: { missed: SearchCheck[] }) {
  const t = useT(websiteCheckDict).learnMore;
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
      {SEARCH_CHECKS.map(check => {
        const ok = !missed.includes(check);
        const copy = t.searchChecks[check];
        return (
          <li key={check} className="flex gap-3 text-sm leading-relaxed">
            <Mark ok={ok} />
            <div className="min-w-0">
              <p className="text-white font-bold">{copy.name}</p>
              <p className="text-slate-400">{copy.why}</p>
              {!ok && <p className="text-slate-300 mt-1"><strong className="text-brand-orange">{t.fixLabel}</strong> {copy.fix}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type EstimateField = keyof QuickEstimate;
const ESTIMATE_FIELDS: { key: EstimateField; label: 'calls' | 'missed' | 'close' | 'value'; kind: 'count' | 'pct' | 'money'; max: number; step: number }[] = [
  { key: 'callsPerWeek', label: 'calls', kind: 'count', max: 10000, step: 1 },
  { key: 'missedPct', label: 'missed', kind: 'pct', max: 100, step: 1 },
  { key: 'conversionPct', label: 'close', kind: 'pct', max: 100, step: 1 },
  { key: 'customerValue', label: 'value', kind: 'money', max: 1000000, step: 10 },
];

/** "What could this be costing you?": the missed-call calculator's math on four of the visitor's numbers. */
function Estimator({ idPrefix }: { idPrefix: string }) {
  const t = useT(websiteCheckDict).learnMore;
  const lang = useLang();
  const lp = useLocalePath();
  const [values, setValues] = useState<Record<EstimateField, string>>(() =>
    Object.fromEntries(ESTIMATE_FIELDS.map(f => [f.key, String(QUICK_ESTIMATE_DEFAULTS[f.key])])) as Record<EstimateField, string>);
  // A blank field counts as 0, as on the calculator.
  const inputs = useMemo(() => {
    const n = (key: EstimateField) => (values[key] === '' ? 0 : Number(values[key]));
    return quickEstimateInputs({
      callsPerWeek: n('callsPerWeek'), missedPct: n('missedPct'), conversionPct: n('conversionPct'), customerValue: n('customerValue'),
    });
  }, [values]);
  const result = calculateMissedCalls(inputs);
  const search = buildMissedCallSearch(inputs);

  // check_estimator_used: once per results page, on the first change. No values are sent.
  const tracked = useRef(false);
  const setField = (key: EstimateField, v: string) => {
    if (!tracked.current) {
      tracked.current = true;
      trackEvent('check_estimator_used', lang);
    }
    setValues(prev => ({ ...prev, [key]: v }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h4 className="text-white font-bold text-base">{t.estimatorTitle}</h4>
        <p className="text-xs font-semibold text-amber-300">{t.exampleNote}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ESTIMATE_FIELDS.map(f => (
          <div key={f.key} className="flex flex-col gap-2">
            <label htmlFor={`${idPrefix}-${f.key}`} className="text-xs font-semibold text-slate-300">{t.fields[f.label]}</label>
            <div className="flex items-center bg-slate-950 border border-slate-700 focus-within:border-brand-orange rounded-xl transition-colors">
              {f.kind === 'money' && <span className="pl-4 text-slate-500 text-base sm:text-sm" aria-hidden="true">$</span>}
              <input
                id={`${idPrefix}-${f.key}`}
                type="number" inputMode="decimal" min={0} max={f.max} step={f.step}
                value={values[f.key]}
                onChange={e => setField(f.key, e.target.value)}
                className={`w-full min-w-0 bg-transparent focus:outline-none py-3 text-white text-base sm:text-sm tabular-nums ${f.kind === 'money' ? 'pl-1' : 'pl-4'} ${f.kind === 'pct' ? 'pr-1' : 'pr-4'}`}
              />
              {f.kind === 'pct' && <span className="pr-4 text-slate-500 text-sm" aria-hidden="true">%</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">{t.assumption}</p>

      <dl aria-live="polite" className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-5">
        {[
          [t.missedCustomers, formatCount(result.lostCustomersPerMonth, lang)],
          [t.lostMonth, formatMoney(result.lostRevenuePerMonth, lang)],
          [t.lostYear, formatMoney(result.lostRevenuePerYear, lang)],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-xs font-bold tracking-widest uppercase text-slate-400">{label}</dt>
            <dd className="text-2xl font-black text-brand-orange tabular-nums break-all">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-xs text-slate-400">{t.estimateNote}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to={lp(`${MISSED_CALL_CALCULATOR_PATH}${search ? `?${search}` : ''}`)} className={primaryButton}>
          {t.fullEstimate}
        </Link>
        <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_LETS_TALK_EVENT))} className={secondaryButton}>
          {t.talkToAlex}
        </button>
      </div>
    </div>
  );
}

/** The Missed-call risk card: the ways to reach the business we looked for, and the estimator. */
export function RiskDetails({ missed, idPrefix }: { missed: RiskReason[] | null; idPrefix: string }) {
  const t = useT(websiteCheckDict).learnMore;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {missed && (
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">{t.riskTitle}</h4>
          <ul className="flex flex-col gap-3">
            {RISK_SIGNALS.map(signal => (
              <li key={signal} className="flex items-center gap-3 text-sm text-slate-200">
                <Mark ok={!missed.includes(signal)} />
                <span>{t.riskSignals[signal]}</span>
              </li>
            ))}
          </ul>
          {missed.includes('phone_only') && <p className="text-sm text-slate-400 leading-relaxed">{t.phoneOnly}</p>}
        </div>
      )}
      <div className={missed ? 'lg:col-span-3' : 'lg:col-span-5'}>
        <Estimator idPrefix={idPrefix} />
      </div>
    </div>
  );
}
