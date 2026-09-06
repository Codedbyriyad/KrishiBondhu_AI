// API client for FastAPI backend

const BASE_URL =
  import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const AgricultureService = {
  // AI Chat
  chat: async (message: string, imageBase64?: string) => {
    const res = await apiClient<{ reply?: string; response?: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        image_base64: imageBase64,
      }),
    });
    const replyText = res.reply || res.response || 'পরামর্শ প্রক্রিয়া করা হয়েছে।';
    return {
      reply: replyText,
      response: replyText,
    };
  },

  // Disease Diagnosis
  predictDisease: async (imageFile: File | string) => {
    let base64String = '';
    if (typeof imageFile === 'string') {
      base64String = imageFile;
    } else {
      base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(imageFile);
      });
    }

    return apiClient<any>('/predict/disease', {
      method: 'POST',
      body: JSON.stringify({
        imageBase64: base64String,
        image_base64: base64String,
        image: base64String,
      }),
    });
  },

  getDiseaseDiagnosis: (imageBlob: Blob) => {
    const formData = new FormData();

    formData.append('file', imageBlob);

    return fetch(`${BASE_URL}/predict/disease`, {
      method: 'POST',
      body: formData,
    });
  },

  // Weather
  getWeatherForecast: (district?: string, lat?: number, lon?: number) => {
    const params = new URLSearchParams();
    if (district) params.append('district', district);
    if (lat !== undefined) params.append('lat', lat.toString());
    if (lon !== undefined) params.append('lon', lon.toString());

    return apiClient<any>(`/weather?${params.toString()}`);
  },

  // Fertilizer Calculator & Soil Health
  calculateFertilizer: (payload: {
    cropType: string;
    landArea: number;
    landUnit: string;
    soilType?: string;
    currentStage?: string;
  }) => {
    return apiClient<any>('/fertilizer', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};