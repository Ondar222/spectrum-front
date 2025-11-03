import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
export default function PaymentDiagnosticPage() {
    const [amount, setAmount] = useState(1000);
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const [result, setResult] = useState(null);
    const [testMode, setTestMode] = useState("create");
    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
    };
    const handleTestPayment = async () => {
        setIsLoading(true);
        setLogs([]);
        setResult(null);
        try {
            addLog("=== ДИАГНОСТИКА СОЗДАНИЯ ПЛАТЕЖА ===");
            addLog("Начинаем тестирование платежной системы...");
            const testData = {
                amount: amount,
                returnUrl: `${window.location.origin}/certificates/success?orderId=test`,
                failUrl: `${window.location.origin}/certificates/cancel?orderId=test`,
                description: `Тестовый платеж на сумму ${amount} ₽`,
            };
            addLog(`Проверяем входные данные:`);
            addLog(`- Сумма: ${amount} ₽ (${amount * 100} копеек)`);
            addLog(`- Return URL: ${testData.returnUrl}`);
            addLog(`- Fail URL: ${testData.failUrl}`);
            addLog(`- Описание: ${testData.description}`);
            addLog(`Отправляем запрос на создание платежа...`);
            const response = await fetch("/api/payment/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testData),
            });
            addLog(`Получен ответ от сервера: ${response.status} ${response.statusText}`);
            const result = await response.json();
            addLog(`Ответ сервера: ${JSON.stringify(result, null, 2)}`);
            if (result.error) {
                addLog(`❌ ОШИБКА СОЗДАНИЯ ПЛАТЕЖА:`);
                addLog(`- Код ошибки: ${result.errorCode}`);
                addLog(`- Сообщение: ${result.errorMessage || result.message}`);
                addLog(`- Детали: ${result.details || "Нет дополнительных деталей"}`);
                // Анализ ошибки
                if (result.errorCode === "INVALID_AMOUNT") {
                    addLog(`🔍 АНАЛИЗ: Неправильный формат суммы`);
                }
                else if (result.errorCode === "INVALID_ORDER_NUMBER") {
                    addLog(`🔍 АНАЛИЗ: Проблема с номером заказа`);
                }
                else if (result.errorCode === "INVALID_RETURN_URL") {
                    addLog(`🔍 АНАЛИЗ: Проблема с URL возврата`);
                }
                else if (result.errorCode === "ACCESS_DENIED") {
                    addLog(`🔍 АНАЛИЗ: Проблема с аутентификацией`);
                }
                setResult({ error: true, ...result });
            }
            else {
                addLog(`✅ Платеж успешно создан:`);
                addLog(`- Order ID: ${result.orderId}`);
                addLog(`- Order Number: ${result.orderNumber}`);
                addLog(`- Form URL: ${result.formUrl}`);
                setResult(result);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
            addLog(`❌ КРИТИЧЕСКАЯ ОШИБКА: ${errorMessage}`);
            addLog(`🔍 АНАЛИЗ: Сетевая ошибка или проблема с сервером`);
            setResult({ error: true, message: errorMessage });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleTestStatus = async () => {
        if (!result?.orderId) {
            addLog("❌ ОШИБКА: Нет orderId для проверки статуса");
            return;
        }
        setIsLoading(true);
        addLog(`=== ДИАГНОСТИКА СТАТУСА ПЛАТЕЖА ===`);
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
            addLog(`Результат проверки статуса: ${JSON.stringify(statusResult, null, 2)}`);
            if (statusResult.error) {
                addLog(`❌ ОШИБКА ПРОВЕРКИ СТАТУСА:`);
                addLog(`- Код ошибки: ${statusResult.errorCode}`);
                addLog(`- Сообщение: ${statusResult.errorMessage || statusResult.message}`);
            }
            else {
                addLog(`✅ Статус заказа получен:`);
                addLog(`- Order Status: ${statusResult.orderStatus}`);
                addLog(`- Order Number: ${statusResult.orderNumber}`);
                addLog(`- Amount: ${statusResult.amount} копеек`);
                // Анализ статуса
                switch (statusResult.orderStatus) {
                    case 0:
                        addLog(`🔍 АНАЛИЗ: Заказ зарегистрирован, но не оплачен`);
                        break;
                    case 1:
                        addLog(`🔍 АНАЛИЗ: Предавторизованная сумма захолдирована`);
                        break;
                    case 2:
                        addLog(`🔍 АНАЛИЗ: ✅ Платеж успешно оплачен`);
                        break;
                    case 3:
                        addLog(`🔍 АНАЛИЗ: ❌ Авторизация отменена`);
                        break;
                    case 4:
                        addLog(`🔍 АНАЛИЗ: ❌ По транзакции был проведен возврат`);
                        break;
                    case 5:
                        addLog(`🔍 АНАЛИЗ: Инициирована авторизация через ACS банка-эмитента`);
                        break;
                    case 6:
                        addLog(`🔍 АНАЛИЗ: ❌ Авторизация отклонена`);
                        break;
                    default:
                        addLog(`🔍 АНАЛИЗ: Неизвестный статус заказа`);
                }
            }
            setResult({ ...result, status: statusResult });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
            addLog(`❌ ОШИБКА ПРОВЕРКИ СТАТУСА: ${errorMessage}`);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDiagnosticCheck = async () => {
        setIsLoading(true);
        addLog(`=== ПОЛНАЯ ДИАГНОСТИКА СИСТЕМЫ ===`);
        // Проверка конфигурации
        addLog(`1. Проверка конфигурации:`);
        addLog(`- API URL: ${window.location.origin}/api`);
        addLog(`- Текущий домен: ${window.location.origin}`);
        addLog(`- Протокол: ${window.location.protocol}`);
        // Проверка доступности API
        addLog(`2. Проверка доступности API:`);
        try {
            const healthCheck = await fetch("/api/payment/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 100,
                    returnUrl: "test",
                    failUrl: "test",
                    description: "test",
                }),
            });
            addLog(`- Статус API: ${healthCheck.status}`);
        }
        catch (error) {
            addLog(`- ❌ API недоступен: ${error}`);
        }
        // Проверка CORS
        addLog(`3. Проверка CORS:`);
        addLog(`- CORS должен быть настроен на сервере`);
        // Проверка SSL
        addLog(`4. Проверка SSL:`);
        if (window.location.protocol === "https:") {
            addLog(`- ✅ HTTPS активен`);
        }
        else {
            addLog(`- ⚠️ HTTP используется (может вызвать проблемы)`);
        }
        setIsLoading(false);
    };
    const clearLogs = () => {
        setLogs([]);
        setResult(null);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-dark mb-6", children: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B" }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2", children: "\u0421\u0443\u043C\u043C\u0430 (\u0440\u0443\u0431\u043B\u0438)" }), _jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(Number(e.target.value)), className: "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary", min: "100", step: "100" })] }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx("button", { onClick: handleTestPayment, disabled: isLoading, className: `bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`, children: isLoading ? "Тестирование..." : "Создать тестовый платеж" }), result?.orderId && (_jsx("button", { onClick: handleTestStatus, disabled: isLoading, className: `bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`, children: isLoading ? "Проверка..." : "Проверить статус" })), _jsx("button", { onClick: handleDiagnosticCheck, disabled: isLoading, className: `bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md font-medium transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`, children: isLoading ? "Диагностика..." : "Полная диагностика" }), _jsx("button", { onClick: clearLogs, className: "bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md font-medium transition-colors", children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043B\u043E\u0433\u0438" })] })] }), result && (_jsxs("div", { className: "mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg", children: [_jsx("h3", { className: "font-semibold text-dark mb-2", children: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:" }), _jsx("pre", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: JSON.stringify(result, null, 2) })] }))] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [_jsx("h2", { className: "text-xl font-bold text-dark mb-4", children: "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u043B\u043E\u0433\u0438 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438" }), _jsx("div", { className: "bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto", children: logs.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "\u041B\u043E\u0433\u0438 \u0431\u0443\u0434\u0443\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u0437\u0434\u0435\u0441\u044C..." })) : (logs.map((log, index) => (_jsx("div", { className: "mb-1", children: log }, index)))) })] })] }) }) }));
}
