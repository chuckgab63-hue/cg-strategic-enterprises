import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SKUNKWORKS_PROJECTS, STATUS_INFO, type ProjectStatus, type SkunkworksProject,
} from '../config/skunkworksProjects';

const STATUS_ORDER: ProjectStatus[] = ['concept', 'prototype', 'in-use'];

const FILTERS: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'concept', label: 'Concept' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'in-use', label: 'In use' },
];

const BADGE: Record<ProjectStatus, { pill: string; dot: string }> = {
  concept: { pill: 'bg-slate-800 border-slate-700 text-slate-300', dot: 'bg-slate-400' },
  prototype: { pill: 'bg-blue-500/10 border-blue-500/30 text-blue-400', dot: 'bg-blue-400' },
  'in-use': { pill: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', dot: 'bg-emerald-400' },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 border px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${BADGE[status].pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${BADGE[status].dot}`} aria-hidden="true"></span>
      {STATUS_INFO[status].label}
    </span>
  );
}

interface Props {
  /** Opens the contact modal for a pilot inquiry about this project. */
  onPilot: (project: SkunkworksProject) => void;
}

// "What we're building next" on /skunkworks: a status legend, a status filter
// and one card per project from src/config/skunkworksProjects.ts.
export default function SkunkworksProjects({ onPilot }: Props) {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  const shown = filter === 'all' ? SKUNKWORKS_PROJECTS : SKUNKWORKS_PROJECTS.filter(p => p.status === filter);

  return (
    <section aria-labelledby="building-next" className="text-left">
      {/* Spacing uses flex gap, not margins: index.css has unlayered p / h2 / h3
          margin rules that beat Tailwind's mb-* utilities. */}
      <div className="mb-8 max-w-3xl flex flex-col gap-3">
        <h2 id="building-next" className="text-3xl md:text-4xl font-black text-white">What we're building next</h2>
        <p className="text-slate-400 leading-relaxed">
          Automation ideas for local service businesses, at different stages. Each card says honestly where it stands. If one fits your business, we're looking for pilot partners.
        </p>
      </div>

      {/* Legend */}
      <dl className="grid gap-3 sm:grid-cols-3 mb-6">
        {STATUS_ORDER.map(status => (
          <div key={status} className="flex flex-col items-start gap-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
            <dt><StatusBadge status={status} /></dt>
            <dd className="text-sm text-slate-400">{STATUS_INFO[status].meaning}</dd>
          </div>
        ))}
      </dl>

      {/* Filter: native buttons, so Tab / Enter / Space work without extra code. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8">
        <div role="group" aria-label="Filter projects by status" className="inline-flex flex-wrap gap-1 bg-slate-900/80 border border-slate-800 rounded-full p-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${filter === f.value ? 'bg-brand-orange text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-xs text-slate-500">
          Showing {shown.length} of {SKUNKWORKS_PROJECTS.length} projects
        </p>
      </div>

      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {shown.map(project => (
          <li key={project.slug} className="flex flex-col gap-4 bg-[#020617]/80 border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-slate-700 transition-colors">
            <div><StatusBadge status={project.status} /></div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white font-bold text-xl">{project.title}</h3>
              <p className="text-brand-orange text-sm font-semibold">{project.hook}</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
            {project.note && <p className="text-slate-500 text-xs">{project.note}</p>}

            <div className="mt-auto pt-2">
              <ul className="flex flex-wrap gap-2 mb-6" aria-label={`${project.title} is built on`}>
                {project.builtOn.map(tech => (
                  <li key={tech} className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">{tech}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={() => onPilot(project)}
                  aria-label={`Want to pilot ${project.title}?`}
                  className="bg-brand-orange/10 border border-brand-orange/60 text-brand-orange px-5 py-2.5 rounded-lg font-bold tracking-widest uppercase text-xs hover:bg-brand-orange hover:text-white transition-colors cursor-pointer"
                >
                  Want to pilot this?
                </button>
                {project.link && (
                  <Link to={project.link.to} className="text-xs font-bold text-slate-300 underline underline-offset-4 hover:text-brand-orange transition-colors">
                    {project.link.label}
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
