import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const FertilizerRecommendation: React.FC = () => {
  const [crop, setCrop] = useState('Paddy');
  const [landArea, setLandArea] = useState('1');
  const [calculated, setCalculated] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Fertilizer Dose Calculator</h1>
        <p className="text-xs text-stone-500">Calculate exact N-P-K requirement per acre.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Select Crop</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full text-xs p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>Paddy (Aman)</option>
            <option>Potato</option>
            <option>Wheat</option>
            <option>Maize</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Land Size (Acres)</label>
          <input
            type="number"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            className="w-full text-xs p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
        >
          <Calculator className="w-4 h-4" /> Calculate Requirement
        </button>

        {calculated && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-xs space-y-2 border border-emerald-200/60">
            <p className="font-bold text-emerald-800 dark:text-emerald-300">Recommended Dosage ({landArea} Acre):</p>
            <ul className="space-y-1 text-stone-700 dark:text-stone-300">
              <li>• Urea: {Number(landArea) * 45} kg</li>
              <li>• TSP: {Number(landArea) * 20} kg</li>
              <li>• MOP: {Number(landArea) * 18} kg</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};