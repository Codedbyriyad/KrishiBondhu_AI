import React, { useState } from 'react';
import { Sparkles, ScanLine, Loader2, History, RotateCcw, CheckCircle2 } from 'lucide-react';
import { ImageUploader } from '../../components/disease/ImageUploader';
import { PredictionResultCard } from '../../components/disease/PredictionResultCard';
import { HealthyPlantCard } from '../../components/disease/HealthyPlantCard';
import { LoadingSkeleton } from '../../components/disease/LoadingSkeleton';
import { analyzeCropImage, getScanHistory } from '../../services/diseaseService';
import type { DiseaseResult } from '../../types/disease';

export const DiseaseDetection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [history, setHistory] = useState<DiseaseResult[]>(() => getScanHistory());

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setResult(null);
  };

  const handleRunScan = async () => {
    if (!selectedFile && !previewUrl) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const fileToUpload = selectedFile || previewUrl!;
      const scanResult = await analyzeCropImage(fileToUpload);
      setResult(scanResult);
      setHistory(getScanHistory());
    } catch (err) {
      console.error('Scan error:', err);
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🌿 রোগ নির্ণয় কেন্দ্র (Disease Scanner)</span>
            <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
              Gemini Vision AI
            </span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            আক্রান্ত পাতার ছবি তুলে মুহূর্তেই জেনে নিন রোগের ধরণ, জৈব ও রাসায়নিক প্রতিকার নির্দেশিকা।
          </p>
        </div>

        {previewUrl && !isAnalyzing && (
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            নতুন স্ক্যান (Reset)
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Drag & Drop Uploader */}
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
                    <span>এআই বিশ্লেষণ চলছে (Analyzing Crop)...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    <span>Scan Crop / রোগ নির্ণয় করুন</span>
                  </>
                )}
              </button>
            )}

            {/* Scanning Bar visual animation during analysis */}
            {isAnalyzing && (
              <div className="space-y-2 pt-2 animate-pulse">
                <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full animate-pulse w-3/4"></div>
                </div>
                <p className="text-[11px] text-center font-medium text-emerald-600 dark:text-emerald-400">
                  Gemini Vision AI পাতার রোগ লক্ষণসমূহ পরীক্ষা করছে...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Result Display */}
        <div className="lg:col-span-7 space-y-4">
          {isAnalyzing && <LoadingSkeleton />}

          {!isAnalyzing && result && (
            result.isHealthy ? (
              <HealthyPlantCard result={result} />
            ) : (
              <PredictionResultCard result={result} />
            )
          )}

          {!isAnalyzing && !result && (
            <div className="min-h-[320px] rounded-3xl border-2 border-dashed border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/30 flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                ফসল পরীক্ষার অপেক্ষায়...
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
                বামপাশের বক্স থেকে আক্রান্ত পাতার ছবি আপলোড করুন এবং <b>"Scan Crop / রোগ নির্ণয় করুন"</b> বাটনে চাপ দিন।
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Scan History Section */}
      {history.length > 0 && (
        <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-800 dark:text-stone-200">
            <History className="w-4 h-4 text-emerald-600" />
            <span>সাম্প্রতিক স্ক্যান হিস্ট্রি (Recent Scan History)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {history.slice(0, 6).map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setResult(item)}
                className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center gap-3 shadow-2xs group"
              >
                {item.imagePreview ? (
                  <img
                    src={item.imagePreview}
                    alt={item.diseaseName}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-100 dark:border-stone-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate group-hover:text-emerald-600 transition-colors">
                    {item.diseaseName}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                    {item.cropType || 'ফসল'} • {item.confidence}% Confidence
                  </p>
                  <p className="text-[9px] text-stone-400 mt-0.5">
                    {item.scannedAt ? new Date(item.scannedAt).toLocaleDateString('bn-BD') : 'সংরক্ষিত'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};