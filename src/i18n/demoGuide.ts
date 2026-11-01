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
    "What's inside: every storefront page your customers use and every tab of the admin area your staff works in, from the weekly menu to checkout, weekly plans, build-your-own meals, referrals, delivery and pickup, labels and packing slips, inventory, surveys, exports, gift cards, the customer AI chat assistant and its Conversations page, food photo styling and Trend Finder, in English and Spanish, plus the three plans and how to turn features on in Settings > Features.",
  // Only what works in the live demo today (checked on demo.cgstrategic.dev).
  try: {
    title: 'What you can try in the demo',
    brand: 'Start with "Try it with your brand" to see the whole site with your name, logo and colors. The demo opens in English; the EN | ES switch at the top shows it all in Spanish.',
    customer: {
      title: 'As a customer',
      items: [
        'Browse the weekly menu and filter it by allergens, category and calories',
        'Ask the AI assistant about the menu in your own words, get meals with your prices, and pass a question to the kitchen (it answers from the sample menu, points allergy questions to the kitchen, and each visitor gets a few questions a day)',
        'Build your own bowl and watch its calories and macros change as you pick, or choose a size and add-ons on a meal',
        'Order a bundle of meals, and see the minimum order and per-meal minimums at the cart',
        'Start a weekly plan, then skip a week, pause, change your meals per week or cancel, all from My Plan',
        'Check out for delivery by ZIP code, or choose a pickup spot (the demo takes no real payment)',
        'Buy a gift card (the demo shows the code instead of charging or emailing it)',
        "Add the store to your phone's home screen and open it like an app",
        'Copy your referral link from your account page, and answer the short survey on a delivered order',
      ],
    },
    owner: {
      title: 'As the owner',
      items: [
        "See every subscriber and what they're doing this week: delivering, skipping or paused",
        'Set your ordering deadline and delivery days, and delivery zones by ZIP code, each with its own fee, minimum order and free-delivery amount',
        "Print a delivery day's route sheets, grouped by zone and in stop order",
        'Print meal labels generated from your own meal data (nutrition, ingredients, allergens) for you to review before use',
        'Print packing slips for each order, with use-by dates from your own shelf-life settings, for you to review',
        'Check stock at each kitchen, record a delivery or waste, and mark the week cooked to take its ingredients off stock',
        'See which sizes and add-ons sell, referral rewards, survey results and the sales tax report, and download CSV exports',
        'Manage pickup spots, coupons and gift cards',
        'Run more than one kitchen: choose the "Established" sample business in the brand panel to see two',
        'Choose the food photo styling your AI meal photos follow: lighting, camera angle, plate, background, color and garnish',
        "Ask us to show AI photos live on a walkthrough call: a style guide written from your menu's photos, then a photo of a dish with garnish only from its recipe, checked against its ingredients and allergens, waiting for your approval (each is a paid call, so they're off for visitors)",
        'Use Trend Finder to turn a trending dish into a hidden draft meal, with its recipe, nutrition and price, for you to review and publish',
        "Read the Conversations page: what customers asked the assistant, what it couldn't answer, and the questions passed to the kitchen",
        'Turn features on or off in Settings > Features, see what each plan (Basic, Advanced, Pro) includes, and see who would be emailed when you pause weekly-plan billing',
        "Ask us to show the demo as each plan on a call: the same store and admin area with only that plan's features",
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
    'Qué incluye: cada página de la tienda que usan sus clientes y cada sección del área de administración donde trabaja su personal, desde el menú semanal hasta el pago, los planes semanales, las comidas para armar, los referidos, las entregas y la recogida, las etiquetas y hojas de empaque, el inventario, las encuestas, las exportaciones, las tarjetas de regalo, el asistente de IA para clientes con su página de Conversaciones, el estilo de las fotos de sus platos y Trend Finder, en inglés y en español, además de los tres planes y cómo activar funciones en Configuración > Funciones.',
  try: {
    title: 'Lo que puede probar en la demo',
    // The demo opens in Spanish from this page (demoHref), so its names are the Spanish ones.
    brand: 'Empiece con "Pruébelo con su marca" para ver todo el sitio con su nombre, logotipo y colores. El selector EN | ES de arriba cambia el idioma de la demo.',
    customer: {
      title: 'Como cliente',
      items: [
        'Explorar el menú semanal y filtrarlo por alérgenos, categoría y calorías',
        'Preguntar al asistente de IA sobre el menú con sus propias palabras, recibir comidas con sus precios y pasar una pregunta a la cocina (responde con el menú de muestra, dirige las preguntas sobre alergias a la cocina, y cada visitante puede hacer unas pocas preguntas al día)',
        'Armar su propio bowl y ver cómo cambian sus calorías y macros mientras elige, o elegir el tamaño y los extras de una comida',
        'Pedir un paquete de comidas, y ver el pedido mínimo y los mínimos por comida en el carrito',
        'Empezar un plan semanal y luego saltar una semana, pausarlo, cambiar la cantidad de comidas por semana o cancelarlo, todo desde Mi plan',
        'Pagar con entrega a domicilio según su código postal, o elegir un punto de recogida (la demo no cobra de verdad)',
        'Comprar una tarjeta de regalo (la demo muestra el código en lugar de cobrarla o enviarla por correo)',
        'Agregar la tienda a la pantalla de inicio de su teléfono y abrirla como una app',
        'Copiar su enlace para recomendar desde Mi cuenta, y responder la encuesta corta de un pedido entregado',
      ],
    },
    owner: {
      title: 'Como dueño del negocio',
      items: [
        'Ver a cada suscriptor y lo que hace esta semana: recibe su entrega, la salta o tiene el plan en pausa',
        'Configurar su fecha límite para ordenar y sus días de entrega, y zonas de entrega por código postal, cada una con su propia tarifa, pedido mínimo y monto para entrega gratis',
        'Imprimir las hojas de ruta de un día de entrega, agrupadas por zona y en orden de paradas',
        'Imprimir etiquetas para cada comida generadas con los datos de sus propias comidas (nutrición, ingredientes, alérgenos), para que usted las revise antes de usarlas',
        'Imprimir hojas de empaque para cada pedido, con fechas límite de consumo calculadas con la vida útil que usted fija, para que usted las revise',
        'Revisar las existencias en cada cocina, registrar una entrega o una merma, y marcar la semana como cocinada para descontar sus ingredientes',
        'Ver qué tamaños y extras se venden, las recompensas por referidos, los resultados de las encuestas y el informe de impuesto sobre ventas, y descargar exportaciones CSV',
        'Administrar puntos de recogida, cupones y tarjetas de regalo',
        'Manejar más de una cocina: elija el negocio de ejemplo "Establecido" en el panel de marca para ver dos',
        'Elegir el estilo que siguen las fotos de sus comidas hechas con IA: iluminación, ángulo de cámara, plato, fondo, color y guarnición',
        'Pídanos que le mostremos las fotos con IA en vivo durante una llamada: una guía de estilo escrita a partir de las fotos de su menú y luego la foto de un plato, con guarnición solo de su receta, revisada contra sus ingredientes y alérgenos, que espera su aprobación (cada una tiene un costo, así que están desactivadas para los visitantes)',
        'Usar Trend Finder para convertir un platillo en tendencia en un borrador de comida oculto, con su receta, nutrición y precio, para que usted lo revise y lo publique',
        'Leer la página de Conversaciones: lo que los clientes le preguntaron al asistente, lo que no pudo responder y las preguntas enviadas a la cocina',
        'Activar o desactivar funciones en Configuración > Funciones, ver qué incluye cada plan (Básico, Avanzado, Pro) y ver a quién se le enviaría un correo si pausa los cobros de los planes semanales',
        'Pídanos que le mostremos la demo con cada plan durante una llamada: la misma tienda y la misma área de administración, solo con las funciones de ese plan',
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
