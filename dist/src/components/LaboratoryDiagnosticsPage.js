import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo } from 'react';
import archimedService from '../services/archimed';
import { SERVICE_CATEGORIES } from '../services/serviceCategories';
import AppointmentModal from './AppointmentModal';
const LaboratoryDiagnosticsPage = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [appointmentModal, setAppointmentModal] = useState({
        isOpen: false
    });
    useEffect(() => {
        const loadServices = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const servicesData = await archimedService.getServices();
                setServices(servicesData);
            }
            catch (err) {
                console.error('Ошибка загрузки услуг:', err);
                setError('Не удалось загрузить данные об услугах. Попробуйте позже.');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadServices();
    }, []);
    // Фильтруем только лабораторные услуги
    const laboratoryServices = useMemo(() => {
        const labCategory = SERVICE_CATEGORIES.find(c => c.id === 'laboratory');
        if (!labCategory)
            return [];
        return services.filter(service => labCategory.keywords.some(keyword => service.name.toLowerCase().includes(keyword) ||
            service.group_name?.toLowerCase().includes(keyword) ||
            service.altname?.toLowerCase().includes(keyword)));
    }, [services]);
    // Группируем лабораторные услуги по подкатегориям
    const groupedServices = useMemo(() => {
        const groups = {
            'blood': [],
            'urine': [],
            'biochemistry': [],
            'hormones': [],
            'infections': [],
            'cytology': [],
            'other': []
        };
        laboratoryServices.forEach(service => {
            const name = service.name.toLowerCase();
            const group = service.group_name?.toLowerCase() || '';
            if (name.includes('кровь') || name.includes('гематолог') || group.includes('кровь')) {
                groups.blood.push(service);
            }
            else if (name.includes('моча') || name.includes('мочев') || group.includes('моча')) {
                groups.urine.push(service);
            }
            else if (name.includes('биохими') || name.includes('глюкоз') || name.includes('холестерин') || group.includes('биохими')) {
                groups.biochemistry.push(service);
            }
            else if (name.includes('гормон') || name.includes('тирео') || name.includes('эстроген') || group.includes('гормон')) {
                groups.hormones.push(service);
            }
            else if (name.includes('инфекц') || name.includes('вирус') || name.includes('бактери') || name.includes('посев') || group.includes('инфекц')) {
                groups.infections.push(service);
            }
            else if (name.includes('цитолог') || name.includes('мазок') || name.includes('онкоцитолог') || group.includes('цитолог')) {
                groups.cytology.push(service);
            }
            else {
                groups.other.push(service);
            }
        });
        return groups;
    }, [laboratoryServices]);
    const getServicePrice = (service) => {
        return service.base_cost || 0;
    };
    const handleAppointmentClick = (service) => {
        setAppointmentModal({
            isOpen: true,
            service
        });
    };
    const handleAppointmentSuccess = () => {
        console.log('Appointment created successfully');
    };
    const categoryNames = {
        blood: 'Анализы крови',
        urine: 'Анализы мочи',
        biochemistry: 'Биохимические анализы',
        hormones: 'Гормональные исследования',
        infections: 'Анализы на инфекции',
        cytology: 'Цитологические исследования',
        other: 'Другие анализы'
    };
    const categoryIcons = {
        blood: '🩸',
        urine: '🧪',
        biochemistry: '⚗️',
        hormones: '⚕️',
        infections: '🦠',
        cytology: '🔬',
        other: '📋'
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12", children: _jsx("div", { className: "container mx-auto px-3 sm:px-4", children: _jsxs("div", { className: "text-center mb-8 sm:mb-10 md:mb-12", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4", children: "\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430" }), _jsx("p", { className: "text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12", children: _jsx("div", { className: "container mx-auto px-3 sm:px-4", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-dark mb-4", children: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438" }), _jsx("p", { className: "text-gray-600 mb-6", children: error }), _jsx("button", { onClick: () => window.location.reload(), className: "px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430" })] }) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsxs("section", { className: "py-12 sm:py-16 md:py-20 bg-cover bg-center relative", style: { backgroundImage: `url(/bg-hero.jpg)` }, children: [_jsx("div", { className: "absolute inset-0 bg-black/50" }), _jsxs("div", { className: "container mx-auto px-3 sm:px-4 text-center text-white relative z-10", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2", children: "\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430" }), _jsx("p", { className: "text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto", children: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0435\u043A\u0442\u0440 \u043B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u044B\u0445 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u0442\u043E\u0447\u043D\u043E\u0439 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438" })] })] }), _jsx("section", { className: "py-8 sm:py-10 md:py-12 bg-white", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12", children: "\u0412\u0438\u0434\u044B \u0430\u043D\u0430\u043B\u0438\u0437\u043E\u0432" }), _jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex flex-wrap justify-center gap-2 sm:gap-3", children: [_jsx("button", { onClick: () => setSelectedCategory('all'), className: `px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${selectedCategory === 'all'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: "\u0412\u0441\u0435 \u0430\u043D\u0430\u043B\u0438\u0437\u044B" }), Object.entries(categoryNames).map(([key, name]) => {
                                        const services = groupedServices[key];
                                        if (services.length === 0)
                                            return null;
                                        return (_jsxs("button", { onClick: () => setSelectedCategory(key), className: `px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors flex items-center gap-2 ${selectedCategory === key
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: [_jsx("span", { children: categoryIcons[key] }), name] }, key));
                                    })] }) }), selectedCategory === 'all' ? (
                        // Показываем все услуги, сгруппированные по категориям
                        _jsx("div", { className: "space-y-8", children: Object.entries(groupedServices).map(([key, services]) => {
                                if (services.length === 0)
                                    return null;
                                return (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 sm:p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: categoryIcons[key] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-gray-900", children: categoryNames[key] }), _jsxs("p", { className: "text-sm text-gray-600", children: [services.length, " \u0430\u043D\u0430\u043B\u0438\u0437\u043E\u0432"] })] })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: services.slice(0, 6).map((service) => (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2 text-sm sm:text-base", children: service.name }), service.altname && service.altname !== service.name && (_jsx("p", { className: "text-gray-600 mb-2 text-xs italic", children: service.altname })), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-primary font-bold text-sm", children: [getServicePrice(service).toLocaleString('ru-RU'), " \u20BD"] }), _jsx("button", { onClick: () => handleAppointmentClick(service), className: "px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primaryDark transition-colors", children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })] })] }, service.id))) }), services.length > 6 && (_jsx("div", { className: "text-center mt-4", children: _jsxs("button", { className: "text-primary text-sm hover:underline", children: ["\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 ", services.length - 6, " \u0430\u043D\u0430\u043B\u0438\u0437\u043E\u0432"] }) }))] }, key));
                            }) })) : (
                        // Показываем услуги выбранной категории
                        _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: groupedServices[selectedCategory]?.map((service) => (_jsxs("div", { className: "bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full", children: [_jsxs("div", { className: "flex-grow", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 leading-tight", children: service.name }), service.altname && service.altname !== service.name && (_jsx("p", { className: "text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm italic leading-relaxed", children: service.altname })), service.info && (_jsx("p", { className: "text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-4", children: service.info }))] }), _jsxs("div", { className: "flex justify-between items-center mt-auto pt-3 sm:pt-4", children: [_jsxs("span", { className: "text-primary font-bold text-base sm:text-lg", children: [getServicePrice(service).toLocaleString('ru-RU'), " \u20BD"] }), _jsx("button", { onClick: () => handleAppointmentClick(service), className: "px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-xs sm:text-sm", children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })] })] }, service.id))) }))] }) }), _jsx("section", { className: "py-8 sm:py-10 md:py-12 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12", children: "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A \u0430\u043D\u0430\u043B\u0438\u0437\u0430\u043C" }), _jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white p-4 sm:p-6 rounded-lg shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-900", children: "\u0410\u043D\u0430\u043B\u0438\u0437\u044B \u043A\u0440\u043E\u0432\u0438" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-2", children: [_jsx("li", { children: "\u2022 \u0421\u0434\u0430\u0432\u0430\u0442\u044C \u043D\u0430\u0442\u043E\u0449\u0430\u043A (8-12 \u0447\u0430\u0441\u043E\u0432 \u0431\u0435\u0437 \u0435\u0434\u044B)" }), _jsx("li", { children: "\u2022 \u041C\u043E\u0436\u043D\u043E \u043F\u0438\u0442\u044C \u0432\u043E\u0434\u0443" }), _jsx("li", { children: "\u2022 \u0418\u0437\u0431\u0435\u0433\u0430\u0442\u044C \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043D\u0430\u0433\u0440\u0443\u0437\u043E\u043A" }), _jsx("li", { children: "\u2022 \u041D\u0435 \u043A\u0443\u0440\u0438\u0442\u044C \u0437\u0430 \u0447\u0430\u0441 \u0434\u043E \u0441\u0434\u0430\u0447\u0438" })] })] }), _jsxs("div", { className: "bg-white p-4 sm:p-6 rounded-lg shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-900", children: "\u0410\u043D\u0430\u043B\u0438\u0437\u044B \u043C\u043E\u0447\u0438" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-2", children: [_jsx("li", { children: "\u2022 \u0423\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043F\u043E\u0440\u0446\u0438\u044F \u043C\u043E\u0447\u0438" }), _jsx("li", { children: "\u2022 \u0422\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0442\u0443\u0430\u043B\u0435\u0442 \u043F\u043E\u043B\u043E\u0432\u044B\u0445 \u043E\u0440\u0433\u0430\u043D\u043E\u0432" }), _jsx("li", { children: "\u2022 \u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043F\u043E\u0440\u0446\u0438\u044F \u043C\u043E\u0447\u0438" }), _jsx("li", { children: "\u2022 \u0421\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0441\u0443\u0434\u0430" })] })] }), _jsxs("div", { className: "bg-white p-4 sm:p-6 rounded-lg shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold mb-3 text-gray-900", children: "\u0413\u043E\u0440\u043C\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0430\u043D\u0430\u043B\u0438\u0437\u044B" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-2", children: [_jsx("li", { children: "\u2022 \u0421\u0442\u0440\u043E\u0433\u043E \u043D\u0430\u0442\u043E\u0449\u0430\u043A" }), _jsx("li", { children: "\u2022 \u0412 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0434\u043D\u0438 \u0446\u0438\u043A\u043B\u0430" }), _jsx("li", { children: "\u2022 \u041E\u0442\u043C\u0435\u043D\u0430 \u0433\u043E\u0440\u043C\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0435\u043F\u0430\u0440\u0430\u0442\u043E\u0432" }), _jsx("li", { children: "\u2022 \u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F \u0432\u0440\u0430\u0447\u0430" })] })] })] })] }) }), _jsx("section", { className: "py-8 sm:py-10 md:py-12 bg-primary", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4 text-center", children: [_jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6", children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0430\u043D\u0430\u043B\u0438\u0437\u044B" }), _jsx("p", { className: "text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 \u0438 \u043D\u0430\u0448 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439 \u0437\u0430\u043F\u0438\u0441\u0438" }), _jsx("button", { onClick: () => handleAppointmentClick(), className: "px-6 sm:px-8 py-2 sm:py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base md:text-lg", children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D" })] }) }), _jsx(AppointmentModal, { isOpen: appointmentModal.isOpen, onClose: () => setAppointmentModal({ isOpen: false }), service: appointmentModal.service, onSuccess: handleAppointmentSuccess })] }));
};
export default LaboratoryDiagnosticsPage;
