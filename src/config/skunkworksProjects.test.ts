import { describe, it, expect } from 'vitest';
import { SKUNKWORKS_PROJECTS, pilotLeadSource } from './skunkworksProjects';
import { MISSED_CALL_RESCUE_PATH } from './offers';
import copy from '../i18n/skunkworksProjects';

describe('SKUNKWORKS_PROJECTS', () => {
  it('keeps each project at its agreed status', () => {
    const statuses = Object.fromEntries(SKUNKWORKS_PROJECTS.map(p => [p.slug, p.status]));
    expect(statuses).toEqual({
      'missed-call-rescue': 'ready',
      'field-tech-voice-notes': 'concept',
      'ai-for-software-without-an-api': 'concept',
      'ask-your-business-anything': 'concept',
      'training-in-a-box': 'prototype',
      'ai-search-visibility-monitor': 'concept',
      'photo-diagnosis-quote': 'in-use',
      'feature-switches': 'ready',
      'digital-termite-contracts': 'ready',
      'bilingual-voice-agent': 'ready',
      'proposal-autopilot': 'concept',
    });
  });

  it('only links to pages on this site', () => {
    for (const p of SKUNKWORKS_PROJECTS) {
      if (p.link) expect(p.link.to).toMatch(/^\/[a-z0-9/-]+$/);
    }
  });

  it('sends the Missed-Call Rescue card to the offer page', () => {
    // The one project here a visitor can buy, so the card links to the offer
    // rather than to the calculator — and its label has to name that page, not
    // the calculator it used to open (src/i18n/skunkworksProjects.ts).
    const project = SKUNKWORKS_PROJECTS.find(p => p.slug === 'missed-call-rescue');
    expect(project?.link?.to).toBe(MISSED_CALL_RESCUE_PATH);
    for (const lang of ['en', 'es'] as const) {
      expect(copy[lang].projects['missed-call-rescue'].linkLabel, lang).toContain('Missed-Call Rescue');
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
