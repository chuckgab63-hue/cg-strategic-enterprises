// St. Patrick's Day: a leprechaun clicks his heels in a big hop, tips his hat, and gold coins pop out of the
// pot at the end of a rainbow. 10 s loop.
import type { ThemeModule } from '../loaders';
import { an, arc, kf, scene } from './scene';

const CSS =
  kf('sp-hop', { '0%,12%': 'transform:translateY(0) scale(1,1)', '16%': 'transform:translateY(0) scale(1.08,.88)', '26%': 'transform:translateY(-34px) scale(.95,1.08)', '34%': 'transform:translateY(-34px) rotate(180deg)', '40%': 'transform:translateY(-34px) rotate(360deg)', '50%': 'transform:translateY(0) rotate(360deg) scale(1.1,.86)', '56%,100%': 'transform:translateY(0) rotate(360deg) scale(1,1)' }) +
  kf('sp-hat', { '0%,64%': 'transform:translateY(0) rotate(0)', '70%': 'transform:translate(-4px,-9px) rotate(-18deg)', '84%': 'transform:translate(-4px,-9px) rotate(-18deg)', '90%,100%': 'transform:translateY(0) rotate(0)' }) +
  kf('sp-pot', { '0%,52%': 'transform:rotate(0)', '56%': 'transform:rotate(-4deg)', '60%': 'transform:rotate(4deg)', '64%,100%': 'transform:rotate(0)' }) +
  kf('sp-glint', { '0%,100%': 'opacity:.4', '50%': 'opacity:1' }) +
  arc('sp-c1', 52, 62, -26, 46, 22) + arc('sp-c2', 56, 66, -48, 58, 22) + arc('sp-c3', 60, 70, 18, 52, 22);

const rainbow = ['#ff5d5d', '#ffa94d', '#ffe066', '#69db7c', '#4dabf7', '#9775fa']
  .map((c, i) => `<path d="M${-6 + i * 5} 232C${-6 + i * 5} 150 ${60 + i * 5} 96 ${130 + i * 3} 118" stroke="${c}" stroke-width="5.2" fill="none" opacity=".9"/>`)
  .join('');

const coin = (n: string) => `<g transform="translate(156 188)"><g ${an(n, 10, 0, 'opacity:0')}><g ${an(n + 'y', 10)}><circle r="5" fill="#f2c230" stroke="#c9961a" stroke-width="1.2"/><circle r="2.4" fill="none" stroke="#c9961a" stroke-width=".8"/></g></g></g>`;

const theme: ThemeModule = {
  id: 'st-patricks',
  label: "St. Patrick's Day",
  colors: ['#2f9e55', '#d4a017', '#ff6f3c'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#4f9a4a"/>` +
        rainbow +
        // pot of gold
        `<g transform="translate(156 214)"><g ${an('sp-pot', 10, 0, 'transform-origin:0 12px')}>` +
        `<ellipse cx="0" cy="-8" rx="18" ry="6" fill="#f2c230"/><circle cx="-8" cy="-12" r="5" fill="#f2c230" stroke="#c9961a" stroke-width="1"/><circle cx="4" cy="-14" r="5" fill="#f2c230" stroke="#c9961a" stroke-width="1"/><circle cx="12" cy="-10" r="4.4" fill="#f2c230" stroke="#c9961a" stroke-width="1"/>` +
        `<path d="M-20 -8C-22 14 -12 22 0 22C12 22 22 14 20 -8C12 -3 -12 -3 -20 -8Z" fill="#2b2f3a"/><rect x="-22" y="-10" width="44" height="5" rx="2" fill="#3b4050"/><path d="M-12 4C-10 10 -6 12 -4 12" stroke="#fff" stroke-width="1.6" fill="none" opacity=".3"/>` +
        `</g></g>` +
        coin('sp-c1') + coin('sp-c2') + coin('sp-c3') +
        // leprechaun
        `<g transform="translate(78 196)"><g ${an('sp-hop', 10, 0, 'transform-origin:0 30px')}>` +
        `<path d="M-7 18L-8 30M7 18L8 30" stroke="#2f7a4a" stroke-width="6" stroke-linecap="round"/><path d="M-12 30H-3M3 30H12" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M-14 18C-16 0 -10 -8 0 -8C10 -8 16 0 14 18Z" class="a1"/><rect x="-14" y="6" width="28" height="4" fill="#2b2118"/><rect x="-3" y="5" width="6" height="6" rx="1" fill="#f2c230"/>` +
        `<path d="M-14 4L-22 12M14 4L22 12" stroke="#2f9e55" stroke-width="5" stroke-linecap="round"/><circle cx="-22" cy="13" r="3" fill="#f9cfae"/><circle cx="22" cy="13" r="3" fill="#f9cfae"/>` +
        `<circle cx="0" cy="-14" r="9" fill="#f9cfae"/><path d="M-9 -12C-12 2 12 2 9 -12C6 -6 -6 -6 -9 -12Z" class="a3"/><circle cx="-3.4" cy="-15" r="1.2" fill="#1f1a17"/><circle cx="3.4" cy="-15" r="1.2" fill="#1f1a17"/><circle cx="0" cy="-12" r="1.6" fill="#f0a39a"/>` +
        `<g ${an('sp-hat', 10, 0, 'transform-origin:0 -20px')}><rect x="-8" y="-34" width="16" height="14" rx="1.5" class="a1"/><rect x="-13" y="-22" width="26" height="4" rx="1.5" class="a1"/><rect x="-8" y="-24" width="16" height="3" fill="#2b2118"/><rect x="-2.4" y="-25" width="4.8" height="5" fill="#f2c230"/></g>` +
        `</g></g>` +
        // lucky clovers
        `<g fill="#2f9e55"><circle cx="30" cy="222" r="3.4"/><circle cx="36" cy="222" r="3.4"/><circle cx="33" cy="217" r="3.4"/><circle cx="33" cy="226" r="3.4"/></g>`,
    ),
};

export default theme;
