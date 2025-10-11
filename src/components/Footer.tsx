import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {/* Column 1: Logo and about */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
            <Link
              to="/"
              className="text-lg sm:text-xl md:text-2xl font-semibold text-white block mb-3 sm:mb-4 hover:text-primary transition-colors"
            >
              Центр SpectrUM
            </Link>
            <p className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              это образовательный центр, который направлен на всестороннее
              развитие детей разных возрастов. Специалисты ЦИР «SpectrUM»
              работают со всеми детьми, в том числе и с детьми с ограниченными
              возможностями здоровья. Так же психологи оказывают психологическую
              помощь детям и родителям.
            </p>
          </div>

          {/* Column 2: Useful links */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              Полезные ссылки
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="/documents/utverzhdeno.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform flex-shrink-0" />
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <Link
                  to="/prices"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform flex-shrink-0" />
                  Прайс-лист
                </Link>
              </li>
              <li>
                <a
                  href="/documents/согласие_на_персданные_на_сайт.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform flex-shrink-0" />
                  Согласие на обработку персональных данных
                </a>
              </li>
              {/* Временно скрыто - раздел сертификатов
              <li><a href="/certificates" className="text-gray-400 hover:text-primary">Подарочные сертификаты</a></li>
              */}

              <li>
                <Link
                  to="/doctors"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform flex-shrink-0" />
                  Специалисты
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform flex-shrink-0" />
                  Отзывы
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Документы
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-gray-200 hover:text-primary transition-colors flex items-center group text-sm sm:text-base"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact information */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              Контакты
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-gray-200 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
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
                  className="hover:text-primary transition-colors text-sm sm:text-base"
                >
                  +7 (923) 540-50-50
                </a>
              </div>

              <div className="flex items-center text-gray-200 group">
                {/* <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
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
                </div> */}
                {/* <div>
                  <a href="tel:+79233816060" className="hover:text-primary transition-colors text-sm sm:text-base">
                    +7 (923) 381-60-60
                  </a>
                  <span className="ml-2 text-sm text-gray-300">(Детская)</span>
                </div> */}
              </div>
              <div className="flex items-center text-gray-200 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
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
                  href="mailto:spectrum_aldan@mail.ru"
                  className="hover:text-primary transition-colors text-sm sm:text-base"
                >
                  spectrum_aldan@mail.ru
                </a>
              </div>
              <div className="flex items-center text-gray-200 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
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
                  <div className="text-sm sm:text-base">
                    Время работы: Пн-Пт 08:00 - 20:00
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">
                    Сб: 09:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & legal info */}
        <div className="pt-6 sm:pt-8 border-t border-white/20 text-sm">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 space-y-1.5 sm:space-y-2">
            <p className="text-gray-200 text-xs sm:text-sm">
              667003, Республика Тыва, город Кызыл, улица Островского, дом 10
            </p>
            <p className="text-gray-200 text-xs sm:text-sm">
              ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ, НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА
            </p>
            <p className="text-gray-200 text-xs sm:text-sm">
              © 2025 Центр SpectrUM. Все права защищены.
            </p>
            <p className="text-gray-200 text-xs sm:text-sm">
              <a className="text-gray-200" href="https://lana-soft.ru/">
                Разработано Lana Soft
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Cookie notice - будет заменено нашим CookieNotification компонентом */}
    </footer>
  );
}
