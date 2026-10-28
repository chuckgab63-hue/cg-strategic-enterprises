// /portfolio page copy, plus the tap-to-launch wrapper (MobileExpandWidget)
// around its demos. Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  backToHub: 'BACK TO HUB',
  title: ['Case ', 'Studies.'],
  intro: 'A selection of high-fidelity frontend engineering and automated infrastructure deployments.',
  opensNewTab: '(opens in a new tab)',
  tryDemo: 'Try it out! Interact with the live demo.',
  whiteLabel: {
    tag: 'White-Label Platform',
    sub: 'Runs in Your Browser',
    heading: ['Your Brand.', 'Your Storefront.'],
    subheading: 'See It With Your Name On It',
    body: [
      "Type in your business name, pick your colours, add a logo — about ten seconds later you're browsing your own storefront. Then keep going: the whole platform is there to click through.",
      'Customers get a full storefront: a menu they can filter by diet and allergens, a cart, accounts and reviews. You get a real admin dashboard for meals, pricing, coupons, pickup locations and incoming orders.',
      "Every meal photo is AI-generated in one consistent, on-brand style, and an existing WooCommerce catalogue can already be imported so the platform starts from your actual menu. Coming from Shopify, Square or a plain CSV or spreadsheet export instead? Those imports are straightforward to add, and which one fits is something we'd work out on the discovery call.",
    ],
    privateTitle: 'Private by Design',
    privateBody: "The demo runs entirely in your browser. Nothing you enter leaves your machine, and nothing you change affects anyone else. Payments aren't processed in the demo.",
    openStorefront: 'Open the Storefront',
    adminDashboard: 'Admin Dashboard',
    demoLogin: 'Demo login, resets on reload',
    storefrontAlt: 'Demo storefront rebranded as Your Kitchen, with the branding panel open',
    adminAlt: 'Demo admin dashboard listing meals with prices and availability',
    relatedEyebrow: 'Related free tool',
    relatedBody: 'Planning a meal-prep business? See how many meals a week it takes to cover your kitchen and pay yourself.',
    relatedCta: 'Try the meal-prep calculator',
  },
  mealPrep: {
    tag: 'Full Ordering Platform',
    sub: 'Meal Prep Concept',
    heading: ['Order Ahead,', 'Simplified.'],
    subheading: 'A Complete Ordering Experience',
    body: [
      "A complete custom ordering flow, built around a business's real menu and its weekly cutoff schedule. Customers browse meals, ask an AI assistant for picks that fit their goals, build a cart, and check out for delivery or pickup — all without leaving the page.",
      'Instead of a generic storefront, the whole experience is shaped around one menu and one cutoff, with instant order confirmation to the customer and immediate notification to the kitchen. The menu here is a demo; no real food is prepared or delivered.',
    ],
    planningTitle: 'Planning One?',
    planningBody: 'Run your price, food cost, kitchen rent and delivery through our free calculator and see how many meals a week it takes to break even.',
    runNumbers: 'Run the Numbers',
    widgetLabel: 'Meal Prep Ordering Demo',
  },
  oneSource: {
    tag: 'Website Rebuild & Automation',
    heading: ['A Pest Control Site', 'Rebuilt to Book Jobs.'],
    subheading: 'Website, AI Tools & Lead Automation',
    body: [
      'One Source is a licensed pest control company in Jacksonville, FL. Their old single-page site was hard for search engines to read, had broken contact buttons and open AI endpoints, and sent leads to their CRM in a mess.',
      'We rebuilt it in Astro on Vercel with a page for every service and pest, a photo-based Pest Analyzer, a "Talk to Jess" AI voice assistant, a ZIP code checker, and one Make.com intake that routes every lead into GorillaDesk.',
      'Behind the site, a private admin area tracks staff licenses, supervised training and hiring, with applications from the new Careers page flowing straight in.',
    ],
    readCaseStudy: 'Read the case study',
    visitSite: 'Visit the site',
    tryDemo: 'Try a pest photo diagnosis demo.',
    widgetLabel: 'Pest Diagnostic Demo',
  },
  property: {
    widgetLabel: 'Property Ops Hub Demo',
    tag: 'Time-Saving Automation',
    sub: '3 Workflows, One Hub',
    heading: ['Property Ops', 'Intelligence.'],
    subheading: 'Three Workflows. One Widget.',
    body: [
      'This single widget handles three of the most common property management workflows: logging site progress with photos, triaging and routing maintenance requests, and letting prospective tenants book their own property showings.',
      'Instead of juggling separate apps, text threads, and phone tag, property managers get one place where field updates, repair requests, and showing bookings all flow in — automatically organized, routed, and ready to act on.',
    ],
  },
  asset: {
    tag: 'Real-Time Tracking',
    sub: 'Logistics & Fleet Ops',
    heading: ['Asset Tracking', 'Intelligence.'],
    subheading: 'See Every Dumpster, Instantly.',
    body: [
      'Built for a dumpster rental operation serving demolition and remodeling contractors. A driver logs a drop-off with the job site address, and it instantly appears as a pin on a live, aggregated map — no separate app, no manual spreadsheet updates.',
      "Every drop-off and return triggers a real-time email, and a daily digest rolls up the day's activity automatically. When a unit heads back to the yard, one tap marks it returned and clears it from the active map.",
    ],
    widgetLabel: 'Asset Tracker Demo',
  },
  tax: {
    tag: 'Financial Data',
    sub: 'Automated Compliance',
    heading: ['Algorithmic', 'Tax Routing.'],
    subheading: 'Real-Time Liability Calculation',
    body: [
      'Eliminating the friction of quarterly corporate tax documentation. This component acts as a listener on central revenue streams, intercepting transaction data as it settles.',
      'It calculates state and federal liabilities dynamically, updating a live dashboard so executives have total clarity on operational margins and tax reserves without waiting for end-of-month reconciliations.',
    ],
    widgetLabel: 'Tax Engine Demo',
  },
  searchVisibility: {
    tag: 'Search & AI Visibility',
    heading: ['Get Found.', 'Then Get Chosen.'],
    intro: "Ads rent attention. Search visibility builds it. We set up the technical, local and AI-search foundations that help customers find you on Google, Bing, Maps and AI assistants, and we track what's working.",
    // Same order as SEARCH_CARD_ICONS in src/pages/Portfolio.tsx.
    cards: [
      {
        title: 'Technical SEO Foundation',
        body: 'XML sitemaps submitted to Google Search Console and Bing Webmaster Tools, clean page titles and descriptions, and structured data (FAQ schema) so search engines understand your pages.',
      },
      {
        title: 'Local Search & Maps',
        body: 'Google Business Profile setup and optimization, including service-area setup, categories, hours and weekly posts, plus Bing Places and Apple Business Connect, so you show up when locals search nearby.',
      },
      {
        title: 'Keyword-Driven Service Pages',
        body: 'We research what your customers actually type into search, then build pages around those exact phrases instead of guessing.',
      },
      {
        title: 'AI Search Visibility',
        body: "Clear, question-and-answer content and structured data help AI assistants like Copilot and ChatGPT understand and recommend your business. Bing's index also powers several AI search tools, so we optimize for it, not just Google.",
      },
      {
        title: 'Bilingual Reach',
        body: "English and Spanish versions of your key pages, so you're found by Florida's Spanish-speaking customers too.",
      },
      {
        title: 'Email That Lands in the Inbox',
        body: 'Domain authentication (SPF, DKIM and DMARC) so your follow-ups and quotes reach inboxes instead of spam folders, plus tracked links so you can see which campaigns bring visitors.',
      },
    ],
    closing: 'Same playbook we run on our own site. Want to see where you stand?',
    button: 'Run a free website check',
  },
  next: {
    eyebrow: 'Next Frontier',
    title: 'Explore Skunkworks.',
  },
  mobileExpand: {
    tapToTry: 'Tap to Try the Live Demo',
    closeLabel: 'Close demo and return to Case Studies',
    back: 'Back to Case Studies',
  },
};

const es: typeof en = {
  backToHub: 'VOLVER AL INICIO',
  title: ['Casos de ', 'estudio.'],
  intro: 'Una selección de proyectos de ingeniería frontend de alta fidelidad e implementaciones de infraestructura automatizada.',
  opensNewTab: '(se abre en una pestaña nueva)',
  tryDemo: '¡Pruébelo! Interactúe con la demostración en vivo.',
  whiteLabel: {
    tag: 'Plataforma de marca blanca',
    sub: 'Funciona en su navegador',
    heading: ['Su marca.', 'Su tienda en línea.'],
    subheading: 'Véala con el nombre de su negocio',
    body: [
      'Escriba el nombre de su negocio, elija sus colores y agregue un logotipo: unos diez segundos después estará navegando por su propia tienda en línea. Luego siga explorando: toda la plataforma está disponible para recorrerla.',
      'Sus clientes obtienen una tienda completa: un menú que pueden filtrar por dieta y alérgenos, un carrito, cuentas y reseñas. Usted obtiene un panel de administración real para comidas, precios, cupones, puntos de recogida y pedidos entrantes.',
      'Cada foto de comida se genera con IA en un estilo uniforme y acorde con su marca, y ya se puede importar un catálogo existente de WooCommerce para que la plataforma parta de su menú real. ¿Viene de Shopify, de Square o de una simple exportación en CSV u hoja de cálculo? Esas importaciones son fáciles de agregar, y cuál le conviene es algo que definiríamos en la llamada inicial.',
    ],
    privateTitle: 'Privacidad desde el diseño',
    privateBody: 'La demostración funciona completamente en su navegador. Nada de lo que ingrese sale de su equipo y nada de lo que cambie afecta a otras personas. En la demostración no se procesan pagos.',
    openStorefront: 'Abrir la tienda',
    adminDashboard: 'Panel de administración',
    demoLogin: 'Acceso de demostración; se restablece al recargar',
    storefrontAlt: 'Tienda de demostración con la marca "Your Kitchen" y el panel de personalización de marca abierto',
    adminAlt: 'Panel de administración de demostración con una lista de comidas, precios y disponibilidad',
    relatedEyebrow: 'Herramienta gratuita relacionada',
    relatedBody: '¿Está planeando un negocio de comidas preparadas? Vea cuántas comidas por semana necesita vender para cubrir su cocina y pagarse un sueldo.',
    relatedCta: 'Pruebe la calculadora de comidas preparadas',
  },
  mealPrep: {
    tag: 'Plataforma completa de pedidos',
    sub: 'Concepto de comidas preparadas',
    heading: ['Pedidos anticipados,', 'simplificados.'],
    subheading: 'Una experiencia de pedido completa',
    body: [
      'Un flujo de pedidos completo y a la medida, construido en torno al menú real de un negocio y su horario semanal de cierre de pedidos. Los clientes exploran las comidas, le piden a un asistente de IA sugerencias acordes con sus objetivos, arman su carrito y pagan para entrega a domicilio o para recoger, todo sin salir de la página.',
      'En lugar de una tienda genérica, toda la experiencia gira en torno a un solo menú y un solo cierre de pedidos, con confirmación instantánea para el cliente y aviso inmediato a la cocina. El menú que ve aquí es de demostración; no se prepara ni se entrega comida real.',
    ],
    planningTitle: '¿Está planeando uno?',
    planningBody: 'Ingrese su precio, costo de alimentos, alquiler de cocina y entregas en nuestra calculadora gratuita y vea cuántas comidas por semana necesita para alcanzar el punto de equilibrio.',
    runNumbers: 'Haga los cálculos',
    widgetLabel: 'Demostración de pedidos de comidas preparadas',
  },
  oneSource: {
    tag: 'Renovación del sitio web y automatización',
    heading: ['Un sitio de control de plagas', 'renovado para agendar servicios.'],
    subheading: 'Sitio web, herramientas de IA y automatización de clientes potenciales',
    body: [
      'One Source es una empresa de control de plagas con licencia en Jacksonville, FL. Su antiguo sitio de una sola página era difícil de leer para los motores de búsqueda, tenía botones de contacto que no funcionaban y endpoints de IA expuestos, y enviaba los clientes potenciales a su CRM de forma desordenada.',
      'Lo reconstruimos en Astro sobre Vercel con una página para cada servicio y cada plaga, un analizador de plagas a partir de fotos (Pest Analyzer), un asistente de voz con IA llamado "Talk to Jess", un verificador de códigos postales y un único flujo de entrada en Make.com que envía cada cliente potencial a GorillaDesk.',
      'Detrás del sitio, un área privada de administración lleva el control de las licencias del personal, la capacitación supervisada y las contrataciones, y las solicitudes de la nueva página de empleos llegan directamente allí.',
    ],
    readCaseStudy: 'Leer el caso de estudio',
    visitSite: 'Visitar el sitio',
    tryDemo: 'Pruebe una demostración de diagnóstico de plagas por foto.',
    widgetLabel: 'Demostración de diagnóstico de plagas',
  },
  property: {
    widgetLabel: 'Demostración del centro de operaciones de propiedades',
    tag: 'Automatización que ahorra tiempo',
    sub: '3 flujos de trabajo, un solo centro',
    heading: ['Inteligencia para', 'operaciones de propiedades.'],
    subheading: 'Tres flujos de trabajo. Un solo widget.',
    body: [
      'Este único widget maneja tres de los flujos de trabajo más comunes en la administración de propiedades: registrar el avance de obra con fotos, clasificar y asignar solicitudes de mantenimiento, y permitir que los posibles inquilinos programen sus propias visitas a las propiedades.',
      'En lugar de lidiar con aplicaciones separadas, cadenas de mensajes de texto y llamadas que nunca coinciden, los administradores de propiedades tienen un solo lugar al que llegan las actualizaciones de campo, las solicitudes de reparación y las citas de visita, organizadas y asignadas automáticamente, listas para atenderse.',
    ],
  },
  asset: {
    tag: 'Seguimiento en tiempo real',
    sub: 'Logística y operaciones de flota',
    heading: ['Inteligencia para el', 'seguimiento de activos.'],
    subheading: 'Vea cada contenedor, al instante.',
    body: [
      'Creado para una empresa de alquiler de contenedores de basura que atiende a contratistas de demolición y remodelación. Un conductor registra una entrega con la dirección de la obra y esta aparece al instante como un marcador en un mapa consolidado en vivo, sin una aplicación aparte ni actualizaciones manuales de hojas de cálculo.',
      'Cada entrega y cada devolución envían un correo electrónico en tiempo real, y un resumen diario reúne automáticamente la actividad del día. Cuando una unidad regresa al patio, basta un toque para marcarla como devuelta y quitarla del mapa activo.',
    ],
    widgetLabel: 'Demostración de seguimiento de activos',
  },
  tax: {
    tag: 'Datos financieros',
    sub: 'Cumplimiento automatizado',
    heading: ['Cálculo algorítmico', 'de impuestos.'],
    subheading: 'Cálculo de obligaciones fiscales en tiempo real',
    body: [
      'Elimina la fricción de la documentación trimestral de impuestos corporativos. Este componente escucha los flujos centrales de ingresos e intercepta los datos de cada transacción a medida que se liquida.',
      'Calcula de forma dinámica las obligaciones estatales y federales y actualiza un panel en vivo para que los ejecutivos tengan total claridad sobre los márgenes operativos y las reservas para impuestos, sin esperar las conciliaciones de fin de mes.',
    ],
    widgetLabel: 'Demostración del motor de impuestos',
  },
  // New section: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).
  searchVisibility: {
    tag: 'Visibilidad en buscadores e IA',
    heading: ['Que lo encuentren.', 'Y que lo elijan.'],
    intro: 'Los anuncios alquilan la atención. La visibilidad en los buscadores la construye. Preparamos las bases técnicas, locales y de búsqueda con IA que ayudan a sus clientes a encontrarlo en Google, Bing, Maps y los asistentes de IA, y medimos lo que está funcionando.',
    cards: [
      {
        title: 'Bases técnicas de SEO',
        body: 'Mapas del sitio XML enviados a Google Search Console y Bing Webmaster Tools, títulos y descripciones de página claros y datos estructurados (esquema de preguntas frecuentes) para que los buscadores entiendan sus páginas.',
      },
      {
        title: 'Búsqueda local y mapas',
        body: 'Configuración y optimización de su Perfil de Empresa en Google, con su área de servicio, categorías, horario y publicaciones semanales, además de Bing Places y Apple Business Connect, para que aparezca cuando la gente de su zona busque cerca.',
      },
      {
        title: 'Páginas de servicios basadas en palabras clave',
        body: 'Investigamos lo que sus clientes realmente escriben en los buscadores y creamos páginas en torno a esas mismas frases, en lugar de adivinar.',
      },
      {
        title: 'Visibilidad en búsquedas con IA',
        body: 'El contenido claro de preguntas y respuestas y los datos estructurados ayudan a que asistentes de IA como Copilot y ChatGPT entiendan y recomienden su negocio. El índice de Bing también alimenta varias herramientas de búsqueda con IA, así que optimizamos para Bing, no solo para Google.',
      },
      {
        title: 'Alcance bilingüe',
        body: 'Versiones en inglés y en español de sus páginas principales, para que también lo encuentren los clientes hispanohablantes de Florida.',
      },
      {
        title: 'Correos que llegan a la bandeja de entrada',
        body: 'Autenticación de dominio (SPF, DKIM y DMARC) para que sus seguimientos y cotizaciones lleguen a la bandeja de entrada y no a la carpeta de spam, además de enlaces con seguimiento para que vea qué campañas le traen visitas.',
      },
    ],
    closing: 'La misma estrategia que usamos en nuestro propio sitio. ¿Quiere saber cómo está el suyo?',
    button: 'Haga una revisión gratuita de su sitio',
  },
  next: {
    eyebrow: 'La próxima frontera',
    title: 'Explore Skunkworks.',
  },
  mobileExpand: {
    tapToTry: 'Toque para probar la demostración en vivo',
    closeLabel: 'Cerrar la demostración y volver a Casos de estudio',
    back: 'Volver a Casos de estudio',
  },
};

export default { en, es };
