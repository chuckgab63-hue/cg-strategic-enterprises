import { Link } from 'react-router-dom';
import {
  BookCallButton, CheckList, ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection,
  TalkToAlexButton, primaryButtonClass, secondaryButtonClass,
} from '../components/ServicePage';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import mealPrepOrdering, {
  DEMO_ADMIN_URL, DEMO_MENU_URL, MEAL_PREP_ORDERING_PATH, demoHref, type IncludedIcon,
} from '../i18n/mealPrepOrdering';
import { DEMO_GUIDE_PATH } from '../i18n/demoGuide';
import { MEAL_PREP_FEATURES_PATH, featurePath, type FeatureSlug } from '../i18n/mealPrepFeaturesMeta';

// Stroke icons on a 24-unit grid, drawn like the homepage's service icons.
const INCLUDED_ICONS: Record<IncludedIcon, string> = {
  // Two arrows in a loop: a repeating plan.
  plans: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  // A map pin.
  zones: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  // A delivery truck.
  routes: 'M2 5h12v11H2zM14 9h4l3 3v4h-7M6 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  // A shop front.
  pickup: 'M4 10l1.5-5h13L20 10M4 10h16v10H4zM10 20v-5h4v5',
  // A tag.
  labels: 'M20 13l-7 7-9-9V4h7l9 9zM8 8h.01',
  // A gift box.
  gift: 'M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1-3-5-3-5-1s3 1 5 1zm0 0c1-3 5-3 5-1s-3 1-5 1z',
  // A phone.
  app: 'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM12 18h.01',
  // A camera.
  photo: 'M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  // A rising line.
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  // A bowl.
  build: 'M3 11h18a9 9 0 0 1-18 0zM8 7c0-1.5 1-2 1-3M12 7c0-1.5 1-2 1-3M16 7c0-1.5 1-2 1-3',
  // Stacked boxes.
  bundles: 'M3 13h8v8H3zM13 13h8v8h-8zM8 3h8v8H8z',
  // Two people.
  referral: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M17 11a3 3 0 1 0 0-6M22 21v-1a5 5 0 0 0-4-4.9',
  // Shelves.
  inventory: 'M4 3v18M20 3v18M4 9h16M4 15h16M7 6h3M7 12h5M13 18h4',
  // A bar chart.
  reports: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  // A speech bubble.
  language: 'M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01',
  // Sparkles: the AI assistant.
  assistant: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
};

// Each "What's included" card links to the feature page that shows it working.
const FEATURE_PAGE_FOR: Record<IncludedIcon, FeatureSlug> = {
  plans: 'subscriptions', zones: 'delivery-and-pickup', routes: 'delivery-and-pickup', pickup: 'delivery-and-pickup',
  labels: 'labels', gift: 'loyalty-and-referrals', app: 'bilingual-and-app', photo: 'ai-tools', trend: 'ai-tools',
  build: 'bigger-orders', bundles: 'bigger-orders', referral: 'loyalty-and-referrals', inventory: 'kitchen-operations',
  reports: 'reports-and-insights', language: 'bilingual-and-app', assistant: 'ai-tools',
};

export default function MealPrepOrdering() {
  const t = useT(mealPrepOrdering);
  const lang = useLang();
  const lp = useLocalePath();

  // The demo is a separate site, so it opens in a new tab and this page stays put,
  // in this page's language.
  const demoLink = (href: string, label: string, className: string) => (
    <a href={demoHref(href, lang)} target="_blank" rel="noopener" className={className}>
      {label}<span className="sr-only"> {t.live.newTab}</span>
    </a>
  );

  return (
    <ServicePage>
      <ServiceHero eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <div className="flex flex-wrap gap-3">
          {demoLink(DEMO_MENU_URL, t.ctaDemo, primaryButtonClass)}
          <TalkToAlexButton label={t.ctaAlex} className={secondaryButtonClass} />
          <BookCallButton medium="meal-prep-ordering" content="hero" />
        </div>
      </ServiceHero>

      <ServiceSection title={t.included.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.included.intro}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.included.items.map(item => (
            <li key={item.icon} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <span className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-4">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={INCLUDED_ICONS[item.icon]} />
                </svg>
              </span>
              <h3 className="text-lg font-black text-white">
                <Link to={lp(featurePath(FEATURE_PAGE_FOR[item.icon]))} className="hover:text-brand-orange transition-colors">{item.title}</Link>
              </h3>
              <p className="text-slate-400 leading-relaxed mt-2">{item.body}</p>
              <Link to={lp(featurePath(FEATURE_PAGE_FOR[item.icon]))} className="inline-block mt-3 text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
                {t.included.learnMore} <span className="sr-only">: {item.title}</span>&rarr;
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link to={lp(MEAL_PREP_FEATURES_PATH)} className={primaryButtonClass}>
            {t.included.featuresCta}
          </Link>
          <Link to={lp(DEMO_GUIDE_PATH)} className={secondaryButtonClass}>
            {t.included.cta}
          </Link>
        </div>
      </ServiceSection>

      <section className="mt-16 md:mt-20 bg-slate-900/50 border border-brand-orange/40 rounded-3xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{t.live.title}</h2>
        <p className="text-slate-300 text-lg leading-relaxed mt-3">{t.live.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {demoLink(DEMO_MENU_URL, t.live.customerDemo, primaryButtonClass)}
          {demoLink(DEMO_ADMIN_URL, t.live.adminDemo, primaryButtonClass)}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mt-4">{t.live.brandNote}</p>
        <Link to={lp(DEMO_GUIDE_PATH)} className="inline-block mt-4 text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
          {t.live.guide} &rarr;
        </Link>
      </section>

      <ServiceSection title={t.admin.title}>
        <CheckList items={t.admin.items} />
      </ServiceSection>

      <ServiceSection title={t.plans.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{t.plans.intro}</p>
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {t.plans.tiers.map((tier, i) => (
            <li key={tier.name} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col">
              <h3 className="text-2xl font-black text-white">{tier.name}</h3>
              <p className="text-brand-orange font-bold mt-1">{tier.tagline}</p>
              {i > 0 && <p className="text-slate-300 mt-4 font-semibold">{t.plans.includesPrevious(t.plans.tiers[i - 1].name)}</p>}
              <ul className={`${i > 0 ? 'mt-2' : 'mt-4'} space-y-2`}>
                {tier.items.map(item => (
                  <li key={item} className="flex gap-2 text-slate-400 leading-relaxed">
                    <span aria-hidden="true" className="text-brand-orange">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="text-slate-400 text-sm leading-relaxed mt-6">{t.plans.demoNote}</p>
      </ServiceSection>

      <ServiceSection title={t.migrate.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.migrate.body}</p>
      </ServiceSection>

      <ServiceSection title={t.data.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.data.body}</p>
        <Link to={lp('/faq#ownership')} className="inline-block mt-4 text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
          {t.data.link} &rarr;
        </Link>
      </ServiceSection>

      <ServiceSection title={t.more.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{t.more.intro}</p>
        <CheckList items={t.more.items} />
      </ServiceSection>

      <section className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-t border-slate-800 pt-8">
        <p className="text-slate-300 leading-relaxed">{t.calculator.body}</p>
        <Link to={lp('/meal-prep-calculator')} className={`${secondaryButtonClass} text-center`}>
          {t.calculator.link} &rarr;
        </Link>
      </section>

      <ServiceFaq title={t.faqTitle} items={t.faq} path={MEAL_PREP_ORDERING_PATH} />

      <ServiceClosing title={t.closing.title} body={t.closing.body}>
        <div className="flex flex-wrap gap-3">
          {demoLink(DEMO_MENU_URL, t.ctaDemo, primaryButtonClass)}
          <TalkToAlexButton label={t.ctaAlex} className={secondaryButtonClass} />
          <BookCallButton medium="meal-prep-ordering" content="closing" />
        </div>
      </ServiceClosing>
    </ServicePage>
  );
}
