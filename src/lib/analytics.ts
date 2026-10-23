// Vercel Web Analytics: page views (the <Analytics /> in App.tsx) and a few
// custom events. Privacy rules: URLs are sent without their query string or
// fragment (calculator inputs, ?source= tags, ref codes), and custom events
// carry only their name and the page language, never anything typed into a form.

import { track, type BeforeSendEvent } from '@vercel/analytics/react';
import { langFromPath, type Lang } from '../i18n/lang';

export type AnalyticsEvent =
  | 'website_check_submitted'
  | 'lets_talk_opened'
  | 'alex_call_started'
  | 'contact_form_submitted'
  | 'calculator_used'
  | 'calculator_emailed';

/** public/alex-voice.js dispatches this on window when a call connects (it can't import this module). */
export const ALEX_CALL_STARTED_EVENT = 'cg:alex-call-started';

/** beforeSend for <Analytics />: keep only origin + path. */
export function stripQueryAndHash(event: BeforeSendEvent): BeforeSendEvent {
  try {
    const url = new URL(event.url);
    return { ...event, url: url.origin + url.pathname };
  } catch {
    // Not a URL we can parse: don't risk sending it.
    return { ...event, url: '' };
  }
}

export function trackEvent(name: AnalyticsEvent, language: Lang) {
  track(name, { language });
}

/** Tracks alex_call_started from alex-voice.js's window event. Returns the cleanup. */
export function listenForAlexCalls(): () => void {
  const onStarted = () => trackEvent('alex_call_started', langFromPath(window.location.pathname));
  window.addEventListener(ALEX_CALL_STARTED_EVENT, onStarted);
  return () => window.removeEventListener(ALEX_CALL_STARTED_EVENT, onStarted);
}
