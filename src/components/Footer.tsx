import React from 'react';
import { Sparkles, Download, RotateCcw, ArrowUp } from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  portfolioData: PortfolioData;
  onResetData: () => void;
  onExportData: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  portfolioData,
  onResetData,
  onExportData,
  onScrollToTop,
}) => {
  return (
    <footer
      id="main-footer"
      className="border-t border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 text-neutral-400 text-xs"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/40 text-blue-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight">
              {portfolioData.portfolioTitle}
            </div>
            <div className="text-neutral-500 text-xs mt-0.5">
              Minor "Futureproof met AI!" • 8 Sprints • 5 Leeruitkomsten
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onExportData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:border-blue-500/40 transition-colors cursor-pointer"
            title="Download portfolio data als JSON backup"
          >
            <Download className="h-3.5 w-3.5 text-blue-400" />
            <span>Exporteer data (JSON)</span>
          </button>
          <button
            type="button"
            onClick={onResetData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors cursor-pointer"
            title="Herstel naar standaard voorbeelddata"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Herstel demo-inhoud</span>
          </button>
          <button
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Naar boven</span>
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-neutral-900 text-center text-neutral-600 text-xs">
        Portfolio Webapplicatie • Geschikt voor desktop en mobiel
      </div>
    </footer>
  );
};
