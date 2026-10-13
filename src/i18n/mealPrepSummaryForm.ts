// "Email me this summary" form on /meal-prep-calculator.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { MEAL_PREP_FOLLOW_UP_CONSENT_TEXT } from '../config/site';

const en = {
  nameRequired: 'Please enter your name.',
  successTitle: 'Summary on Its Way',
  successBefore: "We've sent your numbers to ",
  successAfter: ". Check your spam folder if it isn't there in a few minutes.",
  sendAnother: 'Send another version',
  errorBefore: 'Something went wrong sending your summary. Please try again, or reach us directly at',
  errorOr: 'or',
  name: 'Your name',
  email: 'Email address',
  // The exact wording is sent with the submission as proof of consent.
  consent: MEAL_PREP_FOLLOW_UP_CONSENT_TEXT,
  /** Shown under translated consent wording; empty in English. */
  consentGoverns: '',
  optional: "Optional. Leave it unticked and we'll send the summary and nothing else.",
  see: 'See our',
  privacy: 'Privacy Policy',
  sending: 'Sending...',
  submit: 'Email Me This Summary',
};

const es: typeof en = {
  nameRequired: 'Escriba su nombre.',
  successTitle: 'Su resumen va en camino',
  successBefore: 'Enviamos sus cifras a ',
  successAfter: '. Si no le llega en unos minutos, revise su carpeta de correo no deseado.',
  sendAnother: 'Enviar otra versión',
  errorBefore: 'Algo salió mal al enviar su resumen. Inténtelo de nuevo o escríbanos directamente a',
  errorOr: 'o llámenos al',
  name: 'Su nombre',
  email: 'Correo electrónico',
  // NEEDS NATIVE/LEGAL REVIEW: consent wording. The English version governs.
  consent: 'Sí, CG Strategic Enterprises puede escribirme por correo electrónico para dar seguimiento a estas cifras y enviarme consejos y ofertas de vez en cuando. Puedo cancelar la suscripción en cualquier momento.',
  consentGoverns: 'La versión en inglés de este texto es la que rige.',
  optional: 'Opcional. Si no marca la casilla, le enviaremos solo el resumen.',
  see: 'Consulte nuestra',
  privacy: 'Política de privacidad',
  sending: 'Enviando...',
  submit: 'Enviarme este resumen',
};

export default { en, es };
