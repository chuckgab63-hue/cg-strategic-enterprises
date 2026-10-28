// Build-time rendering: vite.config.ts bundles this file for Node and calls
// render() for every page in both languages, then writes the HTML into that
// page's file. src/main.tsx hydrates it in the browser.

import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';

/** The app's HTML for one URL path, with the page's content in place. */
export async function render(path: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // React moves any Suspense boundary bigger than this (12.8 kB by default)
    // to the end of the HTML, with a script that swaps it into place, so it can
    // stream in. Every page sits in one boundary (App.tsx) and most are bigger,
    // which would show the footer at the top of the screen until that script
    // runs. These files are complete, so keep each page where it belongs.
    { progressiveChunkSize: Infinity },
  );
  const html = await new Response(prelude).text();
  if (html.includes('<template id="B:')) throw new Error(`${path}: page content was moved out of place in the pre-rendered HTML`);
  return html;
}
