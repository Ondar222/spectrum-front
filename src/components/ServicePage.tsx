// components/ServicePage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import archimedService from '../services/archimed';
import { ApiService, ArchimedDoctor } from '../types/cms';
import { getDirectionBySlug, keywordMatch } from '../services/directions';

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<ApiService[]>([]);
  const [doctors, setDoctors] = useState<ArchimedDoctor[]>([]);

  const direction = useMemo(() => (slug ? getDirectionBySlug(slug) : undefined), [slug]);

  useEffect(() => {
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
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                {service.altname && service.altname !== service.name && (
                  <p className="text-gray-600 mb-2 text-sm italic">{service.altname}</p>
                )}
                {service.info && (
                  <p className="text-gray-600 mb-4 text-sm">{service.info}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">{getServicePrice(service).toLocaleString('ru-RU')} ₽</span>
                  <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors">
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Врачи направления */}
      {filteredDoctors.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Наши специалисты</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
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
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{getDoctorInitials(doctor)}</h3>
                    <p className="text-gray-600">{doctor.type}</p>
                    {doctor.branch && (
                      <p className="text-gray-500 text-sm mt-2">{doctor.branch}</p>
                    )}
                    <Link 
                      to={`/doctors`}
                      className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors"
                    >
                      Подробнее
                    </Link>
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
          <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Записаться онлайн
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;