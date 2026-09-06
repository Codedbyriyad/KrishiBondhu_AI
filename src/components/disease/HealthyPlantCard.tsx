import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import type { DiseaseResult } from '../../types/disease';

interface HealthyPlantCardProps {
  result: DiseaseResult;
}

export const HealthyPlantCard: React.FC<HealthyPlantCardProps> = ({ result }) => {
  return (
    <div className="bg-emerald-50/60 dark:bg-emerald-950/30 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 p-6 space-y-5 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
              {result.diseaseName}
            </h2>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Crop is thriving with high vitality
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 px-3 py-1.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {result.confidence.toFixed(1)}% Match
          </span>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
        {result.description}
      </p>

      <div className="p-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
        <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" /> Routine Maintenance Tips
        </h3>
        <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1 list-disc list-inside">
          {result.prevention.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};