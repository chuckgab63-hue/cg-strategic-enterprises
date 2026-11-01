import { Link } from 'react-router-dom';
import { FEATURE_SCREENS } from '../config/featureScreens';
import { PLAN_NAME, featureByKey, type PlanKey } from '../config/mealPrepFeatureCatalog';
import { breadcrumbJsonLdText, type Crumb } from '../i18n/breadcrumbs';
import { PHONE_DISPLAY, PHONE_HREF } from '../config/site';
import { DEMO_GUIDE_PATH } from '../i18n/demoGuide';
import type { Lang } from '../i18n/lang';
import {
  DEMO_BASE, demoLinkFor, featurePath, type FeaturePage, type FeaturesUi, type HowBlock, type ScreenRef,
} from '../i18n/mealPrepFeatures';
import { useLocalePath } from '../i18n/useLang';
import { ServiceSection, TalkToAlexButton, primaryButtonClass, secondaryButtonClass } from './ServicePage';

// Pieces shared by the feature hub and the eleven feature pages
// (src/pages/MealPrepFeatures.tsx, MealPrepFeature.tsx).

export function Breadcrumbs({ crumbs, label, lang }: { crumbs: Crumb[]; label: string; lang: Lang }) {
  const lp = useLocalePath();
  return (
    <nav aria-label={label} className="text-sm text-slate-400">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLdText(crumbs, lang) }} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-slate-200">{crumb.name}</span>
              ) : (
                <Link to={lp(crumb.path)} className="underline underline-offset-4 hover:text-brand-orange transition-colors">{crumb.name}</Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** A real screenshot of the demo: lazy-loaded, with its size so the page never shifts. */
export function FeatureShot({ screen, lang, ui }: { screen: ScreenRef; lang: Lang; ui: FeaturesUi }) {
  const entry = FEATURE_SCREENS[screen.id];
  if (!entry) return null;
  const wanted = screen.forceLang ?? lang;
  const shown: Lang = wanted === 'es' && entry.es ? 'es' : 'en';
  const size = entry[shown] ?? entry.en;
  const inEnglishOnSpanishPage = lang === 'es' && !screen.forceLang && shown === 'en';
  const phone = size.w < 600;
  const tall = !phone && size.h / size.w > 1;
  return (
    <figure className="m-0">
      <div className={`${phone ? 'max-w-[260px] mx-auto' : ''} ${tall ? 'max-h-[560px] overflow-hidden' : ''} rounded-2xl border border-slate-700 bg-white`}>
        <img
          src={`/feature-screens/${screen.id}.${shown}.webp`}
          width={size.w}
          height={size.h}
          alt={screen.alt}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="block w-full h-auto"
        />
      </div>
      <figcaption className="text-slate-400 text-sm leading-relaxed mt-2">
        {screen.caption}
        {inEnglishOnSpanishPage && !/\(en inglés\)/.test(screen.caption) ? ` ${ui.englishShot}` : ''}
      </figcaption>
    </figure>
  );
}

const SIDE_STYLE: Record<HowBlock['side'], string> = {
  customer: 'bg-sky-500/10 border-sky-400/30 text-sky-200',
  admin: 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange',
  setup: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200',
};

export function HowBlocks({ blocks, lang, ui }: { blocks: HowBlock[]; lang: Lang; ui: FeaturesUi }) {
  return (
    <div className="space-y-10">
      {blocks.map(block => (
        <article key={block.title} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
          <div className={block.screen ? 'lg:col-span-2' : 'lg:col-span-5 max-w-3xl'}>
            <p className={`inline-block border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${SIDE_STYLE[block.side]}`}>{ui.side[block.side]}</p>
            <h3 className="text-xl md:text-2xl font-black text-white mt-3">{block.title}</h3>
            <p className="text-slate-300 leading-relaxed mt-3">{block.body}</p>
            {block.points && (
              <ul className="mt-4 space-y-2">
                {block.points.map(point => (
                  <li key={point} className="flex gap-2 text-slate-300 leading-relaxed">
                    <span aria-hidden="true" className="text-brand-orange">&#10003;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {block.screen && (
            <div className="lg:col-span-3">
              <FeatureShot screen={block.screen} lang={lang} ui={ui} />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

const PLAN_RANK: Record<PlanKey, number> = { basic: 0, advanced: 1, pro: 2 };

export function PlanChip({ plan, lang, ui }: { plan: PlanKey; lang: Lang; ui: FeaturesUi }) {
  const tone = plan === 'basic' ? 'border-emerald-400/40 text-emerald-200' : plan === 'advanced' ? 'border-sky-400/40 text-sky-200' : 'border-brand-orange/50 text-brand-orange';
  return <span className={`inline-block border rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{ui.planLabel(PLAN_NAME[plan][lang], plan)}</span>;
}

/** The features a page covers, each with the plan that includes it. */
export function IncludedFeatures({ page, lang, ui }: { page: FeaturePage; lang: Lang; ui: FeaturesUi }) {
  const features = page.features.map(featureByKey).sort((a, b) => PLAN_RANK[a.plan] - PLAN_RANK[b.plan]);
  return (
    <ServiceSection title={ui.includedTitle}>
      <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{ui.includedIntro}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(f => (
          <li key={f.key} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5">
            <h3 className="text-lg font-black text-white">{f.name[lang]}</h3>
            <p className="text-slate-400 leading-relaxed mt-1 mb-3">{f.description[lang]}</p>
            <PlanChip plan={f.plan} lang={lang} ui={ui} />
          </li>
        ))}
      </ul>
    </ServiceSection>
  );
}

export function GrowList({ items }: { items: FeaturePage['grow'] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(item => (
        <li key={item.title} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-lg font-black text-white">{item.title}</h3>
          <p className="text-slate-300 leading-relaxed mt-2">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** "Try it in the demo": deep links to the exact screens, in a new tab, in this page's language. */
export function DemoLinks({ links, lang, ui }: { links: FeaturePage['demo']; lang: Lang; ui: FeaturesUi }) {
  const hasAdmin = links.some(l => l.side === 'admin');
  return (
    <ServiceSection title={ui.demoTitle}>
      <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{ui.demoIntro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(['customer', 'admin'] as const).map(side => {
          const group = links.filter(l => l.side === side);
          if (group.length === 0) return null;
          return (
            <div key={side} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-white font-black text-lg">{ui.demoSide[side]}</h3>
              <ul className="mt-3 space-y-2">
                {group.map(link => (
                  <li key={link.path}>
                    <a href={demoLinkFor(DEMO_BASE, link.path, lang)} target="_blank" rel="noopener" className="text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
                      {link.label} &rarr;<span className="sr-only"> {ui.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {hasAdmin && <p className="text-slate-400 text-sm leading-relaxed mt-4">{ui.demoAdminNote}</p>}
    </ServiceSection>
  );
}

export function RelatedFeatures({ page, pages, ui }: { page: FeaturePage; pages: FeaturePage[]; ui: FeaturesUi }) {
  const lp = useLocalePath();
  return (
    <ServiceSection title={ui.relatedTitle}>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {page.related.map(slug => {
          const other = pages.find(p => p.slug === slug)!;
          return (
            <li key={slug} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-black text-white">
                <Link to={lp(featurePath(slug))} className="hover:text-brand-orange transition-colors">{other.navTitle}</Link>
              </h3>
              <p className="text-slate-400 leading-relaxed mt-2">{other.card}</p>
            </li>
          );
        })}
      </ul>
      <Link to={lp('/meal-prep-ordering/features')} className="inline-block mt-6 text-brand-orange font-bold underline underline-offset-4 hover:text-white transition-colors">
        {ui.allFeatures} &rarr;
      </Link>
    </ServiceSection>
  );
}

/** Calls to action: call, talk to Alex, and the demo guide. */
export function FeatureActions({ ui, demoUrl }: { ui: FeaturesUi; demoUrl?: string }) {
  const lp = useLocalePath();
  return (
    <div className="flex flex-wrap gap-3">
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noopener" className={primaryButtonClass}>
          {ui.ctaDemo}<span className="sr-only"> {ui.newTab}</span>
        </a>
      )}
      <TalkToAlexButton label={ui.ctaAlex} className={demoUrl ? secondaryButtonClass : primaryButtonClass} />
      {!demoUrl && (
        <a href={PHONE_HREF} className={secondaryButtonClass}>{PHONE_DISPLAY}</a>
      )}
      {!demoUrl && <Link to={lp(DEMO_GUIDE_PATH)} className={secondaryButtonClass}>{ui.guideLink}</Link>}
    </div>
  );
}
