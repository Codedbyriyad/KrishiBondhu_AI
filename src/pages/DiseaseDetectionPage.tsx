import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { ImageUploader } from '../components/disease/ImageUploader';
import { PredictionResultCard } from '../components/disease/PredictionResultCard';
import { HealthyPlantCard } from '../components/disease/HealthyPlantCard';
import { LoadingSkeleton } from '../components/disease/LoadingSkeleton';
import { analyzeCropImage } from '../services/diseaseService';
import type { DiseaseResult } from '../types/disease';

export const DiseaseDetectionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  void selectedFile;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setIsAnalyzing(true);

    try {
      const data = await analyzeCropImage(file);
      setResult(data);
    } catch (error) {
      console.error('Diagnosis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center sm:justify-start gap-2">
          <span>Crop Disease Detector</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
            AI Powered
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Upload a clear leaf photo to diagnose crop diseases, pests, and get organic or chemical treatments instantly.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload Column */}
        <div className="lg:col-span-5 space-y-4">
          <ImageUploader
            onImageSelect={handleImageSelect}
            selectedPreview={previewUrl}
            onClear={handleClear}
            isAnalyzing={isAnalyzing}
          />

          {previewUrl && !isAnalyzing && (
            <button
              onClick={handleClear}
              className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Analyze Another Leaf
            </button>
          )}
        </div>

        {/* Prediction Results Column */}
        <div className="lg:col-span-7">
          {isAnalyzing && <LoadingSkeleton />}

          {!isAnalyzing && result && (
            result.isHealthy ? (
              <HealthyPlantCard result={result} />
            ) : (
              <PredictionResultCard result={result} />
            )
          )}

          {!isAnalyzing && !result && (
            <div className="h-64 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center text-center p-6 bg-stone-50/30 dark:bg-stone-900/30">
              <Sparkles className="w-8 h-8 text-stone-300 dark:text-stone-700 mb-2" />
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Awaiting leaf upload...
              </p>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
                Upload a photo on the left to display disease diagnosis and treatments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};