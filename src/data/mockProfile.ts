import type { UserInfo, FarmInfo, ActivityItem, SavedReport } from '../types/profile';

export const mockUserInfo: UserInfo = {
  name: 'Md. Kaysar Mahmud',
  email: 'kaysar@example.com',
  phone: '+880 1700-000000',
  role: 'Agricultural Entrepreneur',
  location: 'Rajshahi, Bangladesh',
  joinedDate: 'October 2024',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
};

export const mockFarmInfo: FarmInfo = {
  farmName: 'Green Horizon Agro',
  totalArea: '12.5 Acres',
  crops: ['Paddy', 'Mango', 'Potato'],
  district: 'Rajshahi',
  soilType: 'Loamy Soil',
};

export const mockActivities: ActivityItem[] = [
  { id: '1', title: 'Diagnosed Potato Late Blight disease', timestamp: '2 hours ago', type: 'disease' },
  { id: '2', title: 'Generated NPK Fertilizer plan for Paddy', timestamp: 'Yesterday at 4:30 PM', type: 'fertilizer' },
  { id: '3', title: 'Checked Rajshahi 7-day weather forecast', timestamp: '3 days ago', type: 'weather' },
];

export const mockSavedReports: SavedReport[] = [
  { id: '1', title: 'Soil Moisture & Nutrient Analysis', date: 'Jul 14, 2026', fileSize: '2.4 MB', type: 'PDF' },
  { id: '2', title: 'Seasonal Fertilizer Recommendation', date: 'Jun 02, 2026', fileSize: '1.1 MB', type: 'CSV' },
];