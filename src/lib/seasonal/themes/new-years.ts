// New Year's Day: a penguin in a party hat blows a party horn so hard the hat flies off, spins and lands
// back on, while a champagne cork pops and confetti drifts down. 10 s loop; confetti is slow and never flickers.
import type { ThemeModule } from '../loaders';
import { drift } from './common';
import { an, kf, scene } from './scene';

const CSS =
  kf('ny-horn', { '0%,18%': 'transform:scaleX(.05)', '24%': 'transform:scaleX(1)', '40%': 'transform:scaleX(1)', '46%,100%': 'transform:scaleX(.05)' }) +
  kf('ny-hat', { '0%,22%': 'transform:translateY(0) rotate(0)', '30%': 'transform:translateY(-46px) rotate(180deg)', '40%': 'transform:translateY(-60px) rotate(360deg)', '54%': 'transform:translateY(0) rotate(360deg)', '58%': 'transform:translateY(-4px) rotate(360deg)', '62%,100%': 'transform:translateY(0) rotate(360deg)' }) +
  kf('ny-puff', { '0%,18%': 'transform:scale(1,1)', '24%': 'transform:scale(1.18,.92)', '40%': 'transform:scale(1.18,.92)', '48%,100%': 'transform:scale(1,1)' }) +
  kf('ny-dance', { '0%,100%': 'transform:rotate(-3deg)', '50%': 'transform:rotate(3deg)' }) +
  kf('ny-cork', { '0%,60%': 'transform:translate(0,0);opacity:0', '61%': 'opacity:1', '72%': 'transform:translate(34px,-92px)', '88%': 'transform:translate(70px,-20px);opacity:1', '94%,100%': 'transform:translate(80px,10px);opacity:0' });

const confetti = (x: number, dx: number, t: number, dl: number, cls: string, rot: number) =>
  drift(x, dx, t, dl, `<rect x="-2.4" y="-1.2" width="4.8" height="2.4" rx=".6" class="${cls}"/>`, rot);

const theme: ThemeModule = {
  id: 'new-years',
  label: "New Year's Day",
  colors: ['#f2c230', '#8a5bd6', '#2fb6c9'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#cfe1ef"/>` +
        // champagne bottle that pops its cork
        `<g transform="translate(178 222)"><path d="M-8 0V-26C-8 -34 -4 -36 -3 -44H3C4 -36 8 -34 8 -26V0Z" fill="#2f6a3f"/><rect x="-8" y="-12" width="16" height="9" fill="#f2c230"/>` +
        `<g transform="translate(0 -47)"><g ${an('ny-cork', 10)}><rect x="-3" y="-3" width="6" height="6" rx="1" fill="#d9a15a"/></g></g></g>` +
        // penguin
        `<g transform="translate(76 190)"><g ${an('ny-dance', 3, 0, 'transform-origin:0 36px')}>` +
        `<path d="M-10 34L-14 38H-4ZM10 34L14 38H4Z" fill="#f28a1e"/>` +
        `<g ${an('ny-puff', 10, 0, 'transform-origin:0 30px')}><ellipse cx="0" cy="12" rx="22" ry="26" fill="#2b2f3a"/><ellipse cx="0" cy="16" rx="14" ry="19" fill="#fff"/>` +
        `<ellipse cx="-22" cy="14" rx="5" ry="13" fill="#2b2f3a" transform="rotate(14 -22 14)"/><ellipse cx="22" cy="14" rx="5" ry="13" fill="#2b2f3a" transform="rotate(-14 22 14)"/>` +
        `<circle cx="-6" cy="-6" r="4.2" fill="#fff"/><circle cx="6" cy="-6" r="4.2" fill="#fff"/><circle cx="-5.4" cy="-5.6" r="1.8" fill="#1f1a17"/><circle cx="6.6" cy="-5.6" r="1.8" fill="#1f1a17"/>` +
        `<path d="M-4 1L4 1L0 8Z" fill="#f28a1e"/>` +
        `<g transform="translate(0 6)"><g ${an('ny-horn', 10, 0, 'transform-origin:0 0')}><path d="M0 0C16 -2 30 -8 36 -22C30 -14 18 -8 0 4Z" class="a2"/><circle cx="36" cy="-22" r="3" class="a3"/></g></g></g>` +
        `<g transform="translate(0 -14)"><g ${an('ny-hat', 10)}><path d="M-10 0L0 -26L10 0Z" class="a1"/><path d="M-6 -8L6 -8M-3 -16L3 -16" stroke="#fff" stroke-width="2" opacity=".8"/><circle cy="-27" r="3.4" class="a3"/></g></g>` +
        `</g></g>` +
        confetti(20, 14, 9, 0, 'a1', 340) + confetti(52, -12, 11, -3, 'a2', -300) + confetti(98, 16, 10, -6, 'a3', 360) +
        confetti(140, -14, 12, -2, 'a1', -330) + confetti(186, 12, 9.5, -7, 'a2', 300) + confetti(218, -10, 11.5, -4, 'a3', -320) +
        confetti(78, 8, 13, -9, 'a3', 320),
    ),
};

export default theme;
