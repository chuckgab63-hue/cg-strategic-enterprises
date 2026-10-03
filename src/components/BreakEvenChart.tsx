import { useId, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';

interface BreakEvenChartProps {
  contributionMargin: number;
  kitchenCostWeekly: number;
  ownerPayWeekly: number;
  mealsPerWeek: number;
  breakEvenKitchenOnly: number | null;
  breakEvenMeals: number | null;
}

// One data series (what your meals bring in toward fixed costs) against two
// neutral reference lines (the kitchen, and the kitchen plus your pay).
// Drawn in pixel space at the container's real width so labels stay legible
// on a phone instead of shrinking with a scaled viewBox.
const SERIES = '#EA580C'; // orange-600: brand hue, inside the dark-mode lightness band
const GOOD = '#34d399';
const BAD = '#f87171';
const PAD = { top: 28, right: 16, bottom: 40, left: 52 };
// A surface-coloured outline behind in-plot labels keeps them legible where they cross a line.
const HALO = { stroke: '#0b1221', strokeWidth: 4, strokeLinejoin: 'round', paintOrder: 'stroke' } as const;

const usd = (n: number) => `${n < 0 ? '−' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;

function niceCeil(n: number) {
  if (n <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(n));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(s => s * magnitude >= n)!;
  return step * magnitude;
}

// Four evenly spaced ticks on round numbers, covering at least `n`.
const TICKS = 4;
const niceAxisMax = (n: number) => niceCeil(n / TICKS) * TICKS;

export default function BreakEvenChart({
  contributionMargin: cm, kitchenCostWeekly, ownerPayWeekly, mealsPerWeek,
  breakEvenKitchenOnly, breakEvenMeals,
}: BreakEvenChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [hoverMeals, setHoverMeals] = useState<number | null>(null);
  const tableId = useId();

  // Measure before first paint so a phone never sees the 600px fallback, then follow resizes.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = (w: number) => setWidth(Math.max(240, Math.floor(w)));
    measure(el.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const height = Math.round(Math.min(340, Math.max(240, width * 0.55)));
  const fixedTotal = kitchenCostWeekly + ownerPayWeekly;
  const showOwnerLine = ownerPayWeekly > 0;

  const xMax = niceAxisMax(Math.max(mealsPerWeek, breakEvenMeals ?? 0, 20) * 1.15);
  const yTop = niceAxisMax(Math.max(cm * xMax, fixedTotal, 1) * 1.05);
  const yBottom = cm < 0 ? -niceAxisMax(-cm * xMax) : 0;

  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const x = (meals: number) => PAD.left + (meals / xMax) * plotW;
  const y = (dollars: number) => PAD.top + ((yTop - dollars) / (yTop - yBottom)) * plotH;

  // Threshold values are labelled on the y-axis itself (the key names the lines),
  // so drop any regular tick label that would sit on top of one.
  const thresholds = showOwnerLine ? [kitchenCostWeekly, fixedTotal] : [fixedTotal];
  const yTicks = [yBottom, 0, ...[0.25, 0.5, 0.75, 1].map(f => yTop * f)].filter((v, i, a) => a.indexOf(v) === i);
  const yTickLabelled = (v: number) => thresholds.every(t => Math.abs(y(v) - y(t)) > 14);
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map(f => xMax * f);

  const covered = cm * mealsPerWeek;
  const ahead = covered >= fixedTotal;

  const crossings = [
    showOwnerLine && breakEvenKitchenOnly !== null && breakEvenKitchenOnly <= xMax
      ? { meals: breakEvenKitchenOnly, level: kitchenCostWeekly, label: `${breakEvenKitchenOnly} covers the kitchen` }
      : null,
    breakEvenMeals !== null && breakEvenMeals <= xMax
      ? { meals: breakEvenMeals, level: fixedTotal, label: `${breakEvenMeals} = break-even` }
      : null,
  ].filter(c => c !== null);

  const handlePointer = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const meals = Math.round(((e.clientX - rect.left - PAD.left) / plotW) * xMax);
    setHoverMeals(meals >= 0 && meals <= xMax ? meals : null);
  };

  const hover = hoverMeals === null ? null : (() => {
    const value = cm * hoverMeals;
    const gap = value - fixedTotal;
    return { meals: hoverMeals, value, gap };
  })();

  const summary = breakEvenMeals === null
    ? `Each meal loses ${usd(-cm)} before fixed costs, so no weekly volume covers the ${usd(fixedTotal)} of weekly fixed costs.`
    : `Weekly contribution rises by $${cm.toFixed(2)} a meal. It covers the ${usd(fixedTotal)} of weekly fixed costs at ${breakEvenMeals} meals a week. You entered ${mealsPerWeek}.`;

  // Five volumes worth reading as a table: zero, each break-even, yours, and the chart's edge.
  const tableRows = [...new Set([0, breakEvenKitchenOnly, breakEvenMeals, mealsPerWeek, xMax]
    .filter((m): m is number => m !== null))].sort((a, b) => a - b);

  return (
    <div ref={containerRef} className="w-full min-w-0 overflow-hidden">
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3 text-[11px] text-slate-300" aria-hidden="true">
        <span className="flex items-center gap-2"><span className="w-5 h-0.5 rounded-full" style={{ background: SERIES }} />What your meals cover</span>
        <span className="flex items-center gap-2"><span className="w-5 border-t-2 border-dashed border-slate-300" />{showOwnerLine ? 'Kitchen + your pay' : 'Kitchen'} {usd(fixedTotal)}/wk</span>
        {showOwnerLine && <span className="flex items-center gap-2"><span className="w-5 border-t-2 border-dashed border-slate-500" />Kitchen alone {usd(kitchenCostWeekly)}/wk</span>}
      </div>
      <svg
        width={width} height={height}
        role="img" aria-label={summary} aria-describedby={tableId}
        className="block touch-pan-y select-none"
        onPointerMove={handlePointer} onPointerDown={handlePointer}
        onPointerLeave={() => setHoverMeals(null)}
      >
        {/* Recessive grid and axes */}
        {yTicks.map(v => (
          <g key={`y${v}`}>
            <line x1={PAD.left} x2={width - PAD.right} y1={y(v)} y2={y(v)} stroke={v === 0 ? '#475569' : '#1e293b'} strokeWidth={1} />
            {yTickLabelled(v) && <text x={PAD.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={11} fill="#64748b">{usd(v)}</text>}
          </g>
        ))}
        {xTicks.map(m => (
          <text key={`x${m}`} x={x(m)} y={height - PAD.bottom + 18} textAnchor="middle" fontSize={11} fill="#94a3b8">{m}</text>
        ))}
        <text x={PAD.left + plotW / 2} y={height - 6} textAnchor="middle" fontSize={11} fill="#64748b">Meals sold per week</text>

        {/* Reference lines: fixed weekly costs */}
        {showOwnerLine && (
          <g>
            <line x1={PAD.left} x2={width - PAD.right} y1={y(kitchenCostWeekly)} y2={y(kitchenCostWeekly)} stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" />
            <text x={PAD.left - 8} y={y(kitchenCostWeekly)} dy="0.32em" textAnchor="end" fontSize={11} fontWeight={600} fill="#94a3b8">{usd(kitchenCostWeekly)}</text>
          </g>
        )}
        <line x1={PAD.left} x2={width - PAD.right} y1={y(fixedTotal)} y2={y(fixedTotal)} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={PAD.left - 8} y={y(fixedTotal)} dy="0.32em" textAnchor="end" fontSize={11} fontWeight={700} fill="#f1f5f9">{usd(fixedTotal)}</text>

        {/* The series: what your meals bring in toward fixed costs */}
        <line x1={x(0)} y1={y(0)} x2={x(xMax)} y2={y(cm * xMax)} stroke={SERIES} strokeWidth={2.5} strokeLinecap="round" />

        {/* Break-even crossings */}
        {/* Labels sit below-right of each dot, which a rising line never crosses;
            too near the right edge they flip to below-left. */}
        {crossings.map(c => {
          const nearRight = width - PAD.right - x(c.meals) < 130;
          return (
            <g key={c.label}>
              <line x1={x(c.meals)} x2={x(c.meals)} y1={y(c.level)} y2={y(0)} stroke="#475569" strokeWidth={1} strokeDasharray="2 3" />
              <circle cx={x(c.meals)} cy={y(c.level)} r={5} fill="#0f172a" stroke="#e2e8f0" strokeWidth={2} />
              <text
                x={x(c.meals) + (nearRight ? -9 : 9)} y={y(c.level) + 17}
                textAnchor={nearRight ? 'end' : 'start'}
                fontSize={11} fill="#cbd5e1" {...HALO}
              >
                {c.label}
              </text>
            </g>
          );
        })}

        {/* You are here */}
        <line x1={x(mealsPerWeek)} x2={x(mealsPerWeek)} y1={PAD.top - 6} y2={y(yBottom)} stroke={ahead ? GOOD : BAD} strokeWidth={1.5} />
        <circle cx={x(mealsPerWeek)} cy={y(covered)} r={6} fill={ahead ? GOOD : BAD} stroke="#0f172a" strokeWidth={2} />
        <text
          x={x(mealsPerWeek)} y={PAD.top - 12}
          textAnchor={x(mealsPerWeek) < width * 0.2 ? 'start' : x(mealsPerWeek) > width * 0.8 ? 'end' : 'middle'}
          fontSize={11} fontWeight={700} fill={ahead ? GOOD : BAD} {...HALO}
        >
          You: {mealsPerWeek}/wk {ahead ? '✓' : '✕'}
        </text>

        {/* Hover crosshair */}
        {hover && (
          <g pointerEvents="none">
            <line x1={x(hover.meals)} x2={x(hover.meals)} y1={PAD.top} y2={y(yBottom)} stroke="#94a3b8" strokeWidth={1} />
            <circle cx={x(hover.meals)} cy={y(hover.value)} r={4} fill={SERIES} stroke="#0f172a" strokeWidth={2} />
          </g>
        )}
        {/* Transparent hit area over the plot */}
        <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} fill="transparent" />
      </svg>

      <p aria-live="polite" className="min-h-[2.5rem] text-xs text-slate-400 leading-relaxed mt-1">
        {hover ? (
          <>
            At <strong className="text-white">{hover.meals} meals</strong>, meals cover {usd(hover.value)} of {usd(fixedTotal)} a week —{' '}
            <strong className={hover.gap >= 0 ? 'text-emerald-400' : 'text-red-400'}>
              {hover.gap >= 0 ? `${usd(hover.gap)} ahead` : `${usd(-hover.gap)} short`}
            </strong>.
          </>
        ) : (
          'Hover or drag across the chart to see any volume.'
        )}
      </p>

      <details className="mt-2 text-xs text-slate-400">
        <summary className="cursor-pointer font-bold uppercase tracking-widest text-[10px] text-slate-500 hover:text-slate-300">Show as a table</summary>
        <table id={tableId} className="mt-3 w-full text-left tabular-nums">
          <thead>
            <tr className="text-slate-500 border-b border-slate-800">
              <th className="py-1.5 font-semibold">Meals/wk</th>
              <th className="py-1.5 font-semibold">Meals cover</th>
              <th className="py-1.5 font-semibold">Fixed costs</th>
              <th className="py-1.5 font-semibold">Ahead / short</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(m => (
              <tr key={m} className="border-b border-slate-800/60">
                <td className="py-1.5 text-slate-200">{m}{m === mealsPerWeek ? ' (you)' : ''}</td>
                <td className="py-1.5">{usd(cm * m)}</td>
                <td className="py-1.5">{usd(fixedTotal)}</td>
                <td className="py-1.5">{usd(cm * m - fixedTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
