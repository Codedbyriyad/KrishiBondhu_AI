import React, { useState } from 'react';
import { Sprout, MapPin, Activity, Maximize2, Sparkles } from 'lucide-react';
import type { FertilizerFormInput } from '../../types/fertilizer';
import { CROP_OPTIONS, DISTRICT_OPTIONS, GROWTH_STAGE_OPTIONS } from '../../data/mockFertilizer';

interface RecommendationFormProps {
  onSubmit: (data: FertilizerFormInput) => void;
  isLoading?: boolean;
}

export const RecommendationForm: React.FC<RecommendationFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formState, setFormState] = useState<FertilizerFormInput>({
    crop: CROP_OPTIONS[0],
    district: DISTRICT_OPTIONS[0],
    growthStage: GROWTH_STAGE_OPTIONS[0],
    landSize: 33,
    landUnit: 'decimal',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs"
    >
      <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          <Sprout className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Fertilizer Calculator (সার সুপারিশ হিসাব)
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Select field parameters to generate tailored application ratios
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Crop Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" /> Select Crop (ফসল)
          </label>
          <select
            value={formState.crop}
            onChange={(e) => setFormState({ ...formState, crop: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {CROP_OPTIONS.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> District (জেলা)
          </label>
          <select
            value={formState.district}
            onChange={(e) => setFormState({ ...formState, district: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {DISTRICT_OPTIONS.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Growth Stage */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" /> Growth Stage (ফসলের পর্যায়)
          </label>
          <select
            value={formState.growthStage}
            onChange={(e) => setFormState({ ...formState, growthStage: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {GROWTH_STAGE_OPTIONS.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        {/* Land Size Input */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-600" /> Land Size (জমির পরিমাণ)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              step="any"
              value={formState.landSize}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  landSize: Math.max(1, parseFloat(e.target.value) || 0),
                })
              }
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 33"
              required
            />
            <select
              value={formState.landUnit}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  landUnit: e.target.value as 'decimal' | 'bigha' | 'acre',
                })
              }
              className="w-32 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="decimal">Decimal (শতক)</option>
              <option value="bigha">Bigha (বিঘা)</option>
              <option value="acre">Acre (একর)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? 'Calculating Recommendation...' : 'Calculate Recommendation'}
      </button>
    </form>
  );
};