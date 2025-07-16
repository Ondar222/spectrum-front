# Клиника Алдан - Веб-сайт

Современный веб-сайт для медицинской клиники Алдан, разработанный с использованием React, TypeScript и Tailwind CSS.

## Особенности

- 🏥 Современный дизайн с брендингом клиники Алдан
- 📱 Адаптивный дизайн для всех устройств
- 🎨 Красная цветовая схема (RGB 210, 0, 46)
- 📊 Интеграция с Directus CMS
- 💰 Динамический прайс-лист с группировкой услуг
- 🔍 Поиск и фильтрация услуг
- 🎁 Покупка подарочных сертификатов
- 👤 Личный кабинет пациента
- ⚡ Быстрая загрузка и оптимизация
- 🔍 SEO-оптимизированный

## Технологии

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **CMS**: Directus
- **Сборка**: Vite
- **Стили**: Tailwind CSS с кастомными цветами
- **Роутинг**: React Router

## Установка и запуск

### Предварительные требования

- Node.js 18+ 
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# Directus CMS Configuration
VITE_DIRECTUS_URL=http://localhost:8055
VITE_DIRECTUS_TOKEN=your_directus_token_here

# Archimed API Configuration
VITE_ARCHIMED_API_URL=https://your-archimed-api.com
VITE_ARCHIMED_API_TOKEN=your_archimed_token_here

# Services API Configuration
VITE_SERVICES_API_URL=https://your-api-endpoint.com/services

# Payment API Configuration
VITE_PAYMENT_API_URL=https://your-payment-api.com
VITE_PAYMENT_API_KEY=your_payment_api_key_here

# App Configuration
VITE_SITE_NAME=Клиника Алдан
VITE_SITE_DESCRIPTION=Современная медицинская клиника с высококвалифицированными специалистами
```

### Запуск в режиме разработки

```bash
npm run dev
```

Сайт будет доступен по адресу: http://localhost:5173

### Сборка для продакшена

```bash
npm run build
```

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Header.tsx      # Шапка сайта
│   ├── Footer.tsx      # Подвал сайта
│   ├── Hero.tsx        # Главный баннер
│   ├── ServiceGrid.tsx # Сетка услуг
│   └── ...
├── services/           # Сервисы для работы с API
│   └── directus.ts    # Сервис для Directus CMS
├── types/              # TypeScript типы
│   ├── cms.ts         # Типы для CMS
│   └── doctors.ts     # Типы для врачей
└── App.tsx            # Главный компонент приложения
```

## Цветовая схема

Основные цвета клиники Алдан:

- **Основной красный**: `#d2002e` (RGB 210, 0, 46)
- **Темный красный**: `#b30026` (для hover эффектов)
- **Светлый красный**: `#e6334d` (для акцентов)
- **Темно-синий**: `#2c3e50` (для текста)
- **Белый**: `#ffffff` (фон)

## Интеграция с API

### Directus CMS

Сайт интегрирован с Directus CMS для управления контентом. Поддерживаемые типы контента:

- **Врачи**: информация о специалистах
- **Услуги**: медицинские услуги клиники
- **Отзывы**: отзывы пациентов
- **Новости**: новости клиники
- **Акции**: специальные предложения
- **FAQ**: часто задаваемые вопросы
- **Контакты**: контактная информация

### Archimed API

Сайт интегрирован с Archimed - информационной системой клиники. Поддерживаемые типы данных:

**Врачи:**
```typescript
interface ArchimedDoctor {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  type: string;
  branch: string;
  category: string;
  scientific_degree: string;
  max_time: string;
  phone: string;
  info: string;
  // ... другие поля
}
```

**Услуги:**
```typescript
interface ApiService {
  id: number;
  kind: number;
  code: string;
  name: string;
  altname: string;
  group_name: string;
  group_id: number;
  base_cost: number;
  cito_cost: number;
  duration: number;
  // ... другие поля
}
```

**Функциональность:**
- Получение списка врачей с фильтрацией
- Группировка услуг по категориям
- Поиск по ФИО, специальности, отделению
- Фильтрация врачей по отделениям и категориям
- Отображение срочных услуг (cito_cost)
- Интеграция с реальными данными клиники

## Настройка Directus

1. Установите Directus CMS
2. Создайте коллекции согласно типам в `src/types/cms.ts`
3. Настройте API токены
4. Обновите переменные окружения

## Развертывание

### Netlify

Сайт настроен для развертывания на Netlify. Файл `netlify.toml` содержит необходимые настройки.

### Другие платформы

Для развертывания на других платформах используйте команду:

```bash
npm run build
```

И загрузите содержимое папки `dist/` на ваш хостинг.

## Лицензия

© 2024 Клиника Алдан. Все права защищены.
