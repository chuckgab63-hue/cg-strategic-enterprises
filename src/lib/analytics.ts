// Vercel Web Analytics: page views (the <Analytics /> in App.tsx) and a few
// custom events. Privacy rules: URLs are sent without their fragment or query
// string (calculator inputs, ?source= tags, ref codes), except the campaign
// tags utm_source, utm_medium, utm_campaign and utm_content, kept so visits
// from emails and ads are attributed; custom events
// carry only their name, the page language and (for check_learn_more and
// home_website_check_click) which card or button was used, never anything
// typed into a form.
// The owner's own visits are dropped entirely: /analytics-optout (or the older
// /ignore-me) sets a flag in this browser's localStorage that
// analyticsBeforeSend checks on every event.

import { track, type BeforeSendEvent } from '@vercel/analytics/react';
import { langFromPath, type Lang } from '../i18n/lang';

export type AnalyticsEvent =
  | 'website_check_submitted'
  | 'lets_talk_opened'
  | 'alex_call_started'
  | 'contact_form_submitted'
  | 'calculator_used'
  | 'calculator_emailed'
  | 'check_learn_more'
  | 'check_estimator_used'
  | 'home_website_check_click'
  | 'home_case_study_click'
  | 'pest_feature_toggled'
  | 'pest_tier_cta';

/** public/alex-voice.js dispatches this on window when a call connects (it can't import this module). */
export const ALEX_CALL_STARTED_EVENT = 'cg:alex-call-started';

/** The query parameters sent with a URL: campaign tags only. */
export const KEPT_QUERY_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

/** beforeSend for <Analytics />: keep only origin + path, plus any campaign tags. */
export function stripQueryAndHash(event: BeforeSendEvent): BeforeSendEvent {
  try {
    const url = new URL(event.url);
    const kept = new URLSearchParams();
    for (const name of KEPT_QUERY_PARAMS) {
      const value = url.searchParams.get(name);
      if (value !== null) kept.set(name, value);
    }
    const query = kept.toString();
    return { ...event, url: url.origin + url.pathname + (query ? `?${query}` : '') };
  } catch {
    // Not a URL we can parse: don't risk sending it.
    return { ...event, url: '' };
  }
}

/** localStorage key; "1" means don't send anything from this browser. */
export const IGNORE_ANALYTICS_KEY = 'cg-ignore-analytics';
/** The key /ignore-me used before; still honoured, so a browser that opted out stays out. */
export const LEGACY_IGNORE_ANALYTICS_KEY = 'cg_ignore_analytics';

/** True when this browser has opted out. Storage can be blocked or missing (private mode, previews): then false. */
export function isAnalyticsIgnored(): boolean {
  try {
    const storage = window.localStorage;
    return storage.getItem(IGNORE_ANALYTICS_KEY) === '1' || storage.getItem(LEGACY_IGNORE_ANALYTICS_KEY) === '1';
  } catch {
    return false;
  }
}

/** Sets or clears the opt-out flag (clearing removes the legacy key too). Returns false if storage isn't available. */
export function setAnalyticsIgnored(ignored: boolean): boolean {
  try {
    const storage = window.localStorage;
    if (ignored) {
      storage.setItem(IGNORE_ANALYTICS_KEY, '1');
    } else {
      storage.removeItem(IGNORE_ANALYTICS_KEY);
      storage.removeItem(LEGACY_IGNORE_ANALYTICS_KEY);
    }
    return true;
  } catch {
    return false;
  }
}

/** beforeSend for <Analytics />: drop everything from an opted-out browser, otherwise strip the URL. */
export function analyticsBeforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return isAnalyticsIgnored() ? null : stripQueryAndHash(event);
}

/** Website Check score cards, as sent with check_learn_more. */
export type CheckCard = 'speed' | 'mobile' | 'search' | 'missed_call';

/** Where on the homepage a "Check my site" click came from, as sent with home_website_check_click. */
export type HomeCheckPlacement = 'card' | 'section';

/**
 * What a custom event may carry besides its name and the page language. All of
 * it is fixed vocabulary from the code — a card name, a placement, a feature
 * key, a package name — never anything a visitor typed.
 */
export interface EventDetail {
  card?: CheckCard;
  placement?: HomeCheckPlacement;
  /** The /pest-control switch that moved (pest_feature_toggled). */
  feature?: string;
  /** Which way it moved (pest_feature_toggled). */
  state?: 'on' | 'off';
  /** The package whose button was used (pest_tier_cta). */
  tier?: string;
}

export function trackEvent(name: AnalyticsEvent, language: Lang, extra: EventDetail = {}) {
  track(name, { language, ...extra });
}

/** Tracks alex_call_started from alex-voice.js's window event. Returns the cleanup. */
export function listenForAlexCalls(): () => void {
  const onStarted = () => trackEvent('alex_call_started', langFromPath(window.location.pathname));
  window.addEventListener(ALEX_CALL_STARTED_EVENT, onStarted);
  return () => window.removeEventListener(ALEX_CALL_STARTED_EVENT, onStarted);
}
