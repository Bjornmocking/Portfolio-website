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
      className="border-t border-stone-200 bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 text-stone-600 text-sm"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 border border-teal-300 text-teal-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold text-stone-900 text-sm tracking-tight">
              {portfolioData.portfolioTitle}
            </div>
            <div className="text-stone-600 text-sm mt-0.5">
              Minor "Futureproof met AI!" • 8 Sprints • 5 Leeruitkomsten
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onExportData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 hover:border-teal-300 transition-colors cursor-pointer"
            title="Download portfolio data als JSON backup"
          >
            <Download className="h-3.5 w-3.5 text-teal-700" />
            <span>Exporteer data (JSON)</span>
          </button>
          <button
            type="button"
            onClick={onResetData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 hover:border-stone-300 transition-colors cursor-pointer"
            title="Herstel naar standaard voorbeelddata"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Herstel demo-inhoud</span>
          </button>
          <button
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors cursor-pointer"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Naar boven</span>
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-stone-200 text-center text-stone-500 text-sm">
        Portfolio Webapplicatie • Geschikt voor desktop en mobiel
      </div>
    </footer>
  );
};
