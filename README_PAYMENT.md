# Инструкция по запуску платежной системы

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск в режиме разработки

```bash
# Терминал 1: Запуск прокси-сервера
npm run server

# Терминал 2: Запуск фронтенда
npm run dev
```

### 3. Тестирование

1. Откройте http://localhost:5174
2. Перейдите на `/payment-test` для тестирования API
3. Перейдите на `/certificates` для тестирования формы

## Структура проекта

- `server.js` - Express.js прокси-сервер для обхода CORS
- `src/services/payment.ts` - Платежный сервис
- `src/components/PaymentSuccessPage.tsx` - Страница успешной оплаты
- `src/components/PaymentCancelPage.tsx` - Страница отмены платежа
- `src/components/PaymentTestPage.tsx` - Тестовая страница

## API Endpoints

- `POST /api/payment/register` - Создание платежа
- `POST /api/payment/status` - Проверка статуса заказа

## Конфигурация

Все настройки Альфа-Банка находятся в `server.js`:

- URL: https://alfa.rbsuat.com/payment/rest
- Токен: pfcr5js74l5jnsqcsrms960nok

## Продакшен

```bash
npm run start
```

Это соберет проект и запустит сервер на порту 3001.
