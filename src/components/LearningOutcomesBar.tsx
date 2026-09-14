import React from 'react';
import { LearningOutcome, LearningOutcomeId, Sprint } from '../types';
import { LEARNING_OUTCOMES } from '../data/initialData';
import { Award, Filter, CheckCircle2 } from 'lucide-react';

interface LearningOutcomesBarProps {
  sprints: Sprint[];
  selectedOutcome: LearningOutcomeId | 'ALL';
  onSelectOutcome: (outcome: LearningOutcomeId | 'ALL') => void;
}

export const LearningOutcomesBar: React.FC<LearningOutcomesBarProps> = ({
  sprints,
  selectedOutcome,
  onSelectOutcome,
}) => {
  // Count how many sprints demonstrate each outcome
  const getOutcomeCount = (outcomeId: LearningOutcomeId) => {
    return sprints.filter((s) => s.demonstratedOutcomes.includes(outcomeId)).length;
  };

  return (
    <section
      id="learning-outcomes-section"
      className="border-b border-neutral-800 bg-neutral-950 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">
              <Award className="h-3.5 w-3.5" />
              Eindkwalificaties & Toetsing
            </div>
            <h2 id="learning-outcomes-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Leeruitkomsten (LU1 t/m LU5)
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl font-light">
              De minor toetst op 5 integrale leeruitkomsten. Klik op een leeruitkomst om de sprints te filteren waarin deze wordt aangetoond.
            </p>
          </div>

          {/* Quick Filter toggle indicator */}
          <div className="flex items-center gap-2">
            <button
              id="filter-all-outcomes-btn"
              type="button"
              onClick={() => onSelectOutcome('ALL')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedOutcome === 'ALL'
                  ? 'bg-neutral-900 text-white border border-neutral-700 shadow-sm'
                  : 'bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              <Filter className="h-3.5 w-3.5 text-neutral-400" />
              <span>Toon alle sprints ({sprints.length})</span>
            </button>
          </div>
        </div>

        {/* 5 Outcomes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {LEARNING_OUTCOMES.map((outcome) => {
            const count = getOutcomeCount(outcome.id);
            const isSelected = selectedOutcome === outcome.id;

            return (
              <div
                key={outcome.id}
                id={`outcome-card-${outcome.id}`}
                onClick={() => onSelectOutcome(isSelected ? 'ALL' : outcome.id)}
                className={`relative flex flex-col justify-between rounded-3xl border p-5 sm:p-6 transition-all cursor-pointer group select-none shadow-sm ${
                  isSelected
                    ? 'border-blue-500/80 bg-neutral-900 shadow-lg shadow-blue-900/15 ring-1 ring-blue-500/40'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/80'
                }`}
              >
                <div>
                  {/* Badge & Sprints Count */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold font-mono ${
                        isSelected
                          ? 'bg-blue-500 text-neutral-950'
                          : 'bg-neutral-950 text-blue-400 border border-blue-500/30 group-hover:border-blue-500/50'
                      }`}
                    >
                      {outcome.code}
                    </span>

                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800"
                      title={`${count} van de 8 sprints tonen deze leeruitkomst aan`}
                    >
                      <CheckCircle2 className="h-3 w-3 text-blue-400" />
                      <span>{count}/8</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                    {outcome.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light">
                    {outcome.shortDesc}
                  </p>
                </div>

                {/* Bottom hint */}
                <div className="mt-5 pt-3 border-t border-neutral-800/80 text-[11px] font-medium flex items-center justify-between text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  <span>{isSelected ? 'Filter actief' : 'Klik om te filteren'}</span>
                  <span className="text-xs">{isSelected ? '✕' : '→'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedOutcome !== 'ALL' && (
          <div
            id="active-outcome-filter-banner"
            className="mt-4 rounded-xl border border-blue-500/30 bg-blue-600/10 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-blue-300"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">{selectedOutcome}:</span>
              <span>
                Gefilterd op {LEARNING_OUTCOMES.find((o) => o.id === selectedOutcome)?.title} (
                {getOutcomeCount(selectedOutcome)} sprints gevonden)
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectOutcome('ALL')}
              className="text-xs font-semibold underline hover:text-white cursor-pointer ml-3 shrink-0"
            >
              Wis filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
