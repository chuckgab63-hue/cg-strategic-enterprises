// The contract every scene module satisfies, kept at the path the ported theme files
// already import it from (`../loaders`), so those files stay byte-identical to the One
// Source originals and a later diff against that repo is still meaningful.
//
// Their version of this file also held the dynamic-import map; ours lives in ./scenes.ts
// with the rest of the parts that are ours.

export interface ThemeModule {
  id: string;
  label: string;
  /** The theme's natural accent colors (a1, a2, a3). */
  colors: [string, string, string];
  /** SVG markup for a 240x240 box, anchored bottom-left. Accent shapes carry class a1/a2/a3. */
  svg: (ctx: { uid: string }) => string;
}
