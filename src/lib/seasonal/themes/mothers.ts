// Mother's Day: a mama duck leads three ducklings across, but the last duckling stops to sniff a flower,
// then waddles hard to catch up and hands her the flower. 14 s loop; hearts float gently above mama.
import type { ThemeModule } from '../loaders';
import { heartShape } from './common';
import { an, kf, scene } from './scene';

const CSS =
  kf('mo-walk', { '0%': 'transform:translateX(-70px)', '100%': 'transform:translateX(300px)' }) +
  // the straggler: normal pace, stops at the flower, then dashes to catch up
  kf('mo-late', { '0%': 'transform:translateX(-110px)', '36%': 'transform:translateX(52px)', '58%': 'transform:translateX(52px)', '72%': 'transform:translateX(130px)', '100%': 'transform:translateX(300px)' }) +
  kf('mo-waddle', { '0%,100%': 'transform:rotate(-6deg) translateY(0)', '50%': 'transform:rotate(6deg) translateY(-2px)' }) +
  kf('mo-sniff', { '0%,32%': 'transform:rotate(0)', '40%,56%': 'transform:rotate(38deg)', '62%,100%': 'transform:rotate(0)' }) +
  kf('mo-heart', { '0%,100%': 'transform:translateY(0) scale(1);opacity:.85', '50%': 'transform:translateY(-8px) scale(1.15);opacity:1' }) +
  kf('mo-flower', { '0%,56%': 'opacity:1', '58%,92%': 'opacity:0', '96%,100%': 'opacity:1' }) +
  kf('mo-held', { '0%,56%': 'opacity:0', '58%,100%': 'opacity:1' });

const duck = (s: number, cls: string, withHeart = false, late = false) =>
  `<g transform="scale(${s})"><g ${an('mo-waddle', late ? 0.6 : 0.9)}>` +
  `<ellipse cx="0" cy="0" rx="14" ry="10" class="${cls}"/><path d="M-12 -2C-20 -8 -22 2 -14 4Z" class="${cls}"/>` +
  `<g ${late ? an('mo-sniff', 14, 0, 'transform-origin:8px -4px') : ''}><circle cx="9" cy="-10" r="7" class="${cls}"/><path d="M14 -10L22 -8L14 -6Z" fill="#f28a1e"/><circle cx="11" cy="-12" r="1.5" fill="#1f1a17"/></g>` +
  `<ellipse cx="-2" cy="1" rx="8" ry="5" fill="#fff" opacity=".35"/>` +
  `<path d="M-3 9L-4 14M5 9L6 14" stroke="#f28a1e" stroke-width="2" stroke-linecap="round"/>` +
  `</g>${withHeart ? `<g transform="translate(6 -26)"><g ${an('mo-heart', 3)}>${heartShape('a1', 1.1)}</g></g>` : ''}</g>`;

const theme: ThemeModule = {
  id: 'mothers',
  label: "Mother's Day",
  colors: ['#ff8fab', '#ffd166', '#8ecae6'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#8fcf7a"/>` +
        // the flower the late duckling finds
        `<g transform="translate(80 216)"><g ${an('mo-flower', 14)}><path d="M0 10V-6" stroke="#4a9a3a" stroke-width="2"/>` +
        `<g fill="#fff">${[0, 60, 120, 180, 240, 300].map((d) => `<ellipse cx="0" cy="-12" rx="2.6" ry="4.4" transform="rotate(${d} 0 -6)"/>`).join('')}</g><circle cx="0" cy="-6" r="3" class="a2"/></g></g>` +
        // mama and two on-time ducklings
        `<g transform="translate(0 210)"><g ${an('mo-walk', 14, 0, 'animation-timing-function:linear')}>` +
        `<g transform="translate(60 0)">${duck(1.35, 'a2', true)}</g>` +
        `</g></g>` +
        `<g transform="translate(0 214)"><g ${an('mo-walk', 14, 1.2, 'animation-timing-function:linear')}><g transform="translate(60 0)">${duck(0.8, 'a2')}</g></g></g>` +
        `<g transform="translate(0 214)"><g ${an('mo-walk', 14, 2.3, 'animation-timing-function:linear')}><g transform="translate(60 0)">${duck(0.8, 'a2')}</g></g></g>` +
        // the straggler
        `<g transform="translate(0 214)"><g ${an('mo-late', 14, 0, 'animation-timing-function:ease-in-out')}><g transform="translate(60 0)">${duck(0.8, 'a3', false, true)}` +
        `<g ${an('mo-held', 14)}><g transform="translate(18 -10) scale(.55)"><path d="M0 10V-6" stroke="#4a9a3a" stroke-width="2"/><g fill="#fff">${[0, 60, 120, 180, 240, 300].map((d) => `<ellipse cx="0" cy="-12" rx="2.6" ry="4.4" transform="rotate(${d} 0 -6)"/>`).join('')}</g><circle cx="0" cy="-6" r="3" class="a2"/></g></g></g></g></g>`,
    ),
};

export default theme;
