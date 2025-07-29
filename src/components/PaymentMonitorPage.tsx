import React, { useState, useEffect } from "react";

interface PaymentLog {
  id: string;
  timestamp: string;
  type: "create" | "status" | "error";
  orderId?: string;
  orderNumber?: string;
  status?: number;
  amount?: number;
  error?: string;
  duration?: number;
}

export default function PaymentMonitorPage() {
  const [logs, setLogs] = useState<PaymentLog[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    pending: 0,
    averageDuration: 0,
  });

  useEffect(() => {
    // Симуляция получения логов с сервера
    const interval = setInterval(() => {
      if (isMonitoring) {
        // В реальном приложении здесь был бы WebSocket или polling
        // Пока что симулируем данные
        const mockLog: PaymentLog = {
          id: `log_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type:
            Math.random() > 0.7
              ? "error"
              : Math.random() > 0.5
                ? "status"
                : "create",
          orderId: `order_${Date.now()}`,
          orderNumber: `cert_${Date.now()}`,
          status: Math.floor(Math.random() * 7),
          amount: Math.floor(Math.random() * 10000) + 1000,
          duration: Math.floor(Math.random() * 5000) + 500,
        };

        setLogs((prev) => [mockLog, ...prev.slice(0, 49)]); // Храним последние 50 логов
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  useEffect(() => {
    // Обновление статистики
    const successful = logs.filter(
      (log) => log.type === "status" && log.status === 2
    ).length;
    const failed = logs.filter((log) => log.type === "error").length;
    const pending = logs.filter(
      (log) => log.type === "status" && log.status === 0
    ).length;
    const total = logs.length;
    const avgDuration =
      logs.reduce((sum, log) => sum + (log.duration || 0), 0) /
      Math.max(logs.length, 1);

    setStats({
      total,
      successful,
      failed,
      pending,
      averageDuration: Math.round(avgDuration),
    });
  }, [logs]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Зарегистрирован";
      case 1:
        return "Предавторизация";
      case 2:
        return "Оплачен";
      case 3:
        return "Отменен";
      case 4:
        return "Возврат";
      case 5:
        return "ACS авторизация";
      case 6:
        return "Отклонен";
      default:
        return "Неизвестно";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 2:
        return "text-green-600";
      case 3:
      case 6:
        return "text-red-600";
      case 4:
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "create":
        return "🆕";
      case "status":
        return "📊";
      case "error":
        return "❌";
      default:
        return "❓";
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-2xl font-bold text-dark mb-6">
              Мониторинг платежей
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsMonitoring(!isMonitoring)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    isMonitoring
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {isMonitoring
                    ? "Остановить мониторинг"
                    : "Запустить мониторинг"}
                </button>
                <button
                  onClick={clearLogs}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Очистить логи
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {isMonitoring ? "🟢 Активен" : "🔴 Остановлен"}
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </div>
                <div className="text-sm text-blue-800">Всего операций</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {stats.successful}
                </div>
                <div className="text-sm text-green-800">Успешных</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {stats.failed}
                </div>
                <div className="text-sm text-red-800">Ошибок</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
                <div className="text-sm text-yellow-800">В обработке</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.averageDuration}ms
                </div>
                <div className="text-sm text-purple-800">Среднее время</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-dark mb-4">
              Логи платежей в реальном времени
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">
                  Логи будут отображаться здесь при запуске мониторинга...
                </p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="mb-2 border-b border-gray-700 pb-1"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(log.type)}</span>
                      <span className="text-gray-400">[{log.timestamp}]</span>
                      <span className="text-blue-400">
                        {log.type.toUpperCase()}
                      </span>
                      {log.orderId && (
                        <span className="text-yellow-400">
                          ID: {log.orderId}
                        </span>
                      )}
                      {log.orderNumber && (
                        <span className="text-cyan-400">
                          №: {log.orderNumber}
                        </span>
                      )}
                      {log.amount && (
                        <span className="text-green-400">{log.amount}₽</span>
                      )}
                      {log.status !== undefined && (
                        <span className={getStatusColor(log.status)}>
                          Статус: {getStatusText(log.status)}
                        </span>
                      )}
                      {log.duration && (
                        <span className="text-purple-400">
                          {log.duration}ms
                        </span>
                      )}
                      {log.error && (
                        <span className="text-red-400">
                          Ошибка: {log.error}
                        </span>
                      )}
                    </div>
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
