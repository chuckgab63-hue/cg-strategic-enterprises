import { Link } from 'react-router-dom';
import { ONE_SOURCE_CASE_STUDY } from '../config/caseStudies';
import { useLocalePath, useT } from '../i18n/useLang';
import caseStudyCard from '../i18n/caseStudyCard';

// The build's admin dashboard (demo data), 27 KB, lazy-loaded. Cropped from the
// top (object-bottom) to leave out the sidebar logo: the card doesn't name the client.
const IMAGE = '/portfolio/onesource/onesource-admin-dashboard-mock-800w.webp';

/**
 * The featured pest control case study, linking to its full write-up. Shown
 * on the homepage (under the services grid) and on /portfolio.
 */
export default function PestCaseStudyCard({ heading: Heading = 'h3', onClick, className = '' }: {
  /** The card title's heading level: h3 under the homepage's Services, h2 on /portfolio. */
  heading?: 'h2' | 'h3';
  onClick?: () => void;
  className?: string;
}) {
  const t = useT(caseStudyCard);
  const lp = useLocalePath();
  return (
    <Link
      to={lp(ONE_SOURCE_CASE_STUDY.path)}
      onClick={onClick}
      className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left bg-gradient-to-br from-slate-900 to-[#020617] border border-brand-orange/30 hover:border-brand-orange/60 rounded-3xl p-6 md:p-10 transition-colors shadow-[0_0_30px_rgba(255,95,31,0.08)] ${className}`}
    >
      <div>
        <span className="inline-block px-3 py-1 bg-[#020617] border border-slate-700 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
          {t.badge}
        </span>
        <Heading className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mt-5">{t.title}</Heading>
        <p className="text-slate-400 leading-relaxed mt-4">{t.body}</p>
        <ul className="flex flex-wrap gap-2 mt-5">
          {t.chips.map(chip => (
            <li key={chip} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-950/60 text-xs font-semibold text-slate-300">{chip}</li>
          ))}
        </ul>
        <span className="inline-block mt-6 bg-brand-orange text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs group-hover:bg-white group-hover:text-brand-orange transition-colors shadow-[0_0_15px_rgba(255,95,31,0.3)]">
          {t.cta} <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
      <div className="rounded-2xl overflow-hidden border border-slate-800 aspect-[800/464] bg-[#fdfaf3]">
        <img
          src={IMAGE}
          alt={t.imageAlt}
          width={800} height={500}
          loading="lazy" decoding="async"
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    </Link>
  );
}
