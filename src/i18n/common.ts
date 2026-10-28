// Site-wide strings: header, footer, "Let's Talk" chooser, language toggle,
// Spanish prompt and 404. Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { BUSINESS_NAME, EMAIL, PHONE_DISPLAY } from '../config/site';

const en = {
  tagline: ['Efficiency Engineered.', 'Growth Automated.'],
  nav: {
    hub: 'Hub',
    engine: 'The Engine',
    caseStudies: 'Case Studies',
    skunkworks: 'Skunkworks',
    contact: 'Contact',
    mealPrep: 'Meal Prep Calculator',
    websiteCheck: 'Free Website Check',
    missedCallCalculator: 'Missed-Call Calculator',
    faq: 'FAQ',
    answeringService: 'AI Answering Service',
    mealPrepOrdering: 'Meal Prep Ordering',
    privacy: 'Privacy Policy',
    terms: 'Terms',
  },
  mainNavLabel: 'Main',
  callAriaLabel: `Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`,
  emailAriaLabel: `Email ${BUSINESS_NAME} at ${EMAIL}`,
  letsTalk: "Let's Talk",
  orSendMessage: 'Or send us a message',
  chooser: {
    title: "Let's talk",
    close: 'Close',
    alexTitle: 'Talk to Alex',
    alexSubtext: 'Our AI assistant, right in your browser. Uses your microphone.',
    fallbackNote: "Can't connect, or no mic? Call us instead.",
    call: 'Call',
    tapToCall: 'Prefer the phone? Tap to call.',
    dialFromPhone: 'Prefer the phone? Dial it from your phone.',
  },
  footer: {
    explore: 'Explore',
    legal: 'Legal',
    initiate: 'Initiate',
    pitch: "Ready to upgrade your digital infrastructure? Let's build.",
    rights: 'All rights reserved.',
  },
  langToggle: {
    groupLabel: 'Language',
  },
  spanishPrompt: {
    question: '¿Prefiere español?',
    action: 'Ver esta página en español',
    dismiss: 'Cerrar',
  },
  notFound: {
    eyebrow: 'Error 404',
    title: 'Page not found',
    body: "The page you're looking for doesn't exist or has moved.",
    home: 'Back to home',
    contact: 'Contact us',
  },
};

const es: typeof en = {
  tagline: ['Eficiencia diseñada.', 'Crecimiento automatizado.'],
  nav: {
    hub: 'Inicio',
    engine: 'El Motor',
    caseStudies: 'Casos de estudio',
    skunkworks: 'Skunkworks',
    contact: 'Contacto',
    mealPrep: 'Calculadora de comidas preparadas',
    websiteCheck: 'Revisión gratuita de su sitio',
    missedCallCalculator: 'Calculadora de llamadas perdidas',
    faq: 'Preguntas frecuentes',
    answeringService: 'Atención telefónica con IA',
    mealPrepOrdering: 'Pedidos para comidas preparadas',
    privacy: 'Política de privacidad',
    terms: 'Términos',
  },
  mainNavLabel: 'Principal',
  callAriaLabel: `Llamar a ${BUSINESS_NAME} al ${PHONE_DISPLAY}`,
  emailAriaLabel: `Enviar un correo electrónico a ${BUSINESS_NAME} a ${EMAIL}`,
  letsTalk: 'Hablemos',
  orSendMessage: 'O envíenos un mensaje',
  chooser: {
    title: 'Hablemos',
    close: 'Cerrar',
    alexTitle: 'Alex, nuestro asistente de IA',
    alexSubtext: 'Directamente en su navegador. Usa su micrófono. Alex habla español e inglés.',
    fallbackNote: '¿No logra conectarse o no tiene micrófono? Llámenos.',
    call: 'Llamar al',
    tapToCall: '¿Prefiere hablar por teléfono? Toque para llamar.',
    dialFromPhone: '¿Prefiere hablar por teléfono? Marque este número desde su celular.',
  },
  footer: {
    explore: 'Explorar',
    legal: 'Legal',
    initiate: 'Comience',
    pitch: '¿Listo para mejorar su infraestructura digital? Manos a la obra.',
    rights: 'Todos los derechos reservados.',
  },
  langToggle: {
    groupLabel: 'Idioma',
  },
  spanishPrompt: en.spanishPrompt,
  notFound: {
    eyebrow: 'Error 404',
    title: 'Página no encontrada',
    body: 'La página que busca no existe o cambió de dirección.',
    home: 'Volver al inicio',
    contact: 'Contáctenos',
  },
};

export default { en, es };
