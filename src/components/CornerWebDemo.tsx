// The corner web, as a live demo rather than a screenshot.
//
// One Source has one of these spun into the bottom-left corner of their Spiders
// page. This is the same idea in CG's accent colour, scaled down to sit inside
// a panel: the strands draw themselves in, the dew catches the light, and the
// orb-weaver sways at the hub.
//
// Deliberately less than the real one. The client's version has a spider that
// patrols the web, plucks it where she stops and scurries for the hub when the
// pointer comes near — that needs requestAnimationFrame and pointer listeners.
// A demo on a sales page does not, so this is CSS only: no JavaScript, no
// listeners, nothing to clean up, and it costs the page a few hundred bytes.
//
// Decorative, so it is aria-hidden and takes no pointer events. It holds
// perfectly still — fully drawn, dew out, spider at rest — for a visitor whose
// device asks for reduced motion.

const S = 240;
const R = 232;
const rad = (d: number) => (d * Math.PI) / 180;

/** Spoke angles, measured up from the bottom edge. Uneven on purpose: a real web is not a wheel. */
const spokeA = [2, 16, 31, 46, 61, 76, 88].map(rad);

/** A point on the web, with the hub at the bottom-left corner. */
const P = (r: number, a: number): [number, number] => [
  +(r * Math.cos(a)).toFixed(1),
  +(S - r * Math.sin(a)).toFixed(1),
];

const spokes = spokeA.map(a => {
  const [x, y] = P(R, a);
  return `M0 ${S}L${x} ${y}`;
});

/** Rings get further apart the further out they go, the way a real one does. */
const ringR: number[] = [];
for (let r = 34; r < R - 10; r += 16 + r * 0.075) ringR.push(r);

/** Each ring sags between its spokes, so it is drawn as a run of quadratic curves. */
const rings = ringR.map(r =>
  spokeA
    .map((a, i) => {
      const [x, y] = P(r, a);
      if (!i) return `M${x} ${y}`;
      const [cx, cy] = P(r * 0.93, (a + spokeA[i - 1]) / 2);
      return `Q${cx} ${cy} ${x} ${y}`;
    })
    .join(''),
);

const dew = [[2, 1], [4, 3], [5, 5], [3, 2], [6, 4], [1, 5], [7, 2]]
  .filter(([ri]) => ri < ringR.length)
  .map(([ri, si], k) => ({ p: P(ringR[ri], spokeA[si]), d: (k * 0.83).toFixed(2) }));

/** Where she waits: just off the hub, as in the real one. */
const home = P(ringR[1], spokeA[3]);

const legL = [
  'M-1.6 -3.6L-6 -8.2L-7.4 -14',
  'M-2.2 -2.2L-8 -4.6L-11 -8.6',
  'M-2.2 -0.6L-8.2 0.6L-11 4.8',
  'M-1.8 0.8L-6.4 4.6L-8.4 10.8',
];
const legR = legL.map(d => d.replace(/([ML])-/g, '$1'));

export default function CornerWebDemo() {
  return (
    <div className="cwd relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
      <style>{`
        .cwd-strand {
          fill: none;
          stroke: var(--cwd-strand);
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: cwd-draw 1.4s cubic-bezier(0.4, 0, 0.2, 1) var(--d) forwards;
        }
        @keyframes cwd-draw { to { stroke-dashoffset: 0; } }

        .cwd-dew {
          fill: var(--cwd-dew);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation:
            cwd-dew-in 0.6s ease-out calc(1.9s + var(--d)) forwards,
            cwd-glint 7s ease-in-out calc(2.9s + var(--d)) infinite;
        }
        @keyframes cwd-dew-in { to { opacity: 0.85; } }
        @keyframes cwd-glint { 0%, 90%, 100% { transform: scale(1); } 95% { transform: scale(1.8); } }

        .cwd-spider {
          opacity: 0;
          animation: cwd-arrive 0.8s ease-out 2.1s forwards;
        }
        @keyframes cwd-arrive { to { opacity: 1; } }
        .cwd-sway { animation: cwd-sway 6s ease-in-out 3s infinite; }
        @keyframes cwd-sway {
          0%, 100% { transform: rotate(0deg); }
          35% { transform: rotate(3deg); }
          70% { transform: rotate(-2.5deg); }
        }

        /* Asked for less motion: the web is simply there, finished and still. */
        @media (prefers-reduced-motion: reduce) {
          .cwd-strand { animation: none; stroke-dashoffset: 0; }
          .cwd-dew { animation: none; opacity: 0.85; }
          .cwd-spider { animation: none; opacity: 1; }
          .cwd-sway { animation: none; }
        }
      `}</style>

      {/* A suggestion of the page the web sits in the corner of. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-slate-800 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-slate-700" />
        <span className="h-2 w-2 rounded-full bg-slate-700" />
        <span className="h-2 w-2 rounded-full bg-slate-700" />
        <span className="ml-3 h-2 w-24 rounded-full bg-slate-800" />
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 240 240"
        className="pointer-events-none absolute bottom-0 left-0 h-[78%] w-auto"
        style={
          {
            '--cwd-strand': 'rgba(251, 146, 60, 0.62)',
            '--cwd-dew': 'rgba(255, 237, 213, 0.95)',
          } as React.CSSProperties
        }
      >
        <g>
          {/* non-scaling-stroke, or the strands are drawn thinner than a pixel
              on a phone and the whole web disappears into the background. */}
          {spokes.map((d, i) => (
            <path key={`s${i}`} className="cwd-strand" strokeWidth="1.1" vectorEffect="non-scaling-stroke" pathLength={1} d={d} style={{ '--d': `${(i * 0.06).toFixed(2)}s` } as React.CSSProperties} />
          ))}
          {rings.map((d, i) => (
            <path key={`r${i}`} className="cwd-strand" strokeWidth="0.9" vectorEffect="non-scaling-stroke" pathLength={1} d={d} style={{ '--d': `${(0.45 + i * 0.1).toFixed(2)}s` } as React.CSSProperties} />
          ))}
          {dew.map(({ p, d }, i) => (
            <circle key={`d${i}`} className="cwd-dew" cx={p[0]} cy={p[1]} r="2.4" style={{ '--d': `${d}s` } as React.CSSProperties} />
          ))}
        </g>

        <g className="cwd-spider" transform={`translate(${home[0]} ${home[1]}) rotate(45)`}>
          <g className="cwd-sway" style={{ transformOrigin: 'center' }}>
            <g transform="scale(1.8)" fill="none" stroke="#2b2118" strokeWidth="1.4" strokeLinecap="round">
              {legL.map((d, i) => <path key={`ll${i}`} d={d} vectorEffect="non-scaling-stroke" />)}
              {legR.map((d, i) => <path key={`lr${i}`} d={d} vectorEffect="non-scaling-stroke" />)}
              <path d="M-0.8 -4.6L-1.3 -6.1M0.8 -4.6L1.3 -6.1" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <ellipse cx="0" cy="-2" rx="2.6" ry="2.9" fill="#3a2b1e" stroke="none" />
              <ellipse cx="0" cy="4.6" rx="4.2" ry="5.4" fill="#5c4128" stroke="none" />
              <path d="M-2.2 2.4L0 3.9L2.2 2.4M-2.8 4.9L0 6.5L2.8 4.9M-2 7.5L0 8.7L2 7.5" stroke="#e6d4ae" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
