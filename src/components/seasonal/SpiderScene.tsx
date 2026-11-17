import { useEffect, useRef } from 'react';

import { webMarkup, eyesMarkup, legsMarkup, P, R } from '../../lib/seasonal/geometry';

// The year-round web: the scene the holidays interrupt. Ported from One Source's
// SpiderWeb.astro, which is a plain <script> on an Astro page -- the web and the spider
// are their geometry, and the behaviour is theirs too: she patrols between a few stops,
// plucks the web where she lands, and bolts for the hub when a pointer comes near, then
// lies low for a few seconds before starting again.
//
// What changed in the port: the DOM wiring is an effect rather than a module script, the
// raf loop and every timer are cancelled on unmount (the showcase mounts and unmounts
// this as it rotates), and `active` stops her when the frame is paused, hidden or
// off-screen rather than only on visibilitychange.
//
// Decorative: the <svg> is aria-hidden and takes no pointer events. With reduced motion
// she simply sits at the hub on a finished web.

/** Where she walks: points out along the web, in the 240 box. */
const STOPS: [number, number][] = [
  P(R * 0.55, (31 * Math.PI) / 180),
  P(R * 0.78, (61 * Math.PI) / 180),
  P(R * 0.46, (76 * Math.PI) / 180),
  P(R * 0.72, (16 * Math.PI) / 180),
  P(R * 0.34, (46 * Math.PI) / 180),
];
const HOME: [number, number] = P(34, (46 * Math.PI) / 180);

const spiderMarkup = () =>
  `<g class="ssc-spider-body">${legsMarkup()}` +
  `<ellipse cx="0" cy="3.2" rx="3.6" ry="4.1" fill="#4a3526"/>` +
  `<ellipse cx="0" cy="-2.2" rx="2.4" ry="2.2" fill="#2b2118"/>` +
  `${eyesMarkup()}</g>`;

export default function SpiderScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  // `active` changes often; the effect below reads it through a ref so the walk loop is
  // never torn down and rebuilt mid-stride.
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const svg = root?.querySelector('svg');
    const web = root?.querySelector<SVGGElement>('.ssc-web');
    const spider = root?.querySelector<SVGGElement>('.ssc-spider');
    if (!root || !svg || !web || !spider) return;

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
        const step = (now: number) => {
          if (stopped || id !== run) return resolve(false);
          if (!activeRef.current) { raf = requestAnimationFrame(step); return; }   // paused: hold the pose
          if (t0 === null) t0 = now;
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
        await sleep(2000 + Math.random() * 3500);
        if (id !== run || stopped) return;
        let i: number;
        do { i = Math.floor(Math.random() * STOPS.length); } while (i === last && STOPS.length > 1);
        last = i;
        if (!(await walk(STOPS[i][0], STOPS[i][1], 28, id))) return;
        pluck();
        await sleep(1800 + Math.random() * 2600);
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
        await sleep(3500);
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

    // Their version waits 2.3s for the web to draw itself in before she sets off.
    const startId = window.setTimeout(() => { timers.delete(startId); root.classList.add('is-ready'); patrol(); }, 2300);
    timers.add(startId);

    return () => {
      stopped = true;
      run++;
      cancelAnimationFrame(raf);
      timers.forEach(id => clearTimeout(id));
      timers.clear();
      removeEventListener('pointermove', onPointer);
      removeEventListener('pointerdown', onPointer);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`ssc-spider-root sc${reduced ? ' is-ready' : ''}`}
      dangerouslySetInnerHTML={{
        __html:
          `<svg viewBox="0 0 240 240" focusable="false">` +
          `<g class="ssc-web">${webMarkup('var(--c1)', 0.75)}</g>` +
          `<g class="ssc-spider" transform="translate(${HOME[0]} ${HOME[1]}) rotate(45)">${spiderMarkup()}</g>` +
          `</svg>`,
      }}
    />
  );
}
