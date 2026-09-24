import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { Mail, Phone, MapPin, Compass, Film, Code2 } from 'lucide-react';

export const OpeningCreditsPanel: React.FC = () => {
  const { identity, openingCredits } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Chapter header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code mb-1">
          ACT I // OPENING CREDITS
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">
          {identity.name}
        </h2>
        <p className="text-xs md:text-sm tracking-wider uppercase text-neutral-400 mt-1">
          {identity.titles}
        </p>
      </div>

      {/* Cinematic Synopsis */}
      <div className="space-y-3">
        <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-light">
          {openingCredits.synopsis}
        </p>
        <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
          {openingCredits.bio}
        </p>
      </div>

      {/* Technical Profile Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-[10px] tracking-wider uppercase text-neutral-500 font-mono-code">
            Alma Mater
          </div>
          <div className="text-xs md:text-sm font-medium text-neutral-200">
            {openingCredits.education}
          </div>
          <div className="text-xs text-neutral-400">
            CGPA: {openingCredits.cgpa} <span className="text-neutral-600">·</span> {openingCredits.classification}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] tracking-wider uppercase text-neutral-500 font-mono-code">
            Languages
          </div>
          <div className="text-xs md:text-sm font-medium text-neutral-200">
            Primary: <span className="text-rose-400">{openingCredits.primaryLanguage}</span>
          </div>
          <div className="text-xs text-neutral-400">
            Secondary: {openingCredits.secondaryLanguages.join(' · ')}
          </div>
        </div>
      </div>

      {/* Special Interests */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <div className="text-[10px] tracking-wider uppercase text-neutral-500 font-mono-code">
          Special Interests & Focus
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-300">
          {openingCredits.specialInterests.map((interest, idx) => (
            <span key={interest} className="inline-flex items-center">
              {interest}
              {idx < openingCredits.specialInterests.length - 1 && (
                <span className="ml-2 text-neutral-600">/</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Direct Contact Metadata */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>{identity.location}</span>
        </div>
        <a
          href={`mailto:${identity.email}`}
          className="flex items-center gap-1.5 text-neutral-300 hover:text-rose-400 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>{identity.email}</span>
        </a>
        <a
          href={`tel:${identity.phone}`}
          className="flex items-center gap-1.5 text-neutral-300 hover:text-rose-400 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>{identity.phone}</span>
        </a>
      </div>
    </div>
  );
};
