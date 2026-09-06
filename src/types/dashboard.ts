export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  farmSize: string;
  primaryCrops: string[];
  avatarUrl: string;
  joinedDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'weather' | 'disease' | 'market' | 'system';
}

export interface ActivityHistoryItem {
  id: string;
  type: 'Diagnosis' | 'Query' | 'Weather Check' | 'Fertilizer Calculation';
  title: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Flagged';
  details: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitationChance: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  image?: string; // Add optional base64 or URL for multimodal queries
  timestamp: string;
}