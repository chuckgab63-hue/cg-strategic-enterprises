// /meal-prep-ordering and /es/meal-prep-ordering. Plain TypeScript with no
// React, so vite.config.ts can also write the FAQ and its JSON-LD into the
// pre-rendered HTML (src/i18n/prerender.ts).
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { FaqItem } from './faq.ts';
import type { Lang } from './lang.ts';

/** Picks a "What's included" card's icon in MealPrepOrdering.tsx. */
export type IncludedIcon =
  | 'plans' | 'zones' | 'routes' | 'pickup' | 'labels' | 'gift' | 'app' | 'photo' | 'trend'
  | 'build' | 'bundles' | 'referral' | 'inventory' | 'reports' | 'language' | 'assistant';

interface IncludedItem {
  icon: IncludedIcon;
  title: string;
  body: string;
}

export const MEAL_PREP_ORDERING_PATH = '/meal-prep-ordering';
export const DEMO_MENU_URL = 'https://demo.cgstrategic.dev/menu';
export const DEMO_ADMIN_URL = 'https://demo.cgstrategic.dev/admin';

/** A demo link that opens the demo in this page's language (the demo remembers it). */
export const demoHref = (url: string, lang: Lang) => `${url}?lang=${lang}`;

const en = {
  eyebrow: 'Meal Prep Ordering System',
  title: 'Online Ordering System for Meal Prep Businesses',
  intro: "Taking orders through DMs, texts and spreadsheets works until it doesn't. A meal prep ordering system lets customers order and subscribe on their own while your week organizes itself. We set it up for you and move your customers over, for small and mid-sized meal prep businesses in Florida and Georgia, in English and Spanish.",
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
    featuresCta: 'See every feature, with screens from the demo',
    learnMore: 'How it works',
    items: [
      { icon: 'plans', title: 'Weekly plans', body: 'Customers subscribe, then skip a week, pause, change or cancel on their own before your deadline. If you ever pause billing, the customers affected get an email in their language.' },
      { icon: 'zones', title: 'Delivery zones and deadlines', body: 'Each ZIP code zone has its own fee, minimum order and free-delivery amount, and orders close at your deadline.' },
      { icon: 'routes', title: 'Route sheets', body: "Each delivery day's stops, grouped by zone and in order, ready to print." },
      { icon: 'pickup', title: 'Pickup and more kitchens', body: 'Pickup spots at checkout, and a second kitchen with its own zones and menu when you grow.' },
      { icon: 'labels', title: 'Labels and packing slips', body: 'Meal labels and a packing slip for every order, generated from your own meal data (nutrition, ingredients, allergens, use-by dates) for you to review before use.' },
      { icon: 'gift', title: 'Coupons and gift cards', body: 'Run promotions, and sell gift cards for any amount that customers redeem at checkout.' },
      { icon: 'app', title: 'Installable app', body: 'Customers add your store to their home screen and open it like an app.' },
      { icon: 'photo', title: 'Food photo styling', body: 'Styling options that make your real dishes look their best in AI photos. Garnish comes only from each recipe, every photo is checked against its ingredients and allergens, and none goes on your menu until you approve it.' },
      { icon: 'trend', title: 'Trend Finder', body: 'Turns trending dishes into draft meals, with recipe, nutrition and price, for you to review and publish.' },
      { icon: 'assistant', title: 'AI meal assistant', body: "A chat on your storefront that answers customers' questions from your own menu, points allergy questions to your kitchen and passes on what it can't answer. Every conversation is saved for you in your admin." },
      { icon: 'build', title: 'Build your own, sizes and add-ons', body: 'Customers build a bowl from your proteins, carbs, vegetables and sauces and see its calories and macros as they pick. Any meal can have sizes and add-ons, each priced by you.' },
      { icon: 'bundles', title: 'Bundles and minimums', body: 'Sell a set of meals as one bundle at one price, and set a minimum quantity per meal or a minimum order for the store.' },
      { icon: 'referral', title: 'Referral program', body: "Each customer gets a referral link. When a friend's first order is paid, both get a reward, and a full refund takes it back." },
      { icon: 'inventory', title: 'Inventory', body: 'Stock for every ingredient at each kitchen, taken off when you mark the week cooked, with low-stock alerts and a history of every change.' },
      { icon: 'reports', title: 'Surveys, exports and sales tax', body: 'A short survey after each delivery, CSV exports of orders, customers, plans and stock, and a report of the sales tax Stripe charged.' },
      { icon: 'language', title: 'English and Spanish', body: 'Your store and admin area in English and Spanish. The store opens in English; turn Spanish on in Settings > Features and customers switch with one tap, and the store remembers their choice.' },
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
      'Packing slips for every order, with use-by dates from your own shelf-life settings, for you to review',
      'Ingredient costs and suppliers',
      'Inventory at each kitchen: stock taken off when the week is marked cooked, low-stock alerts, and every adjustment recorded with its reason',
      'Build-your-own meals, sizes, add-ons and bundles, with a report of which variations sell',
      'A minimum quantity per meal and a minimum order for the store',
      'Analytics, including repeat rate and churn',
      "A customer chat assistant that answers from your own menu and passes what it can't answer to your kitchen, with a Conversations page showing what customers ask that the menu doesn't cover yet",
      'Coupons, gift cards and review approval',
      'A referral program, with rewards taken back when the order is fully refunded',
      'Customer surveys after delivery, with averages, a weekly trend and comments',
      'CSV exports of orders, customers, weekly plans and stock, and a sales tax report of what Stripe charged, by day, week or month',
      'AI photos of your real dishes: a style guide written from your own menu photos, your styling choices, garnish only from the recipe, an accuracy check and your approval',
      'Trend Finder, which turns trending dishes into draft meals for you to review',
      'The whole admin area in English and Spanish',
    ],
  },
  // The three plans, as the platform's feature registry defines them
  // (IslandFreshmeals src/config/features.ts). No prices on purpose.
  plans: {
    title: 'Start simple, add features as you grow',
    intro: "Three plans. Each includes everything in the one before it. You turn each feature on in Settings > Features when you're ready, and anything outside your plan shows as available on a higher plan. Turning a feature off never deletes its data.",
    includesPrevious: (name: string) => `Everything in ${name}, plus:`,
    tiers: [
      {
        name: 'Basic',
        tagline: 'Run your meal-prep business online',
        items: [
          'Weekly plans customers skip, pause, change or cancel',
          'Delivery zones and route sheets',
          'Pickup locations',
          'Coupons',
          'Printable labels with use-by dates, and packing slips, for you to review',
          'Production plan with prep and shopping lists',
          'Customer reviews',
          'Minimum quantities and minimum orders',
          'CSV exports and a sales tax report',
          'Store in English and Spanish',
          'Installable app',
        ],
      },
      {
        name: 'Advanced',
        tagline: 'Grow revenue and run a busier kitchen',
        items: [
          'Build-your-own meals with calories and macros',
          'Sizes and add-ons',
          'Bundles',
          'Gift cards',
          'Reward points and referrals',
          'Customer surveys',
          'Ingredient costs and suppliers',
          'Inventory, taken off stock when the week is cooked',
          'Analytics, including repeat rate and churn',
        ],
      },
      {
        name: 'Pro',
        tagline: 'AI tools and more than one kitchen',
        items: [
          'AI meal assistant, with a Conversations page',
          'AI food photos, with your styling and your approval',
          'Trend Finder',
          'More than one kitchen',
        ],
      },
    ],
    demoNote: 'The live demo runs on Pro, with everything on.',
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
  intro: 'Tomar pedidos por mensajes directos, textos y hojas de cálculo funciona hasta que deja de funcionar. Un sistema de pedidos para comidas preparadas permite que sus clientes ordenen y se suscriban por su cuenta mientras su semana se organiza sola. Nosotros lo configuramos y pasamos a sus clientes al nuevo sistema, para negocios pequeños y medianos de comidas preparadas en Florida y Georgia, en inglés y en español.',
  ctaDemo: 'Probar la demo',
  ctaAlex: 'Hablar con Alex',
  live: {
    title: 'Véalo en vivo',
    body: 'Haga un pedido como cliente y administre un plan semanal, y luego vea la misma semana desde el lado de la cocina: suscriptores, rutas de entrega, etiquetas y lo que hay que cocinar.',
    customerDemo: 'Demo para clientes',
    adminDemo: 'Demo del área de administración',
    newTab: '(se abre en una pestaña nueva)',
    // The demo opens in Spanish from this page (demoHref), so the panel has its Spanish name.
    brandNote: 'En la demo, abra el panel "Pruébelo con su marca" para agregar su propio logotipo y colores.',
    guide: 'Descargar la guía de la demo',
  },
  included: {
    title: 'Qué incluye',
    intro: 'Lo configuramos por usted y pasamos su menú y sus clientes al nuevo sistema. Todo lo que ve aquí ya funciona en la demo en vivo.',
    cta: 'Probar la demo',
    featuresCta: 'Ver todas las funciones, con pantallas de la demo',
    learnMore: 'Cómo funciona',
    items: [
      { icon: 'plans', title: 'Planes semanales', body: 'Sus clientes se suscriben y luego saltan una semana, pausan, cambian o cancelan por su cuenta antes de su fecha límite. Si alguna vez pausa los cobros, los clientes afectados reciben un correo en su idioma.' },
      { icon: 'zones', title: 'Zonas de entrega y fechas límite', body: 'Cada zona por código postal tiene su propia tarifa, pedido mínimo y monto para entrega gratis, y los pedidos cierran en su fecha límite.' },
      { icon: 'routes', title: 'Hojas de ruta', body: 'Las paradas de cada día de entrega, agrupadas por zona y en orden, listas para imprimir.' },
      { icon: 'pickup', title: 'Recogida y más cocinas', body: 'Puntos de recogida al pagar, y una segunda cocina con sus propias zonas y menú cuando su negocio crezca.' },
      { icon: 'labels', title: 'Etiquetas y hojas de empaque', body: 'Etiquetas para cada comida y una hoja de empaque para cada pedido, generadas con los datos de sus propias comidas (nutrición, ingredientes, alérgenos, fechas límite de consumo), para que usted las revise antes de usarlas.' },
      { icon: 'gift', title: 'Cupones y tarjetas de regalo', body: 'Haga promociones y venda tarjetas de regalo por cualquier monto, que sus clientes usan al pagar.' },
      { icon: 'app', title: 'App instalable', body: 'Sus clientes agregan su tienda a la pantalla de inicio y la abren como una app.' },
      { icon: 'photo', title: 'Estilo de las fotos de sus platos', body: 'Opciones de estilo para que sus platos reales luzcan lo mejor posible en las fotos con IA. La guarnición sale solo de cada receta, cada foto se revisa contra sus ingredientes y alérgenos, y ninguna llega a su menú hasta que usted la aprueba.' },
      { icon: 'trend', title: 'Trend Finder', body: 'Convierte platillos en tendencia en borradores de comidas, con receta, nutrición y precio, para que usted los revise y los publique.' },
      { icon: 'assistant', title: 'Asistente de comidas con IA', body: 'Un chat en su tienda que responde las preguntas de sus clientes con su propio menú, dirige las preguntas sobre alergias a su cocina y le pasa lo que no puede responder. Cada conversación queda guardada para usted en su panel de administración.' },
      { icon: 'build', title: 'Arme su comida, tamaños y extras', body: 'Sus clientes arman un bowl con sus proteínas, carbohidratos, vegetales y salsas, y ven sus calorías y macros mientras eligen. Cualquier comida puede tener tamaños y extras, con el precio que usted fije.' },
      { icon: 'bundles', title: 'Paquetes y mínimos', body: 'Venda un conjunto de comidas como un solo paquete a un solo precio, y fije una cantidad mínima por comida o un pedido mínimo para la tienda.' },
      { icon: 'referral', title: 'Programa de referidos', body: 'Cada cliente recibe un enlace para recomendar. Cuando se paga el primer pedido del amigo, los dos reciben una recompensa, y un reembolso total la anula.' },
      { icon: 'inventory', title: 'Inventario', body: 'Las existencias de cada ingrediente en cada cocina, que se descuentan al marcar la semana como cocinada, con alertas de existencias bajas y un historial de cada cambio.' },
      { icon: 'reports', title: 'Encuestas, exportaciones e impuesto', body: 'Una encuesta corta después de cada entrega, exportaciones CSV de pedidos, clientes, planes y existencias, y un informe del impuesto sobre ventas que cobró Stripe.' },
      { icon: 'language', title: 'Inglés y español', body: 'Su tienda y su área de administración en inglés y en español. La tienda abre en inglés; active el español en Configuración > Funciones y sus clientes cambian de idioma con un toque, y la tienda recuerda su elección.' },
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
      'Hojas de empaque para cada pedido, con fechas límite de consumo calculadas con la vida útil que usted fija, para que usted las revise',
      'Costos de ingredientes y proveedores',
      'Inventario en cada cocina: existencias que se descuentan al marcar la semana como cocinada, alertas de existencias bajas y cada ajuste registrado con su motivo',
      'Comidas para armar, tamaños, extras y paquetes, con un informe de qué variaciones se venden',
      'Una cantidad mínima por comida y un pedido mínimo para la tienda',
      'Análisis, incluidas la tasa de clientes que repiten y la tasa de abandono',
      'Un asistente de chat para sus clientes que responde con su propio menú y le pasa a su cocina lo que no puede responder, con una página de Conversaciones que muestra lo que los clientes piden y su menú todavía no cubre',
      'Cupones, tarjetas de regalo y aprobación de reseñas',
      'Un programa de referidos, con recompensas que se anulan cuando el pedido se reembolsa por completo',
      'Encuestas a clientes después de la entrega, con promedios, la tendencia semanal y comentarios',
      'Exportaciones CSV de pedidos, clientes, planes semanales y existencias, y un informe del impuesto sobre ventas que cobró Stripe, por día, semana o mes',
      'Fotos con IA de sus platos reales: una guía de estilo escrita a partir de las fotos de su menú, sus opciones de estilo, guarnición solo de la receta, una revisión de exactitud y su aprobación',
      'Trend Finder, que convierte platillos en tendencia en borradores de comidas para que usted los revise',
      'Toda el área de administración en inglés y en español',
    ],
  },
  plans: {
    title: 'Empiece simple y agregue funciones a medida que crece',
    intro: 'Tres planes. Cada uno incluye todo lo del anterior. Usted activa cada función en Configuración > Funciones cuando esté listo, y lo que no incluye su plan aparece como disponible en un plan superior. Desactivar una función nunca borra sus datos.',
    includesPrevious: (name) => `Todo lo de ${name}, más:`,
    tiers: [
      {
        name: 'Básico',
        tagline: 'Su negocio de comidas preparadas, en línea',
        items: [
          'Planes semanales que sus clientes saltan, pausan, cambian o cancelan',
          'Zonas de entrega y hojas de ruta',
          'Puntos de recogida',
          'Cupones',
          'Etiquetas imprimibles con fechas límite de consumo y hojas de empaque, para que usted las revise',
          'Plan de producción con listas de preparación y de compras',
          'Reseñas de clientes',
          'Cantidades mínimas y pedidos mínimos',
          'Exportaciones CSV e informe del impuesto sobre ventas',
          'Tienda en inglés y en español',
          'App instalable',
        ],
      },
      {
        name: 'Avanzado',
        tagline: 'Venda más y maneje una cocina con más movimiento',
        items: [
          'Comidas para armar, con calorías y macros',
          'Tamaños y extras',
          'Paquetes',
          'Tarjetas de regalo',
          'Puntos de recompensa y referidos',
          'Encuestas a clientes',
          'Costos de ingredientes y proveedores',
          'Inventario, que se descuenta al marcar la semana como cocinada',
          'Análisis, incluidas la tasa de clientes que repiten y la tasa de abandono',
        ],
      },
      {
        name: 'Pro',
        tagline: 'Herramientas con IA y más de una cocina',
        items: [
          'Asistente de comidas con IA, con una página de Conversaciones',
          'Fotos de sus platos con IA, con su estilo y su aprobación',
          'Trend Finder',
          'Más de una cocina',
        ],
      },
    ],
    demoNote: 'La demo en vivo funciona con el plan Pro, con todo activado.',
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
