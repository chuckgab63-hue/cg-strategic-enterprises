import { useEffect, useRef } from 'react';

import { P, ringR, rings, spokeA, spokes } from '../../lib/seasonal/geometry';

// The year-round web: the scene the holidays interrupt. Ported from One Source's
// SpiderWeb.astro -- the geometry, the markup, the CSS and the behaviour are theirs. The
// strands draw themselves in, the dew catches the light, and an orb-weaver patrols the
// web, plucking it where she stops; a pointer near her sends her bolting for the hub,
// where she lies low for a moment before setting off again.
//
// The first port of this used the shared webMarkup()/legsMarkup() helpers, which draw a
// plain web and a generic spider: no draw-in, no dew, no stepping legs, and stops picked
// by hand rather than off the rings. This one uses their markup, so what shows here is
// what shows on their site.
//
// Two things are ours, both forced by the fact that this is a six-second slot in a
// rotation rather than a corner that sits there all day:
//
//   * Her schedule is compressed. Theirs waits 2.3s for the web to spin in, then idles
//     2-5.5s before the first walk and 1.8-4.4s after each one -- fine for a corner a
//     visitor passes all session, useless in six seconds, where she would simply never
//     move. The draw-in is quicker and the idles are shorter, so a visit always contains
//     at least one walk and pluck. The walk itself -- speed, easing, turn -- is untouched.
//   * The strands use vector-effect: non-scaling-stroke. Theirs renders a 240 viewBox at
//     150-260px, so a 0.9 unit strand lands at about 1 device px. This frame is up to
//     594px wide, where the same strand would render at 2.2px and the web reads as rope.
//     Pinning the stroke to device pixels keeps their weight at any frame size.
//
// Decorative: aria-hidden, no pointer events. Reduced motion gets the finished web with
// her at the hub, and nothing moves.

/** Dew drops: [ring, spoke] pairs, as in the original. */
const DEW = ([[2, 1], [4, 3], [5, 5], [3, 2], [6, 4], [7, 2], [1, 5], [8, 1], [6, 6]] as [number, number][])
  .filter(([ri]) => ri < ringR.length)
  .map(([ri, si], k) => ({ p: P(ringR[ri], spokeA[si]), d: (k * 0.83).toFixed(2) }));

const HOME = P(ringR[1], spokeA[3]);

const STOPS = ([[4, 2], [6, 4], [3, 5], [7, 3], [5, 1], [8, 2]] as [number, number][])
  .filter(([ri]) => ri < ringR.length)
  .map(([ri, si]) => P(ringR[ri], spokeA[si]));

const LEG_L = [
  'M-1.6 -3.6L-6 -8.2L-7.4 -14',
  'M-2.2 -2.2L-8 -4.6L-11 -8.6',
  'M-2.2 -0.6L-8.2 0.6L-11 4.8',
  'M-1.8 0.8L-6.4 4.6L-8.4 10.8',
];
const LEG_R = LEG_L.map(d => d.replace(/([ML])-/g, '$1'));

/** Their spider, body and all: legs that step, palps, cephalothorax, abdomen and its mark. */
const spiderMarkup = () =>
  '<g class="ssc-orient"><g class="ssc-body" transform="scale(1.6)">' +
  LEG_L.map((d, i) => `<path class="ssc-leg ssc-leg-l ssc-leg-${i % 2 ? 'b' : 'a'}" d="${d}"/>`).join('') +
  LEG_R.map((d, i) => `<path class="ssc-leg ssc-leg-r ssc-leg-${i % 2 ? 'a' : 'b'}" d="${d}"/>`).join('') +
  '<path class="ssc-palp" d="M-0.8 -4.6L-1.3 -6.1M0.8 -4.6L1.3 -6.1"/>' +
  '<ellipse class="ssc-ceph" cx="0" cy="-2" rx="2.6" ry="2.9"/>' +
  '<ellipse class="ssc-abd" cx="0" cy="4.6" rx="4.2" ry="5.4"/>' +
  '<path class="ssc-mark" d="M-2.2 2.4L0 3.9L2.2 2.4M-2.8 4.9L0 6.5L2.8 4.9M-2 7.5L0 8.7L2 7.5"/>' +
  '<ellipse class="ssc-shine" cx="-1.4" cy="2.4" rx="1.1" ry="1.7"/>' +
  '</g></g>';

const webMarkup = () =>
  '<g class="ssc-web">' +
  spokes.map((d, i) => `<path class="ssc-strand ssc-spoke" d="${d}" style="--d:${(i * 0.04).toFixed(2)}s"/>`).join('') +
  rings.map((d, i) => `<path class="ssc-strand ssc-ring" d="${d}" style="--d:${(0.3 + i * 0.06).toFixed(2)}s"/>`).join('') +
  DEW.map(({ p, d }) => `<circle class="ssc-dew" cx="${p[0]}" cy="${p[1]}" r="1.5" style="--d:${d}s"/>`).join('') +
  '</g>';

const MARKUP =
  `<svg viewBox="0 0 280 280" focusable="false">` +
  webMarkup() +
  `<g class="ssc-spider" transform="translate(${HOME[0]} ${HOME[1]}) rotate(45)">${spiderMarkup()}</g>` +
  `</svg>`;

export default function SpiderScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  // `active` flips with hover, tab visibility and scroll; reading it through a ref keeps
  // the walk loop from being torn down and rebuilt mid-stride.
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // The markup is injected here rather than through dangerouslySetInnerHTML, and this
    // is the whole reason the spider used to sit still. React re-set that subtree on
    // re-render -- and the showcase re-renders this component whenever the frame is
    // hovered, scrolled or the tab changes -- which left the effect holding a detached
    // <g>. place() then wrote her transform to an orphan node while a fresh, motionless
    // copy sat on screen: she had been walking all along, just not where anyone could
    // see her. React owns the host element; the effect owns what is inside it.
    root.innerHTML = MARKUP;
    const svg = root.querySelector('svg');
    const web = root.querySelector<SVGGElement>('.ssc-web');
    const spider = root.querySelector<SVGGElement>('.ssc-spider');
    if (!svg || !web || !spider) return;
    if (reduced) { root.classList.add('is-ready'); return () => { root.innerHTML = ''; }; }

    const pos = { x: HOME[0], y: HOME[1] };
    let heading = 45;
    let run = 0;
    let fleeing = false;
    let raf = 0;
    const timers = new Set<number>();
    let stopped = false;

    const place = () =>
      spider.setAttribute('transform', `translate(${pos.x.toFixed(2)} ${pos.y.toFixed(2)}) rotate(${heading.toFixed(1)})`);
    place();

    const sleep = (ms: number) =>
      new Promise<void>(resolve => {
        const id = window.setTimeout(() => { timers.delete(id); resolve(); }, ms);
        timers.add(id);
      });

    /** Turn to face the target, then walk there. Resolves false if interrupted. */
    const walk = (tx: number, ty: number, speed: number, id: number) =>
      new Promise<boolean>(resolve => {
        const sx = pos.x, sy = pos.y, dx = tx - sx, dy = ty - sy;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.5) return resolve(true);
        const startH = heading;
        const turn = (((Math.atan2(dy, dx) * 180) / Math.PI + 90 - startH + 540) % 360) - 180;
        const turnMs = Math.min(240, Math.abs(turn) * 2.5);
        const walkMs = (dist / speed) * 1000;
        let t0: number | null = null;
        let held = 0;
        spider.classList.add('is-walking');
        const step = (now: number) => {
          if (stopped || id !== run) { spider.classList.remove('is-walking'); return resolve(false); }
          // Paused (hover, hidden tab, scrolled away): hold the pose and the clock.
          if (!activeRef.current) { held = now - (t0 ?? now); raf = requestAnimationFrame(step); return; }
          if (t0 === null) t0 = now;
          else if (held) { t0 = now - held; held = 0; }
          const t = now - t0;
          if (t < turnMs) {
            heading = startH + turn * (t / turnMs);
            place();
            raf = requestAnimationFrame(step);
            return;
          }
          heading = startH + turn;
          const k = Math.min(1, (t - turnMs) / walkMs);
          const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          pos.x = sx + dx * e;
          pos.y = sy + dy * e;
          place();
          if (k < 1) { raf = requestAnimationFrame(step); return; }
          spider.classList.remove('is-walking');
          resolve(true);
        };
        raf = requestAnimationFrame(step);
      });

    const pluck = () => {
      web.classList.remove('is-plucked');
      void web.getBoundingClientRect();
      web.classList.add('is-plucked');
    };

    const patrol = async () => {
      const id = ++run;
      let last = -1;
      while (id === run && !stopped) {
        await sleep(600 + Math.random() * 800);
        if (id !== run || stopped) return;
        let i: number;
        do { i = Math.floor(Math.random() * STOPS.length); } while (i === last && STOPS.length > 1);
        last = i;
        if (!(await walk(STOPS[i][0], STOPS[i][1], 28, id))) return;
        pluck();
        await sleep(700 + Math.random() * 900);
        if (id !== run || stopped) return;
        if (Math.random() < 0.45 && !(await walk(HOME[0], HOME[1], 30, id))) return;
      }
    };

    /** Scurry back to the hub when a pointer comes close, then lie low for a moment. */
    const flee = async () => {
      fleeing = true;
      const id = ++run;
      await walk(HOME[0], HOME[1], 150, id);
      if (id === run && !stopped) {
        root.classList.add('is-hiding');
        await sleep(2200);
        root.classList.remove('is-hiding');
      }
      fleeing = false;
      if (id === run && !stopped) patrol();
    };

    const isNear = (cx: number, cy: number) => {
      const m = svg.getScreenCTM();
      if (!m) return false;
      return Math.hypot(cx - (m.a * pos.x + m.c * pos.y + m.e), cy - (m.b * pos.x + m.d * pos.y + m.f)) < 80;
    };

    let queued = false;
    const onPointer = (e: PointerEvent) => {
      if (queued || fleeing || stopped || !activeRef.current) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (isNear(e.clientX, e.clientY)) flee();
      });
    };
    addEventListener('pointermove', onPointer, { passive: true });
    addEventListener('pointerdown', onPointer, { passive: true });

    // Long enough for the strands to land, short enough to leave most of the slot for her.
    const startId = window.setTimeout(() => {
      timers.delete(startId);
      root.classList.add('is-ready');
      patrol();
    }, 1100);
    timers.add(startId);

    return () => {
      stopped = true;
      run++;
      cancelAnimationFrame(raf);
      timers.forEach(id => clearTimeout(id));
      timers.clear();
      removeEventListener('pointermove', onPointer);
      removeEventListener('pointerdown', onPointer);
      root.innerHTML = '';
    };
  }, [reduced]);

  return <div ref={rootRef} aria-hidden="true" className="ssc-spider-root" />;
}
