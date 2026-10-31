import { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckList, ServiceClosing, ServiceHero, ServicePage, ServiceSection, TalkToAlexButton, primaryButtonClass,
  secondaryButtonClass,
} from '../components/ServicePage';
import { PHONE_HREF } from '../config/site';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import demoGuide, { DEMO_GUIDE_PDF } from '../i18n/demoGuide';
import { DEMO_MENU_URL } from '../i18n/mealPrepOrdering';

// The embedded preview is for desktops only. It's left out of the page on
// smaller screens (not just hidden), so a phone doesn't download the PDF
// twice; the download button is enough there. Pre-rendered without it.
const DESKTOP = '(min-width: 1024px)';
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const useDesktop = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);

export default function DemoGuide() {
  const t = useT(demoGuide);
  const lang = useLang();
  const lp = useLocalePath();
  const desktop = useDesktop();
  const pdf = DEMO_GUIDE_PDF[lang];

  // The PDF and the demo open in a new tab, so this page stays put.
  const newTab = (href: string, label: string, className: string) => (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {label}<span className="sr-only"> {t.newTab}</span>
    </a>
  );

  return (
    <ServicePage>
      <ServiceHero eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <div className="flex flex-wrap gap-3">
          {newTab(pdf, t.download, primaryButtonClass)}
          {newTab(DEMO_MENU_URL, t.openDemo, secondaryButtonClass)}
        </div>
      </ServiceHero>

      {desktop && (
        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden">
          <iframe src={`${pdf}#view=FitH`} title={t.previewTitle} className="block w-full h-[80vh] bg-slate-900" loading="lazy">
            {t.previewFallback}
          </iframe>
        </section>
      )}

      <p className="mt-12 text-slate-300 text-lg leading-relaxed max-w-3xl">{t.inside}</p>

      <ServiceSection title={t.try.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.try.brand}</p>
        <div className="space-y-10">
          {[t.try.customer, t.try.owner].map(group => (
            <div key={group.title}>
              <h3 className="text-xl font-bold text-white mb-4">{group.title}</h3>
              <CheckList items={group.items} />
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title={t.setup.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.setup.body}</p>
      </ServiceSection>

      <ServiceClosing title={t.closing.title} body={t.closing.body}>
        <div className="flex flex-wrap gap-3">
          <a href={PHONE_HREF} className={primaryButtonClass}>{t.closing.call}</a>
          <TalkToAlexButton label={t.closing.letsTalk} className={secondaryButtonClass} />
        </div>
      </ServiceClosing>

      <Link
        to={lp('/meal-prep-ordering')}
        className="inline-block mt-10 text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors"
      >
        {t.service} &rarr;
      </Link>
    </ServicePage>
  );
}
