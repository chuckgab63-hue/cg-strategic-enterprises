// Home page strings: hero, services cards and the Free Website Check section.
// The case study card under the services has its own file (caseStudyCard.ts).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

/** Picks the card's icon in Home.tsx. */
export type ServiceIcon = 'automation' | 'phone' | 'ordering' | 'search' | 'website' | 'check';

interface ServiceCard {
  icon: ServiceIcon;
  /** Site path. */
  path: string;
  title: string;
  body: string;
  /** The card's link text, when it isn't "Learn more". */
  cta?: string;
}

const en = {
  hero: {
    imageAlt: 'CG Strategic Enterprises',
    titleA: 'Look established.',
    titleB: 'Or BE established.',
    p1: 'In an industry obsessed with "faking it," we operate differently. CG Strategic Enterprises is built on forty-five years of enterprise architecture experience.',
    p2: 'No smoke, mirrors, or marketing fluff. Just tested code, secure integrations, and relentless execution to streamline your operations so your team runs leaner and faster.',
    startProject: 'Start a Project',
    viewWork: 'View Our Work',
  },
  services: {
    title: 'Services',
    learnMore: 'Learn more',
    cards: [
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
        body: 'Online ordering built for meal prep businesses: weekly menus, cutoffs, prep lists and customer accounts.',
      },
      {
        icon: 'search',
        path: '/search-ai-visibility',
        title: 'Search & AI Visibility',
        body: 'Get found on Google, Bing and Apple Maps: business profiles, search-friendly pages and Spanish versions.',
      },
      {
        icon: 'website',
        path: '/portfolio',
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
    viewWork: 'Ver nuestro trabajo',
  },
  services: {
    title: 'Servicios',
    learnMore: 'Más información',
    // Services grid and case study card: NEW, not yet reviewed by a native speaker.
    cards: [
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
        body: 'Pedidos en línea hechos para negocios de comidas preparadas: menús semanales, fechas límite, listas de preparación y cuentas de clientes.',
      },
      {
        icon: 'search',
        path: '/search-ai-visibility',
        title: 'Visibilidad en buscadores e IA',
        body: 'Que lo encuentren en Google, Bing y Apple Maps: perfiles de negocio, páginas pensadas para los buscadores y versiones en español.',
      },
      {
        icon: 'website',
        path: '/portfolio',
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
