import React from "react";

export default function Footer() {

  return (
    <footer 
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and about */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <a
              href="/"
              className="text-2xl font-semibold text-white block mb-4 hover:text-primary transition-colors"
            >
              КЛИНИКА АЛДАН
            </a>
            <p className="text-gray-200 mb-4 leading-relaxed">
              Современная медицинская клиника с высококвалифицированными
              специалистами. Мы предоставляем полный спектр медицинских услуг с
              использованием передовых технологий.
            </p>
          </div>

          {/* Column 2: Useful links */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-6 text-white">Полезные ссылки</h3>
            <ul className="space-y-3">
              <li>
                <a href="/online/" className="text-gray-200 hover:text-primary transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  ONLINE консультации
                </a>
              </li>
              <li>
                <a href="/documents/utverzhdeno.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  Политикой конфиденциальности
                </a>
              </li>
              <li>
                <a href="/prices" className="text-gray-200 hover:text-primary transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  Прайс-лист
                </a>
              </li>
              <li>
                <a href="/documents/согласие_на_персданные_на_сайт.docx" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  Согласие на обработку персональных данных
                </a>
              </li>
              {/* Временно скрыто - раздел сертификатов
              <li><a href="/certificates" className="text-gray-400 hover:text-primary">Подарочные сертификаты</a></li>
              */}
              <li>
                <a
                  href="/services/"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  Услуги
                </a>
              </li>
              <li>
                <a
                  href="/doctors/"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  Врачи
                </a>
              </li>
              <li>
                <a
                  href="/reviews/"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform" />
                  Отзывы
                </a>
              </li>
              <li>
                <a
                  href="/documents/"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Документы
                </a>
              </li>
              <li>
                <a
                  href="/contacts/"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact information */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-6 text-white">Контакты</h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-200 group">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
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
                <a href="tel:+79233816060" className="hover:text-primary transition-colors">
                  +7 (923) 381-60-60
                </a>
              </p>
              <p className="flex items-center text-gray-200 group">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
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
                <a href="tel:+79233176060" className="hover:text-primary transition-colors">
                  +7 (923) 317-60-60
                </a>
              </p>
              <p className="flex items-center text-gray-200 group">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
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
                <div>
                  <a href="tel:+79233816060" className="hover:text-primary transition-colors">
                    +7 (923) 381-60-60
                  </a>
                  <span className="ml-2 text-sm text-gray-300">(Детская)</span>
                </div>
              </p>
              <p className="flex items-center text-gray-200 group">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
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
                  href="mailto:clinicaldan@mail.ru"
                  className="hover:text-primary transition-colors"
                >
                  clinicaldan@mail.ru
                </a>
              </p>
              <p className="flex items-center text-gray-200 group">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
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
                  <div>Время работы: Пн-Пт 08:00 - 22:00</div>
                  <div className="text-sm text-gray-300">Сб-Вс: 09:00 - 18:00</div>
                </div>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & legal info */}
        <div className="pt-8 border-top border-white/20 text-sm">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-2">
            <p className="text-gray-200">
              ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АЛДАН" ИНН: 1701049398
              667000, Республика Тыва, город Кызыл, ул. Ленина, д. 60, офис 1
            </p>
            <p className="text-gray-200">
              ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ, НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА
            </p>
            <p className="text-gray-200">© 2025 КЛИНИКА АЛДАН. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
            <p className="text-gray-200">Разработано Lana Soft</p>
          </div>
        </div>
      </div>

      {/* Cookie notice - будет заменено нашим CookieNotification компонентом */}
    </footer>
  );
}
