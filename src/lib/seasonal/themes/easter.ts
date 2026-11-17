// Easter: a painted egg wobbles and cracks, the top pops off and a chick pops out wearing the shell as a hat,
// while a bunny hops by with an egg basket. 12 s loop.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('ea-wobble', { '0%,8%': 'transform:rotate(0)', '12%': 'transform:rotate(-9deg)', '16%': 'transform:rotate(9deg)', '20%': 'transform:rotate(-9deg)', '24%': 'transform:rotate(7deg)', '28%': 'transform:rotate(-5deg)', '32%,100%': 'transform:rotate(0)' }) +
  kf('ea-crack', { '0%,30%': 'opacity:0', '32%,40%': 'opacity:1', '41%,100%': 'opacity:0' }) +
  kf('ea-egg', { '0%,40%': 'opacity:1', '41%,92%': 'opacity:0', '96%,100%': 'opacity:1' }) +
  kf('ea-top', { '0%,40%': 'transform:translate(0,0) rotate(0);opacity:0', '41%': 'opacity:1', '50%': 'transform:translate(-6px,-34px) rotate(-30deg)', '58%': 'transform:translate(-10px,-12px) rotate(-60deg)', '90%': 'transform:translate(-10px,-12px) rotate(-60deg);opacity:1', '96%,100%': 'opacity:0' }) +
  kf('ea-chick', { '0%,40%': 'transform:translateY(34px) scale(.7)', '48%': 'transform:translateY(-8px) scale(1.05)', '54%': 'transform:translateY(0) scale(1)', '60%': 'transform:translateY(0) rotate(-8deg)', '66%': 'transform:rotate(8deg)', '72%': 'transform:rotate(-6deg)', '78%,88%': 'transform:rotate(0)', '94%,100%': 'transform:translateY(34px) scale(.7)' }) +
  kf('ea-cross', { '0%,40%': 'transform:translateX(-70px)', '96%,100%': 'transform:translateX(320px)' }) +
  kf('ea-hop', { '0%,100%': 'transform:translateY(0)', '50%': 'transform:translateY(-22px)' }) +
  kf('ea-ear', { '0%,100%': 'transform:rotate(0)', '50%': 'transform:rotate(-14deg)' });

const eggShape = `<path d="M0 -26C14 -26 20 -6 20 6C20 18 10 26 0 26C-10 26 -20 18 -20 6C-20 -6 -14 -26 0 -26Z"`;

const theme: ThemeModule = {
  id: 'easter',
  label: 'Easter',
  colors: ['#f48fb1', '#7fd6c2', '#ffd54f'],
  svg: () =>
    scene(
      CSS,
      `<defs><clipPath id="ea-clip"><rect x="-40" y="-60" width="80" height="108"/></clipPath></defs>` +
        `<path d="M0 226H196V240H0Z" fill="#9ed67a"/><g fill="#7cc15a"><path d="M10 226L12 216L16 226ZM20 226L24 212L28 226ZM200 226L204 214L208 226Z"/></g>` +
        // the egg that hatches
        `<g transform="translate(88 198)">` +
        // chick (behind the shell halves, pops up out of the egg)
        `<g clip-path="url(#ea-clip)"><g ${an('ea-chick', 12)}>` +
        `<ellipse cx="0" cy="8" rx="15" ry="16" fill="#ffe066"/><circle cx="0" cy="-8" r="11" fill="#ffe066"/>` +
        `<circle cx="-4" cy="-9" r="2.4" fill="#fff"/><circle cx="4" cy="-9" r="2.4" fill="#fff"/><circle cx="-3.6" cy="-8.6" r="1.1" fill="#1f1a17"/><circle cx="4.4" cy="-8.6" r="1.1" fill="#1f1a17"/>` +
        `<path d="M-3 -4L3 -4L0 1Z" fill="#f28a1e"/><circle cx="-8" cy="-4" r="2" fill="#f8b6c6" opacity=".7"/><circle cx="8" cy="-4" r="2" fill="#f8b6c6" opacity=".7"/>` +
        `<path d="M-1 -19C-4 -25 -8 -22 -6 -19M2 -19C4 -25 9 -22 6 -19" fill="#ffe066"/>` +
        `<path d="M-14 4C-24 2 -24 14 -14 12M14 4C24 2 24 14 14 12" fill="#ffe066"/>` +
        `</g></g>` +
        // egg bottom half (always there once hatched), with jagged edge
        `<g ${an('ea-wobble', 12, 0, 'transform-origin:0 26px')}>` +
        `<g ${an('ea-egg', 12)}>${eggShape} class="a1"/><path d="M-18 -6L-12 -2L-6 -8L0 -2L6 -8L12 -2L18 -6" stroke="#fff" stroke-width="3" fill="none"/><circle cx="-8" cy="8" r="3" class="a3"/><circle cx="8" cy="12" r="3.4" class="a3"/><circle cx="2" cy="-14" r="2.4" class="a3"/>` +
        `<path d="M-4 -20L2 -10L-3 -4L3 4" stroke="#7a4a58" stroke-width="1.6" fill="none" ${an('ea-crack', 12)}/></g>` +
        `<g clip-path="url(#ea-clip)"><path d="M-20 6C-20 18 -10 26 0 26C10 26 20 18 20 6L20 2L12 -2L6 -6L0 -2L-6 -6L-12 -2L-20 2Z" class="a1"/><path d="M-18 8C-12 11 12 11 18 8" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/></g>` +
        `</g>` +
        // flying shell top
        `<g transform="translate(0 -4)"><g ${an('ea-top', 12, 0, 'transform-origin:0 0')}><path d="M-20 4C-20 -6 -14 -26 0 -26C14 -26 20 -6 20 4L12 0L6 -4L0 0L-6 -4L-12 0Z" class="a1"/><circle cx="0" cy="-16" r="2.6" class="a3"/></g></g>` +
        `</g>` +
        // bunny hopping across with a basket
        `<g transform="translate(0 200)"><g ${an('ea-cross', 12, 0, 'animation-timing-function:linear')}><g ${an('ea-hop', 1.5)}>` +
        `<ellipse cx="0" cy="0" rx="16" ry="12" fill="#fff" stroke="#e3dde8" stroke-width="1"/><circle cx="-17" cy="-4" r="4.4" fill="#fff"/><circle cx="-16" cy="2" r="3.6" fill="#fff"/>` +
        `<circle cx="14" cy="-10" r="10" fill="#fff" stroke="#e3dde8" stroke-width="1"/>` +
        `<g ${an('ea-ear', 1.5, 0, 'transform-origin:12px -18px')}><ellipse cx="11" cy="-30" rx="3.4" ry="12" fill="#fff" stroke="#e3dde8" stroke-width="1"/><ellipse cx="11" cy="-30" rx="1.6" ry="9" class="a1"/></g>` +
        `<ellipse cx="17" cy="-30" rx="3.4" ry="12" fill="#fff" stroke="#e3dde8" stroke-width="1" transform="rotate(10 17 -20)"/>` +
        `<circle cx="18" cy="-12" r="1.5" fill="#1f1a17"/><circle cx="23" cy="-8" r="1.8" fill="#f48fb1"/>` +
        `<path d="M2 8L4 14M-8 8L-10 14M10 8L16 12" stroke="#fff" stroke-width="4" stroke-linecap="round"/>` +
        `<g transform="translate(24 4)"><path d="M-10 0C-10 10 10 10 10 0Z" fill="#c89a62"/><path d="M-10 0C-4 -9 4 -9 10 0" stroke="#8a5a34" stroke-width="1.6" fill="none"/><circle cx="-3" cy="-3" r="3" class="a2"/><circle cx="3" cy="-3" r="3" class="a3"/></g>` +
        `</g></g></g>`,
    ),
};

export default theme;
