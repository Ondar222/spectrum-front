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

function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

export default function Checkups() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
                {item.doc ? (
                  <a
                    className="w-full sm:w-auto inline-block text-center px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors"
                    href={`/chekaps/${encodeURIComponent(item.doc)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Подробнее
                  </a>
                ) : (
                  <a
                    className="w-full sm:w-auto inline-block text-center px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    href="/contacts"
                  >
                    Узнать подробности
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          Документы с подробным составом программ доступны в разделе «Чекапы» внизу страниц.
        </div>
      </div>
    </section>
  );
}


