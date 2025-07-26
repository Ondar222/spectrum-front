import React, { useState } from "react";

export default function PaymentDiagnosticPage() {
  const [amount, setAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleTestPayment = async () => {
    setIsLoading(true);
    setLogs([]);
    setResult(null);

    try {
      addLog("Начинаем тестирование платежной системы...");

      const testData = {
        amount: amount,
        returnUrl: `${window.location.origin}/certificates/success?orderId=test`,
        failUrl: `${window.location.origin}/certificates/cancel?orderId=test`,
        description: `Тестовый платеж на сумму ${amount} ₽`,
      };

      addLog(
        `Отправляем запрос на создание платежа: ${JSON.stringify(testData)}`
      );

      const response = await fetch("/api/payment/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      addLog(
        `Получен ответ от сервера: ${response.status} ${response.statusText}`
      );

      const result = await response.json();
      addLog(`Ответ сервера: ${JSON.stringify(result)}`);

      if (result.error) {
        addLog(`ОШИБКА: ${result.errorMessage || result.message}`);
        setResult({ error: true, ...result });
      } else {
        addLog(`Платеж успешно создан: ${result.orderId}`);
        setResult(result);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      addLog(`КРИТИЧЕСКАЯ ОШИБКА: ${errorMessage}`);
      setResult({ error: true, message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestStatus = async () => {
    if (!result?.orderId) {
      addLog("ОШИБКА: Нет orderId для проверки статуса");
      return;
    }

    setIsLoading(true);
    addLog(`Проверяем статус заказа: ${result.orderId}`);

    try {
      const response = await fetch("/api/payment/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: result.orderId }),
      });

      addLog(`Статус ответа: ${response.status} ${response.statusText}`);

      const statusResult = await response.json();
      addLog(`Результат проверки статуса: ${JSON.stringify(statusResult)}`);

      if (statusResult.error) {
        addLog(
          `ОШИБКА ПРОВЕРКИ СТАТУСА: ${statusResult.errorMessage || statusResult.message}`
        );
      } else {
        addLog(`Статус заказа: ${statusResult.orderStatus}`);
      }

      setResult({ ...result, status: statusResult });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      addLog(`ОШИБКА ПРОВЕРКИ СТАТУСА: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-2xl font-bold text-dark mb-6">
              Диагностика платежной системы
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

              <div className="flex space-x-4">
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

                <button
                  onClick={clearLogs}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                >
                  Очистить логи
                </button>
              </div>
            </div>

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
              Логи диагностики
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
