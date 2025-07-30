// Payment service for gift certificates and other payments

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface CertificatePaymentData extends PaymentData {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message?: string;
}

export interface AlfaBankPaymentResponse {
  formUrl: string;
  orderId: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface AlfaBankOrderStatus {
  orderStatus: number;
  orderNumber: string;
  pan: string;
  expiration: string;
  cardholderName: string;
  amount: number;
  currency: number;
  approvalCode: string;
  ip: string;
  date: number;
  errorCode?: string;
  errorMessage?: string;
}

class PaymentService {
  private apiUrl: string;
  private apiKey: string;
  private alfaBankUrl: string;
  private alfaBankToken: string;
  private alfaBankLogin: string;
  private alfaBankPassword: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_PAYMENT_API_URL || '';
    this.apiKey = import.meta.env.VITE_PAYMENT_API_KEY || '';
    
    // Определяем среду
    const isProduction = import.meta.env.PROD || false;
    
    if (isProduction) {
      // Продакшн среда
      this.alfaBankUrl = 'https://pay.alfabank.ru/payment/rest';
      this.alfaBankToken = 'pfcr5js74l5jnsqcsrms960nok';
      this.alfaBankLogin = 'clinicaldan-operator';
      this.alfaBankPassword = 'vy_$2BTVD*KVD#u/';
    } else {
      // Тестовая среда
      this.alfaBankUrl = 'https://alfa.rbsuat.com/payment/rest';
      this.alfaBankToken = 'pfcr5js74l5jnsqcsrms960nok';
      this.alfaBankLogin = 'clinicaldan-operator';
      this.alfaBankPassword = 'KACr2LiW3R?';
    }
    
    console.log(`🔗 Платежный сервис инициализирован в ${isProduction ? 'ПРОДАКШН' : 'ТЕСТОВОЙ'} среде`);
    console.log(`🌐 URL Альфа-Банка: ${this.alfaBankUrl}`);
  }

  // Создание платежа через Альфа-Банк
  async createAlfaBankPayment(data: CertificatePaymentData): Promise<AlfaBankPaymentResponse> {
    try {
      const orderNumber = this.generateOrderNumber();
      
      const requestData = {
        amount: data.amount,
        returnUrl: data.returnUrl,
        failUrl: data.cancelUrl,
        description: data.description
      };

      // Используем наш прокси-сервер для обхода CORS
      const proxyUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${proxyUrl}/api/payment/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Payment API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`Payment error: ${result.errorMessage || result.errorCode}`);
      }

      return {
        formUrl: result.formUrl,
        orderId: result.orderId
      };
    } catch (error) {
      console.error('Error creating Alfa Bank payment:', error);
      throw error;
    }
  }

  // Проверка статуса заказа через Альфа-Банк
  async checkAlfaBankOrderStatus(orderId: string): Promise<AlfaBankOrderStatus> {
    try {
      const requestData = {
        orderId: orderId
      };

      // Используем наш прокси-сервер для обхода CORS
      const proxyUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${proxyUrl}/api/payment/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Payment status check error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`Payment error: ${result.errorMessage || result.errorCode}`);
      }

      return result;
    } catch (error) {
      console.error('Error checking Alfa Bank order status:', error);
      throw error;
    }
  }

  // Создание платежа для подарочного сертификата (обновленная версия)
  async createCertificatePayment(data: CertificatePaymentData): Promise<{ paymentUrl: string; orderId: string }> {
    try {
      // Используем Альфа-Банк для создания платежа
      const result = await this.createAlfaBankPayment(data);
      return {
        paymentUrl: result.formUrl,
        orderId: result.orderId
      };
    } catch (error) {
      console.error('Error creating certificate payment:', error);
      throw error;
    }
  }

  // Проверка статуса платежа (обновленная версия)
  async checkPaymentStatus(orderId: string): Promise<{ status: string; paid: boolean }> {
    try {
      const result = await this.checkAlfaBankOrderStatus(orderId);
      
      // Статусы Альфа-Банка:
      // 0 - заказ зарегистрирован, но не оплачен
      // 1 - предавторизованная сумма захолдирована
      // 2 - проведена полная авторизация суммы заказа
      // 3 - авторизация отменена
      // 4 - по транзакции была проведена операция возврата
      // 5 - инициирована авторизация через ACS банка-эмитента
      // 6 - авторизация отклонена
      
      const isPaid = result.orderStatus === 2;
      const status = isPaid ? 'paid' : 'pending';
      
      return {
        status,
        paid: isPaid
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }

  // Создание платежа для записи на прием
  async createAppointmentPayment(data: PaymentData): Promise<{ paymentUrl: string; orderId: string }> {
    try {
      const certificateData: CertificatePaymentData = {
        ...data,
        recipientName: data.customerName,
        recipientEmail: data.customerEmail,
        senderName: data.customerName,
        senderEmail: data.customerEmail,
        message: ''
      };
      
      return await this.createCertificatePayment(certificateData);
    } catch (error) {
      console.error('Error creating appointment payment:', error);
      throw error;
    }
  }

  // Генерация уникального ID заказа
  generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `order_${timestamp}_${random}`;
  }

  // Генерация номера заказа для Альфа-Банка
  generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `cert_${timestamp}_${random}`;
  }

  // Форматирование суммы для отображения
  formatAmount(amount: number): string {
    return amount.toLocaleString('ru-RU') + ' ₽';
  }
}

export const paymentService = new PaymentService();
export default paymentService; 