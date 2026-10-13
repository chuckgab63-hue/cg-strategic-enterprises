// Strings for /fluid-dynamics (src/pages/FluidDynamics.tsx). Projects are in
// the same order as the page's PROJECT_STYLES.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  backToHub: '← BACK TO HUB',
  heading: { lead: 'Fluid ', accent: 'Dynamics.' },
  intro: 'Interact with physics-based layout transitions. Click any module to evaluate architectural specifications and request integration.',
  overview: 'Architectural Overview',
  capabilities: 'Core Capabilities',
  requestIntegration: 'Request Integration',
  close: 'Close',
  inquiry: (title: string) => `System Inquiry: Requesting integration details for the ${title} module.`,
  projects: [
    {
      title: 'Enterprise Lead Pipeline',
      category: 'WEB',
      desc: 'High-conversion lead generation architecture with automated CRM handoffs.',
      details: 'We engineer front-end landing pages that don’t just look good—they convert. By directly routing form submissions into your CRM via secure webhooks, we eliminate manual data entry and ensure your sales team responds to leads in seconds.',
      capabilities: ['Real-time CRM Sync', 'A/B Tested Layouts', 'Zero-Latency Routing'],
    },
    {
      title: 'Field Service Sync Engine',
      category: 'AUTOMATION',
      desc: 'Event-driven data pipelines synchronizing field service workflows.',
      details: 'Stop doing duplicate data entry. We build custom automation layers that listen for field service updates, automatically generating invoices, notifying customers, and updating your central dashboard without human intervention.',
      capabilities: ['Webhook Listening', 'Automated Invoicing', 'Multi-App Sync'],
    },
    {
      title: 'Procurement Ops Widget',
      category: 'AI',
      desc: 'Intelligent dashboard interface for real-time asset tracking and forecasting.',
      details: 'An embedded AI module designed to sit inside your existing ERP. It analyzes historical purchasing data, flags supply chain bottlenecks before they happen, and generates automated procurement requests for approval.',
      capabilities: ['ERP Integration', 'Predictive Analytics', 'Automated Purchasing'],
    },
    {
      title: 'AI Campaign Generator',
      category: 'AI',
      desc: 'Algorithmic video prompting matrix for scalable digital media deployment.',
      details: 'Scale your social presence exponentially. We utilize generative AI models to programmatically generate and iterate high-quality promotional video content based on your brand guidelines and trending audio profiles.',
      capabilities: ['Programmatic Rendering', 'Brand Guardrails', 'A/B Prompting'],
    },
    {
      title: 'Dynamic Lead Routing',
      category: 'AUTOMATION',
      desc: 'Logic-based form routing ensuring zero latency from capture to contact.',
      details: 'Not all leads are created equal. Our routing engine scores incoming inquiries based on budget and urgency, instantly pinging the right closer via Slack or SMS while sending a personalized holding email to the prospect.',
      capabilities: ['Lead Scoring', 'Instant SMS/Slack Pings', 'Conditional Logic'],
    },
    {
      title: 'CG Strategic Hub',
      category: 'WEB',
      desc: 'Interactive deployment center featuring high-fidelity frontend engineering.',
      details: 'Your digital presence should be an experience. We utilize React, Tailwind, and GSAP/Framer Motion to build immersive, hardware-accelerated web applications that prove your technical competence before a client ever speaks to you.',
      capabilities: ['State-Driven UI', 'Physics Animations', 'Component Architecture'],
    },
  ],
};

const es: typeof en = {
  backToHub: '← VOLVER AL INICIO',
  heading: { lead: 'Dinámica ', accent: 'de fluidos.' },
  intro: 'Interactúe con transiciones de diseño basadas en física. Haga clic en cualquier módulo para ver sus especificaciones de arquitectura y solicitar la integración.',
  overview: 'Resumen de arquitectura',
  capabilities: 'Capacidades principales',
  requestIntegration: 'Solicitar integración',
  close: 'Cerrar',
  inquiry: (title: string) => `Consulta sobre sistemas: solicito detalles de integración del módulo ${title}.`,
  projects: [
    {
      title: 'Embudo empresarial de clientes potenciales',
      category: 'WEB',
      desc: 'Arquitectura de generación de clientes potenciales de alta conversión, con traspaso automático al CRM.',
      details: 'Diseñamos páginas de destino que no solo se ven bien: convierten. Al enviar los formularios directamente a su CRM mediante webhooks seguros, eliminamos la captura manual de datos y su equipo de ventas puede responder a los clientes potenciales en segundos.',
      capabilities: ['Sincronización con el CRM en tiempo real', 'Diseños con pruebas A/B', 'Enrutamiento sin demoras'],
    },
    {
      title: 'Motor de sincronización para servicio de campo',
      category: 'AUTOMATIZACIÓN',
      desc: 'Flujos de datos basados en eventos que sincronizan los procesos de servicio de campo.',
      details: 'Deje de capturar los mismos datos dos veces. Creamos capas de automatización a la medida que detectan las actualizaciones del servicio de campo y, sin intervención humana, generan facturas, avisan a los clientes y actualizan su panel central.',
      capabilities: ['Escucha de webhooks', 'Facturación automatizada', 'Sincronización entre varias apps'],
    },
    {
      title: 'Widget de operaciones de compras',
      category: 'IA',
      desc: 'Panel inteligente para el seguimiento de activos y los pronósticos en tiempo real.',
      details: 'Un módulo de IA integrado, diseñado para funcionar dentro de su ERP actual. Analiza el historial de compras, detecta cuellos de botella en la cadena de suministro antes de que ocurran y genera solicitudes de compra automáticas para su aprobación.',
      capabilities: ['Integración con ERP', 'Análisis predictivo', 'Compras automatizadas'],
    },
    {
      title: 'Generador de campañas con IA',
      category: 'IA',
      desc: 'Matriz algorítmica de instrucciones para video, para publicar contenido digital a gran escala.',
      details: 'Multiplique su presencia en redes sociales. Usamos modelos de IA generativa para crear y perfeccionar de forma programática videos promocionales de alta calidad, basados en las pautas de su marca y en los audios en tendencia.',
      capabilities: ['Renderizado programático', 'Límites de marca', 'Instrucciones con pruebas A/B'],
    },
    {
      title: 'Enrutamiento dinámico de clientes potenciales',
      category: 'AUTOMATIZACIÓN',
      desc: 'Enrutamiento de formularios basado en reglas, sin demoras entre la captura y el contacto.',
      details: 'No todos los clientes potenciales son iguales. Nuestro motor de enrutamiento califica cada consulta según el presupuesto y la urgencia, avisa al instante al vendedor indicado por Slack o SMS y, mientras tanto, le envía al prospecto un correo personalizado.',
      capabilities: ['Calificación de clientes potenciales', 'Avisos instantáneos por SMS/Slack', 'Lógica condicional'],
    },
    {
      title: 'CG Strategic Hub',
      category: 'WEB',
      desc: 'Centro de implementación interactivo con ingeniería frontend de alta fidelidad.',
      details: 'Su presencia digital debe ser una experiencia. Usamos React, Tailwind y GSAP/Framer Motion para crear aplicaciones web inmersivas y aceleradas por hardware que demuestran su capacidad técnica antes de que un cliente hable con usted.',
      capabilities: ['Interfaz basada en estado', 'Animaciones con física', 'Arquitectura de componentes'],
    },
  ],
};

export default { en, es };
