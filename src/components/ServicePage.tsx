// components/ServicePage.tsx
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import archimedService from '../services/archimed';
import type { ApiService, ArchimedDoctor } from '../types/cms';
import { getDirectionBySlug, keywordMatch } from '../services/directions';
import AppointmentModal from './AppointmentModal';

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<ApiService[]>([]);
  const [doctors, setDoctors] = useState<ArchimedDoctor[]>([]);
  const [showAllServices, setShowAllServices] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState<{
    isOpen: boolean;
    service?: ApiService;
    doctor?: ArchimedDoctor;
  }>({
    isOpen: false
  });

  const direction = useMemo(() => (slug ? getDirectionBySlug(slug) : undefined), [slug]);

  useEffect(() => {
    // Всегда поднимаем страницу вверх при смене направления
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Мгновенно показываем данные из кэша, если они есть
    const cachedServices = archimedService.getServicesCache();
    const cachedDoctors = archimedService.getDoctorsCache();
    if (cachedServices?.length) setServices(cachedServices);
    if (cachedDoctors?.length) setDoctors(cachedDoctors);

    // Подтягиваем актуальные данные только если кэша нет
    const needFetch = (cachedServices?.length || 0) === 0 || (cachedDoctors?.length || 0) === 0;
    if (!needFetch) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [allServices, allDoctors] = await Promise.all([
          archimedService.getServices(),
          archimedService.getDoctors(),
        ]);
        setServices(allServices);
        setDoctors(allDoctors);
      } catch (e) {
        console.error(e);
        setError('Не удалось загрузить данные. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [slug]);

  if (!direction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Направление не найдено</h1>
          <Link to="/" className="text-primary hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const filteredServices = useMemo(() => {
    if (!direction) return [] as ApiService[];
    return services.filter((s) =>
      keywordMatch(s.group_name, direction.serviceKeywords) ||
      keywordMatch(s.name, direction.serviceKeywords) ||
      keywordMatch(s.altname, direction.serviceKeywords)
    );
  }, [services, direction]);

  const filteredDoctors = useMemo(() => {
    if (!direction) return [] as ArchimedDoctor[];
    return doctors.filter((d) => {
      const types = (d?.types || []).map((t) => t.name).join(' ');
      return (
        keywordMatch(d.type, direction.doctorKeywords) ||
        keywordMatch(types, direction.doctorKeywords)
      );
    });
  }, [doctors, direction]);

  const getServicePrice = (service: ApiService) => {
    return service.cito_cost > 0 ? service.cito_cost : service.base_cost;
  };

  const getDoctorInitials = (doctor: ArchimedDoctor) => {
    return `${doctor?.name} ${doctor?.name1?.charAt(0)}. ${doctor?.name2?.charAt(0)}.`;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Герой-секция направления */}
      <section 
        className="py-20 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(/bg-hero.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{direction.title}</h1>
        </div>
      </section>

      {/* Если потребуется текст описания — его можно подтягивать из CMS позже */}

      {/* Услуги в рамках этого направления */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Услуги по направлению "{direction.title}"
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllServices ? filteredServices : filteredServices.slice(0, 3)).map((service) => (
              <div key={service.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 leading-tight">{service.name}</h3>
                  {service.altname && service.altname !== service.name && (
                    <p className="text-gray-600 mb-3 text-sm italic leading-relaxed">{service.altname}</p>
                  )}
                  {service.info && (
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-4">{service.info}</p>
                  )}
                </div>
                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-primary font-bold text-lg">{getServicePrice(service).toLocaleString('ru-RU')} ₽</span>
                  <button 
                    onClick={() => handleAppointmentClick(service)}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredServices.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllServices(s => !s)}
                className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
              >
                {showAllServices ? 'Скрыть' : 'Показать ещё'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Врачи направления */}
      {filteredDoctors.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Наши специалисты</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center flex flex-col h-full">
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    {doctor.photo ? (
                      <img
                        src={(new Image().src = `data:image/png;base64,${doctor.photo}`) as unknown as string}
                        alt={getDoctorInitials(doctor)}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">Фото отсутствует</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{getDoctorInitials(doctor)}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">{doctor.type}</p>
                    {doctor.branch && (
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{doctor.branch}</p>
                    )}
                    <div className="mt-auto">
                      <Link 
                        to={`/doctors/${doctor.id}`}
                        className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Кнопка записи */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Записаться на прием: {direction.title}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Оставьте заявку и наш администратор свяжется с вами для уточнения деталей записи
          </p>
          <button 
            onClick={() => handleAppointmentClick()}
            className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Записаться онлайн
          </button>
        </div>
      </section>

      {/* Модальное окно записи на прием */}
      <AppointmentModal
        isOpen={appointmentModal.isOpen}
        onClose={() => setAppointmentModal({ isOpen: false })}
        service={appointmentModal.service}
        doctor={appointmentModal.doctor}
        onSuccess={handleAppointmentSuccess}
      />
    </div>
  );
};

export default ServicePage;