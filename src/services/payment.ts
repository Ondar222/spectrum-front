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

class PaymentService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_PAYMENT_API_URL || '';
    this.apiKey = import.meta.env.VITE_PAYMENT_API_KEY || '';
  }

  // Создание платежа для подарочного сертификата
  async createCertificatePayment(data: CertificatePaymentData): Promise<{ paymentUrl: string; orderId: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/payments/certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: data.currency,
          description: `Подарочный сертификат на сумму ${data.amount} ₽`,
          orderId: data.orderId,
          customerEmail: data.senderEmail,
          customerName: data.senderName,
          returnUrl: data.returnUrl,
          cancelUrl: data.cancelUrl,
          metadata: {
            recipientName: data.recipientName,
            recipientEmail: data.recipientEmail,
            senderName: data.senderName,
            senderEmail: data.senderEmail,
            message: data.message,
            type: 'gift_certificate'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment API error: ${response.status}`);
      }

      const result = await response.json();
      return {
        paymentUrl: result.paymentUrl,
        orderId: result.orderId
      };
    } catch (error) {
      console.error('Error creating certificate payment:', error);
      throw error;
    }
  }

  // Проверка статуса платежа
  async checkPaymentStatus(orderId: string): Promise<{ status: string; paid: boolean }> {
    try {
      const response = await fetch(`${this.apiUrl}/payments/${orderId}/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Payment status check error: ${response.status}`);
      }

      const result = await response.json();
      return {
        status: result.status,
        paid: result.status === 'paid'
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }

  // Создание платежа для записи на прием
  async createAppointmentPayment(data: PaymentData): Promise<{ paymentUrl: string; orderId: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/payments/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: data.currency,
          description: data.description,
          orderId: data.orderId,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          returnUrl: data.returnUrl,
          cancelUrl: data.cancelUrl,
          metadata: {
            type: 'appointment'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment API error: ${response.status}`);
      }

      const result = await response.json();
      return {
        paymentUrl: result.paymentUrl,
        orderId: result.orderId
      };
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

  // Форматирование суммы для отображения
  formatAmount(amount: number): string {
    return amount.toLocaleString('ru-RU') + ' ₽';
  }
}

export const paymentService = new PaymentService();
export default paymentService; 