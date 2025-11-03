import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const VACANCIES = [
    {
        id: "speed-reading",
        title: "Педагог по скорочтению",
        tags: ["частичная занятость", "дети 6–12"],
    },
    {
        id: "calligraphy",
        title: "Педагог по каллиграфии",
        tags: ["частичная занятость"],
    },
    {
        id: "mental-math",
        title: "Педагог по ментальной арифметике",
        tags: ["опыт приветствуется"],
    },
    {
        id: "english",
        title: "Преподаватель английского языка (игровая форма)",
        tags: ["дошкольники", "младшие классы"],
    },
    {
        id: "tuvan",
        title: "Преподаватель тувинского языка (игровая форма)",
        tags: ["дошкольники"],
    },
    {
        id: "after-school",
        title: "Педагог продлёнки (1–4 классы)",
        tags: ["будни"],
    },
    {
        id: "logic",
        title: "Педагог по логике для детей",
        tags: ["развивающие занятия"],
    },
];
export default function VacanciesPage() {
    return (_jsx("div", { className: "min-h-screen bg-secondary py-6 sm:py-8 md:py-10", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8", children: "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438" }), _jsx("div", { className: "max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: VACANCIES.map((v) => (_jsxs("article", { className: "bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: v.title }), v.tags?.length ? (_jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: v.tags.map((t) => (_jsx("span", { className: "text-xs bg-teal/10 text-teal px-2 py-1 rounded-full", children: t }, t))) })) : null, _jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: "\u0420\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0438\u043C \u043A\u0430\u043D\u0434\u0438\u0434\u0430\u0442\u043E\u0432 \u0441 \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0438 \u043B\u044E\u0431\u043E\u0432\u044C\u044E \u043A \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u0434\u0435\u0442\u044C\u043C\u0438." }), _jsx("div", { className: "mt-4 flex gap-2", children: _jsx("a", { href: "tel:+79235405050", className: "inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-sm font-medium transition-colors", children: "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C" }) })] }, v.id))) }), _jsxs("div", { className: "max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-8", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\u041A\u0430\u043A \u043F\u043E\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443" }), _jsxs("ol", { className: "list-decimal pl-5 space-y-1 text-gray-700 text-sm", children: [_jsx("li", { children: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E \u0440\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0441\u0435\u0431\u0435, \u043E\u043F\u044B\u0442\u0435 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u0445, \u0432 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0432\u044B \u0441\u0438\u043B\u044C\u043D\u044B." }), _jsx("li", { children: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0440\u0435\u0437\u044E\u043C\u0435/\u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0443\u0434\u043E\u0431\u043D\u044B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B \u0441\u0432\u044F\u0437\u0438." }), _jsx("li", { children: "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432 WhatsApp: +7 (923) 540\u201150\u201150." })] })] })] }) }));
}
