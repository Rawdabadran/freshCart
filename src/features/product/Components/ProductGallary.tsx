"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/thumbs";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {/* Main slider (Cube effect) */}
      <div className="pb-6">
        <Swiper
          modules={[EffectCube, Thumbs]}
          effect="cube"
          grabCursor
          cubeEffect={{
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94,
            slideShadows: false,
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="aspect-square w-full"
        >
          {images.map((src) => (
            <SwiperSlide
              key={src}
              role="img"
              aria-label={title}
              style={{ backgroundImage: `url("${src}")`, backgroundSize:"cover",
        backgroundPosition:"center" }}
              className="rounded-xl bg-gray-50 bg-contain bg-center bg-no-repeat"
            />
          ))}
        </Swiper>
      </div>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
        slidesPerView="auto"
        watchSlidesProgress
        className="w-full"
      >
        {images.map((src) => (
          <SwiperSlide
            key={src}
            style={{ backgroundImage: `url("${src}")` }}
            className="h-16! w-16! cursor-pointer rounded-lg border-2 border-transparent bg-gray-50 bg-cover bg-center sm:h-20! sm:w-20! [&.swiper-slide-thumb-active]:border-primary-500"
          />
        ))}
      </Swiper>
    </div>
  );
}