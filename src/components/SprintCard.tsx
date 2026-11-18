import React, { useState } from 'react';
import { Sprint, Story, EvidenceLink, LearningOutcomeId } from '../types';
import { LEARNING_OUTCOMES } from '../data/initialData';
import { StoryDetailModal } from './StoryDetailModal';
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
  Lightbulb,
  MessageSquare,
  Clock,
  Image as ImageIcon,
  Compass,
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
  const [expandedStory, setExpandedStory] = useState<Story | null>(null);

  const filteredStories =
    activeStoryFilter === 'all'
      ? sprint.stories
      : sprint.stories.filter((s) => s.type === activeStoryFilter);

  const getEvidenceIcon = (type: EvidenceLink['type']) => {
    switch (type) {
      case 'app':
        return <Globe className="h-4 w-4 text-emerald-700" />;
      case 'video':
        return <Video className="h-4 w-4 text-violet-700" />;
      case 'code':
        return <Code2 className="h-4 w-4 text-amber-800" />;
      case 'document':
      default:
        return <FileText className="h-4 w-4 text-sky-800" />;
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
    <>
    <article
      id={`sprint-card-${sprint.number}`}
      className={`relative rounded-3xl border bg-white shadow-sm transition-all overflow-hidden ${
        isFiltered ? 'border-teal-600 ring-2 ring-teal-500/30' : 'border-stone-200'
      }`}
    >
      {/* Top Banner with Sprint Identification */}
      <div className="border-b border-stone-200 bg-teal-50/60 px-5 sm:px-8 py-6 sm:py-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Number circle */}
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-teal-700 text-white font-bold text-xl sm:text-2xl shadow-sm shrink-0">
              {sprint.number}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-teal-800">
                  Sprint {sprint.number}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-stone-700 bg-white px-3 py-1 rounded-full border border-stone-200">
                  <Calendar className="h-3 w-3 text-stone-600" />
                  {sprint.period}
                </span>

              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 tracking-tight text-balance">
                {sprint.title}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => onAddEvidence(sprint)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-teal-700" />
              <span>Bewijsstuk</span>
            </button>
            <button
              type="button"
              onClick={() => onEditSprint(sprint)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-teal-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-teal-800 hover:bg-teal-50 transition-colors cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Bewerken</span>
            </button>
          </div>
        </div>

        {/* Theme and Summary */}
        <div className="mt-5 pt-4 border-t border-stone-200">
          <div className="text-base font-semibold text-stone-600 flex items-start gap-2">
            <Layers className="h-4 w-4 text-teal-700 shrink-0 mt-1" />
            <span className="text-stone-600 text-base font-semibold">Thema:</span>
            <span className="text-stone-900 font-semibold">{sprint.theme}</span>
          </div>
          <p className="mt-3 text-lg text-stone-700 leading-relaxed">
            {sprint.summary}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-8 space-y-8">
        {/* 1. Demonstrated Learning Outcomes in this sprint */}
        <div
          id={`sprint-${sprint.number}-outcomes`}
          className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-stone-900 text-lg font-bold">
                Leeruitkomsten
              </span>
              <span className="text-sm text-stone-600">
                ({sprint.demonstratedOutcomes.length} behaald
                {(sprint.submittedOutcomes?.length ?? 0) > 0 && `, ${sprint.submittedOutcomes!.length} ingediend`}
                {(sprint.fittingOutcomes?.length ?? 0) > 0 && `, past bij ${sprint.fittingOutcomes!.join(', ')}`})
              </span>
            </div>

            {/* Toggle outcome notes button */}
            {sprint.outcomeNotes && Object.keys(sprint.outcomeNotes).length > 0 && (
              <button
                type="button"
                onClick={() => setShowOutcomeNotes(!showOutcomeNotes)}
                className="inline-flex items-center gap-1 text-sm text-teal-800 hover:underline font-semibold cursor-pointer"
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
              const isSubmitted = !isDemonstrated && (sprint.submittedOutcomes ?? []).includes(lo.id);
              const isFitting =
                !isDemonstrated && !isSubmitted && (sprint.fittingOutcomes ?? []).includes(lo.id);
              return (
                <div
                  key={lo.id}
                  title={lo.fullDesc}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                    isDemonstrated
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                      : isSubmitted
                      ? 'bg-amber-50 border border-dashed border-amber-500 text-amber-900'
                      : isFitting
                      ? 'bg-sky-50 border border-sky-300 text-sky-900'
                      : 'bg-white border border-stone-200 text-stone-500'
                  }`}
                >
                  {isDemonstrated ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                  ) : isSubmitted ? (
                    <Clock className="h-4 w-4 shrink-0 text-amber-800" />
                  ) : isFitting ? (
                    <Compass className="h-4 w-4 shrink-0 text-sky-800" />
                  ) : (
                    <div className="w-2 h-2 shrink-0 rounded-full bg-stone-300" aria-hidden="true" />
                  )}
                  <span>
                    <span className="font-bold">{lo.code}</span> <span className="font-medium">{lo.title}</span>
                    {isDemonstrated && <span className="font-bold"> (Behaald)</span>}
                    {isSubmitted && <span className="font-bold"> (Ingediend)</span>}
                    {isFitting && <span className="font-bold"> (Past bij)</span>}
                  </span>
                </div>
              );
            })}
          </div>

          {sprint.assessmentNote && (
            <p className="mt-3 text-base text-stone-600 leading-relaxed">{sprint.assessmentNote}</p>
          )}

          {/* Expanded Outcome Notes/Justifications */}
          {showOutcomeNotes && sprint.outcomeNotes && (
            <div className="mt-4 pt-3 border-t border-stone-200 space-y-2 text-base text-stone-700 animate-in fade-in">
              {Object.entries(sprint.outcomeNotes).map(([key, note]) => {
                const lo = LEARNING_OUTCOMES.find((item) => item.id === key);
                return (
                  <div
                    key={key}
                    className="rounded-xl bg-white border border-stone-200 p-3 flex items-start gap-2.5"
                  >
                    <span className="font-mono font-bold text-teal-700 shrink-0 mt-0.5">
                      {key}:
                    </span>
                    <div className="leading-relaxed">
                      <span className="font-semibold text-stone-900">{lo?.title}:</span> <span className="text-stone-700 font-normal">{note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Stories Section (Research Stories, User Stories, Learning Stories) */}
        <div id={`sprint-${sprint.number}-stories`} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <h4 className="text-stone-900 text-xl font-bold flex items-center gap-2.5">
              <span className="w-2 h-2 bg-teal-700 rounded-full" aria-hidden="true" />
              <span>Sprint Stories ({sprint.stories.length})</span>
            </h4>

            {/* Filter buttons for story types */}
            <div className="flex flex-wrap items-center gap-1.5 text-sm">
              <button
                type="button"
                onClick={() => setActiveStoryFilter('all')}
                className={`rounded-lg px-3 py-2 cursor-pointer transition-colors text-sm font-medium ${
                  activeStoryFilter === 'all'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Alles ({sprint.stories.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryFilter('research')}
                className={`rounded-lg px-3 py-2 cursor-pointer transition-colors text-sm font-medium ${
                  activeStoryFilter === 'research'
                    ? 'bg-teal-50 border border-teal-300 text-teal-800 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Research
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryFilter('user')}
                className={`rounded-lg px-3 py-2 cursor-pointer transition-colors text-sm font-medium ${
                  activeStoryFilter === 'user'
                    ? 'bg-teal-50 border border-teal-300 text-teal-800 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setActiveStoryFilter('learning')}
                className={`rounded-lg px-3 py-2 cursor-pointer transition-colors text-sm font-medium ${
                  activeStoryFilter === 'learning'
                    ? 'bg-teal-50 border border-teal-300 text-teal-800 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Learning
              </button>
            </div>
          </div>

          {/* Stories List */}
          {filteredStories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 p-6 text-center text-base text-stone-600">
              Geen stories gevonden voor dit filter. Klik op "Bewerken" om stories toe te voegen.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredStories.map((story) => {
                const isResearch = story.type === 'research';
                const isUser = story.type === 'user';

                return (
                  <div
                    key={story.id}
                    id={story.anchor}
                    className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 flex flex-col justify-between hover:border-teal-400 transition-colors shadow-sm"
                  >
                    <div>
                      {/* Story Type Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold ${
                            isResearch
                              ? 'bg-violet-50 text-violet-900 border border-violet-300'
                              : isUser
                              ? 'bg-sky-50 text-sky-900 border border-sky-300'
                              : 'bg-teal-50 text-teal-900 border border-teal-300'
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

                      <h5 className="text-lg font-bold text-stone-900 leading-snug">
                        {story.title}
                      </h5>

                      <p className="mt-3 text-lg text-stone-700 leading-relaxed whitespace-pre-line">
                        {story.summary}
                      </p>

                      {story.screenshotPlaceholder && (
                        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-stone-600">
                          <ImageIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                          <span className="text-base">{story.screenshotPlaceholder}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto">
                    {story.outcomes && story.outcomes.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {story.outcomesPrefix && (
                          <span className="text-sm text-stone-600">{story.outcomesPrefix}</span>
                        )}
                        {story.outcomes.map((id) => (
                          <span
                            key={id}
                            className="rounded-md bg-stone-100 px-2 py-0.5 text-sm font-semibold text-stone-700"
                          >
                            {id}
                          </span>
                        ))}
                      </div>
                    )}

                    {story.details && (
                      <button
                        type="button"
                        onClick={() => setExpandedStory(story)}
                        className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg bg-teal-700 px-4 py-2.5 text-sm text-white hover:bg-teal-800 font-semibold cursor-pointer transition-colors"
                      >
                        <span>Lees meer</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2b. Bijgestuurd: gepland maar niet gedaan */}
        {sprint.adjustment && (
          <div id={`sprint-${sprint.number}-adjustment`} className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="text-stone-900 text-xl font-bold">{sprint.adjustment.title}</h4>
              {sprint.adjustment.outcomes && sprint.adjustment.outcomes.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="text-sm text-stone-600">Past bij</span>
                  {sprint.adjustment.outcomes.map((id) => (
                    <span key={id} className="rounded-md bg-stone-100 px-2 py-0.5 text-sm font-semibold text-stone-700">
                      {id}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <p className="text-base text-stone-700 leading-relaxed">{sprint.adjustment.text}</p>
          </div>
        )}

        {/* 3. Evidence Links (Bewijsstukken) */}
        <div id={`sprint-${sprint.number}-evidence`} className="space-y-4 pt-2">
          <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <h4 className="text-stone-900 text-xl font-bold flex items-center gap-2.5">
              <span className="w-2 h-2 bg-teal-700 rounded-full" aria-hidden="true" />
              <span>Bewijsstukken ({sprint.evidenceLinks.length})</span>
            </h4>
            <button
              type="button"
              onClick={() => onAddEvidence(sprint)}
              className="inline-flex items-center gap-1.5 text-sm text-teal-800 hover:underline font-semibold cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Link toevoegen</span>
            </button>
          </div>

          {sprint.evidenceLinks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 p-6 text-center">
              <p className="text-base text-stone-600">
                Nog geen links naar bewijsstukken (zoals een applicatie, document of video).
              </p>
              <button
                type="button"
                onClick={() => onAddEvidence(sprint)}
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-teal-800 hover:underline cursor-pointer font-semibold"
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
                  className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600 hover:border-teal-500 hover:shadow-md transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-sm text-stone-600">
                        {getEvidenceIcon(link.type)}
                        <span className="font-semibold text-stone-700">
                          {getEvidenceBadge(link.type)}
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-stone-500 group-hover:text-teal-700 transition-colors" />
                    </div>
                    <div className="text-base font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                      {link.title}
                    </div>
                    {link.description && (
                      <p className="text-sm text-stone-600 mt-1 leading-snug">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stone-200 text-xs text-stone-500 truncate font-mono">
                    &rarr; {link.url}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* 4. Feedback ontvangen */}
        {sprint.feedback && sprint.feedback.length > 0 && (
          <div id={`sprint-${sprint.number}-feedback`} className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <h4 className="text-stone-900 text-xl font-bold flex items-center gap-2.5">
                <span className="w-2 h-2 bg-teal-700 rounded-full" aria-hidden="true" />
                <span>Feedback ontvangen</span>
              </h4>
            </div>
            <div className="space-y-3">
              {sprint.feedback.map((item, idx) => (
                <div
                  key={`${sprint.number}-feedback-${idx}`}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2 mb-2 text-stone-700 text-sm font-semibold">
                    <MessageSquare className="h-3.5 w-3.5 text-teal-700" />
                    <span>{item.from}</span>
                    <span className="text-stone-600">•</span>
                    <span>{item.date}</span>
                  </div>
                  <p className="text-base text-stone-700 leading-relaxed font-normal mb-3">{item.comment}</p>
                  <div className="pl-3 border-l-2 border-teal-300">
                    <span className="text-sm font-semibold text-teal-800">
                      Mijn actie
                    </span>
                    <p className="text-base text-stone-700 leading-relaxed mt-1">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Reflectie */}
        {sprint.reflection && (
          <div id={`sprint-${sprint.number}-reflection`} className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <h4 className="text-stone-900 text-xl font-bold flex items-center gap-2.5">
                <span className="w-2 h-2 bg-teal-700 rounded-full" aria-hidden="true" />
                <span>Reflectie</span>
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
                <div className="flex items-center gap-1.5 mb-2 text-teal-700">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span className="text-base font-bold">Wat heb je geleerd?</span>
                </div>
                <p className="text-base text-stone-700 leading-relaxed">
                  {sprint.reflection.learned}
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
                <div className="flex items-center gap-1.5 mb-2 text-teal-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="text-base font-bold">Wat behoud je?</span>
                </div>
                <p className="text-base text-stone-700 leading-relaxed">
                  {sprint.reflection.keep}
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
                <div className="flex items-center gap-1.5 mb-2 text-teal-700">
                  <ChevronUp className="h-3.5 w-3.5 rotate-45" />
                  <span className="text-base font-bold">Wat ga je anders doen?</span>
                </div>
                <p className="text-base text-stone-700 leading-relaxed">
                  {sprint.reflection.change}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
    <StoryDetailModal story={expandedStory} onClose={() => setExpandedStory(null)} />
    </>
  );
};
