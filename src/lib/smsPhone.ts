// A2P 10DLC: consent to texts only means something if it's attached to a
// number, so the mobile number is optional unless a text message box is ticked.

export const SMS_PHONE_REQUIRED_MESSAGE =
  'Please enter your mobile phone number so we can text you, or uncheck the text message boxes.';

/** The inline error for the phone field, or '' when the combination is fine. */
export function smsPhoneError(phone: string, wantsTexts: boolean): string {
  return wantsTexts && !phone.trim() ? SMS_PHONE_REQUIRED_MESSAGE : '';
}
