import React from "react";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-lightTeal py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Новости
        </h1>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
          Новостей пока нет. Скоро здесь появятся обновления Центра.
        </div>
      </div>
    </div>
  );
}
