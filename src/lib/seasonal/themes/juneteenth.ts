// Juneteenth: a quiet, hopeful scene. The sun rises very slowly over a hill while a songbird on a fence post
// glances around and sings. Colours follow the day's red, green and gold. 24 s loop, no fast motion.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('jt-sun', { '0%': 'transform:translateY(34px)', '100%': 'transform:translateY(-6px)' }) +
  kf('jt-rays', { '0%': 'transform:rotate(0)', '100%': 'transform:rotate(360deg)' }) +
  kf('jt-glow', { '0%,100%': 'opacity:.55', '50%': 'opacity:.9' }) +
  kf('jt-look', { '0%,20%': 'transform:rotate(0)', '28%,44%': 'transform:rotate(-10deg)', '52%,70%': 'transform:rotate(8deg)', '78%,100%': 'transform:rotate(0)' }) +
  kf('jt-bob', { '0%,100%': 'transform:translateY(0)', '50%': 'transform:translateY(-2.4px)' }) +
  kf('jt-note', { '0%,40%': 'transform:translate(0,0) scale(.6);opacity:0', '48%': 'opacity:.9', '70%': 'transform:translate(-16px,-34px) scale(1);opacity:0', '100%': 'opacity:0' });

const rays = Array.from({ length: 12 }, (_, i) => `<path d="M0 -34L-3 -48L3 -48Z" class="a3" transform="rotate(${i * 30})" opacity=".75"/>`).join('');

const theme: ThemeModule = {
  id: 'juneteenth',
  label: 'Juneteenth',
  colors: ['#c8283a', '#2f8f4e', '#f2b84b'],
  svg: () =>
    scene(
      CSS,
      `<defs><clipPath id="jt-clip"><rect x="0" y="0" width="196" height="214"/></clipPath></defs>` +
        `<g clip-path="url(#jt-clip)"><g transform="translate(130 196)"><g ${an('jt-sun', 24, 0, 'animation-direction:alternate')}>` +
        `<g ${an('jt-glow', 8)}><circle r="44" class="a3" opacity=".25"/></g><g ${an('jt-rays', 90, 0, 'animation-timing-function:linear')}>${rays}</g><circle r="30" class="a3"/>` +
        `</g></g></g>` +
        // hill and fence
        `<path d="M0 226C30 196 80 190 120 200C150 206 175 214 196 214V240H0Z" class="a2"/><path d="M0 240V228C40 214 90 214 130 222C160 228 180 226 196 224V240Z" fill="#256b3e"/>` +
        `<rect x="26" y="180" width="8" height="48" rx="2" fill="#8a5a34"/><path d="M-6 192H60M-6 208H60" stroke="#8a5a34" stroke-width="3"/>` +
        // songbird on the post
        `<g transform="translate(30 180)"><g ${an('jt-bob', 5)}>` +
        `<path d="M-12 -2C-22 0 -24 8 -26 12C-18 10 -10 8 -4 4Z" class="a1"/>` +
        `<ellipse cx="0" cy="-8" rx="12" ry="10" class="a1"/><ellipse cx="2" cy="-4" rx="7" ry="6" fill="#f4d8c8"/>` +
        `<path d="M-2 -8C-8 -14 -12 -4 -8 2" fill="#a81d2d"/>` +
        `<g ${an('jt-look', 24, 0, 'transform-origin:6px -12px')}><circle cx="8" cy="-18" r="7.4" class="a1"/><path d="M13 -19L20 -17L13 -15Z" fill="#f2a53b"/><circle cx="10" cy="-19" r="1.5" fill="#1f1a17"/><path d="M4 -24L6 -29L9 -24Z" class="a1"/></g>` +
        `<g ${an('jt-note', 24, 0)}><path d="M14 -30L14 -38L18 -39" stroke="#fff" stroke-width="1.4" fill="none" opacity=".9"/><circle cx="12.6" cy="-30" r="2" fill="#fff"/></g>` +
        `</g></g>`,
    ),
};

export default theme;
