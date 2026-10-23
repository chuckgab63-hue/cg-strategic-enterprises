import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MissedCallEmailForm from '../components/MissedCallEmailForm';
import { OPEN_LETS_TALK_EVENT } from '../components/LetsTalkChooser';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import { localizePath } from '../i18n/lang';
import calculatorDict from '../i18n/missedCallCalculator';
import { trackEvent } from '../lib/analytics';
import { calculateMissedCalls, type MissedCallInputs } from '../lib/missedCall/model';
import { formatCount, formatMoney, formatPct } from '../lib/missedCall/format';
import { buildMissedCallSearch, missedCallCalculatorUrl, NUMERIC_PARAMS, parseMissedCallParams } from '../lib/missedCall/url';
import { MISSED_CALL_CALCULATOR_SOURCE } from '../lib/missedCall/submission';

type NumericField = Exclude<keyof MissedCallInputs, 'recurring'>;
type Kind = 'count' | 'pct' | 'money';

interface FieldSpec {
  key: NumericField;
  kind: Kind;
  /** The slider covers the usual range; the number field accepts up to the URL bound. */
  sliderMax: number;
  step: number;
}

// Labels and units live in src/i18n/missedCallCalculator.ts.
const MAIN_FIELDS: FieldSpec[] = [
  { key: 'callsPerWeek', kind: 'count', sliderMax: 300, step: 1 },
  { key: 'missedPct', kind: 'pct', sliderMax: 100, step: 1 },
  { key: 'noCallbackPct', kind: 'pct', sliderMax: 100, step: 1 },
  { key: 'conversionPct', kind: 'pct', sliderMax: 100, step: 1 },
  { key: 'customerValue', kind: 'money', sliderMax: 5000, step: 10 },
];
const RECURRING_FIELDS: FieldSpec[] = [
  { key: 'visitsPerYear', kind: 'count', sliderMax: 52, step: 1 },
  { key: 'yearsRetained', kind: 'count', sliderMax: 20, step: 1 },
];
const FIELD_MAX = Object.fromEntries(NUMERIC_PARAMS.map(p => [p.key, p.max])) as Record<NumericField, number>;

/** A number field and a slider for one input, both labelled, kept in step. */
function SliderField({ spec, value, onChange }: { spec: FieldSpec; value: string; onChange: (v: string) => void }) {
  const lang = useLang();
  const text = useT(calculatorDict).fields[spec.key];
  const id = useId();
  const labelId = useId();
  const hintId = useId();
  const n = value === '' ? 0 : Number(value);
  const spoken = spec.kind === 'pct' ? formatPct(n, lang)
    : spec.kind === 'money' ? formatMoney(n, lang)
    : `${formatCount(n, lang)} ${text.unit}`;
  const max = FIELD_MAX[spec.key];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label id={labelId} htmlFor={id} className="text-sm font-bold text-slate-200">{text.label}</label>
        <div className="flex items-center shrink-0 w-32 bg-slate-950 border border-slate-700 focus-within:border-brand-orange rounded-xl transition-colors">
          {spec.kind === 'money' && <span className="pl-3 text-slate-500 text-base sm:text-sm" aria-hidden="true">$</span>}
          <input
            id={id}
            type="number" inputMode="decimal" min={0} max={max} step={spec.step}
            aria-describedby={text.hint ? hintId : undefined}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full min-w-0 bg-transparent focus:outline-none py-2.5 text-white text-base sm:text-sm tabular-nums text-right ${spec.kind === 'money' ? 'pl-1' : 'pl-3'} ${spec.kind === 'pct' ? 'pr-1' : 'pr-3'}`}
          />
          {spec.kind === 'pct' && <span className="pr-3 text-slate-500 text-sm" aria-hidden="true">%</span>}
        </div>
      </div>
      <input
        type="range" min={0} max={spec.sliderMax} step={spec.step}
        aria-labelledby={labelId}
        aria-valuetext={spoken}
        value={Math.min(n || 0, spec.sliderMax)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-brand-orange cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange rounded"
      />
      {text.hint && <p id={hintId} className="text-[11px] text-slate-500 leading-relaxed">{text.hint}</p>}
    </div>
  );
}

const toValues = (inputs: MissedCallInputs) =>
  Object.fromEntries([...MAIN_FIELDS, ...RECURRING_FIELDS].map(f => [f.key, String(inputs[f.key])])) as Record<NumericField, string>;

export default function MissedCallCalculator() {
  const t = useT(calculatorDict);
  const lang = useLang();
  const lp = useLocalePath();
  const recurringId = useId();
  const recurringHintId = useId();

  // Inputs live in the query string (numbers only) so an estimate can be shared
  // or bookmarked. Anything missing or unusable keeps its example value.
  const [searchParams, setSearchParams] = useSearchParams();
  const [seed] = useState(() => parseMissedCallParams(searchParams));
  const [values, setValues] = useState(() => toValues(seed));
  const [recurring, setRecurring] = useState(seed.recurring);

  const inputs: MissedCallInputs = useMemo(() => {
    const parsed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v === '' ? 0 : Number(v)]),
    ) as Record<NumericField, number>;
    return { ...parsed, recurring };
  }, [values, recurring]);
  const r = useMemo(() => calculateMissedCalls(inputs), [inputs]);

  // Keep the URL in step without adding a history entry per slider tick.
  const search = buildMissedCallSearch(inputs);
  useEffect(() => {
    if (search !== searchParams.toString()) setSearchParams(search, { replace: true, preventScrollReset: true });
  }, [search, searchParams, setSearchParams]);

  // calculator_used: once per visit, on the first change. No values are sent.
  const tracked = useRef(false);
  const touch = () => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent('calculator_used', lang);
  };
  const setField = (key: NumericField, v: string) => { touch(); setValues(prev => ({ ...prev, [key]: v })); };

  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyLink = async () => {
    const url = missedCallCalculatorUrl(inputs, window.location.origin + localizePath('/', lang).replace(/\/$/, ''));
    try {
      await navigator.clipboard.writeText(url);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 2500);
  };

  const money = (n: number) => formatMoney(n, lang);
  const count = (n: number) => formatCount(n, lang);
  const pct = (n: number) => formatPct(n, lang);
  const steps = [
    t.steps.missed(count(inputs.callsPerWeek), pct(inputs.missedPct), count(r.missedPerWeek)),
    t.steps.lostCallers(count(r.missedPerWeek), pct(inputs.noCallbackPct), count(r.lostCallersPerWeek)),
    t.steps.lostCustomers(count(r.lostCallersPerWeek), pct(inputs.conversionPct), count(r.lostCustomersPerMonth)),
    ...(recurring ? [t.steps.valuePerCustomer(money(inputs.customerValue), count(inputs.visitsPerYear), count(inputs.yearsRetained), money(r.valuePerCustomer))] : []),
    t.steps.perMonth(count(r.lostCustomersPerMonth), money(r.valuePerCustomer), money(r.lostRevenuePerMonth)),
    t.steps.perYear(money(r.lostRevenuePerMonth), money(r.lostRevenuePerYear)),
  ];

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="max-w-[1392px] mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-24 text-left">
      <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full mb-5">
        {t.badge}
      </span>
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">{t.title}</h1>
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mt-5 max-w-3xl">{t.intro}</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
        {/* --- Inputs --- */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-3xl p-5 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-bold text-xl">{t.inputsHeading}</h2>
            <p className="text-xs font-semibold text-amber-300">{t.exampleNote}</p>
          </div>
          {MAIN_FIELDS.map(spec => (
            <SliderField key={spec.key} spec={spec} value={values[spec.key]} onChange={v => setField(spec.key, v)} />
          ))}

          <div className="border-t border-slate-800 pt-6 flex flex-col gap-6">
            <label htmlFor={recurringId} className="flex items-start gap-3 cursor-pointer">
              <input
                id={recurringId}
                type="checkbox" role="switch"
                aria-describedby={recurringHintId}
                checked={recurring}
                onChange={(e) => { touch(); setRecurring(e.target.checked); }}
                className="mt-0.5 w-5 h-5 shrink-0 accent-brand-orange cursor-pointer"
              />
              <span className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-200">{t.recurringLabel}</span>
                <span id={recurringHintId} className="text-[11px] text-slate-500 leading-relaxed">{t.recurringHint}</span>
              </span>
            </label>
            {recurring && RECURRING_FIELDS.map(spec => (
              <SliderField key={spec.key} spec={spec} value={values[spec.key]} onChange={v => setField(spec.key, v)} />
            ))}
          </div>
        </div>

        {/* --- Results --- */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
          <div className="bg-[#020617]/80 border border-brand-orange/40 rounded-3xl p-5 sm:p-8 flex flex-col gap-5 shadow-[0_0_30px_rgba(255,95,31,0.08)]">
            <h2 className="text-white font-bold text-xl">{t.resultsHeading}</h2>
            <div aria-live="polite" className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400">{t.headlineLabel}</span>
              {/* Fixed line height and tabular digits so the number can change without moving anything. */}
              <span className="text-5xl sm:text-6xl font-black text-brand-orange tabular-nums leading-none break-all">
                {money(r.lostRevenuePerMonth)}
              </span>
              <span className="text-sm font-semibold text-slate-300 tabular-nums">{t.perYear(money(r.lostRevenuePerYear))}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{t.estimateNote}</p>

            <div className="flex flex-col gap-3 border-t border-slate-800 pt-5">
              <h3 className="text-sm font-bold text-slate-200">{t.breakdownHeading}</h3>
              <dl className="flex flex-col gap-3">
                {steps.map(step => (
                  <div key={step.label} className="flex items-start justify-between gap-4">
                    <dt className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm text-slate-300">{step.label}</span>
                      <span className="text-[11px] text-slate-500 tabular-nums break-words">{step.working}</span>
                    </dt>
                    <dd className="text-sm font-bold text-white tabular-nums whitespace-nowrap">{step.result}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="text-sm text-slate-300 leading-relaxed border-l-2 border-brand-orange bg-brand-orange/5 p-4 rounded-r-lg flex flex-col gap-1">
              <strong className="text-white">{t.recoverHeading}</strong>
              <span>{t.recover}</span>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_LETS_TALK_EVENT))}
                className="bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] cursor-pointer"
              >
                {t.ctaAlex}
              </button>
              <Link
                to={lp(`/contact?source=${MISSED_CALL_CALCULATOR_SOURCE}`)}
                className="text-center border border-slate-600 text-slate-200 px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {t.ctaPilot}
              </Link>
              <Link
                to={lp('/website-check')}
                className="text-center text-xs font-bold tracking-widest uppercase text-slate-300 underline underline-offset-4 hover:text-brand-orange transition-colors py-2"
              >
                {t.ctaWebsiteCheck}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- Share + email --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-3xl p-5 sm:p-8 flex flex-col gap-4">
          <h2 className="text-white font-bold text-xl">{t.shareHeading}</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{t.shareNote}</p>
          <button
            type="button"
            onClick={copyLink}
            className="self-start border border-slate-600 text-slate-200 px-5 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer min-w-40"
          >
            <span aria-live="polite">
              {copyState === 'copied' ? t.copied : copyState === 'failed' ? t.copyFailed : t.copyLink}
            </span>
          </button>
        </div>
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-3xl p-5 sm:p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-bold text-xl">{t.form.heading}</h2>
            <p className="text-sm text-slate-400">{t.form.intro}</p>
          </div>
          <MissedCallEmailForm inputs={inputs} />
        </div>
      </div>
    </section>
  );
}
