import type { NewsPost } from "../data/news";
import { NEWS_POSTS } from "../data/news";

// Базовый URL прокси-сервера (совпадает с настройкой для платежей)
const API_BASE = import.meta.env.VITE_API_URL || "";

type VkPostDto = {
  id: string;
  slug: string;
  title: string;
  image: string;
  shortText: string;
  fullText?: string;
  date?: string;
  url?: string;
};

type VkPostsResponse = {
  success: boolean;
  count: number;
  posts: VkPostDto[];
  error?: boolean;
  message?: string;
};

function mapVkPost(dto: VkPostDto): NewsPost {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    image: dto.image,
    shortText: dto.shortText,
    fullText: dto.fullText,
    date: dto.date,
    url: dto.url,
  };
}

// Получение постов группы ВКонтакте. При ошибке возвращает локальные новости.
export async function fetchVkNews(): Promise<NewsPost[]> {
  try {
    const response = await fetch(`${API_BASE}/api/vk/posts?count=30`);

    if (!response.ok) {
      throw new Error(`VK API proxy error: ${response.status}`);
    }

    const data: VkPostsResponse = await response.json();

    if (!data.success || !Array.isArray(data.posts) || data.posts.length === 0) {
      return NEWS_POSTS;
    }

    const vkPosts = data.posts
      .map(mapVkPost)
      .filter((p) => p.image || p.fullText);
    return vkPosts.length > 0 ? vkPosts : NEWS_POSTS;
  } catch (error) {
    console.error("Не удалось загрузить посты ВКонтакте:", error);
    return NEWS_POSTS;
  }
}

export default fetchVkNews;
