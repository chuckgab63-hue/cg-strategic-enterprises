import { describe, it, expect } from 'vitest';
import {
  WebsiteCheckError, fetchPublicPage, isPublicIp, normalizeWebsiteUrl, pageLabel, siteDomain,
  type FetchDeps, type HopResponse,
} from './url';

function codeOf(fn: () => unknown): string {
  try {
    fn();
  } catch (error) {
    return error instanceof WebsiteCheckError ? error.code : 'other';
  }
  return 'ok';
}

describe('normalizeWebsiteUrl', () => {
  it('adds https, keeps the path and drops the query and fragment', () => {
    expect(normalizeWebsiteUrl('Example.com').href).toBe('https://example.com/');
    expect(normalizeWebsiteUrl('  www.example.com/about?x=1#top ').href).toBe('https://www.example.com/about');
    expect(normalizeWebsiteUrl('https://bythecjax.com/onesourcepest/').href).toBe('https://bythecjax.com/onesourcepest/');
    expect(normalizeWebsiteUrl('http://example.com').href).toBe('http://example.com/');
    expect(normalizeWebsiteUrl('example.com:443').href).toBe('https://example.com/');
    expect(normalizeWebsiteUrl('//example.com/x').href).toBe('https://example.com/x');
  });

  it('rejects other schemes', () => {
    for (const input of ['ftp://example.com', 'file:///etc/passwd', 'javascript:alert(1)', 'mailto:a@b.com', 'gopher://example.com']) {
      expect(codeOf(() => normalizeWebsiteUrl(input)), input).toBe('invalid_url');
    }
  });

  it('blocks localhost, private names, IP literals and odd ports', () => {
    for (const input of [
      'localhost', 'http://localhost:3000', 'app.localhost', 'printer.local', 'db.internal', 'router.lan',
      'intranet', 'http://127.0.0.1', '10.0.0.5', 'http://169.254.169.254/latest/meta-data',
      'http://[::1]/', 'http://[fd00::1]', 'http://2130706433', 'http://0x7f.0.0.1', 'http://0177.0.0.1',
      'http://8.8.8.8', 'example.com:8080', 'http://user:pass@example.com', 'something.test', 'x.example',
    ]) {
      expect(codeOf(() => normalizeWebsiteUrl(input)), input).toBe('blocked_url');
    }
  });

  it('rejects empty and garbage input', () => {
    expect(codeOf(() => normalizeWebsiteUrl(''))).toBe('invalid_url');
    expect(codeOf(() => normalizeWebsiteUrl('http://exa mple.com'))).toBe('invalid_url');
  });

  it('labels and caches pages by domain and path', () => {
    expect(siteDomain(new URL('https://www.example.com/shop/'))).toBe('example.com');
    expect(pageLabel(new URL('https://www.example.com/'))).toBe('example.com');
    expect(pageLabel(new URL('https://bythecjax.com/onesourcepest/'))).toBe('bythecjax.com/onesourcepest');
  });
});

describe('isPublicIp', () => {
  it('blocks private, loopback, link-local, CGNAT, reserved and multicast IPv4', () => {
    for (const ip of [
      '0.0.0.0', '10.1.2.3', '100.64.0.1', '100.127.255.254', '127.0.0.1', '169.254.169.254',
      '172.16.0.1', '172.31.255.255', '192.0.0.8', '192.0.2.1', '192.168.1.1', '198.18.0.1',
      '198.51.100.7', '203.0.113.9', '224.0.0.1', '240.0.0.1', '255.255.255.255',
    ]) expect(isPublicIp(ip), ip).toBe(false);
  });

  it('allows public IPv4', () => {
    for (const ip of ['8.8.8.8', '1.1.1.1', '93.184.216.34', '172.15.0.1', '172.32.0.1', '100.63.0.1', '100.128.0.1']) {
      expect(isPublicIp(ip), ip).toBe(true);
    }
  });

  it('blocks special IPv6, including IPv4 hidden inside it', () => {
    for (const ip of [
      '::', '::1', 'fe80::1', 'fc00::1', 'fd12:3456::1', 'ff02::1', 'fec0::1',
      '::ffff:127.0.0.1', '::ffff:7f00:1', '::ffff:169.254.169.254', '64:ff9b::a9fe:a9fe',
      '2001:db8::1', '2001::1', '2002:7f00:1::1', '100::1', '[::1]', 'fe80::1%eth0',
    ]) expect(isPublicIp(ip), ip).toBe(false);
  });

  it('allows global IPv6 and public IPv4-mapped addresses', () => {
    for (const ip of ['2606:4700:4700::1111', '2001:4860:4860::8888', '::ffff:8.8.8.8']) {
      expect(isPublicIp(ip), ip).toBe(true);
    }
  });

  it('treats anything unparseable as not public', () => {
    for (const ip of ['', 'example.com', '1.2.3', '1.2.3.256', '1::2::3', 'gggg::1']) expect(isPublicIp(ip), ip).toBe(false);
  });
});

/** A fake network: hostnames -> addresses, URLs -> responses. Records every connection. */
function fakeNet(dns: Record<string, string[]>, pages: Record<string, Partial<HopResponse>>) {
  const connections: string[] = [];
  const deps: FetchDeps = {
    resolve: async host => {
      if (!(host in dns)) throw new Error('ENOTFOUND');
      return dns[host];
    },
    fetchOnce: async (url, address) => {
      connections.push(`${url.href} @ ${address}`);
      const page = pages[url.href];
      if (!page) throw new Error('ECONNREFUSED');
      return { status: 200, location: null, contentType: 'text/html', body: '', truncated: false, ...page };
    },
  };
  return { deps, connections };
}

async function errorCode(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
    return 'ok';
  } catch (error) {
    return error instanceof WebsiteCheckError ? error.code : 'other';
  }
}

describe('fetchPublicPage', () => {
  it('follows public redirects and returns the final page', async () => {
    const { deps, connections } = fakeNet(
      { 'example.com': ['93.184.216.34'], 'www.example.com': ['93.184.216.35'] },
      {
        'http://example.com/': { status: 301, location: 'https://example.com/' },
        'https://example.com/': { status: 302, location: 'https://www.example.com/' },
        'https://www.example.com/': { body: '<title>Hi</title>' },
      },
    );
    const page = await fetchPublicPage(new URL('http://example.com/'), deps);
    expect(page.finalUrl.href).toBe('https://www.example.com/');
    expect(page.html).toBe('<title>Hi</title>');
    expect(page.redirects).toBe(2);
    // Each hop connects to the address that was checked for it.
    expect(connections).toEqual([
      'http://example.com/ @ 93.184.216.34',
      'https://example.com/ @ 93.184.216.34',
      'https://www.example.com/ @ 93.184.216.35',
    ]);
  });

  it('blocks a redirect to a private IP literal without connecting to it', async () => {
    const { deps, connections } = fakeNet(
      { 'example.com': ['93.184.216.34'] },
      { 'https://example.com/': { status: 302, location: 'http://169.254.169.254/latest/meta-data/' } },
    );
    expect(await errorCode(fetchPublicPage(new URL('https://example.com/'), deps))).toBe('blocked_url');
    expect(connections).toEqual(['https://example.com/ @ 93.184.216.34']);
  });

  it('blocks a redirect to localhost and to odd ports', async () => {
    for (const location of ['http://localhost/', 'http://127.0.0.1:8080/', 'https://example.com:22/', 'file:///etc/passwd']) {
      const { deps } = fakeNet({ 'example.com': ['93.184.216.34'] }, { 'https://example.com/': { status: 301, location } });
      expect(await errorCode(fetchPublicPage(new URL('https://example.com/'), deps)), location).toBe('blocked_url');
    }
  });

  it('blocks a redirect to a public-looking name that resolves privately', async () => {
    const { deps, connections } = fakeNet(
      { 'example.com': ['93.184.216.34'], 'sneaky.example.net': ['10.0.0.7'] },
      { 'https://example.com/': { status: 302, location: 'https://sneaky.example.net/' } },
    );
    expect(await errorCode(fetchPublicPage(new URL('https://example.com/'), deps))).toBe('blocked_url');
    expect(connections).toHaveLength(1);
  });

  it('blocks a host whose DNS answers mix public and private addresses', async () => {
    const { deps, connections } = fakeNet({ 'mixed.example.net': ['93.184.216.34', '127.0.0.1'] }, {});
    expect(await errorCode(fetchPublicPage(new URL('https://mixed.example.net/'), deps))).toBe('blocked_url');
    expect(connections).toHaveLength(0);
  });

  it('blocks IPv4-mapped IPv6 loopback answers', async () => {
    const { deps } = fakeNet({ 'v6.example.net': ['::ffff:127.0.0.1'] }, {});
    expect(await errorCode(fetchPublicPage(new URL('https://v6.example.net/'), deps))).toBe('blocked_url');
  });

  it('gives up after too many redirects', async () => {
    const pages: Record<string, Partial<HopResponse>> = {};
    for (let i = 0; i < 10; i++) pages[`https://example.com/${i}`] = { status: 302, location: `/${i + 1}` };
    const { deps } = fakeNet({ 'example.com': ['93.184.216.34'] }, pages);
    expect(await errorCode(fetchPublicPage(new URL('https://example.com/0'), deps))).toBe('too_many_redirects');
  });

  it('reports unknown hosts, errors, non-HTML and timeouts', async () => {
    const { deps } = fakeNet(
      { 'example.com': ['93.184.216.34'] },
      {
        'https://example.com/404': { status: 404 },
        'https://example.com/pdf': { contentType: 'application/pdf' },
      },
    );
    expect(await errorCode(fetchPublicPage(new URL('https://nope.example.org/'), deps))).toBe('unreachable');
    expect(await errorCode(fetchPublicPage(new URL('https://example.com/404'), deps))).toBe('unreachable');
    expect(await errorCode(fetchPublicPage(new URL('https://example.com/pdf'), deps))).toBe('not_html');

    const slow: FetchDeps = { ...deps, fetchOnce: () => new Promise(() => {}) };
    expect(await errorCode(fetchPublicPage(new URL('https://example.com/'), slow, { timeoutMs: 50 }))).toBe('timeout');
  });
});
