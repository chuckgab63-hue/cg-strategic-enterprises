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
