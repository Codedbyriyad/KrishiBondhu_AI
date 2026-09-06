import type { UserProfile, NotificationItem, ActivityHistoryItem, WeatherData } from '../types/dashboard';

export const CURRENT_USER: UserProfile = {
  id: 'usr_101',
  name: 'Md Kaysar Mahmud',
  email: 'kaysar.agro@gmail.com',
  phone: '+880 1712-345678',
  location: 'Rajshahi, Bangladesh',
  farmSize: '4.5 Acres',
  primaryCrops: ['Rice (Aman)', 'Potato', 'Wheat'],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  joinedDate: 'January 2025',
};

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'n1',
    title: 'বৃষ্টিপাতের পূর্বাভাস',
    message: 'আগামী ২৪ ঘণ্টায় রাজশাহী জেলায় ভারী বৃষ্টির সম্ভাবনা। সেচ ও তরল সার প্রয়োগ বন্ধ রাখুন।',
    timestamp: '১০ মিনিট আগে',
    read: false,
    type: 'weather',
  },
  {
    id: 'n2',
    title: 'পাতা স্ক্যান আপডেট',
    message: 'আলুর লেইট ব্লাইট রোগের ঝুঁকি চিহ্নিত হয়েছে। প্রতিকারমূলক স্প্রে নির্দেশিকা দেখুন।',
    timestamp: '২ ঘণ্টা আগে',
    read: false,
    type: 'disease',
  },
  {
    id: 'n3',
    title: 'সার প্রয়োগ স্মরণ করিয়ে দেওয়া',
    message: 'আমান ধানের জন্য দ্বিতীয় কিস্তির ইউরিয়া প্রয়োগের সময় হয়েছে।',
    timestamp: '১ দিন আগে',
    read: true,
    type: 'system',
  },
];

export const ACTIVITY_HISTORY: ActivityHistoryItem[] = [
  {
    id: 'act-1',
    type: 'Diagnosis',
    title: 'Potato Leaf Spot Scan',
    timestamp: '2026-07-26 14:32',
    status: 'Completed',
    details: 'Identified Early Blight (89% Confidence). Copper Oxychloride recommended.',
  },
  {
    id: 'act-2',
    type: 'Fertilizer Calculation',
    title: 'Aman Rice Dose Calculation',
    timestamp: '2026-07-24 10:15',
    status: 'Completed',
    details: 'Target yield: 2.5 Tons/Acre. Recommended Urea: 45kg/Acre.',
  },
  {
    id: 'act-3',
    type: 'Query',
    title: 'Voice Assistant Query in Bangla',
    timestamp: '2026-07-21 08:45',
    status: 'Completed',
    details: 'Asked about irrigation interval for sandy-loam soil.',
  },
];

export const MOCK_WEATHER: WeatherData = {
  temperature: 32,
  condition: 'Partly Cloudy',
  humidity: 78,
  windSpeed: 14,
  precipitationChance: 40,
  forecast: [
    { day: 'Mon', temp: 32, condition: 'Cloudy' },
    { day: 'Tue', temp: 29, condition: 'Rain' },
    { day: 'Wed', temp: 31, condition: 'Sunny' },
    { day: 'Thu', temp: 33, condition: 'Sunny' },
    { day: 'Fri', temp: 30, condition: 'Thunderstorm' },
  ],
};