import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import certificateService from "../services/certificates";
export default function PaymentSuccessPage({ type = "certificate", }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState("");
    const orderId = searchParams.get("orderId");
    useEffect(() => {
        const checkPaymentStatus = async () => {
            if (!orderId) {
                setError("Номер заказа не найден");
                setIsLoading(false);
                return;
            }
            try {
                const response = await certificateService.checkPaymentStatus(orderId);
                // Статусы Альфа-Банка:
                // 0 - заказ зарегистрирован, но не оплачен
                // 1 - предавторизованная сумма захолдирована
                // 2 - проведена полная авторизация суммы заказа
                // 3 - авторизация отменена
                // 4 - по транзакции была проведена операция возврата
                // 5 - инициирована авторизация через ACS банка-эмитента
                // 6 - авторизация отклонена
                const isPaid = response.orderStatus === 2;
                const status = isPaid ? 'paid' : 'pending';
                setPaymentStatus({
                    status,
                    paid: isPaid,
                    amount: response.amount,
                    orderId: response.orderNumber
                });
            }
            catch (error) {
                console.error("Ошибка при проверке статуса платежа:", error);
                setError("Не удалось проверить статус платежа");
            }
            finally {
                setIsLoading(false);
            }
        };
        checkPaymentStatus();
    }, [orderId]);
    const handleGoHome = () => {
        navigate("/");
    };
    const handleGoToCertificates = () => {
        navigate("/certificates");
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0441\u0442\u0430\u0442\u0443\u0441 \u043F\u043B\u0430\u0442\u0435\u0436\u0430..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "text-red-500 mb-4", children: _jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }) }), _jsx("h2", { className: "text-2xl font-bold text-dark mb-4", children: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430" }), _jsx("p", { className: "text-gray-600 mb-6", children: error }), _jsxs("div", { className: "space-x-4", children: [_jsx("button", { onClick: handleGoHome, className: "bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors", children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" }), _jsx("button", { onClick: handleGoToCertificates, className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors", children: "\u041A \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430\u043C" })] })] }) }) }));
    }
    if (!paymentStatus?.paid) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "text-yellow-500 mb-4", children: _jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h2", { className: "text-2xl font-bold text-dark mb-4", children: "\u041F\u043B\u0430\u0442\u0435\u0436 \u0432 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435" }), _jsx("p", { className: "text-gray-600 mb-6", children: "\u0412\u0430\u0448 \u043F\u043B\u0430\u0442\u0435\u0436 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F. \u042D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442. \u041C\u044B \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u043C \u0432\u0430\u0441, \u043A\u043E\u0433\u0434\u0430 \u043F\u043B\u0430\u0442\u0435\u0436 \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D." }), paymentStatus?.orderId && (_jsxs("p", { className: "text-sm text-gray-500 mb-6", children: ["\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430: ", paymentStatus.orderId] })), _jsxs("div", { className: "space-x-4", children: [_jsx("button", { onClick: handleGoHome, className: "bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors", children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" }), _jsx("button", { onClick: handleGoToCertificates, className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors", children: "\u041A \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430\u043C" })] })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "text-green-500 mb-4", children: _jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h2", { className: "text-2xl font-bold text-dark mb-4", children: type === "certificate"
                            ? "Сертификат успешно оплачен!"
                            : "Запись успешно оплачена!" }), _jsx("p", { className: "text-gray-600 mb-6", children: type === "certificate"
                            ? "Электронный сертификат отправлен на указанный email адрес. Получатель сможет воспользоваться сертификатом в течение 3 месяцев."
                            : "Ваша запись на прием подтверждена. Мы отправили подтверждение на ваш email." }), paymentStatus?.orderId && (_jsxs("p", { className: "text-sm text-gray-500 mb-6", children: ["\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430: ", paymentStatus.orderId] })), _jsxs("div", { className: "space-x-4", children: [_jsx("button", { onClick: handleGoHome, className: "bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors", children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" }), type === "certificate" && (_jsx("button", { onClick: handleGoToCertificates, className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors", children: "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0435\u0449\u0435 \u043E\u0434\u0438\u043D \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" }))] })] }) }) }));
}
