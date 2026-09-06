import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">System Settings</h1>

      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 text-xs">
        <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-800">
          <span>SMS Weather Alerts</span>
          <input type="checkbox" defaultChecked className="accent-emerald-600" />
        </div>
        <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-800">
          <span>Bangla Voice Output</span>
          <input type="checkbox" defaultChecked className="accent-emerald-600" />
        </div>
      </div>
    </div>
  );
};