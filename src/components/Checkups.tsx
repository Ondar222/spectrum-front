import React, { useState, useEffect } from 'react';

interface CheckupItem {
  title: string;
  price: number; // in RUB
  doc?: string; // relative path under /chekaps
}

const checkups: CheckupItem[] = [
  { title: 'Чекап «Большой кардиологический»', price: 24000, doc: 'кардио чекапы.docx' },
  { title: 'Чекап «Средний кардиологический»', price: 12000, doc: 'кардио чекапы.docx' },
  { title: 'Чекап «Малый кардиологический»', price: 8000, doc: 'кардио чекапы.docx' },
  { title: 'Чекап «Большой сосудистый»', price: 16000, doc: 'сосуд.чекапы.docx' },
  { title: 'Чекап «Малый сосудистый»', price: 12000, doc: 'сосуд.чекапы.docx' },
  { title: 'Чекап «Весь организм»', price: 32000, doc: 'весь организм.docx' },
  { title: 'Чекап «Гинекологический минимум»', price: 4500, doc: 'гинеколог.чекапы.docx' },
  { title: 'Чекап «Гинекологический стандарт»', price: 12000, doc: 'гинеколог.чекапы.docx' },
  { title: 'Чекап «диагностический послеродовой»', price: 6000, doc: 'гинеколог.чекапы.docx' },
  { title: 'Чекап для диагностики ЗНО — МУЖСКОЙ', price: 16480, doc: 'мужской ЗНО чекап.docx' },
  { title: 'Чекап для диагностики ЗНО — Женский ОБШИРНЫЙ', price: 55105, doc: 'женские ЗНО чекапы.docx' },
  { title: 'Чекап для диагностики ЗНО — Женский ЕЖЕГОДНЫЙ', price: 19305, doc: 'женские ЗНО чекапы.docx' },
  { title: 'Гастро-чекап «Минимум»', price: 13000, doc: 'гастро чекапы.docx' },
  { title: 'Гастро-чекап «Расширенный»', price: 20000, doc: 'гастро чекапы.docx' },
];

// Краткие текстовые описания для отображения во всплывающем окне
const descriptions: Record<string, string> = {
  'Чекап «Большой кардиологический»':
    'Расширенное обследование сердечно-сосудистой системы: консультация кардиолога, ЭКГ, ЭХО-КГ, суточное мониторирование АД/ЭКГ по показаниям, лабораторные маркеры риска.',
  'Чекап «Средний кардиологический»':
    'Базовая диагностика сердца: консультация кардиолога, ЭКГ, ЭХО-КГ, ключевые анализы крови.',
  'Чекап «Малый кардиологический»':
    'Скрининг сердца: ЭКГ, консультация специалиста, основные лабораторные показатели.',
  'Чекап «Большой сосудистый»':
    'Комплексное обследование сосудов: УЗИ сосудов, консультация ангиолога/сосудистого хирурга, лабораторные маркеры.',
  'Чекап «Малый сосудистый»':
    'Быстрый скрининг состояния сосудов с ключевыми исследованиями.',
  'Чекап «Весь организм»':
    'Полный чек-ап основных систем организма: консультации профильных врачей, инструментальные и лабораторные исследования.',
  'Чекап «Гинекологический минимум»':
    'Первичный гинекологический скрининг: консультация, УЗИ по показаниям, базовые анализы.',
  'Чекап «Гинекологический стандарт»':
    'Расширенная гинекологическая диагностика с инструментальными и лабораторными исследованиями.',
  'Чекап «диагностический послеродовой»':
    'Контрольное обследование после родов: осмотр специалиста, УЗИ по показаниям, анализы.',
  'Чекап для диагностики ЗНО — МУЖСКОЙ':
    'Скрининг онкологических рисков для мужчин: консультации, лабораторные маркеры, визуализация по показаниям.',
  'Чекап для диагностики ЗНО — Женский ОБШИРНЫЙ':
    'Расширенный женский онкоскрининг: консультации, инструментальная диагностика, расширенные лабораторные панели.',
  'Чекап для диагностики ЗНО — Женский ЕЖЕГОДНЫЙ':
    'Ежегодный онкоскрининг для женщин с ключевыми исследованиями.',
  'Гастро-чекап «Минимум»':
    'Базовая диагностика ЖКТ: консультация гастроэнтеролога, основные анализы, УЗИ по показаниям.',
  'Гастро-чекап «Расширенный»':
    'Расширенное обследование ЖКТ: консультации, лабораторные маркеры, инструментальные исследования по показаниям.'
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

export default function Checkups() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selected, setSelected] = useState<CheckupItem | null>(null);

  // По умолчанию на мобильных скрыто, на десктопе открыто
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsOpen(!mq.matches);
  }, []);

  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-dark mb-2">Чекапы</h2>
          <p className="text-gray-600 text-xs sm:text-base">Готовые комплексные программы обследований</p>
        </div>

        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm sm:text-base bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors"
            aria-expanded={isOpen}
          >
            {isOpen ? 'Скрыть чекапы' : 'Показать чекапы'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              <path fillRule="evenodd" d="M12 14.5l-6-6 1.5-1.5L12 11.5l4.5-4.5L18 8.5l-6 6z"/>
            </svg>
          </button>
        </div>

        {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
          {checkups.map((item) => (
            <div key={item.title} className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-primary/30 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition">
              <div className="min-h-[56px] sm:min-h-[70px] mb-2">
                <h3 className="text-xs sm:text-base font-semibold text-dark leading-snug">{item.title}</h3>
              </div>
              <div className="text-primary font-bold text-sm sm:text-lg mb-3">{formatPrice(item.price)}</div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-block text-center px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors"
                  onClick={() => setSelected(item)}
                  aria-haspopup="dialog"
                  aria-controls="checkup-modal"
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          Документы с подробным составом программ доступны в разделе «Чекапы» внизу страниц.
        </div>
      </div>
      {selected && (
        <div
          id="checkup-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 m-0 sm:m-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-dark mb-1">{selected.title}</h3>
                <div className="text-primary font-bold text-sm sm:text-lg">{formatPrice(selected.price)}</div>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-md p-2 text-gray-500 hover:text-dark hover:bg-gray-100"
                aria-label="Закрыть"
                onClick={() => setSelected(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-sm sm:text-base text-gray-700 whitespace-pre-line">
              {descriptions[selected.title] || 'Описание для этой программы появится скоро. Пожалуйста, свяжитесь с нами для подробностей.'}
            </div>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a
                href="/contacts"
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Задать вопрос
              </a>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setSelected(null)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


