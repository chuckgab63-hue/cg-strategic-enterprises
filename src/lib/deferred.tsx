import { Suspense, lazy, memo, useEffect, useRef, useState, type ComponentType } from 'react';

// Below-the-fold parts of a page whose JavaScript (framer-motion, GSAP) waits
// until the page has loaded, so it doesn't compete with the first paint and
// the hero image on a slow phone. The pre-rendered HTML shows from the start:
// while the code loads, React keeps the server markup in place and takes it
// over once the chunk arrives. The code loads when the browser is idle after
// the load event, or sooner if the visitor scrolls near the section.

const NEAR = '200px 0px';

const afterLoad = (run: () => void) => {
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(run, { timeout: 2000 }) : setTimeout(run, 200));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
};

/**
 * A section component whose code loads after the page has. Use it where the
 * section sits below the first screen; it renders inside a plain <div> that
 * the browser watches for scrolling. Takes no props, and is memoized, so the
 * page re-rendering never disturbs the server markup before the code arrives.
 */
export function deferredSection(load: () => Promise<{ default: ComponentType }>) {
  let open = () => {};
  // The build's pre-render (src/entry-server.tsx) renders the section straight away.
  const gate = typeof window === 'undefined' ? Promise.resolve() : new Promise<void>(resolve => { open = resolve; });
  const Section = lazy(() => gate.then(load));

  return memo(function DeferredSection() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      afterLoad(open);
      const el = ref.current;
      if (!el || !('IntersectionObserver' in window)) return open();
      const observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) open();
      }, { rootMargin: NEAR });
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
    return (
      <div ref={ref}>
        <Suspense fallback={null}><Section /></Suspense>
      </div>
    );
  });
}

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
