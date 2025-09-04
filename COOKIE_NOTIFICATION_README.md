# Система уведомлений о файлах cookie

## Обзор

Добавлена полная система управления согласием на использование файлов cookie, включающая:

- Уведомление о куки при первом посещении сайта
- Управление настройками куки
- Страница политики использования куки
- Хук для управления состоянием согласия

## Компоненты

### 1. CookieNotification
**Файл:** `src/components/CookieNotification.tsx`

Основной компонент уведомления, который отображается внизу страницы при первом посещении.

**Особенности:**
- Автоматически скрывается после принятия/отклонения
- Сохраняет выбор пользователя в localStorage
- Адаптивный дизайн для мобильных устройств
- Кнопки "Принять" и "Отклонить"

### 2. CookieSettings
**Файл:** `src/components/CookieSettings.tsx`

Компонент для управления настройками куки с подробной информацией о типах файлов.

**Особенности:**
- Показывает текущий статус согласия
- Детальное описание типов куки
- Возможность изменить настройки
- Сброс настроек

### 3. CookiePolicyPage
**Файл:** `src/components/CookiePolicyPage.tsx`

Полная страница с политикой использования куки и настройками.

**Особенности:**
- Подробное описание типов куки
- Интегрированные настройки
- Ссылки на политику конфиденциальности

### 4. useCookieConsent
**Файл:** `src/hooks/useCookieConsent.ts`

React хук для управления состоянием согласия на куки.

**API:**
```typescript
const {
  consentStatus,    // 'accepted' | 'declined' | null
  isLoading,        // boolean
  hasConsent,       // boolean
  hasDeclined,      // boolean
  needsConsent,     // boolean
  acceptCookies,    // () => void
  declineCookies,   // () => void
  resetConsent,     // () => void
} = useCookieConsent();
```

## Интеграция

### В App.tsx
```tsx
import CookieNotification from "./components/CookieNotification";

// В компоненте App
<CookieNotification 
  onAccept={handleCookieAccept}
  onDecline={handleCookieDecline}
/>
```

### Маршруты
Добавлен новый маршрут:
- `/cookie-policy` - страница политики куки

### В Footer.tsx
Добавлена ссылка на политику куки в футере.

## Использование

### Базовое использование
Компонент `CookieNotification` автоматически отображается при первом посещении и скрывается после выбора пользователя.

### Управление настройками
Пользователи могут изменить свои настройки, перейдя на страницу `/cookie-policy`.

### Программное управление
```tsx
import { useCookieConsent } from './hooks/useCookieConsent';

function MyComponent() {
  const { hasConsent, acceptCookies, declineCookies } = useCookieConsent();
  
  // Проверка согласия
  if (hasConsent) {
    // Инициализация аналитики
  }
  
  // Принудительное принятие
  const handleAccept = () => {
    acceptCookies();
  };
}
```

## Стилизация

Компоненты используют Tailwind CSS классы и полностью адаптивны. Основные стили:

- Фиксированное позиционирование внизу экрана
- Адаптивная сетка для кнопок
- Цветовая схема соответствует дизайну сайта
- Плавные переходы и hover эффекты

## Локальное хранение

Настройки сохраняются в `localStorage` с ключом `cookieConsent`:
- `'accepted'` - пользователь принял куки
- `'declined'` - пользователь отклонил куки
- `null` - выбор не сделан

## Расширение функциональности

### Добавление аналитики
В функции `handleCookieAccept` в `App.tsx` можно добавить инициализацию Google Analytics, Яндекс.Метрики и других сервисов:

```tsx
const handleCookieAccept = () => {
  // Инициализация Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
  
  // Инициализация Яндекс.Метрики
  if (typeof ym !== 'undefined') {
    ym(12345678, 'params', { cookie_consent: 'accepted' });
  }
};
```

### Добавление новых типов куки
В компоненте `CookieSettings` можно добавить новые категории куки, обновив массив типов и соответствующие описания.

## Соответствие требованиям

Система соответствует требованиям GDPR и российского законодательства:
- Явное согласие пользователя
- Возможность отзыва согласия
- Прозрачная информация о типах куки
- Легкий доступ к настройкам
