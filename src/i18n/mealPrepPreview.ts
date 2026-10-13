// Home page meal-prep calculator slice (src/components/MealPrepPreview.tsx).
// Money is formatted by the component; these only place the formatted values.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).

export interface AssumptionValues {
  food: string;
  local: boolean;
  packaging: string;
  spoilagePct: number;
  kitchen: string;
  deliverySharePct: number;
  perDrop: string;
  mealsPerOrder: number;
  hours: number;
  rate: string;
  cardPct: number;
  cardCents: number;
}

const en = {
  titleA: 'Real logic. ',
  titleB: 'Your numbers.',
  intro: 'Running a meal-prep business? This is our planning calculator, cut down to two inputs. Put in your price and your weekly orders and see how many meals it takes to cover the kitchen and pay yourself.',
  toolLabel: 'Meal-Prep Planning Calculator',
  pricePerMeal: 'Price per meal',
  mealsPerWeek: 'Meals per week',
  mealsSuffix: 'meals',
  sliderLabel: 'Meals per week slider',
  breakEvenLabel: 'Break-even volume',
  noBreakEvenTitle: 'No volume breaks even.',
  noBreakEvenBody: (price: string, cost: string) =>
    `At ${price}, each meal costs ${cost} to make, pack, deliver and charge for. Selling more only loses more.`,
  mealsAWeek: 'meals a week',
  coverBefore: 'to cover the kitchen ',
  coverAnd: 'and',
  coverAfter: (price: string) => ` pay yourself. Each ${price} meal leaves`,
  coverEnd: ' after food, packaging, delivery and card fees.',
  toneGood: (meals: number, over: number) => `At ${meals} meals a week you’re past break-even by ${over}.`,
  toneWarn: (meals: number, short: number) => `At ${meals} meals a week the kitchen’s covered, but you’re ${short} short of paying yourself.`,
  toneBad: (meals: number, short: number) => `At ${meals} meals a week you’re ${short} short of break-even.`,
  noteLead: 'Two inputs, ten assumptions.',
  noteBody: (list: string) => ` Everything else is held at the full calculator’s starting plan: ${list}. Your real costs will move this number.`,
  assumptions: (a: AssumptionValues) => [
    `${a.food} food at ${a.local ? 'local' : 'distributor'} prices and ${a.packaging} packaging per meal`,
    `${a.spoilagePct}% spoilage`,
    `a ${a.kitchen}/month kitchen`,
    `${a.deliverySharePct}% of orders delivered at ${a.perDrop} a drop`,
    `${a.mealsPerOrder} meals an order`,
    `${a.hours} hours a week of your time at ${a.rate}/hr`,
    `${a.cardPct}% + ${a.cardCents}¢ card fees`,
  ],
  cta: 'Run it with your real costs',
  ctaNote: 'All twelve inputs, food-cost and prime-cost benchmarks, and a break-even chart. Free, no sign-up',
  ctaNoteEdited: ' — your two numbers come with you.',
};

const es: typeof en = {
  titleA: 'Lógica real. ',
  titleB: 'Sus números.',
  intro: '¿Tiene un negocio de comidas preparadas? Esta es nuestra calculadora de planificación, reducida a dos datos. Ingrese su precio y sus pedidos semanales y vea cuántas comidas necesita para cubrir la cocina y pagarse a usted mismo.',
  toolLabel: 'Calculadora de planificación de comidas preparadas',
  pricePerMeal: 'Precio por comida',
  mealsPerWeek: 'Comidas por semana',
  mealsSuffix: 'comidas',
  sliderLabel: 'Control deslizante de comidas por semana',
  breakEvenLabel: 'Volumen de equilibrio',
  noBreakEvenTitle: 'Ningún volumen alcanza el equilibrio.',
  noBreakEvenBody: (price: string, cost: string) =>
    `A ${price}, preparar, empacar, entregar y cobrar cada comida le cuesta ${cost}. Vender más solo aumenta la pérdida.`,
  mealsAWeek: 'comidas a la semana',
  coverBefore: 'para cubrir la cocina ',
  coverAnd: 'y',
  coverAfter: (price: string) => ` pagarse a usted mismo. Cada comida de ${price} le deja`,
  coverEnd: ' después de comida, empaque, entrega y comisiones de tarjeta.',
  toneGood: (meals: number, over: number) => `Con ${meals} comidas a la semana, supera el punto de equilibrio por ${over}.`,
  toneWarn: (meals: number, short: number) => `Con ${meals} comidas a la semana, la cocina queda cubierta, pero le faltan ${short} para pagarse a usted mismo.`,
  toneBad: (meals: number, short: number) => `Con ${meals} comidas a la semana, le faltan ${short} para alcanzar el punto de equilibrio.`,
  noteLead: 'Dos datos, diez supuestos.',
  noteBody: (list: string) => ` Todo lo demás se mantiene en el plan inicial de la calculadora completa: ${list}. Sus costos reales cambiarán este número.`,
  assumptions: (a: AssumptionValues) => [
    `${a.food} de comida a precios ${a.local ? 'locales' : 'de distribuidor'} y ${a.packaging} de empaque por comida`,
    `${a.spoilagePct}% de merma`,
    `una cocina de ${a.kitchen} al mes`,
    `${a.deliverySharePct}% de los pedidos entregados a ${a.perDrop} por entrega`,
    `${a.mealsPerOrder} comidas por pedido`,
    `${a.hours} horas a la semana de su tiempo a ${a.rate}/hora`,
    `${a.cardPct}% + ${a.cardCents}¢ de comisiones de tarjeta`,
  ],
  cta: 'Calcúlelo con sus costos reales',
  ctaNote: 'Los doce datos, referencias de costo de alimentos y costo primo, y una gráfica de punto de equilibrio. Gratis y sin registrarse',
  ctaNoteEdited: '; sus dos números se pasan a la calculadora.',
};

export default { en, es };
