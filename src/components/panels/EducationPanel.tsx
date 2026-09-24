import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export const EducationPanel: React.FC = () => {
  const { educationalFilmography } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code mb-1">
          ACADEMIC ARCHIVE // 4 ACTS
        </div>
        <h2 className="text-2xl font-display font-bold tracking-tight text-white">
          EDUCATIONAL FILMOGRAPHY
        </h2>
        <p className="text-xs text-neutral-400 mt-1 font-mono-code">
          From foundational sciences to postgraduate machine learning & applications
        </p>
      </div>

      {/* Acts Timeline */}
      <div className="space-y-4">
        {educationalFilmography.map((act) => (
          <div
            key={act.act}
            className="p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors space-y-2 relative"
          >
            {/* Act badge & timeline years */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-rose-400 font-bold tracking-wider">
                {act.act}
              </span>
              <span className="text-xs font-mono-code text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-neutral-500" />
                {act.years}
              </span>
            </div>

            {/* Title & Degree */}
            <h3 className="text-sm md:text-base font-semibold text-neutral-100 tracking-tight">
              {act.title}
            </h3>

            {/* Institution & Location */}
            <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-neutral-300">{act.institution}</span>
              {act.location && (
                <>
                  <span className="text-neutral-600">·</span>
                  <span>{act.location}</span>
                </>
              )}
            </div>

            {/* Grades & Classification */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-code">
              {act.cgpa && (
                <span className="text-rose-300">
                  {act.cgpa}
                </span>
              )}
              {act.cgpa && <span className="text-neutral-600">·</span>}
              <span className="text-neutral-400">
                Classification: <span className="text-neutral-200">{act.classification}</span>
              </span>
            </div>

            {/* Focus line */}
            {act.focus && (
              <div className="pt-1 text-[11px] text-neutral-400 font-light border-t border-white/5">
                <span className="text-neutral-500 font-mono-code uppercase mr-1">Focus:</span>
                {act.focus}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
