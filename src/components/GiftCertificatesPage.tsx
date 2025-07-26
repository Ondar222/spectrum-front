import React, { useState } from "react";
import paymentService, { CertificatePaymentData } from "../services/payment";

interface CertificateForm {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  amount: number;
  message: string;
}

export default function GiftCertificatesPage() {
  const [formData, setFormData] = useState<CertificateForm>({
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    senderEmail: "",
    amount: 1000,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const orderId = paymentService.generateOrderId();

      const paymentData: CertificatePaymentData = {
        amount: formData.amount,
        currency: "RUB",
        description: `Подарочный сертификат на сумму ${formData.amount} ₽`,
        orderId: orderId,
        customerEmail: formData.senderEmail,
        customerName: formData.senderName,
        returnUrl: `${window.location.origin}/certificates/success?orderId=${orderId}`,
        cancelUrl: `${window.location.origin}/certificates/cancel?orderId=${orderId}`,
        recipientName: formData.recipientName,
        recipientEmail: formData.recipientEmail,
        senderName: formData.senderName,
        senderEmail: formData.senderEmail,
        message: formData.message,
      };

      const { paymentUrl, orderId: alfaOrderId } =
        await paymentService.createCertificatePayment(paymentData);

      // Перенаправление на страницу оплаты Альфа-Банка
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Ошибка при оформлении сертификата:", error);
      setError("Произошла ошибка при создании платежа. Попробуйте еще раз.");
      setIsSubmitting(false);
    }
  };

  const certificateAmounts = [
    { value: 1000, label: "1 000 ₽" },
    { value: 2000, label: "2 000 ₽" },
    { value: 3000, label: "3 000 ₽" },
    { value: 5000, label: "5 000 ₽" },
    { value: 10000, label: "10 000 ₽" },
    { value: 15000, label: "15 000 ₽" },
    { value: 20000, label: "20 000 ₽" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-green-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">
              Сертификат успешно оформлен!
            </h2>
            <p className="text-gray-600 mb-6">
              Электронный сертификат отправлен на указанный email адрес.
              Получатель сможет воспользоваться сертификатом в течение 3
              месяцев.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Оформить еще один сертификат
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">
            Подарочные сертификаты
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Не знаете какой подарок преподнести? Подарочный сертификат на услуги
            клиники - идеальный выбор для любого торжества!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-dark mb-6">
                Преимущества сертификата
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Оплачивается целый комплекс услуг
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Использование в течение 3 месяцев
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Красивый и стильный подарок
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Покупка на любую сумму</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Электронный сертификат</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-dark mb-4">
                Как это работает
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">
                      Выберите сумму сертификата
                    </h4>
                    <p className="text-sm text-gray-600">
                      От 1 000 до 50 000 рублей
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">Заполните форму</h4>
                    <p className="text-sm text-gray-600">
                      Укажите данные получателя и отправителя
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">
                      Оплатите сертификат
                    </h4>
                    <p className="text-sm text-gray-600">
                      Безопасная оплата онлайн
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">
                      Получите сертификат
                    </h4>
                    <p className="text-sm text-gray-600">
                      Электронный сертификат на email
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-dark mb-6">
              Оформить сертификат
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-gray-700 mb-3 font-medium">
                  Сумма сертификата
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {certificateAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          amount: amount.value,
                        }))
                      }
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.amount === amount.value
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-dark">
                  Данные получателя
                </h3>
                <div>
                  <label
                    htmlFor="recipientName"
                    className="block text-gray-700 mb-2"
                  >
                    Имя получателя *
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="recipientEmail"
                    className="block text-gray-700 mb-2"
                  >
                    Email получателя *
                  </label>
                  <input
                    type="email"
                    id="recipientEmail"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Sender Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-dark">
                  Данные отправителя
                </h3>
                <div>
                  <label
                    htmlFor="senderName"
                    className="block text-gray-700 mb-2"
                  >
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="senderEmail"
                    className="block text-gray-700 mb-2"
                  >
                    Ваш email *
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Поздравительное сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  placeholder="Напишите поздравление для получателя..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary hover:bg-primaryDark text-white py-3 px-6 rounded-md font-medium transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? "Обработка..."
                  : `Оплатить ${paymentService.formatAmount(formData.amount)}`}
              </button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Важно:</strong> Сертификат будет отправлен на email
                получателя. Проверьте папку "СПАМ", если не получили письмо.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
