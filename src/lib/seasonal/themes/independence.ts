// Independence Day: an eagle in sunglasses bobs along to the music holding a sparkler while rockets whoosh
// up and burst into soft slow petals. 12 s loop. Photosensitivity: each burst fades in and out over 6 s,
// bursts are staggered, and nothing flashes. The sparkler sparks are tiny, slow and low contrast.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('id-bob', { '0%,100%': 'transform:translateY(0) rotate(-3deg)', '50%': 'transform:translateY(-4px) rotate(3deg)' }) +
  kf('id-head', { '0%,100%': 'transform:rotate(-6deg)', '50%': 'transform:rotate(7deg)' }) +
  kf('id-spark', { '0%': 'transform:translate(0,0) scale(1);opacity:.9', '100%': 'transform:translate(var(--dx),-22px) scale(.3);opacity:0' }) +
  kf('id-rocket1', { '0%,6%': 'transform:translate(0,0);opacity:0', '8%': 'opacity:1', '30%': 'transform:translate(10px,-120px);opacity:1', '32%,100%': 'transform:translate(10px,-120px);opacity:0' }) +
  kf('id-rocket2', { '0%,40%': 'transform:translate(0,0);opacity:0', '42%': 'opacity:1', '62%': 'transform:translate(-20px,-96px);opacity:1', '64%,100%': 'transform:translate(-20px,-96px);opacity:0' }) +
  kf('id-burst', { '0%,100%': 'transform:scale(.15);opacity:0', '3%': 'opacity:1', '50%': 'transform:scale(1.1);opacity:.9', '92%': 'transform:scale(1.2);opacity:0' });

const petals = (cls: string, n = 12) =>
  Array.from({ length: n }, (_, i) => {
    const deg = (360 * i) / n;
    return `<ellipse cx="14" cy="0" rx="6.5" ry="1.5" class="${cls}" transform="rotate(${deg})"/><circle cx="22" cy="0" r="1.7" class="${cls}" transform="rotate(${deg})"/>`;
  }).join('');

const rocket = (x: number, name: string, cls: string) =>
  `<g transform="translate(${x} 218)"><g ${an(name, 12, 0, 'opacity:0')}><rect x="-2" y="-12" width="4" height="12" rx="1.4" class="${cls}"/><path d="M-2 -12L0 -17L2 -12Z" fill="#f4f4f0"/><path d="M0 0V8" stroke="#f2b705" stroke-width="2" stroke-linecap="round" opacity=".7"/></g></g>`;

const theme: ThemeModule = {
  id: 'independence',
  label: 'Independence Day',
  colors: ['#d62f3a', '#3b6fd1', '#f4f4f0'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#5a6a85"/>` +
        // bursts
        `<g transform="translate(150 70)"><g ${an('id-burst', 12, 0, 'transform-origin:0 0')}>${petals('a1')}</g></g>` +
        `<g transform="translate(96 108)"><g ${an('id-burst', 12, -6, 'transform-origin:0 0')}>${petals('a2')}</g></g>` +
        rocket(150, 'id-rocket1', 'a1') + rocket(206, 'id-rocket2', 'a2') +
        // eagle on a barrel
        `<g transform="translate(60 204)">` +
        `<rect x="-20" y="8" width="40" height="22" rx="4" fill="#8a5a34"/><path d="M-20 14H20M-20 24H20" stroke="#5a3418" stroke-width="2"/>` +
        `<g ${an('id-bob', 2.4, 0, 'transform-origin:0 8px')}>` +
        `<ellipse cx="0" cy="-4" rx="16" ry="19" fill="#7a4a24"/><ellipse cx="0" cy="0" rx="9" ry="12" fill="#a8743f"/>` +
        `<path d="M-14 -6C-26 0 -24 14 -14 14" fill="#5a3418"/>` +
        `<path d="M-5 14L-6 20M5 14L6 20M-9 20H-3M3 20H9" stroke="#f2b705" stroke-width="2.6" stroke-linecap="round"/>` +
        `<g ${an('id-head', 2.4, 0, 'transform-origin:0 -16px')}>` +
        `<circle cx="0" cy="-26" r="13" fill="#fff"/><path d="M2 -24L15 -20L3 -15Z" fill="#f2b705"/>` +
        `<rect x="-10" y="-29" width="9" height="6" rx="2.4" fill="#1f1a17"/><rect x="1" y="-29" width="9" height="6" rx="2.4" fill="#1f1a17"/><path d="M-1 -27H1" stroke="#1f1a17" stroke-width="1.4"/><path d="M-8 -27.6H-4" stroke="#fff" stroke-width="1" opacity=".6"/>` +
        `</g>` +
        // wing holding the sparkler
        `<path d="M12 -4C28 -8 34 -18 32 -30" stroke="#7a4a24" stroke-width="8" stroke-linecap="round" fill="none"/>` +
        `<path d="M32 -30L34 -46" stroke="#9aa0a8" stroke-width="1.6"/>` +
        `<g transform="translate(34 -48)">${[-10, 4, 14, -4].map((_dx, i) => `<circle r="1.6" fill="#ffd54f"><animate attributeName="r" values="0;1.8;0" dur="${2 + i * 0.4}s" repeatCount="indefinite" begin="${-i * 0.5}s"/></circle>`).join('')}` +
        [-10, 4, 14].map((dx, i) => `<g ${an('id-spark', 2.4, -i * 0.8, `--dx:${dx}px`)}><circle r="1.5" fill="#ffd54f"/></g>`).join('') +
        `</g></g></g>`,
    ),
};

export default theme;
