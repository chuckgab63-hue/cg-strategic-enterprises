// /meal-prep-ordering and /es/meal-prep-ordering. Plain TypeScript with no
// React, so vite.config.ts can also write the FAQ and its JSON-LD into the
// pre-rendered HTML (src/i18n/prerender.ts).
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { FaqItem } from './faq.ts';

export const MEAL_PREP_ORDERING_PATH = '/meal-prep-ordering';
export const DEMO_MENU_URL = 'https://demo.cgstrategic.dev/menu';
export const DEMO_ADMIN_URL = 'https://demo.cgstrategic.dev/admin';

const en = {
  eyebrow: 'Meal Prep Ordering System',
  title: 'Online Ordering System for Meal Prep Businesses',
  intro: "Taking orders through DMs, texts and spreadsheets works until it doesn't. A meal prep ordering system lets customers order on their own while your week organizes itself.",
  ctaDemo: 'Try the demo',
  ctaAlex: 'Talk to Alex',
  live: {
    title: 'See it live',
    body: 'Order as a customer, then see the same week from the kitchen side.',
    customerDemo: 'Customer demo',
    adminDemo: 'Admin demo',
    newTab: '(opens in a new tab)',
    brandNote: 'In the demo, open the "Try it with your brand" panel to add your own logo and colors.',
  },
  admin: {
    title: 'What the admin area does',
    items: [
      'Weekly menu with cutoff and delivery-day settings',
      'Every order in one place',
      'A weekly production plan with combined prep and shopping lists, ready to print',
      'Ingredient costs and suppliers',
      'Analytics, including repeat rate and churn',
      "An AI assistant that helps customers choose meals and shows you what they ask for that the menu doesn't have yet",
      'Coupons and review approval',
    ],
  },
  migrate: {
    title: 'Bring your customers with you',
    body: 'Migration tools import your existing customers from a spreadsheet, Square or another system, so nobody has to sign up again.',
  },
  data: {
    title: 'Your business, your data',
    body: 'Your customer and order data, your domain and your payment account always belong to your business. The platform runs on our hosting and care plan, which keeps it updated, backed up and running.',
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
      answer: 'Yes. Customers have their own accounts, so each week they sign in, pick from the new menu and check out without re-entering their details.',
    },
    {
      id: 'cutoff-and-delivery-days',
      question: 'Can I keep my order cutoff and delivery days?',
      answer: 'Yes. Your cutoff and delivery days are settings in the admin area, so you set them to match how you run your week.',
    },
    {
      id: 'move-customers',
      question: 'Can I move my existing customers over?',
      answer: "Yes. Migration tools import your customers from a spreadsheet, Square or another system, so they don't have to sign up again.",
    },
    {
      id: 'own-data',
      question: 'Do I own my customer data?',
      answer: 'Yes. Your customer and order data, domain and payment account always belong to your business, and you can export your data at any time.',
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
  intro: 'Tomar pedidos por mensajes directos, textos y hojas de cálculo funciona hasta que deja de funcionar. Un sistema de pedidos para comidas preparadas permite que sus clientes ordenen por su cuenta mientras su semana se organiza sola.',
  ctaDemo: 'Probar la demo',
  ctaAlex: 'Hablar con Alex',
  live: {
    title: 'Véalo en vivo',
    body: 'Haga un pedido como cliente y luego vea la misma semana desde el lado de la cocina.',
    customerDemo: 'Demo para clientes',
    adminDemo: 'Demo del área de administración',
    newTab: '(se abre en una pestaña nueva)',
    // The panel's name stays in English: that's what the demo shows.
    brandNote: 'En la demo, abra el panel "Try it with your brand" para agregar su propio logotipo y colores.',
  },
  admin: {
    title: 'Lo que hace el área de administración',
    items: [
      'Menú semanal con fecha límite para ordenar y días de entrega configurables',
      'Todos los pedidos en un solo lugar',
      'Un plan de producción semanal con listas combinadas de preparación y de compras, listas para imprimir',
      'Costos de ingredientes y proveedores',
      'Análisis, incluidas la tasa de clientes que repiten y la tasa de abandono',
      'Un asistente de IA que ayuda a sus clientes a elegir comidas y le muestra lo que piden que su menú todavía no tiene',
      'Cupones y aprobación de reseñas',
    ],
  },
  migrate: {
    title: 'Traiga a sus clientes con usted',
    body: 'Las herramientas de migración importan a sus clientes actuales desde una hoja de cálculo, Square u otro sistema, para que nadie tenga que registrarse de nuevo.',
  },
  data: {
    title: 'Su negocio, sus datos',
    body: 'Los datos de sus clientes y pedidos, su dominio y su cuenta de pagos siempre pertenecen a su negocio. La plataforma funciona con nuestro plan de alojamiento y mantenimiento, que la mantiene actualizada, respaldada y en funcionamiento.',
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
      answer: 'Sí. Sus clientes tienen su propia cuenta, así que cada semana inician sesión, eligen del nuevo menú y pagan sin volver a ingresar sus datos.',
    },
    {
      id: 'cutoff-and-delivery-days',
      question: '¿Puedo mantener mi fecha límite para ordenar y mis días de entrega?',
      answer: 'Sí. La fecha límite y los días de entrega son configuraciones del área de administración, así que los ajusta a la forma en que organiza su semana.',
    },
    {
      id: 'move-customers',
      question: '¿Puedo pasar a mis clientes actuales al nuevo sistema?',
      answer: 'Sí. Las herramientas de migración importan a sus clientes desde una hoja de cálculo, Square u otro sistema, para que no tengan que registrarse de nuevo.',
    },
    {
      id: 'own-data',
      question: '¿Los datos de mis clientes son míos?',
      answer: 'Sí. Los datos de sus clientes y pedidos, su dominio y su cuenta de pagos siempre pertenecen a su negocio, y puede exportar sus datos en cualquier momento.',
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
