import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import certificateService from "../services/certificates";
export default function GiftCertificatesPage() {
    const [formData, setFormData] = useState({
        recipientName: "",
        recipientEmail: "",
        senderName: "",
        senderEmail: "",
        amount: 1000,
        message: "",
        agreeToSiteConsent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [useCustomAmount, setUseCustomAmount] = useState(false);
    // Определяем текущую среду
    const isProduction = import.meta.env.PROD || false;
    // Функция валидации email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount"
                ? Number.isNaN(Number.parseInt(value)) ? prev.amount : Number.parseInt(value)
                : (type === 'checkbox' ? e.target.checked : value),
        }));
        // Очищаем ошибку поля при изменении
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    // Валидация формы перед отправкой
    const validateForm = () => {
        const errors = [];
        const fieldErrors = {};
        // Проверка суммы сертификата
        const minAmount = 1000;
        const maxAmount = 50000;
        if (!formData.amount || Number.isNaN(formData.amount)) {
            errors.push("Укажите сумму сертификата");
        }
        else if (formData.amount < minAmount || formData.amount > maxAmount) {
            errors.push(`Сумма должна быть от ${minAmount.toLocaleString('ru-RU')} до ${maxAmount.toLocaleString('ru-RU')} ₽`);
        }
        if (!formData.recipientName.trim()) {
            errors.push("Имя получателя обязательно");
            fieldErrors.recipientName = "Имя получателя обязательно";
        }
        else {
            const recipientNameParts = formData.recipientName.trim().split(' ');
            if (recipientNameParts.length < 2 || !recipientNameParts[1].trim()) {
                errors.push("Укажите имя и фамилию получателя");
                fieldErrors.recipientName = "Укажите имя и фамилию получателя";
            }
        }
        if (!formData.recipientEmail.trim()) {
            errors.push("Email получателя обязателен");
            fieldErrors.recipientEmail = "Email получателя обязателен";
        }
        else if (!validateEmail(formData.recipientEmail)) {
            errors.push("Email получателя имеет неверный формат");
            fieldErrors.recipientEmail = "Email получателя имеет неверный формат";
        }
        if (!formData.senderName.trim()) {
            errors.push("Ваше имя обязательно");
            fieldErrors.senderName = "Ваше имя обязательно";
        }
        else {
            const senderNameParts = formData.senderName.trim().split(' ');
            if (senderNameParts.length < 2 || !senderNameParts[1].trim()) {
                errors.push("Укажите ваше имя и фамилию");
                fieldErrors.senderName = "Укажите ваше имя и фамилию";
            }
        }
        if (!formData.senderEmail.trim()) {
            errors.push("Ваш email обязателен");
            fieldErrors.senderEmail = "Ваш email обязателен";
        }
        else if (!validateEmail(formData.senderEmail)) {
            errors.push("Ваш email имеет неверный формат");
            fieldErrors.senderEmail = "Ваш email имеет неверный формат";
        }
        setFieldErrors(fieldErrors);
        return { isValid: errors.length === 0, errors };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Валидация формы
        const validation = validateForm();
        if (!validation.isValid || !formData.agreeToSiteConsent) {
            setError(validation.errors.join(", "));
            return;
        }
        setIsSubmitting(true);
        setError("");
        try {
            // Подготовка данных клиента (получателя)
            const customerName = certificateService.parseFullName(formData.recipientName);
            const customer = {
                firstName: customerName.firstName,
                lastName: customerName.lastName,
                email: formData.recipientEmail,
            };
            // Подготовка данных спонсора (отправителя) - если это подарочный сертификат
            let sponsor;
            const isSelfCertificate = formData.senderEmail === formData.recipientEmail &&
                formData.senderName === formData.recipientName;
            if (!isSelfCertificate) {
                const sponsorName = certificateService.parseFullName(formData.senderName);
                sponsor = {
                    firstName: sponsorName.firstName,
                    lastName: sponsorName.lastName,
                    email: formData.senderEmail,
                };
            }
            const requestData = {
                amount: formData.amount,
                customer,
                sponsor,
                greetingText: formData.message || undefined,
            };
            // Отправка запроса на создание сертификата
            const response = await certificateService.createCertificate(requestData);
            // Перенаправление на страницу оплаты
            window.location.href = response.paymentUrl;
        }
        catch (error) {
            console.error("Ошибка при оформлении сертификата:", error);
            const errorMessage = error instanceof Error ? error.message : "Произошла ошибка при создании платежа";
            setError(errorMessage + ". Попробуйте еще раз.");
            setIsSubmitting(false);
        }
    };
    const certificateAmounts = [
        { value: 1000, label: "1 000 ₽" },
        { value: 2000, label: "2 000 ₽" },
        { value: 3000, label: "3 000 ₽" },
        { value: 5000, label: "5 000 ₽" },
        { value: 10000, label: "10 000 ₽" },
        { value: 15000, label: "15 000 ₽" },
        { value: 20000, label: "20 000 ₽" },
        { value: 30000, label: "30 000 ₽" },
        { value: 40000, label: "40 000 ₽" },
        { value: 50000, label: "50 000 ₽" },
    ];
    if (isSubmitted) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "text-green-500 mb-4", children: _jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h2", { className: "text-xl sm:text-2xl font-bold text-dark mb-4", children: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D!" }), _jsx("p", { className: "text-gray-600 mb-6", children: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 email \u0430\u0434\u0440\u0435\u0441. \u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u0441\u043C\u043E\u0436\u0435\u0442 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u043C\u0435\u0441\u044F\u0446\u0435\u0432." }), _jsx("button", { onClick: () => setIsSubmitted(false), className: "bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors", children: "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0435\u0449\u0435 \u043E\u0434\u0438\u043D \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8 md:py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-8 md:mb-10", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 md:mb-4", children: "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B" }), _jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-3xl mx-auto", children: "\u041D\u0435 \u0437\u043D\u0430\u0435\u0442\u0435 \u043A\u0430\u043A\u043E\u0439 \u043F\u043E\u0434\u0430\u0440\u043E\u043A \u043F\u0440\u0435\u043F\u043E\u0434\u043D\u0435\u0441\u0442\u0438? \u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0439 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u043D\u0430 \u0443\u0441\u043B\u0443\u0433\u0438 \u043A\u043B\u0438\u043D\u0438\u043A\u0438 - \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440 \u0434\u043B\u044F \u043B\u044E\u0431\u043E\u0433\u043E \u0442\u043E\u0440\u0436\u0435\u0441\u0442\u0432\u0430!" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12", children: [_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 md:p-8", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-semibold text-dark mb-4 md:mb-6", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430" }), _jsxs("ul", { className: "space-y-4", children: [_jsxs("li", { className: "flex items-start", children: [_jsx("svg", { className: "w-6 h-6 text-primary mr-3 mt-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-gray-600", children: "\u041E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0446\u0435\u043B\u044B\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441 \u0443\u0441\u043B\u0443\u0433" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("svg", { className: "w-6 h-6 text-primary mr-3 mt-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-gray-600", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u043C\u0435\u0441\u044F\u0446\u0435\u0432" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("svg", { className: "w-6 h-6 text-primary mr-3 mt-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-gray-600", children: "\u041A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 \u0438 \u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0430\u0440\u043E\u043A" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("svg", { className: "w-6 h-6 text-primary mr-3 mt-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-gray-600", children: "\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u043D\u0430 \u043B\u044E\u0431\u0443\u044E \u0441\u0443\u043C\u043C\u0443" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("svg", { className: "w-6 h-6 text-primary mr-3 mt-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-gray-600", children: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 md:p-8", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-dark mb-3 md:mb-4", children: "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1", children: "1" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-dark", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u043C\u043C\u0443 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u041E\u0442 1 000 \u0434\u043E 50 000 \u0440\u0443\u0431\u043B\u0435\u0439" })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1", children: "2" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-dark", children: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F" })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1", children: "3" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-dark", children: "\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430 \u043E\u043D\u043B\u0430\u0439\u043D" })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1", children: "4" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-dark", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u043D\u0430 email" })] })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 md:p-8", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-semibold text-dark mb-4 md:mb-6", children: "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" }), error && (_jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: _jsx("p", { className: "text-red-800 text-sm", children: error }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-3 font-medium", children: "\u0421\u0443\u043C\u043C\u0430 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: certificateAmounts.map((amount) => (_jsx("button", { type: "button", onClick: () => {
                                                            setUseCustomAmount(false);
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                amount: amount.value,
                                                            }));
                                                        }, className: `p-3 rounded-lg border-2 text-center transition-colors ${!useCustomAmount && formData.amount === amount.value
                                                            ? "border-primary bg-primary text-white"
                                                            : "border-gray-300 hover:border-primary"}`, children: amount.label }, amount.value))) }), _jsxs("div", { className: "mt-3", children: [_jsxs("label", { className: "inline-flex items-center gap-2 text-sm text-gray-700", children: [_jsx("input", { type: "checkbox", checked: useCustomAmount, onChange: (e) => setUseCustomAmount(e.target.checked), className: "h-4 w-4 text-primary focus:ring-primary rounded border-gray-300" }), "\u0414\u0440\u0443\u0433\u0430\u044F \u0441\u0443\u043C\u043C\u0430"] }), useCustomAmount && (_jsxs("div", { className: "mt-2 flex items-center gap-3", children: [_jsx("input", { type: "number", inputMode: "numeric", min: 1000, max: 50000, step: 100, value: formData.amount || 1000, onChange: (e) => {
                                                                        const next = Number.parseInt(e.target.value);
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            amount: Number.isNaN(next) ? prev.amount : next,
                                                                        }));
                                                                    }, className: "w-40 px-4 py-2 border rounded focus:outline-none focus:border-primary border-gray-300", placeholder: "\u041D\u0430\u043F\u0440.: 7000" }), _jsx("span", { className: "text-sm text-gray-500", children: "\u20BD (\u043E\u0442 1 000 \u0434\u043E 50 000)" })] }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-dark", children: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "recipientName", className: "block text-gray-700 mb-2", children: "\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F *" }), _jsx("input", { type: "text", id: "recipientName", name: "recipientName", value: formData.recipientName, onChange: handleChange, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432", className: `w-full px-4 py-2 border rounded focus:outline-none focus:border-primary ${fieldErrors.recipientName
                                                                ? "border-red-500 focus:border-red-500"
                                                                : "border-gray-300"}`, required: true }), fieldErrors.recipientName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: fieldErrors.recipientName }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "recipientEmail", className: "block text-gray-700 mb-2", children: "Email \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F *" }), _jsx("input", { type: "email", id: "recipientEmail", name: "recipientEmail", value: formData.recipientEmail, onChange: handleChange, className: `w-full px-4 py-2 border rounded focus:outline-none focus:border-primary ${fieldErrors.recipientEmail
                                                                ? "border-red-500 focus:border-red-500"
                                                                : "border-gray-300"}`, required: true }), fieldErrors.recipientEmail && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: fieldErrors.recipientEmail }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-dark", children: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "senderName", className: "block text-gray-700 mb-2", children: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F *" }), _jsx("input", { type: "text", id: "senderName", name: "senderName", value: formData.senderName, onChange: handleChange, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u041F\u0435\u0442\u0440 \u041F\u0435\u0442\u0440\u043E\u0432", className: `w-full px-4 py-2 border rounded focus:outline-none focus:border-primary ${fieldErrors.senderName
                                                                ? "border-red-500 focus:border-red-500"
                                                                : "border-gray-300"}`, required: true }), fieldErrors.senderName && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: fieldErrors.senderName }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "senderEmail", className: "block text-gray-700 mb-2", children: "\u0412\u0430\u0448 email *" }), _jsx("input", { type: "email", id: "senderEmail", name: "senderEmail", value: formData.senderEmail, onChange: handleChange, className: `w-full px-4 py-2 border rounded focus:outline-none focus:border-primary ${fieldErrors.senderEmail
                                                                ? "border-red-500 focus:border-red-500"
                                                                : "border-gray-300"}`, required: true }), fieldErrors.senderEmail && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: fieldErrors.senderEmail }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-gray-700 mb-2", children: "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }), _jsx("textarea", { id: "message", name: "message", value: formData.message, onChange: handleChange, rows: 4, className: "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary", placeholder: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F..." })] }), _jsx("div", { children: _jsxs("label", { className: `flex items-start space-x-3 ${!formData.agreeToSiteConsent && error ? 'text-red-600' : ''}`, children: [_jsx("input", { type: "checkbox", name: "agreeToSiteConsent", checked: formData.agreeToSiteConsent, onChange: handleChange, className: `mt-1 h-4 w-4 text-primary focus:ring-primary rounded ${!formData.agreeToSiteConsent && error
                                                            ? 'border-red-300 focus:ring-red-500'
                                                            : 'border-gray-300'}`, required: true }), _jsxs("span", { className: "text-sm text-gray-700", children: ["\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E", ' ', _jsx("a", { href: "/documents/\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435_\u043D\u0430_\u043F\u0435\u0440\u0441\u0434\u0430\u043D\u043D\u044B\u0435_\u043D\u0430_\u0441\u0430\u0438\u0306\u0442.docx", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044E \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" })] })] }) }), _jsx("button", { type: "submit", disabled: isSubmitting, className: `w-full bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`, children: isSubmitting
                                                ? "Обработка..."
                                                : `Оплатить ${certificateService.formatAmount(formData.amount)}` })] }), _jsxs("div", { className: "mt-4 text-sm text-gray-600", children: ["\u041E\u0444\u043E\u0440\u043C\u043B\u044F\u044F \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442, \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0441", ' ', _jsx("a", { href: "/documents/utverzhdeno.pdf", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u0437\u0430\u0449\u0438\u0442\u044B \u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }), "."] }), _jsx("div", { className: "mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-yellow-800", children: [_jsx("strong", { children: "\u0412\u0430\u0436\u043D\u043E:" }), " \u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 email \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0430\u043F\u043A\u0443 \"\u0421\u041F\u0410\u041C\", \u0435\u0441\u043B\u0438 \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043F\u0438\u0441\u044C\u043C\u043E."] }) })] })] })] }) }));
}
