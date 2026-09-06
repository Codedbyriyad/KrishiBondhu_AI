import type { HistoryItem, FertilizerHistoryData } from '../types/history';
import type { DiseaseResult } from '../types/disease';

const HISTORY_STORAGE_KEY = 'krishibondhu_history_items';

export const INITIAL_DUMMY_HISTORY: HistoryItem[] = [
  {
    id: 'hist_d1',
    type: 'disease',
    title: 'ধানের পাতা ব্লাস্ট রোগ সনাক্তকরণ',
    cropName: 'ধান (Rice)',
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    timestamp: 'আজ, দুপুর ০২:৩০',
    statusBadge: {
      text: 'আক্রান্ত (High Risk)',
      variant: 'danger',
    },
    summary: 'ধানের পাতায় মাকু আকৃতির ধূসর ক্ষত দেখা গেছে। আত্মবিশ্বাসের হার: ৯৪.৮%।',
    details: {
      diseaseData: {
        id: 'scan_hist_d1',
        isHealthy: false,
        diseaseName: 'ধানের পাতা ব্লাস্ট রোগ (Rice Leaf Blast)',
        cropType: 'ধান (Rice)',
        confidence: 94.8,
        severity: 'High',
        description: 'পাতায় মাকু আকৃতির ধূসর কেন্দ্র ও বাদামী প্রান্তসহ ক্ষত দেখা যায়। আমন ও বোরো ধানের জন্য এটি অত্যন্ত ক্ষতিকর।',
        organicRemediation: [
          'সকালে নিম পাতার নির্যাস (৫ মিলি/লিটার) প্রয়োগ করুন।',
          'জৈব বালাইনাশক হিসেবে ট্রাইকোডার্মা হারজিয়ানাম ব্যবহার করুন।',
        ],
        chemicalRemediation: [
          'ট্রাইসাইক্লাজল ৭৫ ডাব্লিউপি (০.৬ গ্রাম/লিটার) স্প্রে করুন।',
          'অতিরিক্ত ইউরিয়া প্রয়োগ বন্ধ রাখুন।',
        ],
        preventiveTips: [
          'বিআরআরআই অনুমোদিত রোগ প্রতিরোধী বীজ রোপণ করুন।',
          'ক্ষেতে ২-৩ ইঞ্চি পানি জমিয়ে রাখুন।',
        ],
        scannedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    },
  },
  {
    id: 'hist_f1',
    type: 'fertilizer',
    title: '১০ শতক ধান ক্ষেতের সুষম সার প্রয়োগ',
    cropName: 'ধান (Rice)',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    timestamp: 'গতকাল, সকাল ১০:১৫',
    statusBadge: {
      text: 'হিসাব সম্পন্ন',
      variant: 'success',
    },
    summary: '১০ শতক দোআঁশ মাটির জন্য মোট ইউরিয়া ৮.৫ কেজি, টিএসপি ৪ কেজি, পটাশ ৩.৫ কেজি পরামর্শ দেওয়া হয়েছে।',
    details: {
      fertilizerData: {
        cropType: 'ধান',
        landArea: 10,
        landUnit: 'শতক',
        totalDecimals: 10,
        soilType: 'দোআঁশ',
        currentStage: 'জমি প্রস্তুত / রোপণ',
        fertilizers: [
          { id: 'urea', name: 'Urea', bengaliName: 'ইউরিয়া', quantityKg: 8.5, perDecimalKg: 0.85, role: 'নাইট্রোজেন সরবরাহ ও দ্রত বৃদ্ধি', applicationTime: '৩ কিস্তিতে উপরি প্রয়োগ', category: 'nitrogen' },
          { id: 'tsp', name: 'TSP', bengaliName: 'টিএসপি', quantityKg: 4.0, perDecimalKg: 0.40, role: 'শিকড় মজবুত ও ফলন বৃদ্ধি', applicationTime: 'শেষ চাষের সময়', category: 'phosphorus' },
          { id: 'mop', name: 'MOP', bengaliName: 'এমওপি (পটাশ)', quantityKg: 3.5, perDecimalKg: 0.35, role: 'রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি', applicationTime: 'জমি তৈরিতে ৫০% ও কাইচ থোড়ে ৫০%', category: 'potassium' },
          { id: 'gypsum', name: 'Gypsum', bengaliName: 'জিপসাম', quantityKg: 2.0, perDecimalKg: 0.20, role: 'সালফার সরবরাহ', applicationTime: 'জমি তৈরির সময়', category: 'sulfur' },
          { id: 'compost', name: 'Compost', bengaliName: 'জৈব সার', quantityKg: 50.0, perDecimalKg: 5.0, role: 'মাটির উর্বরতা রক্ষা', applicationTime: 'প্রথম চাষের সময়', category: 'organic' },
        ],
        applicationSchedule: [
          { stage: 'জমি তৈরি (Basal Dose)', time: 'রোপণের পূর্বে', details: 'সকল জৈব সার, টিএসপি, জিপসাম এবং ৫০% পটাশ সার মাটিতে মেশান।' },
          { stage: '১ম উপরি প্রয়োগ', time: 'রোপণের ১৫-২০ দিন পর', details: '১/৩ অংশ ইউরিয়া উপরি প্রয়োগ করুন।' },
          { stage: '২য় উপরি প্রয়োগ', time: 'রোপণের ৩৫-৪০ দিন পর', details: 'অবশিষ্ট ১/৩ ইউরিয়া এবং ৫০% পটাশ সার প্রয়োগ করুন।' },
        ],
        soilHealthAdvice: 'দোআঁশ মাটির জন্য উর্বরতা বৃদ্ধির লক্ষ্যে পর্যাপ্ত জৈব সার ব্যবহার অপরিহার্য।',
        safetyWarnings: [
          'শিশিরভেজা গাছে ইউরিয়া সার প্রয়োগ করবেন না।',
          'সার প্রয়োগের পর হালকা সেচ দেওয়া উত্তম।',
        ],
        estimatedCostBdt: 748,
      },
    },
  },
  {
    id: 'hist_c1',
    type: 'chat',
    title: 'আলুর মাকড়সা পোকা দমন সম্পর্কিত জিজ্ঞাসা',
    cropName: 'আলু (Potato)',
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    timestamp: '২ দিন আগে',
    statusBadge: {
      text: 'পরামর্শ প্রদানকৃত',
      variant: 'info',
    },
    summary: 'প্রশ্ন: আলুর পাতায় লাল মাকড় আক্রমণ করলে করণীয় কি? উত্তর: অ্যাবামেকটিন গ্রুপের মাকড়নাশক স্প্রে করুন।',
    details: {
      chatData: {
        userMessage: 'আলুর পাতায় লাল মাকড় আক্রমণ করলে করণীয় কি?',
        aiReply: 'আলুর গাছে লাল মাকড়সায় আক্রান্ত হলে পাতা লালচে বাদামী হয়ে কোঁকড়ে যায়।\n\n**প্রতিকার:**\n১. অ্যাবামেকটিন (Abamectin 1.8 EC) প্রতি লিটার পানিতে ১.২ মিলি মিশিয়ে পাতার উল্টো পিঠে স্প্রে করুন।\n২. তাপমাত্রা বেশি থাকলে বা শুষ্ক আবহাওয়ায় স্প্রে দ্রুত কাজ করে।\n৩. জৈব উপায়ে সালফার ভিত্তিক বালাইনাশক ব্যবহার করতে পারেন।',
      },
    },
  },
];

export const HistoryService = {
  getHistoryItems: (): HistoryItem[] => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse history items from localStorage:', e);
    }

    // Seed default initial dummy history
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(INITIAL_DUMMY_HISTORY));
    } catch (e) {
      console.warn('Failed to seed history to localStorage:', e);
    }
    return INITIAL_DUMMY_HISTORY;
  },

  addDiseaseHistory: (result: DiseaseResult): HistoryItem => {
    const existing = HistoryService.getHistoryItems();
    const isHealthy = result.isHealthy;

    const newItem: HistoryItem = {
      id: `hist_d_${Date.now()}`,
      type: 'disease',
      title: `${result.cropType || 'ফসল'} - ${result.diseaseName}`,
      cropName: result.cropType || 'ফসল',
      date: result.scannedAt || new Date().toISOString(),
      timestamp: 'এখনই',
      statusBadge: {
        text: isHealthy ? 'সুস্থ ফসল' : `${result.severity || 'Medium'} Risk`,
        variant: isHealthy ? 'success' : result.severity === 'High' ? 'danger' : 'warning',
      },
      summary: result.description || 'রোগ নির্ণয় ফলাফল সম্পন্ন হয়েছে।',
      details: {
        diseaseData: result,
      },
    };

    const updated = [newItem, ...existing.filter((i) => i.id !== newItem.id)].slice(0, 50);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save history item:', e);
    }
    return newItem;
  },

  addFertilizerHistory: (data: FertilizerHistoryData): HistoryItem => {
    const existing = HistoryService.getHistoryItems();

    const newItem: HistoryItem = {
      id: `hist_f_${Date.now()}`,
      type: 'fertilizer',
      title: `${data.landArea} ${data.landUnit} ${data.cropType} সারের হিসাব`,
      cropName: data.cropType,
      date: new Date().toISOString(),
      timestamp: 'এখনই',
      statusBadge: {
        text: 'হিসাব সম্পন্ন',
        variant: 'success',
      },
      summary: `${data.totalDecimals} শতক ${data.soilType} মাটির জন্য মোট আনুমানিক খরচ ৳${data.estimatedCostBdt} টাকা।`,
      details: {
        fertilizerData: data,
      },
    };

    const updated = [newItem, ...existing.filter((i) => i.id !== newItem.id)].slice(0, 50);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save fertilizer history:', e);
    }
    return newItem;
  },

  addChatHistory: (userMessage: string, aiReply: string, cropName = 'সাধারণ কৃষি'): HistoryItem => {
    const existing = HistoryService.getHistoryItems();

    const newItem: HistoryItem = {
      id: `hist_c_${Date.now()}`,
      type: 'chat',
      title: userMessage.length > 30 ? `${userMessage.slice(0, 30)}...` : userMessage,
      cropName,
      date: new Date().toISOString(),
      timestamp: 'এখনই',
      statusBadge: {
        text: 'পরামর্শ সম্পন্ন',
        variant: 'info',
      },
      summary: `প্রশ্ন: ${userMessage} | উত্তর: ${aiReply.slice(0, 80)}...`,
      details: {
        chatData: {
          userMessage,
          aiReply,
        },
      },
    };

    const updated = [newItem, ...existing.filter((i) => i.id !== newItem.id)].slice(0, 50);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
    return newItem;
  },

  deleteHistoryItem: (id: string): HistoryItem[] => {
    const existing = HistoryService.getHistoryItems();
    const updated = existing.filter((item) => item.id !== id);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete history item:', e);
    }
    return updated;
  },

  clearAllHistory: (): HistoryItem[] => {
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear history:', e);
    }
    return [];
  },
};
