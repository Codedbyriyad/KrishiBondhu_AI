export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  joinedDate: string;
  avatarUrl: string;
}

export interface FarmInfo {
  farmName: string;
  totalArea: string;
  crops: string[];
  district: string;
  soilType: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'disease' | 'fertilizer' | 'weather' | 'chat';
}

export interface SavedReport {
  id: string;
  title: string;
  date: string;
  fileSize: string;
  type: string;
}