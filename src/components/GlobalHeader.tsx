import React from 'react';
import { Link } from 'react-router-dom';
import { EMAIL, EMAIL_HREF } from '../config/site';
import LetsTalkChooser from './LetsTalkChooser';
import LangToggle from './LangToggle';
import { langToggleVisible } from '../i18n/lang';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import common from '../i18n/common';

// Services goes to the homepage's services grid (ScrollToTop scrolls to #services);
// the Engine page (/automations) is one of its cards, and is in the footer.
const NAV_LINKS = [
  { to: '/', key: 'hub' },
  { to: '/#services', key: 'services' },
  { to: '/portfolio', key: 'caseStudies' },
  { to: '/skunkworks', key: 'skunkworks' },
  { to: '/contact', key: 'contact' },
] as const;

export default function GlobalHeader() {
  const t = useT(common);
  const lp = useLocalePath();
  const lang = useLang();
  const showToggle = langToggleVisible(lang);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="site-container h-20 flex items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">

          {/* The emblem is decorative (empty alt); the wordmark names the link. Below xl the
              wordmark is visually hidden but stays readable, so the link keeps its name.
              Spanish nav labels run longer, so there it waits until 1360px or it overlaps the nav. */}
          <Link to={lp('/')} className="flex items-center gap-3 shrink-0 lg:justify-self-start">
            <picture className="shrink-0">
              <source srcSet="/cg-strategic-mark.webp" type="image/webp" />
              <img src="/cg-strategic-mark.png" alt="" width={48} height={48} className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
            </picture>
            <span className={lang === 'es'
              ? 'sr-only min-[1360px]:not-sr-only min-[1360px]:flex min-[1360px]:items-center min-[1360px]:gap-2'
              : 'sr-only xl:not-sr-only xl:flex xl:items-center xl:gap-2'}>
              <span className="text-2xl font-black text-white tracking-tighter">CG</span>{' '}
              <span className="text-2xl font-black text-brand-orange tracking-tighter">STRATEGIC</span>
            </span>
          </Link>

          <nav aria-label={t.mainNavLabel} className="hidden lg:flex items-center gap-6 lg:justify-self-center">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={lp(link.to)}
                className="text-sm font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap"
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 lg:justify-self-end">
            {/* The main nav is desktop-only, so give small screens their own Contact link.
                On phones it gives way to the EN | ES toggle (the link under Let's Talk
                also goes to /contact), or the header runs off the screen. */}
            <LangToggle />
            <Link
              to={lp('/contact')}
              className={`${showToggle ? 'hidden sm:inline' : ''} lg:hidden text-xs font-bold tracking-widest uppercase text-slate-300 hover:text-brand-orange transition-colors whitespace-nowrap`}
            >
              {t.nav.contact}
            </Link>
            <a
              href={EMAIL_HREF}
              aria-label={t.emailAriaLabel}
              title={EMAIL}
              className="flex items-center p-2 text-slate-300 hover:text-brand-orange transition-colors"
            >
              <svg className="w-5 h-5 text-brand-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
            <div className="flex flex-col items-center gap-1">
              <LetsTalkChooser />
              <Link
                to={lp('/contact')}
                className="text-[10px] font-semibold tracking-wide text-slate-400 hover:text-brand-orange transition-colors whitespace-nowrap"
              >
                {t.orSendMessage}
              </Link>
            </div>
          </div>
          
        </div>
      </header>
    </>
  );
}
