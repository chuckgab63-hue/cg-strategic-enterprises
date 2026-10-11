import { useEffect } from 'react';

// Sets the tab title (and optionally the meta description) while a page is
// mounted, then restores whatever was there before when it unmounts.
export default function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdMeta = !meta;
    const previousDescription = meta?.content ?? '';
    if (description) {
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    return () => {
      // A prerendered page (see vite.config.ts) starts with its own title and
      // description in the HTML; going back means the generic site head.
      document.title = document.querySelector('title')?.dataset.siteTitle ?? previousTitle;
      if (!description || !meta) return;
      if (createdMeta || meta.hasAttribute('data-prerendered')) meta.remove();
      else meta.content = previousDescription;
    };
  }, [title, description]);
}
