// The pest control case study card on the homepage and /portfolio
// (src/components/PestCaseStudyCard.tsx). No client name, logo or results
// claims: the site hasn't launched yet.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). New, not yet reviewed.

const en = {
  badge: 'Case study · Pest control',
  title: 'A Full Rebuild for a Florida Pest Control Company',
  body: 'A fast new website, an AI phone assistant, a photo-based pest identifier that turns uploads into leads, automated lead handling, and a private admin area for staff licensing, training and hiring.',
  chips: ['AI phone assistant', 'Photo pest ID', 'Lead automation', 'Admin portal'],
  cta: 'Read the case study',
  imageAlt: 'The private admin area from the build: a dashboard of staff credentials that are expired or expiring soon (demo data).',
};

const es: typeof en = {
  badge: 'Caso de estudio · Control de plagas',
  title: 'Una renovación completa para una empresa de control de plagas en Florida',
  body: 'Un sitio web nuevo y rápido, un asistente telefónico con IA, un identificador de plagas por foto que convierte cada imagen en un cliente potencial, manejo automatizado de clientes potenciales y un área privada de administración para las licencias, la capacitación y la contratación del personal.',
  chips: ['Asistente telefónico con IA', 'Identificación de plagas por foto', 'Automatización de clientes potenciales', 'Portal de administración'],
  cta: 'Leer el caso de estudio',
  imageAlt: 'El área privada de administración del proyecto: un panel con las credenciales del personal vencidas o por vencer (datos de demostración).',
};

export default { en, es };
