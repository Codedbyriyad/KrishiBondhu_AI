import type { DiseaseResult } from '../types/disease';

export const MOCK_DISEASE_RESULTS: DiseaseResult[] = [
  {
    isHealthy: false,
    diseaseName: 'Rice Leaf Blast (ধানের পাতা ব্লাস্ট রোগ)',
    scientificName: 'Magnaporthe oryzae',
    confidence: 94.8,
    severity: 'high',
    description:
      'Spindle-shaped lesions appear on leaves with gray centers and dark brown margins. Highly destructive to Aman and Boro paddy in Bangladesh.',
    treatments: {
      organic: [
        'Apply Neem oil extract (5ml/L) early in the morning.',
        'Use Trichoderma harzianum as a biological control agent.',
      ],
      chemical: [
        'Spray Tricyclazole 75 WP (0.6g/L water) or Isoprothiolane 40 EC (1.5ml/L).',
        'Avoid excessive urea fertilizer application.',
      ],
    },
    prevention: [
      'Use resistant varieties like BRRI dhan28 or BRRI dhan29 where applicable.',
      'Maintain proper water balance (2–3 inches continuous flooding during vulnerable stages).',
      'Destroy crop residue after harvest.',
    ],
  },
  {
    isHealthy: true,
    diseaseName: 'Healthy Crop (সুস্থ ফসল)',
    confidence: 98.2,
    severity: 'low',
    description:
      'No signs of fungal, bacterial, or pest damage detected. Leaf pigment and structural integrity are optimal.',
    treatments: {
      organic: ['Continue routine balanced organic composting.'],
      chemical: ['No chemical intervention required.'],
    },
    prevention: [
      'Monitor fields weekly for early disease signs.',
      'Ensure proper drainage during heavy rainfall.',
      'Apply balanced NPK fertilizers.',
    ],
  },
];

/**
 * Mock crop image analysis service.
 * Simulates an AI diagnosis call by returning a randomized mock result
 * after a short delay.
 */
export const analyzeCropImage = async (_file: File): Promise<DiseaseResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const randomIndex = Math.floor(Math.random() * MOCK_DISEASE_RESULTS.length);
  return MOCK_DISEASE_RESULTS[randomIndex];
};