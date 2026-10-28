import { PHONE_HREF } from '../config/site';
import {
  CheckList, ServiceClosing, ServiceFaq, ServiceHero, ServicePage, ServiceSection, StepList,
  TalkToAlexButton, secondaryButtonClass,
} from '../components/ServicePage';
import { useT } from '../i18n/useLang';
import common from '../i18n/common';
import answeringService, { ANSWERING_SERVICE_PATH } from '../i18n/answeringService';

export default function AnsweringService() {
  const t = useT(answeringService);
  const { callAriaLabel } = useT(common);

  const ctas = (
    <>
      <div className="flex flex-wrap gap-3">
        <TalkToAlexButton label={t.ctaAlex} />
        <a href={PHONE_HREF} aria-label={callAriaLabel} className={secondaryButtonClass}>{t.ctaCall}</a>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mt-4">{t.tryNote}</p>
    </>
  );

  return (
    <ServicePage>
      <ServiceHero eyebrow={t.eyebrow} title={t.title} intro={t.intro}>{ctas}</ServiceHero>

      <ServiceSection title={t.what.title}>
        <CheckList items={t.what.items} />
      </ServiceSection>

      <ServiceSection title={t.built.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{t.built.body}</p>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mt-4">{t.built.proof}</p>
      </ServiceSection>

      <ServiceSection title={t.how.title}>
        <StepList steps={t.how.steps} />
      </ServiceSection>

      <ServiceSection title={t.compare.title}>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-6">{t.compare.intro}</p>
        <CheckList items={t.compare.items} />
      </ServiceSection>

      <ServiceFaq title={t.faqTitle} items={t.faq} path={ANSWERING_SERVICE_PATH} />

      <ServiceClosing title={t.closing.title} body={t.closing.body}>{ctas}</ServiceClosing>
    </ServicePage>
  );
}
