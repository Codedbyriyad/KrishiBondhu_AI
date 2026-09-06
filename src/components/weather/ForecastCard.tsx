import React from 'react';
import { Calendar, CloudRain } from 'lucide-react';
import type { DailyForecast } from '../../types/weather';
import { getWeatherIcon } from './CurrentWeatherCard';

interface ForecastCardProps {
  forecastList: DailyForecast[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecastList }) => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" /> 7-Day Weather Forecast
        </h2>
        <span className="text-[11px] text-stone-400 dark:text-stone-500">
          Rajshahi Region
        </span>
      </div>

      <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
        {forecastList.map((day, idx) => (
          <div
            key={idx}
            className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-stone-50/50 dark:hover:bg-stone-800/30 rounded-xl px-2 transition-colors"
          >
            {/* Day & Date */}
            <div className="w-24 shrink-0">
              <p className="font-semibold text-stone-800 dark:text-stone-200">
                {day.date === 'Today' ? 'Today' : day.dayName}
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">
                {day.date}
              </p>
            </div>

            {/* Condition Icon & Text */}
            <div className="flex items-center gap-2 flex-1">
              {getWeatherIcon(day.icon, 'w-5 h-5')}
              <span className="hidden sm:inline text-stone-600 dark:text-stone-400 font-medium">
                {day.condition}
              </span>
            </div>

            {/* Rain Chance */}
            <div className="flex items-center gap-1 w-16 justify-end text-blue-600 dark:text-blue-400 font-semibold">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{day.rainChance}%</span>
            </div>

            {/* Temp High / Low Bar */}
            <div className="w-24 text-right">
              <span className="font-bold text-stone-900 dark:text-stone-100">
                {day.tempMax}°
              </span>
              <span className="text-stone-400 dark:text-stone-500 ml-2">
                {day.tempMin}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};