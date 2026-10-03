import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import BreakEvenChart from '../components/BreakEvenChart';
import MealPrepSummaryForm from '../components/MealPrepSummaryForm';
import { BUSINESS_NAME } from '../config/site';
import {
  calculate, compareToRange, foodCostTier, BENCHMARKS, EXAMPLE_SHIFT_COST, LOCAL_SOURCING_PREMIUM,
  type MealPrepInputs, type RangePosition, type Sourcing,
} from '../lib/mealPrepModel';

// ---------------------------------------------------------------------------
// Inputs: each has a realistic default and a note on where the default comes from.
// ---------------------------------------------------------------------------

type NumericField = Exclude<keyof MealPrepInputs, 'sourcing'>;

interface FieldSpec {
  key: NumericField;
  label: string;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  step: number;
  max?: number;
  note: string;
}

const FIELD_GROUPS: { title: string; fields: FieldSpec[] }[] = [
  {
    title: 'Your menu',
    fields: [
      { key: 'mealsPerWeek', label: 'Meals per week', defaultValue: 60, suffix: 'meals', step: 1,
        note: 'A starting point for a solo operator. Slide it and watch where you cross break-even on the chart.' },
      { key: 'pricePerMeal', label: 'Price per meal', defaultValue: 12, prefix: '$', step: 0.25,
        note: '$12 is the example price used throughout this page. Check what meal-prep sellers near you charge.' },
      { key: 'foodCostPerMeal', label: 'Food cost per meal', defaultValue: 3.75, prefix: '$', step: 0.05,
        note: '31% of a $12 meal before spoilage — inside the standard 28–32% food-cost band. Cost your real recipe, ingredient by ingredient, at broadline prices.' },
      { key: 'packagingPerMeal', label: 'Packaging per meal', defaultValue: 0.6, prefix: '$', step: 0.05,
        note: 'Container, lid and label. A planning figure — swap in your supplier’s quote.' },
      { key: 'spoilagePct', label: 'Spoilage and waste', defaultValue: 5, suffix: '% of food', step: 1, max: 100,
        note: 'Trim, over-production and meals that don’t sell. A planning allowance, not an industry benchmark — track your own.' },
    ],
  },
  {
    title: 'Kitchen and delivery',
    fields: [
      { key: 'kitchenCostMonthly', label: 'Kitchen cost per month', defaultValue: 600, prefix: '$', step: 25,
        note: 'Commissary kitchens run $15–40 an hour or $300–1,200 a month; most small operators spend $400–800 a month all in. $600 is the middle of that.' },
      { key: 'deliverySharePct', label: 'Share of orders delivered', defaultValue: 50, suffix: '%', step: 5, max: 100,
        note: 'Half delivered, half picked up. Pickup-only? Set it to 0.' },
      { key: 'deliveryCostPerDrop', label: 'Delivery cost per drop', defaultValue: 6, prefix: '$', step: 0.5,
        note: 'Food delivery typically costs $5–8 a drop, whether that’s a courier or your own time, fuel and mileage.' },
      { key: 'mealsPerOrder', label: 'Meals per order', defaultValue: 4, suffix: 'meals', step: 1,
        note: 'Delivery and the 30¢ card fee are charged per order, not per meal. Four $12 meals is a $48 order — inside the typical $35–60 average order value.' },
    ],
  },
  {
    title: 'Your own time',
    fields: [
      { key: 'ownerHoursPerWeek', label: 'Your hours per week', defaultValue: 20, suffix: 'hrs', step: 1,
        note: 'Shopping, prep, cooking, packing, delivery, customer messages, social posts. Count all of it.' },
      { key: 'ownerHourlyTarget', label: 'What you need to pay yourself', defaultValue: 20, prefix: '$', suffix: '/hr', step: 1,
        note: 'What you’d have to pay someone else to do this work. Put $0 and the business is quietly borrowing from you.' },
    ],
  },
];

const ALL_FIELDS = FIELD_GROUPS.flatMap(g => g.fields);
const DEFAULT_VALUES = Object.fromEntries(ALL_FIELDS.map(f => [f.key, String(f.defaultValue)])) as Record<NumericField, string>;
const DEFAULT_SOURCING: Sourcing = 'broadline';
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
  const id = useId();
  const noteId = useId();
  const isMeals = spec.key === 'mealsPerWeek';
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-slate-200">{spec.label}</label>
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
        {spec.suffix && <span className="pr-4 text-slate-500 text-xs whitespace-nowrap" aria-hidden="true">{spec.suffix}</span>}
      </div>
      {isMeals && (
        <input
          type="range" min={0} max={MEALS_SLIDER_MAX} step={1}
          aria-label="Meals per week slider"
          value={Math.min(Number(value) || 0, MEALS_SLIDER_MAX)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full accent-brand-orange cursor-pointer my-1"
        />
      )}
      <p id={noteId} className="text-[11px] text-slate-500 leading-relaxed">{spec.note}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export default function MealPrepCalculator() {
  usePageMeta(
    `Meal Prep Business Calculator | ${BUSINESS_NAME}`,
    'Free meal-prep business calculator: enter your price, food cost, kitchen rent, delivery and your own time to see food cost %, prime cost %, contribution per meal, and the break-even volume that matters most.',
  );

  const [values, setValues] = useState(DEFAULT_VALUES);
  const [sourcing, setSourcing] = useState<Sourcing>(DEFAULT_SOURCING);

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
      {pos === 'within' ? 'Inside' : pos === 'above' ? 'Above' : 'Below'} the {range.low}–{range.high}% range
      {extra && ` · ${extra}`}
    </StatusChip>
  );

  const primeTone: Tone = r.primeCostPct === null ? 'neutral'
    : r.primeCostPct <= BENCHMARKS.primeCost.target ? 'good'
    : r.primeCostPct <= BENCHMARKS.primeCost.max ? 'warn' : 'bad';

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-24 text-left">

      {/* --- Intro --- */}
      <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-5">
        Free Planning Tool
      </span>
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
        Does your meal-prep business <span className="text-brand-orange">actually work?</span>
      </h1>
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mt-5 max-w-3xl">
        Most new meal-prep businesses set prices from the grocery receipt and forget the kitchen,
        the containers, the delivery runs and their own time. Put in your numbers and see how many
        meals a week it takes to cover all of it. No sign-up, nothing to unlock — the results update as you type.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">

        {/* ===== Inputs ===== */}
        <div ref={inputsRef} className="lg:col-span-5 min-w-0 flex flex-col gap-6">
          {FIELD_GROUPS.map(group => (
            <fieldset key={group.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
              <legend className="sr-only">{group.title}</legend>
              <span className="text-white font-black text-sm uppercase tracking-widest" aria-hidden="true">{group.title}</span>
              {group.fields.map(spec => (
                <NumberField
                  key={spec.key} spec={spec} value={values[spec.key]}
                  onChange={(v) => setValues(prev => ({ ...prev, [spec.key]: v }))}
                />
              ))}

              {group.title === 'Your menu' && (
                <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Where you buy ingredients">
                  <span className="text-sm font-bold text-slate-200" aria-hidden="true">Sourcing</span>
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
                        {option === 'broadline' ? 'Broadline' : 'Local'}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Broadline means a foodservice distributor; local means farms, butchers and markets. Local
                    protein and produce run meaningfully higher, so choosing Local adds {LOCAL_SOURCING_PREMIUM * 100}% to
                    your food cost. That’s our planning assumption, not a published figure — your supplier quotes beat it.
                  </p>
                </div>
              )}

              {group.title === 'Kitchen and delivery' && (
                <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 pt-4">
                  <strong className="text-slate-300">Card processing</strong> is included automatically at 2.9% + 30¢ per order,
                  a common online card rate.
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
              Reset to defaults
            </button>
          )}
        </div>

        {/* ===== Results ===== */}
        <div id="results" className="lg:col-span-7 min-w-0 flex flex-col gap-6 scroll-mt-28">

          {/* Headline: break-even */}
          <div ref={headlineRef} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-7">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Break-even volume — the number that matters most</span>
            {neverBreaksEven ? (
              <>
                <p className="text-3xl md:text-4xl font-black text-red-400 mt-2 leading-tight">No volume breaks even.</p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  Each meal costs {usd(r.variableCostPerMeal, true)} to make, pack, deliver and charge for, and sells
                  for {usd(inputs.pricePerMeal, true)}. Selling more only loses more. Raise the price or cut per-meal costs first.
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 leading-tight">
                  <span className="text-5xl md:text-6xl font-black text-white tabular-nums">{r.breakEvenMeals}</span>
                  <span className="text-lg md:text-xl font-bold text-slate-400 ml-2">meals a week</span>
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  to cover the kitchen <em>and</em> pay yourself {usd(inputs.ownerHourlyTarget)}/hr
                  {r.breakEvenKitchenOnly !== null && r.ownerPayWeekly > 0 && (
                    <> ({r.breakEvenKitchenOnly} meals covers the kitchen alone)</>
                  )}.
                </p>
                <div className="mt-4">
                  {pastBreakEven ? (
                    <StatusChip tone="good">
                      At {meals} meals a week you’re past break-even by {meals - r.breakEvenMeals!} meals.
                    </StatusChip>
                  ) : coversKitchen ? (
                    <StatusChip tone="warn">
                      At {meals} meals a week the kitchen’s covered, but you’re {r.breakEvenMeals! - meals} meals short of paying yourself.
                    </StatusChip>
                  ) : (
                    <StatusChip tone="bad">
                      At {meals} meals a week you’re {r.breakEvenMeals! - meals} meals short of break-even.
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
              The orange line is what your meals bring in after their own costs. Where it crosses a dashed line,
              that cost is covered. Your hours are treated as fixed at what you entered — in practice they grow with volume.
            </p>
          </div>

          {/* The insight everyone misses */}
          <div className="border-l-2 border-brand-orange bg-brand-orange/5 rounded-r-2xl p-5 md:p-6">
            <strong className="text-brand-orange text-xs uppercase tracking-widest block mb-2">The kitchen everyone forgets</strong>
            {shiftMeals !== null ? (
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                After food, packaging, delivery and card fees, each {usd(inputs.pricePerMeal, true)} meal leaves
                you <strong className="text-white">{usd(r.contributionMargin, true)}</strong>. A single four-hour
                kitchen shift at $25 an hour costs $100 — so it takes{' '}
                <strong className="text-white">{shiftMeals} meals a week</strong> just to pay for the shift,
                before you’ve paid yourself a cent. Grocery-receipt pricing never shows you that number.
              </p>
            ) : (
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                At these numbers each meal leaves <strong className="text-red-400">{usd(r.contributionMargin, true)}</strong> after
                food, packaging, delivery and card fees — so not even a $100 four-hour kitchen shift ever gets paid for.
              </p>
            )}
          </div>

          {/* Metric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Two food benchmarks, two denominators: keep them side by side and say which is which. */}
            <div className="sm:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Food cost, measured two ways</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-3">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-slate-300">Food alone ÷ revenue</span>
                  <span className="text-3xl font-black tabular-nums leading-none text-white">{r.foodCostPct === null ? '—' : pct(r.foodCostPct)}</span>
                  {rangeChip(foodPos, BENCHMARKS.foodCost, tier && `${tier} band`)}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Food (with spoilage{sourcing === 'local' ? ' and the local premium' : ''}) against <strong className="text-slate-200">revenue</strong>:
                    what your books record, including any delivery fees you charge and net of discounts.
                    Budget 25–28%, standard 28–32%, premium or organic 35–40%.
                    {foodPos === 'below' && ' Low isn’t automatically good — check every ingredient is costed.'}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-5 sm:pt-0 sm:pl-6">
                  <span className="text-xs font-bold text-slate-300">Food + packaging ÷ menu price</span>
                  <span className="text-3xl font-black tabular-nums leading-none text-white">{r.foodPackagingPct === null ? '—' : pct(r.foodPackagingPct)}</span>
                  {rangeChip(foodPackPos, BENCHMARKS.foodPackaging)}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Food plus packaging against <strong className="text-slate-200">gross menu price</strong>: before
                    discounts, without delivery fees. This range comes from guidance for small operators with
                    simpler meals, so it’s the tighter target.
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 mt-5 pt-4">
                The ranges overlap at 28–30%, but a figure in that band doesn’t mean the same thing in both.
                This calculator doesn’t model delivery fees or discounts, so revenue and menu price are the
                same here — in your own books they usually aren’t. Check which denominator your figure uses
                before you compare it.
              </p>
            </div>

            <MetricCard
              label="Prime cost"
              value={r.primeCostPct === null ? '—' : pct(r.primeCostPct)}
              status={
                <StatusChip tone={primeTone}>
                  {r.primeCostPct === null ? 'Needs at least one meal a week'
                    : primeTone === 'good' ? `At or under the ${BENCHMARKS.primeCost.target}% target`
                    : primeTone === 'warn' ? `Under ${BENCHMARKS.primeCost.max}%, above the ${BENCHMARKS.primeCost.target}% target`
                    : `Over the ${BENCHMARKS.primeCost.max}% ceiling`}
                </StatusChip>
              }
            >
              Food plus labour (your pay at your target rate) over revenue. The usual guide is under 65%,
              aiming for 60%.
              {r.labourPct !== null && ` Labour alone is ${pct(r.labourPct)} here; 25–35% is typical.`}
            </MetricCard>

            <MetricCard
              label="Contribution per meal"
              value={usd(r.contributionMargin, true)}
              valueClass={r.contributionMargin > 0 ? 'text-white' : 'text-red-400'}
            >
              What each meal leaves toward the kitchen and your pay:
              <span className="block mt-2 tabular-nums text-slate-400">
                {usd(inputs.pricePerMeal, true)} price<br />
                − {usd(r.foodCostPerMeal, true)} food<br />
                − {usd(r.packagingPerMeal, true)} packaging<br />
                − {usd(r.deliveryPerMeal, true)} delivery<br />
                − {usd(r.processingPerMeal, true)} card processing
              </span>
            </MetricCard>

            <MetricCard
              label="Break-even volume"
              value={neverBreaksEven ? 'Never' : `${r.breakEvenMeals}/wk`}
              valueClass={neverBreaksEven ? 'text-red-400' : 'text-white'}
            >
              {neverBreaksEven
                ? 'Each meal loses money before fixed costs, so more volume makes it worse.'
                : `Meals a week to cover ${usd(r.kitchenCostWeekly)} of kitchen and ${usd(r.ownerPayWeekly)} of your pay each week. About ${Math.ceil(r.breakEvenMeals! / Math.max(1, inputs.mealsPerOrder || 1))} orders.`}
            </MetricCard>

            <MetricCard label="Monthly revenue" value={usd(r.monthlyRevenue)}>
              {meals} meals a week × {usd(inputs.pricePerMeal, true)} × 52 weeks ÷ 12.
              Average order value here is {usd(inputs.pricePerMeal * Math.max(1, inputs.mealsPerOrder || 1))};
              $35–60 is typical.
            </MetricCard>

            <MetricCard
              label="Monthly profit"
              className="sm:col-span-2"
              value={usd(r.monthlyProfit)}
              valueClass={r.monthlyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}
              status={r.netMarginPct !== null && (
                <StatusChip tone={r.netMarginPct >= BENCHMARKS.netMargin.low ? 'good' : r.netMarginPct >= 0 ? 'warn' : 'bad'}>
                  {pct(r.netMarginPct)} net margin · 10–20% is typical once established
                </StatusChip>
              )}
            >
              After every cost <em>and</em> paying yourself {usd(inputs.ownerHourlyTarget)}/hr.
              {r.ownerEffectiveHourly !== null && (
                <> Before paying yourself, the business leaves you {usd(r.ownerTakeHomeMonthly)} a month —
                  {' '}<strong className={r.ownerEffectiveHourly >= inputs.ownerHourlyTarget ? 'text-emerald-400' : 'text-red-400'}>
                    {usd(r.ownerEffectiveHourly, true)} an hour
                  </strong> for your {inputs.ownerHoursPerWeek} hours a week.</>
              )}
            </MetricCard>
          </div>

          {/* The COGS trap */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-7">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">The COGS trap</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2">Ingredients aren’t your cost of goods.</h2>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">
              In meal prep, cost of goods sold has to include packaging, delivery, labour and spoilage — not just
              what’s on the grocery receipt. Operators who leave them out routinely find their true COGS above 55%,
              and sometimes over 100% on individual meals.
            </p>
            {r.receiptCogsPct !== null && r.trueCogsPct !== null ? (
              <div className="mt-5 flex flex-col gap-4">
                {[
                  { label: 'What the receipt says (food + packaging)', value: r.receiptCogsPct, bar: 'bg-slate-500' },
                  { label: 'True COGS (+ spoilage, delivery, your labour)', value: r.trueCogsPct, bar: 'bg-[#EA580C]' },
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
                <p className="text-[11px] text-slate-500">White tick: {BENCHMARKS.trueCogsWarning}%.</p>
                {r.trueCogsPct > 100 ? (
                  <StatusChip tone="bad">At {meals} meals a week, each meal costs more to make, pack, deliver and staff than it sells for.</StatusChip>
                ) : r.trueCogsPct > BENCHMARKS.trueCogsWarning ? (
                  <StatusChip tone="warn">Your true COGS is above {BENCHMARKS.trueCogsWarning}% — the gap between the two bars is the money grocery-receipt pricing doesn’t see.</StatusChip>
                ) : (
                  <StatusChip tone="good">True COGS under {BENCHMARKS.trueCogsWarning}% with everything counted.</StatusChip>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-4">Enter a price and at least one meal a week to compare.</p>
            )}
          </div>

          {/* Email capture — after the numbers, never in front of them */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-7">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,95,31,0.8)]"></div>
              <h2 className="text-white font-bold text-lg">Want a copy of these numbers?</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              We’ll email you a summary of what you entered and what it works out to, so you can come back to it.
            </p>
            <MealPrepSummaryForm inputs={inputs} results={r} />
          </div>
        </div>
      </div>

      {/* --- Benchmarks --- */}
      <div className="mt-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-8">
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Benchmarks</span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Industry ranges, not rules.</h2>
        <p className="text-sm text-slate-400 leading-relaxed mt-3 max-w-3xl">
          These are ranges to measure your own numbers against. Treating “30% food cost” as a hard target
          without checking your own costs does more harm than not knowing the benchmark at all. A
          premium menu can run a higher food cost and still work; a budget menu at 25% can still lose
          money on delivery.
        </p>
        <div className="text-sm text-slate-400 leading-relaxed border-l-2 border-brand-orange bg-brand-orange/5 p-4 rounded-r-lg mt-6 max-w-3xl">
          <strong className="text-brand-orange text-xs uppercase tracking-widest block mb-1">Check the denominator</strong>
          The two food ranges below measure different things against different bases. 28–35% is food alone
          against revenue, which includes delivery fees and is net of discounts. 22–30% is food plus packaging
          against gross menu price, before discounts and without delivery fees. They overlap at 28–30%, but a
          number in that band doesn’t mean the same thing in both — so work out your own figure on the same
          base as the range you compare it to.
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 mt-8">
          {[
            ['Food cost', '28–35% of revenue: food alone, against revenue including delivery fees and net of discounts. Budget 25–28%, standard 28–32%, premium or organic 35–40%.'],
            ['Food + packaging', '22–30% of menu price: food plus packaging, against gross menu price before discounts and without delivery fees. Aimed at small operators with simpler meals, so it’s the tighter target.'],
            ['Labour', '25–35% of revenue.'],
            ['Prime cost (food + labour)', 'Under 65%, with 60% a common target.'],
            ['Net margin', '10–20% once established. Expect less in the first months.'],
            ['Average order value', '$35–60.'],
            ['Commissary kitchen', '$15–40 an hour or $300–1,200 a month; most small operators spend $400–800 a month all in.'],
            ['Delivery', '$5–8 per drop.'],
          ].map(([term, detail]) => (
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
          Running a meal-prep business already? We build ordering platforms around a weekly menu and cutoff.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-brand-orange/40 text-brand-orange font-black uppercase tracking-widest text-xs px-6 py-4 rounded-full hover:bg-brand-orange/10 hover:border-brand-orange transition-colors"
        >
          See the Case Studies &rarr;
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
              <strong className="text-red-400">No volume breaks even</strong>
            ) : (
              <>
                Break-even <strong className="text-white tabular-nums">{r.breakEvenMeals}/wk</strong>
                <span className="text-slate-500"> · </span>
                You <strong className={`tabular-nums ${pastBreakEven ? 'text-emerald-400' : 'text-red-400'}`}>{meals}/wk {pastBreakEven ? '✓' : '✕'}</strong>
              </>
            )}
            <span className="text-slate-500"> · </span>
            <span className="tabular-nums">{usd(r.contributionMargin, true)}/meal</span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange whitespace-nowrap">Results &darr;</span>
        </a>
      </div>
    </section>
  );
}
