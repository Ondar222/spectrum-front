// Types for Directus CMS integration

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  education: string;
  description: string;
  image: string;
  services: string[];
  schedule: string;
  rating: number;
  reviews_count: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  is_popular: boolean;
}

// Real API service types
export interface ApiService {
  id: number;
  kind: number;
  code: string;
  name: string;
  altcode: string;
  altname: string;
  barcode: string;
  info: string;
  group_name: string;
  group_id: number;
  mz_code: string;
  cito_cost: number;
  duration: number;
  base_cost: number;
  purchase_price: number;
  denomination: number;
  unit_id: number | null;
  unit: string | null;
}

export interface ServiceGroup {
  id: number;
  name: string;
  services: ApiService[];
}

export interface Review {
  id: string;
  patient_name: string;
  doctor_id?: string;
  service_id?: string;
  rating: number;
  comment: string;
  date: string;
  is_verified: boolean;
}

export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  valid_until: string;
  image: string;
  conditions: string;
  is_active: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Contact {
  id: string;
  type: 'phone' | 'email' | 'address';
  value: string;
  label: string;
  is_primary: boolean;
}

export interface ClinicInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  working_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  logo: string;
  about_text: string;
  advantages: string[];
}

// API Response types
export interface DirectusResponse<T> {
  data: T;
  meta?: {
    total_count?: number;
    filter_count?: number;
  };
}

export interface DirectusListResponse<T> {
  data: T[];
  meta?: {
    total_count?: number;
    filter_count?: number;
  };
} 