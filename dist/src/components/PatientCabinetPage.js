import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
export default function PatientCabinetPage() {
    useEffect(() => {
        // Редирект на внешний сервис личного кабинета
        window.location.href = "http://user.clinicaldan.ru/login";
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-dark mb-4", children: "\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u0432 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" }), _jsx("p", { className: "text-gray-600 mb-6", children: "\u0412\u044B \u0431\u0443\u0434\u0435\u0442\u0435 \u043F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0432\u0445\u043E\u0434\u0430 \u0432 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430." }), _jsxs("p", { className: "text-sm text-gray-500", children: ["\u0415\u0441\u043B\u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u043D\u0435 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u0435\u043B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438,", _jsx("a", { href: "http://user.clinicaldan.ru/login", className: "text-primary hover:text-primaryDark underline ml-1", children: "\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C" })] })] }) }) }));
}
