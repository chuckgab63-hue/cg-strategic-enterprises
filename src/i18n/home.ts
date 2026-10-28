// Home page strings: hero, services cards, transition banner, Advanced Rendering playground
// (FramerPlayground), the three animation cards (AnimationShowcase) and the
// runway CTA. The meal-prep slice has its own file (mealPrepPreview.ts).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

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
    ],
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
    ],
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
