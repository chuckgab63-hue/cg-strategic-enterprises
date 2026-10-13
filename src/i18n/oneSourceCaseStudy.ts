// Copy for /work/one-source-total-pest-control.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).
// Image alt text quotes One Source's own on-screen
// text (headlines, button labels, admin stages), which is in English on their
// site, so those quotes stay in English inside the Spanish descriptions.

type Item = { title: string; body: string };
type ScreenKey = 'home-hero' | 'service-page' | 'pest-analyzer' | 'talk-to-jess' | 'service-area-map';
type AdminKey = 'dashboard' | 'staff-readiness' | 'applicants-pipeline';

const en = {
  backToAll: '← All case studies',
  category: 'Website Rebuild & Lead Automation',
  intro: 'One Source is a licensed pest control company in Jacksonville, Florida. We rebuilt their website from the ground up and connected every way a customer can reach them to one lead intake.',
  visitSite: 'Visit the site',
  opensInNewTab: '(opens in a new tab)',
  startProject: 'Start a project like this',

  problemsLabel: 'The starting point',
  problemsTitle: "What wasn't working.",
  problemsIntro: 'The old site was a single-page app that looked fine in a browser but held the business back everywhere else.',
  problems: [
    {
      title: 'A site search engines struggled to read',
      body: 'Everything lived on one JavaScript page, so services and pests had no pages of their own for Google to find and rank.',
    },
    {
      title: 'Contact buttons that went nowhere',
      body: 'Some buttons were broken, so people who were ready to book hit a dead end.',
    },
    {
      title: 'AI endpoints left open',
      body: 'AI features called paid APIs with no rate limits, so anyone could run up the bill.',
    },
    {
      title: 'Messy lead handling',
      body: 'Leads reached their GorillaDesk CRM by different routes and in different formats, which made follow-up harder than it needed to be.',
    },
  ] as Item[],

  builtLabel: 'What we built',
  builtTitle: 'A site that does the work.',
  builtIntro: 'Fast pages for search, useful tools for customers, and one pipeline behind all of it.',
  built: [
    {
      title: 'Ground-up rebuild in Astro',
      body: 'A fast multi-page site on Vercel with its own search-friendly page for every service and pest, structured data, and a light, family-friendly design.',
    },
    {
      title: 'Video hero with a 3D flip',
      body: 'The home page rotates through background videos with a 3D flip transition, and falls back to a still image for visitors who prefer reduced motion.',
    },
    {
      title: 'Pest Analyzer',
      body: 'Customers upload a photo of a bug and get an AI first-guess ID. An optional follow-up form turns that visit into a lead.',
    },
    {
      title: '"Talk to Jess" voice assistant',
      body: 'An AI voice assistant built on Retell AI answers pest questions from a Northeast Florida knowledge base drawn from University of Florida extension research, then takes the caller\'s details as a lead.',
    },
    {
      title: 'Service area checker and map',
      body: 'Visitors check their ZIP code in one step, next to a shaded county map built from where One Source\'s customers actually are.',
    },
    {
      title: 'One lead intake in Make.com',
      body: 'Every form, analyzer follow-up and voice call flows into a single intake that formats the data, checks for an existing customer, and routes it to the CRM and the right notifications.',
    },
    {
      title: 'Real photos, real compliance',
      body: 'Licensed pest photos with a credits page, plus the details that matter in this industry: the state license and SMS consent built into every form.',
    },
    {
      title: 'Cost guardrails',
      body: 'Rate limits on every AI feature and a daily cap on voice calls, so usage costs stay predictable.',
    },
  ] as Item[],
  techStack: 'Tech stack',

  screenshotsLabel: 'Screenshots',
  screenshotsTitle: 'On desktop and phone.',
  screens: {
    'home-hero': {
      caption: 'Home page hero',
      desktopAlt: 'One Source home page on a desktop screen: palm-tree background video behind the headline "Friendly, local pest control in Jacksonville, FL" with Book Online, Talk to Jess and Call buttons',
      phoneAlt: 'One Source home page on a phone: the same hero headline and buttons, with the sticky Call, Book Online and Talk to Jess bar at the bottom',
    },
    'service-page': {
      caption: 'A service page',
      desktopAlt: 'Termite Treatment and Protection in Jacksonville, FL page on desktop, with breadcrumbs, a short intro and booking buttons',
      phoneAlt: 'Termite treatment page on a phone, with the headline, intro and booking buttons above the fold',
    },
    'pest-analyzer': {
      caption: 'Pest Analyzer',
      desktopAlt: 'Pest Analyzer on desktop: a photo drop area beside the upload field, an optional notes box and an Analyze my photo button',
      phoneAlt: 'Pest Analyzer on a phone, with the photo upload field, notes box and Analyze my photo button stacked',
    },
    'talk-to-jess': {
      caption: 'Talk to Jess panel',
      desktopAlt: 'Talk to Jess panel open on the termite page, explaining that calls are with an AI assistant, with Start call and Cancel buttons',
      phoneAlt: 'Talk to Jess panel open on a phone, with Start call and Cancel buttons above the sticky action bar',
    },
    'service-area-map': {
      caption: 'Service area checker and map',
      desktopAlt: 'Service area page on desktop: a ZIP code checker beside a shaded map of Northeast Florida counties with core and extended service rings',
      phoneAlt: 'Shaded Northeast Florida service area map on a phone, with the core and extended area legend',
    },
  } as Record<ScreenKey, { caption: string; desktopAlt: string; phoneAlt: string }>,

  adminLabel: 'Behind the scenes',
  adminTitle: 'An admin area built for growth.',
  adminIntro1: "One Source's CRM (GorillaDesk) and payment system (Square) handle jobs and payments. Neither covers the people side of growing the business: licenses, training and hiring.",
  adminIntro2: 'So we built a private, invite-only admin area that fills that gap.',
  adminFeatures: [
    {
      title: 'Role-based access',
      body: 'Owner, office admin and technician roles, with permissions enforced in the database, not just hidden on the screen.',
    },
    {
      title: 'Licensing and compliance tracker',
      body: 'FDACS ID cards, certified operator credentials and the business license, each with an expiration date, plus a dashboard of what expires in the next 30, 60 and 90 days.',
    },
    {
      title: 'Training and route-ready status',
      body: 'A supervised training log for each technician and a clear route-ready status, so the owner can see who is ready to run their own route.',
    },
    {
      title: 'Applicant pipeline',
      body: 'The new Careers page sends applications straight into the admin area. Each one moves from New to Interview to Hired, and hiring creates the staff record and onboarding checklist automatically.',
    },
    {
      title: 'Onboarding checklists',
      body: 'Every new hire gets a checklist with due dates, such as the deadline to apply for their FDACS ID card.',
    },
    {
      title: 'Daily email digest',
      body: 'One email a day lists anything expiring or overdue, so nothing slips.',
    },
    {
      title: '"My status" for technicians',
      body: 'Technicians get a phone-friendly view of their own credentials, training progress and checklist.',
    },
  ] as Item[],
  theBuild: 'The build:',
  theBuildBody: ' Astro and Supabase (Postgres, sign-in and private file storage) on Vercel, with Make.com sending the daily email digest.',
  adminScreens: {
    dashboard: {
      caption: 'Dashboard',
      alt: 'Mock of the One Source admin dashboard filled with demo data: tiles for expired and soon-to-expire credentials, techs not yet route-ready and new applicants, above a table of credentials needing attention',
    },
    'staff-readiness': {
      caption: 'A technician\'s readiness',
      alt: 'Mock of a demo technician\'s page in the One Source admin area: supervised training progress for each license category, ID card status, onboarding progress and what\'s left before they are route-ready',
    },
    'applicants-pipeline': {
      caption: 'Applicant pipeline',
      alt: 'Mock of the One Source admin applicants list with demo applicants from the Careers page, filtered by stage: New, Contacted, Interview, Offer, Hired and Not hired',
    },
  } as Record<AdminKey, { caption: string; alt: string }>,
  mockNote: '(mock-up with demo data)',

  quoteBadge: 'TODO: Client quote',
  quoteText: "Early feedback from the owner and office manager: it handles the work their CRM and payment system don't, in real time, so they can focus on growth.",

  resultsBadge: 'TODO: Results',
  resultsTitle: 'Results coming after launch.',
  resultsBody: "The new site is ready and goes live on One Source's own domain soon. We'll add real numbers here once there's data to report: lead volume, page speed scores and more.",

  keepExploring: 'Keep exploring',
  moreCaseStudies: 'More case studies.',
};

const es: typeof en = {
  backToAll: '← Todos los casos de estudio',
  category: 'Renovación del sitio web y automatización de clientes potenciales',
  intro: 'One Source es una empresa de control de plagas con licencia en Jacksonville, Florida. Reconstruimos su sitio web desde cero y conectamos todas las formas en que un cliente puede comunicarse con ellos a un solo flujo de entrada de clientes potenciales.',
  visitSite: 'Visitar el sitio',
  opensInNewTab: '(se abre en una pestaña nueva)',
  startProject: 'Inicie un proyecto como este',

  problemsLabel: 'El punto de partida',
  problemsTitle: 'Lo que no funcionaba.',
  problemsIntro: 'El sitio anterior era una aplicación de una sola página que se veía bien en el navegador, pero frenaba al negocio en todo lo demás.',
  problems: [
    {
      title: 'Un sitio que a los buscadores les costaba leer',
      body: 'Todo estaba en una sola página de JavaScript, así que los servicios y las plagas no tenían páginas propias que Google pudiera encontrar y posicionar.',
    },
    {
      title: 'Botones de contacto que no llevaban a ninguna parte',
      body: 'Algunos botones no funcionaban, así que las personas que ya estaban listas para reservar se quedaban sin salida.',
    },
    {
      title: 'Funciones de IA sin protección',
      body: 'Las funciones de IA llamaban a APIs de pago sin límites de uso, así que cualquiera podía disparar la factura.',
    },
    {
      title: 'Manejo desordenado de clientes potenciales',
      body: 'Los clientes potenciales llegaban a su CRM GorillaDesk por distintas vías y en distintos formatos, lo que hacía el seguimiento más difícil de lo necesario.',
    },
  ],

  builtLabel: 'Lo que construimos',
  builtTitle: 'Un sitio que hace el trabajo.',
  builtIntro: 'Páginas rápidas para los buscadores, herramientas útiles para los clientes y un solo flujo detrás de todo.',
  built: [
    {
      title: 'Reconstrucción completa en Astro',
      body: 'Un sitio rápido de varias páginas en Vercel, con una página propia y fácil de encontrar en los buscadores para cada servicio y cada plaga, datos estructurados y un diseño claro y familiar.',
    },
    {
      title: 'Portada con video y giro en 3D',
      body: 'La página de inicio alterna videos de fondo con una transición de giro en 3D y muestra una imagen fija a los visitantes que prefieren menos movimiento.',
    },
    {
      title: 'Analizador de plagas (Pest Analyzer)',
      body: 'Los clientes suben una foto de un insecto y reciben una primera identificación hecha por IA. Un formulario de seguimiento opcional convierte esa visita en un cliente potencial.',
    },
    {
      title: 'Asistente de voz "Talk to Jess"',
      body: 'Un asistente de voz con IA creado con Retell AI responde preguntas sobre plagas a partir de una base de conocimientos del noreste de Florida basada en investigaciones de extensión de la Universidad de Florida, y luego toma los datos de la persona que llama como cliente potencial.',
    },
    {
      title: 'Verificador y mapa del área de servicio',
      body: 'Los visitantes verifican su código postal en un solo paso, junto a un mapa sombreado por condado basado en dónde están realmente los clientes de One Source.',
    },
    {
      title: 'Una sola entrada de clientes potenciales en Make.com',
      body: 'Cada formulario, cada seguimiento del analizador y cada llamada de voz llegan a un único flujo de entrada que da formato a los datos, verifica si el cliente ya existe y los envía al CRM y a las notificaciones correspondientes.',
    },
    {
      title: 'Fotos reales, cumplimiento real',
      body: 'Fotos de plagas con licencia y una página de créditos, además de los detalles que importan en esta industria: la licencia estatal y el consentimiento para mensajes de texto integrados en cada formulario.',
    },
    {
      title: 'Control de costos',
      body: 'Límites de uso en cada función de IA y un tope diario de llamadas de voz, para que los costos se mantengan predecibles.',
    },
  ],
  techStack: 'Tecnologías',

  screenshotsLabel: 'Capturas de pantalla',
  screenshotsTitle: 'En computadora y en celular.',
  screens: {
    'home-hero': {
      caption: 'Portada de la página de inicio',
      desktopAlt: 'Página de inicio de One Source en una pantalla de computadora: video de fondo con palmeras detrás del titular "Friendly, local pest control in Jacksonville, FL", con los botones Book Online, Talk to Jess y Call',
      phoneAlt: 'Página de inicio de One Source en un celular: el mismo titular y los mismos botones, con la barra fija de Call, Book Online y Talk to Jess en la parte inferior',
    },
    'service-page': {
      caption: 'Una página de servicio',
      desktopAlt: 'Página "Termite Treatment and Protection in Jacksonville, FL" en computadora, con ruta de navegación, una breve introducción y botones para reservar',
      phoneAlt: 'Página de tratamiento contra termitas en un celular, con el titular, la introducción y los botones para reservar visibles sin desplazarse',
    },
    'pest-analyzer': {
      caption: 'Analizador de plagas',
      desktopAlt: 'Pest Analyzer en computadora: un área para soltar la foto junto al campo de carga, un cuadro opcional de notas y el botón Analyze my photo',
      phoneAlt: 'Pest Analyzer en un celular, con el campo para subir la foto, el cuadro de notas y el botón Analyze my photo uno debajo del otro',
    },
    'talk-to-jess': {
      caption: 'Panel de Talk to Jess',
      desktopAlt: 'Panel de Talk to Jess abierto en la página de termitas, que explica que las llamadas son con un asistente de IA, con los botones Start call y Cancel',
      phoneAlt: 'Panel de Talk to Jess abierto en un celular, con los botones Start call y Cancel sobre la barra de acciones fija',
    },
    'service-area-map': {
      caption: 'Verificador y mapa del área de servicio',
      desktopAlt: 'Página del área de servicio en computadora: un verificador de código postal junto a un mapa sombreado de los condados del noreste de Florida, con anillos de servicio principal y extendido',
      phoneAlt: 'Mapa sombreado del área de servicio del noreste de Florida en un celular, con la leyenda del área principal y la extendida',
    },
  },

  adminLabel: 'Detrás de escena',
  adminTitle: 'Un área de administración pensada para crecer.',
  adminIntro1: 'El CRM de One Source (GorillaDesk) y su sistema de pagos (Square) se encargan de los trabajos y los cobros. Ninguno de los dos cubre el lado humano del crecimiento del negocio: licencias, capacitación y contratación.',
  adminIntro2: 'Por eso creamos un área de administración privada, solo por invitación, que llena ese vacío.',
  adminFeatures: [
    {
      title: 'Acceso por roles',
      body: 'Roles de propietario, administración de oficina y técnico, con permisos aplicados en la base de datos, no solo ocultos en la pantalla.',
    },
    {
      title: 'Control de licencias y cumplimiento',
      body: 'Tarjetas de identificación de FDACS, credenciales de operador certificado y la licencia comercial, cada una con su fecha de vencimiento, además de un panel con lo que vence en los próximos 30, 60 y 90 días.',
    },
    {
      title: 'Capacitación y preparación para la ruta',
      body: 'Un registro de capacitación supervisada para cada técnico y un estado claro de preparación, para que el propietario vea quién está listo para atender su propia ruta.',
    },
    {
      title: 'Proceso de selección de candidatos',
      body: 'La nueva página de empleos envía las solicitudes directamente al área de administración. Cada una pasa de Nueva a Entrevista a Contratado, y al contratar se crean automáticamente el registro del empleado y su lista de incorporación.',
    },
    {
      title: 'Listas de incorporación',
      body: 'Cada nuevo empleado recibe una lista de tareas con fechas límite, como el plazo para solicitar su tarjeta de identificación de FDACS.',
    },
    {
      title: 'Resumen diario por correo electrónico',
      body: 'Un correo al día enumera todo lo que está por vencer o atrasado, para que nada se pase por alto.',
    },
    {
      title: 'Vista "My status" para técnicos',
      body: 'Los técnicos tienen una vista adaptada al celular con sus propias credenciales, su avance en la capacitación y su lista de tareas.',
    },
  ],
  theBuild: 'Cómo se construyó:',
  theBuildBody: ' Astro y Supabase (Postgres, inicio de sesión y almacenamiento privado de archivos) en Vercel, con Make.com enviando el resumen diario por correo electrónico.',
  adminScreens: {
    dashboard: {
      caption: 'Panel principal',
      alt: 'Maqueta del panel de administración de One Source con datos de demostración: recuadros de credenciales vencidas y por vencer, técnicos que aún no están listos para la ruta y nuevos candidatos, sobre una tabla de credenciales que requieren atención',
    },
    'staff-readiness': {
      caption: 'Preparación de un técnico',
      alt: 'Maqueta de la página de un técnico de demostración en el área de administración de One Source: avance de la capacitación supervisada por categoría de licencia, estado de la tarjeta de identificación, avance de la incorporación y lo que le falta para estar listo para la ruta',
    },
    'applicants-pipeline': {
      caption: 'Proceso de selección de candidatos',
      alt: 'Maqueta de la lista de candidatos del área de administración de One Source, con candidatos de demostración de la página de empleos, filtrados por etapa: New, Contacted, Interview, Offer, Hired y Not hired',
    },
  },
  mockNote: '(maqueta con datos de demostración)',

  quoteBadge: 'PENDIENTE: testimonio del cliente',
  quoteText: 'Primeros comentarios de la dirección y de la administración de la oficina: resuelve en tiempo real el trabajo que su CRM y su sistema de pagos no cubren, para que puedan concentrarse en crecer.',

  resultsBadge: 'PENDIENTE: resultados',
  resultsTitle: 'Los resultados llegarán después del lanzamiento.',
  resultsBody: 'El nuevo sitio está listo y pronto estará en línea en el dominio propio de One Source. Cuando haya datos que reportar, agregaremos aquí cifras reales: volumen de clientes potenciales, puntuaciones de velocidad de las páginas y más.',

  keepExploring: 'Siga explorando',
  moreCaseStudies: 'Más casos de estudio.',
};

export default { en, es };
