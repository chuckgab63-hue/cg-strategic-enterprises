// /meal-prep-ordering/features (the hub) and its eleven detail pages, in English
// and Spanish. Plain TypeScript with no React, so vite.config.ts can read the
// titles and descriptions (src/i18n/meta.ts) and the FAQs at build time.
//
// Each page's copy lives in mealPrepFeaturesEn.ts / mealPrepFeaturesEs.ts. Feature
// names, descriptions and plans come from the app's registry
// (src/config/mealPrepFeatureCatalog.ts), never retyped here.
//
// Rules for the copy: only what works in the live demo (checked on
// demo.cgstrategic.dev); no prices; no invented statistics; no competitor names.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { FaqItem } from './faq.ts';
import type { Lang } from './lang.ts';

import { DEMO_BASE, FEATURE_SLUGS, HUB_META, MEAL_PREP_FEATURES_PATH, MEAL_PREP_ORDERING_PATH, featurePath, type FeatureSlug } from './mealPrepFeaturesMeta.ts';
export { DEMO_BASE, FEATURE_SLUGS, HUB_META, MEAL_PREP_FEATURES_PATH, MEAL_PREP_ORDERING_PATH, featurePath, type FeatureSlug };

/** A real screenshot of the live demo (public/feature-screens, sizes in src/config/featureScreens.json). */
export interface ScreenRef {
  id: string;
  alt: string;
  caption: string;
  /** Show this language's screenshot whatever the page's language (the bilingual page shows the Spanish one). */
  forceLang?: Lang;
}

export interface HowBlock {
  /** Whose screen it is: the customer's storefront, the owner's admin, or what we do for you. */
  side: 'customer' | 'admin' | 'setup';
  title: string;
  body: string;
  points?: string[];
  screen?: ScreenRef;
}


export interface FeaturePage {
  slug: FeatureSlug;
  /** Short name: breadcrumbs, cards and links. */
  navTitle: string;
  eyebrow: string;
  /** The page's h1. */
  title: string;
  intro: string;
  /** The hub's card text. */
  card: string;
  /** The problem, in the operator's words. */
  problem: string[];
  how: HowBlock[];
  /** Catalog keys (src/config/mealPrepFeatureCatalog.ts) of the features this page covers. */
  features: string[];
  grow: { title: string; body: string }[];
  /** Deep links into the demo: a path on demo.cgstrategic.dev, and which side it opens. */
  demo: { label: string; path: string; side: 'customer' | 'admin' }[];
  faq: FaqItem[];
  related: FeatureSlug[];
}

export interface FeaturesUi {
  hubEyebrow: string;
  hubTitle: string;
  hubIntro: string;
  hubCardCta: string;
  hubPlansTitle: string;
  hubPlansBody: string;
  hubPlansLink: string;
  hubGuideCta: string;
  breadcrumbHome: string;
  breadcrumbMealPrep: string;
  breadcrumbFeatures: string;
  nav: string;
  ctaDemo: string;
  ctaAlex: string;
  newTab: string;
  problemTitle: string;
  howTitle: string;
  howIntro: string;
  side: { customer: string; admin: string; setup: string };
  englishShot: string;
  sampleData: string;
  includedTitle: string;
  includedIntro: string;
  planLabel: (plan: string, upTo: 'basic' | 'advanced' | 'pro') => string;
  growTitle: string;
  demoTitle: string;
  demoIntro: string;
  demoSide: { customer: string; admin: string };
  demoAdminNote: string;
  faqTitle: string;
  relatedTitle: string;
  closingTitle: string;
  closingBody: string;
  callLabel: string;
  guideLink: string;
  allFeatures: string;
  setupPlansTitle: string;
}

const ui = {
  en: {
    hubEyebrow: 'Meal Prep Ordering System',
    hubTitle: 'Meal Prep Ordering System Features',
    hubIntro:
      'Everything the system does, grouped by what it does for your business: recurring revenue, bigger orders, smoother delivery days, less time in the kitchen office and more customers who come back. Each page shows the real screens from the live demo, so you can see how it works before you talk to us.',
    hubCardCta: 'See how it works',
    hubPlansTitle: 'Which plan includes what',
    hubPlansBody:
      'The system comes in three plans, and each one includes everything in the plan before it. Every feature page says which plan a feature is in, and on your own site you turn features on as you are ready for them.',
    hubPlansLink: 'See the plans on the main page',
    hubGuideCta: 'Read the demo guide',
    breadcrumbHome: 'Home',
    breadcrumbMealPrep: 'Meal Prep Ordering',
    breadcrumbFeatures: 'Features',
    nav: 'Breadcrumb',
    ctaDemo: 'Try the demo',
    ctaAlex: 'Talk to Alex',
    newTab: '(opens in a new tab)',
    problemTitle: 'The problem',
    howTitle: 'How it works',
    howIntro: 'Real screens from the live demo, with sample data only.',
    side: { customer: 'What your customer sees', admin: 'What you see in the admin', setup: 'What we do for you' },
    englishShot: '(screenshot in English)',
    sampleData: 'Sample data from the demo.',
    includedTitle: 'What is included, and in which plan',
    includedIntro: 'Each plan includes everything in the plans before it.',
    planLabel: (plan, upTo) => (upTo === 'pro' ? `In the ${plan} plan` : `In ${plan} and above`),
    growTitle: 'How it helps you grow',
    demoTitle: 'Try it in the demo',
    demoIntro: 'These links open the exact screens in the live demo, in a new tab. Nothing in the demo is real: no payments, no emails, no customers.',
    demoSide: { customer: 'Customer side', admin: 'Admin side' },
    demoAdminNote: 'Admin links ask you to click Sign In once. The demo fills in the sample login for you.',
    faqTitle: 'Questions owners ask',
    relatedTitle: 'Related features',
    closingTitle: 'Want to see it with your menu?',
    closingBody: 'We set it up for you and move your existing customers over. Call us or talk to Alex, and we will show you how it would work for your business. You can also read the demo guide first.',
    callLabel: 'Call (904) 822-8929',
    guideLink: 'Read the demo guide',
    allFeatures: 'All features',
    setupPlansTitle: 'The three plans',
  } satisfies FeaturesUi,
  es: {
    hubEyebrow: 'Sistema de pedidos para comidas preparadas',
    hubTitle: 'Funciones del sistema de pedidos para comidas preparadas',
    hubIntro:
      'Todo lo que hace el sistema, agrupado por lo que hace por su negocio: ingresos recurrentes, pedidos más grandes, días de entrega más ordenados, menos tiempo de oficina y más clientes que vuelven. Cada página muestra las pantallas reales de la demo en vivo, para que vea cómo funciona antes de hablar con nosotros.',
    hubCardCta: 'Ver cómo funciona',
    hubPlansTitle: 'Qué plan incluye qué',
    hubPlansBody:
      'El sistema viene en tres planes, y cada uno incluye todo lo del plan anterior. Cada página de funciones dice en qué plan está cada función, y en su propio sitio usted activa las funciones cuando esté listo para usarlas.',
    hubPlansLink: 'Ver los planes en la página principal',
    hubGuideCta: 'Leer la guía de la demo',
    breadcrumbHome: 'Inicio',
    breadcrumbMealPrep: 'Pedidos para comidas preparadas',
    breadcrumbFeatures: 'Funciones',
    nav: 'Ruta de navegación',
    ctaDemo: 'Probar la demo',
    ctaAlex: 'Hablar con Alex',
    newTab: '(se abre en una pestaña nueva)',
    problemTitle: 'El problema',
    howTitle: 'Cómo funciona',
    howIntro: 'Pantallas reales de la demo en vivo, solo con datos de muestra.',
    side: { customer: 'Lo que ve su cliente', admin: 'Lo que usted ve en la administración', setup: 'Lo que hacemos por usted' },
    englishShot: '(captura en inglés)',
    sampleData: 'Datos de muestra de la demo.',
    includedTitle: 'Qué incluye, y en qué plan',
    includedIntro: 'Cada plan incluye todo lo de los planes anteriores.',
    planLabel: (plan, upTo) => (upTo === 'pro' ? `En el plan ${plan}` : `Desde el plan ${plan}`),
    growTitle: 'Cómo le ayuda a crecer',
    demoTitle: 'Pruébelo en la demo',
    demoIntro: 'Estos enlaces abren las pantallas exactas en la demo en vivo, en una pestaña nueva. Nada en la demo es real: no hay pagos, ni correos, ni clientes.',
    demoSide: { customer: 'Lado del cliente', admin: 'Lado de la administración' },
    demoAdminNote: 'Los enlaces de la administración le piden presionar Iniciar sesión una vez. La demo llena el inicio de sesión de muestra por usted.',
    faqTitle: 'Preguntas que hacen los dueños',
    relatedTitle: 'Funciones relacionadas',
    closingTitle: '¿Quiere verlo con su menú?',
    closingBody: 'Lo configuramos por usted y pasamos a sus clientes actuales. Llámenos o hable con Alex, y le mostramos cómo funcionaría para su negocio. También puede leer primero la guía de la demo.',
    callLabel: 'Llamar al (904) 822-8929',
    guideLink: 'Leer la guía de la demo',
    allFeatures: 'Todas las funciones',
    setupPlansTitle: 'Los tres planes',
  } satisfies FeaturesUi,
};

/** The shared labels, both languages (small). */
export const FEATURES_UI: Record<Lang, FeaturesUi> = { en: ui.en, es: ui.es };

const pageCache = new Map<Lang, Promise<FeaturePage[]>>();
/**
 * One language's page copy, loaded on demand so a page only downloads its own language. The pages read it with
 * React's use(): the build waits for it, and the browser keeps the pre-rendered HTML until it arrives.
 */
export function loadFeaturePages(lang: Lang): Promise<FeaturePage[]> {
  if (!pageCache.has(lang)) {
    pageCache.set(lang, lang === 'es' ? import('./mealPrepFeaturesEs.ts').then(m => m.FEATURE_PAGES_ES) : import('./mealPrepFeaturesEn.ts').then(m => m.FEATURE_PAGES_EN));
  }
  return pageCache.get(lang)!;
}

/** The feature slug for an English path ("/meal-prep-ordering/features/labels"), or undefined (the hub, or another page). */
export function slugFromPath(englishPath: string): FeatureSlug | undefined {
  const m = englishPath.replace(/\/+$/, '').match(/^\/meal-prep-ordering\/features\/([a-z-]+)$/);
  return FEATURE_SLUGS.find(s => s === m?.[1]);
}

/** A demo link in a language: a path on the demo with ?lang= added. */
export function demoLinkFor(base: string, path: string, lang: Lang): string {
  return `${base}${path}${path.includes('?') ? '&' : '?'}lang=${lang}`;
}
