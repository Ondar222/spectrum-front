import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const items = [
    {
        id: "defectology",
        title: "Дефектологическая диагностика",
        lead: "Специалист помогает детям с особенностями развития: выявляет трудности обучения, мышления и расширяет представления об окружающем мире.",
        bullets: [
            "отставание в развитии",
            "задержка психического развития",
            "умственная отсталость",
        ],
        chips: [
            { label: "60 минут" },
            { label: "от 3-х лет" },
            { label: "2 200 руб." },
        ],
    },
    {
        id: "psychology",
        title: "Психологическая консультация",
        lead: "Диагностика индивидуально-психологических особенностей, поиск ресурсов и адаптивных возможностей личности.",
        bullets: [
            "личностный кризис",
            "трудности в детско-родительских отношениях",
            "эмоциональные и поведенческие проблемы",
            "психосоматические расстройства",
        ],
        chips: [
            { label: "первичная 2 200 руб." },
            { label: "от 2-х лет" },
            { label: "семейная 5 000 руб." },
        ],
    },
];
export default function DirectionsShort() {
    return (_jsx("section", { className: "py-4 sm:py-6 bg-secondary/60", children: _jsxs("div", { className: "container mx-auto", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-bold text-dark text-center mb-3", children: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E \u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u0445" }), _jsx("div", { className: "space-y-4", children: items.map((d) => (_jsxs("article", { className: "rounded-xl shadow-sm overflow-hidden bg-gradient-to-b from-white to-pink-50 border border-gray-200", children: [_jsxs("div", { className: "p-4 sm:p-6", children: [_jsx("h3", { className: "text-lg sm:text-xl font-bold text-primary mb-2", children: d.title }), _jsx("p", { className: "text-sm sm:text-base text-gray-700 mb-3", children: d.lead }), d.bullets && d.bullets.length > 0 && (_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-gray-900", children: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F" }), _jsx("ul", { className: "list-disc pl-5 mt-1 space-y-1 text-sm sm:text-base text-gray-700", children: d.bullets.map((b, i) => (_jsx("li", { children: b }, i))) })] }))] }), d.chips && d.chips.length > 0 && (_jsx("div", { className: "grid grid-cols-3 gap-2 p-3 bg-white/70", children: d.chips.map((c, i) => (_jsx("div", { className: "rounded-lg bg-gradient-to-b from-indigo-50 to-purple-50 border border-gray-200 p-3 text-center text-xs sm:text-sm font-semibold text-primary", children: c.label }, i))) }))] }, d.id))) })] }) }));
}
