import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// How long to keep looking for a #hash target, in frames (~2 s): pages load
// lazily, so the element may not exist yet when the URL changes.
const HASH_WAIT_FRAMES = 120;

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // Forces the browser to the top left of the screen instantly
    window.scrollTo(0, 0);
  }, [pathname]);

  // Links to a section (the header's "Services" -> /#services) jump to it, as
  // the browser would on a full page load. Runs on every navigation (key), so
  // clicking "Services" again works when the URL already ends in #services.
  // Targets use scroll-mt-* to clear the fixed header.
  useEffect(() => {
    if (!hash) return;
    let frame = 0;
    let tries = 0;
    const find = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      } else if (tries++ < HASH_WAIT_FRAMES) {
        frame = requestAnimationFrame(find);
      }
    };
    frame = requestAnimationFrame(find);
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);

  return null; // This component doesn't render any UI
}
