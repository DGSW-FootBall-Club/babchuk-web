"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const banners = [
  {
    bg: "url(/icons/banner.png)",
    title: "대소고 FC\n 공식 플랫폼에 오신 것을 환영해요!",
    href: "/magazine",
  },
  {
    bg: "url(/icons/school.svg)",
    title: "밥 먹고 축구 할사람?\n지금 바로 참여해요!",
    href: "/schedule",
  },
];

export const HomeBanner = () => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrent((prev) => (prev + 1) % banners.length);
      else setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrent((prev) => (prev + 1) % banners.length);
      else setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  return (
    <div
      className="relative mb-4 rounded-2xl overflow-hidden select-none"
      style={{ minHeight: "clamp(160px, 40vw, 230px)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <Link
            key={index}
            href={banner.href}
            className="shrink-0 w-full"
            draggable={false}
          >
            <div
              style={{
                backgroundImage: banner.bg,
                backgroundSize: "cover",
                backgroundPosition: "center bottom 35%",
                minHeight: "clamp(160px, 40vw, 230px)",
              }}
              className="relative w-full"
            >
              <div className="absolute inset-0 bg-black/40" />
              <div
                className="relative z-10 p-5 flex flex-col justify-end h-full"
                style={{ minHeight: "230px" }}
              >
                <p className="text-white font-bold text-lg md:text-2xl leading-tight whitespace-pre-line">
                  {banner.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrent(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
