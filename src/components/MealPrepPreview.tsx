import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { calculate, DEFAULT_INPUTS, PROCESSING_RATE, PROCESSING_FEE_PER_ORDER } from '../lib/mealPrepModel';

// A live slice of /meal-prep-calculator for the home page: price and weekly
// volume are the visitor's, everything else is held at the full tool's defaults.
// Price moves the break-even; volume only says how far the visitor is from it.

const MEALS_SLIDER_MAX = 300;
const D = DEFAULT_INPUTS;

const usd = (n: number, cents = false) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;
const money = (n: number) => usd(n, !Number.isInteger(n));

// Built from DEFAULT_INPUTS so the disclosure can never drift from the maths.
const ASSUMPTIONS = [
  `${money(D.foodCostPerMeal)} food at ${D.sourcing === 'local' ? 'local' : 'distributor'} prices and ${money(D.packagingPerMeal)} packaging per meal`,
  `${D.spoilagePct}% spoilage`,
  `a ${money(D.kitchenCostMonthly)}/month kitchen`,
  `${D.deliverySharePct}% of orders delivered at ${money(D.deliveryCostPerDrop)} a drop`,
  `${D.mealsPerOrder} meals an order`,
  `${D.ownerHoursPerWeek} hours a week of your time at ${money(D.ownerHourlyTarget)}/hr`,
  // Rounded: 0.029 * 100 is 2.9000000000000004 in floating point.
  `${Math.round(PROCESSING_RATE * 1000) / 10}% + ${Math.round(PROCESSING_FEE_PER_ORDER * 100)}¢ card fees`,
];

type Tone = 'good' | 'warn' | 'bad';
const TONE_STYLES: Record<Tone, { chip: string; icon: string }> = {
  good: { chip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', icon: 'M5 13l4 4L19 7' },
  warn: { chip: 'bg-amber-500/10 border-amber-500/30 text-amber-300', icon: 'M12 9v4m0 4h.01' },
  bad: { chip: 'bg-red-500/10 border-red-500/30 text-red-300', icon: 'M6 18L18 6M6 6l12 12' },
};

function Field({ label, prefix, suffix, step, value, onChange }: {
  label: string; prefix?: string; suffix?: string; step: number; value: string; onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label htmlFor={id} className="text-sm font-bold text-slate-200">{label}</label>
      <div className="flex items-center bg-slate-950 border border-slate-700 focus-within:border-brand-orange rounded-xl transition-colors">
        {prefix && <span className="pl-4 text-slate-500 text-base" aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="number" inputMode="decimal" min={0} step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full min-w-0 bg-transparent focus:outline-none py-3 text-white text-lg font-bold tabular-nums ${prefix ? 'pl-1.5' : 'pl-4'} pr-3`}
        />
        {suffix && <span className="pr-4 text-slate-500 text-xs whitespace-nowrap" aria-hidden="true">{suffix}</span>}
      </div>
    </div>
  );
}

export default function MealPrepPreview() {
  const [price, setPrice] = useState(String(D.pricePerMeal));
  const [meals, setMeals] = useState(String(D.mealsPerWeek));

  const priceNum = Number(price) || 0;
  const mealsNum = Math.max(0, Number(meals) || 0);
  const r = useMemo(
    () => calculate({ ...D, pricePerMeal: priceNum, mealsPerWeek: mealsNum }),
    [priceNum, mealsNum],
  );

  const breakEven = r.breakEvenMeals;
  const tone: Tone | null = breakEven === null ? null
    : mealsNum >= breakEven ? 'good'
    : r.breakEvenKitchenOnly !== null && mealsNum >= r.breakEvenKitchenOnly ? 'warn' : 'bad';

  // Carry the visitor's numbers through so the full tool opens where they left off.
  const edited = price !== String(D.pricePerMeal) || meals !== String(D.mealsPerWeek);
  const href = edited
    ? `/meal-prep-calculator?${new URLSearchParams({ price: String(priceNum), meals: String(mealsNum) })}`
    : '/meal-prep-calculator';

  // Beside the inputs on desktop; under the result on phones, so the number stays
  // right below the fields being typed into.
  const assumptionsNote = (
    <p className="text-[11px] text-slate-500 leading-relaxed">
      <strong className="text-slate-300">Two inputs, ten assumptions.</strong> Everything else is held at
      the full calculator’s starting plan: {ASSUMPTIONS.join(', ')}. Your real costs will move this number.
    </p>
  );

  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <section className="relative z-10 w-full border-t border-slate-900 bg-slate-950 py-24 overflow-hidden text-left">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-12">
        <header className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Real logic. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Your numbers.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Running a meal-prep business? This is our planning calculator, cut down to two inputs.
            Put in your price and your weekly orders and see how many meals it takes to cover the kitchen and pay yourself.
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Inputs */}
            <div className="lg:col-span-2 p-5 sm:p-8 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r border-slate-800">
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange">Meal-Prep Planning Calculator</span>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Field label="Price per meal" prefix="$" step={0.25} value={price} onChange={setPrice} />
                <Field label="Meals per week" suffix="meals" step={1} value={meals} onChange={setMeals} />
              </div>
              <input
                type="range" min={0} max={MEALS_SLIDER_MAX} step={1}
                aria-label="Meals per week slider"
                value={Math.min(mealsNum, MEALS_SLIDER_MAX)}
                onChange={(e) => setMeals(e.target.value)}
                className="w-full accent-brand-orange cursor-pointer"
              />
              <div className="hidden lg:block">{assumptionsNote}</div>
            </div>

            {/* Result */}
            <div className="lg:col-span-3 p-5 sm:p-8 flex flex-col gap-5" aria-live="polite">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Break-even volume</span>
              {breakEven === null ? (
                <div>
                  <p className="text-3xl md:text-4xl font-black text-red-400 leading-tight">No volume breaks even.</p>
                  <p className="text-sm text-slate-300 leading-relaxed mt-3">
                    At {usd(priceNum, true)}, each meal costs {usd(r.variableCostPerMeal, true)} to make, pack, deliver
                    and charge for. Selling more only loses more.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="leading-none">
                    <span className="text-6xl md:text-7xl font-black text-white tabular-nums">{breakEven}</span>
                    <span className="text-lg md:text-xl font-bold text-slate-400 ml-3">meals a week</span>
                  </p>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-4">
                    to cover the kitchen <em>and</em> pay yourself. Each {usd(priceNum, true)} meal leaves{' '}
                    <strong className="text-white">{usd(r.contributionMargin, true)}</strong> after food, packaging,
                    delivery and card fees.
                  </p>
                  {tone && (
                    <span className={`inline-flex items-start gap-1.5 border rounded-lg px-2.5 py-1.5 mt-4 text-xs font-semibold leading-snug ${TONE_STYLES[tone].chip}`}>
                      <svg className="w-3.5 h-3.5 mt-px shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={TONE_STYLES[tone].icon} />
                      </svg>
                      <span>
                        {tone === 'good' ? `At ${mealsNum} meals a week you’re past break-even by ${mealsNum - breakEven}.`
                          : tone === 'warn' ? `At ${mealsNum} meals a week the kitchen’s covered, but you’re ${breakEven - mealsNum} short of paying yourself.`
                          : `At ${mealsNum} meals a week you’re ${breakEven - mealsNum} short of break-even.`}
                      </span>
                    </span>
                  )}
                </div>
              )}

              <div className="lg:hidden">{assumptionsNote}</div>

              <div className="mt-auto pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  to={href}
                  className="group inline-flex items-center justify-center gap-3 bg-brand-orange text-white px-6 py-3.5 rounded-md font-bold tracking-wide hover:opacity-90 transition-all shadow-md hover:scale-105 shrink-0"
                >
                  Run it with your real costs
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All twelve inputs, food-cost and prime-cost benchmarks, and a break-even chart. Free, no sign-up
                  {edited ? ' — your two numbers come with you.' : '.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
