// Father's Day: a dad bear in an apron flips a burger that sails up and lands on his head. He balances it,
// crosses his eyes, then tosses it back on the grill. Smoke curls up. 10 s loop.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('fa-flip', { '0%,14%': 'transform:rotate(0)', '20%': 'transform:rotate(-58deg)', '26%': 'transform:rotate(8deg)', '32%,100%': 'transform:rotate(0)' }) +
  // burger: grill -> up -> onto head, rests there, then back to the grill
  kf('fa-burgerx', { '0%,20%': 'transform:translateX(0)', '36%': 'transform:translateX(62px)', '66%': 'transform:translateX(62px)', '80%': 'transform:translateX(0)', '100%': 'transform:translateX(0)' }) +
  kf('fa-burgery', { '0%,20%': 'transform:translateY(0);animation-timing-function:ease-out', '28%': 'transform:translateY(-70px);animation-timing-function:ease-in', '36%': 'transform:translateY(-34px)', '39%': 'transform:translateY(-38px)', '66%': 'transform:translateY(-38px);animation-timing-function:ease-out', '73%': 'transform:translateY(-62px);animation-timing-function:ease-in', '80%,100%': 'transform:translateY(0)' }) +
  kf('fa-spin', { '0%,20%': 'transform:rotate(0)', '36%': 'transform:rotate(360deg)', '66%': 'transform:rotate(360deg)', '80%,100%': 'transform:rotate(720deg)' }) +
  kf('fa-wobble', { '0%,40%': 'transform:rotate(0)', '46%': 'transform:rotate(-5deg)', '54%': 'transform:rotate(5deg)', '62%': 'transform:rotate(-3deg)', '68%,100%': 'transform:rotate(0)' }) +
  kf('fa-eyes', { '0%,38%': 'transform:translateX(0)', '42%,64%': 'transform:translateX(0) scale(1)', '100%': 'transform:translateX(0)' }) +
  kf('fa-glow', { '0%,100%': 'opacity:.55', '50%': 'opacity:1' });

const smoke = (x: number, t: number, dl: number) =>
  `<g transform="translate(${x} 184)"><g class="an-smoke" style="--t:${t}s;--dl:${dl}s"><path d="M0 0C-4 -5 4 -8 0 -14C-3 -18 3 -20 1 -24" fill="none" stroke="#9aa0a8" stroke-width="2" stroke-linecap="round" opacity=".7"/></g></g>`;

const burger = `<ellipse cy="-4" rx="9" ry="4.6" fill="#d89a3c"/><rect x="-9" y="-2" width="18" height="3" rx="1.4" fill="#5a3418"/><rect x="-9.5" y="1" width="19" height="2" rx="1" class="a2"/><ellipse cy="5" rx="9" ry="3.4" fill="#d89a3c"/>`;

const theme: ThemeModule = {
  id: 'fathers',
  label: "Father's Day",
  colors: ['#d9541e', '#7ac143', '#f2c230'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#86b865"/>` +
        // grill
        `<g transform="translate(40 200)"><path d="M-22 0A22 17 0 0 0 22 0Z" fill="#2f2f33"/><rect x="-24" y="-2" width="48" height="3.2" rx="1.4" fill="#55565c"/>` +
        `<path d="M-12 16L-18 28M12 16L18 28" stroke="#2f2f33" stroke-width="2.4" stroke-linecap="round"/>` +
        `<g ${an('fa-glow', 4)}><path d="M-14 -4C-8 -9 -4 -5 0 -8C4 -5 8 -9 14 -4Z" class="a1"/></g>` +
        `<g transform="translate(0 -10)"><g ${an('fa-burgerx', 10)}><g ${an('fa-burgery', 10)}><g ${an('fa-spin', 10)}>${burger}</g></g></g></g>` +
        `</g>` +
        smoke(34, 7, 0) + smoke(48, 8, -3.5) +
        // dad bear
        `<g transform="translate(112 200)"><g ${an('fa-wobble', 10, 0, 'transform-origin:0 28px')}>` +
        `<ellipse cx="0" cy="12" rx="22" ry="26" fill="#8a5a34"/><ellipse cx="0" cy="18" rx="14" ry="17" fill="#a8743f"/>` +
        `<path d="M-14 -4L14 -4L12 30H-12Z" class="a1"/><rect x="-5" y="12" width="10" height="9" rx="2" fill="#fff" opacity=".5"/><path d="M-12 -4L-5 -14M12 -4L5 -14" stroke="#f4f4f0" stroke-width="2"/>` +
        `<ellipse cx="-14" cy="-22" rx="6" ry="6" fill="#8a5a34"/><ellipse cx="14" cy="-22" rx="6" ry="6" fill="#8a5a34"/><circle cx="-14" cy="-22" r="3" fill="#c89a62"/><circle cx="14" cy="-22" r="3" fill="#c89a62"/>` +
        `<circle cx="0" cy="-14" r="17" fill="#8a5a34"/><ellipse cx="0" cy="-8" rx="9" ry="7" fill="#c89a62"/><ellipse cx="0" cy="-10" rx="3" ry="2.2" fill="#2b2118"/><path d="M-3 -5Q0 -2 3 -5" stroke="#2b2118" stroke-width="1.2" fill="none"/>` +
        `<circle cx="-6" cy="-19" r="3.6" fill="#fff"/><circle cx="6" cy="-19" r="3.6" fill="#fff"/><circle cx="-6" cy="-19" r="1.5" fill="#1f1a17"/><circle cx="6" cy="-19" r="1.5" fill="#1f1a17"/>` +
        `<path d="M-18 6C-30 0 -34 -8 -34 -16" stroke="#8a5a34" stroke-width="9" stroke-linecap="round" fill="none"/>` +
        `<g transform="translate(-32 -14)"><g ${an('fa-flip', 10, 0, 'transform-origin:0 0')}><rect x="-1.4" y="-22" width="2.8" height="18" fill="#8a8f99"/><rect x="-6" y="-30" width="12" height="9" rx="1.4" fill="#8a8f99"/></g></g>` +
        `<path d="M18 6C26 14 26 26 20 30" stroke="#8a5a34" stroke-width="9" stroke-linecap="round" fill="none"/>` +
        `</g></g>`,
    ),
};

export default theme;
