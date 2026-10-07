import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NEWS_POSTS, type NewsPost } from "../data/news";
import { fetchVkNews } from "../services/vkNews";

export default function NewsDetailsPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState<NewsPost[]>(NEWS_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchVkNews()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const post = posts.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-lightTeal py-6 sm:py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
            Загрузка…
          </div>
        </div>
      </div>
    );
  }

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
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-contain bg-lightTeal"
              loading="lazy"
            />
          ) : null}
          <div className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {post.title}
            </h1>
            {post.fullText ? (
              <div className="text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: post.fullText }} />
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-3">
                  Полное описание для этой новости отсутствует.
                </p>
                <p>{post.shortText}</p>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/stock"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white text-sm font-medium transition-colors"
              >
                Назад к новостям
              </Link>
              {post.url ? (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-sm font-medium transition-colors"
                >
                  Открыть во ВКонтакте
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
