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
  private servicesCache: ApiService[] = [];
  private doctorsCache: ArchimedDoctor[] = [];

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
    if (this.doctorsCache.length > 0) {
      return this.doctorsCache;
    }
    const data = await this.request<{ data: ArchimedDoctor[] }>('/doctors');
    this.doctorsCache = data.data || [];
    return this.doctorsCache;
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
    if (this.servicesCache.length > 0) {
      return this.servicesCache;
    }
    const data = await this.request<{ data: ApiService[] }>('/services');
    this.servicesCache = data.data || [];
    return this.servicesCache;
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

  // Cache helpers
  getServicesCache(): ApiService[] {
    return this.servicesCache;
  }

  getDoctorsCache(): ArchimedDoctor[] {
    return this.doctorsCache;
  }

  async prefetchAll(): Promise<void> {
    try {
      await Promise.all([this.getServices(), this.getDoctors()]);
    } catch {
      // ignore prefetch errors
    }
  }
}

export const archimedService = new ArchimedService();
export default archimedService; 