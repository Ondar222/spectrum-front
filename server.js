import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Конфигурация Альфа-Банка
const ALFA_BANK_CONFIG = {
  // Тестовая среда
  test: {
    url: "https://alfa.rbsuat.com/payment/rest",
    token: "pfcr5js74l5jnsqcsrms960nok",
    login: "clinicaldan-operator",
    password: "KACr2LiW3R?",
  },
  // Продакшн среда
  production: {
    url: "https://pay.alfabank.ru/payment/rest",
    token: "pfcr5js74l5jnsqcsrms960nok",
    login: "clinicaldan-operator",
    password: "vy_$2BTVD*KVD#u/",
  },
};

// Определяем текущую среду
const isProduction = process.env.NODE_ENV === "production";
const currentConfig = isProduction
  ? ALFA_BANK_CONFIG.production
  : ALFA_BANK_CONFIG.test;

console.log(`🚀 Запуск в ${isProduction ? "ПРОДАКШН" : "ТЕСТОВОЙ"} среде`);
console.log(`🔗 URL Альфа-Банка: ${currentConfig.url}`);

// Прокси для создания платежа
app.post("/api/payment/register", async (req, res) => {
  const startTime = Date.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  console.log(`[${requestId}] === НАЧАЛО СОЗДАНИЯ ПЛАТЕЖА ===`);

  try {
    const { amount, returnUrl, failUrl, description } = req.body;

    console.log(`[${requestId}] Получен запрос на создание платежа:`, {
      amount,
      returnUrl,
      failUrl,
      description,
    });

    // Валидация входных данных
    if (!amount || !returnUrl || !failUrl || !description) {
      console.error(`[${requestId}] ❌ Отсутствуют обязательные параметры:`, {
        amount,
        returnUrl,
        failUrl,
        description,
      });
      return res.status(400).json({
        error: true,
        errorCode: "MISSING_PARAMETERS",
        message: "Отсутствуют обязательные параметры",
      });
    }

    // Дополнительная валидация
    if (amount < 100) {
      console.error(`[${requestId}] ❌ Сумма слишком мала: ${amount}`);
      return res.status(400).json({
        error: true,
        errorCode: "INVALID_AMOUNT",
        message: "Минимальная сумма платежа 100 рублей",
      });
    }

    if (amount > 100000) {
      console.error(`[${requestId}] ❌ Сумма слишком велика: ${amount}`);
      return res.status(400).json({
        error: true,
        errorCode: "INVALID_AMOUNT",
        message: "Максимальная сумма платежа 100 000 рублей",
      });
    }

    // Генерация orderNumber
    const orderNumber = `cert_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    console.log(`[${requestId}] Сгенерирован номер заказа: ${orderNumber}`);

    const requestData = {
      orderNumber: orderNumber,
      amount: (amount * 100).toString(), // Конвертация в копейки
      returnUrl: returnUrl,
      failUrl: failUrl,
      description: description,
      token: currentConfig.token,
    };

    console.log(`[${requestId}] Отправка запроса к Альфа-Банку:`, {
      orderNumber: requestData.orderNumber,
      amount: requestData.amount,
      returnUrl: requestData.returnUrl,
      failUrl: requestData.failUrl,
      description: requestData.description,
      token: "***", // Скрываем токен в логах
    });

    const response = await fetch(`${currentConfig.url}/register.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestData).toString(),
    });

    console.log(
      `[${requestId}] Статус ответа от Альфа-Банка: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[${requestId}] ❌ HTTP ошибка от Альфа-Банка:`,
        response.status,
        errorText
      );
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const result = await response.json();
    console.log(`[${requestId}] Ответ от Альфа-Банка:`, result);

    if (result.errorCode) {
      console.error(`[${requestId}] ❌ Ошибка Альфа-Банка:`, {
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
        orderNumber: orderNumber,
      });
      return res.status(400).json({
        error: true,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage || "Ошибка при создании платежа",
        orderNumber: orderNumber,
      });
    }

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] ✅ Платеж успешно создан:`, {
      orderId: result.orderId,
      orderNumber: orderNumber,
      duration: `${duration}ms`,
    });

    res.json({
      success: true,
      formUrl: result.formUrl,
      orderId: result.orderId,
      orderNumber: orderNumber,
      duration: duration,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] ❌ Ошибка при создании платежа:`, {
      error: error.message,
      duration: `${duration}ms`,
    });
    res.status(500).json({
      error: true,
      errorCode: "INTERNAL_ERROR",
      message: "Внутренняя ошибка сервера",
      details: error.message,
      duration: duration,
    });
  }
});

// Прокси для проверки статуса заказа
app.post("/api/payment/status", async (req, res) => {
  const startTime = Date.now();
  const requestId = `status_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  console.log(`[${requestId}] === НАЧАЛО ПРОВЕРКИ СТАТУСА ===`);

  try {
    const { orderId } = req.body;

    console.log(`[${requestId}] Получен запрос на проверку статуса:`, {
      orderId,
    });

    if (!orderId) {
      console.error(`[${requestId}] ❌ Отсутствует orderId`);
      return res.status(400).json({
        error: true,
        errorCode: "MISSING_ORDER_ID",
        message: "orderId обязателен",
      });
    }

    const requestData = {
      orderId: orderId,
      token: currentConfig.token,
    };

    console.log(`[${requestId}] Проверка статуса заказа:`, {
      orderId: requestData.orderId,
      token: "***", // Скрываем токен в логах
    });

    const response = await fetch(`${currentConfig.url}/getOrderStatus.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestData).toString(),
    });

    console.log(
      `[${requestId}] Статус ответа от Альфа-Банка: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[${requestId}] ❌ HTTP ошибка от Альфа-Банка:`,
        response.status,
        errorText
      );
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const result = await response.json();
    console.log(`[${requestId}] Статус заказа от Альфа-Банка:`, result);

    if (result.errorCode) {
      console.error(
        `[${requestId}] ❌ Ошибка Альфа-Банка при проверке статуса:`,
        {
          errorCode: result.errorCode,
          errorMessage: result.errorMessage,
          orderId: orderId,
        }
      );
      return res.status(400).json({
        error: true,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage || "Ошибка при проверке статуса",
        orderId: orderId,
      });
    }

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] ✅ Статус заказа успешно получен:`, {
      orderId: orderId,
      orderStatus: result.orderStatus,
      orderNumber: result.orderNumber,
      amount: result.amount,
      duration: `${duration}ms`,
    });

    res.json({
      success: true,
      ...result,
      duration: duration,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] ❌ Ошибка при проверке статуса:`, {
      error: error.message,
      orderId: req.body.orderId,
      duration: `${duration}ms`,
    });
    res.status(500).json({
      error: true,
      errorCode: "INTERNAL_ERROR",
      message: "Внутренняя ошибка сервера",
      details: error.message,
      duration: duration,
    });
  }
});

// Статические файлы для продакшена
app.use(express.static(path.join(__dirname, "dist")));

// Fallback для SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступен по адресу: http://localhost:${PORT}/api`);
});
