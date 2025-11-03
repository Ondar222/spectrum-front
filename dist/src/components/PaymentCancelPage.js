import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function PaymentCancelPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("orderId");
    const handleGoHome = () => {
        navigate("/");
    };
    const handleGoToCertificates = () => {
        navigate("/certificates");
    };
    const handleRetryPayment = () => {
        navigate("/certificates");
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "text-orange-500 mb-4", children: _jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }) }), _jsx("h2", { className: "text-2xl font-bold text-dark mb-4", children: "\u041F\u043B\u0430\u0442\u0435\u0436 \u043E\u0442\u043C\u0435\u043D\u0435\u043D" }), _jsx("p", { className: "text-gray-600 mb-6", children: "\u041E\u043F\u043B\u0430\u0442\u0430 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u0431\u044B\u043B\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430. \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0441 \u043E\u043F\u043B\u0430\u0442\u043E\u0439, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438." }), orderId && (_jsxs("p", { className: "text-sm text-gray-500 mb-6", children: ["\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430: ", orderId] })), _jsxs("div", { className: "space-x-4", children: [_jsx("button", { onClick: handleRetryPayment, className: "bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430" }), _jsx("button", { onClick: handleGoHome, className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors", children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] })] }) }) }));
}
