import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import archimedService from "../services/archimed";
import ErrorComponent from "./ErrorComponent";
import AppointmentModal from "./AppointmentModal";
export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentModal, setAppointmentModal] = useState({
        isOpen: false,
    });
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                console.log("Начинаем загрузку данных...");
                const [doctorsData, branchesData, categoriesData] = await Promise.all([
                    archimedService.getDoctors(),
                    archimedService.getBranches(),
                    archimedService
                        .getCategories()
                        .catch(() => []),
                ]);
                console.log("Loaded doctors:", doctorsData);
                console.log("Loaded branches:", branchesData);
                console.log("Loaded categories:", categoriesData);
                console.log("Doctors count:", doctorsData?.length || 0);
                setDoctors(doctorsData || []);
                setBranches(branchesData || []);
                setCategories(categoriesData || []);
            }
            catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Не удалось загрузить данные о врачах. Попробуйте позже.");
            }
            finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);
    const normalize = (value) => value?.toString() || "";
    const normalizeRu = (s) => s
        .toLowerCase()
        .replace(/ё/g, "е")
        .replace(/[^a-zа-я0-9]+/g, " ") // убрать лишние символы
        .trim();
    const searchWords = normalizeRu(normalize(searchTerm))
        .split(/\s+/)
        .filter(Boolean);
    const filteredDoctors = doctors?.filter((doctor) => {
        const matchesBranch = selectedBranch === "all" || String(doctor?.branch_id) === selectedBranch;
        const matchesCategory = selectedCategory === "all" ||
            String(doctor?.category_id) === selectedCategory;
        const haystack = [
            doctor?.name,
            doctor?.name1,
            doctor?.name2,
            doctor?.type,
            doctor?.branch,
            doctor?.category,
            ...(doctor?.types || []).map((t) => t.name),
        ]
            .map((v) => normalizeRu(normalize(v)))
            .join(" ");
        const matchesSearch = searchWords.length === 0 ||
            searchWords.every((w) => haystack.includes(w));
        return matchesBranch && matchesCategory && matchesSearch;
    });
    const getDoctorFullName = (doctor) => {
        return `${doctor.name} ${doctor.name1} ${doctor.name2}`;
    };
    const getDoctorInitials = (doctor) => {
        return `${doctor?.name} ${doctor?.name1?.charAt(0)}. ${doctor?.name2?.charAt(0)}.`;
    };
    const handleAppointmentClick = (doctor) => {
        setAppointmentModal({
            isOpen: true,
            doctor,
        });
    };
    const handleAppointmentSuccess = () => {
        // Можно добавить уведомление об успешной записи
        console.log("Appointment created successfully");
    };
    // Instant skeleton to make page feel snappy
    if (isLoading && doctors.length === 0) {
        return (_jsx("div", { className: "min-h-screen bg-secondary py-6 sm:py-8 md:py-12", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsxs("div", { className: "text-center mb-8 sm:mb-10 md:mb-12", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4", children: "\u041D\u0430\u0448\u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B" }), _jsx("p", { className: "text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B \u0426\u0435\u043D\u0442\u0440\u0430 SpectrUM \u2014 \u043E\u043F\u044B\u0442\u043D\u044B\u0435 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438 \u0438 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438, \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0438\u0435 \u0441 \u0434\u0435\u0442\u044C\u043C\u0438, \u043F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u0430\u043C\u0438 \u0438 \u0432\u0437\u0440\u043E\u0441\u043B\u044B\u043C\u0438." })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5", children: Array.from({ length: 6 }).map((_, i) => (_jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden animate-pulse", children: [_jsx("div", { className: "h-28 sm:h-36 bg-gray-200" }), _jsxs("div", { className: "p-3 sm:p-5 space-y-2 sm:space-y-3", children: [_jsx("div", { className: "h-4 sm:h-5 bg-gray-200 rounded w-2/3" }), _jsx("div", { className: "h-3 sm:h-4 bg-gray-200 rounded w-1/3" }), _jsx("div", { className: "h-3 sm:h-4 bg-gray-200 rounded w-1/2" }), _jsx("div", { className: "h-6 sm:h-8 bg-gray-200 rounded" })] })] }, i))) })] }) }));
    }
    if (error) {
        return (_jsx(ErrorComponent, { title: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0432\u0440\u0430\u0447\u0435\u0439", message: error, onRetry: () => window.location.reload() }));
    }
    return (_jsx("div", { className: "min-h-screen bg-secondary py-6 sm:py-8 md:py-12", children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsxs("div", { className: "text-center mb-8 sm:mb-10 md:mb-12", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4", children: "\u041D\u0430\u0448\u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B" }), _jsx("p", { className: "text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B \u0426\u0435\u043D\u0442\u0440\u0430 SpectrUM \u2014 \u043E\u043F\u044B\u0442\u043D\u044B\u0435 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438 \u0438 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438, \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0438\u0435 \u0441 \u0434\u0435\u0442\u044C\u043C\u0438, \u043F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u0430\u043C\u0438 \u0438 \u0432\u0437\u0440\u043E\u0441\u043B\u044B\u043C\u0438." })] }), _jsx("div", { className: "bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { htmlFor: "search", className: "block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base", children: "\u041F\u043E\u0438\u0441\u043A \u0432\u0440\u0430\u0447\u0430" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", id: "search", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041E, \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-3 sm:px-4 py-2 pl-8 sm:pl-10 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm sm:text-base" }), _jsx("svg", { className: "absolute left-2 sm:left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "branch", className: "block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base", children: "\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435" }), _jsxs("select", { id: "branch", value: selectedBranch, onChange: (e) => setSelectedBranch(e.target.value), className: "w-full px-3 sm:px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm sm:text-base", children: [_jsx("option", { value: "all", children: "\u0412\u0441\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u044F" }), branches.map((branch) => (_jsx("option", { value: branch.id.toString(), children: branch.name }, branch.id)))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base", children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" }), _jsxs("select", { id: "category", value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "w-full px-3 sm:px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary text-sm sm:text-base", children: [_jsx("option", { value: "all", children: "\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), categories.map((category) => (_jsx("option", { value: category.id.toString(), children: category.name }, category.id)))] })] })] }) }), _jsx("div", { className: "space-y-4 sm:space-y-6", children: filteredDoctors.length === 0 ? (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center", children: [_jsx("svg", { className: "w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }), _jsx("h3", { className: "text-base sm:text-lg font-semibold text-dark mb-2", children: "\u0412\u0440\u0430\u0447\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430" })] })) : (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5", children: filteredDoctors?.map((doctor) => (_jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full", children: [_jsx("div", { className: "h-28 sm:h-44 bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center", children: doctor.photo ? (_jsxs(_Fragment, { children: [_jsx("img", { src: doctor.photo.startsWith("data:")
                                                    ? doctor.photo
                                                    : doctor.photo, alt: getDoctorFullName(doctor), className: "w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-3 sm:border-4 border-white", onError: (e) => {
                                                    e.currentTarget.style.display = "none";
                                                    const nextElement = e.currentTarget
                                                        .nextElementSibling;
                                                    if (nextElement) {
                                                        nextElement.style.display = "flex";
                                                    }
                                                } }), _jsx("div", { className: "w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center", style: { display: "none" }, children: _jsx("svg", { className: "w-8 h-8 sm:w-12 sm:h-12 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) })] })) : (_jsx("div", { className: "w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 sm:w-12 sm:h-12 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) })) }), _jsxs("div", { className: "p-3 sm:p-5 flex flex-col flex-grow", children: [_jsx("h3", { className: "text-base sm:text-lg font-semibold text-dark mb-1.5", children: getDoctorInitials(doctor) }), _jsx("p", { className: "text-primary font-medium mb-2 text-xs sm:text-sm", children: doctor.type }), _jsxs("div", { className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600 mb-3 flex-grow", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }), _jsx("span", { className: "leading-relaxed", children: doctor.branch })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("span", { className: "leading-relaxed", children: doctor.category })] }), doctor.scientific_degree &&
                                                    doctor.scientific_degree !== "Без степени" && (_jsxs("div", { className: "flex items-center", children: [_jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }), _jsx("span", { className: "leading-relaxed", children: doctor.scientific_degree })] })), _jsxs("div", { className: "flex items-center", children: [_jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsxs("span", { className: "leading-relaxed", children: ["\u041F\u0440\u0438\u0435\u043C: ", doctor.max_time, " \u043C\u0438\u043D"] })] })] }), doctor.info && (_jsx("p", { className: "text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2", children: doctor.info })), _jsx("div", { className: "flex flex-col space-y-1.5 sm:flex-row sm:space-y-0 sm:space-x-2 mt-auto", children: _jsx(Link, { to: `/doctors/${doctor.id}`, className: "w-full sm:w-auto px-3 sm:px-4 py-1 sm:py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors text-xs sm:text-sm text-center", children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }) })] })] }, `doctor-${doctor.id}`))) })) }), _jsx(AppointmentModal, { isOpen: appointmentModal.isOpen, onClose: () => setAppointmentModal({ isOpen: false }), service: appointmentModal.service, doctor: appointmentModal.doctor, onSuccess: handleAppointmentSuccess })] }) }));
}
