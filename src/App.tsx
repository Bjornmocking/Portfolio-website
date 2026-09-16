/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioData, Sprint, EvidenceLink, AboutMeData, LearningOutcomeId } from './types';
import { INITIAL_PORTFOLIO_DATA } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutMeSection } from './components/AboutMeSection';
import { LearningOutcomesBar } from './components/LearningOutcomesBar';
import { SprintList } from './components/SprintList';
import { Footer } from './components/Footer';
import { SprintEditModal } from './components/SprintEditModal';
import { AboutMeEditModal } from './components/AboutMeEditModal';
import { QuickAddLinkModal } from './components/QuickAddLinkModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { createClient } from '@supabase/supabase-js';

const STORAGE_KEY = 'futureproof_ai_portfolio_data_v1';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load portfolio data from storage:', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch (e) {
      console.error('Failed to persist portfolio data:', e);
    }
  }, [portfolioData]);

  useEffect(() => {
    if (!supabase) return;

    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('profiles').select('id').limit(1);
        if (error) {
          console.warn('Supabase connection check failed:', error.message);
        } else {
          console.log('Supabase connected successfully.');
        }
      } catch (err) {
        console.warn('Supabase connection check threw an error:', err);
      }
    };

    checkConnection();
  }, []);

  // UI state
  const [selectedOutcome, setSelectedOutcome] = useState<LearningOutcomeId | 'ALL'>('ALL');
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  const [addingEvidenceSprint, setAddingEvidenceSprint] = useState<Sprint | null>(null);
  const [isAboutMeModalOpen, setIsAboutMeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handlers
  const handleUpdateSprint = (updatedSprint: Sprint) => {
    setPortfolioData((prev) => ({
      ...prev,
      sprints: prev.sprints.map((s) => (s.id === updatedSprint.id ? updatedSprint : s)),
    }));
  };

  const handleAddEvidenceLink = (newLink: EvidenceLink) => {
    if (!addingEvidenceSprint) return;
    setPortfolioData((prev) => ({
      ...prev,
      sprints: prev.sprints.map((s) =>
        s.id === addingEvidenceSprint.id
          ? { ...s, evidenceLinks: [...s.evidenceLinks, newLink] }
          : s
      ),
    }));
  };

  const handleUpdateAboutMe = (newAboutMe: AboutMeData) => {
    setPortfolioData((prev) => ({
      ...prev,
      aboutMe: newAboutMe,
    }));
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Weet je zeker dat je alle portfolio data wilt herstellen naar de standaard voorbeeldinhoud? Eventueel zelf ingevoerde wijzigingen worden overschreven.'
      )
    ) {
      setPortfolioData(INITIAL_PORTFOLIO_DATA);
      localStorage.removeItem(STORAGE_KEY);
      setSelectedOutcome('ALL');
    }
  };

  const handleExportData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'portfolio-futureproof-met-ai.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el =
      sectionId === 'about-me'
        ? document.getElementById('about-me-section')
        : sectionId === 'sprints'
        ? document.getElementById('sprints-section')
        : sectionId === 'learning-outcomes'
        ? document.getElementById('learning-outcomes-section')
        : document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Navigation Header */}
      <Navbar
        onResetData={handleResetData}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Hero / Homepage Section */}
      <main id="portfolio-main-content">
        <HeroSection
          portfolioTitle={portfolioData.portfolioTitle}
          introText={portfolioData.introText}
          onExploreSprints={() => scrollToSection('sprints')}
          onExploreAbout={() => scrollToSection('about-me')}
        />

        {/* Over Mij Section */}
        <AboutMeSection
          data={portfolioData.aboutMe}
          onEdit={() => setIsAboutMeModalOpen(true)}
        />

        <GeminiChatbot />

        {/* Learning Outcomes Interactive Bar (LU1 - LU5) */}
        <LearningOutcomesBar
          sprints={portfolioData.sprints}
          selectedOutcome={selectedOutcome}
          onSelectOutcome={(lo) => {
            setSelectedOutcome(lo);
            // If user clicked an outcome, smooth scroll down to sprints to see the filtered list
            if (lo !== 'ALL') {
              const sprintsEl = document.getElementById('sprints-section');
              if (sprintsEl) {
                sprintsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }}
        />

        {/* Sprints 1 t/m 8 Chronological Overview */}
        <SprintList
          sprints={portfolioData.sprints}
          selectedOutcome={selectedOutcome}
          onEditSprint={(sprint) => setEditingSprint(sprint)}
          onAddEvidence={(sprint) => setAddingEvidenceSprint(sprint)}
        />
      </main>

      {/* Footer */}
      <Footer
        portfolioData={portfolioData}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onScrollToTop={() => scrollToSection('hero')}
      />

      {/* Edit Modals */}
      {editingSprint && (
        <SprintEditModal
          sprint={editingSprint}
          isOpen={true}
          onClose={() => setEditingSprint(null)}
          onSave={handleUpdateSprint}
        />
      )}

      {addingEvidenceSprint && (
        <QuickAddLinkModal
          sprintTitle={addingEvidenceSprint.title}
          isOpen={true}
          onClose={() => setAddingEvidenceSprint(null)}
          onSave={handleAddEvidenceLink}
        />
      )}

      {isAboutMeModalOpen && (
        <AboutMeEditModal
          data={portfolioData.aboutMe}
          isOpen={true}
          onClose={() => setIsAboutMeModalOpen(false)}
          onSave={handleUpdateAboutMe}
        />
      )}
    </div>
  );
}
