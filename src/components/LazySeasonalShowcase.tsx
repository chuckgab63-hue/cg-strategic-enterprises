import { Suspense, lazy, useEffect, useRef, useState } from 'react';

// The gate in front of the seasonal showcase. /pest-control is the page with the least
// performance headroom on the site, so nothing about the showcase -- not the component,
// not the seventeen scene chunks -- may be in its bundle or its first load. This file is
// the only thing the page imports, and it is a few hundred bytes: the import below runs
// when the frame is within 300px of the viewport, and not before.
//
// The placeholder is the same square the showcase renders, with the same border and the
// same aspect-ratio box, so the swap moves nothing on the page and CLS stays at 0.
const Showcase = lazy(() => import('./SeasonalShowcase'));

export default function LazySeasonalShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setNear(true); return; }
    const io = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) { setNear(true); io.disconnect(); } },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {near
        ? <Suspense fallback={<Placeholder />}><Showcase /></Suspense>
        : <Placeholder />}
    </div>
  );
}

/** Holds the exact space the showcase will take: square frame, caption line, controls row. */
function Placeholder() {
  return (
    <div aria-hidden="true">
      <div className="w-full aspect-square rounded-2xl border border-slate-700 bg-slate-950" />
      <p className="mt-3 text-sm leading-relaxed text-slate-300">&nbsp;</p>
      <div className="mt-2 h-8" />
    </div>
  );
}
