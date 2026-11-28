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
// SELF-SERVE. DM Rescue is now a product someone buys and sets up themselves:
// the page leads with the free trial and sends people to the app, and the
// done-for-you install we used to lead with is the upsell at the bottom. The
// two ways of buying it deliver the same six inclusions, which is why there is
// still one list.
//
// Honesty rules, the same ones /missed-call-rescue is held to: no results, no
// testimonials, no invented statistics. Two specific ones for the trial, which
// is the easiest thing on this page to oversell:
//   - A card IS taken at signup (Stripe Checkout, payment_method_collection
//     'always'). The page never says "no credit card required", because that
//     would be false. It says when the charge happens instead.
//   - "Plans from" is the app's own wording. The app reads its price from
//     Stripe and prints no figure of its own, so this site is the only place
//     the number appears — see DM_RESCUE.fromMonthlyPrice.
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

const fromMonthlyEn = offerMoney(OFFER.fromMonthlyPrice, 'en');
const setupEn = offerMoney(OFFER.doneForYouSetupPrice, 'en');
const dfyMonthlyEn = offerMoney(OFFER.doneForYouMonthlyPrice, 'en');
const fromMonthlyEs = offerMoney(OFFER.fromMonthlyPrice, 'es');
const setupEs = offerMoney(OFFER.doneForYouSetupPrice, 'es');
const dfyMonthlyEs = offerMoney(OFFER.doneForYouMonthlyPrice, 'es');

interface Included {
  title: string;
  body: string;
}

const en = {
  eyebrow: 'Self-serve',
  name: 'DM Rescue',
  tagline: "Every Instagram and Facebook message gets an answer in seconds, even when you're on a job.",
  title: 'Stop losing customers in your DMs.',
  intro: `People message your Instagram and Facebook Page asking for prices, menus and quotes. If nobody answers fast, they message the next business. DM Rescue answers instantly, sends your menu, quote form or booking link, and texts you so you can take it from there. You can switch it on yourself in a few minutes, and the first ${OFFER.trialDays} days are free.`,

  /** The primary button everywhere on the page: straight into the app. */
  ctaTrial: `Start your ${OFFER.trialDays}-day free trial`,
  /**
   * Said under the trial button. A card IS required — Stripe Checkout collects
   * one before the trial starts — so this says when the charge lands rather
   * than claiming there is no card.
   */
  ctaTrialNote: `Your card is not charged until day ${OFFER.trialDays + 1}. Cancel before then and you pay nothing.`,
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

  /**
   * The featured video slot. Only used when a video is configured
   * (DM_RESCUE_FEATURED_VIDEO in src/config/videos.ts); the section does not
   * render at all otherwise, so the page never shows an empty frame.
   */
  featuredVideo: {
    title: 'See it in 25 seconds',
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
    intro: `Everything below is in every plan — no per-message charge and no setup fee. Plans from ${fromMonthlyEn}/mo, and the first ${OFFER.trialDays} days are free.`,
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
      { title: 'Start your free trial', body: `A minute of details and you are in. Your card is not charged until day ${OFFER.trialDays + 1}.` },
      { title: 'Connect your Instagram', body: 'You approve the connection inside Instagram itself. We never see or store your password.' },
      { title: 'Pick your trade and edit the replies', body: 'Your trade arrives prefilled with a welcome message and keyword replies. Change any word of them — they are your words that go out.' },
      { title: 'Send yourself a test, then go live', body: 'Message your own account, watch the reply land, and switch it on. You get a text the moment a real customer reaches out.' },
    ],
  },

  who: {
    title: "Who it's for",
    body: 'Meal-prep and home kitchens taking orders by DM, lawn care, pest control, cleaning, salons and barbers, and contractors.',
  },

  pricing: {
    title: 'Pricing',
    trial: `${OFFER.trialDays} days free`,
    monthly: `Plans from ${fromMonthlyEn}/mo`,
    term: 'Month to month. Cancel from your own billing page anytime.',
  },

  /** The upsell, under the self-serve prices: the install we used to lead with. */
  doneForYou: {
    eyebrow: 'Rather not do it yourself?',
    title: 'Done-for-you setup',
    body: `We connect the accounts, write the replies with you, set your keywords and tune them as the messages come in. Usually live within ${OFFER.liveInBusinessDays} business days of the kickoff call.`,
    price: `${setupEn} one-time setup, then ${dfyMonthlyEn}/mo`,
    term: 'Month to month. Cancel anytime.',
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
      answer: 'An Instagram Business or Creator account connected to a Facebook Page. Switching from a personal account is free and takes about a minute in the Instagram app, and the setup walks you through it.',
    },
    {
      id: 'card-on-trial',
      question: 'Do I need a card to start the trial?',
      answer: `Yes. You enter one when you sign up, and it is not charged until day ${OFFER.trialDays + 1}. Cancel before then from your own billing page and you are not charged at all.`,
    },
    {
      id: 'after-trial',
      question: `What happens after the ${OFFER.trialDays} days?`,
      answer: `Your plan starts automatically on day ${OFFER.trialDays + 1} and your replies keep running. Plans start at ${fromMonthlyEn} a month.`,
    },
    {
      id: 'setup-time',
      question: 'How long does setup take?',
      answer: 'A few minutes on your own. If you would rather we did it, the done-for-you install is usually live within three business days.',
    },
    {
      id: 'contract',
      question: 'Is there a contract?',
      answer: 'Month to month, either way. Cancel anytime — the self-serve plan from your own billing page.',
    },
  ] as FaqItem[],

  closing: {
    title: 'The fastest way to judge this is to try it',
    body: `Send ${DEMO_KEYWORD} to ${INSTAGRAM_HANDLE} and see what your own customers would get. Then start your free trial and put it on your own accounts.`,
  },

  breadcrumbs: {
    label: 'Breadcrumb',
    home: 'Home',
    here: 'DM Rescue',
  },

  // Structured data only; never shown on the page.
  schema: {
    name: 'DM Rescue',
    category: 'Automated Instagram and Facebook Page message replies',
    audience: 'Local service businesses',
    planOffer: `Plans from ${fromMonthlyEn} a month, with a ${OFFER.trialDays}-day free trial`,
    setupOffer: `${setupEn} one-time done-for-you setup`,
  },
};

const es: typeof en = {
  eyebrow: 'Autoservicio',
  name: 'Rescate de Mensajes',
  tagline: 'Cada mensaje de Instagram y Facebook recibe respuesta en segundos, incluso cuando usted está en un trabajo.',
  title: 'Deje de perder clientes en sus mensajes.',
  intro: `La gente le escribe por Instagram y por su página de Facebook preguntando precios, menús y cotizaciones. Si nadie contesta rápido, le escriben al siguiente negocio. Rescate de Mensajes contesta al instante, envía su menú, su formulario de cotización o su enlace para agendar, y le manda un mensaje de texto a usted para que siga la conversación desde ahí. Usted lo puede activar por su cuenta en unos minutos, y los primeros ${OFFER.trialDays} días son gratis.`,

  ctaTrial: `Empiece su prueba gratis de ${OFFER.trialDays} días`,
  // The "(Página en inglés.)" is the same note the booking link carries, for
  // the same reason: the app has no Spanish yet, so a Spanish page should say
  // where the button lands before someone clicks it.
  ctaTrialNote: `No le cobramos la tarjeta hasta el día ${OFFER.trialDays + 1}. Cancele antes de esa fecha y no paga nada. (Página en inglés.)`,
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

  featuredVideo: {
    title: 'Véalo en 25 segundos',
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
    intro: `Todo lo de abajo va incluido en cualquier plan: sin cargo por mensaje y sin costo de instalación. Planes desde ${fromMonthlyEs} al mes, y los primeros ${OFFER.trialDays} días son gratis.`,
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
      { title: 'Empiece su prueba gratis', body: `Un minuto de datos y ya está dentro. No le cobramos la tarjeta hasta el día ${OFFER.trialDays + 1}.` },
      { title: 'Conecte su Instagram', body: 'Usted aprueba la conexión dentro de Instagram mismo. Nunca vemos ni guardamos su contraseña.' },
      { title: 'Elija su rubro y edite las respuestas', body: 'Su rubro llega con un saludo y respuestas por palabra clave ya escritos. Cambie lo que quiera: las palabras que salen son las suyas.' },
      { title: 'Mándese una prueba y actívelo', body: 'Escríbale a su propia cuenta, vea llegar la respuesta y actívelo. Recibe un mensaje de texto en cuanto le escribe un cliente de verdad.' },
    ],
  },

  who: {
    title: 'Para quién es',
    body: 'Cocinas de comidas preparadas y cocinas caseras que toman pedidos por mensaje, jardinería, control de plagas, limpieza, salones y barberías, y contratistas.',
  },

  pricing: {
    title: 'Precios',
    trial: `${OFFER.trialDays} días gratis`,
    monthly: `Planes desde ${fromMonthlyEs} al mes`,
    term: 'Mes a mes. Cancele cuando quiera desde su propia página de facturación.',
  },

  doneForYou: {
    eyebrow: '¿Prefiere no hacerlo usted mismo?',
    title: 'Instalación hecha por nosotros',
    body: `Conectamos las cuentas, escribimos las respuestas con usted, definimos sus palabras clave y las ajustamos a medida que llegan los mensajes. Normalmente queda funcionando en ${OFFER.liveInBusinessDays} días hábiles después de la llamada inicial.`,
    price: `${setupEs} de instalación por única vez y después ${dfyMonthlyEs} al mes`,
    term: 'Mes a mes. Cancele cuando quiera.',
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
      answer: 'Una cuenta de Instagram de empresa o de creador conectada a una página de Facebook. Cambiar desde una cuenta personal es gratis y toma alrededor de un minuto en la aplicación de Instagram, y la configuración le indica cómo.',
    },
    {
      id: 'card-on-trial',
      question: '¿Necesito una tarjeta para empezar la prueba?',
      answer: `Sí. La ingresa al registrarse y no se le cobra hasta el día ${OFFER.trialDays + 1}. Cancele antes de esa fecha desde su propia página de facturación y no se le cobra nada.`,
    },
    {
      id: 'after-trial',
      question: `¿Qué pasa después de los ${OFFER.trialDays} días?`,
      answer: `Su plan empieza automáticamente el día ${OFFER.trialDays + 1} y sus respuestas siguen funcionando. Los planes empiezan en ${fromMonthlyEs} al mes.`,
    },
    {
      id: 'setup-time',
      question: '¿Cuánto tarda la instalación?',
      answer: 'Unos minutos si lo hace usted. Si prefiere que lo hagamos nosotros, la instalación por nuestra cuenta normalmente queda funcionando en tres días hábiles.',
    },
    {
      id: 'contract',
      question: '¿Hay contrato?',
      answer: 'Es mes a mes en los dos casos. Cancele cuando quiera: el plan de autoservicio, desde su propia página de facturación.',
    },
  ],

  closing: {
    title: 'La forma más rápida de juzgarlo es probarlo',
    body: `Envíe ${DEMO_KEYWORD} a ${INSTAGRAM_HANDLE} y vea lo que recibirían sus propios clientes. Después empiece su prueba gratis y póngalo en sus propias cuentas.`,
  },

  breadcrumbs: {
    label: 'Ruta de navegación',
    home: 'Inicio',
    here: 'Rescate de Mensajes',
  },

  schema: {
    name: 'Rescate de Mensajes (DM Rescue)',
    category: 'Respuestas automáticas a mensajes de Instagram y de páginas de Facebook',
    audience: 'Negocios locales de servicios',
    planOffer: `Planes desde ${fromMonthlyEs} al mes, con ${OFFER.trialDays} días de prueba gratis`,
    setupOffer: `${setupEs} de instalación por única vez hecha por nosotros`,
  },
};

export default { en, es };
