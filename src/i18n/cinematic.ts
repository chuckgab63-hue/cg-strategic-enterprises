// Strings for /cinematic (src/pages/CinematicSequences.tsx).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  backToHome: '← BACK TO HOME',
  heading: { lead: 'CINEMATIC ', accent: 'SCALE.' },
  tagline: 'Efficiency Engineered. Growth Automated.',
  scrollHint: 'Scroll down to see how it works.',
  // Phase 3's title is split so its last word gets the gradient.
  phases: [
    {
      label: 'Phase 1',
      title: 'The Audit.',
      accent: '',
      description: "We don't guess. We map your exact processes, find the hidden revenue leaks, and identify the manual, repetitive work that is stealing your time.",
    },
    {
      label: 'Phase 2',
      title: 'The Engineering.',
      accent: '',
      description: 'We build custom digital infrastructure. From seamless CRM integrations to client portals, we engineer the systems that allow you to scale without adding headcount.',
    },
    {
      label: 'Phase 3',
      title: 'Automated ',
      accent: 'Growth.',
      description: 'Lead routing, automated invoicing, and intelligent support. Your business runs 24/7, delivering flawless client experiences while you step back from the daily grind.',
    },
  ],
  cta: 'Start Your Transformation',
};

const es: typeof en = {
  backToHome: '← VOLVER AL INICIO',
  heading: { lead: 'ESCALA ', accent: 'DE CINE.' },
  tagline: 'Eficiencia diseñada. Crecimiento automatizado.',
  scrollHint: 'Desplácese hacia abajo para ver cómo funciona.',
  phases: [
    {
      label: 'Fase 1',
      title: 'La auditoría.',
      accent: '',
      description: 'No adivinamos. Analizamos a fondo sus procesos, encontramos las fugas de ingresos ocultas e identificamos el trabajo manual y repetitivo que le está robando tiempo.',
    },
    {
      label: 'Fase 2',
      title: 'La ingeniería.',
      accent: '',
      description: 'Construimos infraestructura digital a la medida. Desde integraciones fluidas con su CRM hasta portales para clientes, diseñamos los sistemas que le permiten crecer sin contratar más personal.',
    },
    {
      label: 'Fase 3',
      title: 'Crecimiento ',
      accent: 'automatizado.',
      description: 'Distribución de clientes potenciales, facturación automatizada y soporte inteligente. Su negocio funciona las 24 horas, los 7 días de la semana, y ofrece experiencias impecables a sus clientes mientras usted deja atrás la rutina diaria.',
    },
  ],
  cta: 'Comience su transformación',
};

export default { en, es };
