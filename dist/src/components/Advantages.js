import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import footerPhone from "../../public/doctorsImage/FooterPhone.jpg";
const advantages = [
    {
        id: 1,
        title: "Опытные специалисты высокой квалификации",
        description: "Междисциплинарная команда психологов и педагогов. Регулярная супервизия и повышение квалификации, работа по доказательным подходам.",
        icon: (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) })),
        color: "bg-primary",
    },
    {
        id: 2,
        title: "Современное оборудование и технологии",
        description: "Индивидуальные программы и современные методики: психология, коррекционно-развивающие занятия, развитие речи. Используем интерактивные материалы.",
        icon: (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })),
        color: "bg-primary",
    },
    {
        id: 3,
        title: "Комфортные условия для клиентов",
        description: "Безопасная и дружелюбная среда: уютные кабинеты, адаптированное оборудование, гибкий график и зона ожидания для родителей.",
        icon: (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) })),
        color: "bg-primary",
    },
];
export default function Advantages() {
    return (_jsx("section", { className: "py-6 sm:py-8 relative", style: {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url(${footerPhone})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundAttachment: "scroll",
        }, children: _jsxs("div", { className: "container mx-auto px-3 sm:px-4 relative z-10", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-dark", children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 SpectrUM" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4", children: advantages.map((advantage) => (_jsxs("div", { className: "rounded-md sm:rounded-lg overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl hover:bg-white transition-all duration-200 transform hover:-translate-y-1", children: [_jsx("div", { className: `${advantage.color} p-3 sm:p-4 text-white flex justify-center`, children: advantage.icon }), _jsxs("div", { className: "p-3 sm:p-4 bg-white/80 backdrop-blur-sm", children: [_jsx("h3", { className: "text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-dark", children: advantage.title }), _jsx("p", { className: "text-gray-700 leading-relaxed text-xs sm:text-sm", children: advantage.description })] })] }, advantage.id))) })] }) }));
}
