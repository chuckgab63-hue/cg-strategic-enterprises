// Spanish copy for the meal-prep feature pages (same structure as mealPrepFeaturesEn.ts).
// NEEDS NATIVE REVIEW: every string is listed in docs/SPANISH_REVIEW.md.
// Natural Latin American / US Spanish, always usted.

import type { FeaturePage } from './mealPrepFeatures.ts';

export const FEATURE_PAGES_ES: FeaturePage[] = [
  {
    slug: 'subscriptions',
    navTitle: 'Suscripciones e ingresos recurrentes',
    eyebrow: 'Suscripciones e ingresos recurrentes',
    title: 'Software de suscripciones para comidas preparadas: planes semanales que funcionan solos',
    intro:
      'Sus clientes se suscriben una vez y luego saltan una semana, cambian sus comidas, pausan o cancelan por su cuenta. Usted tiene una semana con la que puede planear, cobrada en su propia cuenta de Stripe.',
    card: 'Planes semanales que los clientes manejan solos: saltar, pausar, cambiar o cancelar, con cobro cada semana.',
        problem: [
      'Cada semana ando detrás de las mismas personas por mensajes: ¿entra esta semana?, ¿qué comidas quiere?, ¿ya pagó? Si se me pasa un solo mensaje, las cuentas de la semana se descuadran.',
      'Quiero que la gente se suscriba una vez y que la semana funcione sola, y no quiero perder a un cliente solo porque va a estar de viaje una semana.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Elegir un plan y empezar',
        body: 'El cliente elige un plan semanal (un número de comidas a un precio por comida), escoge entrega o recogida y confirma. En su propio sitio, el cliente agrega una tarjeta con Stripe, en su propia cuenta de Stripe, y cada semana se cobra después de la fecha límite de pedidos.',
        screen: { id: 'store-plans', alt: 'La página de planes de la tienda de la demo con tres planes semanales y un precio por comida', caption: 'La página de planes. En la demo no se cobra nada.' },
      },
      {
        side: 'customer',
        title: 'Saltar, pausar, cambiar o cancelar antes de la fecha límite',
        body: 'En la página de su cuenta, el cliente ve su plan, su próxima entrega y las semanas que vienen, con la fecha límite para hacer cambios.',
        points: [
          'Saltar cualquier semana: sin entrega y sin cobro.',
          'Elegir otras comidas para una semana, o dejar que la llenen sus favoritas guardadas o las recomendaciones de su chef.',
          'Pausar todo el plan hasta una fecha, cambiar a más o menos comidas por semana, o cancelar.',
          'Cuando pasa la fecha límite de una semana, esa semana se bloquea y su cocina planea con ella.',
        ],
        screen: { id: 'my-plan', alt: 'La página Mi plan de un cliente con las próximas semanas y las opciones de saltar, cambiar o pausar', caption: 'Mi plan, como lo ve el cliente.' },
      },
      {
        side: 'admin',
        title: 'Ver a cada suscriptor e intervenir cuando haga falta',
        body: 'La página Suscripciones muestra a cada suscriptor con lo que hace esta semana: recibe entrega, salta o está en pausa. Puede filtrar por activos, en pausa, saltando esta semana, cancelados o con pago fallido, y buscar por nombre.',
        points: [
          'Abra a un cliente para ver exactamente lo que él ve, y salte una semana, elija comidas, pause, cambie las comidas por semana o cancele por él. Cada cambio queda en el Registro de auditoría.',
          'Elija qué recibe un cliente que no escoge sus comidas: sus favoritas o las recomendaciones de su chef.',
          'En su propio sitio, un pago semanal rechazado se marca aquí y en Pedidos, y el cliente recibe un correo con un enlace para actualizar su tarjeta.',
          'Si alguna vez pausa los cobros o detiene las nuevas suscripciones, los clientes con un plan semanal reciben un correo en inglés o en español, además del aviso en su cuenta.',
        ],
        screen: { id: 'admin-subscriptions', alt: 'La página Suscripciones de la administración con el conteo de planes activos, en pausa, saltando y cancelados', caption: 'Suscripciones en la administración.' },
      },
    ],
    features: ['subscriptions'],
    grow: [
      { title: 'Ingresos recurrentes con los que puede planear', body: 'A los suscriptores se les cobra cada semana después de la fecha límite de pedidos, así que usted sabe lo que viene antes de comprar y cocinar.' },
      { title: 'Una mejor opción que cancelar', body: 'Un cliente que está fuera una semana puede saltarla en un par de toques en lugar de cancelar por mensaje, y sigue en su plan cuando regresa.' },
      { title: 'Menos tiempo de administración', body: 'El plan hace el pedido de cada semana por el cliente. Usted deja de juntar pedidos por mensaje y parte de una lista que ya está lista.' },
    ],
    demo: [
      { label: 'La página de planes', path: '/plans', side: 'customer' },
      { label: 'La cuenta y el plan de un cliente', path: '/account', side: 'customer' },
      { label: 'Suscriptores', path: '/admin/subscriptions', side: 'admin' },
      { label: 'Planes que ofrece', path: '/admin/plans', side: 'admin' },
    ],
    faq: [
      { id: 'skip-pause', question: '¿Pueden los clientes saltar una semana o pausar por su cuenta?', answer: 'Sí. Antes de la fecha límite de pedidos de una semana pueden saltarla, cambiar sus comidas, pausar el plan hasta una fecha, cambiar cuántas comidas reciben o cancelar. Después de la fecha límite la semana se bloquea para que su cocina pueda planear.' },
      { id: 'who-gets-paid', question: '¿A dónde va el dinero? ¿Se quedan con una parte de cada pedido?', answer: 'Los pagos van a su propia cuenta de Stripe. No cobramos una comisión por pedido. Se aplican las comisiones de procesamiento de Stripe, como en cualquier pago con tarjeta.' },
      { id: 'failed-payment', question: '¿Qué pasa cuando falla un pago semanal?', answer: 'En su propio sitio, el pago fallido se marca en la página Suscripciones y en Pedidos, y el cliente recibe un correo con un enlace para actualizar su tarjeta.' },
      { id: 'pause-everything', question: '¿Puedo pausar los cobros de todos, por ejemplo si cierro una semana?', answer: 'Sí. En Configuración > Funciones puede pausar todos los cobros de los planes semanales o solo detener las nuevas suscripciones. La pantalla le muestra primero a quién afecta, los clientes reciben un correo en su idioma, y al activar de nuevo los planes semanales se reanudan exactamente esos planes.' },
    ],
    related: ['delivery-and-pickup', 'kitchen-operations', 'reports-and-insights'],
  },
  {
    slug: 'bigger-orders',
    navTitle: 'Pedidos más grandes',
    eyebrow: 'Pedidos más grandes',
    title: 'Comidas a su gusto, tamaños, extras y paquetes',
    intro:
      'Deje que sus clientes armen un plato con los macros a la vista, elijan un tamaño, agreguen extras y compren paquetes, y ponga un mínimo para que cada pedido valga el viaje.',
    card: 'Comidas a su gusto con macros, tamaños y extras, paquetes de comidas y un pedido mínimo.',
        problem: [
      'Mis clientes piden las mismas dos o tres comidas, y nadie prueba los extras porque tienen que escribirme para preguntar. Mientras tanto, un pedido pequeño que requiere un viaje de entrega apenas paga la gasolina.',
      'Quiero que la gente arme exactamente lo que quiere, vea el precio y los macros mientras elige, y gaste un poco más cada vez.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Armar su propia comida, con los macros sumándose mientras elige',
        body: 'El cliente escoge una proteína (porción normal o doble), un carbohidrato, una o dos verduras, una salsa y complementos. Mientras elige, se suman el precio, las calorías, la proteína, los carbohidratos y la grasa, junto con los alérgenos de lo que escogió. Si en el menú filtró un alérgeno, las opciones que lo contienen también se ocultan aquí.',
        screen: { id: 'byo', alt: 'La página Arme su tazón con opciones de proteína, tamaños de porción y un precio que se va sumando', caption: 'Arme su tazón en la tienda de la demo.' },
      },
      {
        side: 'customer',
        title: 'Tamaños y extras',
        body: 'En una comida que viene en tamaños, el cliente elige un tamaño y marca hasta dos extras. El precio y la nutrición cambian antes de que pase al carrito. Un extra que trae un alérgeno que la comida no tiene lo indica ahí mismo, de nuevo en el carrito, al pagar y en la etiqueta.',
        screen: { id: 'sizes', alt: 'La página de una comida con selector de tamaño y extras con costo', caption: 'Una comida con tamaños y extras.' },
      },
      {
        side: 'customer',
        title: 'Paquetes de comidas a su propio precio',
        body: 'Un paquete es un conjunto con una lista fija de comidas, como un paquete variado de diez comidas. Su página muestra lo que trae, los alérgenos de cada comida y la nutrición por comida promediada en todo el paquete.',
        screen: { id: 'bundle', alt: 'La página de un paquete variado de diez comidas con la lista de lo que incluye', caption: 'Un paquete de comidas y lo que incluye.' },
      },
      {
        side: 'customer',
        title: 'Un pedido mínimo, para que cada pedido valga la entrega',
        body: 'Ponga un mínimo para toda la tienda, uno más alto para una zona de entrega (se aplica el más alto), o venda una comida de pocas en pocas. El carrito dice qué falta y no deja avanzar al pago hasta que se cumple el mínimo.',
        screen: { id: 'minimums', alt: 'El carrito mostrando el mensaje del pedido mínimo', caption: 'El carrito explica qué falta.' },
      },
      {
        side: 'admin',
        title: 'Usted pone las reglas, y la cocina recibe las combinaciones exactas',
        body: 'En la página A su gusto define cuántas opciones de cada tipo elige el cliente, y agrega los componentes con sus tamaños, el precio que suma cada uno y su receta. Las calorías, los macros y los alérgenos salen de la receta y de su lista de Ingredientes. La cocina ve cada combinación en el Plan de producción, las etiquetas y las hojas de empaque.',
        screen: { id: 'admin-build-your-own', alt: 'La página A su gusto de la administración con las opciones y reglas', caption: 'Las reglas de A su gusto en la administración.' },
      },
    ],
    features: ['build_your_own', 'sizes_addons', 'bundles', 'order_minimums'],
    grow: [
      { title: 'Pedidos de mayor valor', body: 'Los tamaños, los extras y los paquetes permiten que un cliente gaste un poco más cada vez, en comidas que ya le gustan.' },
      { title: 'Menos pedidos que cuestan más de entregar de lo que dejan', body: 'Un pedido mínimo, por tienda o por zona de entrega, evita que los pedidos muy pequeños se coman su margen.' },
      { title: 'Menos idas y venidas', body: 'Los clientes personalizan solos y ven el precio y la nutrición al instante, y usted recibe una lista exacta en lugar de una cadena de mensajes.' },
    ],
    demo: [
      { label: 'Arme su tazón', path: '/menu', side: 'customer' },
      { label: 'Paquetes de comidas', path: '/menu/meal-packs', side: 'customer' },
      { label: 'Reglas de A su gusto', path: '/admin/build-your-own', side: 'admin' },
      { label: 'Lo pedido, por tamaño y extra', path: '/admin/variations', side: 'admin' },
    ],
    faq: [
      { id: 'kitchen-sees', question: '¿Mi cocina ve exactamente lo que armó cada cliente?', answer: 'Sí. Cada combinación, tamaño y extra aparece en el Plan de producción, las etiquetas y las hojas de empaque, y la página Variaciones cuenta cuántos de cada tamaño, extra y componente se pidieron para una semana de entrega.' },
      { id: 'allergens-nutrition', question: '¿Se actualizan los alérgenos y la nutrición cuando un cliente arma una comida?', answer: 'Sí. Los totales y los alérgenos salen de la receta y de su lista de Ingredientes, así que revíselos antes de ofrecer un componente. Se actualizan mientras el cliente elige, y un extra que trae un alérgeno nuevo lo indica.' },
      { id: 'plans-addons', question: '¿Los planes semanales pueden usar tamaños y extras?', answer: 'No. Los planes semanales toman el tamaño estándar de cada comida, sin extras. Los tamaños y los extras son para pedidos individuales.' },
      { id: 'minimums-pickup', question: '¿El pedido mínimo también se aplica a la recogida?', answer: 'El mínimo de la tienda se aplica a todos los pedidos, incluida la recogida. Una zona de entrega puede tener un mínimo más alto, y entonces se aplica el más alto. Los planes semanales no se ven afectados.' },
    ],
    related: ['kitchen-operations', 'labels', 'subscriptions'],
  },
  {
    slug: 'delivery-and-pickup',
    navTitle: 'Entrega y recogida',
    eyebrow: 'Entrega y recogida',
    title: 'Planificación de rutas de entrega, zonas, recogida y hojas de empaque',
    intro:
      'Zonas por código postal con su propio día y tarifa, hojas de ruta con las paradas en un orden lógico, puntos de recogida y una hoja de empaque para cada bolsa.',
    card: 'Zonas por código postal, días y fechas límite de entrega, puntos de recogida, hojas de ruta y hojas de empaque.',
        problem: [
      'El día de entrega es un caos. Ordeno direcciones en una hoja de cálculo, les mando a los repartidores el orden de las paradas por mensaje y escribo nombres en las bolsas, y gente de fuera de mi zona sigue pidiendo y luego quiere un reembolso.',
      'Necesito que el sistema sepa a dónde entrego, cuándo y cuánto cuesta, y que le dé una lista a mi repartidor.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Los clientes saben de inmediato si usted les entrega',
        body: 'Al pagar, el código postal del cliente encuentra su zona de entrega: su tarifa, su día de entrega y su pedido mínimo. Si queda fuera de todas las zonas, se le avisa y se le ofrecen sus puntos de recogida.',
        screen: { id: 'checkout-zone', alt: 'La pantalla de pago donde a un código postal fuera de las zonas se le ofrece recogida', caption: 'A un código postal fuera de las zonas se le ofrece recogida.' },
      },
      {
        side: 'admin',
        title: 'Fechas límite, días de entrega y zonas',
        body: 'En la página Entrega define su fecha límite de pedidos, sus días de entrega y el monto para entrega gratis. Cada zona es una lista de códigos postales con su propio día de entrega, tarifa, pedido mínimo y monto de entrega gratis, y el pago las usa automáticamente.',
        screen: { id: 'admin-delivery', alt: 'La página Entrega de la administración con la fecha límite, los días de entrega y las zonas', caption: 'Configuración de entrega y zonas.' },
      },
      {
        side: 'admin',
        title: 'Hojas de ruta para el día de entrega',
        body: 'Elija un día de entrega y sus pedidos se agrupan por zona, con las paradas de cada ruta en orden desde su cocina (la parada más cercana primero), además del nombre, teléfono, dirección, notas de entrega y número de comidas.',
        points: [
          'Imprima las hojas de ruta para su repartidor.',
          'Descargue un CSV para llevarlo a una aplicación de planificación de rutas si quiere optimizar más.',
          'Abra una ruta en Google Maps (las rutas largas se dividen en partes, como lo permite Google).',
        ],
        screen: { id: 'admin-routes', alt: 'La página Rutas de la administración con las paradas de cada ruta en orden', caption: 'Las rutas de un día de entrega.' },
      },
      {
        side: 'admin',
        title: 'Puntos de recogida',
        body: 'Anote los lugares donde los clientes pueden recoger sus comidas, como un gimnasio o un estudio. Si desactiva uno, desaparece del pago, y los pedidos anteriores conservan su nombre y dirección.',
        screen: { id: 'admin-pickup', alt: 'La página Puntos de recogida de la administración', caption: 'Puntos de recogida.' },
      },
      {
        side: 'admin',
        title: 'Una hoja de empaque para cada pedido',
        body: 'Una hoja por pedido para quien empaca la bolsa y para el repartidor: el cliente y su teléfono, la dirección de entrega o el punto de recogida, el día, la ruta y el número de parada (en el mismo orden que Rutas), las notas de entrega, y cada comida con su tamaño, opciones y extras. Imprima dos hojas por página o una.',
        screen: { id: 'admin-packing-slips', alt: 'La página Hojas de empaque de la administración con una hoja imprimible', caption: 'Una hoja de empaque lista para imprimir.' },
      },
    ],
    features: ['delivery_zones', 'route_sheets', 'pickup_locations', 'packing_slips'],
    grow: [
      { title: 'Menos tiempo de administración el día de entrega', body: 'Las rutas y las hojas de empaque salen directo de los pedidos de la semana, así que no tiene que armar el día a mano.' },
      { title: 'Menos errores en la puerta', body: 'Las hojas indican la ruta y el número de parada en el mismo orden que la hoja de ruta, así que la bolsa, el repartidor y la lista coinciden.' },
      { title: 'Más clientes atendidos', body: 'A quien está fuera de sus zonas no se le rechaza: se le ofrece recogida. Y cada zona puede tener su propio día, tarifa y mínimo, de modo que cada área que atiende tenga sentido para usted.' },
    ],
    demo: [
      { label: 'Configuración de entrega y zonas', path: '/admin/delivery', side: 'admin' },
      { label: 'Rutas', path: '/admin/routes', side: 'admin' },
      { label: 'Puntos de recogida', path: '/admin/pickup-locations', side: 'admin' },
      { label: 'Hojas de empaque', path: '/admin/packing-slips', side: 'admin' },
    ],
    faq: [
      { id: 'zone-fees', question: '¿Puede cada zona de entrega tener su propio día, tarifa y mínimo?', answer: 'Sí. Cada zona es una lista de códigos postales con su propio día de entrega, tarifa, pedido mínimo y monto de entrega gratis. Si la tienda también tiene un pedido mínimo, se aplica el más alto.' },
      { id: 'outside-zone', question: '¿Qué pasa si un cliente está fuera de mis zonas?', answer: 'Se le avisa que no entregamos ahí y se le ofrecen sus puntos de recogida, para que aún pueda pedir.' },
      { id: 'route-optimizing', question: '¿Optimiza mis rutas?', answer: 'Pone las paradas de cada ruta en orden a partir de su cocina, la más cercana primero. Para algo más, descargue un CSV para una aplicación de planificación de rutas o abra la ruta en Google Maps.' },
      { id: 'routes-need-zones', question: '¿Las rutas necesitan que las zonas de entrega estén activadas?', answer: 'Sí. Las rutas de entrega dependen de las zonas de entrega, así que al desactivar las zonas también se desactivan las rutas. Desactivar una función nunca borra nada, y al activarla de nuevo todo vuelve.' },
    ],
    related: ['kitchen-operations', 'labels', 'subscriptions'],
  },
  {
    slug: 'kitchen-operations',
    navTitle: 'Operaciones de cocina',
    eyebrow: 'Operaciones de cocina',
    title: 'Software de cocina para comidas preparadas: plan de producción, listas de compras e inventario',
    intro:
      'Los pedidos de la semana se convierten en una lista de preparación y una lista de compras por proveedor. Lleve el control de los costos de ingredientes y las existencias, y maneje más de una cocina cuando crezca.',
    card: 'Plan de producción, listas de preparación y compras, inventario, costos de ingredientes y proveedores, y más de una cocina.',
        problem: [
      'Armo la lista de preparación a mano a partir de los pedidos, y luego adivino el pedido de compras. O compro de más y tiro comida, o me quedo corto a mitad de semana.',
      'Y no sé bien cuánto me cuesta cada comida, porque los precios están en una libreta y en unos cuantos recibos.',
    ],
    how: [
      {
        side: 'admin',
        title: 'El plan de producción: qué cocinar',
        body: 'Elija una semana de entrega y obtenga la lista de preparación: cuántas de cada comida y porción hay que hacer, a partir de los pedidos y los planes semanales de esa semana. Las semanas saltadas y en pausa no se incluyen. Desde aquí imprime las etiquetas y las hojas de empaque de la semana.',
        screen: { id: 'admin-production', alt: 'El Plan de producción de la administración con la lista de preparación de una semana de entrega', caption: 'El Plan de producción de una semana de entrega.' },
      },
      {
        side: 'admin',
        title: 'Listas de compras por proveedor',
        body: 'Más abajo: todo lo que hay que comprar, redondeado a como lo compra, con una lista por proveedor y su costo estimado. Con las existencias registradas, cada fila muestra lo que necesita la semana, lo que tiene a mano y lo que debe comprar. Imprímala o descárguela como hoja de cálculo.',
        screen: { id: 'shopping', alt: 'La lista de compras por proveedor con las columnas de necesario, a mano y por comprar', caption: 'La lista de compras, con lo que ya tiene a mano.' },
      },
      {
        side: 'admin',
        title: 'Costos de ingredientes y proveedores',
        body: 'La página Ingredientes reúne todo lo que compra, cómo lo compra (por libra, por caja), cuánto cuesta, de qué proveedor viene y cuánto tiene a mano. De esta lista se calculan las recetas y los costos, y puede agregar un segundo proveedor y precio para comparar.',
        screen: { id: 'admin-ingredients', alt: 'La lista de Ingredientes de la administración con costo, proveedor y cantidad a mano', caption: 'Ingredientes, proveedores y existencias.' },
      },
      {
        side: 'admin',
        title: 'Un inventario que sigue lo que usted cocina',
        body: 'Todo lo que esté en su nivel de alerta o por debajo aparece arriba, marcado como Bajo. Las existencias bajan cuando usted marca una semana como cocinada, nunca cuando se hace un pedido, así que un pedido cancelado antes simplemente sale del plan. Ajuste las existencias con un motivo (una entrega recibida, una corrección de conteo, merma o descomposición) y cada ajuste queda en el historial de existencias.',
        screen: { id: 'stock', alt: 'La página Ingredientes con alertas de existencias bajas y cantidades a mano', caption: 'Las alertas de existencias bajas, arriba.' },
      },
      {
        side: 'admin',
        title: 'Más de una cocina',
        body: 'Cada cocina tiene su propia dirección (de donde salen sus rutas), fecha límite de pedidos y días de entrega, zonas de entrega, puntos de recogida y las comidas que ofrece. A los clientes se les asigna una cocina según su dirección o su punto de recogida, y cada cocina lleva sus propias existencias. Con una sola cocina no ve nada de esto. La pantalla es del negocio de muestra Establecido de la demo, que tiene dos.',
        screen: { id: 'locations', alt: 'La página Sucursales de la administración con dos cocinas y sus zonas', caption: 'Dos cocinas, cada una con su propio horario y menú.' },
      },
    ],
    features: ['production_planning', 'ingredient_costs', 'inventory', 'multi_location'],
    grow: [
      { title: 'Menos desperdicio', body: 'Usted compra para los pedidos reales de la semana, tomando en cuenta lo que ya tiene en los estantes, en lugar de adivinar.' },
      { title: 'Saber cuánto le cuesta una comida', body: 'Los costos de ingredientes y los proveedores respaldan cada receta, así que puede ver el costo de alimentos de una comida antes de fijar su precio.' },
      { title: 'Menos tiempo de administración', body: 'La lista de preparación, la lista de compras y las etiquetas salen de los mismos pedidos, así que deja de volver a escribir la semana.' },
      { title: 'Espacio para crecer', body: 'Cuando tenga sentido una segunda cocina, tiene su propio horario, zonas y existencias, y sus informes pueden mostrar una cocina o todas.' },
    ],
    demo: [
      { label: 'Plan de producción', path: '/admin/production', side: 'admin' },
      { label: 'Ingredientes, costos y existencias', path: '/admin/ingredients', side: 'admin' },
      { label: 'Sucursales', path: '/admin/locations', side: 'admin' },
    ],
    faq: [
      { id: 'skipped-weeks', question: '¿El plan deja fuera los planes semanales saltados y en pausa?', answer: 'Sí. La lista de preparación se arma con los pedidos de esa semana y los planes semanales que realmente se entregan. Las semanas saltadas y en pausa no se incluyen.' },
      { id: 'when-stock-drops', question: '¿Cuándo bajan las existencias?', answer: 'Cuando usted marca una semana como cocinada. Entonces las cantidades exactas de la lista de compras de esa semana se descuentan de las existencias, una sola vez, y Deshacer cocinada las devuelve. No se descuenta nada cuando se hace un pedido.' },
      { id: 'supplier-lists', question: '¿Puedo enviarle a cada proveedor su propia lista?', answer: 'La lista de compras se divide por proveedor, con un costo estimado para cada uno. Puede imprimirla o descargarla como hoja de cálculo.' },
      { id: 'need-two-kitchens', question: '¿Necesito más de una cocina para usar esto?', answer: 'No. El plan de producción, los costos y el inventario funcionan con una sola cocina. Más de una cocina es una función aparte, del plan Pro, para cuando crezca.' },
    ],
    related: ['delivery-and-pickup', 'labels', 'reports-and-insights'],
  },
  {
    slug: 'labels',
    navTitle: 'Etiquetas y fechas de consumo',
    eyebrow: 'Etiquetas y fechas de consumo',
    title: 'Etiquetas para comidas preparadas con información nutricional y fecha de consumo',
    intro:
      'Imprima una etiqueta para cada comida con los datos de su propio menú: panel nutricional, ingredientes, alérgenos y fechas de empacado y de consumo. Usted las revisa antes de usarlas.',
    card: 'Etiquetas imprimibles con información nutricional, ingredientes, alérgenos y fecha de consumo, a partir de los datos de su propio menú.',
        problem: [
      'Las etiquetas me comen el domingo. Vuelvo a escribir los ingredientes y las calorías de cada comida, y nunca estoy seguro de que la fecha de consumo esté bien cuando ya está en el envase.',
      'Quiero etiquetas que salgan de las mismas recetas de mi menú, en el tamaño que acepta mi impresora.',
    ],
    how: [
      {
        side: 'admin',
        title: 'Imprima las etiquetas de la semana en el tamaño que usa',
        body: 'Desde el Plan de producción, imprima una etiqueta para cada comida que se cocina esa semana, o para una sola comida, o una por pedido con el nombre del cliente. Elija hojas de 2 por 4 pulgadas o de 3 y un tercio por 4 pulgadas (Avery 5163/8163 y 5164/8164), o etiquetas térmicas de 4 por 6 pulgadas, y vea primero la vista previa.',
        screen: { id: 'admin-labels', alt: 'La página Etiquetas de la administración con opciones de tamaño, una fecha de producción y una vista previa', caption: 'Elija un tamaño, vea la vista previa e imprima.' },
      },
      {
        side: 'admin',
        title: 'Qué lleva cada etiqueta',
        body: 'Su nombre y logotipo, la comida y la porción, un panel nutricional, los ingredientes, una línea Contiene con los alérgenos principales (y líneas Posible para las salsas que compra ya hechas), las fechas de empacado y de consumo, y la forma de guardarla y recalentarla.',
        screen: { id: 'label-sheet', alt: 'Una hoja de etiquetas impresa con información nutricional, ingredientes, alérgenos y fechas de empacado y de consumo', caption: 'Etiquetas de muestra de la demo (en inglés).' },
      },
      {
        side: 'admin',
        title: 'Las fechas salen de la vida útil que usted define',
        body: 'Usted define la vida útil de cada comida. Las etiquetas imprimen el día de producción como Empacado, y Consumir antes del se cuenta desde ahí, con el día de producción como el día uno. Su cocina define ambas, y la etiqueta indica la fecha que usted da.',
      },
      {
        side: 'admin',
        title: 'Las etiquetas salen de sus datos, para que usted las revise',
        body: 'Las etiquetas se generan con los datos de cada comida: su nutrición, ingredientes y alérgenos. Revíselas antes de usarlas, y compárelas con sus recetas y con las etiquetas de lo que compra ya hecho. Usted es responsable de lo que dicen sus etiquetas.',
      },
    ],
    features: ['labels'],
    grow: [
      { title: 'Menos tiempo de administración', body: 'No se vuelve a escribir nada: la etiqueta sale de los mismos datos de la comida que su menú y su plan de producción.' },
      { title: 'Una sola fuente de información', body: 'Cuando cambia una receta o un ingrediente, la nutrición, los alérgenos y la etiqueta cambian con ella, en lugar de tres documentos que se van desfasando.' },
      { title: 'Los clientes ven lo que comen', body: 'La misma nutrición, ingredientes y alérgenos están en la página de cada comida, así que lo que dice el envase coincide con lo que pidieron.' },
    ],
    demo: [
      { label: 'Etiquetas', path: '/admin/labels', side: 'admin' },
      { label: 'Plan de producción (de donde se imprimen las etiquetas)', path: '/admin/production', side: 'admin' },
    ],
    faq: [
      { id: 'label-sizes', question: '¿Qué tamaños de etiqueta puedo imprimir?', answer: 'Hojas Avery de 2 por 4 pulgadas (10 por hoja) o de 3 y un tercio por 4 pulgadas (6 por hoja), o etiquetas térmicas de 4 por 6 pulgadas, una por etiqueta. Primero ve una vista previa.' },
      { id: 'where-data-comes-from', question: '¿De dónde salen los números de nutrición y los alérgenos de una etiqueta?', answer: 'De los datos de sus propias comidas: la receta, su lista de Ingredientes y los alérgenos que usted registró. El sistema genera la etiqueta con eso, y usted la revisa antes de usarla.' },
      { id: 'label-responsibility', question: '¿Esto hace que mis etiquetas estén correctas por mí?', answer: 'No. Las etiquetas se arman con sus datos para que usted las revise; no son asesoría legal ni regulatoria. Compárelas con sus recetas y con las etiquetas de lo que compra ya hecho, y consulte a quien lo asesore sobre las reglas de etiquetado si tiene dudas.' },
      { id: 'per-order-labels', question: '¿Puedo imprimir una etiqueta por pedido con el nombre del cliente?', answer: 'Sí. Puede imprimir una etiqueta para cada comida que se cocina, las etiquetas de una sola comida, o una por pedido con el nombre del cliente.' },
    ],
    related: ['kitchen-operations', 'delivery-and-pickup', 'bigger-orders'],
  },
  {
    slug: 'loyalty-and-referrals',
    navTitle: 'Lealtad y recomendaciones',
    eyebrow: 'Lealtad y recomendaciones',
    title: 'Puntos de lealtad, referidos, tarjetas de regalo y cupones para comidas preparadas',
    intro:
      'Premie a los clientes que siguen regresando, deje que sus mejores clientes traigan amigos, venda tarjetas de regalo y maneje códigos de descuento sin una hoja de cálculo.',
    card: 'Puntos de recompensa, referidos, tarjetas de regalo y cupones que hacen volver a los clientes y traen amigos.',
        problem: [
      'Mi mejor publicidad es el boca a boca, pero no puedo darle seguimiento. Reparto descuentos por mensaje y no sé quién mandó a quién ni cuánto me costó.',
      'También me encantaría vender tarjetas de regalo sin tener que inventar un código a mano cada vez.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Puntos de recompensa que los clientes pueden gastar',
        body: 'Los clientes ganan puntos con sus pedidos y los gastan después. Las páginas de las comidas muestran los puntos que gana un pedido, y los clientes ven su saldo en la página de su cuenta.',
      },
      {
        side: 'admin',
        title: 'Referidos, con una recompensa para ambas partes',
        body: 'Cada cliente tiene un código y un enlace para compartir. Un amigo que se registra con él y paga un primer pedido gana una recompensa para los dos: un cupón, crédito en la tienda o puntos, como usted elija. Si ese pedido se reembolsa por completo, se retiran las dos recompensas.',
        points: [
          'Elija qué recibe quien refiere y qué recibe el amigo, cuánto duran los cupones de recompensa y los límites por cliente al mes y en total.',
          'Un referido se bloquea cuando un cliente prueba su propio código, o cuando el amigo usa el correo, la tarjeta o la dirección de entrega de quien lo refiere, y se muestra el motivo.',
        ],
        screen: { id: 'admin-referrals', alt: 'La página Referidos de la administración con referidos premiados, pendientes y bloqueados', caption: 'Los referidos y en qué punto está cada uno. Historial de muestra.' },
      },
      {
        side: 'customer',
        title: 'Tarjetas de regalo por cualquier monto',
        body: 'Los clientes compran una tarjeta de regalo para otra persona, con un mensaje y una fecha de envío. Se canjea al pagar, sola o con un cupón (usted decide), y lo que no se gasta se queda en la tarjeta. En su propio sitio, quien compra paga con tarjeta mediante Stripe y quien la recibe obtiene el código por correo en la fecha de envío.',
        screen: { id: 'store-gift-cards', alt: 'La página de tarjetas de regalo de la tienda con montos, destinatario y fecha de envío', caption: 'La página de tarjetas de regalo.' },
      },
      {
        side: 'admin',
        title: 'Cada tarjeta de regalo y su historial',
        body: 'Vea para quién es cada tarjeta, su saldo y su historial. Emita una tarjeta a mano (una cortesía, un premio), cambie un saldo o desactive una tarjeta perdida, cada cosa con una nota, todo en el Registro de auditoría.',
        screen: { id: 'admin-gift-cards', alt: 'La página Tarjetas de regalo de la administración con saldos e historial', caption: 'Las tarjetas de regalo en la administración.' },
      },
      {
        side: 'admin',
        title: 'Códigos de cupón con límites',
        body: 'Un porcentaje o un monto de descuento, con un límite de usos y una fecha de vencimiento. Los clientes escriben el código al pagar.',
        screen: { id: 'admin-coupons', alt: 'La lista de Cupones de la administración', caption: 'Cupones.' },
      },
    ],
    features: ['coupons', 'gift_cards', 'loyalty_points', 'referrals'],
    grow: [
      { title: 'Más clientes que repiten', body: 'Los puntos le dan a la gente una razón para volver la semana siguiente, y un saldo que no quieren dejar sin usar.' },
      { title: 'Clientes nuevos de personas a quienes ya les gusta su comida', body: 'Los referidos premian a ambas partes, y solo después de que el amigo paga un primer pedido, así que no regala recompensas por registros que nunca piden.' },
      { title: 'Dinero por adelantado, y caras nuevas', body: 'Las tarjetas de regalo traen efectivo antes de cocinar las comidas y ponen su comida frente a alguien que aún no la ha probado.' },
      { title: 'Menos tiempo de administración', body: 'Los códigos, los saldos y las recompensas se llevan por usted, con cada cambio registrado.' },
    ],
    demo: [
      { label: 'Los puntos y el código de referido de un cliente', path: '/account', side: 'customer' },
      { label: 'La página de tarjetas de regalo', path: '/gift-cards', side: 'customer' },
      { label: 'Referidos', path: '/admin/referrals', side: 'admin' },
      { label: 'Tarjetas de regalo', path: '/admin/gift-cards', side: 'admin' },
      { label: 'Cupones', path: '/admin/coupons', side: 'admin' },
    ],
    faq: [
      { id: 'when-rewarded', question: '¿Cuándo se da la recompensa de un referido?', answer: 'Cuando se paga el primer pedido del amigo. Si ese pedido se reembolsa por completo después, se retiran las dos recompensas. En la demo los referidos son historial de muestra y no se paga nada.' },
      { id: 'referral-fraud', question: '¿Pueden los clientes hacer trampa con el programa de referidos?', answer: 'El sistema bloquea las formas habituales: usar su propio código, o un amigo que comparte el correo, la tarjeta o la dirección de entrega de quien lo refiere. Un referido bloqueado muestra el motivo. Para la comprobación de la misma tarjeta, solo guarda la huella digital de Stripe de la tarjeta, nunca los datos de la tarjeta.' },
      { id: 'gift-card-coupons', question: '¿Se puede usar una tarjeta de regalo junto con un cupón?', answer: 'Usted decide. Hay una opción para permitir o no el uso de una tarjeta de regalo junto con un cupón.' },
      { id: 'choose-reward', question: '¿Puedo elegir cuál es la recompensa?', answer: 'Sí. En los referidos, quien refiere y el amigo pueden recibir cada uno un cupón de un solo uso (un porcentaje o un monto de descuento), crédito en la tienda o puntos, y usted define cuánto duran los cupones de recompensa y los límites por cliente.' },
    ],
    related: ['reviews-and-surveys', 'subscriptions', 'reports-and-insights'],
  },
  {
    slug: 'reviews-and-surveys',
    navTitle: 'Reseñas y opiniones de clientes',
    eyebrow: 'Reseñas y opiniones de clientes',
    title: 'Reseñas de comidas y encuestas a clientes para negocios de comidas preparadas',
    intro:
      'Los clientes califican las comidas, usted aprueba lo que se muestra en su menú, y una encuesta corta después de cada entrega le dice cómo salió realmente la semana.',
    card: 'Reseñas de comidas que usted aprueba, y una encuesta de cuatro preguntas después de cada pedido.',
        problem: [
      'Recibo buenos comentarios por mensaje y luego se pierden. Y la única mala semana me entero cuando alguien cancela.',
      'Quisiera reseñas en mi menú sin que desconocidos publiquen lo que quieran, y una encuesta rápida después de cada entrega.',
    ],
    how: [
      {
        side: 'admin',
        title: 'Las reseñas aparecen solo después de que usted las aprueba',
        body: 'Los clientes califican y reseñan una comida. Una reseña aparece en la página de esa comida solo después de que usted la aprueba, y cada decisión queda en el Registro de auditoría.',
        screen: { id: 'admin-reviews', alt: 'La página Reseñas de la administración con una reseña pendiente por aprobar o rechazar', caption: 'Una reseña pendiente de aprobación.' },
      },
      {
        side: 'customer',
        title: 'Una encuesta de cuatro preguntas después de cada pedido',
        body: 'Cuando un pedido se entrega o se recoge, su cliente puede responder cuatro preguntas rápidas: en general, la comida, la entrega o la recogida, y si lo recomendaría, con un comentario opcional. Una respuesta por pedido, y solo usted la ve.',
        screen: { id: 'survey', alt: 'La página de la encuesta para el cliente con cuatro preguntas de calificación', caption: 'La encuesta, como la ve el cliente.' },
      },
      {
        side: 'admin',
        title: 'Las respuestas, por semana',
        body: 'Elija sus fechas y vea cuántos respondieron y la tasa de respuesta, las calificaciones promedio en general, de la comida y de la entrega o la recogida, el porcentaje que lo recomendaría, lo mismo por semana, y cada comentario con su pedido y su cliente. Un CSV descarga una fila por respuesta. Las encuestas son aparte de las reseñas de comidas.',
        screen: { id: 'admin-surveys', alt: 'La página Encuestas a clientes de la administración con calificaciones por semana y comentarios', caption: 'Resultados de las encuestas. Datos de muestra de la demo.' },
      },
    ],
    features: ['reviews', 'surveys'],
    grow: [
      { title: 'Confianza para los clientes nuevos', body: 'Las reseñas aprobadas en la página de una comida ayudan a quien nunca ha pedido a elegir con más seguridad.' },
      { title: 'Problemas detectados a tiempo', body: 'Las calificaciones de entrega y recogida por semana muestran dónde falló una semana, antes de que se convierta en una cancelación.' },
      { title: 'Saber qué seguir haciendo', body: 'Las reseñas le dicen qué comidas entusiasman a los clientes, para que su menú siga lo que les gusta.' },
    ],
    demo: [
      { label: 'Los pedidos de un cliente, con el enlace de la encuesta', path: '/account', side: 'customer' },
      { label: 'Reseñas', path: '/admin/reviews', side: 'admin' },
      { label: 'Encuestas a clientes', path: '/admin/surveys', side: 'admin' },
    ],
    faq: [
      { id: 'moderation', question: '¿Puedo elegir qué reseñas se muestran en mi menú?', answer: 'Sí. Una reseña aparece en la página de una comida solo después de que usted la aprueba, y también puede rechazarla.' },
      { id: 'survey-sent', question: '¿Los clientes reciben la encuesta automáticamente?', answer: 'En su propio sitio configuramos el correo que enlaza la encuesta después de la entrega, y los clientes también la encuentran en su historial de pedidos. El enlace funciona solo para el cliente que hizo el pedido.' },
      { id: 'survey-private', question: '¿Quién puede ver las respuestas de la encuesta?', answer: 'Solo usted. Los clientes responden una vez por pedido, y las respuestas son aparte de las reseñas públicas de las comidas.' },
      { id: 'survey-export', question: '¿Puedo descargar las respuestas?', answer: 'Sí. La página de encuestas tiene un CSV que descarga una fila por respuesta para las fechas que elija.' },
    ],
    related: ['loyalty-and-referrals', 'reports-and-insights', 'ai-tools'],
  },
  {
    slug: 'reports-and-insights',
    navTitle: 'Informes y análisis',
    eyebrow: 'Informes y análisis',
    title: 'Análisis para comidas preparadas: clientes que repiten, abandono, exportaciones CSV e informes de impuesto sobre ventas',
    intro:
      'Vea las ventas, sus comidas más vendidas, los clientes que repiten y los que se van, y descargue sus datos como CSV para su contador, cuando quiera.',
    card: 'Análisis, clientes que repiten y abandono, exportaciones CSV e informe del impuesto sobre ventas.',
        problem: [
      'Cuando me pregunto si el negocio está creciendo, o llega la época de impuestos, estoy en hojas de cálculo. No podría decirle cuántos son mis clientes que repiten, quién se está yendo, ni cuál comida vende más en realidad.',
      'Quiero los números donde manejo el negocio, explicados con palabras sencillas.',
    ],
    how: [
      {
        side: 'admin',
        title: 'Análisis, con palabras sencillas',
        body: 'Ingresos, pedidos, clientes y sus comidas más vendidas, semana por semana y mes por mes. Más abajo: suscriptores de los planes semanales, y saltos, pausas y cancelaciones por semana. Los recuadros de clientes que repiten y abandono tienen un enlace Qué significa que lleva a un glosario que explica cada número.',
        screen: { id: 'admin-analytics', alt: 'La página Análisis de la administración con ingresos, pedidos, abandono y comidas más vendidas', caption: 'Análisis. Datos de muestra de la demo.' },
      },
      {
        side: 'admin',
        title: 'Sus datos en CSV, cuando quiera',
        body: 'Descargue pedidos (una fila por línea de comida), clientes, planes semanales, existencias y movimientos de existencias como archivos CSV para Excel, Google Sheets o su contador. Exportar no cambia nada, y el archivo de clientes no incluye contraseñas ni datos de pago.',
        screen: { id: 'admin-exports', alt: 'La página Exportar de la administración con descargas en CSV', caption: 'Exportaciones.' },
      },
      {
        side: 'admin',
        title: 'Un informe del impuesto sobre ventas con lo que registró Stripe',
        body: 'Un registro del impuesto que Stripe registró en sus pedidos pagados y cumplidos, por día, semana o mes, con totales y un CSV. El sistema no calcula el impuesto por sí mismo: con Stripe Tax activado en su cuenta de Stripe, el impuesto de cada pedido se guarda tal como lo cobró Stripe. Es un registro de sus pedidos, no asesoría fiscal. Los montos de la demo son datos de muestra inventados.',
        screen: { id: 'admin-sales-tax', alt: 'El informe de impuesto sobre ventas de la administración por semana', caption: 'El informe del impuesto sobre ventas. Datos de muestra inventados.' },
      },
    ],
    features: ['reports', 'analytics'],
    grow: [
      { title: 'Más clientes que repiten', body: 'La tasa de clientes que repiten, el abandono y los saltos, pausas y cancelaciones semanales muestran cuándo sus clientes habituales empiezan a alejarse, para que pueda contactarlos mientras todavía importa.' },
      { title: 'Decidir qué cocinar y qué dejar', body: 'Las comidas más vendidas de los últimos doce meses le dicen qué conservar, impulsar o retirar.' },
      { title: 'Menos tiempo de administración en la época de impuestos', body: 'El registro del impuesto sobre ventas ya está agrupado por semana o por mes, y su contador recibe el CSV en lugar de un montón de capturas de pantalla.' },
    ],
    demo: [
      { label: 'Análisis', path: '/admin/analytics', side: 'admin' },
      { label: 'Glosario de cada número', path: '/admin/glossary', side: 'admin' },
      { label: 'Exportar', path: '/admin/exports', side: 'admin' },
      { label: 'Informe del impuesto sobre ventas', path: '/admin/sales-tax', side: 'admin' },
    ],
    faq: [
      { id: 'repeat-churn', question: '¿Qué significan aquí la tasa de clientes que repiten y el abandono?', answer: 'La tasa de clientes que repiten es el porcentaje de los clientes de este año que han pedido más de una vez. El abandono es, de los clientes que pidieron en un mes, el porcentaje que nunca volvió a pedir, contado para meses con al menos tres meses de antigüedad. El glosario de la administración explica ambos con ejemplos.' },
      { id: 'tax-calculation', question: '¿El sistema calcula el impuesto sobre ventas?', answer: 'No. Con Stripe Tax activado en su cuenta de Stripe, el impuesto de cada pedido se guarda tal como lo cobró Stripe, y el informe lo muestra por día, semana o mes. Es un registro de sus pedidos, no asesoría fiscal.' },
      { id: 'accountant', question: '¿Puede mi contador usar las exportaciones?', answer: 'Sí. Los pedidos, los clientes, los planes semanales, las existencias y el informe del impuesto sobre ventas se descargan como archivos CSV que abren en Excel o Google Sheets.' },
      { id: 'own-data', question: '¿Puedo llevarme mi lista de clientes?', answer: 'Sí. Los datos de sus clientes y pedidos siempre pertenecen a su negocio, y puede exportarlos en cualquier momento.' },
    ],
    related: ['subscriptions', 'loyalty-and-referrals', 'kitchen-operations'],
  },
  {
    slug: 'ai-tools',
    navTitle: 'Herramientas con IA',
    eyebrow: 'Herramientas con IA',
    title: 'Herramientas con IA para negocios de comidas preparadas: chat para clientes, estilo de fotos de comida y Trend Finder',
    intro:
      'Un chat que responde las preguntas de sus clientes sobre el menú con su propio menú, opciones de estilo para las fotos de su comida e ideas para comidas nuevas. Usted controla todo.',
    card: 'Un asistente de chat para clientes con una página de Conversaciones, estilo de fotos de comida y Trend Finder para ideas de comidas nuevas.',
        problem: [
      'Los clientes me hacen las mismas preguntas sobre el menú a todas horas, y las contesto entre una tanda y otra. Las fotos de cada plato nuevo toman una eternidad. Y nunca sé qué comida nueva agregar.',
      'Quiero ayuda con las tres cosas, pero no quiero un robot que haga promesas sobre alergias ni que ponga en mi menú cosas que yo no aprobé.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Un chat en su tienda que responde con su menú',
        body: 'Un botón de chat aparece en la esquina de todas las páginas de la tienda. Los clientes preguntan con sus propias palabras, por ejemplo qué comidas con pollo tienen, y responde con su propio menú: las comidas que encajan, con sus precios y un botón Agregar que el cliente presiona por sí mismo. Responde en inglés o en español, según el idioma de la tienda, y no puede hacer pedidos, cambiar un plan ni prometer un descuento. Cuando no sabe algo, lo dice y ofrece pasarle la pregunta a usted.',
        screen: { id: 'chat-menu', alt: 'El asistente de chat respondiendo una pregunta del menú con comidas, precios y botones Agregar', caption: 'El asistente responde con el menú de muestra.' },
      },
      {
        side: 'customer',
        title: 'Las preguntas sobre alergias van a su cocina',
        body: 'Cualquier pregunta que mencione alergias recibe un recordatorio claro: si tiene una alergia grave, comuníquese directamente con la cocina antes de pedir. El asistente solo repite los alérgenos que usted registró para cada comida. Nunca dice que una comida es segura para una alergia, y no da consejos médicos ni de dieta. Hablar con la cocina le pasa la conversación a usted, y el nombre, el correo y el teléfono son opcionales.',
        screen: { id: 'chat-allergy', alt: 'El asistente enumerando los alérgenos de una comida con un recordatorio de comunicarse con la cocina', caption: 'Una pregunta sobre alergias: los alérgenos registrados y un recordatorio de comunicarse con la cocina.' },
      },
      {
        side: 'admin',
        title: 'Conversaciones: lo que preguntan los clientes y lo que le falta a su menú',
        body: 'Cada chat se guarda en la página Conversaciones. Los recuadros cuentan las conversaciones, cuántas llevaron a un pedido de una comida recomendada, cuántas no pudo responder del todo y cuántas se enviaron a la cocina. Más abajo, lo que la gente más pidió y lo que no pudo responder: una forma rápida de ver qué agregar a su menú. Las conversaciones se borran después de los días que usted elija, 90 por defecto. En la demo el historial es inventado, y el chat que usted tenga en la demo aparece primero.',
        screen: { id: 'admin-conversations', alt: 'La página Conversaciones de la administración con lo que pidieron los clientes y lo que el asistente no pudo responder', caption: 'Conversaciones. El historial de la demo es inventado.' },
      },
      {
        side: 'admin',
        title: 'Estilo de fotos de comida para sus platos reales',
        body: 'Elija la iluminación, el ángulo de la cámara, el plato o la superficie, el fondo, la gradación de color (de fiel a la realidad a natural, nunca sobresaturada), el adorno y la forma, a partir de una guía de estilo escrita con las fotos de su propio menú. El adorno solo sale de los ingredientes del propio plato. Cada foto con IA se revisa contra los ingredientes y alérgenos del plato, y una foto que muestre algo que no está en la receta no se usa. Una foto que pasa igual espera su aprobación antes de aparecer en su menú. En la demo pública las opciones de estilo funcionan y la creación de fotos está desactivada para los visitantes, porque cada una es una llamada de pago; la mostramos en vivo en una llamada de recorrido.',
        screen: { id: 'photo-styling', alt: 'Las opciones de estilo de fotos en la Configuración de la administración', caption: 'Opciones de estilo de fotos en Configuración (en inglés).' },
      },
      {
        side: 'admin',
        title: 'Trend Finder: ideas de comidas nuevas, con sus fuentes',
        body: 'Elija cuántas ideas, un enfoque como alto en proteína o vegano, y una temporada. Cada idea dice por qué es tendencia y enlaza los artículos recientes que lo muestran, de al menos dos publicaciones, con sus fechas. Mostrar detalles enumera cada ingrediente con su nutrición y costo, y lo que estima queda marcado para que usted lo confirme. Aceptar convierte una idea en un borrador de comida que queda oculto para los clientes hasta que usted lo revise y lo publique. La demo muestra resultados guardados de búsquedas reales; en su propio sitio busca en la web en vivo.',
        screen: { id: 'trend-idea', alt: 'Una idea de Trend Finder con por qué es tendencia y sus fuentes', caption: 'Una idea de Trend Finder con sus fuentes (en inglés).' },
      },
    ],
    features: ['ai_assistant', 'ai_photos', 'trend_finder'],
    grow: [
      { title: 'Menos preguntas repetidas contestadas a mano', body: 'El chat se encarga de las preguntas del menú y le pasa solo las que no puede responder, con los datos de contacto que el cliente decidió dejar.' },
      { title: 'Una lista de lo que le falta a su menú', body: 'Las preguntas que no pudo responder son una lista clara de lo que los clientes quieren y usted todavía no ofrece.' },
      { title: 'Más ideas para el menú, sin adivinar', body: 'Trend Finder trae ideas con fuentes, ingredientes y costos, y usted decide qué se convierte en una comida.' },
      { title: 'Fotos que combinan con su menú', body: 'Las opciones de estilo mantienen las fotos nuevas en el estilo de las que ya tiene, y nada se publica sin su aprobación.' },
    ],
    demo: [
      { label: 'Abra el menú y presione Pregunte a nuestro asistente de IA', path: '/menu', side: 'customer' },
      { label: 'Conversaciones', path: '/admin/conversations', side: 'admin' },
      { label: 'Opciones de estilo de fotos', path: '/admin/settings', side: 'admin' },
      { label: 'Comidas, con Buscar comidas en tendencia', path: '/admin/meals', side: 'admin' },
    ],
    faq: [
      { id: 'safe-claims', question: '¿El asistente le dirá a un cliente que una comida es segura para su alergia?', answer: 'No. Solo repite los alérgenos que usted registró para una comida y siempre agrega un recordatorio de comunicarse directamente con la cocina antes de pedir. No dice que una comida es segura, y no da consejos médicos ni de dieta.' },
      { id: 'place-orders', question: '¿Puede el asistente tomar pedidos o dar descuentos?', answer: 'No. No puede hacer pedidos, cambiar un plan ni prometer un descuento. Muestra comidas con sus precios y un botón Agregar que el cliente presiona por sí mismo.' },
      { id: 'spanish-chat', question: '¿El chat funciona en español?', answer: 'Sí. Responde en inglés o en español, según el idioma de la tienda.' },
      { id: 'demo-limits', question: '¿Por qué la demo limita cuántas preguntas puedo hacer?', answer: 'En la demo es un asistente de IA real que responde con el menú de muestra, y cada visitante puede hacer unas pocas preguntas al día. Al llegar al límite, lo avisa, y en una llamada de recorrido le mostramos más.' },
      { id: 'approve-photos', question: '¿Las fotos con IA se publican solas en mi menú?', answer: 'No. Cada foto se revisa contra los ingredientes y alérgenos del plato, y una que pasa igual espera su aprobación. La revisión solo detecta extras visibles, así que usted sigue siendo responsable de su menú y sus etiquetas.' },
    ],
    related: ['reviews-and-surveys', 'bilingual-and-app', 'reports-and-insights'],
  },
  {
    slug: 'bilingual-and-app',
    navTitle: 'Tienda bilingüe y app instalable',
    eyebrow: 'Tienda bilingüe y app instalable',
    title: 'Sitio bilingüe para comidas preparadas, en inglés y español, instalable en el teléfono',
    intro:
      'Su tienda y su área de administración en inglés y en español con un cambio de un toque, y una tienda que los clientes pueden agregar a la pantalla de inicio de su teléfono como una app.',
    card: 'Una tienda y una administración en inglés y español, y una tienda que los clientes pueden instalar como una app.',
        problem: [
      'Muchos de mis clientes prefieren pedir en español, y casi todos piden desde el teléfono. No quiero dos sitios web, y no quiero pagar por una app que tenga que aprobar una tienda de aplicaciones.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Un toque entre inglés y español',
        body: 'Los clientes cambian con EN | ES en la parte superior de cualquier página, y toda la tienda cambia. Su elección se mantiene, y un enlace que termina en ?lang=es abre la tienda en español, así que puede enviárselo directo a un cliente de habla hispana.',
        screen: { id: 'store-plans', forceLang: 'es', alt: 'La página de planes de la tienda de la demo en español', caption: 'La misma página de planes, en español.' },
      },
      {
        side: 'admin',
        title: 'Su administración también en los dos idiomas',
        body: 'La administración tiene su propio selector EN | ES, así que su personal puede trabajar en el idioma con el que se sienta más cómodo. Los correos a los clientes sobre cambios en los cobros salen en el idioma de cada cliente.',
        screen: { id: 'admin-delivery', forceLang: 'es', alt: 'La página Entrega de la administración de la demo en español', caption: 'La página Entrega de la administración, en español.' },
      },
      {
        side: 'admin',
        title: 'Usted decide cuándo se activa el español',
        body: 'En una tienda nueva el español empieza desactivado: la tienda abre en inglés, sin el selector EN | ES, hasta que usted activa Español en Configuración > Funciones. La demo lo tiene activado para que vea los dos. Los nombres y las descripciones de las comidas quedan como usted los escribe.',
      },
      {
        side: 'customer',
        title: 'Instálela como una app',
        body: 'Después de su primer pedido, a los clientes se les ofrece agregar su tienda a la pantalla de inicio. Se abre como una app, con su nombre e ícono, y carga rápido en las visitas siguientes. En iPhone se muestran los dos pasos (Compartir, y luego Agregar a pantalla de inicio), porque Safari no tiene un botón de instalar. No hay una tienda de aplicaciones de por medio, y el pago siempre necesita conexión.',
        screen: { id: 'phone-plan', alt: 'La página del plan de un cliente en un teléfono', caption: 'Hecha para teléfonos: la página del plan en una pantalla pequeña (en inglés).' },
      },
    ],
    features: ['spanish', 'pwa'],
    grow: [
      { title: 'Llegue a los clientes que prefieren español', body: 'Reciben toda la tienda en su idioma sin que usted tenga que mantener un segundo sitio web.' },
      { title: 'Más pedidos repetidos, con menos esfuerzo para el cliente', body: 'Un ícono en la pantalla de inicio con su nombre queda a un toque del menú, lo que hace más fácil volver.' },
      { title: 'Sin tienda de aplicaciones', body: 'Los clientes la instalan desde el navegador, así que no hay nada que enviar, aprobar ni mantener actualizado en una tienda de aplicaciones.' },
    ],
    demo: [
      { label: 'La tienda en español', path: '/menu', side: 'customer' },
      { label: 'La administración (use EN | ES arriba)', path: '/admin', side: 'admin' },
      { label: 'Configuración > Funciones, donde se activa el español', path: '/admin/settings?tab=features', side: 'admin' },
    ],
    faq: [
      { id: 'what-is-translated', question: '¿Qué está disponible en los dos idiomas?', answer: 'La tienda, el área de administración y los correos a los clientes sobre cambios en los cobros. Los nombres y las descripciones de las comidas que usted escribe quedan como los escribe; díganos si los quiere en los dos idiomas.' },
      { id: 'need-app-store', question: '¿Mis clientes necesitan una tienda de aplicaciones?', answer: 'No. Agregan su tienda a la pantalla de inicio de su teléfono desde el navegador. Se abre como una app con su nombre e ícono.' },
      { id: 'offline', question: '¿Se puede pedir sin conexión?', answer: 'La tienda carga rápido en las visitas siguientes, pero el pago siempre necesita conexión.' },
      { id: 'spanish-off', question: '¿Por qué el español empieza desactivado en una tienda nueva?', answer: 'Para que usted decida cuándo se activa. La tienda abre en inglés, sin el selector EN | ES, hasta que active Español en Configuración > Funciones.' },
    ],
    related: ['ai-tools', 'subscriptions', 'getting-started'],
  },
  {
    slug: 'getting-started',
    navTitle: 'Cómo empezar',
    eyebrow: 'Cómo empezar',
    title: 'Configuración y migración de clientes para pedidos de comidas preparadas, hechas por nosotros',
    intro:
      'Lo configuramos por usted, pasamos su menú y sus clientes, y lo ponemos en su propio dominio y su propia cuenta de Stripe. No tiene que aprender software ni empezar desde cero.',
    card: 'Configuración hecha por nosotros, traslado de sus clientes, y que sus datos, su dominio y su cuenta de Stripe sean suyos.',
        problem: [
      'No tengo tiempo para aprender un software nuevo, configurar los pagos y pasar a mis clientes, y me da miedo perder gente en el cambio.',
      'Tampoco quiero entregarle mi lista de clientes y mi negocio a una plataforma que me cobra por cada pedido.',
    ],
    how: [
      {
        side: 'setup',
        title: 'Una llamada de introducción gratis',
        body: 'Hablamos de su menú, de cómo recibe pedidos hoy y de lo que le gustaría cambiar. Puede probar primero la demo con su propio nombre, logotipo y colores: el panel Pruébelo con su marca muestra todo el sitio como si fuera suyo.',
        screen: { id: 'brand', alt: 'La tienda de la demo con otro nombre de negocio y otros colores', caption: 'La demo con el nombre y los colores cambiados en el panel de marca.' },
      },
      {
        side: 'setup',
        title: 'Lo configuramos por usted',
        body: 'Configuramos su nombre, logotipo y colores, su menú, sus zonas y días de entrega, sus planes y sus pagos, para que empiece con una tienda que ya funciona en lugar de una vacía.',
      },
      {
        side: 'setup',
        title: 'Pasamos a sus clientes y su menú',
        body: 'Durante la configuración pasamos por usted los datos de sus clientes y de su menú, desde hojas de cálculo y otros sistemas. Un menú en una exportación de una tienda en línea se puede importar directamente. La nutrición y los alérgenos que no estén en la exportación se marcan para que usted los complete, nunca se adivinan. Sus clientes siguen pidiéndole sin interrupción, y planeamos con usted la fecha del cambio.',
      },
      {
        side: 'admin',
        title: 'Active funciones a medida que crece',
        body: 'Hay tres planes, y nosotros definimos el suyo. En Configuración > Funciones usted elige cuáles de sus funciones están activadas, así que puede empezar sencillo y activar más cuando esté listo. Desactivar una nunca borra sus datos.',
        screen: { id: 'admin-settings-features', alt: 'La pestaña Funciones de la Configuración de la administración con interruptores agrupados por plan', caption: 'Configuración > Funciones, agrupadas por plan.' },
      },
      {
        side: 'setup',
        title: 'Sigue siendo suyo',
        body: 'Los datos de sus clientes y pedidos, su nombre de dominio y su cuenta de Stripe están a su nombre, y puede llevárselos en cualquier momento. Los pagos van a su propia cuenta de Stripe, y no cobramos una comisión por pedido.',
      },
    ],
    features: [],
    grow: [
      { title: 'Cambiar sin perder clientes', body: 'Planeamos con usted la fecha del cambio, y sus clientes siguen pidiéndole mientras pasamos todo.' },
      { title: 'Menos tiempo de administración desde el primer día', body: 'Usted no aprende un sistema nuevo encima de manejar una cocina. Nosotros hacemos la configuración y el traslado.' },
      { title: 'Un negocio que es suyo', body: 'Su lista de clientes, su dominio y su cuenta de pagos siguen a su nombre, así que puede crecer sin quedar atado.' },
    ],
    demo: [
      { label: 'La tienda (abra Pruébelo con su marca)', path: '/menu', side: 'customer' },
      { label: 'Configuración > Funciones', path: '/admin/settings?tab=features', side: 'admin' },
    ],
    faq: [
      { id: 'who-sets-up', question: '¿Quién lo configura?', answer: 'Nosotros. Estamos en Jacksonville, Florida, y trabajamos con operadores pequeños y medianos de comidas preparadas en inglés y español. Usted nos cuenta cómo funciona su negocio y nosotros configuramos el sistema para eso.' },
      { id: 'bring-customers', question: '¿Pueden pasar a mis clientes y mi menú?', answer: 'Sí. Pasamos los datos de sus clientes y de su menú durante la configuración, desde hojas de cálculo y otros sistemas. La nutrición y los alérgenos que falten se marcan para que usted los complete, nunca se adivinan, y planeamos con usted la fecha del cambio.' },
      { id: 'own-it', question: '¿Son míos mis datos, mi dominio y mi cuenta de Stripe?', answer: 'Sí. Están a su nombre desde el principio, y puede exportar sus datos y llevárselos en cualquier momento.' },
      { id: 'fees', question: '¿Hay un cargo por cada pedido?', answer: 'No cobramos una comisión por pedido. Se aplican las comisiones de procesamiento de Stripe a los pagos con tarjeta, como en cualquier otro lugar.' },
      { id: 'start', question: '¿Cómo empiezo?', answer: 'Llame al (904) 822-8929 o hable con Alex desde el botón de esta página. También puede leer primero la guía de la demo.' },
    ],
    related: ['subscriptions', 'kitchen-operations', 'bilingual-and-app'],
  },
];
