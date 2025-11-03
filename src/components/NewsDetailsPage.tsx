import React from "react";
import { Link, useParams } from "react-router-dom";
import { NEWS_POSTS } from "../data/news";

export default function NewsDetailsPage() {
  const { slug } = useParams();
  const post = NEWS_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-lightTeal py-6 sm:py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
            <h1 className="text-xl font-semibold mb-3">Новость не найдена</h1>
            <Link
              to="/stock"
              className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-sm font-medium transition-colors"
            >
              Вернуться к новостям
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightTeal py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {post.title}
            </h1>
            {post.fullText ? (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.fullText}
              </p>
            ) : (
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-3">
                  Полное описание для этой новости отсутствует.
                </p>
                <p>{post.shortText}</p>
              </div>
            )}
            <div className="mt-6">
              <Link
                to="/stock"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white text-sm font-medium transition-colors"
              >
                Назад к новостям
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
