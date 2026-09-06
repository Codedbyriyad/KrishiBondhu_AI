import React from 'react';
import { Sprout, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { FarmingAdvice } from '../../types/weather';

interface FarmingAdviceCardProps {
  advices: FarmingAdvice[];
  agriAdvisory?: string;
}

export const FarmingAdviceCard: React.FC<FarmingAdviceCardProps> = ({ advices, agriAdvisory }) => {
  const getStatusBadge = (status: FarmingAdvice['status']) => {
    switch (status) {
      case 'recommended':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200/70',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
          label: 'সুপারিশকৃত পদক্ষেপ (Recommended)',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200/70',
          icon: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
          label: 'সতর্কতা অবলম্বন করুন (Caution)',
        };
      case 'avoid':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-200/70',
          icon: <XCircle className="w-4 h-4 text-rose-600 shrink-0" />,
          label: 'কাজটি বিরত রাখুন (Avoid)',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              আবহাওয়া ভিত্তিক কৃষি পরামর্শ (Agricultural Advisory)
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              বর্তমান বৃষ্টিপাত ও আর্দ্রতা অনুযায়ী কৃষকদের জন্য প্রস্তুতকৃত দিকনির্দেশনা
            </p>
          </div>
        </div>
      </div>

      {agriAdvisory && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-xs leading-relaxed text-emerald-950 dark:text-emerald-200 font-medium space-y-1">
          <p className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
            📢 সার্বিক কৃশিকাজ নির্দেশনা (Advisory Summary)
          </p>
          <p>{agriAdvisory}</p>
        </div>
      )}

      <div className="space-y-3">
        {advices.map((advice, idx) => {
          const badge = getStatusBadge(advice.status);
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${badge.bg} space-y-2.5 transition-all`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {badge.icon}
                  <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">{advice.title}</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-stone-900/80 border border-stone-200/60 dark:border-stone-800">
                  {badge.label}
                </span>
              </div>

              <p className="text-xs leading-relaxed opacity-90 text-stone-800 dark:text-stone-200">
                {advice.description}
              </p>

              {advice.suitableCrops && advice.suitableCrops.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-semibold text-stone-600 dark:text-stone-400">
                    প্রযোজ্য ফসলসমূহ:
                  </span>
                  {advice.suitableCrops.map((crop, cropIdx) => (
                    <span
                      key={cropIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 font-bold text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};