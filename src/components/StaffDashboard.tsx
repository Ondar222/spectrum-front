import React, { useState, useEffect } from 'react';
import type { ArchimedAppointment, ArchimedDoctor, ApiService } from '../types/cms';
import archimedService from '../services/archimed';

const StaffDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<ArchimedAppointment[]>([]);
  const [doctors, setDoctors] = useState<ArchimedDoctor[]>([]);
  const [services, setServices] = useState<ApiService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [appointmentsData, doctorsData, servicesData] = await Promise.all([
          archimedService.getAppointments({ page: 1, limit: 100 }),
          archimedService.getDoctors(),
          archimedService.getServices(),
        ]);

        setAppointments(appointmentsData.data);
        setDoctors(doctorsData);
        setServices(servicesData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить данные. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getDoctorName = (doctorId?: number) => {
    if (!doctorId) return 'Неизвестный врач';
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.name} ${doctor.name1} ${doctor.name2}` : 'Неизвестный врач';
  };

  const getServiceName = (serviceId?: number) => {
    if (!serviceId) return 'Неизвестная услуга';
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Неизвестная услуга';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указано';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Не указано';
    return timeString.substring(0, 5); // HH:MM format
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (!selectedDate) return true;
    if (!appointment.preferred_date) return false;
    const appointmentDate = new Date(appointment.preferred_date).toISOString().split('T')[0];
    return appointmentDate === selectedDate;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка данных...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Ошибка</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-4">Панель сотрудника</h1>
          <p className="text-lg text-gray-600">Управление записями пациентов</p>
        </div>

        {/* Date Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <label htmlFor="date-filter" className="text-sm font-medium text-gray-700">
              Фильтр по дате:
            </label>
            <input
              id="date-filter"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-primary text-white">
            <h2 className="text-xl font-semibold">
              Записи на {formatDate(selectedDate)} ({filteredAppointments.length})
            </h2>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">На выбранную дату записей нет</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-semibold text-dark">
                          {appointment.patient_name}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          ID: {appointment.id}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Врач:</span> {getDoctorName(appointment.doctor_id)}
                        </div>
                        <div>
                          <span className="font-medium">Услуга:</span> {getServiceName(appointment.service_id)}
                        </div>
                        <div>
                          <span className="font-medium">Дата:</span> {formatDate(appointment.preferred_date)}
                        </div>
                        <div>
                          <span className="font-medium">Время:</span> {formatTime(appointment.preferred_time)}
                        </div>
                        <div>
                          <span className="font-medium">Телефон:</span> {appointment.patient_phone}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {appointment.patient_email}
                        </div>
                      </div>

                      {appointment.comments && (
                        <div className="mt-3">
                          <span className="font-medium text-gray-700">Комментарии:</span>
                          <p className="text-gray-600 mt-1">{appointment.comments}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            // Handle appointment update
                            console.log('Update appointment:', appointment.id);
                          }}
                          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => {
                            // Handle appointment cancellation
                            console.log('Cancel appointment:', appointment.id);
                          }}
                          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
