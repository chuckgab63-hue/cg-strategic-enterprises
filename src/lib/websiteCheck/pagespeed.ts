// Google PageSpeed Insights for the Website Check. Google fetches the site
// itself, so this never touches the visitor's URL from our server. Real-user
// (field) numbers from the Chrome UX Report are used where Google has them;
// otherwise the lab numbers from this run. INP only exists as field data.

export type Strategy = 'mobile' | 'desktop';

export interface PageSpeedResult {
  strategy: Strategy;
  /** Lighthouse performance score, 0-100. */
  performance: number | null;
  /** Largest Contentful Paint, milliseconds. */
  lcpMs: number | null;
  /** Cumulative Layout Shift, unitless. */
  cls: number | null;
  /** Interaction to Next Paint, milliseconds. Field data only. */
  inpMs: number | null;
  /** 'field' when LCP/CLS/INP come from real Chrome users, 'lab' when from this test run. */
  metricsSource: 'field' | 'lab';
  opportunities: { id: string; title: string; savingsMs: number }[];
}

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
export const PSI_TIMEOUT_MS = 60_000;

const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);

// Audits that are metrics themselves, not things to fix.
const METRIC_AUDITS = new Set([
  'first-contentful-paint', 'largest-contentful-paint', 'speed-index', 'total-blocking-time',
  'cumulative-layout-shift', 'interactive', 'max-potential-fid', 'first-meaningful-paint',
]);

/** Pulls the numbers we report out of a PageSpeed Insights v5 response. */
export function parsePageSpeed(json: any, strategy: Strategy): PageSpeedResult {
  const lh = json?.lighthouseResult ?? {};
  const audits: Record<string, any> = lh.audits ?? {};
  const score = num(lh.categories?.performance?.score);

  const field = json?.loadingExperience?.metrics ?? {};
  const fieldLcp = num(field.LARGEST_CONTENTFUL_PAINT_MS?.percentile);
  const fieldCls = num(field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile);
  const fieldInp = num(field.INTERACTION_TO_NEXT_PAINT?.percentile);
  const hasField = fieldLcp !== null || fieldCls !== null;

  const labLcp = num(audits['largest-contentful-paint']?.numericValue);
  const labCls = num(audits['cumulative-layout-shift']?.numericValue);

  const opportunities = Object.entries(audits)
    .filter(([id, a]) => !METRIC_AUDITS.has(id) && a && typeof a.score === 'number' && a.score < 0.9)
    .map(([id, a]) => {
      const savings = num(a.details?.overallSavingsMs)
        ?? Object.values(a.metricSavings ?? {}).reduce<number>((s, v) => s + (num(v) ?? 0), 0);
      return { id, title: String(a.title ?? id), savingsMs: Math.round(savings) };
    })
    .filter(o => o.savingsMs > 0)
    .sort((a, b) => b.savingsMs - a.savingsMs)
    .slice(0, 3);

  return {
    strategy,
    performance: score === null ? null : Math.round(score * 100),
    lcpMs: hasField ? fieldLcp : labLcp === null ? null : Math.round(labLcp),
    // CrUX reports CLS multiplied by 100.
    cls: hasField ? (fieldCls === null ? null : fieldCls / 100) : labCls === null ? null : Math.round(labCls * 1000) / 1000,
    inpMs: fieldInp,
    metricsSource: hasField ? 'field' : 'lab',
    opportunities,
  };
}

/** Runs one PageSpeed test. Resolves to null if Google can't test the site in time. */
export async function runPageSpeed(url: string, strategy: Strategy, apiKey: string | undefined, fetchImpl: typeof fetch = fetch): Promise<PageSpeedResult | null> {
  const params = new URLSearchParams({ url, strategy, category: 'performance' });
  // Works without a key too, at a much lower quota (handy locally).
  if (apiKey) params.set('key', apiKey);
  try {
    const res = await fetchImpl(`${PSI_ENDPOINT}?${params}`, { signal: AbortSignal.timeout(PSI_TIMEOUT_MS) });
    if (!res.ok) {
      console.error(`PageSpeed ${strategy} failed with ${res.status}`);
      return null;
    }
    return parsePageSpeed(await res.json(), strategy);
  } catch (error) {
    console.error(`PageSpeed ${strategy} failed:`, (error as Error).message);
    return null;
  }
}
