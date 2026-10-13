// Strings for the Property Ops Hub demo (src/components/PropertyWidget.tsx).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

// Categories come back from /api/triage-maintenance as these English values
// (and go to Make that way); only the label shown in the chat is translated.
type Category = 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'Structural' | 'General';

const LIMIT_EN = "You've reached today's usage limit for this demo (10 submissions). Check your email for details, or reach out to CG Strategic Enterprises directly to discuss your own embedded version.";

const en = {
  title: 'Property Ops Hub',
  liveDemo: 'Live Demo',
  assistantName: 'PROPERTY OPS AI',
  welcome: 'Property Ops Hub online. Choose an action below to get started.',
  uploadAlt: 'Upload',
  previewAlt: 'Preview',
  actions: {
    logProgress: 'Log Site Progress',
    reportMaintenance: 'Report Maintenance',
    scheduleShowing: 'Schedule Showing',
  },
  placeholders: {
    email: 'Your email',
    property: 'Which property?',
    siteLocation: 'Site location',
    crewNumber: 'Crew #',
    comment: 'Add a comment (optional)',
    propertyUnit: 'Property / unit',
    issue: 'Describe the issue (e.g. "kitchen sink is leaking under the cabinet")',
  },
  photoAttached: 'Photo attached',
  readyToSubmit: 'Ready to submit',
  removePhoto: 'Remove attached photo',
  uploadPhoto: 'Upload a photo',
  buttons: {
    booking: 'Booking...',
    bookShowing: 'Book Showing',
    cancel: 'Cancel',
    uploading: 'Uploading...',
    submitProgress: 'Submit Progress',
    analyzing: 'Analyzing...',
    submitReport: 'Submit Report',
  },
  typing: {
    analyzingRouting: 'Analyzing & routing...',
    uploading: 'Uploading...',
  },
  userProgress: (site: string, crew: string) => `Site: ${site} · Crew #${crew}`,
  userMaintenance: (property: string, issue: string) => `Property: ${property}\n${issue}`,
  userShowing: (property: string, slot: string) => `Showing request: ${property}\n${slot}`,
  limitReached: LIMIT_EN,
  progressLogged: "Logged. The photo is saved to the shared Drive folder, and this entry will roll up into tonight's digest email.",
  uploadFailed: 'Something went wrong uploading that — please try again.',
  highPriority: (category: Category) =>
    `Flagged as **HIGH priority** (${category}). Your ${category.toLowerCase()} contractor has been notified immediately.`,
  routine: (category: Category) =>
    `Logged as **routine** (${category}). This has been added to the maintenance queue for scheduled handling.`,
  submitFailed: 'Something went wrong submitting that — please try again.',
  slotTaken: (slot: string) => `Sorry, ${slot} was just booked by someone else. Please pick a different time.`,
  showingConfirmed: (property: string, slot: string) =>
    `Confirmed! Your showing for **${property}** is booked for **${slot}**. A confirmation has been sent to your email.`,
  bookingFailed: 'Something went wrong booking that — please try again.',
};

const ES_CATEGORY: Record<Category, string> = {
  Plumbing: 'Plomería',
  Electrical: 'Electricidad',
  HVAC: 'Aire acondicionado y calefacción',
  Appliance: 'Electrodomésticos',
  Structural: 'Estructura',
  General: 'General',
};

const es: typeof en = {
  title: 'Property Ops Hub',
  liveDemo: 'Demo en vivo',
  assistantName: 'IA DE PROPERTY OPS',
  welcome: 'Property Ops Hub en línea. Elija una acción para comenzar.',
  uploadAlt: 'Foto subida',
  previewAlt: 'Vista previa',
  actions: {
    logProgress: 'Registrar avance de obra',
    reportMaintenance: 'Reportar mantenimiento',
    scheduleShowing: 'Agendar una visita',
  },
  placeholders: {
    email: 'Su correo electrónico',
    property: '¿Qué propiedad?',
    siteLocation: 'Ubicación de la obra',
    crewNumber: 'N.º de cuadrilla',
    comment: 'Agregue un comentario (opcional)',
    propertyUnit: 'Propiedad / unidad',
    issue: 'Describa el problema (p. ej., "el fregadero de la cocina gotea debajo del gabinete")',
  },
  photoAttached: 'Foto adjunta',
  readyToSubmit: 'Lista para enviar',
  removePhoto: 'Quitar la foto adjunta',
  uploadPhoto: 'Subir una foto',
  buttons: {
    booking: 'Reservando...',
    bookShowing: 'Reservar visita',
    cancel: 'Cancelar',
    uploading: 'Subiendo...',
    submitProgress: 'Enviar avance',
    analyzing: 'Analizando...',
    submitReport: 'Enviar reporte',
  },
  typing: {
    analyzingRouting: 'Analizando y asignando...',
    uploading: 'Subiendo...',
  },
  userProgress: (site, crew) => `Obra: ${site} · Cuadrilla n.º ${crew}`,
  userMaintenance: (property, issue) => `Propiedad: ${property}\n${issue}`,
  userShowing: (property, slot) => `Solicitud de visita: ${property}\n${slot}`,
  limitReached: 'Alcanzó el límite de uso de hoy para esta demo (10 envíos). Revise su correo electrónico para más detalles o comuníquese directamente con CG Strategic Enterprises para hablar sobre su propia versión integrada.',
  progressLogged: 'Registrado. La foto se guardó en la carpeta compartida de Drive, y esta entrada se incluirá en el resumen que se envía por correo esta noche.',
  uploadFailed: 'Ocurrió un error al subir la foto. Inténtelo de nuevo.',
  highPriority: category =>
    `Marcado como **prioridad ALTA** (${ES_CATEGORY[category] ?? category}). Ya se notificó de inmediato al contratista correspondiente.`,
  routine: category =>
    `Registrado como **rutina** (${ES_CATEGORY[category] ?? category}). Se agregó a la lista de mantenimiento para atenderse en una fecha programada.`,
  submitFailed: 'Ocurrió un error al enviar el reporte. Inténtelo de nuevo.',
  slotTaken: slot => `Lo sentimos, alguien más acaba de reservar el horario ${slot}. Elija otro horario.`,
  showingConfirmed: (property, slot) =>
    `¡Confirmado! Su visita a **${property}** está reservada para el **${slot}**. Le enviamos una confirmación por correo electrónico.`,
  bookingFailed: 'Ocurrió un error al hacer la reserva. Inténtelo de nuevo.',
};

export default { en, es };
