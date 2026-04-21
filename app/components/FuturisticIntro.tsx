"use client";

import { useEffect, useRef } from "react";

export default function FuturisticIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = window.innerWidth;
    let h = 700;

    canvas.width = w;
    canvas.height = h;

    const points = Array.from({ length: 18 }).map(() => ({
      x: w / 2 + (Math.random() - 0.5) * 120,
      y: h / 2 + (Math.random() - 0.5) * 120,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // points + lines
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < w / 2 - 120 || p.x > w / 2 + 120) p.vx *= -1;
        if (p.y < h / 2 - 120 || p.y > h / 2 + 120) p.vy *= -1;
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];

          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 90) {
            ctx.strokeStyle = "rgba(255,255,255,0.08)";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p) => {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = window.innerWidth;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="relative h-[700px] bg-black overflow-hidden text-white">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* left text */}
      <div className="absolute left-10 top-16 max-w-xl z-10">
        <p className="text-2xl md:text-3xl leading-snug text-white/90">
          Established in 2026, Trenta is a premium event and media studio
          creating unforgettable brand experiences through production,
          advertising, lighting systems and professional sound execution.
        </p>
      </div>

      {/* bottom title */}
      <h2 className="absolute bottom-8 left-8 text-6xl md:text-8xl font-semibold tracking-tight z-10">
        Trenta+
      </h2>
    </section>
  );
}