import type {
  ArchimedDoctor,
  ArchimedZone,
  ArchimedBranch,
  ArchimedCategory,
  ArchimedScientificDegree,
  ApiService,
  AppointmentData,
  ArchimedAppointment,
  AppointmentStatus
} from '../types/cms';

// Archimed API configuration
const ARCHIMED_API_URL = import.meta.env.VITE_ARCHIMED_API_URL || 'https://newapi.archimed-soft.ru/api/v5';
const ARCHIMED_API_TOKEN = import.meta.env.VITE_ARCHIMED_API_TOKEN || '';
// Some deployments don't have categories endpoint – disable to avoid 404 requests
const ARCHIMED_CATEGORIES_ENABLED = false;

// Local cache settings
const DOCTORS_CACHE_KEY = 'archimed_doctors_v1';
const SERVICES_CACHE_KEY = 'archimed_services_v1';
const DOCTORS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const SERVICES_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const DEFAULT_REQUEST_TIMEOUT_MS = 20000; // 20s

class ArchimedService {
  private baseUrl: string;
  private headers: HeadersInit;
  private servicesCache: ApiService[] = [];
  private doctorsCache: ArchimedDoctor[] = [];

  constructor() {
    this.baseUrl = ARCHIMED_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      ...(ARCHIMED_API_TOKEN && { 'Authorization': `Bearer ${ARCHIMED_API_TOKEN}` }),
    };

    // Warm caches from localStorage on startup for instant UI
    try {
      const doctorsFromStorage = this.readFromStorage<ArchimedDoctor[]>(DOCTORS_CACHE_KEY, DOCTORS_CACHE_TTL_MS);
      if (doctorsFromStorage) this.doctorsCache = doctorsFromStorage;
      const servicesFromStorage = this.readFromStorage<ApiService[]>(SERVICES_CACHE_KEY, SERVICES_CACHE_TTL_MS);
      if (servicesFromStorage) this.servicesCache = servicesFromStorage;
    } catch {
      // ignore storage errors
    }
  }

  private async request<T>(endpoint: string, options?: RequestInit & { timeoutMs?: number; suppressErrorLog?: boolean }): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('ARCHIMED_API_URL not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort('timeout'), options?.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(url, {
        headers: this.headers,
        signal: controller.signal,
        ...options,
      });
    } catch (e) {
      window.clearTimeout(timeout);
      if ((e as Error)?.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw e;
    } finally {
      window.clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (!options?.suppressErrorLog) {
        console.error('API error response:', errorText);
      }
      throw new Error(`Archimed API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  private readFromStorage<T>(key: string, ttlMs: number): T | null {
    try {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { data: T; timestamp: number };
      if (!parsed || !parsed.data || !parsed.timestamp) return null;
      const isFresh = Date.now() - parsed.timestamp < ttlMs;
      return isFresh ? parsed.data : parsed.data; // return stale data too; we'll revalidate
    } catch {
      return null;
    }
  }

  private writeToStorage<T>(key: string, data: T): void {
    try {
      if (typeof window === 'undefined') return;
      const payload = JSON.stringify({ data, timestamp: Date.now() });
      window.localStorage.setItem(key, payload);
    } catch {
      // ignore storage errors
    }
  }

  // Doctors
  async getDoctors(): Promise<ArchimedDoctor[]> {
    if (this.doctorsCache.length > 0) {
      // Revalidate in background for freshness
      this.refreshDoctors();
      return this.doctorsCache;
    }
    const fromStorage = this.readFromStorage<ArchimedDoctor[]>(DOCTORS_CACHE_KEY, DOCTORS_CACHE_TTL_MS);
    if (fromStorage && fromStorage.length > 0) {
      this.doctorsCache = fromStorage;
      // refresh in background
      this.refreshDoctors();
      return this.doctorsCache;
    }
    const data = await this.request<{ data: ArchimedDoctor[] }>('/doctors');
    this.doctorsCache = data.data || [];
    this.writeToStorage(DOCTORS_CACHE_KEY, this.doctorsCache);
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
      this.refreshServices();
      return this.servicesCache;
    }
    const fromStorage = this.readFromStorage<ApiService[]>(SERVICES_CACHE_KEY, SERVICES_CACHE_TTL_MS);
    if (fromStorage && fromStorage.length > 0) {
      this.servicesCache = fromStorage;
      this.refreshServices();
      return this.servicesCache;
    }
    const data = await this.request<{ data: ApiService[] }>('/services');
    this.servicesCache = data.data || [];
    this.writeToStorage(SERVICES_CACHE_KEY, this.servicesCache);
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
    if (!ARCHIMED_CATEGORIES_ENABLED) {
      return [] as ArchimedCategory[];
    }
    try {
      const data = await this.request<{ data: ArchimedCategory[] }>(
        '/categories',
        { suppressErrorLog: true }
      );
      return data.data;
    } catch {
      return [] as ArchimedCategory[];
    }
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

  // Background refreshers (stale-while-revalidate)
  private async refreshDoctors(): Promise<void> {
    try {
      const data = await this.request<{ data: ArchimedDoctor[] }>(
        '/doctors',
        { timeoutMs: DEFAULT_REQUEST_TIMEOUT_MS }
      );
      if (Array.isArray(data?.data) && data.data.length > 0) {
        this.doctorsCache = data.data;
        this.writeToStorage(DOCTORS_CACHE_KEY, this.doctorsCache);
      }
    } catch {
      // keep stale cache on failure
    }
  }

  private async refreshServices(): Promise<void> {
    try {
      const data = await this.request<{ data: ApiService[] }>(
        '/services',
        { timeoutMs: DEFAULT_REQUEST_TIMEOUT_MS }
      );
      if (Array.isArray(data?.data) && data.data.length > 0) {
        this.servicesCache = data.data;
        this.writeToStorage(SERVICES_CACHE_KEY, this.servicesCache);
      }
    } catch {
      // keep stale cache on failure
    }
  }

  // Appointments
  async createAppointment(appointmentData: AppointmentData): Promise<ArchimedAppointment> {
    // Если API токен не настроен, используем моковые данные для тестирования
    if (!ARCHIMED_API_TOKEN) {
      console.warn('API token not configured, using mock data for testing');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Math.floor(Math.random() * 1000),
            patient_name: appointmentData.patientName,
            patient_phone: appointmentData.patientPhone,
            patient_email: appointmentData.patientEmail,
            preferred_date: appointmentData.preferredDate,
            preferred_time: appointmentData.preferredTime,
            comments: appointmentData.comments,
            service_id: appointmentData.serviceId,
            doctor_id: appointmentData.doctorId,
            status_id: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        }, 1000);
      });
    }

    const payload = {
      patient_name: appointmentData.patientName,
      patient_phone: appointmentData.patientPhone,
      patient_email: appointmentData.patientEmail,
      preferred_date: appointmentData.preferredDate,
      preferred_time: appointmentData.preferredTime,
      comments: appointmentData.comments,
      service_id: appointmentData.serviceId,
      doctor_id: appointmentData.doctorId
    };

    return this.request<ArchimedAppointment>('/talons', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getAppointments(filters?: {
    doctorId?: number;
    serviceId?: number;
    statusId?: number;
    page?: number;
    limit?: number;
  }): Promise<{ data: ArchimedAppointment[]; total: number; page: number; limit: number }> {
    const params = new URLSearchParams();

    if (filters?.doctorId) params.append('doctor_id', filters.doctorId.toString());
    if (filters?.serviceId) params.append('service_id', filters.serviceId.toString());
    if (filters?.statusId) params.append('status_id', filters.statusId.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/talons?${queryString}` : '/talons';

    return this.request<{ data: ArchimedAppointment[]; total: number; page: number; limit: number }>(endpoint);
  }

  async getAppointment(id: number): Promise<ArchimedAppointment> {
    return this.request<ArchimedAppointment>(`/talons/${id}`);
  }

  async updateAppointment(id: number, appointmentData: Partial<AppointmentData>): Promise<ArchimedAppointment> {
    const payload = {
      patient_name: appointmentData.patientName,
      patient_phone: appointmentData.patientPhone,
      patient_email: appointmentData.patientEmail,
      preferred_date: appointmentData.preferredDate,
      preferred_time: appointmentData.preferredTime,
      comments: appointmentData.comments,
      service_id: appointmentData.serviceId,
      doctor_id: appointmentData.doctorId
    };

    // Удаляем undefined значения
    Object.keys(payload).forEach(key =>
      payload[key as keyof typeof payload] === undefined && delete payload[key as keyof typeof payload]
    );

    return this.request<ArchimedAppointment>(`/talons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async deleteAppointment(id: number): Promise<void> {
    await this.request<void>(`/talons/${id}`, {
      method: 'DELETE'
    });
  }

  // Appointment Statuses
  async getAppointmentStatuses(): Promise<AppointmentStatus[]> {
    const data = await this.request<{ data: AppointmentStatus[] }>('/talonstatuses');
    return data.data;
  }

  async getAppointmentStatus(id: number): Promise<AppointmentStatus> {
    return this.request<AppointmentStatus>(`/talonstatuses/${id}`);
  }

  async prefetchAll(): Promise<void> {
    try {
      // Warm caches quickly (from storage if available)
      void this.getServices();
      void this.getDoctors();
    } catch {
      // ignore prefetch errors
    }
  }
}

export const archimedService = new ArchimedService();
export default archimedService; 