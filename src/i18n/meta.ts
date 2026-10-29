// Title and meta description for every page in both languages. One list feeds
// both the browser (SeoHead updates the head on each navigation) and the build
// (vite.config.ts writes a pre-rendered HTML file per page and language, plus
// the sitemap). Plain TypeScript, no React, so vite.config.ts can import it.
//
// Spanish strings here: NEEDS NATIVE REVIEW (see docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies.ts';

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
}

const NAME = 'CG Strategic Enterprises';

export const SITE_ROUTES: SiteRoute[] = [
  {
    path: '/',
    meta: {
      en: {
        title: `${NAME} | Web, AI and Automation in Jacksonville, FL`,
        description: `${NAME} builds websites, AI assistants and business automations for local businesses in Jacksonville, FL and beyond.`,
      },
      es: {
        title: `${NAME} | Sitios web, IA y automatización en Jacksonville, FL`,
        description: `${NAME} crea sitios web, asistentes de IA y automatizaciones para negocios locales en Jacksonville, FL y otras ciudades.`,
      },
    },
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
  },
  {
    path: '/portfolio',
    meta: {
      en: {
        title: `Case Studies | ${NAME}`,
        description: 'Case studies of our website, AI and automation work, starting with a full rebuild for a Florida pest control company.',
      },
      es: {
        title: `Casos de estudio | ${NAME}`,
        description: 'Casos de estudio de nuestro trabajo en sitios web, IA y automatización, empezando por una renovación completa para una empresa de control de plagas en Florida.',
      },
    },
  },
  {
    path: ONE_SOURCE_CASE_STUDY.path,
    meta: {
      en: { title: ONE_SOURCE_CASE_STUDY.title, description: ONE_SOURCE_CASE_STUDY.description },
      es: {
        title: 'One Source Total Pest Control: caso de estudio | CG Strategic',
        description: 'Cómo renovamos en Astro el sitio web de una empresa de control de plagas de Jacksonville: una página para cada servicio y plaga, un analizador de fotos de plagas con IA, un asistente de voz con IA, un solo flujo automatizado para clientes potenciales y un área privada de administración para licencias, capacitación y contratación.',
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
  },
  {
    path: '/skunkworks',
    meta: {
      en: {
        title: `Skunkworks: AI Automation Experiments for Local Businesses | ${NAME}`,
        description: 'AI automation experiments for local businesses: missed-call callbacks, voice notes for field techs, photo-to-quote intake, bilingual voice agents and more, each labeled Concept, Prototype or In use.',
      },
      es: {
        title: `Skunkworks: experimentos de automatización con IA para negocios locales | ${NAME}`,
        description: 'Experimentos de automatización con IA para negocios locales: devolución inmediata de llamadas perdidas, notas de voz para técnicos de campo, cotizaciones a partir de fotos, agentes de voz bilingües y más, cada uno marcado como Concepto, Prototipo o En uso.',
      },
    },
  },
  {
    path: '/cinematic',
    meta: {
      en: {
        title: `Cinematic Scale | ${NAME}`,
        description: 'A demo of large, cinematic, scroll-driven animation for websites.',
      },
      es: {
        title: `Escala de cine | ${NAME}`,
        description: 'Una demostración de animaciones grandes y cinematográficas, controladas por el desplazamiento, para sitios web.',
      },
    },
  },
  {
    path: '/fluid-dynamics',
    meta: {
      en: {
        title: `Fluid Dynamics | ${NAME}`,
        description: 'A demo of fluid, physics-based interface animation for websites.',
      },
      es: {
        title: `Dinámica de fluidos | ${NAME}`,
        description: 'Una demostración de animaciones de interfaz fluidas y basadas en física para sitios web.',
      },
    },
  },
  {
    path: '/ui-polish',
    meta: {
      en: {
        title: `Native UI Polish | ${NAME}`,
        description: 'A demo of app-like interface details on the web: gestures, transitions and micro-interactions.',
      },
      es: {
        title: `Interfaz con acabado nativo | ${NAME}`,
        description: 'Una demostración de detalles de interfaz como los de una app, en la web: gestos, transiciones y microinteracciones.',
      },
    },
  },
  {
    path: '/meal-prep-calculator',
    meta: {
      en: {
        title: `Meal Prep Business Calculator | ${NAME}`,
        description: 'Free meal-prep business calculator: enter your price, food cost, kitchen rent, delivery and your own time to see food cost %, prime cost %, contribution per meal, and the break-even volume that matters most.',
      },
      es: {
        title: `Calculadora para negocios de comidas preparadas | ${NAME}`,
        description: 'Calculadora gratuita para negocios de comidas preparadas: ingrese su precio, costo de alimentos, alquiler de cocina, entregas y su propio tiempo para ver el % de costo de alimentos, el % de costo primo, la contribución por comida y el volumen de equilibrio que más importa.',
      },
    },
  },
  {
    path: '/website-check',
    meta: {
      en: {
        title: `Free Website Check | ${NAME}`,
        description: "Get a free check of your website's speed, mobile experience, search basics and missed-call risk, with the top fixes in plain language. We'll email you the report.",
      },
      es: {
        title: `Revisión gratuita de su sitio web | ${NAME}`,
        description: 'Reciba una revisión gratuita de la velocidad de su sitio, la experiencia en celulares, lo básico para buscadores y el riesgo de llamadas perdidas, con las mejoras principales en lenguaje sencillo. Le enviaremos el informe por correo electrónico.',
      },
    },
  },
  {
    path: '/missed-call-calculator',
    meta: {
      en: {
        title: `Missed-Call Cost Calculator | ${NAME}`,
        description: 'Free calculator: enter your calls per week, how many you miss, how many of those callers never try again, and what a customer is worth to estimate the revenue missed calls could be costing you each month and year.',
      },
      es: {
        title: `Calculadora del costo de las llamadas perdidas | ${NAME}`,
        description: 'Calculadora gratuita: ingrese sus llamadas por semana, cuántas no contesta, cuántas de esas personas no vuelven a llamar y cuánto vale un cliente para estimar los ingresos que las llamadas perdidas podrían costarle cada mes y cada año.',
      },
    },
  },
  {
    path: '/answering-service',
    meta: {
      en: {
        title: `AI Answering Service & Virtual Receptionist | ${NAME}`,
        description: 'An AI answering service for Florida small businesses. Answers every call 24/7 in English or Spanish, captures leads and books follow-ups. Talk to Alex.',
      },
      es: {
        title: `Servicio de atención telefónica con IA y recepcionista virtual | ${NAME}`,
        description: 'Servicio de atención telefónica con IA para pequeños negocios de Florida: contesta cada llamada 24/7 en inglés o español, capta clientes y agenda seguimientos.',
      },
    },
  },
  {
    path: '/meal-prep-ordering',
    meta: {
      en: {
        title: `Meal Prep Ordering System & Website for Meal Prep Businesses | ${NAME}`,
        description: 'An online ordering system built for meal prep businesses: weekly menus, cutoffs, prep lists and customer accounts. See the live demo.',
      },
      es: {
        title: `Sistema de pedidos y sitio web para negocios de comidas preparadas | ${NAME}`,
        description: 'Pedidos en línea para negocios de comidas preparadas: menús semanales, fechas límite, listas de preparación y cuentas de clientes. Vea la demo en vivo.',
      },
    },
  },
  {
    path: '/search-ai-visibility',
    meta: {
      en: {
        title: `Search & AI Visibility for Florida Small Businesses | ${NAME}`,
        description: 'Get found on Google, Bing, Maps and AI assistants: technical SEO, Google Business Profile, keyword-driven service pages, AI search visibility and Spanish versions.',
      },
      es: {
        title: `Visibilidad en buscadores e IA para pequeños negocios de Florida | ${NAME}`,
        description: 'Que lo encuentren en Google, Bing, Maps y los asistentes de IA: SEO técnico, Perfil de Empresa en Google, páginas de servicios por palabras clave, búsqueda con IA y versiones en español.',
      },
    },
  },
  {
    path: '/faq',
    meta: {
      en: {
        title: `FAQ | ${NAME}`,
        description: 'Answers about our websites, AI assistants and automations: how projects start, pricing, timelines, hosting and care, who owns your website and data, Alex our AI assistant, and working in Spanish.',
      },
      es: {
        title: `Preguntas frecuentes | ${NAME}`,
        description: 'Respuestas sobre nuestros sitios web, asistentes de IA y automatizaciones: cómo empieza un proyecto, precios, plazos, alojamiento y mantenimiento, quién es dueño de su sitio web y sus datos, Alex, nuestro asistente de IA, y nuestro trabajo en español.',
      },
    },
  },
  {
    path: '/contact',
    meta: {
      en: {
        title: `Contact | ${NAME}`,
        description: `Contact ${NAME} in Jacksonville, FL. Call (904) 822-8929, email info@cgstrategic.dev, or send us a message about your web, AI, or automation project.`,
      },
      es: {
        title: `Contacto | ${NAME}`,
        description: `Comuníquese con ${NAME} en Jacksonville, FL. Llame al (904) 822-8929, escriba a info@cgstrategic.dev o envíenos un mensaje sobre su proyecto web, de IA o de automatización.`,
      },
    },
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
        description: `Cómo ${NAME} recopila, usa y protege la información que usted comparte en este sitio web, incluidos los formularios de contacto y los mensajes de texto.`,
      },
    },
  },
  {
    path: '/terms',
    meta: {
      en: {
        title: `Terms of Service | ${NAME}`,
        description: `The terms for using the ${NAME} website and our text message program.`,
      },
      es: {
        title: `Términos del servicio | ${NAME}`,
        description: `Los términos para usar el sitio web de ${NAME} y nuestro programa de mensajes de texto.`,
      },
    },
  },
];

/** Other URLs that render one of the pages above; their canonical is the main path. */
export const ROUTE_ALIASES: Record<string, string> = {
  '/case-studies': '/portfolio',
  '/case-study': '/portfolio',
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
