// Certificate service for API integration
class CertificateService {
    constructor() {
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Получаем базовый URL API из переменных окружения
        this.apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    }
    /**
     * Создание сертификата и получение ссылки на оплату
     */
    async createCertificate(data) {
        try {
            const response = await fetch(`${this.apiUrl}/certificate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message ||
                    `HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error creating certificate:', error);
            throw error;
        }
    }
    /**
     * Проверка статуса платежа сертификата
     */
    async checkPaymentStatus(orderNumber) {
        try {
            const response = await fetch(`${this.apiUrl}/certificate/check-payment/${orderNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message ||
                    `HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error checking payment status:', error);
            throw error;
        }
    }
    /**
     * Разделение полного имени на имя и фамилию
     */
    parseFullName(fullName) {
        const nameParts = fullName.trim().split(' ');
        if (nameParts.length >= 2) {
            return {
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' ')
            };
        }
        else {
            return {
                firstName: nameParts[0] || '',
                lastName: ''
            };
        }
    }
    /**
     * Валидация email
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Форматирование суммы для отображения
     */
    formatAmount(amount) {
        return amount.toLocaleString('ru-RU') + ' ₽';
    }
    /**
     * Генерация уникального ID заказа
     */
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        return `cert_${timestamp}_${random}`;
    }
}
export const certificateService = new CertificateService();
export default certificateService;
