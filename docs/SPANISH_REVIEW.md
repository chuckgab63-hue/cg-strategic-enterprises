# Spanish site: native-speaker review

The Spanish version of cgstrategic.dev lives at `/es/...` (for example `/es`, `/es/portfolio`).
Every Spanish string was written without a native speaker and **has not been reviewed yet**.
Until it is, Spanish is hidden: see "Launching" below.

Audience and tone: natural Latin American / US Spanish for Florida small-business owners,
always **usted**. Brand, product and people names stay in English (CG Strategic Enterprises,
Alex, Jess, Retell, Make.com, Twilio, Gemini, One Source Total Pest Control, Skunkworks, etc.).
Code, URLs, email addresses and phone numbers are never translated.

## How the files are laid out

Each file under `src/i18n/` holds both languages side by side:

```ts
const en = { title: 'Case Studies', ... };   // what the English site shows today
const es: typeof en = { title: 'Casos de estudio', ... };
```

Only edit the `es` half. If a key is missing or misspelled, `npm run build` fails, so you
can't accidentally drop a string. Keep `{placeholders}`, `${...}` and function arguments as they are.

## Files to review

### Needs native AND legal review

These carry legal or consent wording. The English version governs, and each Spanish page or
form says so on screen.

| File | What it is |
| --- | --- |
| `src/i18n/es/PrivacyEs.tsx` | Full Spanish Privacy Policy (`/es/privacy`). **New, not yet reviewed:** the Vercel Web Analytics line under "Proveedores de servicios que usamos" |
| `src/i18n/es/TermsEs.tsx` | Full Spanish Terms of Service, including SMS Terms (`/es/terms`) |
| `src/i18n/consent.ts` | SMS and marketing-email consent next to the contact form checkboxes, the "English governs" note, the phone-required error |
| `src/i18n/mealPrepSummaryForm.ts` | Follow-up email consent on the meal-prep calculator |
| `src/i18n/legal.ts` | "Last updated" label and the "this is a courtesy translation" banner on legal pages |

Notes for the legal reviewer:
- **STOP** and **HELP** stay in English in the Spanish consent and SMS Terms, because those are the keywords the messaging platform acts on.
- The SMS program names ("CG Strategic Enterprises Client Messaging", "CG Strategic Enterprises News & Offers") stay in English: they're the names registered with carriers.
- The carrier-reviewed English opt-in page (`public/sms-opt-in.html`) was **not** translated or changed.
- Whatever consent text the visitor saw is what gets sent to Make in `sms_consent_text`, `sms_marketing_consent_text` or `marketing_consent_text`, alongside `language: "es"`.

### Needs native review

| File | Page or feature |
| --- | --- |
| `src/i18n/meta.ts` | Page titles and meta descriptions (search results, browser tabs) |
| `src/i18n/common.ts` | Header, footer, "Hablemos" chooser, 404 page. **New, not yet reviewed:** "Servicios", "Menú", and the footer's headings and labels ("Herramientas gratuitas", "Empresa", "Atendemos a negocios en todo Florida", "Visibilidad en buscadores e IA", "Sitios web", ...) |
| `src/i18n/contact.ts` | Contact form, contact pop-up, `/es/contact` |
| `public/alex-voice-strings.js` | Alex call button and status messages. **Updated, not yet reviewed:** they no longer say Alex speaks only English |
| `src/i18n/alex.ts` | Alex call button's first label (must match the file above; a test checks) |
| `src/i18n/home.ts` | Home page hero. The services grid and the Free Website Check section (`websiteCheck`) in `es` are **new, not yet reviewed.** |
| `src/i18n/caseStudyCard.ts` | The pest control case study card on the home page and `/es/portfolio`. **New, not yet reviewed.** |
| `src/i18n/searchAiVisibility.ts` | `/es/search-ai-visibility` (moved from `/es/portfolio`). **New, not yet reviewed:** the whole page, including the closing "Hablar con Alex" box |
| `src/i18n/automations.ts` | `/es/automations` |
| `src/i18n/portfolio.ts` | `/es/portfolio` (the case studies index). **New, not yet reviewed:** `backToHome` and `comingSoon` |
| `src/i18n/mealPrepCalculator.tsx` | `/es/meal-prep-calculator` and its chart |
| `src/i18n/websiteCheck.ts` | `/es/website-check` form, errors and results. The "Más información" panels under the score cards and the missed-call estimator (`learnMore` in `es`) are **new, not yet reviewed.** |
| `src/lib/websiteCheck/reportCopy.ts` | Website Check report text written by the server: missed-call reasons, fallback fixes and summary (only the `es` halves) |
| `src/lib/websiteCheck/lead.ts` | Website Check report email: the score labels in the plain-text report (`MESSAGE_LABELS.es`). **New, not yet reviewed.** |
| `src/i18n/missedCallCalculator.ts` | `/es/missed-call-calculator`: labels, breakdown, CTAs, the email form and the estimate summary sent with the lead |
| `src/i18n/faq.ts` | `/es/faq`: every question and answer (also used for the FAQPage structured data). **New, not yet reviewed.** |
| `src/i18n/answeringService.ts` | `/es/answering-service`: the whole page and its FAQ (also used for the FAQPage structured data). **New, not yet reviewed.** |
| `src/i18n/mealPrepOrdering.ts` | `/es/meal-prep-ordering`: the whole page and its FAQ (also used for the FAQPage structured data). **New, not yet reviewed.** |
| `src/i18n/demoGuide.ts` | `/es/demo-guide`: the demo walkthrough guide page. The Spanish PDF (`public/guides/meal-prep-demo-guide-es.pdf`) is marked for native review on its cover. **New, not yet reviewed.** |
| `src/i18n/oneSourceCaseStudy.ts` | `/es/work/one-source-total-pest-control` |
| `src/i18n/skunkworks.ts` | `/es/skunkworks` (voicebots, spatial viewer) |
| `src/i18n/skunkworksProjects.ts` | "Lo que estamos construyendo" project cards |
| `src/i18n/cinematic.ts` | `/es/cinematic` |
| `src/i18n/fluidDynamics.ts` | `/es/fluid-dynamics` |
| `src/i18n/uiPolish.ts` | `/es/ui-polish` |

### AI answers

This server file tells Gemini to answer in Spanish when the page is Spanish. The instructions
themselves are short; the answers are generated live and can't be pre-reviewed. Worth trying one
on the Spanish site.

- `api/website-check.ts`: the Website Check's plain-language summary and top fixes

## Words and choices worth a second look

- **Plans and feature controls (Nov 2, 2026).** Every new or changed Spanish string:
  - `mealPrepOrdering.ts` `plans` (new section):
    - title: "Empiece simple y agregue funciones a medida que crece"
    - intro: "Tres planes. Cada uno incluye todo lo del anterior. Usted activa cada función en Configuración > Funciones cuando esté listo, y lo que no incluye su plan aparece como disponible en un plan superior. Desactivar una función nunca borra sus datos."
    - "Todo lo de {plan}, más:"
    - **Básico**, "Su negocio de comidas preparadas, en línea": "Planes semanales que sus clientes saltan, pausan, cambian o cancelan"; "Zonas de entrega y hojas de ruta"; "Puntos de recogida"; "Cupones"; "Etiquetas imprimibles con fechas límite de consumo y hojas de empaque, para que usted las revise"; "Plan de producción con listas de preparación y de compras"; "Reseñas de clientes"; "Cantidades mínimas y pedidos mínimos"; "Exportaciones CSV e informe del impuesto sobre ventas"; "Tienda en inglés y en español"; "App instalable"
    - **Avanzado**, "Venda más y maneje una cocina con más movimiento": "Comidas para armar, con calorías y macros"; "Tamaños y extras"; "Paquetes"; "Tarjetas de regalo"; "Puntos de recompensa y referidos"; "Encuestas a clientes"; "Costos de ingredientes y proveedores"; "Inventario, que se descuenta al marcar la semana como cocinada"; "Análisis, incluidas la tasa de clientes que repiten y la tasa de abandono"
    - **Pro**, "Herramientas con IA y más de una cocina": "Asistente de comidas con IA"; "Fotos de sus platos con IA, con su estilo y su aprobación"; "Trend Finder"; "Más de una cocina"
    - "La demo en vivo funciona con el plan Pro, con todo activado."
  - `demoGuide.ts` `inside`, changed: added "…además de los tres planes y cómo activar funciones en Configuración > Funciones."
  - `demoGuide.ts` `try.owner.items`, new: "Activar o desactivar funciones en Configuración > Funciones, y ver qué incluye cada plan (Básico, Avanzado, Pro)"; "Pídanos que le mostremos la demo con cada plan durante una llamada: la misma tienda y la misma área de administración, solo con las funciones de ese plan"
  - Words to check: plan names "Básico" / "Avanzado" / "Pro" (the same names the app uses), "Funciones" for *Features*, "un plan superior" for *a higher plan*.
- **Feature wave 2 (Nov 1, 2026): new demo features and the bilingual demo.** Every new or changed Spanish string:
  - `mealPrepOrdering.ts` `included.items`, changed card: **"Etiquetas y hojas de empaque"**: "Etiquetas para cada comida y una hoja de empaque para cada pedido, generadas con los datos de sus propias comidas (nutrición, ingredientes, alérgenos, fechas límite de consumo), para que usted las revise antes de usarlas."
  - `included.items`, new cards:
    - **"Arme su comida, tamaños y extras"**: "Sus clientes arman un bowl con sus proteínas, carbohidratos, vegetales y salsas, y ven sus calorías y macros mientras eligen. Cualquier comida puede tener tamaños y extras, con el precio que usted fije."
    - **"Paquetes y mínimos"**: "Venda un conjunto de comidas como un solo paquete a un solo precio, y fije una cantidad mínima por comida o un pedido mínimo para la tienda."
    - **"Programa de referidos"**: "Cada cliente recibe un enlace para recomendar. Cuando se paga el primer pedido del amigo, los dos reciben una recompensa, y un reembolso total la anula."
    - **"Inventario"**: "Las existencias de cada ingrediente en cada cocina, que se descuentan al marcar la semana como cocinada, con alertas de existencias bajas y un historial de cada cambio."
    - **"Encuestas, exportaciones e impuesto"**: "Una encuesta corta después de cada entrega, exportaciones CSV de pedidos, clientes, planes y existencias, y un informe del impuesto sobre ventas que cobró Stripe."
    - **"Inglés y español"**: "Su tienda y su área de administración en los dos idiomas. Sus clientes cambian de idioma con un toque y la tienda recuerda su elección."
  - `mealPrepOrdering.ts` `admin.items`, new lines:
    - "Hojas de empaque para cada pedido, con fechas límite de consumo calculadas con la vida útil que usted fija, para que usted las revise"
    - "Inventario en cada cocina: existencias que se descuentan al marcar la semana como cocinada, alertas de existencias bajas y cada ajuste registrado con su motivo"
    - "Comidas para armar, tamaños, extras y paquetes, con un informe de qué variaciones se venden"
    - "Una cantidad mínima por comida y un pedido mínimo para la tienda"
    - "Un programa de referidos, con recompensas que se anulan cuando el pedido se reembolsa por completo"
    - "Encuestas a clientes después de la entrega, con promedios, la tendencia semanal y comentarios"
    - "Exportaciones CSV de pedidos, clientes, planes semanales y existencias, y un informe del impuesto sobre ventas que cobró Stripe, por día, semana o mes"
    - "Toda el área de administración en inglés y en español"
  - `mealPrepOrdering.ts` `live.brandNote`, changed: "En la demo, abra el panel \"Pruébelo con su marca\" para agregar su propio logotipo y colores."
  - `demoGuide.ts` `inside`, changed: "…los planes semanales, las comidas para armar, los referidos, las entregas y la recogida, las etiquetas y hojas de empaque, el inventario, las encuestas, las exportaciones, las tarjetas de regalo, el estilo de las fotos de sus platos y Trend Finder, en inglés y en español."
  - `demoGuide.ts` `try.brand`, changed: "Empiece con \"Pruébelo con su marca\" para ver todo el sitio con su nombre, logotipo y colores. El selector EN | ES de arriba cambia el idioma de la demo."
  - `demoGuide.ts` `try.customer.items`, new lines: "Armar su propio bowl y ver cómo cambian sus calorías y macros mientras elige, o elegir el tamaño y los extras de una comida"; "Pedir un paquete de comidas, y ver el pedido mínimo y los mínimos por comida en el carrito"; "Copiar su enlace para recomendar desde Mi cuenta, y responder la encuesta corta de un pedido entregado". Changed: "…todo desde **Mi plan**" (was "My Plan").
  - `demoGuide.ts` `try.owner.items`, new lines: "Imprimir hojas de empaque para cada pedido, con fechas límite de consumo calculadas con la vida útil que usted fija, para que usted las revise"; "Revisar las existencias en cada cocina, registrar una entrega o una merma, y marcar la semana como cocinada para descontar sus ingredientes"; "Ver qué tamaños y extras se venden, las recompensas por referidos, los resultados de las encuestas y el informe de impuesto sobre ventas, y descargar exportaciones CSV". Changed: the sample business is now **"Establecido"** (was "Established").
  - Words to check: "extras" (*add-ons*, as the demo says), "hojas de empaque" (*packing slips*), "fechas límite de consumo" (*use-by dates*; the labels themselves say "Consumir antes del"), "existencias" (*stock*), "merma" (*waste*), "referidos" / "enlace para recomendar" (*referrals* / *referral link*), "comidas para armar" and "Arme su comida" (*build your own*; the demo's admin page is called "A su gusto"), "bowl" left as is.
  - The demo itself is now in Spanish too, so links from the Spanish pages open it in Spanish (`?lang=es`), and the Spanish copy now uses the demo's Spanish names ("Pruébelo con su marca", "Mi plan", "Establecido"). The demo app's own Spanish is reviewed separately, in the demo's repository.
- **Terms:** "clientes potenciales" for *leads*, "El Motor" for *The Engine*, "Casos de estudio" for *Case Studies*, "Hablemos" for *Let's Talk*.
- **Meal-prep:** "costo primo" (*prime cost*), "costo de ventas" (*COGS*), "merma" (*spoilage*), "cocina comercial compartida" (*commissary kitchen*).
- **Home hero wordplay:** "Parezca una empresa sólida. / O SEA una empresa sólida."
- **Demo-page headings:** "ESCALA DE CINE." and "Interfaz con acabado nativo".
- **AI photos (Oct 31, 2026, third update):** `mealPrepOrdering.ts` the "Estilo de las fotos de sus platos" card body and the "Fotos con IA de sus platos reales" line in `admin.items`; `demoGuide.ts` the new "Pídanos que le mostremos las fotos con IA…" line in `try.owner`. The Spanish PDF's meal editor, "Estilo de las fotos: revisión y aprobación" and "Genere una foto" pages now say photos are off for visitors and shown live on a call.
- **Meal-prep highlights (Oct 31, 2026, second update):** `mealPrepOrdering.ts` `included` (title "Qué incluye", intro, the "Probar la demo" button and nine cards), the moved assistant line in `admin.items`; `home.ts` `mealPrep` (the homepage teaser) and the meal-prep services card `body`; `demoGuide.ts` `screens` (title and four image descriptions); `meta.ts` home description.
- **Demo feature copy (Oct 31, 2026 update)** in `mealPrepOrdering.ts` (`intro`, `live.body`, the new `customers` list, `admin.items`, `migrate.body`, `data.body`, FAQ `weekly-orders`, `move-customers`, `own-data`), `demoGuide.ts` (`inside`, the new `try` and `setup` sections) and `meta.ts` (both pages' descriptions): "planes semanales", "punto de recogida", "hojas de ruta", "monto para entrega gratis", "Nosotros lo configuramos", "Como dueño del negocio". ("My Plan" and "Established" were in English then; since Nov 1 the demo shows them in Spanish, see above.) The Spanish PDF's "Genere una foto" page has a new second paragraph (Trend Finder photos and the meal check); "Check this photo against the recipe" stays in English, like the other button names.

## Demo guide PDF, Spanish (Nov 1, 2026 update)

`public/guides/meal-prep-demo-guide-es.pdf` (source: `docs/demo-guide/tools/content.mjs` in the demo's repository). Its screenshots are now taken from the demo in Spanish; meal names and sample data stay as entered, in English. Every new or changed Spanish string, in guide order (147):

- **section title** (changed): 5. Planes, entregas, etiquetas, hojas de empaque y sucursales
- **section title** (changed): 6. Referidos, encuestas e informes
- **section title** (changed): 7. Trend Finder, paso a paso
- **section title** (changed): 8. Traiga a sus clientes con usted
- **section title** (changed): 9. Próximos pasos
- **page “A working sample business you can click through”: paragraph 3** (new): Toda la demo está en inglés y en español: cambie con EN | ES en la parte superior de cualquier página. Su elección se mantiene, y un enlace que termina en ?lang=es abre la demo en español, así que puede mostrarla en español a sus clientes o a su equipo.
- **page “A working sample business you can click through”: callout 3** (new): Inglés o español
- **page “The owner side: your admin”: paragraph 1** (changed): Entre al panel desde el enlace al pie de cualquier página de la tienda (Área de administración) y haga clic en Iniciar sesión. La demo completa los datos de acceso de muestra por usted.
- **page “The owner side: your admin”: paragraph 2** (changed): Todas las páginas del panel están en el menú de la izquierda. Ver la tienda lo regresa a la tienda. El panel tiene su propio selector EN | ES arriba.
- **page “The owner side: your admin”: callout 3** (new): Inglés o español
- **page “Start over any time with Reset demo”: title** (changed): Empiece de nuevo cuando quiera con Reiniciar demo
- **page “Start over any time with Reset demo”: paragraph 1** (changed): La demo recuerda lo que cambie en este navegador, aunque lo cierre. Para volver al negocio de muestra original, haga clic en Reiniciar demo al final del menú del panel y confirme.
- **page “Add your name, logo and colors”: paragraph 1** (changed): El panel Pruébelo con su marca se abre la primera vez que visita la demo (o haga clic en él abajo a la izquierda). Escriba el nombre de su negocio, suba su logo y elija sus colores. Los cambios se ven al instante.
- **page “Add your name, logo and colors”: paragraph 2** (changed): Su logo nunca sale de su navegador. Copiar enlace para compartir le da un enlace que abre la demo con su nombre y sus colores.
- **page “See the whole site with your brand”: paragraph 1** (changed): Cierre el panel y recorra el sitio: el encabezado, los botones y las páginas usan su nombre y sus colores. Haga clic en Restablecer en el panel para volver a Northside Kitchen.
- **page “Build your own meal”: title** (new): Arme su propia comida
- **page “Build your own meal”: paragraph 1** (new): Abra Build Your Own Bowl en el menú y elija una proteína (en porción regular o doble), un carbohidrato, una o dos verduras, una salsa y toppings. Mientras el cliente elige, se suman el precio, las calorías, la proteína, los carbohidratos y la grasa, junto con los alérgenos de lo que eligió.
- **page “Build your own meal”: paragraph 2** (new): Si excluyó un alérgeno en los filtros del menú, aquí también se ocultan las opciones que lo contienen. La cocina recibe cada combinación en su plan de producción, sus etiquetas y sus hojas de empaque.
- **page “Build your own meal”: callout 1** (new): El precio, según lo que elige
- **page “Build your own meal”: callout 2** (new): Elija cada parte y su tamaño
- **page “Build your own meal”: callout 3** (new): Se suman los macros y los alérgenos
- **page “Sizes and add-ons”: title** (new): Tamaños y extras
- **page “Sizes and add-ons”: paragraph 1** (new): Abra una comida que se ofrezca en tamaños, como el Burger Bowl. Elija un tamaño y marque hasta dos extras: el precio y la nutrición cambian antes de agregarla al carrito. Un extra que agrega un alérgeno que la comida no tiene lo indica aquí, y también en el carrito, al pagar y en la etiqueta.
- **page “Sizes and add-ons”: paragraph 2** (new): Los planes semanales llevan el tamaño estándar de cada comida, sin extras; los tamaños y los extras son para pedidos individuales.
- **page “Sizes and add-ons”: callout 1** (new): Elija un tamaño
- **page “Sizes and add-ons”: callout 2** (new): Un extra, con el alérgeno que agrega
- **page “Sizes and add-ons”: callout 3** (new): La comida elegida: macros y alérgenos
- **page “Packs with a set list of meals”: title** (new): Paquetes con una lista fija de comidas
- **page “Packs with a set list of meals”: paragraph 1** (new): Un paquete se vende a su propio precio con una lista fija de comidas, como el Keto Variety – 10 Meal Pack: cinco Garlic Butter Chicken y cinco Burger Bowl. Su página muestra qué incluye, los alérgenos de todas sus comidas y la nutrición por comida, promediada en el paquete.
- **page “Packs with a set list of meals”: paragraph 2** (new): La cocina ve las comidas que contiene en el plan de producción, las etiquetas y las hojas de empaque. Usted define el contenido en el editor de la comida, en Qué incluye este paquete.
- **page “Packs with a set list of meals”: callout 1** (new): El precio del paquete
- **page “Packs with a set list of meals”: callout 2** (new): Qué incluye
- **page “Packs with a set list of meals”: callout 3** (new): Alérgenos de todas sus comidas
- **page “Order minimums”: title** (new): Pedidos mínimos
- **page “Order minimums”: paragraph 1** (new): Dos mínimos, ambos opcionales. Una comida puede venderse de varias en varias: la Overnight Oats (mínimo 2) entra al carrito de dos en dos. Y la tienda puede tener un pedido mínimo ($20 en la demo); una zona de entrega puede tener uno mayor, y se aplica el mayor. El carrito indica lo que falta y no deja finalizar el pedido hasta cumplirlo.
- **page “Order minimums”: paragraph 2** (new): Usted los define en el editor de la comida (Mínimo por pedido) y en la página de entregas (Mínimos de pedido). No afectan a los planes semanales.
- **page “Order minimums”: callout 1** (new): Se agrega con su mínimo de 2
- **page “Order minimums”: callout 2** (new): El mínimo de la tienda y cuál se aplica
- **page “Order minimums”: callout 3** (new): Lo que falta
- **page “The “Help me choose” assistant”: title** (changed): El asistente “Ayúdeme a elegir”
- **page “The gift card code (demo)”: paragraph 1** (changed): La demo no envía correos, así que el código aparece en pantalla. Pruébelo al pagar, en la casilla Tarjeta de regalo.
- **page “Refer a friend”: title** (new): Recomiende a un amigo
- **page “Refer a friend”: paragraph 1** (new): En la página de su cuenta, cada cliente tiene un código y un enlace para compartir. Un amigo que se registra con él y paga su primer pedido gana una recompensa para los dos: un cupón, crédito en la tienda o puntos, como usted decida. Si ese pedido se reembolsa por completo, se retiran ambas recompensas.
- **page “Refer a friend”: paragraph 2** (new): Sus clientes ven a los amigos que recomendaron y sus recompensas, listas para usar al pagar. En la demo los referidos son historial de muestra: no se cobra nada, así que ningún referido nuevo recibe recompensa en vivo.
- **page “Refer a friend”: callout 1** (new): Comparta el enlace
- **page “Refer a friend”: callout 2** (new): Amigos recomendados y su estado
- **page “Refer a friend”: callout 3** (new): Recompensas listas para usar
- **page “A short survey after delivery”: title** (new): Una encuesta corta después de la entrega
- **page “A short survey after delivery”: paragraph 1** (new): Cuando un pedido se entrega o se recoge, su cliente puede responder cuatro preguntas rápidas: en general, la comida, la entrega o recogida, y si lo recomendaría, con un comentario opcional. Una respuesta por pedido, y solo usted la ve.
- **page “A short survey after delivery”: paragraph 2** (new): En la demo, ábrala desde la cuenta de Maya: Historial de pedidos, “¿Qué tal este pedido?”. El enlace solo funciona para el cliente que hizo el pedido. El envío por correo después de la entrega se configura con su propio sistema; sus clientes también la encuentran en su historial de pedidos.
- **page “A short survey after delivery”: callout 1** (new): Calificación con estrellas
- **page “A short survey after delivery”: callout 2** (new): ¿Nos recomendaría?
- **page “A short survey after delivery”: callout 3** (new): Enviar
- **page “Overview”: paragraph 1** (changed): Su tablero: comidas en el menú, planes activos, cupones y puntos de recogida, con accesos directos a cada uno, y los ingredientes que se están acabando.
- **page “Edit a meal and its photo”: paragraph 1** (changed): Cambie el nombre, el precio, la nutrición, las categorías y en qué páginas del menú aparece. En su propio sistema, Generar imagen con IA crea una foto del plato con el estilo de su menú, la revisa contra los ingredientes del plato y espera su aprobación; en la demo pública está desactivado para los visitantes, y se lo mostramos en vivo durante una llamada.
- **page “Sizes and add-ons on a meal”: title** (new): Tamaños y extras de una comida
- **page “Sizes and add-ons on a meal”: paragraph 1** (new): En el editor de una comida, en Tamaños y extras: marque Ofrecer tamaños y dé a cada tamaño su etiqueta y lo que suma al precio (su multiplicador ajusta la receta y la nutrición). Marque Ofrecer extras para elegir los extras que ofrece esta comida y cuántos puede agregar el cliente. Aplicar tamaños y extras los guarda, y cada cambio queda en el Registro de auditoría.
- **page “Sizes and add-ons on a meal”: callout 1** (new): Ofrecer tamaños
- **page “Sizes and add-ons on a meal”: callout 2** (new): Agregar un tamaño
- **page “Sizes and add-ons on a meal”: callout 3** (new): Ofrecer extras
- **page “Build your own: choices and rules”: title** (new): A su gusto: opciones y reglas
- **page “Build your own: choices and rules”: paragraph 1** (new): En A su gusto, defina cuántas opciones de cada tipo elige el cliente (mínimo y máximo) y guarde. Más abajo, agregue los ingredientes para elegir: cada uno con sus tamaños, lo que suma al precio y su receta. Las calorías, los macros y los alérgenos salen de la receta y de su lista de ingredientes; revíselos ahí antes de ofrecer una opción.
- **page “Build your own: choices and rules”: paragraph 2** (new): Nueva comida a su gusto agrega otra, oculta hasta que la ponga disponible en la página de comidas. Los Extras de esta página son los que ofrece en otras comidas.
- **page “Build your own: choices and rules”: callout 1** (new): Cuántas de cada tipo
- **page “Build your own: choices and rules”: callout 2** (new): Guardar las reglas
- **page “Build your own: choices and rules”: callout 3** (new): Una comida a su gusto nueva
- **page “Build your own: choices and rules”: callout 4** (new): Agregar un ingrediente para elegir
- **page “Ingredients”: paragraph 1** (changed): Todo lo que compra, cómo lo compra (por libra, por caja), cuánto cuesta y cuánto tiene en existencia. Las recetas y los costos se calculan con esta lista.
- **page “Inventory: stock on hand”: title** (new): Inventario: existencias
- **page “Inventory: stock on hand”: paragraph 1** (new): La página de ingredientes muestra cuánto tiene de cada uno, en la unidad en que lo compra. Lo que está en su nivel de alerta o por debajo (se define al editar el ingrediente) aparece arriba y marcado como Baja. Las existencias bajan cuando una semana se marca como cocinada, nunca cuando se hacen pedidos.
- **page “Inventory: stock on hand”: paragraph 2** (new): El ícono de caja ajusta las existencias; el del reloj muestra cada movimiento. Con más de una cocina, cada una lleva sus propias existencias.
- **page “Inventory: stock on hand”: callout 1** (new): Alertas de existencias bajas
- **page “Inventory: stock on hand”: callout 2** (new): En existencia
- **page “Inventory: stock on hand”: callout 3** (new): Ajustar existencias (el reloj de al lado: su historial)
- **page “Adjust stock, with a reason”: title** (new): Ajuste las existencias, con un motivo
- **page “Adjust stock, with a reason”: paragraph 1** (new): Elija el motivo (entrega recibida, corrección de conteo, merma o descomposición, u otro, que requiere una nota), ingrese la cantidad y guarde. Cada ajuste queda en el historial de existencias, con quién lo hizo, y en el Registro de auditoría.
- **page “Adjust stock, with a reason”: callout 1** (new): Motivo
- **page “Adjust stock, with a reason”: callout 2** (new): Cantidad
- **page “Adjust stock, with a reason”: callout 3** (new): Nota
- **page “Adjust stock, with a reason”: callout 4** (new): Guardar ajuste
- **page “Shopping lists by supplier”: paragraph 1** (changed): Más abajo: todo lo que hay que comprar, redondeado a como lo compra, con una lista por proveedor y su costo estimado. Con las existencias registradas, cada fila muestra lo que necesita la semana, lo que hay en existencia y lo que hay que comprar. Imprímala o descárguela como hoja de cálculo.
- **page “Mark a week cooked”: title** (new): Marque una semana como cocinada
- **page “Mark a week cooked”: paragraph 1** (new): Cuando la cocina termine una semana, haga clic en Marcar esta semana como cocinada en el plan de producción: las cantidades exactas de la lista de compras de esa semana se descuentan de las existencias, una sola vez. Deshacer cocinado las devuelve. Una semana que aún recibe pedidos todavía no se puede marcar.
- **page “Mark a week cooked”: paragraph 2** (new): Un pedido cancelado antes simplemente sale del plan. Después, no se devuelven existencias, porque la comida ya se preparó; registre como merma lo que se deseche.
- **page “Mark a week cooked”: callout 1** (new): Marcar esta semana como cocinada
- **page “Mark a week cooked”: callout 2** (new): Existencias y su historial
- **page “Variations: sizes, add-ons and choices ordered”: title** (new): Variaciones: tamaños, extras y opciones pedidas
- **page “Variations: sizes, add-ons and choices ordered”: paragraph 1** (new): Elija una semana de entrega: cuántos se pidieron de cada tamaño, de cada extra (y a qué comidas se agregó) y de cada ingrediente a su gusto, con los mismos pedidos y la previsión de planes semanales del plan de producción. Variaciones CSV descarga las tres tablas.
- **page “Variations: sizes, add-ons and choices ordered”: callout 1** (new): Elija la semana
- **page “Variations: sizes, add-ons and choices ordered”: callout 2** (new): Tamaños
- **page “Variations: sizes, add-ons and choices ordered”: callout 3** (new): Extras
- **page “Variations: sizes, add-ons and choices ordered”: callout 4** (new): Descargar en CSV
- **page “Plans”: paragraph 1** (changed): Los planes semanales que pueden elegir sus clientes: comidas por semana y precio por comida. Quién tiene cada plan está en Suscripciones (sección 5).
- **page “Conversations”: paragraph 1** (changed): Lo que sus clientes le preguntan al asistente “Ayúdeme a elegir” y lo que no pudo responder: una forma rápida de ver qué agregar a su menú.
- **page “Audit Log”: title** (changed): Registro de auditoría
- **page “Audit Log”: callout 1** (changed): Registro de auditoría
- **page “Food photo styling: check and approve”: paragraph 1** (changed): Cada opción reescribe su línea de la guía de estilo, y usted puede editar el texto. Al guardar se conservan las versiones anteriores y el cambio queda en el Registro de auditoría.
- **page “Subscriptions: everyone on a weekly plan”: title** (changed): Suscripciones: todos sus clientes con plan semanal
- **page “Change a plan for a customer”: paragraph 1** (changed): Abra un cliente para ver exactamente lo que él ve y hacer cambios por él: saltar una semana, elegir comidas, pausar, cambiar las comidas por semana o cancelar. Cada cambio que usted hace queda en el Registro de auditoría, y el plan guarda su propio historial.
- **page “A sample label sheet”: paragraph 1** (changed): Cada etiqueta lleva su nombre y logo, la comida y la porción, un cuadro de nutrición, los ingredientes, una línea Contiene con los principales alérgenos (y líneas Posible para salsas compradas), las fechas de empaque y de consumo, y cómo conservarla y recalentarla.
- **page “Packing slips”: title** (new): Hojas de empaque
- **page “Packing slips”: paragraph 1** (new): Una hoja por pedido, para quien arma la bolsa y para el repartidor: el cliente y su teléfono, la dirección de entrega o el punto de recogida, el día, la ruta y el número de parada (en el mismo orden que en Rutas), las notas de entrega y cada comida con su tamaño, sus opciones y sus extras.
- **page “Packing slips”: paragraph 2** (new): Elija la semana, filtre por día, entrega o recogida, o ruta, e imprima dos hojas o una por página. Ábralas desde el plan de producción, o desde los detalles de un pedido en Pedidos para ese pedido solo. Imprimir no cambia nada en sus pedidos.
- **page “Packing slips”: callout 1** (new): Elija la semana y filtre
- **page “Packing slips”: callout 3** (new): La parada de la ruta
- **page “Packing slips”: callout 4** (new): Notas de entrega
- **page “Gift Cards”: paragraph 1** (changed): Cada tarjeta de regalo: para quién es, su saldo y su historial (emisión, cada pedido que pagó, ajustes). Emita una tarjeta a mano (una cortesía, un premio), cambie un saldo o desactive una tarjeta perdida, siempre con una nota y todo en el Registro de auditoría.
- **page “More than one kitchen: Locations”: title** (changed): Más de una cocina: Sucursales
- **page “More than one kitchen: Locations”: paragraph 2** (changed): Con una sola cocina no verá nada de esto. Esta página es del negocio de muestra “Establecido” de la demo (elíjalo en el panel de marca), que tiene dos.
- **page “Referrals”: title** (new): Referidos
- **page “Referrals”: paragraph 1** (new): Cada referido: quién recomendó a quién, en qué estado está (esperando un primer pedido, recompensado, revertido tras un reembolso o bloqueado) y cada recompensa con su código. Un referido se bloquea cuando un cliente intenta usar su propio código, o el amigo usa el correo, la tarjeta o la dirección de entrega de quien lo recomendó; se muestra el motivo.
- **page “Referrals”: paragraph 2** (new): Su sistema nunca guarda los datos de las tarjetas: para revisar si es la misma tarjeta guarda solo la huella de la tarjeta que genera Stripe. En la demo esto es historial de muestra.
- **page “Referrals”: callout 1** (new): Totales
- **page “Referrals”: callout 2** (new): Filtrar por estado
- **page “Referrals”: callout 3** (new): Revertido tras un reembolso: se retiran sus recompensas
- **page “Referral settings”: title** (new): Configuración de referidos
- **page “Referral settings”: paragraph 1** (new): Active o desactive el programa y elija qué recibe quien recomienda y qué recibe el amigo (un cupón de un solo uso, de % o de $; crédito en la tienda; o puntos), cuánto duran los cupones de recompensa y los límites por persona al mes y en total. Ambas recompensas se emiten cuando se paga el primer pedido del amigo, y cada cambio guardado queda en el Registro de auditoría.
- **page “Referral settings”: callout 1** (new): Programa activo o no
- **page “Referral settings”: callout 2** (new): La recompensa de quien recomienda
- **page “Referral settings”: callout 3** (new): La recompensa del amigo
- **page “Customer surveys”: title** (new): Encuestas a clientes
- **page “Customer surveys”: paragraph 1** (new): Las respuestas en las fechas que elija: cuántas y la tasa de respuesta, las calificaciones promedio en general, de la comida y de la entrega o recogida, el porcentaje que lo recomendaría, lo mismo por semana, y cada comentario con su pedido y su cliente. CSV descarga una fila por respuesta. Son aparte de las reseñas de comidas, y solo usted las ve.
- **page “Customer surveys”: callout 1** (new): Respuestas y tasa de respuesta
- **page “Customer surveys”: callout 2** (new): Por semana
- **page “Customer surveys”: callout 3** (new): Comentarios
- **page “Customer surveys”: callout 4** (new): Descargar en CSV
- **page “Exports”: title** (new): Exportar
- **page “Exports”: paragraph 1** (new): Sus datos en archivos CSV para Excel, Google Sheets o su contador: pedidos (una fila por cada comida del pedido), clientes, planes semanales, inventario en existencia y movimientos de inventario. Elija las fechas para los pedidos y los movimientos, y haga clic en Descargar CSV. Exportar no cambia nada, y el archivo de clientes no incluye contraseñas ni datos de pago.
- **page “Exports”: callout 1** (new): Las fechas
- **page “Exports”: callout 3** (new): Inventario en existencia
- **page “Sales tax report”: title** (new): Informe de impuesto sobre ventas
- **page “Sales tax report”: paragraph 1** (new): Un registro del impuesto que Stripe registró en sus pedidos pagados y entregados, por día, semana o mes, con totales y un CSV. La aplicación no calcula impuestos: con Stripe Tax activado en su cuenta de Stripe, el impuesto de cada pedido se guarda tal como Stripe lo cobró. Es un registro de sus pedidos, no asesoría fiscal.
- **page “Sales tax report”: paragraph 2** (new): En la demo, los montos de impuesto son datos de muestra inventados.
- **page “Sales tax report”: callout 1** (new): Datos de muestra en la demo
- **page “Sales tax report”: callout 2** (new): Por día, semana o mes
- **page “Sales tax report”: callout 3** (new): El impuesto, como lo registró Stripe
- **page “Sales tax report”: callout 4** (new): Descargar en CSV
- **page “Find trending meals”: paragraph 1** (changed): En la página de comidas, haga clic en Buscar comidas en tendencia. Elija cuántas ideas, un enfoque (alto en proteína, vegano, comida reconfortante…) y una temporada, y busque.
- **page “Ingredients, nutrition and costs”: paragraph 1** (changed): Ver detalles muestra cada ingrediente con su nutrición y su costo. Los costos vienen de su lista de ingredientes; para ingredientes nuevos, su propio sistema estima el costo con los precios en línea de sus proveedores y promedios públicos de EE. UU., y marca cada uno para que usted lo confirme.
- **page “Accept it: a hidden draft”: paragraph 1** (changed): Aceptar convierte la idea en una comida en borrador con su receta, preparación, nutrición y precio. Los borradores quedan ocultos para sus clientes hasta que usted los publique.
- **page “Open the draft”: paragraph 1** (changed): Sus borradores están en Borradores, en la página de comidas. Haga clic en el lápiz para revisar uno.
- **page “Add new ingredients and pick suppliers”: paragraph 1** (changed): Los ingredientes que aún no tiene aparecen con Agregar a Ingredientes. Con un clic se agregan a su lista y a la receta; después elija su proveedor y costo en la página de ingredientes.
- **page “Generate a photo”: paragraph 1** (changed): En su propio sistema, Generar imagen con IA crea una foto del plato con el estilo de su menú, revisada contra los ingredientes y alérgenos del plato antes de que usted pueda aprobarla. En la demo pública está desactivado para los visitantes, como indica el mensaje; se lo mostramos en vivo durante una llamada.
- **page “Generate a photo”: paragraph 2** (changed): Un borrador de Trend Finder empieza sin foto, aunque Trend Finder haya creado una para la idea: esa foto solo se revisó por su estilo. Se ofrece como opción: Verificar esta foto con la receta le aplica la misma revisión, y una foto que la pasa sigue esperando su aprobación.
- **page “Generate a photo”: callout 1** (changed): Generar imagen con IA
- **page “Save & publish”: paragraph 1** (changed): Póngale precio, marque que revisó los ingredientes, alérgenos y nutrición, y haga clic en Guardar y publicar. Sus cambios se guardan y la comida pasa al menú en un solo paso.
- **page “See it on your storefront”: paragraph 1** (changed): Haga clic en Ver la tienda: la comida nueva ya está en el menú, lista para pedir.

## Demo guide PDF, Spanish (Nov 1, 2026 update: plans and features)

New section "8. Planes y funciones" and one changed page. Every new or changed Spanish string (50):

- **section title** (new): 8. Planes y funciones
- **section title** (changed): 9. Traiga a sus clientes con usted
- **section title** (changed): 10. Próximos pasos
- **page “Settings: kitchen rules”: paragraph 1** (changed): Configuración tiene tres pestañas: General (estas reglas de cocina, sus proveedores y la guía de estilo de las fotos), Funciones (sección 8) y Seguridad (verificación en dos pasos para su cuenta).
- **page “Three plans: Basic, Advanced and Pro”: title** (new): Tres planes: Básico, Avanzado y Pro
- **page “Three plans: Basic, Advanced and Pro”: paragraph 1** (new): El sistema tiene tres planes, y cada uno incluye todo lo del anterior. Básico: pedidos en línea con planes semanales, zonas y rutas de entrega, puntos de recogida, cupones, etiquetas, hojas de empaque, plan de producción, reseñas, mínimos de pedido, exportaciones e informes, español y la app instalable.
- **page “Three plans: Basic, Advanced and Pro”: paragraph 2** (new): Avanzado agrega comidas a su gusto, tamaños y extras, paquetes, tarjetas de regalo, puntos de recompensa, referidos, encuestas, costos y proveedores, inventario y análisis. Pro agrega las herramientas con IA (el asistente de comidas, las fotos de comidas con IA y Trend Finder) y más de una cocina.
- **page “Three plans: Basic, Advanced and Pro”: paragraph 3** (new): En su propio sitio, CG Strategic define su plan, y usted elige qué funciones de ese plan están activadas en Configuración > Funciones. Active las funciones cuando esté listo para usarlas. Desactivar una nunca borra sus datos.
- **page “Three plans: Basic, Advanced and Pro”: callout 1** (new): Configuración > Funciones
- **page “Three plans: Basic, Advanced and Pro”: callout 2** (new): Cada plan y lo que incluye
- **page “Three plans: Basic, Advanced and Pro”: callout 3** (new): Un interruptor para cada función
- **page “Turn a feature on or off”: title** (new): Active o desactive una función
- **page “Turn a feature on or off”: paragraph 1** (new): En la administración, abra Configuración y haga clic en la pestaña Funciones. Cada función aparece bajo su plan, con una descripción breve y un interruptor.
- **page “Turn a feature on or off”: paragraph 2** (new): Al activar una función, el cambio es inmediato. Al desactivarla, primero se muestra lo que afecta: los datos en uso que contiene y las funciones que dependen de ella, que también se desactivan. Aquí, al desactivar Zonas de entrega también se desactiva Rutas de entrega. Haga clic en Desactivar para confirmar, o en Cancelar.
- **page “Turn a feature on or off”: paragraph 3** (new): Una función desactivada se oculta en su tienda y en su administración; no se borra nada. Actívela de nuevo y todo estará como lo dejó. Cada cambio queda en el Registro de auditoría.
- **page “Turn a feature on or off”: callout 1** (new): Funciones que se desactivan con ella
- **page “Turn a feature on or off”: callout 2** (new): Los datos en uso que contiene
- **page “Turn a feature on or off”: callout 3** (new): Confirmar
- **page “Features that need another one”: title** (new): Funciones que necesitan otra
- **page “Features that need another one”: paragraph 1** (new): Algunas funciones necesitan otra activada primero: Rutas de entrega necesita Zonas de entrega, Tamaños y extras necesita A su gusto, e Inventario necesita Plan de producción.
- **page “Features that need another one”: paragraph 2** (new): Mientras la función que necesita esté desactivada, su interruptor no se puede activar y le indica qué activar primero. Active de nuevo Zonas de entrega y luego Rutas de entrega.
- **page “Features that need another one”: callout 1** (new): Zonas de entrega, desactivada
- **page “Features that need another one”: callout 2** (new): Rutas de entrega aún no se puede activar
- **page “Features that need another one”: callout 3** (new): Qué activar primero
- **page “Choose what happens to live data”: title** (new): Elija qué pasa con los datos en uso
- **page “Choose what happens to live data”: paragraph 1** (new): Algunas funciones contienen cosas que sus clientes están usando. Antes de desactivar una de ellas, usted elige qué pasa, y Desactivar espera hasta que lo haga.
- **page “Choose what happens to live data”: paragraph 2** (new): Planes semanales: solo detener nuevas suscripciones (los planes en curso continúan y se cobran como siempre), o pausar todos los cobros, con aviso a los clientes. Sus planes quedan en pausa por el negocio, se muestra un aviso en su cuenta y usted recibe un CSV de los clientes afectados. Al activar de nuevo los planes semanales, se reanudan exactamente esos planes.
- **page “Choose what happens to live data”: paragraph 3** (new): Puntos de recompensa y referidos: respetar (las recompensas pendientes por referidos se siguen dando al ganarse; no se ganan puntos nuevos) o retener (los saldos se conservan y las recompensas pendientes esperan hasta que se active de nuevo). Las tarjetas de regalo dejan de venderse, y las ya vendidas se pueden seguir usando.
- **page “Choose what happens to live data”: callout 1** (new): Lo que está en uso ahora
- **page “Choose what happens to live data”: callout 2** (new): Su elección
- **page “Choose what happens to live data”: callout 3** (new): Pausar todos los cobros, con aviso
- **page “Choose what happens to live data”: callout 4** (new): Desactivar
- **page “Available on a higher plan”: title** (new): Disponible en un plan superior
- **page “Available on a higher plan”: paragraph 1** (new): Su plan aparece marcado en la lista. Las funciones de un plan superior muestran Disponible en un plan superior en lugar de un interruptor. Aquí el negocio tiene el plan Avanzado, así que las funciones de Pro aparecen, pero no se pueden activar.
- **page “Available on a higher plan”: paragraph 2** (new): Para cambiar de plan, hable con CG Strategic: nosotros definimos su plan y usted sigue manejando sus interruptores.
- **page “Available on a higher plan”: callout 1** (new): Su plan
- **page “Available on a higher plan”: callout 2** (new): Un plan superior
- **page “Available on a higher plan”: callout 3** (new): Disponible en un plan superior
- **page “Preview a plan (for presenters)”: title** (new): Vista previa de un plan (para presentadores)
- **page “Preview a plan (for presenters)”: paragraph 1** (new): En una llamada, un presentador puede mostrar la demo con cualquier plan. Vista previa de un plan está al final del panel Pruébelo con su marca. Los visitantes la ven bloqueada: se abre con el código de presentador.
- **page “Preview a plan (for presenters)”: paragraph 2** (new): Elija Básico, Avanzado o Pro: la tienda, el menú de la administración y sus páginas cambian de inmediato. Mientras se muestra un plan menor, una insignia queda abajo a la izquierda. Reiniciar demo vuelve a Pro, con todas las funciones activadas.
- **page “Preview a plan (for presenters)”: paragraph 3** (new): Esto cambia solo la demo en ese navegador. En el sitio propio de cada negocio, CG Strategic define el plan y el negocio maneja sus interruptores en Configuración > Funciones.
- **page “Preview a plan (for presenters)”: callout 1** (new): Para presentadores: se abre con el código de presentador
- **page “Preview a plan (for presenters)”: callout 2** (new): Básico, Avanzado o Pro
- **page “Preview a plan (for presenters)”: callout 3** (new): El plan en vista previa
- **page “Preview a plan (for presenters)”: callout 4** (new): Solo cambia esta demo
- **page “The admin on the Basic plan”: title** (new): La administración en el plan Básico
- **page “The admin on the Basic plan”: paragraph 1** (new): En el plan Básico, el menú de la administración muestra solo las páginas de Básico: compárelo con el menú completo de la sección 1. Las páginas de un plan superior, como A su gusto, Tarjetas de regalo, Análisis o Conversaciones, no aparecen en el menú, y si abre una, vuelve a la página principal de la administración con un aviso breve. En la tienda, las tarjetas de regalo y los paquetes de comidas se ocultan de la misma manera.
- **page “The admin on the Basic plan”: callout 1** (new): Solo las páginas de Básico
- **page “The admin on the Basic plan”: callout 2** (new): Vista previa del plan Básico

## Demo guide PDF, Spanish (Nov 1, 2026 update: AI meal assistant, Conversations, billing-change emails)

`public/guides/meal-prep-demo-guide-es.pdf` (source: `docs/demo-guide/tools/content.mjs` in the demo repository). The old “Help me choose” pages are replaced by the AI meal assistant pages, Conversations is rewritten, and section 8 now covers Spanish being off by default and the billing-change emails. Every new or changed Spanish string:

- **page “A working sample business you can click through”: paragraph 3** (changed): La demo abre en inglés, y el español está a un clic: cambie con EN | ES en la parte superior de cualquier página y tanto la tienda como el panel de administración se muestran en español. Su elección se mantiene, y un enlace que termina en ?lang=es abre la demo en español, así que puede mostrarla en español a sus clientes o a su equipo.
- **page “The AI meal assistant”: title** (new): El asistente de comidas con IA
- **page “The AI meal assistant”: paragraph 1** (new): Un botón de chat, “Pregunte a nuestro asistente de IA”, aparece en la esquina de todas las páginas de la tienda. Sus clientes preguntan con sus propias palabras (“¿Qué comidas con pollo tienen?”) y el asistente responde con el menú de su cocina: las comidas que encajan, con sus precios y un botón Agregar que el cliente presiona por sí mismo.
- **page “The AI meal assistant”: paragraph 2** (new): Responde en inglés o en español, según el idioma de la tienda. No puede hacer pedidos, cambiar un plan ni prometer un descuento, y cuando no sabe algo, lo dice y ofrece pasarle la pregunta a usted.
- **page “The AI meal assistant”: paragraph 3** (new): En la demo es un asistente de IA real que responde con el menú de muestra. Cada visitante puede hacer unas pocas preguntas al día; al llegar al límite, el asistente lo avisa, y en una llamada de recorrido le mostramos más.
- **page “The AI meal assistant”: callout 1** (new): El asistente de IA
- **page “The AI meal assistant”: callout 2** (new): Comidas de su menú, con un botón Agregar
- **page “The AI meal assistant”: callout 3** (new): Pregunte con sus propias palabras
- **page “Allergy questions, and passing a question to the kitchen”: title** (new): Preguntas sobre alergias y cómo pasar una pregunta a la cocina
- **page “Allergy questions, and passing a question to the kitchen”: paragraph 1** (new): Cualquier pregunta que mencione alergias recibe un recordatorio claro: “Si tiene una alergia grave, comuníquese directamente con la cocina antes de pedir.” El asistente solo repite los alérgenos que usted registró para cada comida. Nunca dice que una comida es segura para una alergia, y no da consejos médicos ni de dieta.
- **page “Allergy questions, and passing a question to the kitchen”: paragraph 2** (new): Cuando no puede responder, o el cliente prefiere hablar con una persona, Hablar con la cocina le pasa la conversación a usted. El nombre, el correo y el teléfono son opcionales, y el cliente ve que se envió.
- **page “Allergy questions, and passing a question to the kitchen”: callout 1** (new): El aviso de comunicarse con la cocina
- **page “Allergy questions, and passing a question to the kitchen”: callout 2** (new): Hablar con la cocina
- **page “Allergy questions, and passing a question to the kitchen”: callout 3** (new): El formulario para pasarla
- **page “Allergy questions, and passing a question to the kitchen”: callout 4** (new): Enviar a la cocina
- **page “Conversations”: title** (changed): Conversaciones
- **page “Conversations”: paragraph 1** (changed): Aquí se guarda cada chat con el asistente de IA, para que vea qué preguntan sus clientes y qué respondió. Los recuadros cuentan las conversaciones, cuántas llevaron a un pedido de una comida recomendada, cuántas no pudo responder del todo y cuántas se enviaron a la cocina.
- **page “Conversations”: paragraph 2** (changed): Más abajo, lo que la gente más pidió y lo que no pudo responder: una forma rápida de ver qué agregar a su menú. Las conversaciones se borran después de los días que usted elija, 90 por defecto. En la demo el historial es inventado; la conversación que tenga en esta pestaña aparece primero.
- **page “Conversations”: callout 1** (changed): Conversaciones
- **page “Conversations”: callout 2** (changed): Enviadas a la cocina
- **page “Conversations”: callout 3** (changed): Lo que no pudo responder
- **page “Conversations passed to the kitchen”: title** (new): Conversaciones enviadas a la cocina
- **page “Conversations passed to the kitchen”: paragraph 1** (new): Muestre solo las preguntas que sus clientes le pasaron. Abra una para leer todo el chat, el idioma, los datos de contacto que dejó y si siguió un pedido en la semana. Puede borrar cualquier conversación.
- **page “Conversations passed to the kitchen”: callout 1** (new): Mostrar: todas, o enviadas a la cocina
- **page “Conversations passed to the kitchen”: callout 2** (new): Una conversación
- **page “Conversations passed to the kitchen”: callout 3** (new): Todo el chat y los datos de contacto
- **page “Three plans: Basic, Advanced and Pro”: paragraph 2** (changed): Avanzado agrega comidas a su gusto, tamaños y extras, paquetes, tarjetas de regalo, puntos de recompensa, referidos, encuestas, costos y proveedores, inventario y análisis. Pro agrega las herramientas con IA (el asistente de chat para clientes y su página de Conversaciones, las fotos de comidas con IA y Trend Finder) y más de una cocina.
- **page “Turn a feature on or off”: paragraph 4** (new): El español empieza desactivado en una tienda nueva: la tienda abre en inglés y no muestra el selector EN | ES hasta que usted active Español aquí. (Esta demo lo tiene activado, para que vea los dos idiomas.)
- **page “Choose what happens to live data”: paragraph 4** (new): La misma pantalla muestra a quién se le enviará un correo. Cuando usted pausa los cobros o detiene nuevas suscripciones, cada cliente con un plan semanal recibe un correo breve sobre el cambio, en inglés o en español, y otro cuando se reanudan los planes en pausa, además del aviso en su cuenta. En su propio sitio, los correos salen desde la dirección de correo de su negocio, que configuramos con usted. En esta demo no se envía nada.
- **page “Choose what happens to live data”: callout 1** (changed): Lo que está en uso ahora
- **page “Choose what happens to live data”: callout 2** (changed): Su elección
- **page “Choose what happens to live data”: callout 3** (changed): Pausar todos los cobros, con aviso
- **page “Choose what happens to live data”: callout 4** (changed): Quién recibe un correo
- **page “Choose what happens to live data”: callout 5** (changed): Desactivar

## Site pages, Spanish (Nov 1, 2026 update: AI meal assistant, billing-change emails, English-first demo)

Strings on the meal-prep ordering page, the demo guide page and the guide's meta description that are new or changed.

### `src/i18n/mealPrepOrdering.ts` (`/es/meal-prep-ordering`)

- **card “Planes semanales”: body** (changed): Sus clientes se suscriben y luego saltan una semana, pausan, cambian o cancelan por su cuenta antes de su fecha límite. Si alguna vez pausa los cobros, los clientes afectados reciben un correo en su idioma.
- **card “Asistente de comidas con IA”** (new, icon `assistant`): Un chat en su tienda que responde las preguntas de sus clientes con su propio menú, dirige las preguntas sobre alergias a su cocina y le pasa lo que no puede responder. Cada conversación queda guardada para usted en su panel de administración.
- **card “Inglés y español”: body** (changed): Su tienda y su área de administración en inglés y en español. La tienda abre en inglés; active el español en Configuración > Funciones y sus clientes cambian de idioma con un toque, y la tienda recuerda su elección.
- **admin list item** (changed): Un asistente de chat para sus clientes que responde con su propio menú y le pasa a su cocina lo que no puede responder, con una página de Conversaciones que muestra lo que los clientes piden y su menú todavía no cubre
- **Pro plan item** (changed): Asistente de comidas con IA, con una página de Conversaciones

### `src/i18n/demoGuide.ts` (`/es/demo-guide`)

- **“Qué incluye”** (changed): adds “el asistente de IA para clientes con su página de Conversaciones” to the list of what the guide covers.
- **brand try-it text** (changed): Empiece con "Pruébelo con su marca" para ver todo el sitio con su nombre, logotipo y colores. La demo abre en inglés; el selector EN | ES de arriba la muestra toda en español.
- **customer try-it list item** (new): Preguntar al asistente de IA sobre el menú con sus propias palabras, recibir comidas con sus precios y pasar una pregunta a la cocina (responde con el menú de muestra, dirige las preguntas sobre alergias a la cocina, y cada visitante puede hacer unas pocas preguntas al día)
- **owner try-it list item** (new): Leer la página de Conversaciones: lo que los clientes le preguntaron al asistente, lo que no pudo responder y las preguntas enviadas a la cocina
- **owner try-it list item** (changed): Activar o desactivar funciones en Configuración > Funciones, ver qué incluye cada plan (Básico, Avanzado, Pro) y ver a quién se le enviaría un correo si pausa los cobros de los planes semanales

### `src/i18n/meta.ts`

- **demo guide meta description** (changed): Guía PDF gratuita de la demo en vivo de pedidos para comidas preparadas: planes semanales, entregas, etiquetas, tarjetas de regalo, asistente de IA y Trend Finder.

## App, Spanish (Nov 1, 2026 update: AI meal assistant, Conversations, billing-change emails)

Strings in the meal-prep app itself (storefront, admin and the emails), written without a native speaker. Files are in the IslandFreshmeals repository.

### Chat widget (`src/components/assistant/AssistantWidget.tsx`, `assistantClient.ts`)

- **open button** (new): Pregunte a nuestro asistente de IA
- **title** (new): Asistente de comidas con IA
- **demo notice** (new): Demo: este es un asistente de IA real. Lo que escriba en este chat se envía a un servicio de IA para responderlo, y no se guarda allí; la conversación se queda en este navegador. Nada más de lo que ingrese en la demo sale de su navegador.
- **welcome** (new): ¡Hola! Soy un asistente de IA de esta cocina. Pregúnteme sobre el menú, los ingredientes, los alérgenos, la nutrición, la entrega o la recogida.
- **starter suggestions** (new): Comidas altas en proteína · Opciones vegetarianas · ¿Hasta cuándo puedo pedir?
- **placeholder** (new): Pregunte sobre el menú…
- **disclaimer** (new): La IA responde con el menú de esta cocina y puede equivocarse. Si tiene una alergia grave, comuníquese con la cocina antes de pedir.
- **buttons and labels** (new): Sugerencias · Conversación · Comidas mencionadas · Escribiendo · Mensaje · Enviar · Ver carrito (n) · Desde · n en el carrito · Agregar … al carrito · Agregar · Elegir opciones · Cargando el menú… · Algo salió mal. · Intentar de nuevo · Cerrar
- **hand-off form** (new): Hablar con la cocina · Pasar su pregunta a la cocina · Todo es opcional. Deje una forma de contactarlo si desea una respuesta. · Nombre · Correo electrónico · Teléfono · Enviar a la cocina · Cancelar · Enviada a la cocina
- **connection error** (new): No se pudo conectar con el asistente. Revise su conexión e inténtelo de nuevo.
- **assistant off** (new): El asistente no está disponible en este momento.
- **assistant failed** (new): El asistente no pudo responder en este momento. Inténtelo de nuevo en un momento.
- **after hand-off** (new): Gracias. Le pasé su pregunta a la cocina; le responderán pronto.

### What the assistant itself says (`supabase/functions/_shared/mealAssistant/safety.ts`)

- **don't know, offer the kitchen** (new): No tengo esa información; ¿quiere que le pase su pregunta a la cocina?
- **allergy note** (new): Si tiene una alergia grave, comuníquese directamente con la cocina antes de pedir.
- **allergens listed** (new): Alérgenos indicados para … · sin alérgenos indicados
- **off-topic** (new): Solo puedo ayudar con el menú, los pedidos y las entregas de esta cocina. ¿Qué le gustaría saber de las comidas?
- **medical questions** (new): Puedo compartir la información nutricional del menú, pero no puedo dar consejos médicos ni de dieta. Consulte a su médico o a un nutricionista.
- **daily limit** (new): El asistente ya respondió todas las preguntas que puede por hoy. Inténtelo de nuevo mañana o comuníquese con la cocina.
- **demo daily limit** (new): Se alcanzó el límite de la demo por hoy. Reserve una demostración guiada para ver más: [booking link coming soon]
- **keyword lists** (new, not shown to anyone): Spanish words the safety checks look for (allergies, health conditions, “seguro/segura”, promises of codes or refunds). Worth a glance for missing common words.

### Admin: Conversations (`src/pages/admin/AdminConversations.tsx`)

- **title and page description** (changed): Conversaciones · Lo que los clientes le preguntaron al asistente de comidas con IA en la tienda, lo que respondió, qué preguntas se pasaron a la cocina y si después hubo un pedido. Las conversaciones se eliminan N días después de su último mensaje.
- **demo note** (new): En esta demo el historial es inventado; una conversación que usted tenga con el asistente en esta pestaña aparece primero.
- **empty and loading** (new): Cargando conversaciones... · Las conversaciones no están conectadas. · Todavía no hay conversaciones.
- **stat boxes** (new): Conversaciones · Terminaron en un pedido de una comida recomendada · No pudo responder del todo · Enviadas a la cocina
- **filters** (new): Mostrar · Todas las conversaciones · Enviadas a la cocina · Todas · Pidió una recomendación · Pidió otra cosa · Agregó al carrito, sin pedido · Sin pedido · No pudo responder del todo
- **gap callout** (new): “…” se pide más de lo que el menú ofrece. Salió en N de M conversaciones (X %), y 1 comida del menú encaja / N comidas del menú encajan. El X % de esas conversaciones terminó en un pedido de una comida recomendada, frente al Y % de todas. Ofrecer más comidas de tipo “…” es una decisión de menú, no del chat.
- **tables** (new): Lo que la gente pidió · Elija uno para ver sus conversaciones. · Pidió · Conversaciones · Comidas que encajan · Con pedido · Lo que no pudo responder · Cada una es un hueco en el menú, en los detalles del menú o en lo que el asistente entiende. · Nada: todas las preguntas tuvieron respuesta.
- **reasons** (new): No entendió · Nada encajó · Solo en parte · No está en los datos del menú
- **a conversation** (new): Visitante · Esta pestaña · Español · Enviada a la cocina · Contacto · No dejó datos de contacto · Recomendó: · Transcripción · (agregada al carrito) · Pedido #N · Pedido #N, otras comidas · Resultado
- **delete and retention** (new): Eliminar · ¿Eliminar esta conversación? · Su transcripción y sus datos de contacto se eliminan definitivamente. · Conservación · Conservar las conversaciones durante · días · De 1 a 3650 días. Las conversaciones más antiguas se eliminan automáticamente cada día. · Guardar · Ahora las conversaciones se conservan N días. · Eliminar las más antiguas ahora · Se eliminó 1 conversación. / Se eliminaron N conversaciones. · Ingrese un número entero de días, de 1 a 3650.

### Admin: billing-change emails (`FeatureImpactDialog.tsx`, `SubscriptionNotices.tsx`)

- **impact dialog heading** (new): Correo a los suscriptores
- **who gets an email** (new): N cliente con plan semanal recibirá / N clientes con plan semanal recibirán un correo sobre este cambio. · Ningún cliente tiene un plan semanal en curso, así que no se envía ningún correo. · Revisando el correo…
- **email not set up** (new): El correo no está configurado, así que los suscriptores solo verán el aviso en su cuenta y no se envía ningún correo. Para enviarles correos, agregue los secretos de Resend (RESEND_API_KEY, NOTICE_EMAIL_FROM) a las funciones de la tienda.
- **after sending** (new): Se envió un correo a N suscriptor(es) sobre el cambio. · No se pudo enviar 1 correo / No se pudieron enviar N correos. Inténtelo de nuevo con «Enviar los correos pendientes». · No se enviaron los correos: … Se guardan: envíelos después con «Enviar los correos pendientes».
- **demo preview** (new): Lo que se enviaría · Demo: no se envió ningún correo. En su propia versión, N suscriptor(es) recibe(n) este correo por Resend, cada uno en su idioma. · Para · Inglés / Español · Asunto · Cerrar
- **pending emails** (new): N correo(s) sobre cambios en los planes semanales no se ha(n) enviado todavía. · Se pusieron en cola desde la línea de comandos, o un envío no terminó. · Enviar los correos pendientes · Enviando…
- **platform limits** (new, `AdminPlatform.tsx`): Mensajes al asistente por visitante al día · Mensajes al asistente al día, toda la tienda

### The emails customers get (`supabase/functions/_shared/subscriptionNoticeEmail.ts`)

- **greeting and closing** (new): Hola, Nombre: · Hola: (no name) · Vea su plan: (enlace) · — Nombre del negocio (“Su cocina” if none)
- **billing paused, subject** (new): [Negocio]: su plan semanal está en pausa
- **billing paused, body** (new): [Negocio] pausó los planes semanales por ahora, así que su plan está en pausa y no se le cobrará mientras siga en pausa. / No tiene que hacer nada. Le avisaremos por correo cuando se reanude.
- **resumed, subject** (new): [Negocio]: su plan semanal se reanudó
- **resumed, body** (new): Los planes semanales de [Negocio] están activos de nuevo, así que su plan se reanudó. Sus comidas y el cobro semanal vuelven a partir de la próxima fecha límite de pedidos, como antes. / Si usted había pausado su plan, sigue en pausa hasta la fecha que eligió.
- **new sign-ups stopped, subject** (new): [Negocio]: su plan semanal continúa como siempre
- **new sign-ups stopped, body** (new): [Negocio] pausó las nuevas suscripciones a los planes semanales. / Su plan no cambia: continúa y se cobra como siempre. No tiene que hacer nada.

### Spanish off by default (`Configuración > Funciones`)

- No new Spanish text: the existing feature “Español” (“Un selector inglés | español en la tienda y en la administración.”) now starts off in a new store. The explanations are in the demo guide entries above (section 8).

## Intentionally left in English on Spanish pages

- Brand, product, people and technology names (see the top of this file), and the "EN" link in the language toggle.
- Text quoted from One Source's own English website in the case study's screenshots and alt text (for example "Talk to Jess", "Book Online", "My status").
- The A2P SMS opt-in pages, `public/sms-opt-in.html` and `sms-opt-in-thanks.html`.

## Launching

When the review is done, set `SPANISH_PUBLIC = true` in `src/i18n/lang.ts`. That one flag:

- shows the EN | ES toggle to everyone (today it only shows on `/es` pages, or once someone has picked Spanish),
- removes `noindex` from `/es` pages,
- adds `hreflang` links (en, es, x-default) to every page and the Spanish URLs to the sitemap,
- turns on the small "¿Prefiere español?" prompt for visitors whose browser prefers Spanish.
