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
| `src/i18n/common.ts` | Header, footer, "Hablemos" chooser, 404 page |
| `src/i18n/contact.ts` | Contact form, contact pop-up, `/es/contact` |
| `public/alex-voice-strings.js` | Alex call button and status messages (they say Alex speaks English) |
| `src/i18n/alex.ts` | Alex call button's first label (must match the file above; a test checks) |
| `src/i18n/home.ts` | Home page, animation playground and cards |
| `src/i18n/mealPrepPreview.ts` | Meal-prep teaser on the home page |
| `src/i18n/automations.ts` | `/es/automations` |
| `src/i18n/portfolio.ts` | `/es/portfolio` |
| `src/i18n/analysisWidget.ts` | Pest photo diagnosis demo |
| `src/i18n/taxWidget.ts` | Sales-tax demo |
| `src/i18n/propertyWidget.ts` | Property operations demo |
| `src/i18n/assetTrackerWidget.ts` | Asset tracker demo |
| `src/i18n/mealPrepOrderWidget.ts` | Meal-prep ordering demo (dish names, checkout, dates) |
| `src/i18n/mealPrepCalculator.tsx` | `/es/meal-prep-calculator` and its chart |
| `src/i18n/websiteCheck.ts` | `/es/website-check` form, errors and results |
| `src/lib/websiteCheck/reportCopy.ts` | Website Check report text written by the server: missed-call reasons, fallback fixes and summary (only the `es` halves) |
| `src/i18n/oneSourceCaseStudy.ts` | `/es/work/one-source-total-pest-control` |
| `src/i18n/skunkworks.ts` | `/es/skunkworks` (voicebots, spatial viewer) |
| `src/i18n/skunkworksProjects.ts` | "Lo que estamos construyendo" project cards |
| `src/i18n/cinematic.ts` | `/es/cinematic` |
| `src/i18n/fluidDynamics.ts` | `/es/fluid-dynamics` |
| `src/i18n/uiPolish.ts` | `/es/ui-polish` |

### AI answers

These server files tell Gemini to answer in Spanish when the page is Spanish. The instructions
themselves are short; the answers are generated live and can't be pre-reviewed. Worth trying one
of each on the Spanish site.

- `api/analyze.ts`: pest photo diagnosis
- `api/recommend-meal.ts`: meal recommendations in the ordering demo
- `api/triage-maintenance.ts`: maintenance request summary

## Words and choices worth a second look

- **Terms:** "clientes potenciales" for *leads*, "El Motor" for *The Engine*, "Casos de estudio" for *Case Studies*, "Hablemos" for *Let's Talk*.
- **Meal-prep:** "costo primo" (*prime cost*), "costo de ventas" (*COGS*), "merma" (*spoilage*), "cocina comercial compartida" (*commissary kitchen*).
- **Regional food words:** "camote" vs "batata", "ejotes" vs "habichuelas".
- **Home hero wordplay:** "Parezca una empresa sólida. / O SEA una empresa sólida."
- **Property demo:** "Cuadrilla n.º", "Patio Norte/Sur" (*North/South Yard*), "Entregar" (*Drop Off*).
- **Pest demo:** "cucarachas palmetto" (*palmetto bugs*).
- **Demo-page headings:** "ESCALA DE CINE." and "Interfaz con acabado nativo".

## Intentionally left in English on Spanish pages

- Brand, product, people and technology names (see the top of this file), and the "EN" link in the language toggle.
- Text quoted from One Source's own English website in the case study's screenshots and alt text (for example "Talk to Jess", "Book Online", "My status").
- The pest demo's report field names (`DUVAL HUB REPORT`, `PRIORITY`, ...) inside the AI response, because the widget parses them. Visitors see translated labels.
- Data the demos send to or receive from Make (depot names, `fulfillmentType`, report ids), where Make expects English values.
- The A2P SMS opt-in pages, `public/sms-opt-in.html` and `sms-opt-in-thanks.html`.

## Launching

When the review is done, set `SPANISH_PUBLIC = true` in `src/i18n/lang.ts`. That one flag:

- shows the EN | ES toggle to everyone (today it only shows on `/es` pages, or once someone has picked Spanish),
- removes `noindex` from `/es` pages,
- adds `hreflang` links (en, es, x-default) to every page and the Spanish URLs to the sitemap,
- turns on the small "¿Prefiere español?" prompt for visitors whose browser prefers Spanish.
