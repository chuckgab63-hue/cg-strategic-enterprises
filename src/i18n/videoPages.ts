// The words on the video watch pages and the /videos hub, in both languages.
//
// Plain TypeScript with no React, so the transcripts and the page copy can be
// written into the pre-rendered HTML (src/i18n/prerender.ts). That matters
// more here than anywhere else on the site: a crawler deciding whether this
// is a real watch page reads the transcript, and it will not run JavaScript
// to find it.
//
// `pages` is keyed by the slugs in src/config/watchPages.ts. Every slug needs
// English; only the two with Spanish recordings need Spanish, and the type
// below says so.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { TRANSCRIPTS } from './videoTranscripts.ts';

interface WatchCopy {
  /** The h1. The <title> is src/i18n/meta.ts, kept short for a search result. */
  heading: string;
  /** Two or three sentences under the player, before the transcript. */
  intro: string;
  /** The label on the link to the offer this clip sells. */
  cta: string;
  /** The spoken or on-screen words, one paragraph per line. */
  transcript: readonly string[];
}

/** Slugs with a Spanish recording, and so a Spanish page. */
type BilingualSlug = 'missed-call-rescue-demo' | 'meal-prep-ordering-tour';
/** Slugs that are English recordings only. */
type EnglishOnlySlug =
  | 'dm-rescue-demo'
  | 'lawn-care-site-tour'
  | 'pest-control-site-tour'
  | 'never-miss-a-customer';

const en = {
  hub: {
    eyebrow: 'Demo videos',
    heading: 'Watch what we build',
    intro: 'Every demo and tour in one place: an AI receptionist taking a call, instant replies to Instagram and Facebook messages, and full walkthroughs of the websites and admin areas behind two live local businesses.',
    /** Shown under each card. `%s` is the length in seconds. */
    length: (seconds: number) => `${seconds} seconds`,
    watch: 'Watch',
    /** On the Spanish hub only; never shown in English. */
    englishOnly: '',
  },
  /** The line under the player, before the transcript section. */
  transcriptHeading: 'Transcript',
  captionsNote: 'Captions are available in the player.',
  /** The reels have no captions track, so the transcript is the only text. */
  noCaptionsNote: 'This video has on-screen text rather than narration; the words are below.',
  bookCta: 'Book a 30-minute intro call',
  bookNote: 'Free, and we rarely need the whole half hour.',
  backToHub: 'All demo videos',
  /** The one link added to each service page. The length comes from the file. */
  watchDemo: (seconds: number) => `Watch the ${seconds}-second demo`,
  watchVideo: (seconds: number) => `Watch the ${seconds}-second video`,

  pages: {
    'missed-call-rescue-demo': {
      heading: 'Missed-Call Rescue: an AI receptionist answering a missed call',
      intro: 'Watch one missed call from the ring to the lead in your texts. The AI receptionist answers with your business name in English or Spanish, asks what the caller needs and when, then texts you the details while you are still on the job.',
      cta: 'See the Missed-Call Rescue offer',
      transcript: TRANSCRIPTS.missedCallRescueEn,
    },
    'dm-rescue-demo': {
      heading: 'DM Rescue: an instant reply to every Instagram and Facebook message',
      intro: 'Someone messages a business at 9:14 at night. Nobody answers, so they message the next business instead. This is what happens with DM Rescue switched on, and what the owner gets on their phone.',
      cta: 'See the DM Rescue offer',
      transcript: [
        '9:14 PM. Still cooking.',
        "Nobody's answering. They DM the next business.",
        'With DM Rescue...',
        '...they get an answer in seconds.',
        'And you get a text, the moment they reach out.',
        'DM Rescue. Instant replies to every Instagram & Facebook message. Text alerts to you. $397 setup + $129/mo. Pair it with Missed-Call Rescue: $697 + $199/mo. DM us DEMO, @cgstrategic.dev',
      ],
    },
    'meal-prep-ordering-tour': {
      heading: 'Online ordering for meal prep: the full customer and kitchen tour',
      intro: 'A walkthrough of a meal prep ordering system from both sides. The customer side: the weekly menu, macros, the cart, weekly plans and checkout. The kitchen side: every order in one list, prep and shopping lists, printable labels, delivery routes and the numbers for the week.',
      cta: 'See what meal prep ordering includes',
      transcript: TRANSCRIPTS.mealPrepEn,
    },
    'lawn-care-site-tour': {
      heading: 'A lawn care and landscaping website and admin area, toured end to end',
      intro: 'A narrated tour of a lawn care site we built and the office system behind it. Separate paths for homeowners and commercial properties, quote forms that ask the right questions, an AI assistant, a one-tap switch to Spanish, and role-based logins for hiring and onboarding.',
      cta: 'See the lawn care packages',
      transcript: TRANSCRIPTS.lawnEn,
    },
    'pest-control-site-tour': {
      heading: 'A pest control website and admin area, toured end to end',
      intro: 'A narrated tour of a pest control site we built and the office system behind it. A page per service, a photo pest analyzer, an AI voice assistant answering after hours, a ZIP code checker, and licensing and training tracked for every technician.',
      cta: 'See the pest control packages',
      transcript: TRANSCRIPTS.pestEn,
    },
    'never-miss-a-customer': {
      heading: 'Never miss a customer, even on your day off',
      intro: 'The owner is forty feet underwater. Back on the boat the phone is ringing and the messages are stacking up. This is Missed-Call Rescue and DM Rescue running together: the call answered, the DMs replied to, and a text so you can stay where you are.',
      cta: 'See the Rescue Bundle',
      transcript: [
        "You're 40 ft down.",
        'Not thinking about work.',
        'Meanwhile, on the boat...',
        "Who's answering?",
        'The call? Answered.',
        'The DMs? Replied in seconds.',
        'And you get a text, so you can relax.',
        'Never miss a customer. Even on your day off. Missed-Call Rescue + DM Rescue. $697 setup + $199/mo. DM us DEMO, @cgstrategic.dev',
      ],
    },
  } as Record<BilingualSlug | EnglishOnlySlug, WatchCopy>,
};

const es: {
  hub: typeof en.hub;
  transcriptHeading: string;
  captionsNote: string;
  noCaptionsNote: string;
  bookCta: string;
  bookNote: string;
  backToHub: string;
  watchDemo: (seconds: number) => string;
  watchVideo: (seconds: number) => string;
  /** Spanish copy exists only for the slugs with a Spanish recording. */
  pages: Record<BilingualSlug, WatchCopy>;
} = {
  hub: {
    eyebrow: 'Videos de demostración',
    heading: 'Vea lo que construimos',
    intro: 'Todas las demostraciones y recorridos en un solo lugar: una recepcionista con IA contestando una llamada, respuestas al instante a los mensajes de Instagram y Facebook, y recorridos completos por los sitios web y las áreas de administración de dos negocios locales reales.',
    length: (seconds: number) => `${seconds} segundos`,
    watch: 'Ver',
    /** The four English-only recordings are labelled on the Spanish hub. */
    englishOnly: '(video en inglés)',
  },
  transcriptHeading: 'Transcripción',
  captionsNote: 'Los subtítulos están disponibles en el reproductor.',
  noCaptionsNote: 'Este video lleva texto en pantalla en lugar de narración; las palabras están abajo.',
  // The "(Página en inglés.)" stays: the cal.com booking page has no Spanish.
  bookCta: 'Agende una llamada de 30 minutos',
  bookNote: 'Gratis, y casi nunca usamos la media hora completa. (Página en inglés.)',
  backToHub: 'Todos los videos',
  watchDemo: (seconds: number) => `Ver la demo de ${seconds} segundos`,
  watchVideo: (seconds: number) => `Ver el video de ${seconds} segundos`,

  pages: {
    'missed-call-rescue-demo': {
      heading: 'Missed-Call Rescue: una recepcionista con IA contestando una llamada perdida',
      intro: 'Vea una llamada perdida desde que suena hasta que el cliente potencial llega a sus mensajes. La recepcionista con IA contesta con el nombre de su negocio, en inglés o en español, pregunta qué necesita la persona y para cuándo, y le envía los datos por mensaje de texto mientras usted sigue en el trabajo.',
      cta: 'Ver la oferta de Missed-Call Rescue',
      transcript: TRANSCRIPTS.missedCallRescueEs,
    },
    'meal-prep-ordering-tour': {
      heading: 'Pedidos en línea para comidas preparadas: el recorrido completo',
      intro: 'Un recorrido por el sistema de pedidos para comidas preparadas desde los dos lados. Del lado del cliente: el menú de la semana, los macros, el carrito, los planes semanales y el pago. Del lado de la cocina: todos los pedidos en una lista, las listas de preparación y compras, las etiquetas, las rutas de entrega y los números de la semana.',
      cta: 'Ver qué incluye el sistema de pedidos',
      transcript: TRANSCRIPTS.mealPrepEs,
    },
  },
};

export default { en, es };
