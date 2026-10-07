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

// Конфигурация ВКонтакте (публичная группа, с которой тянутся посты)
const VK_CONFIG = {
  accessToken:
    process.env.VK_API_TOKEN ||
    "73849c1373849c1373849c138670bb86a27738473849c131a2089ea3553b2671f256178",
  ownerId: process.env.VK_OWNER_ID || "-225368787",
  apiVersion: "5.199",
};

// Прокси для получения постов группы ВКонтакте
app.get("/api/vk/posts", async (req, res) => {
  const startTime = Date.now();
  const requestId = `vk_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  try {
    const count = Math.min(Number(req.query.count) || 30, 100);

    const params = new URLSearchParams({
      owner_id: VK_CONFIG.ownerId,
      count: String(count),
      access_token: VK_CONFIG.accessToken,
      v: VK_CONFIG.apiVersion,
    });

    const response = await fetch(
      `https://api.vk.com/method/wall.get?${params.toString()}`
    );

    const data = await response.json();

    if (data.error) {
      console.error(`[${requestId}] ❌ Ошибка VK API:`, data.error);
      return res.status(400).json({
        error: true,
        errorCode: data.error.error_code || "VK_API_ERROR",
        message: data.error.error_msg || "Ошибка при получении постов",
      });
    }

    const items = data.response?.items || [];
    const posts = items
      .filter((item) => item.text || (item.attachments && item.attachments.length))
      .map((item) => normalizeVkPost(item));

    console.log(
      `[${requestId}] ✅ Получено постов: ${posts.length} из ${data.response?.count ?? 0}`
    );

    res.json({ success: true, count: posts.length, posts });
  } catch (error) {
    console.error(`[${requestId}] ❌ Ошибка при получении постов VK:`, {
      error: error.message,
      duration: `${Date.now() - startTime}ms`,
    });
    res.status(500).json({
      error: true,
      errorCode: "INTERNAL_ERROR",
      message: "Внутренняя ошибка сервера",
      details: error.message,
    });
  }
});

// Приведение поста VK к структуре, используемой на фронте
function normalizeVkPost(item) {
  const rawText = item.text || extractAttachmentText(item);
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
  const title = lines[0] || "Пост из ВКонтакте";
  const bodyLines = lines.slice(1);
  const fullTextHtml = linesToHtml(rawText);

  return {
    id: `vk_${item.id}`,
    slug: `vk_${item.id}`,
    title,
    image: pickVkPostImage(item),
    shortText: buildVkShortText(bodyLines),
    fullText: fullTextHtml,
    date: item.date ? new Date(item.date * 1000).toISOString().slice(0, 10) : undefined,
    url: `https://vk.com/wall${item.owner_id}_${item.id}`,
  };
}

// Для постов без текста пробуем взять описание из медиавложений (видео/репост)
function extractAttachmentText(item) {
  for (const att of item.attachments || []) {
    const source = att[att.type] || {};
    if (att.type === "video") {
      const text = source.title || source.description || "";
      if (text.trim()) return text.trim();
    }
    if (att.type === "wallpost" && source.text) {
      return source.text.trim();
    }
  }
  return "";
}

// Выбор превью-изображения из вложений поста
function pickVkPostImage(item) {
  const attachments = item.attachments || [];
  const mediaTypes = ["photo", "album", "doc", "video", "wallpost"];
  for (const att of attachments) {
    const source = att[att.type] || {};
    if (!mediaTypes.includes(att.type)) continue;
    const sizes = source.sizes || source.image || [];
    if (!sizes.length) continue;
    // Приоритет широким размерам, иначе максимальному по площади
    const preferred =
      sizes.find((s) => s.type === "w") ||
      sizes.find((s) => s.type === "x") ||
      sizes.find((s) => s.type === "y") ||
      sizes.find((s) => s.type === "z") ||
      [...sizes].sort((a, b) => b.width * b.height - a.width * a.height)[0];
    if (preferred?.url) return preferred.url;
  }
  return "";
}

// Короткий текст для карточки (без первой строки-заголовка)
function buildVkShortText(bodyLines) {
  const text = bodyLines.join(" ");
  return text.length > 180 ? `${text.slice(0, 180).trimEnd()}…` : text;
}

// Преобразование текста поста в простой HTML (переносы строк в параграфы)
function linesToHtml(rawText) {
  const paragraphs = rawText
    .split(/\n{2,}/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((l) => escapeHtml(l.trim()))
        .filter(Boolean)
        .join("<br/>")
    )
    .filter(Boolean);
  return paragraphs.map((p) => `<p>${p}</p>`).join("");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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
