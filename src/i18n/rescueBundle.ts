// The Rescue Bundle card, shown on /missed-call-rescue and /dm-rescue in both
// languages. Plain TypeScript with no React, like the other offer copy.
//
// Every figure comes from RESCUE_BUNDLE in src/config/offers.ts, and the two
// it compares against — the separate totals and the savings — are derived
// there from the two offers' own prices. So changing Missed-Call Rescue's
// $497 or DM Rescue's $397 moves the struck-through totals and both savings
// on both pages and in both languages, and nothing here needs touching.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import { RESCUE_BUNDLE as BUNDLE, offerMoney } from '../config/offers.ts';

export {
  RESCUE_BUNDLE_ANCHOR, RESCUE_BUNDLE_CAMPAIGN, RESCUE_BUNDLE_PATH,
} from '../config/offers.ts';

const setupEn = offerMoney(BUNDLE.setupPrice, 'en');
const monthlyEn = offerMoney(BUNDLE.monthlyPrice, 'en');
const sepSetupEn = offerMoney(BUNDLE.separateSetupPrice, 'en');
const sepMonthlyEn = offerMoney(BUNDLE.separateMonthlyPrice, 'en');
const saveSetupEn = offerMoney(BUNDLE.setupSaving, 'en');
const saveMonthlyEn = offerMoney(BUNDLE.monthlySaving, 'en');

const setupEs = offerMoney(BUNDLE.setupPrice, 'es');
const monthlyEs = offerMoney(BUNDLE.monthlyPrice, 'es');
const sepSetupEs = offerMoney(BUNDLE.separateSetupPrice, 'es');
const sepMonthlyEs = offerMoney(BUNDLE.separateMonthlyPrice, 'es');
const saveSetupEs = offerMoney(BUNDLE.setupSaving, 'es');
const saveMonthlyEs = offerMoney(BUNDLE.monthlySaving, 'es');

const en = {
  /** The pill above the title: this is the one card on the page that is the best value. */
  eyebrow: 'Best value',
  title: 'Rescue Bundle: Calls + DMs',
  body: 'Every missed call gets a text back. Every DM gets an instant reply. You get a text alert for both.',
  setup: `${setupEn} one-time setup`,
  monthly: `${monthlyEn}/month`,
  term: 'Month to month. Cancel anytime.',
  /** The struck-through figures, and what a screen reader is told about them. */
  separateSetup: sepSetupEn,
  separateMonthly: `${sepMonthlyEn}/mo`,
  separateLabel: 'Bought separately:',
  badge: `Save ${saveSetupEn} up front and ${saveMonthlyEn}/mo`,
  cta: 'Book a 30-minute intro call',
  ctaNote: 'Free, and we rarely need the whole half hour.',
  /** The short link on a page whose own pricing block sits above the card. */
  jumpLink: 'Need both? See the Rescue Bundle',
  /** The homepage line under the two offer cards. */
  homeLink: `Need both? Get the Rescue Bundle and save ${saveSetupEn}`,
};

const es: typeof en = {
  eyebrow: 'La mejor opción',
  title: 'Paquete Rescate: Llamadas + Mensajes',
  body: 'Cada llamada perdida recibe un mensaje de texto de vuelta. Cada mensaje directo recibe una respuesta al instante. Usted recibe una alerta por texto de los dos.',
  setup: `${setupEs} de instalación por única vez`,
  monthly: `${monthlyEs} al mes`,
  term: 'Mes a mes. Cancele cuando quiera.',
  separateSetup: sepSetupEs,
  separateMonthly: `${sepMonthlyEs} al mes`,
  separateLabel: 'Por separado:',
  badge: `Ahorre ${saveSetupEs} al inicio y ${saveMonthlyEs} al mes`,
  cta: 'Agende una llamada de 30 minutos',
  // The "(Página en inglés.)" stays: the cal.com booking page has no Spanish.
  ctaNote: 'Gratis, y casi nunca usamos la media hora completa. (Página en inglés.)',
  jumpLink: '¿Necesita los dos? Vea el Paquete Rescate',
  homeLink: `¿Necesita los dos? Llévese el Paquete Rescate y ahorre ${saveSetupEs}`,
};

export default { en, es };
