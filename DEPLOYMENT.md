# Инструкции по деплою

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Деплой на Netlify

### Автоматический деплой (рекомендуется)

1. Подключите репозиторий к Netlify
2. Настройки сборки:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### Ручной деплой

1. Соберите проект: `npm run build`
2. Загрузите содержимое папки `dist` в Netlify

## Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит настройки сборки
3. При необходимости укажите:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Деплой на обычный хостинг

1. Соберите проект: `npm run build`
2. Загрузите содержимое папки `dist` на хостинг
3. Настройте веб-сервер для обработки SPA (все маршруты должны вести на index.html)

## Важные моменты

- **Node.js версия**: 18 или выше
- **Пакетный менеджер**: npm (не bun)
- **Папка сборки**: `dist`
- **SPA роутинг**: настроен в `_redirects` для Netlify

## Устранение проблем

### Ошибка сборки

```bash
# Очистка кэша
rm -rf node_modules package-lock.json
npm install

# Очистка папки сборки
rm -rf dist
npm run build
```

### Проблемы с правами доступа

```bash
sudo rm -rf dist
npm run build
```

### Ошибки TypeScript

- Проверьте `tsconfig.json`
- Убедитесь, что все импорты корректны
- Проверьте типы компонентов
