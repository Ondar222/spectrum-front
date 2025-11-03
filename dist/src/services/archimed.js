import { customServices } from '../data/customPriceList';
import { mockBranches } from '../data/mockDoctors';
import { customDoctors } from '../data/customDoctors';
// Archimed API configuration
const ARCHIMED_API_URL = import.meta.env.VITE_ARCHIMED_API_URL || 'https://newapi.archimed-soft.ru/api/v5';
const ARCHIMED_API_TOKEN = import.meta.env.VITE_ARCHIMED_API_TOKEN || '';
console.log('Environment variables:');
console.log('VITE_ARCHIMED_API_URL:', import.meta.env.VITE_ARCHIMED_API_URL);
console.log('VITE_ARCHIMED_API_TOKEN:', import.meta.env.VITE_ARCHIMED_API_TOKEN);
console.log('Final ARCHIMED_API_URL:', ARCHIMED_API_URL);
console.log('Final ARCHIMED_API_TOKEN:', ARCHIMED_API_TOKEN);
// Some deployments don't have categories endpoint – disable to avoid 404 requests
const ARCHIMED_CATEGORIES_ENABLED = false;
// Local cache settings
const DOCTORS_CACHE_KEY = 'archimed_doctors_v2_custom';
const SERVICES_CACHE_KEY = 'archimed_services_v2_custom';
const DOCTORS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const SERVICES_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const DEFAULT_REQUEST_TIMEOUT_MS = 20000; // 20s
class ArchimedService {
    constructor() {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "servicesCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "doctorsCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.baseUrl = ARCHIMED_API_URL;
        this.headers = {
            'Content-Type': 'application/json',
            ...(ARCHIMED_API_TOKEN && { 'Authorization': `Bearer ${ARCHIMED_API_TOKEN}` }),
        };
        console.log('ArchimedService constructor, API URL:', this.baseUrl);
        console.log('API Token configured:', !!ARCHIMED_API_TOKEN);
        // Warm caches from localStorage on startup for instant UI
        try {
            const doctorsFromStorage = this.readFromStorage(DOCTORS_CACHE_KEY, DOCTORS_CACHE_TTL_MS);
            if (doctorsFromStorage) {
                console.log('Loaded doctors from storage:', doctorsFromStorage.length);
                this.doctorsCache = doctorsFromStorage;
            }
            const servicesFromStorage = this.readFromStorage(SERVICES_CACHE_KEY, SERVICES_CACHE_TTL_MS);
            if (servicesFromStorage) {
                console.log('Loaded services from storage:', servicesFromStorage.length);
                this.servicesCache = servicesFromStorage;
            }
        }
        catch (error) {
            console.log('Storage error:', error);
        }
    }
    async request(endpoint, options) {
        if (!this.baseUrl) {
            throw new Error('ARCHIMED_API_URL not configured');
        }
        const url = `${this.baseUrl}${endpoint}`;
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort('timeout'), options?.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS);
        let response;
        try {
            response = await fetch(url, {
                headers: this.headers,
                signal: controller.signal,
                ...options,
            });
        }
        catch (e) {
            window.clearTimeout(timeout);
            if (e?.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw e;
        }
        finally {
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
    readFromStorage(key, ttlMs) {
        try {
            if (typeof window === 'undefined')
                return null;
            const raw = window.localStorage.getItem(key);
            if (!raw)
                return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.data || !parsed.timestamp)
                return null;
            const isFresh = Date.now() - parsed.timestamp < ttlMs;
            return isFresh ? parsed.data : parsed.data; // return stale data too; we'll revalidate
        }
        catch {
            return null;
        }
    }
    writeToStorage(key, data) {
        try {
            if (typeof window === 'undefined')
                return;
            const payload = JSON.stringify({ data, timestamp: Date.now() });
            window.localStorage.setItem(key, payload);
        }
        catch {
            // ignore storage errors
        }
    }
    // Doctors
    async getDoctors() {
        console.log('getDoctors called - returning custom doctors list');
        this.doctorsCache = customDoctors;
        this.writeToStorage(DOCTORS_CACHE_KEY, this.doctorsCache);
        return this.doctorsCache;
    }
    async getDoctor(id) {
        return this.request(`/doctors/${id}`);
    }
    async getDoctorsByBranch(branchId) {
        const data = await this.request(`/doctors?branch_id=${branchId}`);
        return data.data;
    }
    async getDoctorsByType(typeId) {
        const data = await this.request(`/doctors?type_id=${typeId}`);
        return data.data;
    }
    // Services (from Archimed)
    async getServices() {
        // Always return custom educational price list
        this.servicesCache = customServices;
        this.writeToStorage(SERVICES_CACHE_KEY, this.servicesCache);
        return this.servicesCache;
    }
    async getService(id) {
        return this.request(`/services/${id}`);
    }
    async getServicesByGroup(groupId) {
        try {
            const response = await this.request(`/services?group_id=${groupId}`);
            return response.data || [];
        }
        catch (error) {
            console.warn('API недоступен для услуг группы, возвращаем пустой массив:', error);
            return [];
        }
    }
    // Zones
    async getZones() {
        try {
            const response = await this.request('/zones');
            return response.data || [];
        }
        catch (error) {
            console.warn('API недоступен для зон, возвращаем пустой массив:', error);
            return [];
        }
    }
    // Branches
    async getBranches() {
        try {
            const response = await this.request('/branchs');
            return response.data || [];
        }
        catch (error) {
            console.warn('API недоступен, используем моковые данные для филиалов:', error);
            return mockBranches;
        }
    }
    // Categories
    async getCategories() {
        if (!ARCHIMED_CATEGORIES_ENABLED) {
            return [];
        }
        try {
            const response = await this.request('/categories', { suppressErrorLog: true });
            return response.data || [];
        }
        catch {
            return [];
        }
    }
    // Scientific Degrees
    async getScientificDegrees() {
        try {
            const response = await this.request('/scientific_degrees');
            return response.data || [];
        }
        catch (error) {
            console.warn('API недоступен для научных степеней, возвращаем пустой массив:', error);
            return [];
        }
    }
    // Cache helpers
    getServicesCache() {
        return this.servicesCache;
    }
    getDoctorsCache() {
        return this.doctorsCache;
    }
    // Background refreshers (stale-while-revalidate)
    async refreshDoctors() {
        try {
            const response = await this.request('/doctors', { timeoutMs: DEFAULT_REQUEST_TIMEOUT_MS });
            if (Array.isArray(response?.data) && response.data.length > 0) {
                this.doctorsCache = response.data;
                this.writeToStorage(DOCTORS_CACHE_KEY, this.doctorsCache);
            }
        }
        catch {
            // keep stale cache on failure
        }
    }
    async refreshServices() {
        try {
            const response = await this.request('/services', { timeoutMs: DEFAULT_REQUEST_TIMEOUT_MS });
            if (Array.isArray(response?.data) && response.data.length > 0) {
                this.servicesCache = response.data;
                this.writeToStorage(SERVICES_CACHE_KEY, this.servicesCache);
            }
        }
        catch {
            // keep stale cache on failure
        }
    }
    // Appointments
    async createAppointment(appointmentData) {
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
        return this.request('/talons', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }
    async getAppointments(filters) {
        try {
            const params = new URLSearchParams();
            if (filters?.doctorId)
                params.append('doctor_id', filters.doctorId.toString());
            if (filters?.serviceId)
                params.append('service_id', filters.serviceId.toString());
            if (filters?.statusId)
                params.append('status_id', filters.statusId.toString());
            if (filters?.page)
                params.append('page', filters.page.toString());
            if (filters?.limit)
                params.append('limit', filters.limit.toString());
            const queryString = params.toString();
            const endpoint = queryString ? `/talons?${queryString}` : '/talons';
            return await this.request(endpoint);
        }
        catch (error) {
            console.warn('API недоступен для записей на прием:', error);
            return { data: [], total: 0, page: 1, limit: 100 };
        }
    }
    async getAppointment(id) {
        return this.request(`/talons/${id}`);
    }
    async updateAppointment(id, appointmentData) {
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
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
        return this.request(`/talons/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    }
    async deleteAppointment(id) {
        await this.request(`/talons/${id}`, {
            method: 'DELETE'
        });
    }
    // Appointment Statuses
    async getAppointmentStatuses() {
        try {
            const response = await this.request('/talonstatuses');
            return response.data || [];
        }
        catch (error) {
            console.warn('API недоступен для статусов записей, возвращаем пустой массив:', error);
            return [];
        }
    }
    async getAppointmentStatus(id) {
        try {
            return await this.request(`/talonstatuses/${id}`);
        }
        catch (error) {
            console.warn('API недоступен для статуса записи:', error);
            throw error;
        }
    }
    async prefetchAll() {
        try {
            // Warm caches quickly (from storage if available)
            void this.getServices();
            void this.getDoctors();
        }
        catch {
            // ignore prefetch errors
        }
    }
}
export const archimedService = new ArchimedService();
export default archimedService;
