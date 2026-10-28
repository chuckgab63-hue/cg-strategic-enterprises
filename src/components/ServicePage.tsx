import type { ReactNode } from 'react';
import { OPEN_LETS_TALK_EVENT } from './LetsTalkChooser';
import FaqList from './FaqList';
import { faqPageJsonLdText, type FaqItem } from '../i18n/faq';
import { useLang } from '../i18n/useLang';

// Building blocks shared by the service pages (/answering-service,
// /meal-prep-ordering): one layout, heading scale and set of buttons.

export const primaryButtonClass = 'inline-flex items-center justify-center bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)] cursor-pointer';
export const secondaryButtonClass = 'inline-flex items-center justify-center border border-slate-600 text-slate-200 px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer';

export function ServicePage({ children }: { children: ReactNode }) {
  return (
    // text-left counters the global `#root { text-align: center }` in index.css.
    <div className="service-page max-w-5xl mx-auto px-6 pt-32 pb-24 text-left">
      {/* The bare `h1`, `h2` and `p` rules in index.css (fixed sizes, weight 500, their
          own colour and margins; `p { margin: 0 }`) are unlayered, so they beat the
          Tailwind classes on this page. revert-layer hands those properties back to
          Tailwind, as on the home and case-study pages. Not redundant. */}
      <style>{`
        .service-page p { margin: revert-layer; }
        .service-page h1,
        .service-page h2 {
          font-family: revert-layer;
          font-size: revert-layer;
          font-weight: revert-layer;
          line-height: revert-layer;
          letter-spacing: revert-layer;
          color: revert-layer;
          margin: revert-layer;
        }
      `}</style>
      {children}
    </div>
  );
}

export function ServiceHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <header className="max-w-3xl">
      <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mt-3">{title}</h1>
      <p className="text-slate-300 text-lg leading-relaxed mt-5">{intro}</p>
      <div className="mt-8">{children}</div>
    </header>
  );
}

export function ServiceSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16 md:mt-20">
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-slate-200 leading-relaxed">
          <svg className="w-5 h-5 mt-0.5 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StepList({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step, i) => (
        <li key={step.title} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <span className="text-brand-orange font-black text-sm tracking-widest" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <p className="text-white font-bold text-lg mt-2">{step.title}</p>
          <p className="text-slate-400 leading-relaxed mt-1">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Opens the header's "Let's Talk" chooser, where visitors start a browser call with Alex. */
export function TalkToAlexButton({ label, className = primaryButtonClass }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_LETS_TALK_EVENT))} className={className}>
      {label}
    </button>
  );
}

/** The page's FAQ: the accordion plus its FAQPage JSON-LD. `path` is the page's English path. */
export function ServiceFaq({ title, items, path }: { title: string; items: FaqItem[]; path: string }) {
  const lang = useLang();
  return (
    <ServiceSection title={title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqPageJsonLdText(items, path, lang) }} />
      <FaqList items={items} />
    </ServiceSection>
  );
}

/** Closing call to action. */
export function ServiceClosing({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <section className="mt-16 md:mt-20 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{title}</h2>
      <p className="text-slate-300 leading-relaxed mt-3 max-w-2xl">{body}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
