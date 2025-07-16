import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
  description: string;
  education: string[];
  languages: string[];
  isAvailable: boolean;
  price: string;
  schedule: string;
  services: string[];
  certifications: string[];
  reviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[];
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Иванова Анна Петровна',
    specialty: 'Терапевт',
    experience: 15,
    rating: 4.9,
    image: '/images/doctor1.jpg',
    description: 'Высококвалифицированный терапевт с большим опытом работы. Специализируется на лечении и профилактике заболеваний внутренних органов.',
    education: ['МГМУ им. И.М. Сеченова', 'Клиническая ординатура по терапии'],
    languages: ['Русский', 'Английский'],
    isAvailable: true,
    price: '2 500 ₽',
    schedule: 'Пн-Пт: 9:00-18:00',
    services: [
      'Консультация терапевта',
      'Диагностика заболеваний',
      'Назначение лечения',
      'Профилактические осмотры',
      'Ведение хронических заболеваний'
    ],
    certifications: [
      'Сертификат по терапии',
      'Сертификат по функциональной диагностике',
      'Сертификат по профилактической медицине'
    ],
    reviews: [
      {
        author: 'Мария С.',
        rating: 5,
        text: 'Очень внимательный и профессиональный врач. Всегда находит время для подробного объяснения диагноза и лечения.',
        date: '15.03.2024'
      },
      {
        author: 'Александр К.',
        rating: 4,
        text: 'Хороший специалист, но иногда приходится ждать приема дольше назначенного времени.',
        date: '10.03.2024'
      }
    ]
  },
  // ... other doctors data
];

export default function DoctorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === Number(id));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-lightTeal flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Доктор не найден</h1>
          <button
            onClick={() => navigate('/doctors')}
            className="bg-teal text-white px-6 py-2 rounded-md hover:bg-teal/90 transition-colors"
          >
            Вернуться к списку врачей
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightTeal py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/doctors')}
          className="mb-8 text-teal hover:text-teal/80 transition-colors"
        >
          ← Вернуться к списку врачей
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600">{doctor.specialty}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">{doctor.experience} лет опыта</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(doctor.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{doctor.rating}</span>
                  </div>
                </div>
                {doctor.isAvailable && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Доступен
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">{doctor.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-2">Образование:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {doctor.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Языки:</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">График работы:</h3>
                  <p className="text-gray-600">{doctor.schedule}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Стоимость приема:</h3>
                  <p className="text-gray-600">{doctor.price}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Услуги:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {doctor.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Сертификаты:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {doctor.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Отзывы:</h3>
                <div className="space-y-4">
                  {doctor.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{review.author}</span>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">{doctor.price}</span>
                <button className="bg-teal text-white px-6 py-2 rounded-md hover:bg-teal/90 transition-colors">
                  Записаться на прием
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 