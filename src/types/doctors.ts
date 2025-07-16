export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string | null;
  title: string | null;
  description: string | null;
  tags: string | null;
  language: string | null;
  tfa_secret: string | null;
  status: string;
  token: string | null;
  last_access: string;
  last_page: string;
  provider: string;
  external_identifier: string | null;
  auth_data: string | null;
  email_notifications: boolean;
  appearance: string | null;
  theme_dark: string | null;
  theme_light: string | null;
  theme_light_overrides: string | null;
  theme_dark_overrides: string | null;
  avatar: string | null;
  role: {
    id: string;
    name: string;
    icon: string;
    description: string;
    parent: string | null;
    children: string[];
    policies: string[];
    users: string[];
  };
  policies: string[];
}

export interface Education {
  id: number;
  name: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface EducationRelation {
  id: number;
  doctors_id: DoctorsApiResponseItem;
  education_id: Education;
}

export interface LanguageRelation {
  id: number;
  doctors_id: DoctorsApiResponseItem;
  languages_id: Language;
}

export interface DoctorsApiResponseItem {
  id: number;
  date_created: string;
  date_updated: string | null;
  description: string;
  experience: number;
  specialty: string;
  rating: number;
  price: number;
  name: string;
  user_created: User;
  user_updated: User | null;
  image: string | null;
  education: EducationRelation[];
  languages: LanguageRelation[];
}

export interface DoctorsApiResponse {
  data: DoctorsApiResponseItem[];
} 