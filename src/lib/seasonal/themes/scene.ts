// Kit for character scenes: each scene writes its own @keyframes (inside the SVG) and drives parts
// with `an(name, seconds, delay)`. The engine supplies duration/delay scaling by the speed setting,
// the infinite loop, and the reduced-motion still image (so each part's un-animated pose should look
// right on its own). Animate wrapper <g>s, never an element that also has a transform attribute.

/** @keyframes block from a map of percent -> declarations. */
export const kf = (name: string, frames: Record<string, string>): string =>
  `@keyframes ${name}{${Object.entries(frames).map(([k, v]) => `${k}{${v}}`).join('')}}`;

/** Attributes that run keyframes `name` over `t` seconds (starting `dl` seconds in). */
export const an = (name: string, t: number, dl = 0, extra = ''): string =>
  `class="an-k" style="--n:${name};--t:${t}s;--dl:${dl}s;${extra}"`;

export const styleTag = (css: string): string => `<style>${css}</style>`;

/** Cartoon eyes (white, dark pupil). */
export const eyes = (x: number, y: number, gap = 5, r = 2.6): string =>
  `<circle cx="${x - gap}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + gap}" cy="${y}" r="${r}" fill="#fff"/>` +
  `<circle cx="${x - gap + 0.5}" cy="${y + 0.3}" r="${r * 0.5}" fill="#1f1a17"/><circle cx="${x + gap + 0.5}" cy="${y + 0.3}" r="${r * 0.5}" fill="#1f1a17"/>`;

/** An arcing throw: outer part moves along x, inner part along y (so the path is a parabola). */
export const arc = (name: string, start: number, land: number, dx: number, rise: number, drop: number): string => {
  const mid = start + (land - start) * 0.45;
  return (
    kf(`${name}x`, { '0%': 'transform:translateX(0);opacity:0', [`${start}%`]: 'transform:translateX(0);opacity:0', [`${start + 0.5}%`]: 'opacity:1', [`${land}%`]: `transform:translateX(${dx}px)`, '95%': `transform:translateX(${dx}px);opacity:1`, '100%': `transform:translateX(${dx}px);opacity:0` }) +
    kf(`${name}y`, { [`${start}%`]: 'transform:translateY(0);animation-timing-function:ease-out', [`${mid}%`]: `transform:translateY(${-rise}px);animation-timing-function:ease-in`, [`${land}%`]: `transform:translateY(${drop}px)`, '100%': `transform:translateY(${drop}px)` })
  );
};

/** Wraps SVG body markup (with its own <style>) in the standard 240 box. */
export const scene = (css: string, inner: string): string =>
  `<svg viewBox="0 0 240 240" focusable="false">${styleTag(css)}<g transform="translate(0 240) scale(1.25) translate(0 -240)">${inner}</g></svg>`;
