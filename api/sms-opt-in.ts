import { CONTACT_WEBHOOK_URL } from '../src/config/webhooks.js';
import {
  processOptIn, renderProblemPage, SMS_OPT_IN_THANKS_PATH,
} from '../src/lib/smsOptIn.js';

// Receives the plain HTML form on /sms-opt-in.html and forwards it to the same
// Make scenario as the React contact form. See src/lib/smsOptIn.ts for why.

function sendHtml(res: any, status: number, html: string) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
}

function redirectToThanks(res: any) {
  // 303 so a refresh on the thank-you page doesn't resubmit the form.
  res.statusCode = 303;
  res.setHeader('Location', SMS_OPT_IN_THANKS_PATH);
  res.end();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendHtml(res, 405, renderProblemPage('Method not allowed', ['Please use the form to send a message.']));
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const result = processOptIn(body);

  // Bots that filled the honeypot get the normal success response, so they
  // have no signal to adapt to, but nothing reaches the Leads sheet.
  if (result.kind === 'spam') return redirectToThanks(res);

  if (result.kind === 'invalid') {
    return sendHtml(res, 400, renderProblemPage('Please check the form', result.errors));
  }

  try {
    const response = await fetch(CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.payload),
    });
    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
  } catch (error) {
    console.error('SMS opt-in webhook failed:', error);
    return sendHtml(res, 502, renderProblemPage('Your message wasn’t sent', [
      'Something went wrong on our end. Please try again in a moment.',
    ]));
  }

  return redirectToThanks(res);
}
