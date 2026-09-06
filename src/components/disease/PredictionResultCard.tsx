import React from 'react';
import { AlertTriangle, ShieldCheck, Leaf, Stethoscope, ShieldAlert } from 'lucide-react';
import type { DiseaseResult } from '../../types/disease';

interface PredictionResultCardProps {
  result: DiseaseResult;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ result }) => {
  const getSeverityBadge = (severity: DiseaseResult['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200/50';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200/50';
      default:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200/50';
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {result.diseaseName}
            </h2>
            <span
              className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${getSeverityBadge(
                result.severity
              )}`}
            >
              {result.severity} Severity
            </span>
          </div>
          {result.scientificName && (
            <p className="text-xs italic text-stone-500 dark:text-stone-400 mt-0.5">
              {result.scientificName}
            </p>
          )}
        </div>

        {/* Confidence pill */}
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {result.confidence.toFixed(1)}% Confidence
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
        {result.description}
      </p>

      {/* Treatments Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-emerald-600" /> Recommended Treatment (চিকিৎসা)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Organic */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
            <h4 className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Organic Solutions
            </h4>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside">
              {result.treatments.organic.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Chemical */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
            <h4 className="text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Chemical Care
            </h4>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside">
              {result.treatments.chemical.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Prevention Section */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-600" /> Prevention Protocol (প্রতিরোধ)
        </h3>
        <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 list-disc list-inside bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl">
          {result.prevention.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};