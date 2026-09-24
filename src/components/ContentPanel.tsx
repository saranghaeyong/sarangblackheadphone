import React from 'react';
import { ChapterId } from '../data/portfolioData.ts';
import { OpeningCreditsPanel } from './panels/OpeningCreditsPanel.tsx';
import { FeatureProjectPanel } from './panels/FeatureProjectPanel.tsx';
import { EducationPanel } from './panels/EducationPanel.tsx';
import { TechnicalPanel } from './panels/TechnicalPanel.tsx';
import { CertificationsPanel } from './panels/CertificationsPanel.tsx';
import { DirectorsStatementPanel } from './panels/DirectorsStatementPanel.tsx';
import { FinalCreditsPanel } from './panels/FinalCreditsPanel.tsx';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData.ts';

interface ContentPanelProps {
  activeChapter: ChapterId;
  onSelectChapter: (chapterId: ChapterId) => void;
  onClose: () => void;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  activeChapter,
  onSelectChapter,
  onClose,
}) => {
  const currentChapterIdx = CHAPTERS.findIndex((c) => c.id === activeChapter);

  const handleNext = () => {
    const nextIdx = (currentChapterIdx + 1) % CHAPTERS.length;
    // Skip overview if exploded
    const targetId = CHAPTERS[nextIdx].id === 'overview' ? CHAPTERS[(nextIdx + 1) % CHAPTERS.length].id : CHAPTERS[nextIdx].id;
    onSelectChapter(targetId);
  };

  const handlePrev = () => {
    const prevIdx = (currentChapterIdx - 1 + CHAPTERS.length) % CHAPTERS.length;
    const targetId = CHAPTERS[prevIdx].id === 'overview' ? CHAPTERS[(prevIdx - 1 + CHAPTERS.length) % CHAPTERS.length].id : CHAPTERS[prevIdx].id;
    onSelectChapter(targetId);
  };

  const renderContent = () => {
    switch (activeChapter) {
      case 'openingCredits':
        return <OpeningCreditsPanel />;
      case 'featureProject':
        return <FeatureProjectPanel />;
      case 'education':
        return <EducationPanel />;
      case 'technical':
        return <TechnicalPanel />;
      case 'certifications':
        return <CertificationsPanel />;
      case 'directorsStatement':
        return <DirectorsStatementPanel />;
      case 'finalCredits':
        return <FinalCreditsPanel />;
      default:
        return <FeatureProjectPanel />;
    }
  };

  return (
    <aside
      aria-label="Portfolio Chapter Details"
      className="relative w-full max-w-xl max-h-[82vh] md:max-h-[85vh] flex flex-col bg-[#0b0c10]/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Top Header bar with chapter pager */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-neutral-300">
            CHAPTER {String(Math.max(1, currentChapterIdx)).padStart(2, '0')} / 07
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            title="Previous Chapter"
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            title="Next Chapter"
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Minimize Panel"
            className="p-1 ml-2 rounded text-neutral-400 hover:text-rose-400 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="p-5 md:p-7 overflow-y-auto overscroll-contain flex-1">
        {renderContent()}
      </div>

      {/* Bottom Pager Bar */}
      <div className="px-5 py-2.5 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
        <button
          onClick={handlePrev}
          className="hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          &larr; PREVIOUS
        </button>
        <span className="text-neutral-500">USE ARROW KEYS OR CLICK TO INSPECT 3D PARTS</span>
        <button
          onClick={handleNext}
          className="hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          NEXT &rarr;
        </button>
      </div>
    </aside>
  );
};
