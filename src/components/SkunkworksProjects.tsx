import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SKUNKWORKS_PROJECTS, type ProjectStatus, type SkunkworksProject } from '../config/skunkworksProjects';
import { useLang, useLocalePath, useT } from '../i18n/useLang';
import copy from '../i18n/skunkworksProjects';

const STATUS_ORDER: ProjectStatus[] = ['concept', 'prototype', 'in-use'];

const FILTERS: (ProjectStatus | 'all')[] = ['all', 'concept', 'prototype', 'in-use'];

const BADGE: Record<ProjectStatus, { pill: string; dot: string }> = {
  concept: { pill: 'bg-slate-800 border-slate-700 text-slate-300', dot: 'bg-slate-400' },
  prototype: { pill: 'bg-blue-500/10 border-blue-500/30 text-blue-400', dot: 'bg-blue-400' },
  'in-use': { pill: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', dot: 'bg-emerald-400' },
};

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className={`inline-flex items-center gap-2 border px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${BADGE[status].pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${BADGE[status].dot}`} aria-hidden="true"></span>
      {label}
    </span>
  );
}

interface Props {
  /** Opens the contact modal for a pilot inquiry about this project; title is in the page's language. */
  onPilot: (project: SkunkworksProject, title: string) => void;
}

// "What we're building next" on /skunkworks: a status legend, a status filter
// and one card per project from src/config/skunkworksProjects.ts, with its
// text from src/i18n/skunkworksProjects.ts.
export default function SkunkworksProjects({ onPilot }: Props) {
  const t = useT(copy);
  const lp = useLocalePath();
  // Spanish filter labels are longer: tighten them on phones so all four stay on one row.
  const tight = useLang() === 'es';
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  const shown = filter === 'all' ? SKUNKWORKS_PROJECTS : SKUNKWORKS_PROJECTS.filter(p => p.status === filter);

  return (
    <section aria-labelledby="building-next" className="text-left">
      {/* Spacing uses flex gap, not margins: index.css has unlayered p / h2 / h3
          margin rules that beat Tailwind's mb-* utilities. */}
      <div className="mb-8 max-w-3xl flex flex-col gap-3">
        <h2 id="building-next" className="text-3xl md:text-4xl font-black text-white">{t.heading}</h2>
        <p className="text-slate-400 leading-relaxed">
          {t.intro}
        </p>
      </div>

      {/* Legend */}
      <dl className="grid gap-3 sm:grid-cols-3 mb-6">
        {STATUS_ORDER.map(status => (
          <div key={status} className="flex flex-col items-start gap-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
            <dt><StatusBadge status={status} label={t.statuses[status].label} /></dt>
            <dd className="text-sm text-slate-400">{t.statuses[status].meaning}</dd>
          </div>
        ))}
      </dl>

      {/* Filter: native buttons, so Tab / Enter / Space work without extra code. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8">
        <div role="group" aria-label={t.filterGroupLabel} className="inline-flex flex-wrap gap-1 bg-slate-900/80 border border-slate-800 rounded-full p-1">
          {FILTERS.map(value => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`${tight ? 'px-2.5 tracking-wide' : 'px-3 tracking-wider'} sm:px-4 py-2 rounded-full text-xs font-bold uppercase sm:tracking-widest transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${filter === value ? 'bg-brand-orange text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {t.filters[value]}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-xs text-slate-500">
          {t.showing(shown.length, SKUNKWORKS_PROJECTS.length)}
        </p>
      </div>

      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {shown.map(project => {
          const text = t.projects[project.slug];
          return (
            <li key={project.slug} className="flex flex-col gap-4 bg-[#020617]/80 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
              <div><StatusBadge status={project.status} label={t.statuses[project.status].label} /></div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-xl">{text.title}</h3>
                <p className="text-brand-orange text-sm font-semibold">{text.hook}</p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{text.description}</p>
              {text.note && <p className="text-slate-500 text-xs">{text.note}</p>}

              <div className="mt-auto pt-2">
                <ul className="flex flex-wrap gap-2 mb-6" aria-label={t.builtOnLabel(text.title)}>
                  {text.builtOn.map(tech => (
                    <li key={tech} className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">{tech}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <button
                    type="button"
                    onClick={() => onPilot(project, text.title)}
                    aria-label={t.pilotAria(text.title)}
                    className="bg-brand-orange/10 border border-brand-orange/60 text-brand-orange px-5 py-2.5 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-brand-orange hover:text-white transition-colors cursor-pointer"
                  >
                    {t.pilotCta}
                  </button>
                  {project.link && (
                    <Link to={lp(project.link.to)} className="text-xs font-bold text-slate-300 underline underline-offset-4 hover:text-brand-orange transition-colors">
                      {text.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
