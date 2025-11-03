import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import archimedService from "../services/archimed";
import ErrorComponent from "./ErrorComponent";
import AppointmentModal from "./AppointmentModal";
export default function PriceListPage() {
    const [serviceGroups, setServiceGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [gynFilter, setGynFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentModal, setAppointmentModal] = useState({
        isOpen: false,
    });
    const [currentPage, setCurrentPage] = useState({});
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [popularServices, setPopularServices] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState({});
    const [expandedService, setExpandedService] = useState({});
    const location = useLocation();
    useEffect(() => {
        const loadServices = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const services = await archimedService.getServices();
                // Группируем услуги по group_name (кастомные образовательные услуги)
                const groupedServices = services.reduce((groups, service) => {
                    const existingGroup = groups.find((group) => group.id === service.group_id);
                    if (existingGroup) {
                        existingGroup.services.push(service);
                    }
                    else {
                        groups.push({
                            id: service.group_id,
                            name: service.group_name,
                            services: [service],
                        });
                    }
                    return groups;
                }, []);
                setServiceGroups(groupedServices);
                // Определяем популярные услуги (первые 6 с наименьшей стоимостью)
                const popular = services
                    .filter((service) => service.base_cost > 0)
                    .sort((a, b) => a.base_cost - b.base_cost)
                    .slice(0, 6);
                setPopularServices(popular);
            }
            catch (err) {
                console.error("Ошибка загрузки услуг:", err);
                setError("Не удалось загрузить прайс-лист. Попробуйте позже.");
            }
            finally {
                setIsLoading(false);
            }
        };
        loadServices();
    }, []);
    // Поддержка ?group=<id> для предвыбора категории
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const group = params.get("group");
        if (group)
            setSelectedGroup(group);
    }, [location.search]);
    const safeLower = (v) => (v || "").toLowerCase();
    const search = safeLower(searchTerm.trim());
    // Helpers for derived categorization
    const isAnalysis = (s) => {
        const text = safeLower([s.name, s.altname, s.info, s.group_name].join(" "));
        const keywords = [
            "анализ",
            "лаборатор",
            "пцр",
            "мазок",
            "морфолог",
            "биохим",
            "кров",
            "моч",
            "антител",
            "igg",
            "igm",
            "hbs",
            "hbv",
            "hcv",
            "urea",
            "glucose",
            "кал",
            "гистолог",
        ];
        return keywords.some((k) => text.includes(k));
    };
    const isGynecologyGroup = (_g) => false; // не используется для образовательных услуг
    const getGynSubcategory = (s) => {
        const t = safeLower([s.name, s.altname, s.info].join(" "));
        if (t.includes("консульт"))
            return "consult";
        if (t.includes("узи"))
            return "ultrasound";
        if (t.includes("лазер"))
            return "laser";
        if (isAnalysis(s))
            return "analysis";
        return "other";
    };
    const gynWeight = (s) => {
        const t = safeLower([s.name, s.altname].join(" "));
        if (t.includes("первич") && t.includes("консульт"))
            return 0;
        if (t.includes("повтор") && t.includes("консульт"))
            return 1;
        switch (getGynSubcategory(s)) {
            case "consult":
                return 2;
            case "ultrasound":
                return 3;
            case "laser":
                return 4;
            case "analysis":
                return 5;
            default:
                return 9;
        }
    };
    // Build list depending on selectedType
    let filteredGroups = [];
    if (selectedType === "lab") {
        // Collect all analysis services into a single virtual group
        const allServices = serviceGroups.flatMap((g) => g.services);
        const services = allServices.filter((s) => {
            const passesSearch = search === "" ||
                safeLower([s.name, s.altname, s.info, s.code].join(" ")).includes(search);
            return isAnalysis(s) && passesSearch;
        });
        filteredGroups = services.length
            ? [{ id: -1, name: "Лабораторная диагностика", services }]
            : [];
    }
    else {
        filteredGroups = serviceGroups
            .map((group) => {
            const filteredServices = group.services.filter((service) => {
                const matchesType = selectedType === "all" ? true : !isAnalysis(service);
                if (!matchesType)
                    return false;
                if (selectedGroup !== "all" && group.id.toString() !== selectedGroup)
                    return false;
                if (search === "")
                    return true;
                return (safeLower(service.name).includes(search) ||
                    safeLower(service.altname).includes(search) ||
                    safeLower(service.info).includes(search) ||
                    safeLower(service.code).includes(search));
            });
            // Special ordering inside gynecology
            const outputServices = isGynecologyGroup(group)
                ? [...filteredServices].sort((a, b) => gynWeight(a) - gynWeight(b))
                : filteredServices;
            return { ...group, services: outputServices };
        })
            .filter((group) => group.services.length > 0);
    }
    const formatPrice = (price) => {
        return price.toLocaleString("ru-RU") + " ₽";
    };
    const formatDuration = (minutes) => {
        if (minutes === 0)
            return "По договоренности";
        if (minutes < 60) {
            return `${minutes} мин`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0
            ? `${hours} ч ${remainingMinutes} мин`
            : `${hours} ч`;
    };
    const getServicePrice = (service) => {
        // Приоритет: cito_cost > base_cost
        return service.cito_cost > 0 ? service.cito_cost : service.base_cost;
    };
    const handleAppointmentClick = (service, doctor) => {
        setAppointmentModal({
            isOpen: true,
            service,
            doctor,
        });
    };
    const handleAppointmentSuccess = () => {
        // Можно добавить уведомление об успешной записи
        console.log("Appointment created successfully");
    };
    // Функции для пагинации
    const getCurrentPage = (groupId) => currentPage[groupId] || 1;
    const setPage = (groupId, page) => {
        setCurrentPage((prev) => ({ ...prev, [groupId]: page }));
    };
    const getPaginatedServices = (services, groupId) => {
        const page = getCurrentPage(groupId);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return services.slice(startIndex, endIndex);
    };
    const getTotalPages = (services) => {
        return Math.ceil(services.length / itemsPerPage);
    };
    const resetPagination = () => {
        setCurrentPage({});
    };
    // Сброс пагинации при изменении фильтров
    useEffect(() => {
        resetPagination();
    }, [selectedGroup, selectedType, gynFilter, searchTerm]);
    // Adaptive items per page: show more services on smaller screens and for lab analyses
    useEffect(() => {
        const computeItemsPerPage = () => {
            if (typeof window === "undefined")
                return;
            const width = window.innerWidth;
            const isMobile = width < 640; // Tailwind sm breakpoint
            const isTablet = width >= 640 && width < 1024; // sm..lg
            let per = 7;
            if (isMobile) {
                per = selectedType === "lab" ? 18 : 12;
            }
            else if (isTablet) {
                per = selectedType === "lab" ? 16 : 10;
            }
            else {
                per = selectedType === "lab" ? 14 : 9;
            }
            setItemsPerPage(per);
        };
        computeItemsPerPage();
        window.addEventListener("resize", computeItemsPerPage);
        return () => window.removeEventListener("resize", computeItemsPerPage);
    }, [selectedType]);
    // Track mobile breakpoint for accordion behavior
    useEffect(() => {
        const handleResize = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 768); // md breakpoint
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const toggleGroup = (groupId) => {
        setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
    };
    const toggleServiceDesc = (serviceId) => {
        setExpandedService((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }));
    };
    // Show instant skeleton to avoid perceived lag
    if (isLoading && serviceGroups.length === 0) {
        return (_jsx("div", { className: "min-h-screen bg-secondary py-6 md:py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 md:mb-4", children: "\u041F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442 \u0446\u0435\u043D\u0442\u0440\u0430" }), _jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-3xl mx-auto", children: "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u043D\u0430 \u0432\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u0446\u0435\u043D\u0442\u0440\u0430 SPectrUM." })] }), _jsx("div", { className: "grid gap-6", children: Array.from({ length: 4 }).map((_, i) => (_jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden animate-pulse", children: [_jsx("div", { className: "bg-primary/70 h-12 md:h-14" }), _jsx("div", { className: "divide-y divide-gray-100", children: Array.from({ length: 3 }).map((__, j) => (_jsxs("div", { className: "p-4 md:p-6 space-y-2 md:space-y-3", children: [_jsx("div", { className: "h-4 md:h-5 bg-gray-200 rounded w-2/3" }), _jsx("div", { className: "h-3 md:h-4 bg-gray-200 rounded w-1/3" }), _jsx("div", { className: "h-7 md:h-8 bg-gray-200 rounded w-24" })] }, j))) })] }, i))) })] }) }));
    }
    if (error) {
        return (_jsx(ErrorComponent, { title: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442\u0430", message: error, onRetry: () => window.location.reload() }));
    }
    return (_jsx("div", { className: "min-h-screen bg-secondary py-6 md:py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-8 md:mb-12", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 md:mb-4", children: "\u041F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442 \u0446\u0435\u043D\u0442\u0440\u0430" }), _jsx("p", { className: "text-base sm:text-lg text-gray-600 max-w-3xl mx-auto", children: "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u043D\u0430 \u0443\u0441\u043B\u0443\u0433\u0438 \u0426\u0435\u043D\u0442\u0440\u0430 SpectrUM. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0435\u0435 \u0432\u0430\u0441 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u043F\u043E\u0438\u0441\u043A\u043E\u043C \u0434\u043B\u044F \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u043D\u0430\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F \u043D\u0443\u0436\u043D\u043E\u0439 \u0443\u0441\u043B\u0443\u0433\u0438." })] }), popularServices.length > 0 && (_jsxs("div", { className: "mb-8 md:mb-12", children: [_jsxs("div", { className: "text-center mb-6 md:mb-8", children: [_jsx("h2", { className: "text-2xl md:text-3xl font-bold text-dark mb-3 md:mb-4", children: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "\u0421\u0430\u043C\u044B\u0435 \u0432\u043E\u0441\u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u043C \u0446\u0435\u043D\u0430\u043C" })] }), _jsx("div", { className: isMobile
                                ? "grid grid-cols-1 gap-2"
                                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: popularServices.map((service) => isMobile ? (_jsxs("div", { className: "border border-gray-200 rounded-lg p-2 hover:shadow-sm bg-white", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("h3", { className: "text-xs font-semibold text-dark leading-tight pr-1 line-clamp-2", children: service.name }), service.cito_cost > 0 &&
                                                            service.cito_cost !== service.base_cost && (_jsx("span", { className: "bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0", children: "\u0421\u0440\u043E\u0447\u043D\u043E" }))] }) }), _jsx("div", { className: "text-primary font-bold text-sm flex-shrink-0", children: formatPrice(getServicePrice(service)) }), (service.info ||
                                                (service.altname &&
                                                    service.altname !== service.name)) && (_jsx("button", { onClick: () => toggleServiceDesc(service.id), className: "px-2 py-1 text-[10px] text-primary border border-primary rounded-md whitespace-nowrap", children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }))] }), (service.info ||
                                        (service.altname && service.altname !== service.name)) &&
                                        expandedService[service.id] && (_jsxs("div", { className: "mt-2 text-xs text-gray-600", children: [service.altname &&
                                                service.altname !== service.name && (_jsx("p", { className: "italic mb-1", children: service.altname })), service.info && (_jsx("p", { className: "leading-relaxed", children: service.info }))] }))] }, service.id)) : (_jsxs("div", { className: "bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 md:p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-3 md:mb-4", children: [_jsx("h3", { className: "text-base md:text-lg font-semibold text-dark line-clamp-2", children: service.name }), _jsxs("div", { className: "text-right ml-4", children: [_jsx("div", { className: "text-xl md:text-2xl font-bold text-primary", children: formatPrice(getServicePrice(service)) }), service.cito_cost > 0 &&
                                                        service.cito_cost !== service.base_cost && (_jsxs("div", { className: "text-xs md:text-sm text-gray-500", children: ["\u0421\u0440\u043E\u0447\u043D\u043E: ", service.cito_cost.toLocaleString(), " \u20BD"] }))] })] }), _jsxs("div", { className: "text-xs md:text-sm text-gray-600 mb-3 md:mb-4", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }), service.duration, " \u043C\u0438\u043D"] }), _jsxs("div", { className: "flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }), service.group_name] })] })] }, service.id))) })] })), _jsx("div", { className: "bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "search", className: "block text-gray-700 mb-1 md:mb-2 font-medium text-sm md:text-base", children: "\u041F\u043E\u0438\u0441\u043A \u0443\u0441\u043B\u0443\u0433" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", id: "search", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-3 md:px-4 py-2 pl-9 md:pl-10 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm md:text-base" }), _jsx("svg", { className: "absolute left-3 top-2.5 h-4 w-4 md:h-5 md:w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "group", className: "block text-gray-700 mb-1 md:mb-2 font-medium text-sm md:text-base", children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" }), _jsxs("select", { id: "group", value: selectedGroup, onChange: (e) => setSelectedGroup(e.target.value), className: "w-full px-3 md:px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm md:text-base", children: [_jsx("option", { value: "all", children: "\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), serviceGroups.map((group) => (_jsx("option", { value: group.id.toString(), children: group.name }, group.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1 md:mb-2 font-medium text-sm md:text-base", children: "\u0422\u0438\u043F" }), _jsx("div", { className: "flex flex-wrap gap-2", children: [
                                            { key: "all", label: "Все" },
                                            // { key: "lab", label: "Диагностика" },
                                            { key: "other", label: "Другие услуги" },
                                        ].map((opt) => (_jsx("button", { type: "button", onClick: () => setSelectedType(opt.key), className: `px-2.5 md:px-3 py-1.5 md:py-2 rounded-md text-sm border ${selectedType === opt.key ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"}`, children: opt.label }, opt.key))) })] })] }) }), _jsx("div", { className: "space-y-8", children: filteredGroups.length === 0 ? (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" }) }), _jsx("h3", { className: "text-lg font-semibold text-dark mb-2", children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" }), _jsx("p", { className: "text-gray-600", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430" })] })) : (filteredGroups.map((group) => (_jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: [_jsxs("div", { className: "bg-primary text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between", onClick: () => {
                                    if (isMobile)
                                        toggleGroup(group.id);
                                }, role: "button", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg md:text-xl font-semibold", children: group.name }), _jsx("p", { className: "text-primaryLight text-xs md:text-sm mt-1", children: (() => {
                                                    const filteredServices = group.services.filter((service) => !isGynecologyGroup(group) ||
                                                        gynFilter === "all" ||
                                                        getGynSubcategory(service) === gynFilter);
                                                    const totalPages = getTotalPages(filteredServices);
                                                    const currentPage = getCurrentPage(group.id);
                                                    if (totalPages > 1) {
                                                        const startItem = (currentPage - 1) * itemsPerPage + 1;
                                                        const endItem = Math.min(currentPage * itemsPerPage, filteredServices.length);
                                                        return `${filteredServices.length} ${filteredServices.length === 1
                                                            ? "услуга"
                                                            : filteredServices.length < 5
                                                                ? "услуги"
                                                                : "услуг"} (показано ${startItem}-${endItem})`;
                                                    }
                                                    return `${filteredServices.length} ${filteredServices.length === 1
                                                        ? "услуга"
                                                        : filteredServices.length < 5
                                                            ? "услуги"
                                                            : "услуг"}`;
                                                })() })] }), _jsx("svg", { className: `md:hidden w-5 h-5 transition-transform ${expandedGroups[group.id] ? "rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })] }), (!isMobile || expandedGroups[group.id]) && (_jsxs("div", { className: "divide-y divide-gray-200", children: [isGynecologyGroup(group) && (_jsx("div", { className: "px-4 py-3 md:px-6 md:py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2", children: [
                                            { key: "all", label: "Все" },
                                            { key: "consult", label: "Консультации" },
                                            {
                                                key: "analysis",
                                                label: "Гинекологические анализы",
                                            },
                                            { key: "ultrasound", label: "Виды УЗИ" },
                                            { key: "laser", label: "Лазерная гинекология" },
                                            { key: "other", label: "Прочее" },
                                        ].map((opt) => (_jsx("button", { type: "button", onClick: () => setGynFilter(opt.key), className: `px-2.5 md:px-3 py-1.5 rounded-md text-sm border ${gynFilter === opt.key ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"}`, children: opt.label }, opt.key))) })), (() => {
                                        const filteredServices = group.services.filter((service) => !isGynecologyGroup(group) ||
                                            gynFilter === "all" ||
                                            getGynSubcategory(service) === gynFilter);
                                        const paginatedServices = getPaginatedServices(filteredServices, group.id);
                                        const totalPages = getTotalPages(filteredServices);
                                        return (_jsxs(_Fragment, { children: [isMobile ? (_jsx("div", { className: "px-2 pt-1 grid grid-cols-1 gap-2", children: paginatedServices.map((service) => (_jsxs("div", { className: "border border-gray-200 rounded-lg p-2 hover:shadow-sm bg-white", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("h3", { className: "text-sm font-semibold text-dark leading-tight pr-1 line-clamp-2", children: service.name }), service.cito_cost > 0 &&
                                                                                    service.cito_cost !==
                                                                                        service.base_cost && (_jsx("span", { className: "bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0", children: "\u0421\u0440\u043E\u0447\u043D\u043E" }))] }) }), _jsx("div", { className: "text-primary font-bold text-sm flex-shrink-0", children: formatPrice(getServicePrice(service)) }), (service.info ||
                                                                        (service.altname &&
                                                                            service.altname !== service.name)) && (_jsx("button", { onClick: () => toggleServiceDesc(service.id), className: "px-2 py-1 text-[10px] text-primary border border-primary rounded-md whitespace-nowrap", children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }))] }), (service.info ||
                                                                (service.altname &&
                                                                    service.altname !== service.name)) &&
                                                                expandedService[service.id] && (_jsxs("div", { className: "mt-2 text-xs text-gray-600", children: [service.altname &&
                                                                        service.altname !== service.name && (_jsx("p", { className: "italic mb-1", children: service.altname })), service.info && (_jsx("p", { className: "leading-relaxed", children: service.info }))] }))] }, service.id))) })) : (_jsx(_Fragment, { children: paginatedServices.map((service) => (_jsxs("div", { className: "p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col", children: [_jsxs("div", { className: "flex-grow", children: [_jsxs("div", { className: "flex items-start justify-between mb-2 sm:mb-3", children: [_jsx("h3", { className: "text-base md:text-lg font-semibold text-dark leading-tight pr-2 line-clamp-2", children: service.name }), service.cito_cost > 0 &&
                                                                                service.cito_cost !==
                                                                                    service.base_cost && (_jsx("span", { className: "bg-orange-100 text-orange-800 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium flex-shrink-0", children: "\u0421\u0440\u043E\u0447\u043D\u043E" }))] }), service.altname &&
                                                                        service.altname !== service.name && (_jsx("p", { className: "text-gray-600 mb-2 md:mb-3 text-sm italic leading-relaxed hidden sm:block", children: service.altname })), service.info && (_jsx("p", { className: "text-gray-600 mb-3 md:mb-4 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 hidden sm:block", children: service.info })), _jsxs("div", { className: `${selectedType === "lab" ? "hidden sm:flex" : "flex"} items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4`, children: [_jsxs("span", { className: "flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }), formatDuration(service.duration)] }), service.code && (_jsxs("span", { className: "flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }), "\u041A\u043E\u0434: ", service.code] }))] })] }), _jsx("div", { className: "mt-auto pt-4 border-t border-gray-200", children: _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsx("div", { className: "text-xl md:text-2xl font-bold text-primary mb-1", children: formatPrice(getServicePrice(service)) }), service.cito_cost > 0 &&
                                                                                service.cito_cost !==
                                                                                    service.base_cost && (_jsxs("div", { className: "text-xs md:text-sm text-gray-500", children: ["\u041E\u0431\u044B\u0447\u043D\u043E:", " ", formatPrice(service.base_cost)] }))] }) }) })] }, service.id))) })), totalPages > 1 && (_jsx("div", { className: "px-4 py-3 md:px-6 md:py-4 bg-gray-50 border-t border-gray-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-xs md:text-sm text-gray-600", children: ["\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E", " ", (getCurrentPage(group.id) - 1) *
                                                                        itemsPerPage +
                                                                        1, "-", Math.min(getCurrentPage(group.id) * itemsPerPage, filteredServices.length), " ", "\u0438\u0437 ", filteredServices.length] }), _jsxs("div", { className: "hidden md:flex items-center space-x-2", children: [_jsx("button", { onClick: () => setPage(group.id, getCurrentPage(group.id) - 1), disabled: getCurrentPage(group.id) === 1, className: "px-4 py-2 text-sm border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors", children: "\u2190 \u041D\u0430\u0437\u0430\u0434" }), _jsx("div", { className: "flex items-center space-x-1", children: (() => {
                                                                            const current = getCurrentPage(group.id);
                                                                            const total = totalPages;
                                                                            const pages = [];
                                                                            let start = Math.max(1, current - 2);
                                                                            let end = Math.min(total, start + 4);
                                                                            if (end - start < 4) {
                                                                                start = Math.max(1, end - 4);
                                                                            }
                                                                            if (start > 1) {
                                                                                pages.push(_jsx("button", { onClick: () => setPage(group.id, 1), className: "px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors", children: "1" }, 1));
                                                                                if (start > 2) {
                                                                                    pages.push(_jsx("span", { className: "px-2 text-gray-500", children: "..." }, "ellipsis1"));
                                                                                }
                                                                            }
                                                                            for (let i = start; i <= end; i++) {
                                                                                pages.push(_jsx("button", { onClick: () => setPage(group.id, i), className: `px-3 py-1 text-sm border rounded transition-colors ${i === current ? "bg-primary text-white border-primary" : "border-gray-200 hover:bg-gray-100"}`, children: i }, i));
                                                                            }
                                                                            if (end < total) {
                                                                                if (end < total - 1) {
                                                                                    pages.push(_jsx("span", { className: "px-2 text-gray-500", children: "..." }, "ellipsis2"));
                                                                                }
                                                                                pages.push(_jsx("button", { onClick: () => setPage(group.id, total), className: "px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 transition-colors", children: total }, total));
                                                                            }
                                                                            return pages;
                                                                        })() }), _jsx("button", { onClick: () => setPage(group.id, getCurrentPage(group.id) + 1), disabled: getCurrentPage(group.id) === totalPages, className: "px-4 py-2 text-sm border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors", children: "\u0412\u043F\u0435\u0440\u0435\u0434 \u2192" })] }), _jsxs("div", { className: "flex md:hidden items-center space-x-2", children: [getCurrentPage(group.id) < totalPages && (_jsx("button", { onClick: () => setPage(group.id, getCurrentPage(group.id) + 1), className: "px-3 py-1.5 text-sm bg-primary text-white rounded", children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451" })), getCurrentPage(group.id) > 1 && (_jsx("button", { onClick: () => setPage(group.id, 1), className: "px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100", children: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C" }))] })] }) }))] }));
                                    })()] }))] }, group.id)))) }), _jsxs("div", { className: "mt-8 md:mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8", children: [_jsx("h2", { className: "text-xl md:text-2xl font-semibold text-dark mb-4 md:mb-6", children: "\u0412\u0430\u0436\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base md:text-lg font-semibold text-dark mb-2 md:mb-3", children: "\u041E\u043F\u043B\u0430\u0442\u0430 \u0443\u0441\u043B\u0443\u0433" }), _jsxs("ul", { className: "space-y-1.5 md:space-y-2 text-gray-600 text-sm md:text-base", children: [_jsx("li", { children: "\u2022 \u041D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u0432 \u043A\u0430\u0441\u0441\u0435 \u0446\u0435\u043D\u0442\u0440\u0430" }), _jsx("li", { children: "\u2022 \u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0438\u043C\u0438 \u043A\u0430\u0440\u0442\u0430\u043C\u0438" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-base md:text-lg font-semibold text-dark mb-2 md:mb-3", children: "\u0417\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u043F\u0440\u0438\u0435\u043C" }), _jsxs("ul", { className: "space-y-1.5 md:space-y-2 text-gray-600 text-sm md:text-base", children: [_jsx("li", { children: "\u2022 \u041F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443: +7 (923) 540-50-50" }), _jsx("li", { children: "\u2022 \u041F\u0440\u0438 \u043B\u0438\u0447\u043D\u043E\u043C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u0432 \u0446\u0435\u043D\u0442\u0440" })] })] })] })] }), _jsx(AppointmentModal, { isOpen: appointmentModal.isOpen, onClose: () => setAppointmentModal({ isOpen: false }), service: appointmentModal.service, doctor: appointmentModal.doctor, onSuccess: handleAppointmentSuccess })] }) }));
}
