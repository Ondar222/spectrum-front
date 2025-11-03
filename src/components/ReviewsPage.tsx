import React, { useEffect, useMemo, useState } from "react";
import type { ArchimedDoctor } from "../types/cms";
import archimedService from "../services/archimed";

interface Review {
  id: number;
  patientName: string;
  rating: number;
  date: string;
  doctor: string;
  service: string;
  text: string;
  photos?: string[];
}

export default function ReviewsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");

  const [doctors, setDoctors] = useState<ArchimedDoctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const loadedDoctors = await archimedService.getDoctors();
        setDoctors(loadedDoctors || []);
      } catch (e) {
        console.error("Failed to load doctors/services for reviews", e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const getDoctorInitials = (doctor: ArchimedDoctor) => {
    const name = doctor?.name || "";
    const name1 = doctor?.name1 || "";
    const name2 = doctor?.name2 || "";
    const i1 = name1 ? `${name1.charAt(0)}.` : "";
    const i2 = name2 ? `${name2.charAt(0)}.` : "";
    return `${name} ${i1} ${i2}`.trim().replace(/\s+/g, " ");
  };

  const doctorOptions = useMemo(() => {
    const names = doctors.map(getDoctorInitials).filter(Boolean);
    const unique = Array.from(new Set(names));
    return ["Все врачи", ...unique];
  }, [doctors]);

  const specialtyOptions = useMemo(() => {
    const types = doctors.map((d) => d.type).filter(Boolean);
    const unique = Array.from(new Set(types));
    return ["Все специальности", ...unique];
  }, [doctors]);

  const sampleReviews: Review[] = useMemo(() => {
    const doctorList = doctors;
    const specialtyList = specialtyOptions.slice(1);
    const fallbackDoctor = "Специалист центра";
    const fallbackSpecialty = "Специальность";
    const baseTexts = [
      "Очень внимательные специалисты. Подобрали программу занятий и дали понятные рекомендации.",
      "Профессиональный подход и доброжелательная атмосфера. Изменения заметны уже после нескольких встреч.",
      "Современные методики и индивидуальный план развития. Спасибо за поддержку!",
      "Все организовано удобно и вовремя. Ребенку нравится ходить на занятия — видим прогресс.",
    ];
    const makeDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toLocaleDateString("ru-RU");
    };
    const names = [
      "Анна К.",
      "Михаил С.",
      "Елена В.",
      "Дмитрий П.",
      "Татьяна Л.",
      "Игорь Н.",
      "Светлана Р.",
      "Павел З.",
    ];
    const count = Math.min(8, Math.max(4, doctorList.length || 4));
    return Array.from({ length: count }).map((_, idx) => ({
      id: idx + 1,
      patientName: names[idx % names.length],
      rating: 4 + (idx % 2),
      date: makeDate((idx + 1) * 3),
      doctor:
        getDoctorInitials(doctorList[idx % (doctorList.length || 1)]) ||
        fallbackDoctor,
      service:
        doctorList[idx % (doctorList.length || 1)]?.type ||
        specialtyList[idx % (specialtyList.length || 1)] ||
        fallbackSpecialty,
      text: baseTexts[idx % baseTexts.length],
    }));
  }, [doctors, specialtyOptions]);

  const filteredReviews = sampleReviews.filter((review) => {
    const doctorMatch =
      selectedDoctor === "all" || review.doctor === selectedDoctor;
    const serviceMatch =
      selectedService === "all" || review.service === selectedService;
    return doctorMatch && serviceMatch;
  });

  // Remove the last three reviews ("первые три снизу")
  const visibleReviews = filteredReviews.slice(
    0,
    Math.max(0, filteredReviews.length - 3)
  );

  const averageRating = sampleReviews.length
    ? sampleReviews.reduce((acc, review) => acc + review.rating, 0) /
      sampleReviews.length
    : 5;

  return (
    <div className="min-h-screen bg-lightTeal py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
            Отзывы клиентов
          </h1>

          {/* Rating summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 md:mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="text-3xl sm:text-4xl font-bold text-teal mr-4">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-center text-gray-600">
              {/* На основе {sampleReviews.length} отзывов */}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Специалист
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  {doctorOptions.map((name) => (
                    <option
                      key={name}
                      value={name === "Все врачи" ? "all" : name}
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Специальность
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  {specialtyOptions.map((service) => (
                    <option
                      key={service}
                      value={service === "Все специальности" ? "all" : service}
                    >
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-6">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-5 md:p-6 min-h-[200px] flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">
                      {review.patientName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-teal">
                    {review.doctor}
                  </span>
                  <span className="text-sm text-gray-500 mx-2">•</span>
                  <span className="text-sm text-gray-500">
                    {review.service}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  {review.text}
                </p>
                {review.photos && review.photos.length > 0 && (
                  <div className="flex space-x-2 mt-auto">
                    {review.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Фото отзыва ${review.patientName}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add review button */}
          <div className="mt-6 md:mt-8 text-center">
            <button className="bg-teal text-white px-6 py-2.5 rounded-md font-medium hover:bg-teal/90 transition-colors">
              Оставить отзыв
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
