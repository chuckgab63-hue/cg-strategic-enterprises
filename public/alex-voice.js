// alex-voice.js — connects any button with data-alex-call to Alex (Retell web call).
// The Retell API key never touches the browser: Make mints a one-time access token.
// SDK pinned to 3.x: v3 web calls need it, and 4.0 removes RetellWebClient.
// Only call_started, call_ended and error are used: v3 calls don't send update,
// metadata or agent_start/stop_talking.
import { RetellWebClient } from "https://cdn.jsdelivr.net/npm/retell-client-js-sdk@3.0.2/+esm";
import { startCallOptions, tokenRequestInit } from "./alex-voice-options.js";
import { ALEX_STRINGS, pageLang } from "./alex-voice-strings.js";

const TOKEN_URL = "https://hook.us2.make.com/xy2xgpmct2bxs6obfr4u9skvtg9j2gby";
// If the SDK never reports call_started (or an error), give up and reset the button.
const CONNECT_TIMEOUT_MS = 20000;

const client = new RetellWebClient();
let active = false;
let busy = false;
let connectTimer = null;

function clearConnectTimer() {
  clearTimeout(connectTimer);
  connectTimer = null;
}

// message is a key into ALEX_STRINGS[lang].messages (or ""), so the text is
// looked up in the page's language each time it's drawn.
let current = { state: "idle", message: "" };

// Apply the current state to every button and status line under root.
function render(root) {
  const { state } = current;
  const strings = ALEX_STRINGS[pageLang()];
  const message = current.message ? strings.messages[current.message] : "";
  const within = (sel) => [
    ...(root.matches?.(sel) ? [root] : []),
    ...root.querySelectorAll(sel),
  ];
  within("[data-alex-call]").forEach((btn) => {
    btn.textContent = strings.labels[state];
    btn.disabled = state === "connecting";
    btn.setAttribute("aria-pressed", state === "live" ? "true" : "false");
  });
  within("[data-alex-status]").forEach((el) => {
    el.textContent = message;
  });
}

function setState(state, message = "") {
  current = { state, message };
  render(document);
}

// Buttons inside a modal mount after a call may have started (close it mid-call,
// reopen it). Bring new ones up to date so they don't show "Initiate call" while
// a call is connecting or live. Idle buttons already render the right label.
// Switching language (EN | ES) changes <html lang>: redraw everything then.
new MutationObserver((mutations) => {
  if (current.state === "idle") return;
  for (const m of mutations) {
    if (m.type === "attributes") {
      render(document);
      return;
    }
    m.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) render(node);
    });
  }
}).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["lang"] });

async function startCall() {
  if (busy || active) return;
  busy = true;
  setState("connecting", "micPrompt");

  try {
    // Ask for the mic first so a denied permission doesn't waste a Retell call.
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());

    // The page language goes in the JSON body; ?language= stays too so the
    // scenario's existing query-string mapping keeps working.
    const lang = pageLang();
    const res = await fetch(`${TOKEN_URL}?language=${lang}`, tokenRequestInit(lang));
    if (!res.ok) throw new Error(`token request failed (${res.status})`);
    const options = startCallOptions(await res.json());

    connectTimer = setTimeout(() => {
      console.error("[alex-voice] call did not connect in time");
      client.stopCall();
      active = false;
      busy = false;
      connectTimer = null;
      setState("idle", "unavailable");
    }, CONNECT_TIMEOUT_MS);
    // The SDK reports connection failures through the "error" event, not by throwing.
    await client.startCall(options);
  } catch (err) {
    clearConnectTimer();
    console.error("[alex-voice]", err);
    const denied = err && err.name === "NotAllowedError";
    setState("idle", denied ? "micBlocked" : "unavailable");
    busy = false;
  }
}

client.on("call_started", () => {
  clearConnectTimer();
  active = true;
  busy = false;
  setState("live", "connected");
  // The app tracks this as the alex_call_started analytics event (src/lib/analytics.ts).
  window.dispatchEvent(new Event("cg:alex-call-started"));
});

client.on("call_ended", () => {
  clearConnectTimer();
  active = false;
  busy = false;
  setState("idle", "ended");
});

client.on("error", (err) => {
  clearConnectTimer();
  console.error("[alex-voice]", err);
  client.stopCall();
  active = false;
  busy = false;
  setState("idle", "dropped");
});

document.addEventListener("click", (e) => {
  const button = e.target.closest("[data-alex-call]");
  if (!button) return;
  e.preventDefault();
  if (active) client.stopCall();
  else startCall();
});

// End the call (or one still connecting) if the visitor closes the tab.
window.addEventListener("pagehide", () => {
  if (active || busy) client.stopCall();
});
