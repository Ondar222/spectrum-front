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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Контактная информация
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Адрес</h3>
                  <p className="text-gray-600">
                    г. Москва, ул. Примерная, д. 123
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Телефон</h3>
                  <p className="text-gray-600">8 (831) 411-11-22</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Email</h3>
                  <p className="text-gray-600">info@spectre-clinic.ru</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Режим работы</h3>
                  <p className="text-gray-600">Пн-Пт: 9:00 - 20:00</p>
                  <p className="text-gray-600">Сб-Вс: 10:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Как добраться</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad2e4685aaf3109b93382144c62e33c664310acfba9a40f0943bec22ae4f9d8f5&amp;source=constructor"
                  width="100%"
                  height="685"
                ></iframe>
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
