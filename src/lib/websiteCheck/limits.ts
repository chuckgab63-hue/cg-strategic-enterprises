// Rate limit, cache and bot check for the Website Check.
//
// The rate limit and cache are in memory. Vercel's Fluid Compute reuses warm
// function instances, so they hold for most traffic, but a cold start or a
// second instance starts empty: treat them as best effort. To make them strict,
// put a shared store (e.g. Upstash Redis) behind the same two interfaces.

export interface RateLimiter {
  /** Counts a hit. ok:false once the key has used its limit in the window. */
  take(key: string, now?: number): { ok: true } | { ok: false; retryAfterSec: number };
}

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    take(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return { ok: false, retryAfterSec: Math.ceil((recent[0] + windowMs - now) / 1000) };
      }
      recent.push(now);
      hits.set(key, recent);
      // Drop idle keys now and then so the map can't grow forever.
      if (hits.size > 5000) {
        for (const [k, times] of hits) if (times.every(t => now - t >= windowMs)) hits.delete(k);
      }
      return { ok: true };
    },
  };
}

export interface TtlCache<T> {
  get(key: string, now?: number): T | undefined;
  set(key: string, value: T, now?: number): void;
}

export function createTtlCache<T>(ttlMs: number, maxEntries = 500): TtlCache<T> {
  const entries = new Map<string, { value: T; expires: number }>();
  return {
    get(key, now = Date.now()) {
      const entry = entries.get(key);
      if (!entry) return undefined;
      if (entry.expires <= now) {
        entries.delete(key);
        return undefined;
      }
      return entry.value;
    },
    set(key, value, now = Date.now()) {
      entries.delete(key);
      entries.set(key, { value, expires: now + ttlMs });
      // Maps keep insertion order, so the first key is the oldest.
      while (entries.size > maxEntries) entries.delete(entries.keys().next().value!);
    },
  };
}

/** The visitor's IP as Vercel reports it. */
export function clientIp(headers: Record<string, string | string[] | undefined>): string {
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.split(',')[0]?.trim();
  return first(headers['x-real-ip']) || first(headers['x-forwarded-for']) || 'unknown';
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Cloudflare Turnstile check. Skipped (true) when TURNSTILE_SECRET_KEY isn't
 * set, so the page works before the keys exist; the honeypot and rate limit
 * still apply then.
 */
export async function verifyTurnstile(token: string, ip: string, secret: string | undefined, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, ...(ip !== 'unknown' && { remoteip: ip }) }),
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json() as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verify failed:', (error as Error).message);
    return false;
  }
}
