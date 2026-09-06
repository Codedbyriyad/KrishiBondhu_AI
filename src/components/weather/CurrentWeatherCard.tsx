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

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  onRefresh?: () => void;
}

export const getWeatherIcon = (
  iconType: CurrentWeather['icon'],
  className: string = 'w-8 h-8'
) => {
  switch (iconType) {
    case 'sun':
      return <Sun className={`${className} text-amber-500`} />;
    case 'cloud-sun':
      return <CloudSun className={`${className} text-amber-400`} />;
    case 'rain':
      return <CloudRain className={`${className} text-blue-500`} />;
    case 'drizzle':
      return <CloudDrizzle className={`${className} text-sky-400`} />;
    case 'thunderstorm':
      return <CloudLightning className={`${className} text-indigo-500`} />;
    default:
      return <Sun className={`${className} text-amber-500`} />;
  }
};

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  onRefresh,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-8 shadow-md">
      {/* Background Decorative Pattern */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              {weather.location}
            </h1>
            <p className="text-xs text-emerald-200/80">{weather.division}</p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-md"
          title="Refresh weather"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Temp & Condition */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md">
            {getWeatherIcon(weather.icon, 'w-12 h-12 sm:w-16 sm:h-16')}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                {weather.temperature}°
              </span>
              <span className="text-xl sm:text-2xl font-medium text-emerald-200">
                C
              </span>
            </div>
            <p className="text-sm font-semibold text-emerald-100 mt-1">
              {weather.condition}
            </p>
          </div>
        </div>

        {/* High/Low & Feels Like */}
        <div className="flex sm:flex-col justify-between items-start sm:items-end gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <p className="text-xs text-emerald-200">
            Feels like{' '}
            <span className="font-bold text-white">{weather.feelsLike}°C</span>
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center text-emerald-200">
              <ArrowUp className="w-3.5 h-3.5 text-rose-300 mr-0.5" />
              {weather.highTemp}°
            </span>
            <span className="flex items-center text-emerald-200">
              <ArrowDown className="w-3.5 h-3.5 text-sky-300 mr-0.5" />
              {weather.lowTemp}°
            </span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-[11px] text-emerald-200/70 flex items-center justify-between pt-2 border-t border-white/10">
        <span>Updated: {weather.lastUpdated}</span>
        <span className="font-medium text-emerald-200">Optimal for Rice Cultivation</span>
      </div>
    </div>
  );
};