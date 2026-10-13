// Pest photo diagnosis demo on /portfolio (AnalysisWidget). The AI's report
// keeps its English field labels (DUVAL HUB REPORT, PRIORITY, PEST SPECIES...)
// in both languages because the widget parses them; only what's shown here is
// translated. Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  welcome: 'Senior Diagnostic Architect online. I am reviewing pest data for Northeast Florida properties. Upload a photo or describe the threat, and I will cross-reference local databases to confirm the species.',
  quickQuestions: [
    'ARE PALMETTO BUGS DANGEROUS?',
    'SIGNS OF TERMITES IN JAX?',
    'STOPPING FIRE ANTS?',
    'SAFE PEST CONTROL FOR PETS?',
  ],
  noText: 'Diagnostic review complete, but no text was returned.',
  // Must keep the demo number 555-555-0100 as written: the widget turns it into a call link.
  dispatch: '\n\nOur Duval/Beaches dispatch team is currently optimizing routes for your area; we will contact you shortly with the next available window. For further assistance, you can reach our local hub at 555-555-0100.\n\n',
  errorGeneric: 'Error: Communication with Duval Hub intercepted. Check the console for routing failures.',
  errorCapacity: 'RESOURCE_EXHAUSTED: The Duval Hub Architect is currently at capacity. Please call **555-555-0100** to reach a technician directly.',
  notAvailable: 'N/A',
  reportTitle: 'Duval Hub Report',
  status: (priority: string) => `${priority} STATUS`,
  pestSpecies: 'Pest Species',
  structuralRisk: 'Structural Risk',
  assignedHub: 'Assigned Hub',
  targetArea: 'Target Area',
  demoLogged: '✓ Demo Logged',
  logDemo: 'Log Successful Demo',
  protocolActive: 'Protocol Active',
  callDispatch: 'Call Dispatch',
  userUploadAlt: 'User Upload',
  analyzing: 'Analyzing...',
  imageAttached: 'Image Attached',
  readyForAnalysis: 'Ready for analysis',
  uploadPreviewAlt: 'Upload preview',
  uploadPhoto: 'Upload a photo',
  placeholder: 'Diagnostics...',
  send: 'Send message',
};

const es: typeof en = {
  welcome: 'Arquitecto Sénior de Diagnóstico en línea. Estoy revisando datos de plagas de propiedades del noreste de Florida. Suba una foto o describa la amenaza, y consultaré las bases de datos locales para confirmar la especie.',
  quickQuestions: [
    '¿SON PELIGROSAS LAS CUCARACHAS PALMETTO?',
    '¿SEÑALES DE TERMITAS EN JAX?',
    '¿CÓMO DETENER LAS HORMIGAS DE FUEGO?',
    '¿CONTROL DE PLAGAS SEGURO PARA MASCOTAS?',
  ],
  noText: 'Revisión de diagnóstico completa, pero no se recibió ningún texto.',
  dispatch: '\n\nNuestro equipo de despacho de Duval/Beaches está optimizando las rutas para su zona; nos comunicaremos con usted en breve con el próximo horario disponible. Si necesita más ayuda, puede comunicarse con nuestro centro local al 555-555-0100.\n\n',
  errorGeneric: 'Error: se interrumpió la comunicación con Duval Hub. Revise la consola para ver las fallas de enrutamiento.',
  errorCapacity: 'RESOURCE_EXHAUSTED: el Arquitecto de Duval Hub está al máximo de su capacidad en este momento. Llame al **555-555-0100** para hablar directamente con un técnico.',
  notAvailable: 'N/D',
  reportTitle: 'Informe de Duval Hub',
  status: (priority: string) => `ESTADO: ${priority}`,
  pestSpecies: 'Especie de plaga',
  structuralRisk: 'Riesgo estructural',
  assignedHub: 'Centro asignado',
  targetArea: 'Zona objetivo',
  demoLogged: '✓ Demostración registrada',
  logDemo: 'Registrar demostración exitosa',
  protocolActive: 'Protocolo activo',
  callDispatch: 'Llamar a despacho',
  userUploadAlt: 'Imagen subida por el usuario',
  analyzing: 'Analizando...',
  imageAttached: 'Imagen adjunta',
  readyForAnalysis: 'Lista para analizar',
  uploadPreviewAlt: 'Vista previa de la imagen',
  uploadPhoto: 'Subir una foto',
  placeholder: 'Diagnóstico...',
  send: 'Enviar mensaje',
};

export default { en, es };
