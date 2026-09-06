import React from 'react';
import { CloudSun, Droplets, Wind, Compass } from 'lucide-react';
import { MOCK_WEATHER, CURRENT_USER } from '../../data/dashboardDummyData';

export const WeatherView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Agricultural Weather</h1>
        <p className="text-xs text-stone-500">Hyper-local forecast and irrigation planning for {CURRENT_USER.location}.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center gap-4">
          <Droplets className="w-8 h-8 text-sky-500" />
          <div>
            <p className="text-[11px] text-stone-400">Soil Moisture</p>
            <p className="text-lg font-bold">64% (Optimal)</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center gap-4">
          <Wind className="w-8 h-8 text-emerald-500" />
          <div>
            <p className="text-[11px] text-stone-400">Wind Velocity</p>
            <p className="text-lg font-bold">{MOCK_WEATHER.windSpeed} km/h</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center gap-4">
          <Compass className="w-8 h-8 text-amber-500" />
          <div>
            <p className="text-[11px] text-stone-400">Spray Conditions</p>
            <p className="text-lg font-bold text-emerald-600">Favorable</p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4">
        <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {MOCK_WEATHER.forecast.map((day) => (
            <div key={day.day} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 text-center space-y-2">
              <p className="text-xs font-bold text-stone-600 dark:text-stone-300">{day.day}</p>
              <CloudSun className="w-6 h-6 mx-auto text-amber-500" />
              <p className="text-sm font-black">{day.temp}°C</p>
              <p className="text-[10px] text-stone-400">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};