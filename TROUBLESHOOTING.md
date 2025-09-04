# Устранение проблем с API

## Проблема: Ошибка 404 при записи на прием

### Симптомы
```
Failed to load resource: the server responded with a status of 404 (Not Found)
Error submitting appointment: Error: Archimed API error: 404
POST https://aldan.yurta.site/api/archimed/talons 404 (Not Found)
```

### Причина
API URL настроен неправильно. Приложение пытается обратиться к локальному серверу вместо API Архимед+.

### Решение

#### 1. Создайте файл `.env` в корне проекта:
```env
VITE_ARCHIMED_API_URL=https://newapi.archimed-soft.ru/api/v5
VITE_ARCHIMED_API_TOKEN=your_actual_token_here
```

#### 2. Получите API токен
- Обратитесь к администратору системы Архимед+
- Замените `your_actual_token_here` на реальный токен

#### 3. Перезапустите приложение
```bash
npm run dev
# или
yarn dev
```

### Проверка

1. Откройте консоль браузера (F12)
2. Попробуйте записаться на прием
3. В консоли должны появиться логи:
   ```
   Making API request to: https://newapi.archimed-soft.ru/api/v5/talons
   ```

### Тестовый режим

Если API токен не настроен, приложение будет работать в тестовом режиме с моковыми данными. В консоли появится предупреждение:
```
API token not configured, using mock data for testing
```

### Дополнительная информация

- Подробная документация API: https://newapi.archimed-soft.ru/docs/methods
- Файл с инструкциями: `API_SETUP.md`


