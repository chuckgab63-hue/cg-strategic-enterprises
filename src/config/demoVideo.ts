// The meal-prep demo video in the hero of /meal-prep-ordering: the files, the
// facts about them, and the VideoObject that describes them to crawlers. One
// module, so the player and the structured data can never disagree about which
// file plays, how long it runs, or what it shows.
//
// There are two clips, one per language, not one clip with two caption tracks.
// Each is narrated in its own language, so they are separate recordings of
// different lengths -- the Spanish one runs 14 seconds longer, because Spanish
// says the same thing in more syllables. Keyed by language below, which is what
// keeps a page's player, its captions track and its VideoObject's duration all
// reading the same row.

import type { Lang } from '../i18n/lang';
import { BUSINESS_NAME, ORGANIZATION_ID, SITE_URL } from './site';

type DemoVideoFile = {
  mp4: string;
  poster: string;
  captions: string;
  /** The captions track's own name, in its own language, as the player lists it. */
  captionsLabel: string;
  width: number;
  height: number;
  seconds: number;
  uploadDate: string;
};

/**
 * The files, served straight from public/videos. The width and height are each
 * mp4's own, given to the element so the 16:9 box has its shape before the
 * poster arrives rather than collapsing and pushing the hero copy around.
 *
 * `seconds` is rounded up from the file's real length, and it is the number in
 * the line under the video as well as in the duration below: "81-second tour"
 * is honest about a clip that runs 80.67s while "80-second" would not be.
 */
export const DEMO_VIDEO: Record<Lang, DemoVideoFile> = {
  en: {
    mp4: '/videos/mealprep-demo-hero.mp4',
    poster: '/videos/mealprep-demo-hero-poster.webp',
    captions: '/videos/mealprep-demo-hero.en.vtt',
    captionsLabel: 'English',
    width: 1280,
    height: 720,
    seconds: 81, // 80.67s in the file
    uploadDate: '2026-11-19',
  },
  es: {
    mp4: '/videos/mealprep-demo-hero-es.mp4',
    poster: '/videos/mealprep-demo-hero-es-poster.webp',
    captions: '/videos/mealprep-demo-hero-es.es.vtt',
    captionsLabel: 'Español',
    width: 1280,
    height: 720,
    seconds: 95, // 94.83s in the file
    uploadDate: '2026-11-19',
  },
};

/**
 * The id on the figure, so #demo-video reaches the player on either page.
 * ScrollToTop.tsx scrolls to it by id after a route change, so it has to be on
 * an element that exists in the pre-rendered markup — the figure, not the video.
 */
export const DEMO_VIDEO_ANCHOR = 'demo-video';

/** Seconds as a schema.org ISO 8601 duration: 81 -> PT1M21S. */
function isoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}

const VIDEO_NAME: Record<Lang, string> = {
  en: `Meal-prep online ordering demo — ${BUSINESS_NAME}`,
  es: `Demostración de pedidos en línea para comidas preparadas — ${BUSINESS_NAME}`,
};

// What the clip shows, in the order it shows it: the customer side, then the
// kitchen side. The Spanish one is not a translation of the English one; both
// describe their own recording, in the words that recording's narration uses.
const VIDEO_DESCRIPTION: Record<Lang, string> = {
  en: "An 81-second walkthrough of online ordering for a meal prep business. The customer side: this week's menu with a live countdown to the order cutoff, macros and portion sizes on every meal, a cart with a free-delivery bar, weekly plans customers can skip or pause themselves, and delivery, pickup, coupons and gift cards at checkout. The kitchen side: every order in one list, prep and shopping lists built when the cutoff hits, nutrition labels for the week in one click, delivery routes in stop order, and revenue, repeat customers and best sellers.",
  es: 'Un recorrido de 95 segundos por el sistema de pedidos en línea para un negocio de comidas preparadas, con narración en español. Del lado del cliente: el menú de la semana con una cuenta regresiva hasta la hora límite de pedidos, los macros y los tamaños de porción de cada platillo, un carrito con una barra de envío gratis, planes semanales que el cliente mismo salta o pausa, y entrega a domicilio, recogida, cupones y tarjetas de regalo al pagar. Del lado de la cocina: todos los pedidos en una sola lista, las listas de preparación y de compras listas al llegar la hora límite, las etiquetas nutricionales de la semana con un solo clic, las rutas de entrega en orden de parada, y los ingresos, los clientes que repiten y los platillos más vendidos.',
};

/**
 * The VideoObject for one meal-prep page: each page claims the one clip it
 * plays, and nothing else on the site mentions either file.
 *
 * `publisher` points at the Organization node by @id instead of repeating the
 * company's details. vite.config.ts puts that node in the head of every page,
 * both of these included, so the reference always resolves.
 *
 * `inLanguage` is the clip's spoken language, which is the page's: each page
 * plays its own recording, so the two never disagree.
 */
export function demoVideoJsonLd(lang: Lang) {
  const file = DEMO_VIDEO[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: VIDEO_NAME[lang],
    description: VIDEO_DESCRIPTION[lang],
    thumbnailUrl: `${SITE_URL}${file.poster}`,
    contentUrl: `${SITE_URL}${file.mp4}`,
    uploadDate: file.uploadDate,
    duration: isoDuration(file.seconds),
    inLanguage: lang,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/** The JSON-LD as the text of a script tag, escaped as the other nodes are. */
export function demoVideoJsonLdText(lang: Lang): string {
  return JSON.stringify(demoVideoJsonLd(lang)).replace(/</g, '\\u003c');
}
