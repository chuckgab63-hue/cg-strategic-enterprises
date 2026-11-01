import { use } from 'react';
import { useLocation } from 'react-router-dom';
import { PLAN_DESCRIPTION, PLAN_NAME, type PlanKey } from '../config/mealPrepFeatureCatalog';
import {
  Breadcrumbs, DemoLinks, FeatureActions, GrowList, HowBlocks, IncludedFeatures, RelatedFeatures,
} from '../components/FeaturePageParts';
import { ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection } from '../components/ServicePage';
import { DEMO_BASE, FEATURES_UI, MEAL_PREP_FEATURES_PATH, MEAL_PREP_ORDERING_PATH, featurePath, loadFeaturePages, slugFromPath } from '../i18n/mealPrepFeatures';
import { stripLang } from '../i18n/lang';
import { useLang } from '../i18n/useLang';
import NotFound from './NotFound';

const PLANS: PlanKey[] = ['basic', 'advanced', 'pro'];

// One component for all eleven feature pages: the path picks the page
// (src/i18n/mealPrepFeatures.ts), so each URL is still its own pre-rendered file.
export default function MealPrepFeature() {
  const lang = useLang();
  const { pathname } = useLocation();
  const pages = use(loadFeaturePages(lang));
  const slug = slugFromPath(stripLang(pathname));
  const page = pages.find(p => p.slug === slug);
  if (!slug || !page) return <NotFound />;

  const ui = FEATURES_UI[lang];
  const path = featurePath(slug);
  const demoUrl = `${DEMO_BASE}${page.demo[0].path}${page.demo[0].path.includes('?') ? '&' : '?'}lang=${lang}`;
  const crumbs = [
    { name: ui.breadcrumbHome, path: '/' },
    { name: ui.breadcrumbMealPrep, path: MEAL_PREP_ORDERING_PATH },
    { name: ui.breadcrumbFeatures, path: MEAL_PREP_FEATURES_PATH },
    { name: page.navTitle, path },
  ];

  return (
    <ServicePage>
      <Breadcrumbs crumbs={crumbs} label={ui.nav} lang={lang} />
      <div className="mt-8">
        <ServiceHero eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
          <FeatureActions ui={ui} demoUrl={demoUrl} />
        </ServiceHero>
      </div>

      <ServiceSection title={ui.problemTitle}>
        <div className="space-y-4 max-w-3xl">
          {page.problem.map(p => (
            <p key={p} className="text-slate-300 text-lg leading-relaxed border-l-4 border-brand-orange/60 pl-5 italic">{p}</p>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title={ui.howTitle}>
        <p className="text-slate-400 leading-relaxed max-w-3xl mb-8">{ui.howIntro}</p>
        <HowBlocks blocks={page.how} lang={lang} ui={ui} />
      </ServiceSection>

      {page.features.length > 0 ? (
        <IncludedFeatures page={page} lang={lang} ui={ui} />
      ) : (
        <ServiceSection title={ui.setupPlansTitle}>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{ui.includedIntro}</p>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map(plan => (
              <li key={plan} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                <h3 className="text-xl font-black text-white">{PLAN_NAME[plan][lang]}</h3>
                <p className="text-slate-400 leading-relaxed mt-2">{PLAN_DESCRIPTION[plan][lang]}</p>
              </li>
            ))}
          </ol>
        </ServiceSection>
      )}

      <ServiceSection title={ui.growTitle}>
        <GrowList items={page.grow} />
      </ServiceSection>

      <DemoLinks links={page.demo} lang={lang} ui={ui} />

      <ServiceFaq title={ui.faqTitle} items={page.faq} path={path} />

      <RelatedFeatures page={page} pages={pages} ui={ui} />

      <ServiceClosing title={ui.closingTitle} body={ui.closingBody}>
        <FeatureActions ui={ui} />
      </ServiceClosing>
    </ServicePage>
  );
}
