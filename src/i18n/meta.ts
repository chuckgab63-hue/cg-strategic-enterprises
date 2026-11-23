// Title and meta description for every page in both languages. One list feeds
// both the browser (SeoHead updates the head on each navigation) and the build
// (vite.config.ts writes a pre-rendered HTML file per page and language, plus
// the sitemap). Plain TypeScript, no React, so vite.config.ts can import it.
//
// Spanish strings here: NEEDS NATIVE REVIEW (see docs/SPANISH_REVIEW.md).

import { LANGS, type Lang } from './lang.ts';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies.ts';
import { FEATURE_META, FEATURE_SLUGS, HUB_META, MEAL_PREP_FEATURES_PATH, featurePath, type FeatureSlug } from './mealPrepFeaturesMeta.ts';
import { LAWN_CARE_META, LAWN_CARE_PATH } from './lawnCareMeta.ts';
import { PEST_CONTROL_META, PEST_CONTROL_PATH } from './pestControlMeta.ts';
import { DM_RESCUE_PATH, MISSED_CALL_RESCUE_PATH } from '../config/offers.ts';

export interface PageMeta {
  title: string;
  description: string;
}

export interface SiteRoute {
  /** The English path; the Spanish one is localizePath(path, 'es'). */
  path: string;
  meta: Record<Lang, PageMeta>;
  /**
   * Open Graph image for link previews, if the page has one.
   *
   * One path for both languages, or one per language where the picture has
   * words burnt into it and a translated version of it exists. Alt text is
   * always per language, because the alt describes the image to someone who
   * cannot see it and that belongs in their language either way.
   */
  og?: {
    image: string | Record<Lang, string>;
    width: number;
    height: number;
    alt: Record<Lang, string>;
    type: 'article' | 'website' | 'video.other';
    /**
     * Only the watch pages: the mp4 itself, for og:video. `path` is
     * site-relative, and one per language where the two languages are
     * different recordings — the same shape, and the same reason, as `image`
     * above. A share card that plays the English file on the Spanish page is
     * the bug this prevents.
     */
    video?: { path: string | Record<Lang, string>; type: string; width: number; height: number };
  };
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
  /**
   * The languages this page exists in. Omitted means every language, which is
   * all but the video watch pages built from an English-only recording: those
   * list ['en'], and their /es/ URL is never routed, pre-rendered, listed in
   * the sitemap or named in an hreflang tag.
   */
  langs?: Lang[];
}

/** The languages a route exists in; every language unless it says otherwise. */
export function routeLangs(route: SiteRoute): Lang[] {
  return route.langs ?? LANGS;
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
/**
 * The brand, short, for titles that would otherwise run past what a search
 * result shows. Bing's URL Inspection flags a title over about 65 characters
 * as an error, and the full name costs 27 of them — so a page whose own words
 * are worth keeping trades the "Enterprises" instead of its keywords.
 *
 * Used only where the long form does not fit. Most of the site still reads
 * NAME; several of those titles are also over the limit and are a separate
 * decision, not something to change by sweeping this constant across them.
 */
const SHORT_NAME = 'CG Strategic';

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
    // 2026-11-20: the Missed-Call Rescue card's link now names the offer page,
    // and its badge moved from Prototype to Ready.
    lastmod: '2026-11-20',
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
    // 2026-11-20: the second button now opens the Missed-Call Rescue offer.
    lastmod: '2026-11-20',
  },
  {
    path: '/answering-service',
    meta: {
      en: {
        title: `AI Answering Service & Virtual Receptionist | ${SHORT_NAME}`,
        description: 'An AI answering service for small businesses in Florida and Georgia: every call answered 24/7 in English or Spanish, leads captured, follow-ups booked.',
      },
      es: {
        title: `Atención telefónica con IA y recepcionista virtual | ${SHORT_NAME}`,
        description: 'Atención telefónica con IA para pequeños negocios de Florida y Georgia: contesta cada llamada 24/7 en inglés o español, capta clientes y agenda citas.',
      },
    },
    lastmod: '2026-11-23',
  },
  {
    // The fixed-price starter offer. Its price, timeline and inclusions are
    // src/config/offers.ts, which is where the path comes from too. The figures
    // are written out here rather than imported: this file is in the bundle
    // every page loads, and src/config/offers.test.ts fails if a number here
    // ever drifts from the offer config.
    path: MISSED_CALL_RESCUE_PATH,
    meta: {
      en: {
        title: `Missed-Call Rescue: AI Receptionist in 14 Days | ${SHORT_NAME}`,
        description: 'A starter offer for local service businesses: an AI receptionist answers the calls you miss and your after-hours calls in English or Spanish. $497 setup, $149/month.',
      },
      es: {
        title: `Missed-Call Rescue: recepcionista IA en 14 días | ${SHORT_NAME}`,
        description: 'Oferta inicial para negocios locales de servicios: una recepcionista con IA contesta sus llamadas perdidas y las de fuera de horario, en inglés o español. $497 de instalación y $149 al mes.',
      },
    },
    // Cut from the 1200x900 card in design/og/missed-call-rescue-src.jpg (a
    // master, so it lives beside the other design sources rather than in
    // public/, where it would be served to every visitor for nothing). The
    // brand lockup at the top and the price block are 654px apart there, so no
    // 1200x630 window holds both: this one starts below the lockup and keeps
    // the headline, the three bullets, the price block and the line with the
    // URL and the phone number, which is where the name goes on the card now.
    // The alternative was scaling the whole thing down behind side bars, at 14%
    // smaller text. Same straight-crop choice /lawn-care made.
    //
    // One image for both languages: its words are burnt in in English and there
    // is no Spanish version of the card, so /es gets the English picture and a
    // Spanish alt that quotes the headline — what /pest-control already does.
    og: {
      image: '/og/missed-call-rescue.jpg',
      width: 1200,
      height: 630,
      type: 'website',
      alt: {
        en: 'Missed-Call Rescue: "Never lose another job to voicemail", an AI receptionist on the calls you miss, live in 14 days, $497 setup and $149 a month',
        es: 'Vista previa de Missed-Call Rescue: "Never lose another job to voicemail", una recepcionista con IA en las llamadas que usted no alcanza, $497 de instalación y $149 al mes',
      },
    },
    // Unmoved: a link-preview image is not copy a visitor reads. It happens to
    // be today's date anyway, the day the page went up.
    lastmod: '2026-11-23',
  },
  {
    // The second fixed-price offer. Same arrangement as the one above: the
    // prices and the inclusions are src/config/offers.ts, which is where the
    // path comes from, and the figures are written out here rather than
    // imported because this file is in the bundle every page loads.
    // src/config/dmRescue.test.ts fails if a number here drifts from the
    // offer config.
    path: DM_RESCUE_PATH,
    meta: {
      en: {
        title: `DM Rescue: Instant Instagram & Facebook Replies | ${SHORT_NAME}`,
        description: 'Auto-reply to every Instagram DM and Facebook message in seconds, send your menu or quote link, and get a text alert. $397 setup + $129/mo.',
      },
      es: {
        title: `Rescate de Mensajes: Instagram y Facebook | ${SHORT_NAME}`,
        description: 'Conteste cada mensaje de Instagram y Facebook en segundos, envíe su menú o su enlace de cotización y reciba una alerta por texto. $397 de instalación y $129 al mes.',
      },
    },
    // Drawn as a 1200x630 card rather than cropped from a master, so there is
    // no separate source file: design/og/dm-rescue.html is the card, and
    // scripts/og-dm-rescue.mjs is what turned it into this JPEG. Same dark
    // ground, same orange and the same wordmark line as the Missed-Call
    // Rescue card above.
    //
    // One image for both languages: its words are burnt in in English and
    // there is no Spanish version of the card, so /es gets the English
    // picture and a Spanish alt that quotes the headline — what
    // /missed-call-rescue and /pest-control already do.
    og: {
      image: '/og/dm-rescue.jpg',
      width: 1200,
      height: 630,
      type: 'website',
      alt: {
        en: 'DM Rescue: "Stop losing customers in your DMs.", instant replies to every Instagram and Facebook message, $397 setup and $129 a month, from CG Strategic',
        es: 'Vista previa de DM Rescue: "Stop losing customers in your DMs.", respuestas al instante a cada mensaje de Instagram y Facebook, $397 de instalación y $129 al mes',
      },
    },
    lastmod: '2026-11-23',
  },
  {
    path: PEST_CONTROL_PATH,
    meta: {
      en: { title: `${PEST_CONTROL_META.en.title} | ${SHORT_NAME}`, description: PEST_CONTROL_META.en.description },
      es: { title: `${PEST_CONTROL_META.es.title} | ${SHORT_NAME}`, description: PEST_CONTROL_META.es.description },
    },
    // The tour poster, cropped to 1200x630. One image for both languages:
    // the headline is burnt into it in English and there is no Spanish
    // recording of this tour to cut a Spanish card from.
    og: {
      image: '/og/pest-control.jpg',
      width: 1200,
      height: 630,
      type: 'website',
      alt: {
        en: 'Pest control websites, done right: a Florida home under a golden dome of spray at sunset',
        es: 'Vista previa de control de plagas: "Pest control websites, done right" sobre una casa de Florida bajo una cúpula dorada al atardecer',
      },
    },
    lastmod: '2026-11-23',
  },
  {
    path: LAWN_CARE_PATH,
    meta: {
      en: { title: `${LAWN_CARE_META.en.title} | ${SHORT_NAME}`, description: LAWN_CARE_META.en.description },
      es: { title: `${LAWN_CARE_META.es.title} | ${SHORT_NAME}`, description: LAWN_CARE_META.es.description },
    },
    // The tour video's poster, re-cropped from the 1280x720 master to the
    // 1200x630 that LinkedIn, Facebook and X all read, so the preview card
    // shows the same frame a visitor sees on the page.
    //
    // JPEG and not the WebP beside it, which is 24KB smaller: LinkedIn's
    // scraper rejects WebP outright and shows a blank card, and og:image has
    // no <picture>-style fallback -- a crawler reads one URL and renders what
    // it gets. The WebP is kept for anything on-site that wants the lighter
    // file; the tag has to stay on the JPEG.
    og: {
      image: '/og/lawn-care.jpg',
      width: 1200,
      height: 630,
      type: 'website',
      alt: {
        en: 'Lawn care websites, done right: a crew member on a zero-turn mower on a striped lawn at sunset',
        es: 'Vista previa de jardinería: "Lawn care websites, done right" sobre un operario en una podadora de giro cero al atardecer',
      },
    },
    // Unmoved on purpose: a link-preview image is not copy a visitor reads,
    // and the lastmod note above says styling and plumbing do not count.
    lastmod: '2026-11-23',
  },
  {
    path: '/meal-prep-ordering',
    meta: {
      en: {
        title: `Meal Prep Ordering System & Website | ${SHORT_NAME}`,
        description: 'Online ordering for meal prep businesses in Florida and Georgia, set up for you: weekly menus and plans, delivery zones and routes, labels and gift cards.',
      },
      es: {
        title: `Comidas preparadas: sistema de pedidos en línea | ${SHORT_NAME}`,
        description: 'Pedidos en línea para negocios de comidas preparadas en Florida y Georgia: planes y menús semanales, zonas y rutas de entrega, etiquetas y tarjetas de regalo.',
      },
    },
    // The only page with a card per language: the demo video was recorded
    // twice, so its poster exists with Spanish words on it as well as English.
    // Sharing the English card on /es/meal-prep-ordering when the Spanish one
    // is sitting right there would be the odd choice.
    og: {
      image: {
        en: '/og/meal-prep-ordering.jpg',
        es: '/og/meal-prep-ordering-es.jpg',
      },
      width: 1200,
      height: 630,
      type: 'website',
      alt: {
        en: 'Online ordering for meal prep: a phoenix of fire over the ocean at sunrise',
        es: 'Pedidos en línea para comidas preparadas: un ave fénix de fuego sobre el mar al amanecer',
      },
    },
    // 2026-11-19: the demo video in the hero, and the Spanish page's link to it.
    lastmod: '2026-11-23',
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
        title: `Search & AI Visibility for Small Businesses | ${SHORT_NAME}`,
        description: 'Get found on Google, Bing, Maps and AI assistants: technical SEO, Google Business Profile, keyword-driven service pages and Spanish versions of your site.',
      },
      es: {
        title: `Visibilidad en buscadores e IA para negocios | ${SHORT_NAME}`,
        description: 'Que lo encuentren en Google, Bing, Maps y los asistentes de IA: SEO técnico, Perfil de Empresa, páginas de servicios por palabras clave y versiones en español.',
      },
    },
    lastmod: '2026-11-23',
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
  {
    // The video hub. Not a watch page itself, so no og:video and no
    // <video:video>: it lists the pages that are.
    path: '/videos',
    meta: {
      en: {
        title: `Demo Videos: AI Answering, Ordering & Websites | ${SHORT_NAME}`,
        description: 'Watch the demos: an AI receptionist answering a missed call, instant Instagram and Facebook replies, and full tours of the websites and admin areas we build.',
      },
      es: {
        title: `Videos: IA, pedidos en línea y sitios web | ${SHORT_NAME}`,
        description: 'Vea las demostraciones: una recepcionista con IA contestando una llamada perdida, respuestas al instante en Instagram y Facebook, y recorridos por los sitios que construimos.',
      },
    },
    lastmod: '2026-11-23',
  },
  {
    path: '/videos/missed-call-rescue-demo',
    meta: {
      en: {
        title: `AI Answering Service Demo: Missed-Call Rescue | ${SHORT_NAME}`,
        description: 'Watch an AI receptionist answer a missed call, take the details and text the lead to the owner. A 72-second demo of Missed-Call Rescue, with captions.',
      },
      es: {
        title: `Demo de recepcionista con IA: Missed-Call Rescue | ${SHORT_NAME}`,
        description: 'Vea una recepcionista con IA contestar una llamada perdida, tomar los datos y enviarle el cliente potencial por mensaje. Demostración de 87 segundos, con subtítulos.',
      },
    },
    og: {
      image: '/og/missed-call-rescue.jpg',
      width: 1200,
      height: 630,
      type: 'video.other',
      alt: {
        en: 'Missed-Call Rescue demo video: an AI receptionist answering a missed call',
        es: 'Video de Missed-Call Rescue: una recepcionista con IA contestando una llamada perdida',
      },
      video: { path: { en: '/videos/missed-call-rescue-hero.mp4', es: '/videos/missed-call-rescue-hero-es.mp4' }, type: 'video/mp4', width: 1280, height: 720 },
    },
    lastmod: '2026-11-23',
  },
  {
    path: '/videos/dm-rescue-demo',
    meta: {
      en: {
        title: `Instagram Auto-Reply Demo: DM Rescue | ${SHORT_NAME}`,
        description: 'An 18-second look at DM Rescue: a customer messages at 9pm, gets an answer in seconds, and the owner gets a text. Instagram and Facebook replies on autopilot.',
      },
      es: {
        title: `Demo de respuestas automáticas: DM Rescue | ${SHORT_NAME}`,
        description: 'Un video de 18 segundos sobre DM Rescue: un cliente escribe a las 9 de la noche, recibe respuesta en segundos y el dueño recibe un mensaje de texto.',
      },
    },
    og: {
      image: '/og/dm-rescue.jpg',
      width: 1200,
      height: 630,
      type: 'video.other',
      alt: {
        en: 'DM Rescue demo video: an instant reply to an Instagram message at 9pm',
        es: 'Video de DM Rescue: una respuesta al instante a un mensaje de Instagram',
      },
      video: { path: '/videos/dm-rescue-reel.mp4', type: 'video/mp4', width: 1080, height: 1920 },
    },
    lastmod: '2026-11-23',
    langs: ['en'],
  },
  {
    path: '/videos/meal-prep-ordering-tour',
    meta: {
      en: {
        title: `Meal Prep Ordering Demo: Full Tour | ${SHORT_NAME}`,
        description: 'A full tour of online ordering for meal prep, both sides: the weekly menu, macros, plans and checkout, then orders, prep lists, labels and delivery routes.',
      },
      es: {
        title: `Demo de pedidos para comidas preparadas | ${SHORT_NAME}`,
        description: 'Un recorrido completo por los pedidos en línea para comidas preparadas: el menú semanal, los macros, los planes y el pago, y del otro lado los pedidos y las rutas.',
      },
    },
    og: {
      image: '/og/meal-prep-ordering.jpg',
      width: 1200,
      height: 630,
      type: 'video.other',
      alt: {
        en: 'Meal prep online ordering demo video: the weekly menu and the kitchen side',
        es: 'Video de pedidos en línea para comidas preparadas: el menú semanal y la cocina',
      },
      video: { path: { en: '/videos/mealprep-demo-hero.mp4', es: '/videos/mealprep-demo-hero-es.mp4' }, type: 'video/mp4', width: 1280, height: 720 },
    },
    lastmod: '2026-11-23',
  },
  {
    path: '/videos/lawn-care-site-tour',
    meta: {
      en: {
        title: `Lawn Care Website Demo: Site & Admin Tour | ${SHORT_NAME}`,
        description: 'A 72-second tour of a lawn care and landscaping website and the office system behind it: quote forms, an AI assistant, Spanish in one tap, and crew logins.',
      },
      es: {
        title: `Demo de sitio web de jardinería: recorrido completo | ${SHORT_NAME}`,
        description: 'Un recorrido de 72 segundos por un sitio web de jardinería y paisajismo y el sistema de oficina detrás: cotizaciones, asistente con IA y accesos para la cuadrilla.',
      },
    },
    og: {
      image: '/og/lawn-care.jpg',
      width: 1200,
      height: 630,
      type: 'video.other',
      alt: {
        en: 'Lawn care website tour video: the site and the admin area behind it',
        es: 'Video del recorrido por un sitio de jardinería: el sitio y su área de administración',
      },
      video: { path: '/videos/lawn-tour-hero.mp4', type: 'video/mp4', width: 1280, height: 720 },
    },
    lastmod: '2026-11-23',
    langs: ['en'],
  },
  {
    path: '/videos/pest-control-site-tour',
    meta: {
      en: {
        title: `Pest Control Website Demo: Site & Admin Tour | ${SHORT_NAME}`,
        description: 'A 74-second tour of a pest control website and the office system behind it: a page per service, a photo pest analyzer, an AI voice assistant and licence tracking.',
      },
      es: {
        title: `Demo de sitio web de control de plagas: recorrido | ${SHORT_NAME}`,
        description: 'Un recorrido de 74 segundos por un sitio web de control de plagas y el sistema de oficina detrás: una página por servicio, analizador por foto y asistente con IA.',
      },
    },
    og: {
      image: '/og/pest-control.jpg',
      width: 1200,
      height: 630,
      type: 'video.other',
      alt: {
        en: 'Pest control website tour video: the site and the admin area behind it',
        es: 'Video del recorrido por un sitio de control de plagas: el sitio y su administración',
      },
      video: { path: '/videos/pest-tour-hero.mp4', type: 'video/mp4', width: 1280, height: 720 },
    },
    lastmod: '2026-11-23',
    langs: ['en'],
  },
  {
    path: '/videos/never-miss-a-customer',
    meta: {
      en: {
        title: `Never Miss a Customer: Calls + DMs Answered | ${SHORT_NAME}`,
        description: 'A 25-second look at Missed-Call Rescue and DM Rescue together: the call answered, the DMs replied to in seconds, and a text to you, even on your day off.',
      },
      es: {
        title: `No pierda ningún cliente: llamadas y mensajes | ${SHORT_NAME}`,
        description: 'Un video de 25 segundos con Missed-Call Rescue y DM Rescue juntos: la llamada contestada, los mensajes respondidos en segundos y un texto para usted.',
      },
    },
    og: {
      image: '/og/missed-call-rescue.jpg',
      width: 1200,
      height: 630,
      type: 'video.other',
      alt: {
        en: 'Rescue Bundle video: a diver off duty while the calls and DMs are answered',
        es: 'Video del Paquete Rescate: un buzo en su día libre mientras se contestan las llamadas',
      },
      video: { path: '/videos/dm-call-manta-reel.mp4', type: 'video/mp4', width: 1080, height: 1920 },
    },
    lastmod: '2026-11-23',
    langs: ['en'],
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
