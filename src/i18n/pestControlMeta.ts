// /pest-control's title and description in both languages, kept apart from the
// page copy so src/i18n/meta.ts (which every page loads) does not pull the copy
// into the main bundle — same split as mealPrepFeaturesMeta.ts.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';

export { PEST_CONTROL_PATH } from '../config/pestPackages.ts';

export const PEST_CONTROL_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Pest Control Website & AI Answering Service',
    description:
      'Websites built for pest control companies in Florida and Georgia: a page for every service, an AI answering service in English and Spanish, Pest Analyzer photo ID, and digital termite contracts with e-signature. Switch features on as you grow.',
  },
  es: {
    title: 'Sitios web y atención telefónica con IA para control de plagas',
    description:
      'Sitios web hechos para empresas de control de plagas en Florida y Georgia: una página por servicio, atención telefónica con IA en inglés y español, identificación de plagas por foto y contratos digitales de termitas con firma electrónica.',
  },
};
