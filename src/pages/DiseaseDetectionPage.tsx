import React, { useState } from 'react';
import { Sparkles, ScanLine, Loader2, RotateCcw } from 'lucide-react';
import { ImageUploader } from '../components/disease/ImageUploader';
import { PredictionResultCard } from '../components/disease/PredictionResultCard';
import { HealthyPlantCard } from '../components/disease/HealthyPlantCard';
import { LoadingSkeleton } from '../components/disease/LoadingSkeleton';
import { analyzeCropImage } from '../services/diseaseService';
import type { DiseaseResult } from '../types/disease';

export const DiseaseDetectionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleRunScan = async () => {
    if (!selectedFile && !previewUrl) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const fileToUpload = selectedFile || previewUrl!;
      const data = await analyzeCropImage(fileToUpload);
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
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🌿 রোগ নির্ণয় কেন্দ্র (Disease Scanner)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
              Gemini Vision AI
            </span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            আক্রান্ত পাতার ছবি আপলোড করুন এবং কৃত্রিম বুদ্ধিমত্তার সাহায্যে সঠিক সমাধান পান।
          </p>
        </div>

        {previewUrl && !isAnalyzing && (
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            নতুন ছবি (Reset)
          </button>
        )}
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
            <ImageUploader
              onImageSelect={handleImageSelect}
              selectedPreview={previewUrl}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
            />

            {previewUrl && (
              <button
                onClick={handleRunScan}
                disabled={isAnalyzing}
                className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                  isAnalyzing
                    ? 'bg-emerald-700/80 text-white cursor-wait'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.99]'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>বিশ্লেষণ করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    <span>Scan Crop / রোগ নির্ণয় করুন</span>
                  </>
                )}
              </button>
            )}
          </div>
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
            <div className="min-h-[300px] rounded-3xl border-2 border-dashed border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center text-center p-6 bg-stone-50/40 dark:bg-stone-900/30">
              <Sparkles className="w-8 h-8 text-emerald-600 mb-2" />
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                ফসল পরীক্ষার অপেক্ষায়...
              </p>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1 max-w-xs">
                বামপাশের বক্স থেকে আক্রান্ত পাতার ছবি আপলোড করুন এবং <b>"Scan Crop / রোগ নির্ণয় করুন"</b> বাটনে ক্লিক করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};