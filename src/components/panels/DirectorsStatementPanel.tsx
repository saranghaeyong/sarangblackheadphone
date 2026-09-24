import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { Quote, Clapperboard, Sparkles } from 'lucide-react';

export const DirectorsStatementPanel: React.FC = () => {
  const { directorsStatement, currentGenre } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code mb-1">
          MANIFESTO // PHILOSOPHY
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">
          DIRECTOR&apos;S STATEMENT
        </h2>
        <p className="text-xs text-neutral-400 mt-1 font-mono-code">
          The convergence of software development, artificial intelligence, and visual storytelling
        </p>
      </div>

      {/* Hero Quote */}
      <div className="relative pl-6 border-l-2 border-rose-500/80 py-2 space-y-2">
        <blockquote className="text-lg md:text-xl font-display italic text-white leading-relaxed">
          &ldquo;{directorsStatement.quote}&rdquo;
        </blockquote>
      </div>

      {/* Narrative Prose */}
      <div className="space-y-3">
        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light">
          {directorsStatement.prelude}
        </p>

        <div className="text-sm md:text-base font-mono-code tracking-widest text-rose-400 font-bold uppercase py-1">
          {directorsStatement.highlight}
        </div>

        {/* 4 Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {directorsStatement.principles.map((principle) => (
            <div
              key={principle}
              className="p-3 rounded border border-white/5 bg-white/[0.02] text-xs text-neutral-200 font-light"
            >
              {principle}
            </div>
          ))}
        </div>

        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light pt-2">
          {directorsStatement.reflection}
        </p>
      </div>

      {/* Current Genre */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <div className="text-[10px] tracking-wider uppercase text-neutral-500 font-mono-code flex items-center gap-1.5">
          <Clapperboard className="w-3.5 h-3.5 text-rose-500" />
          <span>CURRENT GENRE & DOMAINS</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-neutral-200 font-mono-code">
          {currentGenre.map((genre, idx) => (
            <span key={genre} className="inline-flex items-center">
              <span className="text-rose-400 mr-1.5">/</span>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
