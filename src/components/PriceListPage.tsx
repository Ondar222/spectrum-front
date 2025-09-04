import React, { useState, useEffect } from 'react';
import { ApiService, ServiceGroup } from '../types/cms';
import archimedService from '../services/archimed';
import ErrorComponent from './ErrorComponent';

export default function PriceListPage() {
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const services = await archimedService.getServices();
        
        // Группируем услуги по group_name
        const groupedServices = services.reduce((groups: ServiceGroup[], service: ApiService) => {
          const existingGroup = groups.find(group => group.id === service.group_id);
          
          if (existingGroup) {
            existingGroup.services.push(service);
          } else {
            groups.push({
              id: service.group_id,
              name: service.group_name,
              services: [service]
            });
          }
          
          return groups;
        }, []);
        
        setServiceGroups(groupedServices);
      } catch (err) {
        console.error('Ошибка загрузки услуг:', err);
        setError('Не удалось загрузить прайс-лист. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const safeLower = (v?: string) => (v || '').toLowerCase();
  const search = safeLower(searchTerm.trim());

  const filteredGroups = serviceGroups
    .map(group => {
      const filteredServices = group.services.filter(service => {
        if (search === '') return true;
        return (
          safeLower(service.name).includes(search) ||
          safeLower(service.altname).includes(search) ||
          safeLower(service.info).includes(search) ||
          safeLower(service.code).includes(search)
        );
      });
      return { ...group, services: filteredServices } as ServiceGroup;
    })
    .filter(group => {
      const matchesGroup = selectedGroup === 'all' || group.id.toString() === selectedGroup;
      const hasServices = search === '' ? true : group.services.length > 0;
      return matchesGroup && hasServices;
    });

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  const formatDuration = (minutes: number) => {
    if (minutes === 0) return 'По договоренности';
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} ч ${remainingMinutes} мин` : `${hours} ч`;
  };

  const getServicePrice = (service: ApiService) => {
    // Приоритет: cito_cost > base_cost
    return service.cito_cost > 0 ? service.cito_cost : service.base_cost;
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

  if (error) {
    return (
      <ErrorComponent 
        title="Ошибка загрузки прайс-листа"
        message={error}
        onRetry={() => window.location.reload()}
      />
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

            {/* Group Filter */}
            <div>
              <label htmlFor="group" className="block text-gray-700 mb-2 font-medium">Категория</label>
              <select
                id="group"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              >
                <option value="all">Все категории</option>
                {serviceGroups.map(group => (
                  <option key={group.id} value={group.id.toString()}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {filteredGroups.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <h3 className="text-lg font-semibold text-dark mb-2">Услуги не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            filteredGroups.map(group => (
              <div key={group.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Group Header */}
                <div className="bg-primary text-white px-6 py-4">
                  <h2 className="text-xl font-semibold">{group.name}</h2>
                  <p className="text-primaryLight text-sm mt-1">
                    {group.services.length} {group.services.length === 1 ? 'услуга' : 
                     group.services.length < 5 ? 'услуги' : 'услуг'}
                  </p>
                </div>

                {/* Services in Group */}
                <div className="divide-y divide-gray-200">
                  {group.services
                    .map(service => (
                      <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-dark">{service.name}</h3>
                              {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                  Срочно
                                </span>
                              )}
                            </div>
                            {service.altname && service.altname !== service.name && (
                              <p className="text-gray-600 mb-2 text-sm italic">{service.altname}</p>
                            )}
                            {service.info && (
                              <p className="text-gray-600 mb-4 text-sm">{service.info}</p>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDuration(service.duration)}
                              </span>
                              {service.code && (
                                <span className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Код: {service.code}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6 text-right">
                            <div className="text-2xl font-bold text-primary mb-2">
                              {formatPrice(getServicePrice(service))}
                            </div>
                            {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                              <div className="text-sm text-gray-500 mb-2">
                                Обычно: {formatPrice(service.base_cost)}
                              </div>
                            )}
                            <button className="bg-primary hover:bg-primaryDark text-white px-6 py-2 rounded-md font-medium transition-colors">
                              Записаться
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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