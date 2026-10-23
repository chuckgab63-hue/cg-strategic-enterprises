// What the Website Check reads from a site's homepage HTML. Plain pattern
// matching over the raw HTML, no DOM: it runs in a Vercel function and has to
// cope with any markup. It only sees the HTML the server sends, so content a
// site builds with JavaScript after loading isn't visible (see contentLimited).

export interface HtmlChecks {
  https: boolean;
  title: { present: boolean; text: string; length: number };
  metaDescription: { present: boolean; length: number };
  h1: { count: number; single: boolean };
  viewport: boolean;
  structuredData: { present: boolean; types: string[] };
  telLink: boolean;
  contactForm: boolean;
  booking: { present: boolean; tools: string[] };
  chatWidget: { present: boolean; tools: string[] };
  afterHours: { present: boolean; evidence: string[] };
  /** Very little text in the HTML: the page is probably built by JavaScript, so other checks may miss things. */
  contentLimited: boolean;
}

// Tools are matched against URLs and script sources anywhere in the HTML.
const BOOKING_TOOLS: [string, RegExp][] = [
  ['Calendly', /calendly\.com/i],
  ['Acuity Scheduling', /acuityscheduling\.com|as\.me\//i],
  ['Square Appointments', /squareup\.com\/appointments|square\.site\/book|book\.squareup\.com/i],
  ['Cal.com', /\bcal\.com\//i],
  ['Housecall Pro', /housecallpro\.com/i],
  ['Jobber', /getjobber\.com|clienthub\.getjobber/i],
  ['ServiceTitan', /servicetitan\.com/i],
  ['Setmore', /setmore\.com/i],
  ['SimplyBook.me', /simplybook\.(me|it)/i],
  ['Booksy', /booksy\.com/i],
  ['Vagaro', /vagaro\.com/i],
  ['Mindbody', /mindbodyonline\.com|mindbody\.io/i],
  ['Fresha', /fresha\.com/i],
  ['Zocdoc', /zocdoc\.com/i],
  ['OpenTable', /opentable\.com/i],
  ['Resy', /resy\.com/i],
  ['Tock', /exploretock\.com/i],
  ['GoHighLevel / LeadConnector', /leadconnectorhq\.com\/widget\/(booking|bookings|appointment)|msgsndr\.com\/widget\/booking/i],
  ['HubSpot Meetings', /meetings\.hubspot\.com/i],
  ['Microsoft Bookings', /outlook\.office365\.com\/owa\/calendar|bookings\.cloud\.microsoft/i],
  ['Google Calendar booking', /calendar\.app\.google|calendar\.google\.com\/calendar\/appointments/i],
  ['Thryv', /thryv\.com/i],
  ['Booking page', /href=["'][^"']*\/(book-online|book-now|booking|schedule-online|schedule-service|appointments?)\/?["'?#]/i],
];

const CHAT_TOOLS: [string, RegExp][] = [
  ['Intercom', /widget\.intercom\.io|intercomcdn\.com/i],
  ['Drift', /js\.driftt\.com|drift\.com\/include/i],
  ['Tidio', /code\.tidio\.co/i],
  ['LiveChat', /cdn\.livechatinc\.com/i],
  ['Crisp', /client\.crisp\.chat/i],
  ['tawk.to', /embed\.tawk\.to/i],
  ['HubSpot chat', /js\.hs-scripts\.com|js\.usemessages\.com/i],
  ['Zendesk chat', /static\.zdassets\.com|v2\.zopim\.com/i],
  ['Olark', /static\.olark\.com/i],
  ['Freshchat', /wchat\.freshchat\.com|fw-cdn\.com/i],
  ['Podium', /connect\.podium\.com|podium\.com\/widget/i],
  ['Birdeye', /birdeye\.com\/embed|birdeye\.com\/widget/i],
  ['Smith.ai', /smith\.ai/i],
  ['Ruby', /ruby\.com\/chat/i],
  ['GoHighLevel / LeadConnector chat', /leadconnectorhq\.com\/(loader|chat-widget)|widgets\.leadconnectorhq\.com/i],
  ['Facebook Messenger', /connect\.facebook\.net\/[^"']*\/sdk\/xfbml\.customerchat/i],
  ['WhatsApp', /wa\.me\/|api\.whatsapp\.com\/send/i],
  ['Vapi voice agent', /vapi\.ai/i],
  ['Retell voice agent', /retellai\.com/i],
  ['ElevenLabs voice agent', /elevenlabs\.io\/convai|elevenlabs-convai/i],
  ['Bland voice agent', /bland\.ai/i],
  ['Chatbase', /chatbase\.co/i],
  ['Voiceflow', /voiceflow\.com/i],
  ['Botpress', /botpress\.(cloud|com)/i],
  ['Gorgias', /gorgias\.chat/i],
  ['Chat widget', /<[^>]+(id|class)=["'][^"']*(chat-widget|chatwidget|livechat|live-chat)[^"']*["']/i],
];

// Signs a visitor can reach the business, or a person/agent, outside office hours.
const AFTER_HOURS_PATTERNS: [string, RegExp][] = [
  ['24/7', /\b24\s*\/\s*7\b|\b24-7\b|\b24x7\b/i],
  ['24 hours', /\b24[\s-]*hours?\b|\b24[\s-]*hr\b|open around the clock|round[\s-]the[\s-]clock/i],
  ['after hours', /\bafter[\s-]*hours?\b|\bevenings? and weekends\b|\bnights? and weekends\b/i],
  ['emergency service', /\bemergency (service|repair|line|call|response|plumb|hvac|electric)/i],
  ['Spanish: 24 horas', /\b24 horas\b|\blas 24 horas\b|fuera de horario|servicio de emergencia/i],
];

const ORG_TYPES = /^(Organization|Corporation|LocalBusiness|ProfessionalService|HomeAndConstructionBusiness|.*(Business|Store|Service|Contractor|Clinic|Practice|Restaurant|Agency|Office|Plumber|Electrician|Locksmith|Dentist|Physician|Attorney|Notary|Roofer|Painter|Hotel|Salon|Shop|Center|Company))$/;
// Common LocalBusiness subtypes that don't share a suffix.
const ORG_EXTRA = new Set([
  'Restaurant', 'Dentist', 'Physician', 'Attorney', 'Plumber', 'Electrician', 'HVACBusiness', 'RoofingContractor',
  'GeneralContractor', 'HousePainter', 'Locksmith', 'MovingCompany', 'PestControl', 'AutoRepair', 'AutoDealer',
  'BeautySalon', 'HairSalon', 'NailSalon', 'DaySpa', 'HealthClub', 'ExerciseGym', 'VeterinaryCare', 'Bakery',
  'CafeOrCoffeeShop', 'BarOrPub', 'LegalService', 'AccountingService', 'FinancialService', 'InsuranceAgency',
  'RealEstateAgent', 'TravelAgency', 'ChildCare', 'DryCleaningOrLaundry', 'MedicalClinic', 'Optician',
  'Pharmacy', 'Hospital', 'LodgingBusiness', 'Hotel', 'Store', 'NGO', 'EducationalOrganization',
]);

function isOrgType(type: string): boolean {
  // A bare "Service" is something a business offers, not the business.
  return ORG_EXTRA.has(type) || (type !== 'Service' && ORG_TYPES.test(type));
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

/** Attributes of one tag: <meta name="x" content='y'> -> { name: 'x', content: 'y' }. Names lowercased. */
function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    out[m[1].toLowerCase()] = decodeEntities(m[3] ?? m[4] ?? m[5] ?? '');
  }
  return out;
}

function collectTypes(node: unknown, into: Set<string>, depth = 0) {
  if (depth > 8 || node === null || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const item of node) collectTypes(item, into, depth + 1);
    return;
  }
  const obj = node as Record<string, unknown>;
  const type = obj['@type'];
  for (const t of Array.isArray(type) ? type : [type]) {
    if (typeof t === 'string') into.add(t.replace(/^https?:\/\/schema\.org\//, ''));
  }
  for (const value of Object.values(obj)) collectTypes(value, into, depth + 1);
}

function matchTools(haystack: string, tools: [string, RegExp][]): string[] {
  return tools.filter(([, re]) => re.test(haystack)).map(([name]) => name);
}

export function checkHtml(rawHtml: string, finalUrl: URL): HtmlChecks {
  const html = rawHtml.replace(/<!--[\s\S]*?-->/g, '');

  // Structured data first, before scripts are stripped.
  const types = new Set<string>();
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectTypes(JSON.parse(m[1].trim()), types);
    } catch {
      // Broken JSON-LD doesn't count.
    }
  }
  for (const m of html.matchAll(/itemtype\s*=\s*["']https?:\/\/schema\.org\/([A-Za-z]+)["']/gi)) types.add(m[1]);
  const orgTypes = [...types].filter(isOrgType);

  // The markup without scripts and styles, for headings and visible text.
  const markup = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template>/gi, ' ');
  const text = decodeEntities(markup.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? decodeEntities(titleMatch[1]).replace(/\s+/g, ' ').trim() : '';

  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]));
  const metaNamed = (name: string) => metas.find(a => (a.name ?? '').toLowerCase() === name);
  const description = (metaNamed('description')?.content ?? '').trim();
  const viewport = (metaNamed('viewport')?.content ?? '').toLowerCase();

  const h1Count = (markup.match(/<h1\b/gi) ?? []).length;

  const hrefs = [...html.matchAll(/\bhref\s*=\s*["']([^"']*)["']/gi)].map(m => m[1].trim());
  const telLink = hrefs.some(h => /^tel:\s*\+?[\d(]/i.test(h));

  // A form that asks for contact details, or an embedded form tool.
  const forms = [...markup.matchAll(/<form\b[\s\S]*?(<\/form>|$)/gi)].map(m => m[0]);
  const contactForm = forms.some(f =>
    /<textarea\b/i.test(f)
    || /<input\b[^>]*type\s*=\s*["']?(email|tel)\b/i.test(f)
    || /<input\b[^>]*name\s*=\s*["'][^"']*(email|phone|message)/i.test(f),
  ) || /jotform\.com|typeform\.com|hsforms\.(net|com)|js\.hsforms|formstack\.com|wufoo\.com|wpcf7|gform_wrapper|wpforms|ninja-forms|elementor-form|leadconnectorhq\.com\/widget\/form|form\.jotform|cognitoforms\.com|forms\.zohopublic|123formbuilder|tally\.so|fillout\.com|forms\.app/i.test(html);

  const booking = matchTools(html, BOOKING_TOOLS);
  const chat = matchTools(html, CHAT_TOOLS);

  const afterHours = AFTER_HOURS_PATTERNS.filter(([, re]) => re.test(text)).map(([label]) => label);
  // openingHours that cover the whole day count too.
  if (/"opens"\s*:\s*"00:00(:00)?"[^}]*"closes"\s*:\s*"23:59(:59)?"|Mo-Su\s*00:00-24:00|"openingHours"\s*:\s*"[^"]*24\/7/i.test(html)) {
    afterHours.push('open 24 hours (structured data)');
  }

  return {
    https: finalUrl.protocol === 'https:',
    title: { present: titleText.length > 0, text: titleText.slice(0, 200), length: titleText.length },
    metaDescription: { present: description.length > 0, length: description.length },
    h1: { count: h1Count, single: h1Count === 1 },
    viewport: viewport.includes('width=device-width'),
    structuredData: { present: orgTypes.length > 0, types: orgTypes.slice(0, 10) },
    telLink,
    contactForm,
    booking: { present: booking.length > 0, tools: booking },
    chatWidget: { present: chat.length > 0, tools: chat },
    afterHours: { present: afterHours.length > 0, evidence: afterHours },
    contentLimited: text.length < 200,
  };
}
