// /meal-prep-calculator page and its break-even chart.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).
// A .tsx file because a few sentences carry inline <strong>/<em>.

import type { ReactNode } from 'react';

type FieldKey =
  | 'mealsPerWeek' | 'pricePerMeal' | 'foodCostPerMeal' | 'packagingPerMeal' | 'spoilagePct'
  | 'kitchenCostMonthly' | 'deliverySharePct' | 'deliveryCostPerDrop' | 'mealsPerOrder'
  | 'ownerHoursPerWeek' | 'ownerHourlyTarget';
type FieldText = { label: string; suffix?: string; note: string };
type RangePos = 'within' | 'above' | 'below';

const en = {
  groups: { menu: 'Your menu', kitchen: 'Kitchen and delivery', time: 'Your own time' },
  fields: {
    mealsPerWeek: { label: 'Meals per week', suffix: 'meals',
      note: 'A starting point for a solo operator. Slide it and watch where you cross break-even on the chart.' },
    pricePerMeal: { label: 'Price per meal',
      note: '$12 is the example price used throughout this page. Check what meal-prep sellers near you charge.' },
    foodCostPerMeal: { label: 'Food cost per meal',
      note: '31% of a $12 meal before spoilage — inside the standard 28–32% food-cost band. Cost your real recipe, ingredient by ingredient, at broadline prices.' },
    packagingPerMeal: { label: 'Packaging per meal',
      note: 'Container, lid and label. A planning figure — swap in your supplier’s quote.' },
    spoilagePct: { label: 'Spoilage and waste', suffix: '% of food',
      note: 'Trim, over-production and meals that don’t sell. A planning allowance, not an industry benchmark — track your own.' },
    kitchenCostMonthly: { label: 'Kitchen cost per month',
      note: 'Commissary kitchens run $15–40 an hour or $300–1,200 a month; most small operators spend $400–800 a month all in. $600 is the middle of that.' },
    deliverySharePct: { label: 'Share of orders delivered', suffix: '%',
      note: 'Half delivered, half picked up. Pickup-only? Set it to 0.' },
    deliveryCostPerDrop: { label: 'Delivery cost per drop',
      note: 'Food delivery typically costs $5–8 a drop, whether that’s a courier or your own time, fuel and mileage.' },
    mealsPerOrder: { label: 'Meals per order', suffix: 'meals',
      note: 'Delivery and the 30¢ card fee are charged per order, not per meal. Four $12 meals is a $48 order — inside the typical $35–60 average order value.' },
    ownerHoursPerWeek: { label: 'Your hours per week', suffix: 'hrs',
      note: 'Shopping, prep, cooking, packing, delivery, customer messages, social posts. Count all of it.' },
    ownerHourlyTarget: { label: 'What you need to pay yourself', suffix: '/hr',
      note: 'What you’d have to pay someone else to do this work. Put $0 and the business is quietly borrowing from you.' },
  } as Record<FieldKey, FieldText>,
  mealsSlider: 'Meals per week slider',

  copyLink: {
    lead: 'Rather not give an email?',
    button: 'Copy a link to these numbers',
    tail: 'to bookmark or share.',
    copied: 'Link copied.',
    failed: 'Couldn’t reach your clipboard. Here’s the link: ',
  },

  badge: 'Free Planning Tool',
  title: (accent: (s: string) => ReactNode) => <>Does your meal-prep business {accent('actually work?')}</>,
  intro: 'Most new meal-prep businesses set prices from the grocery receipt and forget the kitchen, the containers, the delivery runs and their own time. Put in your numbers and see how many meals a week it takes to cover all of it. No sign-up, nothing to unlock — the results update as you type.',

  sourcingGroup: 'Where you buy ingredients',
  sourcing: 'Sourcing',
  sourcingOptions: { broadline: 'Broadline', local: 'Local' },
  sourcingNote: (premium: number) => `Broadline means a foodservice distributor; local means farms, butchers and markets. Local protein and produce run meaningfully higher, so choosing Local adds ${premium}% to your food cost. That’s our planning assumption, not a published figure — your supplier quotes beat it.`,
  cardProcessing: { strong: 'Card processing', rest: ' is included automatically at 2.9% + 30¢ per order, a common online card rate.' },
  reset: 'Reset to defaults',

  headlineLabel: 'Break-even volume — the number that matters most',
  neverTitle: 'No volume breaks even.',
  neverBody: (cost: string, price: string) => `Each meal costs ${cost} to make, pack, deliver and charge for, and sells for ${price}. Selling more only loses more. Raise the price or cut per-meal costs first.`,
  mealsAWeek: 'meals a week',
  covers: (pay: string, kitchenOnly: number | null) => (
    <>to cover the kitchen <em>and</em> pay yourself {pay}/hr{kitchenOnly !== null && <> ({kitchenOnly} meals covers the kitchen alone)</>}.</>
  ),
  pastBreakEven: (meals: number, over: number) => `At ${meals} meals a week you’re past break-even by ${over} meals.`,
  kitchenCovered: (meals: number, short: number) => `At ${meals} meals a week the kitchen’s covered, but you’re ${short} meals short of paying yourself.`,
  shortOfBreakEven: (meals: number, short: number) => `At ${meals} meals a week you’re ${short} meals short of break-even.`,
  chartCaption: 'The orange line is what your meals bring in after their own costs. Where it crosses a dashed line, that cost is covered. Your hours are treated as fixed at what you entered — in practice they grow with volume.',

  forgottenKitchen: 'The kitchen everyone forgets',
  shiftInsight: (price: string, margin: string, shiftMeals: number) => (
    <>After food, packaging, delivery and card fees, each {price} meal leaves you <strong className="text-white">{margin}</strong>. A single four-hour kitchen shift at $25 an hour costs $100 — so it takes{' '}<strong className="text-white">{shiftMeals} meals a week</strong> just to pay for the shift, before you’ve paid yourself a cent. Grocery-receipt pricing never shows you that number.</>
  ),
  shiftNever: (margin: string) => (
    <>At these numbers each meal leaves <strong className="text-red-400">{margin}</strong> after food, packaging, delivery and card fees — so not even a $100 four-hour kitchen shift ever gets paid for.</>
  ),

  foodTwoWays: 'Food cost, measured two ways',
  foodAlone: 'Food alone ÷ revenue',
  range: (pos: RangePos, low: number, high: number) => `${{ within: 'Inside', above: 'Above', below: 'Below' }[pos]} the ${low}–${high}% range`,
  tiers: { Budget: 'Budget', Standard: 'Standard', 'Premium / organic': 'Premium / organic' } as Record<string, string>,
  band: (tier: string) => `${tier} band`,
  foodAloneBody: (local: boolean, below: boolean) => (
    <>Food (with spoilage{local ? ' and the local premium' : ''}) against <strong className="text-slate-200">revenue</strong>: what your books record, including any delivery fees you charge and net of discounts. Budget 25–28%, standard 28–32%, premium or organic 35–40%.{below && ' Low isn’t automatically good — check every ingredient is costed.'}</>
  ),
  foodPackaging: 'Food + packaging ÷ menu price',
  foodPackagingBody: <>Food plus packaging against <strong className="text-slate-200">gross menu price</strong>: before discounts, without delivery fees. This range comes from guidance for small operators with simpler meals, so it’s the tighter target.</>,
  overlapNote: 'The ranges overlap at 28–30%, but a figure in that band doesn’t mean the same thing in both. This calculator doesn’t model delivery fees or discounts, so revenue and menu price are the same here — in your own books they usually aren’t. Check which denominator your figure uses before you compare it.',

  primeCost: 'Prime cost',
  primeNeedsMeal: 'Needs at least one meal a week',
  primeGood: (target: number) => `At or under the ${target}% target`,
  primeWarn: (max: number, target: number) => `Under ${max}%, above the ${target}% target`,
  primeBad: (max: number) => `Over the ${max}% ceiling`,
  primeBody: 'Food plus labour (your pay at your target rate) over revenue. The usual guide is under 65%, aiming for 60%.',
  labourAlone: (p: string) => ` Labour alone is ${p} here; 25–35% is typical.`,

  contribution: 'Contribution per meal',
  contributionBody: 'What each meal leaves toward the kitchen and your pay:',
  breakdown: { price: 'price', food: 'food', packaging: 'packaging', delivery: 'delivery', processing: 'card processing' },

  breakEvenVolume: 'Break-even volume',
  never: 'Never',
  perWeek: (n: number) => `${n}/wk`,
  breakEvenNeverBody: 'Each meal loses money before fixed costs, so more volume makes it worse.',
  breakEvenBody: (kitchen: string, pay: string, orders: number) => `Meals a week to cover ${kitchen} of kitchen and ${pay} of your pay each week. About ${orders} orders.`,

  monthlyRevenue: 'Monthly revenue',
  monthlyRevenueBody: (meals: number, price: string, aov: string) => `${meals} meals a week × ${price} × 52 weeks ÷ 12. Average order value here is ${aov}; $35–60 is typical.`,

  monthlyProfit: 'Monthly profit',
  netMargin: (p: string) => `${p} net margin · 10–20% is typical once established`,
  profitBody: (pay: string) => <>After every cost <em>and</em> paying yourself {pay}/hr.</>,
  takeHome: (takeHome: string, hourly: string, hours: number, hourlyClass: string) => (
    <> Before paying yourself, the business leaves you {takeHome} a month —{' '}<strong className={hourlyClass}>{hourly} an hour</strong> for your {hours} hours a week.</>
  ),

  cogsTrap: 'The COGS trap',
  cogsTitle: 'Ingredients aren’t your cost of goods.',
  cogsBody: 'In meal prep, cost of goods sold has to include packaging, delivery, labour and spoilage — not just what’s on the grocery receipt. Operators who leave them out routinely find their true COGS above 55%, and sometimes over 100% on individual meals.',
  receiptRow: 'What the receipt says (food + packaging)',
  trueRow: 'True COGS (+ spoilage, delivery, your labour)',
  whiteTick: (n: number) => `White tick: ${n}%.`,
  cogsOver100: (meals: number) => `At ${meals} meals a week, each meal costs more to make, pack, deliver and staff than it sells for.`,
  cogsWarn: (n: number) => `Your true COGS is above ${n}% — the gap between the two bars is the money grocery-receipt pricing doesn’t see.`,
  cogsGood: (n: number) => `True COGS under ${n}% with everything counted.`,
  cogsEmpty: 'Enter a price and at least one meal a week to compare.',

  emailTitle: 'Want a copy of these numbers?',
  emailBody: 'We’ll email you a summary of what you entered and what it works out to, so you can come back to it.',

  benchmarks: 'Benchmarks',
  benchmarksTitle: 'Industry ranges, not rules.',
  benchmarksBody: 'These are ranges to measure your own numbers against. Treating “30% food cost” as a hard target without checking your own costs does more harm than not knowing the benchmark at all. A premium menu can run a higher food cost and still work; a budget menu at 25% can still lose money on delivery.',
  denominatorTitle: 'Check the denominator',
  denominatorBody: 'The two food ranges below measure different things against different bases. 28–35% is food alone against revenue, which includes delivery fees and is net of discounts. 22–30% is food plus packaging against gross menu price, before discounts and without delivery fees. They overlap at 28–30%, but a number in that band doesn’t mean the same thing in both — so work out your own figure on the same base as the range you compare it to.',
  benchmarkList: [
    ['Food cost', '28–35% of revenue: food alone, against revenue including delivery fees and net of discounts. Budget 25–28%, standard 28–32%, premium or organic 35–40%.'],
    ['Food + packaging', '22–30% of menu price: food plus packaging, against gross menu price before discounts and without delivery fees. Aimed at small operators with simpler meals, so it’s the tighter target.'],
    ['Labour', '25–35% of revenue.'],
    ['Prime cost (food + labour)', 'Under 65%, with 60% a common target.'],
    ['Net margin', '10–20% once established. Expect less in the first months.'],
    ['Average order value', '$35–60.'],
    ['Commissary kitchen', '$15–40 an hour or $300–1,200 a month; most small operators spend $400–800 a month all in.'],
    ['Delivery', '$5–8 per drop.'],
  ] as [string, string][],

  ctaBody: 'Running a meal-prep business already? We build ordering platforms around a weekly menu and cutoff.',
  ctaLink: 'See the Case Studies',

  mobileNever: 'No volume breaks even',
  mobileBreakEven: 'Break-even',
  mobileYou: 'You',
  perMeal: '/meal',
  results: 'Results',

  chart: {
    legendSeries: 'What your meals cover',
    legendKitchenPay: 'Kitchen + your pay',
    legendKitchen: 'Kitchen',
    legendKitchenAlone: 'Kitchen alone',
    perWeekSuffix: '/wk',
    coversKitchen: (n: number) => `${n} covers the kitchen`,
    breakEven: (n: number) => `${n} = break-even`,
    summaryNever: (loss: string, fixed: string) => `Each meal loses ${loss} before fixed costs, so no weekly volume covers the ${fixed} of weekly fixed costs.`,
    summary: (cm: string, fixed: string, be: number, entered: number) => `Weekly contribution rises by $${cm} a meal. It covers the ${fixed} of weekly fixed costs at ${be} meals a week. You entered ${entered}.`,
    xAxis: 'Meals sold per week',
    you: (n: number, mark: string) => `You: ${n}/wk ${mark}`,
    hover: (meals: number, value: string, fixed: string, gap: ReactNode) => (
      <>At <strong className="text-white">{meals} meals</strong>, meals cover {value} of {fixed} a week —{' '}{gap}.</>
    ),
    ahead: (v: string) => `${v} ahead`,
    short: (v: string) => `${v} short`,
    hint: 'Hover or drag across the chart to see any volume.',
    showTable: 'Show as a table',
    cols: ['Meals/wk', 'Meals cover', 'Fixed costs', 'Ahead / short'],
    youRow: ' (you)',
  },
};

const es: typeof en = {
  groups: { menu: 'Su menú', kitchen: 'Cocina y entregas', time: 'Su propio tiempo' },
  fields: {
    mealsPerWeek: { label: 'Comidas por semana', suffix: 'comidas',
      note: 'Un punto de partida para quien trabaja solo. Mueva el control y vea en el gráfico dónde cruza el punto de equilibrio.' },
    pricePerMeal: { label: 'Precio por comida',
      note: '$12 es el precio de ejemplo que se usa en toda esta página. Averigüe cuánto cobran los vendedores de comidas preparadas cerca de usted.' },
    foodCostPerMeal: { label: 'Costo de alimentos por comida',
      note: '31% de una comida de $12 antes de mermas, dentro de la franja estándar de 28–32% de costo de alimentos. Calcule el costo de su receta real, ingrediente por ingrediente, a precios de distribuidor mayorista.' },
    packagingPerMeal: { label: 'Empaque por comida',
      note: 'Envase, tapa y etiqueta. Es una cifra de planificación: reemplácela con la cotización de su proveedor.' },
    spoilagePct: { label: 'Mermas y desperdicio', suffix: '% de alimentos',
      note: 'Recortes, sobreproducción y comidas que no se venden. Es un margen de planificación, no un referente de la industria: lleve el registro de las suyas.' },
    kitchenCostMonthly: { label: 'Costo de cocina por mes',
      note: 'Las cocinas comerciales compartidas cuestan $15–40 por hora o $300–1,200 al mes; la mayoría de los operadores pequeños gastan $400–800 al mes en total. $600 es el punto medio.' },
    deliverySharePct: { label: 'Porcentaje de pedidos con entrega', suffix: '%',
      note: 'La mitad con entrega a domicilio y la mitad para recoger. ¿Solo para recoger? Póngalo en 0.' },
    deliveryCostPerDrop: { label: 'Costo por entrega',
      note: 'Una entrega de comida suele costar $5–8, ya sea con un servicio de mensajería o con su propio tiempo, gasolina y millaje.' },
    mealsPerOrder: { label: 'Comidas por pedido', suffix: 'comidas',
      note: 'La entrega y la tarifa de tarjeta de 30¢ se cobran por pedido, no por comida. Cuatro comidas de $12 son un pedido de $48, dentro del valor promedio típico de $35–60 por pedido.' },
    ownerHoursPerWeek: { label: 'Sus horas por semana', suffix: 'h',
      note: 'Compras, preparación, cocina, empaque, entregas, mensajes de clientes, publicaciones en redes sociales. Cuéntelo todo.' },
    ownerHourlyTarget: { label: 'Lo que necesita pagarse a sí mismo', suffix: '/h',
      note: 'Lo que tendría que pagarle a otra persona por hacer este trabajo. Si pone $0, el negocio le está pidiendo dinero prestado a usted sin que se note.' },
  },
  mealsSlider: 'Control deslizante de comidas por semana',

  copyLink: {
    lead: '¿Prefiere no dar su correo electrónico?',
    button: 'Copie un enlace con estas cifras',
    tail: 'para guardarlo o compartirlo.',
    copied: 'Enlace copiado.',
    failed: 'No se pudo acceder a su portapapeles. Este es el enlace: ',
  },

  badge: 'Herramienta de planificación gratuita',
  title: (accent) => <>¿Su negocio de comidas preparadas {accent('realmente funciona?')}</>,
  intro: 'La mayoría de los negocios nuevos de comidas preparadas fijan sus precios según el recibo del supermercado y se olvidan de la cocina, los envases, las entregas y su propio tiempo. Ingrese sus cifras y vea cuántas comidas por semana necesita para cubrirlo todo. Sin registrarse y sin nada que desbloquear: los resultados se actualizan mientras escribe.',

  sourcingGroup: 'Dónde compra los ingredientes',
  sourcing: 'Abastecimiento',
  sourcingOptions: { broadline: 'Mayorista', local: 'Local' },
  sourcingNote: (premium) => `Mayorista significa un distribuidor de servicios de alimentos; local significa granjas, carnicerías y mercados. Las proteínas y los productos frescos locales cuestan bastante más, así que elegir Local suma un ${premium}% a su costo de alimentos. Es nuestra suposición de planificación, no una cifra publicada: las cotizaciones de sus proveedores valen más que esta cifra.`,
  cardProcessing: { strong: 'El procesamiento de tarjetas', rest: ' se incluye automáticamente a 2.9% + 30¢ por pedido, una tarifa común para pagos con tarjeta en línea.' },
  reset: 'Restablecer valores predeterminados',

  headlineLabel: 'Volumen de equilibrio: la cifra que más importa',
  neverTitle: 'Ningún volumen alcanza el punto de equilibrio.',
  neverBody: (cost, price) => `Preparar, empacar, entregar y cobrar cada comida cuesta ${cost}, y se vende a ${price}. Vender más solo significa perder más. Primero suba el precio o reduzca los costos por comida.`,
  mealsAWeek: 'comidas por semana',
  covers: (pay, kitchenOnly) => (
    <>para cubrir la cocina <em>y</em> pagarse {pay}/h{kitchenOnly !== null && <> ({kitchenOnly} comidas cubren solo la cocina)</>}.</>
  ),
  pastBreakEven: (meals, over) => `Con ${meals} comidas por semana, supera el punto de equilibrio por ${over} comidas.`,
  kitchenCovered: (meals, short) => `Con ${meals} comidas por semana la cocina está cubierta, pero le faltan ${short} comidas para pagarse a sí mismo.`,
  shortOfBreakEven: (meals, short) => `Con ${meals} comidas por semana le faltan ${short} comidas para llegar al punto de equilibrio.`,
  chartCaption: 'La línea naranja es lo que dejan sus comidas después de sus propios costos. Donde cruza una línea punteada, ese costo queda cubierto. Sus horas se consideran fijas según lo que ingresó; en la práctica, aumentan con el volumen.',

  forgottenKitchen: 'La cocina que todos olvidan',
  shiftInsight: (price, margin, shiftMeals) => (
    <>Después de alimentos, empaque, entrega y tarifas de tarjeta, cada comida de {price} le deja <strong className="text-white">{margin}</strong>. Un solo turno de cocina de cuatro horas a $25 la hora cuesta $100, así que se necesitan{' '}<strong className="text-white">{shiftMeals} comidas por semana</strong> solo para pagar ese turno, antes de pagarse a sí mismo un centavo. Fijar precios según el recibo del supermercado nunca le muestra esa cifra.</>
  ),
  shiftNever: (margin) => (
    <>Con estas cifras, cada comida deja <strong className="text-red-400">{margin}</strong> después de alimentos, empaque, entrega y tarifas de tarjeta, así que ni siquiera un turno de cocina de cuatro horas de $100 llega a pagarse.</>
  ),

  foodTwoWays: 'Costo de alimentos, medido de dos maneras',
  foodAlone: 'Solo alimentos ÷ ingresos',
  range: (pos, low, high) => `${{ within: 'Dentro del', above: 'Por encima del', below: 'Por debajo del' }[pos]} rango de ${low}–${high}%`,
  tiers: { Budget: 'Económica', Standard: 'Estándar', 'Premium / organic': 'Premium / orgánica' },
  band: (tier) => `Franja ${tier.toLowerCase()}`,
  foodAloneBody: (local, below) => (
    <>Alimentos (con mermas{local ? ' y el sobrecosto local' : ''}) frente a los <strong className="text-slate-200">ingresos</strong>: lo que registra su contabilidad, incluidas las tarifas de entrega que cobre y neto de descuentos. Económica 25–28%, estándar 28–32%, premium u orgánica 35–40%.{below && ' Un porcentaje bajo no siempre es bueno: verifique que cada ingrediente tenga su costo.'}</>
  ),
  foodPackaging: 'Alimentos + empaque ÷ precio de menú',
  foodPackagingBody: <>Alimentos más empaque frente al <strong className="text-slate-200">precio bruto de menú</strong>: antes de descuentos y sin tarifas de entrega. Este rango proviene de recomendaciones para operadores pequeños con comidas más sencillas, por eso es la meta más exigente.</>,
  overlapNote: 'Los rangos se superponen en 28–30%, pero una cifra en esa franja no significa lo mismo en ambos. Esta calculadora no incluye tarifas de entrega ni descuentos, así que aquí los ingresos y el precio de menú son iguales; en su propia contabilidad normalmente no lo son. Verifique qué denominador usa su cifra antes de compararla.',

  primeCost: 'Costo primo',
  primeNeedsMeal: 'Se necesita al menos una comida por semana',
  primeGood: (target) => `En la meta de ${target}% o por debajo`,
  primeWarn: (max, target) => `Por debajo de ${max}%, por encima de la meta de ${target}%`,
  primeBad: (max) => `Por encima del límite de ${max}%`,
  primeBody: 'Alimentos más mano de obra (su pago a la tarifa que fijó) sobre los ingresos. La guía habitual es menos de 65%, con una meta de 60%.',
  labourAlone: (p) => ` Aquí, la mano de obra sola es ${p}; lo típico es 25–35%.`,

  contribution: 'Contribución por comida',
  contributionBody: 'Lo que cada comida aporta para la cocina y su pago:',
  breakdown: { price: 'precio', food: 'alimentos', packaging: 'empaque', delivery: 'entrega', processing: 'procesamiento de tarjetas' },

  breakEvenVolume: 'Volumen de equilibrio',
  never: 'Nunca',
  perWeek: (n) => `${n}/sem`,
  breakEvenNeverBody: 'Cada comida pierde dinero antes de los costos fijos, así que más volumen lo empeora.',
  breakEvenBody: (kitchen, pay, orders) => `Comidas por semana para cubrir ${kitchen} de cocina y ${pay} de su pago cada semana. Unos ${orders} pedidos.`,

  monthlyRevenue: 'Ingresos mensuales',
  monthlyRevenueBody: (meals, price, aov) => `${meals} comidas por semana × ${price} × 52 semanas ÷ 12. Aquí, el valor promedio por pedido es ${aov}; lo típico es $35–60.`,

  monthlyProfit: 'Ganancia mensual',
  netMargin: (p) => `${p} de margen neto · lo típico es 10–20% una vez establecido`,
  profitBody: (pay) => <>Después de todos los costos <em>y</em> de pagarse {pay}/h.</>,
  takeHome: (takeHome, hourly, hours, hourlyClass) => (
    <> Antes de pagarse a sí mismo, el negocio le deja {takeHome} al mes:{' '}<strong className={hourlyClass}>{hourly} por hora</strong> por sus {hours} horas semanales.</>
  ),

  cogsTrap: 'La trampa del costo de ventas',
  cogsTitle: 'Los ingredientes no son todo su costo de ventas.',
  cogsBody: 'En las comidas preparadas, el costo de ventas tiene que incluir empaque, entrega, mano de obra y mermas, no solo lo que aparece en el recibo del supermercado. Los operadores que los dejan fuera suelen descubrir que su costo de ventas real supera el 55%, y a veces el 100% en comidas individuales.',
  receiptRow: 'Lo que dice el recibo (alimentos + empaque)',
  trueRow: 'Costo de ventas real (+ mermas, entrega, su mano de obra)',
  whiteTick: (n) => `Marca blanca: ${n}%.`,
  cogsOver100: (meals) => `Con ${meals} comidas por semana, preparar, empacar, entregar y atender cada comida cuesta más de lo que se vende.`,
  cogsWarn: (n) => `Su costo de ventas real supera el ${n}%: la diferencia entre las dos barras es el dinero que no ve quien fija precios según el recibo del supermercado.`,
  cogsGood: (n) => `Costo de ventas real por debajo de ${n}%, contando todo.`,
  cogsEmpty: 'Ingrese un precio y al menos una comida por semana para comparar.',

  emailTitle: '¿Quiere una copia de estas cifras?',
  emailBody: 'Le enviaremos por correo electrónico un resumen de lo que ingresó y de los resultados, para que pueda volver a consultarlo.',

  benchmarks: 'Referentes',
  benchmarksTitle: 'Rangos de la industria, no reglas.',
  benchmarksBody: 'Son rangos para comparar sus propias cifras. Tomar el “30% de costo de alimentos” como una meta rígida sin revisar sus propios costos hace más daño que no conocer el referente. Un menú premium puede tener un costo de alimentos más alto y aun así funcionar; un menú económico al 25% todavía puede perder dinero en las entregas.',
  denominatorTitle: 'Revise el denominador',
  denominatorBody: 'Los dos rangos de alimentos de abajo miden cosas distintas sobre bases distintas. 28–35% es solo alimentos frente a ingresos, que incluyen tarifas de entrega y son netos de descuentos. 22–30% es alimentos más empaque frente al precio bruto de menú, antes de descuentos y sin tarifas de entrega. Se superponen en 28–30%, pero una cifra en esa franja no significa lo mismo en ambos, así que calcule su propia cifra sobre la misma base que el rango con el que la compara.',
  benchmarkList: [
    ['Costo de alimentos', '28–35% de los ingresos: solo alimentos, frente a ingresos que incluyen tarifas de entrega y son netos de descuentos. Económica 25–28%, estándar 28–32%, premium u orgánica 35–40%.'],
    ['Alimentos + empaque', '22–30% del precio de menú: alimentos más empaque, frente al precio bruto de menú antes de descuentos y sin tarifas de entrega. Pensado para operadores pequeños con comidas más sencillas, por eso es la meta más exigente.'],
    ['Mano de obra', '25–35% de los ingresos.'],
    ['Costo primo (alimentos + mano de obra)', 'Menos de 65%, con una meta común de 60%.'],
    ['Margen neto', '10–20% una vez establecido. Espere menos en los primeros meses.'],
    ['Valor promedio por pedido', '$35–60.'],
    ['Cocina comercial compartida', '$15–40 por hora o $300–1,200 al mes; la mayoría de los operadores pequeños gastan $400–800 al mes en total.'],
    ['Entrega', '$5–8 por entrega.'],
  ],

  ctaBody: '¿Ya tiene un negocio de comidas preparadas? Creamos plataformas de pedidos basadas en un menú semanal con fecha límite para ordenar.',
  ctaLink: 'Ver los casos de estudio',

  mobileNever: 'Ningún volumen alcanza el equilibrio',
  mobileBreakEven: 'Equilibrio',
  mobileYou: 'Usted',
  perMeal: '/comida',
  results: 'Resultados',

  chart: {
    legendSeries: 'Lo que cubren sus comidas',
    legendKitchenPay: 'Cocina + su pago',
    legendKitchen: 'Cocina',
    legendKitchenAlone: 'Solo cocina',
    perWeekSuffix: '/sem',
    coversKitchen: (n) => `${n} cubren la cocina`,
    breakEven: (n) => `${n} = equilibrio`,
    summaryNever: (loss, fixed) => `Cada comida pierde ${loss} antes de los costos fijos, así que ningún volumen semanal cubre los ${fixed} de costos fijos semanales.`,
    summary: (cm, fixed, be, entered) => `La contribución semanal aumenta $${cm} por comida. Cubre los ${fixed} de costos fijos semanales con ${be} comidas por semana. Usted ingresó ${entered}.`,
    xAxis: 'Comidas vendidas por semana',
    you: (n, mark) => `Usted: ${n}/sem ${mark}`,
    hover: (meals, value, fixed, gap) => (
      <>Con <strong className="text-white">{meals} comidas</strong>, las comidas cubren {value} de {fixed} por semana:{' '}{gap}.</>
    ),
    ahead: (v) => `${v} de sobra`,
    short: (v) => `faltan ${v}`,
    hint: 'Pase el cursor o deslice el dedo sobre el gráfico para ver cualquier volumen.',
    showTable: 'Mostrar como tabla',
    cols: ['Comidas/sem', 'Cubren las comidas', 'Costos fijos', 'De sobra / faltante'],
    youRow: ' (usted)',
  },
};

const mealPrepCalculator = { en, es };
export default mealPrepCalculator;
