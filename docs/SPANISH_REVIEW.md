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

## Meal-prep feature pages, Spanish (Nov 1, 2026: /es/meal-prep-ordering/features and 11 pages)

Every Spanish string on the new feature hub and its eleven pages, written without a native speaker. Page names below are the English slugs under `/es/meal-prep-ordering/features/`. Screenshots on these pages come from the live demo in Spanish where a Spanish capture exists; the rest are English and say so in the caption. Feature names and descriptions in the "What is included" boxes come from the app's own registry (the second list below).

### Hub and shared labels (`src/i18n/mealPrepFeatures.ts`)

- **ui: hubEyebrow** (new): Sistema de pedidos para comidas preparadas
- **ui: hubTitle** (new): Funciones del sistema de pedidos para comidas preparadas
- **ui: hubIntro** (new): Todo lo que hace el sistema, agrupado por lo que hace por su negocio: ingresos recurrentes, pedidos más grandes, días de entrega más ordenados, menos tiempo de oficina y más clientes que vuelven. Cada página muestra las pantallas reales de la demo en vivo, para que vea cómo funciona antes de hablar con nosotros.
- **ui: hubCardCta** (new): Ver cómo funciona
- **ui: hubPlansTitle** (new): Qué plan incluye qué
- **ui: hubPlansBody** (new): El sistema viene en tres planes, y cada uno incluye todo lo del plan anterior. Cada página de funciones dice en qué plan está cada función, y en su propio sitio usted activa las funciones cuando esté listo para usarlas.
- **ui: hubPlansLink** (new): Ver los planes en la página principal
- **ui: hubGuideCta** (new): Leer la guía de la demo
- **ui: breadcrumbHome** (new): Inicio
- **ui: breadcrumbMealPrep** (new): Pedidos para comidas preparadas
- **ui: breadcrumbFeatures** (new): Funciones
- **ui: nav** (new): Ruta de navegación
- **ui: ctaDemo** (new): Probar la demo
- **ui: ctaAlex** (new): Hablar con Alex
- **ui: newTab** (new): (se abre en una pestaña nueva)
- **ui: problemTitle** (new): El problema
- **ui: howTitle** (new): Cómo funciona
- **ui: howIntro** (new): Pantallas reales de la demo en vivo, solo con datos de muestra.
- **ui: side.customer** (new): Lo que ve su cliente
- **ui: side.admin** (new): Lo que usted ve en la administración
- **ui: side.setup** (new): Lo que hacemos por usted
- **ui: englishShot** (new): (captura en inglés)
- **ui: sampleData** (new): Datos de muestra de la demo.
- **ui: includedTitle** (new): Qué incluye, y en qué plan
- **ui: includedIntro** (new): Cada plan incluye todo lo de los planes anteriores.
- **ui: planLabel** (new): Desde el plan Avanzado / En el plan Pro
- **ui: growTitle** (new): Cómo le ayuda a crecer
- **ui: demoTitle** (new): Pruébelo en la demo
- **ui: demoIntro** (new): Estos enlaces abren las pantallas exactas en la demo en vivo, en una pestaña nueva. Nada en la demo es real: no hay pagos, ni correos, ni clientes.
- **ui: demoSide.customer** (new): Lado del cliente
- **ui: demoSide.admin** (new): Lado de la administración
- **ui: demoAdminNote** (new): Los enlaces de la administración le piden presionar Iniciar sesión una vez. La demo llena el inicio de sesión de muestra por usted.
- **ui: faqTitle** (new): Preguntas que hacen los dueños
- **ui: relatedTitle** (new): Funciones relacionadas
- **ui: closingTitle** (new): ¿Quiere verlo con su menú?
- **ui: closingBody** (new): Lo configuramos por usted y pasamos a sus clientes actuales. Llámenos o hable con Alex, y le mostramos cómo funcionaría para su negocio. También puede leer primero la guía de la demo.
- **ui: callLabel** (new): Llamar al (904) 822-8929
- **ui: guideLink** (new): Leer la guía de la demo
- **ui: allFeatures** (new): Todas las funciones
- **ui: setupPlansTitle** (new): Los tres planes

### Titles and descriptions for search (`src/i18n/mealPrepFeaturesMeta.ts`)

- **hub: title** (new): Funciones de pedidos para comidas preparadas
- **hub: description** (new): Todas las funciones del sistema de pedidos para comidas preparadas: suscripciones, entregas, cocina, etiquetas, lealtad, informes y herramientas con IA.
- **subscriptions: title** (new): Software de suscripciones para comidas preparadas
- **subscriptions: description** (new): Planes semanales de comidas que los clientes saltan, pausan, cambian o cancelan solos, con cobro semanal en su propia cuenta de Stripe. Véalo en la demo en vivo.
- **bigger-orders: title** (new): Comidas a su gusto, tamaños y paquetes
- **bigger-orders: description** (new): Pedidos para comidas preparadas con platos a su gusto y macros en vivo, tamaños, extras, paquetes y un pedido mínimo, para que cada pedido valga la entrega.
- **delivery-and-pickup: title** (new): Rutas de entrega para comidas preparadas
- **delivery-and-pickup: description** (new): Zonas de entrega por código postal, días y fechas límite, hojas de ruta con paradas en orden, puntos de recogida y hojas de empaque imprimibles.
- **kitchen-operations: title** (new): Producción e inventario de cocina
- **kitchen-operations: description** (new): Plan de producción, listas de preparación y compras por proveedor, inventario, costos de ingredientes y varias cocinas, a partir de los pedidos de la semana.
- **labels: title** (new): Etiquetas con información nutricional
- **labels: description** (new): Imprima etiquetas con panel nutricional, ingredientes, alérgenos y fechas de empacado y de consumo, generadas con los datos de sus comidas para que usted las revise.
- **loyalty-and-referrals: title** (new): Lealtad y referidos para comidas preparadas
- **loyalty-and-referrals: description** (new): Puntos de recompensa, un programa de referidos que premia a ambas partes tras un primer pedido pagado, tarjetas de regalo y cupones para comidas preparadas.
- **reviews-and-surveys: title** (new): Reseñas y encuestas a clientes
- **reviews-and-surveys: description** (new): Reseñas de comidas que usted aprueba antes de mostrarlas, y una encuesta corta después de cada pedido con calificaciones y comentarios.
- **reports-and-insights: title** (new): Análisis, abandono e informes de impuestos
- **reports-and-insights: description** (new): Análisis con clientes que repiten y abandono, comidas más vendidas y tendencias de suscriptores, más exportaciones CSV e informe del impuesto sobre ventas.
- **ai-tools: title** (new): Herramientas con IA para comidas preparadas
- **ai-tools: description** (new): Un chat para clientes que responde con su propio menú, estilo de fotos de comida con revisión y su aprobación, y Trend Finder para ideas de comidas nuevas.
- **bilingual-and-app: title** (new): Sitio bilingüe y app para comidas preparadas
- **bilingual-and-app: description** (new): Un sitio de pedidos en inglés y español con cambio de un toque, una administración en los dos idiomas y una tienda que los clientes instalan en su teléfono.
- **getting-started: title** (new): Configuración de pedidos para comidas preparadas
- **getting-started: description** (new): Configuramos su sistema de pedidos, pasamos su menú y clientes, y lo ponemos en su dominio y su cuenta de Stripe. En inglés y español, noreste de Florida.

### The pages (`src/i18n/mealPrepFeaturesEs.ts`)

#### subscriptions

- **name** (new): Suscripciones e ingresos recurrentes
- **eyebrow** (new): Suscripciones e ingresos recurrentes
- **title (h1)** (new): Software de suscripciones para comidas preparadas: planes semanales que funcionan solos
- **intro** (new): Sus clientes se suscriben una vez y luego saltan una semana, cambian sus comidas, pausan o cancelan por su cuenta. Usted tiene una semana con la que puede planear, cobrada en su propia cuenta de Stripe.
- **card on the hub** (new): Planes semanales que los clientes manejan solos: saltar, pausar, cambiar o cancelar, con cobro cada semana.
- **problem 1** (new): Cada semana ando detrás de las mismas personas por mensajes: ¿entra esta semana?, ¿qué comidas quiere?, ¿ya pagó? Si se me pasa un solo mensaje, las cuentas de la semana se descuadran.
- **problem 2** (new): Quiero que la gente se suscriba una vez y que la semana funcione sola, y no quiero perder a un cliente solo porque va a estar de viaje una semana.
- **step 1: title** (new): Elegir un plan y empezar
- **step 1: text** (new): El cliente elige un plan semanal (un número de comidas a un precio por comida), escoge entrega o recogida y confirma. En su propio sitio, el cliente agrega una tarjeta con Stripe, en su propia cuenta de Stripe, y cada semana se cobra después de la fecha límite de pedidos.
- **step 1: image description** (new): La página de planes de la tienda de la demo con tres planes semanales y un precio por comida
- **step 1: caption** (new): La página de planes. En la demo no se cobra nada.
- **step 2: title** (new): Saltar, pausar, cambiar o cancelar antes de la fecha límite
- **step 2: text** (new): En la página de su cuenta, el cliente ve su plan, su próxima entrega y las semanas que vienen, con la fecha límite para hacer cambios.
- **step 2: point 1** (new): Saltar cualquier semana: sin entrega y sin cobro.
- **step 2: point 2** (new): Elegir otras comidas para una semana, o dejar que la llenen sus favoritas guardadas o las recomendaciones de su chef.
- **step 2: point 3** (new): Pausar todo el plan hasta una fecha, cambiar a más o menos comidas por semana, o cancelar.
- **step 2: point 4** (new): Cuando pasa la fecha límite de una semana, esa semana se bloquea y su cocina planea con ella.
- **step 2: image description** (new): La página Mi plan de un cliente con las próximas semanas y las opciones de saltar, cambiar o pausar
- **step 2: caption** (new): Mi plan, como lo ve el cliente.
- **step 3: title** (new): Ver a cada suscriptor e intervenir cuando haga falta
- **step 3: text** (new): La página Suscripciones muestra a cada suscriptor con lo que hace esta semana: recibe entrega, salta o está en pausa. Puede filtrar por activos, en pausa, saltando esta semana, cancelados o con pago fallido, y buscar por nombre.
- **step 3: point 1** (new): Abra a un cliente para ver exactamente lo que él ve, y salte una semana, elija comidas, pause, cambie las comidas por semana o cancele por él. Cada cambio queda en el Registro de auditoría.
- **step 3: point 2** (new): Elija qué recibe un cliente que no escoge sus comidas: sus favoritas o las recomendaciones de su chef.
- **step 3: point 3** (new): En su propio sitio, un pago semanal rechazado se marca aquí y en Pedidos, y el cliente recibe un correo con un enlace para actualizar su tarjeta.
- **step 3: point 4** (new): Si alguna vez pausa los cobros o detiene las nuevas suscripciones, los clientes con un plan semanal reciben un correo en inglés o en español, además del aviso en su cuenta.
- **step 3: image description** (new): La página Suscripciones de la administración con el conteo de planes activos, en pausa, saltando y cancelados
- **step 3: caption** (new): Suscripciones en la administración.
- **growth 1: title** (new): Ingresos recurrentes con los que puede planear
- **growth 1: text** (new): A los suscriptores se les cobra cada semana después de la fecha límite de pedidos, así que usted sabe lo que viene antes de comprar y cocinar.
- **growth 2: title** (new): Una mejor opción que cancelar
- **growth 2: text** (new): Un cliente que está fuera una semana puede saltarla en un par de toques en lugar de cancelar por mensaje, y sigue en su plan cuando regresa.
- **growth 3: title** (new): Menos tiempo de administración
- **growth 3: text** (new): El plan hace el pedido de cada semana por el cliente. Usted deja de juntar pedidos por mensaje y parte de una lista que ya está lista.
- **demo link 1** (new): La página de planes
- **demo link 2** (new): La cuenta y el plan de un cliente
- **demo link 3** (new): Suscriptores
- **demo link 4** (new): Planes que ofrece
- **FAQ 1: question** (new): ¿Pueden los clientes saltar una semana o pausar por su cuenta?
- **FAQ 1: answer** (new): Sí. Antes de la fecha límite de pedidos de una semana pueden saltarla, cambiar sus comidas, pausar el plan hasta una fecha, cambiar cuántas comidas reciben o cancelar. Después de la fecha límite la semana se bloquea para que su cocina pueda planear.
- **FAQ 2: question** (new): ¿A dónde va el dinero? ¿Se quedan con una parte de cada pedido?
- **FAQ 2: answer** (new): Los pagos van a su propia cuenta de Stripe. No cobramos una comisión por pedido. Se aplican las comisiones de procesamiento de Stripe, como en cualquier pago con tarjeta.
- **FAQ 3: question** (new): ¿Qué pasa cuando falla un pago semanal?
- **FAQ 3: answer** (new): En su propio sitio, el pago fallido se marca en la página Suscripciones y en Pedidos, y el cliente recibe un correo con un enlace para actualizar su tarjeta.
- **FAQ 4: question** (new): ¿Puedo pausar los cobros de todos, por ejemplo si cierro una semana?
- **FAQ 4: answer** (new): Sí. En Configuración > Funciones puede pausar todos los cobros de los planes semanales o solo detener las nuevas suscripciones. La pantalla le muestra primero a quién afecta, los clientes reciben un correo en su idioma, y al activar de nuevo los planes semanales se reanudan exactamente esos planes.

#### bigger-orders

- **name** (new): Pedidos más grandes
- **eyebrow** (new): Pedidos más grandes
- **title (h1)** (new): Comidas a su gusto, tamaños, extras y paquetes
- **intro** (new): Deje que sus clientes armen un plato con los macros a la vista, elijan un tamaño, agreguen extras y compren paquetes, y ponga un mínimo para que cada pedido valga el viaje.
- **card on the hub** (new): Comidas a su gusto con macros, tamaños y extras, paquetes de comidas y un pedido mínimo.
- **problem 1** (new): Mis clientes piden las mismas dos o tres comidas, y nadie prueba los extras porque tienen que escribirme para preguntar. Mientras tanto, un pedido pequeño que requiere un viaje de entrega apenas paga la gasolina.
- **problem 2** (new): Quiero que la gente arme exactamente lo que quiere, vea el precio y los macros mientras elige, y gaste un poco más cada vez.
- **step 1: title** (new): Armar su propia comida, con los macros sumándose mientras elige
- **step 1: text** (new): El cliente escoge una proteína (porción normal o doble), un carbohidrato, una o dos verduras, una salsa y complementos. Mientras elige, se suman el precio, las calorías, la proteína, los carbohidratos y la grasa, junto con los alérgenos de lo que escogió. Si en el menú filtró un alérgeno, las opciones que lo contienen también se ocultan aquí.
- **step 1: image description** (new): La página Arme su tazón con opciones de proteína, tamaños de porción y un precio que se va sumando
- **step 1: caption** (new): Arme su tazón en la tienda de la demo.
- **step 2: title** (new): Tamaños y extras
- **step 2: text** (new): En una comida que viene en tamaños, el cliente elige un tamaño y marca hasta dos extras. El precio y la nutrición cambian antes de que pase al carrito. Un extra que trae un alérgeno que la comida no tiene lo indica ahí mismo, de nuevo en el carrito, al pagar y en la etiqueta.
- **step 2: image description** (new): La página de una comida con selector de tamaño y extras con costo
- **step 2: caption** (new): Una comida con tamaños y extras.
- **step 3: title** (new): Paquetes de comidas a su propio precio
- **step 3: text** (new): Un paquete es un conjunto con una lista fija de comidas, como un paquete variado de diez comidas. Su página muestra lo que trae, los alérgenos de cada comida y la nutrición por comida promediada en todo el paquete.
- **step 3: image description** (new): La página de un paquete variado de diez comidas con la lista de lo que incluye
- **step 3: caption** (new): Un paquete de comidas y lo que incluye.
- **step 4: title** (new): Un pedido mínimo, para que cada pedido valga la entrega
- **step 4: text** (new): Ponga un mínimo para toda la tienda, uno más alto para una zona de entrega (se aplica el más alto), o venda una comida de pocas en pocas. El carrito dice qué falta y no deja avanzar al pago hasta que se cumple el mínimo.
- **step 4: image description** (new): El carrito mostrando el mensaje del pedido mínimo
- **step 4: caption** (new): El carrito explica qué falta.
- **step 5: title** (new): Usted pone las reglas, y la cocina recibe las combinaciones exactas
- **step 5: text** (new): En la página A su gusto define cuántas opciones de cada tipo elige el cliente, y agrega los componentes con sus tamaños, el precio que suma cada uno y su receta. Las calorías, los macros y los alérgenos salen de la receta y de su lista de Ingredientes. La cocina ve cada combinación en el Plan de producción, las etiquetas y las hojas de empaque.
- **step 5: image description** (new): La página A su gusto de la administración con las opciones y reglas
- **step 5: caption** (new): Las reglas de A su gusto en la administración.
- **growth 1: title** (new): Pedidos de mayor valor
- **growth 1: text** (new): Los tamaños, los extras y los paquetes permiten que un cliente gaste un poco más cada vez, en comidas que ya le gustan.
- **growth 2: title** (new): Menos pedidos que cuestan más de entregar de lo que dejan
- **growth 2: text** (new): Un pedido mínimo, por tienda o por zona de entrega, evita que los pedidos muy pequeños se coman su margen.
- **growth 3: title** (new): Menos idas y venidas
- **growth 3: text** (new): Los clientes personalizan solos y ven el precio y la nutrición al instante, y usted recibe una lista exacta en lugar de una cadena de mensajes.
- **demo link 1** (new): Arme su tazón
- **demo link 2** (new): Paquetes de comidas
- **demo link 3** (new): Reglas de A su gusto
- **demo link 4** (new): Lo pedido, por tamaño y extra
- **FAQ 1: question** (new): ¿Mi cocina ve exactamente lo que armó cada cliente?
- **FAQ 1: answer** (new): Sí. Cada combinación, tamaño y extra aparece en el Plan de producción, las etiquetas y las hojas de empaque, y la página Variaciones cuenta cuántos de cada tamaño, extra y componente se pidieron para una semana de entrega.
- **FAQ 2: question** (new): ¿Se actualizan los alérgenos y la nutrición cuando un cliente arma una comida?
- **FAQ 2: answer** (new): Sí. Los totales y los alérgenos salen de la receta y de su lista de Ingredientes, así que revíselos antes de ofrecer un componente. Se actualizan mientras el cliente elige, y un extra que trae un alérgeno nuevo lo indica.
- **FAQ 3: question** (new): ¿Los planes semanales pueden usar tamaños y extras?
- **FAQ 3: answer** (new): No. Los planes semanales toman el tamaño estándar de cada comida, sin extras. Los tamaños y los extras son para pedidos individuales.
- **FAQ 4: question** (new): ¿El pedido mínimo también se aplica a la recogida?
- **FAQ 4: answer** (new): El mínimo de la tienda se aplica a todos los pedidos, incluida la recogida. Una zona de entrega puede tener un mínimo más alto, y entonces se aplica el más alto. Los planes semanales no se ven afectados.

#### delivery-and-pickup

- **name** (new): Entrega y recogida
- **eyebrow** (new): Entrega y recogida
- **title (h1)** (new): Planificación de rutas de entrega, zonas, recogida y hojas de empaque
- **intro** (new): Zonas por código postal con su propio día y tarifa, hojas de ruta con las paradas en un orden lógico, puntos de recogida y una hoja de empaque para cada bolsa.
- **card on the hub** (new): Zonas por código postal, días y fechas límite de entrega, puntos de recogida, hojas de ruta y hojas de empaque.
- **problem 1** (new): El día de entrega es un caos. Ordeno direcciones en una hoja de cálculo, les mando a los repartidores el orden de las paradas por mensaje y escribo nombres en las bolsas, y gente de fuera de mi zona sigue pidiendo y luego quiere un reembolso.
- **problem 2** (new): Necesito que el sistema sepa a dónde entrego, cuándo y cuánto cuesta, y que le dé una lista a mi repartidor.
- **step 1: title** (new): Los clientes saben de inmediato si usted les entrega
- **step 1: text** (new): Al pagar, el código postal del cliente encuentra su zona de entrega: su tarifa, su día de entrega y su pedido mínimo. Si queda fuera de todas las zonas, se le avisa y se le ofrecen sus puntos de recogida.
- **step 1: image description** (new): La pantalla de pago donde a un código postal fuera de las zonas se le ofrece recogida
- **step 1: caption** (new): A un código postal fuera de las zonas se le ofrece recogida.
- **step 2: title** (new): Fechas límite, días de entrega y zonas
- **step 2: text** (new): En la página Entrega define su fecha límite de pedidos, sus días de entrega y el monto para entrega gratis. Cada zona es una lista de códigos postales con su propio día de entrega, tarifa, pedido mínimo y monto de entrega gratis, y el pago las usa automáticamente.
- **step 2: image description** (new): La página Entrega de la administración con la fecha límite, los días de entrega y las zonas
- **step 2: caption** (new): Configuración de entrega y zonas.
- **step 3: title** (new): Hojas de ruta para el día de entrega
- **step 3: text** (new): Elija un día de entrega y sus pedidos se agrupan por zona, con las paradas de cada ruta en orden desde su cocina (la parada más cercana primero), además del nombre, teléfono, dirección, notas de entrega y número de comidas.
- **step 3: point 1** (new): Imprima las hojas de ruta para su repartidor.
- **step 3: point 2** (new): Descargue un CSV para llevarlo a una aplicación de planificación de rutas si quiere optimizar más.
- **step 3: point 3** (new): Abra una ruta en Google Maps (las rutas largas se dividen en partes, como lo permite Google).
- **step 3: image description** (new): La página Rutas de la administración con las paradas de cada ruta en orden
- **step 3: caption** (new): Las rutas de un día de entrega.
- **step 4: title** (new): Puntos de recogida
- **step 4: text** (new): Anote los lugares donde los clientes pueden recoger sus comidas, como un gimnasio o un estudio. Si desactiva uno, desaparece del pago, y los pedidos anteriores conservan su nombre y dirección.
- **step 4: image description** (new): La página Puntos de recogida de la administración
- **step 4: caption** (new): Puntos de recogida.
- **step 5: title** (new): Una hoja de empaque para cada pedido
- **step 5: text** (new): Una hoja por pedido para quien empaca la bolsa y para el repartidor: el cliente y su teléfono, la dirección de entrega o el punto de recogida, el día, la ruta y el número de parada (en el mismo orden que Rutas), las notas de entrega, y cada comida con su tamaño, opciones y extras. Imprima dos hojas por página o una.
- **step 5: image description** (new): La página Hojas de empaque de la administración con una hoja imprimible
- **step 5: caption** (new): Una hoja de empaque lista para imprimir.
- **growth 1: title** (new): Menos tiempo de administración el día de entrega
- **growth 1: text** (new): Las rutas y las hojas de empaque salen directo de los pedidos de la semana, así que no tiene que armar el día a mano.
- **growth 2: title** (new): Menos errores en la puerta
- **growth 2: text** (new): Las hojas indican la ruta y el número de parada en el mismo orden que la hoja de ruta, así que la bolsa, el repartidor y la lista coinciden.
- **growth 3: title** (new): Más clientes atendidos
- **growth 3: text** (new): A quien está fuera de sus zonas no se le rechaza: se le ofrece recogida. Y cada zona puede tener su propio día, tarifa y mínimo, de modo que cada área que atiende tenga sentido para usted.
- **demo link 1** (new): Configuración de entrega y zonas
- **demo link 2** (new): Rutas
- **demo link 3** (new): Puntos de recogida
- **demo link 4** (new): Hojas de empaque
- **FAQ 1: question** (new): ¿Puede cada zona de entrega tener su propio día, tarifa y mínimo?
- **FAQ 1: answer** (new): Sí. Cada zona es una lista de códigos postales con su propio día de entrega, tarifa, pedido mínimo y monto de entrega gratis. Si la tienda también tiene un pedido mínimo, se aplica el más alto.
- **FAQ 2: question** (new): ¿Qué pasa si un cliente está fuera de mis zonas?
- **FAQ 2: answer** (new): Se le avisa que no entregamos ahí y se le ofrecen sus puntos de recogida, para que aún pueda pedir.
- **FAQ 3: question** (new): ¿Optimiza mis rutas?
- **FAQ 3: answer** (new): Pone las paradas de cada ruta en orden a partir de su cocina, la más cercana primero. Para algo más, descargue un CSV para una aplicación de planificación de rutas o abra la ruta en Google Maps.
- **FAQ 4: question** (new): ¿Las rutas necesitan que las zonas de entrega estén activadas?
- **FAQ 4: answer** (new): Sí. Las rutas de entrega dependen de las zonas de entrega, así que al desactivar las zonas también se desactivan las rutas. Desactivar una función nunca borra nada, y al activarla de nuevo todo vuelve.

#### kitchen-operations

- **name** (new): Operaciones de cocina
- **eyebrow** (new): Operaciones de cocina
- **title (h1)** (new): Software de cocina para comidas preparadas: plan de producción, listas de compras e inventario
- **intro** (new): Los pedidos de la semana se convierten en una lista de preparación y una lista de compras por proveedor. Lleve el control de los costos de ingredientes y las existencias, y maneje más de una cocina cuando crezca.
- **card on the hub** (new): Plan de producción, listas de preparación y compras, inventario, costos de ingredientes y proveedores, y más de una cocina.
- **problem 1** (new): Armo la lista de preparación a mano a partir de los pedidos, y luego adivino el pedido de compras. O compro de más y tiro comida, o me quedo corto a mitad de semana.
- **problem 2** (new): Y no sé bien cuánto me cuesta cada comida, porque los precios están en una libreta y en unos cuantos recibos.
- **step 1: title** (new): El plan de producción: qué cocinar
- **step 1: text** (new): Elija una semana de entrega y obtenga la lista de preparación: cuántas de cada comida y porción hay que hacer, a partir de los pedidos y los planes semanales de esa semana. Las semanas saltadas y en pausa no se incluyen. Desde aquí imprime las etiquetas y las hojas de empaque de la semana.
- **step 1: image description** (new): El Plan de producción de la administración con la lista de preparación de una semana de entrega
- **step 1: caption** (new): El Plan de producción de una semana de entrega.
- **step 2: title** (new): Listas de compras por proveedor
- **step 2: text** (new): Más abajo: todo lo que hay que comprar, redondeado a como lo compra, con una lista por proveedor y su costo estimado. Con las existencias registradas, cada fila muestra lo que necesita la semana, lo que tiene a mano y lo que debe comprar. Imprímala o descárguela como hoja de cálculo.
- **step 2: image description** (new): La lista de compras por proveedor con las columnas de necesario, a mano y por comprar
- **step 2: caption** (new): La lista de compras, con lo que ya tiene a mano.
- **step 3: title** (new): Costos de ingredientes y proveedores
- **step 3: text** (new): La página Ingredientes reúne todo lo que compra, cómo lo compra (por libra, por caja), cuánto cuesta, de qué proveedor viene y cuánto tiene a mano. De esta lista se calculan las recetas y los costos, y puede agregar un segundo proveedor y precio para comparar.
- **step 3: image description** (new): La lista de Ingredientes de la administración con costo, proveedor y cantidad a mano
- **step 3: caption** (new): Ingredientes, proveedores y existencias.
- **step 4: title** (new): Un inventario que sigue lo que usted cocina
- **step 4: text** (new): Todo lo que esté en su nivel de alerta o por debajo aparece arriba, marcado como Bajo. Las existencias bajan cuando usted marca una semana como cocinada, nunca cuando se hace un pedido, así que un pedido cancelado antes simplemente sale del plan. Ajuste las existencias con un motivo (una entrega recibida, una corrección de conteo, merma o descomposición) y cada ajuste queda en el historial de existencias.
- **step 4: image description** (new): La página Ingredientes con alertas de existencias bajas y cantidades a mano
- **step 4: caption** (new): Las alertas de existencias bajas, arriba.
- **step 5: title** (new): Más de una cocina
- **step 5: text** (new): Cada cocina tiene su propia dirección (de donde salen sus rutas), fecha límite de pedidos y días de entrega, zonas de entrega, puntos de recogida y las comidas que ofrece. A los clientes se les asigna una cocina según su dirección o su punto de recogida, y cada cocina lleva sus propias existencias. Con una sola cocina no ve nada de esto. La pantalla es del negocio de muestra Establecido de la demo, que tiene dos.
- **step 5: image description** (new): La página Sucursales de la administración con dos cocinas y sus zonas
- **step 5: caption** (new): Dos cocinas, cada una con su propio horario y menú.
- **growth 1: title** (new): Menos desperdicio
- **growth 1: text** (new): Usted compra para los pedidos reales de la semana, tomando en cuenta lo que ya tiene en los estantes, en lugar de adivinar.
- **growth 2: title** (new): Saber cuánto le cuesta una comida
- **growth 2: text** (new): Los costos de ingredientes y los proveedores respaldan cada receta, así que puede ver el costo de alimentos de una comida antes de fijar su precio.
- **growth 3: title** (new): Menos tiempo de administración
- **growth 3: text** (new): La lista de preparación, la lista de compras y las etiquetas salen de los mismos pedidos, así que deja de volver a escribir la semana.
- **growth 4: title** (new): Espacio para crecer
- **growth 4: text** (new): Cuando tenga sentido una segunda cocina, tiene su propio horario, zonas y existencias, y sus informes pueden mostrar una cocina o todas.
- **demo link 1** (new): Plan de producción
- **demo link 2** (new): Ingredientes, costos y existencias
- **demo link 3** (new): Sucursales
- **FAQ 1: question** (new): ¿El plan deja fuera los planes semanales saltados y en pausa?
- **FAQ 1: answer** (new): Sí. La lista de preparación se arma con los pedidos de esa semana y los planes semanales que realmente se entregan. Las semanas saltadas y en pausa no se incluyen.
- **FAQ 2: question** (new): ¿Cuándo bajan las existencias?
- **FAQ 2: answer** (new): Cuando usted marca una semana como cocinada. Entonces las cantidades exactas de la lista de compras de esa semana se descuentan de las existencias, una sola vez, y Deshacer cocinada las devuelve. No se descuenta nada cuando se hace un pedido.
- **FAQ 3: question** (new): ¿Puedo enviarle a cada proveedor su propia lista?
- **FAQ 3: answer** (new): La lista de compras se divide por proveedor, con un costo estimado para cada uno. Puede imprimirla o descargarla como hoja de cálculo.
- **FAQ 4: question** (new): ¿Necesito más de una cocina para usar esto?
- **FAQ 4: answer** (new): No. El plan de producción, los costos y el inventario funcionan con una sola cocina. Más de una cocina es una función aparte, del plan Pro, para cuando crezca.

#### labels

- **name** (new): Etiquetas y fechas de consumo
- **eyebrow** (new): Etiquetas y fechas de consumo
- **title (h1)** (new): Etiquetas para comidas preparadas con información nutricional y fecha de consumo
- **intro** (new): Imprima una etiqueta para cada comida con los datos de su propio menú: panel nutricional, ingredientes, alérgenos y fechas de empacado y de consumo. Usted las revisa antes de usarlas.
- **card on the hub** (new): Etiquetas imprimibles con información nutricional, ingredientes, alérgenos y fecha de consumo, a partir de los datos de su propio menú.
- **problem 1** (new): Las etiquetas me comen el domingo. Vuelvo a escribir los ingredientes y las calorías de cada comida, y nunca estoy seguro de que la fecha de consumo esté bien cuando ya está en el envase.
- **problem 2** (new): Quiero etiquetas que salgan de las mismas recetas de mi menú, en el tamaño que acepta mi impresora.
- **step 1: title** (new): Imprima las etiquetas de la semana en el tamaño que usa
- **step 1: text** (new): Desde el Plan de producción, imprima una etiqueta para cada comida que se cocina esa semana, o para una sola comida, o una por pedido con el nombre del cliente. Elija hojas de 2 por 4 pulgadas o de 3 y un tercio por 4 pulgadas (Avery 5163/8163 y 5164/8164), o etiquetas térmicas de 4 por 6 pulgadas, y vea primero la vista previa.
- **step 1: image description** (new): La página Etiquetas de la administración con opciones de tamaño, una fecha de producción y una vista previa
- **step 1: caption** (new): Elija un tamaño, vea la vista previa e imprima.
- **step 2: title** (new): Qué lleva cada etiqueta
- **step 2: text** (new): Su nombre y logotipo, la comida y la porción, un panel nutricional, los ingredientes, una línea Contiene con los alérgenos principales (y líneas Posible para las salsas que compra ya hechas), las fechas de empacado y de consumo, y la forma de guardarla y recalentarla.
- **step 2: image description** (new): Una hoja de etiquetas impresa con información nutricional, ingredientes, alérgenos y fechas de empacado y de consumo
- **step 2: caption** (new): Etiquetas de muestra de la demo (en inglés).
- **step 3: title** (new): Las fechas salen de la vida útil que usted define
- **step 3: text** (new): Usted define la vida útil de cada comida. Las etiquetas imprimen el día de producción como Empacado, y Consumir antes del se cuenta desde ahí, con el día de producción como el día uno. Su cocina define ambas, y la etiqueta indica la fecha que usted da.
- **step 4: title** (new): Las etiquetas salen de sus datos, para que usted las revise
- **step 4: text** (new): Las etiquetas se generan con los datos de cada comida: su nutrición, ingredientes y alérgenos. Revíselas antes de usarlas, y compárelas con sus recetas y con las etiquetas de lo que compra ya hecho. Usted es responsable de lo que dicen sus etiquetas.
- **growth 1: title** (new): Menos tiempo de administración
- **growth 1: text** (new): No se vuelve a escribir nada: la etiqueta sale de los mismos datos de la comida que su menú y su plan de producción.
- **growth 2: title** (new): Una sola fuente de información
- **growth 2: text** (new): Cuando cambia una receta o un ingrediente, la nutrición, los alérgenos y la etiqueta cambian con ella, en lugar de tres documentos que se van desfasando.
- **growth 3: title** (new): Los clientes ven lo que comen
- **growth 3: text** (new): La misma nutrición, ingredientes y alérgenos están en la página de cada comida, así que lo que dice el envase coincide con lo que pidieron.
- **demo link 1** (new): Etiquetas
- **demo link 2** (new): Plan de producción (de donde se imprimen las etiquetas)
- **FAQ 1: question** (new): ¿Qué tamaños de etiqueta puedo imprimir?
- **FAQ 1: answer** (new): Hojas Avery de 2 por 4 pulgadas (10 por hoja) o de 3 y un tercio por 4 pulgadas (6 por hoja), o etiquetas térmicas de 4 por 6 pulgadas, una por etiqueta. Primero ve una vista previa.
- **FAQ 2: question** (new): ¿De dónde salen los números de nutrición y los alérgenos de una etiqueta?
- **FAQ 2: answer** (new): De los datos de sus propias comidas: la receta, su lista de Ingredientes y los alérgenos que usted registró. El sistema genera la etiqueta con eso, y usted la revisa antes de usarla.
- **FAQ 3: question** (new): ¿Esto hace que mis etiquetas estén correctas por mí?
- **FAQ 3: answer** (new): No. Las etiquetas se arman con sus datos para que usted las revise; no son asesoría legal ni regulatoria. Compárelas con sus recetas y con las etiquetas de lo que compra ya hecho, y consulte a quien lo asesore sobre las reglas de etiquetado si tiene dudas.
- **FAQ 4: question** (new): ¿Puedo imprimir una etiqueta por pedido con el nombre del cliente?
- **FAQ 4: answer** (new): Sí. Puede imprimir una etiqueta para cada comida que se cocina, las etiquetas de una sola comida, o una por pedido con el nombre del cliente.

#### loyalty-and-referrals

- **name** (new): Lealtad y recomendaciones
- **eyebrow** (new): Lealtad y recomendaciones
- **title (h1)** (new): Puntos de lealtad, referidos, tarjetas de regalo y cupones para comidas preparadas
- **intro** (new): Premie a los clientes que siguen regresando, deje que sus mejores clientes traigan amigos, venda tarjetas de regalo y maneje códigos de descuento sin una hoja de cálculo.
- **card on the hub** (new): Puntos de recompensa, referidos, tarjetas de regalo y cupones que hacen volver a los clientes y traen amigos.
- **problem 1** (new): Mi mejor publicidad es el boca a boca, pero no puedo darle seguimiento. Reparto descuentos por mensaje y no sé quién mandó a quién ni cuánto me costó.
- **problem 2** (new): También me encantaría vender tarjetas de regalo sin tener que inventar un código a mano cada vez.
- **step 1: title** (new): Puntos de recompensa que los clientes pueden gastar
- **step 1: text** (new): Los clientes ganan puntos con sus pedidos y los gastan después. Las páginas de las comidas muestran los puntos que gana un pedido, y los clientes ven su saldo en la página de su cuenta.
- **step 2: title** (new): Referidos, con una recompensa para ambas partes
- **step 2: text** (new): Cada cliente tiene un código y un enlace para compartir. Un amigo que se registra con él y paga un primer pedido gana una recompensa para los dos: un cupón, crédito en la tienda o puntos, como usted elija. Si ese pedido se reembolsa por completo, se retiran las dos recompensas.
- **step 2: point 1** (new): Elija qué recibe quien refiere y qué recibe el amigo, cuánto duran los cupones de recompensa y los límites por cliente al mes y en total.
- **step 2: point 2** (new): Un referido se bloquea cuando un cliente prueba su propio código, o cuando el amigo usa el correo, la tarjeta o la dirección de entrega de quien lo refiere, y se muestra el motivo.
- **step 2: image description** (new): La página Referidos de la administración con referidos premiados, pendientes y bloqueados
- **step 2: caption** (new): Los referidos y en qué punto está cada uno. Historial de muestra.
- **step 3: title** (new): Tarjetas de regalo por cualquier monto
- **step 3: text** (new): Los clientes compran una tarjeta de regalo para otra persona, con un mensaje y una fecha de envío. Se canjea al pagar, sola o con un cupón (usted decide), y lo que no se gasta se queda en la tarjeta. En su propio sitio, quien compra paga con tarjeta mediante Stripe y quien la recibe obtiene el código por correo en la fecha de envío.
- **step 3: image description** (new): La página de tarjetas de regalo de la tienda con montos, destinatario y fecha de envío
- **step 3: caption** (new): La página de tarjetas de regalo.
- **step 4: title** (new): Cada tarjeta de regalo y su historial
- **step 4: text** (new): Vea para quién es cada tarjeta, su saldo y su historial. Emita una tarjeta a mano (una cortesía, un premio), cambie un saldo o desactive una tarjeta perdida, cada cosa con una nota, todo en el Registro de auditoría.
- **step 4: image description** (new): La página Tarjetas de regalo de la administración con saldos e historial
- **step 4: caption** (new): Las tarjetas de regalo en la administración.
- **step 5: title** (new): Códigos de cupón con límites
- **step 5: text** (new): Un porcentaje o un monto de descuento, con un límite de usos y una fecha de vencimiento. Los clientes escriben el código al pagar.
- **step 5: image description** (new): La lista de Cupones de la administración
- **step 5: caption** (new): Cupones.
- **growth 1: title** (new): Más clientes que repiten
- **growth 1: text** (new): Los puntos le dan a la gente una razón para volver la semana siguiente, y un saldo que no quieren dejar sin usar.
- **growth 2: title** (new): Clientes nuevos de personas a quienes ya les gusta su comida
- **growth 2: text** (new): Los referidos premian a ambas partes, y solo después de que el amigo paga un primer pedido, así que no regala recompensas por registros que nunca piden.
- **growth 3: title** (new): Dinero por adelantado, y caras nuevas
- **growth 3: text** (new): Las tarjetas de regalo traen efectivo antes de cocinar las comidas y ponen su comida frente a alguien que aún no la ha probado.
- **growth 4: title** (new): Menos tiempo de administración
- **growth 4: text** (new): Los códigos, los saldos y las recompensas se llevan por usted, con cada cambio registrado.
- **demo link 1** (new): Los puntos y el código de referido de un cliente
- **demo link 2** (new): La página de tarjetas de regalo
- **demo link 3** (new): Referidos
- **demo link 4** (new): Tarjetas de regalo
- **demo link 5** (new): Cupones
- **FAQ 1: question** (new): ¿Cuándo se da la recompensa de un referido?
- **FAQ 1: answer** (new): Cuando se paga el primer pedido del amigo. Si ese pedido se reembolsa por completo después, se retiran las dos recompensas. En la demo los referidos son historial de muestra y no se paga nada.
- **FAQ 2: question** (new): ¿Pueden los clientes hacer trampa con el programa de referidos?
- **FAQ 2: answer** (new): El sistema bloquea las formas habituales: usar su propio código, o un amigo que comparte el correo, la tarjeta o la dirección de entrega de quien lo refiere. Un referido bloqueado muestra el motivo. Para la comprobación de la misma tarjeta, solo guarda la huella digital de Stripe de la tarjeta, nunca los datos de la tarjeta.
- **FAQ 3: question** (new): ¿Se puede usar una tarjeta de regalo junto con un cupón?
- **FAQ 3: answer** (new): Usted decide. Hay una opción para permitir o no el uso de una tarjeta de regalo junto con un cupón.
- **FAQ 4: question** (new): ¿Puedo elegir cuál es la recompensa?
- **FAQ 4: answer** (new): Sí. En los referidos, quien refiere y el amigo pueden recibir cada uno un cupón de un solo uso (un porcentaje o un monto de descuento), crédito en la tienda o puntos, y usted define cuánto duran los cupones de recompensa y los límites por cliente.

#### reviews-and-surveys

- **name** (new): Reseñas y opiniones de clientes
- **eyebrow** (new): Reseñas y opiniones de clientes
- **title (h1)** (new): Reseñas de comidas y encuestas a clientes para negocios de comidas preparadas
- **intro** (new): Los clientes califican las comidas, usted aprueba lo que se muestra en su menú, y una encuesta corta después de cada entrega le dice cómo salió realmente la semana.
- **card on the hub** (new): Reseñas de comidas que usted aprueba, y una encuesta de cuatro preguntas después de cada pedido.
- **problem 1** (new): Recibo buenos comentarios por mensaje y luego se pierden. Y la única mala semana me entero cuando alguien cancela.
- **problem 2** (new): Quisiera reseñas en mi menú sin que desconocidos publiquen lo que quieran, y una encuesta rápida después de cada entrega.
- **step 1: title** (new): Las reseñas aparecen solo después de que usted las aprueba
- **step 1: text** (new): Los clientes califican y reseñan una comida. Una reseña aparece en la página de esa comida solo después de que usted la aprueba, y cada decisión queda en el Registro de auditoría.
- **step 1: image description** (new): La página Reseñas de la administración con una reseña pendiente por aprobar o rechazar
- **step 1: caption** (new): Una reseña pendiente de aprobación.
- **step 2: title** (new): Una encuesta de cuatro preguntas después de cada pedido
- **step 2: text** (new): Cuando un pedido se entrega o se recoge, su cliente puede responder cuatro preguntas rápidas: en general, la comida, la entrega o la recogida, y si lo recomendaría, con un comentario opcional. Una respuesta por pedido, y solo usted la ve.
- **step 2: image description** (new): La página de la encuesta para el cliente con cuatro preguntas de calificación
- **step 2: caption** (new): La encuesta, como la ve el cliente.
- **step 3: title** (new): Las respuestas, por semana
- **step 3: text** (new): Elija sus fechas y vea cuántos respondieron y la tasa de respuesta, las calificaciones promedio en general, de la comida y de la entrega o la recogida, el porcentaje que lo recomendaría, lo mismo por semana, y cada comentario con su pedido y su cliente. Un CSV descarga una fila por respuesta. Las encuestas son aparte de las reseñas de comidas.
- **step 3: image description** (new): La página Encuestas a clientes de la administración con calificaciones por semana y comentarios
- **step 3: caption** (new): Resultados de las encuestas. Datos de muestra de la demo.
- **growth 1: title** (new): Confianza para los clientes nuevos
- **growth 1: text** (new): Las reseñas aprobadas en la página de una comida ayudan a quien nunca ha pedido a elegir con más seguridad.
- **growth 2: title** (new): Problemas detectados a tiempo
- **growth 2: text** (new): Las calificaciones de entrega y recogida por semana muestran dónde falló una semana, antes de que se convierta en una cancelación.
- **growth 3: title** (new): Saber qué seguir haciendo
- **growth 3: text** (new): Las reseñas le dicen qué comidas entusiasman a los clientes, para que su menú siga lo que les gusta.
- **demo link 1** (new): Los pedidos de un cliente, con el enlace de la encuesta
- **demo link 2** (new): Reseñas
- **demo link 3** (new): Encuestas a clientes
- **FAQ 1: question** (new): ¿Puedo elegir qué reseñas se muestran en mi menú?
- **FAQ 1: answer** (new): Sí. Una reseña aparece en la página de una comida solo después de que usted la aprueba, y también puede rechazarla.
- **FAQ 2: question** (new): ¿Los clientes reciben la encuesta automáticamente?
- **FAQ 2: answer** (new): En su propio sitio configuramos el correo que enlaza la encuesta después de la entrega, y los clientes también la encuentran en su historial de pedidos. El enlace funciona solo para el cliente que hizo el pedido.
- **FAQ 3: question** (new): ¿Quién puede ver las respuestas de la encuesta?
- **FAQ 3: answer** (new): Solo usted. Los clientes responden una vez por pedido, y las respuestas son aparte de las reseñas públicas de las comidas.
- **FAQ 4: question** (new): ¿Puedo descargar las respuestas?
- **FAQ 4: answer** (new): Sí. La página de encuestas tiene un CSV que descarga una fila por respuesta para las fechas que elija.

#### reports-and-insights

- **name** (new): Informes y análisis
- **eyebrow** (new): Informes y análisis
- **title (h1)** (new): Análisis para comidas preparadas: clientes que repiten, abandono, exportaciones CSV e informes de impuesto sobre ventas
- **intro** (new): Vea las ventas, sus comidas más vendidas, los clientes que repiten y los que se van, y descargue sus datos como CSV para su contador, cuando quiera.
- **card on the hub** (new): Análisis, clientes que repiten y abandono, exportaciones CSV e informe del impuesto sobre ventas.
- **problem 1** (new): Cuando me pregunto si el negocio está creciendo, o llega la época de impuestos, estoy en hojas de cálculo. No podría decirle cuántos son mis clientes que repiten, quién se está yendo, ni cuál comida vende más en realidad.
- **problem 2** (new): Quiero los números donde manejo el negocio, explicados con palabras sencillas.
- **step 1: title** (new): Análisis, con palabras sencillas
- **step 1: text** (new): Ingresos, pedidos, clientes y sus comidas más vendidas, semana por semana y mes por mes. Más abajo: suscriptores de los planes semanales, y saltos, pausas y cancelaciones por semana. Los recuadros de clientes que repiten y abandono tienen un enlace Qué significa que lleva a un glosario que explica cada número.
- **step 1: image description** (new): La página Análisis de la administración con ingresos, pedidos, abandono y comidas más vendidas
- **step 1: caption** (new): Análisis. Datos de muestra de la demo.
- **step 2: title** (new): Sus datos en CSV, cuando quiera
- **step 2: text** (new): Descargue pedidos (una fila por línea de comida), clientes, planes semanales, existencias y movimientos de existencias como archivos CSV para Excel, Google Sheets o su contador. Exportar no cambia nada, y el archivo de clientes no incluye contraseñas ni datos de pago.
- **step 2: image description** (new): La página Exportar de la administración con descargas en CSV
- **step 2: caption** (new): Exportaciones.
- **step 3: title** (new): Un informe del impuesto sobre ventas con lo que registró Stripe
- **step 3: text** (new): Un registro del impuesto que Stripe registró en sus pedidos pagados y cumplidos, por día, semana o mes, con totales y un CSV. El sistema no calcula el impuesto por sí mismo: con Stripe Tax activado en su cuenta de Stripe, el impuesto de cada pedido se guarda tal como lo cobró Stripe. Es un registro de sus pedidos, no asesoría fiscal. Los montos de la demo son datos de muestra inventados.
- **step 3: image description** (new): El informe de impuesto sobre ventas de la administración por semana
- **step 3: caption** (new): El informe del impuesto sobre ventas. Datos de muestra inventados.
- **growth 1: title** (new): Más clientes que repiten
- **growth 1: text** (new): La tasa de clientes que repiten, el abandono y los saltos, pausas y cancelaciones semanales muestran cuándo sus clientes habituales empiezan a alejarse, para que pueda contactarlos mientras todavía importa.
- **growth 2: title** (new): Decidir qué cocinar y qué dejar
- **growth 2: text** (new): Las comidas más vendidas de los últimos doce meses le dicen qué conservar, impulsar o retirar.
- **growth 3: title** (new): Menos tiempo de administración en la época de impuestos
- **growth 3: text** (new): El registro del impuesto sobre ventas ya está agrupado por semana o por mes, y su contador recibe el CSV en lugar de un montón de capturas de pantalla.
- **demo link 1** (new): Análisis
- **demo link 2** (new): Glosario de cada número
- **demo link 3** (new): Exportar
- **demo link 4** (new): Informe del impuesto sobre ventas
- **FAQ 1: question** (new): ¿Qué significan aquí la tasa de clientes que repiten y el abandono?
- **FAQ 1: answer** (new): La tasa de clientes que repiten es el porcentaje de los clientes de este año que han pedido más de una vez. El abandono es, de los clientes que pidieron en un mes, el porcentaje que nunca volvió a pedir, contado para meses con al menos tres meses de antigüedad. El glosario de la administración explica ambos con ejemplos.
- **FAQ 2: question** (new): ¿El sistema calcula el impuesto sobre ventas?
- **FAQ 2: answer** (new): No. Con Stripe Tax activado en su cuenta de Stripe, el impuesto de cada pedido se guarda tal como lo cobró Stripe, y el informe lo muestra por día, semana o mes. Es un registro de sus pedidos, no asesoría fiscal.
- **FAQ 3: question** (new): ¿Puede mi contador usar las exportaciones?
- **FAQ 3: answer** (new): Sí. Los pedidos, los clientes, los planes semanales, las existencias y el informe del impuesto sobre ventas se descargan como archivos CSV que abren en Excel o Google Sheets.
- **FAQ 4: question** (new): ¿Puedo llevarme mi lista de clientes?
- **FAQ 4: answer** (new): Sí. Los datos de sus clientes y pedidos siempre pertenecen a su negocio, y puede exportarlos en cualquier momento.

#### ai-tools

- **name** (new): Herramientas con IA
- **eyebrow** (new): Herramientas con IA
- **title (h1)** (new): Herramientas con IA para negocios de comidas preparadas: chat para clientes, estilo de fotos de comida y Trend Finder
- **intro** (new): Un chat que responde las preguntas de sus clientes sobre el menú con su propio menú, opciones de estilo para las fotos de su comida e ideas para comidas nuevas. Usted controla todo.
- **card on the hub** (new): Un asistente de chat para clientes con una página de Conversaciones, estilo de fotos de comida y Trend Finder para ideas de comidas nuevas.
- **problem 1** (new): Los clientes me hacen las mismas preguntas sobre el menú a todas horas, y las contesto entre una tanda y otra. Las fotos de cada plato nuevo toman una eternidad. Y nunca sé qué comida nueva agregar.
- **problem 2** (new): Quiero ayuda con las tres cosas, pero no quiero un robot que haga promesas sobre alergias ni que ponga en mi menú cosas que yo no aprobé.
- **step 1: title** (new): Un chat en su tienda que responde con su menú
- **step 1: text** (new): Un botón de chat aparece en la esquina de todas las páginas de la tienda. Los clientes preguntan con sus propias palabras, por ejemplo qué comidas con pollo tienen, y responde con su propio menú: las comidas que encajan, con sus precios y un botón Agregar que el cliente presiona por sí mismo. Responde en inglés o en español, según el idioma de la tienda, y no puede hacer pedidos, cambiar un plan ni prometer un descuento. Cuando no sabe algo, lo dice y ofrece pasarle la pregunta a usted.
- **step 1: image description** (new): El asistente de chat respondiendo una pregunta del menú con comidas, precios y botones Agregar
- **step 1: caption** (new): El asistente responde con el menú de muestra.
- **step 2: title** (new): Las preguntas sobre alergias van a su cocina
- **step 2: text** (new): Cualquier pregunta que mencione alergias recibe un recordatorio claro: si tiene una alergia grave, comuníquese directamente con la cocina antes de pedir. El asistente solo repite los alérgenos que usted registró para cada comida. Nunca dice que una comida es segura para una alergia, y no da consejos médicos ni de dieta. Hablar con la cocina le pasa la conversación a usted, y el nombre, el correo y el teléfono son opcionales.
- **step 2: image description** (new): El asistente enumerando los alérgenos de una comida con un recordatorio de comunicarse con la cocina
- **step 2: caption** (new): Una pregunta sobre alergias: los alérgenos registrados y un recordatorio de comunicarse con la cocina.
- **step 3: title** (new): Conversaciones: lo que preguntan los clientes y lo que le falta a su menú
- **step 3: text** (new): Cada chat se guarda en la página Conversaciones. Los recuadros cuentan las conversaciones, cuántas llevaron a un pedido de una comida recomendada, cuántas no pudo responder del todo y cuántas se enviaron a la cocina. Más abajo, lo que la gente más pidió y lo que no pudo responder: una forma rápida de ver qué agregar a su menú. Las conversaciones se borran después de los días que usted elija, 90 por defecto. En la demo el historial es inventado, y el chat que usted tenga en la demo aparece primero.
- **step 3: image description** (new): La página Conversaciones de la administración con lo que pidieron los clientes y lo que el asistente no pudo responder
- **step 3: caption** (new): Conversaciones. El historial de la demo es inventado.
- **step 4: title** (new): Estilo de fotos de comida para sus platos reales
- **step 4: text** (new): Elija la iluminación, el ángulo de la cámara, el plato o la superficie, el fondo, la gradación de color (de fiel a la realidad a natural, nunca sobresaturada), el adorno y la forma, a partir de una guía de estilo escrita con las fotos de su propio menú. El adorno solo sale de los ingredientes del propio plato. Cada foto con IA se revisa contra los ingredientes y alérgenos del plato, y una foto que muestre algo que no está en la receta no se usa. Una foto que pasa igual espera su aprobación antes de aparecer en su menú. En la demo pública las opciones de estilo funcionan y la creación de fotos está desactivada para los visitantes, porque cada una es una llamada de pago; la mostramos en vivo en una llamada de recorrido.
- **step 4: image description** (new): Las opciones de estilo de fotos en la Configuración de la administración
- **step 4: caption** (new): Opciones de estilo de fotos en Configuración (en inglés).
- **step 5: title** (new): Trend Finder: ideas de comidas nuevas, con sus fuentes
- **step 5: text** (new): Elija cuántas ideas, un enfoque como alto en proteína o vegano, y una temporada. Cada idea dice por qué es tendencia y enlaza los artículos recientes que lo muestran, de al menos dos publicaciones, con sus fechas. Mostrar detalles enumera cada ingrediente con su nutrición y costo, y lo que estima queda marcado para que usted lo confirme. Aceptar convierte una idea en un borrador de comida que queda oculto para los clientes hasta que usted lo revise y lo publique. La demo muestra resultados guardados de búsquedas reales; en su propio sitio busca en la web en vivo.
- **step 5: image description** (new): Una idea de Trend Finder con por qué es tendencia y sus fuentes
- **step 5: caption** (new): Una idea de Trend Finder con sus fuentes (en inglés).
- **growth 1: title** (new): Menos preguntas repetidas contestadas a mano
- **growth 1: text** (new): El chat se encarga de las preguntas del menú y le pasa solo las que no puede responder, con los datos de contacto que el cliente decidió dejar.
- **growth 2: title** (new): Una lista de lo que le falta a su menú
- **growth 2: text** (new): Las preguntas que no pudo responder son una lista clara de lo que los clientes quieren y usted todavía no ofrece.
- **growth 3: title** (new): Más ideas para el menú, sin adivinar
- **growth 3: text** (new): Trend Finder trae ideas con fuentes, ingredientes y costos, y usted decide qué se convierte en una comida.
- **growth 4: title** (new): Fotos que combinan con su menú
- **growth 4: text** (new): Las opciones de estilo mantienen las fotos nuevas en el estilo de las que ya tiene, y nada se publica sin su aprobación.
- **demo link 1** (new): Abra el menú y presione Pregunte a nuestro asistente de IA
- **demo link 2** (new): Conversaciones
- **demo link 3** (new): Opciones de estilo de fotos
- **demo link 4** (new): Comidas, con Buscar comidas en tendencia
- **FAQ 1: question** (new): ¿El asistente le dirá a un cliente que una comida es segura para su alergia?
- **FAQ 1: answer** (new): No. Solo repite los alérgenos que usted registró para una comida y siempre agrega un recordatorio de comunicarse directamente con la cocina antes de pedir. No dice que una comida es segura, y no da consejos médicos ni de dieta.
- **FAQ 2: question** (new): ¿Puede el asistente tomar pedidos o dar descuentos?
- **FAQ 2: answer** (new): No. No puede hacer pedidos, cambiar un plan ni prometer un descuento. Muestra comidas con sus precios y un botón Agregar que el cliente presiona por sí mismo.
- **FAQ 3: question** (new): ¿El chat funciona en español?
- **FAQ 3: answer** (new): Sí. Responde en inglés o en español, según el idioma de la tienda.
- **FAQ 4: question** (new): ¿Por qué la demo limita cuántas preguntas puedo hacer?
- **FAQ 4: answer** (new): En la demo es un asistente de IA real que responde con el menú de muestra, y cada visitante puede hacer unas pocas preguntas al día. Al llegar al límite, lo avisa, y en una llamada de recorrido le mostramos más.
- **FAQ 5: question** (new): ¿Las fotos con IA se publican solas en mi menú?
- **FAQ 5: answer** (new): No. Cada foto se revisa contra los ingredientes y alérgenos del plato, y una que pasa igual espera su aprobación. La revisión solo detecta extras visibles, así que usted sigue siendo responsable de su menú y sus etiquetas.

#### bilingual-and-app

- **name** (new): Tienda bilingüe y app instalable
- **eyebrow** (new): Tienda bilingüe y app instalable
- **title (h1)** (new): Sitio bilingüe para comidas preparadas, en inglés y español, instalable en el teléfono
- **intro** (new): Su tienda y su área de administración en inglés y en español con un cambio de un toque, y una tienda que los clientes pueden agregar a la pantalla de inicio de su teléfono como una app.
- **card on the hub** (new): Una tienda y una administración en inglés y español, y una tienda que los clientes pueden instalar como una app.
- **problem 1** (new): Muchos de mis clientes prefieren pedir en español, y casi todos piden desde el teléfono. No quiero dos sitios web, y no quiero pagar por una app que tenga que aprobar una tienda de aplicaciones.
- **step 1: title** (new): Un toque entre inglés y español
- **step 1: text** (new): Los clientes cambian con EN | ES en la parte superior de cualquier página, y toda la tienda cambia. Su elección se mantiene, y un enlace que termina en ?lang=es abre la tienda en español, así que puede enviárselo directo a un cliente de habla hispana.
- **step 1: image description** (new): La página de planes de la tienda de la demo en español
- **step 1: caption** (new): La misma página de planes, en español.
- **step 2: title** (new): Su administración también en los dos idiomas
- **step 2: text** (new): La administración tiene su propio selector EN | ES, así que su personal puede trabajar en el idioma con el que se sienta más cómodo. Los correos a los clientes sobre cambios en los cobros salen en el idioma de cada cliente.
- **step 2: image description** (new): La página Entrega de la administración de la demo en español
- **step 2: caption** (new): La página Entrega de la administración, en español.
- **step 3: title** (new): Usted decide cuándo se activa el español
- **step 3: text** (new): En una tienda nueva el español empieza desactivado: la tienda abre en inglés, sin el selector EN | ES, hasta que usted activa Español en Configuración > Funciones. La demo lo tiene activado para que vea los dos. Los nombres y las descripciones de las comidas quedan como usted los escribe.
- **step 4: title** (new): Instálela como una app
- **step 4: text** (new): Después de su primer pedido, a los clientes se les ofrece agregar su tienda a la pantalla de inicio. Se abre como una app, con su nombre e ícono, y carga rápido en las visitas siguientes. En iPhone se muestran los dos pasos (Compartir, y luego Agregar a pantalla de inicio), porque Safari no tiene un botón de instalar. No hay una tienda de aplicaciones de por medio, y el pago siempre necesita conexión.
- **step 4: image description** (new): La página del plan de un cliente en un teléfono
- **step 4: caption** (new): Hecha para teléfonos: la página del plan en una pantalla pequeña (en inglés).
- **growth 1: title** (new): Llegue a los clientes que prefieren español
- **growth 1: text** (new): Reciben toda la tienda en su idioma sin que usted tenga que mantener un segundo sitio web.
- **growth 2: title** (new): Más pedidos repetidos, con menos esfuerzo para el cliente
- **growth 2: text** (new): Un ícono en la pantalla de inicio con su nombre queda a un toque del menú, lo que hace más fácil volver.
- **growth 3: title** (new): Sin tienda de aplicaciones
- **growth 3: text** (new): Los clientes la instalan desde el navegador, así que no hay nada que enviar, aprobar ni mantener actualizado en una tienda de aplicaciones.
- **demo link 1** (new): La tienda en español
- **demo link 2** (new): La administración (use EN | ES arriba)
- **demo link 3** (new): Configuración > Funciones, donde se activa el español
- **FAQ 1: question** (new): ¿Qué está disponible en los dos idiomas?
- **FAQ 1: answer** (new): La tienda, el área de administración y los correos a los clientes sobre cambios en los cobros. Los nombres y las descripciones de las comidas que usted escribe quedan como los escribe; díganos si los quiere en los dos idiomas.
- **FAQ 2: question** (new): ¿Mis clientes necesitan una tienda de aplicaciones?
- **FAQ 2: answer** (new): No. Agregan su tienda a la pantalla de inicio de su teléfono desde el navegador. Se abre como una app con su nombre e ícono.
- **FAQ 3: question** (new): ¿Se puede pedir sin conexión?
- **FAQ 3: answer** (new): La tienda carga rápido en las visitas siguientes, pero el pago siempre necesita conexión.
- **FAQ 4: question** (new): ¿Por qué el español empieza desactivado en una tienda nueva?
- **FAQ 4: answer** (new): Para que usted decida cuándo se activa. La tienda abre en inglés, sin el selector EN | ES, hasta que active Español en Configuración > Funciones.

#### getting-started

- **name** (new): Cómo empezar
- **eyebrow** (new): Cómo empezar
- **title (h1)** (new): Configuración y migración de clientes para pedidos de comidas preparadas, hechas por nosotros
- **intro** (new): Lo configuramos por usted, pasamos su menú y sus clientes, y lo ponemos en su propio dominio y su propia cuenta de Stripe. No tiene que aprender software ni empezar desde cero.
- **card on the hub** (new): Configuración hecha por nosotros, traslado de sus clientes, y que sus datos, su dominio y su cuenta de Stripe sean suyos.
- **problem 1** (new): No tengo tiempo para aprender un software nuevo, configurar los pagos y pasar a mis clientes, y me da miedo perder gente en el cambio.
- **problem 2** (new): Tampoco quiero entregarle mi lista de clientes y mi negocio a una plataforma que me cobra por cada pedido.
- **step 1: title** (new): Una llamada de introducción gratis
- **step 1: text** (new): Hablamos de su menú, de cómo recibe pedidos hoy y de lo que le gustaría cambiar. Puede probar primero la demo con su propio nombre, logotipo y colores: el panel Pruébelo con su marca muestra todo el sitio como si fuera suyo.
- **step 1: image description** (new): La tienda de la demo con otro nombre de negocio y otros colores
- **step 1: caption** (new): La demo con el nombre y los colores cambiados en el panel de marca.
- **step 2: title** (new): Lo configuramos por usted
- **step 2: text** (new): Configuramos su nombre, logotipo y colores, su menú, sus zonas y días de entrega, sus planes y sus pagos, para que empiece con una tienda que ya funciona en lugar de una vacía.
- **step 3: title** (new): Pasamos a sus clientes y su menú
- **step 3: text** (new): Durante la configuración pasamos por usted los datos de sus clientes y de su menú, desde hojas de cálculo y otros sistemas. Un menú en una exportación de una tienda en línea se puede importar directamente. La nutrición y los alérgenos que no estén en la exportación se marcan para que usted los complete, nunca se adivinan. Sus clientes siguen pidiéndole sin interrupción, y planeamos con usted la fecha del cambio.
- **step 4: title** (new): Active funciones a medida que crece
- **step 4: text** (new): Hay tres planes, y nosotros definimos el suyo. En Configuración > Funciones usted elige cuáles de sus funciones están activadas, así que puede empezar sencillo y activar más cuando esté listo. Desactivar una nunca borra sus datos.
- **step 4: image description** (new): La pestaña Funciones de la Configuración de la administración con interruptores agrupados por plan
- **step 4: caption** (new): Configuración > Funciones, agrupadas por plan.
- **step 5: title** (new): Sigue siendo suyo
- **step 5: text** (new): Los datos de sus clientes y pedidos, su nombre de dominio y su cuenta de Stripe están a su nombre, y puede llevárselos en cualquier momento. Los pagos van a su propia cuenta de Stripe, y no cobramos una comisión por pedido.
- **growth 1: title** (new): Cambiar sin perder clientes
- **growth 1: text** (new): Planeamos con usted la fecha del cambio, y sus clientes siguen pidiéndole mientras pasamos todo.
- **growth 2: title** (new): Menos tiempo de administración desde el primer día
- **growth 2: text** (new): Usted no aprende un sistema nuevo encima de manejar una cocina. Nosotros hacemos la configuración y el traslado.
- **growth 3: title** (new): Un negocio que es suyo
- **growth 3: text** (new): Su lista de clientes, su dominio y su cuenta de pagos siguen a su nombre, así que puede crecer sin quedar atado.
- **demo link 1** (new): La tienda (abra Pruébelo con su marca)
- **demo link 2** (new): Configuración > Funciones
- **FAQ 1: question** (new): ¿Quién lo configura?
- **FAQ 1: answer** (new): Nosotros. Estamos en Jacksonville, Florida, y trabajamos con operadores pequeños y medianos de comidas preparadas en inglés y español. Usted nos cuenta cómo funciona su negocio y nosotros configuramos el sistema para eso.
- **FAQ 2: question** (new): ¿Pueden pasar a mis clientes y mi menú?
- **FAQ 2: answer** (new): Sí. Pasamos los datos de sus clientes y de su menú durante la configuración, desde hojas de cálculo y otros sistemas. La nutrición y los alérgenos que falten se marcan para que usted los complete, nunca se adivinan, y planeamos con usted la fecha del cambio.
- **FAQ 3: question** (new): ¿Son míos mis datos, mi dominio y mi cuenta de Stripe?
- **FAQ 3: answer** (new): Sí. Están a su nombre desde el principio, y puede exportar sus datos y llevárselos en cualquier momento.
- **FAQ 4: question** (new): ¿Hay un cargo por cada pedido?
- **FAQ 4: answer** (new): No cobramos una comisión por pedido. Se aplican las comisiones de procesamiento de Stripe a los pagos con tarjeta, como en cualquier otro lugar.
- **FAQ 5: question** (new): ¿Cómo empiezo?
- **FAQ 5: answer** (new): Llame al (904) 822-8929 o hable con Alex desde el botón de esta página. También puede leer primero la guía de la demo.

### Reused from the app (`IslandFreshmeals/src/config/features.ts`)

These Spanish names and descriptions were already in the app (they appear in its Settings > Features) and are shown on the pages unchanged. Listed here so one review covers them too.

- **plan basic: name** (reused): Básico
- **plan basic: description** (reused): Pedidos en línea con planes, entregas, recogida, cupones, etiquetas e informes.
- **plan advanced: name** (reused): Avanzado
- **plan advanced: description** (reused): Todo lo de Básico, más comidas a su gusto, paquetes, tarjetas de regalo, recompensas, inventario y análisis.
- **plan pro: name** (reused): Pro
- **plan pro: description** (reused): Todo lo de Avanzado, más las herramientas con IA y más de una cocina.
- **subscriptions: name** (reused): Planes semanales
- **subscriptions: description** (reused): Los clientes se suscriben a un plan semanal y se les cobra cada semana.
- **delivery_zones: name** (reused): Zonas de entrega
- **delivery_zones: description** (reused): Zonas por código postal con su tarifa, mínimo y día, y la página de zonas de entrega.
- **route_sheets: name** (reused): Rutas de entrega
- **route_sheets: description** (reused): Hojas de ruta para los choferes, con las paradas en un orden práctico.
- **pickup_locations: name** (reused): Puntos de recogida
- **pickup_locations: description** (reused): Lugares donde los clientes pueden recoger su pedido.
- **coupons: name** (reused): Cupones
- **coupons: description** (reused): Códigos de descuento que los clientes usan al pagar.
- **labels: name** (reused): Etiquetas
- **labels: description** (reused): Etiquetas de comidas para imprimir, con fecha de consumo.
- **packing_slips: name** (reused): Hojas de empaque
- **packing_slips: description** (reused): Una hoja para imprimir para la bolsa de cada pedido.
- **production_planning: name** (reused): Plan de producción
- **production_planning: description** (reused): La lista de preparación y la lista de compras de la semana, según los pedidos.
- **reviews: name** (reused): Reseñas
- **reviews: description** (reused): Los clientes califican las comidas; usted aprueba lo que se muestra en el menú.
- **order_minimums: name** (reused): Mínimos de pedido
- **order_minimums: description** (reused): Un total mínimo por pedido y cantidades mínimas por comida.
- **reports: name** (reused): Exportaciones e informes
- **reports: description** (reused): Exportaciones CSV y el informe de impuesto sobre ventas.
- **spanish: name** (reused): Español
- **spanish: description** (reused): Un selector inglés | español en la tienda y en la administración.
- **pwa: name** (reused): App instalable
- **pwa: description** (reused): Los clientes pueden agregar la tienda a la pantalla de inicio de su teléfono.
- **build_your_own: name** (reused): A su gusto
- **build_your_own: description** (reused): Los clientes arman una comida con proteínas, carbohidratos, verduras y salsas.
- **sizes_addons: name** (reused): Tamaños y extras
- **sizes_addons: description** (reused): Tamaños de comida y extras con costo en cualquier comida.
- **bundles: name** (reused): Paquetes
- **bundles: description** (reused): Venda varias comidas juntas a un solo precio.
- **gift_cards: name** (reused): Tarjetas de regalo
- **gift_cards: description** (reused): Venda tarjetas de regalo que los clientes canjean al pagar.
- **loyalty_points: name** (reused): Puntos de recompensa
- **loyalty_points: description** (reused): Los clientes ganan puntos con sus pedidos y los usan después.
- **referrals: name** (reused): Referidos
- **referrals: description** (reused): Los clientes comparten un código; ambos ganan una recompensa con el primer pedido del amigo.
- **surveys: name** (reused): Encuestas
- **surveys: description** (reused): Una encuesta corta después de cada pedido.
- **ingredient_costs: name** (reused): Costos y proveedores
- **ingredient_costs: description** (reused): Costos de ingredientes, costo de alimentos por comida y su lista de proveedores.
- **inventory: name** (reused): Inventario
- **inventory: description** (reused): Inventario en existencia, que baja a medida que cocina cada semana.
- **analytics: name** (reused): Análisis
- **analytics: description** (reused): Ventas, comidas más vendidas y tendencias de clientes, con un glosario de las cifras.
- **ai_assistant: name** (reused): Asistente de comidas (IA)
- **ai_assistant: description** (reused): Un chat que ayuda a los clientes a elegir comidas, y la página de lo que preguntaron.
- **ai_photos: name** (reused): Fotos de comidas con IA
- **ai_photos: description** (reused): Genere fotos de comidas que combinan con el estilo de su menú.
- **trend_finder: name** (reused): Trend Finder
- **trend_finder: description** (reused): Ideas de comidas nuevas según las tendencias, con costos estimados.
- **multi_location: name** (reused): Más de una cocina
- **multi_location: description** (reused): Maneje varias cocinas, cada una con su horario, zonas y menú.

### Meal-prep ordering page (`src/i18n/mealPrepOrdering.ts`)

- **what is included: link to the feature hub** (new): Ver todas las funciones, con pantallas de la demo
- **what is included: link on each card** (new): Cómo funciona

## App, Spanish (Nov 1, 2026 update: no developer messages on public forms)

Strings in the meal-prep app (IslandFreshmeals repository), written without a native speaker. The old Spanish sentences “Modo demo: no hay un webhook de contactos configurado…” and “Modo demo: no hay un webhook de contacto configurado…” were removed from the public pages.

- **Delivery areas (`src/pages/DeliveryAreas.tsx`), shown on a real site whose notify form isn't connected: text** (new): Llámenos o escríbanos y le avisaremos en cuanto lleguemos a su zona.
- **Delivery areas: phone link label** (new): Llamar
- **Delivery areas: email link label** (new): Escribir
- **Contact (`src/pages/Contact.tsx`), shown on a real site whose message form isn't connected** (new): Nuestro formulario de mensajes no está disponible por ahora. Llámenos o escríbanos con los datos que aparecen junto a él.
- **Admin Overview setup note (`src/components/admin/SetupNotes.tsx`): title** (new): Nota de configuración
- **Admin Overview setup note: delivery areas form** (new): El formulario «Avisarme» de la página de zonas de entrega no está conectado: falta el webhook de contactos (VITE_MAKE_LEADS_WEBHOOK_URL). Mientras tanto, a los visitantes fuera de su zona se les muestran su teléfono y su correo. Pida a CG Strategic que lo conecte.
- **Admin Overview setup note: contact form** (new): El formulario de mensajes de la página Contacto no está conectado: falta el webhook de contacto (VITE_MAKE_CONTACT_WEBHOOK_URL). Mientras tanto, a los visitantes se les pide que llamen o escriban. Pida a CG Strategic que lo conecte.

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
