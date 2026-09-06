import React from 'react';
import { AlertTriangle, ShieldCheck, Leaf, Stethoscope, ShieldAlert, Sprout } from 'lucide-react';
import type { DiseaseResult } from '../../types/disease';

interface PredictionResultCardProps {
  result: DiseaseResult;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ result }) => {
  const getSeverityBadge = (severity: string) => {
    const sev = severity.toLowerCase();
    if (sev === 'high' || sev === 'উচ্চ') {
      return {
        style: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200/50',
        label: 'উচ্চ ঝুঁকি (High Severity)',
      };
    }
    if (sev === 'medium' || sev === 'মাঝারি') {
      return {
        style: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200/50',
        label: 'মাঝারি ঝুঁকি (Medium Severity)',
      };
    }
    return {
      style: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200/50',
      label: 'কম ঝুঁকি (Low Severity)',
    };
  };

  const badgeInfo = getSeverityBadge(result.severity);
  const organicList = result.organicRemediation || result.treatments?.organic || [];
  const chemicalList = result.chemicalRemediation || result.treatments?.chemical || [];
  const preventionList = result.preventiveTips || result.prevention || [];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div className="space-y-1">
          {result.cropType && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sprout className="w-3.5 h-3.5" />
              <span>ফসলের ধরন: {result.cropType}</span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {result.diseaseName}
            </h2>
            <span
              className={`text-[11px] font-bold px-3 py-0.5 rounded-full border ${badgeInfo.style}`}
            >
              {badgeInfo.label}
            </span>
          </div>
          {result.scientificName && (
            <p className="text-xs italic text-stone-500 dark:text-stone-400">
              {result.scientificName}
            </p>
          )}
        </div>

        {/* Confidence pill */}
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {typeof result.confidence === 'number' ? result.confidence.toFixed(1) : result.confidence}% নির্ভরতা (Confidence)
          </span>
        </div>
      </div>

      {/* Description */}
      {result.description && (
        <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300 bg-stone-50/70 dark:bg-stone-800/40 p-3.5 rounded-2xl border border-stone-100 dark:border-stone-800/60">
          {result.description}
        </p>
      )}

      {/* Treatments Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-emerald-600" /> সুনির্দিষ্ট চিকিৎসা নির্দেশিকা (Remediation)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Organic */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" /> জৈব প্রতিকার (Organic Remediation)
            </h4>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside">
              {organicList.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Chemical */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> রাসায়নিক প্রতিকার (Chemical Remediation)
            </h4>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside">
              {chemicalList.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Prevention Section */}
      {preventionList.length > 0 && (
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600" /> ভবিষ্যৎ প্রতিরোধমূলক পরামর্শ (Preventive Tips)
          </h3>
          <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
            {preventionList.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};