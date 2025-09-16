import type React from 'react';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    agreeToTerms: false,
    agreeToSiteConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
    
    // Очищаем ошибку валидации при изменении формы
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.agreeToSiteConsent) {
      setValidationError('Пожалуйста, примите обязательные согласия');
      return;
    }
    
    setValidationError(null);
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        agreeToTerms: false,
        agreeToSiteConsent: false,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section 
      className="py-16 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-white/20">
          <h2 className="text-2xl font-bold text-center mb-6 text-dark">Есть вопросы? Задавайте!</h2>
          <p className="text-center text-gray-600 mb-8">
            Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время.
          </p>

          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p className="text-center">Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : null}

          {validationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="text-center">{validationError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <form onSubmit={handleSubmit} className="order-1 lg:order-2 lg:col-span-2 h-full flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">Номер телефона</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="col-span-2 mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Введите ваше сообщение"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label className={`flex items-start space-x-3 ${!formData.agreeToTerms && validationError ? 'text-red-600' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={`mt-1 h-4 w-4 text-primary focus:ring-primary rounded ${
                    !formData.agreeToTerms && validationError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                  required
                />
                <span className="text-sm text-gray-700">
                Я согласен с условиями обработки персональных данных на сайте согласно{' '}
                  <a
                    href="/documents/согласие_на_персданные_на_сайт.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    согласию
                  </a>
                  {' '}и{' '}
                  <a
                    href="/documents/utverzhdeno.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    политикой конфиденциальности
                  </a>
                </span>
              </label>
            </div>

            <div className="mb-6">
            
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-primary hover:bg-primaryDark text-white py-3 px-8 rounded-md font-medium transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
            <aside className="order-2 lg:order-1 bg-gray-50 border border-gray-200 rounded-xl p-6 h-full">
              <h3 className="text-xl font-semibold text-dark mb-4">Контакты</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
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
                </div>
                <div><a href="tel:+79233176060" className="text-primary hover:underline">+7 (923) 317-60-60</a></div>
                <div><a href="tel:+79233816060" className="text-primary hover:underline">+7 (923) 381-60-60</a></div>
             
                <div><a href="mailto:clinicaldan@mail.ru" className="text-primary hover:underline">clinicaldan@mail.ru</a></div>
              </div>
            </aside>
          </div>
          {/* <div className="mt-4 text-center">
            <a
              href="/documents/utverzhdeno.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Скачать документ «утверждено» (PDF)
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
