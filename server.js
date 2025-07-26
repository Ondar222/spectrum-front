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
  url: "https://alfa.rbsuat.com/payment/rest",
  token: "pfcr5js74l5jnsqcsrms960nok",
  login: "clinicaldan-operator",
  password: "KACr2LiW3R?",
};

// Прокси для создания платежа
app.post("/api/payment/register", async (req, res) => {
  try {
    const { amount, returnUrl, failUrl, description } = req.body;

    console.log("Получен запрос на создание платежа:", {
      amount,
      returnUrl,
      failUrl,
      description,
    });

    // Валидация входных данных
    if (!amount || !returnUrl || !failUrl || !description) {
      console.error("Отсутствуют обязательные параметры:", {
        amount,
        returnUrl,
        failUrl,
        description,
      });
      return res.status(400).json({
        error: true,
        message: "Отсутствуют обязательные параметры",
      });
    }

    // Генерация orderNumber
    const orderNumber = `cert_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const requestData = {
      orderNumber: orderNumber,
      amount: (amount * 100).toString(), // Конвертация в копейки
      returnUrl: returnUrl,
      failUrl: failUrl,
      description: description,
      token: ALFA_BANK_CONFIG.token,
    };

    console.log("Отправка запроса к Альфа-Банку:", requestData);

    const response = await fetch(`${ALFA_BANK_CONFIG.url}/register.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestData).toString(),
    });

    console.log("Статус ответа от Альфа-Банка:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP ошибка от Альфа-Банка:", response.status, errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Ответ от Альфа-Банка:", result);

    if (result.errorCode) {
      console.error(
        "Ошибка Альфа-Банка:",
        result.errorCode,
        result.errorMessage
      );
      return res.status(400).json({
        error: true,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage || "Ошибка при создании платежа",
      });
    }

    console.log("Платеж успешно создан:", result.orderId);
    res.json({
      success: true,
      formUrl: result.formUrl,
      orderId: result.orderId,
      orderNumber: orderNumber,
    });
  } catch (error) {
    console.error("Ошибка при создании платежа:", error);
    res.status(500).json({
      error: true,
      message: "Внутренняя ошибка сервера",
      details: error.message,
    });
  }
});

// Прокси для проверки статуса заказа
app.post("/api/payment/status", async (req, res) => {
  try {
    const { orderId } = req.body;

    console.log("Получен запрос на проверку статуса:", { orderId });

    if (!orderId) {
      console.error("Отсутствует orderId");
      return res.status(400).json({
        error: true,
        message: "orderId обязателен",
      });
    }

    const requestData = {
      orderId: orderId,
      token: ALFA_BANK_CONFIG.token,
    };

    console.log("Проверка статуса заказа:", requestData);

    const response = await fetch(`${ALFA_BANK_CONFIG.url}/getOrderStatus.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestData).toString(),
    });

    console.log("Статус ответа от Альфа-Банка:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP ошибка от Альфа-Банка:", response.status, errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Статус заказа от Альфа-Банка:", result);

    if (result.errorCode) {
      console.error(
        "Ошибка Альфа-Банка при проверке статуса:",
        result.errorCode,
        result.errorMessage
      );
      return res.status(400).json({
        error: true,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage || "Ошибка при проверке статуса",
      });
    }

    console.log("Статус заказа успешно получен:", result.orderStatus);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Ошибка при проверке статуса:", error);
    res.status(500).json({
      error: true,
      message: "Внутренняя ошибка сервера",
      details: error.message,
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
