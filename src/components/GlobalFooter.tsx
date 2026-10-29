import { Link, useLocation } from 'react-router-dom';
import { PHONE_HREF, PHONE_DISPLAY, EMAIL, EMAIL_HREF, LEGAL_BUSINESS_NAME } from '../config/site';
import MailingAddress from './MailingAddress';
import ContactForm from './ContactForm';
import { stripLang } from '../i18n/lang';
import { useLocalePath, useT } from '../i18n/useLang';
import common from '../i18n/common';
import contactDict from '../i18n/contact';

const linkClass = 'text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-brand-orange transition-colors';

// Four columns (services, free tools, company, contact), the short message
// form, then the legal line with Privacy and Terms.
export default function GlobalFooter() {
  const t = useT(common);
  const contact = useT(contactDict).page;
  const lp = useLocalePath();
  // /contact has the full form already; one is enough on that page.
  const onContactPage = stripLang(useLocation().pathname).replace(/\/+$/, '') === '/contact';

  const columns: { heading: string; links: [path: string, label: string][] }[] = [
    {
      heading: t.footer.services,
      links: [
        ['/automations', t.nav.engine],
        ['/answering-service', t.nav.answeringService],
        ['/meal-prep-ordering', t.nav.mealPrepOrdering],
        ['/search-ai-visibility', t.nav.searchAi],
        ['/portfolio', t.nav.websites],
      ],
    },
    {
      heading: t.footer.freeTools,
      links: [
        ['/website-check', t.nav.websiteCheck],
        ['/missed-call-calculator', t.nav.missedCallCalculator],
        ['/meal-prep-calculator', t.nav.mealPrep],
      ],
    },
    {
      heading: t.footer.company,
      links: [
        ['/portfolio', t.nav.caseStudies],
        ['/skunkworks', t.nav.skunkworks],
        ['/faq', t.nav.faq],
        ['/contact', t.nav.contact],
      ],
    },
  ];

  return (
    <footer className="bg-[#020617] border-t border-slate-900 pt-16 pb-8 relative z-10">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          {columns.map(column => (
            <div key={column.heading} className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">{column.heading}</h4>
              {column.links.map(([path, label]) => (
                <Link key={label} to={lp(path)} className={linkClass}>{label}</Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-black tracking-widest uppercase text-xs mb-2">{t.footer.contact}</h4>
            <a href={PHONE_HREF} aria-label={t.callAriaLabel} className="text-sm font-bold tracking-widest text-slate-300 hover:text-brand-orange transition-colors">
              {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              aria-label={t.emailAriaLabel}
              className="text-sm md:text-xs xl:text-sm font-bold tracking-widest text-slate-300 hover:text-brand-orange transition-colors"
            >
              {EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}
            </a>
            <p className="text-xs text-slate-400 font-semibold tracking-wide">{t.footer.serving}</p>
            {/* The mailing address stays: SMS (A2P) and email rules expect a physical address. */}
            <MailingAddress className="text-xs font-semibold tracking-wide leading-relaxed text-slate-500" />
          </div>
        </div>
        {/* A short message form on every page, in the pre-rendered HTML. Same form,
            labels and Make.com webhook as /contact, tagged "Footer" in the leads sheet. */}
        {!onContactPage && (
          <div className="border-t border-slate-900 pt-12 mb-12 max-w-2xl mx-auto md:mx-0 text-left">
            <h4 className="text-white font-black tracking-widest uppercase text-xs mb-6 text-center md:text-left">{contact.formTitle}</h4>
            <ContactForm source="Footer" copy={contact.form} />
          </div>
        )}

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center gap-3 md:gap-6 text-xs font-bold tracking-widest uppercase">
          <p className="text-slate-600">&copy; {new Date().getFullYear()} {LEGAL_BUSINESS_NAME}. {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link to={lp('/privacy')} className="text-slate-500 hover:text-brand-orange transition-colors">{t.nav.privacy}</Link>
            <Link to={lp('/terms')} className="text-slate-500 hover:text-brand-orange transition-colors">{t.nav.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
