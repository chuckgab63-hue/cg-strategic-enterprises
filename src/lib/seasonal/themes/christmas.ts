// Christmas: Santa drops feet-first toward a snowy chimney with his sack, gets his big belly stuck,
// wiggles, pops through, then presents shoot out onto the roof and he pops up to wave. 16 s loop.
// Nothing flashes: all motion is slow position changes. Reduced motion shows Santa stuck in the chimney.
import type { ThemeModule } from '../loaders';
import { drift } from './common';
import { an, arc, kf, scene } from './scene';

const present = (cls: string, ribbon: string, w: number, h: number) =>
  `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="1.5" class="${cls}"/>` +
  `<rect x="-1.5" y="${-h}" width="3" height="${h}" class="${ribbon}"/>` +
  `<path class="${ribbon}" d="M0 ${-h}C-5 ${-h - 8} -9 ${-h - 2} 0 ${-h}C9 ${-h - 2} 5 ${-h - 8} 0 ${-h}Z"/>`;

const santaHead =
  `<circle cx="0" cy="-26" r="10" fill="#f6d2b0"/>` +
  `<circle cx="-4" cy="-27" r="1.1" fill="#1f1a17"/><circle cx="4" cy="-27" r="1.1" fill="#1f1a17"/>` +
  `<circle cx="-6.5" cy="-23.5" r="2" fill="#f0a39a" opacity="0.7"/><circle cx="6.5" cy="-23.5" r="2" fill="#f0a39a" opacity="0.7"/>` +
  `<circle cx="0" cy="-24.5" r="2.4" fill="#e68a80"/>` +
  `<path d="M-10 -25C-13 -9 13 -9 10 -25C6 -17 -6 -17 -10 -25Z" fill="#fff"/>` +
  `<path d="M-3 -19Q0 -16 3 -19" stroke="#c0605a" stroke-width="1.2" fill="none"/>` +
  `<path class="a1" d="M-11 -32C-10 -48 6 -52 17 -42C9 -42 9 -37 11 -32Z"/>` +
  `<rect x="-12" y="-35" width="24" height="6" rx="3" fill="#fff"/><circle cx="17" cy="-42" r="4.2" fill="#fff"/>`;

const santaBody =
  `<g transform="translate(24 -18) rotate(18)"><ellipse rx="11" ry="14" fill="#b58a52"/><path d="M-4 -12Q0 -17 4 -12" stroke="#7d5a2c" stroke-width="2" fill="none"/>` +
  `<rect x="-6" y="-16" width="6" height="6" class="a2"/><rect x="1" y="-18" width="6" height="6" class="a3"/></g>` +
  `<rect x="-14" y="14" width="10" height="14" class="a1"/><rect x="4" y="14" width="10" height="14" class="a1"/>` +
  `<rect x="-15" y="26" width="12" height="9" rx="3" fill="#2b2118"/><rect x="3" y="26" width="12" height="9" rx="3" fill="#2b2118"/>` +
  `<ellipse rx="22" ry="20" class="a1"/><rect x="-22" y="-3" width="44" height="6" fill="#2b2118"/><rect x="-4" y="-4" width="8" height="8" rx="1" fill="#f2c230"/>` +
  `<rect x="-5" y="-26" width="10" height="26" rx="5" class="a1" transform="translate(-19 -6) rotate(28)"/>` +
  `<rect x="-5" y="-26" width="10" height="26" rx="5" class="a1" transform="translate(19 -6) rotate(-28)"/>` +
  `<circle cx="-31" cy="-30" r="5" fill="#fff"/><circle cx="31" cy="-30" r="5" fill="#fff"/>` +
  santaHead;

// y offsets are relative to the stuck pose (belt at the chimney rim).
const CSS =
  kf('xm-drop', {
    '0%': 'transform:translateY(-300px) rotate(-8deg);animation-timing-function:ease-in',
    '18%': 'transform:translateY(-34px) rotate(3deg)',
    '22%': 'transform:translateY(0) scale(1,1);animation-timing-function:ease-out',
    '26%': 'transform:translateY(0) rotate(6deg) scale(1.05,.97)',
    '30%': 'transform:translateY(0) rotate(-6deg) scale(.97,1.04)',
    '34%': 'transform:translateY(0) rotate(5deg) scale(1.05,.97)',
    '38%': 'transform:translateY(0) rotate(-5deg) scale(.97,1.04)',
    '42%': 'transform:translateY(-4px) scale(1.08,.94)',
    '45%': 'transform:translateY(8px) scale(1,1);animation-timing-function:ease-in',
    '50%': 'transform:translateY(90px)',
    '100%': 'transform:translateY(90px)',
  }) +
  kf('xm-peek', {
    '0%': 'transform:translateY(46px)', '66%': 'transform:translateY(46px);animation-timing-function:ease-out',
    '72%': 'transform:translateY(-6px)', '88%': 'transform:translateY(-6px);animation-timing-function:ease-in',
    '94%': 'transform:translateY(46px)', '100%': 'transform:translateY(46px)',
  }) +
  kf('xm-wave', { '0%,100%': 'transform:rotate(8deg)', '50%': 'transform:rotate(38deg)' }) +
  arc('xm-p1', 46, 54, 62, 52, 56) +
  arc('xm-p2', 51, 59, 98, 62, 56) +
  arc('xm-p3', 56, 64, 134, 70, 56);

const flake = (r: number) => `<circle r="${r}" fill="#eaf4ff" stroke="#9dbbdc" stroke-width="0.5"/>`;

const presents = (
  [['a2', 'a3', 18, 15, 'xm-p1'], ['a3', 'a1', 16, 18, 'xm-p2'], ['a1', 'a2', 20, 13, 'xm-p3']] as const
)
  .map(
    ([c, r, w, h, n]) =>
      `<g transform="translate(71 150)"><g ${an(n, 16, 0, 'opacity:0')}><g ${an(n + 'y', 16)}>${present(c, r, w, h)}</g></g></g>`,
  )
  .join('');

const theme: ThemeModule = {
  id: 'christmas',
  label: 'Christmas',
  colors: ['#d62f3a', '#2fa15a', '#f2c230'],
  svg: () =>
    scene(
      CSS,
      `<defs><clipPath id="xm-clip"><rect x="0" y="-400" width="240" height="546"/></clipPath></defs>` +
        // roof and snow
        `<path d="M0 214H196V240H0Z" fill="#6b5a52"/><path d="M0 214C20 208 30 214 52 210C80 205 100 214 130 210C150 206 170 213 196 209V222H0Z" fill="#fff"/>` +
        // chimney body
        `<rect x="50" y="150" width="42" height="66" fill="#a8523f"/>` +
        `<g stroke="#7a3a2c" stroke-width="1" opacity=".6"><path d="M50 164H92M50 178H92M50 192H92M50 206H92M64 150V164M78 164V178M64 178V192M78 192V206M64 206V216" fill="none"/></g>` +
        // Santa: drops in, gets stuck, wiggles, pops down. Clipped so he vanishes into the chimney.
        `<g clip-path="url(#xm-clip)"><g transform="translate(71 146)"><g ${an('xm-drop', 16, 0, 'transform-origin:0 0')}>${santaBody}</g></g></g>` +
        presents +
        // Santa pops up to wave
        `<g clip-path="url(#xm-clip)"><g transform="translate(71 146)"><g ${an('xm-peek', 16)}>` +
        `<rect x="-17" y="-14" width="34" height="44" rx="13" class="a1"/><rect x="-17" y="-2" width="34" height="5" fill="#2b2118"/>` +
        santaHead +
        `<g transform="translate(15 -7)"><g ${an('xm-wave', 1.6, 0, 'transform-origin:0 0')}><rect x="-5" y="-24" width="10" height="26" rx="5" class="a1"/><circle cy="-26" r="5.5" fill="#fff"/></g></g>` +
        `</g></g></g>` +
        // chimney cap and snow
        `<rect x="45" y="144" width="52" height="9" rx="2" fill="#8c3f30"/><path d="M44 146C50 136 60 142 70 137C80 142 90 136 98 146Z" fill="#fff"/>` +
        drift(120, 14, 10, 0, flake(1.8), 0) +
        drift(160, -12, 12, -4, flake(1.3), 0) +
        drift(200, 12, 9.5, -7, flake(1.6), 0) +
        drift(25, -10, 13, -2, flake(1.4), 0),
    ),
};

export default theme;
