// Тестовый скрипт для создания платежа
import fetch from "node-fetch";

async function createTestPayment() {
  try {
    const response = await fetch("http://localhost:3001/api/payment/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1000,
        returnUrl: "http://localhost:5174/test-success",
        failUrl: "http://localhost:5174/test-cancel",
        description: "ТЕСТОВЫЙ ПЛАТЕЖ ДЛЯ АДМИН-ПАНЕЛИ",
      }),
    });

    const result = await response.json();
    console.log("✅ Платеж создан:", result);

    // Проверяем статус через 2 секунды
    setTimeout(async () => {
      const statusResponse = await fetch(
        "http://localhost:3001/api/payment/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: result.orderId,
          }),
        }
      );

      const statusResult = await statusResponse.json();
      console.log("📊 Статус платежа:", statusResult);
    }, 2000);
  } catch (error) {
    console.error("❌ Ошибка:", error);
  }
}

createTestPayment();
