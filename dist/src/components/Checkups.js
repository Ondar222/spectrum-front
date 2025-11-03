import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
const checkups = [
    { title: 'Чекап «Большой кардиологический»', price: 24000, doc: 'кардио чекапы.docx' },
    { title: 'Чекап «Средний кардиологический»', price: 12000, doc: 'кардио чекапы.docx' },
    { title: 'Чекап «Малый кардиологический»', price: 8000, doc: 'кардио чекапы.docx' },
    { title: 'Чекап «Большой сосудистый»', price: 16000, doc: 'сосуд.чекапы.docx' },
    { title: 'Чекап «Малый сосудистый»', price: 12000, doc: 'сосуд.чекапы.docx' },
    { title: 'Чекап «Весь организм»', price: 32000, doc: 'весь организм.docx' },
    { title: 'Чекап «Гинекологический минимум»', price: 4500, doc: 'гинеколог.чекапы.docx' },
    { title: 'Чекап «Гинекологический стандарт»', price: 12000, doc: 'гинеколог.чекапы.docx' },
    { title: 'Чекап «диагностический послеродовой»', price: 6000, doc: 'гинеколог.чекапы.docx' },
    { title: 'Чекап для диагностики ЗНО — МУЖСКОЙ', price: 16480, doc: 'мужской ЗНО чекап.docx' },
    { title: 'Чекап для диагностики ЗНО — Женский ОБШИРНЫЙ', price: 55105, doc: 'женские ЗНО чекапы.docx' },
    { title: 'Чекап для диагностики ЗНО — Женский ЕЖЕГОДНЫЙ', price: 19305, doc: 'женские ЗНО чекапы.docx' },
    { title: 'Гастро-чекап «Минимум»', price: 13000, doc: 'гастро чекапы.docx' },
    { title: 'Гастро-чекап «Расширенный»', price: 20000, doc: 'гастро чекапы.docx' },
];
// Краткие текстовые описания для отображения во всплывающем окне
const descriptions = {
    'Чекап «Большой кардиологический»': 'Расширенное обследование сердечно-сосудистой системы: консультация кардиолога, ЭКГ, ЭХО-КГ, суточное мониторирование АД/ЭКГ по показаниям, лабораторные маркеры риска.',
    'Чекап «Средний кардиологический»': 'Базовая диагностика сердца: консультация кардиолога, ЭКГ, ЭХО-КГ, ключевые анализы крови.',
    'Чекап «Малый кардиологический»': 'Скрининг сердца: ЭКГ, консультация специалиста, основные лабораторные показатели.',
    'Чекап «Большой сосудистый»': 'Комплексное обследование сосудов: УЗИ сосудов, консультация ангиолога/сосудистого хирурга, лабораторные маркеры.',
    'Чекап «Малый сосудистый»': 'Быстрый скрининг состояния сосудов с ключевыми исследованиями.',
    'Чекап «Весь организм»': 'Полный чек-ап основных систем организма: консультации профильных врачей, инструментальные и лабораторные исследования.',
    'Чекап «Гинекологический минимум»': 'Первичный гинекологический скрининг: консультация, УЗИ по показаниям, базовые анализы.',
    'Чекап «Гинекологический стандарт»': 'Расширенная гинекологическая диагностика с инструментальными и лабораторными исследованиями.',
    'Чекап «диагностический послеродовой»': 'Контрольное обследование после родов: осмотр специалиста, УЗИ по показаниям, анализы.',
    'Чекап для диагностики ЗНО — МУЖСКОЙ': 'Скрининг онкологических рисков для мужчин: консультации, лабораторные маркеры, визуализация по показаниям.',
    'Чекап для диагностики ЗНО — Женский ОБШИРНЫЙ': 'Расширенный женский онкоскрининг: консультации, инструментальная диагностика, расширенные лабораторные панели.',
    'Чекап для диагностики ЗНО — Женский ЕЖЕГОДНЫЙ': 'Ежегодный онкоскрининг для женщин с ключевыми исследованиями.',
    'Гастро-чекап «Минимум»': 'Базовая диагностика ЖКТ: консультация гастроэнтеролога, основные анализы, УЗИ по показаниям.',
    'Гастро-чекап «Расширенный»': 'Расширенное обследование ЖКТ: консультации, лабораторные маркеры, инструментальные исследования по показаниям.'
};
function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}
export default function Checkups() {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState(null);
    // По умолчанию на мобильных скрыто, на десктопе открыто
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        setIsOpen(!mq.matches);
    }, []);
    return (_jsxs("section", { className: "py-6 sm:py-10 bg-white", children: [_jsxs("div", { className: "container mx-auto px-3 sm:px-4", children: [_jsxs("div", { className: "text-center mb-4 sm:mb-6", children: [_jsx("h2", { className: "text-xl sm:text-3xl font-bold text-dark mb-2", children: "\u0427\u0435\u043A\u0430\u043F\u044B" }), _jsx("p", { className: "text-gray-600 text-xs sm:text-base", children: "\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u043E\u0431\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439" })] }), _jsx("div", { className: "text-center mb-4", children: _jsxs("button", { type: "button", onClick: () => setIsOpen((v) => !v), className: "inline-flex items-center gap-2 px-4 py-2 text-sm sm:text-base bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors", "aria-expanded": isOpen, children: [isOpen ? 'Скрыть чекапы' : 'Показать чекапы', _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: `w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`, children: _jsx("path", { fillRule: "evenodd", d: "M12 14.5l-6-6 1.5-1.5L12 11.5l4.5-4.5L18 8.5l-6 6z" }) })] }) }), isOpen && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6", children: checkups.map((item) => (_jsxs("div", { className: "bg-gray-50 hover:bg-white border border-gray-200 hover:border-primary/30 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition", children: [_jsx("div", { className: "min-h-[56px] sm:min-h-[70px] mb-2", children: _jsx("h3", { className: "text-xs sm:text-base font-semibold text-dark leading-snug", children: item.title }) }), _jsx("div", { className: "text-primary font-bold text-sm sm:text-lg mb-3", children: formatPrice(item.price) }), _jsx("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: _jsx("button", { type: "button", className: "w-full sm:w-auto inline-block text-center px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors", onClick: () => setSelected(item), "aria-haspopup": "dialog", "aria-controls": "checkup-modal", children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }) })] }, item.title))) })), _jsx("div", { className: "mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500", children: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0441 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u043C \u0441\u043E\u0441\u0442\u0430\u0432\u043E\u043C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u00AB\u0427\u0435\u043A\u0430\u043F\u044B\u00BB \u0432\u043D\u0438\u0437\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446." })] }), selected && (_jsxs("div", { id: "checkup-modal", role: "dialog", "aria-modal": "true", className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/40", onClick: () => setSelected(null) }), _jsxs("div", { className: "relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 m-0 sm:m-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base sm:text-xl font-semibold text-dark mb-1", children: selected.title }), _jsx("div", { className: "text-primary font-bold text-sm sm:text-lg", children: formatPrice(selected.price) })] }), _jsx("button", { type: "button", className: "shrink-0 rounded-md p-2 text-gray-500 hover:text-dark hover:bg-gray-100", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", onClick: () => setSelected(null), children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: _jsx("path", { fillRule: "evenodd", d: "M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] }), _jsx("div", { className: "text-sm sm:text-base text-gray-700 whitespace-pre-line", children: descriptions[selected.title] || 'Описание для этой программы появится скоро. Пожалуйста, свяжитесь с нами для подробностей.' }), _jsxs("div", { className: "mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3", children: [_jsx("a", { href: "/contacts", className: "w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors", children: "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441" }), _jsx("button", { type: "button", className: "w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-colors", onClick: () => setSelected(null), children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" })] })] })] }))] }));
}
