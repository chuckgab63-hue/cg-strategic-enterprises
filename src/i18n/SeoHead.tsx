import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { headFor } from './head';

// Keeps <html lang>, the title, description, canonical, hreflang, robots and
// Open Graph tags in step with the current URL as the visitor navigates.
// Every tag it manages carries data-seo; the pre-rendered HTML files
// (vite.config.ts) use the same marker, so the first navigation replaces them.
export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = headFor(pathname);
    document.documentElement.lang = head.htmlLang;
    document.title = head.title;

    document.head.querySelectorAll('[data-seo]').forEach(el => el.remove());
    const add = (tag: 'meta' | 'link', attrs: Record<string, string>) => {
      const el = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      el.setAttribute('data-seo', '');
      document.head.appendChild(el);
    };

    add('meta', { name: 'description', content: head.description });
    if (head.noindex) add('meta', { name: 'robots', content: 'noindex' });
    if (head.canonical) add('link', { rel: 'canonical', href: head.canonical });
    head.alternates.forEach(a => add('link', { rel: 'alternate', hreflang: a.hreflang, href: a.href }));
    if (head.og) {
      const og = head.og;
      [
        ['og:type', og.type], ['og:site_name', og.siteName], ['og:locale', og.locale],
        ['og:title', og.title], ['og:description', og.description], ['og:url', og.url],
        ['og:image', og.image], ['og:image:width', String(og.imageWidth)],
        ['og:image:height', String(og.imageHeight)], ['og:image:alt', og.imageAlt],
      ].forEach(([property, content]) => add('meta', { property, content }));
      add('meta', { name: 'twitter:card', content: 'summary_large_image' });
    }
  }, [pathname]);

  return null;
}
