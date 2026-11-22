// /dm-rescue and /es/dm-rescue: the DM Rescue offer. Plain TypeScript with no
// React, so the FAQ and its JSON-LD can also be written into the pre-rendered
// HTML (src/i18n/prerender.ts) — the same split src/i18n/missedCallRescue.ts
// uses.
//
// Every price comes from src/config/offers.ts; nothing here types a figure of
// its own, so changing a price changes both languages, the homepage card and
// the Offer JSON-LD at once. `included.items` is a Record over the inclusion
// keys, so an inclusion added to the config fails the build until both
// languages describe it.
//
// Honesty rules, the same ones /missed-call-rescue is held to: no results, no
// testimonials, no invented statistics. The proof here is better than a number
// anyway — the demo on the account is real, so the page sends people to try it
// rather than claiming anything about it.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). The product name
// "DM Rescue" is translated here ("Rescate de Mensajes") because that is the
// name the offer was given in Spanish; "Missed-Call Rescue" stays in English
// because that is the name that offer was given.

import { DM_RESCUE as OFFER, offerMoney } from '../config/offers.ts';
import type { DmInclusionKey } from '../config/offers.ts';
import { DEMO_KEYWORD, INSTAGRAM_HANDLE } from '../config/social.ts';
import type { FaqItem } from './faq.ts';

export { DM_RESCUE_PATH } from '../config/offers.ts';

/** utm_campaign on every booking link from this page (src/config/booking.ts). */
export const DM_RESCUE_CAMPAIGN = 'dm-rescue';

/**
 * utm_medium on those links. "offer" rather than the page's own path, so a
 * booking made from this offer reports the same medium wherever the link was
 * clicked; the placement still rides along as utm_content.
 */
export const DM_RESCUE_MEDIUM = 'offer';

/** utm_source on them. "site" rather than the site-wide default "website". */
export const DM_RESCUE_SOURCE = 'site';

const setupEn = offerMoney(OFFER.setupPrice, 'en');
const monthlyEn = offerMoney(OFFER.monthlyPrice, 'en');
const setupEs = offerMoney(OFFER.setupPrice, 'es');
const monthlyEs = offerMoney(OFFER.monthlyPrice, 'es');

interface Included {
  title: string;
  body: string;
}

const en = {
  eyebrow: 'New offer',
  name: 'DM Rescue',
  tagline: "Every Instagram and Facebook message gets an answer in seconds, even when you're on a job.",
  title: 'Stop losing customers in your DMs.',
  intro: 'People message your Instagram and Facebook Page asking for prices, menus and quotes. If nobody answers fast, they message the next business. DM Rescue answers instantly, sends your menu, quote form or booking link, and texts you so you can take it from there.',

  ctaDemo: `Try it now: DM us ${DEMO_KEYWORD}`,
  ctaBook: 'Book a 30-minute intro call',
  // The booking page is one free half hour whatever the button says
  // (src/config/booking.ts), so the note under it says so.
  ctaBookNote: 'Free, and we rarely need the whole half hour.',
  newTab: '(opens in a new tab)',

  // The live demo block, directly under the hero. Everything it claims is
  // something the visitor is about to check for themselves.
  demo: {
    title: "Don't take our word for it. Try it.",
    body: `Open Instagram, send the word ${DEMO_KEYWORD} to ${INSTAGRAM_HANDLE}, and watch the reply land in seconds. That reply is this system.`,
    button: 'Open Instagram DM',
    // The phone-style mock beside it. These are the two bubbles, drawn in
    // HTML rather than shipped as a picture, so they stay sharp, translate,
    // and read out to a screen reader in order.
    mock: {
      /** Named for assistive technology: the mock is a picture of a conversation. */
      label: `A phone showing the demo conversation: we send ${DEMO_KEYWORD} and the automatic reply comes straight back`,
      header: INSTAGRAM_HANDLE,
      customer: DEMO_KEYWORD,
      business: '👋 This is the demo! This reply went out automatically, a few seconds after you messaged…',
      links: ['▶ See the full ordering system', '📅 Grab a quick call'],
      /** Said under the bubbles, where a chat app puts its timestamp. */
      timestamp: 'Delivered just now',
    },
  },

  problem: {
    title: 'What this fixes',
    cards: [
      'Messages at 9pm sit unanswered until morning',
      '"How much?" comments get buried',
      "You find out about the lead after they've booked someone else.",
    ],
  },

  included: {
    title: 'What you get',
    intro: `Everything below is part of the ${monthlyEn} a month. No per-message charge, and no setup fee beyond the ${setupEn}.`,
    items: {
      autoReply: {
        title: 'An instant auto-reply to every new message',
        body: 'Every new Instagram DM and Facebook Page message gets an answer in seconds, written in your voice rather than a stock greeting.',
      },
      keywords: {
        title: 'Keyword replies that send the right link',
        body: 'MENU, PRICE, QUOTE and BOOK each send back the link that answers them, automatically, without you reaching for your phone.',
      },
      commentToDm: {
        title: 'Comment-to-DM on your posts and Reels',
        body: 'Someone comments a keyword on your post or Reel and gets your link in their DMs, plus a public "Just sent it to your DMs!" reply under the comment.',
      },
      textAlert: {
        title: 'A text alert to your phone',
        body: 'Every new conversation sends you a text, so a lead is on your phone whether or not you have Instagram open.',
      },
      oncePerConversation: {
        title: 'Welcome replies go out once per new conversation',
        body: 'Regulars who message you every week never get a robot greeting: the welcome fires on a new conversation, not on every message.',
      },
      existingAccounts: {
        title: 'Runs on your existing business accounts',
        body: 'Your own Instagram and Facebook Page, the ones your customers already follow. No new app for them to download, and no second inbox for you.',
      },
    } as Record<DmInclusionKey, Included>,
  },

  how: {
    title: 'How it works',
    steps: [
      { title: 'We connect your Instagram and Facebook Page', body: 'You approve the connection from your own accounts; nothing changes for the people who already follow you.' },
      { title: 'We write the replies with you and set your keywords', body: 'Your words, your links: the menu, the quote form, the booking page, and which keyword sends which.' },
      { title: 'You get a text the moment someone reaches out', body: 'The reply has already gone out by then. You pick the conversation up whenever you are free.' },
    ],
  },

  who: {
    title: "Who it's for",
    body: 'Meal-prep and home kitchens taking orders by DM, lawn care, pest control, cleaning, salons and barbers, and contractors.',
  },

  pricing: {
    title: 'Pricing',
    setup: `${setupEn} one-time setup`,
    monthly: `${monthlyEn}/month`,
    term: 'Month to month. Cancel anytime.',
    live: `Usually live within ${OFFER.liveInBusinessDays} business days`,
  },

  faqTitle: 'Frequently asked questions',
  faq: [
    {
      id: 'cold-messages',
      question: 'Will it message people cold?',
      answer: 'No. Instagram and Facebook only allow replies to people who message or comment first. That is exactly what this handles.',
    },
    {
      id: 'reply-myself',
      question: 'Can I still reply myself?',
      answer: 'Yes. The auto-reply covers the first few seconds; the conversation is yours.',
    },
    {
      id: 'what-i-need',
      question: 'What do I need?',
      answer: 'An Instagram Business or Creator account connected to a Facebook Page. We help set that up.',
    },
    {
      id: 'setup-time',
      question: 'How long does setup take?',
      answer: `Usually live within ${OFFER.liveInBusinessDays} business days.`,
    },
    {
      id: 'contract',
      question: 'Is there a contract?',
      answer: 'Month to month. Cancel anytime.',
    },
  ] as FaqItem[],

  closing: {
    title: 'The fastest way to judge this is to try it',
    body: `Send ${DEMO_KEYWORD} to ${INSTAGRAM_HANDLE} and see what your own customers would get. Then book a call if you want it on your accounts.`,
  },

  breadcrumbs: {
    label: 'Breadcrumb',
    home: 'Home',
    here: 'DM Rescue',
  },

  // Structured data only; never shown on the page.
  schema: {
    name: 'DM Rescue',
    serviceType: 'Automated Instagram and Facebook Page message replies',
    audience: 'Local service businesses',
    setupOffer: `${setupEn} one-time setup`,
    monthlyOffer: `${monthlyEn} a month, month to month`,
  },
};

const es: typeof en = {
  eyebrow: 'Oferta nueva',
  name: 'Rescate de Mensajes',
  tagline: 'Cada mensaje de Instagram y Facebook recibe respuesta en segundos, incluso cuando usted está en un trabajo.',
  title: 'Deje de perder clientes en sus mensajes.',
  intro: 'La gente le escribe por Instagram y por su página de Facebook preguntando precios, menús y cotizaciones. Si nadie contesta rápido, le escriben al siguiente negocio. Rescate de Mensajes contesta al instante, envía su menú, su formulario de cotización o su enlace para agendar, y le manda un mensaje de texto a usted para que siga la conversación desde ahí.',

  ctaDemo: `Pruébelo ahora: escríbanos ${DEMO_KEYWORD}`,
  ctaBook: 'Agende una llamada de 30 minutos',
  // The "(Página en inglés.)" stays: the cal.com booking page has no Spanish.
  ctaBookNote: 'Gratis, y casi nunca usamos la media hora completa. (Página en inglés.)',
  newTab: '(se abre en una pestaña nueva)',

  demo: {
    title: 'No nos crea a nosotros. Pruébelo.',
    body: `Abra Instagram, envíe la palabra ${DEMO_KEYWORD} a ${INSTAGRAM_HANDLE} y vea llegar la respuesta en segundos. Esa respuesta es este sistema.`,
    button: 'Abrir el mensaje de Instagram',
    mock: {
      label: `Un celular que muestra la conversación de prueba: enviamos ${DEMO_KEYWORD} y la respuesta automática llega de inmediato`,
      header: INSTAGRAM_HANDLE,
      customer: DEMO_KEYWORD,
      business: '👋 ¡Esta es la demostración! Esta respuesta salió automáticamente, unos segundos después de que usted escribió…',
      links: ['▶ Vea el sistema de pedidos completo', '📅 Agende una llamada rápida'],
      timestamp: 'Entregado ahora mismo',
    },
  },

  problem: {
    title: 'Qué resuelve',
    cards: [
      'Los mensajes de las 9 de la noche se quedan sin contestar hasta la mañana',
      'Los comentarios de "¿cuánto cuesta?" quedan enterrados',
      'Usted se entera del cliente potencial cuando ya contrató a otro.',
    ],
  },

  included: {
    title: 'Qué incluye',
    intro: `Todo lo de abajo va incluido en los ${monthlyEs} al mes. Sin cargo por mensaje y sin ningún costo de instalación además de los ${setupEs}.`,
    items: {
      autoReply: {
        title: 'Una respuesta automática inmediata a cada mensaje nuevo',
        body: 'Cada mensaje nuevo de Instagram y de su página de Facebook recibe respuesta en segundos, escrita con sus palabras y no con un saludo genérico.',
      },
      keywords: {
        title: 'Respuestas por palabra clave que envían el enlace correcto',
        body: 'MENU, PRICE, QUOTE y BOOK devuelven cada una el enlace que responde la pregunta, de forma automática, sin que usted tenga que tomar el celular.',
      },
      commentToDm: {
        title: 'Del comentario al mensaje privado, en sus publicaciones y Reels',
        body: 'Alguien comenta una palabra clave en su publicación o Reel y recibe su enlace por mensaje privado, además de una respuesta pública debajo del comentario: "¡Ya se lo envié por mensaje!".',
      },
      textAlert: {
        title: 'Una alerta por mensaje de texto a su celular',
        body: 'Cada conversación nueva le manda un mensaje de texto, así el cliente potencial está en su celular tenga o no abierto Instagram.',
      },
      oncePerConversation: {
        title: 'El saludo automático sale una sola vez por conversación nueva',
        body: 'Los clientes de siempre que le escriben cada semana nunca reciben un mensaje de robot: el saludo sale con una conversación nueva, no con cada mensaje.',
      },
      existingAccounts: {
        title: 'Funciona con las cuentas de negocio que ya tiene',
        body: 'Su propio Instagram y su página de Facebook, los que sus clientes ya siguen. Ellos no descargan ninguna aplicación nueva y usted no tiene una segunda bandeja de entrada.',
      },
    },
  },

  how: {
    title: 'Cómo funciona',
    steps: [
      { title: 'Conectamos su Instagram y su página de Facebook', body: 'Usted aprueba la conexión desde sus propias cuentas; nada cambia para las personas que ya lo siguen.' },
      { title: 'Escribimos las respuestas con usted y definimos sus palabras clave', body: 'Sus palabras y sus enlaces: el menú, el formulario de cotización, la página para agendar, y cuál palabra clave envía cuál.' },
      { title: 'Usted recibe un mensaje de texto apenas alguien escribe', body: 'Para entonces la respuesta ya salió. Usted retoma la conversación cuando pueda.' },
    ],
  },

  who: {
    title: 'Para quién es',
    body: 'Cocinas de comidas preparadas y cocinas caseras que toman pedidos por mensaje, jardinería, control de plagas, limpieza, salones y barberías, y contratistas.',
  },

  pricing: {
    title: 'Precios',
    setup: `${setupEs} de instalación por única vez`,
    monthly: `${monthlyEs} al mes`,
    term: 'Mes a mes. Cancele cuando quiera.',
    live: `Normalmente funcionando en ${OFFER.liveInBusinessDays} días hábiles`,
  },

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      id: 'cold-messages',
      question: '¿Les va a escribir a personas que no lo contactaron?',
      answer: 'No. Instagram y Facebook solo permiten responderle a quien escribe o comenta primero. Eso es exactamente lo que esto atiende.',
    },
    {
      id: 'reply-myself',
      question: '¿Puedo contestar yo igual?',
      answer: 'Sí. La respuesta automática cubre los primeros segundos; la conversación es suya.',
    },
    {
      id: 'what-i-need',
      question: '¿Qué necesito?',
      answer: 'Una cuenta de Instagram de empresa o de creador conectada a una página de Facebook. Nosotros le ayudamos a dejarla lista.',
    },
    {
      id: 'setup-time',
      question: '¿Cuánto tarda la instalación?',
      answer: `Normalmente queda funcionando en ${OFFER.liveInBusinessDays} días hábiles.`,
    },
    {
      id: 'contract',
      question: '¿Hay contrato?',
      answer: 'Es mes a mes. Cancele cuando quiera.',
    },
  ],

  closing: {
    title: 'La forma más rápida de juzgarlo es probarlo',
    body: `Envíe ${DEMO_KEYWORD} a ${INSTAGRAM_HANDLE} y vea lo que recibirían sus propios clientes. Después agende una llamada si lo quiere en sus cuentas.`,
  },

  breadcrumbs: {
    label: 'Ruta de navegación',
    home: 'Inicio',
    here: 'Rescate de Mensajes',
  },

  schema: {
    name: 'Rescate de Mensajes (DM Rescue)',
    serviceType: 'Respuestas automáticas a mensajes de Instagram y de páginas de Facebook',
    audience: 'Negocios locales de servicios',
    setupOffer: `${setupEs} de instalación por única vez`,
    monthlyOffer: `${monthlyEs} al mes, mes a mes`,
  },
};

export default { en, es };
