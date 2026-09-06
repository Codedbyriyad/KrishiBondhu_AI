import React, { useState, useEffect, useCallback } from 'react';
import {
  Calculator,
  FlaskConical,
  Sprout,
  Calendar,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Banknote,
  Layers,
  Droplets,
  HelpCircle,
} from 'lucide-react';
import { AgricultureService } from '../../services/api';
import { HistoryService } from '../../services/historyService';

interface FertilizerItem {
  id: string;
  name: string;
  bengaliName: string;
  quantityKg: number;
  perDecimalKg: number;
  role: string;
  applicationTime: string;
  category: string;
  priority?: string;
}

interface ApplicationScheduleItem {
  stage: string;
  time: string;
  details: string;
}

interface FertilizerResult {
  cropType: string;
  landArea: number;
  landUnit: string;
  totalDecimals: number;
  soilType: string;
  currentStage: string;
  fertilizers: FertilizerItem[];
  applicationSchedule: ApplicationScheduleItem[];
  soilHealthAdvice: string;
  safetyWarnings: string[];
  estimatedCostBdt: number;
}

const CROPS = [
  { id: 'ধান', nameBn: 'ধান (Paddy / Rice)', icon: '🌾' },
  { id: 'আলু', nameBn: 'আলু (Potato)', icon: '🥔' },
  { id: 'ভুট্টা', nameBn: 'ভুট্টা (Maize)', icon: '🌽' },
  { id: 'গম', nameBn: 'গম (Wheat)', icon: '🌾' },
  { id: 'টমেটো', nameBn: 'টমেটো ও শাকসবজি (Tomato & Vegetables)', icon: '🍅' },
  { id: 'সরিষা', nameBn: 'সরিষা (Mustard)', icon: '🌼' },
  { id: 'পাট', nameBn: 'পাট (Jute)', icon: '🌱' },
];

const LAND_UNITS = [
  { id: 'শতক', nameBn: 'শতক / ডেসিমল (Decimal)', factor: 1 },
  { id: 'বিঘা', nameBn: 'বিঘা (Bigha - ৩৩ শতক)', factor: 33 },
  { id: 'একর', nameBn: 'একর (Acre - ১০০ শতক)', factor: 100 },
];

const SOIL_TYPES = [
  { id: 'দোআঁশ', nameBn: 'দোআঁশ মাটি (Loamy Soil - আদর্শ)', desc: 'পানি ও পুষ্টি ধরে রাখার সুষম ক্ষমতা' },
  { id: 'বেলে', nameBn: 'বেলে মাটি (Sandy Soil)', desc: 'পানি দ্রুত নিষ্কাশিত হয়, বারবার হালকা উপরি প্রয়োগ প্রয়োজন' },
  { id: 'এটেল', nameBn: 'এটেল মাটি (Clay Soil)', desc: 'ভারী মাটি, জৈব সার ও গভীর চাষ প্রয়োজন' },
  { id: 'পলি', nameBn: 'পলি মাটি (Silt Soil)', desc: 'নদীতীরবর্তী পলি, নাইট্রোজেন ও পটাশ সহনশীল' },
];

const STAGES = [
  { id: 'জমি প্রস্তুত / রোপণ', nameBn: '১. জমি প্রস্তুত ও চারা রোপণ পর্যায়' },
  { id: 'বৃদ্ধি পর্যায়', nameBn: '২. কাইচ থোড় ও অঙ্গজ বৃদ্ধি পর্যায়' },
  { id: 'ফুল/ফল আসা', nameBn: '৩. ফুল ও ফল ধারণ পর্যায়' },
];

export const FertilizerRecommendation: React.FC = () => {
  const [cropType, setCropType] = useState('ধান');
  const [landArea, setLandArea] = useState<number | string>(10);
  const [landUnit, setLandUnit] = useState('শতক');
  const [soilType, setSoilType] = useState('দোআঁশ');
  const [currentStage, setCurrentStage] = useState('জমি প্রস্তুত / রোপণ');

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<FertilizerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    const numericArea = Math.max(0.1, Number(landArea) || 1);

    try {
      const response = await AgricultureService.calculateFertilizer({
        cropType,
        landArea: numericArea,
        landUnit,
        soilType,
        currentStage,
      });

      if (response) {
        setResult(response);
        try {
          HistoryService.addFertilizerHistory({
            cropType: response.cropType || cropType,
            landArea: response.landArea || numericArea,
            landUnit: response.landUnit || landUnit,
            totalDecimals: response.totalDecimals || numericArea,
            soilType: response.soilType || soilType,
            currentStage: response.currentStage || currentStage,
            fertilizers: response.fertilizers || [],
            applicationSchedule: response.applicationSchedule || [],
            soilHealthAdvice: response.soilHealthAdvice || '',
            safetyWarnings: response.safetyWarnings || [],
            estimatedCostBdt: response.estimatedCostBdt || 0,
          });
        } catch (e) {
          console.warn('Failed to save fertilizer history:', e);
        }
      } else {
        throw new Error('অনুরোধ প্রক্রিয়াকরণে সমস্যা হয়েছে');
      }
    } catch (err: any) {
      console.error('Fertilizer calculation error:', err);
      setError('সার হিসাব পেতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }, [cropType, landArea, landUnit, soilType, currentStage]);

  // Auto-calculate default on mount
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-deps
  }, []);

  const handleCopySummary = () => {
    if (!result) return;
    const summaryText = `🧪 কৃষিবন্ধু ডট এআই - সুষম সার সুপারিশ
🌾 ফসল: ${result.cropType} | জমি: ${result.landArea} ${result.landUnit} (${result.totalDecimals} শতক)
🏞️ মাটির ধরণ: ${result.soilType}
------------------------------------
সুনির্দিষ্ট সারের পরিমাণ:
${result.fertilizers.map((f) => `• ${f.bengaliName}: ${f.quantityKg} কেজি (${f.applicationTime})`).join('\n')}
------------------------------------
💰 আনুমানিক সার খরচ: ৳${result.estimatedCostBdt} টাকা
💡 পরামর্শ: ${result.soilHealthAdvice}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper for category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nitrogen':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'phosphorus':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'potassium':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'sulfur':
        return 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'micronutrient':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 text-white p-6 md:p-8 shadow-xl">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <FlaskConical className="w-3.5 h-3.5" /> BARC ও মৃত্তিকা সম্পদ ইনস্টিটিউট অনুসৃত
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            🧪 সুষম সার ও মাটি স্বাস্থ্য ক্যালকুলেটর
          </h1>
          <p className="text-xs md:text-sm text-stone-200 leading-relaxed">
            আপনার ফসলের জাত, জমির পরিমাণ ও মাটির ধরণ অনুযায়ী সঠিক সারের পরিমাণ এবং উপরি প্রয়োগ সময়সূচী নির্ণয় করুন।
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
          <Sprout className="w-64 h-64 text-emerald-300" />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Input Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h2 className="text-sm font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" /> পরিমাপ ইনপুট করুন
              </h2>
              <span className="text-[11px] text-stone-400">স্টেপ ১ / ২</span>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Crop Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                  <span>১. ফসলের নাম (Select Crop)</span>
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full text-xs font-medium p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Land Size & Unit */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7 space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    ২. জমির পরিমাণ
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    placeholder="যেমন: ১০"
                    className="w-full text-xs font-bold p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="col-span-5 space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    একক (Unit)
                  </label>
                  <select
                    value={landUnit}
                    onChange={(e) => setLandUnit(e.target.value)}
                    className="w-full text-xs font-medium p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {LAND_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nameBn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Soil Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  ৩. মাটির ধরণ (Soil Type)
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full text-xs font-medium p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {SOIL_TYPES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nameBn}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-stone-400 pl-1">
                  {SOIL_TYPES.find((s) => s.id === soilType)?.desc}
                </p>
              </div>

              {/* Growth Stage */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  ৪. বর্তমান পর্যায় (Crop Stage)
                </label>
                <select
                  value={currentStage}
                  onChange={(e) => setCurrentStage(e.target.value)}
                  className="w-full text-xs font-medium p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {STAGES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> সার হিসাব ও এআই বিশ্লেষণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" /> সুষম সারের ডোজ গণনা করুন
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Useful Tip Box */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-300">
              <HelpCircle className="w-4 h-4 text-amber-600" /> আপনার জানা থাকা ভালো
            </div>
            <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300">
              ১ একর = ১০০ শতক, ১ বিঘা = ৩৩ শতক। ইউরিয়া সার কখনোই একবারে প্রয়োগ না করে ২-৩ কিস্তিতে উপরি প্রয়োগ করলে ৮০% পর্যন্ত অপচয় রোধ করা সম্ভব।
            </p>
          </div>
        </div>

        {/* Output Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading && !result && (
            <div className="p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-4">
              <div className="inline-block p-4 rounded-full bg-emerald-500/10 text-emerald-600 animate-pulse">
                <FlaskConical className="w-10 h-10" />
              </div>
              <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                কৃষিবন্ধু এআই হিসাব করছে...
              </h3>
              <p className="text-xs text-stone-400">
                BARC ফর্মুলা এবং মাটির ধরণ অনুযায়ী সারের সঠিক অনুপাত নির্ধারণ করা হচ্ছে।
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Results Overview Bar */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400">
                      সুপারিশকৃত সারের মাত্রা
                    </span>
                    <h2 className="text-lg font-black text-stone-900 dark:text-stone-100">
                      {result.cropType} ({result.landArea} {result.landUnit} / {result.totalDecimals} শতক)
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySummary}
                      className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" /> কপি হয়েছে
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> কপি করুন
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                    <span className="text-[10px] text-stone-400">মোট পরিমাপ</span>
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-0.5">
                      {result.totalDecimals} শতক (Decimal)
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                    <span className="text-[10px] text-stone-400">মাটির ধরণ</span>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {result.soilType}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
                      আনুমানিক খরচ
                    </span>
                    <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                      <Banknote className="w-4 h-4" /> ৳{result.estimatedCostBdt} টাকা
                    </p>
                  </div>
                </div>
              </div>

              {/* Fertilizer Quantities Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" /> সারের পরিমাণ ও প্রয়োগের ভূমিকা
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {result.fertilizers.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2 hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md border ${getCategoryColor(
                              item.category
                            )}`}
                          >
                            {item.name}
                          </span>
                          <h4 className="text-sm font-black text-stone-900 dark:text-stone-100 mt-1">
                            {item.bengaliName}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                            {item.quantityKg}
                          </span>
                          <span className="text-xs text-stone-500 font-bold ml-1">কেজি</span>
                          <p className="text-[10px] text-stone-400">({item.perDecimalKg} কেজি/শতক)</p>
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                        {item.role}
                      </p>

                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" /> সময়:
                        </span>
                        <span className="font-semibold text-stone-700 dark:text-stone-300">
                          {item.applicationTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Schedule Timeline */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> প্রয়োগ সময়সূচী ও কিস্তি (Split Dosing)
                </h3>

                <div className="relative border-l-2 border-emerald-500/30 ml-3 pl-5 space-y-5">
                  {result.applicationSchedule.map((sched, idx) => (
                    <div key={idx} className="relative space-y-1">
                      <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {sched.stage}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          {sched.time}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                        {sched.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soil Health Advice & Safety Warnings */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Droplets className="w-4 h-4 text-emerald-600" /> মাটির স্বাস্থ্য ও প্রয়োগ পরামর্শ
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {result.soilHealthAdvice}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-600" /> সারের নিরাপত্তা সতর্কতা
                  </div>
                  <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                    {result.safetyWarnings.map((warning, wIdx) => (
                      <li key={wIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};