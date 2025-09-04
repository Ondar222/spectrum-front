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
import archimedService from "./services/archimed";
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
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
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
      </div>
    </Router>
  );
}

export default App;
