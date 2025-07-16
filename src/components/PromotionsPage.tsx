import React, { useState } from 'react';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  category: string;
  isActive: boolean;
}

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['Все акции', 'Терапия', 'Стоматология', 'Хирургия', 'Офтальмология', 'Диагностика'];

  const promotions: Promotion[] = [
    {
      id: 1,
      title: "Комплексное обследование со скидкой 30%",
      description: "Полное медицинское обследование организма, включая консультации специалистов, лабораторные анализы и инструментальные исследования. Идеально для тех, кто заботится о своем здоровье.",
      discount: "30%",
      validUntil: "30.04.2024",
      image: "/images/promo1.jpg",
      category: "Диагностика",
      isActive: true
    },
    {
      id: 2,
      title: "Имплантация зубов по специальной цене",
      description: "Установка зубных имплантов премиум-класса по специальной цене. В стоимость включены все необходимые материалы и послеоперационное наблюдение.",
      discount: "25%",
      validUntil: "15.05.2024",
      image: "/images/promo2.jpg",
      category: "Стоматология",
      isActive: true
    },
    {
      id: 3,
      title: "Лазерная коррекция зрения - весенняя акция",
      description: "Лазерная коррекция зрения по технологии LASIK со скидкой. Включает предоперационное обследование, саму операцию и послеоперационное наблюдение.",
      discount: "20%",
      validUntil: "31.05.2024",
      image: "/images/promo3.jpg",
      category: "Офтальмология",
      isActive: true
    },
    {
      id: 4,
      title: "Пластическая хирургия - весеннее обновление",
      description: "Специальные цены на пластические операции. Консультация хирурга в подарок. Рассрочка платежа на 12 месяцев без процентов.",
      discount: "15%",
      validUntil: "30.06.2024",
      image: "/images/promo4.jpg",
      category: "Хирургия",
      isActive: true
    },
    {
      id: 5,
      title: "Семейная карта здоровья",
      description: "Специальное предложение для всей семьи. При покупке карты на 3 и более человек - дополнительная скидка 10% на все услуги клиники в течение года.",
      discount: "10%",
      validUntil: "31.12.2024",
      image: "/images/promo5.jpg",
      category: "Терапия",
      isActive: true
    },
    {
      id: 6,
      title: "День открытых дверей",
      description: "Бесплатные консультации ведущих специалистов клиники. Специальные цены на диагностические процедуры. Подарки и скидки для всех посетителей.",
      discount: "Бесплатно",
      validUntil: "15.04.2024",
      image: "/images/promo6.jpg",
      category: "Диагностика",
      isActive: true
    }
  ];

  const filteredPromotions = promotions.filter(promo => {
    return (selectedCategory === 'all' || promo.category === selectedCategory) && promo.isActive;
  });

  return (
    <div className="min-h-screen bg-lightTeal">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Акции и специальные предложения</h1>

          {/* Category filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category === 'Все акции' ? 'all' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Promotions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promo) => (
              <div key={promo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal text-white px-3 py-1 rounded-full font-medium">
                    {promo.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{promo.title}</h3>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Действует до: {promo.validUntil}
                    </span>
                    <button className="bg-teal text-white px-4 py-2 rounded-md font-medium hover:bg-teal/90 transition-colors">
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special offer banner */}
          <div className="mt-12 bg-gradient-to-r from-teal to-teal/80 rounded-lg shadow-md p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Специальное предложение для новых пациентов</h2>
            <p className="text-lg mb-6">
              При первом посещении клиники получите скидку 15% на любую услугу и бесплатную консультацию специалиста.
            </p>
            <button className="bg-white text-teal px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Получить скидку
            </button>
          </div>

          {/* Subscription form */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Подпишитесь на рассылку акций</h2>
            <p className="text-gray-600 text-center mb-6">
              Будьте в курсе всех специальных предложений и акций нашей клиники
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
                />
                <button
                  type="submit"
                  className="bg-teal text-white px-6 py-2 rounded-md font-medium hover:bg-teal/90 transition-colors"
                >
                  Подписаться
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 