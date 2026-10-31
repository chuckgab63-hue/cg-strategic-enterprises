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
    "What's inside: every storefront page your customers use and every tab of the admin area your staff works in, from the weekly menu to checkout, weekly plans, delivery and pickup, labels, gift cards, food photo styling and Trend Finder.",
  // Only what works in the live demo today (checked on demo.cgstrategic.dev).
  try: {
    title: 'What you can try in the demo',
    brand: 'Start with "Try it with your brand" to see the whole site with your name, logo and colors.',
    customer: {
      title: 'As a customer',
      items: [
        'Browse the weekly menu and filter it by allergens, category and calories',
        'Start a weekly plan, then skip a week, pause, change your meals per week or cancel, all from My Plan',
        'Check out for delivery by ZIP code, or choose a pickup spot (the demo takes no real payment)',
        'Buy a gift card (the demo shows the code instead of charging or emailing it)',
        "Add the store to your phone's home screen and open it like an app",
      ],
    },
    owner: {
      title: 'As the owner',
      items: [
        "See every subscriber and what they're doing this week: delivering, skipping or paused",
        'Set your ordering deadline and delivery days, and delivery zones by ZIP code, each with its own fee, minimum order and free-delivery amount',
        "Print a delivery day's route sheets, grouped by zone and in stop order",
        'Print meal labels generated from your own meal data (nutrition, ingredients, allergens) for you to review before use',
        'Manage pickup spots, coupons and gift cards',
        'Run more than one kitchen: choose the "Established" sample business in the brand panel to see two',
        'Choose the food photo styling your AI meal photos follow: lighting, camera angle, plate, background, color and garnish',
        'Use Trend Finder to turn a trending dish into a hidden draft meal, with its recipe, nutrition and price, for you to review and publish',
      ],
    },
  },
  screens: {
    title: 'A look inside the demo',
    items: [
      { src: '/guides/screens/n10_subscriptions.webp', alt: 'The demo admin Subscriptions page: every subscriber with their plan and whether they are delivering, skipping or paused this week' },
      { src: '/guides/screens/n12_zones.webp', alt: 'The demo admin Delivery page: delivery zones by ZIP code, each with its own delivery day, fee, minimum order and free-delivery amount' },
      { src: '/guides/screens/n13_routes.webp', alt: "The demo admin Routes page: a delivery day's stops grouped by zone, with print, CSV and Google Maps buttons" },
      { src: '/guides/screens/t4_accepted.webp', alt: 'Trend Finder in the demo admin: an accepted idea saved as a draft meal, with its sources, nutrition and ingredient costs' },
    ],
  },
  setup: {
    title: 'Done for you',
    body: 'We set it up for you, with your menu, plans, delivery zones and branding, and move your existing customers over. Built for small and mid-sized meal prep businesses in Florida, with support in English and Spanish.',
  },
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
    'Qué incluye: cada página de la tienda que usan sus clientes y cada sección del área de administración donde trabaja su personal, desde el menú semanal hasta el pago, los planes semanales, las entregas y la recogida, las etiquetas, las tarjetas de regalo, el estilo de las fotos de sus platos y Trend Finder.',
  try: {
    title: 'Lo que puede probar en la demo',
    // The panel's name stays in English: that's what the demo shows.
    brand: 'Empiece con "Try it with your brand" para ver todo el sitio con su nombre, logotipo y colores.',
    customer: {
      title: 'Como cliente',
      items: [
        'Explorar el menú semanal y filtrarlo por alérgenos, categoría y calorías',
        'Empezar un plan semanal y luego saltar una semana, pausarlo, cambiar la cantidad de comidas por semana o cancelarlo, todo desde My Plan',
        'Pagar con entrega a domicilio según su código postal, o elegir un punto de recogida (la demo no cobra de verdad)',
        'Comprar una tarjeta de regalo (la demo muestra el código en lugar de cobrarla o enviarla por correo)',
        'Agregar la tienda a la pantalla de inicio de su teléfono y abrirla como una app',
      ],
    },
    owner: {
      title: 'Como dueño del negocio',
      items: [
        'Ver a cada suscriptor y lo que hace esta semana: recibe su entrega, la salta o tiene el plan en pausa',
        'Configurar su fecha límite para ordenar y sus días de entrega, y zonas de entrega por código postal, cada una con su propia tarifa, pedido mínimo y monto para entrega gratis',
        'Imprimir las hojas de ruta de un día de entrega, agrupadas por zona y en orden de paradas',
        'Imprimir etiquetas para cada comida generadas con los datos de sus propias comidas (nutrición, ingredientes, alérgenos), para que usted las revise antes de usarlas',
        'Administrar puntos de recogida, cupones y tarjetas de regalo',
        'Manejar más de una cocina: elija el negocio de ejemplo "Established" en el panel de marca para ver dos',
        'Elegir el estilo que siguen las fotos de sus comidas hechas con IA: iluminación, ángulo de cámara, plato, fondo, color y guarnición',
        'Usar Trend Finder para convertir un platillo en tendencia en un borrador de comida oculto, con su receta, nutrición y precio, para que usted lo revise y lo publique',
      ],
    },
  },
  screens: {
    title: 'Un vistazo a la demo',
    items: [
      { src: '/guides/screens/n10_subscriptions.webp', alt: 'La página de suscripciones del área de administración de la demo: cada suscriptor con su plan y si esta semana recibe su entrega, la salta o tiene el plan en pausa' },
      { src: '/guides/screens/n12_zones.webp', alt: 'La página de entregas del área de administración de la demo: zonas de entrega por código postal, cada una con su día de entrega, tarifa, pedido mínimo y monto para entrega gratis' },
      { src: '/guides/screens/n13_routes.webp', alt: 'La página de rutas del área de administración de la demo: las paradas de un día de entrega agrupadas por zona, con botones para imprimir, descargar CSV y abrir Google Maps' },
      { src: '/guides/screens/t4_accepted.webp', alt: 'Trend Finder en el área de administración de la demo: una idea aceptada guardada como borrador de comida, con sus fuentes, nutrición y costos de ingredientes' },
    ],
  },
  setup: {
    title: 'Nosotros lo configuramos',
    body: 'Lo configuramos por usted, con su menú, sus planes, sus zonas de entrega y su marca, y pasamos a sus clientes actuales al nuevo sistema. Hecho para negocios pequeños y medianos de comidas preparadas en Florida, con atención en inglés y en español.',
  },
  closing: {
    title: '¿Quiere que se la mostremos?',
    body: 'Llame al (904) 822-8929. Si Chuck no puede contestar, le atiende Alex, nuestro asistente de IA. O haga clic en Hablemos para llamar desde su navegador.',
    call: 'Llamar al (904) 822-8929',
    letsTalk: 'Hablemos',
  },
  service: 'Conozca el sistema de pedidos para comidas preparadas',
};

export default { en, es };
