import React, { useState } from 'react';
import { Sparkles, User, Calendar, Award, Menu, X, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onResetData: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetData, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md transition-all"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div
          id="navbar-brand"
          onClick={() => handleNavClick('hero')}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/40 text-blue-400 shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Minor Portfolio
            </span>
            <span className="block text-base font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
              Futureproof met AI!
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-1 text-xs font-medium uppercase tracking-wider">
          <button
            id="nav-link-home"
            type="button"
            onClick={() => handleNavClick('hero')}
            className="rounded-lg px-3.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            id="nav-link-about"
            type="button"
            onClick={() => handleNavClick('about-me')}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <User className="h-3.5 w-3.5 text-neutral-500" />
            Over mij
          </button>
          <button
            id="nav-link-sprints"
            type="button"
            onClick={() => handleNavClick('sprints')}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-neutral-500" />
            Sprints (1-8)
          </button>
          <button
            id="nav-link-outcomes"
            type="button"
            onClick={() => handleNavClick('learning-outcomes')}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <Award className="h-3.5 w-3.5 text-neutral-500" />
            Leeruitkomsten
          </button>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            id="reset-template-btn"
            type="button"
            onClick={onResetData}
            title="Herstel de standaard portfolio placeholder inhoud"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
            Herstel demo
          </button>

          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-3 space-y-1.5"
        >
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="w-full text-left rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about-me')}
            className="w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
          >
            <User className="h-4 w-4 text-neutral-500" />
            Over mij
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('sprints')}
            className="w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
          >
            <Calendar className="h-4 w-4 text-neutral-500" />
            Sprints 1 t/m 8
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('learning-outcomes')}
            className="w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
          >
            <Award className="h-4 w-4 text-neutral-500" />
            Leeruitkomsten
          </button>
          <div className="pt-2 border-t border-neutral-900">
            <button
              type="button"
              onClick={() => {
                onResetData();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900"
            >
              <RotateCcw className="h-3.5 w-3.5 text-neutral-500" />
              Herstel standaard portfolio inhoud
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
