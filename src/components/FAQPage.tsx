import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "all",
    "Общие вопросы",
    "Запись на прием",
    "Услуги и цены",
    "Страхование",
    "Подготовка к приему",
    "После приема",
  ];

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: "Общие вопросы",
      question: "Каковы часы работы Центра СпектрУМ?",
      answer: "Мы работаем: Пн-Пт с 08:00 до 20:00, Сб с 09:00 до 18:00.",
    },
    {
      id: 2,
      category: "Общие вопросы",
      question: "Где находится Центр СпектрУМ?",
      answer:
        "Мы находимся по адресу: Республика Тыва, г. Кызыл, ул. Ленина, д. 60, офис 1.",
    },
    {
      id: 13,
      category: "Общие вопросы",
      question: "Чем логопед отличается от дефектолога?",
      answer:
        "Логопед специализируется на коррекции нарушений речи: постановка звуков, развитие словарного запаса, подготовка к школе. Дефектолог работает с более широким спектром особенностей развития: РАС, СДВГ, задержка психического развития, интеллектуальные трудности. В Центре СпектрУМ работают оба специалиста, и они могут работать с ребёнком комплексно.",
    },
    {
      id: 14,
      category: "Общие вопросы",
      question: "Работаете ли вы с детьми с РАС и СДВГ?",
      answer:
        "Да, в Центре СпектрУМ работают специалисты, которые имеют опыт работы с детьми с РАС (расстройства аутистического спектра) и СДВГ (синдром дефицита внимания и гиперактивности). Мы предлагаем развивающие занятия, коррекцию нарушения речи, консультации психолога и дефектолога.",
    },
    {
      id: 3,
      category: "Запись на прием",
      question: "Как записаться на прием?",
      answer:
        "Вы можете записаться несколькими способами:\n1. Позвонить по телефону +7 (923) 540-50-50\n2. Через форму на сайте\n3. Лично в Центре СпектрУМ",
    },
    {
      id: 4,
      category: "Запись на прием",
      question: "Можно ли записаться на прием онлайн?",
      answer:
        "Да, на нашем сайте доступна онлайн-запись. Вы можете выбрать удобное время и специалиста, заполнить необходимые данные и получить подтверждение записи.",
    },
    {
      id: 5,
      category: "Услуги и цены",
      question: "Какие виды услуг оказываются в центре?",
      answer:
        "Мы предоставляем широкий спектр образовательных и коррекционных услуг:\n- Логопед — коррекция нарушения речи, постановка звуков\n- Дефектолог — работа с РАС, СДВГ, задержкой развития\n- Психолог и клинический психолог — диагностика и коррекция\n- Педагог — развивающие занятия, подготовка к школе\n- АПИ (автоматизация проблемных интонаций)\n- Английский язык — уроки для детей\n- Сурдопедагогика",
    },
    {
      id: 15,
      category: "Услуги и цены",
      question: "Что такое АПИ и зачем оно нужно?",
      answer:
        "АПИ — это автоматизация проблемных интонаций, метод коррекции речевых нарушений. АПИ помогает детям с нарушением речи развивать правильное речевое дыхание, интонацию и темп речи. Занятия с логопедом по методу АПИ особенно эффективны при заикании и других нарушениях речи.",
    },
    {
      id: 6,
      category: "Услуги и цены",
      question: "Как узнать стоимость услуг?",
      answer:
        'Актуальные цены на все услуги доступны на нашем сайте в разделе "Услуги и цены". Также вы можете уточнить стоимость конкретной услуги по телефону.',
    },
    {
      id: 16,
      category: "Услуги и цены",
      question: "Проводите ли вы уроки Английского языка?",
      answer:
        "Да, в Центре СпектрУМ проводятся уроки Английского языка для детей. Занятия адаптированы для разных возрастов и уровней подготовки. Также доступны развивающие занятия и подготовка к школе.",
    },
    {
      id: 10,
      category: "Подготовка к приему",
      question: "Что взять с собой на прием?",
      answer:
        "Рекомендуем взять с собой:\n1. Паспорт законного представителя\n2. Свидетельство о рождении ребёнка или паспортесли достиг 14 лет\n3 По возможности медицинская документация (медицинская карта, плследнее обследование по состою здоровья)",
    },
    {
      id: 12,
      category: "После приема",
      question: "Что делать, если после приема остались вопросы?",
      answer:
        "Если у вас остались вопросы после приема, вы можете:\n1. Позвонить и задать вопрос администратору\n2. Записаться на повторную консультацию",
    },
  ];

  const filteredFAQ = faqItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-lightTeal py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Часто задаваемые вопросы
        </h1>

        {/* Search and filter section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Поиск по вопросам и ответам..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Все категории" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQ.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden min-h-[120px] flex flex-col"
            >
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 leading-tight text-gray-900">
                  {item.question}
                </h3>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed flex-grow">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">По вашему запросу ничего не найдено</p>
          </div>
        )}

        {/* Contact section */}
        <div className="max-w-4xl mx-auto mt-10 md:mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-gray-600 mb-4">
            Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-teal text-white px-6 py-2 rounded-md hover:bg-teal/90 transition-colors">
              Написать нам
            </button>

            <button className="border border-teal text-teal px-6 py-2 rounded-md hover:bg-teal/10 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-colors flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href="tel:+79235405050"
                  className="hover:text-primary transition-colors text-sm sm:text-base"
                >
                  Позвонить
                </a>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
