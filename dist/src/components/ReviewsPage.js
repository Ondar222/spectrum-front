import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState } from "react";
import archimedService from "../services/archimed";
export default function ReviewsPage() {
    const [selectedDoctor, setSelectedDoctor] = useState("all");
    const [selectedService, setSelectedService] = useState("all");
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const load = async () => {
            try {
                setIsLoading(true);
                const loadedDoctors = await archimedService.getDoctors();
                setDoctors(loadedDoctors || []);
            }
            catch (e) {
                console.error("Failed to load doctors/services for reviews", e);
            }
            finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);
    const getDoctorInitials = (doctor) => {
        const name = doctor?.name || "";
        const name1 = doctor?.name1 || "";
        const name2 = doctor?.name2 || "";
        const i1 = name1 ? `${name1.charAt(0)}.` : "";
        const i2 = name2 ? `${name2.charAt(0)}.` : "";
        return `${name} ${i1} ${i2}`.trim().replace(/\s+/g, " ");
    };
    const doctorOptions = useMemo(() => {
        const names = doctors.map(getDoctorInitials).filter(Boolean);
        const unique = Array.from(new Set(names));
        return ["Все врачи", ...unique];
    }, [doctors]);
    const specialtyOptions = useMemo(() => {
        const types = doctors.map((d) => d.type).filter(Boolean);
        const unique = Array.from(new Set(types));
        return ["Все специальности", ...unique];
    }, [doctors]);
    const sampleReviews = useMemo(() => {
        const doctorList = doctors;
        const specialtyList = specialtyOptions.slice(1);
        const fallbackDoctor = "Специалист центра";
        const fallbackSpecialty = "Специальность";
        const baseTexts = [
            "Очень внимательные специалисты. Подобрали программу занятий и дали понятные рекомендации.",
            "Профессиональный подход и доброжелательная атмосфера. Изменения заметны уже после нескольких встреч.",
            "Современные методики и индивидуальный план развития. Спасибо за поддержку!",
            "Все организовано удобно и вовремя. Ребенку нравится ходить на занятия — видим прогресс.",
        ];
        const makeDate = (daysAgo) => {
            const d = new Date();
            d.setDate(d.getDate() - daysAgo);
            return d.toLocaleDateString("ru-RU");
        };
        const names = [
            "Анна К.",
            "Михаил С.",
            "Елена В.",
            "Дмитрий П.",
            "Татьяна Л.",
            "Игорь Н.",
            "Светлана Р.",
            "Павел З.",
        ];
        const count = Math.min(8, Math.max(4, doctorList.length || 4));
        return Array.from({ length: count }).map((_, idx) => ({
            id: idx + 1,
            patientName: names[idx % names.length],
            rating: 4 + (idx % 2),
            date: makeDate((idx + 1) * 3),
            doctor: getDoctorInitials(doctorList[idx % (doctorList.length || 1)]) ||
                fallbackDoctor,
            service: doctorList[idx % (doctorList.length || 1)]?.type ||
                specialtyList[idx % (specialtyList.length || 1)] ||
                fallbackSpecialty,
            text: baseTexts[idx % baseTexts.length],
        }));
    }, [doctors, specialtyOptions]);
    const filteredReviews = sampleReviews.filter((review) => {
        const doctorMatch = selectedDoctor === "all" || review.doctor === selectedDoctor;
        const serviceMatch = selectedService === "all" || review.service === selectedService;
        return doctorMatch && serviceMatch;
    });
    // Remove the last three reviews ("первые три снизу")
    const visibleReviews = filteredReviews.slice(0, Math.max(0, filteredReviews.length - 3));
    const averageRating = sampleReviews.length
        ? sampleReviews.reduce((acc, review) => acc + review.rating, 0) /
            sampleReviews.length
        : 5;
    return (_jsx("div", { className: "min-h-screen bg-lightTeal py-8 md:py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8", children: "\u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), _jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-6 md:mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx("div", { className: "text-3xl sm:text-4xl font-bold text-teal mr-4", children: averageRating.toFixed(1) }), _jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => (_jsx("svg", { className: `w-6 h-6 ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`, fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i))) })] }), _jsx("p", { className: "text-center text-gray-600" })] }), _jsx("div", { className: "bg-white rounded-lg shadow-md p-6 mb-6 md:mb-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442" }), _jsx("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal", value: selectedDoctor, onChange: (e) => setSelectedDoctor(e.target.value), children: doctorOptions.map((name) => (_jsx("option", { value: name === "Все врачи" ? "all" : name, children: name }, name))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C" }), _jsx("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal", value: selectedService, onChange: (e) => setSelectedService(e.target.value), children: specialtyOptions.map((service) => (_jsx("option", { value: service === "Все специальности" ? "all" : service, children: service }, service))) })] })] }) }), _jsx("div", { className: "space-y-6", children: visibleReviews.map((review) => (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-5 md:p-6 min-h-[200px] flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg sm:text-xl font-medium text-gray-900 leading-tight", children: review.patientName }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: review.date })] }), _jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => (_jsx("svg", { className: `w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`, fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i))) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("span", { className: "text-sm font-medium text-teal", children: review.doctor }), _jsx("span", { className: "text-sm text-gray-500 mx-2", children: "\u2022" }), _jsx("span", { className: "text-sm text-gray-500", children: review.service })] }), _jsx("p", { className: "text-gray-600 mb-4 leading-relaxed flex-grow", children: review.text }), review.photos && review.photos.length > 0 && (_jsx("div", { className: "flex space-x-2 mt-auto", children: review.photos.map((photo, index) => (_jsx("img", { src: photo, alt: `Фото отзыва ${review.patientName}`, className: "w-20 h-20 object-cover rounded-md" }, index))) }))] }, review.id))) }), _jsx("div", { className: "mt-6 md:mt-8 text-center", children: _jsx("button", { className: "bg-teal text-white px-6 py-2.5 rounded-md font-medium hover:bg-teal/90 transition-colors", children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432" }) })] }) }) }));
}
