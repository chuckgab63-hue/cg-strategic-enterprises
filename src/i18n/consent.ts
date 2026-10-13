// SMS and email consent wording shown next to the opt-in checkboxes, per language.
//
// NEEDS NATIVE/LEGAL REVIEW (Spanish). The English text in src/config/site.ts is
// what carriers (A2P 10DLC) reviewed word for word and it is what governs; the
// Spanish is a courtesy translation and the form says so. STOP and HELP stay in
// English because those are the keywords the messaging platform acts on.
// Whatever text the visitor saw is what gets sent with the submission.

import {
  SMS_CONSENT_TEXT, SMS_MARKETING_CONSENT_TEXT, EMAIL_MARKETING_CONSENT_TEXT,
} from '../config/site';
import { SMS_PHONE_REQUIRED_MESSAGE } from '../lib/smsPhone';

const en = {
  sms: SMS_CONSENT_TEXT,
  smsMarketing: SMS_MARKETING_CONSENT_TEXT,
  emailMarketing: EMAIL_MARKETING_CONSENT_TEXT,
  /** The phrases inside the consent text that link to /privacy and /terms#sms. */
  privacyLinkText: 'Privacy Policy',
  smsTermsLinkText: 'SMS Terms',
  /** Shown above the checkboxes on translated pages; empty in English. */
  governingNote: '',
  phoneRequired: SMS_PHONE_REQUIRED_MESSAGE,
};

const es: typeof en = {
  sms: 'Acepto recibir mensajes de texto de CG Strategic Enterprises sobre mi consulta, mis citas y el avance de mi proyecto. La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para cancelar o HELP para obtener ayuda. El consentimiento no es una condición de compra. Consulte nuestra Política de privacidad y los Términos de SMS.',
  smsMarketing: 'Sí, envíenme por mensaje de texto noticias, consejos y ofertas ocasionales de CG Strategic Enterprises. Hasta 4 mensajes al mes. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para cancelar o HELP para obtener ayuda. El consentimiento no es una condición de compra. Consulte nuestra Política de privacidad y los Términos de SMS.',
  emailMarketing: 'Sí, envíenme por correo electrónico noticias, consejos y ofertas ocasionales de CG Strategic Enterprises. Puede cancelar su suscripción en cualquier momento.',
  privacyLinkText: 'Política de privacidad',
  smsTermsLinkText: 'Términos de SMS',
  governingNote: 'Traducción de cortesía: la versión en inglés de estos textos de consentimiento es la que rige.',
  phoneRequired: 'Ingrese su número de celular para que podamos enviarle mensajes de texto, o desmarque las casillas de mensajes de texto.',
};

export default { en, es };
