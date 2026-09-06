import React from 'react';
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  MapPin,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import type { CurrentWeather } from '../../types/weather';
import { BANGLADESH_DISTRICTS } from '../../services/weatherService';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  onRefresh?: () => void;
  selectedDistrict?: string;
  onDistrictChange?: (districtName: string) => void;
  isLoading?: boolean;
}

export const getWeatherIcon = (
  iconType: CurrentWeather['icon'],
  className: string = 'w-8 h-8'
) => {
  switch (iconType) {
    case 'sun':
      return <Sun className={`${className} text-amber-400`} />;
    case 'cloud-sun':
      return <CloudSun className={`${className} text-amber-300`} />;
    case 'rain':
      return <CloudRain className={`${className} text-sky-300`} />;
    case 'drizzle':
      return <CloudDrizzle className={`${className} text-sky-200`} />;
    case 'thunderstorm':
      return <CloudLightning className={`${className} text-indigo-300`} />;
    default:
      return <Sun className={`${className} text-amber-400`} />;
  }
};

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  onRefresh,
  selectedDistrict,
  onDistrictChange,
  isLoading,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-8 shadow-md">
      {/* Background Decorative Blur */}
      <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* Header with Location & District Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <MapPin className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{weather.location}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-emerald-200 font-semibold">
                লাইভ আবহাওয়া
              </span>
            </h1>
            <p className="text-xs text-emerald-200/90">{weather.division}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onDistrictChange && (
            <select
              value={selectedDistrict || weather.location}
              onChange={(e) => onDistrictChange(e.target.value)}
              disabled={isLoading}
              className="bg-white/15 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400/50 cursor-pointer backdrop-blur-md"
            >
              {BANGLADESH_DISTRICTS.map((d) => (
                <option key={d.nameEn} value={d.nameEn} className="bg-stone-900 text-stone-100">
                  {d.nameBn} ({d.nameEn})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`p-2.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white backdrop-blur-md ${
              isLoading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            title="হালনাগাদ করুন (Refresh)"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Temp & Condition */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
            {getWeatherIcon(weather.icon, 'w-12 h-12 sm:w-16 sm:h-16')}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl sm:text-6xl font-black tracking-tight">
                {weather.temperature}°
              </span>
              <span className="text-xl sm:text-2xl font-medium text-emerald-200">
                C
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-emerald-100 mt-1">
              {weather.condition}
            </p>
          </div>
        </div>

        {/* High/Low & Feels Like */}
        <div className="flex sm:flex-col justify-between items-start sm:items-end gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <p className="text-xs text-emerald-200">
            অনুভূত তাপমাত্রা:{' '}
            <span className="font-bold text-white text-sm">{weather.feelsLike}°C</span>
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center text-emerald-100 font-semibold">
              <ArrowUp className="w-3.5 h-3.5 text-rose-300 mr-0.5" />
              সর্বোচ্চ {weather.highTemp}°C
            </span>
            <span className="flex items-center text-emerald-100 font-semibold">
              <ArrowDown className="w-3.5 h-3.5 text-sky-300 mr-0.5" />
              সর্বনিম্ন {weather.lowTemp}°C
            </span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-[11px] text-emerald-200/80 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
        <span>সর্বশেষ হালনাগাদ: {weather.lastUpdated}</span>
        <span className="font-semibold text-emerald-100 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
          🌾 আমন ধান ও সবজি চাষের উপযোগী
        </span>
      </div>
    </div>
  );
};