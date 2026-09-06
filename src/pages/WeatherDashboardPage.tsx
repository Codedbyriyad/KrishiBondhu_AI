import React, { useState, useEffect } from 'react';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { WeatherMetricsGrid } from '../components/weather/WeatherMetricsGrid';
import { ForecastCard } from '../components/weather/ForecastCard';
import { FarmingAdviceCard } from '../components/weather/FarmingAdviceCard';
import {
  fetchDistrictWeather,
  BANGLADESH_DISTRICTS,
} from '../services/weatherService';
import type { WeatherResponseData } from '../services/weatherService';
import { CloudSun, Search, Sparkles, MapPin } from 'lucide-react';

export const WeatherDashboardPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Rajshahi');
  const [weatherData, setWeatherData] = useState<WeatherResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadWeather = async (district: string) => {
    setIsLoading(true);
    try {
      const data = await fetchDistrictWeather(district);
      setWeatherData(data);
    } catch (err) {
      console.error('Weather load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  const handleDistrictSelect = (districtName: string) => {
    setSelectedDistrict(districtName);
  };

  const filteredDistricts = BANGLADESH_DISTRICTS.filter(
    (d) =>
      d.nameBn.includes(searchQuery) ||
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header & Quick District Quick-Select Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-emerald-600" />
            <span>কৃষি আবহাওয়া ও পূর্বাভাস (Weather & Advisory)</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            বাংলাদেশের জেলা ভিত্তিক রিয়েল-টাইম আবহাওয়া তথ্য এবং এআই নির্ভর কৃষি পরামর্শ
          </p>
        </div>

        {/* Search / Filter Quick Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="জেলা খুঁজুন (e.g. Bogura)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border-none outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* District Quick Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-stone-500 dark:text-stone-400 whitespace-nowrap flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> জনপ্রিয় জেলা:
        </span>
        {filteredDistricts.slice(0, 8).map((d) => (
          <button
            key={d.nameEn}
            onClick={() => handleDistrictSelect(d.nameEn)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap border ${
              selectedDistrict.toLowerCase() === d.nameEn.toLowerCase()
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-emerald-500/50'
            }`}
          >
            {d.nameBn} ({d.nameEn})
          </button>
        ))}
      </div>

      {/* Main Weather Content */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-48 rounded-3xl bg-stone-200 dark:bg-stone-800" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <div className="h-40 rounded-3xl bg-stone-200 dark:bg-stone-800" />
              <div className="h-48 rounded-3xl bg-stone-200 dark:bg-stone-800" />
            </div>
            <div className="lg:col-span-5">
              <div className="h-96 rounded-3xl bg-stone-200 dark:bg-stone-800" />
            </div>
          </div>
        </div>
      ) : weatherData ? (
        <div className="space-y-6">
          {/* Top Banner / Current Weather */}
          <CurrentWeatherCard
            weather={weatherData.currentWeather}
            selectedDistrict={selectedDistrict}
            onDistrictChange={handleDistrictSelect}
            onRefresh={() => loadWeather(selectedDistrict)}
            isLoading={isLoading}
          />

          {/* AI Banner Badge */}
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              কৃষিবন্ধু Gemini AI দ্বারা সংগৃহীত {weatherData.currentWeather.location} জেলার বিশেষ কৃশিকাজ দিকনির্দেশনা প্রস্তুত করা হয়েছে।
            </span>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Metrics + Farming Advice (7 cols on Desktop) */}
            <div className="lg:col-span-7 space-y-6">
              <WeatherMetricsGrid weather={weatherData.currentWeather} />
              <FarmingAdviceCard
                advices={weatherData.advices}
                agriAdvisory={weatherData.agriAdvisory}
              />
            </div>

            {/* Right Column: 7-Day Forecast (5 cols on Desktop) */}
            <div className="lg:col-span-5">
              <ForecastCard
                forecastList={weatherData.forecast}
                locationName={weatherData.currentWeather.location}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};