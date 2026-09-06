import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, CloudSun, Sprout, Bot, ArrowUpRight } from 'lucide-react';
import { CURRENT_USER, MOCK_WEATHER, ACTIVITY_HISTORY } from '../../data/dashboardDummyData';

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-700/60 text-emerald-200">
            Active Farm Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {CURRENT_USER.name} 👋
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Your field status in {CURRENT_USER.location} is optimal today. No severe pest warnings reported for your <strong>{CURRENT_USER.primaryCrops.join(', ')}</strong> crops.
          </p>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Scan Leaf', path: '/dashboard/disease', icon: ScanLine, color: 'bg-emerald-500' },
          { label: 'Ask AI Chat', path: '/dashboard/chat', icon: Bot, color: 'bg-teal-500' },
          { label: 'Weather Report', path: '/dashboard/weather', icon: CloudSun, color: 'bg-sky-500' },
          { label: 'Fertilizer Guide', path: '/dashboard/fertilizer', icon: Sprout, color: 'bg-amber-500' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center mb-3 shadow-xs`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-600 transition-colors">
                {item.label}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Overview Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Weather Mini Summary */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">Live Weather Context</h3>
            <span className="text-xs text-emerald-600 font-medium">{CURRENT_USER.location}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-4xl font-black text-stone-900 dark:text-stone-100">{MOCK_WEATHER.temperature}°C</p>
              <p className="text-xs text-stone-500 capitalize">{MOCK_WEATHER.condition}</p>
            </div>
            <CloudSun className="w-12 h-12 text-amber-500" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-center text-xs">
            <div>
              <p className="text-stone-400 text-[10px]">Humidity</p>
              <p className="font-semibold">{MOCK_WEATHER.humidity}%</p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px]">Wind</p>
              <p className="font-semibold">{MOCK_WEATHER.windSpeed} km/h</p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px]">Rain Chance</p>
              <p className="font-semibold">{MOCK_WEATHER.precipitationChance}%</p>
            </div>
          </div>
        </div>

        {/* Recent History / Activity */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">Recent AI Analyses</h3>
            <Link to="/dashboard/history" className="text-xs font-semibold text-emerald-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {ACTIVITY_HISTORY.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800/80 flex items-start justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-800 dark:text-stone-200">{act.title}</span>
                    <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {act.type}
                    </span>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 text-[11px]">{act.details}</p>
                </div>
                <span className="text-[10px] text-stone-400 shrink-0">{act.timestamp.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};