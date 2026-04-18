"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

const defaultTrustedLogos = [
  "/images/client/1.png",
  "/images/client/2.png",
  "/images/client/3.png",
  "/images/client/4.png",
  "/images/client/5.png",
  "/images/client/6.png",
  "/images/client/7.png",
  "/images/client/8.png",
  "/images/client/9.png",
  "/images/client/10.png",
  "/images/client/11.png",
  "/images/client/12.png",
  "/images/client/13.jpg",
  "/images/client/14.jpg",
  "/images/client/15.jpg",
  "/images/client/16.jpg",
  "/images/client/17.jpg",
  "/images/client/9.png",
];

type TrustedByProps = {
  logos?: string[];
  className?: string;
};

export function TrustedBy({ logos = defaultTrustedLogos, className = "" }: TrustedByProps) {
  const trustedChunkSize = 6;

  const trustedChunks = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(logos.length / trustedChunkSize) },
        (_, i) => logos.slice(i * trustedChunkSize, i * trustedChunkSize + trustedChunkSize)
      ),
    [logos]
  );

  const [trustedBatchIndex, setTrustedBatchIndex] = useState(0);
  const [trustedVisible, setTrustedVisible] = useState(true);

  useEffect(() => {
    if (!trustedChunks.length) return;

    const showMs = 3200;
    const fadeMs = 500;
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setTrustedVisible(false);
      fadeTimeout = setTimeout(() => {
        setTrustedBatchIndex((prev) => (prev + 1) % trustedChunks.length);
        setTrustedVisible(true);
      }, fadeMs);
    }, showMs + fadeMs);

    return () => {
      clearInterval(interval);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, [trustedChunks.length]);

  return (
    <section
      className={clsx(
        "px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto mt-24 md:mt-32 text-center",
        className
      )}
    >
      <p className="text-sm md:text-base tracking-[0.25em] text-white/60 mb-10 md:mb-14">
        TRUSTED BY
      </p>

      <div
        className={clsx(
          "grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10 transition-opacity duration-500",
          trustedVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {trustedChunks[trustedBatchIndex]?.map((logo, i) => (
          <div
            key={`${trustedBatchIndex}-${logo}-${i}`}
            className="flex h-16 w-full items-center justify-center md:h-20 lg:h-24"
          >
            <img
              src={logo}
              alt="Client logo"
              className="trusted-logo-item h-full w-auto object-contain"
              style={{ animationDelay: `${i * 0.14}s` }}
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes trustedFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .trusted-logo-item {
          opacity: 0;
          animation: trustedFadeIn 0.45s ease forwards;
        }
      `}</style>
    </section>
  );
}
