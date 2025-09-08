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
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('ARCHIMED_API_URL not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making API request to:', url);
    console.log('Request options:', { headers: this.headers, ...options });

    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Archimed API error: ${response.status} - ${errorText}`);
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
      await Promise.all([this.getServices(), this.getDoctors()]);
    } catch {
      // ignore prefetch errors
    }
  }
}

export const archimedService = new ArchimedService();
export default archimedService; 