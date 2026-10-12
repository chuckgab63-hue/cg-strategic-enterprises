import { describe, it, expect } from 'vitest';
// @ts-expect-error -- plain browser module served from public/, so it has no type declarations.
import { startCallOptions as untyped } from '../../public/alex-voice-options.js';

const startCallOptions = untyped as (data: unknown) => Record<string, unknown>;

describe('startCallOptions', () => {
  it('passes only the token (and call id) from a v2 response', () => {
    expect(startCallOptions({ access_token: 'tok', call_id: 'call_1', agent_id: 'a' })).toEqual({
      accessToken: 'tok',
      callId: 'call_1',
    });
    expect(startCallOptions({ access_token: 'tok' })).toEqual({ accessToken: 'tok' });
  });

  it('passes every connection field from a v3 response', () => {
    const iceServers = [{ urls: ['turn:turn.example.com:443'], username: 'u', credential: 'c' }];
    expect(
      startCallOptions({ call_id: 'call_2', access_token: 'tok', transport: 'gateway', ice_servers: iceServers }),
    ).toEqual({ accessToken: 'tok', callId: 'call_2', transport: 'gateway', iceServers });
  });

  it('leaves out empty or malformed optional fields', () => {
    expect(startCallOptions({ access_token: 'tok', call_id: '', transport: null, ice_servers: [] })).toEqual({
      accessToken: 'tok',
    });
    expect(startCallOptions({ access_token: 'tok', transport: 42, ice_servers: 'turn:x' })).toEqual({
      accessToken: 'tok',
    });
  });

  it('throws when there is no access token', () => {
    expect(() => startCallOptions({})).toThrow('no access token returned');
    expect(() => startCallOptions(null)).toThrow('no access token returned');
  });
});
