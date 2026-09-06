import React from 'react';
import { Calendar, CloudRain } from 'lucide-react';
import type { DailyForecast } from '../../types/weather';
import { getWeatherIcon } from './CurrentWeatherCard';

interface ForecastCardProps {
  forecastList: DailyForecast[];
  locationName?: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecastList, locationName }) => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" /> ৭ দিনের আবহাওয়া পূর্বাভাস (7-Day Forecast)
        </h2>
        {locationName && (
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800">
            {locationName}
          </span>
        )}
      </div>

      <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
        {forecastList.map((day, idx) => (
          <div
            key={idx}
            className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-stone-50/50 dark:hover:bg-stone-800/30 rounded-xl px-2 transition-colors"
          >
            {/* Day & Date */}
            <div className="w-24 shrink-0">
              <p className="font-bold text-stone-800 dark:text-stone-200">
                {day.date === 'Today' || day.date === 'আজ' ? 'আজ (Today)' : day.dayName}
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">
                {day.date}
              </p>
            </div>

            {/* Condition Icon & Text */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="shrink-0">{getWeatherIcon(day.icon, 'w-5 h-5')}</div>
              <span className="text-stone-700 dark:text-stone-300 font-medium truncate text-[11px]">
                {day.condition}
              </span>
            </div>

            {/* Rain Chance */}
            <div className="flex items-center gap-1 shrink-0 justify-end text-blue-600 dark:text-blue-400 font-bold text-[11px]">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{day.rainChance}%</span>
            </div>

            {/* Temp High / Low Bar */}
            <div className="w-20 text-right shrink-0">
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {day.tempMax}°C
              </span>
              <span className="text-stone-400 dark:text-stone-500 ml-1.5 text-[11px]">
                {day.tempMin}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};