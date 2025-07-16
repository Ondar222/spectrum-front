import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import Advantages from './components/Advantages';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import DoctorsPage from './components/DoctorsPage';
import DoctorDetailsPage from './components/DoctorDetailsPage';
import ReviewsPage from './components/ReviewsPage';
import PromotionsPage from './components/PromotionsPage';
import ContactsPage from './components/ContactsPage';
import FAQPage from './components/FAQPage';
import AboutClinicPage from './components/AboutClinicPage';
import GiftCertificatesPage from './components/GiftCertificatesPage';
import PriceListPage from './components/PriceListPage';
import PatientCabinetPage from './components/PatientCabinetPage';

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
            <Route path="/certificates" element={<GiftCertificatesPage />} />
            <Route path="/prices" element={<PriceListPage />} />
            <Route path="/personal-cabinet" element={<PatientCabinetPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
