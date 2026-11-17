// Columbus / Indigenous Peoples' Day: deliberately neutral, no flags, figures from history or names. A calm
// fox sits among falling autumn leaves, tail swishing, ears twitching. 12 s loop, slow motion only.
import type { ThemeModule } from '../loaders';
import { drift, leafShape } from './common';
import { an, kf, scene } from './scene';

const CSS =
  kf('cb-tail', { '0%,100%': 'transform:rotate(-8deg)', '50%': 'transform:rotate(14deg)' }) +
  kf('cb-ear', { '0%,60%,100%': 'transform:rotate(0)', '66%': 'transform:rotate(-12deg)', '72%': 'transform:rotate(0)' }) +
  kf('cb-look', { '0%,20%': 'transform:rotate(0)', '30%,50%': 'transform:rotate(-7deg)', '64%,84%': 'transform:rotate(6deg)', '100%': 'transform:rotate(0)' }) +
  kf('cb-blink', { '0%,92%,100%': 'transform:scaleY(1)', '95%': 'transform:scaleY(.1)' });

const theme: ThemeModule = {
  id: 'columbus',
  label: "Columbus / Indigenous Peoples' Day",
  colors: ['#d9731a', '#a8461c', '#f4e3c8'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#a8763a"/>` +
        `<g fill="#d9731a" opacity=".9"><path d="M20 226C14 220 18 214 24 220Z"/><path d="M150 226C146 218 152 214 156 222Z"/></g>` +
        // fox sitting, seen from the side
        `<g transform="translate(78 224)">` +
        `<g ${an('cb-tail', 6, 0, 'transform-origin:-18px -8px')}><path d="M-18 -8C-46 -8 -52 -34 -40 -44C-34 -34 -26 -30 -16 -24Z" class="a1"/><path d="M-40 -44C-46 -40 -48 -34 -44 -28C-36 -34 -36 -40 -40 -44Z" fill="#f4e3c8"/></g>` +
        `<path d="M-16 0C-22 -12 -14 -34 0 -38C14 -34 16 -12 12 0Z" class="a1"/><path d="M0 -34C8 -28 10 -10 8 0H-2Z" fill="#f4e3c8"/>` +
        `<path d="M-8 0V4M6 0V4" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/>` +
        `<g ${an('cb-look', 12, 0, 'transform-origin:2px -34px')}>` +
        `<path d="M-8 -40C-8 -56 10 -58 14 -48L26 -42L12 -34C4 -30 -8 -32 -8 -40Z" class="a1"/><path d="M12 -36L26 -42L16 -33Z" fill="#f4e3c8"/><circle cx="26" cy="-42" r="1.9" fill="#2b2118"/>` +
        `<g ${an('cb-ear', 12, 0, 'transform-origin:-2px -52px')}><path d="M-6 -50L-8 -64L2 -54Z" class="a1"/><path d="M-5 -52L-6 -60L0 -54Z" fill="#2b2118"/></g>` +
        `<path d="M4 -52L8 -64L12 -52Z" class="a1"/>` +
        `<g ${an('cb-blink', 12, 0, 'transform-origin:12px -44px')}><ellipse cx="12" cy="-44" rx="1.8" ry="2.4" fill="#1f1a17"/></g>` +
        `</g></g>` +
        drift(20, 20, 12, 0, leafShape('a1'), 220) + drift(100, -16, 14, -5, leafShape('a2'), -200) + drift(165, 20, 13, -9, leafShape('a1'), 240),
    ),
};

export default theme;
