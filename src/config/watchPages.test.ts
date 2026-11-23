import { describe, it, expect } from 'vitest';
import { VIDEOS_HUB_PATH, WATCH_PAGES, watchPageLangs, watchPath, watchVideo } from './watchPages';
import { videoJsonLd } from './videos';
import { ORGANIZATION_ID, SITE_URL } from './site';
import { findRoute, routeLangs } from '../i18n/meta';
import { pageFileFor } from '../pageFiles';
import { renderHeadTags, sitemapXml } from '../i18n/prerender';
import { headFor } from '../i18n/head';
import { localizePath } from '../i18n/lang';
import videoPages from '../i18n/videoPages';

// The watch pages exist for one reason: Search Console refuses to index a clip
// that is decoration or an aside, reporting "Video isn't on a watch page".
// These tests hold the parts Google actually checks — the VideoObject's
// required fields, the sitemap's <video:video>, and that the page a URL
// promises is a page that exists.

const LANGS = ['en', 'es'] as const;
/** The length Bing flags past and Google truncates around. */
const MAX_TITLE = 65;

describe('video watch pages', () => {
  it('covers the six clips, each at its own URL', () => {
    expect(WATCH_PAGES.map(p => p.slug)).toEqual([
      'missed-call-rescue-demo',
      'dm-rescue-demo',
      'meal-prep-ordering-tour',
      'lawn-care-site-tour',
      'pest-control-site-tour',
      'never-miss-a-customer',
    ]);
    expect(new Set(WATCH_PAGES.map(p => p.slug)).size).toBe(WATCH_PAGES.length);
  });

  it('routes every watch page and the hub', () => {
    expect(pageFileFor(VIDEOS_HUB_PATH)).toBe('Videos');
    expect(findRoute(VIDEOS_HUB_PATH)).toBeTruthy();
    for (const page of WATCH_PAGES) {
      const path = watchPath(page.slug);
      expect(pageFileFor(path), path).toBe('VideoWatch');
      expect(findRoute(path), path).toBeTruthy();
    }
  });

  it('gives every VideoObject the fields Google requires, with no gaps', () => {
    for (const page of WATCH_PAGES) {
      for (const lang of watchPageLangs(page)) {
        const file = watchVideo(page, lang)!;
        const node = videoJsonLd(file) as Record<string, unknown>;
        const where = `${page.slug} [${lang}]`;

        // Required by the Rich Results Test: name, description, thumbnailUrl,
        // uploadDate. Absent or empty fails the video rich result outright.
        expect(node['@type'], where).toBe('VideoObject');
        for (const field of ['name', 'description', 'thumbnailUrl', 'uploadDate'] as const) {
          expect(typeof node[field], `${where} ${field}`).toBe('string');
          expect((node[field] as string).length, `${where} ${field}`).toBeGreaterThan(0);
        }
        // Recommended, and the pair that makes a video result playable.
        expect(node.contentUrl, where).toBe(`${SITE_URL}${file.mp4}`);
        expect(node.thumbnailUrl, where).toBe(`${SITE_URL}${file.poster}`);
        // Absolute, or a crawler has nothing to resolve them against.
        for (const field of ['contentUrl', 'thumbnailUrl'] as const) {
          expect(String(node[field]).startsWith('https://'), `${where} ${field}`).toBe(true);
        }
        // ISO 8601 instant with an offset, and a real date.
        expect(String(node.uploadDate), where).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
        expect(Number.isNaN(Date.parse(String(node.uploadDate))), where).toBe(false);
        // ISO 8601 duration, and a clip under a minute says PT18S not PT0M18S.
        expect(String(node.duration), where).toMatch(/^PT(\d+M)?\d+S$/);
        expect(node.inLanguage, where).toBe(file.lang);
        expect(node.publisher, where).toEqual({ '@id': ORGANIZATION_ID });
      }
    }
  });

  it('keeps every watch page title inside what a search result shows', () => {
    for (const page of WATCH_PAGES) {
      const route = findRoute(watchPath(page.slug))!;
      for (const lang of watchPageLangs(page)) {
        const title = route.meta[lang].title;
        expect(title.length, `${page.slug} [${lang}] is ${title.length}: ${title}`).toBeLessThanOrEqual(MAX_TITLE);
        expect(route.meta[lang].description.length, `${page.slug} [${lang}]`).toBeGreaterThan(80);
      }
    }
    for (const lang of LANGS) {
      const hub = findRoute(VIDEOS_HUB_PATH)!;
      expect(hub.meta[lang].title.length, `hub [${lang}]`).toBeLessThanOrEqual(MAX_TITLE);
    }
  });

  it('only claims a language it has a recording in', () => {
    for (const page of WATCH_PAGES) {
      const route = findRoute(watchPath(page.slug))!;
      // The route's languages and the clip's languages are the same set, or
      // a page advertises a URL that does not exist.
      expect(routeLangs(route).sort(), page.slug).toEqual(watchPageLangs(page).sort());
      expect(watchVideo(page, 'en'), page.slug).toBeTruthy();
      if (!page.video.es) expect(watchVideo(page, 'es'), page.slug).toBeUndefined();
    }
    // Four of the six are English recordings; two have Spanish ones.
    expect(WATCH_PAGES.filter(p => p.video.es).map(p => p.slug))
      .toEqual(['missed-call-rescue-demo', 'meal-prep-ordering-tour']);
  });

  it('has copy, a transcript and a call to action for every page it builds', () => {
    for (const page of WATCH_PAGES) {
      for (const lang of watchPageLangs(page)) {
        const copy = (videoPages[lang].pages as Record<string, { heading: string; intro: string; cta: string; transcript: readonly string[] } | undefined>)[page.slug];
        const where = `${page.slug} [${lang}]`;
        expect(copy, where).toBeTruthy();
        expect(copy!.heading.length, where).toBeGreaterThan(20);
        expect(copy!.intro.length, where).toBeGreaterThan(100);
        expect(copy!.cta.length, where).toBeGreaterThan(5);
        // The transcript is the reason a crawler believes this is a watch
        // page, so an empty one is a failure rather than a style choice.
        expect(copy!.transcript.length, where).toBeGreaterThan(2);
        for (const line of copy!.transcript) expect(line.trim().length, where).toBeGreaterThan(0);
      }
    }
  });

  it('puts a <video:video> on every watch page URL, and nowhere else', () => {
    const xml = sitemapXml();
    const blocks = xml.split('<url>').slice(1);
    let withVideo = 0;
    for (const block of blocks) {
      const loc = /<loc>([^<]+)<\/loc>/.exec(block)![1];
      const isWatch = /\/videos\/[a-z-]+$/.test(loc);
      const hasVideo = block.includes('<video:video>');
      expect(hasVideo, loc).toBe(isWatch);
      if (hasVideo) {
        withVideo += 1;
        for (const tag of ['video:thumbnail_loc', 'video:title', 'video:description', 'video:content_loc', 'video:duration']) {
          expect(block, `${loc} ${tag}`).toContain(`<${tag}>`);
        }
        // Duration here is seconds, not the ISO 8601 the JSON-LD carries.
        expect(/<video:duration>(\d+)<\/video:duration>/.test(block), loc).toBe(true);
      }
    }
    // Six English watch pages plus the two with a Spanish recording.
    expect(withVideo).toBe(8);
    expect(xml).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
  });

  it('points og:video at the file this language actually plays', () => {
    // The Spanish meal-prep and missed-call pages play different recordings
    // from their English twins. An og:video naming the English file on the
    // Spanish page would hand a share card the wrong video, and nothing else
    // on the page would disagree with it.
    for (const page of WATCH_PAGES) {
      for (const lang of watchPageLangs(page)) {
        const file = watchVideo(page, lang)!;
        const tags = renderHeadTags(headFor(localizePath(watchPath(page.slug), lang)));
        const where = `${page.slug} [${lang}]`;
        expect(tags, where).toContain(`<meta property="og:video" content="${SITE_URL}${file.mp4}" data-seo />`);
        expect(tags, where).toContain('<meta property="og:video:type" content="video/mp4" data-seo />');
        // And og:image stays a JPEG card, not the poster: LinkedIn will not
        // render the WebP posters these clips use.
        expect(tags, where).toMatch(/<meta property="og:image" content="[^"]+\.jpg"/);
      }
    }
  });

  it('leaves the decorative background clips out of all of it', () => {
    // The two Search Console reported as "Video isn't on a watch page" are
    // backgrounds and stay that way; no watch page claims either file.
    const claimed = WATCH_PAGES.flatMap(p => [p.video.en.mp4, p.video.es?.mp4]).filter(Boolean);
    expect(claimed).not.toContain('/video/phoenix-hero.webm');
    expect(claimed).not.toContain('/video/phoenix-hero.mp4');
    expect(sitemapXml()).not.toContain('phoenix-hero');
  });
});
