// Shared building blocks for seasonal themes (240x240 box, anchored bottom-left).
// Accent shapes use classes a1/a2/a3 so the palette system can recolour them.
import { eyesMarkup, legsMarkup } from '../geometry';

/** A spider facing the viewer, head up. ~8 units wide at scale 1. */
export const spiderBody = (abdomen = '#4a3526', extra = ''): string =>
  legsMarkup() +
  `<ellipse cx="0" cy="3.2" rx="3.6" ry="4.1" fill="${abdomen}"/>` +
  `<ellipse cx="0" cy="-2.2" rx="2.4" ry="2.2" fill="#2b2118"/>` +
  eyesMarkup() +
  extra;

/** A spider at a fixed spot. */
export const spiderAt = (x: number, y: number, scale: number, body: string, rotate = 0): string =>
  `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">${body}</g>`;

/**
 * A spider lowering and rising on a thread. The thread (48 long) stretches by 24 while the spider
 * moves 24, so they stay joined. `t` is the cycle length in seconds.
 */
export const dangle = (x: number, y0: number, scale: number, body: string, t = 7, dl = 0): string =>
  `<g class="an-sway" style="--t:${t + 1}s;--dl:${dl}s;transform-origin:${x}px ${y0}px">` +
  `<line class="an-stretch" style="--t:${t}s;--dl:${dl}s;transform-origin:${x}px ${y0}px" x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + 48}" stroke="#8d96a3" stroke-width="0.8"/>` +
  `<g class="an-bob" style="--t:${t}s;--dl:${dl}s"><g transform="translate(${x} ${y0 + 48 + 12}) scale(${scale})">${body}</g></g></g>`;

/** A falling (or, with `rise`, rising) item. `inner` is drawn at its own origin. */
export const drift = (x: number, dx: number, t: number, dl: number, inner: string, rot = 200, rise = false): string =>
  `<g transform="translate(${x} ${rise ? 236 : 0})"><g class="${rise ? 'an-rise' : 'an-fall'}" style="--t:${t}s;--dl:${dl}s;--dx:${dx}px;--rot:${rot}deg">${inner}</g></g>`;

export const leafShape = (cls: string): string =>
  `<path class="${cls}" d="M0 -5C4 -3 5 2 0 6C-5 2 -4 -3 0 -5Z"/><path d="M0 -4V5" stroke="#6b3a12" stroke-width="0.5" fill="none"/>`;

export const heartShape = (cls: string, s = 1): string =>
  `<path class="${cls}" transform="scale(${s})" d="M0 4C-7 -1 -5 -7 0 -3C5 -7 7 -1 0 4Z"/>`;

/** 5-point star path centred on 0,0 with outer radius r. */
export const starPath = (r: number): string => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.42 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(rr * Math.cos(a)).toFixed(2)} ${(rr * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
};

/** A ladybug facing right, ~11 units long. */
export const ladybug = (cls = 'a1', extra = ''): string =>
  `<ellipse cx="0" cy="0" rx="5" ry="3.8" class="${cls}"/>` +
  `<path d="M-5 0H5" stroke="#1f1a17" stroke-width="0.6"/>` +
  `<circle cx="-2" cy="-1.6" r="0.8" fill="#1f1a17"/><circle cx="-1.8" cy="1.7" r="0.8" fill="#1f1a17"/>` +
  `<circle cx="1.8" cy="-1.5" r="0.8" fill="#1f1a17"/><circle cx="2.2" cy="1.6" r="0.8" fill="#1f1a17"/>` +
  `<circle cx="5.2" cy="0" r="2.2" fill="#1f1a17"/><circle cx="6.1" cy="-0.8" r="0.45" fill="#fff"/>` +
  `<path d="M6.8 -1.4L8.6 -3M6.8 1.4L8.6 3" stroke="#1f1a17" stroke-width="0.5" fill="none"/>` +
  extra;

/** An ant facing right, ~16 units long; origin is the body centre. */
export const antShape = (step = 0): string =>
  `<g class="an-step" style="--t:0.7s;--dl:${step}s">` +
  `<g fill="none" stroke="#2b2118" stroke-width="0.8" stroke-linecap="round">` +
  `<path d="M-1 1L-4 5M0 1L0 5.5M2 1L5 5M-1 -1L-4 -4M0 -1L0 -4.5M2 -1L5 -4"/>` +
  `<path d="M6.8 -1.2L9.5 -3.4M6.8 0.6L9.8 1.6"/></g>` +
  `<ellipse cx="-5.4" cy="0" rx="3.6" ry="2.5" fill="#3a2a1f"/>` +
  `<ellipse cx="0.2" cy="0" rx="2.4" ry="1.9" fill="#3a2a1f"/>` +
  `<circle cx="5" cy="0" r="2.1" fill="#3a2a1f"/><circle cx="5.9" cy="-0.7" r="0.45" fill="#fff"/></g>`;

/** Wraps SVG body markup in the standard 240 box. */
export const svgBox = (inner: string, clip = false): string =>
  `<svg viewBox="0 0 240 240"${clip ? ' data-clip' : ''} focusable="false">${inner}</svg>`;
