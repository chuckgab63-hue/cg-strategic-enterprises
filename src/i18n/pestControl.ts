// Copy for /pest-control and /es/pest-control. The packages themselves and the
// feature × package matrix are data, in src/config/pestPackages.ts; this file
// is the prose around them.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). Latin American, usted.
//
// Honesty rules: no results, no metrics, no client details beyond what
// /work/one-source-total-pest-control already shows, and every mock screen says
// it is a mock with sample data. "Rolling out" means built but not yet live
// with a customer; it must not read as "available now".

import type { FaqItem } from './faq.ts';
import type { SwitchKey } from '../config/pestPackages.ts';

interface MockRow {
  label: string;
  value: string;
  badge?: string;
}

interface DeepDive {
  key: 'voice' | 'analyzer' | 'contracts' | 'renewals' | 'licensing' | 'spanish';
  status: 'in-use' | 'rolling-out';
  title: string;
  body: string;
  points: string[];
  /** A screenshot already cleared for the case study. */
  shot?: { caption: string; alt: string };
  /** Recreated interface, so no screenshot of anyone's records is needed. */
  mock?: { title: string; rows: MockRow[]; footer: string };
}

const en = {
  eyebrow: 'Pest control',
  title: 'Built for pest control companies',
  intro:
    'A website that gets found, an assistant that answers when the office is closed, and an office system that keeps licences, hiring and termite contracts straight — in English and Spanish, for pest control companies across Florida and Georgia.',
  ctaAlex: 'Talk to Alex',
  ctaCall: 'Call us',
  newTab: '(opens in a new tab)',
  breadcrumbs: { label: 'Breadcrumb', home: 'Home', here: 'Pest control' },
  /** serviceType and audience in the Service structured data. */
  schema: {
    serviceType: 'Website, AI answering and contract software for pest control companies',
    audience: 'Pest control companies',
  },

  // --- The switch demo -----------------------------------------------------
  demo: {
    title: 'Turn features on when you are ready',
    intro:
      "You do not buy the whole system on day one. Each part is a switch, and the ones in your admin area are yours to move. Flip them below and watch the site and the admin area change — this is a demo of the real panel, with sample data.",
    status:
      'The switch panel is itself rolling out: built and tested against a database of sample records, with the first pest control client being moved onto it now. Nobody is running their business on it yet.',
    tryIt: 'Try it: flip a switch.',
    panelTitle: 'Admin › Settings › Features',
    reset: 'Reset the switches',

    groups: {
      settings: 'Switches in your admin area',
      build: 'Chosen when we build',
    },
    groupNotes: {
      settings:
        'Owner-only. An office admin sees every switch and its state but cannot move one, and that is enforced by the database, not by a greyed-out box.',
      build:
        'These two are decided when we build your site rather than toggled in Settings. They change the site just as much, so the preview reacts to them too.',
    },

    switches: {
      contracts: {
        label: 'Contracts',
        description:
          'The contract file: write a new agreement, keep the signed ones, hold the scanned paper originals, and search the lot.',
      },
      esign: {
        label: 'Send for signature',
        description:
          'Email a contract to the customer to sign on their phone, chase it with a resend, and void one that went out wrong. Off means staff still write and print contracts; nothing is emailed.',
      },
      wdo: {
        label: 'Offer WDO inspections',
        description:
          'Whether wood-destroying-organism inspections are for sale. Off hides the WDO page, its nav and homepage card, keeps the URL out of your sitemap, and stops the voice assistant offering it.',
      },
      spanish: {
        label: 'Spanish site',
        description:
          'A full Spanish version with its own addresses and an EN | ES toggle, so Spanish-speaking customers can read your site and find it in Spanish.',
      },
      jess: {
        label: 'Talk to Jess',
        description:
          'An AI voice assistant on your website that answers pest questions in English or Spanish, then takes the caller’s details as a lead.',
      },
    } as Record<SwitchKey, { label: string; description: string }>,

    scopeStatus: {
      admin: 'Applies immediately.',
      public: 'Rebuilds the public site, about a minute.',
    },
    lockedBy: (parent: string) => `Turn ${parent} on first.`,
    noDelete:
      'Switching something off hides and blocks it. It never deletes: every record stays exactly where it is, and turning the switch back on brings it all back as it was.',

    checklistTitle: 'Before this will work',
    checklist: [
      'The signing templates exist, one per language, with the field names the send step fills.',
      'The signing service’s API key lives in your automation account and nowhere else — not in the website code.',
      'The "send for signature" automation is switched on, and its callbacks point at your site.',
    ],

    previewLabel: 'What changes',
    websiteTitle: 'Your website',
    adminTitle: 'Your admin area',
    mockNote: 'Sample company, sample data. Not a real customer record.',

    mock: {
      company: 'Sample Pest Co.',
      navHome: 'Home',
      navServices: ['Termites', 'Rodents', 'Mosquitoes'],
      navWdo: 'WDO Inspections',
      navContact: 'Contact',
      heroTitle: 'Pest control you can book today',
      heroBook: 'Book online',
      heroJess: 'Talk to Jess',
      heroCall: 'Call',
      servicesTitle: 'Services',
      services: ['General pest', 'Termites', 'Rodents', 'Mosquitoes'],
      serviceWdo: 'WDO inspections',
      langToggle: 'EN | ES',
      adminNav: ['Dashboard', 'Staff', 'Credentials', 'Training Log', 'Applicants', 'Onboarding'],
      adminNavContracts: 'Contracts',
      adminNavRest: ['Documents', 'Settings'],
      contractsHeading: 'Contracts',
      contractRow: 'Sample, A. — 123 Example Rd',
      contractStatus: 'Draft',
      contractSend: 'Send for signature',
      contractsOff: 'Contracts is switched off. Nothing is deleted; the records are still there.',
      wdoAdded: 'WDO inspections added to the site',
      wdoRemoved: 'WDO inspections hidden from the site',
    },
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
    statusLabels: {
      'in-use': 'In use with a client',
      'rolling-out': 'Rolling out',
      service: 'Service, not software',
    },
    /** The legend above the table. Say what each label means, not what we hope it means. */
    statusLegendTitle: 'What the labels mean',
    statusMeanings: {
      'in-use': 'A pest control client is using it in production right now.',
      'rolling-out': 'Built and tested, running on a test database with sample data. No client has used it yet.',
      service: 'Something we run alongside the platform rather than part of the website.',
    },
    cardsStatusNote: 'Items with no label are in use with a pest control client today. The full table below labels every one.',
  },

  // --- Feature deep-dives --------------------------------------------------
  deepDives: {
    title: 'A closer look',
    intro:
      'Six of the pieces, and what each one actually does. Each says which of the two it is: already in use with a pest control client, or built and tested and still on its way to one.',
    statusLabels: {
      'in-use': 'In use with a client',
      'rolling-out': 'Rolling out',
    },
    statusMeanings: {
      'in-use': 'A pest control client is using it in production right now.',
      'rolling-out': 'Built and tested, running on a test database with sample data. No client has used it yet.',
    },
    mockNote: 'Recreated interface with sample data, not a customer record.',
    items: [
      {
        key: 'voice',
        status: 'in-use',
        title: 'A voice assistant that knows your pests',
        body:
          'A caller asks what is eating their lawn at nine in the evening. The assistant answers from a Northeast Florida knowledge base built on university extension research, then takes their details so the lead is waiting for you in the morning. This is running on a pest control site today.',
        points: [
          'Answers from your services and your area, not the whole internet',
          'Every call ends as a lead in the same place as your forms',
          'A daily cap on calls, so the bill cannot run away',
          'Spanish, with no "press 2 for Spanish" — built and rolling out, not live yet',
          'Follows your feature switches, so it stops offering a service you turn off — part of the same roll-out',
        ],
        shot: {
          caption: 'The assistant panel on a service page',
          alt: 'Talk to Jess panel open on a pest control termite page, explaining that calls are with an AI assistant, with Start call and Cancel buttons',
        },
      },
      {
        key: 'analyzer',
        status: 'in-use',
        title: 'A photo becomes a lead',
        body:
          'Customers do not know the name of the bug. They do have a photo. They upload it, get a first-guess identification with how confident it is and what to do next, and the lead arrives with the photo and a suggested service already attached.',
        points: [
          'A first guess, with its confidence shown plainly — never a diagnosis',
          'Points at the right service page, so the next click is a booking',
          'An optional follow-up form turns the visit into a named lead',
          'Rate-limited, so nobody can run up your AI bill',
        ],
        shot: {
          caption: 'Photo upload on desktop and phone',
          alt: 'Pest Analyzer page on a pest control website: a photo drop area beside the upload field, an optional notes box and an Analyze my photo button',
        },
      },
      {
        key: 'contracts',
        status: 'rolling-out',
        title: 'The termite file, out of the drawer',
        body:
          'Every agreement in one searchable list, filed A–Z by customer. The dates that have to agree with each other — the right to cancel, when the agreement ends, how long the record is kept — are worked out by the system rather than typed three times. When an inspector asks for one, you hand over a single PDF. It is built and tested against sample contracts; the first client is being moved onto it now.',
        points: [
          'The signed or scanned original cannot be replaced or deleted',
          'An audit packet in one file: the record, the timeline, the file fingerprints, the original and the signing certificate',
          'Years of paper contracts scanned in batches, with a person checking every field before it counts',
          'Owner-only deletion, and retention is a report — never a job that removes files',
        ],
        mock: {
          title: 'Contracts',
          rows: [
            { label: 'Sample, A. — 123 Example Rd', value: 'Signed', badge: 'Original on file' },
            { label: 'Example, B. — 45 Sample Ct', value: 'Out for signature', badge: 'Sent' },
            { label: 'Placeholder, C. — 9 Demo Ln', value: 'Paper, imported', badge: 'Verified' },
          ],
          footer: 'Download audit packet (PDF)',
        },
      },
      {
        key: 'renewals',
        status: 'rolling-out',
        title: 'Renewal season stops surprising you',
        body:
          'Each agreement knows the month it renews. The contract list filters to what is due, and the same information goes out in one email a day, so the renewal conversation happens before the cover lapses rather than after. It travels with the contract file, so it is rolling out at the same time.',
        points: [
          'A renewals-due filter on the contract list',
          'The renewals section of the daily email, with the fee',
          'The daily email itself is already in use for expiring licences and overdue onboarding',
          'Switch the reminders off and the renewal months stay on the records',
        ],
        mock: {
          title: 'Daily email — renewals due',
          rows: [
            { label: 'Sample, A.', value: 'March', badge: '$ renewal fee' },
            { label: 'Example, B.', value: 'April', badge: '$ renewal fee' },
          ],
          footer: 'Plus 2 licences expiring and 1 overdue onboarding item',
        },
      },
      {
        key: 'licensing',
        status: 'in-use',
        title: 'Licences, training and who can run a route',
        body:
          'The part of the business a field-service app does not cover. Every ID card, certification and the business licence has an expiry date and a dashboard showing what lapses in the next 30, 60 and 90 days. Each technician has a supervised training log and a plain answer to "are they ready for their own route yet".',
        points: [
          'A 30/60/90-day expiry dashboard, plus the daily email',
          'A supervised training log per technician, per category',
          'Route-ready status, with what is still missing spelled out',
          'Applications from your careers page land in one pipeline; hiring creates the staff record and the onboarding checklist',
          'Technicians check their own status on their phone instead of calling the office',
        ],
        shot: {
          caption: "A technician's readiness (mock-up with sample data)",
          alt: "Mock of a technician's page in a pest control admin area: supervised training progress for each licence category, ID card status, onboarding progress and what is left before they are route-ready",
        },
      },
      {
        key: 'spanish',
        status: 'rolling-out',
        title: 'A Spanish site, not a translate button',
        body:
          'Every page exists twice, each with its own address, so a Spanish-speaking customer can find you in Spanish and share a link that stays in Spanish. The admin area is bilingual too. It is written, built and waiting on its native-speaker review before the first client switches it on.',
        points: [
          'Its own URLs, so Spanish pages can rank in Spanish',
          'One tap between EN and ES, and the choice is remembered',
          'The voice assistant and the contract templates both have a Spanish version, rolling out with it',
          'Noting who on your staff speaks Spanish is already in use, so you can staff a route on purpose',
          'Every line reviewed by a native speaker before it goes live',
        ],
        mock: {
          title: 'The same page, twice',
          rows: [
            { label: 'yourcompany.com/termite-treatment', value: 'English', badge: 'EN' },
            { label: 'yourcompany.com/es/termite-treatment', value: 'Spanish', badge: 'ES' },
          ],
          footer: 'Search engines are told the two are the same page in different languages.',
        },
      },
    ] as DeepDive[],
  },

  // --- Case study band -----------------------------------------------------
  caseStudy: {
    eyebrow: 'The first build',
    title: 'See it on a real pest control site',
    body:
      'We built this with One Source Total Pest Control in Jacksonville. Their office uses the admin area every day — staff, licensing, training, hiring, onboarding and the daily email — and the site runs the photo analyzer, the voice assistant and one lead intake. The newer parts, the contract file and the switch panel and the Spanish site, are built and being rolled out to them now. The case study walks through what was there before and what replaced it.',
    link: 'Read the One Source case study',
  },

  // --- FAQ -----------------------------------------------------------------
  faqTitle: 'Questions pest control owners ask',
  faq: [
    {
      id: 'ownership',
      question: 'Who owns the website and the data?',
      answer:
        'You do. Your customer and contract records, your domain, your brand, photos and content, and your payment account are yours, and you can export your data at any time. The platform software is licensed to you through the monthly care plan, which is what keeps it hosted, patched and supported. If you ever leave, you take your data, domain, content and payment account with you. If you would rather run the platform yourself, there is an option to buy out the software licence.',
      more: { label: 'More on ownership', path: '/faq#ownership' },
    },
    {
      id: 'switches',
      question: 'How do the feature switches work?',
      answer:
        'Each part of the system is a row in one registry that owns the pages, menus and endpoints it controls, so switching it off takes all of them with it and cannot leave a page reachable that somebody forgot to guard. Only the owner can move a switch. Switches inside the admin area apply immediately; ones that change the public site rebuild it in about a minute. Nothing is deleted either way, and a feature that depends on another cannot be switched on until its parent is. To be straight with you about where this stands: the panel is built and tested against sample records, and the first client is being moved onto it. Nobody is running their business on it yet.',
    },
    {
      id: 'start-small',
      question: 'Can I start with Basic and add the rest later?',
      answer:
        'Yes, that is the point of building it this way. Moving from Basic to Pro or Pro to Advanced switches the next layer on, on the same site, with the same addresses and the same content. There is no rebuild and no second launch.',
    },
    {
      id: 'esign-status',
      question: 'Is the e-signature live?',
      answer:
        'Not yet with a customer. It is built, tested and switched off by default, and switching it on shows a checklist of the setup that has to be in place first: the signing templates in each language, the API key held in the automation account rather than the website, and the send automation switched on with its callbacks pointed at your site. We will tell you plainly when the first customer has signed through it.',
    },
    {
      id: 'spanish',
      question: 'Do I need the Spanish site?',
      answer:
        'That depends on your area and your crews. Where it earns its keep, it earns it twice: Spanish-speaking customers can read and share your site, and the pages can rank in Spanish instead of competing with your English ones. The voice assistant and the contract templates both have a Spanish version. Where it stands today: the Spanish site and the Spanish half of the voice assistant are written and built, waiting on their native-speaker review, and no client has switched them on yet. Every line is reviewed before it goes live.',
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
    {
      id: 'crm',
      question: 'Do I have to change CRMs?',
      answer:
        'No. The site never replaces your field-service software — scheduling, routing, the technician app and invoicing stay where they are. What we add is the lead intake in front of it and the licensing, hiring and contract side it does not cover, and we connect the two so leads arrive in your CRM in one shape.',
    },
  ] as FaqItem[],

  closing: {
    title: 'Start with the audit',
    body:
      'Thirty minutes on the phone, a look at what you have, and a written quote for the package that fits. No prices before that, because we would be guessing.',
  },
};

const es: typeof en = {
  eyebrow: 'Control de plagas',
  title: 'Hecho para empresas de control de plagas',
  intro:
    'Un sitio web que la gente encuentra, un asistente que contesta cuando la oficina está cerrada y un sistema de oficina que mantiene en orden las licencias, las contrataciones y los contratos de termitas: en inglés y español, para empresas de control de plagas en todo Florida y Georgia.',
  ctaAlex: 'Hablar con Alex',
  ctaCall: 'Llámenos',
  newTab: '(se abre en una pestaña nueva)',
  breadcrumbs: { label: 'Ruta de navegación', home: 'Inicio', here: 'Control de plagas' },
  schema: {
    serviceType: 'Sitios web, atención telefónica con IA y software de contratos para empresas de control de plagas',
    audience: 'Empresas de control de plagas',
  },

  demo: {
    title: 'Active funciones cuando esté listo',
    intro:
      'No compra todo el sistema el primer día. Cada parte es un interruptor, y los que están en su área de administración los maneja usted. Muévalos aquí abajo y vea cómo cambian el sitio y la administración: es una demostración del panel real, con datos de muestra.',
    status:
      'El panel de interruptores está en implementación: construido y probado con una base de datos de registros de muestra, y el primer cliente de control de plagas está pasando a usarlo ahora. Todavía nadie maneja su negocio con él.',
    tryIt: 'Pruébelo: mueva un interruptor.',
    panelTitle: 'Administración › Configuración › Funciones',
    reset: 'Restablecer los interruptores',

    groups: {
      settings: 'Interruptores en su administración',
      build: 'Se deciden cuando construimos',
    },
    groupNotes: {
      settings:
        'Solo el dueño. Una persona de la oficina ve todos los interruptores y su estado, pero no puede mover ninguno, y eso lo impone la base de datos, no una casilla desactivada.',
      build:
        'Estos dos se deciden cuando construimos su sitio, no se activan en Configuración. Cambian el sitio igual de mucho, así que la vista previa también reacciona a ellos.',
    },

    switches: {
      contracts: {
        label: 'Contratos',
        description:
          'El archivo de contratos: redacte un acuerdo nuevo, conserve los firmados, guarde los originales en papel escaneados y busque en todo el conjunto.',
      },
      esign: {
        label: 'Enviar para firma',
        description:
          'Envíele el contrato por correo al cliente para que lo firme en su celular, insista con un reenvío y anule el que salió mal. Desactivado significa que el personal sigue redactando e imprimiendo contratos; no se envía nada por correo.',
      },
      wdo: {
        label: 'Ofrecer inspecciones WDO',
        description:
          'Si vende inspecciones de organismos que destruyen la madera. Desactivado oculta la página WDO, su menú y su tarjeta en la página de inicio, deja la dirección fuera de su mapa del sitio y evita que el asistente de voz la ofrezca.',
      },
      spanish: {
        label: 'Sitio en español',
        description:
          'Una versión completa en español con sus propias direcciones y un selector EN | ES, para que los clientes hispanohablantes lean su sitio y lo encuentren en español.',
      },
      jess: {
        label: 'Hablar con Jess',
        description:
          'Un asistente de voz con IA en su sitio web que responde preguntas sobre plagas en inglés o español y luego toma los datos de la persona como cliente potencial.',
      },
    },

    scopeStatus: {
      admin: 'Se aplica de inmediato.',
      public: 'Reconstruye el sitio público, alrededor de un minuto.',
    },
    lockedBy: (parent: string) => `Primero active ${parent}.`,
    noDelete:
      'Desactivar algo lo oculta y lo bloquea. Nunca borra: cada registro se queda exactamente donde está, y al volver a activar el interruptor todo regresa como estaba.',

    checklistTitle: 'Antes de que esto funcione',
    checklist: [
      'Las plantillas de firma existen, una por idioma, con los nombres de campo que llena el paso de envío.',
      'La clave de API del servicio de firma vive en su cuenta de automatización y en ningún otro lugar, no en el código del sitio web.',
      'La automatización de "enviar para firma" está activada y sus respuestas apuntan a su sitio.',
    ],

    previewLabel: 'Qué cambia',
    websiteTitle: 'Su sitio web',
    adminTitle: 'Su área de administración',
    mockNote: 'Empresa de muestra, datos de muestra. No es el registro de un cliente real.',

    mock: {
      company: 'Plagas de Muestra',
      navHome: 'Inicio',
      navServices: ['Termitas', 'Roedores', 'Mosquitos'],
      navWdo: 'Inspecciones WDO',
      navContact: 'Contacto',
      heroTitle: 'Control de plagas que puede reservar hoy',
      heroBook: 'Reservar en línea',
      heroJess: 'Hablar con Jess',
      heroCall: 'Llamar',
      servicesTitle: 'Servicios',
      services: ['Plagas generales', 'Termitas', 'Roedores', 'Mosquitos'],
      serviceWdo: 'Inspecciones WDO',
      langToggle: 'EN | ES',
      adminNav: ['Panel', 'Personal', 'Credenciales', 'Capacitación', 'Solicitantes', 'Incorporación'],
      adminNavContracts: 'Contratos',
      adminNavRest: ['Documentos', 'Configuración'],
      contractsHeading: 'Contratos',
      contractRow: 'Muestra, A. — 123 Calle Ejemplo',
      contractStatus: 'Borrador',
      contractSend: 'Enviar para firma',
      contractsOff: 'Contratos está desactivado. No se borra nada; los registros siguen ahí.',
      wdoAdded: 'Inspecciones WDO agregadas al sitio',
      wdoRemoved: 'Inspecciones WDO ocultas del sitio',
    },
  },

  packages: {
    title: 'Básico, Pro, Avanzado',
    intro:
      'Tres paquetes, cada uno con todo lo del paquete anterior más la siguiente capa. Empiece donde está y suba cuando el negocio esté listo: no se reconstruye nada para llegar allí.',
    mostPopular: 'El más elegido',
    includesPrevious: (previous: string) => `Todo lo de ${previous}, más:`,
    pricingNote: 'El precio se define después de una auditoría gratuita de 30 minutos.',
    cta: 'Agende una llamada introductoria gratuita',
    tableTitle: 'Qué incluye cada paquete',
    tableIntro: 'La lista completa, para que nada quede escondido detrás de un "y más".',
    featureColumn: 'Función',
    included: 'Incluido',
    notIncluded: 'No incluido',
    statusLabels: {
      'in-use': 'En uso con un cliente',
      'rolling-out': 'En implementación',
      service: 'Servicio, no software',
    },
    statusLegendTitle: 'Qué significan las etiquetas',
    statusMeanings: {
      'in-use': 'Un cliente de control de plagas lo está usando en producción ahora mismo.',
      'rolling-out': 'Construido y probado, funcionando en una base de datos de prueba con datos de muestra. Ningún cliente lo ha usado todavía.',
      service: 'Algo que manejamos junto a la plataforma, no una parte del sitio web.',
    },
    cardsStatusNote: 'Lo que no lleva etiqueta está en uso hoy con un cliente de control de plagas. La tabla completa de abajo etiqueta cada punto.',
  },

  deepDives: {
    title: 'Una mirada más de cerca',
    intro:
      'Seis de las piezas y lo que hace cada una. Cada una indica cuál de las dos cosas es: ya en uso con un cliente de control de plagas, o construida y probada pero todavía en camino a uno.',
    statusLabels: {
      'in-use': 'En uso con un cliente',
      'rolling-out': 'En implementación',
    },
    statusMeanings: {
      'in-use': 'Un cliente de control de plagas lo está usando en producción ahora mismo.',
      'rolling-out': 'Construido y probado, funcionando en una base de datos de prueba con datos de muestra. Ningún cliente lo ha usado todavía.',
    },
    mockNote: 'Interfaz recreada con datos de muestra, no el registro de un cliente.',
    items: [
      {
        key: 'voice',
        status: 'in-use',
        title: 'Un asistente de voz que conoce sus plagas',
        body:
          'Alguien llama a las nueve de la noche para preguntar qué se está comiendo su jardín. El asistente responde con una base de conocimiento del noreste de Florida construida a partir de investigación de extensión universitaria, y luego toma sus datos para que el cliente potencial lo esté esperando por la mañana. Esto ya funciona hoy en el sitio de una empresa de control de plagas.',
        points: [
          'Responde con sus servicios y su zona, no con todo el internet',
          'Cada llamada termina como cliente potencial en el mismo lugar que sus formularios',
          'Un límite diario de llamadas, para que la cuenta no se dispare',
          'Español, sin "oprima 2 para español": construido y en implementación, todavía no en uso',
          'Sigue sus interruptores de funciones, así que deja de ofrecer un servicio que usted desactive: parte de la misma implementación',
        ],
        shot: {
          caption: 'El panel del asistente en una página de servicio',
          alt: 'Panel de Hablar con Jess abierto en la página de termitas de un sitio de control de plagas, que explica que las llamadas son con un asistente de IA, con botones de iniciar llamada y cancelar',
        },
      },
      {
        key: 'analyzer',
        status: 'in-use',
        title: 'Una foto se convierte en cliente potencial',
        body:
          'Los clientes no saben cómo se llama el insecto. Pero tienen una foto. La suben, reciben una primera identificación con el nivel de confianza y qué hacer después, y el cliente potencial llega con la foto y un servicio sugerido ya adjunto.',
        points: [
          'Una primera suposición, con su confianza indicada claramente; nunca un diagnóstico',
          'Lleva a la página de servicio correcta, para que el siguiente clic sea una reserva',
          'Un formulario de seguimiento opcional convierte la visita en un cliente potencial con nombre',
          'Con límite de uso, para que nadie dispare su cuenta de IA',
        ],
        shot: {
          caption: 'Subida de fotos en computadora y celular',
          alt: 'Página del analizador de plagas en un sitio de control de plagas: un área para soltar la foto junto al campo de carga, una casilla de notas opcional y un botón para analizar la foto',
        },
      },
      {
        key: 'contracts',
        status: 'rolling-out',
        title: 'El archivo de termitas, fuera del cajón',
        body:
          'Todos los acuerdos en una sola lista con búsqueda, archivados de A a Z por cliente. Las fechas que tienen que coincidir entre sí (el derecho a cancelar, cuándo termina el acuerdo, cuánto se conserva el registro) las calcula el sistema en lugar de escribirse tres veces. Cuando un inspector pide uno, usted entrega un solo PDF. Está construido y probado con contratos de muestra; el primer cliente está pasando a usarlo ahora.',
        points: [
          'El original firmado o escaneado no se puede reemplazar ni borrar',
          'Un paquete de auditoría en un archivo: el registro, la línea de tiempo, las huellas de los archivos, el original y el certificado de firma',
          'Años de contratos en papel escaneados por lotes, con una persona que revisa cada campo antes de que cuente',
          'Solo el dueño puede borrar, y la conservación es un informe, nunca una tarea que elimina archivos',
        ],
        mock: {
          title: 'Contratos',
          rows: [
            { label: 'Muestra, A. — 123 Calle Ejemplo', value: 'Firmado', badge: 'Original en archivo' },
            { label: 'Ejemplo, B. — 45 Calle Muestra', value: 'Enviado para firma', badge: 'Enviado' },
            { label: 'Prueba, C. — 9 Calle Demo', value: 'Papel, importado', badge: 'Verificado' },
          ],
          footer: 'Descargar paquete de auditoría (PDF)',
        },
      },
      {
        key: 'renewals',
        status: 'rolling-out',
        title: 'La temporada de renovaciones deja de sorprenderlo',
        body:
          'Cada acuerdo sabe en qué mes se renueva. La lista de contratos se filtra por lo que vence, y la misma información sale en un correo al día, para que la conversación de renovación ocurra antes de que la cobertura se venza y no después. Va junto con el archivo de contratos, así que se implementa al mismo tiempo.',
        points: [
          'Un filtro de renovaciones por vencer en la lista de contratos',
          'La sección de renovaciones del correo diario, con la tarifa',
          'El correo diario ya está en uso para las licencias por vencer y la incorporación atrasada',
          'Desactive los recordatorios y los meses de renovación se quedan en los registros',
        ],
        mock: {
          title: 'Correo diario — renovaciones por vencer',
          rows: [
            { label: 'Muestra, A.', value: 'Marzo', badge: '$ tarifa de renovación' },
            { label: 'Ejemplo, B.', value: 'Abril', badge: '$ tarifa de renovación' },
          ],
          footer: 'Más 2 licencias por vencer y 1 tarea de incorporación atrasada',
        },
      },
      {
        key: 'licensing',
        status: 'in-use',
        title: 'Licencias, capacitación y quién puede llevar una ruta',
        body:
          'La parte del negocio que no cubre una app de servicio de campo. Cada tarjeta de identificación, certificación y la licencia del negocio tiene fecha de vencimiento y un panel que muestra qué se vence en los próximos 30, 60 y 90 días. Cada técnico tiene un registro de capacitación supervisada y una respuesta clara a "¿ya está listo para su propia ruta?".',
        points: [
          'Un panel de vencimientos a 30/60/90 días, más el correo diario',
          'Un registro de capacitación supervisada por técnico y por categoría',
          'Estado de "listo para ruta", con lo que todavía falta bien explicado',
          'Las solicitudes de su página de empleo llegan a un solo flujo; al contratar se crean el registro de personal y la lista de incorporación',
          'Los técnicos revisan su propio estado en el celular en lugar de llamar a la oficina',
        ],
        shot: {
          caption: 'La preparación de un técnico (maqueta con datos de muestra)',
          alt: 'Maqueta de la página de un técnico en el área de administración de una empresa de control de plagas: avance de la capacitación supervisada por categoría de licencia, estado de la tarjeta de identificación, avance de la incorporación y lo que falta para estar listo para ruta',
        },
      },
      {
        key: 'spanish',
        status: 'rolling-out',
        title: 'Un sitio en español, no un botón de traducir',
        body:
          'Cada página existe dos veces, cada una con su propia dirección, para que un cliente hispanohablante lo encuentre en español y comparta un enlace que se queda en español. El área de administración también es bilingüe. Está escrito, construido y a la espera de su revisión por un hablante nativo antes de que el primer cliente lo active.',
        points: [
          'Sus propias direcciones, para que las páginas en español puedan posicionarse en español',
          'Un toque entre EN y ES, y la elección se recuerda',
          'El asistente de voz y las plantillas de contrato tienen versión en español, y se implementan con él',
          'Indicar quién de su personal habla español ya está en uso, para que pueda armar una ruta a propósito',
          'Cada línea revisada por un hablante nativo antes de salir al aire',
        ],
        mock: {
          title: 'La misma página, dos veces',
          rows: [
            { label: 'suempresa.com/termite-treatment', value: 'Inglés', badge: 'EN' },
            { label: 'suempresa.com/es/termite-treatment', value: 'Español', badge: 'ES' },
          ],
          footer: 'A los buscadores se les indica que las dos son la misma página en idiomas distintos.',
        },
      },
    ],
  },

  caseStudy: {
    eyebrow: 'La primera construcción',
    title: 'Véalo en un sitio real de control de plagas',
    body:
      'Esto lo construimos con One Source Total Pest Control en Jacksonville. Su oficina usa el área de administración todos los días (personal, licencias, capacitación, contratación, incorporación y el correo diario) y el sitio tiene el analizador de fotos, el asistente de voz y una sola entrada de clientes potenciales. Las partes más nuevas (el archivo de contratos, el panel de interruptores y el sitio en español) están construidas y se les están implementando ahora. El caso de estudio recorre qué había antes y qué lo reemplazó.',
    link: 'Lea el caso de estudio de One Source',
  },

  faqTitle: 'Preguntas que hacen los dueños de empresas de control de plagas',
  faq: [
    {
      id: 'ownership',
      question: '¿Quién es dueño del sitio web y de los datos?',
      answer:
        'Usted. Sus registros de clientes y contratos, su dominio, su marca, fotos y contenido, y su cuenta de pagos son suyos, y puede exportar sus datos cuando quiera. El software de la plataforma se le licencia a través del plan mensual de mantenimiento, que es lo que lo mantiene alojado, actualizado y con soporte. Si algún día se va, se lleva sus datos, su dominio, su contenido y su cuenta de pagos. Si prefiere manejar la plataforma usted mismo, existe la opción de comprar la licencia del software.',
      more: { label: 'Más sobre la propiedad', path: '/faq#ownership' },
    },
    {
      id: 'switches',
      question: '¿Cómo funcionan los interruptores de funciones?',
      answer:
        'Cada parte del sistema es una fila en un solo registro que es dueño de las páginas, los menús y los endpoints que controla, así que desactivarla se lleva todos consigo y no puede dejar una página accesible que alguien olvidó proteger. Solo el dueño puede mover un interruptor. Los que están dentro de la administración se aplican de inmediato; los que cambian el sitio público lo reconstruyen en alrededor de un minuto. En ningún caso se borra nada, y una función que depende de otra no se puede activar hasta que su función principal lo esté. Para ser claros sobre en qué punto está: el panel está construido y probado con registros de muestra, y el primer cliente está pasando a usarlo. Todavía nadie maneja su negocio con él.',
    },
    {
      id: 'start-small',
      question: '¿Puedo empezar con Básico y agregar el resto después?',
      answer:
        'Sí, para eso está construido así. Pasar de Básico a Pro, o de Pro a Avanzado, activa la siguiente capa en el mismo sitio, con las mismas direcciones y el mismo contenido. No hay reconstrucción ni un segundo lanzamiento.',
    },
    {
      id: 'esign-status',
      question: '¿La firma electrónica ya está en uso?',
      answer:
        'Todavía no con un cliente. Está construida, probada y desactivada de forma predeterminada, y al activarla aparece una lista de la configuración que tiene que estar lista primero: las plantillas de firma en cada idioma, la clave de API guardada en la cuenta de automatización y no en el sitio web, y la automatización de envío activada con sus respuestas apuntando a su sitio. Le diremos claramente cuándo el primer cliente haya firmado con ella.',
    },
    {
      id: 'spanish',
      question: '¿Necesito el sitio en español?',
      answer:
        'Depende de su zona y de sus equipos. Donde vale la pena, vale el doble: los clientes hispanohablantes pueden leer y compartir su sitio, y las páginas pueden posicionarse en español en lugar de competir con las de inglés. El asistente de voz y las plantillas de contrato tienen versión en español. En qué punto está hoy: el sitio en español y la mitad en español del asistente de voz están escritos y construidos, a la espera de su revisión por un hablante nativo, y ningún cliente los ha activado todavía. Cada línea se revisa antes de salir al aire.',
    },
    {
      id: 'audit',
      question: '¿Qué pasa en la auditoría gratuita?',
      answer:
        'Una llamada de 30 minutos y luego una revisión corta de cómo funciona el negocio hoy: por dónde entran los clientes potenciales y qué pasa con ellos, para qué se posiciona y para qué no su sitio actual, qué está llevando la oficina a mano y cuál de los paquetes le sirve de verdad. Después de eso recibe un presupuesto por escrito. No cotizamos a ciegas, y la llamada no cuesta nada.',
    },
    {
      id: 'process',
      question: '¿Cómo es todo el proceso?',
      answer:
        'Llamada introductoria, luego la auditoría, luego una sesión de requisitos donde dejamos por escrito exactamente lo que necesita, y después un presupuesto por escrito con plazos. Luego la construcción, entregada por etapas para que la vea avanzar, y después el plan mensual de mantenimiento: alojamiento, actualizaciones, respaldos, monitoreo, soporte y cambios pequeños sobre la marcha.',
    },
    {
      id: 'crm',
      question: '¿Tengo que cambiar de CRM?',
      answer:
        'No. El sitio nunca reemplaza su software de servicio de campo: la programación, las rutas, la app del técnico y la facturación se quedan donde están. Lo que agregamos es la entrada de clientes potenciales por delante y el lado de licencias, contratación y contratos que ese software no cubre, y conectamos los dos para que los clientes potenciales lleguen a su CRM en un solo formato.',
    },
  ],

  closing: {
    title: 'Empiece con la auditoría',
    body:
      'Treinta minutos por teléfono, una revisión de lo que tiene y un presupuesto por escrito para el paquete que le sirve. Sin precios antes de eso, porque estaríamos adivinando.',
  },
};

export default { en, es };
