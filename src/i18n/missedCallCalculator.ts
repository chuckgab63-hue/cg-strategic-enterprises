// /missed-call-calculator: page copy, the "Email me this estimate" form and the
// plain-text summary sent to the contact webhook.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).
// Honesty rules: the defaults are example numbers, not industry statistics, and
// every result is an estimate from the visitor's own inputs. Don't add sources
// or "studies show" figures here.

import type { MissedCallInputs } from '../lib/missedCall/model';

type NumericField = Exclude<keyof MissedCallInputs, 'recurring'>;

interface FieldCopy {
  label: string;
  /** Unit shown after the number field and in the slider's spoken value. */
  unit: string;
  hint?: string;
}

/** The numbers a summary line needs, already formatted in the page language. */
export interface SummaryValues {
  calls: string; missedPct: string; noCallbackPct: string; conversionPct: string; value: string;
  recurring: boolean; visits: string; years: string;
  missed: string; lostCallers: string; lostCustomers: string; valuePerCustomer: string;
  perMonth: string; perYear: string; link: string;
}

const en = {
  badge: 'Free calculator',
  title: 'What are missed calls costing you?',
  intro: "Enter your own numbers to estimate how much revenue slips away when calls go unanswered. Nothing is saved or sent unless you ask us to email the estimate.",
  inputsHeading: 'Your numbers',
  exampleNote: 'Example numbers — use your own.',
  fields: {
    callsPerWeek: { label: 'Calls per week', unit: 'calls' },
    missedPct: { label: 'Calls you miss', unit: '%', hint: 'After hours, on a job, or on another line.' },
    noCallbackPct: { label: "Missed callers who don't try again", unit: '%' },
    conversionPct: { label: 'Answered callers who become customers', unit: '%' },
    customerValue: { label: 'Average value of a new customer', unit: '$' },
    visitsPerYear: { label: 'Visits per year', unit: 'visits' },
    yearsRetained: { label: 'Years a customer stays', unit: 'years' },
  } as Record<NumericField, FieldCopy>,
  recurringLabel: 'Customers come back (recurring service)',
  recurringHint: 'Counts each lost customer at their lifetime value instead of one job.',
  resultsHeading: 'Your estimate',
  headlineLabel: 'Estimated revenue you could be missing each month',
  perYear: (amount: string) => `About ${amount} a year`,
  estimateNote: 'An estimate based only on the numbers you entered, not a guarantee.',
  breakdownHeading: 'How we worked it out',
  steps: {
    missed: (calls: string, pct: string, result: string) => ({ label: 'Missed calls a week', working: `${calls} calls × ${pct}`, result }),
    lostCallers: (missed: string, pct: string, result: string) => ({ label: "Callers lost a week (they don't try again)", working: `${missed} × ${pct}`, result }),
    lostCustomers: (callers: string, pct: string, result: string) => ({ label: 'Customers lost a month', working: `${callers} × ${pct} × 4.33 weeks`, result }),
    valuePerCustomer: (value: string, visits: string, years: string, result: string) => ({ label: 'Value of each customer', working: `${value} × ${visits} visits × ${years} years`, result }),
    perMonth: (customers: string, value: string, result: string) => ({ label: 'Revenue missed a month', working: `${customers} × ${value}`, result }),
    perYear: (month: string, result: string) => ({ label: 'Revenue missed a year', working: `${month} × 12`, result }),
  },
  recoverHeading: 'How to win it back',
  recover: 'Answer every call, text missed callers back within a minute or two, and cover evenings and weekends, whether that means a person, an answering service or an AI assistant.',
  ctaAlex: 'Hear how Alex would answer your calls',
  ctaPilot: 'Pilot Missed-Call Rescue',
  ctaWebsiteCheck: 'Run a free website check',
  shareHeading: 'Share or save',
  shareNote: 'The link keeps your numbers (no personal details), so you can bookmark it or send it to a partner.',
  copyLink: 'Copy link',
  copied: 'Link copied',
  copyFailed: 'Copy the address bar instead',

  form: {
    heading: 'Email me this estimate',
    intro: 'Optional. Your estimate stays on this page either way.',
    firstName: 'First name',
    email: 'Email address',
    businessName: 'Business name (optional)',
    phone: 'Mobile phone (optional)',
    honeypot: 'Leave this field empty',
    firstNameRequired: 'Please enter your first name.',
    submit: 'Email me this estimate',
    sending: 'Sending...',
    successTitle: 'Estimate on its way',
    successBefore: "We've sent your estimate to ",
    successAfter: ". Check your spam folder if it isn't there in a few minutes.",
    sendAnother: 'Send another version',
    errorBefore: 'Something went wrong sending your estimate. Please try again, or reach us directly at',
    errorOr: 'or',
  },

  /** The readable message that lands in the leads sheet and the follow-up email. */
  summary: (v: SummaryValues) => [
    'Missed-call cost estimate',
    '',
    'Inputs:',
    `- Calls per week: ${v.calls}`,
    `- Calls missed: ${v.missedPct}`,
    `- Missed callers who don't try again: ${v.noCallbackPct}`,
    `- Answered callers who become customers: ${v.conversionPct}`,
    `- Average value of a new customer: ${v.value}`,
    v.recurring ? `- Recurring: ${v.visits} visits a year for ${v.years} years` : '- Recurring: no',
    '',
    'Results (estimates):',
    `- Missed calls a week: ${v.missed}`,
    `- Callers lost a week: ${v.lostCallers}`,
    `- Customers lost a month: ${v.lostCustomers}`,
    ...(v.recurring ? [`- Value of each customer: ${v.valuePerCustomer}`] : []),
    `- Revenue missed a month: ${v.perMonth}`,
    `- Revenue missed a year: ${v.perYear}`,
    '',
    `Open this estimate: ${v.link}`,
  ].join('\n'),
};

const es: typeof en = {
  badge: 'Calculadora gratuita',
  title: '¿Cuánto le cuestan las llamadas perdidas?',
  intro: 'Ingrese sus propios números para estimar cuántos ingresos se pierden cuando nadie contesta. No se guarda ni se envía nada, a menos que nos pida enviarle la estimación por correo.',
  inputsHeading: 'Sus números',
  exampleNote: 'Números de ejemplo: use los suyos.',
  fields: {
    callsPerWeek: { label: 'Llamadas por semana', unit: 'llamadas' },
    missedPct: { label: 'Llamadas que no contesta', unit: '%', hint: 'Fuera de horario, en un trabajo o en otra línea.' },
    noCallbackPct: { label: 'Personas que no vuelven a llamar', unit: '%' },
    conversionPct: { label: 'Llamadas contestadas que se convierten en clientes', unit: '%' },
    customerValue: { label: 'Valor promedio de un cliente nuevo', unit: '$' },
    visitsPerYear: { label: 'Visitas por año', unit: 'visitas' },
    yearsRetained: { label: 'Años que se queda un cliente', unit: 'años' },
  },
  recurringLabel: 'Los clientes regresan (servicio recurrente)',
  recurringHint: 'Cuenta cada cliente perdido por su valor de por vida en lugar de un solo trabajo.',
  resultsHeading: 'Su estimación',
  headlineLabel: 'Ingresos estimados que podría estar perdiendo cada mes',
  perYear: (amount: string) => `Aproximadamente ${amount} al año`,
  estimateNote: 'Una estimación basada solo en los números que ingresó, no una garantía.',
  breakdownHeading: 'Cómo lo calculamos',
  steps: {
    missed: (calls, pct, result) => ({ label: 'Llamadas perdidas por semana', working: `${calls} llamadas × ${pct}`, result }),
    lostCallers: (missed, pct, result) => ({ label: 'Personas perdidas por semana (no vuelven a llamar)', working: `${missed} × ${pct}`, result }),
    lostCustomers: (callers, pct, result) => ({ label: 'Clientes perdidos por mes', working: `${callers} × ${pct} × 4.33 semanas`, result }),
    valuePerCustomer: (value, visits, years, result) => ({ label: 'Valor de cada cliente', working: `${value} × ${visits} visitas × ${years} años`, result }),
    perMonth: (customers, value, result) => ({ label: 'Ingresos perdidos por mes', working: `${customers} × ${value}`, result }),
    perYear: (month, result) => ({ label: 'Ingresos perdidos por año', working: `${month} × 12`, result }),
  },
  recoverHeading: 'Cómo recuperarlos',
  recover: 'Conteste todas las llamadas, envíe un mensaje de texto a quien no pudo atender en uno o dos minutos y cubra las noches y los fines de semana, ya sea con una persona, un servicio de contestación o un asistente de IA.',
  ctaAlex: 'Escuche cómo Alex contestaría sus llamadas',
  ctaPilot: 'Pruebe Missed-Call Rescue',
  ctaWebsiteCheck: 'Revise su sitio web gratis',
  shareHeading: 'Compartir o guardar',
  shareNote: 'El enlace conserva sus números (sin datos personales), para que pueda guardarlo o enviárselo a un socio.',
  copyLink: 'Copiar enlace',
  copied: 'Enlace copiado',
  copyFailed: 'Copie la barra de direcciones',

  form: {
    heading: 'Envíenme esta estimación',
    intro: 'Opcional. Su estimación se queda en esta página de todos modos.',
    firstName: 'Nombre',
    email: 'Correo electrónico',
    businessName: 'Nombre del negocio (opcional)',
    phone: 'Celular (opcional)',
    honeypot: 'Deje este campo vacío',
    firstNameRequired: 'Escriba su nombre.',
    submit: 'Envíenme esta estimación',
    sending: 'Enviando...',
    successTitle: 'Su estimación va en camino',
    successBefore: 'Enviamos su estimación a ',
    successAfter: '. Si no le llega en unos minutos, revise su carpeta de correo no deseado.',
    sendAnother: 'Enviar otra versión',
    errorBefore: 'Algo salió mal al enviar su estimación. Inténtelo de nuevo o escríbanos directamente a',
    errorOr: 'o llámenos al',
  },

  summary: (v) => [
    'Estimación del costo de las llamadas perdidas',
    '',
    'Datos:',
    `- Llamadas por semana: ${v.calls}`,
    `- Llamadas que no contesta: ${v.missedPct}`,
    `- Personas que no vuelven a llamar: ${v.noCallbackPct}`,
    `- Llamadas contestadas que se convierten en clientes: ${v.conversionPct}`,
    `- Valor promedio de un cliente nuevo: ${v.value}`,
    v.recurring ? `- Recurrente: ${v.visits} visitas al año durante ${v.years} años` : '- Recurrente: no',
    '',
    'Resultados (estimaciones):',
    `- Llamadas perdidas por semana: ${v.missed}`,
    `- Personas perdidas por semana: ${v.lostCallers}`,
    `- Clientes perdidos por mes: ${v.lostCustomers}`,
    ...(v.recurring ? [`- Valor de cada cliente: ${v.valuePerCustomer}`] : []),
    `- Ingresos perdidos por mes: ${v.perMonth}`,
    `- Ingresos perdidos por año: ${v.perYear}`,
    '',
    `Abrir esta estimación: ${v.link}`,
  ].join('\n'),
};

export default { en, es };
