import React from 'react';
import { ACTIVITY_HISTORY } from '../../data/dashboardDummyData';

export const HistoryView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Activity History</h1>
        <p className="text-xs text-stone-500">Record of all previous AI scans and queries.</p>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 overflow-hidden">
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {ACTIVITY_HISTORY.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-stone-800 dark:text-stone-200">{item.title}</span>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-1">{item.details}</p>
              </div>
              <span className="text-[10px] text-stone-400 shrink-0">{item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};