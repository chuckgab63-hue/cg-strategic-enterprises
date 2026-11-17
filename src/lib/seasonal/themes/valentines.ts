// Valentine's Day: a chubby cupid hovers and shoots an arrow that totally misses, shrugs, then lands the
// second shot in a big heart, which wobbles and releases little hearts. 12 s loop.
import type { ThemeModule } from '../loaders';
import { heartShape } from './common';
import { an, kf, scene } from './scene';

const CSS =
  kf('vd-hover', { '0%,100%': 'transform:translateY(-4px)', '50%': 'transform:translateY(5px)' }) +
  kf('vd-wing', { '0%,100%': 'transform:rotate(0)', '50%': 'transform:rotate(-16deg)' }) +
  kf('vd-bow', { '0%,10%': 'transform:translateX(0)', '16%': 'transform:translateX(-4px)', '20%,50%': 'transform:translateX(0)', '56%': 'transform:translateX(-4px)', '60%,100%': 'transform:translateX(0)' }) +
  kf('vd-miss', { '0%,18%': 'transform:translate(0,0);opacity:0', '19%': 'opacity:1', '40%': 'transform:translate(230px,-120px);opacity:1', '42%,100%': 'transform:translate(230px,-120px);opacity:0' }) +
  kf('vd-hit', { '0%,58%': 'transform:translate(0,0);opacity:0', '59%': 'opacity:1', '66%': 'transform:translate(96px,70px);opacity:1', '90%': 'transform:translate(96px,70px);opacity:1', '97%,100%': 'transform:translate(96px,70px);opacity:0' }) +
  kf('vd-shrug', { '0%,24%': 'transform:rotate(0)', '28%': 'transform:rotate(-8deg) translateY(2px)', '34%': 'transform:rotate(7deg) translateY(2px)', '40%,100%': 'transform:rotate(0)' }) +
  kf('vd-heart', { '0%,66%': 'transform:scale(1)', '70%': 'transform:scale(.92,1.1)', '74%': 'transform:scale(1.14,.92)', '80%': 'transform:scale(.97,1.04)', '86%,100%': 'transform:scale(1)' }) +
  kf('vd-pop', { '0%,70%': 'transform:translate(0,0) scale(.2);opacity:0', '74%': 'opacity:1', '98%': 'transform:translate(var(--dx),-80px) scale(1);opacity:0', '100%': 'opacity:0' });

const mini = (dx: number, dl: number, cls: string) =>
  `<g transform="translate(176 156)"><g ${an('vd-pop', 12, dl, `--dx:${dx}px`)}>${heartShape(cls, 1.1)}</g></g>`;

const theme: ThemeModule = {
  id: 'valentines',
  label: "Valentine's Day",
  colors: ['#e8456b', '#ff8fab', '#c77dff'],
  svg: () =>
    scene(
      CSS,
      // cloud with target heart
      `<g transform="translate(176 206)"><ellipse cx="0" cy="12" rx="40" ry="10" fill="#fff" stroke="#e3d7ee" stroke-width="1"/><ellipse cx="-22" cy="8" rx="14" ry="10" fill="#fff"/><ellipse cx="20" cy="6" rx="16" ry="11" fill="#fff"/>` +
        `<g transform="translate(0 -18)"><g ${an('vd-heart', 12, 0, 'transform-origin:0 18px')}><path class="a1" transform="scale(4.2)" d="M0 4C-7 -1 -5 -7 0 -3C5 -7 7 -1 0 4Z"/><circle cx="-8" cy="-6" r="2.6" fill="#fff" opacity=".5"/></g></g></g>` +
        mini(-30, 0, 'a2') + mini(10, -0.4, 'a3') + mini(40, -0.8, 'a2') +
        // missed arrow
        `<g transform="translate(60 120)"><g ${an('vd-miss', 12, 0, 'animation-timing-function:linear')}><g transform="rotate(-28)"><path d="M-14 0H22" stroke="#7a5230" stroke-width="2"/><path d="M22 0L16 -4V4Z" fill="#c8c8d0"/><path d="M-14 0L-20 -4M-14 0L-20 4" stroke="#e8456b" stroke-width="2"/></g></g></g>` +
        // arrow that hits (aimed at the heart)
        `<g transform="translate(80 138)"><g ${an('vd-hit', 12, 0, 'animation-timing-function:ease-in')}><g transform="rotate(36)"><path d="M-14 0H22" stroke="#7a5230" stroke-width="2"/><path d="M22 0L16 -4V4Z" fill="#c8c8d0"/><path d="M-14 0L-20 -4M-14 0L-20 4" stroke="#e8456b" stroke-width="2"/></g></g></g>` +
        // cupid
        `<g transform="translate(50 130)"><g ${an('vd-hover', 4)}><g ${an('vd-shrug', 12, 0, 'transform-origin:0 12px')}>` +
        `<g transform="translate(-9 -6)"><g ${an('vd-wing', 1.3, 0, 'transform-origin:2px 4px')}><path d="M2 4C-12 -14 -26 -2 -22 12C-16 4 -8 8 2 4Z" fill="#fff" stroke="#e3d7ee" stroke-width="1"/></g></g>` +
        `<g transform="translate(9 -6) scale(-1 1)"><g ${an('vd-wing', 1.3, 0.2, 'transform-origin:2px 4px')}><path d="M2 4C-12 -14 -26 -2 -22 12C-16 4 -8 8 2 4Z" fill="#fff" stroke="#e3d7ee" stroke-width="1"/></g></g>` +
        `<path d="M-6 20L-8 30M6 20L8 30" stroke="#f6c3a0" stroke-width="5" stroke-linecap="round"/>` +
        `<ellipse cx="0" cy="8" rx="11" ry="13" fill="#f9cfae"/><circle cx="0" cy="-10" r="10" fill="#f9cfae"/>` +
        `<path d="M-9 -14C-8 -22 8 -22 9 -14C4 -17 -4 -17 -9 -14Z" fill="#f2c230"/>` +
        `<circle cx="-3.6" cy="-10" r="1.3" fill="#1f1a17"/><circle cx="3.6" cy="-10" r="1.3" fill="#1f1a17"/><circle cx="-6.4" cy="-6" r="2" fill="#f28aa0" opacity=".7"/><circle cx="6.4" cy="-6" r="2" fill="#f28aa0" opacity=".7"/><path d="M-2 -5Q0 -3 2 -5" stroke="#c0605a" stroke-width="1" fill="none"/>` +
        `<path d="M-10 10L-14 14Q-18 8 -12 2" fill="#f9cfae"/>` +
        `<g ${an('vd-bow', 12)}><path d="M16 -8C30 -2 30 18 16 24" stroke="#7a5230" stroke-width="2.4" fill="none"/><path d="M16 -8L16 24" stroke="#e8456b" stroke-width=".8"/></g>` +
        `<path d="M-5 14H5L3 18H-3Z" fill="#fff" stroke="#e3d7ee" stroke-width=".6"/>` +
        `</g></g></g>`,
    ),
};

export default theme;
