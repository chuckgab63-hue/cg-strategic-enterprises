// alex-voice.js — connects any button with data-alex-call to Alex (Retell web call).
// The Retell API key never touches the browser: Make mints a one-time access token.
import { RetellWebClient } from "https://cdn.jsdelivr.net/npm/retell-client-js-sdk/+esm";

const TOKEN_URL = "https://hook.us2.make.com/xy2xgpmct2bxs6obfr4u9skvtg9j2gby";

const client = new RetellWebClient();
let active = false;
let busy = false;

const LABELS = {
  idle: "Initiate call",
  connecting: "Connecting…",
  live: "End call",
};

function setState(state, message = "") {
  document.querySelectorAll("[data-alex-call]").forEach((btn) => {
    btn.textContent = LABELS[state];
    btn.disabled = state === "connecting";
    btn.setAttribute("aria-pressed", state === "live" ? "true" : "false");
  });
  document.querySelectorAll("[data-alex-status]").forEach((el) => {
    el.textContent = message;
  });
}

async function startCall() {
  if (busy || active) return;
  busy = true;
  setState("connecting", "Allow microphone access to talk with Alex.");

  try {
    // Ask for the mic first so a denied permission doesn't waste a Retell call.
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());

    // Simple POST with no custom headers = no CORS preflight.
    const res = await fetch(TOKEN_URL, { method: "POST" });
    if (!res.ok) throw new Error(`token request failed (${res.status})`);
    const { access_token } = await res.json();
    if (!access_token) throw new Error("no access token returned");

    await client.startCall({ accessToken: access_token });
  } catch (err) {
    console.error("[alex-voice]", err);
    const denied = err && err.name === "NotAllowedError";
    setState(
      "idle",
      denied
        ? "Microphone access is blocked. Allow it in your browser settings, or use the message form."
        : "Alex is unavailable right now. Use the message form or call (904) 822-8929."
    );
    busy = false;
  }
}

client.on("call_started", () => {
  active = true;
  busy = false;
  setState("live", "You're connected with Alex. Speak normally.");
});

client.on("call_ended", () => {
  active = false;
  busy = false;
  setState("idle", "Call ended. Thanks — we'll follow up soon.");
});

client.on("error", (err) => {
  console.error("[alex-voice]", err);
  client.stopCall();
  active = false;
  busy = false;
  setState("idle", "The call dropped. Try again, or use the message form.");
});

document.addEventListener("click", (e) => {
  const button = e.target.closest("[data-alex-call]");
  if (!button) return;
  e.preventDefault();
  if (active) client.stopCall();
  else startCall();
});

// End the call if the visitor closes the tab mid-conversation.
window.addEventListener("pagehide", () => {
  if (active) client.stopCall();
});
