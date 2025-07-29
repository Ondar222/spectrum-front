import React, { useState } from "react";
import paymentService from "../services/payment";

export default function PaymentTestPage() {
  const [amount, setAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleTestPayment = async () => {
    setIsLoading(true);
    setError("");
    setResult(null);
    setLogs([]);

    try {
      addLog("=== ТЕСТИРОВАНИЕ ПЛАТЕЖНОЙ СИСТЕМЫ ===");
      addLog(`Создаем тестовый платеж на сумму ${amount} ₽`);

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

      addLog("Отправляем запрос на создание платежа...");
      addLog(`Order ID: ${testData.orderId}`);
      addLog(`Return URL: ${testData.returnUrl}`);
      addLog(`Cancel URL: ${testData.cancelUrl}`);

      const response = await paymentService.createCertificatePayment(testData);

      addLog("✅ Платеж успешно создан!");
      addLog(`Payment URL: ${response.paymentUrl}`);
      addLog(`Order ID: ${response.orderId}`);

      setResult(response);
    } catch (error) {
      console.error("Ошибка тестирования:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      addLog(`❌ ОШИБКА: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestStatus = async () => {
    if (!result?.orderId) {
      addLog("❌ ОШИБКА: Нет orderId для проверки статуса");
      return;
    }

    setIsLoading(true);
    addLog(`=== ПРОВЕРКА СТАТУСА ПЛАТЕЖА ===`);
    addLog(`Проверяем статус заказа: ${result.orderId}`);

    try {
      const status = await paymentService.checkPaymentStatus(result.orderId);
      addLog(`✅ Статус получен: ${JSON.stringify(status, null, 2)}`);

      if (status.paid) {
        addLog("🎉 Платеж успешно оплачен!");
      } else {
        addLog("⏳ Платеж в обработке или не оплачен");
      }

      setResult({ ...result, status });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      addLog(`❌ ОШИБКА ПРОВЕРКИ СТАТУСА: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenPayment = () => {
    if (result?.paymentUrl) {
      addLog("🔗 Открываем страницу оплаты в новом окне...");
      window.open(result.paymentUrl, "_blank");
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-2xl font-bold text-dark mb-6">
              Тестирование платежной системы
            </h1>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Сумма (рубли)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  min="100"
                  step="100"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleTestPayment}
                  disabled={isLoading}
                  className={`bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Тестирование..." : "Создать тестовый платеж"}
                </button>

                {result?.orderId && (
                  <button
                    onClick={handleTestStatus}
                    disabled={isLoading}
                    className={`bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium transition-colors ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Проверка..." : "Проверить статус"}
                  </button>
                )}

                {result?.paymentUrl && (
                  <button
                    onClick={handleOpenPayment}
                    className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                  >
                    Открыть платеж
                  </button>
                )}

                <button
                  onClick={clearLogs}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                >
                  Очистить
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-dark mb-2">Результат:</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-dark mb-4">
              Логи тестирования
            </h2>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">
                  Логи будут отображаться здесь...
                </p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
