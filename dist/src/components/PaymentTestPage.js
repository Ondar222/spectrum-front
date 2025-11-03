import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import paymentService from "../services/payment";
export default function PaymentTestPage() {
    const [formData, setFormData] = useState({
        amount: 100,
        description: "Тестовый платеж",
        customerEmail: "test@example.com",
        customerName: "Тестовый пользователь",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const isProduction = import.meta.env.PROD || false;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number.parseInt(value) : value,
        }));
    };
    const handleSubmit = async (e) => {
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
            const { paymentUrl, orderId: alfaOrderId } = await paymentService.createAppointmentPayment(paymentData);
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
        }
        catch (error) {
            console.error("Ошибка при создании тестового платежа:", error);
            setResult({
                success: false,
                message: `Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-dark mb-4", children: "\u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B" }), _jsx("p", { className: "text-gray-600", children: "\u042D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0430 \u0434\u043B\u044F \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0441 \u0410\u043B\u044C\u0444\u0430-\u0411\u0430\u043D\u043A\u043E\u043C" }), _jsx("div", { className: "mt-4", children: isProduction ? (_jsxs("div", { className: "inline-block bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded-lg", children: [_jsx("span", { className: "font-medium", children: "\uD83D\uDEA8 \u041F\u0420\u041E\u0414\u0410\u041A\u0428\u041D \u0421\u0420\u0415\u0414\u0410" }), _jsx("span", { className: "text-sm ml-2", children: "(\u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u0438!)" })] })) : (_jsxs("div", { className: "inline-block bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg", children: [_jsx("span", { className: "font-medium", children: "\uD83E\uDDEA \u0422\u0415\u0421\u0422\u041E\u0412\u0410\u042F \u0421\u0420\u0415\u0414\u0410" }), _jsx("span", { className: "text-sm ml-2", children: "(\u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u043D\u0435 \u0441\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F)" })] })) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [_jsx("h2", { className: "text-xl font-semibold text-dark mb-6", children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u043F\u043B\u0430\u0442\u0435\u0436" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "amount", className: "block text-gray-700 mb-2", children: "\u0421\u0443\u043C\u043C\u0430 (\u0440\u0443\u0431\u043B\u0438)" }), _jsx("input", { type: "number", id: "amount", name: "amount", value: formData.amount, onChange: handleChange, min: "1", max: "1000", className: "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "description", className: "block text-gray-700 mb-2", children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), _jsx("input", { type: "text", id: "description", name: "description", value: formData.description, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "customerName", className: "block text-gray-700 mb-2", children: "\u0418\u043C\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430" }), _jsx("input", { type: "text", id: "customerName", name: "customerName", value: formData.customerName, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "customerEmail", className: "block text-gray-700 mb-2", children: "Email \u043A\u043B\u0438\u0435\u043D\u0442\u0430" }), _jsx("input", { type: "email", id: "customerEmail", name: "customerEmail", value: formData.customerEmail, onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary", required: true })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: `w-full bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`, children: isSubmitting
                                            ? "Создание платежа..."
                                            : "Создать тестовый платеж" })] }), result && (_jsx("div", { className: "mt-6 p-4 rounded-lg border", children: result.success ? (_jsxs("div", { className: "bg-green-50 border-green-200 text-green-800", children: [_jsx("h3", { className: "font-medium mb-2", children: "\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E!" }), _jsx("p", { className: "text-sm mb-2", children: result.message }), result.orderId && (_jsxs("p", { className: "text-sm", children: ["Order ID: ", result.orderId] })), result.paymentUrl && (_jsx("p", { className: "text-sm", children: "\u041F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043E\u043F\u043B\u0430\u0442\u044B..." }))] })) : (_jsxs("div", { className: "bg-red-50 border-red-200 text-red-800", children: [_jsx("h3", { className: "font-medium mb-2", children: "\u274C \u041E\u0448\u0438\u0431\u043A\u0430!" }), _jsx("p", { className: "text-sm", children: result.message })] })) }))] }), _jsxs("div", { className: "mt-8 bg-white rounded-lg shadow-lg p-8", children: [_jsx("h3", { className: "text-lg font-semibold text-dark mb-4", children: "\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u043A\u0430\u0440\u0442\u044B \u0434\u043B\u044F \u043E\u043F\u043B\u0430\u0442\u044B" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-dark mb-2", children: "\u0423\u0441\u043F\u0435\u0448\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430:" }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "\u041D\u043E\u043C\u0435\u0440:" }), " 4111 1111 1111 1111"] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F:" }), " 12/25"] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "CVV:" }), " 123"] })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-dark mb-2", children: "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430:" }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "\u041D\u043E\u043C\u0435\u0440:" }), " 4444 4444 4444 4444"] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F:" }), " 12/25"] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "CVV:" }), " 123"] })] })] })] })] }) }) }));
}
