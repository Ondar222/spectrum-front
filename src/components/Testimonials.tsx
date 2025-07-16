import React, { useState } from 'react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Хочу выразить огромную благодарность врачам клиники Spectre! Очень профессиональные специалисты, внимательное отношение и современное оборудование. Всегда получаю квалифицированную помощь и подробные консультации по всем вопросам здоровья.',
    author: 'Анна',
    date: '15.03.2023',
  },
  {
    id: 2,
    text: 'Обращаюсь в Spectre уже несколько лет и всегда доволен обслуживанием. Врачи действительно заинтересованы в том, чтобы помочь, а не просто формально провести прием. Особенно радует возможность сдать анализы и пройти все необходимые процедуры в одном месте.',
    author: 'Михаил',
    date: '02.11.2022',
  },
  {
    id: 3,
    text: 'Посетила врача-кардиолога. Прием длился более часа, все подробно расспросили, тщательно обследовали, сделали ЭКГ. Получила детальное объяснение моего состояния и четкий план лечения. Спасибо за внимательное отношение!',
    author: 'Екатерина',
    date: '24.05.2023',
  },
];

export default function Testimonials() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const goToPrevTestimonial = () => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNextTestimonial = () => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Отзывы пациентов</h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <svg className="text-teal h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <p className="text-lg text-center mb-6">
              {testimonials[activeTestimonialIndex].text}
            </p>

            <div className="text-center">
              <p className="font-bold text-dark">{testimonials[activeTestimonialIndex].author}</p>
              <p className="text-gray-500 text-sm">{testimonials[activeTestimonialIndex].date}</p>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-teal"
            onClick={goToPrevTestimonial}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-teal"
            onClick={goToNextTestimonial}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((testimonial) => (
              <button
                key={`testimonial-indicator-${testimonial.id}`}
                className={`w-3 h-3 rounded-full ${
                  testimonials.indexOf(testimonial) === activeTestimonialIndex ? 'bg-teal' : 'bg-gray-300'
                }`}
                onClick={() => setActiveTestimonialIndex(testimonials.indexOf(testimonial))}
              />
            ))}
          </div>
        </div>

        {/* View all reviews button */}
        <div className="text-center mt-10">
          <a
            href="/reviews/"
            className="inline-block border border-teal text-teal hover:bg-teal hover:text-white transition-colors duration-300 font-medium py-2 px-6 rounded"
          >
            Все отзывы
          </a>
        </div>
      </div>
    </section>
  );
}
