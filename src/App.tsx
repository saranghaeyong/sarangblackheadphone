/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Scene } from './components/Scene.tsx';
import { ContentOverlay } from './components/ContentOverlay.tsx';
import { ChapterId } from './data/portfolioData.ts';
import { cinemaAudio } from './utils/audio.ts';

export default function App() {
  // CRITICAL REQUIREMENT: The headphone must ALWAYS begin as a fully assembled object.
  const [isExploded, setIsExploded] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ChapterId>('featureProject');
  const [hoveredPartLabel, setHoveredPartLabel] = useState<string | null>(null);

  const handleToggleExplode = useCallback(() => {
    setIsExploded((prev) => {
      const next = !prev;
      if (next) {
        cinemaAudio.playDisassemble();
      } else {
        cinemaAudio.playReassemble();
      }
      return next;
    });
  }, []);

  const handleSelectChapter = useCallback((chapterId: ChapterId) => {
    setActiveChapter(chapterId);
  }, []);

  const handleHoverPart = useCallback((label: string | null) => {
    setHoveredPartLabel(label);
  }, []);

  return (
    <main className="relative w-screen h-screen bg-[#070709] overflow-hidden select-none film-grain">
      {/* 3D Scene Viewport */}
      <Scene
        isExploded={isExploded}
        onToggleExplode={handleToggleExplode}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onHoverPart={handleHoverPart}
      />

      {/* Semantic DOM Overlay & Cinema Interface */}
      <ContentOverlay
        isExploded={isExploded}
        onToggleExplode={handleToggleExplode}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        hoveredPartLabel={hoveredPartLabel}
      />
    </main>
  );
}
