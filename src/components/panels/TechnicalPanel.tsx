import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData.ts';
import { Terminal, Database, Globe, Brain, Wrench } from 'lucide-react';

export const TechnicalPanel: React.FC = () => {
  const { technicalDepartment } = PORTFOLIO_DATA;
  const { programming, dataAndDatabase, webDepartment, machineLearningDepartment, productionTools } = technicalDepartment;

  return (
    <div className="space-y-6 text-[#f4f4f5]">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-[11px] tracking-[0.25em] uppercase text-rose-500 font-mono-code mb-1">
          CREW & PIPELINE // SPECS
        </div>
        <h2 className="text-2xl font-display font-bold tracking-tight text-white">
          TECHNICAL & ML DEPARTMENT
        </h2>
        <p className="text-xs text-neutral-400 mt-1 font-mono-code">
          Algorithmic logic, neural architecture, full-stack web and digital tooling
        </p>
      </div>

      {/* Machine Learning Department (Hero feature) */}
      <div className="space-y-3 p-4 rounded-lg border border-rose-500/20 bg-rose-950/10">
        <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-rose-400">
          <Brain className="w-4 h-4 text-rose-500" />
          <span>MACHINE LEARNING DEPARTMENT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Data Processing */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-neutral-400">
              {machineLearningDepartment.dataProcessing.title}
            </div>
            <div className="text-xs text-neutral-200 font-medium flex gap-2">
              {machineLearningDepartment.dataProcessing.skills.map((skill, i) => (
                <span key={skill}>
                  {skill}
                  {i < machineLearningDepartment.dataProcessing.skills.length - 1 && (
                    <span className="text-neutral-600 ml-2">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Learning */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-neutral-400">
              {machineLearningDepartment.deepLearning.title}
            </div>
            <div className="text-xs text-neutral-200 font-medium flex gap-2">
              {machineLearningDepartment.deepLearning.skills.map((skill, i) => (
                <span key={skill}>
                  {skill}
                  {i < machineLearningDepartment.deepLearning.skills.length - 1 && (
                    <span className="text-neutral-600 ml-2">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Artificial Intelligence */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-neutral-400">
              {machineLearningDepartment.artificialIntelligence.title}
            </div>
            <div className="text-xs text-neutral-200 font-medium flex gap-2">
              {machineLearningDepartment.artificialIntelligence.skills.map((skill, i) => (
                <span key={skill}>
                  {skill}
                  {i < machineLearningDepartment.artificialIntelligence.skills.length - 1 && (
                    <span className="text-neutral-600 ml-2">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Web Automation */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-neutral-400">
              {machineLearningDepartment.webAutomation.title}
            </div>
            <div className="text-xs text-neutral-200 font-medium flex gap-2">
              {machineLearningDepartment.webAutomation.skills.map((skill, i) => (
                <span key={skill}>
                  {skill}
                  {i < machineLearningDepartment.webAutomation.skills.length - 1 && (
                    <span className="text-neutral-600 ml-2">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Programming & Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Programming */}
        <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-300">
            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
            <span>PROGRAMMING</span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-200">
            {programming.map((lang, idx) => (
              <span key={lang}>
                {lang}
                {idx < programming.length - 1 && <span className="text-neutral-600 ml-2">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Data & Database */}
        <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-300">
            <Database className="w-3.5 h-3.5 text-neutral-400" />
            <span>DATA & DATABASE</span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-200">
            {dataAndDatabase.map((db, idx) => (
              <span key={db}>
                {db}
                {idx < dataAndDatabase.length - 1 && <span className="text-neutral-600 ml-2">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Web Department */}
      <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-300">
          <Globe className="w-3.5 h-3.5 text-neutral-400" />
          <span>WEB DEPARTMENT</span>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-200">
          {webDepartment.map((tech, idx) => (
            <span key={tech}>
              {tech}
              {idx < webDepartment.length - 1 && <span className="text-neutral-600 ml-2">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Production Tools */}
      <div className="p-4 rounded-lg border border-white/10 bg-white/[0.02] space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-300">
          <Wrench className="w-3.5 h-3.5 text-neutral-400" />
          <span>PRODUCTION TOOLS</span>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-300">
          {productionTools.map((tool, idx) => (
            <span key={tool}>
              {tool}
              {idx < productionTools.length - 1 && <span className="text-neutral-600 ml-2">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
