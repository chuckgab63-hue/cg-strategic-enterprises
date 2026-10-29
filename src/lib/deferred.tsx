import { useEffect, useState } from 'react';

// Code that can wait until the page has loaded (framer-motion in the contact
// modal), so it doesn't compete with the first paint and the hero image on a
// slow phone. It loads when the browser is idle after the load event.

const afterLoad = (run: () => void) => {
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(run, { timeout: 2000 }) : setTimeout(run, 200));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
};

/**
 * True once the page has loaded and the browser is idle. For something that
 * shows nothing until it's used, like a modal: render its lazy component (in
 * its own <Suspense>) only once this is true or it's needed, so its code
 * loads after the page. It's false in the server markup too, so hydration
 * matches.
 */
export function useAfterPageLoad(): boolean {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => afterLoad(() => setLoaded(true)), []);
  return loaded;
}
