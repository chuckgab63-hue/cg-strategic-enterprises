import { describe, it, expect } from 'vitest';
import { smsPhoneError, SMS_PHONE_REQUIRED_MESSAGE } from './smsPhone';

describe('smsPhoneError', () => {
  it('leaves the phone optional when no text message box is ticked', () => {
    expect(smsPhoneError('', false)).toBe('');
    expect(smsPhoneError('904 555 0100', false)).toBe('');
  });

  it('requires a phone once a text message box is ticked', () => {
    expect(smsPhoneError('', true)).toBe(SMS_PHONE_REQUIRED_MESSAGE);
    expect(smsPhoneError('904 555 0100', true)).toBe('');
  });

  it('treats a whitespace-only phone as empty', () => {
    expect(smsPhoneError('   ', true)).toBe(SMS_PHONE_REQUIRED_MESSAGE);
  });
});
