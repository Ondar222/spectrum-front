import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCookieConsent } from '../hooks/useCookieConsent';
const CookieNotification = ({ onAccept, onDecline }) => {
    const { needsConsent, acceptCookies, declineCookies, isLoading } = useCookieConsent();
    const handleAccept = () => {
        acceptCookies();
        onAccept?.();
    };
    const handleDecline = () => {
        declineCookies();
        onDecline?.();
    };
    if (isLoading || !needsConsent) {
        return null;
    }
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-lg", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 py-4", children: _jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u043E\u0432 cookie" }), _jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: "\u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0444\u0430\u0439\u043B\u044B cookie \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u0430\u0439\u0442\u0430, \u0430\u043D\u0430\u043B\u0438\u0437\u0430 \u0442\u0440\u0430\u0444\u0438\u043A\u0430 \u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u0448 \u0441\u0430\u0439\u0442, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0435\u0439 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F cookie-\u0444\u0430\u0439\u043B\u043E\u0432." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-2", children: [_jsx("button", { onClick: handleDecline, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors", children: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C" }), _jsx("button", { onClick: handleAccept, className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors", children: "\u041F\u0440\u0438\u043D\u044F\u0442\u044C" })] })] }) }) }));
};
export default CookieNotification;
