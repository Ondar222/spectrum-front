import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ServiceGrid from "./components/ServiceGrid";
import Advantages from "./components/Advantages";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Checkups from "./components/Checkups";
import DoctorsPage from "./components/DoctorsPage";
import DoctorDetailsPage from "./components/DoctorDetailsPage";
import ReviewsPage from "./components/ReviewsPage";
import PromotionsPage from "./components/PromotionsPage";
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
  return (
    <>
      <Hero />
      <ServiceGrid />
      <Checkups />
      <Advantages />
      <Testimonials />
      <ContactForm />
    </>
  );
}

function App() {
  useEffect(() => {
    // Prefetch doctors and services for instant navigation to directions
    archimedService.prefetchAll();
  }, []);

  const handleCookieAccept = () => {
    // Здесь можно добавить логику для инициализации аналитики и других сервисов
    console.log('Cookies accepted');
  };

  const handleCookieDecline = () => {
    // Здесь можно добавить логику для отключения аналитики
    console.log('Cookies declined');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutClinicPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/stock" element={<PromotionsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/questions" element={<FAQPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/certificates" element={<GiftCertificatesPage />} />
            <Route
              path="/certificates/success"
              element={<PaymentSuccessPage type="certificate" />}
            />
            <Route
              path="/certificates/cancel"
              element={<PaymentCancelPage />}
            />
            {/* Временно скрыто - маршруты сертификатов и записи на прием
            
            
            */}
            <Route path="/prices" element={<PriceListPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            {/* Временно скрыто - личный кабинет и платежи
            <Route path="/personal-cabinet" element={<PatientCabinetPage />} />
            <Route path="/payment-test" element={<PaymentTestPage />} />
            <Route
              path="/payment-test/success"
              element={<PaymentSuccessPage type="appointment" />}
            />
            <Route
              path="/payment-test/cancel"
              element={<PaymentCancelPage />}
            />
            <Route
              path="/payment-diagnostic"
              element={<PaymentDiagnosticPage />}
            />
            <Route path="/payment-monitor" element={<PaymentMonitorPage />} />
            */}
          </Routes>
        </main>
        <Footer />
        <FloatingBooking />
        <CookieNotification 
          onAccept={handleCookieAccept}
          onDecline={handleCookieDecline}
        />
      </div>
    </Router>
  );
}

export default App;
