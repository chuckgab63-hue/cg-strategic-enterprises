// Strings for /ui-polish (src/pages/UIPolish.tsx). Technical names like
// group-hover, animate-ping, drop-shadow and backdrop-blur are Tailwind class
// names, so they stay in English.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  backToHub: '← BACK TO HUB',
  heading: { lead: 'Native ', accent: 'UI Polish.' },
  tagline: 'Efficiency Engineered. Growth Automated.',
  intro: 'Showcasing crisp, lightweight component interactions powered by Tailwind utility classes, combined with real-time, state-driven form validation.',
  hoverCard: {
    title: 'Hover State Mastery',
    subtitle: 'Tailwind Utility Engine',
    empty: 'Select a module for specs',
    status: 'Compiler Ready',
  },
  features: {
    plasma: {
      title: 'Plasma Sweep',
      desc: 'Translates a hidden pseudo-element across the X-axis using group-hover states, creating a fluid, hardware-accelerated magnetic fill without JavaScript.',
    },
    cyber: {
      title: 'Cyber Override',
      desc: "Combines Tailwind's native animate-ping utility with delayed opacity transitions to render a high-frequency glitch effect on demand.",
    },
    neon: {
      title: 'Neon Elevation',
      desc: 'Leverages complex drop-shadow utilities and negative Y-axis translations to simulate physical depth and volumetric light emission.',
    },
    frosted: {
      title: 'Frosted Glass',
      desc: 'Applies backdrop-blur filters over a multi-stop gradient with an opacity toggle, mimicking modern glassmorphism architecture natively.',
    },
  },
  inputCard: {
    title: 'Smart Input Architecture',
    subtitle: 'Real-Time Validation',
    successTitle: 'Sequence Initialized',
    successBody: 'Security parameters validated. Digital infrastructure ready for automated deployment.',
    reset: 'Reset Input',
    placeholder: 'Configure Security Key...',
    hidePassword: 'Hide password',
    showPassword: 'Show password',
    requirements: {
      length: 'At least 8 characters',
      number: 'Contains a number',
      special: 'Special character (!@#$%)',
    },
    submitReady: 'Initialize Sequence',
    submitWaiting: 'Awaiting Input',
  },
};

const es: typeof en = {
  backToHub: '← VOLVER AL INICIO',
  heading: { lead: 'Interfaz con ', accent: 'acabado nativo.' },
  tagline: 'Eficiencia diseñada. Crecimiento automatizado.',
  intro: 'Interacciones de componentes nítidas y ligeras, impulsadas por clases de utilidad de Tailwind, junto con validación de formularios en tiempo real basada en el estado.',
  hoverCard: {
    title: 'Dominio de estados hover',
    subtitle: 'Motor de utilidades de Tailwind',
    empty: 'Seleccione un módulo para ver los detalles',
    status: 'Compilador listo',
  },
  features: {
    plasma: {
      title: 'Barrido de plasma',
      desc: 'Desplaza un pseudoelemento oculto a lo largo del eje X con estados group-hover, lo que crea un relleno magnético fluido y acelerado por hardware, sin JavaScript.',
    },
    cyber: {
      title: 'Anulación cibernética',
      desc: 'Combina la utilidad nativa animate-ping de Tailwind con transiciones de opacidad retrasadas para generar, cuando se necesite, un efecto de falla de alta frecuencia.',
    },
    neon: {
      title: 'Elevación neón',
      desc: 'Aprovecha utilidades complejas de drop-shadow y desplazamientos negativos en el eje Y para simular profundidad física y emisión de luz volumétrica.',
    },
    frosted: {
      title: 'Vidrio esmerilado',
      desc: 'Aplica filtros backdrop-blur sobre un degradado de varios tonos con cambio de opacidad, e imita de forma nativa el estilo moderno de glassmorphism.',
    },
  },
  inputCard: {
    title: 'Arquitectura de campos inteligentes',
    subtitle: 'Validación en tiempo real',
    successTitle: 'Secuencia iniciada',
    successBody: 'Parámetros de seguridad validados. Infraestructura digital lista para la implementación automatizada.',
    reset: 'Restablecer campo',
    placeholder: 'Configure la clave de seguridad...',
    hidePassword: 'Ocultar contraseña',
    showPassword: 'Mostrar contraseña',
    requirements: {
      length: 'Al menos 8 caracteres',
      number: 'Contiene un número',
      special: 'Carácter especial (!@#$%)',
    },
    submitReady: 'Iniciar secuencia',
    submitWaiting: 'Esperando datos',
  },
};

export default { en, es };
