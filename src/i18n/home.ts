// Home page strings: hero, services cards and the Free Website Check section.
// The case study card under the services has its own file (caseStudyCard.ts).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { DM_RESCUE, MISSED_CALL_RESCUE as OFFER, offerMoney } from '../config/offers.ts';
import { DEMO_KEYWORD, INSTAGRAM_DM_URL } from '../config/social.ts';

/** Picks the card's icon in Home.tsx. */
export type ServiceIcon = 'automation' | 'phone' | 'voicemail' | 'dm' | 'ordering' | 'search' | 'website' | 'check' | 'pest' | 'lawn';

/**
 * One of the three industry highlights in the hero. `key` is both the icon in
 * PhoenixHero.tsx and the value sent with the home_industry_click event, so it
 * is a fixed vocabulary rather than a free string.
 */
interface IndustryCard {
  key: 'pest-control' | 'lawn-care' | 'meal-prep';
  /** Site path, localised by the component. */
  path: string;
  label: string;
  line: string;
}

interface ServiceCard {
  icon: ServiceIcon;
  /** Site path. */
  path: string;
  title: string;
  body: string;
  /** The card's link text, when it isn't "Learn more". */
  cta?: string;
  /**
   * A small pill above the title, for the one card that is a fixed-price
   * starter offer rather than a service we quote. Its price comes from
   * src/config/offers.ts, so the card cannot drift from the offer page.
   */
  badge?: string;
  /**
   * A small off-site link under the card, outside the card's own link because
   * an anchor cannot sit inside another one. The one card that has one is DM
   * Rescue, whose demo lives on Instagram rather than on this site.
   */
  secondary?: { label: string; href: string };
}

const en = {
  hero: {
    imageAlt: 'CG Strategic Enterprises',
    titleA: 'Look established.',
    titleB: 'Or BE established.',
    p1: 'In an industry obsessed with "faking it," we operate differently. CG Strategic Enterprises is built on forty-five years of enterprise architecture experience.',
    p2: 'No smoke, mirrors, or marketing fluff. Just tested code, secure integrations, and relentless execution to streamline your operations so your team runs leaner and faster.',
    startProject: 'Start a Project',
  },
  // The page's first hero: the phoenix clip, its h1 and the three industry
  // highlights (PhoenixHero.tsx). `pause` and `play` name the button that stops
  // the clip (WCAG 2.2.2); they are read out by a screen reader, never shown,
  // so they say what it does.
  //
  // Each card's line says only what its own page shows today, and the reasons
  // are here so nobody "restores" a stronger-sounding version: the pest card
  // says contracts are "digital" rather than "signed", because the client's
  // e-signature is built but not switched on; the lawn card cannot say
  // "scheduling", because online booking and the sync into scheduling software
  // have not been built (the page says so in its FAQ); and the meal prep card
  // says "no per-order platform fee" rather than "no per-order fees", because
  // Stripe's own processing fees do apply and /meal-prep-ordering says so.
  phoenix: {
    headline: 'Built to rise.',
    subline: 'AI answering, automation and websites that help local businesses grow — built for your industry.',
    cta: 'Book a free intro call',
    pause: 'Pause the background video',
    play: 'Play the background video',
    industriesLabel: 'What we build, by industry',
    demoLink: 'Try the live demo',
    industries: [
      {
        key: 'pest-control',
        path: '/pest-control',
        label: 'Pest Control',
        line: 'Calls answered, termite contracts digital, licenses tracked.',
      },
      {
        key: 'lawn-care',
        path: '/lawn-care',
        label: 'Lawn Care',
        line: 'Estimates, crews and licenses, and a site that works while you mow.',
      },
      {
        key: 'meal-prep',
        path: '/meal-prep-ordering',
        label: 'Meal Prep',
        line: 'Your own ordering platform, with no per-order platform fee.',
      },
    ] as IndustryCard[],
  },
  // The featured demo section, in place of the case study that used to sit
  // under the services grid. Every point is something the live demo and
  // /demo-guide actually show — no numbers, no results, nothing invented.
  demoFeature: {
    eyebrow: 'Live demo',
    title: 'See it working: the meal-prep ordering platform',
    body: 'A real storefront and admin area, with sample data, that you can click through right now. No sign-up, and the demo takes no payment.',
    points: [
      'Browse the weekly menu, build a bowl and watch its calories and macros change, then check out for delivery or pickup',
      'Ask the customer AI assistant about the menu in your own words, and read what it was asked on the admin Conversations page',
      'Run the week as the owner: subscribers, delivery zones by ZIP, route sheets, meal labels, packing slips and stock',
      'Switch the whole store to Spanish, or to your own name, logo and colors, from the panel at the top',
    ],
    openDemo: 'Open the live demo',
    readGuide: 'Read the demo guide',
    newTab: '(opens in a new tab)',
    imageAlt: 'The demo admin Subscriptions page: every subscriber with their plan and whether they are delivering, skipping or paused this week',
  },
  services: {
    title: 'Services',
    learnMore: 'Learn more',
    cards: [
      // First in the grid on purpose: it is the one card with a price on it and
      // the cheapest way in, so it reads before the packages that are quoted.
      {
        icon: 'voicemail',
        path: '/missed-call-rescue',
        title: 'Missed-Call Rescue',
        body: `An AI receptionist answers the calls you miss, so the job doesn't go to the next company on Google. Live in ${OFFER.liveInDays} days.`,
        cta: 'See the offer',
        badge: `Starter · ${offerMoney(OFFER.setupPrice, 'en')} setup`,
      },
      // Straight after it: the self-serve offer. Its price is in the body
      // rather than on a badge, so the grid keeps the single badge the starter
      // offer above carries -- and because "plans from" plus a free trial is
      // two facts, which is one more than a badge can hold.
      {
        icon: 'dm',
        path: '/dm-rescue',
        title: 'DM Rescue',
        body: `Instant replies to every Instagram and Facebook message, plus a text alert to you. Set it up yourself in minutes: plans from ${offerMoney(DM_RESCUE.fromMonthlyPrice, 'en')}/mo, first ${DM_RESCUE.trialDays} days free.`,
        cta: 'See the offer',
        secondary: { label: `Try it: DM us ${DEMO_KEYWORD}`, href: INSTAGRAM_DM_URL },
      },
      {
        icon: 'pest',
        path: '/pest-control',
        title: 'Pest Control Companies',
        body: 'Websites, an AI assistant that answers in English or Spanish, and the office system behind it: licenses, hiring and termite contracts. Features switch on as you grow.',
        cta: 'See the packages',
      },
      {
        icon: 'lawn',
        path: '/lawn-care',
        title: 'Lawn Care & Landscaping',
        body: 'A page per service with a seasonal switch, residential and commercial estimate forms, an AI assistant in English or Spanish, and crew, license and finance tools in your own admin area.',
        cta: 'See the packages',
      },
      {
        icon: 'automation',
        path: '/automations',
        title: 'Automation & Workflows',
        body: 'Lead capture, follow-up, CRM syncing, invoicing and review requests, running on their own.',
        cta: 'See how it works',
      },
      {
        icon: 'phone',
        path: '/answering-service',
        title: 'AI Answering Service',
        body: 'A virtual receptionist that answers every call 24/7 in English or Spanish, captures the lead and books the follow-up.',
      },
      {
        icon: 'ordering',
        path: '/meal-prep-ordering',
        title: 'Online Ordering for Meal Prep',
        body: 'Online ordering built for meal prep businesses, set up for you: weekly plans, delivery zones, labels and customer accounts.',
      },
      {
        icon: 'search',
        path: '/search-ai-visibility',
        title: 'Search & AI Visibility',
        body: 'Get found on Google, Bing and Apple Maps: business profiles, search-friendly pages and Spanish versions.',
      },
      {
        icon: 'website',
        // Was /portfolio, which is gone. The One Source write-up is the real
        // website build it was pointing at, so the card goes straight there.
        path: '/work/one-source-total-pest-control',
        title: 'Websites',
        body: 'Fast, mobile-first sites built to turn visitors into calls and bookings.',
      },
      {
        icon: 'check',
        path: '/website-check',
        title: 'Free Website Check',
        body: 'See how your site scores on speed, mobile, search basics and missed-call risk in about a minute, with the top fixes in plain language.',
        cta: 'Check my site',
      },
    ] as ServiceCard[],
  },
  // The meal-prep teaser under the services grid; the features are the
  // ones checked working in the live demo.
  mealPrep: {
    eyebrow: 'Meal prep ordering',
    title: 'Run your meal prep week from one place',
    body: 'Weekly plans your customers manage themselves, delivery zones and route sheets, pickup, printable labels and gift cards. We set it up for you and move your customers over, in English and Spanish, for meal prep businesses in Florida and Georgia.',
    link: "See what's included",
  },
  // The Free Website Check section right after the hero (src/components/HomeWebsiteCheck.tsx).
  websiteCheck: {
    badge: 'Free website check',
    title: 'Is your website costing you customers?',
    body: 'Enter your website and get a score out of 100 in about a minute: speed on desktop and mobile, search basics, and your missed-call risk, with the top fixes and an estimate of what missed calls could be costing you.',
    label: 'Your website address',
    placeholder: 'yourbusiness.com',
    submit: 'Check my site',
    error: 'Enter your website address, like yourbusiness.com.',
    checks: ['Speed', 'Mobile', 'Search basics', 'Missed-call risk'],
    note: 'Free. No sign-up needed to see your results.',
  },
};

const es: typeof en = {
  hero: {
    imageAlt: 'CG Strategic Enterprises',
    titleA: 'Parezca una empresa sólida.',
    titleB: 'O SEA una empresa sólida.',
    p1: 'En una industria obsesionada con "aparentar", trabajamos de otra manera. CG Strategic Enterprises se basa en cuarenta y cinco años de experiencia en arquitectura empresarial.',
    p2: 'Sin humo, sin espejos y sin relleno de marketing. Solo código probado, integraciones seguras y una ejecución incansable para optimizar sus operaciones, de modo que su equipo sea más ágil y rápido.',
    startProject: 'Iniciar un proyecto',
  },
  // Main hero and the demo section: NEW, not yet reviewed by a native speaker.
  phoenix: {
    headline: 'Hecho para crecer.',
    subline: 'Atención telefónica con IA, automatización y sitios web que ayudan a los negocios locales a crecer, hechos para su industria.',
    cta: 'Reserve una llamada gratis',
    pause: 'Pausar el video de fondo',
    play: 'Reproducir el video de fondo',
    industriesLabel: 'Lo que construimos, por industria',
    demoLink: 'Pruebe la demo en vivo',
    industries: [
      {
        key: 'pest-control',
        path: '/pest-control',
        label: 'Control de plagas',
        line: 'Llamadas atendidas, contratos de termitas digitales, licencias al día.',
      },
      {
        key: 'lawn-care',
        path: '/lawn-care',
        label: 'Cuidado del césped',
        line: 'Estimaciones, cuadrillas y licencias, y un sitio que trabaja mientras usted corta.',
      },
      {
        key: 'meal-prep',
        path: '/meal-prep-ordering',
        label: 'Comidas preparadas',
        line: 'Su propia plataforma de pedidos, sin comisión por pedido de nuestra parte.',
      },
    ] as IndustryCard[],
  },
  demoFeature: {
    eyebrow: 'Demo en vivo',
    title: 'Véalo funcionando: la plataforma de pedidos de comidas preparadas',
    body: 'Una tienda y un área de administración reales, con datos de muestra, que puede recorrer ahora mismo. Sin registrarse, y la demo no cobra ningún pago.',
    points: [
      'Vea el menú de la semana, arme su propio bowl y observe cómo cambian sus calorías y macros, y luego pague para entrega o para recoger',
      'Pregúntele al asistente de IA sobre el menú con sus propias palabras, y lea lo que le preguntaron en la página Conversaciones del área de administración',
      'Maneje la semana como dueño: suscriptores, zonas de entrega por código postal, hojas de ruta, etiquetas de comidas, notas de empaque e inventario',
      'Cambie toda la tienda al español, o a su propio nombre, logotipo y colores, desde el panel de arriba',
    ],
    openDemo: 'Abrir la demo en vivo',
    readGuide: 'Leer la guía de la demo',
    newTab: '(se abre en una pestaña nueva)',
    imageAlt: 'La página Suscripciones del área de administración de la demo: cada suscriptor con su plan y si esta semana recibe, omite o está en pausa',
  },
  services: {
    title: 'Servicios',
    learnMore: 'Más información',
    // Services grid and case study card: NEW, not yet reviewed by a native speaker.
    cards: [
      // Missed-Call Rescue card: NEW, not yet reviewed by a native speaker.
      {
        icon: 'voicemail',
        path: '/missed-call-rescue',
        title: 'Missed-Call Rescue',
        body: `Una recepcionista con IA contesta las llamadas que usted no alcanza, para que el trabajo no se vaya a la siguiente empresa en Google. Funcionando en ${OFFER.liveInDays} días.`,
        cta: 'Ver la oferta',
        badge: `Inicial · ${offerMoney(OFFER.setupPrice, 'es')} de instalación`,
      },
      // DM Rescue card: NEW, not yet reviewed by a native speaker.
      {
        icon: 'dm',
        path: '/dm-rescue',
        title: 'Rescate de Mensajes',
        body: `Respuestas al instante a cada mensaje de Instagram y Facebook, y una alerta por texto para usted. Actívelo usted mismo en minutos: planes desde ${offerMoney(DM_RESCUE.fromMonthlyPrice, 'es')} al mes, los primeros ${DM_RESCUE.trialDays} días gratis.`,
        cta: 'Ver la oferta',
        secondary: { label: `Pruébelo: escríbanos ${DEMO_KEYWORD}`, href: INSTAGRAM_DM_URL },
      },
      // Pest control card: NEW, not yet reviewed by a native speaker.
      {
        icon: 'pest',
        path: '/pest-control',
        title: 'Empresas de control de plagas',
        body: 'Sitios web, un asistente de IA que responde en inglés o español y el sistema de oficina detrás de todo: licencias, contratación y contratos de termitas. Las funciones se activan a medida que crece.',
        cta: 'Ver los paquetes',
      },
      // Lawn care card: NEW, not yet reviewed by a native speaker.
      {
        icon: 'lawn',
        path: '/lawn-care',
        title: 'Jardinería y paisajismo',
        body: 'Una página por servicio con interruptor de temporada, formularios de cotización residencial y comercial, un asistente de IA en inglés o español, y herramientas de cuadrilla, licencias y finanzas en su propia área de administración.',
        cta: 'Ver los paquetes',
      },
      {
        icon: 'automation',
        path: '/automations',
        title: 'Automatización y flujos de trabajo',
        body: 'Captura de clientes potenciales, seguimiento, sincronización con su CRM, facturación y solicitudes de reseñas, funcionando por sí solos.',
        cta: 'Vea cómo funciona',
      },
      {
        icon: 'phone',
        path: '/answering-service',
        title: 'Servicio de atención telefónica con IA',
        body: 'Una recepcionista virtual que contesta cada llamada 24/7 en inglés o español, toma los datos del cliente y agenda el seguimiento.',
      },
      {
        icon: 'ordering',
        path: '/meal-prep-ordering',
        title: 'Pedidos en línea para comidas preparadas',
        body: 'Pedidos en línea hechos para negocios de comidas preparadas, configurados por nosotros: planes semanales, zonas de entrega, etiquetas y cuentas de clientes.',
      },
      {
        icon: 'search',
        path: '/search-ai-visibility',
        title: 'Visibilidad en buscadores e IA',
        body: 'Que lo encuentren en Google, Bing y Apple Maps: perfiles de negocio, páginas pensadas para los buscadores y versiones en español.',
      },
      {
        icon: 'website',
        path: '/work/one-source-total-pest-control',
        title: 'Sitios web',
        body: 'Sitios rápidos, pensados primero para celulares y hechos para convertir visitas en llamadas y reservas.',
      },
      // Website Check card and section: NEW, not yet reviewed by a native speaker.
      {
        icon: 'check',
        path: '/website-check',
        title: 'Revisión gratuita de su sitio web',
        body: 'Vea cómo califica su sitio en velocidad, celulares, básicos de búsqueda y riesgo de llamadas perdidas en alrededor de un minuto, con las mejoras principales explicadas en lenguaje sencillo.',
        cta: 'Revisar mi sitio',
      },
    ],
  },
  mealPrep: {
    eyebrow: 'Pedidos para comidas preparadas',
    title: 'Maneje su semana de comidas preparadas desde un solo lugar',
    body: 'Planes semanales que sus clientes manejan por su cuenta, zonas de entrega y hojas de ruta, recogida, etiquetas imprimibles y tarjetas de regalo. Lo configuramos por usted y pasamos a sus clientes al nuevo sistema, en inglés y en español, para negocios de comidas preparadas en Florida y Georgia.',
    link: 'Ver qué incluye',
  },
  websiteCheck: {
    badge: 'Revisión gratuita del sitio web',
    title: '¿Su sitio web le está costando clientes?',
    body: 'Ingrese su sitio web y reciba una puntuación de 0 a 100 en alrededor de un minuto: velocidad en computadora y en celulares, básicos de búsqueda y su riesgo de llamadas perdidas, con las mejoras principales y una estimación de cuánto le podrían estar costando las llamadas perdidas.',
    label: 'La dirección de su sitio web',
    placeholder: 'sunegocio.com',
    submit: 'Revisar mi sitio',
    error: 'Ingrese la dirección de su sitio web, por ejemplo sunegocio.com.',
    checks: ['Velocidad', 'Celulares', 'Básicos de búsqueda', 'Riesgo de llamadas perdidas'],
    note: 'Gratis. No necesita registrarse para ver sus resultados.',
  },
};

export default { en, es };
