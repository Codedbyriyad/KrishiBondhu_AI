import type { FertilizerFormInput, RecommendationResult } from '../types/fertilizer';

export const CROP_OPTIONS = [
  'Aman Paddy',
  'Boro Paddy',
  'Wheat',
  'Maize',
  'Potato',
  'Jute',
  'Eggplant',
];

export const DISTRICT_OPTIONS = [
  'Rajshahi',
  'Bogra',
  'Pabna',
  'Dinajpur',
  'Rangpur',
  'Mymensingh',
  'Jessore',
];

export const GROWTH_STAGE_OPTIONS = [
  'Land Preparation (জমিতৈরি)',
  'Basal / Planting (চারা রোপণ)',
  'Vegetative / Tillering (কুশি গজানো)',
  'Panicle Initiation / Flowering (ফুল / থোড় আসা)',
  'Grain Filling / Maturity (দানাদানা / পরিপক্কতা)',
];

// Helper to convert any unit into 'decimal' for base calculations
export const convertToDecimal = (size: number, unit: 'decimal' | 'bigha' | 'acre'): number => {
  switch (unit) {
    case 'bigha':
      return size * 33; // 1 Bigha = 33 Decimals
    case 'acre':
      return size * 100; // 1 Acre = 100 Decimals
    default:
      return size;
  }
};

export const getFertilizerRecommendation = (
  input: FertilizerFormInput
): RecommendationResult => {
  const totalDecimals = convertToDecimal(input.landSize, input.landUnit);

  // Base rates per decimal (in Kg) depending on crop and stage
  const fertilizers = [
    {
      id: 'urea',
      name: 'Urea (ইউরিয়া)',
      bengaliName: 'ইউরিয়া',
      perUnitKg: input.growthStage.includes('Preparation') ? 0.8 : 0.4,
      applicationTime:
        input.growthStage.includes('Preparation')
          ? 'Apply during final land preparation'
          : 'Top-dressing in 2 split doses 15 days apart',
      notes: 'Ensure field has standing water layer of 1-2 inches. Do not apply on dry soil.',
      priority: 'high' as const,
    },
    {
      id: 'tsp',
      name: 'TSP / DAP (টিএসপি / ডিএপি)',
      bengaliName: 'টিএসপি',
      perUnitKg: 0.5,
      applicationTime: 'Entire amount during land preparation',
      notes: 'Incorporates phosphorus for deep root growth and seedling strength.',
      priority: 'high' as const,
    },
    {
      id: 'mop',
      name: 'MOP / Potash (এমওপি / পটাস)',
      bengaliName: 'এমওপি',
      perUnitKg: 0.35,
      applicationTime: '50% at land preparation, 50% at panicle initiation',
      notes: 'Improves pest resistance and increases grain mass.',
      priority: 'high' as const,
    },
    {
      id: 'gypsum',
      name: 'Gypsum (জিপসাম)',
      bengaliName: 'জিপসাম',
      perUnitKg: 0.25,
      applicationTime: 'Apply during final tillage',
      notes: 'Provides sulfur essential for protein synthesis.',
      priority: 'medium' as const,
    },
    {
      id: 'zinc',
      name: 'Zinc Sulphate (জিঙ্ক সালফেট)',
      bengaliName: 'জিঙ্ক সালফেট',
      perUnitKg: 0.05,
      applicationTime: 'Apply with initial land preparation',
      notes: 'Prevents leaf yellowing and stunted growth.',
      priority: 'optional' as const,
    },
  ];

  return {
    crop: input.crop,
    district: input.district,
    growthStage: input.growthStage,
    landSizeText: `${input.landSize} ${input.landUnit} (~${totalDecimals} Decimals)`,
    fertilizers: fertilizers.map((f) => ({
      ...f,
      quantityKg: parseFloat((f.perUnitKg * totalDecimals).toFixed(1)),
    })),
    generalNotes: [
      'Mix TSP, Gypsum, and Zinc Sulphate thoroughly into the topsoil before transplanting.',
      'Always split Urea application to avoid nitrogen leeching during rainy days.',
      'Soil test recommendations from DAE (Department of Agricultural Extension) supersede these static guidelines.',
    ],
    safetyWarnings: [
      'Wear gloves and avoid inhalation during broadcast.',
      'Keep fertilizers stored in a dry, covered space away from direct sunlight.',
    ],
  };
};