"use client";

import { Banner } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Banners({ banners }: { banners: Banner[] }) {
  return (
    <div className="relative -mr-[calc(100vw-100%)] space-y-5 overflow-visible">
      <p className="font-semibold">Temukan promo menarik</p>
      <Swiper
        grabCursor={true}
        slidesPerView={4.7}
        centeredSlides={false}
        spaceBetween={20}
      >
        {banners.map((banner: Banner) => (
          <SwiperSlide key={banner.banner_name}>
            <img src={banner.banner_image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
