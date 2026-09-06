import React from 'react';
import * as Icons from 'lucide-react';
import type { Feature } from '../../types';

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // Dynamic Lucide icon lookup
  const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
    feature.iconName
  ] || Icons.HelpCircle;

  return (
    <div className="group relative p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          {feature.tag && (
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800">
              {feature.tag}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-emerald-700 transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed">{feature.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
        <span>Explore Feature</span>
        <Icons.ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};