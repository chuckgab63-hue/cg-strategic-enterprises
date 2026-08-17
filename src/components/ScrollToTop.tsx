import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forces the browser to the top left of the screen instantly
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render any UI
}