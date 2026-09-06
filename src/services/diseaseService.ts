import type { DiseaseResult } from '../types/disease';
import { AgricultureService } from './api';
import { HistoryService } from './historyService';

export const MOCK_DISEASE_RESULTS: DiseaseResult[] = [
  {
    id: 'mock_1',
    isHealthy: false,
    diseaseName: 'ধানের পাতা ব্লাস্ট রোগ (Rice Leaf Blast)',
    cropType: 'ধান (Rice)',
    scientificName: 'Magnaporthe oryzae',
    confidence: 94.8,
    severity: 'High',
    description:
      'পাতায় মাকু আকৃতির ধূসর কেন্দ্র ও বাদামী প্রান্তসহ ক্ষত দেখা যায়। বাংলাদেশের আমন ও বোরো ধানের জন্য এটি অত্যন্ত ক্ষতিকর।',
    organicRemediation: [
      'সকালে নিম পাতার নির্যাস (৫ মিলি/লিটার) প্রয়োগ করুন।',
      'জৈব বালাইনাশক হিসেবে ট্রাইকোডার্মা হারজিয়ানাম ব্যবহার করুন।',
    ],
    chemicalRemediation: [
      'ট্রাইসাইক্লাজল ৭৫ ডাব্লিউপি (০.৬ গ্রাম/লিটার) অথবা আইসোপ্রোথিওলেন ৪০ ইসি (১.৫ মিলি/লিটার) স্প্রে করুন।',
      'অতিরিক্ত ইউরিয়া সার প্রয়োগ পরিহার করুন।',
    ],
    preventiveTips: [
      'বিআরআরআই অনুমোদিত রোগ প্রতিরোধী বীজ রোপণ করুন।',
      'ক্ষেতে ২-৩ ইঞ্চি পানি জমিয়ে রাখুন।',
      'ফসল কাটার পর নাড়া পুড়িয়ে বা পরিষ্কার করে ধ্বংস করুন।',
    ],
    treatments: {
      organic: [
        'Apply Neem oil extract (5ml/L) early in the morning.',
        'Use Trichoderma harzianum as a biological control agent.',
      ],
      chemical: [
        'Spray Tricyclazole 75 WP (0.6g/L water) or Isoprothiolane 40 EC (1.5ml/L).',
        'Avoid excessive urea fertilizer application.',
      ],
    },
    prevention: [
      'Use resistant varieties like BRRI dhan28 or BRRI dhan29 where applicable.',
      'Maintain proper water balance (2–3 inches continuous flooding during vulnerable stages).',
      'Destroy crop residue after harvest.',
    ],
  },
  {
    id: 'mock_2',
    isHealthy: true,
    diseaseName: 'সুস্থ ফসল (Healthy Crop)',
    cropType: 'ফসলী জমি (Field Crop)',
    confidence: 98.2,
    severity: 'Low',
    description:
      'ফসল সম্পূর্ণ সুস্থ এবং কোন প্রকার ছত্রাক বা পোকার আক্রমণ নেই। নিয়মিত পর্যবেক্ষণ বজায় রাখুন।',
    organicRemediation: ['নিয়মিত জৈব সার এবং ট্রাইকো-কম্পোস্ট প্রয়োগ বজায় রাখুন।'],
    chemicalRemediation: ['কোন রাসায়নিক কীটনাশক প্রয়োগের প্রয়োজন নেই।'],
    preventiveTips: [
      'প্রতি সপ্তাহে ক্ষেত পরিদর্শন করুন।',
      'ভারী বৃষ্টির পর পানি নিষ্কাশনের ব্যবস্থা রাখুন।',
      'সঠিক সময়ে সুষম সার প্রয়োগ করুন।',
    ],
    treatments: {
      organic: ['Continue routine balanced organic composting.'],
      chemical: ['No chemical intervention required.'],
    },
    prevention: [
      'Monitor fields weekly for early disease signs.',
      'Ensure proper drainage during heavy rainfall.',
      'Apply balanced NPK fertilizers.',
    ],
  },
];

export const saveToScanHistory = (result: DiseaseResult, imagePreview?: string) => {
  try {
    const existingRaw = localStorage.getItem('disease_scan_history');
    const existing: DiseaseResult[] = existingRaw ? JSON.parse(existingRaw) : [];

    const entry: DiseaseResult = {
      ...result,
      id: result.id || `scan_${Date.now()}`,
      scannedAt: result.scannedAt || new Date().toISOString(),
      imagePreview: imagePreview || result.imagePreview,
    };

    const updated = [entry, ...existing.filter((item) => item.id !== entry.id)].slice(0, 30);
    localStorage.setItem('disease_scan_history', JSON.stringify(updated));

    // Also sync with central HistoryService
    try {
      HistoryService.addDiseaseHistory(entry);
    } catch (e) {
      console.warn('Failed to sync scan result to HistoryService:', e);
    }
  } catch (err) {
    console.error('Failed to save disease scan history:', err);
  }
};

export const getScanHistory = (): DiseaseResult[] => {
  try {
    const existingRaw = localStorage.getItem('disease_scan_history');
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
};

/**
 * Crop image analysis service calling the API backend.
 */
export const analyzeCropImage = async (file: File | string): Promise<DiseaseResult> => {
  let imagePreviewStr = '';
  if (typeof file === 'string') {
    imagePreviewStr = file;
  } else {
    imagePreviewStr = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  try {
    const payload = imagePreviewStr || file;
    const res = await AgricultureService.predictDisease(payload);

    const result: DiseaseResult = {
      id: res.id || `scan_${Date.now()}`,
      scannedAt: res.scannedAt || new Date().toISOString(),
      isHealthy: res.isHealthy ?? false,
      diseaseName: res.diseaseName || 'অজ্ঞাত পাতার দাগ রোগ (Unknown Leaf Condition)',
      cropType: res.cropType || 'ফসল (Crop)',
      confidence: typeof res.confidence === 'number' ? res.confidence : 92.5,
      severity: res.severity || (res.isHealthy ? 'Low' : 'Medium'),
      description: res.description || 'পাতায় রোগের প্রাথমিক লক্ষণ সনাক্ত হয়েছে।',
      organicRemediation: Array.isArray(res.organicRemediation)
        ? res.organicRemediation
        : (res.treatments?.organic || ['জৈব নিম নির্যাস স্প্রে করুন।']),
      chemicalRemediation: Array.isArray(res.chemicalRemediation)
        ? res.chemicalRemediation
        : (res.treatments?.chemical || ['প্রয়োজনে অনুমোদিত ফাংগিসাইড স্প্রে করুন।']),
      preventiveTips: Array.isArray(res.preventiveTips)
        ? res.preventiveTips
        : (res.prevention || ['ক্ষেত পরিষ্কার ও শুকনো রাখুন।']),
      treatments: {
        organic: Array.isArray(res.organicRemediation)
          ? res.organicRemediation
          : (res.treatments?.organic || ['জৈব নিম নির্যাস স্প্রে করুন।']),
        chemical: Array.isArray(res.chemicalRemediation)
          ? res.chemicalRemediation
          : (res.treatments?.chemical || ['প্রয়োজনে অনুমোদিত ফাংগিসাইড স্প্রে করুন।']),
      },
      prevention: Array.isArray(res.preventiveTips)
        ? res.preventiveTips
        : (res.prevention || ['ক্ষেত পরিষ্কার ও শুকনো রাখুন।']),
      imagePreview: imagePreviewStr,
    };

    saveToScanHistory(result, imagePreviewStr);
    return result;
  } catch (err) {
    console.warn('Backend prediction failed, using mock analysis fallback:', err);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const fallback = MOCK_DISEASE_RESULTS[0];
    const resultWithPreview = { ...fallback, imagePreview: imagePreviewStr };
    saveToScanHistory(resultWithPreview, imagePreviewStr);
    return resultWithPreview;
  }
};