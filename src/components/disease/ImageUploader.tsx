import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedPreview: string | null;
  onClear: () => void;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  selectedPreview,
  onClear,
  isAnalyzing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview Mode */}
      {selectedPreview ? (
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 group">
          <img
            src={selectedPreview}
            alt="Selected Crop Leaf"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            {!isAnalyzing && (
              <button
                onClick={onClear}
                className="p-2.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-lg"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={onClear}
            disabled={isAnalyzing}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Upload Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 bg-stone-50/50 dark:bg-stone-900/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-100">
            Upload leaf photo for diagnosis
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-6">
            Drag and drop JPEG/PNG file here or browse from device
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex items-center gap-2 shadow-xs"
            >
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              Browse Gallery
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};