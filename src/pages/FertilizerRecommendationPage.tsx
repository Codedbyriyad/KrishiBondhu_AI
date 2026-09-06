import React, { useState } from 'react';
import type { FertilizerFormInput, RecommendationResult } from '../types/fertilizer';
import { RecommendationForm } from '../components/fertilizer/RecommendationForm';
import { RecommendationResultCard } from '../components/fertilizer/RecommendationResultCard';
import {
  CROP_OPTIONS,
  DISTRICT_OPTIONS,
  GROWTH_STAGE_OPTIONS,
  getFertilizerRecommendation,
} from '../data/mockFertilizer';

export const FertilizerRecommendationPage: React.FC = () => {
  const [result, setResult] = useState<RecommendationResult | null>(() =>
    getFertilizerRecommendation({
      crop: CROP_OPTIONS[0],
      district: DISTRICT_OPTIONS[0],
      growthStage: GROWTH_STAGE_OPTIONS[0],
      landSize: 33,
      landUnit: 'decimal',
    })
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (input: FertilizerFormInput) => {
    setIsLoading(true);
    // Simulate short computation delay
    setTimeout(() => {
      const res = getFertilizerRecommendation(input);
      setResult(res);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Intro */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Fertilizer Recommendation System
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          Get precise fertilizer dosage recommendations based on your crop type, regional land size, and growth stage.
        </p>
      </div>

      {/* Input Form */}
      <RecommendationForm onSubmit={handleFormSubmit} isLoading={isLoading} />

      {/* Results Section */}
      {result && <RecommendationResultCard result={result} />}
    </div>
  );
};