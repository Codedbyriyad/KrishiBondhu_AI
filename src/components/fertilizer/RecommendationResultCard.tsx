import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, FileText } from 'lucide-react';
import type { RecommendationResult } from '../../types/fertilizer';
import { FertilizerTable } from './FertilizerTable';

interface RecommendationResultCardProps {
  result: RecommendationResult;
}

export const RecommendationResultCard: React.FC<RecommendationResultCardProps> = ({
  result,
}) => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              {result.crop}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              {result.district} District
            </span>
          </div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
            Fertilizer Schedule for {result.landSizeText}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Target Stage: {result.growthStage}
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/60 shrink-0">
          <FileText className="w-5 h-5 text-emerald-600" />
          <div className="text-right sm:text-left">
            <p className="text-[10px] text-stone-400">Calculated Nutrients</p>
            <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
              {result.fertilizers.length} Fertilizer Types
            </p>
          </div>
        </div>
      </div>

      {/* Main Fertilizer Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-stone-500">
          Recommended Dosages & Timing
        </h3>
        <FertilizerTable items={result.fertilizers} />
      </div>

      {/* Notes & Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Advice Notes */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            Field Application Tips
          </div>
          <ul className="space-y-1.5 text-xs text-emerald-900/80 dark:text-emerald-200/80">
            {result.generalNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Precautions */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Safety & Handling Precautions
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900/80 dark:text-amber-200/80">
            {result.safetyWarnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};