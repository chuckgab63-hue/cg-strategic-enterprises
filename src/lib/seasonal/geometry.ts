// Geometry for a corner web anchored at the bottom-left of a 240x240 box (shared by themes).
export const S = 240;
const rad = (d: number) => (d * Math.PI) / 180;
export const spokeA = [2, 16, 31, 46, 61, 76, 88].map(rad);
export const R = 232;
export const P = (r: number, a: number): [number, number] => [+(r * Math.cos(a)).toFixed(1), +(S - r * Math.sin(a)).toFixed(1)];

export const spokes = spokeA.map((a) => {
  const [x, y] = P(R, a);
  return `M0 ${S}L${x} ${y}`;
});

export const ringR: number[] = [];
for (let r = 30; r < R - 6; r += 14 + r * 0.075) ringR.push(r);

export const rings = ringR.map((r) =>
  spokeA
    .map((a, i) => {
      const [x, y] = P(r, a);
      if (!i) return `M${x} ${y}`;
      const [cx, cy] = P(r * 0.93, (a + spokeA[i - 1]) / 2);
      return `Q${cx} ${cy} ${x} ${y}`;
    })
    .join(''),
);

/** The web as SVG path markup; `stroke` is a CSS colour/var. */
export function webMarkup(stroke: string, opacity = 0.7): string {
  return (
    `<g fill="none" stroke="${stroke}" stroke-linecap="round" opacity="${opacity}">` +
    spokes.map((d) => `<path d="${d}" stroke-width="0.9"/>`).join('') +
    rings.map((d) => `<path d="${d}" stroke-width="0.6"/>`).join('') +
    `</g>`
  );
}

/** A cartoon spider hanging head-up from a thread: head on top, abdomen below. Origin = body centre, ~8 units wide. */
export function legsMarkup(): string {
  const side =
    '<path d="M-1.4 -1L-5 -4L-8.2 -2.4"/><path d="M-1.6 0.4L-6 -0.8L-9 1.6"/>' +
    '<path d="M-1.6 1.6L-5.6 3L-8.4 5.8"/><path d="M-1.2 2.8L-4 6.2L-5.2 9.4"/>';
  return (
    `<g fill="none" stroke="var(--leg,#2b2118)" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">` +
    `<g>${side}</g><g transform="scale(-1 1)">${side}</g></g>`
  );
}

export function eyesMarkup(): string {
  return (
    '<circle cx="-0.95" cy="-2.7" r="0.85" fill="#fff"/><circle cx="0.95" cy="-2.7" r="0.85" fill="#fff"/>' +
    '<circle cx="-0.95" cy="-2.6" r="0.4" fill="#1a120b"/><circle cx="0.95" cy="-2.6" r="0.4" fill="#1a120b"/>'
  );
}
