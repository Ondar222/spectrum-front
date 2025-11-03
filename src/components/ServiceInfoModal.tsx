import React from "react";

type ServiceLike = {
  id: number;
  title: string;
  desc?: string;
  bullets?: string[];
  chips?: string[];
  link: string;
  icon?: React.ReactNode;
};

interface ServiceInfoModalProps {
  open: boolean;
  onClose: () => void;
  service?: ServiceLike | null;
}

export default function ServiceInfoModal({
  open,
  onClose,
  service,
}: ServiceInfoModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            {service.icon && (
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {service.icon}
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-primary leading-tight">
                {service.title}
              </h3>
              {service.desc && (
                <p className="mt-2 text-sm sm:text-base text-gray-700">
                  {service.desc}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="-m-1.5 p-1.5 text-gray-400 hover:text-gray-600"
              aria-label="Закрыть"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {service.bullets && service.bullets.length > 0 && (
            <ul className="mt-3 sm:mt-4 list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700">
              {service.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {(service.chips || []).length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {service.chips!.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-gradient-to-b from-indigo-50 to-purple-50 border border-gray-200 p-2.5 text-center text-xs sm:text-sm font-semibold text-primary"
                >
                  {c}
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <a
              href={service.link}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primaryDark"
            >
              Перейти к услугам
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
