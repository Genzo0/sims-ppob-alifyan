"use client";

import { Banner } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "./SessionProvider";
import { Skeleton } from "@/components/ui/skeleton";

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSession();

  useEffect(() => {
    const getBanners = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return [];
      }

      const result = await res.json();

      return result.data;
    };

    getBanners().then((data) => {
      setBanners(data);
      setIsLoading(false);
    });
  });

  return (
    <div className="relative space-y-5 overflow-visible">
      <p className="font-semibold">Temukan promo menarik</p>
      {isLoading ? (
        <div className="flex gap-5">
          <BannerSkeleton />
          <BannerSkeleton />
          <BannerSkeleton />
          <BannerSkeleton />
        </div>
      ) : (
        <Swiper
          grabCursor={true}
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
        >
          {banners.map((banner: Banner) => (
            <SwiperSlide key={banner.banner_name}>
              <Image
                src={banner.banner_image}
                alt=""
                width={500}
                height={500}
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

function BannerSkeleton() {
  return <Skeleton className="h-32 w-72" />;
}
