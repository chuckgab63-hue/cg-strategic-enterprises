// URL handling for the free Website Check (api/website-check.ts). The visitor
// types any URL and our server fetches it, so this is the SSRF fence: only
// http(s) on ports 80/443, only public hostnames, every DNS answer must be a
// public address, and every redirect hop is checked again. The network calls
// are passed in (api/_lib/nodeFetch.ts in production, fakes in tests) so this
// file stays plain TypeScript.
//
// Imports carry .js extensions because the Vercel function runs this as native
// ESM, which doesn't resolve extensionless paths.

export type CheckErrorCode =
  | 'invalid_url' | 'blocked_url' | 'unreachable' | 'timeout' | 'too_many_redirects' | 'not_html';

export class WebsiteCheckError extends Error {
  readonly code: CheckErrorCode;
  /** The site's own HTTP status, when it answered with an error. */
  readonly upstreamStatus: number | null;
  constructor(code: CheckErrorCode, message: string = code, upstreamStatus: number | null = null) {
    super(message);
    this.code = code;
    this.upstreamStatus = upstreamStatus;
  }
}

export const FETCH_TIMEOUT_MS = 10_000;
export const MAX_HTML_BYTES = 2 * 1024 * 1024;
export const MAX_REDIRECTS = 5;

// Names that only mean something on a private network, plus reserved TLDs.
const PRIVATE_SUFFIXES = [
  'localhost', 'local', 'localdomain', 'internal', 'intranet', 'lan', 'home', 'corp',
  'private', 'test', 'example', 'invalid', 'onion', 'arpa', 'home.arpa',
];

/** Why this URL may not be fetched, or '' if it may. Expects a parsed URL. */
export function urlProblem(url: URL): string {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return 'Only http and https are supported';
  if (url.username || url.password) return 'URLs with a username or password are not allowed';
  if (url.port && url.port !== '80' && url.port !== '443') return 'Only the standard web ports are allowed';
  const host = url.hostname.replace(/\.$/, '').toLowerCase();
  // WHATWG URL already turns 2130706433, 0x7f.1 and friends into dotted IPv4.
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) || host.startsWith('[')) return 'IP addresses are not allowed';
  if (!host.includes('.') || host.length > 253) return 'Please enter a public website address';
  const labels = host.split('.');
  for (let i = 0; i < labels.length; i++) {
    if (PRIVATE_SUFFIXES.includes(labels.slice(i).join('.'))) return 'Please enter a public website address';
  }
  return '';
}

/**
 * Turns what the visitor typed into the page to check, keeping the path (a
 * site can live in a folder, like example.com/shop/) but not the query or
 * fragment: "Example.com/shop/?x=1" -> "https://example.com/shop/".
 * Throws invalid_url or blocked_url.
 */
export function normalizeWebsiteUrl(input: string): URL {
  let raw = input.trim();
  if (!raw || raw.length > 2048) throw new WebsiteCheckError('invalid_url', 'Please enter your website address');
  if (raw.startsWith('//')) raw = raw.slice(2);
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    // "mailto:", "javascript:" and the like, but not "example.com:443".
    if (/^[a-z][a-z0-9+.-]*:(?!\d)/i.test(raw)) throw new WebsiteCheckError('invalid_url', 'Only http and https are supported');
    raw = `https://${raw}`;
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new WebsiteCheckError('invalid_url', 'That doesn’t look like a website address');
  }
  const problem = urlProblem(url);
  if (problem) throw new WebsiteCheckError(url.protocol.startsWith('http') ? 'blocked_url' : 'invalid_url', problem);
  url.hostname = url.hostname.replace(/\.$/, '').toLowerCase();
  return new URL(`${url.protocol}//${url.host}${url.pathname}`);
}

/** The site's domain without "www.". */
export function siteDomain(url: URL): string {
  return url.hostname.replace(/^www\./, '');
}

/**
 * The page as people say it, and the cache key: domain plus path, no
 * trailing slash. "https://www.example.com/shop/" -> "example.com/shop".
 */
export function pageLabel(url: URL): string {
  return siteDomain(url) + url.pathname.replace(/\/+$/, '');
}

function parseIPv4(ip: string): number[] | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(p => (/^\d{1,3}$/.test(p) ? Number(p) : NaN));
  return nums.every(n => n >= 0 && n <= 255) ? nums : null;
}

function blockedIPv4([a, b, c]: number[]): boolean {
  return a === 0 || a === 10 || a === 127 || a >= 224 // this network, private, loopback, multicast + reserved
    || (a === 100 && b >= 64 && b <= 127) // carrier-grade NAT
    || (a === 169 && b === 254) // link-local, including cloud metadata
    || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 168)
    || (a === 192 && b === 0 && (c === 0 || c === 2)) // IETF protocol assignments, TEST-NET-1
    || (a === 192 && b === 88 && c === 99) // 6to4 relay
    || (a === 198 && (b === 18 || b === 19)) // benchmarking
    || (a === 198 && b === 51 && c === 100)
    || (a === 203 && b === 0 && c === 113);
}

/** Eight 16-bit groups, or null if this isn't an IPv6 address. */
function parseIPv6(input: string): number[] | null {
  let ip = input.replace(/^\[|\]$/g, '').split('%')[0].toLowerCase();
  // A trailing dotted IPv4 (::ffff:1.2.3.4) becomes two groups.
  const v4 = ip.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/);
  if (v4) {
    const n = parseIPv4(v4[2]);
    if (!n) return null;
    ip = `${v4[1]}${((n[0] << 8) | n[1]).toString(16)}:${((n[2] << 8) | n[3]).toString(16)}`;
  }
  const halves = ip.split('::');
  if (halves.length > 2) return null;
  const toGroups = (s: string) => (s ? s.split(':') : []);
  const head = toGroups(halves[0]);
  const tail = halves.length === 2 ? toGroups(halves[1]) : [];
  const fill = 8 - head.length - tail.length;
  if (halves.length === 2 ? fill < 1 : fill !== 0) return null;
  const groups = [...head, ...Array(halves.length === 2 ? fill : 0).fill('0'), ...tail];
  if (!groups.every(g => /^[0-9a-f]{1,4}$/.test(g))) return null;
  return groups.map(g => parseInt(g, 16));
}

/**
 * True only for addresses on the public internet. Anything we can't parse
 * counts as not public.
 */
export function isPublicIp(ip: string): boolean {
  const v4 = parseIPv4(ip);
  if (v4) return !blockedIPv4(v4);
  const g = parseIPv6(ip);
  if (!g) return false;
  // IPv4-mapped (::ffff:a.b.c.d) and NAT64 (64:ff9b::a.b.c.d): judge the IPv4 inside.
  const embedded = [g[6] >> 8, g[6] & 255, g[7] >> 8, g[7] & 255];
  if (g.slice(0, 5).every(x => x === 0) && g[5] === 0xffff) return !blockedIPv4(embedded);
  if (g[0] === 0x64 && g[1] === 0xff9b && g.slice(2, 6).every(x => x === 0)) return !blockedIPv4(embedded);
  // Otherwise only global unicast (2000::/3), minus its special-purpose blocks.
  if (g[0] < 0x2000 || g[0] > 0x3fff) return false;
  if (g[0] === 0x2001 && g[1] < 0x200) return false; // 2001::/23: Teredo, benchmarking, ORCHID
  if (g[0] === 0x2001 && g[1] === 0x0db8) return false; // documentation
  if (g[0] === 0x2002) return false; // 6to4 can wrap any IPv4
  if (g[0] === 0x3fff && g[1] < 0x1000) return false; // documentation (3fff::/20)
  return true;
}

export interface HopResponse {
  status: number;
  location: string | null;
  contentType: string;
  body: string;
  truncated: boolean;
}

export interface FetchDeps {
  /** Every address the hostname resolves to. */
  resolve(hostname: string): Promise<string[]>;
  /** One GET, connecting to `address` only, reading at most maxBytes. No redirects, no cookies. */
  fetchOnce(url: URL, address: string, opts: { signal: AbortSignal; maxBytes: number }): Promise<HopResponse>;
}

export interface FetchedPage {
  finalUrl: URL;
  status: number;
  html: string;
  truncated: boolean;
  redirects: number;
}

function withSignal<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(new WebsiteCheckError('timeout'));
    const onAbort = () => reject(new WebsiteCheckError('timeout'));
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', onAbort));
  });
}

/**
 * Fetches a page the SSRF-safe way: checks the URL and every address its host
 * resolves to before each hop (redirects are followed here, by hand), connects
 * only to an address it checked, and gives up after 10 s in total.
 */
export async function fetchPublicPage(start: URL, deps: FetchDeps, opts: { timeoutMs?: number; maxBytes?: number } = {}): Promise<FetchedPage> {
  const signal = AbortSignal.timeout(opts.timeoutMs ?? FETCH_TIMEOUT_MS);
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const problem = urlProblem(url);
    if (problem) throw new WebsiteCheckError('blocked_url', `${problem} (${url.hostname})`);
    let addresses: string[];
    try {
      addresses = await withSignal(deps.resolve(url.hostname), signal);
    } catch (error) {
      if (error instanceof WebsiteCheckError) throw error;
      throw new WebsiteCheckError('unreachable', `Could not find ${url.hostname}`);
    }
    // All of them, so a host can't mix one public answer with a private one.
    if (!addresses.length) throw new WebsiteCheckError('unreachable', `Could not find ${url.hostname}`);
    if (!addresses.every(isPublicIp)) throw new WebsiteCheckError('blocked_url', `${url.hostname} points to a private address`);

    let res: HopResponse;
    try {
      res = await withSignal(deps.fetchOnce(url, addresses[0], { signal, maxBytes: opts.maxBytes ?? MAX_HTML_BYTES }), signal);
    } catch (error) {
      if (error instanceof WebsiteCheckError) throw error;
      if (signal.aborted) throw new WebsiteCheckError('timeout');
      throw new WebsiteCheckError('unreachable', `Could not connect to ${url.hostname}`);
    }
    if (res.status >= 300 && res.status < 400 && res.location) {
      try {
        url = new URL(res.location, url);
      } catch {
        throw new WebsiteCheckError('unreachable', 'The site redirected to an invalid address');
      }
      continue;
    }
    if (res.status >= 400) throw new WebsiteCheckError('unreachable', `The site responded with ${res.status}`, res.status);
    if (res.contentType && !/html|xml/i.test(res.contentType)) throw new WebsiteCheckError('not_html', 'That address isn’t a web page');
    return { finalUrl: url, status: res.status, html: res.body, truncated: res.truncated, redirects: hop };
  }
  throw new WebsiteCheckError('too_many_redirects', 'The site redirected too many times');
}
