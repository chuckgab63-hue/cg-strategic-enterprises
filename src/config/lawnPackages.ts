// The lawn care and landscaping offer, as data: the feature × package matrix
// behind the comparison table on /lawn-care.
//
// The three packages themselves live in src/config/tiers.ts, shared with
// /pest-control, so both pages sell the same Basic / Pro / Advanced with the
// same pricing presentation and only the feature rows differ.
//
// WHERE THESE ROWS COME FROM. Every one of them is something built for a lawn
// care client, read out of that build rather than imagined for a sales page.
// The honesty rules are the ones in src/config/featureStatus.ts, and the line
// that decides a row's status here is drawn in one place:
//
//   in-use  the client's own public site is serving it today. Anyone can check:
//           the services, the two customer pages, the service-area checker, the
//           quote forms, the careers page, the gallery, the voice assistant and
//           the Spanish site with its Spanish addresses are all live on their
//           domain right now.
//   ready   built, deployed and working, and switched on for a company on the
//           day they are ready. That is the whole admin area behind the site —
//           crew records, licences, training, onboarding, the hiring pipeline —
//           and all of the finance and tax side, which has been built and
//           tested against sample figures and holds nobody's real books yet.
//   service something CG Strategic runs alongside the platform: the phone, the
//           follow-up, the automations.
//
// What is NOT here, on purpose: online booking and the sync into scheduling
// software. It is the last build step on that project and it has not started,
// so it is not a feature of anything yet. /lawn-care answers it in the FAQ
// instead of giving it a row with a word invented for it.
//
// No prices in this file. They live behind SHOW_PRICES in tiers.ts.
//
// Plain TypeScript with no React so src/i18n/meta.ts and vite.config.ts can
// import the path. Spanish strings: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { PackageGroup } from './tiers.ts';

export const LAWN_CARE_PATH = '/lawn-care';

/** The client build this page is the proof of. Linked, never embedded. */
export const BY_THE_C_URL = 'https://bythecofjax.com';

export const LAWN_PACKAGE_GROUPS: PackageGroup[] = [
  {
    key: 'found',
    label: { en: 'Get found', es: 'Que lo encuentren' },
    features: [
      {
        key: 'fast-site',
        tier: 'basic',
        label: { en: 'Fast, mobile-first website', es: 'Sitio web rápido, pensado primero para celulares' },
      },
      {
        key: 'service-pages',
        tier: 'basic',
        label: { en: 'A page for every service you sell — mowing, weed control, design and build', es: 'Una página para cada servicio que vende: corte, control de malezas, diseño y construcción' },
      },
      {
        key: 'segments',
        tier: 'basic',
        label: { en: 'Separate pages for homeowners and for commercial property', es: 'Páginas separadas para dueños de casa y para propiedades comerciales' },
      },
      {
        key: 'service-area',
        tier: 'basic',
        label: { en: 'Service-area checker and map, with a core area and an extended one', es: 'Verificador y mapa del área de servicio, con un área principal y otra extendida' },
      },
      {
        key: 'gallery',
        tier: 'basic',
        label: { en: 'A gallery of finished work, with its own photo credits page', es: 'Una galería de trabajos terminados, con su propia página de créditos de fotos' },
      },
      {
        key: 'gbp',
        tier: 'basic',
        label: { en: 'Google Business Profile set up', es: 'Perfil de Empresa en Google configurado' },
      },
      {
        key: 'seo-basics',
        tier: 'basic',
        label: { en: 'Titles, descriptions, structured data and sitemap', es: 'Títulos, descripciones, datos estructurados y mapa del sitio' },
      },
    ],
  },
  {
    key: 'win',
    label: { en: 'Win the job', es: 'Gane el trabajo' },
    features: [
      {
        key: 'sticky-header',
        tier: 'basic',
        label: { en: 'Call and Get a quote in a header that follows the page down', es: 'Llamar y Pedir cotización en un encabezado que baja con la página' },
      },
      {
        key: 'quote-form',
        tier: 'basic',
        label: { en: 'Quote form that checks the address is in your area as it is filled in', es: 'Formulario de cotización que verifica si la dirección está en su área mientras se llena' },
      },
      // The commercial half of the same form, and the reason it is its own row:
      // an estimate for eight properties on a monthly cycle is not the same
      // conversation as a quarter-acre back yard.
      {
        key: 'commercial-quote',
        tier: 'basic',
        label: { en: 'A commercial estimate form that asks about sites, acreage, frequency and start date', es: 'Un formulario de cotización comercial que pregunta por sitios, superficie, frecuencia y fecha de inicio' },
      },
      {
        key: 'referral-tags',
        tier: 'basic',
        label: { en: 'Referral tracking, so you know who sent the lead', es: 'Seguimiento de referidos, para saber quién envió al cliente' },
      },
      {
        key: 'spanish-site',
        tier: 'pro',
        label: { en: 'Spanish site with an EN | ES toggle, and its addresses in Spanish too', es: 'Sitio en español con selector EN | ES, y sus direcciones también en español' },
      },
      {
        key: 'voice-assistant',
        tier: 'pro',
        label: { en: 'An AI voice assistant on your website, in English and Spanish', es: 'Un asistente de voz con IA en su sitio web, en inglés y español' },
      },
      {
        key: 'lead-intake',
        tier: 'pro',
        label: { en: 'One automated lead intake for the forms and the assistant together', es: 'Una sola entrada automática para los formularios y el asistente juntos' },
      },
      {
        key: 'review-requests',
        tier: 'advanced',
        status: 'service',
        label: { en: 'Review requests to customers who opted in', es: 'Solicitudes de reseñas a los clientes que lo autorizaron' },
        note: {
          en: 'An automation we build and run for you, not a feature of the website.',
          es: 'Una automatización que construimos y manejamos para usted, no una función del sitio web.',
        },
      },
    ],
  },
  // Built, deployed and tested; switched on for a company on the day they are
  // ready. Nobody's crew is living in it yet, so not one row here is 'in-use'.
  {
    key: 'run',
    label: { en: 'Run the business', es: 'Maneje el negocio' },
    features: [
      {
        key: 'feature-switches',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Feature switches you hold yourself — e.g. a service on or off for the season', es: 'Interruptores que usted maneja: por ejemplo, un servicio activado o no según la temporada' },
      },
      {
        key: 'admin-roles',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Admin area with owner, office, crew and accountant roles, and no password to forget', es: 'Área de administración con funciones de dueño, oficina, cuadrilla y contador, sin contraseña que olvidar' },
        note: {
          en: 'Sign-in is a link sent to your email, and what each role can reach is enforced by the database.',
          es: 'El acceso es un enlace enviado a su correo, y lo que alcanza cada función lo impone la base de datos.',
        },
      },
      {
        key: 'careers',
        tier: 'pro',
        label: { en: 'Careers page where applications and résumés land in one place', es: 'Página de empleo donde las solicitudes y los currículums llegan a un solo lugar' },
      },
      {
        key: 'applicants',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Hiring pipeline from New to Hired; hiring creates the crew record and its checklist', es: 'Flujo de contratación de Nuevo a Contratado; al contratar se crea el registro de la persona y su lista de tareas' },
      },
      {
        key: 'credentials',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Licence and certification tracker with expiry dates — the state applicator certification, driver licences, insurance', es: 'Control de licencias y certificaciones con fechas de vencimiento: la certificación estatal de aplicador, licencias de conducir, seguros' },
      },
      {
        key: 'training',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Training log per crew member, with what has been completed and what expires', es: 'Registro de capacitación por persona, con lo completado y lo que vence' },
      },
      {
        key: 'onboarding',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Onboarding checklists with due dates', es: 'Listas de incorporación con fechas límite' },
      },
      {
        key: 'documents',
        tier: 'pro',
        status: 'ready',
        label: { en: 'Private document storage for crew files', es: 'Almacenamiento privado de documentos de la cuadrilla' },
      },
      {
        key: 'my-records',
        tier: 'pro',
        status: 'ready',
        label: { en: '"My records" phone view, so the crew checks their own status instead of calling the office', es: 'Vista "Mis registros" en el celular, para que la cuadrilla revise su estado sin llamar a la oficina' },
      },
      {
        key: 'audit-log',
        tier: 'pro',
        status: 'ready',
        label: { en: 'An audit log of who changed a role, a switch or a status, and when', es: 'Un registro de auditoría de quién cambió una función, un interruptor o un estado, y cuándo' },
      },
    ],
  },
  // Built against a test database with sample figures. Every row here is
  // 'ready' and not one of them is 'in-use': nobody's real books are in it.
  {
    key: 'finance',
    label: { en: 'Admin and finance', es: 'Administración y finanzas' },
    features: [
      {
        key: 'finance-overview',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Revenue, expenses and margin for the year, beside last year', es: 'Ingresos, gastos y margen del año, junto a los del año anterior' },
      },
      {
        key: 'finance-lines',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Revenue by service line and expenses by category, month by month', es: 'Ingresos por línea de servicio y gastos por categoría, mes por mes' },
      },
      {
        key: 'finance-entries',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Entries typed in, imported from a CSV, or sent in automatically', es: 'Entradas escritas a mano, importadas desde un CSV o enviadas automáticamente' },
      },
      {
        key: 'finance-pnl',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'A profit and loss report with a print layout and forecast columns', es: 'Un estado de resultados con formato de impresión y columnas de proyección' },
      },
      {
        key: 'finance-multi',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'More than one company side by side, with the costs they share split between them', es: 'Más de una empresa una al lado de la otra, con los costos compartidos repartidos entre ellas' },
      },
      {
        key: 'finance-contractors',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Contractor 1099 and W-9 tracking, with the threshold and the deadline', es: 'Seguimiento de 1099 y W-9 de contratistas, con el umbral y la fecha límite' },
      },
      {
        key: 'finance-documents',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'Financial documents filed by year, with filters', es: 'Documentos financieros archivados por año, con filtros' },
      },
      {
        key: 'finance-cpa',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'A login for your accountant that reaches the tax side and nothing else', es: 'Un acceso para su contador que alcanza solo la parte de impuestos' },
      },
      {
        key: 'finance-tax',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'CPA worksheets: annual, quarterly estimates, 1099-NEC/1096, payroll and Florida sales tax', es: 'Hojas de trabajo para el contador: anual, estimaciones trimestrales, 1099-NEC/1096, nómina e impuesto sobre las ventas de Florida' },
        note: {
          en: 'Behind their own owner-only switch, off until you turn them on. Worksheets for your accountant, never a filed return.',
          es: 'Detrás de su propio interruptor, solo para el dueño, apagado hasta que usted lo active. Hojas de trabajo para su contador, nunca una declaración presentada.',
        },
      },
      {
        key: 'finance-forms',
        tier: 'advanced',
        status: 'ready',
        label: { en: 'A monthly check for revised IRS and Florida tax forms, held for a person to approve', es: 'Una revisión mensual de formularios revisados del IRS y de Florida, retenida para que una persona la apruebe' },
        note: {
          en: 'It reads the published forms and flags a change. It never edits a worksheet on its own.',
          es: 'Lee los formularios publicados y marca un cambio. Nunca modifica una hoja de trabajo por su cuenta.',
        },
      },
    ],
  },
  {
    key: 'phone',
    label: { en: 'Phone and follow-up', es: 'Teléfono y seguimiento' },
    features: [
      {
        key: 'phone-answering',
        tier: 'advanced',
        status: 'service',
        label: { en: 'AI answering on your main phone line', es: 'Atención telefónica con IA en su línea principal' },
        note: {
          en: 'A CG Strategic service alongside the platform, not part of the website.',
          es: 'Un servicio de CG Strategic junto a la plataforma, no parte del sitio web.',
        },
      },
      {
        key: 'missed-call',
        tier: 'advanced',
        status: 'service',
        label: { en: 'Missed-call follow-up', es: 'Seguimiento de llamadas perdidas' },
        note: {
          en: 'Texting depends on carrier (A2P) approval.',
          es: 'El envío de mensajes de texto depende de la aprobación de los operadores (A2P).',
        },
      },
      {
        key: 'custom-automations',
        tier: 'advanced',
        status: 'service',
        label: { en: 'Custom automations and a sync into your scheduling software', es: 'Automatizaciones a medida y sincronización con su software de programación' },
        note: {
          en: 'Built to your workflow after the audit, and run alongside the website.',
          es: 'Se construyen según su flujo de trabajo después de la auditoría y funcionan junto al sitio web.',
        },
      },
    ],
  },
  {
    key: 'care',
    label: { en: 'Hosting and care', es: 'Alojamiento y mantenimiento' },
    features: [
      {
        key: 'hosting',
        tier: 'basic',
        label: { en: 'Hosting, updates, backups and monitoring', es: 'Alojamiento, actualizaciones, respaldos y monitoreo' },
      },
      {
        key: 'care-plan',
        tier: 'basic',
        label: { en: 'Monthly care plan with set response times', es: 'Plan mensual de mantenimiento con tiempos de respuesta definidos' },
      },
    ],
  },
];

