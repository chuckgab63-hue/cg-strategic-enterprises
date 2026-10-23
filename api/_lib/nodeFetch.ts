// The network half of src/lib/websiteCheck/url.ts's fetchPublicPage, in Node.
// Lives under api/_lib (the underscore keeps Vercel from deploying it as a
// route) because the browser app's tsconfig has no Node types.
//
// fetchOnce connects only to the address fetchPublicPage already checked, by
// overriding the socket's DNS lookup, so the host can't swap in a private
// address between the check and the connection (DNS rebinding). The Host header
// and TLS name still use the real hostname.

import http from 'node:http';
import https from 'node:https';
import { lookup } from 'node:dns/promises';
import zlib from 'node:zlib';
import type { FetchDeps, HopResponse } from '../../src/lib/websiteCheck/url.js';

const USER_AGENT = 'Mozilla/5.0 (compatible; CGStrategicWebsiteCheck/1.0; +https://www.cgstrategic.dev/website-check)';

async function resolve(hostname: string): Promise<string[]> {
  const answers = await lookup(hostname, { all: true, verbatim: true });
  return answers.map(a => a.address);
}

function decoderFor(encoding: string | undefined) {
  switch ((encoding ?? '').toLowerCase().trim()) {
    case 'gzip': case 'x-gzip': return zlib.createGunzip();
    case 'deflate': return zlib.createInflate();
    case 'br': return zlib.createBrotliDecompress();
    default: return null;
  }
}

function charsetOf(contentType: string): string {
  const m = contentType.match(/charset=["']?([\w-]+)/i);
  try {
    return m ? new TextDecoder(m[1]).encoding : 'utf-8';
  } catch {
    return 'utf-8';
  }
}

function fetchOnce(url: URL, address: string, { signal, maxBytes }: { signal: AbortSignal; maxBytes: number }): Promise<HopResponse> {
  return new Promise((resolvePromise, reject) => {
    const family = address.includes(':') ? 6 : 4;
    const client = url.protocol === 'https:' ? https : http;
    const req = client.request(url, {
      method: 'GET',
      signal,
      agent: false, // fresh connection, nothing pooled or shared
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
        'Accept-Language': 'en-US,en;q=0.8,es;q=0.6',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      lookup: ((_hostname: string, options: { all?: boolean }, callback: (...args: unknown[]) => void) => {
        if (options?.all) callback(null, [{ address, family }]);
        else callback(null, address, family);
      }) as never,
    }, res => {
      const status = res.statusCode ?? 0;
      const contentType = String(res.headers['content-type'] ?? '');
      if (status >= 300 && status < 400) {
        res.resume();
        resolvePromise({ status, location: res.headers.location ?? null, contentType, body: '', truncated: false });
        return;
      }
      const decoder = decoderFor(res.headers['content-encoding'] as string | undefined);
      const stream = decoder ? res.pipe(decoder) : res;
      const chunks: Buffer[] = [];
      let size = 0;
      let truncated = false;
      const finish = () => {
        const body = new TextDecoder(charsetOf(contentType)).decode(Buffer.concat(chunks));
        resolvePromise({ status, location: null, contentType, body, truncated });
      };
      stream.on('data', (chunk: Buffer) => {
        if (truncated) return;
        const room = maxBytes - size;
        if (chunk.length >= room) {
          chunks.push(chunk.subarray(0, room));
          size = maxBytes;
          truncated = true;
          // Stop downloading; what we have is enough for the checks.
          req.destroy();
          finish();
          return;
        }
        chunks.push(chunk);
        size += chunk.length;
      });
      stream.on('end', () => { if (!truncated) finish(); });
      stream.on('error', error => { if (!truncated) reject(error); });
    });
    req.on('error', error => reject(error));
    req.end();
  });
}

export const nodeFetchDeps: FetchDeps = { resolve, fetchOnce };
