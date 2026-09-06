// Contract setup for future FastAPI backend integration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

// Prepared API endpoints signature
export const AgricultureService = {
  getDiseaseDiagnosis: (imageBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', imageBlob);
    return fetch(`${BASE_URL}/predict/disease`, { method: 'POST', body: formData });
  },
  getWeatherForecast: (lat: number, lon: number) => {
    return apiClient(`/weather?lat=${lat}&lon=${lon}`);
  },
};