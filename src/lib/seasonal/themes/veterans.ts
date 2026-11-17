// Veterans Day: a quiet, respectful scene. A bald eagle keeps watch from a post, slowly turning its head,
// under a softly glowing star. No jokes, no fast motion. 16 s loop.
import type { ThemeModule } from '../loaders';
import { starPath } from './common';
import { an, kf, scene } from './scene';

const CSS =
  kf('vt-look', { '0%,16%': 'transform:rotate(0)', '30%,50%': 'transform:rotate(-9deg)', '64%,84%': 'transform:rotate(7deg)', '100%': 'transform:rotate(0)' }) +
  kf('vt-breathe', { '0%,100%': 'transform:scale(1,1)', '50%': 'transform:scale(1.02,1.03)' }) +
  kf('vt-glow', { '0%,100%': 'opacity:.6', '50%': 'opacity:1' }) +
  kf('vt-ray', { '0%,100%': 'opacity:.12', '50%': 'opacity:.28' });

const theme: ThemeModule = {
  id: 'veterans',
  label: 'Veterans Day',
  colors: ['#b22234', '#3c5a99', '#f2c230'],
  svg: () =>
    scene(
      CSS,
      `<g ${an('vt-ray', 10, 0, 'opacity:.18')}><path d="M70 40L40 240H130Z" class="a3"/></g>` +
        `<g transform="translate(70 36)"><g ${an('vt-glow', 5)}><path class="a3" d="${starPath(14)}"/></g></g>` +
        `<path d="M0 226H196V240H0Z" fill="#6b7280"/>` +
        // post and eagle
        `<rect x="48" y="188" width="44" height="40" rx="3" fill="#8a5a34"/><path d="M48 200H92M48 214H92" stroke="#6b4222" stroke-width="1.6" opacity=".6"/>` +
        `<g transform="translate(70 186)"><g ${an('vt-breathe', 5, 0, 'transform-origin:0 0')}>` +
        `<path d="M-6 0L-8 8M6 0L8 8M-12 8H-4M4 8H12" stroke="#f2b705" stroke-width="3" stroke-linecap="round" fill="none"/>` +
        `<path d="M-16 -4C-24 -28 -14 -48 0 -50C14 -48 24 -28 16 -4Z" fill="#5a3418"/><path d="M-9 -10C-14 -26 -8 -40 0 -42C8 -40 14 -26 9 -10Z" fill="#7a4a24"/>` +
        `<path d="M-14 -10C-16 -4 -14 0 -10 2M14 -10C16 -4 14 0 10 2" stroke="#fff" stroke-width="2.4" fill="none"/>` +
        `<g ${an('vt-look', 16, 0, 'transform-origin:0 -42px')}>` +
        `<circle cx="0" cy="-54" r="12" fill="#fff"/><path d="M3 -55L16 -50L4 -44Z" fill="#f2b705"/>` +
        `<circle cx="-2" cy="-56" r="1.8" fill="#1f1a17"/><path d="M-8 -60L1 -58" stroke="#1f1a17" stroke-width="1.4"/>` +
        `</g></g></g>`,
    ),
};

export default theme;
