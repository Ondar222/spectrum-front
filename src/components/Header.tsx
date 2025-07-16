import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-mobile-menu]') && !target.closest('[data-menu-toggle]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-md relative z-40">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <Link to="/contacts" className="hover:text-teal">Контакты</Link>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <a href="tel:88314111122" className="hover:text-teal">8 (831) 411-11-22</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/personal-cabinet" className="text-gray-600 hover:text-teal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-teal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-teal">
            SPECTRE
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li><Link to="/about" className="text-dark hover:text-teal transition-colors">О клинике</Link></li>
              <li><Link to="/doctors" className="text-dark hover:text-teal transition-colors">Врачи</Link></li>
              <li><Link to="/stock" className="text-dark hover:text-teal transition-colors">Акции</Link></li>
              <li><Link to="/news" className="text-dark hover:text-teal transition-colors">Новости</Link></li>
              <li><Link to="/reviews" className="text-dark hover:text-teal transition-colors">Отзывы</Link></li>
              <li><Link to="/questions" className="text-dark hover:text-teal transition-colors">Вопросы</Link></li>
              <li><Link to="/contacts" className="text-dark hover:text-teal transition-colors">Контакты</Link></li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-dark p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal/50"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-mobile-menu
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <span className="text-xl font-semibold text-teal">SPECTRE</span>
          <button
            className="text-gray-500 hover:text-dark"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-4">
            <li><Link to="/about" className="block py-2 text-dark hover:text-teal transition-colors">О клинике</Link></li>
            <li><Link to="/doctors" className="block py-2 text-dark hover:text-teal transition-colors">Врачи</Link></li>
            <li><Link to="/stock" className="block py-2 text-dark hover:text-teal transition-colors">Акции</Link></li>
            <li><Link to="/news" className="block py-2 text-dark hover:text-teal transition-colors">Новости</Link></li>
            <li><Link to="/reviews" className="block py-2 text-dark hover:text-teal transition-colors">Отзывы</Link></li>
            <li><Link to="/questions" className="block py-2 text-dark hover:text-teal transition-colors">Вопросы</Link></li>
            <li><Link to="/contacts" className="block py-2 text-dark hover:text-teal transition-colors">Контакты</Link></li>
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <Link
              to="/appointment"
              className="block w-full bg-teal text-white text-center py-3 rounded-md font-medium"
            >
              ЗАПИСАТЬСЯ
            </Link>
          </div>
        </nav>
      </div>

      {/* Call to action button */}
      <div className="bg-teal text-white text-center py-3">
        <Link to="/appointment" className="font-medium">ЗАПИСАТЬСЯ НА ПРИЕМ</Link>
      </div>
    </header>
  );
}
