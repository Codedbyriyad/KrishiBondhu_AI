export interface FertilizerFormInput {
  crop: string;
  district: string;
  growthStage: string;
  landSize: number;
  landUnit: 'decimal' | 'bigha' | 'acre';
}

export interface FertilizerItem {
  id: string;
  name: string; // e.g., Urea, TSP, MOP, Gypsum, Zinc Sulphate
  bengaliName: string;
  quantityKg: number; // calculated for total land
  perUnitKg: number; // rate per decimal
  applicationTime: string;
  notes: string;
  priority: 'high' | 'medium' | 'optional';
}

export interface RecommendationResult {
  crop: string;
  district: string;
  growthStage: string;
  landSizeText: string;
  fertilizers: FertilizerItem[];
  generalNotes: string[];
  safetyWarnings: string[];
}