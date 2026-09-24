import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { Mail, Phone, MapPin, Film, Sparkles } from 'lucide-react';

export const FinalCreditsPanel: React.FC = () => {
  const { finalCredits, identity } = PORTFOLIO_DATA;
  const [imageFailed, setImageFailed] = useState(false);

  const creditRows = [
    { role: 'Directed by', name: finalCredits.directedBy },
    { role: 'Written by', name: finalCredits.writtenBy },
    { role: 'Produced by', name: finalCredits.producedBy },
    { role: 'Cinematography', name: finalCredits.cinematography },
    { role: 'Editing', name: finalCredits.editing },
    { role: 'Sound', name: finalCredits.sound },
    { role: 'Visual Effects', name: finalCredits.visualEffects },
    { role: 'Special Effects', name: finalCredits.specialEffects },
  ];

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code mb-1">
            END CREDITS // PRODUCTION ROLL
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">
            SARANG R N
          </h2>
        </div>

        {/* Embossed Director Seal */}
        <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0 bg-neutral-900 shadow-lg">
          {!imageFailed ? (
            <img
              src="/src/assets/images/director_archive_seal_1790251220750.jpg"
              alt="Director Archive Seal Sarang R N"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-rose-500 font-mono-code text-xs">
              SRN
            </div>
          )}
        </div>
      </div>

      {/* Credit Roll Rows */}
      <div className="divide-y divide-white/5 py-1">
        {creditRows.map((item) => (
          <div key={item.role} className="py-2 flex items-center justify-between text-xs">
            <span className="font-mono-code text-neutral-400 tracking-wider uppercase text-[11px]">
              {item.role}
            </span>
            <span className="text-neutral-200 font-medium tracking-wide">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* The Story Continues */}
      <div className="pt-4 border-t border-white/10 text-center space-y-3">
        <div className="text-xs font-mono-code tracking-[0.3em] uppercase text-rose-400 font-bold">
          {finalCredits.theStoryContinues}
        </div>
        <p className="text-xs text-neutral-400 font-light">
          Available for technical direction, software engineering, and AI / ML research collaboration.
        </p>

        {/* Contact Links */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono-code text-neutral-300">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            {finalCredits.location}
          </span>
          <a
            href={`mailto:${finalCredits.email}`}
            className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            {finalCredits.email}
          </a>
          <a
            href={`tel:${finalCredits.phone}`}
            className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-rose-500" />
            {finalCredits.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
