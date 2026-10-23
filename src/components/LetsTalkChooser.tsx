import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PHONE_DISPLAY, PHONE_HREF } from '../config/site';
import { useLang, useT } from '../i18n/useLang';
import { trackEvent } from '../lib/analytics';
import common from '../i18n/common';
import alex from '../i18n/alex';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Dispatch on window to open the chooser from elsewhere on the page (e.g. /website-check results). */
export const OPEN_LETS_TALK_EVENT = 'cg:open-lets-talk';

// The header's "Let's Talk" button. It opens a small chooser: talk to Alex in the
// browser, or call us. A popover under the button from sm up, a bottom sheet on
// phones. It's portaled to <body> because the header's backdrop-blur would
// otherwise trap the fixed-position sheet inside the header bar.
export default function LetsTalkChooser() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();
  const t = useT(common);
  const c = t.chooser;
  const callButton = useT(alex).callButton;
  const lang = useLang();

  useEffect(() => {
    if (open) trackEvent('lets_talk_opened', lang);
  }, [open, lang]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const openChooser = () => setOpen(true);
    window.addEventListener(OPEN_LETS_TALK_EVENT, openChooser);
    return () => window.removeEventListener(OPEN_LETS_TALK_EVENT, openChooser);
  }, []);

  // Pin the desktop popover under the button. The header is fixed, so this only
  // changes when the window resizes.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setAnchor({ top: rect.bottom + 8, right: Math.max(16, window.innerWidth - rect.right) });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Start on the first option rather than the Close button.
    panelRef.current?.querySelector<HTMLElement>('[data-alex-call]:not([disabled]), a[href]')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      // Keep Tab inside the chooser while it's open.
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
      // The browser moves focus after pointerdown, so hand it back to the button
      // once the click settles, unless the visitor clicked a link or field.
      if (!(target as Element).closest?.(`${FOCUSABLE}, input, select, textarea`)) {
        setTimeout(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : setOpen(true))}
        className="inline-block bg-brand-orange text-white px-4 sm:px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] whitespace-nowrap cursor-pointer"
      >
        {t.letsTalk}
      </button>

      {open && createPortal(
        <>
          {/* Dims the page behind the phone bottom sheet; tapping it closes the chooser. */}
          <div className="sm:hidden fixed inset-0 z-[60] bg-slate-950/70" aria-hidden="true" />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-labelledby={titleId}
            style={{ '--chooser-top': `${anchor.top}px`, '--chooser-right': `${anchor.right}px` } as React.CSSProperties}
            className="fixed z-[61] inset-x-0 bottom-0 rounded-t-2xl border-t border-slate-800 bg-slate-950 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl sm:inset-x-auto sm:bottom-auto sm:top-[var(--chooser-top)] sm:right-[var(--chooser-right)] sm:w-80 sm:rounded-2xl sm:border"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 id={titleId} className="text-xs font-bold tracking-widest uppercase text-slate-300">{c.title}</h2>
              <button
                type="button"
                onClick={close}
                aria-label={c.close}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Alex stays open after the click so the visitor sees the mic prompt,
                errors and the End call button. public/alex-voice.js handles the
                click and rewrites the button label and status line, so React must
                not own either one's text. */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-white font-bold text-sm">{c.alexTitle}</p>
              <p id={`${titleId}-alex`} className="text-slate-400 text-xs leading-5 mt-1">
                {c.alexSubtext}
              </p>
              <button
                type="button"
                data-alex-call
                aria-describedby={`${titleId}-alex`}
                className="w-full mt-3 bg-blue-600/20 border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white py-2.5 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors cursor-pointer disabled:cursor-wait"
              >
                {callButton}
              </button>
              <p data-alex-status aria-live="polite" className="empty:hidden mt-2 text-xs leading-5 text-slate-400"></p>
            </div>

            <p className="my-2 text-center text-[11px] text-slate-500">{c.fallbackNote}</p>

            <a
              href={PHONE_HREF}
              aria-label={t.callAriaLabel}
              onClick={close}
              className="block rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-brand-orange/60 transition-colors"
            >
              <span className="block text-white font-bold text-sm">
                {c.call} <span className="text-brand-orange whitespace-nowrap">{PHONE_DISPLAY}</span>
              </span>
              <span className="block text-slate-400 text-xs leading-5 mt-1">
                {/* tel: links often do nothing on desktops, so tell mouse users to dial. */}
                <span className="pointer-fine:hidden">{c.tapToCall}</span>
                <span className="hidden pointer-fine:inline">{c.dialFromPhone}</span>
              </span>
            </a>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
