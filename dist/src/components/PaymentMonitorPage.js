import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
export default function PaymentMonitorPage() {
    const [logs, setLogs] = useState([]);
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
                const mockLog = {
                    id: `log_${Date.now()}`,
                    timestamp: new Date().toLocaleTimeString(),
                    type: Math.random() > 0.7
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
        const successful = logs.filter((log) => log.type === "status" && log.status === 2).length;
        const failed = logs.filter((log) => log.type === "error").length;
        const pending = logs.filter((log) => log.type === "status" && log.status === 0).length;
        const total = logs.length;
        const avgDuration = logs.reduce((sum, log) => sum + (log.duration || 0), 0) /
            Math.max(logs.length, 1);
        setStats({
            total,
            successful,
            failed,
            pending,
            averageDuration: Math.round(avgDuration),
        });
    }, [logs]);
    const getStatusText = (status) => {
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
    const getStatusColor = (status) => {
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
    const getTypeIcon = (type) => {
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
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-dark mb-6", children: "\u041C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439" }), _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex space-x-4", children: [_jsx("button", { onClick: () => setIsMonitoring(!isMonitoring), className: `px-6 py-3 rounded-md font-medium transition-colors ${isMonitoring
                                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                                    : "bg-green-500 hover:bg-green-600 text-white"}`, children: isMonitoring
                                                    ? "Остановить мониторинг"
                                                    : "Запустить мониторинг" }), _jsx("button", { onClick: clearLogs, className: "bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors", children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043B\u043E\u0433\u0438" })] }), _jsx("div", { className: "text-sm text-gray-500", children: isMonitoring ? "🟢 Активен" : "🔴 Остановлен" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-6", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: stats.total }), _jsx("div", { className: "text-sm text-blue-800", children: "\u0412\u0441\u0435\u0433\u043E \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439" })] }), _jsxs("div", { className: "bg-green-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.successful }), _jsx("div", { className: "text-sm text-green-800", children: "\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0445" })] }), _jsxs("div", { className: "bg-red-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.failed }), _jsx("div", { className: "text-sm text-red-800", children: "\u041E\u0448\u0438\u0431\u043E\u043A" })] }), _jsxs("div", { className: "bg-yellow-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats.pending }), _jsx("div", { className: "text-sm text-yellow-800", children: "\u0412 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435" })] }), _jsxs("div", { className: "bg-purple-50 p-4 rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [stats.averageDuration, "ms"] }), _jsx("div", { className: "text-sm text-purple-800", children: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [_jsx("h2", { className: "text-xl font-bold text-dark mb-4", children: "\u041B\u043E\u0433\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438" }), _jsx("div", { className: "bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto", children: logs.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "\u041B\u043E\u0433\u0438 \u0431\u0443\u0434\u0443\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u0437\u0434\u0435\u0441\u044C \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433\u0430..." })) : (logs.map((log) => (_jsx("div", { className: "mb-2 border-b border-gray-700 pb-1", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-lg", children: getTypeIcon(log.type) }), _jsxs("span", { className: "text-gray-400", children: ["[", log.timestamp, "]"] }), _jsx("span", { className: "text-blue-400", children: log.type.toUpperCase() }), log.orderId && (_jsxs("span", { className: "text-yellow-400", children: ["ID: ", log.orderId] })), log.orderNumber && (_jsxs("span", { className: "text-cyan-400", children: ["\u2116: ", log.orderNumber] })), log.amount && (_jsxs("span", { className: "text-green-400", children: [log.amount, "\u20BD"] })), log.status !== undefined && (_jsxs("span", { className: getStatusColor(log.status), children: ["\u0421\u0442\u0430\u0442\u0443\u0441: ", getStatusText(log.status)] })), log.duration && (_jsxs("span", { className: "text-purple-400", children: [log.duration, "ms"] })), log.error && (_jsxs("span", { className: "text-red-400", children: ["\u041E\u0448\u0438\u0431\u043A\u0430: ", log.error] }))] }) }, log.id)))) })] })] }) }) }));
}
