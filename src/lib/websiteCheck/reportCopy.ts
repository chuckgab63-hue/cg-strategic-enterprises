// Report wording the server writes (risk reasons and the fallback fixes used
// when Gemini is unavailable), in both languages. The page's own UI strings
// live in src/i18n/websiteCheck.ts; these live here because the Vercel
// function can't import from src/i18n.
//
// Spanish: NEEDS NATIVE REVIEW (see docs/SPANISH_REVIEW.md).

import type { RiskReason, SearchCheck } from './scoring.js';

export type ReportLang = 'en' | 'es';

export interface Fix {
  title: string;
  detail: string;
}

export const RISK_REASON_TEXT: Record<ReportLang, Record<RiskReason, string>> = {
  en: {
    no_tel_link: 'No tap-to-call phone link, so mobile visitors have to copy your number by hand.',
    no_contact_form: 'No contact form, so visitors who can’t get through by phone have nowhere to leave their details.',
    no_booking: 'No online booking, so every appointment depends on a phone call.',
    no_chat: 'No chat or voice assistant to answer questions when nobody is available.',
    no_after_hours: 'Nothing on the page says how to reach you after hours.',
    phone_only: 'The phone is the only quick way to reach you, so a missed call can mean a missed customer.',
  },
  es: {
    no_tel_link: 'No hay un enlace para llamar con un toque, así que quienes visitan desde el celular deben copiar su número a mano.',
    no_contact_form: 'No hay formulario de contacto, así que quien no logra comunicarse por teléfono no tiene dónde dejar sus datos.',
    no_booking: 'No hay reservas en línea, así que cada cita depende de una llamada.',
    no_chat: 'No hay chat ni asistente de voz que responda preguntas cuando nadie está disponible.',
    no_after_hours: 'La página no indica cómo comunicarse con usted fuera del horario de atención.',
    phone_only: 'El teléfono es la única forma rápida de contactarlo, así que una llamada perdida puede ser un cliente perdido.',
  },
};

const SEARCH_FIX: Record<ReportLang, Record<SearchCheck, Fix>> = {
  en: {
    https: { title: 'Turn on HTTPS', detail: 'Your homepage loads without a secure connection. Browsers warn visitors about this and search engines prefer secure sites.' },
    title: { title: 'Add a page title', detail: 'Your homepage has no title tag. The title is the headline search engines show, so include your business name, service and city.' },
    meta_description: { title: 'Write a meta description', detail: 'Your homepage has no meta description, so search engines pick their own snippet. One or two sentences about what you do and where works well.' },
    single_h1: { title: 'Use one main heading', detail: 'Your homepage should have exactly one H1 heading that says what you do. We found a different number.' },
    viewport: { title: 'Make the page mobile-friendly', detail: 'The page is missing the viewport setting phones need, so it may show as a shrunken desktop page.' },
    structured_data: { title: 'Add business details for search engines', detail: 'We found no LocalBusiness or Organization structured data. Adding it helps search engines show your name, phone and hours correctly.' },
  },
  es: {
    https: { title: 'Active HTTPS', detail: 'Su página de inicio carga sin conexión segura. Los navegadores advierten a los visitantes y los buscadores prefieren sitios seguros.' },
    title: { title: 'Agregue un título a la página', detail: 'Su página de inicio no tiene etiqueta de título. Es el encabezado que muestran los buscadores: incluya el nombre de su negocio, su servicio y su ciudad.' },
    meta_description: { title: 'Escriba una meta descripción', detail: 'Su página de inicio no tiene meta descripción, así que los buscadores eligen su propio fragmento. Una o dos frases sobre lo que hace y dónde funcionan bien.' },
    single_h1: { title: 'Use un solo encabezado principal', detail: 'Su página de inicio debe tener exactamente un encabezado H1 que diga lo que hace. Encontramos una cantidad distinta.' },
    viewport: { title: 'Adapte la página a celulares', detail: 'A la página le falta la configuración de viewport que necesitan los celulares, así que puede verse como una página de escritorio reducida.' },
    structured_data: { title: 'Agregue los datos de su negocio para los buscadores', detail: 'No encontramos datos estructurados de LocalBusiness u Organization. Agregarlos ayuda a que los buscadores muestren bien su nombre, teléfono y horario.' },
  },
};

const RISK_FIX: Record<ReportLang, Partial<Record<RiskReason, Fix>>> = {
  en: {
    no_contact_form: { title: 'Add a short contact form', detail: 'Give visitors who can’t reach you by phone a way to leave their name and number, and get notified right away.' },
    no_chat: { title: 'Answer visitors when you can’t', detail: 'A chat or voice assistant can answer common questions and take details after hours, so fewer leads slip away.' },
    no_booking: { title: 'Let customers book online', detail: 'An online booking link lets customers pick a time without waiting for a call back.' },
    no_tel_link: { title: 'Make your phone number tappable', detail: 'Link your phone number with tel: so mobile visitors can call in one tap.' },
    no_after_hours: { title: 'Say how to reach you after hours', detail: 'Tell visitors what to do outside business hours, such as a form, text line or emergency number.' },
  },
  es: {
    no_contact_form: { title: 'Agregue un formulario de contacto corto', detail: 'Dé a quienes no logran llamarle una forma de dejar su nombre y número, y reciba un aviso al instante.' },
    no_chat: { title: 'Atienda a los visitantes cuando usted no puede', detail: 'Un chat o asistente de voz puede responder preguntas frecuentes y tomar datos fuera de horario, para que se pierdan menos clientes.' },
    no_booking: { title: 'Permita reservar en línea', detail: 'Un enlace de reservas permite que el cliente elija un horario sin esperar a que le devuelvan la llamada.' },
    no_tel_link: { title: 'Haga que su número se pueda tocar para llamar', detail: 'Enlace su número con tel: para que quienes visitan desde el celular llamen con un toque.' },
    no_after_hours: { title: 'Indique cómo contactarlo fuera de horario', detail: 'Diga a los visitantes qué hacer fuera del horario de atención: un formulario, una línea de texto o un número de emergencia.' },
  },
};

const SPEED_FIX: Record<ReportLang, Fix> = {
  en: { title: 'Speed up the mobile site', detail: 'Google’s test scored your mobile speed low. Compressing images and trimming scripts that load first are usually the biggest wins.' },
  es: { title: 'Acelere el sitio en celulares', detail: 'La prueba de Google le dio una puntuación baja de velocidad en celulares. Comprimir imágenes y reducir los scripts que cargan primero suele ser lo que más ayuda.' },
};

/**
 * Three fixes picked by rule from what failed, for when Gemini is unavailable.
 * Missed-call fixes first, then a slow mobile score, then search basics.
 */
export function fallbackFixes(lang: ReportLang, input: { riskReasons: RiskReason[]; mobileScore: number | null; searchMissed: SearchCheck[] }): Fix[] {
  const fixes: Fix[] = [];
  for (const r of ['no_contact_form', 'no_chat', 'no_booking', 'no_tel_link'] as RiskReason[]) {
    const fix = RISK_FIX[lang][r];
    if (fix && input.riskReasons.includes(r)) fixes.push(fix);
    if (fixes.length === 2) break;
  }
  if (input.mobileScore !== null && input.mobileScore < 50) fixes.push(SPEED_FIX[lang]);
  for (const s of input.searchMissed) fixes.push(SEARCH_FIX[lang][s]);
  if (input.riskReasons.includes('no_after_hours')) fixes.push(RISK_FIX[lang].no_after_hours!);
  return fixes.slice(0, 3);
}

export function fallbackSummary(lang: ReportLang, input: {
  page: string; overall: number | null; risk: string | null; searchMissedCount: number | null;
  contentLimited: boolean; pagespeedMissing: boolean;
}): string {
  const es = lang === 'es';
  const parts: string[] = [];
  parts.push(input.overall === null
    ? (es ? `Revisamos ${input.page}.` : `We checked ${input.page}.`)
    : (es ? `Revisamos ${input.page} y obtuvo ${input.overall} de 100 en general.` : `We checked ${input.page} and it scored ${input.overall} out of 100 overall.`));
  if (input.risk !== null && input.searchMissedCount !== null) {
    const riskWord = es ? ({ low: 'bajo', medium: 'medio', high: 'alto' }[input.risk] ?? input.risk) : input.risk;
    parts.push(es
      ? `El riesgo de llamadas perdidas es ${riskWord} y faltan ${input.searchMissedCount} de 6 aspectos básicos de búsqueda.`
      : `Missed-call risk is ${riskWord}, and ${input.searchMissedCount} of 6 search basics are missing.`);
  } else {
    parts.push(es
      ? 'No pudimos leer la página, así que esta vez no revisamos los aspectos básicos de búsqueda ni el riesgo de llamadas perdidas.'
      : 'We couldn’t read the page itself, so search basics and missed-call risk weren’t checked this time.');
  }
  if (input.pagespeedMissing) {
    parts.push(es
      ? 'Google no pudo medir la velocidad esta vez.'
      : 'Google couldn’t measure the speed this time.');
  }
  if (input.contentLimited) {
    parts.push(es
      ? 'Su página se arma con JavaScript, así que algunos elementos pueden existir aunque nuestra revisión no los haya visto.'
      : 'Your page is built with JavaScript, so some items may be there even though our check couldn’t see them.');
  }
  return parts.join(' ');
}
