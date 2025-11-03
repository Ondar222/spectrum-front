import React from "react";

export default function AboutPhotos() {
  const images = Array.from({ length: 16 }).map(
    (_, i) => `/about_us/photo${i + 1}.jpg`
  );

  return (
    <div>
      {/* Unified: horizontal swipe gallery with snap across all screens */}
      <div className="-mx-4">
        <div className="flex overflow-x-auto gap-3 px-4 pb-2 snap-x snap-mandatory">
          {images.map((src, i) => (
            <div
              key={`about-any-${i}`}
              className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[33%] xl:w-[25%]"
            >
              <img
                src={src}
                alt={`О нас фото ${i + 1}`}
                className="w-full h-64 md:h-64 lg:h-60 object-cover rounded-xl border border-gray-100 shadow"
                loading={i > 2 ? "lazy" : "eager"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
