// @ts-nocheck
// Section menu for the /island-fresh proposal page.
// Render <IslandFreshMenu /> anywhere inside the page component. It builds itself
// from the page's own <section> headings, so the hero and sections are untouched.
import { useEffect, useRef, useState } from "react";

// Shorter menu labels for headings that are too long for a side menu.
// Any heading not listed here is used as written.
const SHORT = {
  "What this is costing right now": "What it's costing",
  "What the build involves": "The build",
  "Not included, and worth saying so": "Not included",
};

const MENU_TITLE = "On this page";

const css = `
.if-menu-rail,
.if-menu-strip {
  --m-ink: var(--ink, #0B2B21);
  --m-soft: var(--ink-soft, #3E5B4F);
  --m-edge: var(--edge, #D6E0D6);
  --m-mango: var(--mango, #E2930B);
  --m-hib: var(--hibiscus, #B8362E);
  --m-ground: var(--ground, #F4F7F2);
  font-family: 'Karla', system-ui, sans-serif;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease, transform .25s ease, visibility 0s linear .25s;
}
.if-menu-rail.is-shown,
.if-menu-strip.is-shown {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transform: none;
  transition-delay: 0s;
}
.if-menu-rail a:focus-visible,
.if-menu-strip a:focus-visible {
  outline: 2px solid var(--m-ink);
  outline-offset: 2px;
}

/* wide screens: a card in the left gutter, aligned to the 760px column */
.if-menu-rail {
  display: none;
  position: fixed;
  z-index: 40;
  top: calc(var(--m-top, 91px) + 40px);
  right: calc(50% + 392px);
  width: 220px;
  max-height: calc(100vh - var(--m-top, 91px) - 72px);
  overflow-y: auto;
  padding: 18px 16px 16px;
  background: #FFFFFF;
  border: 1px solid var(--m-edge);
  border-radius: 3px;
  transform: translateX(-8px);
}
.if-menu-title {
  margin: 0 0 12px;
  padding-top: 10px;
  border-top: 2px solid var(--m-mango);
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--m-ink);
}
.if-menu-rail ul { list-style: none; margin: 0; padding: 0; }
.if-menu-link,
.if-menu-sub {
  display: block;
  padding: 6px 0 6px 12px;
  border-left: 2px solid var(--m-edge);
  color: var(--m-soft);
  font-size: .95rem;
  line-height: 1.35;
  text-decoration: none;
}
.if-menu-link:hover,
.if-menu-sub:hover { color: var(--m-ink); }
.if-menu-link.is-active {
  border-left-color: var(--m-mango);
  color: var(--m-ink);
  font-weight: 700;
}
.if-menu-subs { display: none; }
.is-open > .if-menu-subs { display: block; margin: 2px 0 6px; }
.if-menu-sub {
  padding-left: 24px;
  font-size: .86rem;
}
.if-menu-sub.is-urgent { color: var(--m-hib); }
.if-menu-sub.is-active {
  border-left-color: var(--m-mango);
  color: var(--m-ink);
  font-weight: 700;
}
.if-menu-sub.is-urgent.is-active { color: var(--m-hib); }
.if-menu-hint {
  margin: 14px 0 0;
  padding-top: 10px;
  border-top: 1px solid var(--m-edge);
  font-size: .78rem;
  line-height: 1.4;
  color: var(--m-soft);
}

/* narrower screens: a compact bar that slides out from under the site header */
.if-menu-strip {
  position: fixed;
  z-index: 40;
  left: 0;
  right: 0;
  top: var(--m-top, 91px);
  background: rgba(244, 247, 242, .95);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--m-edge);
  transform: translateY(-100%);
}
.if-menu-strip ul {
  display: flex;
  gap: 4px;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 18px;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;
}
.if-menu-strip ul::-webkit-scrollbar { display: none; }
.if-menu-strip a {
  display: block;
  padding: 12px 10px 9px;
  border-bottom: 3px solid transparent;
  color: var(--m-soft);
  font-size: .92rem;
  white-space: nowrap;
  text-decoration: none;
}
.if-menu-strip a.is-active {
  border-bottom-color: var(--m-mango);
  color: var(--m-ink);
  font-weight: 700;
}

/* leave room under the fixed site header and the compact bar when jumping */
.if-proposal section[id],
.if-proposal .if-group[id],
.if-proposal .if-note[id] { scroll-margin-top: 150px; }

@media (min-width: 1280px) {
  .if-menu-rail { display: block; }
  .if-menu-strip { display: none; }
  .if-proposal section[id],
  .if-proposal .if-group[id],
  .if-proposal .if-note[id] { scroll-margin-top: 120px; }
}
@media (prefers-reduced-motion: reduce) {
  .if-menu-rail, .if-menu-strip { transition: none; }
}
`;

export default function IslandFreshMenu() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("");
  const [activeSub, setActiveSub] = useState("");
  const [shown, setShown] = useState(false);
  const [top, setTop] = useState(91);
  const itemsRef = useRef([]);
  const activeRef = useRef("");
  const stripRef = useRef(null);

  // Read the page's sections once and give each a stable id to jump to.
  useEffect(() => {
    const root = document.querySelector(".if-proposal");
    if (!root) return;
    const list = [];
    root.querySelectorAll(":scope > section").forEach((sec, i) => {
      const h2 = sec.querySelector("h2");
      if (!h2) return;
      if (!sec.id) sec.id = "if-section-" + (i + 1);
      const title = h2.textContent.trim();
      const subs = [];
      sec.querySelectorAll(".if-group, .if-note").forEach((g, j) => {
        const h3 = g.querySelector("h3");
        if (!h3) return;
        if (!g.id) g.id = sec.id + "-part-" + (j + 1);
        const t = h3.textContent.trim();
        subs.push({
          id: g.id,
          label: SHORT[t] || t,
          urgent: g.classList.contains("is-urgent"),
        });
      });
      list.push({ id: sec.id, label: SHORT[title] || title, subs });
    });
    itemsRef.current = list;
    setItems(list);
  }, []);

  // Track scroll position: which section is current, and whether the hero has passed.
  useEffect(() => {
    if (!items.length) return;
    let raf = 0;
    const measure = () => {
      const hdr = document.querySelector("header.fixed");
      const headerBottom = hdr ? Math.round(hdr.getBoundingClientRect().bottom) : 91;
      setTop(headerBottom);
      const line = headerBottom + 140;
      let sec = "";
      let sub = "";
      for (const s of itemsRef.current) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) {
          sec = s.id;
          sub = "";
          for (const b of s.subs) {
            const be = document.getElementById(b.id);
            if (be && be.getBoundingClientRect().top <= line) sub = b.id;
          }
        }
      }
      activeRef.current = sec;
      setActive(sec);
      setActiveSub(sub);
      const hero = document.querySelector(".if-hero");
      setShown(hero ? hero.getBoundingClientRect().bottom < headerBottom + 40 : window.scrollY > 400);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Keep the active tab visible in the compact bar.
  useEffect(() => {
    const ul = stripRef.current;
    if (!ul) return;
    const a = ul.querySelector("a.is-active");
    if (a) ul.scrollTo({ left: Math.max(0, a.offsetLeft - 40), behavior: "auto" });
  }, [active]);

  // Left and right arrow keys move between sections (handy while screen sharing).
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if (e.target && e.target.closest && e.target.closest("input, textarea, select, button, [contenteditable='true']")) return;
      const list = itemsRef.current;
      if (!list.length) return;
      const i = list.findIndex((s) => s.id === activeRef.current);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = reduce ? "auto" : "smooth";
      e.preventDefault();
      if (e.key === "ArrowRight") {
        const next = list[Math.min(i + 1, list.length - 1)];
        document.getElementById(next.id)?.scrollIntoView({ behavior, block: "start" });
      } else if (i <= 0) {
        window.scrollTo({ top: 0, behavior });
      } else {
        document.getElementById(list[i - 1].id)?.scrollIntoView({ behavior, block: "start" });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  if (!items.length) return <style>{css}</style>;

  const vars = { "--m-top": top + "px" };
  const cls = (base) => base + (shown ? " is-shown" : "");

  return (
    <>
      <style>{css}</style>

      <nav className={cls("if-menu-rail")} aria-label={MENU_TITLE} style={vars}>
        <p className="if-menu-title">{MENU_TITLE}</p>
        <ul>
          {items.map((s) => (
            <li key={s.id} className={s.id === active ? "is-open" : ""}>
              <a
                href={"#" + s.id}
                className={"if-menu-link" + (s.id === active ? " is-active" : "")}
                aria-current={s.id === active && !activeSub ? "true" : undefined}
                onClick={go(s.id)}
              >
                {s.label}
              </a>
              {s.subs.length > 0 && (
                <ul className="if-menu-subs">
                  {s.subs.map((b) => (
                    <li key={b.id}>
                      <a
                        href={"#" + b.id}
                        className={
                          "if-menu-sub" +
                          (b.urgent ? " is-urgent" : "") +
                          (b.id === activeSub ? " is-active" : "")
                        }
                        aria-current={b.id === activeSub ? "true" : undefined}
                        onClick={go(b.id)}
                      >
                        {b.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <p className="if-menu-hint">Left and right arrow keys jump between sections.</p>
      </nav>

      <nav className={cls("if-menu-strip")} aria-label={MENU_TITLE} style={vars}>
        <ul ref={stripRef}>
          {items.map((s) => (
            <li key={s.id}>
              <a
                href={"#" + s.id}
                className={s.id === active ? "is-active" : ""}
                aria-current={s.id === active ? "true" : undefined}
                onClick={go(s.id)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
