export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  avatarUrl: string;
  rating: number;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Contract for future FastAPI response structures
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}