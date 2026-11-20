// The free 30-minute Zoom intro call (Cal.com). Every booking link on the site
// goes through bookingUrl() so each placement carries its own UTM tags:
// utm_source=website, utm_medium=<page or component>, utm_content=<placement>.
// The Cal.com page itself is in English only, so Spanish pages say so.
//
// One event type, booked from everywhere: the slot on the calendar is a free
// 30-minute call whatever the button said, so a page offering a shorter
// conversation has to say what gets booked (/missed-call-rescue does).

export const BOOKING_BASE_URL = 'https://cal.com/cgstrategic/intro-call';

/**
 * `campaign` is for a named offer rather than a page — it becomes utm_campaign,
 * so every booking for that offer groups together however the visitor reached
 * it. The three UTM tags above are unchanged, so a campaign link still reports
 * its page and placement.
 */
export function bookingUrl(medium: string, content: string, source = 'website', campaign?: string): string {
  const params = new URLSearchParams({ utm_source: source, utm_medium: medium, utm_content: content });
  if (campaign) params.set('utm_campaign', campaign);
  return `${BOOKING_BASE_URL}?${params.toString()}`;
}
