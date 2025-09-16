import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("[data-mobile-menu]") &&
        !target.closest("[data-menu-toggle]")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-md relative z-40">
      <div className="container mx-auto px-4">
        {/* Top bar */}

        {/* Main header */}
        <div className="py-1 md:py-0 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Клиника Алдан">
            <img
              src="/Logo.png"
              alt="Клиника Алдан"
              className="block h-36 sm:h-36 md:h-36 lg:h-28 xl:h-36 w-auto object-contain -my-3 sm:-my-3 md:-my-4"
              loading="eager"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-dark hover:text-primary transition-colors"
                >
                  О клинике
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Врачи
                </Link>
              </li>
              <li>
                <Link
                  to="/prices"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Прайс-лист
                </Link>
              </li>
              <li>
                <Link
                  to="/stock"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Акции
                </Link>
              </li>
              <li>
                <Link
                  to="/certificates"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Сертификаты
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Отзывы
                </Link>
              </li>
              <li>
                <Link
                  to="/questions"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Вопросы
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Документы
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-dark hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-dark p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            data-menu-toggle
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          aria-hidden="true"
        />
      )}

      {/* Mobile navigation sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-mobile-menu
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Клиника Алдан"
          >
            <img src="/Logo.png" alt="Клиника Алдан" className="h-36 w-auto object-contain" loading="eager" />
          </Link>
          <button
            className="text-gray-500 hover:text-dark"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                О клинике
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Врачи
              </Link>
            </li>
            <li>
              <Link
                to="/prices"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Прайс-лист
              </Link>
            </li>
            <li>
              <Link
                to="/stock"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Акции
              </Link>
            </li>
            <li>
              <Link to="/certificates" className="block py-2 text-dark hover:text-primary transition-colors">Сертификаты</Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Отзывы
              </Link>
            </li>
            <li>
              <Link
                to="/questions"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Вопросы
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Документы
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Контакты
              </Link>
            </li>
          </ul>

          {/* Временно скрыто - скрипт записи на прием
          <div className="mt-8 pt-4 border-t border-gray-100">
            <Link
              to="/appointment"
              className="block w-full bg-primary hover:bg-primaryDark text-white text-center py-3 rounded-md font-medium transition-colors"
            >
              ЗАПИСАТЬСЯ
            </Link>
          </div>
          */}
        </nav>
      </div>

      {/* Временно скрыто - скрипт записи на прием
      <div className="bg-primary hover:bg-primaryDark text-white text-center py-3 transition-colors">
        <Link to="/appointment" className="font-medium">ЗАПИСАТЬСЯ НА ПРИЕМ</Link>
      </div>
      */}
    </header>
  );
}
