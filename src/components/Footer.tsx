import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and about */}
          <div>
            <a
              href="/"
              className="text-2xl font-semibold text-primary block mb-4"
            >
              КЛИНИКА АЛДАН
            </a>
            <p className="text-gray-400 mb-4">
              Современная медицинская клиника с высококвалифицированными
              специалистами. Мы предоставляем полный спектр медицинских услуг с
              использованием передовых технологий.
            </p>
          </div>

          {/* Column 2: Useful links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <a href="/online/" className="text-gray-400 hover:text-primary">
                  ONLINE консультации
                </a>
              </li>
              <li>
                <a href="/prices" className="text-gray-400 hover:text-primary">
                  Прайс-лист
                </a>
              </li>
              {/* Временно скрыто - раздел сертификатов
              <li><a href="/certificates" className="text-gray-400 hover:text-primary">Подарочные сертификаты</a></li>
              */}
              <li>
                <a
                  href="/services/"
                  className="text-gray-400 hover:text-primary"
                >
                  Услуги
                </a>
              </li>
              <li>
                <a
                  href="/doctors/"
                  className="text-gray-400 hover:text-primary"
                >
                  Врачи
                </a>
              </li>
              <li>
                <a
                  href="/reviews/"
                  className="text-gray-400 hover:text-primary"
                >
                  Отзывы
                </a>
              </li>
              <li>
                <a
                  href="/documents/"
                  className="text-gray-400 hover:text-primary"
                >
                  Документы
                </a>
              </li>
              <li>
                <a
                  href="/contacts/"
                  className="text-gray-400 hover:text-primary"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
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
                <a href="tel:+7XXXXXXXXXX" className="hover:text-primary">
                  +7 (XXX) XXX-XX-XX
                </a>
              </p>
              <p className="flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
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
                <a
                  href="mailto:info@aldan-clinic.ru"
                  className="hover:text-primary"
                >
                  info@aldan-clinic.ru
                </a>
              </p>
              <p className="flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
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
                <span>ПН-ПТ: 8.00 - 20.00</span>
              </p>
              <p className="flex items-center text-gray-400 ml-7">
                <span>СБ: 9.00 - 16.00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright info */}
        <div className="pt-6 border-t border-gray-700 text-center sm:text-left sm:flex sm:justify-between text-sm text-gray-400">
          <p>
            {currentYear} © Клиника Алдан. Все права защищены. |{" "}
            <a href="/privacy" className="hover:text-primary">
              Политика конфиденциальности
            </a>{" "}
            |{" "}
            <a href="/terms" className="hover:text-primary">
              Условия пользования
            </a>
          </p>

          <a
            href="/sitemap"
            className="block sm:inline-block mt-2 sm:mt-0 hover:text-primary"
          >
            Карта сайта
          </a>
        </div>
      </div>

      {/* Cookie notice */}
      <div className="bg-gray-800 py-3 px-4 text-gray-300 text-xs flex justify-between items-center">
        <p>
          Сайт использует cookies для хранения данных. Продолжая использовать
          сайт, вы даете согласие на работу с этими файлами.
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-primary hover:bg-primaryDark text-white rounded text-xs transition-colors">
            OK
          </button>
          <a
            href="/privacy"
            className="px-3 py-1 border border-gray-600 hover:border-primary text-white rounded text-xs transition-colors"
          >
            Подробнее
          </a>
        </div>
      </div>
    </footer>
  );
}
