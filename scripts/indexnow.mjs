// Tells Bing, Yandex and the other IndexNow participants that pages have
// changed, instead of waiting for them to crawl back round. Google is not an
// IndexNow participant; for Google the sitemap's lastmod is still the signal.
//
//   npm run indexnow                         submit every URL in the sitemap
//   npm run indexnow -- /pest-control        submit one page (path or full URL)
//   npm run indexnow -- /es/lawn-care /faq   submit several
//
// Git Bash on Windows rewrites an argument that starts with "/" into a Windows
// path before node sees it, so write the path without the leading slash there
// (pest-control) or pass the full URL. resolveArg below refuses anything that
// still looks like a local path rather than submitting a nonsense URL.
//
// The key file has to stay reachable at KEY_LOCATION: that URL is how the
// search engines check we are allowed to speak for this host, so if it 404s
// every submission is rejected. public/<key>.txt is it.

const HOST = 'www.cgstrategic.dev';
const ORIGIN = `https://${HOST}`;
const KEY = 'a738b80be46473529f5165895d2e40ee';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** Every <loc> in the live sitemap, in the order it lists them. */
async function sitemapUrls() {
  const res = await fetch(SITEMAP, { headers: { accept: 'application/xml' } });
  if (!res.ok) throw new Error(`sitemap ${SITEMAP} -> ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);
  if (!urls.length) throw new Error(`no <loc> entries in ${SITEMAP}`);
  return urls;
}

/** A CLI argument as an absolute URL on this host. Anything else is a mistake worth stopping for. */
function resolveArg(arg) {
  if (/^[A-Za-z]:[/\\]/.test(arg) || arg.includes('\\')) {
    throw new Error(`${arg} looks like a local file path, not a page — in Git Bash drop the leading slash, or pass the full URL`);
  }
  const url = arg.startsWith('http://') || arg.startsWith('https://')
    ? new URL(arg)
    : new URL(arg.startsWith('/') ? arg : `/${arg}`, ORIGIN);
  if (url.host !== HOST) throw new Error(`${arg} is not on ${HOST} — IndexNow only accepts URLs for the key's own host`);
  return url.toString();
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map(resolveArg) : await sitemapUrls();

console.log(`submitting ${urlList.length} URL${urlList.length === 1 ? '' : 's'} for ${HOST}`);
for (const u of urlList) console.log(`  ${u}`);

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
// A success is 200 or 202 with an empty body; a failure explains itself in the body.
const body = (await res.text()).trim();
console.log(`${ENDPOINT} -> ${res.status} ${res.statusText}${body ? `\n${body}` : ''}`);
if (!res.ok) process.exitCode = 1;
