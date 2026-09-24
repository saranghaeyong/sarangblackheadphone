import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { Award, CheckCircle2, Calendar } from 'lucide-react';

export const CertificationsPanel: React.FC = () => {
  const { certificationFilmography } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code mb-1">
          CREDENTIALS // SPECIALIZED DIPLOMAS
        </div>
        <h2 className="text-2xl font-display font-bold tracking-tight text-white">
          CERTIFICATION FILMOGRAPHY
        </h2>
        <p className="text-xs text-neutral-400 mt-1 font-mono-code">
          Hands-on vocational qualifications in web systems, desktop publishing, and applied computing
        </p>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certificationFilmography.map((cert) => (
          <div
            key={cert.title}
            className="p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-rose-400 font-bold tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                DIPLOMA
              </span>
              <span className="text-xs font-mono-code text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-neutral-500" />
                {cert.year}
              </span>
            </div>

            <h3 className="text-sm md:text-base font-semibold text-neutral-100 tracking-tight">
              {cert.title}
            </h3>

            <div className="text-xs text-neutral-400">
              Institution: <span className="text-neutral-300">{cert.institution}</span>
            </div>

            <div className="pt-1 text-xs text-neutral-400 font-light border-t border-white/5">
              <span className="text-neutral-500 font-mono-code uppercase mr-1">Focus:</span>
              {cert.focus}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
