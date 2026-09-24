import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { ShieldCheck, Award, Eye, Search, Layers, Cpu, Compass } from 'lucide-react';

export const FeatureProjectPanel: React.FC = () => {
  const { featureProject } = PORTFOLIO_DATA;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Chapter Title & Credits Badge */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code">
            FEATURE PROJECT // 16 CREDITS
          </span>
          <span className="text-[11px] tracking-wider font-mono-code text-emerald-400 font-medium flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            GRADE: {featureProject.grade}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white leading-snug">
          {featureProject.title}
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 mt-2 font-mono-code">
          <span>Prod: {featureProject.production}</span>
          <span>·</span>
          <span>Release: {featureProject.release}</span>
          <span>·</span>
          <span>By: {featureProject.directedBy}</span>
        </div>
      </div>

      {/* Genre Line */}
      <div className="text-xs text-rose-300/90 font-mono-code tracking-wide">
        Genre: {featureProject.genre}
      </div>

      {/* Forensic Visual Card */}
      <div className="relative rounded-lg overflow-hidden border border-white/10 bg-neutral-950 aspect-video group">
        {!imageFailed ? (
          <img
            src="/src/assets/images/project_phishing_analysis_1790251208320.jpg"
            alt="Forensic neural attention and phishing website detection analysis"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-400">
            <Cpu className="w-8 h-8 text-rose-500 mb-2 animate-pulse" />
            <span className="text-xs font-mono-code text-neutral-300">LLM & CNN Phishing Forensic Engine</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono-code text-neutral-300 pointer-events-none">
          <span>Multimodal URL & Webpage Content Analysis</span>
          <span className="text-rose-400">CNN + LLM Pipeline</span>
        </div>
      </div>

      {/* The Story */}
      <div className="space-y-2">
        <h3 className="text-xs tracking-[0.2em] uppercase font-mono-code text-neutral-400">
          THE STORY
        </h3>
        <p className="text-xs md:text-sm text-neutral-200 leading-relaxed font-light">
          {featureProject.story}
        </p>
      </div>

      {/* The Investigation (6 Perspectives) */}
      <div className="space-y-3 pt-3 border-t border-white/10">
        <h3 className="text-xs tracking-[0.2em] uppercase font-mono-code text-neutral-400 flex items-center justify-between">
          <span>THE INVESTIGATION</span>
          <span className="text-neutral-500 text-[10px]">6 PERSPECTIVES</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featureProject.investigation.map((item, idx) => (
            <div
              key={item.title}
              className="p-3 rounded border border-white/5 bg-white/[0.02] hover:border-white/15 transition-colors space-y-1"
            >
              <div className="text-[11px] font-mono-code text-rose-400 font-medium">
                {String(idx + 1).padStart(2, '0')}. {item.title}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Cut & Metrics */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        <h3 className="text-xs tracking-[0.2em] uppercase font-mono-code text-neutral-400">
          FINAL CUT & EVALUATION
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed">
          {featureProject.finalCut.objective}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-code text-xs text-neutral-400">
          <span className="text-neutral-500">Evaluated with:</span>
          {featureProject.finalCut.metrics.map((metric, i) => (
            <span key={metric} className="text-neutral-200">
              {metric}
              {i < featureProject.finalCut.metrics.length - 1 && (
                <span className="ml-2 text-neutral-600">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
