import React, { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  is_popular?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function PriceListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Моковые данные для демонстрации
  const mockCategories: Category[] = [
    { id: 'therapy', name: 'Терапия', icon: '🏥' },
    { id: 'diagnostics', name: 'Диагностика', icon: '🔬' },
    { id: 'surgery', name: 'Хирургия', icon: '⚕️' },
    { id: 'cosmetology', name: 'Косметология', icon: '💄' },
    { id: 'dentistry', name: 'Стоматология', icon: '🦷' },
    { id: 'ophthalmology', name: 'Офтальмология', icon: '👁️' },
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      title: 'Консультация терапевта',
      description: 'Первичная консультация врача-терапевта',
      price: 1500,
      duration: 30,
      category: 'therapy',
    },
    {
      id: '2',
      title: 'Повторная консультация терапевта',
      description: 'Повторная консультация врача-терапевта',
      price: 1200,
      duration: 20,
      category: 'therapy',
    },
    {
      id: '3',
      title: 'ЭКГ',
      description: 'Электрокардиограмма с расшифровкой',
      price: 800,
      duration: 15,
      category: 'diagnostics',
    },
    {
      id: '4',
      title: 'УЗИ брюшной полости',
      description: 'Ультразвуковое исследование органов брюшной полости',
      price: 2000,
      duration: 30,
      category: 'diagnostics',
    },
    {
      id: '5',
      title: 'УЗИ сердца',
      description: 'Эхокардиография',
      price: 2500,
      duration: 45,
      category: 'diagnostics',
    },
    {
      id: '6',
      title: 'Консультация хирурга',
      description: 'Первичная консультация врача-хирурга',
      price: 2000,
      duration: 30,
      category: 'surgery',
    },
    {
      id: '7',
      title: 'Консультация косметолога',
      description: 'Первичная консультация врача-косметолога',
      price: 1500,
      duration: 30,
      category: 'cosmetology',
    },
    {
      id: '8',
      title: 'Чистка лица',
      description: 'Механическая чистка лица',
      price: 3000,
      duration: 60,
      category: 'cosmetology',
      is_popular: true,
    },
    {
      id: '9',
      title: 'Консультация стоматолога',
      description: 'Первичная консультация врача-стоматолога',
      price: 1000,
      duration: 30,
      category: 'dentistry',
    },
    {
      id: '10',
      title: 'Лечение кариеса',
      description: 'Лечение кариеса с пломбированием',
      price: 4000,
      duration: 60,
      category: 'dentistry',
    },
    {
      id: '11',
      title: 'Консультация офтальмолога',
      description: 'Первичная консультация врача-офтальмолога',
      price: 1800,
      duration: 30,
      category: 'ophthalmology',
    },
    {
      id: '12',
      title: 'Проверка зрения',
      description: 'Комплексная проверка зрения',
      price: 1200,
      duration: 20,
      category: 'ophthalmology',
    },
  ];

  useEffect(() => {
    // Симуляция загрузки данных из API
    const loadData = async () => {
      setIsLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCategories(mockCategories);
      setServices(mockServices);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} ч ${remainingMinutes} мин` : `${hours} ч`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка прайс-листа...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">Прайс-лист клиники</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Актуальные цены на все услуги клиники Алдан. Выберите интересующее вас направление 
            или воспользуйтесь поиском для быстрого нахождения нужной услуги.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-gray-700 mb-2 font-medium">Поиск услуг</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Введите название услуги..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">Категория</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              >
                <option value="all">Все категории</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <h3 className="text-lg font-semibold text-dark mb-2">Услуги не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            filteredServices.map(service => (
              <div
                key={service.id}
                className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow ${
                  service.is_popular ? 'border-2 border-primary' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-dark">{service.title}</h3>
                      {service.is_popular && (
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          Популярно
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDuration(service.duration)}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {categories.find(cat => cat.id === service.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 text-right">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(service.price)}
                    </div>
                    <button className="bg-primary hover:bg-primaryDark text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-dark mb-6">Важная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-dark mb-3">Оплата услуг</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Наличными в кассе клиники</li>
                <li>• Банковскими картами</li>
                <li>• Через онлайн-банкинг</li>
                <li>• По полису ДМС (при наличии)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark mb-3">Запись на прием</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• По телефону: +7 (XXX) XXX-XX-XX</li>
                <li>• Через форму на сайте</li>
                <li>• В личном кабинете пациента</li>
                <li>• При личном обращении в клинику</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 