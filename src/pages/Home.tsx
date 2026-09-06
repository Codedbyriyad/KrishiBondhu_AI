import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { FEATURES_DATA, STATS_DATA, TESTIMONIALS_DATA, FAQ_DATA } from '../data/dummyData';
import { FeatureCard } from '../components/common/FeatureCard';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Gen Smart Agriculture for Bangladesh</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Empowering Farmers with <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700">
                  Precision AI Insights
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your farming experience. Diagnose plant diseases, predict local micro-weather, 
                and receive tailored fertilizer advice in real-time through simple voice commands.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-medium shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all"
                >
                  Start Free Advisory
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/features"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-stone-100 text-stone-700 font-medium hover:bg-stone-200/80 transition-colors"
                >
                  View All Features
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-stone-200/60 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bangla & Voice Support</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Expert Verified</span>
              </div>
            </div>

            {/* Hero Illustration Placeholder */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/3 rounded-3xl bg-gradient-to-tr from-emerald-100 via-emerald-50 to-green-100 p-4 border border-emerald-200/60 shadow-2xl shadow-emerald-900/10 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-white">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold text-stone-700">AI Leaf Diagnostics Active</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">98.2% Match</span>
                  </div>

                  <div className="my-auto py-8 text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                      <Zap className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-semibold text-stone-800">Visual Leaf Scan Mock</p>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">Upload a photo or speak to diagnose crops instantly</p>
                  </div>

                  <div className="bg-stone-900/90 text-white text-xs p-3.5 rounded-2xl backdrop-blur-md flex justify-between items-center">
                    <span>Weather Alert: Light rain expected in 3 hrs</span>
                    <span className="text-emerald-400 font-semibold">Bogura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Smart Capabilities</h2>
          <p className="text-3xl font-extrabold text-stone-900 sm:text-4xl">Everything You Need To Grow Better</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className="space-y-1">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-400">{stat.value}</p>
                <p className="text-sm font-semibold text-stone-200">{stat.label}</p>
                <p className="text-xs text-emerald-200/70">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">Farmer Stories</h2>
          <p className="text-3xl font-extrabold text-stone-900 sm:text-4xl">Trusted On The Field</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className="p-8 bg-stone-50/80 rounded-2xl border border-stone-200/60 flex flex-col justify-between">
              <p className="text-stone-700 italic text-base leading-relaxed mb-6">"{item.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={item.avatarUrl} alt={item.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-stone-500">{item.role} • {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-extrabold text-stone-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => (
            <details key={faq.id} className="group bg-white p-6 rounded-2xl border border-stone-200/80 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-bold text-stone-800 cursor-pointer">
                <span>{faq.question}</span>
                <span className="transition group-open:-rotate-180 text-emerald-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};