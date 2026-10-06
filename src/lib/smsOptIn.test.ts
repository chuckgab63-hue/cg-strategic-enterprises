import { describe, it, expect, vi, afterEach } from 'vitest';
import { processOptIn, PHONE_PATTERN, SMS_OPT_IN_SOURCE, SMS_OPT_IN_THANKS_PATH } from './smsOptIn';
import { SMS_CONSENT_TEXT } from '../config/site';
import { SMS_PHONE_REQUIRED_MESSAGE } from './smsPhone';
import { CONTACT_WEBHOOK_URL } from '../config/webhooks';
import handler from '../../api/sms-opt-in';

const NOW = new Date('2026-10-06T12:00:00.000Z');
const VALID = {
  first_name: ' Ada ', last_name: 'Lovelace', email: 'ada@example.com',
  phone: '(904) 555-0100', message: 'Hello', sms_consent: 'yes',
};

describe('processOptIn', () => {
  it('builds the same payload shape ContactForm sends', () => {
    expect(processOptIn(VALID, NOW)).toEqual({
      kind: 'ok',
      payload: {
        first_name: 'Ada', last_name: 'Lovelace', name: 'Ada Lovelace',
        email: 'ada@example.com', message: 'Hello', phone: '(904) 555-0100',
        source: SMS_OPT_IN_SOURCE,
        sms_consent: true, sms_consent_text: SMS_CONSENT_TEXT,
        sms_consent_timestamp: '2026-10-06T12:00:00.000Z',
        sms_marketing_consent: false, email_marketing_consent: false,
      },
    });
  });

  it('leaves the phone optional and omits the timestamp without consent', () => {
    const { sms_consent: _, ...noConsent } = VALID;
    const result = processOptIn({ ...noConsent, phone: '' }, NOW);
    expect(result.kind).toBe('ok');
    if (result.kind !== 'ok') return;
    expect(result.payload.sms_consent).toBe(false);
    expect(result.payload).not.toHaveProperty('sms_consent_timestamp');
  });

  it('requires a phone once the consent box is ticked', () => {
    expect(processOptIn({ ...VALID, phone: '  ' })).toEqual({ kind: 'invalid', errors: [SMS_PHONE_REQUIRED_MESSAGE] });
  });

  it('rejects malformed phones, blank names and bad emails', () => {
    const result = processOptIn({ ...VALID, first_name: '   ', email: 'nope', phone: '555-01' });
    expect(result.kind).toBe('invalid');
    if (result.kind !== 'invalid') return;
    expect(result.errors).toHaveLength(3);
  });

  it('flags anything in the honeypot as spam', () => {
    expect(processOptIn({ ...VALID, website: 'http://spam.example' })).toEqual({ kind: 'spam' });
  });

  it('uses the first copy of a repeated field', () => {
    const result = processOptIn({ ...VALID, email: ['ada@example.com', 'other@example.com'] });
    expect(result.kind === 'ok' && result.payload.email).toBe('ada@example.com');
  });
});

describe('PHONE_PATTERN', () => {
  // Browsers compile `pattern` attributes with the v flag, anchored.
  const re = new RegExp(`^(?:${PHONE_PATTERN})$`, 'v');

  it.each(['9045550100', '(904) 555-0100', '904-555-0100', '904.555.0100', '+1 904 555 0100', '1-904-555-0100'])(
    'accepts %s', phone => expect(re.test(phone)).toBe(true),
  );
  it.each(['555-0100', '904555010', 'call me', '904-555-0100 ext 2'])(
    'rejects %s', phone => expect(re.test(phone)).toBe(false),
  );
});

function mockRes() {
  const res = {
    statusCode: 0, headers: {} as Record<string, string>, body: '',
    setHeader(name: string, value: string) { res.headers[name.toLowerCase()] = value; },
    end(body = '') { res.body = body; },
  };
  return res;
}

describe('api/sms-opt-in', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('forwards a valid submission to the contact webhook as JSON and redirects', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    const res = mockRes();
    await handler({ method: 'POST', body: VALID }, res);

    expect(res.statusCode).toBe(303);
    expect(res.headers.location).toBe(SMS_OPT_IN_THANKS_PATH);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(CONTACT_WEBHOOK_URL);
    expect(init.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(init.body)).toMatchObject({ sms_consent: true, sms_consent_text: SMS_CONSENT_TEXT, source: SMS_OPT_IN_SOURCE });
  });

  it('pretends honeypot hits succeeded without calling the webhook', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = mockRes();
    await handler({ method: 'POST', body: { ...VALID, website: 'x' } }, res);

    expect(res.statusCode).toBe(303);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows the problems on an invalid submission', async () => {
    vi.stubGlobal('fetch', vi.fn());
    const res = mockRes();
    await handler({ method: 'POST', body: { ...VALID, phone: '' } }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toContain(SMS_PHONE_REQUIRED_MESSAGE);
  });

  it('reports a webhook failure instead of claiming success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = mockRes();
    await handler({ method: 'POST', body: VALID }, res);

    expect(res.statusCode).toBe(502);
  });

  it('rejects GET', async () => {
    const res = mockRes();
    await handler({ method: 'GET' }, res);
    expect(res.statusCode).toBe(405);
  });
});
