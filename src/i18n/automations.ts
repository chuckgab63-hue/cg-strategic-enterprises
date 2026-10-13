// /automations ("The Engine") strings. Workflow text is keyed by the workflow
// id used in src/pages/Automations.tsx.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

interface Workflow {
  title: string;
  desc: string;
  trigger: string;
  actions: string[];
  outcome: string;
}

const en = {
  backToHub: 'BACK TO HUB',
  titleA: 'System ',
  titleB: 'Automations.',
  intro: 'Efficiency Engineered. Growth Automated. Fast integrations that save time and close deals.',
  heroAlt: 'Enterprise Infrastructure & Telemetry',
  telemetryBadge: (n: number) => `Active Telemetry & Sync (${n} ${n === 1 ? 'Cluster' : 'Clusters'})`,
  heroTitle: 'Real-Time Data Orchestration',
  pipelinesOnline: 'Pipelines Online',
  cognitiveTitle: 'Cognitive Infrastructure Engineering',
  cognitive: {
    a: 'Rigid, out-of-the-box software forces you to adapt your business to its limitations. We do the exact opposite. By integrating ',
    claude: "Anthropic's Claude AI",
    b: ' directly into our ',
    make: 'Make.com',
    c: " deployment pipeline, we don't just use AI to run your workflows—we use it to ",
    build: 'build',
    d: ' them. We dynamically translate your exact operational rules into live, executable API scenarios with zero templates and zero compromises.',
  },
  speedTitle: 'Enterprise-Grade Deployment at AI Speed',
  speedBody: 'Bespoke integrations that traditionally take months of development are mapped, tested, and deployed in a matter of days. You get flawless data routing engineered specifically for your operations. And when your business needs to pivot, your infrastructure pivots with it instantly.',
  nodeWebhookIn: 'Webhook In',
  nodeMakeLogic: 'Make Logic',
  nodeApiOut: 'API Out',
  workflowsTitle: 'Pre-Engineered Workflows',
  workflowsIntro: 'Click any module to map its logical execution sequence.',
  runwayEyebrow: 'See It In Action',
  runwayTitle: 'Explore Case Studies.',
  close: 'Close',
  contextLabel: 'Workflow Context',
  deploy: 'Deploy This Engine',
  sequenceLabel: 'Execution Sequence',
  trigger: 'Trigger:',
  action: 'Action:',
  outcome: 'Outcome:',
  contactMessage: (title: string) => `System Inquiry: Requesting deployment protocols for the ${title} engine.`,
  workflows: {
    'lead-capture': {
      title: 'Omni-Channel Lead Capture',
      desc: 'Instantly catch leads from social forms, your website, or Google Local Services, and funnel them into one unified database.',
      trigger: 'New Lead Submission (Any Source)',
      actions: ['Normalize Data Payload', 'Check for Duplicates', 'Route to Central DB'],
      outcome: '100% Lead Retention',
    },
    'sms-dispatch': {
      title: 'Zero-Touch SMS Dispatch',
      desc: 'Trigger an immediate, personalized text message to a new lead within 10 seconds of form submission. Never lose a lead to a competitor again.',
      trigger: 'New Record Created in DB',
      actions: ['Evaluate Lead Score', 'Select Template', 'Dispatch via SMS API'],
      outcome: 'Instant Engagement',
    },
    'crm-sync': {
      title: 'Enterprise CRM Syncing',
      desc: 'Push data directly into industry-specific CRMs. Keep your sales, support, and field teams perfectly aligned in real-time.',
      trigger: 'Lifecycle Stage Change',
      actions: ['Format Payload for API', 'Push to Target CRM', 'Sync Unique IDs'],
      outcome: 'Data Parity Across Stack',
    },
    'invoice-gen': {
      title: 'Automated Invoicing',
      desc: 'Generate and dispatch digital invoices the moment a job is marked complete in the field, accelerating cash flow.',
      trigger: 'Job Status -> Complete',
      actions: ['Calculate Line Items', 'Generate PDF Document', 'Email to Client'],
      outcome: 'Zero-Day Billing',
    },
    'review-request': {
      title: 'Reputation Management Loop',
      desc: 'Automatically request reviews from satisfied clients while routing negative feedback to an internal escalation queue.',
      trigger: 'Invoice Marked Paid',
      actions: ['Send NPS Survey', 'Filter by Score', 'Request Review / Alert Manager'],
      outcome: 'Organic Rating Growth',
    },
    'stale-nurture': {
      title: 'Stale Lead Revival',
      desc: 'Detect leads that have gone dark and automatically drop them into a long-term SMS and email nurture sequence.',
      trigger: 'Inactivity > 30 Days',
      actions: ['Tag as Stale in CRM', 'Add to Nurture Campaign', 'Monitor for Reply'],
      outcome: 'Reactivated Revenue',
    },
  } as Record<string, Workflow>,
};

const es: typeof en = {
  backToHub: 'VOLVER AL INICIO',
  titleA: 'Automatización de ',
  titleB: 'sistemas.',
  intro: 'Eficiencia diseñada. Crecimiento automatizado. Integraciones rápidas que ahorran tiempo y cierran ventas.',
  heroAlt: 'Infraestructura empresarial y telemetría',
  telemetryBadge: (n: number) => `Telemetría y sincronización activas (${n} ${n === 1 ? 'grupo' : 'grupos'})`,
  heroTitle: 'Orquestación de datos en tiempo real',
  pipelinesOnline: 'Flujos de datos activos',
  cognitiveTitle: 'Ingeniería de infraestructura cognitiva',
  cognitive: {
    a: 'El software rígido y genérico le obliga a adaptar su negocio a sus limitaciones. Nosotros hacemos exactamente lo contrario. Al integrar ',
    claude: 'Claude AI de Anthropic',
    b: ' directamente en nuestro proceso de implementación en ',
    make: 'Make.com',
    c: ', no solo usamos la IA para ejecutar sus flujos de trabajo: la usamos para ',
    build: 'construirlos',
    d: '. Traducimos dinámicamente sus reglas operativas exactas en escenarios de API activos y ejecutables, sin plantillas y sin concesiones.',
  },
  speedTitle: 'Implementación de nivel empresarial a la velocidad de la IA',
  speedBody: 'Las integraciones a la medida que tradicionalmente toman meses de desarrollo se diseñan, se prueban y se implementan en cuestión de días. Usted obtiene un enrutamiento de datos impecable, diseñado específicamente para sus operaciones. Y cuando su negocio necesite cambiar de rumbo, su infraestructura cambia con él al instante.',
  nodeWebhookIn: 'Webhook de entrada',
  nodeMakeLogic: 'Lógica de Make',
  nodeApiOut: 'API de salida',
  workflowsTitle: 'Flujos de trabajo prediseñados',
  workflowsIntro: 'Haga clic en cualquier módulo para ver su secuencia lógica de ejecución.',
  runwayEyebrow: 'Véalo en acción',
  runwayTitle: 'Explore los casos de estudio.',
  close: 'Cerrar',
  contextLabel: 'Contexto del flujo',
  deploy: 'Implementar este motor',
  sequenceLabel: 'Secuencia de ejecución',
  trigger: 'Disparador:',
  action: 'Acción:',
  outcome: 'Resultado:',
  contactMessage: (title: string) => `Consulta del sistema: solicito los protocolos de implementación del motor "${title}".`,
  workflows: {
    'lead-capture': {
      title: 'Captura omnicanal de clientes potenciales',
      desc: 'Capte al instante clientes potenciales desde formularios de redes sociales, su sitio web o Google Local Services, y canalícelos a una sola base de datos unificada.',
      trigger: 'Nuevo cliente potencial recibido (cualquier fuente)',
      actions: ['Normalizar los datos recibidos', 'Buscar duplicados', 'Enviar a la base de datos central'],
      outcome: '100% de retención de clientes potenciales',
    },
    'sms-dispatch': {
      title: 'Envío de SMS sin intervención',
      desc: 'Envíe un mensaje de texto inmediato y personalizado a un nuevo cliente potencial en menos de 10 segundos después de que envíe el formulario. No vuelva a perder un cliente potencial frente a la competencia.',
      trigger: 'Nuevo registro creado en la base de datos',
      actions: ['Evaluar la puntuación del cliente potencial', 'Seleccionar la plantilla', 'Enviar mediante la API de SMS'],
      outcome: 'Contacto inmediato',
    },
    'crm-sync': {
      title: 'Sincronización con CRM empresarial',
      desc: 'Envíe datos directamente a CRM especializados en su industria. Mantenga a sus equipos de ventas, soporte y campo perfectamente alineados en tiempo real.',
      trigger: 'Cambio de etapa del ciclo de vida',
      actions: ['Dar formato a los datos para la API', 'Enviar al CRM de destino', 'Sincronizar identificadores únicos'],
      outcome: 'Datos consistentes en todos sus sistemas',
    },
    'invoice-gen': {
      title: 'Facturación automatizada',
      desc: 'Genere y envíe facturas digitales en el momento en que un trabajo se marca como completado en campo, para acelerar el flujo de efectivo.',
      trigger: 'Estado del trabajo -> Completado',
      actions: ['Calcular las partidas', 'Generar el documento PDF', 'Enviar por correo electrónico al cliente'],
      outcome: 'Facturación el mismo día',
    },
    'review-request': {
      title: 'Ciclo de gestión de reputación',
      desc: 'Solicite reseñas automáticamente a los clientes satisfechos y envíe los comentarios negativos a una cola interna de escalamiento.',
      trigger: 'Factura marcada como pagada',
      actions: ['Enviar encuesta NPS', 'Filtrar por puntuación', 'Solicitar reseña / Alertar al gerente'],
      outcome: 'Crecimiento orgánico de calificaciones',
    },
    'stale-nurture': {
      title: 'Reactivación de clientes potenciales inactivos',
      desc: 'Detecte los clientes potenciales que dejaron de responder e inclúyalos automáticamente en una secuencia de seguimiento a largo plazo por SMS y correo electrónico.',
      trigger: 'Inactividad > 30 días',
      actions: ['Etiquetar como inactivo en el CRM', 'Agregar a la campaña de seguimiento', 'Monitorear respuestas'],
      outcome: 'Ingresos reactivados',
    },
  },
};

export default { en, es };
