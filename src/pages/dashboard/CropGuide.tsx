import React from 'react';
import { BookOpen } from 'lucide-react';

export const CropGuide: React.FC = () => {
  const guides = [
    { name: 'Aman Rice (BINA-11)', season: 'Monsoon', duration: '115 Days', target: 'High Yield' },
    { name: 'Potato (Granola)', season: 'Winter', duration: '90 Days', target: 'Export Quality' },
    { name: 'Wheat (BARI Gom-33)', season: 'Winter', duration: '105 Days', target: 'Blast Resistant' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Seasonal Crop Catalog</h1>
        <p className="text-xs text-stone-500">Cultivation schedules optimized for Rajshahi soil zone.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {guides.map((item) => (
          <div key={item.name} className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-800 dark:text-stone-100">{item.name}</h3>
              <p className="text-xs text-stone-400">{item.target}</p>
            </div>
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs space-y-1">
              <p className="flex justify-between"><span className="text-stone-400">Season:</span> <span>{item.season}</span></p>
              <p className="flex justify-between"><span className="text-stone-400">Harvest Time:</span> <span>{item.duration}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};