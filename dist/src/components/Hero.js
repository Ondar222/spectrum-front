import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import carousel from "../../public/doctorsImage/carouselPhone.jpg";
const slides = [
    {
        id: 1,
        title: "Центр SpectrUM",
        subtitle: "психология • педагогика • развитие",
        description: "Для детей и взрослых: поддержка психологов и педагогов, развитие навыков, мини-группы и индивидуальные занятия.",
        buttonText: "ПОДРОБНЕЕ",
        buttonLink: "/about",
        image: carousel,
    },
    {
        id: 2,
        title: "Комплексные программы обследования",
        subtitle: "Полная диагностика за один день",
        description: "Современные программы комплексного обследования организма позволяют выявить заболевания на ранних стадиях и предотвратить их развитие. Индивидуальный подход к каждому клиенту.",
        buttonText: "ПОДРОБНЕЕ",
        buttonLink: "/prices",
        image: carousel,
    },
];
export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            handleSlideChange((currentSlide + 1) % slides.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [currentSlide]);
    const handleSlideChange = (index) => {
        if (isAnimating || index === currentSlide)
            return;
        setIsAnimating(true);
        setCurrentSlide(index);
        // Reset animation state after transition completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };
    const nextSlide = () => {
        handleSlideChange((currentSlide + 1) % slides.length);
    };
    const prevSlide = () => {
        handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };
    return (_jsxs("section", { className: "relative h-[400px] sm:h-[450px] md:h-[400px] overflow-hidden", children: [_jsx("div", { className: "h-full relative", style: {
                    transition: "background-image 0.6s ease-in-out",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${slides[currentSlide].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                    backgroundAttachment: "scroll",
                }, children: slides.map((slide, index) => (_jsx("div", { className: `absolute inset-0 flex items-center transition-opacity duration-600 ease-in-out ${index === currentSlide
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"}`, children: _jsx("div", { className: "container mx-auto h-full flex items-center", children: _jsxs("div", { className: "max-w-3xl text-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl", children: [_jsx("h2", { className: "text-lg sm:text-xl md:text-2xl font-medium mb-1 animate-fadeInUp opacity-0", style: {
                                        animationDelay: "0.1s",
                                        animationFillMode: "forwards",
                                    }, children: slide.subtitle }), _jsx("h1", { className: "text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 animate-fadeInUp opacity-0", style: {
                                        animationDelay: "0.3s",
                                        animationFillMode: "forwards",
                                    }, children: slide.title }), _jsx("p", { className: "text-xs sm:text-sm md:text-base mb-3 sm:mb-4 animate-fadeInUp opacity-0 leading-relaxed", style: {
                                        animationDelay: "0.5s",
                                        animationFillMode: "forwards",
                                    }, children: slide.description }), _jsx(Link, { to: slide.buttonLink, className: "bg-primary hover:bg-primaryDark transition-colors text-white py-1.5 px-4 sm:py-2 sm:px-6 inline-block font-medium rounded-md animate-fadeInUp opacity-0 shadow-lg text-xs sm:text-sm", style: {
                                        animationDelay: "0.7s",
                                        animationFillMode: "forwards",
                                    }, children: slide.buttonText })] }) }) }, slide.id))) }), _jsx("button", { className: "absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-1.5 sm:p-2 rounded-full text-white transition-colors z-10 backdrop-blur-sm", onClick: prevSlide, disabled: isAnimating, "aria-label": "Previous slide", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 sm:h-5 sm:w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsx("button", { className: "absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-1.5 sm:p-2 rounded-full text-white transition-colors z-10 backdrop-blur-sm", onClick: nextSlide, disabled: isAnimating, "aria-label": "Next slide", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 sm:h-5 sm:w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) }), _jsx("div", { className: "absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10", children: slides.map((slide) => (_jsx("button", { className: `w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${slides.indexOf(slide) === currentSlide
                        ? "bg-primary w-6 sm:w-8"
                        : "bg-white/60 hover:bg-white/80"}`, onClick: () => handleSlideChange(slides.indexOf(slide)), disabled: isAnimating, "aria-label": `Go to slide ${slides.indexOf(slide) + 1}` }, `slide-indicator-${slide.id}`))) })] }));
}
