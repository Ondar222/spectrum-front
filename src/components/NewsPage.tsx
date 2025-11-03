import React from "react";
import { Link } from "react-router-dom";
import { NEWS_POSTS } from "../data/news";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-lightTeal py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Новости
        </h1>
        {NEWS_POSTS.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
            Новостей пока нет. Скоро здесь появятся обновления Центра.
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {NEWS_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                <Link to={`/stock/${post.slug}`} className="block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.shortText}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/stock/${post.slug}`}
                      className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-sm font-medium transition-colors"
                    >
                      Читать полностью
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
