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
// Two of these run in parallel; api/website-check.ts budgets its 60 s maxDuration around it.
export const PSI_TIMEOUT_MS = 45_000;

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

export interface PageSpeedRun {
  result: PageSpeedResult | null;
  /** Why result is null: Google's HTTP status (null if no response) and error code. Never includes the URL or key. */
  error: { status: number | null; code: string } | null;
}

/**
 * Runs one PageSpeed test. Never throws: if Google can't test the site in
 * time, result is null and error says why. `signal` cancels it early.
 */
export async function runPageSpeed(
  url: string, strategy: Strategy, apiKey: string | undefined,
  opts: { signal?: AbortSignal; timeoutMs?: number; fetchImpl?: typeof fetch } = {},
): Promise<PageSpeedRun> {
  const params = new URLSearchParams({ url, strategy, category: 'performance' });
  // Works without a key too, at a much lower quota (handy locally).
  if (apiKey) params.set('key', apiKey);
  const timeout = AbortSignal.timeout(opts.timeoutMs ?? PSI_TIMEOUT_MS);
  const signal = opts.signal ? AbortSignal.any([timeout, opts.signal]) : timeout;
  try {
    const res = await (opts.fetchImpl ?? fetch)(`${PSI_ENDPOINT}?${params}`, { signal });
    if (!res.ok) {
      // Google's error body: { error: { status: 'RESOURCE_EXHAUSTED', errors: [{ reason }] } }
      const body = await res.json().catch(() => null) as { error?: { status?: string; errors?: { reason?: string }[] } } | null;
      const code = body?.error?.status || body?.error?.errors?.[0]?.reason || 'http_error';
      return { result: null, error: { status: res.status, code } };
    }
    return { result: parsePageSpeed(await res.json(), strategy), error: null };
  } catch {
    const code = timeout.aborted ? 'timeout' : opts.signal?.aborted ? 'cancelled' : 'network_error';
    return { result: null, error: { status: null, code } };
  }
}
