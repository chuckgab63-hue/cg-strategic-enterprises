// /faq and /es/faq: the questions, the page copy and the FAQPage structured
// data. Plain TypeScript with no React, so vite.config.ts can also write the
// answers and the JSON-LD into the pre-rendered HTML (src/i18n/prerender.ts)
// for visitors and crawlers that don't run JavaScript.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { localizePath, type Lang } from './lang.ts';
import { SITE_URL } from '../config/site.ts';

export const FAQ_PATH = '/faq';

export interface FaqItem {
  /** Anchor for links like /faq#ownership; the same in both languages. */
  id: string;
  question: string;
  answer: string;
}

const en = {
  eyebrow: 'FAQ',
  title: 'Frequently asked questions',
  intro: "Straight answers about how we work, what it costs and what's yours. Don't see your question? Get in touch.",
  items: [
    {
      id: 'what-we-do',
      question: 'What does CG Strategic Enterprises do?',
      answer: "We build websites, AI assistants and automations for local businesses. That can mean a faster, more modern website, an AI assistant that answers calls and questions around the clock, or automations that handle lead follow-up, scheduling, invoicing and review requests so you're not doing them by hand.",
    },
    {
      id: 'who-we-work-with',
      question: 'Who do you work with?',
      answer: 'Small and growing businesses in Jacksonville, Northeast Florida and beyond, especially service businesses like home services and pest control, and food businesses like meal prep and catering.',
    },
    {
      id: 'how-projects-start',
      question: 'How does a project start?',
      answer: 'With a free 30-minute intro call. From there: a short audit of how things work today, a requirements step where we map out exactly what you need, a written quote, the build, and then optional ongoing hosting and care.',
    },
    {
      id: 'cost',
      question: 'How much does it cost?',
      answer: "Every project is priced on the specific workflows and integrations involved, so we don't quote blind. After a short look at how your business runs today, you get a clear written quote. The intro call is free.",
    },
    {
      id: 'replace-current-tools',
      question: 'Do I have to replace my current website or software?',
      answer: "No. If something is working for you, we build on it. Many of our automations and growth services work alongside platforms you already use, like Wix, Shopify or your existing CRM. We'll only recommend replacing something if it's holding you back.",
    },
    {
      id: 'ownership',
      question: 'Who owns the website and platform?',
      answer: "Your business is always yours: your customer and order data, your domain, your brand, logo, photos and content, and your payment account. You can export your data at any time. The platform software we build is licensed to you as part of your monthly hosting and care plan, which is what keeps it running. If you ever leave, you take your data, domain, content and payment account with you, so you can move without losing a customer. If you'd rather run the platform yourself, there's an option to buy out the software license.",
    },
    {
      id: 'hosting-and-care',
      question: 'What does the monthly hosting and care plan include?',
      answer: "Hosting, security updates, backups, uptime monitoring, support with set response times, and small changes as you go. It's spelled out in a written service agreement before you commit.",
    },
    {
      id: 'timeline',
      question: 'How long does a project take?',
      answer: 'It depends on the scope. Your written quote includes a timeline, and larger projects are delivered in milestones so you can see progress along the way.',
    },
    {
      id: 'alex',
      question: 'Who is Alex?',
      answer: 'Alex is our AI assistant. Alex answers calls and website chats anytime, in English or Spanish, learns what you need, and sets up a free intro call with our founder, Chuck. Calls are recorded so we can follow up accurately.',
    },
    {
      id: 'spanish',
      question: 'Do you work in Spanish?',
      answer: 'Yes. Our website, Alex and our lead follow-up all work in English and Spanish, and we can build bilingual websites and assistants for your business too.',
    },
    {
      id: 'referrals',
      question: 'Do you have a referral program?',
      answer: "Yes. If you know a business we could help, you can earn a finder's fee when they become a client. Call or chat with Alex to learn how it works.",
    },
    {
      id: 'local',
      question: 'Are you local?',
      answer: "Yes, we're based in Northeast Florida and work with businesses across the state and beyond.",
    },
  ] as FaqItem[],
  cta: {
    title: 'Still have a question?',
    body: "Book a free 30-minute intro call, or send us a message and we'll get back to you.",
    button: 'Contact us',
  },
};

const es: typeof en = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Preguntas frecuentes',
  intro: '¿Cómo trabajamos, cuánto cuesta y qué es suyo? Aquí tiene respuestas claras. ¿No encuentra su pregunta? Comuníquese con nosotros.',
  items: [
    {
      id: 'what-we-do',
      question: '¿Qué hace CG Strategic Enterprises?',
      answer: 'Creamos sitios web, asistentes de IA y automatizaciones para negocios locales. Eso puede ser un sitio web más rápido y moderno, un asistente de IA que contesta llamadas y preguntas a toda hora, o automatizaciones que se encargan del seguimiento de clientes potenciales, la programación de citas, la facturación y las solicitudes de reseñas, para que usted no tenga que hacerlo a mano.',
    },
    {
      id: 'who-we-work-with',
      question: '¿Con quién trabajan?',
      answer: 'Con negocios pequeños y en crecimiento de Jacksonville, el noreste de Florida y otros lugares, sobre todo empresas de servicios, como servicios para el hogar y control de plagas, y negocios de comida, como comidas preparadas y catering.',
    },
    {
      id: 'how-projects-start',
      question: '¿Cómo empieza un proyecto?',
      answer: 'Con una llamada introductoria gratuita de 30 minutos. A partir de ahí: una breve evaluación de cómo funciona todo hoy, una etapa de requisitos en la que definimos exactamente lo que usted necesita, una cotización por escrito, el desarrollo y, si lo desea, el servicio continuo de alojamiento y mantenimiento.',
    },
    {
      id: 'cost',
      question: '¿Cuánto cuesta?',
      answer: 'Cada proyecto se cotiza según los flujos de trabajo y las integraciones específicas que incluya, así que no damos precios a ciegas. Después de analizar brevemente cómo funciona su negocio hoy, usted recibe una cotización clara por escrito. La llamada introductoria es gratuita.',
    },
    {
      id: 'replace-current-tools',
      question: '¿Tengo que reemplazar mi sitio web o mi software actual?',
      answer: 'No. Si algo le funciona, partimos de ahí. Muchas de nuestras automatizaciones y servicios de crecimiento funcionan junto con las plataformas que usted ya usa, como Wix, Shopify o su CRM actual. Solo le recomendaremos reemplazar algo si lo está frenando.',
    },
    {
      id: 'ownership',
      question: '¿Quién es dueño del sitio web y de la plataforma?',
      answer: 'Lo que pertenece a su negocio siempre es suyo: los datos de sus clientes y pedidos, su dominio, su marca, logotipo, fotos y contenido, y su cuenta de pagos. Puede exportar sus datos en cualquier momento. El software de la plataforma que desarrollamos se le otorga bajo licencia como parte de su plan mensual de alojamiento y mantenimiento, que es lo que lo mantiene funcionando. Si algún día decide irse, se lleva sus datos, su dominio, su contenido y su cuenta de pagos, para que pueda cambiarse sin perder ni un solo cliente. Si prefiere administrar la plataforma usted mismo, existe la opción de comprar la licencia del software.',
    },
    {
      id: 'hosting-and-care',
      question: '¿Qué incluye el plan mensual de alojamiento y mantenimiento?',
      answer: 'Alojamiento web, actualizaciones de seguridad, copias de seguridad, monitoreo de disponibilidad, soporte con tiempos de respuesta definidos y pequeños cambios a medida que los necesite. Todo queda detallado en un acuerdo de servicio por escrito antes de que usted se comprometa.',
    },
    {
      id: 'timeline',
      question: '¿Cuánto tarda un proyecto?',
      answer: 'Depende del alcance. Su cotización por escrito incluye un calendario, y los proyectos más grandes se entregan por etapas para que pueda ver el avance en el camino.',
    },
    {
      id: 'alex',
      question: '¿Quién es Alex?',
      answer: 'Alex es nuestro asistente de IA. Alex contesta llamadas y chats del sitio web a cualquier hora, en inglés o en español, averigua qué necesita usted y le programa una llamada introductoria gratuita con nuestro fundador, Chuck. Las llamadas se graban para que podamos darle un seguimiento preciso.',
    },
    {
      id: 'spanish',
      question: '¿Trabajan en español?',
      answer: 'Sí. Nuestro sitio web, Alex y nuestro seguimiento de clientes potenciales funcionan en inglés y en español, y también podemos crear sitios web y asistentes bilingües para su negocio.',
    },
    {
      id: 'referrals',
      question: '¿Tienen un programa de referidos?',
      answer: 'Sí. Si conoce un negocio al que podríamos ayudar, puede ganar una comisión por referido cuando se convierta en cliente. Llame o converse con Alex para saber cómo funciona.',
    },
    {
      id: 'local',
      question: '¿Son de la zona?',
      answer: 'Sí, estamos en el noreste de Florida y trabajamos con negocios de todo el estado y de otros lugares.',
    },
  ],
  cta: {
    title: '¿Tiene alguna otra pregunta?',
    body: 'Reserve una llamada introductoria gratuita de 30 minutos o envíenos un mensaje y le responderemos.',
    button: 'Contáctenos',
  },
};

const faq = { en, es };
export default faq;

/** schema.org FAQPage for one language: every question with its answer. */
export function faqJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: SITE_URL + localizePath(FAQ_PATH, lang),
    inLanguage: lang,
    mainEntity: faq[lang].items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** The JSON-LD as text that's safe inside a <script> element. */
export function faqJsonLdText(lang: Lang): string {
  return JSON.stringify(faqJsonLd(lang)).replace(/</g, '\\u003c');
}
