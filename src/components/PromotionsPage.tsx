import React, { useEffect, useMemo, useState } from 'react';
import directusService from '../services/directus';
import type { Promotion as CmsPromotion } from '../types/cms';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<CmsPromotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await directusService.getPromotions();
        setPromotions(res.data || []);
      } catch (e) {
        console.error('Failed to load promotions from Directus', e);
        setError('Не удалось загрузить акции. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const getImageUrl = (image?: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    const base = (import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '');
    return `${base}/assets/${image}`;
  };

  const uiPromos = useMemo(() => {
    return promotions.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      discountLabel: typeof p.discount === 'number' && p.discount > 0 ? `${p.discount}%` : 'Акция',
      validUntil: p.valid_until,
      imageUrl: getImageUrl(p.image),
    }));
  }, [promotions]);

  const listToRender = useMemo(() => {
    if (uiPromos.length > 0) return uiPromos;
    // Fallback to VK promo when Directus is unavailable
    return [{
      id: 'vk-7248',
      title: 'На все операции по варикозу -30%',
      description: 'Смотрите видео акции во ВКонтакте',
      discountLabel: 'Акция',
      validUntil: '',
      imageUrl: 'https://copyblank.ru/upload/iblock/6ab/6ab1bfd9b03a0b0f7f5ae8b7e9fee88d.webp',
      link: 'https://vk.com/wall-128344113_7248',
      isVideo: true,
    } as any];
  }, [uiPromos]);

  return (
    <div className="min-h-screen bg-lightTeal py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">Акции и специальные предложения</h1>

          {isLoading && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">Загрузка...</div>
          )}
          {error && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-red-600">{error}</div>
          )}

          {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listToRender.map((promo: any) => (
                <div key={promo.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  {promo.isVideo ? (
                    <div className="relative w-full">
                      {promo.imageUrl ? (
                        <img src={promo.imageUrl} alt={promo.title} className="w-full h-48 object-cover" />
                      ) : (
                        <div className="w-full pt-[56.25%] bg-gradient-to-br from-[#4c75a3] to-[#2a5885]" />
                      )}
                      <button
                        type="button"
                        onClick={() => promo.link && window.open(promo.link, '_blank', 'noopener,noreferrer')}
                        className="absolute inset-0 flex items-center justify-center group"
                        aria-label="Смотреть видео ВКонтакте"
                      >
                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 text-[#2a5885] group-hover:bg-white transition">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                      <div className="absolute top-4 right-4 bg-teal text-white px-3 py-1 rounded-full font-medium">{promo.discountLabel}</div>
                    </div>
                  ) : (
                    promo.imageUrl ? (
                      <div className="relative">
                        <img src={promo.imageUrl} alt={promo.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-4 right-4 bg-teal text-white px-3 py-1 rounded-full font-medium">{promo.discountLabel}</div>
                      </div>
                    ) : null
                  )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 leading-tight">{promo.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{promo.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{promo.validUntil ? `Действует до: ${promo.validUntil}` : ''}</span>
                        {promo.link ? (
                          <a href={promo.link} target="_blank" rel="noopener noreferrer" className="bg-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-teal/90 transition-colors">{promo.isVideo ? 'Смотреть видео' : 'Подробнее'}</a>
                        ) : (
                          <button className="bg-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-teal/90 transition-colors">Записаться</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* Subscription form */}
          <div className="mt-10 md:mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 md:mb-4">Подпишитесь на рассылку акций</h2>
            <p className="text-gray-600 text-center mb-4 md:mb-6">
              Будьте в курсе всех специальных предложений и акций нашей клиники
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
                />
                <button
                  type="submit"
                  className="bg-teal text-white px-6 py-2 rounded-md font-medium hover:bg-teal/90 transition-colors"
                >
                  Подписаться
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 