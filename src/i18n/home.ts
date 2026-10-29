// Home page strings: hero, services cards, transition banner, Advanced Rendering playground
// (FramerPlayground), the three animation cards (AnimationShowcase) and the
// runway CTA. The meal-prep slice has its own file (mealPrepPreview.ts).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

interface ServiceCard {
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
        path: '/answering-service',
        title: 'AI Answering Service',
        body: 'A virtual receptionist that answers every call 24/7 in English or Spanish, captures the lead and books the follow-up.',
      },
      {
        path: '/meal-prep-ordering',
        title: 'Meal Prep Ordering System',
        body: 'Online ordering built for meal prep businesses: weekly menus, cutoffs, prep lists and customer accounts.',
      },
      {
        path: '/website-check',
        title: 'Free Website Check',
        body: 'See how your site scores on speed, mobile, search basics and missed-call risk in about a minute, with the top fixes in plain language.',
        cta: 'Check my site',
      },
    ] as ServiceCard[],
  },
  // The Free Website Check section under the services (src/components/HomeWebsiteCheck.tsx).
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
  banner: {
    eyebrow: 'Elevate Your Digital Presence',
    body: 'We transform flat, static websites into dynamic digital experiences. Here is a live demonstration of our rendering capabilities.',
  },
  runway: {
    eyebrow: 'Continue Exploring',
    title: 'Enter The Engine.',
  },
  playground: {
    titleA: 'Advanced ',
    titleB: 'Rendering.',
    intro: 'Interact with our high-fidelity front-end engineering. Catch the node to test frame-rate physics, or watch the DOM orchestrate sequential rendering.',
    workflowsTitle: 'Orchestrated Workflows',
    steps: ['Audit Digital Infrastructure', 'Engineer Efficiency', 'Automate Growth'],
    hooksTitle: 'State & Event Hooks',
    hooksEyebrow: 'Catch it if you can',
    caught: 'CAUGHT!',
    resetting: 'Resetting...',
    tooSlow: 'TOO SLOW!',
    catchMe: 'CATCH ME',
    caughtNote: "Got 'em. State updated, events fired, UI rendered.",
    idleNote: 'Hover to trigger evasion logic. It tires out after 3.5s.',
  },
  showcase: {
    uiPolishTitle: 'UI Polish',
    uiPolishBody: 'Powered natively by Tailwind. Perfect for crisp, lightweight hover states, button interactions, and fast-loading micro-animations.',
    fluidTitle: 'Fluid Dynamics',
    fluidBody: 'Powered by Framer Motion. Ideal for modern web portals, physics-based scaling, smooth page transitions, and continuous looping elements.',
    cinematicTitle: 'Cinematic Sequences',
    cinematicBody: 'Powered by GSAP. The industry standard for complex timeline scrubbing, scroll-driven narratives, and high-end interactive brand work.',
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
    cards: [
      {
        path: '/answering-service',
        title: 'Servicio de atención telefónica con IA',
        body: 'Una recepcionista virtual que contesta cada llamada 24/7 en inglés o español, toma los datos del cliente y agenda el seguimiento.',
      },
      {
        path: '/meal-prep-ordering',
        title: 'Sistema de pedidos para comidas preparadas',
        body: 'Pedidos en línea hechos para negocios de comidas preparadas: menús semanales, fechas límite, listas de preparación y cuentas de clientes.',
      },
      // Website Check card and section: NEW, not yet reviewed by a native speaker.
      {
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
  banner: {
    eyebrow: 'Eleve su presencia digital',
    body: 'Transformamos sitios web planos y estáticos en experiencias digitales dinámicas. Esta es una demostración en vivo de nuestras capacidades de renderizado.',
  },
  runway: {
    eyebrow: 'Siga explorando',
    title: 'Conozca El Motor.',
  },
  playground: {
    titleA: 'Renderizado ',
    titleB: 'avanzado.',
    intro: 'Interactúe con nuestra ingeniería front-end de alta fidelidad. Atrape el nodo para poner a prueba la física cuadro por cuadro, u observe cómo el DOM orquesta un renderizado secuencial.',
    workflowsTitle: 'Flujos de trabajo orquestados',
    steps: ['Auditar la infraestructura digital', 'Diseñar la eficiencia', 'Automatizar el crecimiento'],
    hooksTitle: 'Hooks de estado y eventos',
    hooksEyebrow: 'Atrápelo si puede',
    caught: '¡ATRAPADO!',
    resetting: 'Reiniciando...',
    tooSlow: '¡MUY LENTO!',
    catchMe: 'ATRÁPEME',
    caughtNote: '¡Lo atrapó! Estado actualizado, eventos disparados, interfaz renderizada.',
    idleNote: 'Pase el cursor para activar la lógica de evasión. Se cansa después de 3.5 s.',
  },
  showcase: {
    uiPolishTitle: 'Acabado de interfaz',
    uiPolishBody: 'Con tecnología nativa de Tailwind. Perfecto para estados hover nítidos y ligeros, interacciones de botones y microanimaciones de carga rápida.',
    fluidTitle: 'Dinámica de fluidos',
    fluidBody: 'Con tecnología de Framer Motion. Ideal para portales web modernos, escalado basado en física, transiciones de página suaves y elementos en bucle continuo.',
    cinematicTitle: 'Secuencias cinematográficas',
    cinematicBody: 'Con tecnología de GSAP. El estándar de la industria para controlar líneas de tiempo complejas, narrativas guiadas por el desplazamiento y trabajos de marca interactivos de alto nivel.',
  },
};

export default { en, es };
