import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    // Check if user is logged in
    useEffect(() => {
        const userData = localStorage.getItem("user_data");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            }
            catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMenuOpen]);
    // Close mobile menu when clicking outside
    useEffect(() => {
        if (!isMenuOpen)
            return;
        const handleClickOutside = (event) => {
            const target = event.target;
            if (!target.closest("[data-mobile-menu]") &&
                !target.closest("[data-menu-toggle]")) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMenuOpen]);
    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);
    return (_jsxs("header", { className: "bg-white shadow-md sticky top-0 z-40", children: [_jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "py-1 md:py-0 flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center", "aria-label": "\u0426\u0435\u043D\u0442\u0440 SpectrUM", children: [_jsx("img", { src: "/favicon.png", alt: "SpectrUM", className: "block h-8 sm:h-8 md:h-9 lg:h-10 w-auto object-contain mr-3", loading: "eager" }), _jsxs("div", { className: "leading-tight", children: [_jsx("div", { className: "text-xl sm:text-base md:text-lg font-bold text-dark", children: "SpectrUM" }), _jsx("div", { className: "text-[9px] sm:text-[11px] text-gray-500", children: "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u044F \u2022 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438\u043A\u0430 \u2022 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435" })] })] }), _jsx("nav", { className: "hidden md:flex", children: _jsxs("ul", { className: "flex space-x-4", children: [_jsx("li", { children: _jsx(Link, { to: "/", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }) }), _jsx("li", { children: _jsx(Link, { to: "/about", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u041E \u0446\u0435\u043D\u0442\u0440\u0435" }) }), _jsx("li", { children: _jsx(Link, { to: "/doctors", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B" }) }), _jsx("li", { children: _jsx(Link, { to: "/prices", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u041F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442" }) }), _jsx("li", { children: _jsx(Link, { to: "/stock", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u041D\u043E\u0432\u043E\u0441\u0442\u0438" }) }), _jsx("li", { children: _jsx(Link, { to: "/vacancies", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438" }) }), _jsx("li", { children: _jsx(Link, { to: "/reviews", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u041E\u0442\u0437\u044B\u0432\u044B" }) }), _jsx("li", { children: _jsx(Link, { to: "/questions", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u0412\u043E\u043F\u0440\u043E\u0441\u044B" }) }), _jsx("li", { children: _jsx(Link, { to: "/documents", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B" }) }), user && user.role === "staff" && (_jsx("li", { children: _jsx(Link, { to: "/staff", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u041F\u0430\u043D\u0435\u043B\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" }) })), _jsx("li", { children: _jsx(Link, { to: "/contacts", className: "text-dark hover:text-primary transition-colors text-sm", children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" }) })] }) }), _jsx("button", { className: "md:hidden text-dark p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50", onClick: () => setIsMenuOpen(!isMenuOpen), "aria-expanded": isMenuOpen, "aria-label": "Toggle menu", "data-menu-toggle": true, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: isMenuOpen ? (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })) }) })] }) }), isMenuOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 md:hidden z-40", "aria-hidden": "true" })), _jsxs("div", { className: `fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`, "data-mobile-menu": true, children: [_jsxs("div", { className: "p-4 border-b border-gray-100 flex justify-between items-center", children: [_jsxs(Link, { to: "/", className: "flex items-center", onClick: () => setIsMenuOpen(false), "aria-label": "SpectrUM", children: [_jsx("img", { src: "/favicon.png", alt: "SpectrUM", className: "h-8 w-auto object-contain mr-2", loading: "eager" }), _jsxs("div", { className: "leading-tight", children: [_jsx("div", { className: "text-xl font-bold text-dark", children: "SpectrUM" }), _jsx("div", { className: "text-[10px] text-gray-500", children: "\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u044F \u2022 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438\u043A\u0430 \u2022 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435" })] })] }), _jsx("button", { className: "text-gray-500 hover:text-dark", onClick: () => setIsMenuOpen(false), "aria-label": "Close menu", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsx("nav", { className: "p-4", children: _jsxs("ul", { className: "space-y-4", children: [_jsx("li", { children: _jsx(Link, { to: "/", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }) }), _jsx("li", { children: _jsx(Link, { to: "/about", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u041E \u0446\u0435\u043D\u0442\u0440\u0435" }) }), _jsx("li", { children: _jsx(Link, { to: "/doctors", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B" }) }), _jsx("li", { children: _jsx(Link, { to: "/prices", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u041F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442" }) }), _jsx("li", { children: _jsx(Link, { to: "/stock", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u041D\u043E\u0432\u043E\u0441\u0442\u0438" }) }), _jsx("li", { children: _jsx(Link, { to: "/vacancies", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438" }) }), _jsx("li", { children: _jsx(Link, { to: "/reviews", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u041E\u0442\u0437\u044B\u0432\u044B" }) }), _jsx("li", { children: _jsx(Link, { to: "/questions", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u0412\u043E\u043F\u0440\u043E\u0441\u044B" }) }), _jsx("li", { children: _jsx(Link, { to: "/documents", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B" }) }), user && user.role === "staff" && (_jsx("li", { children: _jsx(Link, { to: "/staff", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u041F\u0430\u043D\u0435\u043B\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" }) })), _jsx("li", { children: _jsx(Link, { to: "/contacts", className: "block py-2 text-dark hover:text-primary transition-colors", onClick: () => setIsMenuOpen(false), children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" }) })] }) })] })] }));
}
