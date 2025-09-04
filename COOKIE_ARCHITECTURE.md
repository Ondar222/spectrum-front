# Архитектура системы уведомлений о куки

## Схема компонентов

```
App.tsx
├── CookieNotification (автоматически отображается)
│   ├── useCookieConsent hook
│   ├── localStorage (cookieConsent)
│   └── Кнопки: Принять/Отклонить
│
├── Routes
│   └── /cookie-policy → CookiePolicyPage
│       ├── CookieSettings
│       │   ├── useCookieConsent hook
│       │   ├── Управление настройками
│       │   └── Сброс настроек
│       └── Информация о типах куки
│
└── Footer
    └── Ссылка на /cookie-policy
```

## Поток данных

```
1. Первый визит пользователя
   ↓
2. CookieNotification проверяет localStorage
   ↓
3. Если cookieConsent отсутствует → показать уведомление
   ↓
4. Пользователь выбирает: Принять/Отклонить
   ↓
5. Сохранение в localStorage
   ↓
6. Скрытие уведомления
   ↓
7. При необходимости → переход на /cookie-policy для изменения настроек
```

## Типы куки

```
Необходимые куки
├── Всегда активны
├── Сессии пользователя
├── Настройки безопасности
└── Базовые функции сайта

Аналитические куки
├── Google Analytics (при согласии)
├── Яндекс.Метрика (при согласии)
├── Статистика посещений
└── Поведенческая аналитика

Маркетинговые куки
├── Рекламные сети (при согласии)
├── Отслеживание конверсий
├── Персонализация рекламы
└── A/B тестирование
```

## Состояния согласия

```
null (не определено)
├── Показать CookieNotification
├── Блокировать аналитику
└── Блокировать маркетинговые куки

'accepted' (принято)
├── Скрыть CookieNotification
├── Разрешить аналитику
└── Разрешить маркетинговые куки

'declined' (отклонено)
├── Скрыть CookieNotification
├── Блокировать аналитику
└── Блокировать маркетинговые куки
```

## API хука useCookieConsent

```typescript
interface CookieConsentHook {
  // Состояние
  consentStatus: 'accepted' | 'declined' | null
  isLoading: boolean
  hasConsent: boolean
  hasDeclined: boolean
  needsConsent: boolean
  
  // Действия
  acceptCookies: () => void
  declineCookies: () => void
  resetConsent: () => void
}
```

## Интеграция с аналитикой

```typescript
// В App.tsx
const handleCookieAccept = () => {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
  
  // Яндекс.Метрика
  if (typeof ym !== 'undefined') {
    ym(12345678, 'params', { cookie_consent: 'accepted' });
  }
  
  // Другие сервисы...
};
```

## Соответствие требованиям

- ✅ GDPR (General Data Protection Regulation)
- ✅ Федеральный закон "О персональных данных" (РФ)
- ✅ Явное согласие пользователя
- ✅ Возможность отзыва согласия
- ✅ Прозрачная информация о типах куки
- ✅ Легкий доступ к настройкам
