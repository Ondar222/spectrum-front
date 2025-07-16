import { 
  Doctor, 
  Service, 
  Review, 
  News, 
  Promotion, 
  FAQ, 
  Contact, 
  ClinicInfo,
  DirectusResponse,
  DirectusListResponse 
} from '../types/cms';

// Directus API configuration
const DIRECTUS_URL = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.REACT_APP_DIRECTUS_TOKEN || '';

class DirectusService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = DIRECTUS_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
    };
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}/items/${endpoint}`;
    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status}`);
    }

    return response.json();
  }

  // Doctors
  async getDoctors(): Promise<DirectusListResponse<Doctor>> {
    return this.request<DirectusListResponse<Doctor>>('doctors?sort=name');
  }

  async getDoctor(id: string): Promise<DirectusResponse<Doctor>> {
    return this.request<DirectusResponse<Doctor>>(`doctors/${id}`);
  }

  // Services
  async getServices(): Promise<DirectusListResponse<Service>> {
    return this.request<DirectusListResponse<Service>>('services?sort=title');
  }

  async getService(id: string): Promise<DirectusResponse<Service>> {
    return this.request<DirectusResponse<Service>>(`services/${id}`);
  }

  async getPopularServices(): Promise<DirectusListResponse<Service>> {
    return this.request<DirectusListResponse<Service>>('services?filter[is_popular][_eq]=true&sort=title');
  }

  // Reviews
  async getReviews(): Promise<DirectusListResponse<Review>> {
    return this.request<DirectusListResponse<Review>>('reviews?sort=-date&filter[is_verified][_eq]=true');
  }

  async getDoctorReviews(doctorId: string): Promise<DirectusListResponse<Review>> {
    return this.request<DirectusListResponse<Review>>(`reviews?filter[doctor_id][_eq]=${doctorId}&sort=-date&filter[is_verified][_eq]=true`);
  }

  // News
  async getNews(): Promise<DirectusListResponse<News>> {
    return this.request<DirectusListResponse<News>>('news?sort=-date');
  }

  async getNewsArticle(id: string): Promise<DirectusResponse<News>> {
    return this.request<DirectusResponse<News>>(`news/${id}`);
  }

  // Promotions
  async getPromotions(): Promise<DirectusListResponse<Promotion>> {
    return this.request<DirectusListResponse<Promotion>>('promotions?filter[is_active][_eq]=true&sort=-date_created');
  }

  // FAQ
  async getFAQ(): Promise<DirectusListResponse<FAQ>> {
    return this.request<DirectusListResponse<FAQ>>('faq?sort=order');
  }

  async getFAQByCategory(category: string): Promise<DirectusListResponse<FAQ>> {
    return this.request<DirectusListResponse<FAQ>>(`faq?filter[category][_eq]=${category}&sort=order`);
  }

  // Contacts
  async getContacts(): Promise<DirectusListResponse<Contact>> {
    return this.request<DirectusListResponse<Contact>>('contacts?sort=order');
  }

  // Clinic Info
  async getClinicInfo(): Promise<DirectusResponse<ClinicInfo>> {
    return this.request<DirectusResponse<ClinicInfo>>('clinic_info');
  }

  // Submit contact form
  async submitContactForm(data: {
    name: string;
    phone: string;
    email: string;
    message: string;
  }): Promise<void> {
    return this.request<void>('contact_submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Submit appointment request
  async submitAppointment(data: {
    name: string;
    phone: string;
    email: string;
    service_id?: string;
    doctor_id?: string;
    preferred_date?: string;
    message?: string;
  }): Promise<void> {
    return this.request<void>('appointment_requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const directusService = new DirectusService();
export default directusService; 