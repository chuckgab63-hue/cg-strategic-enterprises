// Thanksgiving: a turkey fans his tail, glances hungrily at a pie, then sneakily drops a pilgrim hat on
// his head to look innocent. 12 s loop, slow movement only.
import type { ThemeModule } from '../loaders';
import { drift, leafShape } from './common';
import { an, kf, scene } from './scene';

const CSS =
  kf('tg-fan', { '0%': 'transform:scale(.55)', '14%': 'transform:scale(1.04)', '20%': 'transform:scale(1)', '84%': 'transform:scale(1)', '94%,100%': 'transform:scale(.55)' }) +
  kf('tg-look', { '0%,24%': 'transform:translateX(0)', '30%,52%': 'transform:translateX(2px)', '58%,100%': 'transform:translateX(0)' }) +
  kf('tg-hat', { '0%,44%': 'transform:translateY(-70px);opacity:0', '46%': 'opacity:1', '54%': 'transform:translateY(2px);animation-timing-function:ease-out', '58%': 'transform:translateY(-3px)', '62%,88%': 'transform:translateY(0);opacity:1', '94%,100%': 'transform:translateY(-70px);opacity:0' }) +
  kf('tg-bob', { '0%,100%': 'transform:rotate(-4deg)', '50%': 'transform:rotate(4deg)' }) +
  kf('tg-sniff', { '0%,28%': 'transform:translateY(0)', '34%': 'transform:translateY(-3px)', '40%': 'transform:translateY(0)', '46%': 'transform:translateY(-3px)', '52%,100%': 'transform:translateY(0)' });

const feathers = [-72, -36, 0, 36, 72]
  .map((deg, i) => `<g transform="rotate(${deg})"><path class="${['a1', 'a2', 'a3', 'a2', 'a1'][i]}" d="M0 0C-10 -22 -9 -44 0 -52C9 -44 10 -22 0 0Z"/><path d="M0 -8V-42" stroke="#fff" stroke-width="1.2" opacity=".5"/></g>`)
  .join('');

const theme: ThemeModule = {
  id: 'thanksgiving',
  label: 'Thanksgiving',
  colors: ['#c8531a', '#e0a020', '#8c3b1a'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#7a5230"/>` +
        // pie on a stump
        `<rect x="150" y="196" width="40" height="32" rx="3" fill="#8b5a30"/><ellipse cx="170" cy="196" rx="20" ry="5" fill="#a56d3a"/>` +
        `<path d="M152 194C152 178 188 178 188 194Z" fill="#d89a3c"/><path d="M152 194H188L184 202H156Z" fill="#c8842c"/>` +
        `<path d="M156 188L184 188M160 183L180 183" stroke="#a8631d" stroke-width="1.4"/>` +
        `<g stroke="#9aa0a8" stroke-width="2" fill="none" stroke-linecap="round"><path d="M164 176C160 170 168 166 164 160" class="an-steam" style="--t:3s"/><path d="M174 176C170 170 178 166 174 160" class="an-steam" style="--t:3.6s;--dl:-1s"/></g>` +
        // turkey
        `<g transform="translate(76 190)"><g ${an('tg-bob', 6)}>` +
        `<g transform="translate(0 -4)"><g ${an('tg-fan', 12, 0, 'transform-origin:0 0')}>${feathers}</g></g>` +
        `<path d="M-8 22L-10 36M8 22L10 36M-14 36H-6M6 36H14" stroke="#e0a020" stroke-width="3" stroke-linecap="round" fill="none"/>` +
        `<ellipse cx="0" cy="8" rx="19" ry="22" fill="#8c5a30"/><ellipse cx="0" cy="12" rx="12" ry="14" fill="#a8743f"/>` +
        `<g ${an('tg-sniff', 12)}>` +
        `<circle cx="0" cy="-14" r="11" fill="#8c5a30"/>` +
        `<path d="M-1 -10L9 -7L-1 -4Z" fill="#f2b705"/><path d="M0 -4C2 4 6 4 5 -3Z" fill="#d62f3a"/>` +
        `<circle cx="-5" cy="-17" r="3.8" fill="#fff"/><circle cx="4" cy="-17" r="3.8" fill="#fff"/>` +
        `<g ${an('tg-look', 12)}><circle cx="-5" cy="-17" r="1.7" fill="#1f1a17"/><circle cx="4" cy="-17" r="1.7" fill="#1f1a17"/></g>` +
        `<g ${an('tg-hat', 12)}><path d="M-9 -22H9L7 -36H-7Z" fill="#2b2430"/><rect x="-13" y="-24" width="26" height="4" rx="1" fill="#2b2430"/><rect x="-7" y="-27" width="14" height="3" fill="#e0a020"/><rect x="-2" y="-27.5" width="4" height="4" fill="#fff"/></g>` +
        `</g></g></g>` +
        drift(30, 20, 12, 0, leafShape('a1'), 220) + drift(110, -16, 14, -5, leafShape('a2'), -200) + drift(205, 18, 13, -9, leafShape('a3'), 240),
    ),
};

export default theme;
