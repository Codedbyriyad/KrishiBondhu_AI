import React from 'react';
import { Sprout, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { FarmingAdvice } from '../../types/weather';

interface FarmingAdviceCardProps {
  advices: FarmingAdvice[];
}

export const FarmingAdviceCard: React.FC<FarmingAdviceCardProps> = ({ advices }) => {
  const getStatusBadge = (status: FarmingAdvice['status']) => {
    switch (status) {
      case 'recommended':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/60',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          label: 'Recommended Action',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/60',
          icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
          label: 'Exercise Caution',
        };
      case 'avoid':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200/60',
          icon: <XCircle className="w-4 h-4 text-rose-600" />,
          label: 'Avoid Activity',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Weather-Based Farming Advice (কৃষি পরামর্শ)
            </h2>
            <p className="text-[10px] text-stone-400 dark:text-stone-500">
              Customized for current rainfall & humidity patterns
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {advices.map((advice, idx) => {
          const badge = getStatusBadge(advice.status);
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${badge.bg} space-y-2 transition-all`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {badge.icon}
                  <h3 className="text-xs font-bold">{advice.title}</h3>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/60 dark:bg-stone-900/60">
                  {advice.category}
                </span>
              </div>

              <p className="text-xs leading-relaxed opacity-90">
                {advice.description}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                  Crops affected:
                </span>
                {advice.suitableCrops.map((crop, cropIdx) => (
                  <span
                    key={cropIdx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 font-medium text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};