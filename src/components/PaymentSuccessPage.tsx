import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import certificateService from "../services/certificates";

interface PaymentSuccessPageProps {
  type?: "certificate" | "appointment";
}

export default function PaymentSuccessPage({
  type = "certificate",
}: PaymentSuccessPageProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<{
    status: string;
    paid: boolean;
    amount?: number;
    orderId?: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!orderId) {
        setError("Номер заказа не найден");
        setIsLoading(false);
        return;
      }

      try {
        const response = await certificateService.checkPaymentStatus(orderId);
        
        // Статусы Альфа-Банка:
        // 0 - заказ зарегистрирован, но не оплачен
        // 1 - предавторизованная сумма захолдирована
        // 2 - проведена полная авторизация суммы заказа
        // 3 - авторизация отменена
        // 4 - по транзакции была проведена операция возврата
        // 5 - инициирована авторизация через ACS банка-эмитента
        // 6 - авторизация отклонена
        
        const isPaid = response.orderStatus === 2;
        const status = isPaid ? 'paid' : 'pending';
        
        setPaymentStatus({
          status,
          paid: isPaid,
          amount: response.amount,
          orderId: response.orderNumber
        });
      } catch (error) {
        console.error("Ошибка при проверке статуса платежа:", error);
        setError("Не удалось проверить статус платежа");
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [orderId]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoToCertificates = () => {
    navigate("/certificates");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Проверяем статус платежа...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-red-500 mb-4">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">
              Произошла ошибка
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={handleGoHome}
                className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                На главную
              </button>
              <button
                onClick={handleGoToCertificates}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
              >
                К сертификатам
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentStatus?.paid) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-yellow-500 mb-4">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">
              Платеж в обработке
            </h2>
            <p className="text-gray-600 mb-6">
              Ваш платеж обрабатывается. Это может занять несколько минут. Мы
              уведомим вас, когда платеж будет подтвержден.
            </p>
            {paymentStatus?.orderId && (
              <p className="text-sm text-gray-500 mb-6">
                Номер заказа: {paymentStatus.orderId}
              </p>
            )}
            <div className="space-x-4">
              <button
                onClick={handleGoHome}
                className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                На главную
              </button>
              <button
                onClick={handleGoToCertificates}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
              >
                К сертификатам
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {type === "certificate"
              ? "Сертификат успешно оплачен!"
              : "Запись успешно оплачена!"}
          </h2>
          <p className="text-gray-600 mb-6">
            {type === "certificate"
              ? "Электронный сертификат отправлен на указанный email адрес. Получатель сможет воспользоваться сертификатом в течение 3 месяцев."
              : "Ваша запись на прием подтверждена. Мы отправили подтверждение на ваш email."}
          </p>
          {paymentStatus?.orderId && (
            <p className="text-sm text-gray-500 mb-6">
              Номер заказа: {paymentStatus.orderId}
            </p>
          )}
          <div className="space-x-4">
            <button
              onClick={handleGoHome}
              className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              На главную
            </button>
            {type === "certificate" && (
              <button
                onClick={handleGoToCertificates}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Оформить еще один сертификат
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
