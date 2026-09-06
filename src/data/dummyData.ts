import type { Feature, Testimonial, Stat, FAQItem } from '../types';

export const FEATURES_DATA: Feature[] = [
  {
    id: 'ai-chat',
    title: 'Smart AI Agro-Advisor',
    description: 'Ask real-time questions in Bangla or English about farming practices, soil health, or pest management.',
    iconName: 'Bot',
    tag: 'Popular',
  },
  {
    id: 'disease-detection',
    title: 'Crop Disease Detection',
    description: 'Upload a picture of an infected leaf or crop to instantly identify diseases and receive tailored remedies.',
    iconName: 'ScanLine',
    tag: 'AI Powered',
  },
  {
    id: 'weather',
    title: 'Micro-Local Weather Forecast',
    description: 'Hyper-localized rainfall and temperature alerts tailored to your exact union or village location.',
    iconName: 'CloudSun',
  },
  {
    id: 'fertilizer',
    title: 'Fertilizer Recommendation',
    description: 'Get precise dosage guidance for Urea, TSP, and MP based on soil type and targeted target yields.',
    iconName: 'Sprout',
  },
  {
    id: 'crop-guide',
    title: 'Seasonal Crop Guide',
    description: 'Step-by-step seasonal guidelines covering sowing dates, irrigation cycles, and harvesting tips.',
    iconName: 'BookOpen',
  },
  {
    id: 'voice-assistant',
    title: 'Bangla Voice Assistant',
    description: 'Voice-first interaction built specifically for effortless hands-free operation directly in the field.',
    iconName: 'Mic',
    tag: 'Hands-Free',
  },
];

export const STATS_DATA: Stat[] = [
  { id: '1', label: 'Active Farmers', value: '50,000+', description: 'Trusting KrishiBondhu AI daily' },
  { id: '2', label: 'Crop Yield Increase', value: '28%', description: 'Average reported seasonal growth' },
  { id: '3', label: 'Disease Accuracy', value: '94.5%', description: 'Precision in AI visual detection' },
  { id: '4', label: 'Unions Covered', value: '4,500+', description: 'Real-time localized advisory support' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Anisur Rahman',
    role: 'Paddy & Wheat Farmer',
    location: 'Bogura, Bangladesh',
    comment: 'Using the photo disease scanner saved my paddy crop from brown spot disease this season. The recommended treatment worked within days.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
  },
  {
    id: '2',
    name: 'Fatema Begum',
    role: 'Vegetable Cultivator',
    location: 'Jessore, Bangladesh',
    comment: 'The voice assistant feature is amazing. I do not even need to type—I just speak in Bangla, and it gives me exact fertilizer doses.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 5,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the Crop Disease Scanner work?',
    answer: 'Simply snap a clear photo of the affected plant leaf using your phone camera. Our deep-learning vision models analyze the visual symptoms and provide diagnosis along with organic and chemical remedies within seconds.',
  },
  {
    id: 'faq-2',
    question: 'Is KrishiBondhu AI free for smallholder farmers?',
    answer: 'Yes, our core features including AI Chat, basic disease detection, and local weather forecasts are completely free for farmers.',
  },
  {
    id: 'faq-3',
    question: 'Does the app support local Bangla dialects?',
    answer: 'Yes! Our Natural Language Processing (NLP) models are trained specifically on regional Bangla agricultural terms to make voice and text interactions seamless.',
  },
];