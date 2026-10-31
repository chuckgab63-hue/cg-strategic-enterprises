// /demo-guide and /es/demo-guide: the meal-prep demo's walkthrough guide.
// The PDFs (public/guides) do the heavy lifting; this page introduces them.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';

export const DEMO_GUIDE_PATH = '/demo-guide';

/** Each language's PDF. */
export const DEMO_GUIDE_PDF: Record<Lang, string> = {
  en: '/guides/meal-prep-demo-guide-en.pdf',
  es: '/guides/meal-prep-demo-guide-es.pdf',
};

const en = {
  eyebrow: 'Meal Prep Ordering System',
  title: 'Meal-Prep Ordering Demo: Walkthrough Guide',
  intro: 'A page-by-page tour of the live demo storefront and admin area, so you can see what your customers and your staff each get.',
  download: 'Download the guide (PDF)',
  openDemo: 'Open the live demo',
  newTab: '(opens in a new tab)',
  previewTitle: 'Preview of the demo walkthrough guide (PDF)',
  previewFallback: "Your browser can't show the guide here.",
  inside:
    "What's inside: every storefront page your customers use, the full ordering flow from menu to checkout, weekly subscriptions customers can skip, pause or change, delivery zones with route sheets, printable meal labels, food photo styling that matches AI photos of your real dishes to your menu, each tab of the admin area your staff works in, and Trend Finder, which turns trending dishes into draft meals for you to review.",
  closing: {
    title: 'Want us to walk you through it?',
    body: "Call (904) 822-8929. If Chuck can't pick up, Alex, our AI assistant, answers. Or click Let's Talk to start a call from your browser.",
    call: 'Call (904) 822-8929',
    letsTalk: "Let's Talk",
  },
  service: 'About the meal prep ordering system',
};

const es: typeof en = {
  eyebrow: 'Sistema de pedidos para comidas preparadas',
  title: 'Demo de pedidos para meal prep: guía paso a paso',
  intro: 'Un recorrido, página por página, por la tienda y el área de administración de la demo en vivo, para que vea lo que reciben sus clientes y su personal.',
  download: 'Descargar la guía (PDF)',
  openDemo: 'Abrir la demo en vivo',
  newTab: '(se abre en una pestaña nueva)',
  previewTitle: 'Vista previa de la guía de la demo (PDF)',
  previewFallback: 'Su navegador no puede mostrar la guía aquí.',
  inside:
    'Qué incluye: cada página de la tienda que usan sus clientes, el proceso completo de pedido desde el menú hasta el pago, suscripciones semanales que sus clientes pueden saltar, pausar o cambiar, zonas de entrega con hojas de ruta, etiquetas imprimibles para cada comida, opciones de estilo para que las fotos con IA de sus platos reales combinen con su menú, cada sección del área de administración donde trabaja su personal y Trend Finder, que convierte platillos en tendencia en borradores de comidas para que usted los revise.',
  closing: {
    title: '¿Quiere que se la mostremos?',
    body: 'Llame al (904) 822-8929. Si Chuck no puede contestar, le atiende Alex, nuestro asistente de IA. O haga clic en Hablemos para llamar desde su navegador.',
    call: 'Llamar al (904) 822-8929',
    letsTalk: 'Hablemos',
  },
  service: 'Conozca el sistema de pedidos para comidas preparadas',
};

export default { en, es };
