import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useLang, useT } from '../i18n/useLang';
import pestControl from '../i18n/pestControl';
import { SCENE_CSS } from '../lib/seasonal/sceneCss';
import { SPIDER_ID, loadScene, sceneLabel, sceneList, sceneWhen, todayScene, type ThemeModule } from '../lib/seasonal/scenes';
import SpiderScene from './seasonal/SpiderScene';

// The seasonal corner, as the client's own site runs it: the year-round web plus the
// seventeen holiday scenes, here cycling through the year instead of waiting for the
// calendar. It starts on whatever their corner would be showing today, by their rule.
//
// This whole file is behind a dynamic import (see PestControl.tsx), and each scene is
// behind another one, so /pest-control's own bundle carries none of it and a visitor who
// never scrolls to the frame downloads none of it either.
//
// Decorative: every scene is aria-hidden, and the caption and the controls are the part
// that is actually announced. Reduced motion shows today's scene, still, with the arrows
// still working -- nothing auto-advances.

/**
 * The scenes are drawn for a corner, not a panel. Their shared `scene()` wrapper gives a
 * 240 box and then scales the art 1.25x from the bottom edge, so the art actually spans
 * x 0..300 and y -60..240 and the extra is meant to spill over the page behind it. In a
 * square frame that spill is simply cut off -- the penguin loses its head. Widening the
 * viewBox to the box the art really occupies shows the whole scene at the same
 * proportions; nothing about the art or the motion changes.
 *
 * Anything that deliberately travels beyond the scene (the marching ants, for one) still
 * enters and leaves past the frame's edge, which is what it does on their site too.
 */
const reframe = (svg: string): string => svg.replace('viewBox="0 0 240 240"', 'viewBox="0 -60 300 300"');

interface Layer { id: string; html: string }

const DWELL_MS = 6000;

/** The brand accents the scenes are drawn in: CG orange, with two supporting tones. */
const COLORS = ['#FF5F1F', '#f1c84b', '#9fb2c8'];

export default function SeasonalShowcase() {
  const t = useT(pestControl).showcase;
  const lang = useLang();
  const year = useMemo(() => new Date().getFullYear(), []);
  const scenes = useMemo(() => sceneList(year), [year]);

  // Read live, not once: someone who turns "reduce motion" on while the page is open gets
  // the still frame straight away, and the showcase stops advancing on its own.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  );
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const startIndex = useMemo(() => {
    const id = todayScene();
    const at = scenes.findIndex(s => s.id === id);
    return at < 0 ? 0 : at;
  }, [scenes]);

  const [index, setIndex] = useState(startIndex);
  const [playing, setPlaying] = useState(true);
  // Two layers so a turn is a crossfade rather than a cut: the one going out keeps its
  // markup until the new one has faded in over it. Each layer carries the id of the scene
  // it is actually showing -- the markup arrives a tick after the id changes, so a layer
  // keyed on "the current scene" would mislabel the one on its way out.
  const [shown, setShown] = useState<Layer | null>(null);
  const [outgoing, setOutgoing] = useState<Layer | null>(null);
  const [fadedIn, setFadedIn] = useState(false);
  const shownRef = useRef<Layer | null>(null);
  shownRef.current = shown;
  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const uid = useRef(`ssc${Math.random().toString(36).slice(2, 8)}`);

  const scene = scenes[index];
  const isSpider = scene.id === SPIDER_ID;

  // Two signals, not one. Conflating them is what made the web scene look dead: hovering
  // the frame froze the spider, and hovering is exactly what someone does when they move
  // the cursor towards her to watch her bolt for the hub.
  //
  //   animating -- may the scene itself move? Off while the frame is off screen or the
  //     tab is hidden (battery), with reduced motion, and when the viewer presses pause,
  //     which is the mechanism WCAG 2.2.2 asks for and has to stop the motion itself.
  //   rotating  -- may the showcase change scene? Everything above, and it also holds
  //     while the pointer or focus is inside the frame, so the scene cannot slide out
  //     from under someone reading the caption or reaching for a control.
  const animating = playing && onScreen && !tabHidden && !reduced;
  const rotating = animating && !hovered;

  // --- the art ---------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    setFadedIn(false);
    setOutgoing(shownRef.current);        // whatever is on screen keeps showing underneath
    setShown(null);
    const clear = window.setTimeout(() => setOutgoing(null), 700);
    if (!isSpider) {
      loadScene(scene.id).then((mod: ThemeModule | null) => {
        if (cancelled || !mod) return;
        setShown({ id: scene.id, html: `<div class="sc">${reframe(mod.svg({ uid: uid.current }))}</div>` });
        // One frame at opacity 0, so the transition has something to run from.
        requestAnimationFrame(() => requestAnimationFrame(() => { if (!cancelled) setFadedIn(true); }));
      });
    }
    return () => { cancelled = true; clearTimeout(clear); };
  }, [scene.id, isSpider]);

  // The next one, fetched while this one is on screen, so a turn never waits on a chunk.
  useEffect(() => {
    const next = scenes[(index + 1) % scenes.length];
    if (next.id !== SPIDER_ID) void loadScene(next.id);
  }, [index, scenes]);

  // --- when it may move ------------------------------------------------------
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !('IntersectionObserver' in window)) { setOnScreen(true); return; }
    const io = new IntersectionObserver(entries => setOnScreen(entries.some(e => e.isIntersecting)), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const go = useCallback((delta: number) => {
    setIndex(i => (i + delta + scenes.length) % scenes.length);
  }, [scenes.length]);

  useEffect(() => {
    if (!rotating) return;
    const id = window.setTimeout(() => go(1), DWELL_MS);
    return () => clearTimeout(id);
  }, [rotating, index, go]);

  const label = sceneLabel(scene.id, lang);
  const when = sceneWhen(scene.id, lang, year);

  const dotClass = (i: number) =>
    `h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-brand-orange' : 'w-1.5 bg-slate-600 hover:bg-slate-400'}`;

  return (
    <div
      className="ssc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <style>{SCENE_CSS}</style>

      {/* The frame is a square and it is sized by aspect-ratio, so it takes its final
          height before any scene arrives: nothing below it moves when one does. */}
      <div
        ref={frameRef}
        className={`ssc-frame rounded-2xl border border-slate-700 bg-slate-950 ${animating ? '' : 'is-paused'}`}
        style={{ ['--c1' as string]: COLORS[0], ['--c2' as string]: COLORS[1], ['--c3' as string]: COLORS[2] }}
      >
        {outgoing && outgoing.id !== scene.id && (
          <div key={`out-${outgoing.id}`} className="ssc-layer ssc-layer-out" aria-hidden="true" dangerouslySetInnerHTML={{ __html: outgoing.html }} />
        )}
        {isSpider
          ? <SpiderScene active={animating} reduced={reduced} />
          : shown && (
            <div
              key={shown.id}
              className="ssc-layer"
              style={{ opacity: fadedIn || reduced ? 1 : 0 }}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: shown.html }}
            />
          )}
      </div>

      {/* The caption is the accessible version of the picture: which scene, and when it
          runs on the client's site. aria-live so a turn is announced without stealing
          focus; off when it is not turning on its own. */}
      <p className="mt-3 text-sm leading-relaxed text-slate-300" aria-live={rotating ? 'polite' : 'off'}>
        <span className="font-bold text-white">{label}</span>
        <span className="text-slate-500"> · </span>
        <span>{when}</span>
      </p>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t.previous}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
        </button>

        {/* With reduced motion there is nothing to pause: the scene is already still. */}
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? t.pause : t.play}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
              {playing ? <path d="M7 5h4v14H7zm6 0h4v14h-4z" /> : <path d="M8 5l11 7-11 7z" />}
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t.next}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
        </button>

        <ul className="ml-1 flex flex-wrap items-center gap-1.5">
          {scenes.map((s, i) => (
            <li key={s.id} className="flex">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={sceneLabel(s.id, lang)}
                aria-current={i === index ? 'true' : undefined}
                className={`${dotClass(i)} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
