// Strings for the Asset Tracker demo (src/components/AssetTrackerWidget.tsx).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  title: 'Asset Tracker',
  liveDemo: 'Live Demo',
  mapAlt: 'Map of active dumpster locations',
  loadingMap: 'Loading map...',
  noLocations: 'No active locations yet',
  mapUnavailable: 'Map unavailable (API key not configured)',
  noneDeployed: 'No dumpsters currently deployed.',
  open: 'Open',
  dropOff: 'Drop Off',
  markReturned: 'Mark Returned',
  emailPlaceholder: 'Your email',
  addressPlaceholder: 'Job site address',
  submitting: 'Submitting...',
  logDropOff: 'Log Drop-off',
  logReturn: 'Log Return',
  cancel: 'Cancel',
  limitReached: "You've reached today's usage limit for this demo (10 submissions). Check your email for details.",
  dropOffLogged: (email: string) => `Logged. A confirmation with a map link has been sent to ${email}.`,
  returnLogged: (depot: string) => `Logged as returned to ${depot}.`,
  failed: 'Something went wrong — please try again.',
  // Depot values go to Make in English; these are the labels shown.
  depots: {
    'North Yard': 'North Yard',
    'South Yard': 'South Yard',
    'Main Depot': 'Main Depot',
  } as Record<string, string>,
};

const es: typeof en = {
  title: 'Asset Tracker',
  liveDemo: 'Demo en vivo',
  mapAlt: 'Mapa de las ubicaciones activas de los contenedores',
  loadingMap: 'Cargando mapa...',
  noLocations: 'Todavía no hay ubicaciones activas',
  mapUnavailable: 'Mapa no disponible (falta configurar la clave de la API)',
  noneDeployed: 'No hay contenedores en uso en este momento.',
  open: 'Abrir',
  dropOff: 'Entregar',
  markReturned: 'Marcar como devuelto',
  emailPlaceholder: 'Su correo electrónico',
  addressPlaceholder: 'Dirección de la obra',
  submitting: 'Enviando...',
  logDropOff: 'Registrar entrega',
  logReturn: 'Registrar devolución',
  cancel: 'Cancelar',
  limitReached: 'Alcanzó el límite de uso de hoy para esta demo (10 envíos). Revise su correo electrónico para más detalles.',
  dropOffLogged: email => `Registrado. Enviamos una confirmación con un enlace al mapa a ${email}.`,
  returnLogged: depot => `Registrado como devuelto a ${depot}.`,
  failed: 'Ocurrió un error. Inténtelo de nuevo.',
  depots: {
    'North Yard': 'Patio Norte',
    'South Yard': 'Patio Sur',
    'Main Depot': 'Depósito principal',
  },
};

export default { en, es };
