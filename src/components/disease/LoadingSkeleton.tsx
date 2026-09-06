import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg" />
        <div className="h-6 w-20 bg-stone-200 dark:bg-stone-800 rounded-full" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded-md" />
        <div className="h-4 w-5/6 bg-stone-200 dark:bg-stone-800 rounded-md" />
      </div>

      <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
        <div className="h-5 w-32 bg-stone-200 dark:bg-stone-800 rounded-md" />
        <div className="h-16 w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />
        <div className="h-16 w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />
      </div>
    </div>
  );
};