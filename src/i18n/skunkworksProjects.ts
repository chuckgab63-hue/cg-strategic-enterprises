// "What we're building next" on /skunkworks: section copy, status labels and
// each project's text, keyed by the slug in src/config/skunkworksProjects.ts.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).
// Honesty rules apply in both languages: no upgraded statuses, metrics,
// results, client names or dates.

import type { ProjectStatus } from '../config/skunkworksProjects';

interface ProjectCopy {
  title: string;
  hook: string;
  description: string;
  builtOn: string[];
  note?: string;
  linkLabel?: string;
}

const en = {
  heading: "What we're building next",
  intro: "Automation ideas for local service businesses, at different stages. Each card says honestly where it stands. If one fits your business, we're looking for pilot partners.",
  statuses: {
    concept: { label: 'Concept', meaning: "An idea we're designing." },
    prototype: { label: 'Prototype', meaning: 'Working internally or in a pilot.' },
    'in-use': { label: 'In use with a client', meaning: 'Running in production.' },
  } as Record<ProjectStatus, { label: string; meaning: string }>,
  filters: { all: 'All', concept: 'Concept', prototype: 'Prototype', 'in-use': 'In use' } as Record<ProjectStatus | 'all', string>,
  filterGroupLabel: 'Filter projects by status',
  showing: (shown: number, total: number) => `Showing ${shown} of ${total} projects`,
  builtOnLabel: (title: string) => `${title} is built on`,
  pilotCta: 'Want to pilot this?',
  pilotAria: (title: string) => `Want to pilot ${title}?`,
  projects: {
    'missed-call-rescue': {
      title: 'Missed-Call Rescue',
      hook: 'Every missed call gets a callback within seconds.',
      description:
        'When a business misses a call, an AI assistant calls or texts the caller back within seconds. It finds out what they need and books them in, before they move on to the next company on the list.',
      builtOn: ['Retell AI', 'Twilio', 'Make.com'],
      note: 'Texting depends on carrier (A2P) approval.',
      linkLabel: 'What are missed calls costing you?',
    },
    'field-tech-voice-notes': {
      title: 'Field Tech Voice Notes',
      hook: 'Talk through the job. The paperwork writes itself.',
      description:
        'After a job, technicians speak into their phone. AI turns the recording into structured job notes, a chemical-use log and a customer summary for the CRM. It is hands-free, so it works for people wearing gloves.',
      builtOn: ['Speech-to-text', 'LLMs', 'CRM integrations'],
    },
    'ai-for-software-without-an-api': {
      title: 'AI for Software Without an API',
      hook: "Automation for the tools that won't connect to anything.",
      description:
        'Some business software has no API or webhooks, so nothing can plug into it. A browser agent logs in and handles routine tasks the way a person would: exporting reports, updating records and pulling invoices.',
      builtOn: ['Browser automation agents'],
    },
    'ask-your-business-anything': {
      title: 'Ask Your Business Anything',
      hook: 'Plain-English questions, answered from your own data.',
      description:
        'Owners ask questions like “How many termite jobs did we do in September?” or “Whose licenses expire this quarter?” and get answers drawn from their own records, without building a report.',
      builtOn: ['Supabase / Postgres', 'LLMs'],
    },
    'training-in-a-box': {
      title: 'Training in a Box',
      hook: 'A short script becomes a complete lesson.',
      description:
        'Write a short script and get back an AI-presented video lesson, a quiz and progress tracking, for onboarding new hires or exam prep. For example, a five-minute lesson on ladder safety with a ten-question quiz.',
      builtOn: ['AI video (HeyGen)', 'Google Forms', 'Supabase'],
    },
    'ai-search-visibility-monitor': {
      title: 'AI Search Visibility Monitor',
      hook: 'Find out whether AI assistants recommend you.',
      description:
        'Tracks whether ChatGPT, Claude, Gemini and Google’s AI answers mention a local business when people ask them for recommendations. Where they don’t, it suggests fixes.',
      builtOn: ['LLM APIs', 'Scheduled checks'],
    },
    'photo-diagnosis-quote': {
      title: 'Photo → Diagnosis → Quote',
      hook: 'A customer’s photo becomes a ready-to-quote lead.',
      description:
        'A customer uploads a photo of a pest or problem, AI makes a first-guess identification, and the lead arrives with the photo and a suggested service. We first built it as a pest analyzer; the same pattern works for plumbing, roofing and more.',
      builtOn: ['Google Gemini', 'Make.com'],
      linkLabel: 'Read the One Source case study',
    },
    'bilingual-voice-agent': {
      title: 'Bilingual Voice Agent',
      hook: 'English or Spanish, without “press 2.”',
      description:
        'An AI assistant for phone and web that switches between English and Spanish automatically, so callers can use whichever language they’re comfortable in.',
      builtOn: ['Retell AI'],
    },
    'proposal-autopilot': {
      title: 'Proposal Autopilot',
      hook: 'From discovery call to draft proposal.',
      description:
        'A recorded discovery call becomes a requirements summary, a scope and a draft proposal, so clients get a clear plan faster.',
      builtOn: ['Transcription', 'LLMs', 'Document generation'],
    },
  } as Record<string, ProjectCopy>,
};

const es: typeof en = {
  heading: 'Lo que estamos construyendo',
  intro: 'Ideas de automatización para negocios locales de servicios, en distintas etapas. Cada tarjeta indica con honestidad en qué punto está. Si alguna le sirve a su negocio, buscamos socios para pruebas piloto.',
  statuses: {
    concept: { label: 'Concepto', meaning: 'Una idea que estamos diseñando.' },
    prototype: { label: 'Prototipo', meaning: 'Funciona internamente o en una prueba piloto.' },
    'in-use': { label: 'En uso con un cliente', meaning: 'Funcionando en producción.' },
  },
  filters: { all: 'Todos', concept: 'Concepto', prototype: 'Prototipo', 'in-use': 'En uso' },
  filterGroupLabel: 'Filtrar proyectos por estado',
  showing: (shown, total) => `Mostrando ${shown} de ${total} proyectos`,
  builtOnLabel: title => `Tecnologías de ${title}`,
  pilotCta: '¿Quiere probarlo como piloto?',
  pilotAria: title => `¿Quiere probar ${title} como piloto?`,
  projects: {
    'missed-call-rescue': {
      title: 'Rescate de llamadas perdidas',
      hook: 'Cada llamada perdida recibe respuesta en segundos.',
      description:
        'Cuando un negocio pierde una llamada, un asistente de IA le devuelve la llamada o le escribe a esa persona en cuestión de segundos. Averigua qué necesita y le agenda la cita, antes de que pase a la siguiente empresa de la lista.',
      builtOn: ['Retell AI', 'Twilio', 'Make.com'],
      note: 'El envío de mensajes de texto depende de la aprobación de los operadores (A2P).',
      linkLabel: '¿Cuánto le cuestan las llamadas perdidas?',
    },
    'field-tech-voice-notes': {
      title: 'Notas de voz para técnicos de campo',
      hook: 'Cuente cómo fue el trabajo. El papeleo se hace solo.',
      description:
        'Después de un trabajo, los técnicos le hablan a su celular. La IA convierte la grabación en notas de trabajo ordenadas, un registro de uso de productos químicos y un resumen para el cliente en el CRM. No hace falta usar las manos, así que funciona aunque tengan los guantes puestos.',
      builtOn: ['Voz a texto', 'LLMs', 'Integraciones con CRM'],
    },
    'ai-for-software-without-an-api': {
      title: 'IA para software sin API',
      hook: 'Automatización para las herramientas que no se conectan con nada.',
      description:
        'Algunos programas para negocios no tienen API ni webhooks, así que nada puede conectarse con ellos. Un agente de navegador inicia sesión y se encarga de las tareas rutinarias como lo haría una persona: exportar informes, actualizar registros y descargar facturas.',
      builtOn: ['Agentes de automatización del navegador'],
    },
    'ask-your-business-anything': {
      title: 'Pregúntele lo que quiera a su negocio',
      hook: 'Preguntas en lenguaje sencillo, respondidas con sus propios datos.',
      description:
        'Los dueños hacen preguntas como “¿Cuántos trabajos de termitas hicimos en septiembre?” o “¿A quién se le vencen las licencias este trimestre?” y obtienen respuestas a partir de sus propios registros, sin tener que armar un informe.',
      builtOn: ['Supabase / Postgres', 'LLMs'],
    },
    'training-in-a-box': {
      title: 'Capacitación lista para usar',
      hook: 'Un guion breve se convierte en una lección completa.',
      description:
        'Escriba un guion breve y reciba una lección en video presentada por IA, un cuestionario y seguimiento del progreso, para la incorporación de personal nuevo o la preparación de exámenes. Por ejemplo, una lección de cinco minutos sobre seguridad con escaleras con un cuestionario de diez preguntas.',
      builtOn: ['Video con IA (HeyGen)', 'Google Forms', 'Supabase'],
    },
    'ai-search-visibility-monitor': {
      title: 'Monitor de visibilidad en búsquedas con IA',
      hook: 'Descubra si los asistentes de IA lo recomiendan.',
      description:
        'Revisa si ChatGPT, Claude, Gemini y las respuestas con IA de Google mencionan a un negocio local cuando las personas les piden recomendaciones. Si no lo mencionan, sugiere mejoras.',
      builtOn: ['APIs de LLM', 'Revisiones programadas'],
    },
    'photo-diagnosis-quote': {
      title: 'Foto → Diagnóstico → Cotización',
      hook: 'La foto de un cliente se convierte en un cliente potencial listo para cotizar.',
      description:
        'Un cliente sube una foto de una plaga o de un problema, la IA hace una primera identificación y el cliente potencial llega con la foto y un servicio sugerido. Primero lo creamos como un analizador de plagas; el mismo modelo funciona para plomería, techos y más.',
      builtOn: ['Google Gemini', 'Make.com'],
      linkLabel: 'Lea el caso de estudio de One Source',
    },
    'bilingual-voice-agent': {
      title: 'Agente de voz bilingüe',
      hook: 'Inglés o español, sin “oprima 2”.',
      description:
        'Un asistente de IA para teléfono y web que cambia entre inglés y español automáticamente, para que cada persona hable en el idioma con el que se sienta más cómoda.',
      builtOn: ['Retell AI'],
    },
    'proposal-autopilot': {
      title: 'Propuestas en piloto automático',
      hook: 'De la llamada inicial al borrador de propuesta.',
      description:
        'Una llamada inicial grabada se convierte en un resumen de requisitos, un alcance y un borrador de propuesta, para que los clientes reciban un plan claro más rápido.',
      builtOn: ['Transcripción', 'LLMs', 'Generación de documentos'],
    },
  },
};

export default { en, es };
