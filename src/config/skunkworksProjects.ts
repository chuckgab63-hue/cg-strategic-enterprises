// Projects listed under "What we're building next" on /skunkworks.
// Statuses are deliberate: don't upgrade one until it's true. No metrics,
// results, client names or launch dates here (the One Source link is the
// existing public case study). Each project's display text, in English and
// Spanish, lives in src/i18n/skunkworksProjects.ts under the same slug.
//
// 'ready' and 'in-use' are the shared statuses from src/config/featureStatus.ts,
// so a project labelled here reads the same as the matching feature on
// /pest-control. 'concept' and 'prototype' belong to this page alone.

export type ProjectStatus = 'concept' | 'prototype' | 'ready' | 'in-use';

export interface SkunkworksProject {
  slug: string;
  status: ProjectStatus;
  /** An internal page; its label is in the dictionary. */
  link?: { to: string };
}

export const SKUNKWORKS_PROJECTS: SkunkworksProject[] = [
  { slug: 'missed-call-rescue', status: 'prototype', link: { to: '/missed-call-calculator' } },
  { slug: 'field-tech-voice-notes', status: 'concept' },
  { slug: 'ai-for-software-without-an-api', status: 'concept' },
  { slug: 'ask-your-business-anything', status: 'concept' },
  { slug: 'training-in-a-box', status: 'prototype' },
  { slug: 'ai-search-visibility-monitor', status: 'concept' },
  { slug: 'photo-diagnosis-quote', status: 'in-use', link: { to: '/work/one-source-total-pest-control' } },
  // Ready, not in-use: all three are built, deployed and working in the
  // platform, and each is switched on for a client on the day they are ready.
  // They go to 'in-use' the day a client is running their business on one, and
  // not before.
  { slug: 'feature-switches', status: 'ready', link: { to: '/pest-control' } },
  { slug: 'digital-termite-contracts', status: 'ready', link: { to: '/pest-control' } },
  { slug: 'bilingual-voice-agent', status: 'ready' },
  { slug: 'proposal-autopilot', status: 'concept' },
];

/** The contact-form `source` for a pilot inquiry, e.g. "skunkworks-missed-call-rescue". */
export const pilotLeadSource = (slug: string) => `skunkworks-${slug}`;
