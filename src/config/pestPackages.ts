// The pest control offer, as data: the three packages, the feature × package
// matrix behind the comparison table, and the switches the demo on
// /pest-control flips.
//
// Prices live here and only here, behind SHOW_PRICES. While that is false no
// figure reaches the page: the cards and the table say "Pricing after a free
// 30-minute audit" instead. Flipping it to true is the only change needed to
// start showing them.
//
// Honesty rules (the same ones /skunkworks follows): `status` is what is true
// today, not what is nearly true. The words themselves live in one place,
// src/config/featureStatus.ts, so every page says the same thing.
//
// The line that decides it is whether a client is running their business on a
// feature. One Source's staff use the live admin every day: staff records,
// licensing, training, careers and applicants, onboarding and the daily digest,
// plus the Pest Analyzer and the voice assistant on the site. Those are
// 'in-use'.
//
// Everything in the newer build — contracts and everything around them, the
// feature switches themselves, the Spanish site and the Spanish half of the
// voice assistant — is built, deployed and working in the platform, and is
// switched on for a client on the day they are ready. Those are 'ready'.
// E-signature is 'ready-esign': the same, except that switching it on needs the
// client's own signing account connected first. A feature moves to 'in-use' on
// the day a client is actually using it, and not before.
//
// Plain TypeScript with no React so src/i18n/meta.ts and vite.config.ts can
// import the path. Spanish strings: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from '../i18n/lang.ts';
import type { StatusKey } from './featureStatus.ts';

export const PEST_CONTROL_PATH = '/pest-control';

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

export type TierKey = 'basic' | 'pro' | 'advanced';

/** Cheapest first; the cards and the table columns follow this order. */
export const TIER_KEYS: TierKey[] = ['basic', 'pro', 'advanced'];

/** The card that carries the "Most popular" ribbon. */
export const MOST_POPULAR: TierKey = 'pro';

/**
 * No prices on the page by default. Every project is quoted after the free
 * audit, so a number here would be a guess the visitor reads as a promise.
 * Set to true only when there is a figure we are willing to be held to.
 */
export const SHOW_PRICES = false;

/**
 * Only read when SHOW_PRICES is true. Kept as numbers, not strings, so the
 * page can format them for the visitor's language when that day comes.
 */
export const TIER_PRICES: Record<TierKey, { setup: number; monthly: number }> = {
  basic: { setup: 0, monthly: 0 },
  pro: { setup: 0, monthly: 0 },
  advanced: { setup: 0, monthly: 0 },
};

export const TIER_NAME: Record<TierKey, Record<Lang, string>> = {
  basic: { en: 'Basic', es: 'Básico' },
  pro: { en: 'Pro', es: 'Pro' },
  advanced: { en: 'Advanced', es: 'Avanzado' },
};

/** The two or three words under the package name. */
export const TIER_HEADLINE: Record<TierKey, Record<Lang, string>> = {
  basic: { en: 'Get found', es: 'Que lo encuentren' },
  pro: { en: 'Answer every lead', es: 'Responda a cada cliente' },
  advanced: { en: 'Run the office', es: 'Maneje la oficina' },
};

/** One sentence on what the package is for. */
export const TIER_PROMISE: Record<TierKey, Record<Lang, string>> = {
  basic: {
    en: 'A site people find, and a lead that always reaches you.',
    es: 'Un sitio que la gente encuentra y un cliente potencial que siempre le llega.',
  },
  pro: {
    en: 'Nobody waits for the office to open.',
    es: 'Nadie espera a que abra la oficina.',
  },
  advanced: {
    en: 'The paperwork and the phone look after themselves.',
    es: 'El papeleo y el teléfono se encargan solos.',
  },
};

// ---------------------------------------------------------------------------
// The feature × package matrix
// ---------------------------------------------------------------------------

/**
 * What we can say about a feature today. The four words, and what each one
 * means, are defined once in src/config/featureStatus.ts.
 *
 * in-use:      a pest control client is using it in production right now.
 * ready:       built and working in the platform; switched on for a client on
 *              the day they are ready.
 * ready-esign: the same, except switching it on needs the client's own
 *              e-signature account connected first.
 * service:     something CG Strategic runs alongside the platform rather than
 *              a feature of the platform itself.
 */
export type FeatureStatus = StatusKey;

export interface PackageFeature {
  key: string;
  /** The cheapest package that includes it; every package above it has it too. */
  tier: TierKey;
  label: Record<Lang, string>;
  /** A caveat shown under the label, in the table and the card. */
  note?: Record<Lang, string>;
  /** Left off for 'in-use'; statusOf() fills it in. */
  status?: Exclude<FeatureStatus, 'in-use'>;
}

/**
 * A feature's status, with the default spelled out. The cards show a chip only
 * for the three that are not already in use with a client; the table labels
 * every row, so nothing there depends on the reader knowing what an absent chip
 * means.
 */
export const statusOf = (f: PackageFeature): FeatureStatus => f.status ?? 'in-use';

export interface PackageGroup {
  key: string;
  label: Record<Lang, string>;
  features: PackageFeature[];
}

export const PACKAGE_GROUPS: PackageGroup[] = [
  {
    key: 'website',
    label: { en: 'Your website', es: 'Su sitio web' },
    features: [
      {
        key: 'fast-site',
        tier: 'basic',
        label: { en: 'Fast, mobile-first website', es: 'Sitio web rápido, pensado primero para celulares' },
      },
      {
        key: 'service-pages',
        tier: 'basic',
        label: { en: 'A page for every service you sell', es: 'Una página para cada servicio que vende' },
      },
      {
        key: 'pest-library',
        tier: 'basic',
        label: { en: 'Pest library: a page per pest people search for', es: 'Biblioteca de plagas: una página por plaga que la gente busca' },
      },
      {
        key: 'service-area',
        tier: 'basic',
        label: { en: 'Service area ZIP checker and map', es: 'Verificador de código postal y mapa del área de servicio' },
      },
      {
        key: 'mobile-bar',
        tier: 'basic',
        label: { en: 'Sticky Call and Book bar on phones', es: 'Barra fija de Llamar y Reservar en celulares' },
      },
      {
        key: 'spanish-site',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Spanish site with an EN | ES toggle and its own URLs', es: 'Sitio en español con selector EN | ES y sus propias direcciones' },
      },
    ],
  },
  {
    key: 'found',
    label: { en: 'Getting found', es: 'Que lo encuentren' },
    features: [
      {
        key: 'gbp',
        tier: 'basic',
        label: { en: 'Google Business Profile set up', es: 'Perfil de Empresa en Google configurado' },
      },
      {
        key: 'seo-basics',
        tier: 'basic',
        label: { en: 'Titles, descriptions, structured data and sitemap', es: 'Títulos, descripciones, datos estructurados y mapa del sitio' },
      },
    ],
  },
  {
    key: 'leads',
    label: { en: 'Leads', es: 'Clientes potenciales' },
    features: [
      {
        key: 'forms',
        tier: 'basic',
        label: { en: 'Lead and booking forms, built for text-message rules', es: 'Formularios de contacto y reserva, hechos para las reglas de mensajes de texto' },
      },
      {
        key: 'referral-tags',
        tier: 'basic',
        label: { en: 'Referral tracking, so you know who sent the lead', es: 'Seguimiento de referidos, para saber quién envió al cliente' },
      },
      {
        key: 'lead-intake',
        tier: 'pro',
        label: { en: 'One automated lead intake into your CRM, with notifications', es: 'Una sola entrada automática de clientes a su CRM, con avisos' },
      },
      {
        key: 'review-requests',
        tier: 'advanced',
        status: 'service',
        label: { en: 'Review requests to customers who opted in', es: 'Solicitudes de reseñas a los clientes que lo autorizaron' },
        note: {
          en: 'An automation we build and run for you, not a feature of the website.',
          es: 'Una automatización que construimos y manejamos para usted, no una función del sitio web.',
        },
      },
    ],
  },
  {
    key: 'ai',
    label: { en: 'AI on your site', es: 'IA en su sitio' },
    features: [
      // Two rows, not one with a caveat: the English assistant is in use with a
      // client and the Spanish one is built and waiting to be switched on, and a
      // single row would have to carry one chip for both. Whichever chip won,
      // half of it would be wrong.
      {
        key: 'voice-assistant',
        tier: 'pro',
        label: { en: 'An AI voice assistant on your website, in English', es: 'Un asistente de voz con IA en su sitio web, en inglés' },
      },
      {
        key: 'voice-assistant-spanish',
        tier: 'pro',
        status: 'ready',
        label: { en: 'The same voice assistant in Spanish', es: 'El mismo asistente de voz en español' },
        note: {
          en: 'Switched on together with the Spanish site.',
          es: 'Se activa junto con el sitio en español.',
        },
      },
      {
        key: 'pest-analyzer',
        tier: 'pro',
        label: { en: "Pest Analyzer: a customer's photo becomes a lead", es: 'Analizador de plagas: la foto de un cliente se convierte en un cliente potencial' },
      },
    ],
  },
  {
    key: 'control',
    label: { en: 'Your control', es: 'Su control' },
    features: [
      {
        key: 'feature-switches',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Feature switches you hold yourself — e.g. WDO inspections on or off', es: 'Interruptores que usted maneja: por ejemplo, inspecciones WDO activadas o no' },
      },
    ],
  },
  {
    key: 'office',
    label: { en: 'The office', es: 'La oficina' },
    features: [
      {
        key: 'staff',
        tier: 'pro',
        label: { en: 'Staff records with owner, office and technician roles', es: 'Registros de personal con funciones de dueño, oficina y técnico' },
      },
      {
        key: 'licensing',
        tier: 'pro',
        label: { en: 'Licensing tracker with a 30/60/90-day expiry dashboard', es: 'Control de licencias con panel de vencimientos a 30/60/90 días' },
      },
      {
        key: 'training',
        tier: 'pro',
        label: { en: 'Training log and route-ready status per technician', es: 'Registro de capacitación y estado de "listo para ruta" por técnico' },
      },
      {
        key: 'careers',
        tier: 'pro',
        label: { en: 'Careers page and applicant pipeline', es: 'Página de empleo y flujo de solicitantes' },
      },
      {
        key: 'onboarding',
        tier: 'pro',
        label: { en: 'Onboarding checklists with due dates', es: 'Listas de incorporación con fechas límite' },
      },
      {
        key: 'documents',
        tier: 'pro',
        label: { en: 'Private document storage for staff files', es: 'Almacenamiento privado de documentos del personal' },
      },
      {
        key: 'my-status',
        tier: 'pro',
        label: { en: '"My status" phone view for technicians', es: 'Vista "Mi estado" en el celular para los técnicos' },
      },
      {
        key: 'daily-digest',
        tier: 'pro',
        label: { en: 'One daily email of what expires and what is overdue', es: 'Un correo diario con lo que vence y lo que está atrasado' },
      },
    ],
  },
  {
    key: 'contracts',
    label: { en: 'Contracts and compliance', es: 'Contratos y cumplimiento' },
    features: [
      {
        key: 'digital-contracts',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Digital termite contracts, filed A–Z and searchable', es: 'Contratos digitales de termitas, archivados de A a Z y con búsqueda' },
      },
      {
        key: 'computed-dates',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Cancel, renewal and retention dates worked out for you', es: 'Fechas de cancelación, renovación y conservación calculadas por el sistema' },
      },
      {
        key: 'esign',
        tier: 'advanced',
        status: 'ready-esign',
        label: { en: 'E-signature: the customer signs on their phone', es: 'Firma electrónica: el cliente firma en su celular' },
        note: {
          en: 'Connect your signing account and the switch turns it on.',
          es: 'Conecte su cuenta de firma y el interruptor la activa.',
        },
      },
      {
        key: 'paper-import',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Paper-contract import, with a person checking every field', es: 'Importación de contratos en papel, con una persona que revisa cada campo' },
      },
      {
        key: 'protected-originals',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Protected originals that cannot be replaced or deleted', es: 'Originales protegidos que no se pueden reemplazar ni borrar' },
      },
      {
        key: 'audit-packet',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Audit packet: one PDF for an inspector, not four links', es: 'Paquete de auditoría: un solo PDF para un inspector, no cuatro enlaces' },
      },
      {
        key: 'renewals',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Renewals tracking and reminders', es: 'Seguimiento y recordatorios de renovaciones' },
      },
    ],
  },
  {
    key: 'phone',
    label: { en: 'Phone and follow-up', es: 'Teléfono y seguimiento' },
    features: [
      {
        key: 'phone-answering',
        tier: 'advanced',
        status: 'service',
        label: { en: 'AI answering on your main phone line', es: 'Atención telefónica con IA en su línea principal' },
        note: {
          en: 'A CG Strategic service alongside the platform, not part of the website.',
          es: 'Un servicio de CG Strategic junto a la plataforma, no parte del sitio web.',
        },
      },
      {
        key: 'missed-call',
        tier: 'advanced',
        status: 'service',
        label: { en: 'Missed-call follow-up', es: 'Seguimiento de llamadas perdidas' },
        note: {
          en: 'Texting depends on carrier (A2P) approval.',
          es: 'El envío de mensajes de texto depende de la aprobación de los operadores (A2P).',
        },
      },
      {
        key: 'custom-automations',
        tier: 'advanced',
        status: 'service',
        label: { en: 'Custom automations and CRM sync', es: 'Automatizaciones a medida y sincronización con su CRM' },
        note: {
          en: 'Built to your workflow after the audit, and run alongside the website.',
          es: 'Se construyen según su flujo de trabajo después de la auditoría y funcionan junto al sitio web.',
        },
      },
    ],
  },
  {
    key: 'care',
    label: { en: 'Hosting and care', es: 'Alojamiento y mantenimiento' },
    features: [
      {
        key: 'hosting',
        tier: 'basic',
        label: { en: 'Hosting, updates, backups and monitoring', es: 'Alojamiento, actualizaciones, respaldos y monitoreo' },
      },
      {
        key: 'care-plan',
        tier: 'basic',
        label: { en: 'Monthly care plan with set response times', es: 'Plan mensual de mantenimiento con tiempos de respuesta definidos' },
      },
    ],
  },
];

export const ALL_FEATURES: PackageFeature[] = PACKAGE_GROUPS.flatMap(g => g.features);

const TIER_RANK: Record<TierKey, number> = { basic: 0, pro: 1, advanced: 2 };

/** Does this package include that feature? Packages are cumulative. */
export function tierHas(tier: TierKey, feature: PackageFeature): boolean {
  return TIER_RANK[tier] >= TIER_RANK[feature.tier];
}

/** The features a package adds over the one below it, in table order. */
export function featuresAddedBy(tier: TierKey): PackageFeature[] {
  return ALL_FEATURES.filter(f => f.tier === tier);
}

// ---------------------------------------------------------------------------
// The switch demo
// ---------------------------------------------------------------------------

export type SwitchKey = 'wdo' | 'contracts' | 'esign' | 'spanish' | 'jess';

/**
 * Where a switch actually lives, which decides which group of the demo panel
 * it appears in. This distinction is the honest part of the demo:
 *
 * settings: a real row in the reference build's feature registry, moved by the
 *   owner in Admin > Settings > Features.
 * build:    decided when the site is built, not a switch in Settings. The
 *   preview still reacts to it, because it is still a real difference between
 *   one client's site and another's — it just is not something you toggle.
 */
export type SwitchGroup = 'settings' | 'build';

export interface DemoSwitch {
  key: SwitchKey;
  group: SwitchGroup;
  /**
   * Only meaningful for `settings` switches, and it sets what the panel says
   * happens on save: 'admin' applies immediately, 'public' rebuilds the public
   * site (about a minute).
   */
  scope: 'public' | 'admin';
  /** The reference build's own default, so the demo opens where a real client would. */
  default: boolean;
  /** Locked and unchangeable while its parent is off, exactly as in the real panel. */
  dependsOn?: SwitchKey;
  /** Switching it on reveals the off-site setup this code cannot check. */
  hasChecklist?: boolean;
}

export const DEMO_SWITCHES: DemoSwitch[] = [
  { key: 'contracts', group: 'settings', scope: 'admin', default: true },
  { key: 'esign', group: 'settings', scope: 'admin', default: false, dependsOn: 'contracts', hasChecklist: true },
  { key: 'wdo', group: 'settings', scope: 'public', default: false },
  { key: 'spanish', group: 'build', scope: 'public', default: true },
  { key: 'jess', group: 'build', scope: 'public', default: true },
];

export type SwitchState = Record<SwitchKey, boolean>;

export const DEMO_DEFAULTS: SwitchState = Object.fromEntries(
  DEMO_SWITCHES.map(s => [s.key, s.default]),
) as SwitchState;

/**
 * What the preview should treat as on. A switch whose parent is off is off
 * whatever its own box says — the registry rule, not a UI nicety.
 */
export function effectiveSwitch(state: SwitchState, key: SwitchKey): boolean {
  const parent = DEMO_SWITCHES.find(s => s.key === key)?.dependsOn;
  if (parent && !effectiveSwitch(state, parent)) return false;
  return state[key];
}
