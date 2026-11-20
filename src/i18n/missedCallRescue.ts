// /missed-call-rescue and /es/missed-call-rescue: the Missed-Call Rescue
// starter offer. Plain TypeScript with no React, so the FAQ and its JSON-LD
// can also be written into the pre-rendered HTML (src/i18n/prerender.ts).
//
// Every price, timeline and inclusion comes from src/config/offers.ts; nothing
// here states a figure of its own, so changing the price changes both
// languages, the homepage card and the Offer JSON-LD at once. `included` is a
// Record over the inclusion keys, so an inclusion added to the config fails the
// build until both languages describe it.
//
// Honesty rules for this page: no results, no testimonials, no call volumes and
// no "studies show" figures — the proof is the pest control build we can point
// at. Text-back is the one inclusion with a date we do not control (carrier
// A2P 10DLC registration), so it says so beside the item and again in the FAQ
// rather than in fine print.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). The product name
// "Missed-Call Rescue" stays in English, as it already does on /es/contact and
// the Spanish missed-call calculator.

import { MISSED_CALL_RESCUE as OFFER, offerMoney } from '../config/offers.ts';
import type { InclusionKey } from '../config/offers.ts';
import { PHONE_DISPLAY } from '../config/site.ts';
import type { FaqItem } from './faq.ts';

export { MISSED_CALL_RESCUE_PATH } from '../config/offers.ts';

/** utm_campaign on every booking link from this page (src/config/booking.ts). */
export const MISSED_CALL_RESCUE_CAMPAIGN = 'missedcallrescue';

const setupEn = offerMoney(OFFER.setupPrice, 'en');
const monthlyEn = offerMoney(OFFER.monthlyPrice, 'en');
const setupEs = offerMoney(OFFER.setupPrice, 'es');
const monthlyEs = offerMoney(OFFER.monthlyPrice, 'es');
const [weeksFrom, weeksTo] = OFFER.textBackApprovalWeeks;

interface Included {
  title: string;
  body: string;
}

const en = {
  eyebrow: 'Starter offer',
  title: 'Never lose another job to voicemail',
  intro: `An AI receptionist answers the calls you miss and the ones that come in after hours, 24/7, in English or Spanish. ${setupEn} one-time setup and ${monthlyEn} a month, month to month — and it is live in ${OFFER.liveInDays} days from your kickoff call.`,
  priceBadge: `Starter · ${setupEn} setup`,
  priceSetup: `${setupEn} one-time setup`,
  priceMonthly: `${monthlyEn}/month`,
  priceTerm: 'Month to month. Cancel anytime.',
  priceLive: `Live in ${OFFER.liveInDays} days`,

  // 30 and not 15: the one event type on the calendar is a free half hour, and
  // a button that promises a shorter call than the booking page will offer is
  // the kind of small lie a visitor notices in the first click. If the cal.com
  // event is ever shortened, this is the string to move with it.
  ctaBook: 'Book a 30-minute call',
  ctaBookNote: 'Free, and we rarely need the whole half hour.',
  ctaAlex: 'Hear it answer a call',
  ctaCall: 'Call us',
  tryNote: `Try it now: Alex, our own AI receptionist, answers ${PHONE_DISPLAY}.`,

  who: {
    title: "Who it's for",
    body: 'Pest control, lawn care and landscaping, meal prep, and other local service businesses that miss calls while on a job or after hours — where the caller simply rings the next company on Google.',
  },

  how: {
    title: 'How it works',
    steps: [
      { title: 'Kickoff call', body: 'We go through your services, your hours, what callers usually ask and where you want the messages to land.' },
      { title: 'We set up and test with you', body: 'We build your receptionist, set up forwarding on your existing number and call it together until it answers the way you would.' },
      { title: `Live in ${OFFER.liveInDays} days`, body: `${OFFER.liveInDays} days from the kickoff call it is answering your missed and after-hours calls, and you start getting summaries.` },
    ],
  },

  included: {
    title: "What's included",
    intro: `Everything below is part of the ${monthlyEn} a month. No per-call charge, and no setup fee beyond the ${setupEn}.`,
    items: {
      answers: {
        title: 'An AI receptionist on your missed and after-hours calls',
        body: 'It answers the calls you cannot get to, day or night, 24/7, in English or Spanish, and it tells the caller it is an AI assistant.',
      },
      captures: {
        title: 'The details you need to call them back',
        body: "The caller's name, what they need, their address or area, and the best number to reach them on.",
      },
      alerts: {
        title: 'An email summary and a text alert, right away',
        body: 'Every call sends the owner an email summary of what was said and a text alert, so a lead is on your phone before you are back in the truck.',
      },
      weeklyReport: {
        title: 'A weekly missed-call report',
        body: 'How many calls it answered that week and how many leads it captured, in one email.',
      },
      forwarding: {
        title: 'Call forwarding set up on your own number',
        body: 'You keep your number. We set up the forwarding on it, so nothing on your truck, your cards or your Google profile has to change.',
      },
      textBack: {
        title: 'Automatic text-back to callers',
        body: 'A text to the caller the moment the call ends, so they have your name in their phone. No extra charge.',
      },
    } as Record<InclusionKey, Included>,
    // Shown beside the text-back item, not in fine print: it is the one thing
    // here with a date nobody at CG Strategic controls.
    a2pNote: `Text-back switches on as soon as your business's carrier texting registration (A2P 10DLC) is approved. That usually takes ${weeksFrom}–${weeksTo} weeks and it is not in our control. The call answering goes live either way.`,
    finePrint: 'Phone usage is included up to a fair-use limit. Heavy call volume is billed at cost, and we confirm the limit with you before kickoff.',
    upgrade: `Outgrow it and it rolls into the full Pest Control, Lawn Care or Meal Prep package — and the ${setupEn} setup fee is credited if you upgrade within ${OFFER.upgradeCreditDays} days.`,
  },

  // The hero clip (src/config/videos.ts, RESCUE_VIDEO). The length in the
  // caption is the row's own `seconds`.
  video: {
    label: 'Missed-Call Rescue intro: how an AI receptionist answers the calls you miss',
    caption: '72-second intro: one missed call, from the ring to the lead in your texts.',
  },

  calculator: {
    title: 'See what missed calls cost you',
    body: 'Put in your own calls per week, how many you miss and what a customer is worth. The estimate is yours, from your numbers.',
    link: 'Open the missed-call cost calculator',
  },

  proof: {
    title: 'The same work, already built',
    body: 'We built the website and the office system behind One Source Total Pest Control, a Jacksonville pest control company, with a bilingual AI assistant on the phones. The narrated tour walks through the site a customer lands on and the admin area the office works in.',
    // English links to the tour section; /es/pest-control has no tour (the
    // narration is English only), so the Spanish half points at the page
    // itself instead of an anchor that is not there.
    link: { label: 'Watch the pest control tour', path: '/pest-control#tour' },
  },

  faqTitle: 'Frequently asked questions',
  faq: [
    {
      id: 'keep-my-number',
      question: 'Do I keep my number?',
      answer: 'Yes. Your number stays yours and stays where it is. We set up call forwarding on it, so your trucks, cards, website and Google profile keep the number they already show.',
    },
    {
      id: 'i-answer-myself',
      question: 'What if I answer the call myself?',
      answer: 'Then the AI never picks up. Forwarding only sends a call on when you do not answer it, or when you are closed, so your own answered calls work exactly as they do today.',
    },
    {
      id: 'spanish',
      question: 'Does it work in Spanish?',
      answer: 'Yes. It answers each caller in English or Spanish, in the language they use, and the summary you get is in English.',
    },
    {
      id: 'text-back-start',
      question: 'When does text-back start?',
      answer: `As soon as your carrier texting registration (A2P 10DLC) is approved. That is a carrier queue, not something we control, and it usually takes ${weeksFrom}–${weeksTo} weeks. We file it with you at kickoff and switch text-back on the day it clears, at no extra charge. The call answering does not wait for it.`,
    },
    {
      id: 'cancel',
      question: 'Can I cancel?',
      answer: `Yes. It is month to month — cancel anytime and the ${monthlyEn} stops at the end of that month. We hand the forwarding back so your calls ring the way they did before.`,
    },
    {
      id: 'after-14-days',
      question: `What happens after the ${OFFER.liveInDays} days?`,
      answer: `It keeps answering, for ${monthlyEn} a month. We watch it, adjust the answers as your business changes, and send the weekly report. If you want the full website and office system later, the ${setupEn} setup fee is credited against it within ${OFFER.upgradeCreditDays} days.`,
    },
  ] as FaqItem[],

  closing: {
    title: 'Start with the calls you are already missing',
    body: `A short call, then ${OFFER.liveInDays} days. If it is not a fit, we will say so on the call.`,
  },

  breadcrumbs: {
    label: 'Breadcrumb',
    home: 'Home',
    here: 'Missed-Call Rescue',
  },

  // Structured data only; never shown on the page.
  schema: {
    name: 'Missed-Call Rescue',
    serviceType: 'AI answering service for missed and after-hours calls',
    audience: 'Local service businesses',
    setupOffer: `${setupEn} one-time setup`,
    monthlyOffer: `${monthlyEn} a month, month to month`,
  },
};

const es: typeof en = {
  eyebrow: 'Oferta inicial',
  title: 'Que ningún otro trabajo se le vaya al buzón de voz',
  intro: `Una recepcionista con IA contesta las llamadas que usted no alcanza y las que llegan fuera del horario, las 24 horas, en inglés o en español. ${setupEs} de instalación por única vez y ${monthlyEs} al mes, mes a mes, y empieza a funcionar en ${OFFER.liveInDays} días desde su llamada inicial.`,
  priceBadge: `Inicial · ${setupEs} de instalación`,
  priceSetup: `${setupEs} de instalación por única vez`,
  priceMonthly: `${monthlyEs} al mes`,
  priceTerm: 'Mes a mes. Cancele cuando quiera.',
  priceLive: `Funcionando en ${OFFER.liveInDays} días`,

  ctaBook: 'Agende una llamada de 30 minutos',
  // The "(Página en inglés.)" stays: the cal.com booking page has no Spanish.
  ctaBookNote: 'Gratis, y casi nunca usamos la media hora completa. (Página en inglés.)',
  ctaAlex: 'Escuche cómo contesta una llamada',
  ctaCall: 'Llámenos',
  tryNote: `Pruébelo ahora: Alex, nuestra propia recepcionista con IA, contesta el ${PHONE_DISPLAY}.`,

  who: {
    title: 'Para quién es',
    body: 'Control de plagas, jardinería y paisajismo, comidas preparadas y otros negocios locales de servicios que pierden llamadas mientras están en un trabajo o fuera del horario de atención, cuando quien llama simplemente marca a la siguiente empresa que aparece en Google.',
  },

  how: {
    title: 'Cómo funciona',
    steps: [
      { title: 'Llamada inicial', body: 'Repasamos sus servicios, sus horarios, lo que suelen preguntar las personas que llaman y a dónde quiere que lleguen los mensajes.' },
      { title: 'Lo configuramos y lo probamos con usted', body: 'Creamos su recepcionista, configuramos el desvío de llamadas en su número actual y la llamamos juntos hasta que conteste como lo haría usted.' },
      { title: `Funcionando en ${OFFER.liveInDays} días`, body: `A los ${OFFER.liveInDays} días de la llamada inicial ya está contestando sus llamadas perdidas y las de fuera del horario, y usted empieza a recibir los resúmenes.` },
    ],
  },

  included: {
    title: 'Qué incluye',
    intro: `Todo lo de abajo va incluido en los ${monthlyEs} al mes. Sin cargo por llamada y sin ningún costo de instalación además de los ${setupEs}.`,
    items: {
      answers: {
        title: 'Una recepcionista con IA en sus llamadas perdidas y fuera de horario',
        body: 'Contesta las llamadas que usted no alcanza, de día o de noche, las 24 horas, en inglés o en español, y le dice a quien llama que es un asistente de IA.',
      },
      captures: {
        title: 'Los datos que necesita para devolver la llamada',
        body: 'El nombre de la persona, qué necesita, su dirección o zona y el mejor número para llamarla.',
      },
      alerts: {
        title: 'Un resumen por correo y un mensaje de texto, de inmediato',
        body: 'Cada llamada le envía al dueño un resumen por correo electrónico de lo que se dijo y una alerta por mensaje de texto, para que el cliente potencial esté en su celular antes de que usted vuelva a la camioneta.',
      },
      weeklyReport: {
        title: 'Un informe semanal de llamadas perdidas',
        body: 'Cuántas llamadas contestó esa semana y cuántos clientes potenciales captó, en un solo correo.',
      },
      forwarding: {
        title: 'Desvío de llamadas configurado en su propio número',
        body: 'Usted conserva su número. Nosotros configuramos el desvío en él, así que no hay que cambiar nada en su camioneta, sus tarjetas ni su perfil de Google.',
      },
      textBack: {
        title: 'Mensaje de texto automático a quien llamó',
        body: 'Un mensaje de texto a la persona en cuanto termina la llamada, para que tenga su nombre en el celular. Sin cargo adicional.',
      },
    },
    a2pNote: `El mensaje automático se activa en cuanto se apruebe el registro de mensajería con los operadores (A2P 10DLC) de su negocio. Eso suele tardar de ${weeksFrom} a ${weeksTo} semanas y no está en nuestras manos. La atención de llamadas funciona desde el primer día de cualquier manera.`,
    finePrint: 'El uso telefónico va incluido hasta un límite de uso razonable. Un volumen alto de llamadas se cobra al costo, y confirmamos el límite con usted antes de empezar.',
    upgrade: `Cuando le quede chico, se integra al paquete completo de Control de plagas, Jardinería o Comidas preparadas, y los ${setupEs} de instalación se le acreditan si hace el cambio dentro de ${OFFER.upgradeCreditDays} días.`,
  },

  video: {
    label: 'Presentación de Missed-Call Rescue: cómo una recepcionista con IA contesta las llamadas que usted no alcanza',
    caption: 'Presentación de 88 segundos: una llamada perdida, desde que suena hasta el cliente potencial en sus mensajes.',
  },

  calculator: {
    title: 'Vea cuánto le cuestan las llamadas perdidas',
    body: 'Ingrese sus propias llamadas por semana, cuántas no contesta y cuánto vale un cliente. La estimación es suya, hecha con sus números.',
    link: 'Abrir la calculadora del costo de las llamadas perdidas',
  },

  proof: {
    title: 'El mismo trabajo, ya construido',
    body: 'Construimos el sitio web y el sistema de oficina de One Source Total Pest Control, una empresa de control de plagas de Jacksonville, con un asistente de IA bilingüe en el teléfono.',
    link: { label: 'Vea la página de control de plagas', path: '/pest-control' },
  },

  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      id: 'keep-my-number',
      question: '¿Conservo mi número?',
      answer: 'Sí. Su número sigue siendo suyo y se queda donde está. Configuramos el desvío de llamadas en él, así que sus camionetas, tarjetas, sitio web y perfil de Google mantienen el número que ya muestran.',
    },
    {
      id: 'i-answer-myself',
      question: '¿Y si yo contesto la llamada?',
      answer: 'Entonces la IA no contesta. El desvío solo pasa la llamada cuando usted no la contesta o cuando está cerrado, así que las llamadas que usted sí atiende funcionan igual que hoy.',
    },
    {
      id: 'spanish',
      question: '¿Funciona en español?',
      answer: 'Sí. Contesta a cada persona en inglés o en español, en el idioma que use, y el resumen que usted recibe llega en inglés.',
    },
    {
      id: 'text-back-start',
      question: '¿Cuándo empiezan los mensajes de texto automáticos?',
      answer: `En cuanto se apruebe el registro de mensajería con los operadores (A2P 10DLC). Esa es una fila de los operadores, no algo que controlemos, y suele tardar de ${weeksFrom} a ${weeksTo} semanas. Lo presentamos con usted al empezar y activamos el mensaje automático el día que se apruebe, sin cargo adicional. La atención de llamadas no espera eso.`,
    },
    {
      id: 'cancel',
      question: '¿Puedo cancelar?',
      answer: `Sí. Es mes a mes: cancele cuando quiera y los ${monthlyEs} se detienen al terminar ese mes. Devolvemos el desvío a como estaba, así que sus llamadas vuelven a sonar como antes.`,
    },
    {
      id: 'after-14-days',
      question: `¿Qué pasa después de los ${OFFER.liveInDays} días?`,
      answer: `Sigue contestando, por ${monthlyEs} al mes. Lo supervisamos, ajustamos las respuestas a medida que su negocio cambia y le enviamos el informe semanal. Si más adelante quiere el sitio web y el sistema de oficina completos, los ${setupEs} de instalación se le acreditan dentro de ${OFFER.upgradeCreditDays} días.`,
    },
  ],

  closing: {
    title: 'Empiece por las llamadas que ya está perdiendo',
    body: `Una llamada corta y luego ${OFFER.liveInDays} días. Si no es lo que le conviene, se lo decimos en la llamada.`,
  },

  breadcrumbs: {
    label: 'Ruta de navegación',
    home: 'Inicio',
    here: 'Missed-Call Rescue',
  },

  schema: {
    name: 'Missed-Call Rescue',
    serviceType: 'Atención telefónica con IA para llamadas perdidas y fuera de horario',
    audience: 'Negocios locales de servicios',
    setupOffer: `${setupEs} de instalación por única vez`,
    monthlyOffer: `${monthlyEs} al mes, mes a mes`,
  },
};

export default { en, es };
