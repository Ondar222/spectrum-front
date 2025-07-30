import React, { useState } from "react";
import paymentService from "../services/payment";

interface TestPaymentData {
  amount: number;
  description: string;
  customerEmail: string;
  customerName: string;
}

export default function PaymentTestPage() {
  const [formData, setFormData] = useState<TestPaymentData>({
    amount: 100,
    description: "Тестовый платеж",
    customerEmail: "test@example.com",
    customerName: "Тестовый пользователь",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    paymentUrl?: string;
    orderId?: string;
  } | null>(null);

  const isProduction = import.meta.env.PROD || false;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const orderId = paymentService.generateOrderId();

      const paymentData = {
        amount: formData.amount,
        currency: "RUB",
        description: formData.description,
        orderId: orderId,
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        returnUrl: `${window.location.origin}/payment-test/success?orderId=${orderId}`,
        cancelUrl: `${window.location.origin}/payment-test/cancel?orderId=${orderId}`,
      };

      const { paymentUrl, orderId: alfaOrderId } =
        await paymentService.createAppointmentPayment(paymentData);

      setResult({
        success: true,
        message: "Платеж успешно создан!",
        paymentUrl,
        orderId: alfaOrderId,
      });

      // Автоматически перенаправляем на страницу оплаты
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 2000);
    } catch (error) {
      console.error("Ошибка при создании тестового платежа:", error);
      setResult({
        success: false,
        message: `Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark mb-4">
              Тестирование платежной системы
            </h1>
            <p className="text-gray-600">
              Эта страница предназначена для тестирования интеграции с
              Альфа-Банком
            </p>

            {/* Индикатор среды */}
            <div className="mt-4">
              {isProduction ? (
                <div className="inline-block bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded-lg">
                  <span className="font-medium">🚨 ПРОДАКШН СРЕДА</span>
                  <span className="text-sm ml-2">(реальные платежи!)</span>
                </div>
              ) : (
                <div className="inline-block bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg">
                  <span className="font-medium">🧪 ТЕСТОВАЯ СРЕДА</span>
                  <span className="text-sm ml-2">(платежи не списываются)</span>
                </div>
              )}
            </div>
          </div>

          {/* Test Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-dark mb-6">
              Создать тестовый платеж
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-gray-700 mb-2">
                  Сумма (рубли)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-2"
                >
                  Описание
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="customerName"
                  className="block text-gray-700 mb-2"
                >
                  Имя клиента
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="customerEmail"
                  className="block text-gray-700 mb-2"
                >
                  Email клиента
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? "Создание платежа..."
                  : "Создать тестовый платеж"}
              </button>
            </form>

            {/* Result */}
            {result && (
              <div className="mt-6 p-4 rounded-lg border">
                {result.success ? (
                  <div className="bg-green-50 border-green-200 text-green-800">
                    <h3 className="font-medium mb-2">✅ Успешно!</h3>
                    <p className="text-sm mb-2">{result.message}</p>
                    {result.orderId && (
                      <p className="text-sm">Order ID: {result.orderId}</p>
                    )}
                    {result.paymentUrl && (
                      <p className="text-sm">
                        Перенаправление на страницу оплаты...
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-50 border-red-200 text-red-800">
                    <h3 className="font-medium mb-2">❌ Ошибка!</h3>
                    <p className="text-sm">{result.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Test Cards Info */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-semibold text-dark mb-4">
              Тестовые карты для оплаты
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-dark mb-2">Успешная оплата:</h4>
                <p className="text-sm text-gray-600">
                  <strong>Номер:</strong> 4111 1111 1111 1111
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Срок действия:</strong> 12/25
                </p>
                <p className="text-sm text-gray-600">
                  <strong>CVV:</strong> 123
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-dark mb-2">
                  Отклоненная оплата:
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Номер:</strong> 4444 4444 4444 4444
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Срок действия:</strong> 12/25
                </p>
                <p className="text-sm text-gray-600">
                  <strong>CVV:</strong> 123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
