import { ICON_PROFILES, type IconProfile } from '../config/social';
import { useT } from '../i18n/useLang';
import common from '../i18n/common';

// The Facebook and LinkedIn links, used in the footer and on /contact so the two
// cannot drift. Icons are inline rather than sprited: two paths are smaller than
// the request for a sprite, and the footer is in every pre-rendered page.
//
// The brand glyphs are filled, not the outline style the /contact method cards
// use, because a stroked "f" or "in" at 20px stops being recognisable as either
// company. They take currentColor, so they pick up the slate-400 and the orange
// hover from the link around them and sit with the text beside them.
//
// Each link is a 44px box around a 20px icon: WCAG 2.5.8 asks for 24, and a
// thumb in a footer deserves better than the minimum. aria-label carries the
// name because the icon is the only content; the SVG itself is decorative.
type SocialKey = IconProfile['key'];

const ICONS: Record<SocialKey, string> = {
  facebook:
    'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
};

export default function SocialLinks({ className = '' }: { className?: string }) {
  const t = useT(common).social;

  return (
    <ul className={`flex items-center gap-1 ${className}`.trim()}>
      {ICON_PROFILES.map(({ key, url }) => (
        <li key={key} className="flex">
          <a
            href={url}
            target="_blank"
            rel="noopener"
            aria-label={t[key]}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true" focusable="false">
              <path d={ICONS[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
