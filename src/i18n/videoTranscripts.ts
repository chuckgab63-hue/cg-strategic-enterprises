// The spoken words of every narrated clip, as plain paragraphs.
//
// Taken verbatim from the .vtt caption files in public/videos, one entry per
// cue, timings stripped. They are duplicated here rather than parsed at run
// time because a watch page has to render its transcript into the
// pre-rendered HTML: a crawler that reads the page without running
// JavaScript is most of the reason these pages exist, and it will not fetch
// a .vtt to find the words.
//
// Regenerate rather than hand-edit, so the captions a viewer reads and the
// transcript a crawler reads stay the same words.
//
// The two vertical reels have no .vtt: their words are on-screen text, not
// narration, so their transcripts live in src/i18n/videoPages.ts beside the
// rest of that page's copy.

export const TRANSCRIPTS = {
  /** 10 cues, verbatim from missed-call-rescue-hero.en.vtt */
  missedCallRescueEn: [
    "You're on a job. Under a sink, up on a roof, behind a mower. The phone rings, and that customer calls the next company on the list.",
    "Missed-Call Rescue fixes that. When you can't pick up, an AI receptionist answers for you, day or night.",
    "It greets callers with your business name, sounds like a friendly front desk, and speaks English or Spanish.",
    "It asks what you would: what they need, where they are, how soon, and the best number to call back.",
    "Then it texts you the lead: who called, what they need, and how urgent, while you're still on the job.",
    "Every call is logged in one place, so nothing slips through the cracks.",
    "You keep your number. We set it up, test it with you, and it's live in 14 days.",
    "$497 to set up, $149 a month, cancel anytime.",
    "Want to hear it? Call (904) 822-8929, and Alex, our own AI receptionist, will answer.",
    "Missed-Call Rescue, from CG Strategic. Visit cgstrategic.dev.",
  ],
  /** 10 cues, verbatim from missed-call-rescue-hero-es.es.vtt */
  missedCallRescueEs: [
    "Usted está en un trabajo: debajo de un fregadero, en un techo, detrás de una podadora. Suena el teléfono, y ese cliente llama a la siguiente empresa de la lista.",
    "Missed-Call Rescue resuelve eso. Cuando usted no puede contestar, una recepcionista con inteligencia artificial contesta por usted, de día o de noche.",
    "Saluda con el nombre de su negocio, suena como una recepción amable, y habla inglés o español.",
    "Pregunta lo mismo que usted preguntaría: qué necesitan, dónde están, para cuándo, y el mejor número para devolver la llamada.",
    "Luego le envía el cliente potencial por mensaje de texto: quién llamó, qué necesita y qué tan urgente es, mientras usted sigue trabajando.",
    "Cada llamada queda registrada en un solo lugar, para que nada se le escape.",
    "Usted conserva su número. Nosotros lo instalamos, lo probamos con usted, y queda funcionando en 14 días.",
    "$497 de instalación, $149 al mes, y puede cancelar cuando quiera.",
    "¿Quiere escucharlo? Llame al (904) 822-8929, y Alex, nuestra propia recepcionista con IA, le contestará.",
    "Missed-Call Rescue, de CG Strategic. Visite cgstrategic.dev.",
  ],
  /** 13 cues, verbatim from mealprep-demo-hero.en.vtt */
  mealPrepEn: [
    "Running meal prep out of your DMs? Here's what it looks like with a real ordering system.",
    "This is a demo storefront, set up with your name, your logo and your colors.",
    "Customers browse this week's menu, with a live countdown to your order cutoff. No more \"am I too late?\" messages.",
    "Every meal shows its macros and portion sizes, so people can order without asking you a single question.",
    "They tap add, and the cart, the totals and the free-delivery bar update instantly.",
    "Customers can sign up for a weekly plan, then skip, pause or cancel on their own, before your deadline.",
    "Delivery or pickup, coupons and gift cards, and payments go straight to your own payment account.",
    "On your side, every order lands in one list. No screenshots, no spreadsheets.",
    "When the cutoff hits, your prep list and shopping list are already built.",
    "Nutrition labels for the whole week print in one click.",
    "Delivery routes come out in stop order, ready for Google Maps.",
    "And you can finally see your revenue, your repeat customers and your best sellers.",
    "Want this for your business? Visit cgstrategic.dev, or call (904) 822-8929.",
  ],
  /** 13 cues, verbatim from mealprep-demo-hero-es.es.vtt */
  mealPrepEs: [
    "¿Maneja su negocio de comidas preparadas por mensajes directos? Así se ve con un sistema de pedidos de verdad.",
    "Esta es una tienda de demostración, con su nombre, su logo y sus colores.",
    "Sus clientes ven el menú de la semana, con una cuenta regresiva hasta su hora límite de pedidos. Se acabaron los mensajes de \"¿todavía llego a tiempo?\".",
    "Cada platillo muestra sus macros y tamaños de porción, para que puedan pedir sin tener que preguntarle nada.",
    "Tocan agregar, y el carrito, los totales y la barra de envío gratis se actualizan al instante.",
    "Pueden suscribirse a un plan semanal y luego saltar una semana, pausar o cancelar por su cuenta, antes de su fecha límite.",
    "Entrega a domicilio o recogida, cupones y tarjetas de regalo, y los pagos van directo a su propia cuenta.",
    "Del lado suyo, todos los pedidos llegan a una sola lista. Sin capturas de pantalla, sin hojas de cálculo.",
    "Cuando llega la hora límite, su lista de preparación y su lista de compras ya están listas.",
    "Las etiquetas nutricionales de toda la semana se imprimen con un solo clic.",
    "Las rutas de entrega salen en orden de parada, listas para Google Maps.",
    "Y por fin puede ver sus ingresos, sus clientes que repiten y sus platillos más vendidos.",
    "¿Quiere esto para su negocio? Visite cgstrategic.dev o llame al (904) 822-8929.",
  ],
  /** 12 cues, verbatim from lawn-tour-hero.en.vtt */
  lawnEn: [
    "Your yard work speaks for itself. Your website should too.",
    "This is By The C of Jax, a Northeast Florida lawn care and landscaping company, and the site we built for them.",
    "Separate paths for homeowners and commercial properties, so every visitor lands in the right place.",
    "Lawn maintenance, weed control and landscape design each get their own page, written for local search.",
    "A projects gallery shows off their best work.",
    "Duval, St. Johns, Clay and Nassau counties, clearly mapped.",
    "A free quote form makes it easy to ask for an estimate.",
    "William, the AI voice assistant, answers questions any time of day.",
    "And with one tap, the whole site switches to Spanish.",
    "Behind the scenes, role-based logins for owners, managers and staff handle hiring and onboarding.",
    "Every service and feature can be switched on or off from admin settings.",
    "Want this for your business? Visit cgstrategic.dev, or call (904) 822-8929.",
  ],
  /** 11 cues, verbatim from pest-tour-hero.en.vtt */
  pestEn: [
    "Your customers are searching for pest control right now. Here's what they find when your website actually works for you.",
    "This is One Source Total Pest Control, a real Jacksonville company, and the site we built for them.",
    "Every service gets its own page, written for local search: termites, mosquitoes, rodents, lawn pests and more.",
    "A pest library answers the questions customers ask before they call.",
    "With the Pest Analyzer, customers upload a photo and get an instant first guess at what they're dealing with.",
    "Jess, the AI voice assistant, answers questions day or night, so you never miss a lead.",
    "A ZIP code checker tells visitors right away whether you serve their area.",
    "Hiring? A careers page and apply flow bring applicants straight to you.",
    "Behind the scenes, the admin area tracks staff licensing, training and new applicants, with a daily digest.",
    "Training is logged and verified, so you always know which techs are ready for their own route.",
    "Want this for your business? Visit cgstrategic.dev, or call (904) 822-8929.",
  ],
} as const;
