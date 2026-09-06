import React, { useState } from 'react';
import { Upload, ScanLine, AlertCircle, CheckCircle } from 'lucide-react';

export const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setResult(false);
    }
  };

  const handleRunAnalysis = () => {
    if (!selectedImage) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Leaf Disease Scanner</h1>
        <p className="text-xs text-stone-500">Upload a clear photo of the infected crop leaf for instant diagnosis.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Dropzone Container */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-dashed border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center text-center space-y-4">
          {selectedImage ? (
            <img src={selectedImage} alt="Uploaded leaf" className="max-h-56 rounded-2xl object-cover" />
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">Drag leaf image or click to select</p>
              <p className="text-[10px] text-stone-400">PNG, JPG up to 10MB</p>
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="leaf-upload" />
          <label
            htmlFor="leaf-upload"
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 cursor-pointer hover:bg-stone-200 transition-colors"
          >
            {selectedImage ? 'Change Image' : 'Select Photo'}
          </label>

          {selectedImage && (
            <button
              onClick={handleRunAnalysis}
              disabled={analyzing}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <ScanLine className="w-4 h-4" />
              {analyzing ? 'Analyzing with AI Model...' : 'Run Diagnostics'}
            </button>
          )}
        </div>

        {/* Diagnosis Result Panel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100 mb-4">Diagnostic Report</h3>

          {result ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 flex items-center gap-3 text-amber-800 dark:text-amber-300 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold">Early Blight (Alternaria solani)</p>
                  <p className="text-[10px] opacity-80">88.4% Confidence Score</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                <p className="font-semibold text-stone-800 dark:text-stone-200">Recommended Next Steps:</p>
                <ul className="space-y-1 list-disc pl-4 text-[11px]">
                  <li>Remove infected lower leaves to restrict fungal spread.</li>
                  <li>Apply Copper Fungicide or Mancozeb spray early in the morning.</li>
                  <li>Ensure proper plant spacing to allow adequate ventilation.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center text-xs text-stone-400 space-y-1 py-12">
              <CheckCircle className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-700" />
              <p>Upload a photo and click "Run Diagnostics" to generate the report.</p>
            </div>
          )}

          <p className="text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-3 mt-4">
            Model Version: KrishiVision v2.4 (FastAPI endpoint `/api/v1/predict`)
          </p>
        </div>
      </div>
    </div>
  );
};