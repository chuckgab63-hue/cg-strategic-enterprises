import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BreakEvenChart from '../components/BreakEvenChart';
import MealPrepSummaryForm from '../components/MealPrepSummaryForm';
import {
  calculate, compareToRange, foodCostTier, BENCHMARKS, DEFAULT_INPUTS, EXAMPLE_SHIFT_COST, LOCAL_SOURCING_PREMIUM,
  type MealPrepInputs, type RangePosition, type Sourcing,
} from '../lib/mealPrepModel';
import { calculatorUrl, parseCalculatorParams } from '../lib/mealPrepUrl';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import { localizePath } from '../i18n/lang';
import mealPrepCalculator from '../i18n/mealPrepCalculator';

// ---------------------------------------------------------------------------
// Inputs: each has a realistic default and a note on where the default comes from.
// ---------------------------------------------------------------------------

type NumericField = Exclude<keyof MealPrepInputs, 'sourcing'>;

interface FieldSpec {
  key: NumericField;
  defaultValue: number;
  prefix?: string;
  step: number;
  max?: number;
}

// Labels, units and notes for each field live in src/i18n/mealPrepCalculator.tsx.
const FIELD_GROUPS: { id: 'menu' | 'kitchen' | 'time'; fields: FieldSpec[] }[] = [
  {
    id: 'menu',
    fields: [
      { key: 'mealsPerWeek', defaultValue: DEFAULT_INPUTS.mealsPerWeek, step: 1 },
      { key: 'pricePerMeal', defaultValue: DEFAULT_INPUTS.pricePerMeal, prefix: '$', step: 0.25 },
      { key: 'foodCostPerMeal', defaultValue: DEFAULT_INPUTS.foodCostPerMeal, prefix: '$', step: 0.05 },
      { key: 'packagingPerMeal', defaultValue: DEFAULT_INPUTS.packagingPerMeal, prefix: '$', step: 0.05 },
      { key: 'spoilagePct', defaultValue: DEFAULT_INPUTS.spoilagePct, step: 1, max: 100 },
    ],
  },
  {
    id: 'kitchen',
    fields: [
      { key: 'kitchenCostMonthly', defaultValue: DEFAULT_INPUTS.kitchenCostMonthly, prefix: '$', step: 25 },
      { key: 'deliverySharePct', defaultValue: DEFAULT_INPUTS.deliverySharePct, step: 5, max: 100 },
      { key: 'deliveryCostPerDrop', defaultValue: DEFAULT_INPUTS.deliveryCostPerDrop, prefix: '$', step: 0.5 },
      { key: 'mealsPerOrder', defaultValue: DEFAULT_INPUTS.mealsPerOrder, step: 1 },
    ],
  },
  {
    id: 'time',
    fields: [
      { key: 'ownerHoursPerWeek', defaultValue: DEFAULT_INPUTS.ownerHoursPerWeek, step: 1 },
      { key: 'ownerHourlyTarget', defaultValue: DEFAULT_INPUTS.ownerHourlyTarget, prefix: '$', step: 1 },
    ],
  },
];

const ALL_FIELDS = FIELD_GROUPS.flatMap(g => g.fields);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map(f => [f.key, String(f.defaultValue)])) as Record<NumericField, string>;
const DEFAULT_SOURCING: Sourcing = DEFAULT_INPUTS.sourcing;
const MEALS_SLIDER_MAX = 300;

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

const usd = (n: number, cents = false) =>
  `${n < 0 ? '−' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;
const pct = (n: number) => `${n.toFixed(1)}%`;

// ---------------------------------------------------------------------------
// Small presentational pieces
// ---------------------------------------------------------------------------

type Tone = 'good' | 'warn' | 'bad' | 'neutral';

const TONE_STYLES: Record<Tone, { chip: string; icon: string }> = {
  good: { chip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', icon: 'M5 13l4 4L19 7' },
  warn: { chip: 'bg-amber-500/10 border-amber-500/30 text-amber-300', icon: 'M12 9v4m0 4h.01' },
  bad: { chip: 'bg-red-500/10 border-red-500/30 text-red-300', icon: 'M6 18L18 6M6 6l12 12' },
  neutral: { chip: 'bg-slate-800 border-slate-700 text-slate-300', icon: 'M13 16h-1v-4h-1m1-4h.01' },
};

// Status always carries an icon and words, never colour alone.
function StatusChip({ tone, children }: { tone: Tone; children: ReactNode }) {
  const style = TONE_STYLES[tone];
  return (
    <span className={`inline-flex items-start gap-1.5 border rounded-lg px-2.5 py-1.5 text-xs font-semibold leading-snug ${style.chip}`}>
      <svg className="w-3.5 h-3.5 mt-px shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={style.icon} />
      </svg>
      <span>{children}</span>
    </span>
  );
}

function MetricCard({ label, value, valueClass = 'text-white', status, className = '', children }: {
  label: string; value: string; valueClass?: string; status?: ReactNode; className?: string; children: ReactNode;
}) {
  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 ${className}`.trim()}>
      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{label}</span>
      <span className={`text-3xl font-black tabular-nums leading-none ${valueClass}`}>{value}</span>
      {status}
      <p className="text-xs text-slate-400 leading-relaxed">{children}</p>
    </div>
  );
}

function NumberField({ spec, value, onChange }: { spec: FieldSpec; value: string; onChange: (v: string) => void }) {
  const t = useT(mealPrepCalculator);
  const text = t.fields[spec.key];
  const id = useId();
  const noteId = useId();
  const isMeals = spec.key === 'mealsPerWeek';
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-slate-200">{text.label}</label>
      <div className="flex items-center bg-slate-950 border border-slate-700 focus-within:border-brand-orange rounded-xl transition-colors">
        {spec.prefix && <span className="pl-4 text-slate-500 text-base sm:text-sm" aria-hidden="true">{spec.prefix}</span>}
        <input
          id={id}
          type="number" inputMode="decimal" min={0} max={spec.max} step={spec.step}
          aria-describedby={noteId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full min-w-0 bg-transparent focus:outline-none py-3 text-white text-base sm:text-sm tabular-nums ${spec.prefix ? 'pl-1.5' : 'pl-4'} pr-4`}
        />
        {text.suffix && <span className="pr-4 text-slate-500 text-xs whitespace-nowrap" aria-hidden="true">{text.suffix}</span>}
      </div>
      {isMeals && (
        <input
          type="range" min={0} max={MEALS_SLIDER_MAX} step={1}
          aria-label={t.mealsSlider}
          value={Math.min(Number(value) || 0, MEALS_SLIDER_MAX)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full accent-brand-orange cursor-pointer my-1"
        />
      )}
      <p id={noteId} className="text-[11px] text-slate-500 leading-relaxed">{text.note}</p>
    </div>
  );
}

// The no-email way to keep a scenario: a link that reopens these exact inputs.
// The page's own origin, so it works on whichever deployment you're looking at.
function CopyLinkButton({ inputs }: { inputs: MealPrepInputs }) {
  const t = useT(mealPrepCalculator).copyLink;
  const lang = useLang();
  const [copied, setCopied] = useState<{ url: string; ok: boolean } | null>(null);
  // On Spanish pages the link reopens the Spanish calculator ('/' -> '' or '/es').
  const url = calculatorUrl(inputs, window.location.origin + localizePath('/', lang).replace(/\/$/, ''));
  // Edit anything after copying and the old message no longer describes this link.
  const status = copied?.url === url ? copied : null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied({ url, ok: true });
    } catch {
      // No clipboard access (an http page, a locked-down browser): show the link to copy by hand.
      setCopied({ url, ok: false });
    }
  };

  return (
    <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
      {t.lead}{' '}
      <button
        type="button" onClick={copy}
        className="font-bold text-brand-orange underline hover:text-white transition-colors cursor-pointer"
      >
        {t.button}
      </button>
      {' '}{t.tail}
      <p role="status" className="mt-2 empty:hidden">
        {status?.ok && <span className="text-emerald-400 font-semibold">{t.copied}</span>}
        {status && !status.ok && (
          <>{t.failed}<span className="text-slate-200 break-all select-all">{url}</span></>
        )}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export default function MealPrepCalculator() {
  const t = useT(mealPrepCalculator);
  const lp = useLocalePath();

  // Links (the summary email, a copied link, the home-page preview) carry inputs
  // in the query string. Anything missing, malformed or out of range keeps its default.
  const [searchParams] = useSearchParams();
  const [seed] = useState(() => parseCalculatorParams(searchParams));
  const [values, setValues] = useState(
    () => Object.fromEntries(ALL_FIELDS.map(f => [f.key, String(seed[f.key])])) as Record<NumericField, string>,
  );
  const [sourcing, setSourcing] = useState<Sourcing>(seed.sourcing);

  const inputs: MealPrepInputs = useMemo(() => {
    const parsed = Object.fromEntries(
      ALL_FIELDS.map(f => [f.key, values[f.key] === '' ? 0 : Number(values[f.key])]),
    ) as Record<NumericField, number>;
    return { ...parsed, sourcing };
  }, [values, sourcing]);

  const r = useMemo(() => calculate(inputs), [inputs]);

  const isDefault = sourcing === DEFAULT_SOURCING && ALL_FIELDS.every(f => values[f.key] === DEFAULT_VALUES[f.key]);
  const meals = Math.max(0, inputs.mealsPerWeek || 0);
  const neverBreaksEven = r.breakEvenMeals === null;
  const pastBreakEven = !neverBreaksEven && meals >= r.breakEvenMeals!;
  const coversKitchen = r.breakEvenKitchenOnly !== null && meals >= r.breakEvenKitchenOnly;
  const shiftMeals = r.contributionMargin > 0 ? Math.ceil(Number((EXAMPLE_SHIFT_COST / r.contributionMargin).toFixed(9))) : null;

  // Mobile: a slim live summary pinned to the bottom while you're editing
  // inputs and the headline result is scrolled out of view.
  const inputsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [inputsVisible, setInputsVisible] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === inputsRef.current) setInputsVisible(entry.isIntersecting);
        if (entry.target === headlineRef.current) setHeadlineVisible(entry.isIntersecting);
      }
    });
    if (inputsRef.current) observer.observe(inputsRef.current);
    if (headlineRef.current) observer.observe(headlineRef.current);
    return () => observer.disconnect();
  }, []);
  const showMobileBar = inputsVisible && !headlineVisible;

  // --- Benchmark readings ---------------------------------------------------
  const foodPos = r.foodCostPct === null ? null : compareToRange(r.foodCostPct, BENCHMARKS.foodCost.low, BENCHMARKS.foodCost.high);
  const tier = r.foodCostPct === null ? null : foodCostTier(r.foodCostPct);
  const foodPackPos = r.foodPackagingPct === null ? null
    : compareToRange(r.foodPackagingPct, BENCHMARKS.foodPackaging.low, BENCHMARKS.foodPackaging.high);
  const rangeChip = (pos: RangePosition | null, range: { low: number; high: number }, extra?: string | null) => pos && (
    <StatusChip tone={pos === 'within' ? 'good' : pos === 'above' ? 'warn' : 'neutral'}>
      {t.range(pos, range.low, range.high)}
      {extra && ` · ${extra}`}
    </StatusChip>
  );

  const primeTone: Tone = r.primeCostPct === null ? 'neutral'
    : r.primeCostPct <= BENCHMARKS.primeCost.target ? 'good'
    : r.primeCostPct <= BENCHMARKS.primeCost.max ? 'warn' : 'bad';

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-[1392px] mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-24 text-left">

      {/* --- Intro --- */}
      <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-5">
        {t.badge}
      </span>
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
        {t.title(s => <span className="text-brand-orange">{s}</span>)}
      </h1>
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mt-5 max-w-3xl">
        {t.intro}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">

        {/* ===== Inputs ===== */}
        <div ref={inputsRef} className="lg:col-span-5 min-w-0 flex flex-col gap-6">
          {FIELD_GROUPS.map(group => (
            <fieldset key={group.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
              <legend className="sr-only">{t.groups[group.id]}</legend>
              <span className="text-white font-black text-sm uppercase tracking-widest" aria-hidden="true">{t.groups[group.id]}</span>
              {group.fields.map(spec => (
                <NumberField
                  key={spec.key} spec={spec} value={values[spec.key]}
                  onChange={(v) => setValues(prev => ({ ...prev, [spec.key]: v }))}
                />
              ))}

              {group.id === 'menu' && (
                <div className="flex flex-col gap-1.5" role="radiogroup" aria-label={t.sourcingGroup}>
                  <span className="text-sm font-bold text-slate-200" aria-hidden="true">{t.sourcing}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['broadline', 'local'] as const).map(option => (
                      <button
                        key={option} type="button" role="radio" aria-checked={sourcing === option}
                        onClick={() => setSourcing(option)}
                        className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-colors cursor-pointer ${
                          sourcing === option
                            ? 'bg-brand-orange/15 border-brand-orange text-white'
                            : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {t.sourcingOptions[option]}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {t.sourcingNote(LOCAL_SOURCING_PREMIUM * 100)}
                  </p>
                </div>
              )}

              {group.id === 'kitchen' && (
                <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 pt-4">
                  <strong className="text-slate-300">{t.cardProcessing.strong}</strong>{t.cardProcessing.rest}
                </p>
              )}
            </fieldset>
          ))}

          {!isDefault && (
            <button
              type="button"
              onClick={() => { setValues(DEFAULT_VALUES); setSourcing(DEFAULT_SOURCING); }}
              className="self-start text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors cursor-pointer"
            >
              {t.reset}
            </button>
          )}
        </div>

        {/* ===== Results ===== */}
        <div id="results" className="lg:col-span-7 min-w-0 flex flex-col gap-6 scroll-mt-28">

          {/* Headline: break-even */}
          <div ref={headlineRef} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-7">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{t.headlineLabel}</span>
            {neverBreaksEven ? (
              <>
                <p className="text-3xl md:text-4xl font-black text-red-400 mt-2 leading-tight">{t.neverTitle}</p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  {t.neverBody(usd(r.variableCostPerMeal, true), usd(inputs.pricePerMeal, true))}
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 leading-tight">
                  <span className="text-5xl md:text-6xl font-black text-white tabular-nums">{r.breakEvenMeals}</span>
                  <span className="text-lg md:text-xl font-bold text-slate-400 ml-2">{t.mealsAWeek}</span>
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  {t.covers(usd(inputs.ownerHourlyTarget), r.breakEvenKitchenOnly !== null && r.ownerPayWeekly > 0 ? r.breakEvenKitchenOnly : null)}
                </p>
                <div className="mt-4">
                  {pastBreakEven ? (
                    <StatusChip tone="good">
                      {t.pastBreakEven(meals, meals - r.breakEvenMeals!)}
                    </StatusChip>
                  ) : coversKitchen ? (
                    <StatusChip tone="warn">
                      {t.kitchenCovered(meals, r.breakEvenMeals! - meals)}
                    </StatusChip>
                  ) : (
                    <StatusChip tone="bad">
                      {t.shortOfBreakEven(meals, r.breakEvenMeals! - meals)}
                    </StatusChip>
                  )}
                </div>
              </>
            )}

            <div className="mt-6">
              <BreakEvenChart
                contributionMargin={r.contributionMargin}
                kitchenCostWeekly={r.kitchenCostWeekly}
                ownerPayWeekly={r.ownerPayWeekly}
                mealsPerWeek={meals}
                breakEvenKitchenOnly={r.breakEvenKitchenOnly}
                breakEvenMeals={r.breakEvenMeals}
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-3">
              {t.chartCaption}
            </p>
          </div>

          {/* The insight everyone misses */}
          <div className="border-l-2 border-brand-orange bg-brand-orange/5 rounded-r-2xl p-5 md:p-6">
            <strong className="text-brand-orange text-xs uppercase tracking-widest block mb-2">{t.forgottenKitchen}</strong>
            {shiftMeals !== null ? (
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                {t.shiftInsight(usd(inputs.pricePerMeal, true), usd(r.contributionMargin, true), shiftMeals)}
              </p>
            ) : (
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                {t.shiftNever(usd(r.contributionMargin, true))}
              </p>
            )}
          </div>

          {/* Metric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Two food benchmarks, two denominators: keep them side by side and say which is which. */}
            <div className="sm:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{t.foodTwoWays}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-3">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-slate-300">{t.foodAlone}</span>
                  <span className="text-3xl font-black tabular-nums leading-none text-white">{r.foodCostPct === null ? '—' : pct(r.foodCostPct)}</span>
                  {rangeChip(foodPos, BENCHMARKS.foodCost, tier && t.band(t.tiers[tier] ?? tier))}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.foodAloneBody(sourcing === 'local', foodPos === 'below')}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-5 sm:pt-0 sm:pl-6">
                  <span className="text-xs font-bold text-slate-300">{t.foodPackaging}</span>
                  <span className="text-3xl font-black tabular-nums leading-none text-white">{r.foodPackagingPct === null ? '—' : pct(r.foodPackagingPct)}</span>
                  {rangeChip(foodPackPos, BENCHMARKS.foodPackaging)}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.foodPackagingBody}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 mt-5 pt-4">
                {t.overlapNote}
              </p>
            </div>

            <MetricCard
              label={t.primeCost}
              value={r.primeCostPct === null ? '—' : pct(r.primeCostPct)}
              status={
                <StatusChip tone={primeTone}>
                  {r.primeCostPct === null ? t.primeNeedsMeal
                    : primeTone === 'good' ? t.primeGood(BENCHMARKS.primeCost.target)
                    : primeTone === 'warn' ? t.primeWarn(BENCHMARKS.primeCost.max, BENCHMARKS.primeCost.target)
                    : t.primeBad(BENCHMARKS.primeCost.max)}
                </StatusChip>
              }
            >
              {t.primeBody}
              {r.labourPct !== null && t.labourAlone(pct(r.labourPct))}
            </MetricCard>

            <MetricCard
              label={t.contribution}
              value={usd(r.contributionMargin, true)}
              valueClass={r.contributionMargin > 0 ? 'text-white' : 'text-red-400'}
            >
              {t.contributionBody}
              <span className="block mt-2 tabular-nums text-slate-400">
                {usd(inputs.pricePerMeal, true)} {t.breakdown.price}<br />
                − {usd(r.foodCostPerMeal, true)} {t.breakdown.food}<br />
                − {usd(r.packagingPerMeal, true)} {t.breakdown.packaging}<br />
                − {usd(r.deliveryPerMeal, true)} {t.breakdown.delivery}<br />
                − {usd(r.processingPerMeal, true)} {t.breakdown.processing}
              </span>
            </MetricCard>

            <MetricCard
              label={t.breakEvenVolume}
              value={neverBreaksEven ? t.never : t.perWeek(r.breakEvenMeals!)}
              valueClass={neverBreaksEven ? 'text-red-400' : 'text-white'}
            >
              {neverBreaksEven
                ? t.breakEvenNeverBody
                : t.breakEvenBody(usd(r.kitchenCostWeekly), usd(r.ownerPayWeekly), Math.ceil(r.breakEvenMeals! / Math.max(1, inputs.mealsPerOrder || 1)))}
            </MetricCard>

            <MetricCard label={t.monthlyRevenue} value={usd(r.monthlyRevenue)}>
              {t.monthlyRevenueBody(meals, usd(inputs.pricePerMeal, true), usd(inputs.pricePerMeal * Math.max(1, inputs.mealsPerOrder || 1)))}
            </MetricCard>

            <MetricCard
              label={t.monthlyProfit}
              className="sm:col-span-2"
              value={usd(r.monthlyProfit)}
              valueClass={r.monthlyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}
              status={r.netMarginPct !== null && (
                <StatusChip tone={r.netMarginPct >= BENCHMARKS.netMargin.low ? 'good' : r.netMarginPct >= 0 ? 'warn' : 'bad'}>
                  {t.netMargin(pct(r.netMarginPct))}
                </StatusChip>
              )}
            >
              {t.profitBody(usd(inputs.ownerHourlyTarget))}
              {r.ownerEffectiveHourly !== null && t.takeHome(
                usd(r.ownerTakeHomeMonthly),
                usd(r.ownerEffectiveHourly, true),
                inputs.ownerHoursPerWeek,
                r.ownerEffectiveHourly >= inputs.ownerHourlyTarget ? 'text-emerald-400' : 'text-red-400',
              )}
            </MetricCard>
          </div>

          {/* The COGS trap */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-7">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{t.cogsTrap}</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2">{t.cogsTitle}</h2>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">
              {t.cogsBody}
            </p>
            {r.receiptCogsPct !== null && r.trueCogsPct !== null ? (
              <div className="mt-5 flex flex-col gap-4">
                {[
                  { label: t.receiptRow, value: r.receiptCogsPct, bar: 'bg-slate-500' },
                  { label: t.trueRow, value: r.trueCogsPct, bar: 'bg-[#EA580C]' },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between gap-3 text-xs mb-1.5">
                      <span className="text-slate-300">{row.label}</span>
                      <span className="text-white font-bold tabular-nums">{pct(row.value)}</span>
                    </div>
                    <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${Math.min(100, row.value)}%` }} />
                      <div className="absolute inset-y-0 w-0.5 bg-slate-200" style={{ left: `${BENCHMARKS.trueCogsWarning}%` }} aria-hidden="true" />
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-slate-500">{t.whiteTick(BENCHMARKS.trueCogsWarning)}</p>
                {r.trueCogsPct > 100 ? (
                  <StatusChip tone="bad">{t.cogsOver100(meals)}</StatusChip>
                ) : r.trueCogsPct > BENCHMARKS.trueCogsWarning ? (
                  <StatusChip tone="warn">{t.cogsWarn(BENCHMARKS.trueCogsWarning)}</StatusChip>
                ) : (
                  <StatusChip tone="good">{t.cogsGood(BENCHMARKS.trueCogsWarning)}</StatusChip>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-4">{t.cogsEmpty}</p>
            )}
          </div>

          {/* Email capture — after the numbers, never in front of them */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-7">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
              <h2 className="text-white font-bold text-lg">{t.emailTitle}</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              {t.emailBody}
            </p>
            <MealPrepSummaryForm inputs={inputs} results={r} />
            <CopyLinkButton inputs={inputs} />
          </div>
        </div>
      </div>

      {/* --- Benchmarks --- */}
      <div className="mt-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-8">
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{t.benchmarks}</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-2">{t.benchmarksTitle}</h2>
        <p className="text-sm text-slate-400 leading-relaxed mt-3 max-w-3xl">
          {t.benchmarksBody}
        </p>
        <div className="text-sm text-slate-400 leading-relaxed border-l-2 border-brand-orange bg-brand-orange/5 p-4 rounded-r-lg mt-6 max-w-3xl">
          <strong className="text-brand-orange text-xs uppercase tracking-widest block mb-1">{t.denominatorTitle}</strong>
          {t.denominatorBody}
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 mt-8">
          {t.benchmarkList.map(([term, detail]) => (
            <div key={term} className="border-t border-slate-800 pt-4">
              <dt className="text-xs font-black uppercase tracking-widest text-slate-200">{term}</dt>
              <dd className="text-sm text-slate-400 leading-relaxed mt-1.5">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* --- Soft CTA --- */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <p className="text-sm text-slate-300 leading-relaxed">
          {t.ctaBody}
        </p>
        <Link
          to={lp('/portfolio')}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-brand-orange/40 text-brand-orange font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-brand-orange/10 hover:border-brand-orange transition-colors"
        >
          {t.ctaLink} &rarr;
        </Link>
      </div>

      {/* --- Mobile live summary bar --- */}
      <div
        aria-hidden={!showMobileBar}
        className={`lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 transition-transform duration-300 ${showMobileBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <a href="#results" tabIndex={showMobileBar ? 0 : -1} className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-300 leading-snug">
            {neverBreaksEven ? (
              <strong className="text-red-400">{t.mobileNever}</strong>
            ) : (
              <>
                {t.mobileBreakEven} <strong className="text-white tabular-nums">{t.perWeek(r.breakEvenMeals!)}</strong>
                <span className="text-slate-500"> · </span>
                {t.mobileYou} <strong className={`tabular-nums ${pastBreakEven ? 'text-emerald-400' : 'text-red-400'}`}>{t.perWeek(meals)} {pastBreakEven ? '✓' : '✕'}</strong>
              </>
            )}
            <span className="text-slate-500"> · </span>
            <span className="tabular-nums">{usd(r.contributionMargin, true)}{t.perMeal}</span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange whitespace-nowrap">{t.results} &darr;</span>
        </a>
      </div>
    </section>
  );
}
