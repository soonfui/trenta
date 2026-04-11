"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  "/images/client/1.png",
  "/images/client/2.png",
  "/images/client/3.png",
  "/images/client/4.png",
  "/images/client/5.png",
  "/images/client/6.jpg",
  "/images/client/7.png",
  "/images/client/8.png",
  "/images/client/9.png",
  "/images/client/10.png",
  "/images/client/11.png",
  // "/images/client/12.png",
  "/images/client/13.jpg",
  "/images/client/14.jpg",
  "/images/client/15.jpg",
  "/images/client/16.jpg",
  "/images/client/17.jpg",
];

/** ~2 slides per second */
const SLIDE_INTERVAL_MS = Math.round(1000 / 1.5);

const slideImgClass =
  "absolute inset-0 h-full w-full object-cover [animation:story-fade-in_0.22s_ease-out]";

export function StorySimple() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    for (const src of IMAGES) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex min-h-[100dvh] flex-col bg-black text-white">
      {/* 頂部：避開固定導覽 + 純黑 */}
      <div className="min-h-20 shrink-0 md:min-h-24" aria-hidden />
      {/* 上略小於下：比置中稍高一點，避免太貼頂 */}
      <div className="min-h-0 flex-[0.82]" aria-hidden />
      <div className="mx-auto w-full max-w-7xl shrink-0 px-6 md:px-12">
      <p className="mb-4 text-center text-[16px] tracking-[0.001em] font-semibold opacity-100">
        OUR CLIENTS
      </p>

      {/* Desktop: 左 / 正中正方形圖 / 右 — 圖在視覺正中央 */}
      <div className="mx-auto hidden w-full max-w-6xl items-center justify-center md:flex gap-8 lg:gap-12">

      {/* 左文字 */}
      <span className="text-3xl lg:text-4xl font-medium tracking-[-0.02em] whitespace-nowrap">
        Trusted by 80+
      </span>

      {/* 圖片 */}
      <div className="relative aspect-square w-[320px] lg:w-[380px] shrink-0 overflow-hidden">
        <img
          key={`${index}-${IMAGES[index]}`}
          src={IMAGES[index]}
          alt=""
          className={slideImgClass}
        />
      </div>

      {/* 右文字 */}
      <span className="text-3xl lg:text-4xl font-medium tracking-[-0.02em] whitespace-nowrap">
        leading brands
      </span>

    </div>

      <div className="flex flex-col items-center text-center md:hidden">
        <h2 className="mb-6 text-3xl font-medium tracking-[-0.02em]">Trusted by 80+</h2>

        <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden">
          <img
            key={`${index}-${IMAGES[index]}`}
            src={IMAGES[index]}
            alt=""
            className={slideImgClass}
          />
        </div>

        <h2 className="mt-6 text-3xl font-medium tracking-[-0.02em]">
        leading brands
        </h2>
      </div>
      </div>
      <div className="min-h-0 flex-[1.18]" aria-hidden />
    </section>
  );
}
