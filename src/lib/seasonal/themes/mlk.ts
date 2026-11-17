// Martin Luther King Jr. Day: a quiet scene. A white dove carrying an olive branch glides slowly across a
// warm dawn glow. No jokes, no fast motion. 24 s crossing, 3 s wingbeat.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('ml-glide', { '0%': 'transform:translateX(-60px)', '100%': 'transform:translateX(300px)' }) +
  kf('ml-bob', { '0%,100%': 'transform:translateY(-6px)', '50%': 'transform:translateY(6px)' }) +
  kf('ml-wing', { '0%,100%': 'transform:rotate(-14deg)', '50%': 'transform:rotate(26deg)' }) +
  kf('ml-glow', { '0%,100%': 'opacity:.35', '50%': 'opacity:.7' });

const dove =
  `<g ${an('ml-wing', 3, 0, 'transform-origin:-2px -2px')}><path d="M-2 -2C-10 -30 -28 -36 -34 -30C-24 -26 -16 -14 -8 2Z" fill="#fff" stroke="#d6dde8" stroke-width="1"/></g>` +
  `<path d="M-18 6C-30 10 -34 18 -36 24C-26 20 -18 18 -10 12Z" fill="#f2f5fa" stroke="#d6dde8" stroke-width="1"/>` +
  `<ellipse cx="0" cy="4" rx="17" ry="9" fill="#fff" stroke="#d6dde8" stroke-width="1"/><circle cx="16" cy="-3" r="7" fill="#fff" stroke="#d6dde8" stroke-width="1"/>` +
  `<path d="M22 -4L29 -2L22 0Z" fill="#f2a53b"/><circle cx="18" cy="-5" r="1.3" fill="#1f1a17"/>` +
  `<path d="M29 -1C36 4 42 2 46 -4" stroke="#6b8f3a" stroke-width="1.6" fill="none"/><path d="M36 3C34 -2 38 -4 40 0ZM41 0C40 -5 44 -6 46 -2Z" fill="#6b8f3a"/>` +
  `<g ${an('ml-wing', 3, -0.4, 'transform-origin:2px 0px')}><path d="M2 0C-2 -28 -16 -40 -24 -36C-14 -28 -8 -14 -2 4Z" fill="#fff" stroke="#d6dde8" stroke-width="1" opacity=".95"/></g>`;

const theme: ThemeModule = {
  id: 'mlk',
  label: 'Martin Luther King Jr. Day',
  colors: ['#f2b84b', '#7fb2d9', '#fbe3a8'],
  svg: () =>
    scene(
      CSS,
      `<g ${an('ml-glow', 8, 0, 'opacity:.5')}><circle cx="40" cy="214" r="46" class="a3"/><circle cx="40" cy="214" r="30" class="a1" opacity=".6"/></g>` +
        `<path d="M0 226H196V240H0Z" fill="#c9d8e6"/>` +
        `<g transform="translate(0 130)"><g ${an('ml-glide', 24, 0, 'animation-timing-function:linear')}><g ${an('ml-bob', 6)}><g transform="translate(40 0)">${dove}</g></g></g></g>`,
    ),
};

export default theme;
