// Every narrated clip on the site: the files, the facts about them, and the
// VideoObject that describes them to crawlers. One module, so a page's player
// and its structured data can never disagree about which file plays, how long
// it runs, or what it shows.
//
// Four clips, six rows. The Missed-Call Rescue intro exists in both languages
// (RESCUE_VIDEO below), and so does the meal-prep demo:
// each is narrated in its own language, so they are separate recordings of
// different lengths -- the Spanish one runs 14 seconds longer, because Spanish
// says the same thing in more syllables. Keyed by language below, which is what
// keeps a page's player, its captions track and its VideoObject's duration all
// reading the same row.
//
// The two service-page tours are English only. There is no Spanish recording of
// either, and a page does not get a clip it cannot narrate, so /es/pest-control
// and /es/lawn-care show no video at all (src/components/TourVideo.tsx).

import type { Lang } from '../i18n/lang';
import { BUSINESS_NAME, ORGANIZATION_ID, SITE_URL } from './site';

export type VideoFile = {
  mp4: string;
  poster: string;
  captions: string;
  /** The captions track's own name, in its own language, as the player lists it. */
  captionsLabel: string;
  /**
   * The language the clip is NARRATED in, which is also the captions track's
   * srclang and the schema's inLanguage. It is a property of the recording, not
   * of the page: the tours are English rows that only an English page renders.
   */
  lang: Lang;
  width: number;
  height: number;
  seconds: number;
  uploadDate: string;
  /** The VideoObject's name and description, in the clip's own language. */
  name: string;
  description: string;
};

/**
 * The meal-prep demo, served straight from public/videos. The width and height
 * are each mp4's own, given to the element so the 16:9 box has its shape before
 * the poster arrives rather than collapsing and pushing the hero copy around.
 *
 * `seconds` is rounded up from the file's real length, and it is the number in
 * the line under the video as well as in the duration below: "81-second tour"
 * is honest about a clip that runs 80.67s while "80-second" would not be.
 */
export const DEMO_VIDEO: Record<Lang, VideoFile> = {
  en: {
    mp4: '/videos/mealprep-demo-hero.mp4',
    poster: '/videos/mealprep-demo-hero-poster.webp',
    captions: '/videos/mealprep-demo-hero.en.vtt',
    captionsLabel: 'English',
    lang: 'en',
    width: 1280,
    height: 720,
    seconds: 81, // 80.67s in the file
    uploadDate: '2026-11-19',
    name: `Meal-prep online ordering demo — ${BUSINESS_NAME}`,
    description: "An 81-second walkthrough of online ordering for a meal prep business. The customer side: this week's menu with a live countdown to the order cutoff, macros and portion sizes on every meal, a cart with a free-delivery bar, weekly plans customers can skip or pause themselves, and delivery, pickup, coupons and gift cards at checkout. The kitchen side: every order in one list, prep and shopping lists built when the cutoff hits, nutrition labels for the week in one click, delivery routes in stop order, and revenue, repeat customers and best sellers.",
  },
  es: {
    mp4: '/videos/mealprep-demo-hero-es.mp4',
    poster: '/videos/mealprep-demo-hero-es-poster.webp',
    captions: '/videos/mealprep-demo-hero-es.es.vtt',
    captionsLabel: 'Español',
    lang: 'es',
    width: 1280,
    height: 720,
    seconds: 95, // 94.83s in the file
    uploadDate: '2026-11-19',
    name: `Demostración de pedidos en línea para comidas preparadas — ${BUSINESS_NAME}`,
    description: 'Un recorrido de 95 segundos por el sistema de pedidos en línea para un negocio de comidas preparadas, con narración en español. Del lado del cliente: el menú de la semana con una cuenta regresiva hasta la hora límite de pedidos, los macros y los tamaños de porción de cada platillo, un carrito con una barra de envío gratis, planes semanales que el cliente mismo salta o pausa, y entrega a domicilio, recogida, cupones y tarjetas de regalo al pagar. Del lado de la cocina: todos los pedidos en una sola lista, las listas de preparación y de compras listas al llegar la hora límite, las etiquetas nutricionales de la semana con un solo clic, las rutas de entrega en orden de parada, y los ingresos, los clientes que repiten y los platillos más vendidos.',
  },
};

/**
 * The two service-page tours: /pest-control and /lawn-care.
 *
 * Both walk a site we actually built and the admin area behind it -- One Source
 * Total Pest Control and By The C of Jax, the same two clients those pages
 * already name. The descriptions below list what the narration lists, in the
 * order it says it, so the structured data claims nothing the clip does not
 * show.
 */
export const TOUR_VIDEO: Record<'pest' | 'lawn', VideoFile> = {
  pest: {
    mp4: '/videos/pest-tour-hero.mp4',
    poster: '/videos/pest-tour-hero-poster.webp',
    captions: '/videos/pest-tour-hero.en.vtt',
    captionsLabel: 'English',
    lang: 'en',
    width: 1280,
    height: 720,
    seconds: 74, // 73.73s in the file
    uploadDate: '2026-11-19',
    name: `Pest control website and admin area tour — ${BUSINESS_NAME}`,
    description: 'A narrated tour of a pest control website and admin area built by CG Strategic Enterprises. The public site: a page for every service written for local search, a pest library answering what customers ask before they call, a Pest Analyzer that takes a photo and gives an instant first guess, Jess the AI voice assistant answering day or night, a ZIP code checker that tells a visitor straight away whether the area is served, and a careers page with an apply flow. Behind the scenes: staff licensing, training and new applicants tracked with a daily digest, and verified training records showing which technicians are ready for their own route. The site shown is One Source Total Pest Control of Jacksonville, Florida.',
  },
  lawn: {
    mp4: '/videos/lawn-tour-hero.mp4',
    poster: '/videos/lawn-tour-hero-poster.webp',
    captions: '/videos/lawn-tour-hero.en.vtt',
    captionsLabel: 'English',
    lang: 'en',
    width: 1280,
    height: 720,
    seconds: 72, // 71.23s in the file
    uploadDate: '2026-11-19',
    name: `Lawn care website and admin area tour — ${BUSINESS_NAME}`,
    description: 'A narrated tour of a lawn care and landscaping website and admin area built by CG Strategic Enterprises. The public site: separate paths for homeowners and commercial properties, a page each for lawn maintenance, weed control and landscape design written for local search, a projects gallery, the service area across Duval, St. Johns, Clay and Nassau counties clearly mapped, a free quote form, William the AI voice assistant, and one tap that switches the whole site to Spanish. Behind the scenes: role-based logins for owners, managers and staff covering hiring and onboarding, and every service and feature switchable from admin settings. The site shown is By The C of Jax.',
  },
};

/**
 * The Missed-Call Rescue intro, in the hero of /missed-call-rescue and
 * /es/missed-call-rescue -- the same placement and the same per-language split
 * as the meal-prep demo. It is not a tour of a client build: it follows one
 * call from the ring on a job to the lead texted to the owner, then the price
 * and the number that reaches Alex. The call, question, text and log screens in
 * it are labelled "Example" on screen, because the business and callers are
 * made up. Visuals made with Runway (three animated stills), narration is
 * Runway text-to-speech; sources in the Runway folder,
 * missed-call-rescue-video-assets.zip.
 *
 * The Spanish recording runs 15 seconds longer, for the same reason the
 * meal-prep one does.
 */
export const RESCUE_VIDEO: Record<Lang, VideoFile> = {
  en: {
    mp4: '/videos/missed-call-rescue-hero.mp4',
    poster: '/videos/missed-call-rescue-hero-poster.webp',
    captions: '/videos/missed-call-rescue-hero.en.vtt',
    captionsLabel: 'English',
    lang: 'en',
    width: 1280,
    height: 720,
    seconds: 72, // 71.16s in the file
    uploadDate: '2026-11-20',
    name: `Missed-Call Rescue: an AI receptionist for missed calls — ${BUSINESS_NAME}`,
    description: 'A 72-second introduction to Missed-Call Rescue, an AI receptionist for local service businesses. When the owner cannot pick up, the AI answers with the business name, in English or Spanish, asks what the caller needs, where they are, how soon and the best number to call back, texts the owner the lead, and logs every call in one place. The business keeps its own number, setup is done with the owner and it is live in 14 days, for $497 to set up and $149 a month, cancel anytime. Ends with the number that reaches Alex, CG Strategic\'s own AI receptionist.',
  },
  es: {
    mp4: '/videos/missed-call-rescue-hero-es.mp4',
    poster: '/videos/missed-call-rescue-hero-es-poster.webp',
    captions: '/videos/missed-call-rescue-hero-es.es.vtt',
    captionsLabel: 'Español',
    lang: 'es',
    width: 1280,
    height: 720,
    seconds: 87, // 86.66s in the file
    uploadDate: '2026-11-20',
    name: `Missed-Call Rescue: recepcionista con IA para llamadas perdidas — ${BUSINESS_NAME}`,
    description: 'Una presentación de 87 segundos de Missed-Call Rescue, una recepcionista con IA para negocios locales de servicios, con narración en español. Cuando el dueño no puede contestar, la IA contesta con el nombre del negocio, en inglés o en español, pregunta qué necesita la persona, dónde está, para cuándo y el mejor número para devolver la llamada, le envía el cliente potencial al dueño por mensaje de texto y registra cada llamada en un solo lugar. El negocio conserva su número, la instalación se hace con el dueño y queda funcionando en 14 días, por $497 de instalación y $149 al mes, con cancelación cuando quiera. Termina con el número donde contesta Alex, la recepcionista con IA de CG Strategic.',
  },
};

/** The id on the Missed-Call Rescue figure, so #rescue-video reaches the player. */
export const RESCUE_VIDEO_ANCHOR = 'rescue-video';

/**
 * The id on the meal-prep figure, so #demo-video reaches the player on either
 * language's page. ScrollToTop.tsx scrolls to it by id after a route change, so
 * it has to be on an element that exists in the pre-rendered markup -- the
 * figure, not the video. The tours anchor their whole section instead
 * (TOUR_ANCHOR in src/components/TourVideo.tsx).
 */
export const DEMO_VIDEO_ANCHOR = 'demo-video';

/** Seconds as a schema.org ISO 8601 duration: 81 -> PT1M21S. */
function isoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}

/**
 * The VideoObject for one clip: each page claims the one clip it plays, and no
 * two pages claim the same file.
 *
 * `publisher` points at the Organization node by @id instead of repeating the
 * company's details. vite.config.ts puts that node in the head of every page,
 * so the reference always resolves.
 *
 * `inLanguage` is the clip's spoken language, taken from the row itself rather
 * than from the page, so a page can never advertise a language it is not
 * playing.
 */
export function videoJsonLd(file: VideoFile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: file.name,
    description: file.description,
    thumbnailUrl: `${SITE_URL}${file.poster}`,
    contentUrl: `${SITE_URL}${file.mp4}`,
    uploadDate: file.uploadDate,
    duration: isoDuration(file.seconds),
    inLanguage: file.lang,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/** The JSON-LD as the text of a script tag, escaped as the other nodes are. */
export function videoJsonLdText(file: VideoFile): string {
  return JSON.stringify(videoJsonLd(file)).replace(/</g, '\\u003c');
}
