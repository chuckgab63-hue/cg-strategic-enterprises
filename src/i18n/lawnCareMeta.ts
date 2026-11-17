// /lawn-care's title and description in both languages, kept apart from the
// page copy so src/i18n/meta.ts (which every page loads) does not pull the copy
// into the main bundle — same split as pestControlMeta.ts.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';

export { LAWN_CARE_PATH } from '../config/lawnPackages.ts';

export const LAWN_CARE_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Lawn Care & Landscaping Website + AI Answering Service',
    description:
      'Lawn care and landscaping websites for companies in Florida and Georgia: a page per service with a seasonal switch, residential and commercial estimate forms, an AI answering service in English and Spanish, and crew, license and finance tools in your own admin area.',
  },
  es: {
    title: 'Sitios web y atención telefónica con IA para jardinería y paisajismo',
    description:
      'Sitios web de jardinería y paisajismo para empresas en Florida y Georgia: una página por servicio con interruptor de temporada, formularios de cotización residencial y comercial, atención con IA en inglés y español, y herramientas de cuadrilla, licencias y finanzas en su propia área de administración.',
  },
};
