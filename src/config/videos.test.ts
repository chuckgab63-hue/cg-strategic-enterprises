import { describe, it, expect } from 'vitest';
// ?raw: the caption files as text, so a test can check them against the facts
// claimed about the clip they belong to.
import mealPrepEnVtt from '../../public/videos/mealprep-demo-hero.en.vtt?raw';
import mealPrepEsVtt from '../../public/videos/mealprep-demo-hero-es.es.vtt?raw';
import pestVtt from '../../public/videos/pest-tour-hero.en.vtt?raw';
import lawnVtt from '../../public/videos/lawn-tour-hero.en.vtt?raw';
import rescueEnVtt from '../../public/videos/missed-call-rescue-hero.en.vtt?raw';
import rescueEsVtt from '../../public/videos/missed-call-rescue-hero-es.es.vtt?raw';
import { ORGANIZATION_ID, SITE_URL } from './site';
import { DEMO_VIDEO, RESCUE_VIDEO, TOUR_VIDEO, videoJsonLd, videoJsonLdText, type VideoFile } from './videos';

/** Every clip on the site, with the captions file it ships with. */
const CLIPS: { key: string; file: VideoFile; vtt: string }[] = [
  { key: 'meal-prep en', file: DEMO_VIDEO.en, vtt: mealPrepEnVtt },
  { key: 'meal-prep es', file: DEMO_VIDEO.es, vtt: mealPrepEsVtt },
  { key: 'pest tour', file: TOUR_VIDEO.pest, vtt: pestVtt },
  { key: 'lawn tour', file: TOUR_VIDEO.lawn, vtt: lawnVtt },
  { key: 'missed-call rescue en', file: RESCUE_VIDEO.en, vtt: rescueEnVtt },
  { key: 'missed-call rescue es', file: RESCUE_VIDEO.es, vtt: rescueEsVtt },
];

/** The end of a cue line, "00:01:12.047 --> 00:01:19.500", in seconds. */
function cueEnd(line: string): number {
  const [h, m, s] = line.split('-->')[1].trim().split(':');
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

describe('narrated clips', () => {
  it('names a file set that belongs together', () => {
    for (const { key, file } of CLIPS) {
      expect(file.mp4, key).toMatch(/^\/videos\/.+\.mp4$/);
      expect(file.poster, key).toMatch(/^\/videos\/.+\.(webp|jpg)$/);
      // The captions file carries its language in its name, so a swapped file
      // is visible in the diff rather than only in the player.
      expect(file.captions, key).toBe(file.mp4.replace(/\.mp4$/, `.${file.lang}.vtt`));
      expect(file.width / file.height, key).toBeCloseTo(16 / 9, 2);
    }
  });

  it('gives every clip its own files and its own words', () => {
    const fields = ['mp4', 'poster', 'captions', 'name', 'description'] as const;
    for (const field of fields) {
      const values = CLIPS.map(c => c.file[field]);
      expect(new Set(values).size, field).toBe(CLIPS.length);
    }
  });

  it('claims a length the captions fit inside', () => {
    for (const { key, file, vtt } of CLIPS) {
      const cues = vtt.split('\n').filter(line => line.includes('-->'));
      expect(cues.length, key).toBeGreaterThan(5);
      const last = cueEnd(cues[cues.length - 1]);
      // seconds is rounded up from the file's real length, so the final cue
      // ends before it -- and not more than a cue's worth before, which would
      // mean the duration belongs to a different recording.
      expect(last, key).toBeLessThanOrEqual(file.seconds);
      expect(last, key).toBeGreaterThan(file.seconds - 15);
    }
  });

  it("describes each clip to crawlers in the clip's own language", () => {
    for (const { key, file } of CLIPS) {
      const node = videoJsonLd(file);
      expect(node['@type'], key).toBe('VideoObject');
      expect(node.inLanguage, key).toBe(file.lang);
      expect(node.thumbnailUrl, key).toBe(`${SITE_URL}${file.poster}`);
      expect(node.contentUrl, key).toBe(`${SITE_URL}${file.mp4}`);
      expect(node.publisher, key).toEqual({ '@id': ORGANIZATION_ID });
      expect(node.uploadDate, key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(node.name.length, key).toBeGreaterThan(20);
      expect(node.description.length, key).toBeGreaterThan(120);
      // A description written from the narration, not from the page.
      expect(node.description, key).not.toContain('undefined');
    }
  });

  it('writes the duration as ISO 8601 minutes and seconds', () => {
    expect(videoJsonLd(DEMO_VIDEO.en).duration).toBe('PT1M21S');
    expect(videoJsonLd(DEMO_VIDEO.es).duration).toBe('PT1M35S');
    expect(videoJsonLd(TOUR_VIDEO.pest).duration).toBe('PT1M14S');
    expect(videoJsonLd(TOUR_VIDEO.lawn).duration).toBe('PT1M12S');
    expect(videoJsonLd(RESCUE_VIDEO.en).duration).toBe('PT1M12S');
    expect(videoJsonLd(RESCUE_VIDEO.es).duration).toBe('PT1M27S');
  });

  it('escapes the JSON-LD so it cannot close its own script tag', () => {
    for (const { key, file } of CLIPS) {
      expect(videoJsonLdText(file), key).not.toContain('<');
    }
  });

  it('keeps the tours English, because there is no Spanish recording of them', () => {
    for (const file of Object.values(TOUR_VIDEO)) {
      expect(file.lang).toBe('en');
      expect(file.captionsLabel).toBe('English');
    }
  });
});
