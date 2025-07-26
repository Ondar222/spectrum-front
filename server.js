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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Ответ от Альфа-Банка:", result);

    if (result.errorCode) {
      return res.status(400).json({
        error: true,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage || "Ошибка при создании платежа",
      });
    }

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
    });
  }
});

// Прокси для проверки статуса заказа
app.post("/api/payment/status", async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Статус заказа от Альфа-Банка:", result);

    if (result.errorCode) {
      return res.status(400).json({
        error: true,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage || "Ошибка при проверке статуса",
      });
    }

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Ошибка при проверке статуса:", error);
    res.status(500).json({
      error: true,
      message: "Внутренняя ошибка сервера",
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
