import React from 'react';
import { Sprout, Bug, CloudSun, Leaf, Sparkles } from 'lucide-react';
import type { SuggestedPrompt } from '../../types/chat';

interface EmptyStateProps {
  onSelectPrompt: (promptText: string) => void;
}

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'p1',
    category: 'Disease',
    title: 'Identify Leaf Spots',
    prompt: 'My tomato leaf has brown spots with yellow halos. What disease is this?',
  },
  {
    id: 'p2',
    category: 'Fertilizer',
    title: 'NPK Ratio for Wheat',
    prompt: 'What is the ideal NPK fertilizer schedule for winter wheat during tillering?',
  },
  {
    id: 'p3',
    category: 'Weather',
    title: 'Irrigation Timing',
    prompt: 'Should I irrigate my corn field today given rain forecast for tomorrow?',
  },
  {
    id: 'p4',
    category: 'Crop Care',
    title: 'Soil pH Adjustment',
    prompt: 'How can I lower alkaline soil pH from 8.2 down to 6.5 naturally?',
  },
];

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPrompt }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto my-auto animate-fade-in">
      {/* Hero Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
          <Sprout className="w-9 h-9" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        AgriAI Intelligence Advisory
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg mb-8">
        Ask questions about crop diseases, fertilizing schedules, pest management, or upload an image of your plant.
      </p>

      {/* Suggested Questions Grid */}
      <div className="w-full text-left">
        <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Suggested Prompts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUGGESTED_PROMPTS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {item.category}
                </span>
                {item.category === 'Disease' && <Bug className="w-4 h-4 text-amber-500" />}
                {item.category === 'Fertilizer' && <Leaf className="w-4 h-4 text-emerald-500" />}
                {item.category === 'Weather' && <CloudSun className="w-4 h-4 text-blue-500" />}
                {item.category === 'Crop Care' && <Sprout className="w-4 h-4 text-green-500" />}
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                "{item.prompt}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};