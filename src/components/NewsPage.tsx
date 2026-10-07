import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { NEWS_POSTS, type NewsPost } from "../data/news";
import { fetchVkNews } from "../services/vkNews";

const POSTS_PER_PAGE = 10;

export default function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>(NEWS_POSTS);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  const goToPage = (next: number) => {
    setPage(next);
    // Прокрутка к началу списка при смене страницы
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-lightTeal py-6 sm:py-8 md:py-10 overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Новости
        </h1>
        {loading ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
            Загрузка новостей…
          </div>
        ) : posts.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
            Новостей пока нет. Скоро здесь появятся обновления Центра.
          </div>
        ) : (
          <>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {visiblePosts.map((post) => (
                <article
                  key={post.id}
                  className="min-w-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
                >
                  <Link
                    to={`/stock/${post.slug}`}
                    className="block w-full h-28 sm:h-40 lg:h-48 bg-lightTeal shrink-0"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-28 sm:h-40 lg:h-48 object-contain bg-lightTeal"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1 min-w-0">
                    <h2 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] lg:min-h-[3.5rem] break-words">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 lg:line-clamp-3 min-h-[2rem] sm:min-h-[2.4rem] lg:min-h-[3.4rem] mb-3 lg:mb-4 break-words">
                      {post.shortText || "\u00A0"}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/stock/${post.slug}`}
                        className="w-full inline-flex items-center justify-center px-2 sm:px-3 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-xs sm:text-sm font-medium transition-colors"
                      >
                        Читать полностью
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 ? (
              <nav
                aria-label="Пагинация"
                className="max-w-6xl mx-auto mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
              >
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center px-2.5 sm:px-3 py-2 rounded-md border border-primary text-primary bg-white hover:bg-primary hover:text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Предыдущая страница"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      aria-current={p === currentPage ? "page" : undefined}
                      className={
                        p === currentPage
                          ? "inline-flex items-center justify-center w-9 sm:w-10 py-2 rounded-md bg-primary text-white text-sm font-semibold transition-colors"
                          : "inline-flex items-center justify-center w-9 sm:w-10 py-2 rounded-md border border-primary text-primary bg-white hover:bg-primary hover:text-white text-sm font-medium transition-colors"
                      }
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center px-2.5 sm:px-3 py-2 rounded-md border border-primary text-primary bg-white hover:bg-primary hover:text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Следующая страница"
                >
                  →
                </button>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
