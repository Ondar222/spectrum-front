import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import archimedService from '../services/archimed';
import { getDirectionBySlug, keywordMatch } from '../services/directions';
import { SERVICE_CATEGORIES, SERVICE_SUBCATEGORIES, groupServicesByCategory } from '../services/serviceCategories';
import AppointmentModal from './AppointmentModal';
const ServicePage = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showAllServices, setShowAllServices] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [appointmentModal, setAppointmentModal] = useState({
        isOpen: false
    });
    const direction = useMemo(() => (slug ? getDirectionBySlug(slug) : undefined), [slug]);
    useEffect(() => {
        // Всегда поднимаем страницу вверх при смене направления
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        // Мгновенно показываем данные из кэша, если они есть
        const cachedServices = archimedService.getServicesCache();
        const cachedDoctors = archimedService.getDoctorsCache();
        if (cachedServices?.length)
            setServices(cachedServices);
        if (cachedDoctors?.length)
            setDoctors(cachedDoctors);
        // Подтягиваем актуальные данные только если кэша нет
        const needFetch = (cachedServices?.length || 0) === 0 || (cachedDoctors?.length || 0) === 0;
        if (!needFetch) {
            setIsLoading(false);
            return;
        }
        const load = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [allServices, allDoctors] = await Promise.all([
                    archimedService.getServices(),
                    archimedService.getDoctors(),
                ]);
                setServices(allServices);
                setDoctors(allDoctors);
            }
            catch (e) {
                console.error(e);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            }
            finally {
                setIsLoading(false);
            }
        };
        load();
    }, [slug]);
    if (!direction) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" }), _jsx(Link, { to: "/", className: "text-primary hover:underline", children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] }) }));
    }
    const filteredServices = useMemo(() => {
        if (!direction)
            return [];
        return services.filter((s) => keywordMatch(s.group_name, direction.serviceKeywords) ||
            keywordMatch(s.name, direction.serviceKeywords) ||
            keywordMatch(s.altname, direction.serviceKeywords));
    }, [services, direction]);
    // Шаблонные услуги для раздела Пластическая хирургия (если из API ничего не пришло)
    const plasticFallbackServices = useMemo(() => ([
        { id: 90001, kind: 0, code: 'PS-001', name: 'Консультация пластического хирурга', altcode: '', altname: '', barcode: '', info: 'Первичная консультация с осмотром и планированием вмешательства', group_name: 'Пластическая хирургия', group_id: 0, mz_code: '', cito_cost: 0, duration: 0, base_cost: 1800, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
        { id: 90002, kind: 0, code: 'PS-002', name: 'Блефаропластика', altcode: '', altname: 'Хирургическая коррекция век', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: 0, mz_code: '', cito_cost: 0, duration: 0, base_cost: 45000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
        { id: 90004, kind: 0, code: 'PS-004', name: 'Липосакция', altcode: '', altname: 'Удаление локальных жировых отложений', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: 0, mz_code: '', cito_cost: 0, duration: 0, base_cost: 80000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
        { id: 90006, kind: 0, code: 'PS-006', name: 'Отопластика', altcode: '', altname: 'Коррекция формы ушей', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: 0, mz_code: '', cito_cost: 0, duration: 0, base_cost: 60000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
    ]), []);
    // Если услуг нет, подставляем шаблонные для пластической хирургии
    const effectiveServices = useMemo(() => {
        if (direction?.slug === 'plastic-surgery' && filteredServices.length === 0) {
            return plasticFallbackServices;
        }
        return filteredServices;
    }, [direction, filteredServices, plasticFallbackServices]);
    // Группируем услуги по категориям
    const groupedServices = useMemo(() => {
        return groupServicesByCategory(effectiveServices, direction?.title);
    }, [effectiveServices, direction]);
    // Получаем доступные категории для текущего направления
    const availableCategories = useMemo(() => {
        const categories = new Set();
        Object.keys(groupedServices).forEach(key => {
            const categoryId = key.split('-')[0];
            const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
            if (category) {
                categories.add(categoryId);
            }
        });
        return Array.from(categories).map(id => SERVICE_CATEGORIES.find(c => c.id === id)).filter(Boolean);
    }, [groupedServices]);
    // Получаем услуги для выбранной категории
    const servicesForCategory = useMemo(() => {
        if (selectedCategory === 'all') {
            return effectiveServices;
        }
        const categoryServices = [];
        Object.entries(groupedServices).forEach(([key, services]) => {
            if (key.startsWith(selectedCategory)) {
                categoryServices.push(...services);
            }
        });
        return categoryServices;
    }, [selectedCategory, groupedServices, effectiveServices]);
    const filteredDoctors = useMemo(() => {
        if (!direction)
            return [];
        return doctors.filter((d) => {
            const types = (d?.types || []).map((t) => t.name).join(' ');
            return (keywordMatch(d.type, direction.doctorKeywords) ||
                keywordMatch(types, direction.doctorKeywords));
        });
    }, [doctors, direction]);
    const getServicePrice = (service) => {
        return service.cito_cost > 0 ? service.cito_cost : service.base_cost;
    };
    const getDoctorInitials = (doctor) => {
        return `${doctor?.name} ${doctor?.name1?.charAt(0)}. ${doctor?.name2?.charAt(0)}.`;
    };
    const handleAppointmentClick = (service, doctor) => {
        setAppointmentModal({
            isOpen: true,
            service,
            doctor
        });
    };
    const handleAppointmentSuccess = () => {
        // Можно добавить уведомление об успешной записи
        console.log('Appointment created successfully');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsxs("section", { className: "py-12 sm:py-16 md:py-20 bg-cover bg-center relative", style: { backgroundImage: `url(/bg-hero.jpg)` }, children: [_jsx("div", { className: "absolute inset-0 bg-black/50" }), _jsx("div", { className: "container mx-auto px-3 sm:px-4 text-center text-white relative z-10", children: _jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2", children: direction.title }) })] }), _jsx("section", { className: "py-8 sm:py-10 md:py-12 bg-white", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsxs("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12", children: ["\u0423\u0441\u043B\u0443\u0433\u0438 \u043F\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044E \"", direction.title, "\""] }), availableCategories.length > 0 && (_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex flex-wrap justify-center gap-2 sm:gap-3", children: [_jsx("button", { onClick: () => setSelectedCategory('all'), className: `px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${selectedCategory === 'all'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: "\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }), availableCategories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), className: `px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors flex items-center gap-2 ${selectedCategory === category.id
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: [_jsx("span", { children: category.icon }), category.name] }, category.id)))] }) })), selectedCategory === 'all' ? (
                        // Показываем все услуги, сгруппированные по категориям
                        _jsx("div", { className: "space-y-8", children: Object.entries(groupedServices).map(([key, services]) => {
                                const categoryId = key.split('-')[0];
                                const subcategoryId = key.split('-')[1];
                                const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
                                const subcategory = subcategoryId ? SERVICE_SUBCATEGORIES.find(s => s.id === key) : null;
                                return (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 sm:p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("span", { className: "text-2xl", children: category?.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-gray-900", children: category?.name }), subcategory && (_jsx("p", { className: "text-sm text-gray-600", children: subcategory.name }))] })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: services.slice(0, 6).map((service) => (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2 text-sm sm:text-base", children: service.name }), service.altname && service.altname !== service.name && (_jsx("p", { className: "text-gray-600 mb-2 text-xs italic", children: service.altname })), _jsx("div", { className: "flex justify-between items-center", children: _jsxs("span", { className: "text-primary font-bold text-sm", children: [getServicePrice(service).toLocaleString('ru-RU'), " \u20BD"] }) })] }, service.id))) }), services.length > 6 && (_jsx("div", { className: "text-center mt-4", children: _jsxs("button", { className: "text-primary text-sm hover:underline", children: ["\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 ", services.length - 6, " \u0443\u0441\u043B\u0443\u0433"] }) }))] }, key));
                            }) })) : (
                        // Показываем услуги выбранной категории
                        _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: (showAllServices ? servicesForCategory : servicesForCategory.slice(0, 6)).map((service) => (_jsxs("div", { className: "bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full", children: [_jsxs("div", { className: "flex-grow", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 leading-tight", children: service.name }), service.altname && service.altname !== service.name && (_jsx("p", { className: "text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm italic leading-relaxed", children: service.altname })), service.info && (_jsx("p", { className: "text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-4", children: service.info }))] }), _jsx("div", { className: "flex justify-between items-center mt-auto pt-3 sm:pt-4", children: _jsxs("span", { className: "text-primary font-bold text-base sm:text-lg", children: [getServicePrice(service).toLocaleString('ru-RU'), " \u20BD"] }) })] }, service.id))) })), servicesForCategory.length > 6 && selectedCategory !== 'all' && (_jsx("div", { className: "text-center mt-6 sm:mt-8", children: _jsx("button", { onClick: () => setShowAllServices(s => !s), className: "px-4 sm:px-6 py-1.5 sm:py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors text-sm sm:text-base", children: showAllServices ? 'Скрыть' : 'Показать ещё' }) }))] }) }), filteredDoctors.length > 0 && (_jsx("section", { className: "py-8 sm:py-10 md:py-12", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12", children: "\u041D\u0430\u0448\u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8", children: filteredDoctors.map((doctor) => (_jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden text-center flex flex-col h-full", children: [_jsx("div", { className: "w-full h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center", children: doctor.photo ? (_jsx("img", { src: (new Image().src = `data:image/png;base64,${doctor.photo}`), alt: getDoctorInitials(doctor), className: "w-full h-48 sm:h-56 md:h-64 object-cover" })) : (_jsx("div", { className: "text-gray-400 text-sm sm:text-base", children: "\u0424\u043E\u0442\u043E \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442" })) }), _jsxs("div", { className: "p-4 sm:p-6 flex flex-col flex-grow", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold mb-2 text-gray-900", children: getDoctorInitials(doctor) }), _jsx("p", { className: "text-gray-600 mb-3 leading-relaxed text-sm sm:text-base", children: doctor.type }), doctor.branch && (_jsx("p", { className: "text-gray-500 text-xs sm:text-sm mb-4 leading-relaxed", children: doctor.branch })), _jsx("div", { className: "mt-auto", children: _jsx(Link, { to: `/doctors/${doctor.id}`, className: "inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium text-xs sm:text-sm", children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }) })] })] }, doctor.id))) })] }) })), _jsx("section", { className: "py-8 sm:py-10 md:py-12 bg-primary", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4 text-center", children: [_jsx("p", { className: "text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base", children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 \u0438 \u043D\u0430\u0448 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439 \u0437\u0430\u043F\u0438\u0441\u0438" }), _jsx("button", { onClick: () => handleAppointmentClick(), className: "px-6 sm:px-8 py-2 sm:py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base md:text-lg", children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D" })] }) }), _jsx(AppointmentModal, { isOpen: appointmentModal.isOpen, onClose: () => setAppointmentModal({ isOpen: false }), service: appointmentModal.service, doctor: appointmentModal.doctor, onSuccess: handleAppointmentSuccess })] }));
};
export default ServicePage;
