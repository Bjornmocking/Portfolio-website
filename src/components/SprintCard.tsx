import React, { useState } from 'react';
import { Sprint, Story, EvidenceLink, LearningOutcomeId } from '../types';
import { LEARNING_OUTCOMES } from '../data/initialData';
import {
  Calendar,
  Layers,
  Edit3,
  ExternalLink,
  Plus,
  BookOpen,
  User,
  GraduationCap,
  FileText,
  Video,
  Globe,
  Code2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface SprintCardProps {
  sprint: Sprint;
  onEditSprint: (sprint: Sprint) => void;
  onAddEvidence: (sprint: Sprint) => void;
  isFiltered?: boolean;
}

export const SprintCard: React.FC<SprintCardProps> = ({
  sprint,
  onEditSprint,
  onAddEvidence,
  isFiltered = false,
}) => {
  const [showOutcomeNotes, setShowOutcomeNotes] = useState(false);
  const [activeStoryFilter, setActiveStoryFilter] = useState<'all' | 'research' | 'user' | 'learning'>('all');

  const filteredStories =
    activeStoryFilter === 'all'
      ? sprint.stories
      : sprint.stories.filter((s) => s.type === activeStoryFilter);

  const getEvidenceIcon = (type: EvidenceLink['type']) => {
    switch (type) {
      case 'app':
        return <Globe className="h-4 w-4 text-emerald-400" />;
      case 'video':
        return <Video className="h-4 w-4 text-violet-400" />;
      case 'code':
        return <Code2 className="h-4 w-4 text-amber-400" />;
      case 'document':
      default:
        return <FileText className="h-4 w-4 text-sky-400" />;
    }
  };

  const getEvidenceBadge = (type: EvidenceLink['type']) => {
    switch (type) {
      case 'app':
        return 'Gepubliceerde App';
      case 'video':
        return 'Video Demo';
      case 'code':
        return 'Code / Repo';
      case 'document':
      default:
        return 'Document';
    }
  };

  return (
    <article
      id={`sprint-card-${sprint.number}`}
      className={`relative rounded-3xl border bg-neutral-900/40 shadow-inner backdrop-blur-sm transition-all overflow-hidden ${
        isFiltered
          ? 'border-blue-500/70 ring-1 ring-blue-500/30'
          : 'border-neutral-800 hover:border-neutral-700'
      }`}
    >
      {/* Top Banner with Sprint Identification */}
      <div className="border-b border-neutral-800 bg-neutral-900/70 px-6 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Number circle */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/40 text-blue-400 font-black text-xl shadow-lg shadow-blue-900/10 shrink-0">
              {sprint.number}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
                  Sprint {sprint.number}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800">
                  <Calendar className="h-3 w-3 text-neutral-500" />
                  {sprint.period}
                </span>
                {sprint.number === 1 && (
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                    Voorbeeldinhoud ingevuld
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                {sprint.title}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => onAddEvidence(sprint)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-blue-400" />
              <span>Bewijsstuk</span>
            </button>
            <button
              type="button"
              onClick={() => onEditSprint(sprint)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-600/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:bg-blue-600/20 hover:border-blue-500/50 transition-colors cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Bewerken</span>
            </button>
          </div>
        </div>

        {/* Theme and Summary */}
        <div className="mt-5 pt-4 border-t border-neutral-800/70">
          <div className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Thema & Focus:</span>
            <span className="text-neutral-200 font-medium">{sprint.theme}</span>
          </div>
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed font-light">
            {sprint.summary}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* 1. Demonstrated Learning Outcomes in this sprint */}
        <div
          id={`sprint-${sprint.number}-outcomes`}
          className="rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Behaalde Leeruitkomsten
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                ({sprint.demonstratedOutcomes.length} / 5)
              </span>
            </div>

            {/* Toggle outcome notes button */}
            {sprint.outcomeNotes && Object.keys(sprint.outcomeNotes).length > 0 && (
              <button
                type="button"
                onClick={() => setShowOutcomeNotes(!showOutcomeNotes)}
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                <span>{showOutcomeNotes ? 'Verberg toelichtingen' : 'Toon toelichtingen'}</span>
                {showOutcomeNotes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            )}
          </div>

          {/* Outcome Chips */}
          <div className="flex flex-wrap gap-2">
            {LEARNING_OUTCOMES.map((lo) => {
              const isDemonstrated = sprint.demonstratedOutcomes.includes(lo.id);
              return (
                <div
                  key={lo.id}
                  title={lo.fullDesc}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                    isDemonstrated
                      ? 'bg-neutral-950 border border-blue-500/40 text-white shadow-sm'
                      : 'bg-neutral-900/30 border border-neutral-800 text-neutral-500 opacity-40 line-through'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isDemonstrated
                        ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                        : 'bg-neutral-700'
                    }`}
                  />
                  <span className="font-mono text-[10px] font-bold uppercase">{lo.code}:</span>
                  <span className="text-[10px] uppercase font-medium">{lo.title}</span>
                </div>
              );
            })}
          </div>

          {/* Expanded Outcome Notes/Justifications */}
          {showOutcomeNotes && sprint.outcomeNotes && (
            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2 text-xs text-neutral-300 animate-in fade-in">
              {Object.entries(sprint.outcomeNotes).map(([key, note]) => {
                const lo = LEARNING_OUTCOMES.find((item) => item.id === key);
                return (
                  <div
                    key={key}
                    className="rounded-xl bg-neutral-900 border border-neutral-800 p-3 flex items-start gap-2.5"
                  >
                    <span className="font-mono font-bold text-blue-400 shrink-0 mt-0.5">
                      {key}:
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-semibold text-white">{lo?.title}</span> — <span className="text-neutral-300 font-light">{note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Stories Section (Research Stories, User Stories, Learning Stories) */}
        <div id={`sprint-${sprint.number}-stories`} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Sprint Stories ({sprint.stories.length})</span>
            </h4>

            {/* Filter buttons for story types */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveStoryFilter('all')}
                className={`rounded-lg px-2.5 py-1 cursor-pointer transition-colors text-xs font-medium uppercase tracking-wider ${
                  activeStoryFilter === 'all'
                    ? 'bg-neutral-800 text-white font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Alles ({sprint.stories.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryFilter('research')}
                className={`rounded-lg px-2.5 py-1 cursor-pointer transition-colors text-xs font-medium uppercase tracking-wider ${
                  activeStoryFilter === 'research'
                    ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400 font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Research
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryFilter('user')}
                className={`rounded-lg px-2.5 py-1 cursor-pointer transition-colors text-xs font-medium uppercase tracking-wider ${
                  activeStoryFilter === 'user'
                    ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400 font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryFilter('learning')}
                className={`rounded-lg px-2.5 py-1 cursor-pointer transition-colors text-xs font-medium uppercase tracking-wider ${
                  activeStoryFilter === 'learning'
                    ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400 font-bold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Learning
              </button>
            </div>
          </div>

          {/* Stories List */}
          {filteredStories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-500">
              Geen stories gevonden voor dit filter. Klik op "Bewerken" om stories toe te voegen.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredStories.map((story) => {
                const isResearch = story.type === 'research';
                const isUser = story.type === 'user';

                return (
                  <div
                    key={story.id}
                    className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5 flex flex-col justify-between hover:border-blue-500/40 transition-all shadow-sm"
                  >
                    <div>
                      {/* Story Type Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isResearch
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                              : isUser
                              ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                              : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                          <span>
                            {isResearch
                              ? 'Research Story'
                              : isUser
                              ? 'User Story'
                              : 'Learning Story'}
                          </span>
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-white leading-snug">
                        {story.title}
                      </h5>

                      <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light">
                        {story.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Evidence Links (Bewijsstukken) */}
        <div id={`sprint-${sprint.number}-evidence`} className="space-y-4 pt-2">
          <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>Bewijsstukken ({sprint.evidenceLinks.length})</span>
            </h4>
            <button
              type="button"
              onClick={() => onAddEvidence(sprint)}
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Link toevoegen</span>
            </button>
          </div>

          {sprint.evidenceLinks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 p-6 text-center">
              <p className="text-xs text-neutral-500">
                Nog geen links naar bewijsstukken (zoals een applicatie, document of video).
              </p>
              <button
                type="button"
                onClick={() => onAddEvidence(sprint)}
                className="mt-2 inline-flex items-center gap-1 text-xs text-blue-400 hover:underline cursor-pointer font-semibold"
              >
                <Plus className="h-3.5 w-3.5" />
                Voeg eerste bewijsstuk toe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sprint.evidenceLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-xs text-neutral-400 hover:text-white hover:border-blue-500/50 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        {getEvidenceIcon(link.type)}
                        <span className="font-semibold text-neutral-300">
                          {getEvidenceBadge(link.type)}
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-neutral-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                      {link.title}
                    </div>
                    {link.description && (
                      <p className="text-xs text-neutral-400 mt-1 leading-snug font-light">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-neutral-800/80 text-[11px] text-blue-400/80 group-hover:text-blue-300 truncate font-mono">
                    &rarr; {link.url}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
