import { Link } from 'react-router-dom';
import { useLocalePath, useT } from '../i18n/useLang';
import common from '../i18n/common';

export default function NotFound() {
  const t = useT(common).notFound;
  const lp = useLocalePath();

  return (
    <section className="max-w-3xl mx-auto px-6 pt-40 pb-32 text-center flex flex-col items-center gap-6">
      <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{t.eyebrow}</p>
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{t.title}</h1>
      <p className="text-slate-400 text-lg">{t.body}</p>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <Link to={lp('/')} className="bg-brand-orange text-white px-6 py-3 rounded-md font-bold tracking-wide hover:opacity-90 transition-opacity">
          {t.home}
        </Link>
        <Link to={lp('/contact')} className="border-2 border-white text-white px-6 py-3 rounded-md font-bold tracking-wide hover:bg-white hover:text-slate-900 transition-colors">
          {t.contact}
        </Link>
      </div>
    </section>
  );
}
