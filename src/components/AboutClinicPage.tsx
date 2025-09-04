import React from 'react';

export default function AboutClinicPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-dark">О клинике Алдан</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Современная медицинская клиника с высококвалифицированными специалистами. Мы предоставляем полный спектр медицинских услуг с использованием передовых технологий и индивидуальным подходом к каждому пациенту.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-dark">Наша миссия</h2>
              <p className="text-gray-600">
                Мы стремимся обеспечить доступную и качественную медицинскую помощь, используя современные методы диагностики и лечения. Наша цель - помочь каждому пациенту достичь оптимального здоровья и благополучия.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-dark">Преимущества клиники</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Современное оборудование и технологии</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Опытные врачи с высокой квалификацией</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Индивидуальный подход к каждому пациенту</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Удобное расположение и график работы</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-dark">Наши направления</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-dark">Диагностика</h3>
                  <p className="text-sm text-gray-600">Современные методы обследования</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-dark">Лечение</h3>
                  <p className="text-sm text-gray-600">Эффективные методы терапии</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-dark">Профилактика</h3>
                  <p className="text-sm text-gray-600">Предупреждение заболеваний</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-dark">Реабилитация</h3>
                  <p className="text-sm text-gray-600">Восстановление здоровья</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-dark">Наши достижения</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-gray-600">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30+</div>
                  <div className="text-gray-600">Специалистов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-gray-600">Довольных пациентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-gray-600">Медицинских направлений</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-dark">Контактная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <svg className="w-8 h-8 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-semibold mb-2 text-dark">Адрес</h3>
              <p className="text-gray-600">г. Москва, ул. Медицинская, 123</p>
            </div>
            <div className="text-center">
              <svg className="w-8 h-8 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="font-semibold mb-2 text-dark">Телефон</h3>
              <p className="text-gray-600">+7 (XXX) XXX-XX-XX</p>
            </div>
            <div className="text-center">
              <svg className="w-8 h-8 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold mb-2 text-dark">Email</h3>
              <p className="text-gray-600">info@aldan-clinic.ru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 