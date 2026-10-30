import { Link } from 'react-router-dom';
import {
  CheckList, ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection,
  TalkToAlexButton, primaryButtonClass, secondaryButtonClass,
} from '../components/ServicePage';
import { useLocalePath, useT } from '../i18n/useLang';
import mealPrepOrdering, { DEMO_ADMIN_URL, DEMO_MENU_URL, MEAL_PREP_ORDERING_PATH } from '../i18n/mealPrepOrdering';
import { DEMO_GUIDE_PATH } from '../i18n/demoGuide';

export default function MealPrepOrdering() {
  const t = useT(mealPrepOrdering);
  const lp = useLocalePath();

  // The demo is a separate site, so it opens in a new tab and this page stays put.
  const demoLink = (href: string, label: string, className: string) => (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {label}<span className="sr-only"> {t.live.newTab}</span>
    </a>
  );

  return (
    <ServicePage>
      <ServiceHero eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <div className="flex flex-wrap gap-3">
          {demoLink(DEMO_MENU_URL, t.ctaDemo, primaryButtonClass)}
          <TalkToAlexButton label={t.ctaAlex} className={secondaryButtonClass} />
        </div>
      </ServiceHero>

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
        </div>
      </ServiceClosing>
    </ServicePage>
  );
}
