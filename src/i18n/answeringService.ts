// /answering-service and /es/answering-service. Plain TypeScript with no React,
// so vite.config.ts can also write the FAQ and its JSON-LD into the
// pre-rendered HTML (src/i18n/prerender.ts).
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { PHONE_DISPLAY } from '../config/site.ts';
import type { FaqItem } from './faq.ts';

export const ANSWERING_SERVICE_PATH = '/answering-service';

const en = {
  eyebrow: 'AI Answering Service',
  title: 'AI Answering Service for Florida Small Businesses',
  intro: 'Every missed call is a customer who might not call back. An AI answering service picks up every call, day or night, so no lead ends up in voicemail.',
  ctaAlex: 'Talk to Alex',
  ctaCall: `Call ${PHONE_DISPLAY}`,
  tryNote: 'Try it now: Alex, our own AI answering service, answers that number.',
  what: {
    title: 'What your virtual receptionist does',
    items: [
      'Answers calls 24/7',
      'Speaks English and Spanish',
      'Asks the right questions for your business',
      "Captures the caller's name, number and what they need",
      'Books an appointment or sets up a callback, depending on your setup',
      'Sends you a summary right away',
      'Can text back missed callers',
    ],
  },
  built: {
    title: 'Built for local service businesses',
    body: 'Pest control, home services, meal prep and catering, and other appointment-based businesses, where a missed call usually means a lost job.',
    proof: "We've already built one for a Florida pest control company.",
  },
  how: {
    title: 'How it works',
    steps: [
      { title: 'Free intro call', body: 'A 30-minute conversation about your business and the calls you get.' },
      { title: 'We learn how your calls are handled today', body: 'Who answers, what callers ask, and what happens after hours.' },
      { title: 'We build and train your assistant', body: 'On your services and FAQs, so it answers the way you would.' },
      { title: 'It goes live on your number', body: 'With ongoing care: we monitor it, update it as your business changes and keep it running.' },
    ],
  },
  compare: {
    title: 'AI answering service vs. a traditional answering service',
    intro: 'A traditional answering service relies on live operators taking messages. An AI answering service works differently:',
    items: [
      'Answers instantly, with no hold queue',
      'Available 24/7',
      'Gives consistent answers on every call',
      'Bilingual: English and Spanish',
      'Can update your CRM or send texts automatically',
    ],
  },
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      id: 'callers-know-ai',
      question: "Will callers know it's AI?",
      answer: "Yes. It introduces itself as an AI assistant, so callers know who they're talking to.",
    },
    {
      id: 'transfer-or-message',
      question: 'Can it transfer to me or take a message?',
      answer: 'Yes. Depending on your setup, it can transfer the call to you or your team, or take a detailed message and send it to you right away.',
    },
    {
      id: 'existing-number',
      question: 'Does it work with my existing phone number?',
      answer: "Yes. You keep your number. Calls can be forwarded to your assistant all the time, only after hours, or only when you don't pick up.",
    },
    {
      id: 'spanish-callers',
      question: 'Can it handle Spanish-speaking callers?',
      answer: 'Yes. It speaks English and Spanish and answers each caller in the language they use.',
    },
    {
      id: 'cost',
      question: 'How much does it cost?',
      answer: "It's priced after a short look at your calls and workflows. The intro call is free.",
    },
  ] as FaqItem[],
  closing: {
    title: 'Hear it for yourself',
    body: 'Talk to Alex in your browser or call our number to see how an AI answering service works.',
  },
};

const es: typeof en = {
  eyebrow: 'Servicio de atención telefónica con IA',
  title: 'Servicio de atención telefónica con IA para pequeños negocios de Florida',
  intro: 'Cada llamada perdida es un cliente que quizás no vuelva a llamar. Un servicio de atención telefónica con IA contesta todas las llamadas, de día o de noche, para que ningún cliente potencial termine en el buzón de voz.',
  ctaAlex: 'Hablar con Alex',
  ctaCall: `Llamar al ${PHONE_DISPLAY}`,
  tryNote: 'Pruébelo ahora: Alex, nuestro propio servicio de atención telefónica con IA, contesta ese número.',
  what: {
    title: 'Lo que hace su recepcionista virtual',
    items: [
      'Contesta llamadas las 24 horas, los 7 días de la semana',
      'Habla inglés y español',
      'Hace las preguntas adecuadas para su negocio',
      'Toma el nombre, el número y lo que necesita cada persona que llama',
      'Programa una cita o una devolución de llamada, según cómo lo configure',
      'Le envía un resumen de inmediato',
      'Puede enviar un mensaje de texto a quienes llamaron y no lograron comunicarse',
    ],
  },
  built: {
    title: 'Hecho para negocios locales de servicios',
    body: 'Control de plagas, servicios para el hogar, comidas preparadas y catering, y otros negocios que trabajan con citas, donde una llamada perdida suele ser un trabajo perdido.',
    proof: 'Ya creamos uno para una empresa de control de plagas de Florida.',
  },
  how: {
    title: 'Cómo funciona',
    steps: [
      { title: 'Llamada introductoria gratuita', body: 'Una conversación de 30 minutos sobre su negocio y las llamadas que recibe.' },
      { title: 'Conocemos cómo atiende sus llamadas hoy', body: 'Quién contesta, qué preguntan las personas que llaman y qué pasa fuera del horario de atención.' },
      { title: 'Creamos y entrenamos a su asistente', body: 'Con sus servicios y sus preguntas frecuentes, para que responda como lo haría usted.' },
      { title: 'Empieza a funcionar en su número', body: 'Con mantenimiento continuo: lo supervisamos, lo actualizamos cuando su negocio cambia y lo mantenemos funcionando.' },
    ],
  },
  compare: {
    title: 'Servicio de atención telefónica con IA vs. un servicio de contestación tradicional',
    intro: 'Un servicio de contestación tradicional depende de operadores que toman mensajes. Un servicio con IA funciona de otra manera:',
    items: [
      'Contesta al instante, sin filas de espera',
      'Está disponible las 24 horas, los 7 días de la semana',
      'Da respuestas consistentes en cada llamada',
      'Es bilingüe: inglés y español',
      'Puede actualizar su CRM o enviar mensajes de texto automáticamente',
    ],
  },
  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      id: 'callers-know-ai',
      question: '¿Las personas que llaman sabrán que es IA?',
      answer: 'Sí. Se presenta como asistente de IA, para que quien llama sepa con quién está hablando.',
    },
    {
      id: 'transfer-or-message',
      question: '¿Puede transferirme la llamada o tomar un mensaje?',
      answer: 'Sí. Según cómo lo configure, puede transferir la llamada a usted o a su equipo, o tomar un mensaje detallado y enviárselo de inmediato.',
    },
    {
      id: 'existing-number',
      question: '¿Funciona con mi número de teléfono actual?',
      answer: 'Sí. Usted conserva su número. Las llamadas se pueden desviar a su asistente todo el tiempo, solo fuera del horario de atención o solo cuando usted no contesta.',
    },
    {
      id: 'spanish-callers',
      question: '¿Puede atender a personas que hablan español?',
      answer: 'Sí. Habla inglés y español y contesta a cada persona en el idioma que use.',
    },
    {
      id: 'cost',
      question: '¿Cuánto cuesta?',
      answer: 'El precio se define después de analizar brevemente sus llamadas y sus flujos de trabajo. La llamada introductoria es gratuita.',
    },
  ],
  closing: {
    title: 'Escúchelo usted mismo',
    body: 'Hable con Alex en su navegador o llame a nuestro número para ver cómo funciona un servicio de atención telefónica con IA.',
  },
};

export default { en, es };
