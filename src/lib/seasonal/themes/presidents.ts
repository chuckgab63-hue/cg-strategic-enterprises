// Presidents' Day: a beaver in a tricorn hat gnaws a cherry tree. The tree shakes, a cherry drops and
// bonks the beaver's hat, and he looks up, surprised. Neutral and silly. 9 s loop.
import type { ThemeModule } from '../loaders';
import { an, kf, scene } from './scene';

const CSS =
  kf('pr-gnaw', { '0%,100%': 'transform:rotate(0)', '8%': 'transform:rotate(-7deg)', '16%': 'transform:rotate(0)', '24%': 'transform:rotate(-7deg)', '32%': 'transform:rotate(0)', '40%': 'transform:rotate(-7deg)', '48%': 'transform:rotate(0)', '58%': 'transform:rotate(0)', '62%': 'transform:rotate(10deg) translateY(2px)', '80%': 'transform:rotate(10deg) translateY(2px)', '86%': 'transform:rotate(0)' }) +
  kf('pr-tree', { '0%,6%': 'transform:rotate(0)', '10%': 'transform:rotate(-1.6deg)', '16%': 'transform:rotate(0)', '22%': 'transform:rotate(-1.6deg)', '28%': 'transform:rotate(0)', '34%': 'transform:rotate(-2.2deg)', '40%': 'transform:rotate(0)', '46%': 'transform:rotate(-3deg)', '52%': 'transform:rotate(1deg)', '58%,100%': 'transform:rotate(0)' }) +
  kf('pr-cherry', { '0%,48%': 'transform:translate(0,0);opacity:0', '50%': 'opacity:1', '58%': 'transform:translate(16px,46px);animation-timing-function:ease-in', '62%': 'transform:translate(20px,38px)', '66%': 'transform:translate(26px,54px)', '90%': 'transform:translate(26px,54px);opacity:1', '98%,100%': 'transform:translate(26px,54px);opacity:0' }) +
  kf('pr-hat', { '0%,56%': 'transform:translateY(0)', '60%': 'transform:translateY(5px) scale(1,.8)', '66%': 'transform:translateY(-3px)', '72%,100%': 'transform:translateY(0)' }) +
  kf('pr-tail', { '0%,100%': 'transform:rotate(0)', '12%': 'transform:rotate(-24deg)', '20%': 'transform:rotate(0)' });

const cherries = [[-12, -6], [8, 6], [22, -12], [-28, -10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" class="a1"/><path d="M${x} ${y - 4}Q${x + 2} ${y - 9} ${x + 5} ${y - 11}" stroke="#4a7a2a" stroke-width="1" fill="none"/>`).join('');

const theme: ThemeModule = {
  id: 'presidents',
  label: "Presidents' Day",
  colors: ['#c8283a', '#2f58b5', '#f4f4f0'],
  svg: () =>
    scene(
      CSS,
      `<path d="M0 226H196V240H0Z" fill="#6e9a58"/>` +
        // cherry tree (trunk + crown sway together, pivoting at the base)
        `<g transform="translate(40 226)"><g ${an('pr-tree', 9, 0, 'transform-origin:0 0')}>` +
        `<path d="M-10 0L-7 -70H7L10 0Z" fill="#8a5a34"/><path d="M-3 -10L-1 -64" stroke="#6b4222" stroke-width="1.4" opacity=".6"/>` +
        `<g transform="translate(0 -70)"><circle cx="-4" cy="-36" r="18" fill="#7fbf5c"/><circle cx="16" cy="-24" r="16" fill="#8ccb67"/><circle cx="-24" cy="-22" r="15" fill="#6faf50"/><circle cx="-2" cy="-14" r="17" fill="#80c05c"/>` +
        cherries +
        `</g></g></g>` +
        // falling cherry
        `<g transform="translate(64 156)"><g ${an('pr-cherry', 9)}><circle r="4.6" class="a1"/><path d="M0 -4.6Q2 -10 5 -12" stroke="#4a7a2a" stroke-width="1.2" fill="none"/></g></g>` +
        // beaver
        `<g transform="translate(102 214)">` +
        `<g ${an('pr-tail', 9, 0, 'transform-origin:18px 4px')}><ellipse cx="30" cy="6" rx="14" ry="6" fill="#5a3c22"/><path d="M20 6H40M24 2L36 10M24 10L36 2" stroke="#3b2714" stroke-width=".8" opacity=".5"/></g>` +
        `<ellipse cx="4" cy="2" rx="22" ry="16" fill="#8a5a34"/><ellipse cx="-4" cy="6" rx="12" ry="9" fill="#a8743f"/>` +
        `<path d="M-14 14L-16 22M-4 16L-5 24M10 16L11 24M-18 22H-12M-9 24H-2M7 24H14" stroke="#5a3c22" stroke-width="3" stroke-linecap="round" fill="none"/>` +
        `<g transform="translate(-20 -6)"><g ${an('pr-gnaw', 9, 0, 'transform-origin:6px 12px')}>` +
        `<circle cx="0" cy="0" r="13" fill="#8a5a34"/><ellipse cx="-6" cy="5" rx="9" ry="7" fill="#c89a62"/>` +
        `<circle cx="-4" cy="-4" r="3.4" fill="#fff"/><circle cx="4" cy="-4" r="3.4" fill="#fff"/><circle cx="-4.6" cy="-3.6" r="1.5" fill="#1f1a17"/><circle cx="3.4" cy="-3.6" r="1.5" fill="#1f1a17"/>` +
        `<ellipse cx="-9" cy="3" rx="2.4" ry="1.8" fill="#2b2118"/><rect x="-9" y="6" width="4" height="6" rx="1" fill="#fff" stroke="#c9b9a0" stroke-width=".6"/><rect x="-5" y="6" width="4" height="6" rx="1" fill="#fff" stroke="#c9b9a0" stroke-width=".6"/>` +
        `<g ${an('pr-hat', 9)}><path d="M-14 -9C-12 -20 12 -20 14 -9C8 -13 -8 -13 -14 -9Z" class="a2"/><path d="M-14 -9C-8 -13 8 -13 14 -9" stroke="#f4f4f0" stroke-width="1.6" fill="none"/><circle cx="0" cy="-15" r="2" class="a3"/></g>` +
        `</g></g></g>`,
    ),
};

export default theme;
