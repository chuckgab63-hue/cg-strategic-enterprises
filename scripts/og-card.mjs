// Turns an HTML social card in design/og into the JPEG public/og serves.
//
//   node scripts/og-card.mjs dm-rescue
//
// Reads design/og/<name>.html, screenshots it at 1200x630 in headless Chrome,
// and converts the PNG to public/og/<name>.jpg with ffmpeg. Both are things a
// machine already has rather than build dependencies: this runs by hand when a
// card changes, never in `npm run build`, so nothing in the deploy needs
// Chrome or ffmpeg installed.
//
// Cards cropped from an artwork master (missed-call-rescue, pest-control, the
// lawn and meal-prep posters) are not made this way — they have a .jpg source
// in design/og instead. This is for the cards that are type on a flat ground.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const WIDTH = 1200;
const HEIGHT = 630;

/** Where Chrome usually is, per platform. CHROME overrides it. */
const CHROME_CANDIDATES = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error('Usage: node scripts/og-card.mjs <card-name>   (e.g. dm-rescue)');
  process.exit(1);
}

const html = join(ROOT, 'design', 'og', `${name}.html`);
const jpg = join(ROOT, 'public', 'og', `${name}.jpg`);
if (!existsSync(html)) {
  console.error(`No card at ${html}`);
  process.exit(1);
}

const chrome = CHROME_CANDIDATES.find(p => existsSync(p));
if (!chrome) {
  console.error('Chrome not found. Set CHROME to its path.');
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), 'og-card-'));
const png = join(work, `${name}.png`);
try {
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    // The card loads a web font, so give the page a moment to use it.
    '--virtual-time-budget=6000',
    `--window-size=${WIDTH},${HEIGHT}`,
    `--screenshot=${png}`,
    `file:///${html.replace(/\\/g, '/')}`,
  ], { stdio: 'inherit' });

  // -q 2 is near-visually-lossless; these cards land around 80 KB, which is
  // where the other cards in public/og sit.
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, '-q:v', '2', jpg], { stdio: 'inherit' });
  console.log(`Wrote public/og/${name}.jpg`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
