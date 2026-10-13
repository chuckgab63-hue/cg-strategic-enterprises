import { describe, it, expect } from 'vitest';
// @ts-expect-error -- plain browser module served from public/, so it has no type declarations.
import { ALEX_STRINGS } from '../../public/alex-voice-strings.js';
import alex from './alex';

describe('Alex call button label', () => {
  it('matches what alex-voice.js writes in each language', () => {
    expect(alex.en.callButton).toBe(ALEX_STRINGS.en.labels.idle);
    expect(alex.es.callButton).toBe(ALEX_STRINGS.es.labels.idle);
  });

  it('has every message in both languages', () => {
    expect(Object.keys(ALEX_STRINGS.es.messages).sort()).toEqual(Object.keys(ALEX_STRINGS.en.messages).sort());
    expect(Object.keys(ALEX_STRINGS.es.labels).sort()).toEqual(Object.keys(ALEX_STRINGS.en.labels).sort());
  });

  it('never implies Alex speaks Spanish', () => {
    expect(ALEX_STRINGS.es.labels.idle).toContain('en inglés');
  });
});
