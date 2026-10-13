// Button labels and status messages for alex-voice.js, per page language
// (<html lang>). Alex itself only speaks English, so the Spanish strings say so.
// The React components render the idle label before alex-voice.js takes over;
// src/i18n/alex.ts mirrors it and a test keeps the two in step.
// Spanish: NEEDS NATIVE REVIEW (docs/SPANISH_REVIEW.md).
export const ALEX_STRINGS = {
  en: {
    labels: { idle: "Initiate call", connecting: "Connecting…", live: "End call" },
    messages: {
      micPrompt: "Allow microphone access to talk with Alex.",
      unavailable: "Alex is unavailable right now. Use the message form or call (904) 822-8929.",
      micBlocked: "Microphone access is blocked. Allow it in your browser settings, or use the message form.",
      connected: "You're connected with Alex. Speak normally.",
      ended: "Call ended. Thanks — we'll follow up soon.",
      dropped: "The call dropped. Try again, or use the message form.",
    },
  },
  es: {
    labels: { idle: "Hablar con Alex (en inglés)", connecting: "Conectando…", live: "Terminar llamada" },
    messages: {
      micPrompt: "Permita el acceso al micrófono para hablar con Alex. Alex habla solo en inglés.",
      unavailable: "Alex no está disponible en este momento. Use el formulario de mensaje o llame al (904) 822-8929.",
      micBlocked: "El acceso al micrófono está bloqueado. Permítalo en la configuración de su navegador o use el formulario de mensaje.",
      connected: "Ya está conectado con Alex. Hable con normalidad; Alex responde en inglés.",
      ended: "Llamada finalizada. Gracias; nos comunicaremos con usted pronto.",
      dropped: "Se cortó la llamada. Inténtelo de nuevo o use el formulario de mensaje.",
    },
  },
};

/** The page's language: "es" on /es pages, otherwise "en". */
export function pageLang() {
  return document.documentElement.lang === "es" ? "es" : "en";
}
