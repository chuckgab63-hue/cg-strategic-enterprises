// Copy for /lawn-care and /es/lawn-care. The packages themselves and the
// feature × package matrix are data, in src/config/lawnPackages.ts; this file
// is the prose around them.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). Latin American, usted.
//
// Honesty rules, the same ones /pest-control follows: no results, no metrics,
// no client details beyond what the client's own public site already shows, and
// every recreated screen says it is a recreation with sample figures. The status
// words — "In use with a client", "Built — ready to switch on" — are defined
// once in src/config/featureStatus.ts and never rewritten here. A feature only
// reaches "in use" when a client is actually using it, which on this page means
// their public site is serving it today.
//
// Nothing here names another industry's client. The lawn care build and the
// pest control build are separate companies and each page stands on its own.

import type { FaqItem } from './faq.ts';
import type { StatusKey } from '../config/featureStatus.ts';

interface MockRow {
  label: string;
  value: string;
  badge?: string;
}

/** One line of the feature showcase, with where it stands. */
interface ShowcaseItem {
  text: string;
  status: Extract<StatusKey, 'in-use' | 'ready' | 'service'>;
}

/** A group of the showcase. `key` picks its icon in src/pages/LawnCare.tsx. */
interface ShowcaseGroup {
  key: 'found' | 'win' | 'run' | 'finance';
  title: string;
  blurb: string;
  items: ShowcaseItem[];
}

interface DeepDive {
  key: 'bilingual' | 'estimates' | 'crew' | 'finance';
  /** One of the two shared statuses a built feature can honestly carry here. */
  status: Extract<StatusKey, 'in-use' | 'ready'>;
  title: string;
  body: string;
  points: string[];
  /** Recreated interface, so no screenshot of anyone's records is needed. */
  mock: { title: string; rows: MockRow[]; footer: string };
}

const en = {
  eyebrow: 'Lawn care and landscaping',
  title: 'Built for lawn care and landscaping companies',
  intro:
    'A lawn care website that gets found, an assistant that answers while the crews are out, commercial estimates that ask the right questions, and an office system that keeps licences, hiring and the books straight — in English and Spanish, for companies across Florida and Georgia.',
  ctaAlex: 'Talk to Alex',
  ctaCall: 'Call us',
  newTab: '(opens in a new tab)',
  breadcrumbs: { label: 'Breadcrumb', home: 'Home', here: 'Lawn care' },
  /** serviceType and audience in the Service structured data. */
  schema: {
    serviceType: 'Landscaping website, AI answering service and office software for lawn care companies',
    audience: 'Lawn care and landscaping companies',
  },

  // --- What the season actually does to you ---------------------------------
  problems: {
    title: 'The problems this was built for',
    intro:
      'Not a list of features looking for a reason. Five things that happen to a lawn care company every year, and what we built for each one.',
    items: [
      {
        title: 'The phone rings while you are on a mower',
        body:
          'Spring comes and the calls arrive in the hours you are least able to answer them. An assistant on your website answers in English or Spanish, takes the details, and the lead is on your desk when you get back to the truck.',
      },
      {
        title: 'A commercial estimate is not a back-yard quote',
        body:
          'Eight properties, a monthly cycle and a start date is a different conversation from a quarter acre. The estimate form asks the commercial questions — how many sites, how much ground, how often, when it starts — so you can price it before you drive out.',
      },
      {
        title: 'Demand swings with the season',
        body:
          'Some services are worth selling in April and not in December. Each service on the site is a switch you hold: turn it off and its page, its menu entry, its card and its place in the sitemap all go with it, and the assistant stops offering it.',
      },
      {
        title: 'Half your customers, and half your crew, speak Spanish',
        body:
          'Not a translate button. A second site with its own addresses in Spanish, so a Spanish-speaking customer can find you in Spanish and share a link that stays that way. The assistant answers in Spanish too.',
      },
      {
        title: 'Hiring is a season of its own',
        body:
          'Applications arrive, résumés pile up, and somebody has to know whose applicator certification expires in March. The careers page feeds a pipeline, hiring creates the record and its checklist, and the licence that lapses is on a dashboard instead of in somebody’s memory.',
      },
    ],
  },

  // --- The showcase --------------------------------------------------------
  showcase: {
    title: 'What gets built',
    intro:
      'Four groups, and where each piece stands today. A line with no label is already live on a lawn care client’s own site — anyone can go and look. A labelled one is built and working and switches on for your company when you are ready, or it is a service we run alongside the platform.',
    groups: [
      {
        key: 'found',
        title: 'Get found',
        blurb: 'A landscaping website people reach before they reach a competitor.',
        items: [
          { text: 'A page for every service: mowing and maintenance, weed control, design and build', status: 'in-use' },
          { text: 'Separate pages for homeowners and for commercial property', status: 'in-use' },
          { text: 'A service-area checker and map, with a core area and an extended one', status: 'in-use' },
          { text: 'A gallery of finished work, credited', status: 'in-use' },
          { text: 'Titles, descriptions, structured data, sitemap and a Google Business Profile', status: 'in-use' },
        ],
      },
      {
        key: 'win',
        title: 'Win the job',
        blurb: 'Every way a customer might reach you, going to the same place.',
        items: [
          { text: 'A quote form that tells the visitor whether their address is in your area', status: 'in-use' },
          { text: 'A commercial estimate form: sites, acreage, frequency, start date', status: 'in-use' },
          { text: 'An AI answering service for lawn care, on your site, in English and Spanish', status: 'in-use' },
          { text: 'A Spanish site with an EN | ES toggle and its addresses in Spanish', status: 'in-use' },
          { text: 'One automated lead intake for the forms and the assistant together', status: 'in-use' },
          { text: 'Missed-call follow-up and review requests', status: 'service' },
        ],
      },
      {
        key: 'run',
        title: 'Run the business',
        blurb: 'The part a scheduling app leaves to you and a filing cabinet.',
        items: [
          { text: 'A careers page where applications and résumés land in one place', status: 'in-use' },
          { text: 'A hiring pipeline from New to Hired, and hiring that creates the record for you', status: 'ready' },
          { text: 'Licences and certifications with their expiry dates on a dashboard', status: 'ready' },
          { text: 'A training log and an onboarding checklist per crew member', status: 'ready' },
          { text: 'Owner, office, crew and accountant roles, each reaching only what it should', status: 'ready' },
          { text: 'Feature switches you hold yourself, and an audit log of who moved what', status: 'ready' },
        ],
      },
      {
        key: 'finance',
        title: 'Admin and finance',
        blurb: 'Where the money stands, and the worksheets your accountant asks for.',
        items: [
          { text: 'Revenue, expenses and margin for the year, beside last year', status: 'ready' },
          { text: 'Revenue by service line, expenses by category, month by month', status: 'ready' },
          { text: 'A profit and loss report you can print, with forecast columns', status: 'ready' },
          { text: 'More than one company side by side, sharing the costs they share', status: 'ready' },
          { text: 'Contractor 1099 and W-9 tracking, with the threshold and the deadline', status: 'ready' },
          { text: 'CPA worksheets, behind their own owner-only switch', status: 'ready' },
        ],
      },
    ] as ShowcaseGroup[],
  },

  // --- Packages ------------------------------------------------------------
  packages: {
    title: 'Basic, Pro, Advanced',
    intro:
      'Three packages, each one everything in the package before it plus the next layer. Start where you are and move up when the business is ready — nothing is rebuilt to get there.',
    mostPopular: 'Most popular',
    includesPrevious: (previous: string) => `Everything in ${previous}, plus:`,
    pricingNote: 'Pricing after a free 30-minute audit.',
    cta: 'Book a free intro call',
    tableTitle: 'What is in each package',
    tableIntro: 'The full list, so nothing is hidden behind a "and more".',
    featureColumn: 'Feature',
    included: 'Included',
    notIncluded: 'Not included',
    /**
     * The legend above the table. The labels and their meanings come from
     * src/config/featureStatus.ts; only this heading is copy.
     */
    statusLegendTitle: 'What the labels mean',
    cardsStatusNote: 'Items with no label are on a lawn care client’s live site today. Everything labelled is built and working, and switches on for you when you are ready. The full table below labels every one.',
  },

  // --- Deep dives ----------------------------------------------------------
  deepDives: {
    title: 'A closer look',
    intro:
      'Four of the pieces, and what each one actually does. Each says which of the two it is: live on a lawn care client’s site today, or built and working and ready to switch on for yours.',
    mockNote: 'Recreated interface with sample figures, not a customer record.',
    items: [
      {
        key: 'bilingual',
        status: 'in-use',
        title: 'A Spanish site, addresses included',
        body:
          'Every page exists twice, and the Spanish one does not sit at an English address with Spanish words on it. Its path is in Spanish too, so a customer who searches in Spanish lands on a Spanish page and the link they forward stays in Spanish. One tap switches between them, and search engines are told the two are the same page in different languages.',
        points: [
          'Spanish paths, not /es/ bolted onto an English slug',
          'One tap between EN and ES, and the choice is remembered',
          'The voice assistant answers in Spanish on the Spanish pages',
          'Turning Spanish off sends every Spanish address to its English page rather than to an error',
          'Every line reviewed by a native speaker before it goes live',
        ],
        mock: {
          title: 'The same page, twice',
          rows: [
            { label: 'yourcompany.com/services/weed-control', value: 'English', badge: 'EN' },
            { label: 'yourcompany.com/es/servicios/control-de-malezas', value: 'Spanish', badge: 'ES' },
          ],
          footer: 'Both are in the sitemap, and each points at the other.',
        },
      },
      {
        key: 'estimates',
        status: 'in-use',
        title: 'An estimate form that asks like an estimator',
        body:
          'A homeowner gives you an address and a service. A property manager has eight sites, a mowing cycle, a budget year and a date it has to start. The same form knows the difference: pick commercial and it asks the commercial questions, and the answers arrive together rather than over three phone calls. The address is checked against your service area while it is typed, so a job 70 miles away is a conversation before it is a drive.',
        points: [
          'Commercial fields: property type, how many sites, acreage, frequency, start date',
          'The service area is decided on our side, from your ZIP list — never taken from the browser',
          'Core area, extended area and outside it are three different answers, not one rejection',
          'Written for text-message rules, so consent is recorded properly if you follow up by text',
          'Forms and assistant calls arrive as one kind of lead, in one place',
        ],
        mock: {
          title: 'Commercial estimate — sample request',
          rows: [
            { label: 'Property type', value: 'HOA common areas', badge: '6 sites' },
            { label: 'Ground to maintain', value: '4.5 acres', badge: 'Weekly, Mar–Oct' },
            { label: 'Service area', value: '32256', badge: 'Core area' },
          ],
          footer: 'Arrives with the other leads, tagged commercial.',
        },
      },
      {
        key: 'crew',
        status: 'ready',
        title: 'Licences, training and who can spray',
        body:
          'The part a scheduling app does not cover. Every certification, licence and insurance document has an expiry date, and the dashboard says what lapses next rather than leaving it to the month somebody happens to look. Each crew member has a training log, and the office has a plain answer to "can this person apply product on their own yet". Applications from your careers page land in the same system, so hiring somebody creates their record and their checklist in one step.',
        points: [
          'Expiry dates on the state applicator certification, driver licences and insurance',
          'A training log per person, with what is done and what runs out',
          'Onboarding checklists with due dates, created the moment you hire',
          'Crew members check their own status on their phone instead of calling the office',
          'Private document storage, and a role for the office that cannot reach the books',
        ],
        mock: {
          title: 'Crew readiness — sample records',
          rows: [
            { label: 'Sample, A.', value: 'Applicator certification', badge: 'Expires in 41 days' },
            { label: 'Example, B.', value: 'Onboarding', badge: '3 of 7 done' },
            { label: 'Placeholder, C.', value: 'Training log', badge: 'Cleared to spray' },
          ],
          footer: 'The dashboard lists what expires next, so nothing waits on somebody remembering.',
        },
      },
      {
        key: 'finance',
        status: 'ready',
        title: 'Finance and tax, inside your admin',
        body:
          'Where the money stands, in the same place as everything else, instead of a spreadsheet somebody has to remember to update. This year beside last year, revenue by service line, expenses by category, and a profit and loss you can print. When the accountant asks, the worksheets are already made: quarterly estimates, the annual return, 1099-NEC and 1096, payroll reconciliation and Florida sales tax. Your accountant gets their own login that reaches the tax side and nothing else. Built and working against sample figures, and it switches on for your company when you are ready.',
        points: [
          'Entries typed in, imported from a CSV, or sent in automatically from another system',
          'More than one company side by side, with the costs they share split between them',
          'Worksheets that tie out to the profit and loss, with anything unverified flagged for review',
          'Form line numbers, thresholds and rates are stored as data with a source link, not written into the code',
          'A monthly check for revised IRS and Florida forms that flags a change for a person to approve',
          'Worksheets for your accountant, never a filed return — and it holds no tax or bank numbers',
        ],
        mock: {
          title: 'Finance › Overview — sample company, 2026',
          rows: [
            { label: 'Revenue, year to date', value: '$310,000', badge: 'By service line' },
            { label: 'Expenses, year to date', value: '$205,000', badge: 'By category' },
            { label: 'Net margin', value: '34%', badge: 'By month' },
          ],
          footer: 'Download the CPA worksheet (CSV)',
        },
      },
    ] as DeepDive[],
  },

  // --- Case study band -----------------------------------------------------
  caseStudy: {
    eyebrow: 'The build this page is about',
    title: 'See it on a live lawn care site',
    body:
      'By The C of Jax is a lawn care and landscaping company in Jacksonville, and their site is the one every green label on this page points to. Residential and commercial pages, a page per service with a switch behind it, the service-area checker, the quote and commercial estimate forms, the careers page, the gallery, the AI voice assistant and the full Spanish site with Spanish addresses are all live on their own domain today. The admin area behind it — crew records, licences, training, hiring, and the finance and tax side — is built and working, waiting on the day they switch each part on.',
    link: 'Visit bythecofjax.com',
    note: 'Their site, not a demo of ours. It opens in a new tab.',
  },

  // --- FAQ -----------------------------------------------------------------
  faqTitle: 'Questions lawn care owners ask',
  faq: [
    {
      id: 'ownership',
      question: 'Who owns the website and the data?',
      answer:
        'You do. Your customer records, your domain, your brand, photos and content, and your payment account are yours, and you can export your data at any time. The platform software is licensed to you through the monthly care plan, which is what keeps it hosted, patched and supported. If you ever leave, you take your data, domain, content and payment account with you. If you would rather run the platform yourself, there is an option to buy out the software licence.',
      more: { label: 'More on ownership', path: '/faq#ownership' },
    },
    {
      id: 'booking',
      question: 'Can customers book online, and does it talk to my scheduling software?',
      answer:
        'Not yet, and we would rather say so than put a label on it. Today the website takes the request — the quote form, the commercial estimate form or the voice assistant — and it reaches you and your CRM as one kind of lead, which is what most companies in this trade actually want: you see the property before you commit a crew to a time. Online booking against a scheduling calendar, and a two-way sync with Jobber or FieldRoutes, is the next build step on that project and has not started. When it is built it will appear here with the same labels as everything else.',
    },
    {
      id: 'seasonal',
      question: 'Can I turn a service off out of season?',
      answer:
        'Yes, and that is one switch rather than a call to us. Each service is a row in one registry that owns the pages, menus and endpoints it controls, so switching it off takes all of them with it: the service page redirects, the card and the menu entry disappear, the URL leaves your sitemap and your structured data, and the voice assistant stops offering it and treats a request for it as something to ask you about. Nothing is deleted, and turning it back on brings it all back as it was. Only the owner can move a switch, and that is enforced by the database rather than by a greyed-out box.',
    },
    {
      id: 'spanish',
      question: 'Do I need the Spanish site?',
      answer:
        'In this trade it earns its keep twice: Spanish-speaking customers can read and share your site, and the pages can rank in Spanish instead of competing with your English ones. What matters is that the Spanish pages have Spanish addresses, so they are real pages rather than a translation layer. The voice assistant answers in Spanish on them. Every line is reviewed by a native speaker before your pages go live.',
    },
    {
      id: 'crm',
      question: 'Do I have to change the software I use for scheduling and invoicing?',
      answer:
        'No. The site never replaces your field-service software — routing, the crew app and invoicing stay where they are. What we add is the lead intake in front of it and the licensing, hiring and finance side it does not cover, and we connect the two so leads arrive in one shape.',
    },
    {
      id: 'voice-cost',
      question: 'What stops the AI assistant running up a bill?',
      answer:
        'Three things, and all of them fail closed. Every visitor is limited to a few calls an hour, the whole site has a daily cap on calls, and if anything the assistant needs is unavailable it refuses the call rather than guessing. It is also a switch you hold, so you can turn it off entirely. It answers from your services and your area, and it never books or schedules anything — it takes the details and hands you a lead.',
    },
    {
      id: 'audit',
      question: 'What happens in the free audit?',
      answer:
        'A 30-minute call, then a short look at how the business runs today: where leads come in and what happens to them, what your current site does and does not rank for, what the office is tracking by hand, and which of the packages actually fits. You get a written quote after that. We do not quote blind, and the call costs nothing.',
    },
    {
      id: 'process',
      question: 'What does the whole process look like?',
      answer:
        'Intro call, then the audit, then a requirements session where we write down exactly what you need, then a written quote with a timeline. After that the build, delivered in milestones so you can see it coming together, and then the monthly care plan: hosting, updates, backups, monitoring, support and small changes as you go.',
    },
  ] as FaqItem[],

  closing: {
    title: 'Start with the audit',
    body:
      'Thirty minutes on the phone, a look at what you have, and a written quote for the package that fits. No prices before that, because we would be guessing.',
  },
};

const es: typeof en = {
  eyebrow: 'Jardinería y paisajismo',
  title: 'Hecho para empresas de jardinería y paisajismo',
  intro:
    'Un sitio web de jardinería que la gente encuentra, un asistente que contesta mientras las cuadrillas están afuera, cotizaciones comerciales que hacen las preguntas correctas y un sistema de oficina que mantiene en orden las licencias, las contrataciones y las cuentas: en inglés y español, para empresas en Florida y Georgia.',
  ctaAlex: 'Hablar con Alex',
  ctaCall: 'Llámenos',
  newTab: '(se abre en una pestaña nueva)',
  breadcrumbs: { label: 'Ruta de navegación', home: 'Inicio', here: 'Jardinería' },
  schema: {
    serviceType: 'Sitio web de paisajismo, atención telefónica con IA y software de oficina para empresas de jardinería',
    audience: 'Empresas de jardinería y paisajismo',
  },

  problems: {
    title: 'Los problemas para los que se construyó esto',
    intro:
      'No es una lista de funciones buscando una razón. Son cinco cosas que le pasan cada año a una empresa de jardinería, y lo que construimos para cada una.',
    items: [
      {
        title: 'El teléfono suena cuando usted va en la podadora',
        body:
          'Llega la primavera y las llamadas entran justo en las horas en que menos puede contestarlas. Un asistente en su sitio web responde en inglés o español, toma los datos, y el cliente potencial está en su escritorio cuando usted vuelve a la camioneta.',
      },
      {
        title: 'Una cotización comercial no es la de un patio',
        body:
          'Ocho propiedades, un ciclo mensual y una fecha de inicio es otra conversación que un patio de mil metros. El formulario de cotización hace las preguntas comerciales —cuántos sitios, cuánto terreno, cada cuánto, cuándo empieza— para que usted pueda poner precio antes de ir a verlo.',
      },
      {
        title: 'La demanda cambia con la temporada',
        body:
          'Algunos servicios vale la pena venderlos en abril y no en diciembre. Cada servicio del sitio es un interruptor que usted maneja: apáguelo y se van con él su página, su entrada en el menú, su tarjeta y su lugar en el mapa del sitio, y el asistente deja de ofrecerlo.',
      },
      {
        title: 'La mitad de sus clientes, y de su cuadrilla, habla español',
        body:
          'No es un botón de traducir. Es un segundo sitio con sus propias direcciones en español, para que un cliente hispanohablante lo encuentre en español y comparta un enlace que se queda en español. El asistente también responde en español.',
      },
      {
        title: 'Contratar es una temporada aparte',
        body:
          'Llegan solicitudes, se acumulan los currículums y alguien tiene que saber a quién se le vence la certificación de aplicador en marzo. La página de empleo alimenta un flujo de contratación, al contratar se crea el registro y su lista de tareas, y la licencia que vence aparece en un panel en vez de quedar en la memoria de alguien.',
      },
    ],
  },

  showcase: {
    title: 'Lo que se construye',
    intro:
      'Cuatro grupos, y dónde está hoy cada pieza. Una línea sin etiqueta ya está funcionando en el sitio de un cliente de jardinería: cualquiera puede ir a verlo. Una línea etiquetada está construida y funcionando y se activa en su empresa cuando usted esté listo, o es un servicio que manejamos junto a la plataforma.',
    groups: [
      {
        key: 'found',
        title: 'Que lo encuentren',
        blurb: 'Un sitio web de paisajismo al que la gente llega antes que a la competencia.',
        items: [
          { text: 'Una página para cada servicio: corte y mantenimiento, control de malezas, diseño y construcción', status: 'in-use' },
          { text: 'Páginas separadas para dueños de casa y para propiedades comerciales', status: 'in-use' },
          { text: 'Un verificador y mapa del área de servicio, con un área principal y otra extendida', status: 'in-use' },
          { text: 'Una galería de trabajos terminados, con sus créditos', status: 'in-use' },
          { text: 'Títulos, descripciones, datos estructurados, mapa del sitio y Perfil de Empresa en Google', status: 'in-use' },
        ],
      },
      {
        key: 'win',
        title: 'Gane el trabajo',
        blurb: 'Todas las formas en que un cliente puede contactarlo, llegando al mismo lugar.',
        items: [
          { text: 'Un formulario de cotización que le dice al visitante si su dirección está en su área', status: 'in-use' },
          { text: 'Un formulario de cotización comercial: sitios, superficie, frecuencia, fecha de inicio', status: 'in-use' },
          { text: 'Atención con IA para jardinería, en su sitio, en inglés y español', status: 'in-use' },
          { text: 'Un sitio en español con selector EN | ES y sus direcciones en español', status: 'in-use' },
          { text: 'Una sola entrada automática para los formularios y el asistente juntos', status: 'in-use' },
          { text: 'Seguimiento de llamadas perdidas y solicitudes de reseñas', status: 'service' },
        ],
      },
      {
        key: 'run',
        title: 'Maneje el negocio',
        blurb: 'La parte que una aplicación de programación le deja a usted y a un archivador.',
        items: [
          { text: 'Una página de empleo donde las solicitudes y los currículums llegan a un solo lugar', status: 'in-use' },
          { text: 'Un flujo de contratación de Nuevo a Contratado, que crea el registro por usted', status: 'ready' },
          { text: 'Licencias y certificaciones con sus fechas de vencimiento en un panel', status: 'ready' },
          { text: 'Un registro de capacitación y una lista de incorporación por persona', status: 'ready' },
          { text: 'Funciones de dueño, oficina, cuadrilla y contador, cada una con su propio alcance', status: 'ready' },
          { text: 'Interruptores que usted maneja y un registro de quién movió qué', status: 'ready' },
        ],
      },
      {
        key: 'finance',
        title: 'Administración y finanzas',
        blurb: 'Dónde está el dinero y las hojas de trabajo que pide su contador.',
        items: [
          { text: 'Ingresos, gastos y margen del año, junto a los del año anterior', status: 'ready' },
          { text: 'Ingresos por línea de servicio y gastos por categoría, mes por mes', status: 'ready' },
          { text: 'Un estado de resultados que puede imprimir, con columnas de proyección', status: 'ready' },
          { text: 'Más de una empresa una al lado de la otra, compartiendo los costos que comparten', status: 'ready' },
          { text: 'Seguimiento de 1099 y W-9 de contratistas, con el umbral y la fecha límite', status: 'ready' },
          { text: 'Hojas de trabajo para el contador, detrás de su propio interruptor del dueño', status: 'ready' },
        ],
      },
    ] as ShowcaseGroup[],
  },

  packages: {
    title: 'Básico, Pro, Avanzado',
    intro:
      'Tres paquetes; cada uno incluye todo lo del paquete anterior más la siguiente capa. Empiece donde está y suba cuando el negocio esté listo: no se reconstruye nada para llegar ahí.',
    mostPopular: 'El más popular',
    includesPrevious: (previous: string) => `Todo lo de ${previous}, más:`,
    pricingNote: 'El precio se define después de una auditoría gratuita de 30 minutos.',
    cta: 'Reserve una llamada inicial gratuita',
    tableTitle: 'Qué incluye cada paquete',
    tableIntro: 'La lista completa, para que nada quede escondido detrás de un "y más".',
    featureColumn: 'Función',
    included: 'Incluido',
    notIncluded: 'No incluido',
    statusLegendTitle: 'Qué significan las etiquetas',
    cardsStatusNote: 'Lo que no tiene etiqueta ya está funcionando hoy en el sitio de un cliente de jardinería. Todo lo etiquetado está construido y funcionando, y se activa para usted cuando esté listo. La tabla de abajo etiqueta cada punto.',
  },

  deepDives: {
    title: 'Una mirada más de cerca',
    intro:
      'Cuatro de las piezas y lo que hace cada una. Cada una dice cuál de las dos es: funcionando hoy en el sitio de un cliente de jardinería, o construida y funcionando y lista para activarse en el suyo.',
    mockNote: 'Interfaz recreada con cifras de ejemplo, no es el registro de un cliente.',
    items: [
      {
        key: 'bilingual',
        status: 'in-use',
        title: 'Un sitio en español, con direcciones incluidas',
        body:
          'Cada página existe dos veces, y la versión en español no vive en una dirección en inglés con palabras en español encima. Su ruta también está en español, así que quien busca en español llega a una página en español y el enlace que reenvía se queda en español. Un toque cambia entre las dos, y a los buscadores se les informa que son la misma página en idiomas distintos.',
        points: [
          'Rutas en español, no un /es/ pegado a una dirección en inglés',
          'Un toque entre EN y ES, y la elección se recuerda',
          'El asistente de voz responde en español en las páginas en español',
          'Si se apaga el español, cada dirección en español va a su página en inglés y no a un error',
          'Cada línea revisada por un hablante nativo antes de publicarse',
        ],
        mock: {
          title: 'La misma página, dos veces',
          rows: [
            { label: 'suempresa.com/services/weed-control', value: 'Inglés', badge: 'EN' },
            { label: 'suempresa.com/es/servicios/control-de-malezas', value: 'Español', badge: 'ES' },
          ],
          footer: 'Las dos están en el mapa del sitio, y cada una señala a la otra.',
        },
      },
      {
        key: 'estimates',
        status: 'in-use',
        title: 'Un formulario que pregunta como un cotizador',
        body:
          'Un dueño de casa le da una dirección y un servicio. Un administrador de propiedades tiene ocho sitios, un ciclo de corte, un año presupuestario y una fecha en la que tiene que empezar. El mismo formulario conoce la diferencia: al elegir comercial hace las preguntas comerciales, y las respuestas llegan juntas en vez de en tres llamadas. La dirección se verifica contra su área de servicio mientras se escribe, así que un trabajo a 110 kilómetros es una conversación antes de ser un viaje.',
        points: [
          'Campos comerciales: tipo de propiedad, cuántos sitios, superficie, frecuencia, fecha de inicio',
          'El área de servicio se decide de nuestro lado, con su lista de códigos postales, nunca con lo que manda el navegador',
          'Área principal, área extendida y fuera del área son tres respuestas distintas, no un solo rechazo',
          'Hecho para las reglas de mensajes de texto, así que el consentimiento queda registrado si da seguimiento por texto',
          'Los formularios y las llamadas al asistente llegan como un mismo tipo de cliente potencial, a un solo lugar',
        ],
        mock: {
          title: 'Cotización comercial — solicitud de ejemplo',
          rows: [
            { label: 'Tipo de propiedad', value: 'Áreas comunes de una asociación', badge: '6 sitios' },
            { label: 'Terreno por mantener', value: '1.8 hectáreas', badge: 'Semanal, mar–oct' },
            { label: 'Área de servicio', value: '32256', badge: 'Área principal' },
          ],
          footer: 'Llega junto con los demás clientes potenciales, marcada como comercial.',
        },
      },
      {
        key: 'crew',
        status: 'ready',
        title: 'Licencias, capacitación y quién puede aplicar producto',
        body:
          'La parte que una aplicación de programación no cubre. Cada certificación, licencia y documento de seguro tiene una fecha de vencimiento, y el panel dice qué vence primero en vez de dejarlo al mes en que a alguien se le ocurra revisar. Cada persona de la cuadrilla tiene un registro de capacitación, y la oficina tiene una respuesta clara a "¿esta persona ya puede aplicar producto sola?". Las solicitudes de su página de empleo llegan al mismo sistema, así que contratar a alguien crea su registro y su lista de tareas en un solo paso.',
        points: [
          'Fechas de vencimiento de la certificación estatal de aplicador, licencias de conducir y seguros',
          'Un registro de capacitación por persona, con lo hecho y lo que se vence',
          'Listas de incorporación con fechas límite, creadas en el momento de contratar',
          'La cuadrilla revisa su propio estado en el celular en vez de llamar a la oficina',
          'Almacenamiento privado de documentos y una función de oficina que no alcanza las cuentas',
        ],
        mock: {
          title: 'Estado de la cuadrilla — registros de ejemplo',
          rows: [
            { label: 'Ejemplo, A.', value: 'Certificación de aplicador', badge: 'Vence en 41 días' },
            { label: 'Muestra, B.', value: 'Incorporación', badge: '3 de 7 listas' },
            { label: 'Prueba, C.', value: 'Registro de capacitación', badge: 'Autorizado a aplicar' },
          ],
          footer: 'El panel lista lo que vence primero, para que nada dependa de que alguien se acuerde.',
        },
      },
      {
        key: 'finance',
        status: 'ready',
        title: 'Finanzas e impuestos, dentro de su administración',
        body:
          'Dónde está el dinero, en el mismo lugar que todo lo demás, en vez de una hoja de cálculo que alguien tiene que acordarse de actualizar. Este año junto al anterior, ingresos por línea de servicio, gastos por categoría y un estado de resultados que puede imprimir. Cuando el contador pregunta, las hojas de trabajo ya están hechas: estimaciones trimestrales, la declaración anual, 1099-NEC y 1096, conciliación de nómina e impuesto sobre las ventas de Florida. Su contador recibe su propio acceso, que alcanza la parte de impuestos y nada más. Construido y funcionando con cifras de ejemplo, y se activa en su empresa cuando usted esté listo.',
        points: [
          'Entradas escritas a mano, importadas desde un CSV o enviadas automáticamente desde otro sistema',
          'Más de una empresa una al lado de la otra, con los costos compartidos repartidos entre ellas',
          'Hojas de trabajo que cuadran con el estado de resultados, con lo no verificado marcado para revisión',
          'Los números de línea de los formularios, los umbrales y las tasas se guardan como datos con su fuente, no escritos en el código',
          'Una revisión mensual de formularios revisados del IRS y de Florida que marca el cambio para que una persona lo apruebe',
          'Hojas de trabajo para su contador, nunca una declaración presentada, y no guarda números de impuestos ni bancarios',
        ],
        mock: {
          title: 'Finanzas › Resumen — empresa de ejemplo, 2026',
          rows: [
            { label: 'Ingresos del año', value: '$310,000', badge: 'Por línea de servicio' },
            { label: 'Gastos del año', value: '$205,000', badge: 'Por categoría' },
            { label: 'Margen neto', value: '34%', badge: 'Por mes' },
          ],
          footer: 'Descargar la hoja de trabajo para el contador (CSV)',
        },
      },
    ] as DeepDive[],
  },

  caseStudy: {
    eyebrow: 'El trabajo del que habla esta página',
    title: 'Véalo en un sitio de jardinería en vivo',
    body:
      'By The C of Jax es una empresa de jardinería y paisajismo en Jacksonville, y su sitio es al que apunta cada etiqueta verde de esta página. Las páginas residencial y comercial, una página por servicio con su interruptor detrás, el verificador del área de servicio, los formularios de cotización y de cotización comercial, la página de empleo, la galería, el asistente de voz con IA y el sitio completo en español con direcciones en español están funcionando hoy en su propio dominio. El área de administración detrás —registros de la cuadrilla, licencias, capacitación, contratación y la parte de finanzas e impuestos— está construida y funcionando, esperando el día en que activen cada parte.',
    link: 'Visite bythecofjax.com',
    note: 'Es su sitio, no una demostración nuestra. Se abre en una pestaña nueva.',
  },

  faqTitle: 'Preguntas que hacen los dueños de empresas de jardinería',
  faq: [
    {
      id: 'ownership',
      question: '¿Quién es dueño del sitio web y de los datos?',
      answer:
        'Usted. Los registros de sus clientes, su dominio, su marca, sus fotos y contenido y su cuenta de pagos son suyos, y puede exportar sus datos en cualquier momento. El software de la plataforma se le licencia a través del plan mensual de mantenimiento, que es lo que lo mantiene alojado, actualizado y con soporte. Si algún día se va, se lleva sus datos, su dominio, su contenido y su cuenta de pagos. Si prefiere manejar la plataforma usted mismo, existe la opción de comprar la licencia del software.',
      more: { label: 'Más sobre la propiedad', path: '/faq#ownership' },
    },
    {
      id: 'booking',
      question: '¿Los clientes pueden reservar en línea y se conecta con mi software de programación?',
      answer:
        'Todavía no, y preferimos decirlo en vez de ponerle una etiqueta. Hoy el sitio web toma la solicitud —el formulario de cotización, el formulario comercial o el asistente de voz— y le llega a usted y a su CRM como un mismo tipo de cliente potencial, que es lo que la mayoría de las empresas de este oficio realmente quiere: usted ve la propiedad antes de comprometer una cuadrilla a una hora. La reserva en línea contra un calendario de programación, y una sincronización de dos vías con Jobber o FieldRoutes, es el siguiente paso de construcción en ese proyecto y aún no ha empezado. Cuando esté construido aparecerá aquí con las mismas etiquetas que todo lo demás.',
    },
    {
      id: 'seasonal',
      question: '¿Puedo apagar un servicio fuera de temporada?',
      answer:
        'Sí, y es un interruptor, no una llamada a nosotros. Cada servicio es una fila en un solo registro que controla las páginas, los menús y los puntos de acceso que le corresponden, así que al apagarlo se los lleva a todos: la página del servicio redirige, la tarjeta y la entrada del menú desaparecen, la dirección sale de su mapa del sitio y de sus datos estructurados, y el asistente de voz deja de ofrecerlo y trata la solicitud como algo que consultarle a usted. Nada se borra, y al volver a encenderlo todo regresa como estaba. Solo el dueño puede mover un interruptor, y eso lo impone la base de datos, no una casilla en gris.',
    },
    {
      id: 'spanish',
      question: '¿Necesito el sitio en español?',
      answer:
        'En este oficio rinde el doble: los clientes hispanohablantes pueden leer y compartir su sitio, y las páginas pueden posicionarse en español en vez de competir con las de inglés. Lo importante es que las páginas en español tengan direcciones en español, para que sean páginas reales y no una capa de traducción. El asistente de voz responde en español en ellas. Cada línea la revisa un hablante nativo antes de publicar sus páginas.',
    },
    {
      id: 'crm',
      question: '¿Tengo que cambiar el software que uso para programar y facturar?',
      answer:
        'No. El sitio nunca reemplaza su software de servicio en campo: las rutas, la aplicación de la cuadrilla y la facturación se quedan donde están. Lo que agregamos es la entrada de clientes potenciales por delante y la parte de licencias, contratación y finanzas que ese software no cubre, y conectamos las dos para que los clientes potenciales lleguen en un mismo formato.',
    },
    {
      id: 'voice-cost',
      question: '¿Qué evita que el asistente de IA genere una cuenta alta?',
      answer:
        'Tres cosas, y todas fallan del lado seguro. Cada visitante tiene un límite de unas pocas llamadas por hora, todo el sitio tiene un tope diario de llamadas, y si algo que el asistente necesita no está disponible rechaza la llamada en vez de adivinar. También es un interruptor que usted maneja, así que puede apagarlo por completo. Responde según sus servicios y su área, y nunca reserva ni programa nada: toma los datos y le entrega un cliente potencial.',
    },
    {
      id: 'audit',
      question: '¿Qué pasa en la auditoría gratuita?',
      answer:
        'Una llamada de 30 minutos y luego una revisión corta de cómo funciona el negocio hoy: de dónde llegan los clientes potenciales y qué pasa con ellos, para qué se posiciona y para qué no su sitio actual, qué está anotando la oficina a mano y cuál de los paquetes realmente le queda. Después recibe una cotización por escrito. No cotizamos a ciegas, y la llamada no cuesta nada.',
    },
    {
      id: 'process',
      question: '¿Cómo es todo el proceso?',
      answer:
        'Llamada inicial, luego la auditoría, luego una sesión de requisitos donde anotamos exactamente lo que necesita, y después una cotización por escrito con un calendario. Luego la construcción, entregada por etapas para que la vea tomar forma, y después el plan mensual de mantenimiento: alojamiento, actualizaciones, respaldos, monitoreo, soporte y cambios pequeños sobre la marcha.',
    },
  ] as FaqItem[],

  closing: {
    title: 'Empiece con la auditoría',
    body:
      'Treinta minutos por teléfono, una revisión de lo que tiene y una cotización por escrito del paquete que le queda. Sin precios antes de eso, porque estaríamos adivinando.',
  },
};

export default { en, es };
