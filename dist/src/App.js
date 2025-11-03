import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ServiceGrid from "./components/ServiceGrid";
import Advantages from "./components/Advantages";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import DoctorsPage from "./components/DoctorsPage";
import DoctorDetailsPage from "./components/DoctorDetailsPage";
import ReviewsPage from "./components/ReviewsPage";
import NewsPage from "./components/NewsPage";
import NewsDetailsPage from "./components/NewsDetailsPage";
import VacanciesPage from "./components/VacanciesPage";
import ContactsPage from "./components/ContactsPage";
import FAQPage from "./components/FAQPage";
import AboutClinicPage from "./components/AboutClinicPage";
import DocumentsPage from "./components/DocumentsPage";
// Временно скрыто - компоненты сертификатов и записи на прием
// import GiftCertificatesPage from "./components/GiftCertificatesPage";
import PriceListPage from "./components/PriceListPage";
import GiftCertificatesPage from "./components/GiftCertificatesPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import PaymentCancelPage from "./components/PaymentCancelPage";
import ServicePage from "./components/ServicePage";
import StaffDashboard from "./components/StaffDashboard";
import archimedService from "./services/archimed";
import ScrollToTop from "./components/ScrollToTop";
import CookieNotification from "./components/CookieNotification";
import CookiePolicyPage from "./components/CookiePolicyPage";
import FloatingBooking from "./components/FloatingBooking";
// Временно скрыто - личный кабинет и платежи
// import PatientCabinetPage from "./components/PatientCabinetPage";
// import PaymentSuccessPage from "./components/PaymentSuccessPage";
// import PaymentCancelPage from "./components/PaymentCancelPage";
// import PaymentTestPage from "./components/PaymentTestPage";
// import PaymentDiagnosticPage from "./components/PaymentDiagnosticPage";
// import PaymentMonitorPage from "./components/PaymentMonitorPage";
function HomePage() {
    return (_jsxs(_Fragment, { children: [_jsx(Hero, {}), _jsx(ServiceGrid, {}), _jsx(Advantages, {}), _jsx(Testimonials, {}), _jsx(ContactForm, {})] }));
}
function App() {
    useEffect(() => {
        // Prefetch doctors and services for instant navigation to directions
        archimedService.prefetchAll();
    }, []);
    const handleCookieAccept = () => {
        // Здесь можно добавить логику для инициализации аналитики и других сервисов
        console.log("Cookies accepted");
    };
    const handleCookieDecline = () => {
        // Здесь можно добавить логику для отключения аналитики
        console.log("Cookies declined");
    };
    return (_jsx(Router, { children: _jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(ScrollToTop, {}), _jsx(Header, {}), _jsx("main", { className: "flex-grow", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutClinicPage, {}) }), _jsx(Route, { path: "/doctors", element: _jsx(DoctorsPage, {}) }), _jsx(Route, { path: "/doctors/:id", element: _jsx(DoctorDetailsPage, {}) }), _jsx(Route, { path: "/reviews", element: _jsx(ReviewsPage, {}) }), _jsx(Route, { path: "/stock", element: _jsx(NewsPage, {}) }), _jsx(Route, { path: "/stock/:slug", element: _jsx(NewsDetailsPage, {}) }), _jsx(Route, { path: "/vacancies", element: _jsx(VacanciesPage, {}) }), _jsx(Route, { path: "/contacts", element: _jsx(ContactsPage, {}) }), _jsx(Route, { path: "/questions", element: _jsx(FAQPage, {}) }), _jsx(Route, { path: "/documents", element: _jsx(DocumentsPage, {}) }), _jsx(Route, { path: "/certificates", element: _jsx(GiftCertificatesPage, {}) }), _jsx(Route, { path: "/certificates/success", element: _jsx(PaymentSuccessPage, { type: "certificate" }) }), _jsx(Route, { path: "/certificates/cancel", element: _jsx(PaymentCancelPage, {}) }), _jsx(Route, { path: "/prices", element: _jsx(PriceListPage, {}) }), _jsx(Route, { path: "/services/:slug", element: _jsx(ServicePage, {}) }), _jsx(Route, { path: "/staff", element: _jsx(StaffDashboard, {}) }), _jsx(Route, { path: "/cookie-policy", element: _jsx(CookiePolicyPage, {}) })] }) }), _jsx(Footer, {}), _jsx(FloatingBooking, {}), _jsx(CookieNotification, { onAccept: handleCookieAccept, onDecline: handleCookieDecline })] }) }));
}
export default App;
