// The free 30-minute Zoom intro call (Cal.com). Every booking link on the site
// goes through bookingUrl() so each placement carries its own UTM tags:
// utm_source=website, utm_medium=<page or component>, utm_content=<placement>.
// The Cal.com page itself is in English only, so Spanish pages say so.

export const BOOKING_BASE_URL = 'https://cal.com/cgstrategic/intro-call';

export function bookingUrl(medium: string, content: string, source = 'website'): string {
  const params = new URLSearchParams({ utm_source: source, utm_medium: medium, utm_content: content });
  return `${BOOKING_BASE_URL}?${params.toString()}`;
}
