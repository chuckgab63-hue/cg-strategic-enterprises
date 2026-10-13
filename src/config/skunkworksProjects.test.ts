import { describe, it, expect } from 'vitest';
import { SKUNKWORKS_PROJECTS, pilotLeadSource } from './skunkworksProjects';
import copy from '../i18n/skunkworksProjects';

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

  it('has text for every project in both languages, and no extras', () => {
    const slugs = SKUNKWORKS_PROJECTS.map(p => p.slug).sort();
    for (const lang of ['en', 'es'] as const) {
      expect(Object.keys(copy[lang].projects).sort(), lang).toEqual(slugs);
      for (const p of SKUNKWORKS_PROJECTS) {
        const text = copy[lang].projects[p.slug];
        expect(text.title && text.hook && text.description, `${lang} ${p.slug}`).toBeTruthy();
        expect(Boolean(text.linkLabel), `${lang} ${p.slug} link label`).toBe(Boolean(p.link));
      }
    }
  });
});

describe('pilotLeadSource', () => {
  it('tags pilot inquiries by project slug', () => {
    expect(pilotLeadSource('missed-call-rescue')).toBe('skunkworks-missed-call-rescue');
  });
});
