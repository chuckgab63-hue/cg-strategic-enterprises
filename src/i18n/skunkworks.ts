// /skunkworks page copy: header, voicebot architecture section and detail
// modal, and the spatial commerce viewer. The "What we're building next"
// section is in skunkworksProjects.ts.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

type VoicebotId = 'inbound-dispatch' | 'stale-lead' | 'order-lookup' | 'conversational-qual';
type RoomKey = 'livingRoom' | 'kitchen' | 'bedroom';
type StyleKey = 'source' | 'cleared' | 'midCentury' | 'industrial';

interface VoicebotCopy {
  title: string;
  shortDesc: string;
  fullDesc: string;
  trigger: string;
  actions: string[];
  outcome: string;
}

const en = {
  badge: 'Active R&D Laboratory',
  titlePrefix: 'The ',
  intro: 'A look inside our active development pipeline. These are the bleeding-edge systems, prototypes, and integrations we are engineering to define the next era of automated growth.',

  voicebotTitle: 'Advanced Voicebot Architecture',
  voicebotSubtitle: 'Conversational AI routed directly into your operational stack.',
  voicebotStatus: 'In Prototyping',
  discussDeployment: 'Discuss Deployment',
  discussMessage: "Skunkworks Inquiry: Let's discuss deploying the Voicebot Architecture for my business.",
  voicebots: {
    'inbound-dispatch': {
      title: '24/7 Intelligent Dispatcher',
      shortDesc: 'Replacing the traditional IVR. The AI answers natively, triages the emergency level, and instantly fires webhooks.',
      fullDesc: 'Instead of forcing callers through frustrating phone trees ("Press 1 for Sales"), the AI answers natively and converses naturally. It listens to the issue, assesses urgency based on your custom criteria (e.g., active leak vs. billing question), and routes the data immediately via Make.com to on-call technicians or internal ticketing systems.',
      trigger: 'Inbound Call Received',
      actions: ['Transcribe & Analyze Intent', 'Assess Urgency Matrix', 'Fire Make.com Webhook'],
      outcome: 'Instant Routing & Alert',
    },
    'stale-lead': {
      title: 'Stale Lead Reactivator',
      shortDesc: 'Voicebots that dial. Triggers outbound check-in calls to dormant leads to book appointments directly onto your calendar.',
      fullDesc: 'Stop letting old leads gather dust in your CRM. When a prospect goes dormant for a set period (e.g., 60 days), the system automatically triggers the voicebot to initiate an outbound call. It engages them with a personalized, contextual script and can securely book follow-up appointments directly into your sales calendar live on the phone.',
      trigger: 'CRM Status == Dormant > 60 Days',
      actions: ['Initiate Outbound Call', 'Execute Contextual Script', 'Sync Live with Calendar API'],
      outcome: 'Reactivated Revenue',
    },
    'order-lookup': {
      title: 'API-Driven Order Lookup',
      shortDesc: 'Connecting voice to data. Customers speak their order number, and the bot dynamically reads back live shipping statuses.',
      fullDesc: 'Eliminate Tier-1 support queries entirely. When a customer calls asking "Where is my order?", the voicebot captures their order number and instantly queries your Shopify, Stripe, or fulfillment API webhooks. It synthesizes the live tracking data into natural speech, providing accurate ETAs without ever involving a human agent.',
      trigger: 'Caller Requests Order Status',
      actions: ['Extract Order ID', 'Query E-Commerce Webhook', 'Synthesize ETA Response'],
      outcome: 'Zero-Touch Deflection',
    },
    'conversational-qual': {
      title: 'Conversational Qualification',
      shortDesc: 'Replacing web forms with conversation. The AI guides callers through discovery and posts formatted data to your CRM.',
      fullDesc: 'Drop click-to-call links in your ad campaigns and let the AI do the heavy lifting. The voicebot navigates your custom discovery framework—asking about budget, timeline, and project scope. It processes the entire conversation, structures the extracted data into a clean JSON payload, and posts it directly into your CRM for the sales team.',
      trigger: 'Click-to-Call Ad Engaged',
      actions: ['Conduct Discovery Framework', 'Extract BANT Data', 'Post JSON Payload to CRM'],
      outcome: 'Pre-Qualified Pipeline',
    },
  } as Record<VoicebotId, VoicebotCopy>,
  modal: {
    close: 'Close',
    context: 'Strategic Context',
    requestSpecs: 'Request Architecture Specs',
    specsMessage: (title: string) => `System Inquiry: Requesting architecture specs for the ${title} voicebot.`,
    sequence: 'Execution Sequence',
    trigger: 'Trigger:',
    action: 'Action:',
    outcome: 'Outcome:',
  },

  spatialTitle: 'Spatial Commerce & AI Restaging',
  spatialSubtitle: 'Interactive virtual environments wired to retail APIs and generative models.',
  spatialStatus: 'Classified // Initializing',
  spatialParagraphs: [
    { lead: 'Beyond the Read-Only Panorama:', body: ' Legacy tools like Zillow 3D Home provide static, read-only tours. We are engineering interactive spatial commerce. Instead of a dead photo, our engine allows users to interact with the environment in real-time.' },
    { lead: 'Generative Clearing & Restyling:', body: ' Using Serverless GPUs running Segment Anything (SAM 2) and Stable Diffusion XL, users can instantly "Clear the Room" of existing clutter via AI inpainting, and then drop in completely new design sets (Mid-Century, Industrial) that respect the original room geometry.' },
    { lead: 'Shoppable Real Estate:', body: ' Bounding boxes generated by the AI are mapped to multimodal embeddings, querying live retail feeds. Buyers can click a generated sofa during a tour and instantly buy the physical counterpart via an affiliate link. Initialize the engine and click the couch below to test the payload.' },
  ],
  source2d: 'Source 2D',
  init3d: 'Initialize 3D Engine',

  viewer: {
    imageAlt: 'Virtual Staging Engine',
    rooms: { livingRoom: 'Living Room', kitchen: 'Kitchen', bedroom: 'Master Suite' } as Record<RoomKey, string>,
    styleLabel: 'Style:',
    styles: { source: 'Original', cleared: 'Cleared', midCentury: 'Mid-Century', industrial: 'Industrial' } as Record<StyleKey, string>,
    styleButtons: {
      source: 'Original Room',
      cleared: 'Clear Room (Inpainting)',
      midCentury: 'Mid-Century Modern',
      industrial: 'Industrial Loft',
    } as Record<StyleKey, string>,
    restage: 'AI Restage',
    product: { title: 'Moda Sectional Sofa', price: '$2,499.00', store: 'West Elm API' },
    closeProduct: 'Close',
    buyNow: 'Buy Now',
    enterFullscreen: 'Enter Fullscreen',
    walkToKitchen: 'Walk to Kitchen',
    backToLivingRoom: 'Back to Living Room',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    floor: 'Floor 1',
    mapHint: 'Jump to panorama by tapping a blue dot.',
    fullscreenTitle: 'Interactive Spatial Viewer',
    closeTour: 'Close Tour (Esc)',
  },

  pilotMessage: (title: string) => `Pilot inquiry: ${title}. I'd like to talk about piloting this for my business.`,
};

const es: typeof en = {
  badge: 'Laboratorio activo de I+D',
  titlePrefix: 'El ',
  intro: 'Un vistazo a lo que tenemos en desarrollo. Estos son los sistemas, prototipos e integraciones de vanguardia que estamos creando para definir la próxima etapa del crecimiento automatizado.',

  voicebotTitle: 'Arquitectura avanzada de bots de voz',
  voicebotSubtitle: 'IA conversacional conectada directamente a las herramientas con las que opera su negocio.',
  voicebotStatus: 'En prototipo',
  discussDeployment: 'Hablemos de implementarlo',
  discussMessage: 'Consulta de Skunkworks: me gustaría hablar sobre implementar la arquitectura de bots de voz en mi negocio.',
  voicebots: {
    'inbound-dispatch': {
      title: 'Despachador inteligente 24/7',
      shortDesc: 'Reemplaza el menú telefónico tradicional. La IA contesta de forma natural, evalúa el nivel de urgencia y activa webhooks al instante.',
      fullDesc: 'En lugar de obligar a quienes llaman a pasar por menús telefónicos frustrantes ("Oprima 1 para Ventas"), la IA contesta y conversa de forma natural. Escucha el problema, evalúa la urgencia según sus propios criterios (por ejemplo, una fuga activa frente a una pregunta de facturación) y envía los datos de inmediato mediante Make.com a los técnicos de guardia o a sus sistemas internos de tickets.',
      trigger: 'Se recibe una llamada entrante',
      actions: ['Transcribir y analizar la intención', 'Evaluar la matriz de urgencia', 'Activar el webhook de Make.com'],
      outcome: 'Enrutamiento y alerta inmediatos',
    },
    'stale-lead': {
      title: 'Reactivador de clientes potenciales inactivos',
      shortDesc: 'Bots de voz que hacen llamadas. Inician llamadas de seguimiento a clientes potenciales inactivos para agendar citas directamente en su calendario.',
      fullDesc: 'No deje que los clientes potenciales antiguos se queden olvidados en su CRM. Cuando un prospecto pasa cierto tiempo inactivo (por ejemplo, 60 días), el sistema activa automáticamente el bot de voz para hacer una llamada saliente. Lo atiende con un guion personalizado y en contexto, y puede agendar de forma segura citas de seguimiento directamente en su calendario de ventas, en vivo durante la llamada.',
      trigger: 'Estado en el CRM == Inactivo > 60 días',
      actions: ['Iniciar la llamada saliente', 'Ejecutar el guion contextual', 'Sincronizar en vivo con la API del calendario'],
      outcome: 'Ingresos reactivados',
    },
    'order-lookup': {
      title: 'Consulta de pedidos por API',
      shortDesc: 'Voz conectada a sus datos. El cliente dice su número de pedido y el bot le lee el estado del envío en tiempo real.',
      fullDesc: 'Elimine por completo las consultas básicas de soporte. Cuando un cliente llama para preguntar "¿Dónde está mi pedido?", el bot de voz toma su número de pedido y consulta al instante los webhooks de Shopify, Stripe o de su API de logística. Convierte los datos de rastreo en tiempo real en voz natural y da fechas estimadas de entrega precisas sin que intervenga ningún agente humano.',
      trigger: 'La persona pide el estado de su pedido',
      actions: ['Extraer el número de pedido', 'Consultar el webhook de la tienda en línea', 'Generar la respuesta con la fecha estimada'],
      outcome: 'Resuelto sin intervención humana',
    },
    'conversational-qual': {
      title: 'Calificación conversacional',
      shortDesc: 'Conversaciones en lugar de formularios web. La IA guía a quienes llaman por las preguntas de evaluación y envía los datos ordenados a su CRM.',
      fullDesc: 'Agregue enlaces de clic para llamar a sus campañas de anuncios y deje que la IA haga el trabajo pesado. El bot de voz sigue su propio proceso de evaluación: pregunta por el presupuesto, los plazos y el alcance del proyecto. Procesa toda la conversación, organiza los datos obtenidos en un JSON limpio y los envía directamente a su CRM para el equipo de ventas.',
      trigger: 'Se usa un anuncio de clic para llamar',
      actions: ['Realizar el proceso de evaluación', 'Extraer los datos BANT', 'Enviar el JSON al CRM'],
      outcome: 'Clientes potenciales ya calificados',
    },
  },
  modal: {
    close: 'Cerrar',
    context: 'Contexto estratégico',
    requestSpecs: 'Solicitar especificaciones',
    specsMessage: title => `Consulta de sistema: solicito las especificaciones de la arquitectura del bot de voz "${title}".`,
    sequence: 'Secuencia de ejecución',
    trigger: 'Disparador:',
    action: 'Acción:',
    outcome: 'Resultado:',
  },

  spatialTitle: 'Comercio espacial y reambientación con IA',
  spatialSubtitle: 'Entornos virtuales interactivos conectados a APIs de comercios minoristas y a modelos generativos.',
  spatialStatus: 'Confidencial // En preparación',
  spatialParagraphs: [
    { lead: 'Más allá del recorrido de solo lectura:', body: ' Herramientas tradicionales como Zillow 3D Home ofrecen recorridos estáticos, de solo lectura. Nosotros estamos creando comercio espacial interactivo. En lugar de una foto sin vida, nuestro motor permite a los usuarios interactuar con el entorno en tiempo real.' },
    { lead: 'Vaciado y rediseño generativos:', body: ' Con GPU sin servidor que ejecutan Segment Anything (SAM 2) y Stable Diffusion XL, los usuarios pueden "vaciar la habitación" al instante, eliminando lo que haya mediante inpainting con IA, y luego colocar estilos de diseño completamente nuevos (Mid-Century, Industrial) que respetan la geometría original de la habitación.' },
    { lead: 'Bienes raíces que se pueden comprar:', body: ' La IA genera recuadros que se asocian a embeddings multimodales para consultar catálogos de tiendas en tiempo real. Durante un recorrido, el comprador puede hacer clic en un sofá generado y comprar al instante el producto real mediante un enlace de afiliado. Inicie el motor y haga clic en el sofá de abajo para probarlo.' },
  ],
  source2d: 'Original 2D',
  init3d: 'Iniciar motor 3D',

  viewer: {
    imageAlt: 'Motor de ambientación virtual',
    rooms: { livingRoom: 'Sala', kitchen: 'Cocina', bedroom: 'Habitación principal' },
    styleLabel: 'Estilo:',
    styles: { source: 'Original', cleared: 'Vacía', midCentury: 'Mid-Century', industrial: 'Industrial' },
    styleButtons: {
      source: 'Habitación original',
      cleared: 'Vaciar la habitación (inpainting)',
      midCentury: 'Moderno de mediados de siglo',
      industrial: 'Loft industrial',
    },
    restage: 'Reambientar con IA',
    product: { title: 'Sofá seccional Moda', price: '$2,499.00', store: 'West Elm API' },
    closeProduct: 'Cerrar',
    buyNow: 'Comprar ahora',
    enterFullscreen: 'Ver en pantalla completa',
    walkToKitchen: 'Ir a la cocina',
    backToLivingRoom: 'Volver a la sala',
    zoomOut: 'Alejar',
    zoomIn: 'Acercar',
    floor: 'Piso 1',
    mapHint: 'Toque un punto azul para ir a esa vista panorámica.',
    fullscreenTitle: 'Visor espacial interactivo',
    closeTour: 'Cerrar recorrido (Esc)',
  },

  pilotMessage: title => `Consulta sobre prueba piloto: ${title}. Me gustaría hablar sobre una prueba piloto de esto en mi negocio.`,
};

export default { en, es };
