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
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="sprint-edit-modal-content"
        className="w-full max-w-3xl my-8 rounded-3xl border border-stone-200 bg-white shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <span className="text-sm font-bold text-teal-700">
              Sprint Inhoud Aanpassen
            </span>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight mt-0.5">{sprint.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex border-b border-stone-200 px-6 bg-stone-50 text-sm sm:text-base font-medium overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-800'
            }`}
          >
            1. Algemeen & Thema
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stories')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'stories'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-800'
            }`}
          >
            2. Stories ({formData.stories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'evidence'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-800'
            }`}
          >
            3. Bewijsstukken ({formData.evidenceLinks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('outcomes')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'outcomes'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-800'
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
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Sprint Titel
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Periode (2 weken)
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Bijv. Week 1 – Week 2"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Sprint Thema / Focus
                </label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  placeholder="Bijv. Verkenning van generatieve AI en eerste proof of concept"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Sprint Samenvatting (wat is er onderzocht, gemaakt en geleerd?)
                </label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Korte samenvatting van de sprintresultaten en doelen..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: STORIES */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              {/* Existing Stories List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-600">
                  Huidige Stories in deze sprint
                </h4>
                {formData.stories.length === 0 ? (
                  <p className="text-base text-stone-600 italic">Nog geen stories toegevoegd.</p>
                ) : (
                  formData.stories.map((story) => (
                    <div
                      key={story.id}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-sm font-bold ${
                              story.type === 'research'
                                ? 'bg-teal-50 text-teal-700 border border-teal-300'
                                : story.type === 'user'
                                ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                : 'bg-indigo-50 text-indigo-800 border border-sky-200'
                            }`}
                          >
                            {story.type === 'research'
                              ? 'Research Story'
                              : story.type === 'user'
                              ? 'User Story'
                              : 'Learning Story'}
                          </span>
                          <span className="text-sm font-bold text-stone-900">{story.title}</span>
                        </div>
                        <p className="text-base text-stone-600 mt-1 leading-relaxed font-normal">{story.summary}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStory(story.id)}
                        className="p-1 text-stone-600 hover:text-rose-800 transition-colors cursor-pointer"
                        title="Verwijder story"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Story Sub-Form */}
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5 space-y-3.5">
                <h4 className="text-sm font-bold text-teal-700 flex items-center gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Nieuwe Story Toevoegen
                </h4>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Type Story
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewStoryType('research')}
                      className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                        newStoryType === 'research'
                          ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                          : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                      }`}
                    >
                      Research Story
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStoryType('user')}
                      className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                        newStoryType === 'user'
                          ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                          : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                      }`}
                    >
                      User Story
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStoryType('learning')}
                      className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                        newStoryType === 'learning'
                          ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                          : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                      }`}
                    >
                      Learning Story
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Titel van de story
                  </label>
                  <input
                    type="text"
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                    placeholder="Bijv. Onderzoek naar latency van LLM streaming responses"
                    className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Korte samenvatting (bevindingen / resultaat / reflectie)
                  </label>
                  <textarea
                    rows={2}
                    value={newStorySummary}
                    onChange={(e) => setNewStorySummary(e.target.value)}
                    placeholder="Korte toelichting van wat er onderzocht, gemaakt of geleerd is..."
                    className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleAddStory}
                    disabled={!newStoryTitle.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-stone-900/5"
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
                <h4 className="text-sm font-bold text-stone-600">
                  Huidige Bewijsstukken ({formData.evidenceLinks.length})
                </h4>
                {formData.evidenceLinks.length === 0 ? (
                  <p className="text-base text-stone-600 italic">Nog geen bewijsstukken toegevoegd.</p>
                ) : (
                  formData.evidenceLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3.5"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="p-2 rounded-xl bg-white border border-stone-200 text-teal-700 shrink-0">
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
                          <div className="text-sm font-bold text-stone-900 truncate">
                            {link.title}
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-teal-700 hover:underline truncate block font-mono"
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvidence(link.id)}
                        className="p-1 text-stone-600 hover:text-rose-800 transition-colors cursor-pointer shrink-0"
                        title="Verwijder link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Evidence Link */}
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5 space-y-3.5">
                <h4 className="text-sm font-bold text-teal-700 flex items-center gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Nieuw Bewijsstuk Toevoegen (applicatie, document, video)
                </h4>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewEvType('app')}
                    className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                      newEvType === 'app'
                        ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                    }`}
                  >
                    Applicatie
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvType('document')}
                    className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                      newEvType === 'document'
                        ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                    }`}
                  >
                    Document
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvType('video')}
                    className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                      newEvType === 'video'
                        ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                    }`}
                  >
                    Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvType('code')}
                    className={`p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                      newEvType === 'code'
                        ? 'border-teal-600 bg-teal-50 text-teal-700 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:text-stone-800'
                    }`}
                  >
                    Code
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Titel bewijsstuk
                    </label>
                    <input
                      type="text"
                      value={newEvTitle}
                      onChange={(e) => setNewEvTitle(e.target.value)}
                      placeholder="Bijv. Gepubliceerde Webapp v1"
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      URL Link
                    </label>
                    <input
                      type="url"
                      value={newEvUrl}
                      onChange={(e) => setNewEvUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Korte toelichting (optioneel)
                  </label>
                  <input
                    type="text"
                    value={newEvDesc}
                    onChange={(e) => setNewEvDesc(e.target.value)}
                    placeholder="Bijv. Prototype getest met stakeholders op 12 maart"
                    className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleAddEvidence}
                    disabled={!newEvTitle.trim() || !newEvUrl.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-stone-900/5"
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
              <p className="text-base text-stone-600 leading-relaxed font-normal">
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
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-stone-200 bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleOutcomeToggle(outcome.id)}
                            className="mt-1 h-4 w-4 rounded border-stone-300 bg-white text-teal-700 focus:ring-teal-500"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm bg-white border border-stone-200 text-teal-700 px-2 py-0.5 rounded-lg">
                                {outcome.code}
                              </span>
                              <span className="text-sm font-bold text-stone-900 tracking-tight">
                                {outcome.title}
                              </span>
                            </div>
                            <p className="text-base text-stone-600 mt-1 font-normal leading-relaxed">{outcome.shortDesc}</p>
                          </div>
                        </label>
                      </div>

                      {isChecked && (
                        <div className="mt-3 pl-7">
                          <label className="block text-sm font-medium text-stone-600 mb-1">
                            Toelichting / Verantwoording voor {outcome.code} in deze sprint:
                          </label>
                          <textarea
                            rows={2}
                            value={currentNote}
                            onChange={(e) => handleOutcomeNoteChange(outcome.id, e.target.value)}
                            placeholder={`Hoe heb je ${outcome.title} aangetoond in deze sprint?`}
                            className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
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
        <div className="flex items-center justify-between border-t border-stone-200 px-6 py-4 bg-stone-50">
          <div className="text-sm text-stone-600">
            Wijzigingen worden direct lokaal opgeslagen.
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm sm:text-base font-medium text-stone-600 hover:text-stone-800 transition-colors cursor-pointer"
            >
              Annuleren
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-5 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-teal-800 transition-colors cursor-pointer shadow-lg shadow-stone-900/5"
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
