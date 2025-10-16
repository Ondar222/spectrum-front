import React from "react";

export default function AboutClinicPage() {
  const directions = [
    {
      id: "defectology",
      title: "Дефектология",
      description:
        "Диагностика и коррекционно‑развивающая работа при особенностях развития. Индивидуальные программы, сопровождение семьи и рекомендации для дома.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v12m6-6H6"
          />
        </svg>
      ),
      color: "bg-primary",
    },
    {
      id: "surdopedagogika",
      title: "Сурдопедагогика",
      description:
        "Обучение и развитие детей с нарушением слуха. Поддержка после кохлеарной имплантации, развитие речи и коммуникации.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6a3 3 0 116 0c0 3-3 3-3 6v7"
          />
        </svg>
      ),
      color: "bg-primary",
    },
    {
      id: "psychology",
      title: "Психология",
      description:
        "Индивидуальные и семейные консультации для детей, подростков и взрослых. Диагностика, развитие навыков, групповые и индивидуальные занятия.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c0 3-2 5-5 5V5a3 3 0 013-3h8v9c0 4-3 7-7 7"
          />
        </svg>
      ),
      color: "bg-primary",
    },
    {
      id: "clinical-psychology",
      title: "Клинический психолог",
      description:
        "Психодиагностика и ЭПИ‑заключения, работа с тревожными и кризисными состояниями, поддержка в процессе лечения.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7H7v10h6l4 4V3l-4 4z"
          />
        </svg>
      ),
      color: "bg-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-dark">
            Центр SpectrUM
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            психология • педагогика • развитие для детей и взрослых
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-dark">
                Наша миссия
              </h2>
              <p className="text-gray-600">
                Мы стремимся обеспечить доступную и качественную психологическую
                помощь, используя современные методы диагностики и лечения. Наша
                цель - помочь каждому клиенту достичь оптимального здоровья и
                благополучия.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-dark">
                Преимущества центра
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Разнообразные методики обучения
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Квалифицированный персонал
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Индивидуальный подход к каждому клиенту
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Комфортные условия посещения
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-dark">
                Наши направления
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                {directions.map((dir) => (
                  <div
                    key={dir.id}
                    className="group relative rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all h-full"
                  >
                    <div className="relative z-10 flex items-start gap-2 min-h-[100px]">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        {dir.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-dark mb-1 leading-snug">
                          {dir.title}
                        </h3>
                        <p
                          className="text-[11px] sm:text-xs text-gray-600 leading-snug break-words"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {dir.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-center text-dark">
            Контактная информация
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <svg
                className="w-8 h-8 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-dark">
                Адрес
              </h3>
              <a
                href="https://yandex.ru/maps/?text=%D0%B3.%20%D0%9A%D1%8B%D0%B7%D1%8B%D0%BB%2C%20%D1%83%D0%BB.%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%20%D0%B4.60"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline inline-flex items-center"
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-1 text-primary"
                >
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                </svg> */}
                667003, Республика Тыва, г. Кызыл , ул. Островского д 10
              </a>
            </div>
            <div className="text-center">
              <svg
                className="w-8 h-8 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-dark">
                Телефон
              </h3>
              <p className="text-gray-600">
                <a href="tel:+7 (923) 540-50-50">+7 (923) 540-50-50</a>
              </p>
            </div>
            <div className="text-center">
              <svg
                className="w-8 h-8 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-dark">
                Email
              </h3>
              <p className="text-gray-600">spectrum_aldan@mail.ru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
