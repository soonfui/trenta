"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollRevealContent() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.45], [100, 0]);

  return (
    <section
      ref={ref}
      className="min-h-[180vh] bg-black text-white flex items-center justify-center px-6 overflow-hidden"
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-medium leading-[1.12] tracking-tight">
          Your brand shouldn’t just be seen — it should be experienced.
          <br />
          We craft immersive brand journeys that go beyond visuals.
          <br />
          From high-impact events that draw crowds, to content that resonates,
          and sound & lighting that transforms every moment.
          <br />
          We design experiences that leave lasting impressions.
          <br />
          From mall activations to full-scale digital campaigns,
          we help brands grow, connect, and stand out where it matters most.
        </h2>
      </motion.div>
    </section>
  );
}