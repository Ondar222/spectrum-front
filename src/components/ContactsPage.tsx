import React from 'react';
import ContactForm from './ContactForm';

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-lightTeal">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Контактная информация</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Адрес</h3>
                  <p className="text-gray-600">г. Москва, ул. Примерная, д. 123</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.373786483344!2d37.6176333!3d55.755826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a738fa419%3A0x7c347d506b52311f!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrQvtC70LvQtdC00LY!5e0!3m2!1sru!2sru!4v1645000000000!5m2!1sru!2sru"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
} 