import React from 'react';
import {
  Droplets,
  Wind,
  CloudRain,
  Sun,
  Eye,
  Gauge,
} from 'lucide-react';
import type { CurrentWeather } from '../../types/weather';

interface WeatherMetricsGridProps {
  weather: CurrentWeather;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ weather }) => {
  const metrics = [
    {
      label: 'Rainfall Chance',
      value: `${weather.rainChance}%`,
      subtext: weather.rainChance > 50 ? 'High probability' : 'Low probability',
      icon: CloudRain,
      iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
    },
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      subtext: 'High air moisture',
      icon: Droplets,
      iconColor: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50',
    },
    {
      label: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      subtext: `Direction: ${weather.windDirection}`,
      icon: Wind,
      iconColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/50',
    },
    {
      label: 'UV Index',
      value: `${weather.uvIndex} / 10`,
      subtext: weather.uvIndex > 6 ? 'High exposure' : 'Moderate',
      icon: Sun,
      iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      subtext: 'Barometric',
      icon: Gauge,
      iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
    },
    {
      label: 'Visibility',
      value: `${weather.visibility} km`,
      subtext: 'Clear line of sight',
      icon: Eye,
      iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {metrics.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-4 space-y-2 shadow-xs hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                {item.label}
              </span>
              <div className={`p-2 rounded-xl ${item.iconColor}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {item.value}
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">
                {item.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};