import { describe, it, expect } from 'vitest';
import { SKUNKWORKS_PROJECTS, pilotLeadSource } from './skunkworksProjects';

describe('SKUNKWORKS_PROJECTS', () => {
  it('keeps each project at its agreed status', () => {
    const statuses = Object.fromEntries(SKUNKWORKS_PROJECTS.map(p => [p.slug, p.status]));
    expect(statuses).toEqual({
      'missed-call-rescue': 'prototype',
      'field-tech-voice-notes': 'concept',
      'ai-for-software-without-an-api': 'concept',
      'ask-your-business-anything': 'concept',
      'training-in-a-box': 'prototype',
      'ai-search-visibility-monitor': 'concept',
      'photo-diagnosis-quote': 'in-use',
      'bilingual-voice-agent': 'concept',
      'proposal-autopilot': 'concept',
    });
  });

  it('only links to pages on this site', () => {
    for (const p of SKUNKWORKS_PROJECTS) {
      if (p.link) expect(p.link.to).toMatch(/^\/[a-z0-9/-]+$/);
    }
  });
});

describe('pilotLeadSource', () => {
  it('tags pilot inquiries by project slug', () => {
    expect(pilotLeadSource('missed-call-rescue')).toBe('skunkworks-missed-call-rescue');
  });
});
