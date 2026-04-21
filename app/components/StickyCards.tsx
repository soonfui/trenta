"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function StickyCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const cards = gsap.utils.toArray<HTMLElement>(".card");

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * 5,
        scale: 1 - i * 0.07,
      });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1,
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen relative bg-zinc-900 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {["Card1", "Card2", "Card3", "Card4"].map((item, i) => (
        <div
          key={i}
          className="card absolute top-1/2 left-1/2 w-[70vw] h-[60vh] rounded-3xl bg-white text-black flex items-center justify-center text-5xl font-bold shadow-2xl"
        >
          {item}
        </div>
      ))}
    </section>
  );
}