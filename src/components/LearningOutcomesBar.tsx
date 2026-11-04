import React from 'react';
import { LearningOutcome, LearningOutcomeId, Sprint } from '../types';
import { LEARNING_OUTCOMES } from '../data/initialData';
import { Award, Filter, CheckCircle2, Clock } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

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

  // Ingediend maar nog niet beoordeeld: telt nergens mee als behaald
  const getSubmittedCount = (outcomeId: LearningOutcomeId) => {
    return sprints.filter(
      (s) =>
        !s.demonstratedOutcomes.includes(outcomeId) &&
        (s.submittedOutcomes ?? []).includes(outcomeId)
    ).length;
  };

  return (
    <section
      id="learning-outcomes-section"
      className="border-b border-stone-200 bg-stone-50 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 mb-1">
              <Award className="h-3.5 w-3.5" />
              Eindkwalificaties & Toetsing
            </div>
            <h2 id="learning-outcomes-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Leeruitkomsten (LU1 t/m LU5)
            </h2>
            <p className="text-base text-stone-600 mt-1 max-w-2xl font-normal">
              De minor toetst op 5 integrale leeruitkomsten. Klik op een leeruitkomst om de sprints te filteren waarin deze wordt aangetoond.
            </p>
          </div>

          {/* Quick Filter toggle indicator */}
          <div className="flex items-center gap-2">
            <button
              id="filter-all-outcomes-btn"
              type="button"
              onClick={() => onSelectOutcome('ALL')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                selectedOutcome === 'ALL'
                  ? 'bg-white text-stone-900 border border-stone-300 shadow-sm'
                  : 'bg-white text-stone-600 hover:text-stone-800 border border-stone-200'
              }`}
            >
              <Filter className="h-3.5 w-3.5 text-stone-600" />
              <span>Toon alle sprints ({sprints.length})</span>
            </button>
          </div>
        </div>

        {/* Voortgang per leeruitkomst als radargrafiek */}
        <div
          id="learning-outcomes-chart"
          className="mb-8 rounded-3xl border border-stone-200 bg-white p-4 sm:p-6"
        >
          <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-stone-900">
              Voortgang per leeruitkomst
            </h3>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-stone-700" aria-label="Legenda">
              <li className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-emerald-500 border border-emerald-700" aria-hidden="true" />
                Behaald (beoordeeld)
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber-200 border border-dashed border-amber-700" aria-hidden="true" />
                Ingediend (nog niet beoordeeld)
              </li>
            </ul>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={LEARNING_OUTCOMES.map((outcome) => ({
                  subject: outcome.code,
                  fullTitle: outcome.title,
                  count: getOutcomeCount(outcome.id),
                  submitted: getSubmittedCount(outcome.id),
                  withSubmitted: getOutcomeCount(outcome.id) + getSubmittedCount(outcome.id),
                }))}
              >
                <PolarGrid stroke="#d6d3d1" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#44403c', fontSize: 14, fontWeight: 700 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, sprints.length]}
                  tick={{ fill: '#78716c', fontSize: 12 }}
                  tickCount={sprints.length + 1}
                />
                <Radar
                  name="Ingediend"
                  dataKey="withSubmitted"
                  stroke="#b45309"
                  fill="#f59e0b"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  strokeDasharray="4 3"
                />
                <Radar
                  name="Behaald"
                  dataKey="count"
                  stroke="#047857"
                  fill="#10b981"
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d6d3d1',
                    borderRadius: '0.75rem',
                    fontSize: '14px',
                  }}
                  labelStyle={{ color: '#1c1917', fontWeight: 700 }}
                  formatter={(value: number, name: string, item: { payload?: { submitted?: number } }) =>
                    name === 'Ingediend'
                      ? [`${item.payload?.submitted ?? 0} sprint(s), nog niet beoordeeld`, 'Ingediend']
                      : [`${value}/${sprints.length} sprints`, 'Behaald']
                  }
                  labelFormatter={(_label, payload) => payload?.[0]?.payload?.fullTitle ?? _label}
                />
              </RadarChart>
            </ResponsiveContainer>
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
                    ? 'border-teal-600 bg-white shadow-lg shadow-stone-900/5 ring-1 ring-teal-500/40'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div>
                  {/* Badge & Sprints Count */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold font-mono ${
                        isSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-stone-50 text-teal-700 border border-teal-300 group-hover:border-teal-300'
                      }`}
                    >
                      {outcome.code}
                    </span>

                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-700 transition-colors tracking-tight">
                    {outcome.title}
                  </h3>

                  {/* Voortgang: behaald en ingediend apart */}
                  <div className="mt-3 flex flex-wrap gap-1.5 text-sm">
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 font-semibold text-emerald-900"
                      title={`${count} van de 8 sprints behaald`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {count}/8 behaald
                    </span>
                    {getSubmittedCount(outcome.id) > 0 && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-dashed border-amber-500 px-2.5 py-0.5 font-semibold text-amber-900"
                        title="Ingediend, nog niet beoordeeld"
                      >
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {getSubmittedCount(outcome.id)} ingediend
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="mt-2 text-base text-stone-600 leading-relaxed font-normal">
                    {outcome.shortDesc}
                  </p>
                </div>

                {/* Bottom hint */}
                <div className="mt-5 pt-3 border-t border-stone-200 text-xs font-medium flex items-center justify-between text-stone-600 group-hover:text-stone-700 transition-colors">
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
            className="mt-4 rounded-xl border border-teal-300 bg-teal-50 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-teal-700"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">{selectedOutcome}:</span>
              <span>
                Gefilterd op {LEARNING_OUTCOMES.find((o) => o.id === selectedOutcome)?.title} (
                {getOutcomeCount(selectedOutcome)} behaald, {getSubmittedCount(selectedOutcome)} ingediend)
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectOutcome('ALL')}
              className="text-xs font-semibold underline hover:text-stone-900 cursor-pointer ml-3 shrink-0"
            >
              Wis filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
