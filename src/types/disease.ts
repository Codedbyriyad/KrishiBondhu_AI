export interface TreatmentPlan {
  organic: string[];
  chemical: string[];
}

export interface DiseaseResult {
  isHealthy: boolean;
  diseaseName: string;
  scientificName?: string;
  confidence: number; // Percentage (e.g., 94.5)
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatments: TreatmentPlan;
  prevention: string[];
}