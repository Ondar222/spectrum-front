import React, { useState, useEffect } from 'react';
import type { ApiService, ServiceGroup, ArchimedDoctor } from '../types/cms';
import archimedService from '../services/archimed';
import ErrorComponent from './ErrorComponent';
import AppointmentModal from './AppointmentModal';

export default function PriceListPage() {
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'lab' | 'other'>('all');
  const [gynFilter, setGynFilter] = useState<'all' | 'consult' | 'analysis' | 'ultrasound' | 'laser' | 'other'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointmentModal, setAppointmentModal] = useState<{
    isOpen: boolean;
    service?: ApiService;
    doctor?: ArchimedDoctor;
  }>({
    isOpen: false
  });
  const [currentPage, setCurrentPage] = useState<{ [groupId: number]: number }>({});
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [popularServices, setPopularServices] = useState<ApiService[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{ [groupId: number]: boolean }>({});
  const [expandedService, setExpandedService] = useState<{ [serviceId: number]: boolean }>({});

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
        // Убираем стоматологию и физиотерапию
        const cleanedGroups = groupedServices.filter(group => {
          const name = (group.name || '').toLowerCase();
          return !name.includes('стомат') && !name.includes('физиотерап');
        });

        // Добавляем виртуальную группу «Пластическая хирургия»
        const plasticServices: ApiService[] = [
          { id: 91001, kind: 0, code: 'PS-001', name: 'Консультация пластического хирурга', altcode: '', altname: '', barcode: '', info: 'Первичный прием, осмотр и планирование вмешательства', group_name: 'Пластическая хирургия', group_id: -1001, mz_code: '', cito_cost: 0, duration: 30, base_cost: 2500, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
          { id: 91002, kind: 0, code: 'PS-002', name: 'Блефаропластика', altcode: '', altname: 'Коррекция век', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: -1001, mz_code: '', cito_cost: 0, duration: 0, base_cost: 45000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
          { id: 91003, kind: 0, code: 'PS-003', name: 'Ринопластика', altcode: '', altname: 'Коррекция формы носа', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: -1001, mz_code: '', cito_cost: 0, duration: 0, base_cost: 120000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
          { id: 91004, kind: 0, code: 'PS-004', name: 'Липосакция', altcode: '', altname: 'Удаление локальных жировых отложений', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: -1001, mz_code: '', cito_cost: 0, duration: 0, base_cost: 80000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
          { id: 91005, kind: 0, code: 'PS-005', name: 'Маммопластика', altcode: '', altname: 'Коррекция формы и объема груди', barcode: '', info: '', group_name: 'Пластическая хирургия', group_id: -1001, mz_code: '', cito_cost: 0, duration: 0, base_cost: 180000, purchase_price: 0, denomination: 0, unit_id: null, unit: null },
        ];

        cleanedGroups.push({ id: -1001, name: 'Пластическая хирургия', services: plasticServices });

        setServiceGroups(cleanedGroups);
        
        // Определяем популярные услуги (первые 6 с наименьшей стоимостью)
        const popular = services
          .filter(service => service.base_cost > 0)
          .sort((a, b) => a.base_cost - b.base_cost)
          .slice(0, 6);
        setPopularServices(popular);
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

  // Helpers for derived categorization
  const isAnalysis = (s: ApiService) => {
    const text = safeLower([s.name, s.altname, s.info, s.group_name].join(' '));
    const keywords = ['анализ', 'лаборатор', 'пцр', 'мазок', 'морфолог', 'биохим', 'кров', 'моч', 'антител', 'igg', 'igm', 'hbs', 'hbv', 'hcv', 'urea', 'glucose', 'кал', 'гистолог'];
    return keywords.some(k => text.includes(k));
  };

  const isGynecologyGroup = (g: ServiceGroup) => safeLower(g.name).includes('гинеколог');

  const getGynSubcategory = (s: ApiService): 'consult' | 'analysis' | 'ultrasound' | 'laser' | 'other' => {
    const t = safeLower([s.name, s.altname, s.info].join(' '));
    if (t.includes('консульт')) return 'consult';
    if (t.includes('узи')) return 'ultrasound';
    if (t.includes('лазер')) return 'laser';
    if (isAnalysis(s)) return 'analysis';
    return 'other';
  };

  const gynWeight = (s: ApiService) => {
    const t = safeLower([s.name, s.altname].join(' '));
    if (t.includes('первич') && t.includes('консульт')) return 0;
    if (t.includes('повтор') && t.includes('консульт')) return 1;
    switch (getGynSubcategory(s)) {
      case 'consult': return 2;
      case 'ultrasound': return 3;
      case 'laser': return 4;
      case 'analysis': return 5;
      default: return 9;
    }
  };

  // Build list depending on selectedType
  let filteredGroups: ServiceGroup[] = [];

  if (selectedType === 'lab') {
    // Collect all analysis services into a single virtual group
    const allServices = serviceGroups.flatMap(g => g.services);
    const services = allServices.filter(s => {
      const passesSearch = search === '' || safeLower([s.name, s.altname, s.info, s.code].join(' ')).includes(search);
      return isAnalysis(s) && passesSearch;
    });
    filteredGroups = services.length ? [{ id: -1, name: 'Лабораторная диагностика', services }] : [];
  } else {
    filteredGroups = serviceGroups
      .map(group => {
        const filteredServices = group.services.filter(service => {
          const matchesType = selectedType === 'all' ? true : !isAnalysis(service);
          if (!matchesType) return false;
          if (selectedGroup !== 'all' && group.id.toString() !== selectedGroup) return false;
          if (search === '') return true;
          return (
            safeLower(service.name).includes(search) ||
            safeLower(service.altname).includes(search) ||
            safeLower(service.info).includes(search) ||
            safeLower(service.code).includes(search)
          );
        });
        // Special ordering inside gynecology
        const outputServices = isGynecologyGroup(group)
          ? [...filteredServices].sort((a, b) => gynWeight(a) - gynWeight(b))
          : filteredServices;
        return { ...group, services: outputServices } as ServiceGroup;
      })
      .filter(group => group.services.length > 0);
  }

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

  const handleAppointmentClick = (service?: ApiService, doctor?: ArchimedDoctor) => {
    setAppointmentModal({
      isOpen: true,
      service,
      doctor
    });
  };

  const handleAppointmentSuccess = () => {
    // Можно добавить уведомление об успешной записи
    console.log('Appointment created successfully');
  };

  // Функции для пагинации
  const getCurrentPage = (groupId: number) => currentPage[groupId] || 1;
  
  const setPage = (groupId: number, page: number) => {
    setCurrentPage(prev => ({ ...prev, [groupId]: page }));
  };

  const getPaginatedServices = (services: ApiService[], groupId: number) => {
    const page = getCurrentPage(groupId);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return services.slice(startIndex, endIndex);
  };

  const getTotalPages = (services: ApiService[]) => {
    return Math.ceil(services.length / itemsPerPage);
  };

  const resetPagination = () => {
    setCurrentPage({});
  };

  // Сброс пагинации при изменении фильтров
  useEffect(() => {
    resetPagination();
  }, [selectedGroup, selectedType, gynFilter, searchTerm]);

  // Adaptive items per page: show more services on smaller screens and for lab analyses
  useEffect(() => {
    const computeItemsPerPage = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      const isMobile = width < 640; // Tailwind sm breakpoint
      const isTablet = width >= 640 && width < 1024; // sm..lg

      let per = 7;
      if (isMobile) {
        per = selectedType === 'lab' ? 18 : 12;
      } else if (isTablet) {
        per = selectedType === 'lab' ? 16 : 10;
      } else {
        per = selectedType === 'lab' ? 14 : 9;
      }
      setItemsPerPage(per);
    };

    computeItemsPerPage();
    window.addEventListener('resize', computeItemsPerPage);
    return () => window.removeEventListener('resize', computeItemsPerPage);
  }, [selectedType]);

  // Track mobile breakpoint for accordion behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768); // md breakpoint
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleGroup = (groupId: number) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const toggleServiceDesc = (serviceId: number) => {
    setExpandedService(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  // Show instant skeleton to avoid perceived lag
  if (isLoading && serviceGroups.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 md:mb-4">Прайс-лист клиники</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">Актуальные цены на все услуги клиники Алдан.</p>
          </div>
          <div className="grid gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="bg-primary/70 h-12 md:h-14" />
                <div className="divide-y divide-gray-100">
                  {Array.from({ length: 3 }).map((__, j) => (
                    <div key={j} className="p-4 md:p-6 space-y-2 md:space-y-3">
                      <div className="h-4 md:h-5 bg-gray-200 rounded w-2/3" />
                      <div className="h-3 md:h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-7 md:h-8 bg-gray-200 rounded w-24" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 md:mb-4">Прайс-лист клиники</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Актуальные цены на все услуги клиники Алдан. Выберите интересующее вас направление 
            или воспользуйтесь поиском для быстрого нахождения нужной услуги.
          </p>
        </div>

        {/* Popular Services Section */}
        {popularServices.length > 0 && (
          <div className="mb-8 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3 md:mb-4">Популярные услуги</h2>
              <p className="text-sm sm:text-base text-gray-600">Самые востребованные услуги по доступным ценам</p>
            </div>
            <div className={isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
              {popularServices.map((service) => (
                isMobile ? (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-2 hover:shadow-sm bg-white">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h3 className="text-xs font-semibold text-dark leading-tight pr-1 line-clamp-2">{service.name}</h3>
                          {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                            <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0">Срочно</span>
                          )}
                        </div>
                      </div>
                      <div className="text-primary font-bold text-sm flex-shrink-0">
                        {formatPrice(getServicePrice(service))}
                      </div>
                      {(service.info || (service.altname && service.altname !== service.name)) && (
                        <button
                          onClick={() => toggleServiceDesc(service.id)}
                          className="px-2 py-1 text-[10px] text-primary border border-primary rounded-md whitespace-nowrap"
                        >Описание</button>
                      )}
                      <button
                        onClick={() => setAppointmentModal({ isOpen: true, service })}
                        className="bg-primary hover:bg-primaryDark text-white px-3 py-1 rounded-md text-[11px] font-medium flex-shrink-0"
                      >Записаться</button>
                    </div>
                    {(service.info || (service.altname && service.altname !== service.name)) && expandedService[service.id] && (
                      <div className="mt-2 text-xs text-gray-600">
                        {service.altname && service.altname !== service.name && (<p className="italic mb-1">{service.altname}</p>)}
                        {service.info && (<p className="leading-relaxed">{service.info}</p>)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={service.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <h3 className="text-base md:text-lg font-semibold text-dark line-clamp-2">{service.name}</h3>
                      <div className="text-right ml-4">
                        <div className="text-xl md:text-2xl font-bold text-primary">
                          {formatPrice(getServicePrice(service))}
                        </div>
                        {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                          <div className="text-xs md:text-sm text-gray-500">
                            Срочно: {service.cito_cost.toLocaleString()} ₽
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.duration} мин
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {service.group_name}
                      </div>
                    </div>
                    <button
                      onClick={() => setAppointmentModal({ isOpen: true, service })}
                      className="w-full bg-primary text-white py-2 px-3 md:px-4 rounded-lg hover:bg-primaryDark transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                      Записаться
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-gray-700 mb-1 md:mb-2 font-medium text-sm md:text-base">Поиск услуг</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Введите название услуги..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 pl-9 md:pl-10 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm md:text-base"
                />
                <svg className="absolute left-3 top-2.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Group Filter */}
            <div>
              <label htmlFor="group" className="block text-gray-700 mb-1 md:mb-2 font-medium text-sm md:text-base">Категория</label>
              <select
                id="group"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm md:text-base"
              >
                <option value="all">Все категории</option>
                {serviceGroups.map(group => (
                  <option key={group.id} value={group.id.toString()}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Type Filter */}
            <div>
              <label className="block text-gray-700 mb-1 md:mb-2 font-medium text-sm md:text-base">Тип</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Все' },
                  { key: 'lab', label: 'Лабораторная диагностика' },
                  { key: 'other', label: 'Другие услуги' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedType(opt.key as any)}
                    className={`px-2.5 md:px-3 py-1.5 md:py-2 rounded-md text-sm border ${selectedType===opt.key ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-primary'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
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
                <div
                  className="bg-primary text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between"
                  onClick={() => {
                    if (isMobile) toggleGroup(group.id);
                  }}
                  role="button"
                >
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">{group.name}</h2>
                    <p className="text-primaryLight text-xs md:text-sm mt-1">
                    {(() => {
                      const filteredServices = group.services.filter(service => 
                        !isGynecologyGroup(group) || gynFilter==='all' || getGynSubcategory(service)===gynFilter
                      );
                      const totalPages = getTotalPages(filteredServices);
                      const currentPage = getCurrentPage(group.id);
                      
                      if (totalPages > 1) {
                        const startItem = ((currentPage - 1) * itemsPerPage) + 1;
                        const endItem = Math.min(currentPage * itemsPerPage, filteredServices.length);
                        return `${filteredServices.length} ${filteredServices.length === 1 ? 'услуга' : 
                               filteredServices.length < 5 ? 'услуги' : 'услуг'} (показано ${startItem}-${endItem})`;
                      }
                      
                      return `${filteredServices.length} ${filteredServices.length === 1 ? 'услуга' : 
                             filteredServices.length < 5 ? 'услуги' : 'услуг'}`;
                    })()}
                    </p>
                  </div>
                  {/* Chevron for mobile accordion */}
                  <svg
                    className={`md:hidden w-5 h-5 transition-transform ${expandedGroups[group.id] ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Services in Group (accordion content) */}
                {(!isMobile || expandedGroups[group.id]) && (
                <div className="divide-y divide-gray-200">
                  {isGynecologyGroup(group) && (
                    <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
                      {[
                        { key: 'all', label: 'Все' },
                        { key: 'consult', label: 'Консультации' },
                        { key: 'analysis', label: 'Гинекологические анализы' },
                        { key: 'ultrasound', label: 'Виды УЗИ' },
                        { key: 'laser', label: 'Лазерная гинекология' },
                        { key: 'other', label: 'Прочее' },
                      ].map(opt => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setGynFilter(opt.key as any)}
                          className={`px-2.5 md:px-3 py-1.5 rounded-md text-sm border ${gynFilter===opt.key ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-primary'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {(() => {
                    const filteredServices = group.services.filter(service => 
                      !isGynecologyGroup(group) || gynFilter==='all' || getGynSubcategory(service)===gynFilter
                    );
                    const paginatedServices = getPaginatedServices(filteredServices, group.id);
                    const totalPages = getTotalPages(filteredServices);
                    
                    return (
                      <>
                        {isMobile ? (
                          <div className="px-2 pt-1 grid grid-cols-1 gap-2">
                            {paginatedServices.map(service => (
                              <div key={service.id} className="border border-gray-200 rounded-lg p-2 hover:shadow-sm bg-white">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                      <h3 className="text-sm font-semibold text-dark leading-tight pr-1 line-clamp-2">{service.name}</h3>
                                      {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                                        <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0">Срочно</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-primary font-bold text-sm flex-shrink-0">
                                    {formatPrice(getServicePrice(service))}
                                  </div>
                                  {(service.info || (service.altname && service.altname !== service.name)) && (
                                    <button onClick={() => toggleServiceDesc(service.id)} className="px-2 py-1 text-[10px] text-primary border border-primary rounded-md whitespace-nowrap">Описание</button>
                                  )}
                                  <button onClick={() => handleAppointmentClick(service)} className="bg-primary hover:bg-primaryDark text-white px-3 py-1 rounded-md text-[11px] font-medium flex-shrink-0">Записаться</button>
                                </div>
                                {(service.info || (service.altname && service.altname !== service.name)) && expandedService[service.id] && (
                                  <div className="mt-2 text-xs text-gray-600">
                                    {service.altname && service.altname !== service.name && (<p className="italic mb-1">{service.altname}</p>)}
                                    {service.info && (<p className="leading-relaxed">{service.info}</p>)}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {paginatedServices.map(service => (
                              <div key={service.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col">
                                <div className="flex-grow">
                                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                                    <h3 className="text-base md:text-lg font-semibold text-dark leading-tight pr-2 line-clamp-2">{service.name}</h3>
                                    {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                                      <span className="bg-orange-100 text-orange-800 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium flex-shrink-0">
                                        Срочно
                                      </span>
                                    )}
                                  </div>
                                  {service.altname && service.altname !== service.name && (
                                    <p className="text-gray-600 mb-2 md:mb-3 text-sm italic leading-relaxed hidden sm:block">{service.altname}</p>
                                  )}
                                  {service.info && (
                                    <p className="text-gray-600 mb-3 md:mb-4 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 hidden sm:block">{service.info}</p>
                                  )}
                                  <div className={`${selectedType === 'lab' ? 'hidden sm:flex' : 'flex'} items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4`}>
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
                                <div className="mt-auto pt-4 border-t border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                                        {formatPrice(getServicePrice(service))}
                                      </div>
                                      {service.cito_cost > 0 && service.cito_cost !== service.base_cost && (
                                        <div className="text-xs md:text-sm text-gray-500">
                                          Обычно: {formatPrice(service.base_cost)}
                                        </div>
                                      )}
                                    </div>
                                    <button 
                                      onClick={() => handleAppointmentClick(service)}
                                      className="bg-primary hover:bg-primaryDark text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base"
                                    >
                                      Записаться
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}

                        {/* Пагинация - показываем если больше 7 услуг */}
                        {totalPages > 1 && (
                          <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="text-xs md:text-sm text-gray-600">
                                Показано {((getCurrentPage(group.id) - 1) * itemsPerPage) + 1}-{Math.min(getCurrentPage(group.id) * itemsPerPage, filteredServices.length)} из {filteredServices.length}
                              </div>
                              {/* Desktop pagination */}
                              <div className="hidden md:flex items-center space-x-2">
                                <button
                                  onClick={() => setPage(group.id, getCurrentPage(group.id) - 1)}
                                  disabled={getCurrentPage(group.id) === 1}
                                  className="px-4 py-2 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                >
                                  ← Назад
                                </button>
                                <div className="flex items-center space-x-1">
                                  {(() => {
                                    const current = getCurrentPage(group.id);
                                    const total = totalPages;
                                    const pages = [] as React.ReactNode[];
                                    let start = Math.max(1, current - 2);
                                    let end = Math.min(total, start + 4);
                                    if (end - start < 4) {
                                      start = Math.max(1, end - 4);
                                    }
                                    if (start > 1) {
                                      pages.push(
                                        <button
                                          key={1}
                                          onClick={() => setPage(group.id, 1)}
                                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                        >1</button>
                                      );
                                      if (start > 2) {
                                        pages.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
                                      }
                                    }
                                    for (let i = start; i <= end; i++) {
                                      pages.push(
                                        <button
                                          key={i}
                                          onClick={() => setPage(group.id, i)}
                                          className={`px-3 py-1 text-sm border rounded transition-colors ${i === current ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:bg-gray-100'}`}
                                        >{i}</button>
                                      );
                                    }
                                    if (end < total) {
                                      if (end < total - 1) {
                                        pages.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
                                      }
                                      pages.push(
                                        <button
                                          key={total}
                                          onClick={() => setPage(group.id, total)}
                                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                        >{total}</button>
                                      );
                                    }
                                    return pages;
                                  })()}
                                </div>
                                <button
                                  onClick={() => setPage(group.id, getCurrentPage(group.id) + 1)}
                                  disabled={getCurrentPage(group.id) === totalPages}
                                  className="px-4 py-2 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                >
                                  Вперед →
                                </button>
                              </div>
                              {/* Mobile show more */}
                              <div className="flex md:hidden items-center space-x-2">
                                {getCurrentPage(group.id) < totalPages && (
                                  <button
                                    onClick={() => setPage(group.id, getCurrentPage(group.id) + 1)}
                                    className="px-3 py-1.5 text-sm bg-primary text-white rounded"
                                  >Показать ещё</button>
                                )}
                                {getCurrentPage(group.id) > 1 && (
                                  <button
                                    onClick={() => setPage(group.id, 1)}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
                                  >Свернуть</button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-8 md:mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-dark mb-4 md:mb-6">Важная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-dark mb-2 md:mb-3">Оплата услуг</h3>
              <ul className="space-y-1.5 md:space-y-2 text-gray-600 text-sm md:text-base">
                <li>• Наличными в кассе клиники</li>
                <li>• Банковскими картами</li>
                <li>• Через онлайн-банкинг</li>
                <li>• По полису ДМС (при наличии)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-dark mb-2 md:mb-3">Запись на прием</h3>
              <ul className="space-y-1.5 md:space-y-2 text-gray-600 text-sm md:text-base">
                <li>• По телефону: +7 (923) 317-60-60</li>
                <li>• Через форму на сайте</li>
                <li>• В личном кабинете пациента</li>
                <li>• При личном обращении в клинику</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Модальное окно записи на прием */}
        <AppointmentModal
          isOpen={appointmentModal.isOpen}
          onClose={() => setAppointmentModal({ isOpen: false })}
          service={appointmentModal.service}
          doctor={appointmentModal.doctor}
          onSuccess={handleAppointmentSuccess}
        />
      </div>
    </div>
  );
} 