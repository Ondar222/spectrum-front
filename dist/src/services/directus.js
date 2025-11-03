// Directus API configuration
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN || '';
class DirectusService {
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
        this.baseUrl = DIRECTUS_URL;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        };
    }
    async request(endpoint, options) {
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
    // Mock services for development
    getMockServices() {
        return [
            {
                id: 11000,
                kind: 0,
                code: "11-10-001",
                name: "Общий анализ крови (CBC/Diff - 5 фракций лейкоцитов)",
                altcode: "11-10-001",
                altname: "Общий анализ крови (CBC/Diff - 5 фракций лейкоцитов)",
                barcode: "",
                info: "Включает определение гемоглобина, эритроцитов, лейкоцитов, тромбоцитов и лейкоцитарной формулы",
                group_name: "Лабораторные исследования",
                group_id: 1002,
                mz_code: "",
                cito_cost: 0,
                duration: 0,
                base_cost: 470,
                purchase_price: 0,
                denomination: 0,
                unit_id: null,
                unit: null
            },
            {
                id: 11001,
                kind: 0,
                code: "11-10-002",
                name: "Биохимический анализ крови",
                altcode: "11-10-002",
                altname: "Биохимический анализ крови",
                barcode: "",
                info: "Определение глюкозы, холестерина, креатинина, мочевины и других показателей",
                group_name: "Лабораторные исследования",
                group_id: 1002,
                mz_code: "",
                cito_cost: 800,
                duration: 0,
                base_cost: 650,
                purchase_price: 0,
                denomination: 0,
                unit_id: null,
                unit: null
            },
            {
                id: 12000,
                kind: 0,
                code: "12-01-001",
                name: "Консультация терапевта",
                altcode: "12-01-001",
                altname: "Консультация терапевта",
                barcode: "",
                info: "Первичная консультация врача-терапевта с осмотром и назначением лечения",
                group_name: "Консультации специалистов",
                group_id: 1003,
                mz_code: "",
                cito_cost: 0,
                duration: 30,
                base_cost: 1500,
                purchase_price: 0,
                denomination: 0,
                unit_id: null,
                unit: null
            },
            {
                id: 12001,
                kind: 0,
                code: "12-01-002",
                name: "Консультация кардиолога",
                altcode: "12-01-002",
                altname: "Консультация кардиолога",
                barcode: "",
                info: "Консультация врача-кардиолога с ЭКГ и расшифровкой",
                group_name: "Консультации специалистов",
                group_id: 1003,
                mz_code: "",
                cito_cost: 2500,
                duration: 45,
                base_cost: 2000,
                purchase_price: 0,
                denomination: 0,
                unit_id: null,
                unit: null
            },
            {
                id: 13000,
                kind: 0,
                code: "13-01-001",
                name: "УЗИ брюшной полости",
                altcode: "13-01-001",
                altname: "УЗИ брюшной полости",
                barcode: "",
                info: "Ультразвуковое исследование органов брюшной полости",
                group_name: "Ультразвуковая диагностика",
                group_id: 1004,
                mz_code: "",
                cito_cost: 0,
                duration: 30,
                base_cost: 2000,
                purchase_price: 0,
                denomination: 0,
                unit_id: null,
                unit: null
            },
            {
                id: 13001,
                kind: 0,
                code: "13-01-002",
                name: "УЗИ сердца",
                altcode: "13-01-002",
                altname: "Эхокардиография",
                barcode: "",
                info: "Ультразвуковое исследование сердца с допплерографией",
                group_name: "Ультразвуковая диагностика",
                group_id: 1004,
                mz_code: "",
                cito_cost: 0,
                duration: 45,
                base_cost: 2500,
                purchase_price: 0,
                denomination: 0,
                unit_id: null,
                unit: null
            }
        ];
    }
    // Doctors
    async getDoctors() {
        return this.request('doctors?sort=name');
    }
    async getDoctor(id) {
        return this.request(`doctors/${id}`);
    }
    // Services (legacy - for other components)
    async getServicesLegacy() {
        return this.request('services?sort=title');
    }
    async getService(id) {
        return this.request(`services/${id}`);
    }
    async getPopularServices() {
        return this.request('services?filter[is_popular][_eq]=true&sort=title');
    }
    // Reviews
    async getReviews() {
        return this.request('reviews?sort=-date&filter[is_verified][_eq]=true');
    }
    async getDoctorReviews(doctorId) {
        return this.request(`reviews?filter[doctor_id][_eq]=${doctorId}&sort=-date&filter[is_verified][_eq]=true`);
    }
    // News
    async getNews() {
        return this.request('news?sort=-date');
    }
    async getNewsArticle(id) {
        return this.request(`news/${id}`);
    }
    // Promotions
    async getPromotions() {
        return this.request('promotions?filter[is_active][_eq]=true&sort=-date_created');
    }
    // FAQ
    async getFAQ() {
        return this.request('faq?sort=order');
    }
    async getFAQByCategory(category) {
        return this.request(`faq?filter[category][_eq]=${category}&sort=order`);
    }
    // Contacts
    async getContacts() {
        return this.request('contacts?sort=order');
    }
    // Clinic Info
    async getClinicInfo() {
        return this.request('clinic_info');
    }
    // Submit contact form
    async submitContactForm(data) {
        return this.request('contact_submissions', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    // Submit appointment request
    async submitAppointment(data) {
        return this.request('appointment_requests', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}
export const directusService = new DirectusService();
export default directusService;
