// Projects listed under "What we're building next" on /skunkworks.
// Statuses are deliberate: don't upgrade one until it's true. No metrics,
// results, client names or launch dates here (the One Source link is the
// existing public case study).

export type ProjectStatus = 'concept' | 'prototype' | 'in-use';

export const STATUS_INFO: Record<ProjectStatus, { label: string; meaning: string }> = {
  concept: { label: 'Concept', meaning: "An idea we're designing." },
  prototype: { label: 'Prototype', meaning: 'Working internally or in a pilot.' },
  'in-use': { label: 'In use with a client', meaning: 'Running in production.' },
};

export interface SkunkworksProject {
  slug: string;
  title: string;
  hook: string;
  description: string;
  builtOn: string[];
  status: ProjectStatus;
  note?: string;
  link?: { to: string; label: string };
}

export const SKUNKWORKS_PROJECTS: SkunkworksProject[] = [
  {
    slug: 'missed-call-rescue',
    title: 'Missed-Call Rescue',
    hook: 'Every missed call gets a callback within seconds.',
    description:
      'When a business misses a call, an AI assistant calls or texts the caller back within seconds. It finds out what they need and books them in, before they move on to the next company on the list.',
    builtOn: ['Retell AI', 'Twilio', 'Make.com'],
    status: 'prototype',
    note: 'Texting depends on carrier (A2P) approval.',
  },
  {
    slug: 'field-tech-voice-notes',
    title: 'Field Tech Voice Notes',
    hook: 'Talk through the job. The paperwork writes itself.',
    description:
      'After a job, technicians speak into their phone. AI turns the recording into structured job notes, a chemical-use log and a customer summary for the CRM. It is hands-free, so it works for people wearing gloves.',
    builtOn: ['Speech-to-text', 'LLMs', 'CRM integrations'],
    status: 'concept',
  },
  {
    slug: 'ai-for-software-without-an-api',
    title: 'AI for Software Without an API',
    hook: "Automation for the tools that won't connect to anything.",
    description:
      'Some business software has no API or webhooks, so nothing can plug into it. A browser agent logs in and handles routine tasks the way a person would: exporting reports, updating records and pulling invoices.',
    builtOn: ['Browser automation agents'],
    status: 'concept',
  },
  {
    slug: 'ask-your-business-anything',
    title: 'Ask Your Business Anything',
    hook: 'Plain-English questions, answered from your own data.',
    description:
      'Owners ask questions like “How many termite jobs did we do in September?” or “Whose licenses expire this quarter?” and get answers drawn from their own records, without building a report.',
    builtOn: ['Supabase / Postgres', 'LLMs'],
    status: 'concept',
  },
  {
    slug: 'training-in-a-box',
    title: 'Training in a Box',
    hook: 'A short script becomes a complete lesson.',
    description:
      'Write a short script and get back an AI-presented video lesson, a quiz and progress tracking, for onboarding new hires or exam prep. For example, a five-minute lesson on ladder safety with a ten-question quiz.',
    builtOn: ['AI video (HeyGen)', 'Google Forms', 'Supabase'],
    status: 'prototype',
  },
  {
    slug: 'ai-search-visibility-monitor',
    title: 'AI Search Visibility Monitor',
    hook: 'Find out whether AI assistants recommend you.',
    description:
      'Tracks whether ChatGPT, Claude, Gemini and Google’s AI answers mention a local business when people ask them for recommendations. Where they don’t, it suggests fixes.',
    builtOn: ['LLM APIs', 'Scheduled checks'],
    status: 'concept',
  },
  {
    slug: 'photo-diagnosis-quote',
    title: 'Photo → Diagnosis → Quote',
    hook: 'A customer’s photo becomes a ready-to-quote lead.',
    description:
      'A customer uploads a photo of a pest or problem, AI makes a first-guess identification, and the lead arrives with the photo and a suggested service. We first built it as a pest analyzer; the same pattern works for plumbing, roofing and more.',
    builtOn: ['Google Gemini', 'Make.com'],
    status: 'in-use',
    link: { to: '/work/one-source-total-pest-control', label: 'Read the One Source case study' },
  },
  {
    slug: 'bilingual-voice-agent',
    title: 'Bilingual Voice Agent',
    hook: 'English or Spanish, without “press 2.”',
    description:
      'An AI assistant for phone and web that switches between English and Spanish automatically, so callers can use whichever language they’re comfortable in.',
    builtOn: ['Retell AI'],
    status: 'concept',
  },
  {
    slug: 'proposal-autopilot',
    title: 'Proposal Autopilot',
    hook: 'From discovery call to draft proposal.',
    description:
      'A recorded discovery call becomes a requirements summary, a scope and a draft proposal, so clients get a clear plan faster.',
    builtOn: ['Transcription', 'LLMs', 'Document generation'],
    status: 'concept',
  },
];

/** The contact-form `source` for a pilot inquiry, e.g. "skunkworks-missed-call-rescue". */
export const pilotLeadSource = (slug: string) => `skunkworks-${slug}`;
