// Vercel Web Analytics: page views (the <Analytics /> in App.tsx) and a few
// custom events. Privacy rules: URLs are sent without their query string or
// fragment (calculator inputs, ?source= tags, ref codes), and custom events
// carry only their name and the page language, never anything typed into a form.
// The owner's own visits are dropped entirely: /ignore-me sets a flag in this
// browser's localStorage that analyticsBeforeSend checks on every event.

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

/** localStorage key; "1" means don't send anything from this browser. */
export const IGNORE_ANALYTICS_KEY = 'cg_ignore_analytics';

/** True when this browser has opted out. Storage can be blocked or missing (private mode, previews): then false. */
export function isAnalyticsIgnored(): boolean {
  try {
    return window.localStorage.getItem(IGNORE_ANALYTICS_KEY) === '1';
  } catch {
    return false;
  }
}

/** Sets or clears the opt-out flag. Returns false if storage isn't available. */
export function setAnalyticsIgnored(ignored: boolean): boolean {
  try {
    if (ignored) window.localStorage.setItem(IGNORE_ANALYTICS_KEY, '1');
    else window.localStorage.removeItem(IGNORE_ANALYTICS_KEY);
    return true;
  } catch {
    return false;
  }
}

/** beforeSend for <Analytics />: drop everything from an opted-out browser, otherwise strip the URL. */
export function analyticsBeforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return isAnalyticsIgnored() ? null : stripQueryAndHash(event);
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
