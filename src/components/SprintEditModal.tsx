import React, { useState } from 'react';
import { Sprint, Story, EvidenceLink, StoryType, EvidenceType, LearningOutcomeId } from '../types';
import { LEARNING_OUTCOMES } from '../data/initialData';
import {
  X,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Link2,
  BookOpen,
  HelpCircle,
  FileCode,
  Globe,
  FileText,
  Video,
} from 'lucide-react';

interface SprintEditModalProps {
  sprint: Sprint;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSprint: Sprint) => void;
}

export const SprintEditModal: React.FC<SprintEditModalProps> = ({
  sprint,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Sprint>({ ...sprint });
  const [activeTab, setActiveTab] = useState<'info' | 'stories' | 'evidence' | 'outcomes'>('info');

  // Temporary state for adding a new story
  const [newStoryType, setNewStoryType] = useState<StoryType>('research');
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStorySummary, setNewStorySummary] = useState('');

  // Temporary state for adding a new evidence link
  const [newEvTitle, setNewEvTitle] = useState('');
  const [newEvUrl, setNewEvUrl] = useState('');
  const [newEvType, setNewEvType] = useState<EvidenceType>('app');
  const [newEvDesc, setNewEvDesc] = useState('');

  if (!isOpen) return null;

  const handleOutcomeToggle = (id: LearningOutcomeId) => {
    const exists = formData.demonstratedOutcomes.includes(id);
    const updated = exists
      ? formData.demonstratedOutcomes.filter((item) => item !== id)
      : [...formData.demonstratedOutcomes, id];

    setFormData({
      ...formData,
      demonstratedOutcomes: updated,
    });
  };

  const handleOutcomeNoteChange = (id: LearningOutcomeId, note: string) => {
    setFormData({
      ...formData,
      outcomeNotes: {
        ...formData.outcomeNotes,
        [id]: note,
      },
    });
  };

  const handleAddStory = () => {
    if (!newStoryTitle.trim()) return;
    const story: Story = {
      id: 'story-' + Date.now(),
      type: newStoryType,
      title: newStoryTitle.trim(),
      summary: newStorySummary.trim(),
    };
    setFormData({
      ...formData,
      stories: [...formData.stories, story],
    });
    setNewStoryTitle('');
    setNewStorySummary('');
  };

  const handleRemoveStory = (id: string) => {
    setFormData({
      ...formData,
      stories: formData.stories.filter((s) => s.id !== id),
    });
  };

  const handleAddEvidence = () => {
    if (!newEvTitle.trim() || !newEvUrl.trim()) return;
    const link: EvidenceLink = {
      id: 'ev-' + Date.now(),
      title: newEvTitle.trim(),
      url: newEvUrl.trim().startsWith('http') ? newEvUrl.trim() : `https://${newEvUrl.trim()}`,
      type: newEvType,
      description: newEvDesc.trim() || undefined,
    };
    setFormData({
      ...formData,
      evidenceLinks: [...formData.evidenceLinks, link],
    });
    setNewEvTitle('');
    setNewEvUrl('');
    setNewEvDesc('');
  };

  const handleRemoveEvidence = (id: string) => {
    setFormData({
      ...formData,
      evidenceLinks: formData.evidenceLinks.filter((e) => e.id !== id),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="sprint-edit-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="sprint-edit-modal-content"
        className="w-full max-w-3xl my-8 rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-5">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              Sprint Inhoud Aanpassen
            </span>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">{sprint.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex border-b border-neutral-800 px-6 bg-neutral-950/50 text-xs sm:text-sm font-medium overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            1. Algemeen & Thema
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stories')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'stories'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            2. Stories ({formData.stories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'evidence'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            3. Bewijsstukken ({formData.evidenceLinks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('outcomes')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'outcomes'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            4. Leeruitkomsten ({formData.demonstratedOutcomes.length}/5)
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: INFO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Sprint Titel
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Periode (2 weken)
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Bijv. Week 1 – Week 2"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Sprint Thema / Focus
                </label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  placeholder="Bijv. Verkenning van generatieve AI en eerste proof of concept"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Sprint Samenvatting (wat is er onderzocht, gemaakt en geleerd?)
                </label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Korte samenvatting van de sprintresultaten en doelen..."
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                />
              </div>
            </div>
          )}

          {/* TAB 2: STORIES */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              {/* Existing Stories List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Huidige Stories in deze sprint
                </h4>
                {formData.stories.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">Nog geen stories toegevoegd.</p>
                ) : (
                  formData.stories.map((story) => (
                    <div
                      key={story.id}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              story.type === 'research'
                                ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                                : story.type === 'user'
                                ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                                : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            {story.type === 'research'
                              ? 'Research Story'
                              : story.type === 'user'
                              ? 'User Story'
                              : 'Learning Story'}
                          </span>
                          <span className="text-sm font-bold text-white">{story.title}</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">{story.summary}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStory(story.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Verwijder story"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Story Sub-Form */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 sm:p-5 space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Nieuwe Story Toevoegen
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Type Story
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewStoryType('research')}
                      className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        newStoryType === 'research'
                          ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      Research Story
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStoryType('user')}
                      className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        newStoryType === 'user'
                          ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      User Story
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStoryType('learning')}
                      className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        newStoryType === 'learning'
                          ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      Learning Story
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Titel van de story
                  </label>
                  <input
                    type="text"
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                    placeholder="Bijv. Onderzoek naar latency van LLM streaming responses"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Korte samenvatting (bevindingen / resultaat / reflectie)
                  </label>
                  <textarea
                    rows={2}
                    value={newStorySummary}
                    onChange={(e) => setNewStorySummary(e.target.value)}
                    placeholder="Korte toelichting van wat er onderzocht, gemaakt of geleerd is..."
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleAddStory}
                    disabled={!newStoryTitle.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-blue-900/30"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Story toevoegen aan sprint
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVIDENCE LINKS */}
          {activeTab === 'evidence' && (
            <div className="space-y-6">
              {/* Existing Evidence */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Huidige Bewijsstukken ({formData.evidenceLinks.length})
                </h4>
                {formData.evidenceLinks.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">Nog geen bewijsstukken toegevoegd.</p>
                ) : (
                  formData.evidenceLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-3.5"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-blue-400 shrink-0">
                          {link.type === 'app' ? (
                            <Globe className="h-4 w-4" />
                          ) : link.type === 'video' ? (
                            <Video className="h-4 w-4" />
                          ) : link.type === 'code' ? (
                            <FileCode className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">
                            {link.title}
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400/90 hover:underline truncate block font-mono"
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvidence(link.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                        title="Verwijder link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Evidence Link */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 sm:p-5 space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Nieuw Bewijsstuk Toevoegen (applicatie, document, video)
                </h4>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewEvType('app')}
                    className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      newEvType === 'app'
                        ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Applicatie
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvType('document')}
                    className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      newEvType === 'document'
                        ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Document
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvType('video')}
                    className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      newEvType === 'video'
                        ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvType('code')}
                    className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      newEvType === 'code'
                        ? 'border-blue-500/80 bg-blue-600/10 text-blue-400 font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Code
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Titel bewijsstuk
                    </label>
                    <input
                      type="text"
                      value={newEvTitle}
                      onChange={(e) => setNewEvTitle(e.target.value)}
                      placeholder="Bijv. Gepubliceerde Webapp v1"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      URL Link
                    </label>
                    <input
                      type="url"
                      value={newEvUrl}
                      onChange={(e) => setNewEvUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Korte toelichting (optioneel)
                  </label>
                  <input
                    type="text"
                    value={newEvDesc}
                    onChange={(e) => setNewEvDesc(e.target.value)}
                    placeholder="Bijv. Prototype getest met stakeholders op 12 maart"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleAddEvidence}
                    disabled={!newEvTitle.trim() || !newEvUrl.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-500 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-blue-900/30"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Bewijsstuk toevoegen
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEARNING OUTCOMES */}
          {activeTab === 'outcomes' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Vink de leeruitkomsten aan die in deze sprint zijn aangetoond en vul eventueel een toelichting in.
              </p>

              <div className="space-y-3">
                {LEARNING_OUTCOMES.map((outcome) => {
                  const isChecked = formData.demonstratedOutcomes.includes(outcome.id);
                  const currentNote = formData.outcomeNotes?.[outcome.id] || '';

                  return (
                    <div
                      key={outcome.id}
                      className={`rounded-2xl border p-4 transition-colors ${
                        isChecked
                          ? 'border-blue-500/60 bg-blue-600/10'
                          : 'border-neutral-800 bg-neutral-950/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleOutcomeToggle(outcome.id)}
                            className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs bg-neutral-900 border border-neutral-800 text-blue-400 px-2 py-0.5 rounded-lg">
                                {outcome.code}
                              </span>
                              <span className="text-sm font-bold text-white tracking-tight">
                                {outcome.title}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">{outcome.shortDesc}</p>
                          </div>
                        </label>
                      </div>

                      {isChecked && (
                        <div className="mt-3 pl-7">
                          <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                            Toelichting / Verantwoording voor {outcome.code} in deze sprint:
                          </label>
                          <textarea
                            rows={2}
                            value={currentNote}
                            onChange={(e) => handleOutcomeNoteChange(outcome.id, e.target.value)}
                            placeholder={`Hoe heb je ${outcome.title} aangetoond in deze sprint?`}
                            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none placeholder-neutral-600"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800 px-6 py-4 bg-neutral-950/60">
          <div className="text-xs text-neutral-500">
            Wijzigingen worden direct lokaal opgeslagen.
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              Annuleren
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 transition-colors cursor-pointer shadow-lg shadow-blue-900/30"
            >
              <Save className="h-4 w-4" />
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
