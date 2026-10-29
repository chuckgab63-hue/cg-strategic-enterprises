// /search-ai-visibility: the Search & AI Visibility service page. The cards
// moved here from /portfolio unchanged; the closing "Talk to Alex" box is new.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md). The `alex` box is new, not yet reviewed.

export const SEARCH_AI_VISIBILITY_PATH = '/search-ai-visibility';

const en = {
  tag: 'Search & AI Visibility',
  heading: ['Get Found.', 'Then Get Chosen.'],
  intro: "Ads rent attention. Search visibility builds it. We set up the technical, local and AI-search foundations that help customers find you on Google, Bing, Maps and AI assistants, and we track what's working.",
  // Same order as CARD_ICONS in src/pages/SearchAiVisibility.tsx.
  cards: [
    {
      title: 'Technical SEO Foundation',
      body: 'XML sitemaps submitted to Google Search Console and Bing Webmaster Tools, clean page titles and descriptions, and structured data (FAQ schema) so search engines understand your pages.',
    },
    {
      title: 'Local Search & Maps',
      body: 'Google Business Profile setup and optimization, including service-area setup, categories, hours and weekly posts, plus Bing Places and Apple Business Connect, so you show up when locals search nearby.',
    },
    {
      title: 'Keyword-Driven Service Pages',
      body: 'We research what your customers actually type into search, then build pages around those exact phrases instead of guessing.',
    },
    {
      title: 'AI Search Visibility',
      body: "Clear, question-and-answer content and structured data help AI assistants like Copilot and ChatGPT understand and recommend your business. Bing's index also powers several AI search tools, so we optimize for it, not just Google.",
    },
    {
      title: 'Bilingual Reach',
      body: "English and Spanish versions of your key pages, so you're found by Florida's Spanish-speaking customers too.",
    },
    {
      title: 'Email That Lands in the Inbox',
      body: 'Domain authentication (SPF, DKIM and DMARC) so your follow-ups and quotes reach inboxes instead of spam folders, plus tracked links so you can see which campaigns bring visitors.',
    },
  ],
  closing: 'Same playbook we run on our own site. Want to see where you stand?',
  button: 'Run a free website check',
  alex: {
    title: 'Want help getting found?',
    body: 'Talk to Alex, our AI assistant, about where your business shows up today and what we would set up first. Alex can also book a free intro call with Chuck.',
    cta: 'Talk to Alex',
  },
};

const es: typeof en = {
  tag: 'Visibilidad en buscadores e IA',
  heading: ['Que lo encuentren.', 'Y que lo elijan.'],
  intro: 'Los anuncios alquilan la atención. La visibilidad en los buscadores la construye. Preparamos las bases técnicas, locales y de búsqueda con IA que ayudan a sus clientes a encontrarlo en Google, Bing, Maps y los asistentes de IA, y medimos lo que está funcionando.',
  cards: [
    {
      title: 'Bases técnicas de SEO',
      body: 'Mapas del sitio XML enviados a Google Search Console y Bing Webmaster Tools, títulos y descripciones de página claros y datos estructurados (esquema de preguntas frecuentes) para que los buscadores entiendan sus páginas.',
    },
    {
      title: 'Búsqueda local y mapas',
      body: 'Configuración y optimización de su Perfil de Empresa en Google, con su área de servicio, categorías, horario y publicaciones semanales, además de Bing Places y Apple Business Connect, para que aparezca cuando la gente de su zona busque cerca.',
    },
    {
      title: 'Páginas de servicios basadas en palabras clave',
      body: 'Investigamos lo que sus clientes realmente escriben en los buscadores y creamos páginas en torno a esas mismas frases, en lugar de adivinar.',
    },
    {
      title: 'Visibilidad en búsquedas con IA',
      body: 'El contenido claro de preguntas y respuestas y los datos estructurados ayudan a que asistentes de IA como Copilot y ChatGPT entiendan y recomienden su negocio. El índice de Bing también alimenta varias herramientas de búsqueda con IA, así que optimizamos para Bing, no solo para Google.',
    },
    {
      title: 'Alcance bilingüe',
      body: 'Versiones en inglés y en español de sus páginas principales, para que también lo encuentren los clientes hispanohablantes de Florida.',
    },
    {
      title: 'Correos que llegan a la bandeja de entrada',
      body: 'Autenticación de dominio (SPF, DKIM y DMARC) para que sus seguimientos y cotizaciones lleguen a la bandeja de entrada y no a la carpeta de spam, además de enlaces con seguimiento para que vea qué campañas le traen visitas.',
    },
  ],
  closing: 'La misma estrategia que usamos en nuestro propio sitio. ¿Quiere saber cómo está el suyo?',
  button: 'Haga una revisión gratuita de su sitio',
  alex: {
    title: '¿Quiere ayuda para que lo encuentren?',
    body: 'Hable con Alex, nuestro asistente de IA, sobre dónde aparece hoy su negocio y qué prepararíamos primero. Alex también puede agendar una llamada introductoria gratuita con Chuck.',
    cta: 'Hablar con Alex',
  },
};

export default { en, es };
