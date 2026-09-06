import React from 'react';
import { Clock, Info, Scale } from 'lucide-react';
import type { FertilizerItem } from '../../types/fertilizer';

interface FertilizerTableProps {
  items: FertilizerItem[];
}

export const FertilizerTable: React.FC<FertilizerTableProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200/80 dark:border-stone-800">
      <table className="w-full text-left text-xs">
        <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 font-semibold border-b border-stone-200/80 dark:border-stone-800">
          <tr>
            <th className="py-3 px-4">Fertilizer Name</th>
            <th className="py-3 px-4 text-right">
              <span className="flex items-center justify-end gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-600" /> Quantity (কেজি)
              </span>
            </th>
            <th className="py-3 px-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Application Timing
              </span>
            </th>
            <th className="py-3 px-4 hidden md:table-cell">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-600" /> Notes & Guidance
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors"
            >
              <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-stone-100">
                {item.name}
              </td>
              <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                {item.quantityKg} <span className="text-xs font-normal text-stone-500">kg</span>
              </td>
              <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300 max-w-xs leading-relaxed">
                {item.applicationTime}
              </td>
              <td className="py-3.5 px-4 text-stone-500 dark:text-stone-400 hidden md:table-cell leading-relaxed">
                {item.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};