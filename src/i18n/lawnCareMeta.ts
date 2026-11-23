// /lawn-care's title and description in both languages, kept apart from the
// page copy so src/i18n/meta.ts (which every page loads) does not pull the copy
// into the main bundle — same split as pestControlMeta.ts.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';

export { LAWN_CARE_PATH } from '../config/lawnPackages.ts';

export const LAWN_CARE_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Lawn Care & Landscaping: AI Answering Service',
    description:
      'Lawn care and landscaping websites in Florida and Georgia: a page per service with a seasonal switch, estimate forms, and a bilingual AI answering service.',
  },
  es: {
    title: 'Jardinería y paisajismo: sitios web y atención IA',
    description:
      'Sitios web de jardinería y paisajismo en Florida y Georgia: una página por servicio con interruptor de temporada, cotizaciones y atención con IA bilingüe.',
  },
};
