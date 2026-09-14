import React from 'react';
import { Sprint, LearningOutcomeId } from '../types';
import { SprintCard } from './SprintCard';
import { Calendar, Filter, Sparkles } from 'lucide-react';

interface SprintListProps {
  sprints: Sprint[];
  selectedOutcome: LearningOutcomeId | 'ALL';
  onEditSprint: (sprint: Sprint) => void;
  onAddEvidence: (sprint: Sprint) => void;
}

export const SprintList: React.FC<SprintListProps> = ({
  sprints,
  selectedOutcome,
  onEditSprint,
  onAddEvidence,
}) => {
  // Filter sprints if an outcome is selected
  const displayedSprints =
    selectedOutcome === 'ALL'
      ? sprints
      : sprints.filter((s) => s.demonstratedOutcomes.includes(selectedOutcome));

  const scrollToSprint = (sprintNumber: number) => {
    const el = document.getElementById(`sprint-card-${sprintNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="sprints-section" className="py-14 sm:py-20 relative bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">
              <Calendar className="h-3.5 w-3.5" />
              Chronologisch Traject
            </div>
            <h2 id="sprints-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Sprints 1 t/m 8
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl font-light">
              Chronologisch overzicht van alle 8 sprints van elk twee weken. Per sprint vind je de verrichte onderzoeken, gebouwde features, reflecties en bewijsstukken.
            </p>
          </div>

          {/* Quick Sprint Jump Navigation */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mr-2 hidden sm:inline">
              Spring naar:
            </span>
            {sprints.map((s) => (
              <button
                key={s.number}
                type="button"
                onClick={() => scrollToSprint(s.number)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs font-bold text-neutral-400 hover:border-blue-500/40 hover:bg-blue-600/10 hover:text-blue-400 transition-all cursor-pointer"
                title={`Spring naar Sprint ${s.number}`}
              >
                {s.number}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological List of Sprints */}
        {displayedSprints.length === 0 ? (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-12 text-center">
            <Filter className="mx-auto h-8 w-8 text-neutral-600 mb-3" />
            <h3 className="text-base font-bold text-white">Geen sprints gevonden voor dit filter</h3>
            <p className="text-sm text-neutral-400 mt-1">
              Er zijn momenteel geen sprints gekoppeld aan de geselecteerde leeruitkomst.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {displayedSprints.map((sprint) => (
              <SprintCard
                key={sprint.id}
                sprint={sprint}
                onEditSprint={onEditSprint}
                onAddEvidence={onAddEvidence}
                isFiltered={selectedOutcome !== 'ALL'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
