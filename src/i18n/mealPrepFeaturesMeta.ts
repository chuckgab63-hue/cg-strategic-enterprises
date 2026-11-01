// The feature pages' paths, titles and descriptions: small and free of the page copy, so src/i18n/meta.ts (which every page
// loads) does not pull the copy into the main bundle. The copy itself is in mealPrepFeatures.ts.
//
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

import type { Lang } from './lang.ts';

export const MEAL_PREP_ORDERING_PATH = '/meal-prep-ordering';
export const MEAL_PREP_FEATURES_PATH = `${MEAL_PREP_ORDERING_PATH}/features`;

/** The live demo's address: the feature pages deep-link into it (the same site as DEMO_MENU_URL in mealPrepOrdering.ts). */
export const DEMO_BASE = 'https://demo.cgstrategic.dev';

export const FEATURE_SLUGS = [
  'subscriptions',
  'bigger-orders',
  'delivery-and-pickup',
  'kitchen-operations',
  'labels',
  'loyalty-and-referrals',
  'reviews-and-surveys',
  'reports-and-insights',
  'ai-tools',
  'bilingual-and-app',
  'getting-started',
] as const;
export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

export const featurePath = (slug: FeatureSlug) => `${MEAL_PREP_FEATURES_PATH}/${slug}`;

interface Meta { title: string; description: string }

export const HUB_META = {
  en: {
    title: 'Meal Prep Ordering System Features',
    description: 'Every feature of the meal prep ordering system, by what it does for you: subscriptions, delivery routes, kitchen planning, labels, loyalty, reports and AI tools.',
  },
  es: {
    title: 'Funciones de pedidos para comidas preparadas',
    description: 'Todas las funciones del sistema de pedidos para comidas preparadas: suscripciones, entregas, cocina, etiquetas, lealtad, informes y herramientas con IA.',
  },
} satisfies Record<Lang, { title: string; description: string }>;

export const FEATURE_META: Record<FeatureSlug, Record<Lang, Meta>> = {
  'subscriptions': {
    en: { title: 'Meal Prep Subscription Software', description: 'Weekly meal plans customers can skip, pause, swap or cancel on their own, billed each week to your own Stripe account. See it live in the demo.' },
    es: { title: 'Software de suscripciones para comidas preparadas', description: 'Planes semanales de comidas que los clientes saltan, pausan, cambian o cancelan solos, con cobro semanal en su propia cuenta de Stripe. Véalo en la demo en vivo.' },
  },
  'bigger-orders': {
    en: { title: 'Build-Your-Own Meals, Sizes and Bundles', description: 'Meal prep ordering with build-your-own bowls and live macros, sizes, paid add-ons, meal packs and a minimum order, so each order is worth delivering.' },
    es: { title: 'Comidas a su gusto, tamaños y paquetes', description: 'Pedidos para comidas preparadas con platos a su gusto y macros en vivo, tamaños, extras, paquetes y un pedido mínimo, para que cada pedido valga la entrega.' },
  },
  'delivery-and-pickup': {
    en: { title: 'Meal Prep Delivery Route Planning', description: 'Delivery zones by ZIP code, delivery days and deadlines, route sheets with stops in order, pickup locations and printable packing slips for meal prep.' },
    es: { title: 'Rutas de entrega para comidas preparadas', description: 'Zonas de entrega por código postal, días y fechas límite, hojas de ruta con paradas en orden, puntos de recogida y hojas de empaque imprimibles.' },
  },
  'kitchen-operations': {
    en: { title: 'Meal Prep Production Plan and Inventory', description: 'Meal prep production plan, prep and shopping lists by supplier, inventory, ingredient costs and suppliers, and multiple kitchens, all from the week\'s orders.' },
    es: { title: 'Producción e inventario de cocina', description: 'Plan de producción, listas de preparación y compras por proveedor, inventario, costos de ingredientes y varias cocinas, a partir de los pedidos de la semana.' },
  },
  'labels': {
    en: { title: 'Meal Prep Labels with Nutrition Facts', description: 'Print meal prep labels with a nutrition panel, ingredients, allergens and packed and use-by dates, generated from your own meal data for you to review.' },
    es: { title: 'Etiquetas con información nutricional', description: 'Imprima etiquetas con panel nutricional, ingredientes, alérgenos y fechas de empacado y de consumo, generadas con los datos de sus comidas para que usted las revise.' },
  },
  'loyalty-and-referrals': {
    en: { title: 'Meal Prep Loyalty, Referrals and Gift Cards', description: 'Reward points, a referral program that rewards both sides after a paid first order, gift cards and coupon codes for meal prep businesses.' },
    es: { title: 'Lealtad y referidos para comidas preparadas', description: 'Puntos de recompensa, un programa de referidos que premia a ambas partes tras un primer pedido pagado, tarjetas de regalo y cupones para comidas preparadas.' },
  },
  'reviews-and-surveys': {
    en: { title: 'Meal Prep Reviews and Customer Surveys', description: 'Customer meal reviews you approve before they show, plus a short survey after each order with ratings, response rate and comments, for meal prep owners.' },
    es: { title: 'Reseñas y encuestas a clientes', description: 'Reseñas de comidas que usted aprueba antes de mostrarlas, y una encuesta corta después de cada pedido con calificaciones y comentarios.' },
  },
  'reports-and-insights': {
    en: { title: 'Meal Prep Analytics, Churn and Tax Reports', description: 'Meal prep analytics with repeat rate and churn, top meals and subscriber trends, plus CSV exports and a sales tax report by day, week or month.' },
    es: { title: 'Análisis, abandono e informes de impuestos', description: 'Análisis con clientes que repiten y abandono, comidas más vendidas y tendencias de suscriptores, más exportaciones CSV e informe del impuesto sobre ventas.' },
  },
  'ai-tools': {
    en: { title: 'AI Tools for Meal Prep Businesses', description: 'A customer chat assistant that answers from your own menu, food photo styling with an accuracy check and your approval, and Trend Finder for new meal ideas.' },
    es: { title: 'Herramientas con IA para comidas preparadas', description: 'Un chat para clientes que responde con su propio menú, estilo de fotos de comida con revisión y su aprobación, y Trend Finder para ideas de comidas nuevas.' },
  },
  'bilingual-and-app': {
    en: { title: 'Bilingual Meal Prep Website and App', description: 'A meal prep ordering site in English and Spanish with a one-tap switch, an admin area in both languages, and a store customers can install on their phone.' },
    es: { title: 'Sitio bilingüe y app para comidas preparadas', description: 'Un sitio de pedidos en inglés y español con cambio de un toque, una administración en los dos idiomas y una tienda que los clientes instalan en su teléfono.' },
  },
  'getting-started': {
    en: { title: 'Done-for-You Meal Prep Ordering Setup', description: 'We set up your meal prep ordering system, move your menu and customers, and put it on your own domain and Stripe account. English and Spanish, Northeast Florida.' },
    es: { title: 'Configuración de pedidos para comidas preparadas', description: 'Configuramos su sistema de pedidos, pasamos su menú y clientes, y lo ponemos en su dominio y su cuenta de Stripe. En inglés y español, noreste de Florida.' },
  },
};
