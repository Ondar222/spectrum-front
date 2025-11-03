import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import archimedService from '../services/archimed';
const AppointmentModal = ({ isOpen, onClose, service, doctor, onSuccess }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        preferredDate: '',
        preferredTime: '',
        comments: '',
        agreeToSiteConsent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreeToSiteConsent) {
            setSubmitStatus('error');
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const appointmentData = {
                patientName: formData.patientName,
                patientPhone: formData.patientPhone,
                patientEmail: formData.patientEmail || undefined,
                preferredDate: formData.preferredDate || undefined,
                preferredTime: formData.preferredTime || undefined,
                comments: formData.comments || undefined,
                serviceId: service?.id,
                doctorId: doctor?.id
            };
            await archimedService.createAppointment(appointmentData);
            setSubmitStatus('success');
            setTimeout(() => {
                onSuccess?.();
                onClose();
                setFormData({
                    patientName: '',
                    patientPhone: '',
                    patientEmail: '',
                    preferredDate: '',
                    preferredTime: '',
                    comments: '',
                    agreeToSiteConsent: false,
                });
                setSubmitStatus('idle');
            }, 2000);
        }
        catch (error) {
            console.error('Error submitting appointment:', error);
            setSubmitStatus('error');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsx("div", { className: "bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "\u0417\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u043F\u0440\u0438\u0435\u043C" }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), service && (_jsxs("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "\u0423\u0441\u043B\u0443\u0433\u0430" }), _jsx("p", { className: "text-gray-700", children: service.name }), _jsxs("p", { className: "text-primary font-semibold mt-1", children: [(service.cito_cost > 0 ? service.cito_cost : service.base_cost).toLocaleString('ru-RU'), " \u20BD"] })] })), doctor && (_jsxs("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "\u0412\u0440\u0430\u0447" }), _jsxs("p", { className: "text-gray-700", children: [doctor.name, " ", doctor.name1, " ", doctor.name2] }), _jsx("p", { className: "text-gray-600 text-sm", children: doctor.type })] })), submitStatus === 'success' ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("svg", { className: "w-8 h-8 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430!" }), _jsx("p", { className: "text-gray-600", children: "\u041D\u0430\u0448 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F" })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "patientName", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0424\u0418\u041E *" }), _jsx("input", { type: "text", id: "patientName", name: "patientName", value: formData.patientName, onChange: handleInputChange, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0424\u0418\u041E" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "patientPhone", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D *" }), _jsx("input", { type: "tel", id: "patientPhone", name: "patientPhone", value: formData.patientPhone, onChange: handleInputChange, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent", placeholder: "+7 (___) ___-__-__" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "patientEmail", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", id: "patientEmail", name: "patientEmail", value: formData.patientEmail, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent", placeholder: "your@email.com" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "preferredDate", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0434\u0430\u0442\u0430" }), _jsx("input", { type: "date", id: "preferredDate", name: "preferredDate", value: formData.preferredDate, onChange: handleInputChange, min: new Date().toISOString().split('T')[0], className: "w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "preferredTime", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F" }), _jsx("input", { type: "time", id: "preferredTime", name: "preferredTime", value: formData.preferredTime, onChange: handleInputChange, className: "w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "comments", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438" }), _jsx("textarea", { id: "comments", name: "comments", value: formData.comments, onChange: handleInputChange, rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent", placeholder: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0432\u0430\u0448\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0435" })] }), _jsx("div", { children: _jsxs("label", { className: `flex items-start space-x-3 ${!formData.agreeToSiteConsent && submitStatus === 'error' ? 'text-red-600' : ''}`, children: [_jsx("input", { type: "checkbox", name: "agreeToSiteConsent", checked: formData.agreeToSiteConsent, onChange: handleInputChange, className: `mt-1 h-4 w-4 text-primary focus:ring-primary rounded ${!formData.agreeToSiteConsent && submitStatus === 'error'
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-300'}`, required: true }), _jsxs("span", { className: "text-sm text-gray-700", children: ["\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E", ' ', _jsx("a", { href: "/documents/\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435_\u043D\u0430_\u043F\u0435\u0440\u0441\u0434\u0430\u043D\u043D\u044B\u0435_\u043D\u0430_\u0441\u0430\u0438\u0306\u0442.docx", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044E \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" })] })] }) }), submitStatus === 'error' && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-md", children: _jsx("p", { className: "text-red-600 text-sm font-medium", children: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u0438\u043C\u0438\u0442\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F" }) })), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors", children: "\u041E\u0442\u043C\u0435\u043D\u0430" }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? 'Отправка...' : 'Записаться' })] }), _jsxs("div", { className: "pt-2 text-xs text-gray-600", children: ["\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u00AB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\u00BB, \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 ", ' ', _jsx("a", { href: "/documents/utverzhdeno.pdf", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u0437\u0430\u0449\u0438\u0442\u044B \u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }), "."] })] }))] }) }) }));
};
export default AppointmentModal;
