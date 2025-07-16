import { 
  ArchimedDoctor, 
  ArchimedZone, 
  ArchimedBranch, 
  ArchimedCategory, 
  ArchimedScientificDegree,
  ApiService 
} from '../types/cms';

// Archimed API configuration
const ARCHIMED_API_URL = import.meta.env.VITE_ARCHIMED_API_URL || '';
const ARCHIMED_API_TOKEN = import.meta.env.VITE_ARCHIMED_API_TOKEN || '';

class ArchimedService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = ARCHIMED_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ARCHIMED_API_TOKEN}`,
    };
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('ARCHIMED_API_URL not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Archimed API error: ${response.status}`);
    }

    return response.json();
  }

  // Doctors
  async getDoctors(): Promise<ArchimedDoctor[]> {
    const data = await this.request<{ data: ArchimedDoctor[] }>('/doctors');
    return data.data;
  }

  async getDoctor(id: number): Promise<ArchimedDoctor> {
    return this.request<ArchimedDoctor>(`/doctors/${id}`);
  }

  async getDoctorsByBranch(branchId: number): Promise<ArchimedDoctor[]> {
    const data = await this.request<{ data: ArchimedDoctor[] }>(`/doctors?branch_id=${branchId}`);
    return data.data;
  }

  async getDoctorsByType(typeId: number): Promise<ArchimedDoctor[]> {
    const data = await this.request<{ data: ArchimedDoctor[] }>(`/doctors?type_id=${typeId}`);
    return data.data;
  }

  // Services (from Archimed)
  async getServices(): Promise<ApiService[]> {
    const data = await this.request<{ data: ApiService[] }>('/services');
    return data.data;
  }

  async getServicesByGroup(groupId: number): Promise<ApiService[]> {
    const data = await this.request<{ data: ApiService[] }>(`/services?group_id=${groupId}`);
    return data.data;
  }

  // Zones
  async getZones(): Promise<ArchimedZone[]> {
    const data = await this.request<{ data: ArchimedZone[] }>('/zones');
    return data.data;
  }

  // Branches
  async getBranches(): Promise<ArchimedBranch[]> {
    const data = await this.request<{ data: ArchimedBranch[] }>('/branches');
    return data.data;
  }

  // Categories
  async getCategories(): Promise<ArchimedCategory[]> {
    const data = await this.request<{ data: ArchimedCategory[] }>('/categories');
    return data.data;
  }

  // Scientific Degrees
  async getScientificDegrees(): Promise<ArchimedScientificDegree[]> {
    const data = await this.request<{ data: ArchimedScientificDegree[] }>('/scientific_degrees');
    return data.data;
  }


}

export const archimedService = new ArchimedService();
export default archimedService; 