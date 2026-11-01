// GENERATED from the app's feature registry (IslandFreshmeals/src/config/features.ts at commit fd6d30b): the one
// source of truth for feature names, descriptions and plans. Regenerate rather than edit by hand; the feature pages
// (src/i18n/mealPrepFeatures.ts) look features up by key. Plain TypeScript, no React.

import type { Lang } from "../i18n/lang.ts";

export type PlanKey = "basic" | "advanced" | "pro";

export interface CatalogFeature {
  key: string;
  plan: PlanKey;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const PLAN_NAME: Record<PlanKey, Record<Lang, string>> = {
  basic: { en: "Basic", es: "Básico" },
  advanced: { en: "Advanced", es: "Avanzado" },
  pro: { en: "Pro", es: "Pro" },
};

export const PLAN_DESCRIPTION: Record<PlanKey, Record<Lang, string>> = {
  basic: { en: "Online ordering with plans, delivery, pickup, coupons, labels and reports.", es: "Pedidos en línea con planes, entregas, recogida, cupones, etiquetas e informes." },
  advanced: { en: "Everything in Basic, plus custom meals, bundles, gift cards, rewards, inventory and analytics.", es: "Todo lo de Básico, más comidas a su gusto, paquetes, tarjetas de regalo, recompensas, inventario y análisis." },
  pro: { en: "Everything in Advanced, plus the AI tools and more than one kitchen.", es: "Todo lo de Avanzado, más las herramientas con IA y más de una cocina." },
};

export const CATALOG: CatalogFeature[] = [
  { key: "subscriptions", plan: "basic", name: { en: "Weekly plans", es: "Planes semanales" }, description: { en: "Customers subscribe to a weekly plan and are billed each week.", es: "Los clientes se suscriben a un plan semanal y se les cobra cada semana." } },
  { key: "delivery_zones", plan: "basic", name: { en: "Delivery zones", es: "Zonas de entrega" }, description: { en: "ZIP code zones with their own fee, minimum and day, plus the delivery areas page.", es: "Zonas por código postal con su tarifa, mínimo y día, y la página de zonas de entrega." } },
  { key: "route_sheets", plan: "basic", name: { en: "Delivery routes", es: "Rutas de entrega" }, description: { en: "Route sheets for drivers, with stops put in a sensible order.", es: "Hojas de ruta para los choferes, con las paradas en un orden práctico." } },
  { key: "pickup_locations", plan: "basic", name: { en: "Pickup locations", es: "Puntos de recogida" }, description: { en: "Places where customers can pick up their order.", es: "Lugares donde los clientes pueden recoger su pedido." } },
  { key: "coupons", plan: "basic", name: { en: "Coupons", es: "Cupones" }, description: { en: "Discount codes customers enter at checkout.", es: "Códigos de descuento que los clientes usan al pagar." } },
  { key: "labels", plan: "basic", name: { en: "Labels", es: "Etiquetas" }, description: { en: "Printable meal labels with use-by dates.", es: "Etiquetas de comidas para imprimir, con fecha de consumo." } },
  { key: "packing_slips", plan: "basic", name: { en: "Packing slips", es: "Hojas de empaque" }, description: { en: "A printable slip for each order bag.", es: "Una hoja para imprimir para la bolsa de cada pedido." } },
  { key: "production_planning", plan: "basic", name: { en: "Production plan", es: "Plan de producción" }, description: { en: "The week's prep list and shopping list from the orders.", es: "La lista de preparación y la lista de compras de la semana, según los pedidos." } },
  { key: "reviews", plan: "basic", name: { en: "Reviews", es: "Reseñas" }, description: { en: "Customers rate meals; you approve what shows on the menu.", es: "Los clientes califican las comidas; usted aprueba lo que se muestra en el menú." } },
  { key: "order_minimums", plan: "basic", name: { en: "Order minimums", es: "Mínimos de pedido" }, description: { en: "A minimum order total and minimum quantities per meal.", es: "Un total mínimo por pedido y cantidades mínimas por comida." } },
  { key: "reports", plan: "basic", name: { en: "Exports and reports", es: "Exportaciones e informes" }, description: { en: "CSV exports and the sales tax report.", es: "Exportaciones CSV y el informe de impuesto sobre ventas." } },
  { key: "spanish", plan: "basic", name: { en: "Spanish", es: "Español" }, description: { en: "An English | Spanish switch on the store and in the admin.", es: "Un selector inglés | español en la tienda y en la administración." } },
  { key: "pwa", plan: "basic", name: { en: "Installable app", es: "App instalable" }, description: { en: "Customers can add the store to their phone's home screen.", es: "Los clientes pueden agregar la tienda a la pantalla de inicio de su teléfono." } },
  { key: "build_your_own", plan: "advanced", name: { en: "Build your own", es: "A su gusto" }, description: { en: "Customers build a meal from proteins, carbs, vegetables and sauces.", es: "Los clientes arman una comida con proteínas, carbohidratos, verduras y salsas." } },
  { key: "sizes_addons", plan: "advanced", name: { en: "Sizes and add-ons", es: "Tamaños y extras" }, description: { en: "Meal sizes and paid extras on any meal.", es: "Tamaños de comida y extras con costo en cualquier comida." } },
  { key: "bundles", plan: "advanced", name: { en: "Bundles", es: "Paquetes" }, description: { en: "Sell several meals together at one price.", es: "Venda varias comidas juntas a un solo precio." } },
  { key: "gift_cards", plan: "advanced", name: { en: "Gift cards", es: "Tarjetas de regalo" }, description: { en: "Sell gift cards customers redeem at checkout.", es: "Venda tarjetas de regalo que los clientes canjean al pagar." } },
  { key: "loyalty_points", plan: "advanced", name: { en: "Reward points", es: "Puntos de recompensa" }, description: { en: "Customers earn points on orders and spend them later.", es: "Los clientes ganan puntos con sus pedidos y los usan después." } },
  { key: "referrals", plan: "advanced", name: { en: "Referrals", es: "Referidos" }, description: { en: "Customers share a code; both get a reward on the friend's first order.", es: "Los clientes comparten un código; ambos ganan una recompensa con el primer pedido del amigo." } },
  { key: "surveys", plan: "advanced", name: { en: "Surveys", es: "Encuestas" }, description: { en: "A short survey after each order.", es: "Una encuesta corta después de cada pedido." } },
  { key: "ingredient_costs", plan: "advanced", name: { en: "Costs and suppliers", es: "Costos y proveedores" }, description: { en: "Ingredient costs, food cost per meal and your supplier list.", es: "Costos de ingredientes, costo de alimentos por comida y su lista de proveedores." } },
  { key: "inventory", plan: "advanced", name: { en: "Inventory", es: "Inventario" }, description: { en: "Stock on hand, counted down as you cook each week.", es: "Inventario en existencia, que baja a medida que cocina cada semana." } },
  { key: "analytics", plan: "advanced", name: { en: "Analytics", es: "Análisis" }, description: { en: "Sales, top meals and customer trends, with a glossary of the numbers.", es: "Ventas, comidas más vendidas y tendencias de clientes, con un glosario de las cifras." } },
  { key: "ai_assistant", plan: "pro", name: { en: "Meal assistant (AI)", es: "Asistente de comidas (IA)" }, description: { en: "A chat that helps customers choose meals, and the page of what they asked.", es: "Un chat que ayuda a los clientes a elegir comidas, y la página de lo que preguntaron." } },
  { key: "ai_photos", plan: "pro", name: { en: "AI meal photos", es: "Fotos de comidas con IA" }, description: { en: "Generate meal photos that match your menu's style.", es: "Genere fotos de comidas que combinan con el estilo de su menú." } },
  { key: "trend_finder", plan: "pro", name: { en: "Trend Finder", es: "Trend Finder" }, description: { en: "Ideas for new meals from what's trending, with cost estimates.", es: "Ideas de comidas nuevas según las tendencias, con costos estimados." } },
  { key: "multi_location", plan: "pro", name: { en: "More than one kitchen", es: "Más de una cocina" }, description: { en: "Run several kitchens, each with its own schedule, zones and menu.", es: "Maneje varias cocinas, cada una con su horario, zonas y menú." } },
];

export const featureByKey = (key: string): CatalogFeature => {
  const f = CATALOG.find(x => x.key === key);
  if (!f) throw new Error(`Unknown feature "${key}"`);
  return f;
};
