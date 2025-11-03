import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        agreeToTerms: false,
        agreeToSiteConsent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? e.target.checked : value,
        }));
        // Очищаем ошибку валидации при изменении формы
        if (validationError) {
            setValidationError(null);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Проверка обязательного согласия (один чекбокс)
        if (!formData.agreeToTerms) {
            setValidationError("Пожалуйста, примите обязательные согласия");
            return;
        }
        // Базовая валидация телефона: минимум 10 цифр
        const phoneDigits = formData.phone.replace(/\D/g, "");
        if (phoneDigits.length < 10 || phoneDigits.length > 12) {
            setValidationError("Введите корректный номер телефона");
            return;
        }
        setValidationError(null);
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: "",
                phone: "",
                email: "",
                message: "",
                agreeToTerms: false,
                agreeToSiteConsent: false,
            });
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }, 1000);
    };
    return (_jsx("section", { className: "py-6 sm:py-10 md:py-16 relative", style: {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundAttachment: "fixed",
        }, children: _jsx("div", { className: "container mx-auto px-3 sm:px-4 relative z-10", children: _jsxs("div", { className: "max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-2xl p-3 sm:p-6 md:p-10 border border-white/20", children: [_jsx("h2", { className: "text-lg sm:text-2xl font-bold text-center mb-3 sm:mb-6 text-dark", children: "\u0415\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B? \u0417\u0430\u0434\u0430\u0432\u0430\u0439\u0442\u0435!" }), _jsx("p", { className: "text-center text-gray-600 mb-5 sm:mb-8 text-xs sm:text-base", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0438 \u043C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F." }), isSubmitted ? (_jsx("div", { className: "bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-3 sm:mb-4", children: _jsx("p", { className: "text-center text-sm sm:text-base", children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435! \u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F." }) })) : null, validationError && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-3 sm:mb-4", children: _jsx("p", { className: "text-center text-sm sm:text-base", children: validationError }) })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch", children: [_jsxs("form", { onSubmit: handleSubmit, className: "order-1 lg:order-2 lg:col-span-2 h-full flex flex-col", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-gray-700 mb-1 sm:mb-2 text-xs sm:text-base", children: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: "w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm sm:text-base", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-gray-700 mb-1 sm:mb-2 text-xs sm:text-base", children: "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, className: "w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm sm:text-base", required: true })] })] }), _jsxs("div", { className: "mb-4 sm:mb-6", children: [_jsx("label", { htmlFor: "email", className: "block text-gray-700 mb-1 sm:mb-2 text-xs sm:text-base", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm sm:text-base", required: true })] }), _jsxs("div", { className: "col-span-2 mb-4 sm:mb-6", children: [_jsx("label", { htmlFor: "message", className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }), _jsx("textarea", { id: "message", name: "message", rows: 4, value: formData.message, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm sm:text-base", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", required: true })] }), _jsx("div", { className: "mb-4 sm:mb-6", children: _jsxs("label", { className: `flex items-start space-x-2 sm:space-x-3 ${!formData.agreeToTerms && validationError ? "text-red-600" : ""}`, children: [_jsx("input", { type: "checkbox", name: "agreeToTerms", checked: formData.agreeToTerms, onChange: handleChange, className: `mt-1 h-4 w-4 text-primary focus:ring-primary rounded ${!formData.agreeToTerms && validationError
                                                        ? "border-red-300 focus:ring-red-500"
                                                        : "border-gray-300"}`, required: true }), _jsxs("span", { className: "text-[11px] sm:text-sm text-gray-700 leading-relaxed", children: ["\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E", " ", _jsx("a", { href: "/documents/\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435_\u043D\u0430_\u043F\u0435\u0440\u0441\u0434\u0430\u043D\u043D\u044B\u0435_\u043D\u0430_\u0441\u0430\u0438\u0306\u0442.docx", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044E" }), " ", "\u0438", " ", _jsx("a", { href: "/documents/utverzhdeno.pdf", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" })] })] }) }), _jsx("div", { className: "mb-4 sm:mb-6" }), _jsx("div", { className: "text-center", children: _jsx("button", { type: "submit", disabled: isSubmitting, className: `bg-primary hover:bg-primaryDark text-white py-2 sm:py-3 px-5 sm:px-8 rounded-md font-medium transition-colors text-sm sm:text-base ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`, children: isSubmitting ? "Отправка..." : "Отправить" }) })] }), _jsxs("aside", { className: "order-2 lg:order-1 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 h-full", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-dark mb-3 sm:mb-4", children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" }), _jsxs("div", { className: "space-y-3 sm:space-y-4 text-gray-800", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-4 h-4 sm:w-5 sm:h-5 text-primary", children: _jsx("path", { d: "M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" }) }) }), _jsx("a", { href: "https://yandex.ru/maps/?text=667003%2C%20\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430%20\u0422\u044B\u0432\u0430%2C%20\u0433\u043E\u0440\u043E\u0434%20\u041A\u044B\u0437\u044B\u043B%2C%20\u0443\u043B\u0438\u0446\u0430%20\u041E\u0441\u0442\u0440\u043E\u0432\u0441\u043A\u043E\u0433\u043E%2C%2010", target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors text-xs sm:text-sm", "aria-label": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0430\u0434\u0440\u0435\u0441 \u043D\u0430 \u043A\u0430\u0440\u0442\u0435", children: "667003, \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0422\u044B\u0432\u0430, \u0433\u043E\u0440\u043E\u0434 \u041A\u044B\u0437\u044B\u043B, \u0443\u043B\u0438\u0446\u0430 \u041E\u0441\u0442\u0440\u043E\u0432\u0441\u043A\u043E\u0433\u043E, 10" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-colors flex-shrink-0", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 sm:h-5 sm:w-5 text-primary", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }) }), _jsx("a", { href: "tel:+79235405050", className: "hover:text-primary transition-colors text-sm sm:text-base", children: "+7 (923) 540-50-50" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-colors flex-shrink-0", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 sm:h-5 sm:w-5 text-primary", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }), _jsx("a", { href: "mailto:spectrum_aldan@mail.ru", className: "hover:text-primary transition-colors text-sm sm:text-base", children: "spectrum_aldan@mail.ru" })] })] })] })] })] }) }) }));
}
