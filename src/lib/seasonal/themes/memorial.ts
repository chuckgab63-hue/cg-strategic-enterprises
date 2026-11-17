// Memorial Day: a quiet scene. Red poppies sway very slowly and a monarch butterfly drifts down to rest on
// one, wings opening and closing gently. No jokes, no fast motion. 20 s loop.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('me-sway', { '0%,100%': 'transform:rotate(-2.5deg)', '50%': 'transform:rotate(2.5deg)' }) +
  kf('me-wing', { '0%,100%': 'transform:scaleX(1)', '50%': 'transform:scaleX(.35)' }) +
  kf('me-fly', { '0%': 'transform:translate(140px,-120px)', '30%': 'transform:translate(70px,-84px)', '48%': 'transform:translate(100px,-58px)', '64%,84%': 'transform:translate(34px,-52px)', '100%': 'transform:translate(140px,-120px)' }) +
  kf('me-glow', { '0%,100%': 'opacity:.7', '50%': 'opacity:1' });

const poppy = (x: number, h: number, t: number, dl: number) =>
  `<g transform="translate(${x} 228)"><g ${an('me-sway', t, dl, 'transform-origin:0 0')}>` +
  `<path d="M0 0C-3 ${-h / 3} 3 ${-h * 0.66} 0 ${-h}" stroke="#4a7a3a" stroke-width="2.2" fill="none"/>` +
  `<path d="M0 ${-h * 0.4}C-12 ${-h * 0.4 - 8} -12 ${-h * 0.4 - 14} -8 ${-h * 0.4 - 16}" fill="#4a7a3a" stroke="#4a7a3a" stroke-width="1.4"/>` +
  `<g transform="translate(0 ${-h})"><circle cx="-6" cy="0" r="7" class="a1"/><circle cx="6" cy="0" r="7" class="a1"/><circle cx="0" cy="-6" r="7" class="a1"/><circle cx="0" cy="5" r="6.5" class="a1"/><circle cx="0" cy="0" r="3.2" fill="#2b2430"/></g>` +
  `</g></g>`;

const wingHalf = (flip: number) =>
  `<g transform="scale(${flip} 1)"><g ${an('me-wing', 2.6, 0, 'transform-origin:0 0')}><path d="M0 0C10 -14 24 -12 22 -2C20 6 8 6 0 2Z" class="a2"/><path d="M0 2C8 6 16 12 10 16C4 18 0 10 0 2Z" class="a2"/><path d="M4 -2L16 -8M4 2L18 0" stroke="#2b2430" stroke-width="1.2" opacity=".7"/></g></g>`;

const theme: ThemeModule = {
  id: 'memorial',
  label: 'Memorial Day',
  colors: ['#c8283a', '#f2923a', '#f4f4f0'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#7a9a60"/>` +
        poppy(30, 56, 7, 0) + poppy(66, 86, 8, -2) + poppy(104, 44, 6.5, -4) +
        // monarch butterfly drifts in and rests on the tall poppy
        `<g transform="translate(40 228)"><g ${an('me-fly', 20, 0, 'animation-timing-function:ease-in-out')}><g transform="scale(.9)">` +
        `<g transform="rotate(-20)">${wingHalf(1)}${wingHalf(-1)}<ellipse cx="0" cy="3" rx="1.8" ry="8" fill="#2b2430"/><path d="M-1 -4L-4 -10M1 -4L4 -10" stroke="#2b2430" stroke-width=".8" fill="none"/></g></g></g></g>`,
    ),
};

export default theme;
