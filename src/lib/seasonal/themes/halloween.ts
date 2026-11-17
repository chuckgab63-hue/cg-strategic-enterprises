// Halloween: a friendly ghost pops up behind a jack-o-lantern and yells BOO; the pumpkin jumps, the ghost
// laughs and sinks away while a bat flaps across. 12 s loop; only slow movement and a gentle face glow.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('ha-ghost', {
    '0%': 'transform:translateY(80px);animation-timing-function:ease-out',
    '14%': 'transform:translateY(-4px)', '20%': 'transform:translateY(0)',
    '38%': 'transform:translateY(0) scale(1)', '42%': 'transform:translateY(-8px) scale(1.4)',
    '54%': 'transform:translateY(-8px) scale(1.4)', '60%': 'transform:translateY(0) scale(1)',
    '66%': 'transform:rotate(8deg)', '72%': 'transform:rotate(-8deg)', '78%': 'transform:rotate(0)',
    '88%': 'transform:translateY(0);animation-timing-function:ease-in', '96%': 'transform:translateY(80px)', '100%': 'transform:translateY(80px)',
  }) +
  kf('ha-pump', {
    '0%,40%': 'transform:translateY(0) scale(1,1)', '43%': 'transform:translateY(-16px) scale(.94,1.06)',
    '48%': 'transform:translateY(0) scale(1.08,.9)', '53%': 'transform:scale(.98,1.03)', '58%,100%': 'transform:translateY(0) scale(1,1)',
  }) +
  kf('ha-bat', { '0%': 'transform:translate(-40px,0)', '100%': 'transform:translate(290px,-10px)' }) +
  kf('ha-bob', { '0%,100%': 'transform:translateY(-6px)', '50%': 'transform:translateY(8px)' }) +
  kf('ha-wing', { '0%,100%': 'transform:scaleY(1)', '50%': 'transform:scaleY(.35)' });

const wing = `<path d="M0 0C-8 -9 -17 -5 -21 4C-15 2 -12 7 -8 4C-6 8 -2 7 0 4Z" fill="#2b2430"/>`;

const theme: ThemeModule = {
  id: 'halloween',
  label: 'Halloween',
  colors: ['#f28a1e', '#7c4dbd', '#9be564'],
  svg: () =>
    scene(
      CSS,
      `<defs><clipPath id="ha-clip"><rect x="0" y="0" width="240" height="228"/></clipPath></defs>` +
        `<path d="M0 226H196V240H0Z" fill="#3b2a4a"/>` +
        // ghost behind the pumpkin
        `<g clip-path="url(#ha-clip)"><g transform="translate(84 142)"><g ${an('ha-ghost', 12)}>` +
        `<path d="M-17 0C-17 -26 17 -26 17 0V26L11 20L6 27L0 20L-6 27L-11 20L-17 26Z" fill="#fff" stroke="#c9c2d9" stroke-width="1"/>` +
        `<ellipse cx="-6" cy="-5" rx="2.6" ry="3.6" fill="#2b2430"/><ellipse cx="6" cy="-5" rx="2.6" ry="3.6" fill="#2b2430"/>` +
        `<ellipse cx="0" cy="6" rx="3.4" ry="4.6" fill="#2b2430"/><circle cx="-11" cy="2" r="2.4" fill="#f8b6c6" opacity=".8"/><circle cx="11" cy="2" r="2.4" fill="#f8b6c6" opacity=".8"/>` +
        `<path d="M-17 4C-26 8 -26 -4 -22 -8" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/>` +
        `</g></g></g>` +
        // pumpkin
        `<g transform="translate(78 202)"><g ${an('ha-pump', 12, 0, 'transform-origin:0 26px')}>` +
        `<ellipse cx="-14" cy="0" rx="20" ry="26" class="a1"/><ellipse cx="14" cy="0" rx="20" ry="26" class="a1"/><ellipse cx="0" cy="0" rx="14" ry="27" class="a1"/>` +
        `<g stroke="#a8520a" stroke-width="1.2" fill="none" opacity=".6"><path d="M-14 -24C-24 -8 -24 8 -14 24M14 -24C24 -8 24 8 14 24M0 -26V26"/></g>` +
        `<path d="M-3 -26C-2 -36 4 -38 8 -34" stroke="#4a7a2a" stroke-width="5" stroke-linecap="round" fill="none"/>` +
        `<g class="an-glow" style="--t:4s"><path d="M-17 -8L-8 -8L-12.5 -17Z M8 -8L17 -8L12.5 -17Z M-16 6L-9 11L-4 6L0 12L4 6L9 11L16 6L16 13L10 18L4 14L0 19L-4 14L-10 18L-16 13Z" fill="#ffe38a"/></g>` +
        `</g></g>` +
        // bat
        `<g transform="translate(0 44)"><g ${an('ha-bat', 12, 0, 'animation-timing-function:linear')}><g ${an('ha-bob', 2.4)}>` +
        `<g transform="scale(1.3)"><ellipse rx="3.4" ry="4.4" fill="#2b2430"/><circle cy="-4.6" r="2.6" fill="#2b2430"/><path d="M-2.4 -6.4L-3 -9L-0.6 -7.2M2.4 -6.4L3 -9L0.6 -7.2" fill="#2b2430"/><circle cx="-1" cy="-4.8" r=".6" fill="#e24"/><circle cx="1" cy="-4.8" r=".6" fill="#e24"/>` +
        `<g ${an('ha-wing', 0.8)}>${wing}</g><g transform="scale(-1 1)"><g ${an('ha-wing', 0.8)}>${wing}</g></g></g></g></g></g>`,
    ),
};

export default theme;
