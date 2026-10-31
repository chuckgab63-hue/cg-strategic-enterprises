// /meal-prep-ordering and /es/meal-prep-ordering. Plain TypeScript with no
// React, so vite.config.ts can also write the FAQ and its JSON-LD into the
// pre-rendered HTML (src/i18n/prerender.ts).
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { FaqItem } from './faq.ts';

/** Picks a "What's included" card's icon in MealPrepOrdering.tsx. */
export type IncludedIcon = 'plans' | 'zones' | 'routes' | 'pickup' | 'labels' | 'gift' | 'app' | 'photo' | 'trend';

interface IncludedItem {
  icon: IncludedIcon;
  title: string;
  body: string;
}

export const MEAL_PREP_ORDERING_PATH = '/meal-prep-ordering';
export const DEMO_MENU_URL = 'https://demo.cgstrategic.dev/menu';
export const DEMO_ADMIN_URL = 'https://demo.cgstrategic.dev/admin';

const en = {
  eyebrow: 'Meal Prep Ordering System',
  title: 'Online Ordering System for Meal Prep Businesses',
  intro: "Taking orders through DMs, texts and spreadsheets works until it doesn't. A meal prep ordering system lets customers order and subscribe on their own while your week organizes itself. We set it up for you and move your customers over, for small and mid-sized meal prep businesses in Florida, in English and Spanish.",
  ctaDemo: 'Try the demo',
  ctaAlex: 'Talk to Alex',
  live: {
    title: 'See it live',
    body: 'Order as a customer and manage a weekly plan, then see the same week from the kitchen side: subscribers, delivery routes, labels and what to cook.',
    customerDemo: 'Customer demo',
    adminDemo: 'Admin demo',
    newTab: '(opens in a new tab)',
    brandNote: 'In the demo, open the "Try it with your brand" panel to add your own logo and colors.',
    guide: 'Download the demo guide',
  },
  // "What's included": only features checked working in the live demo
  // (demo.cgstrategic.dev). The icon names are drawn in MealPrepOrdering.tsx.
  included: {
    title: "What's included",
    intro: 'Set up for you, with your menu and customers moved over. Everything here works in the live demo today.',
    cta: 'Try the demo',
    items: [
      { icon: 'plans', title: 'Weekly plans', body: 'Customers subscribe, then skip a week, pause, change or cancel on their own before your deadline.' },
      { icon: 'zones', title: 'Delivery zones and deadlines', body: 'Each ZIP code zone has its own fee, minimum order and free-delivery amount, and orders close at your deadline.' },
      { icon: 'routes', title: 'Route sheets', body: "Each delivery day's stops, grouped by zone and in order, ready to print." },
      { icon: 'pickup', title: 'Pickup and more kitchens', body: 'Pickup spots at checkout, and a second kitchen with its own zones and menu when you grow.' },
      { icon: 'labels', title: 'Printable labels', body: 'Meal labels generated from your own meal data (nutrition, ingredients, allergens) for you to review before use.' },
      { icon: 'gift', title: 'Coupons and gift cards', body: 'Run promotions, and sell gift cards for any amount that customers redeem at checkout.' },
      { icon: 'app', title: 'Installable app', body: 'Customers add your store to their home screen and open it like an app.' },
      { icon: 'photo', title: 'Food photo styling', body: 'Choose the lighting, angle, plate, background, color and garnish for AI photos of your real dishes.' },
      { icon: 'trend', title: 'Trend Finder', body: 'Turns trending dishes into draft meals, with recipe, nutrition and price, for you to review and publish.' },
    ] as IncludedItem[],
  },
  admin: {
    title: 'What the admin area does',
    items: [
      'Weekly menu with your ordering deadline and delivery days',
      'Every order and every subscriber in one place, with who is delivering, skipping or paused this week',
      'Delivery zones by ZIP code, each with its own fee, minimum order and free-delivery amount',
      'Route sheets for each delivery day, grouped by zone and in stop order',
      'Pickup spots, and more than one kitchen when you grow',
      'A weekly production plan with combined prep and shopping lists, ready to print',
      'Printable meal labels generated from your own meal data, for you to review before use',
      'Ingredient costs and suppliers',
      'Analytics, including repeat rate and churn',
      "An AI assistant that helps customers choose meals and shows you what they ask for that the menu doesn't have yet",
      'Coupons, gift cards and review approval',
      'Food photo styling settings for AI photos of your real dishes',
      'Trend Finder, which turns trending dishes into draft meals for you to review',
    ],
  },
  migrate: {
    title: 'Bring your customers with you',
    body: 'Setup is done for you. We import your existing customers and menu from a spreadsheet or the system you use today, so nobody has to sign up again, and plan the switch-over date with you.',
  },
  data: {
    title: 'Your business, your data',
    body: 'Your customer and order data, your domain and your Stripe account always belong to your business. The platform runs on our hosting and care plan, which keeps it updated, backed up and running.',
    link: 'How ownership works',
  },
  more: {
    title: 'More than software',
    intro: 'Optional growth help, when you want it:',
    items: [
      'Google Business Profile setup',
      'Menu and cutoff reminders by text and email',
      'Review requests after delivery',
      'QR cards for delivery bags',
    ],
  },
  calculator: {
    body: 'Planning or growing a meal prep business? Run your numbers with our free calculator.',
    link: 'Open the Meal Prep Business Calculator',
  },
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      id: 'weekly-orders',
      question: 'Can customers order every week without starting over?',
      answer: 'Yes. Customers have their own accounts, so each week they sign in, pick from the new menu and check out without re-entering their details. They can also subscribe to a weekly plan and skip, pause or change it before your deadline.',
    },
    {
      id: 'cutoff-and-delivery-days',
      question: 'Can I keep my order cutoff and delivery days?',
      answer: 'Yes. Your cutoff and delivery days are settings in the admin area, so you set them to match how you run your week.',
    },
    {
      id: 'move-customers',
      question: 'Can I move my existing customers over?',
      answer: "Yes. We import your customers from a spreadsheet or the system you use today, so they don't have to sign up again.",
    },
    {
      id: 'own-data',
      question: 'Do I own my customer data?',
      answer: 'Yes. Your customer and order data, domain and Stripe account always belong to your business, and you can export your data at any time.',
    },
    {
      id: 'cost',
      question: 'How much does it cost?',
      answer: "It's priced after a short look at how you run orders today. The intro call is free.",
    },
  ] as FaqItem[],
  closing: {
    title: 'Ready to stop chasing orders?',
    body: 'Try the demo, then talk to Alex to set up a free intro call.',
  },
};

const es: typeof en = {
  eyebrow: 'Sistema de pedidos para comidas preparadas',
  title: 'Sistema de pedidos en línea para negocios de comidas preparadas',
  intro: 'Tomar pedidos por mensajes directos, textos y hojas de cálculo funciona hasta que deja de funcionar. Un sistema de pedidos para comidas preparadas permite que sus clientes ordenen y se suscriban por su cuenta mientras su semana se organiza sola. Nosotros lo configuramos y pasamos a sus clientes al nuevo sistema, para negocios pequeños y medianos de comidas preparadas en Florida, en inglés y en español.',
  ctaDemo: 'Probar la demo',
  ctaAlex: 'Hablar con Alex',
  live: {
    title: 'Véalo en vivo',
    body: 'Haga un pedido como cliente y administre un plan semanal, y luego vea la misma semana desde el lado de la cocina: suscriptores, rutas de entrega, etiquetas y lo que hay que cocinar.',
    customerDemo: 'Demo para clientes',
    adminDemo: 'Demo del área de administración',
    newTab: '(se abre en una pestaña nueva)',
    // The panel's name stays in English: that's what the demo shows.
    brandNote: 'En la demo, abra el panel "Try it with your brand" para agregar su propio logotipo y colores.',
    guide: 'Descargar la guía de la demo',
  },
  included: {
    title: 'Qué incluye',
    intro: 'Lo configuramos por usted y pasamos su menú y sus clientes al nuevo sistema. Todo lo que ve aquí ya funciona en la demo en vivo.',
    cta: 'Probar la demo',
    items: [
      { icon: 'plans', title: 'Planes semanales', body: 'Sus clientes se suscriben y luego saltan una semana, pausan, cambian o cancelan por su cuenta antes de su fecha límite.' },
      { icon: 'zones', title: 'Zonas de entrega y fechas límite', body: 'Cada zona por código postal tiene su propia tarifa, pedido mínimo y monto para entrega gratis, y los pedidos cierran en su fecha límite.' },
      { icon: 'routes', title: 'Hojas de ruta', body: 'Las paradas de cada día de entrega, agrupadas por zona y en orden, listas para imprimir.' },
      { icon: 'pickup', title: 'Recogida y más cocinas', body: 'Puntos de recogida al pagar, y una segunda cocina con sus propias zonas y menú cuando su negocio crezca.' },
      { icon: 'labels', title: 'Etiquetas imprimibles', body: 'Etiquetas generadas con los datos de sus propias comidas (nutrición, ingredientes, alérgenos), para que usted las revise antes de usarlas.' },
      { icon: 'gift', title: 'Cupones y tarjetas de regalo', body: 'Haga promociones y venda tarjetas de regalo por cualquier monto, que sus clientes usan al pagar.' },
      { icon: 'app', title: 'App instalable', body: 'Sus clientes agregan su tienda a la pantalla de inicio y la abren como una app.' },
      { icon: 'photo', title: 'Estilo de las fotos de sus platos', body: 'Elija la iluminación, el ángulo, el plato, el fondo, el color y la guarnición de las fotos con IA de sus platos reales.' },
      { icon: 'trend', title: 'Trend Finder', body: 'Convierte platillos en tendencia en borradores de comidas, con receta, nutrición y precio, para que usted los revise y los publique.' },
    ],
  },
  admin: {
    title: 'Lo que hace el área de administración',
    items: [
      'Menú semanal con su fecha límite para ordenar y sus días de entrega',
      'Todos los pedidos y todos los suscriptores en un solo lugar, con quién recibe su entrega, la salta o tiene el plan en pausa esta semana',
      'Zonas de entrega por código postal, cada una con su propia tarifa, pedido mínimo y monto para entrega gratis',
      'Hojas de ruta para cada día de entrega, agrupadas por zona y en orden de paradas',
      'Puntos de recogida, y más de una cocina cuando su negocio crezca',
      'Un plan de producción semanal con listas combinadas de preparación y de compras, listas para imprimir',
      'Etiquetas imprimibles para cada comida, generadas con los datos de sus propias comidas, para que usted las revise antes de usarlas',
      'Costos de ingredientes y proveedores',
      'Análisis, incluidas la tasa de clientes que repiten y la tasa de abandono',
      'Un asistente de IA que ayuda a sus clientes a elegir comidas y le muestra lo que piden que su menú todavía no tiene',
      'Cupones, tarjetas de regalo y aprobación de reseñas',
      'Opciones de estilo para las fotos con IA de sus platos reales',
      'Trend Finder, que convierte platillos en tendencia en borradores de comidas para que usted los revise',
    ],
  },
  migrate: {
    title: 'Traiga a sus clientes con usted',
    body: 'Nosotros hacemos la configuración. Importamos a sus clientes actuales y su menú desde una hoja de cálculo o desde el sistema que usa hoy, para que nadie tenga que registrarse de nuevo, y planeamos con usted la fecha del cambio.',
  },
  data: {
    title: 'Su negocio, sus datos',
    body: 'Los datos de sus clientes y pedidos, su dominio y su cuenta de Stripe siempre pertenecen a su negocio. La plataforma funciona con nuestro plan de alojamiento y mantenimiento, que la mantiene actualizada, respaldada y en funcionamiento.',
    link: 'Cómo funciona la propiedad',
  },
  more: {
    title: 'Más que software',
    intro: 'Ayuda opcional para crecer, cuando la necesite:',
    items: [
      'Configuración de su Perfil de Empresa en Google',
      'Recordatorios del menú y de la fecha límite por mensaje de texto y correo electrónico',
      'Solicitudes de reseñas después de cada entrega',
      'Tarjetas con código QR para las bolsas de entrega',
    ],
  },
  calculator: {
    body: '¿Está planeando o haciendo crecer un negocio de comidas preparadas? Haga sus cuentas con nuestra calculadora gratuita.',
    link: 'Abrir la calculadora para negocios de comidas preparadas',
  },
  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      id: 'weekly-orders',
      question: '¿Mis clientes pueden ordenar cada semana sin empezar de cero?',
      answer: 'Sí. Sus clientes tienen su propia cuenta, así que cada semana inician sesión, eligen del nuevo menú y pagan sin volver a ingresar sus datos. También pueden suscribirse a un plan semanal y saltarlo, pausarlo o cambiarlo antes de su fecha límite.',
    },
    {
      id: 'cutoff-and-delivery-days',
      question: '¿Puedo mantener mi fecha límite para ordenar y mis días de entrega?',
      answer: 'Sí. La fecha límite y los días de entrega son configuraciones del área de administración, así que los ajusta a la forma en que organiza su semana.',
    },
    {
      id: 'move-customers',
      question: '¿Puedo pasar a mis clientes actuales al nuevo sistema?',
      answer: 'Sí. Importamos a sus clientes desde una hoja de cálculo o desde el sistema que usa hoy, para que no tengan que registrarse de nuevo.',
    },
    {
      id: 'own-data',
      question: '¿Los datos de mis clientes son míos?',
      answer: 'Sí. Los datos de sus clientes y pedidos, su dominio y su cuenta de Stripe siempre pertenecen a su negocio, y puede exportar sus datos en cualquier momento.',
    },
    {
      id: 'cost',
      question: '¿Cuánto cuesta?',
      answer: 'El precio se define después de analizar brevemente cómo maneja sus pedidos hoy. La llamada introductoria es gratuita.',
    },
  ],
  closing: {
    title: '¿Listo para dejar de perseguir pedidos?',
    body: 'Pruebe la demo y luego hable con Alex para programar una llamada introductoria gratuita.',
  },
};

export default { en, es };
