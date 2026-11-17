// Colour styles for the seasonal animations. Themes mark their accent shapes with the classes
// a1 / a2 / a3; the engine fills them with a flat colour or an animated SVG gradient.

export type PaletteId = 'natural' | 'vibrant' | 'chrome' | 'neon' | 'holographic' | 'gold' | 'surprise';

export interface Palette {
  id: PaletteId;
  label: string;
  /** Three flat accent colours. null = the theme's own natural colours. */
  flat: [string, string, string] | null;
  /** Animated gradient colour cycle (hue/shine shifts slowly across each shape). */
  gradient?: string[];
  /** Soft static glow around accent shapes. */
  glow?: boolean;
}

export const PALETTES: Palette[] = [
  { id: 'natural', label: 'Natural', flat: null },
  { id: 'vibrant', label: 'Vibrant', flat: ['#ff2d6f', '#ffc400', '#18b8ff'] },
  {
    id: 'chrome',
    label: 'Iridescent chrome',
    flat: ['#b9c6d6', '#9fb2c8', '#dfe8f2'],
    gradient: ['#f4f8fc', '#8da3bb', '#c7a8ff', '#7fd3ff', '#e9f1f9', '#5d7189'],
  },
  { id: 'neon', label: 'Neon', flat: ['#39ff14', '#ff2bd6', '#00e5ff'], glow: true },
  {
    id: 'holographic',
    label: 'Holographic',
    flat: ['#c66bff', '#4dfff3', '#ff6ec7'],
    gradient: ['#ff6ec7', '#a78bff', '#4dfff3', '#b6ff6e', '#ffd36e', '#ff8ad8'],
  },
  {
    id: 'gold',
    label: 'Gold leaf',
    flat: ['#d4a017', '#f1c84b', '#a8770f'],
    gradient: ['#fff1a8', '#e0aa1f', '#8a6414', '#ffe27a', '#c88f12'],
  },
  { id: 'surprise', label: 'Surprise me', flat: null },
];

export function paletteById(id: string): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}

/** A random non-"surprise" palette (picked once per visit). */
export function pickSurprise(): Palette {
  const pool = PALETTES.filter((p) => p.id !== 'surprise' && p.id !== 'natural');
  return pool[Math.floor(Math.random() * pool.length)];
}
