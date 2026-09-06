import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ScanLine,
  CloudSun,
  Sprout,
  Bot,
  ArrowUpRight,
  RefreshCw,
  Droplets,
  Wind,
  CloudRain,
  Sparkles,
  Calendar,
  ChevronRight,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import { CURRENT_USER } from '../../data/dashboardDummyData';
import { fetchDistrictWeather, BANGLADESH_DISTRICTS } from '../../services/weatherService';
import type { WeatherResponseData } from '../../services/weatherService';
import { HistoryService } from '../../services/historyService';
import type { HistoryItem } from '../../types/history';
import { HistoryDetailModal } from '../../components/history/HistoryDetailModal';

export const DashboardHome: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Rajshahi');
  const [weatherData, setWeatherData] = useState<WeatherResponseData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(true);

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);

  // Fetch live weather data from Open-Meteo / backend route
  const loadWeather = async (district: string) => {
    setIsWeatherLoading(true);
    try {
      const data = await fetchDistrictWeather(district);
      setWeatherData(data);
    } catch (err) {
      console.error('Dashboard weather load error:', err);
    } finally {
      setIsWeatherLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
    setHistoryItems(HistoryService.getHistoryItems());
  }, [selectedDistrict]);

  const handleDeleteHistoryItem = (id: string) => {
    const updated = HistoryService.deleteHistoryItem(id);
    setHistoryItems(updated);
    if (selectedHistoryItem?.id === id) {
      setSelectedHistoryItem(null);
    }
  };

  // Calculate dynamic stats
  const diseaseScansCount = historyItems.filter((i) => i.type === 'disease').length;
  const fertilizerCalcCount = historyItems.filter((i) => i.type === 'fertilizer').length;
  const chatQueryCount = historyItems.filter((i) => i.type === 'chat').length;

  // Generate dynamic farm alert based on weather
  const getFarmAlert = () => {
    if (!weatherData) return 'আবহাওয়া তথ্য লোড হচ্ছে...';
    const rain = weatherData.currentWeather.rainChance;
    const temp = weatherData.currentWeather.temperature;

    if (rain >= 50) {
      return `🌧️ বৃষ্টিপাতের সম্ভাবনা ${rain}% — ক্ষেতে তরল সার বা কীটনাশক স্প্রে স্থগিত রাখুন এবং পানি নিষ্কাশন ব্যবস্থা সচল রাখুন।`;
    }
    if (temp >= 35) {
      return `☀️ তীব্র তাপদাহ (${temp}°C) — ধানের জমিতে পর্যাপ্ত সেচ দিন ও মাটির আর্দ্রতা ধরে রাখতে জৈব সার দিন।`;
    }
    return `🌾 অনুকূল আবহাওয়া — নিয়মিত জমি পরিদর্শন করুন এবং প্রয়োজন অনুযায়ী সুষম সার প্রয়োগ করুন।`;
  };

  const getStatusBadgeClass = (variant: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'success':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200 dark:border-sky-800';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Hero Welcome & Overview Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white shadow-xl relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-1/3 -top-10 w-40 h-40 rounded-full bg-green-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-600/50 flex items-center gap-1.5 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>কৃষিবন্ধু এআই ড্যাশবোর্ড (Live Farm Overview)</span>
            </span>

            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{selectedDistrict}, বাংলাদেশ</span>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              স্বাগতম, {CURRENT_USER.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
              আপনার খামারের হালনাগাদ তথ্য, ফসল সুরক্ষা, আবহাওয়া পূর্বাভাস এবং রিয়েল-টাইম এআই কৃষি সহায়তা।
            </p>
          </div>

          {/* Dynamic Weather Farm Alert Bar */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 text-xs sm:text-sm font-medium text-emerald-100 flex items-center gap-2.5 backdrop-blur-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="leading-snug">{getFarmAlert()}</span>
          </div>

          {/* Quick Dynamic Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-emerald-200 block">রোগ স্ক্যান সম্পন্ন</span>
              <span className="text-lg font-black text-white">{diseaseScansCount} টি</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-emerald-200 block">সারের হিসাব সম্পন্ন</span>
              <span className="text-lg font-black text-white">{fertilizerCalcCount} টি</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-emerald-200 block">এআই পরামর্শ সম্পন্ন</span>
              <span className="text-lg font-black text-white">{chatQueryCount} টি</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-emerald-200 block">প্রধান ফসল</span>
              <span className="text-xs font-bold text-white truncate block mt-1">{CURRENT_USER.primaryCrops.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'রোগ নির্ণয় করুন',
            sub: 'Scan Leaf & Protect Crop',
            path: '/dashboard/disease',
            icon: ScanLine,
            color: 'bg-emerald-600 dark:bg-emerald-500',
            borderColor: 'border-emerald-200 dark:border-emerald-800',
          },
          {
            label: 'কৃষিবন্ধু এআই চ্যাট',
            sub: 'Ask Farming Questions',
            path: '/dashboard/chat',
            icon: Bot,
            color: 'bg-teal-600 dark:bg-teal-500',
            borderColor: 'border-teal-200 dark:border-teal-800',
          },
          {
            label: 'সার ক্যালকুলেটর',
            sub: 'NPK Fertilizer Guide',
            path: '/dashboard/fertilizer',
            icon: Sprout,
            color: 'bg-amber-600 dark:bg-amber-500',
            borderColor: 'border-amber-200 dark:border-amber-800',
          },
          {
            label: 'কৃষি আবহাওয়া',
            sub: 'Live Weather & Alert',
            path: '/dashboard/weather',
            icon: CloudSun,
            color: 'bg-sky-600 dark:bg-sky-500',
            borderColor: 'border-sky-200 dark:border-sky-800',
          },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`p-4 rounded-3xl bg-white dark:bg-stone-900 border ${item.borderColor} hover:shadow-lg transition-all group flex flex-col justify-between active:scale-[0.98]`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                {item.label}
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">
                {item.sub}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid: Weather Context + Recent Activity */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Live Weather Context Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">
                লাইভ আবহাওয়া (Live Weather)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* District Dropdown Selector */}
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1 text-stone-800 dark:text-stone-200 font-semibold focus:outline-hidden"
              >
                {BANGLADESH_DISTRICTS.map((d) => (
                  <option key={d.nameEn} value={d.nameEn}>
                    {d.nameBn}
                  </option>
                ))}
              </select>

              <button
                onClick={() => loadWeather(selectedDistrict)}
                disabled={isWeatherLoading}
                title="রিফ্রেশ করুন"
                className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isWeatherLoading ? 'animate-spin text-emerald-600' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Weather Content */}
          {isWeatherLoading ? (
            <div className="py-8 space-y-3 animate-pulse text-center">
              <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded-xl w-1/3 mx-auto" />
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-xl w-1/2 mx-auto" />
              <p className="text-xs text-stone-400 pt-2">আবহাওয়া ডাটা আপডেট হচ্ছে...</p>
            </div>
          ) : weatherData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-stone-900 dark:text-stone-100">
                      {weatherData.currentWeather.temperature}°C
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      (অনুভূত {weatherData.currentWeather.feelsLike}°C)
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                    {weatherData.currentWeather.condition}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    সর্বোচ্চ {weatherData.currentWeather.highTemp}°C / সর্বনিম্ন {weatherData.currentWeather.lowTemp}°C
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                  <CloudSun className="w-10 h-10" />
                </div>
              </div>

              {/* Weather Metrics Sub-Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs">
                <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50">
                  <span className="text-stone-400 text-[10px] flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3 text-sky-500" />
                    আর্দ্রতা
                  </span>
                  <p className="font-bold text-stone-800 dark:text-stone-200 mt-0.5">
                    {weatherData.currentWeather.humidity}%
                  </p>
                </div>

                <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50">
                  <span className="text-stone-400 text-[10px] flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3 text-teal-500" />
                    বাতাস
                  </span>
                  <p className="font-bold text-stone-800 dark:text-stone-200 mt-0.5">
                    {weatherData.currentWeather.windSpeed} km/h
                  </p>
                </div>

                <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50">
                  <span className="text-stone-400 text-[10px] flex items-center justify-center gap-1">
                    <CloudRain className="w-3 h-3 text-indigo-500" />
                    বৃষ্টির সম্ভাবনা
                  </span>
                  <p className="font-bold text-stone-800 dark:text-stone-200 mt-0.5">
                    {weatherData.currentWeather.rainChance}%
                  </p>
                </div>
              </div>

              {/* View Full Weather Page Link */}
              <Link
                to="/dashboard/weather"
                className="w-full py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>সম্পূর্ণ আবহাওয়া ও পূর্বাভাস দেখুন</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <p className="text-xs text-stone-500 text-center py-4">
              আবহাওয়া ডাটা পাওয়া যায়নি।
            </p>
          )}
        </div>

        {/* Recent History / AI Analyses Widget */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">
                সাম্প্রতিক এআই স্ক্যান ও বিশ্লেষণ (Recent Analyses)
              </h3>
            </div>

            <Link
              to="/dashboard/history"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
            >
              <span>সকল রেকর্ড ({historyItems.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {historyItems.length > 0 ? (
              historyItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedHistoryItem(item)}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 flex items-start justify-between text-xs cursor-pointer hover:border-emerald-500/50 transition-all hover:shadow-xs group"
                >
                  <div className="space-y-1.5 flex-1 pr-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${getStatusBadgeClass(
                          item.statusBadge.variant
                        )}`}
                      >
                        {item.statusBadge.text}
                      </span>
                    </div>

                    <p className="text-stone-600 dark:text-stone-400 text-[11px] line-clamp-1 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.cropName}
                      </span>
                    </div>
                  </div>

                  <div className="self-center p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-400 group-hover:text-emerald-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-stone-500 space-y-2">
                <p>এখনো কোনো স্ক্যান বা হিসাবের হিস্ট্রি সংরক্ষিত নেই।</p>
                <Link
                  to="/dashboard/disease"
                  className="inline-block px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  প্রথম রোগ স্ক্যান করুন
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Detail Modal */}
      <HistoryDetailModal
        item={selectedHistoryItem}
        onClose={() => setSelectedHistoryItem(null)}
        onDelete={handleDeleteHistoryItem}
      />
    </div>
  );
};
