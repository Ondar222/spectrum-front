import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoctorsApiResponse } from '../types/doctors';
import useSWR from 'swr';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
  description: string;
  education: string[];
  languages: string[];
  isAvailable: boolean;
  price: string;
  schedule: string;
}

const fetchDoctors = async () => {
  const response = await fetch('http://77.232.143.97:8055/items/doctors?fields=*.*.*', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  });
  const data: DoctorsApiResponse= await response.json();
  return data.data;
}

export default function DoctorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {data, isLoading} = useSWR('doctors', fetchDoctors);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const specialties = [
    'all',
    'Терапевт',
    'Кардиолог',
    'Невролог',
    'Офтальмолог',
    'Стоматолог',
    'Дерматолог',
    'Гинеколог',
    'Уролог',
    'Эндокринолог',
    'Педиатр',
    'Хирург',
    'Ортопед',
    'ЛОР',
    'Психиатр',
    'Аллерголог',
    'Гастроэнтеролог',
    'Гематолог',
    'Инфекционист',
    'Нефролог',
    'Ревматолог'
  ];


  useEffect(() => {
    setDoctors(data?.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience,
      rating: doctor.rating,
      image: doctor.image || "",
      description: doctor.description,
      price: doctor.price.toString(),
      schedule: "",
      education: doctor.education.map((education) => education.education_id.name),
      languages: doctor.languages.map((language) => language.languages_id.name),
      isAvailable: true
    })) || []);
  }, [data]);
  


    // const doctor = {
    //   id: 1,
    //   name: 'Иванова Анна Петровна',
    //   specialty: 'Терапевт',
    //   experience: 15,
    //   rating: 4.9,
    //   image: '/images/doctor1.jpg',
    //   description: 'Высококвалифицированный терапевт с большим опытом работы. Специализируется на лечении и профилактике заболеваний внутренних органов.',
    //   education: ['МГМУ им. И.М. Сеченова', 'Клиническая ординатура по терапии'],
    //   languages: ['Русский', 'Английский'],
    //   isAvailable: true,
    //   price: '2 500 ₽',
    //   schedule: 'Пн-Пт: 9:00-18:00'
    // }


  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  if(isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-lightTeal">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Наши врачи</h1>

        {/* Search and filter section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Поиск по имени или специальности..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'Все специальности' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <Link
              key={doctor.id}
              to={`/doctors/${doctor.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&size=256`}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                {doctor.isAvailable && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Доступен
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-gray-600">{doctor.specialty}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600">{doctor.experience} лет опыта</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(doctor.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{doctor.rating}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{doctor.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{doctor.price}</span>
                  <button className="bg-teal text-white px-6 py-2 rounded-md hover:bg-teal/90 transition-colors">
                    Подробнее
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 