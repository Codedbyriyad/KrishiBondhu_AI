export interface CurrentWeather {
  location: string;
  division: string;
  temperature: number; // in °C
  feelsLike: number;
  condition: string;
  icon: 'sun' | 'cloud-sun' | 'rain' | 'drizzle' | 'thunderstorm';
  highTemp: number;
  lowTemp: number;
  humidity: number; // %
  windSpeed: number; // km/h
  windDirection: string;
  rainChance: number; // %
  uvIndex: number;
  visibility: number; // km
  pressure: number; // hPa
  lastUpdated: string;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  condition: string;
  icon: 'sun' | 'cloud-sun' | 'rain' | 'drizzle' | 'thunderstorm';
  tempMax: number;
  tempMin: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
}

export interface FarmingAdvice {
  category: 'irrigation' | 'pesticide' | 'harvest' | 'fertilizer';
  title: string;
  description: string;
  status: 'recommended' | 'warning' | 'avoid';
  suitableCrops: string[];
}