import { use } from 'react';
import { Link } from 'react-router-dom';
import { CATALOG, PLAN_DESCRIPTION, PLAN_NAME, type PlanKey } from '../config/mealPrepFeatureCatalog';
import { Breadcrumbs, FeatureActions, PlanChip } from '../components/FeaturePageParts';
import { ServiceClosing, ServiceHero, ServicePage, ServiceSection } from '../components/ServicePage';
import { DEMO_GUIDE_PATH } from '../i18n/demoGuide';
import { DEMO_BASE, FEATURES_UI, MEAL_PREP_FEATURES_PATH, MEAL_PREP_ORDERING_PATH, demoLinkFor, featurePath, loadFeaturePages } from '../i18n/mealPrepFeatures';
import { primaryButtonClass } from '../components/ServicePage';
import { useLang, useLocalePath } from '../i18n/useLang';

const PLANS: PlanKey[] = ['basic', 'advanced', 'pro'];

// /meal-prep-ordering/features: the eleven feature pages as cards, then every feature
// by plan, each linking to the page that explains it.
export default function MealPrepFeatures() {
  const lang = useLang();
  const lp = useLocalePath();
  const ui = FEATURES_UI[lang];
  const pages = use(loadFeaturePages(lang));
  const pageForFeature = (key: string) => pages.find(p => p.features.includes(key));
  const crumbs = [
    { name: ui.breadcrumbHome, path: '/' },
    { name: ui.breadcrumbMealPrep, path: MEAL_PREP_ORDERING_PATH },
    { name: ui.breadcrumbFeatures, path: MEAL_PREP_FEATURES_PATH },
  ];

  return (
    <ServicePage>
      <Breadcrumbs crumbs={crumbs} label={ui.nav} lang={lang} />
      <div className="mt-8">
        <ServiceHero eyebrow={ui.hubEyebrow} title={ui.hubTitle} intro={ui.hubIntro}>
          <FeatureActions ui={ui} demoUrl={demoLinkFor(DEMO_BASE, '/menu', lang)} />
        </ServiceHero>
      </div>

      <ServiceSection title={ui.breadcrumbFeatures}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map(page => (
            <li key={page.slug} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col">
              <h3 className="text-lg font-black text-white">
                <Link to={lp(featurePath(page.slug))} className="hover:text-brand-orange transition-colors">{page.navTitle}</Link>
              </h3>
              <p className="text-slate-400 leading-relaxed mt-2 flex-grow">{page.card}</p>
              <Link to={lp(featurePath(page.slug))} className="inline-block mt-4 text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
                {ui.hubCardCta} &rarr;
              </Link>
            </li>
          ))}
        </ul>
      </ServiceSection>

      <ServiceSection title={ui.hubPlansTitle}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">{ui.hubPlansBody}</p>
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PLANS.map(plan => (
            <li key={plan} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-2xl font-black text-white">{PLAN_NAME[plan][lang]}</h3>
              <p className="text-slate-400 leading-relaxed mt-2">{PLAN_DESCRIPTION[plan][lang]}</p>
              <ul className="mt-4 space-y-2">
                {CATALOG.filter(f => f.plan === plan).map(f => {
                  const page = pageForFeature(f.key);
                  return (
                    <li key={f.key} className="flex gap-2 text-slate-300 leading-relaxed">
                      <span aria-hidden="true" className="text-brand-orange">&#10003;</span>
                      {page ? <Link to={lp(featurePath(page.slug))} className="underline underline-offset-4 hover:text-brand-orange transition-colors">{f.name[lang]}</Link> : <span>{f.name[lang]}</span>}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4"><PlanChip plan={plan} lang={lang} ui={ui} /></div>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to={lp(MEAL_PREP_ORDERING_PATH)} className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors self-center">
            {ui.hubPlansLink} &rarr;
          </Link>
          <Link to={lp(DEMO_GUIDE_PATH)} className={primaryButtonClass}>{ui.hubGuideCta}</Link>
        </div>
      </ServiceSection>

      <ServiceClosing title={ui.closingTitle} body={ui.closingBody}>
        <FeatureActions ui={ui} />
      </ServiceClosing>
    </ServicePage>
  );
}
