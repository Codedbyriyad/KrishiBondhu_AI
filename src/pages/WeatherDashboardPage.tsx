import React, { useState } from 'react';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { WeatherMetricsGrid } from '../components/weather/WeatherMetricsGrid';
import { ForecastCard } from '../components/weather/ForecastCard';
import { FarmingAdviceCard } from '../components/weather/FarmingAdviceCard';
import {
  MOCK_CURRENT_WEATHER,
  MOCK_DAILY_FORECAST,
  MOCK_FARMING_ADVICE,
} from '../data/mockWeather';

export const WeatherDashboardPage: React.FC = () => {
  const [weather, setWeather] = useState(MOCK_CURRENT_WEATHER);

  const handleRefresh = () => {
    // Simulates live weather refresh
    setWeather((prev) => ({
      ...prev,
      lastUpdated: 'Just now',
      temperature: prev.temperature,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner / Current Weather */}
      <CurrentWeatherCard weather={weather} onRefresh={handleRefresh} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Metrics + Advice (7 cols on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <WeatherMetricsGrid weather={weather} />
          <FarmingAdviceCard advices={MOCK_FARMING_ADVICE} />
        </div>

        {/* Right Column: 7-Day Forecast (5 cols on Desktop) */}
        <div className="lg:col-span-5">
          <ForecastCard forecastList={MOCK_DAILY_FORECAST} />
        </div>
      </div>
    </div>
  );
};