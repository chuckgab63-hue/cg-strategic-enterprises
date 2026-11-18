// Title and meta description for every page in both languages. One list feeds
// both the browser (SeoHead updates the head on each navigation) and the build
// (vite.config.ts writes a pre-rendered HTML file per page and language, plus
// the sitemap). Plain TypeScript, no React, so vite.config.ts can import it.
//
// Spanish strings here: NEEDS NATIVE REVIEW (see docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies.ts';
import { FEATURE_META, FEATURE_SLUGS, HUB_META, MEAL_PREP_FEATURES_PATH, featurePath, type FeatureSlug } from './mealPrepFeaturesMeta.ts';
import { LAWN_CARE_META, LAWN_CARE_PATH } from './lawnCareMeta.ts';
import { PEST_CONTROL_META, PEST_CONTROL_PATH } from './pestControlMeta.ts';

export interface PageMeta {
  title: string;
  description: string;
}

export interface SiteRoute {
  /** The English path; the Spanish one is localizePath(path, 'es'). */
  path: string;
  meta: Record<Lang, PageMeta>;
  /** Open Graph image for link previews, if the page has one. */
  og?: { image: string; width: number; height: number; alt: Record<Lang, string>; type: 'article' | 'website' };
  /**
   * The sitemap's lastmod, as YYYY-MM-DD.
   *
   * The convention: lastmod is the date the page's own visible copy last
   * changed — the words a visitor reads, its headings, its images, its meta
   * title and description. Styling-only changes do not count, and neither do
   * accessibility, performance or refactoring commits that leave the copy
   * alone: a contrast fix across the site is not news to a search engine, and
   * a sitemap that claims it is gets its dates ignored. A change to shared
   * chrome (the header, the footer, the nav) only counts for a page when it
   * changed that page's own content too.
   *
   * Required, not optional: a route with no date is a route nobody decided
   * about. When a page's copy changes, move its date in the same commit —
   * src/i18n/i18n.test.ts checks the format and that no date is in the future,
   * but only a person can say whether the words actually changed.
   */
  lastmod: string;
}

/**
 * Feature pages whose own copy has moved since the set was published; the rest keep
 * their original date. See the lastmod note on SiteRoute above: a date that moves
 * without the words moving is what teaches a crawler to ignore all of them.
 */
const FEATURE_LASTMOD: Partial<Record<FeatureSlug, string>> = {
  subscriptions: '2026-11-18',
  labels: '2026-11-18',
  'getting-started': '2026-11-18',
};

const NAME = 'CG Strategic Enterprises';

export const SITE_ROUTES: SiteRoute[] = [
  {
    path: '/',
    meta: {
      en: {
        title: `${NAME} | Web, AI and Automation in Jacksonville, FL`,
        description: `Websites, AI phone answering and automation for pest control, lawn care and meal prep companies in Jacksonville, FL and beyond, from ${NAME}.`,
      },
      es: {
        title: `${NAME} | Sitios web, IA y automatización en Jacksonville, FL`,
        description: `Sitios web, atención telefónica con IA y automatización para empresas de control de plagas, cuidado del césped y comidas preparadas en Jacksonville, FL.`,
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/automations',
    meta: {
      en: {
        title: `System Automations | ${NAME}`,
        description: 'Business automations that connect your website, CRM, email and phone, so leads are captured and followed up without manual work.',
      },
      es: {
        title: `Automatización de sistemas | ${NAME}`,
        description: 'Automatizaciones que conectan su sitio web, CRM, correo electrónico y teléfono para captar clientes potenciales y darles seguimiento sin trabajo manual.',
      },
    },
    lastmod: '2026-10-29',
  },
  {
    path: ONE_SOURCE_CASE_STUDY.path,
    meta: {
      en: { title: ONE_SOURCE_CASE_STUDY.title, description: ONE_SOURCE_CASE_STUDY.description },
      es: {
        title: 'One Source Total Pest Control: caso de estudio | CG Strategic',
        description: 'Cómo renovamos en Astro el sitio de una empresa de control de plagas de Jacksonville: una página por servicio y plaga, analizador con IA y área privada.',
      },
    },
    og: {
      image: ONE_SOURCE_CASE_STUDY.ogImage,
      width: 1200,
      height: 630,
      type: 'article',
      alt: {
        en: ONE_SOURCE_CASE_STUDY.ogImageAlt,
        es: 'Página de inicio de One Source Total Pest Control: "Friendly, local pest control in Jacksonville, FL" sobre un video de palmeras',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/skunkworks',
    meta: {
      en: {
        title: `Skunkworks: AI Automation Experiments for Local Businesses | ${NAME}`,
        description: 'AI automation experiments for local businesses: missed-call callbacks, voice notes for field techs, photo-to-quote intake and bilingual voice agents.',
      },
      es: {
        title: `Skunkworks: experimentos de automatización con IA para negocios locales | ${NAME}`,
        description: 'Experimentos de automatización con IA para negocios locales: devolución de llamadas perdidas, notas de voz, cotizaciones por foto y agentes bilingües.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/cinematic',
    meta: {
      en: {
        title: `Cinematic Scale | ${NAME}`,
        description: 'Scroll-driven cinematic animation demo: full-screen type and motion carry a visitor through a three-phase story. Web design in Jacksonville, FL.',
      },
      es: {
        title: `Escala de cine | ${NAME}`,
        description: 'Demostración de animación cinematográfica guiada por el desplazamiento: tipografía a pantalla completa y movimiento que recorren una historia en tres fases.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/fluid-dynamics',
    meta: {
      en: {
        title: `Fluid Dynamics | ${NAME}`,
        description: 'Physics-based web animation demo: click any module for layout transitions, specs and capabilities across lead pipelines, automations and AI dashboards.',
      },
      es: {
        title: `Dinámica de fluidos | ${NAME}`,
        description: 'Demo de animación web basada en física: haga clic en un módulo para ver sus transiciones, detalles y capacidades en proyectos web, de IA y de automatización.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/ui-polish',
    meta: {
      en: {
        title: `Native UI Polish | ${NAME}`,
        description: 'Native UI polish demo: hover sweeps, frosted glass, neon depth and real-time form validation — the app-like interface details we build into your website.',
      },
      es: {
        title: `Interfaz con acabado nativo | ${NAME}`,
        description: 'Demostración de acabado nativo: efectos al pasar el cursor, vidrio escarchado, profundidad neón y validación de formularios en tiempo real, en su sitio web.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/meal-prep-calculator',
    meta: {
      en: {
        title: `Meal Prep Business Calculator | ${NAME}`,
        description: 'Free meal-prep business calculator: enter your price, food cost, rent, delivery and your own time to see food cost %, prime cost % and your break-even volume.',
      },
      es: {
        title: `Calculadora para negocios de comidas preparadas | ${NAME}`,
        description: 'Calculadora gratuita para comidas preparadas: ingrese precio, costo de alimentos, alquiler y su tiempo para ver el costo primo y su punto de equilibrio.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/website-check',
    meta: {
      en: {
        title: `Free Website Check | ${NAME}`,
        description: "Get a free check of your website's speed, mobile experience, search basics and missed-call risk, with the top fixes in plain language, emailed to you.",
      },
      es: {
        title: `Revisión gratuita de su sitio web | ${NAME}`,
        description: 'Revisión gratuita de la velocidad de su sitio, la experiencia en celulares, lo básico para buscadores y el riesgo de llamadas perdidas, por correo electrónico.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/missed-call-calculator',
    meta: {
      en: {
        title: `Missed-Call Cost Calculator | ${NAME}`,
        description: 'Free calculator: enter your calls per week, how many you miss and what a customer is worth to estimate what missed calls cost you each month and each year.',
      },
      es: {
        title: `Calculadora del costo de las llamadas perdidas | ${NAME}`,
        description: 'Calculadora gratuita: ingrese sus llamadas por semana, cuántas no contesta y cuánto vale un cliente para estimar lo que le cuestan al mes y al año.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/answering-service',
    meta: {
      en: {
        title: `AI Answering Service & Virtual Receptionist | ${NAME}`,
        description: 'An AI answering service for small businesses in Florida and Georgia: every call answered 24/7 in English or Spanish, leads captured, follow-ups booked.',
      },
      es: {
        title: `Servicio de atención telefónica con IA y recepcionista virtual | ${NAME}`,
        description: 'Atención telefónica con IA para pequeños negocios de Florida y Georgia: contesta cada llamada 24/7 en inglés o español, capta clientes y agenda citas.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: PEST_CONTROL_PATH,
    meta: {
      en: { title: `${PEST_CONTROL_META.en.title} | ${NAME}`, description: PEST_CONTROL_META.en.description },
      es: { title: `${PEST_CONTROL_META.es.title} | ${NAME}`, description: PEST_CONTROL_META.es.description },
    },
    lastmod: '2026-11-18',
  },
  {
    path: LAWN_CARE_PATH,
    meta: {
      en: { title: `${LAWN_CARE_META.en.title} | ${NAME}`, description: LAWN_CARE_META.en.description },
      es: { title: `${LAWN_CARE_META.es.title} | ${NAME}`, description: LAWN_CARE_META.es.description },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/meal-prep-ordering',
    meta: {
      en: {
        title: `Meal Prep Ordering System & Website for Meal Prep Businesses | ${NAME}`,
        description: 'Online ordering for meal prep businesses in Florida and Georgia, set up for you: weekly menus and plans, delivery zones and routes, labels and gift cards.',
      },
      es: {
        title: `Sistema de pedidos y sitio web para negocios de comidas preparadas | ${NAME}`,
        description: 'Pedidos en línea para negocios de comidas preparadas en Florida y Georgia: planes y menús semanales, zonas y rutas de entrega, etiquetas y tarjetas de regalo.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: MEAL_PREP_FEATURES_PATH,
    meta: {
      en: { title: `${HUB_META.en.title} | ${NAME}`, description: HUB_META.en.description },
      es: { title: `${HUB_META.es.title} | ${NAME}`, description: HUB_META.es.description },
    },
    lastmod: '2026-11-18',
  },
  // One route per feature page; the titles and descriptions are in mealPrepFeaturesMeta.ts.
  ...FEATURE_SLUGS.map((slug): SiteRoute => ({
    path: featurePath(slug),
    meta: {
      en: { title: `${FEATURE_META[slug].en.title} | ${NAME}`, description: FEATURE_META[slug].en.description },
      es: { title: `${FEATURE_META[slug].es.title} | ${NAME}`, description: FEATURE_META[slug].es.description },
    },
    lastmod: FEATURE_LASTMOD[slug] ?? '2026-11-01',
  })),
  {
    path: '/demo-guide',
    meta: {
      en: {
        title: `Meal-Prep Ordering Demo: Walkthrough Guide | ${NAME}`,
        description: 'A free PDF tour of the live meal-prep ordering demo: weekly plans, delivery and pickup, labels, gift cards, AI chat assistant, photo styling and Trend Finder.',
      },
      es: {
        title: `Demo de pedidos para meal prep: guía paso a paso | ${NAME}`,
        description: 'Guía PDF gratuita de la demo de pedidos para comidas preparadas: planes semanales, entregas, etiquetas, tarjetas de regalo, asistente de IA y Trend Finder.',
      },
    },
    lastmod: '2026-11-18',
    og: {
      image: '/og/meal-prep-demo-guide.jpg',
      width: 1200,
      height: 630,
      type: 'website',
      alt: {
        en: 'Meal-Prep Ordering Demo walkthrough guide: a page of the demo admin area with numbered steps',
        es: 'Guía paso a paso de la demo de pedidos para meal prep: una página del área de administración con pasos numerados',
      },
    },
  },
  {
    path: '/search-ai-visibility',
    meta: {
      en: {
        title: `Search & AI Visibility for Small Businesses in Florida and Georgia | ${NAME}`,
        description: 'Get found on Google, Bing, Maps and AI assistants: technical SEO, Google Business Profile, keyword-driven service pages and Spanish versions of your site.',
      },
      es: {
        title: `Visibilidad en buscadores e IA para pequeños negocios de Florida y Georgia | ${NAME}`,
        description: 'Que lo encuentren en Google, Bing, Maps y los asistentes de IA: SEO técnico, Perfil de Empresa, páginas de servicios por palabras clave y versiones en español.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/faq',
    meta: {
      en: {
        title: `FAQ | ${NAME}`,
        description: 'Answers about our websites, AI assistants and automations: how projects start, pricing and timelines, hosting and care, who owns your site, and Spanish.',
      },
      es: {
        title: `Preguntas frecuentes | ${NAME}`,
        description: 'Respuestas sobre nuestros sitios web, asistentes de IA y automatizaciones: cómo empieza un proyecto, precios, plazos, alojamiento, mantenimiento y español.',
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/contact',
    meta: {
      en: {
        title: `Contact | ${NAME}`,
        description: `Contact ${NAME} in Jacksonville, FL: call (904) 822-8929, email info@cgstrategic.dev, or message us about your web, AI or automation project.`,
      },
      es: {
        title: `Contacto | ${NAME}`,
        description: `Comuníquese con nosotros en Jacksonville, FL: llame al (904) 822-8929, escriba a info@cgstrategic.dev o cuéntenos su proyecto web, de IA o de automatización.`,
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/privacy',
    meta: {
      en: {
        title: `Privacy Policy | ${NAME}`,
        description: `How ${NAME} collects, uses and protects the information you share through this website, including contact forms and text messages.`,
      },
      es: {
        title: `Política de privacidad | ${NAME}`,
        description: `Cómo recopilamos, usamos y protegemos la información que usted comparte en este sitio web, incluidos los formularios de contacto y los mensajes de texto.`,
      },
    },
    lastmod: '2026-11-18',
  },
  {
    path: '/terms',
    meta: {
      en: {
        title: `Terms of Service | ${NAME}`,
        description: 'The terms for using cgstrategic.dev and our text message program: the services we provide, intellectual property, liability, privacy and Florida governing law.',
      },
      es: {
        title: `Términos del servicio | ${NAME}`,
        description: 'Los términos para usar cgstrategic.dev y nuestro programa de mensajes de texto: servicios, propiedad intelectual, responsabilidad, privacidad y ley de Florida.',
      },
    },
    lastmod: '2026-11-18',
  },
];

/** Other URLs that render one of the pages above; their canonical is the main path. */
export const ROUTE_ALIASES: Record<string, string> = {
  '/fluid': '/fluid-dynamics',
};

export const NOT_FOUND_META: Record<Lang, PageMeta> = {
  en: { title: `Page not found | ${NAME}`, description: 'This page does not exist.' },
  es: { title: `Página no encontrada | ${NAME}`, description: 'Esta página no existe.' },
};

/** The route for an English path (aliases resolve to their main page). */
export function findRoute(englishPath: string): SiteRoute | undefined {
  const trimmed = englishPath.length > 1 ? englishPath.replace(/\/+$/, '') : englishPath;
  const path = ROUTE_ALIASES[trimmed] ?? trimmed;
  return SITE_ROUTES.find(r => r.path === path);
}
