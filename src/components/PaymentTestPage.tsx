import React, { useState } from "react";
import paymentService from "../services/payment";

export default function PaymentTestPage() {
  const [amount, setAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleTestPayment = async () => {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const testData = {
        amount: amount,
        currency: "RUB",
        description: `Тестовый платеж на сумму ${amount} ₽`,
        orderId: paymentService.generateOrderId(),
        customerEmail: "test@example.com",
        customerName: "Тестовый пользователь",
        returnUrl: `${window.location.origin}/certificates/success?orderId=test`,
        cancelUrl: `${window.location.origin}/certificates/cancel?orderId=test`,
        recipientName: "Тестовый получатель",
        recipientEmail: "recipient@example.com",
        senderName: "Тестовый отправитель",
        senderEmail: "sender@example.com",
        message: "Тестовое сообщение",
      };

      const response = await paymentService.createCertificatePayment(testData);
      setResult(response);
    } catch (error) {
      console.error("Ошибка тестирования:", error);
      setError(error instanceof Error ? error.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestStatus = async () => {
    if (!result?.orderId) {
      setError("Сначала создайте платеж");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const status = await paymentService.checkPaymentStatus(result.orderId);
      setResult({ ...result, status });
    } catch (error) {
      console.error("Ошибка проверки статуса:", error);
      setError(error instanceof Error ? error.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-dark mb-6">
            Тестирование платежной системы
          </h1>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Сумма (рубли)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                min="100"
                step="100"
              />
            </div>

            <button
              onClick={handleTestPayment}
              disabled={isLoading}
              className={`w-full bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Тестирование..." : "Создать тестовый платеж"}
            </button>

            {result?.orderId && (
              <button
                onClick={handleTestStatus}
                disabled={isLoading}
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Проверка..." : "Проверить статус"}
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-dark mb-2">Результат:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
