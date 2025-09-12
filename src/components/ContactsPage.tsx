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
              <div className="space-y-6 flex-grow">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Адрес</h3>
                  <p className="text-gray-600 leading-relaxed flex items-center gap-2">
                    <a
                      href="https://yandex.ru/maps/?text=667000%2C%20Республика%20Тыва%2C%20город%20Кызыл%2C%20Ленина%2C%2060"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                      aria-label="Открыть адрес на карте"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                        <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                      667000, Республика Тыва, город Кызыл, Ленина, 60
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Телефон</h3>
                  <div className="text-gray-600 leading-relaxed space-y-1">
                    <p>+7 (923) 317-60-60</p>
                    <p>+7 (923) 381-60-60</p>
                    <p>+7 (923) 317-60-60</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Email</h3>
                  <p className="text-gray-600 leading-relaxed">clinicaldan@mail.ru</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Режим работы</h3>
                  <p className="text-gray-600 leading-relaxed">Пн-Пт: 08:00 - 22:00</p>
                  <p className="text-gray-600 leading-relaxed">Сб-Вс: 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Как добраться</h2>
              <div className="flex-grow" style={{ height: "520px" }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad2e4685aaf3109b93382144c62e33c664310acfba9a40f0943bec22ae4f9d8f5&amp;source=constructor&amp;z=17"
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
