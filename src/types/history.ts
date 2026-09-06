import type { DiseaseResult } from './disease';

export type HistoryCategory = 'disease' | 'fertilizer' | 'chat';

export interface FertilizerHistoryData {
  cropType: string;
  landArea: number;
  landUnit: string;
  totalDecimals: number;
  soilType: string;
  currentStage: string;
  fertilizers: Array<{
    id: string;
    name: string;
    bengaliName: string;
    quantityKg: number;
    perDecimalKg: number;
    role: string;
    applicationTime: string;
    category: string;
  }>;
  applicationSchedule: Array<{
    stage: string;
    time: string;
    details: string;
  }>;
  soilHealthAdvice: string;
  safetyWarnings: string[];
  estimatedCostBdt: number;
}

export interface HistoryItem {
  id: string;
  type: HistoryCategory;
  title: string;
  cropName: string;
  date: string;
  timestamp: string;
  statusBadge: {
    text: string;
    variant: 'danger' | 'warning' | 'success' | 'info';
  };
  summary: string;
  details: {
    diseaseData?: DiseaseResult;
    fertilizerData?: FertilizerHistoryData;
    chatData?: {
      userMessage: string;
      aiReply: string;
    };
  };
}
