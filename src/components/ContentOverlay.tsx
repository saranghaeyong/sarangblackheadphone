import React, { useState } from 'react';
import { PORTFOLIO_DATA, CHAPTERS, ChapterId } from '../data/portfolioData.ts';
import { ContentPanel } from './ContentPanel.tsx';
import { cinemaAudio } from '../utils/audio.ts';
import { Volume2, VolumeX, HelpCircle, Eye, EyeOff, Sparkles, Compass } from 'lucide-react';

interface ContentOverlayProps {
  isExploded: boolean;
  onToggleExplode: () => void;
  activeChapter: ChapterId;
  onSelectChapter: (chapterId: ChapterId) => void;
  hoveredPartLabel: string | null;
}

export const ContentOverlay: React.FC<ContentOverlayProps> = ({
  isExploded,
  onToggleExplode,
  activeChapter,
  onSelectChapter,
  hoveredPartLabel,
}) => {
  const [isMuted, setIsMuted] = useState(cinemaAudio.getMuted());
  const [showHelp, setShowHelp] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  const handleToggleSound = () => {
    const nextMuted = cinemaAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleChapterClick = (id: ChapterId) => {
    cinemaAudio.playChapterSelect();
    if (!isExploded) {
      onToggleExplode();
    }
    onSelectChapter(id);
    setIsPanelMinimized(false);
  };

  const currentChapterObj = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[1];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 md:p-6 select-none">
      {/* 1. Top Bar Contract: Brand Left, Chapter Sequence Center, Actions Right */}
      <header className="flex items-center justify-between gap-4 pointer-events-auto">
        {/* Brand Zone (Wordmark only, no pill tags) */}
        <div className="flex flex-col">
          <button
            onClick={() => {
              if (isExploded) onToggleExplode();
              onSelectChapter('overview');
            }}
            className="text-left group cursor-pointer"
          >
            <h1 className="text-base md:text-lg font-display font-bold tracking-wider text-white group-hover:text-rose-400 transition-colors">
              SARANG R N
            </h1>
            <div className="text-[10px] tracking-[0.2em] font-mono-code text-neutral-400 uppercase">
              CINEMA // SOFTWARE // MACHINE LEARNING
            </div>
          </button>
        </div>

        {/* Subtle Chapter Indicator (Editorial clean links, no pill badges) */}
        {isExploded && (
          <nav aria-label="Portfolio Chapters" className="hidden lg:flex items-center gap-4 text-xs font-mono-code text-neutral-400 bg-neutral-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {CHAPTERS.filter((c) => c.id !== 'overview').map((chapter, idx) => {
              const isActive = activeChapter === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.id)}
                  className={`transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-rose-400 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-neutral-600 mr-1">{String(idx + 1).padStart(2, '0')}.</span>
                  {chapter.label.replace('ACT I: ', '').replace("DIRECTOR'S CUT", 'DIRECTOR')}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Action Zone */}
        <div className="flex items-center gap-3 text-xs font-mono-code">
          {/* Interaction status hint */}
          <span className="hidden sm:inline-block text-neutral-400 text-[11px] tracking-wider uppercase">
            [ DRAG TO ROTATE ]
          </span>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Procedural Audio' : 'Mute Audio'}
            className="p-2 rounded-lg bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Keyboard Help Toggle */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            title="Keyboard & Navigation Guide"
            className="p-2 rounded-lg bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Middle Layer: Initial Cinematic Title Screen or Exploded Content Panel */}
      <div className="flex-1 flex items-center justify-center md:justify-end py-2 px-1 relative">
        {/* Initial Closed State: Cinematic subtle hero cue */}
        {!isExploded && (
          <div className="text-center max-w-lg mx-auto space-y-4 pointer-events-none transform -translate-y-4">
            <div className="text-[11px] tracking-[0.3em] font-mono-code text-rose-500 uppercase">
              INTERACTIVE CINEMA OBJECT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white/95">
              SARANG R N
            </h2>
            <p className="text-xs sm:text-sm tracking-widest text-neutral-300 uppercase font-mono-code">
              DIRECTOR / SOFTWARE DEVELOPER / MACHINE LEARNING
            </p>
            <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
              A computer applications graduate approaching software the way a filmmaker approaches cinema.
            </p>
          </div>
        )}

        {/* Exploded State: Floating Content Panel */}
        {isExploded && !isPanelMinimized && (
          <div className="pointer-events-auto w-full md:w-auto z-20">
            <ContentPanel
              activeChapter={activeChapter === 'overview' ? 'featureProject' : activeChapter}
              onSelectChapter={onSelectChapter}
              onClose={() => setIsPanelMinimized(true)}
            />
          </div>
        )}

        {/* Minimized Panel Re-Open Button */}
        {isExploded && isPanelMinimized && (
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsPanelMinimized(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900/90 backdrop-blur-md border border-white/15 text-xs font-mono-code text-neutral-200 hover:text-white hover:border-rose-500/50 shadow-xl transition-all"
            >
              <Eye className="w-4 h-4 text-rose-400" />
              <span>READ ARCHIVE: {currentChapterObj.label}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Bottom HUD Bar */}
      <footer className="flex flex-col items-center justify-center gap-2.5 pb-2 pointer-events-auto">
        {/* Hovered Part Feedback */}
        {hoveredPartLabel && (
          <div className="text-xs font-mono-code text-rose-300 tracking-wider bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-rose-500/30">
            INSPECT: {hoveredPartLabel}
          </div>
        )}

        {/* Main Explode / Reassemble Trigger Button */}
        <button
          onClick={onToggleExplode}
          className="group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800/95 border border-white/15 hover:border-rose-500/60 shadow-[0_0_25px_rgba(225,29,72,0.15)] hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
          <span className="text-xs sm:text-sm font-mono-code tracking-[0.2em] font-semibold text-white group-hover:text-rose-200 transition-colors uppercase">
            {!isExploded ? 'CLICK THE HEADPHONE // TO EXPLODE DISASSEMBLY' : 'CLICK TO REASSEMBLE // RESTORE OBJECT'}
          </span>
        </button>

        {/* Subtle Keyboard Navigation Legend */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono-code text-neutral-400">
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] mr-1">SPACE</kbd>
            Explode / Assemble
          </span>
          <span>·</span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] mr-1">DRAG</kbd>
            3D Orbit
          </span>
          <span>·</span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] mr-1">SCROLL</kbd>
            Zoom
          </span>
        </div>
      </footer>

      {/* 4. Keyboard Shortcuts Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 pointer-events-auto">
          <div className="bg-[#0b0c10] border border-white/20 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-mono-code uppercase tracking-wider text-rose-400 font-bold">
                INTERACTION & CAMERA DIRECTIVES
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-neutral-400 hover:text-white text-xs font-mono-code"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400 font-mono-code">SPACE / ENTER</span>
                <span>Explode / Reassemble Headphone</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400 font-mono-code">MOUSE DRAG</span>
                <span>360° Free Physical Rotation</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400 font-mono-code">MOUSE WHEEL</span>
                <span>Smooth Perspective Zoom (In / Out)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400 font-mono-code">ARROW KEYS</span>
                <span>Incremental Precision Rotation</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400 font-mono-code">+ / -</span>
                <span>Step Zoom Camera</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400 font-mono-code">ESC</span>
                <span>Restore Monolith Assembled State</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-400 font-mono-code">CLICK 3D PARTS</span>
                <span>Directly Select and Inspect Chapters</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-neutral-400 font-light">
              Designed for Sarang R N as an interactive cinema title sequence and disassembled engineering archive.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
