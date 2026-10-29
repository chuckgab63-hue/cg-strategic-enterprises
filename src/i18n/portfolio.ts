// /portfolio page copy: the case studies index. The case study cards have
// their own files (caseStudyCard.ts). Spanish: NEEDS NATIVE REVIEW
// (docs/SPANISH_REVIEW.md); `backToHome` and `comingSoon` are new, not yet reviewed.

const en = {
  backToHome: 'BACK TO HOME',
  title: ['Case ', 'Studies.'],
  intro: 'A selection of high-fidelity frontend engineering and automated infrastructure deployments.',
  comingSoon: {
    text: 'More case studies coming soon. Want to be next?',
    cta: 'Run a free website check',
  },
  next: {
    eyebrow: 'Next Frontier',
    title: 'Explore Skunkworks.',
  },
};

const es: typeof en = {
  backToHome: 'VOLVER AL INICIO',
  title: ['Casos de ', 'estudio.'],
  intro: 'Una selección de proyectos de ingeniería frontend de alta fidelidad e implementaciones de infraestructura automatizada.',
  comingSoon: {
    text: 'Pronto habrá más casos de estudio. ¿Quiere ser el próximo?',
    cta: 'Haga una revisión gratuita de su sitio',
  },
  next: {
    eyebrow: 'La próxima frontera',
    title: 'Explore Skunkworks.',
  },
};

export default { en, es };
