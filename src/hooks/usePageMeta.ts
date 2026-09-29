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
      document.title = previousTitle;
      if (!description || !meta) return;
      if (createdMeta) meta.remove();
      else meta.content = previousDescription;
    };
  }, [title, description]);
}
