import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NEWS_POSTS, type NewsPost } from "../data/news";
import { fetchVkNews } from "../services/vkNews";

// На главной показываем 5 последних постов
const FEATURED_COUNT = 5;

export default function HomeNews() {
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

  const featured = posts.slice(0, FEATURED_COUNT);

  return (
    <section className="py-10 sm:py-12 bg-secondary">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
          Главные новости
        </h2>

        {loading ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
            Загрузка новостей…
          </div>
        ) : featured.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-center text-gray-600">
            Новостей пока нет.
          </div>
        ) : (
          <>
            {/* Новости в один ряд: на мобильных — ручной свайп, на десктопе — автопрокрутка */}
            <div className="relative max-w-full overflow-x-auto sm:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory sm:snap-none group">
              <div className="flex gap-3 sm:gap-4 w-max sm:animate-marquee group-hover:[animation-play-state:paused]">
                {/* Дублируем список дважды для бесшовной прокрутки (дубли скрыты на мобильных) */}
                {[...featured, ...featured].map((post, idx) => (
                  <article
                    key={`${post.id}-${idx}`}
                    className={`w-40 sm:w-52 shrink-0 snap-start bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex-col h-full ${
                      idx >= featured.length ? "hidden sm:flex" : "flex"
                    }`}
                  >
                    <Link
                      to={`/stock/${post.slug}`}
                      className="block w-full h-28 sm:h-36 bg-gray-100 shrink-0"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-28 sm:h-36 object-contain bg-gray-100"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-3 flex flex-col flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold mb-3 line-clamp-3 min-h-[3rem] break-words">
                        {post.title}
                      </h3>
                      <div className="mt-auto">
                        <Link
                          to={`/stock/${post.slug}`}
                          className="w-full inline-flex items-center justify-center px-2 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-xs font-medium transition-colors"
                        >
                          Читать
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Link
                to="/stock"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-primary text-primary bg-white hover:bg-primary hover:text-white text-sm font-medium transition-colors"
              >
                Все новости
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
