# Pest control packages — GATE A plan

Branch: `pest-control-packages`. Nothing is built yet; this is the audit, the
tier proposal and the page plan for approval.

Sources read: this repo (routes, nav, footer, sitemap, /es, case study,
Skunkworks, analytics) and `C:\dev\OneSourceWS-production` **read-only** (no
migrations, no writes, no dev server).

---

## 1. Site inventory (today)

### Routes

`src/pageFiles.ts` lists every English path; `App.tsx` mounts each one twice,
once bare and once under `/es`. `src/i18n/meta.ts` (`SITE_ROUTES`) carries the
title and description for both languages and feeds three things at build time:
the pre-rendered HTML file per page per language, the hreflang links, and
`sitemap.xml`. `vercel.json` needs one hand-written rewrite per path per
language. `src/i18n/i18n.test.ts` fails the build if a pre-rendered page has no
rewrite — so a new page needs all four edits or the tests catch it.

| Group | Paths |
|---|---|
| Home | `/` |
| Services | `/automations`, `/answering-service`, `/meal-prep-ordering`, `/search-ai-visibility` |
| Meal-prep features | `/meal-prep-ordering/features` + 11 feature pages |
| Work | `/portfolio` (aliases `/case-studies`, `/case-study`), `/work/one-source-total-pest-control` |
| Free tools | `/website-check`, `/missed-call-calculator`, `/meal-prep-calculator` |
| Demos | `/cinematic`, `/fluid-dynamics` (alias `/fluid`), `/ui-polish` |
| Other | `/skunkworks`, `/demo-guide`, `/faq`, `/contact`, `/privacy`, `/terms` |
| Unlisted | `/analytics-optout`, `/ignore-me` (noindex, no sitemap) |

**There is no pest-control service page.** Pest control appears only as the One
Source case study and the case-study card.

### Nav, footer, CTAs

- Header `NAV_LINKS`: Services (`/#services`), Case Studies, Skunkworks,
  Contact — plus the language toggle, an email icon, and the "Let's Talk"
  chooser (Alex in-browser call) with "Or send us a message".
- Footer: four columns — Services (Automation & Workflows, AI Answering
  Service, Online Ordering for Meal Prep, Search & AI Visibility, Websites),
  Free tools, Company, Contact — then a short contact form on every page except
  `/contact`, then Privacy / Terms.
- Labels live in `src/i18n/common.ts` under `nav`, in both languages.
- Service-page CTAs come from `src/components/ServicePage.tsx`:
  `TalkToAlexButton`, `BookCallButton`, `primaryButtonClass`,
  `secondaryButtonClass`, `ServiceFaq` (which emits FAQPage JSON-LD).

### Case study

`/work/one-source-total-pest-control`, copy in `src/i18n/oneSourceCaseStudy.ts`:
the starting point, what we built, screenshots (home hero, service page, Pest
Analyzer, Talk to Jess, service-area map — desktop and phone), the admin area
with three **mock-up** screens, a TODO client quote and a TODO results section.
Live site link points at `onesourcewsv2.vercel.app` until the domain moves.

### Skunkworks

Nine projects in `src/config/skunkworksProjects.ts` with status `concept`,
`prototype` or `in-use`. Relevant today: `photo-diagnosis-quote` is **in-use**
and links to the case study.

### UTM and analytics

- `bookingUrl(medium, content)` in `src/config/booking.ts` tags every Cal.com
  booking link: `utm_source=website`, `utm_medium=<page>`, `utm_content=<placement>`.
- `src/lib/analytics.ts` strips query strings and fragments from page views but
  keeps `utm_source/medium/campaign/content`, drops everything from an
  opted-out browser, and already defines ten custom events via
  `trackEvent(name, lang, extra)`. **Custom events are in use**, so the demo can
  fire them.

### /es mirror

`SPANISH_PUBLIC = true` in `src/i18n/lang.ts`. Every page exists under `/es`,
hreflang en/es/x-default is emitted, `/es` URLs are in the sitemap, and the
Cal.com booking page is English-only so Spanish pages show "(página en inglés)".
All Spanish copy is marked **NEEDS NATIVE REVIEW** (`docs/SPANISH_REVIEW.md`).

---

## 2. Reference build: client-facing capabilities

From `C:\dev\OneSourceWS-production`, read-only. One line each, written for a
pest control owner.

### The public website

| Capability | What it does for the owner |
|---|---|
| Multi-page Astro site on Vercel | Every page ships real HTML, so it loads fast and search engines can read it. |
| A page per service (general, termite, WDO, lawn, rodent, mosquito, commercial) | Each service you sell can rank on its own instead of fighting for one page. |
| Pest library (`/pests`, one page per pest) | Catches the "what is this bug" searches, before they're ready to call. |
| Video hero with reduced-motion fallback | Looks like an established company, and still behaves on a phone. |
| Sticky mobile bar: Call / Book Online / Talk to Jess | On a phone, the three ways to reach you are always under a thumb. |
| Service area ZIP checker + shaded county map | Callers learn in one step whether you cover them, so you stop quoting jobs you can't take. |
| Online booking page | Books the job at 9pm while they're still on the page. |
| Lead and contact forms, phone field above SMS consent, honeypot | Carrier-compliant from day one, so texting a customer later doesn't get you blocked. |
| One Make.com lead intake behind every form, analyzer follow-up and voice call | Every lead arrives in the same shape, in the CRM, with notifications — not four different inboxes. |
| `?ref=` referral attribution | You can tell which partner or flyer actually sent the lead. |
| Careers page with its own webhook and no customer CTAs | Hiring gets its own front door instead of competing with booking. |
| Bilingual EN/ES site, own URLs, one-tap toggle | A Spanish-speaking customer reads your site in Spanish — and can find it in Spanish. |
| Licensed photos + credits page, state licence in footer and schema | Nothing on the site you can't back up. |
| SEO basics: per-page title/description/canonical/OG, one H1, breadcrumbs, LocalBusiness + Service + BreadcrumbList JSON-LD, robots, sitemap | Found, and shown properly when someone shares a link. |
| Rate limits on AI features, daily cap on voice calls | Your AI bill can't run away from you. |

### AI on the website

| Capability | What it does for the owner |
|---|---|
| Pest Analyzer: photo upload → first-guess ID, confidence, tips, suggested service, optional follow-up form | A customer's photo becomes a named lead with the service already suggested. |
| Talk to Jess: bilingual AI voice assistant (Retell), answers from a Northeast Florida knowledge base built on UF/IFAS extension sources, then takes the caller's details as a lead | Answers pest questions at 9pm in English or Spanish and hands you the lead. |
| Jess follows the WDO switch | Turn WDO off and Jess stops offering it — the assistant can't sell what you don't. |

### The admin area (login only, Supabase + row-level security)

| Capability | What it does for the owner |
|---|---|
| Owner / admin / technician roles, enforced in the database | What only you should see stays that way, decided by Postgres and not by a hidden menu. |
| Credentials and licensing tracker (FDACS ID cards, certified operator, business licence) with a 30/60/90-day dashboard | You stop finding out a licence lapsed from a fine. |
| Supervised training log and route-ready status, with per-category targets | You can see at a glance who's ready to run their own route. |
| Applicant pipeline: New → Contacted → Interview → Offer → Hired / Not hired; hiring creates the staff record and onboarding checklist | Applications land in one list, and hiring is a click instead of retyping. |
| Spanish-speaker badge on staff and applicants | You can staff a Spanish-speaking route on purpose. |
| Automatic deletion of not-hired applicants after a set number of days | Old applications don't sit on your system forever. |
| Onboarding checklists with due dates | Every new hire's paperwork has a date on it. |
| Private document storage for staff files | Licence cards and certificates in one place instead of a filing cabinet. |
| "My status" phone view for technicians | A tech checks their own credentials and training without calling the office. |
| Daily digest email: expiring credentials, overdue onboarding, renewals due, retention review | One email a day instead of remembering. |
| Digital contracts: write an agreement, A–Z customer file, search and filters | The termite file stops living in a drawer. |
| Dates computed by the database: cancel deadline (third business day), agreement end, retention date | Three dates that must agree always agree. |
| E-signature through BoldSign (two templates, EN and ES), send / resend / void, template ID recorded on the record | The customer signs on their phone, and the record says which wording they signed. |
| Paper-contract import: batch scans, AI reads the fields, a person verifies every one before it becomes a contract | Years of paper contracts become searchable without retyping them. |
| Protected originals: an original can't be replaced or deleted, superseded scans kept, page order preserved | What an auditor asks for is the original, and it can't be overwritten. |
| Audit packet: one PDF with the cover sheet, record, status timeline, file hashes, the original and the signing certificate | Hand an auditor one file instead of four links and a promise. |
| Renewal reminders: a renewals-due filter and the renewals section of the daily email | Renewal season stops being a surprise. |
| Retention is a report, never a delete job; only the owner can delete | Records go when you say so, not because a script ran. |
| Exports | Your data comes out whenever you want it. |

### The feature-switch system

`src/config/features.ts` is one registry that owns each feature's nav items,
admin routes, API endpoints and form intents, so `src/middleware.ts` guards them
all from one place. Behaviour worth showing on the page:

- **Owner-only.** Admins see every switch and its state but can't move one;
  row-level security enforces that, not just the disabled attribute.
- **Turning off hides and blocks — it never deletes.** There is no code path
  that drops a row because a switch moved.
- **Dependencies.** E-signature can't be switched on while Contracts is off,
  and goes off with it whatever its own row says.
- **Two speeds.** Admin-scope switches say "Applies immediately"; public-scope
  switches say "Rebuilds the public site, about a minute."
- **Fail-safe.** If the switches can't be read, everything shows as off, with a
  notice saying that's the fail-safe and not somebody's setting.
- **Setup checklist.** Switching on e-signature lists what this code can't
  check: the BoldSign templates per language, the API key living in Make and
  nowhere else, the send scenario switched on. Missing environment variables are
  named (by name only — no values).

**The five switches that exist today**, with their defaults:

| Switch | Scope | Default |
|---|---|---|
| Contracts | admin | on |
| Send for signature (needs Contracts) | admin | **off** |
| Import paper contracts (needs Contracts) | admin | on |
| Renewal reminders (needs Contracts) | admin | on |
| Offer WDO inspections | public | **off** |

Staff, credentials, training, applicants, onboarding, documents and settings are
deliberately **not** switchable — they're the floor of the admin area.

---

## 3. Proposed tiers

Names and order as briefed: Basic → Pro → Advanced, "Most popular" on Pro. Each
card ends **"Pricing after a free 30-minute audit."** No prices anywhere:
`src/config/pestPackages.ts` holds the figures behind `SHOW_PRICES = false`.

### BASIC — "Get found"

> A site people find, and a lead that always reaches you.

- Fast, mobile-first website
- A page for every service you sell, and a pest library page for the pests people search
- Service-area ZIP checker and map
- Lead and booking forms, SMS-consent compliant, with referral tracking
- Sticky Call / Book bar on phones
- Google Business Profile setup, titles, descriptions, schema, sitemap
- Hosting and the monthly care plan

### PRO — "Answer every lead" · Most popular

> Nobody waits for the office to open.

Everything in Basic, plus:

- Spanish site with an EN | ES toggle and its own URLs
- Talk to Jess on your website, English and Spanish
- Pest Analyzer: a customer's photo becomes a lead
- One automated lead intake into your CRM, with notifications
- Service switches you hold yourself — e.g. turn WDO inspections on or off
- Admin area core: staff, credentials and licensing with the 30/60/90 dashboard,
  training log and route-ready status, careers and the applicant pipeline,
  onboarding checklists, documents, technician "My status", the daily digest

### ADVANCED — "Run the office"

> The paperwork and the phone look after themselves.

Everything in Pro, plus:

- Digital termite contracts: the A–Z file, search, and cancel / renewal /
  retention dates computed for you
- E-signature — sign on a phone, with the wording that was signed on the record
  *(rolling out: built and switched off by default, not yet live with a customer)*
- Paper-contract import, with a person verifying every field
- Protected originals and one-PDF audit packets
- Renewals tracking and reminders
- AI answering on your main phone line, plus missed-call follow-up
  *(a CG Strategic service alongside the platform; texting depends on carrier
  A2P approval)*
- Review requests to customers who opted in
- Custom automations and CRM sync

### Status honesty

| Piece | Label |
|---|---|
| Website, service pages, Spanish site, Jess, Pest Analyzer, lead intake, admin core, feature switches | In use with a client |
| Digital contracts, paper import, protected originals, audit packets, renewals | In use with a client |
| **E-signature** | **Rolling out** — not yet live with a customer |
| AI answering on the main phone line | A CG Strategic service (Alex on this site; Jess on One Source's website) |
| Missed-call follow-up by text | Depends on carrier (A2P) approval — same note Skunkworks already carries |

---

## 4. Page plan — `/pest-control` (+ `/es/pest-control`)

Built on `ServicePage` so it matches `/answering-service` and
`/meal-prep-ordering`.

1. **Hero** — eyebrow "Pest control"; H1 "Built for pest control companies";
   one-sentence promise; CTAs: Talk to Alex, Book a free intro call, Call.
2. **Turn features on when you're ready** — the interactive demo (below).
   Caption: switching a feature off never deletes data; public changes publish
   in about a minute.
3. **Basic / Pro / Advanced** — three cards on desktop, stacked on mobile,
   "Most popular" on Pro, each ending "Pricing after a free 30-minute audit",
   then the full checklist table (feature × tier) below.
4. **Feature deep-dives** — six short blocks, each with a status chip and either
   an existing screenshot or recreated UI: Talk to Jess · Pest Analyzer ·
   digital contracts + audit packet · renewals · licensing and training
   tracking · the Spanish site.
5. **See it on a real site** — band linking the One Source case study.
6. **FAQ** — ownership (you own your data, domain, content and payment account;
   the platform is licensed through the monthly care plan, with a buyout
   option), how the switches work, Spanish, what the audit covers, and the
   process: intro call → audit → requirements → quote → build → monthly care.
7. **Closing CTA** — same three buttons.

### The switch demo (static, no backend)

A mock **Admin › Settings › Features** panel on the left, a mock pest-company
homepage and admin preview on the right, wired with React state only.

| Switch | Preview reacts |
|---|---|
| Offer WDO inspections | WDO service card and nav item appear / disappear; caption says the public site rebuilds in about a minute |
| Digital contracts | Contracts appears in the admin nav |
| Send for signature | "Send for signature" button appears on the contract row; **locked and greyed while Contracts is off**, with "Turn Contracts on first." |
| Spanish site | EN \| ES toggle appears in the mock header |
| Talk to Jess | Jess button appears in the hero and the mock mobile bar |

Plus the real panel's behaviours, because they're the selling point: the
"nothing is deleted" line, "Applies immediately" vs "Rebuilds the public site,
about a minute" under each switch, and the setup checklist that appears when
e-signature is switched on.

### SEO

- Title/description targeting **pest control website**, **AI answering service
  for pest control**, **termite contract e-signature**.
- hreflang en / es / x-default — automatic once the route is in `SITE_ROUTES`.
- Sitemap — automatic, with a `lastmod`.
- JSON-LD: **Service** (new to this site) + **FAQPage** (via `ServiceFaq`).
- Breadcrumbs + BreadcrumbList using the existing `breadcrumbs.ts` helper.

---

## 5. Where each piece lives

| File | Change |
|---|---|
| `src/config/pestPackages.ts` | **new** — tiers, the feature × tier matrix, the switch-demo definitions, `SHOW_PRICES = false` and the price fields behind it |
| `src/i18n/pestControlMeta.ts` | **new** — path, title and description in both languages (kept small so `meta.ts` doesn't pull page copy into the main bundle, same as `mealPrepFeaturesMeta.ts`) |
| `src/i18n/pestControl.ts` | **new** — all page copy, EN + ES, Spanish flagged for review |
| `src/pages/PestControl.tsx` | **new** — the page |
| `src/components/FeatureSwitchDemo.tsx` | **new** — the interactive panel + preview |
| `src/components/PestPackages.tsx` | **new** — tier cards and the comparison table |
| `src/pageFiles.ts` | add `['/pest-control', 'PestControl']` |
| `src/i18n/meta.ts` | add the `SITE_ROUTES` entry with `lastmod` |
| `vercel.json` | add `/pest-control` and `/es/pest-control` rewrites (the i18n test requires them) |
| `src/components/GlobalHeader.tsx` | add "Pest Control" to `NAV_LINKS` |
| `src/i18n/common.ts` | add `nav.pestControl` in both languages |
| `src/components/GlobalFooter.tsx` | add it to the Services column |
| `src/i18n/home.ts` + `src/pages/Home.tsx` | new pest-control service card and its icon |
| `src/i18n/oneSourceCaseStudy.ts` + `src/pages/OneSourceCaseStudy.tsx` | "Features switch on as you grow" note linking `/pest-control` |
| `src/config/skunkworksProjects.ts` + `src/i18n/skunkworksProjects.ts` | add `feature-switches` (in use) and `digital-termite-contracts` (prototype / rolling out); review the `photo-diagnosis-quote` wording |
| `src/lib/analytics.ts` | add `pest_feature_toggled` and `pest_tier_cta` to `AnalyticsEvent` and widen `trackEvent`'s `extra` |
| `docs/alex-pest-packages.md` | **new** — suggested Retell prompt text, capability-based, no prices, routes pricing to the audit |

### Imagery

`public/portfolio/onesource/` already holds cleared assets the case study uses:
home hero, a service page, Pest Analyzer, Talk to Jess, the service-area map
(desktop + phone), and three **mock** admin screens (dashboard, staff readiness,
applicants pipeline). Those cover four of the six deep-dives.

Nothing exists for Settings › Features, the contract list, the audit packet or
renewals. Recommendation: **recreate those four in HTML/CSS** rather than
screenshot them — it keeps real customer data out of the question entirely,
renders correctly in both languages, stays sharp at any width, and costs nothing
in page weight. The switch demo is recreated UI already, so they'll match.

---

## 6. Decisions needed before step 2

1. **The demo's switch list.** Only five admin switches exist today; Spanish and
   Talk to Jess are chosen when we build, not toggled in Settings. Recommended:
   show the five real ones under "Admin › Settings › Features" and Spanish +
   Jess in a second group labelled "Chosen when we build", with the preview
   reacting to all seven. The alternative is five switches only.
2. **URL.** Recommended `/pest-control` (short, matches `/answering-service`;
   the keywords live in the title and H1). Alternative:
   `/pest-control-websites`.
3. **Tier order.** The meal-prep catalog uses Basic → Advanced → Pro. Pest
   control will use Basic → Pro → Advanced as briefed. Recommended: leave meal
   prep alone and accept the difference — they're separate products.
4. **AI phone answering in Advanced.** Recommended wording: a CG Strategic
   service sold alongside the platform, not a platform feature — the platform's
   assistant lives on the website.
5. **Recreated UI for the four missing screens** (item 5 above), rather than new
   screenshots.
