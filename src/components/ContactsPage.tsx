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
                  <p className="text-gray-600 leading-relaxed">
                    667000, Республика Тыва, город Кызыл, Ленина, 60
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
              <div className="aspect-w-16 aspect-h-9 flex-grow">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad2e4685aaf3109b93382144c62e33c664310acfba9a40f0943bec22ae4f9d8f5&amp;source=constructor"
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
