// Labor Day: a mole in a hard hat pops out of a dirt mound, hammers a nail (with a thumbs up), flings dirt,
// and ducks back down. 10 s loop.
import type { ThemeModule } from '../loaders';
import { an, arc, kf, scene } from './scene';

const CSS =
  kf('lb-pop', { '0%,8%': 'transform:translateY(60px)', '16%': 'transform:translateY(-6px);animation-timing-function:ease-out', '20%,80%': 'transform:translateY(0)', '88%,100%': 'transform:translateY(60px)' }) +
  kf('lb-hammer', { '0%,28%': 'transform:rotate(-70deg)', '32%': 'transform:rotate(10deg)', '38%': 'transform:rotate(-70deg)', '42%': 'transform:rotate(10deg)', '48%': 'transform:rotate(-70deg)', '52%': 'transform:rotate(10deg)', '58%,100%': 'transform:rotate(-70deg)' }) +
  kf('lb-nail', { '0%,30%': 'transform:translateY(0)', '32%,38%': 'transform:translateY(2px)', '42%,48%': 'transform:translateY(4px)', '52%,100%': 'transform:translateY(6px)' }) +
  kf('lb-hat', { '0%,60%': 'transform:translateY(0) rotate(0)', '66%': 'transform:translate(0,-8px) rotate(-14deg)', '76%': 'transform:translate(0,-8px) rotate(-14deg)', '82%,100%': 'transform:translateY(0) rotate(0)' }) +
  kf('lb-thumb', { '0%,58%': 'opacity:0', '60%,78%': 'opacity:1', '82%,100%': 'opacity:0' }) +
  arc('lb-d1', 10, 20, -34, 40, 22) + arc('lb-d2', 12, 22, 30, 48, 22) + arc('lb-d3', 14, 24, -10, 56, 22);

const dirt = (n: string, x: number) => `<g transform="translate(${x} 214)"><g ${an(n, 10, 0, 'opacity:0')}><g ${an(n + 'y', 10)}><circle r="3.6" fill="#7a5230"/><circle cx="3" cy="2" r="2" fill="#8a6038"/></g></g></g>`;

const theme: ThemeModule = {
  id: 'labor',
  label: 'Labor Day',
  colors: ['#f2b705', '#2f6fb5', '#d62f3a'],
  svg: () =>
    scene(
      CSS,
      `<defs><clipPath id="lb-clip"><rect x="-20" y="-120" width="200" height="333"/></clipPath></defs>` +
        `<path d="M0 214H196V240H0Z" fill="#7a5230"/><path d="M0 214C30 206 60 210 90 206C120 202 150 210 180 206V216H0Z" fill="#8f6238"/>` +
        // board with a nail
        `<g transform="translate(150 208)"><rect x="-26" y="-6" width="52" height="8" rx="1.5" fill="#d6b27a" stroke="#a8844c" stroke-width="1"/>` +
        `<g ${an('lb-nail', 10)}><rect x="-1.2" y="-16" width="2.4" height="12" fill="#9aa0a8"/><rect x="-3.4" y="-17" width="6.8" height="2.4" rx="1" fill="#6f747c"/></g></g>` +
        // mole in the mound
        `<g clip-path="url(#lb-clip)"><g transform="translate(76 214)"><g ${an('lb-pop', 10)}>` +
        `<ellipse cx="0" cy="-4" rx="22" ry="26" fill="#6b5a62"/><ellipse cx="0" cy="2" rx="13" ry="16" fill="#8d7c84"/>` +
        `<circle cx="0" cy="-32" r="16" fill="#6b5a62"/><ellipse cx="0" cy="-26" rx="10" ry="7" fill="#8d7c84"/>` +
        `<circle cx="0" cy="-29" r="4" fill="#f28aa0"/><path d="M-5 -25Q0 -21 5 -25" stroke="#2b2430" stroke-width="1.2" fill="none"/>` +
        `<circle cx="-7" cy="-36" r="2.8" fill="#fff"/><circle cx="7" cy="-36" r="2.8" fill="#fff"/><circle cx="-6.6" cy="-35.6" r="1.1" fill="#1f1a17"/><circle cx="7.4" cy="-35.6" r="1.1" fill="#1f1a17"/>` +
        `<g ${an('lb-hat', 10, 0, 'transform-origin:0 -42px')}><path d="M-15 -42C-14 -58 14 -58 15 -42Z" class="a1"/><rect x="-18" y="-44" width="36" height="4.4" rx="2" class="a1"/><rect x="-2" y="-57" width="4" height="9" fill="#e8a600"/></g>` +
        `<path d="M-16 -2L-30 6" stroke="#6b5a62" stroke-width="9" stroke-linecap="round"/>` +
        `<g transform="translate(-26 -2)"><g ${an('lb-hammer', 10, 0, 'transform-origin:0 0')}><rect x="-2" y="-24" width="4" height="26" rx="1.4" fill="#a8743f"/><rect x="-9" y="-30" width="18" height="9" rx="2" fill="#7c828c"/></g></g>` +
        `<path d="M16 -2L26 -14" stroke="#6b5a62" stroke-width="9" stroke-linecap="round"/>` +
        `<g ${an('lb-thumb', 10)}><g transform="translate(28 -18)"><circle r="6" fill="#8d7c84"/><rect x="-2.6" y="-14" width="5.2" height="10" rx="2.6" fill="#8d7c84"/></g></g>` +
        `</g></g></g>` +
        dirt('lb-d1', 70) + dirt('lb-d2', 84) + dirt('lb-d3', 77),
    ),
};

export default theme;
