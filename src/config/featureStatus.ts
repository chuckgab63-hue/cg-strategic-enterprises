// The status vocabulary, in one place: the words every page uses to say where a
// feature stands, in English and Spanish.
//
// There are two honest things to say about a feature we have built, and the
// difference between them matters:
//
//   in-use      a client is running their business on it in production today.
//   ready       built, working in the platform, and switched on for a client on
//               the day they are ready. Not "coming", not "being rolled out" —
//               the work is done and the switch is theirs to move.
//
// Two statuses sit beside those. 'ready-esign' is the same as 'ready' except
// that switching it on needs the client's own signing account connected first,
// which is not something we can do for them. 'service' is something CG
// Strategic runs alongside the platform rather than a feature of it.
//
// A feature moves to 'in-use' on the day a client is actually using it, and not
// before. That rule is the whole point of having these words.
//
// Pages read the words from here rather than writing their own, so the chips on
// /pest-control, the table legend, the deep-dives and the /skunkworks cards
// cannot drift apart. `label` is the full chip; `short` is the compact form for
// places where a sentence would not fit (the /skunkworks badges and filters);
// `meaning` is the one-line definition the legends print.
//
// Plain TypeScript with no React, so config and prerender code can import it.
// Spanish strings: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from '../i18n/lang.ts';

export type StatusKey = 'in-use' | 'ready' | 'ready-esign' | 'service';

export interface StatusCopy {
  label: Record<Lang, string>;
  short: Record<Lang, string>;
  meaning: Record<Lang, string>;
}

export const FEATURE_STATUS: Record<StatusKey, StatusCopy> = {
  'in-use': {
    label: { en: 'In use with a client', es: 'En uso con un cliente' },
    short: { en: 'In use', es: 'En uso' },
    meaning: {
      en: 'Running in production with a client today.',
      es: 'Funcionando en producción hoy con un cliente.',
    },
  },
  ready: {
    label: { en: 'Built — ready to switch on', es: 'Listo para activar' },
    short: { en: 'Ready', es: 'Listo' },
    meaning: {
      en: 'Built and working; switched on for a client when they are ready.',
      es: 'Construido y funcionando; se activa para un cliente cuando esté listo.',
    },
  },
  'ready-esign': {
    label: {
      en: 'Built — switches on once your e-signature account is connected',
      es: 'Listo — se activa al conectar su cuenta de firma electrónica',
    },
    short: {
      en: 'Ready — needs your signing account',
      es: 'Listo — falta su cuenta de firma',
    },
    meaning: {
      en: 'Built and working; it switches on for your company once your e-signature account is connected.',
      es: 'Construido y funcionando; se activa en su empresa al conectar su cuenta de firma electrónica.',
    },
  },
  service: {
    label: { en: 'Service, not software', es: 'Servicio, no software' },
    short: { en: 'Service', es: 'Servicio' },
    meaning: {
      en: 'Something we run alongside the platform rather than part of the website.',
      es: 'Algo que manejamos junto a la plataforma, no una parte del sitio web.',
    },
  },
};

export const statusLabel = (key: StatusKey, lang: Lang) => FEATURE_STATUS[key].label[lang];
export const statusShort = (key: StatusKey, lang: Lang) => FEATURE_STATUS[key].short[lang];
export const statusMeaning = (key: StatusKey, lang: Lang) => FEATURE_STATUS[key].meaning[lang];
