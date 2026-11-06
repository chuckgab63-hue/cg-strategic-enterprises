import { useId, useState } from 'react';
import {
  DEMO_DEFAULTS, DEMO_SWITCHES, effectiveSwitch,
  type DemoSwitch, type SwitchGroup, type SwitchKey, type SwitchState,
} from '../config/pestPackages';
import { trackEvent } from '../lib/analytics';
import { useLang, useT } from '../i18n/useLang';
import pestControl from '../i18n/pestControl';

// The interactive demo on /pest-control: a mock Admin > Settings > Features
// panel beside a mock pest-company website and admin area that change as the
// switches move. Entirely local state — there is no backend, nothing is saved,
// and the records in the preview are made up.
//
// It copies four behaviours from the real panel, because they are the point of
// the section rather than decoration:
//   * a sub-feature is locked while its parent is off, and the preview treats
//     it as off whatever its own box says (effectiveSwitch),
//   * each switch says what happens on save: immediately, or a rebuild of the
//     public site in about a minute,
//   * switching on something with off-site setup shows what has to be in place,
//   * switching anything off hides and blocks, and never deletes.
//
// It renders at the defaults on the server, so the pre-rendered HTML shows a
// sensible panel before any JavaScript arrives.

const GROUPS: SwitchGroup[] = ['settings', 'build'];

const PILL = 'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap';

/** A browser-ish frame around one mock screen. */
function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-950/60">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function FeatureSwitchDemo() {
  const t = useT(pestControl).demo;
  const lang = useLang();
  const ids = useId();
  /** Each switch's description, named so the checkbox can point at it. */
  const describedBy = (key: SwitchKey) => `${ids}-${key}`;
  const [state, setState] = useState<SwitchState>(DEMO_DEFAULTS);
  /** What changed last, for the live region: screen readers get the same news the preview shows. */
  const [announcement, setAnnouncement] = useState('');

  const on = (key: SwitchKey) => effectiveSwitch(state, key);
  /** The parent that is holding this switch down, if any. */
  const lockedBy = (s: DemoSwitch) => (s.dependsOn && !on(s.dependsOn) ? s.dependsOn : null);

  const toggle = (s: DemoSwitch) => {
    const next = !state[s.key];
    setState(prev => ({ ...prev, [s.key]: next }));
    setAnnouncement(`${t.switches[s.key].label}: ${next ? t.scopeStatus[s.scope] : t.noDelete}`);
    trackEvent('pest_feature_toggled', lang, { feature: s.key, state: next ? 'on' : 'off' });
  };

  const reset = () => {
    setState(DEMO_DEFAULTS);
    setAnnouncement(t.reset);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

      {/* ---------------- The panel ---------------- */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-white font-black text-sm tracking-wide">{t.panelTitle}</p>
          <p className="text-brand-orange text-xs font-bold uppercase tracking-widest">{t.tryIt}</p>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mt-3">{t.noDelete}</p>

        {GROUPS.map(group => (
          <section key={group} className="mt-6">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.groups[group]}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mt-2">{t.groupNotes[group]}</p>
            <ul className="mt-4 flex flex-col gap-4">
              {DEMO_SWITCHES.filter(s => s.group === group).map(s => {
                const locked = lockedBy(s);
                const checked = state[s.key];
                return (
                  <li
                    key={s.key}
                    className={`${locked ? 'opacity-60' : ''} ${s.dependsOn ? 'ml-4 pl-4 border-l-2 border-slate-800' : ''}`}
                  >
                    {/* A real checkbox, styled as a switch: it keeps the keyboard
                        and the disabled state without any extra code. The visible
                        text is in the label, but the name is also set explicitly —
                        a visually hidden input inside a label does not reliably
                        pick one up, and this switch is the whole section. */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={Boolean(locked)}
                        onChange={() => toggle(s)}
                        aria-label={t.switches[s.key].label}
                        aria-describedby={describedBy(s.key)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 w-10 h-6 rounded-full border transition-colors relative peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-orange ${checked ? 'bg-brand-orange/80 border-brand-orange' : 'bg-slate-800 border-slate-700'}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-[1.3rem]' : 'left-0.5'}`} />
                      </span>
                      <span className="text-white font-bold leading-6">{t.switches[s.key].label}</span>
                    </label>
                    <p id={describedBy(s.key)} className="text-slate-400 text-sm leading-relaxed mt-2 ml-[3.25rem]">
                      {t.switches[s.key].description}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed mt-1.5 ml-[3.25rem]">
                      {s.group === 'settings' ? t.scopeStatus[s.scope] : t.groups.build}
                      {locked && ` ${t.lockedBy(t.switches[locked].label)}`}
                    </p>
                    {s.hasChecklist && checked && !locked && (
                      <div className="mt-3 ml-[3.25rem] bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                        <p className="text-white text-xs font-black uppercase tracking-widest">{t.checklistTitle}</p>
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {t.checklist.map(item => (
                            <li key={item} className="flex gap-2 text-slate-400 text-xs leading-relaxed">
                              <span aria-hidden="true" className="text-brand-orange">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center border border-slate-600 text-slate-200 px-5 py-2.5 rounded-full font-bold tracking-widest uppercase text-[11px] hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer"
        >
          {t.reset}
        </button>
      </div>

      {/* ---------------- The preview ---------------- */}
      <div className="flex flex-col gap-5">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.previewLabel}</p>

        {/* Screen readers get the change as text; the frames below show it visually. */}
        <p aria-live="polite" className="sr-only">{announcement}</p>

        <Frame title={t.websiteTitle}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pb-3 border-b border-slate-800">
            <span className="text-white font-black text-sm">{t.mock.company}</span>
            <span className="text-slate-400 text-[11px]">{t.mock.navHome}</span>
            {t.mock.navServices.map(item => (
              <span key={item} className="text-slate-400 text-[11px]">{item}</span>
            ))}
            {on('wdo') && (
              <span className={`${PILL} bg-brand-orange/15 border border-brand-orange/50 text-brand-orange`}>{t.mock.navWdo}</span>
            )}
            <span className="text-slate-400 text-[11px]">{t.mock.navContact}</span>
            {on('spanish') && (
              <span className={`${PILL} bg-brand-orange/15 border border-brand-orange/50 text-brand-orange ml-auto`}>{t.mock.langToggle}</span>
            )}
          </div>

          <p className="text-white font-black text-lg leading-tight mt-4">{t.mock.heroTitle}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1.5 rounded-full bg-brand-orange text-white text-[11px] font-bold">{t.mock.heroBook}</span>
            {on('jess') && (
              <span className="px-3 py-1.5 rounded-full border border-brand-orange/60 text-brand-orange text-[11px] font-bold">{t.mock.heroJess}</span>
            )}
            <span className="px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 text-[11px] font-bold">{t.mock.heroCall}</span>
          </div>

          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-5">{t.mock.servicesTitle}</p>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            {t.mock.services.map(item => (
              <li key={item} className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 text-xs">{item}</li>
            ))}
            {on('wdo') && (
              <li className="bg-brand-orange/10 border border-brand-orange/40 rounded-xl px-3 py-2 text-brand-orange text-xs font-semibold">
                {t.mock.serviceWdo}
              </li>
            )}
          </ul>
          <p className="text-slate-400 text-[11px] leading-relaxed mt-3">
            {on('wdo') ? t.mock.wdoAdded : t.mock.wdoRemoved} &middot; {t.scopeStatus.public}
          </p>
        </Frame>

        <Frame title={t.adminTitle}>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
            <ul className="flex flex-col gap-1.5 border-r border-slate-800 pr-4">
              {t.mock.adminNav.map(item => (
                <li key={item} className="text-slate-400 text-[11px]">{item}</li>
              ))}
              {on('contracts') && (
                <li className="text-brand-orange text-[11px] font-bold">{t.mock.adminNavContracts}</li>
              )}
              {t.mock.adminNavRest.map(item => (
                <li key={item} className="text-slate-400 text-[11px]">{item}</li>
              ))}
            </ul>

            <div>
              {on('contracts') ? (
                <>
                  <p className="text-white font-black text-sm">{t.mock.contractsHeading}</p>
                  <div className="mt-3 bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                    <p className="text-slate-200 text-xs font-semibold">{t.mock.contractRow}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className={`${PILL} bg-slate-800 border border-slate-700 text-slate-300`}>{t.mock.contractStatus}</span>
                      {on('esign') && (
                        <span className="px-3 py-1.5 rounded-full bg-brand-orange text-white text-[11px] font-bold">{t.mock.contractSend}</span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-slate-400 text-xs leading-relaxed">{t.mock.contractsOff}</p>
              )}
            </div>
          </div>
        </Frame>

        <p className="text-slate-400 text-xs leading-relaxed">{t.mockNote}</p>
      </div>
    </div>
  );
}
