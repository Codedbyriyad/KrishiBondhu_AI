import { AgricultureService } from './api';
import type { CurrentWeather, DailyForecast, FarmingAdvice } from '../types/weather';
import { MOCK_CURRENT_WEATHER, MOCK_DAILY_FORECAST, MOCK_FARMING_ADVICE } from '../data/mockWeather';

export type WeatherResponseData = {
  currentWeather: CurrentWeather;
  forecast: DailyForecast[];
  advices: FarmingAdvice[];
  agriAdvisory?: string;
};

export const BANGLADESH_DISTRICTS = [
  { nameBn: 'রাজশাহী', nameEn: 'Rajshahi', lat: 24.3745, lon: 88.6042, division: 'Rajshahi Division' },
  { nameBn: 'ঢাকা', nameEn: 'Dhaka', lat: 23.8103, lon: 90.4125, division: 'Dhaka Division' },
  { nameBn: 'রংপুর', nameEn: 'Rangpur', lat: 25.7439, lon: 89.2752, division: 'Rangpur Division' },
  { nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram', lat: 22.3569, lon: 91.7832, division: 'Chattogram Division' },
  { nameBn: 'সিলেট', nameEn: 'Sylhet', lat: 24.8949, lon: 91.8687, division: 'Sylhet Division' },
  { nameBn: 'খুলনা', nameEn: 'Khulna', lat: 22.8456, lon: 89.5403, division: 'Khulna Division' },
  { nameBn: 'বরিশাল', nameEn: 'Barishal', lat: 22.7010, lon: 90.3535, division: 'Barishal Division' },
  { nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', lat: 24.7471, lon: 90.4203, division: 'Mymensingh Division' },
  { nameBn: 'বগুড়া', nameEn: 'Bogura', lat: 24.8465, lon: 89.3777, division: 'Rajshahi Division' },
  { nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', lat: 25.6279, lon: 88.6332, division: 'Rangpur Division' },
  { nameBn: 'কুমিল্লা', nameEn: 'Comilla', lat: 23.4607, lon: 91.1809, division: 'Chattogram Division' },
  { nameBn: 'যশোর', nameEn: 'Jeshore', lat: 23.1664, lon: 89.2081, division: 'Khulna Division' },
  { nameBn: 'কক্সবাজার', nameEn: 'Cox\'s Bazar', lat: 21.4272, lon: 92.0058, division: 'Chattogram Division' },
  { nameBn: 'পাবনা', nameEn: 'Pabna', lat: 24.0064, lon: 89.2493, division: 'Rajshahi Division' },
  { nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', lat: 23.9013, lon: 88.9561, division: 'Khulna Division' },
];

export const fetchDistrictWeather = async (districtName: string): Promise<WeatherResponseData> => {
  try {
    const rawData = await AgricultureService.getWeatherForecast(districtName);

    if (!rawData) {
      throw new Error('No weather data returned');
    }

    // Format Current Weather
    const currentWeather: CurrentWeather = {
      location: rawData.location || districtName,
      division: rawData.division || `${districtName} District, Bangladesh`,
      temperature: rawData.temperature ?? 31,
      feelsLike: rawData.feelsLike ?? (rawData.temperature ? rawData.temperature + 4 : 35),
      condition: rawData.condition || 'আংশিক মেঘলা (Partly Cloudy)',
      icon: (['sun', 'cloud-sun', 'rain', 'drizzle', 'thunderstorm'].includes(rawData.icon)
        ? rawData.icon
        : 'cloud-sun') as CurrentWeather['icon'],
      highTemp: rawData.highTemp ?? 34,
      lowTemp: rawData.lowTemp ?? 25,
      humidity: rawData.humidity ?? 75,
      windSpeed: typeof rawData.windSpeed === 'number' ? rawData.windSpeed : parseInt(rawData.windSpeed) || 14,
      windDirection: rawData.windDirection || 'দক্ষিণ-পূর্ব (SE)',
      rainChance: rawData.rainChance ?? 60,
      uvIndex: rawData.uvIndex ?? 7,
      visibility: rawData.visibility ?? 8,
      pressure: rawData.pressure ?? 1008,
      lastUpdated: rawData.lastUpdated || 'এখনই হালনাগাদ',
    };

    // Format Daily Forecast
    const forecastList: DailyForecast[] = Array.isArray(rawData.forecast)
      ? rawData.forecast.map((item: any, idx: number) => ({
          date: item.date || `Day ${idx + 1}`,
          dayName: item.dayName || item.day || 'দিন',
          condition: item.condition || 'আংশিক মেঘলা',
          icon: (['sun', 'cloud-sun', 'rain', 'drizzle', 'thunderstorm'].includes(item.icon)
            ? item.icon
            : 'cloud-sun') as DailyForecast['icon'],
          tempMax: item.tempMax ?? item.temp ?? 32,
          tempMin: item.tempMin ?? 24,
          rainChance: item.rainChance ?? 50,
          humidity: item.humidity ?? 75,
          windSpeed: item.windSpeed ?? 12,
        }))
      : MOCK_DAILY_FORECAST;

    // Format Farming Advices
    const advicesList: FarmingAdvice[] = Array.isArray(rawData.advices)
      ? rawData.advices.map((item: any) => ({
          category: (['irrigation', 'pesticide', 'harvest', 'fertilizer'].includes(item.category)
            ? item.category
            : 'irrigation') as FarmingAdvice['category'],
          title: item.title || 'কৃষি সর্তকতা',
          description: item.description || 'আবহাওয়ার পূর্বাভাস অনুযায়ী কৃষিকাজ পরিচালনা করুন।',
          status: (['recommended', 'warning', 'avoid'].includes(item.status)
            ? item.status
            : 'recommended') as FarmingAdvice['status'],
          suitableCrops: item.suitableCrops || ['ধান', 'সবজি'],
        }))
      : MOCK_FARMING_ADVICE;

    return {
      currentWeather,
      forecast: forecastList,
      advices: advicesList,
      agriAdvisory: rawData.agriAdvisory || 'আবহাওয়া কৃষি কাজের জন্য মোটামুটি অনুকূল। সময়মত সেচ ও সার প্রয়োগ ব্যবস্থা চালু রাখুন।',
    };
  } catch (err) {
    console.warn('Failed to fetch backend weather, using local mock fallback:', err);
    return {
      currentWeather: {
        ...MOCK_CURRENT_WEATHER,
        location: districtName,
        division: `${districtName} Division, Bangladesh`,
      },
      forecast: MOCK_DAILY_FORECAST,
      advices: MOCK_FARMING_ADVICE,
      agriAdvisory: `কৃষি পরামর্শ (${districtName}): বৃষ্টিপাতের পূর্বাভাস থাকলে সেচ ও স্প্রে করার ক্ষেত্রে সতর্ক থাকুন।`,
    };
  }
};
