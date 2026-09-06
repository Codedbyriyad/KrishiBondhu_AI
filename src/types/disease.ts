export interface TreatmentPlan {
  organic: string[];
  chemical: string[];
}

export interface DiseaseResult {
  id?: string;
  isHealthy: boolean;
  diseaseName: string;
  cropType?: string;
  scientificName?: string;
  confidence: number; // Percentage (e.g., 94.5)
  severity: 'High' | 'Medium' | 'Low' | 'high' | 'medium' | 'low';
  description: string;
  organicRemediation?: string[];
  chemicalRemediation?: string[];
  preventiveTips?: string[];
  treatments?: TreatmentPlan;
  prevention?: string[];
  scannedAt?: string;
  imagePreview?: string;
}
