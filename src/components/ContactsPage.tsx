import React from "react";
// Временно скрыто - форма обратной связи
// import ContactForm from './ContactForm';

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-lightTeal py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Контактная информация
              </h2>
              <div className="space-y-5 flex-grow text-gray-800">
                {/* Адрес */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-primary"
                    >
                      <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                    </svg>
                  </div>
                  <a
                    href="https://yandex.ru/maps/?text=667003%2C%20Республика%20Тыва%2C%20город%20Кызыл%2C%20улица%20Островского%2C%2010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                    aria-label="Открыть адрес на карте"
                  >
                    667003, Республика Тыва, город Кызыл, улица Островского, 10
                  </a>
                </div>

                {/* Телефон */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <a
                    href="tel:+79235405050"
                    className="hover:text-primary transition-colors"
                  >
                    +7 (923) 540-50-50
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a
                    className="hover:text-primary transition-colors"
                    href="mailto:spectrum_aldan@mail.ru"
                  >
                    spectrum_aldan@mail.ru
                  </a>
                </div>

                {/* Режим работы */}
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p>Пн-Пт: 08:00 - 20:00</p>
                    <p>Сб: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Как добраться
              </h2>
              <div className="flex-grow" style={{ height: "520px" }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A2278f32cc4ff75c081d1dde56b49cffae63a144dd1b287c62638de631eafb40d&amp;source=constructor"
                  width="100%"
                  height="100%"
                  className="rounded-lg"
                  title="Карта расположения клиники"
                />
              </div>
            </div>
          </div>

          {/* Временно скрыто - форма обратной связи
          <ContactForm />
          */}
        </div>
      </div>
    </div>
  );
}
