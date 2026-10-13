// Tax engine demo on /portfolio (TaxWidget).
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  title: 'Dynamic Tax Engine',
  connected: 'API Connected',
  orderSummary: 'Order Summary',
  item: 'Premium Tech Bundle',
  calculateLabel: 'Calculate Local Tax',
  zipPlaceholder: 'Zip Code (e.g. 32224)',
  update: 'Update',
  salesTax: 'Sales Tax',
  fetching: 'Fetching...',
  pending: 'Pending',
  total: 'Total',
  /** Shown when the ZIP doesn't match one of the demo's sample cities. */
  localMunicipality: 'Local Municipality',
};

const es: typeof en = {
  title: 'Motor dinámico de impuestos',
  connected: 'API conectada',
  orderSummary: 'Resumen del pedido',
  item: 'Paquete tecnológico premium',
  calculateLabel: 'Calcular impuesto local',
  zipPlaceholder: 'Código postal (p. ej., 32224)',
  update: 'Calcular',
  salesTax: 'Impuesto sobre las ventas',
  fetching: 'Consultando...',
  pending: 'Pendiente',
  total: 'Total',
  localMunicipality: 'Municipio local',
};

export default { en, es };
