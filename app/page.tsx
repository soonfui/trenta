"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";
import { TrustedBy } from "@/app/components/TrustedBy";
import {Inter} from 'next/font/google'
import { Titillium_Web } from "next/font/google";
import { Play } from "lucide-react";



const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function Home() {
  const [active, setActive] = useState("Events");
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [videoOpen]);

  const whoMeasureRef = useRef<HTMLParagraphElement | null>(null);
  const whoObserverRef = useRef<HTMLParagraphElement | null>(null);
  const whoWrapRef = useRef<HTMLDivElement | null>(null);
  const [whoLines, setWhoLines] = useState<number[][] | null>(null);

  const whoTokens = useMemo(() => {
    const parts: Array<
      | { type: "text"; value: string }
      | { type: "icon"; src: string; alt?: string }
    > = [
      { type: "text", value: "Your brand shouldn’t just be seen — it should be experienced. We craft immersive brand journeys that go beyond visuals. From high-impact events that draw crowds, to content that resonates, and sound & lighting that transforms every moment — we design experiences that leave lasting impressions. From mall activations to full-scale digital campaigns, we help brands grow, connect, and stand out where it matters most." },
      //{ type: "icon", src: "/images/project/Malaysia Airports Holdings Berhad (MAHB)/2.jpeg" },
      //{ type: "text", value: "We craft immersive brand journeys that go beyond visuals." },
      //{ type: "icon", src: "/images/project/ads/proxes.jpg" },
      //{ type: "text", value: "From high-impact events that draw crowds, to content that resonates, and sound & lighting that transforms every moment — we design experiences that leave lasting impressions." },
      //{ type: "icon", src: "/images/project/pa/6.jpeg" },
      //{ type: "text", value: "From mall activations to full-scale digital campaigns," },
      //{ type: "icon", src: "/images/project/ads/vivo.JPG" },
      //{ type: "text", value: "we help brands grow, connect, and stand out where it matters most." },
      //{ type: "icon", src: "/images/project/ads/maybank.jpg" },
    ];

    const tokens: Array<
      | { kind: "word"; text: string }
      | { kind: "space"; text: string }
      | { kind: "icon"; src: string; alt?: string }
    > = [];

    const pushText = (t: string) => {
      const words = t.trim().split(/\s+/).filter(Boolean);
      for (let i = 0; i < words.length; i++) {
        tokens.push({ kind: "word", text: words[i] });
        if (i !== words.length - 1) tokens.push({ kind: "space", text: " " });
      }
      tokens.push({ kind: "space", text: " " });
    };

    for (const p of parts) {
      if (p.type === "text") pushText(p.value);
      else tokens.push({ kind: "icon", src: p.src, alt: p.alt });
      tokens.push({ kind: "space", text: " " });
    }

    // trim trailing spaces
    while (tokens.length && tokens[tokens.length - 1].kind === "space") tokens.pop();
    return tokens;
  }, []);

  useEffect(() => {
    const wrap = whoWrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Progress from when top hits 80% viewport to when bottom hits 30% viewport
      const start = vh * 0.8;
      const end = vh * 0.3;
      const t = (start - rect.top) / (start - end);
      const p = clamp01(t);
      wrap.style.setProperty("--who-p", String(p));
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useLayoutEffect(() => {
    const el = whoMeasureRef.current;
    if (!el) return;

    let raf = 0;
    let ro: ResizeObserver | null = null;

    const compute = () => {
      raf = 0;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-who-token]"));
      if (!nodes.length) return;

      const styles = window.getComputedStyle(el);
      const lineHeight = Number.parseFloat(styles.lineHeight) || 1;
      const baseTop = el.getBoundingClientRect().top;

      const lines: number[][] = [];
      let currentKey: number | null = null;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // Use first line box for inline content (more stable across icons/baseline).
        const rects = n.getClientRects();
        const top = (rects[0]?.top ?? n.getBoundingClientRect().top) - baseTop;
        const key = Math.round(top / lineHeight);

        if (currentKey === null || key !== currentKey) {
          lines.push([]);
          currentKey = key;
        }
        lines[lines.length - 1].push(i);
      }

      setWhoLines(lines);
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    schedule();

    // Recompute on any layout width change (breakpoints, container resizing).
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => schedule());
      if (whoWrapRef.current) ro.observe(whoWrapRef.current);
      else ro.observe(el);
    } else {
      window.addEventListener("resize", schedule);
    }

    // Fonts loading can change wrapping; schedule after fonts are ready.
    const fontsAny = document as any;
    if (fontsAny.fonts?.ready?.then) {
      fontsAny.fonts.ready.then(() => schedule()).catch(() => {});
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [whoTokens]);

  const filters = ["Events", "Advertising", "Sound & Light"];
  type Variant = "dark" | "light" | "highlight" | "greenlight" | "bluelight" | "pinklight";
  const BaseCard = ({
    children,
    variant = "dark",
    image,
    className = "",
  }: {
      children: React.ReactNode;
      variant?: Variant;
      image?: string;
      className?: string;
    }) => {
    const styles = {
      dark: "bg-zinc-900 text-white",
      light: "bg-white text-black",
      highlight: "bg-zinc-800 text-white",
      greenlight: "bg-lime-400 text-white ",
      bluelight: "bg-blue-400 text-white",
      pinklight: "bg-pink-400 text-lime-700",
    };

    return (
      <div
        className={`
          relative overflow-hidden group
          ${styles[variant]}
          ${className}
        `}
      >
        {/* 🖼️ 背景圖片 */}
        {image && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={image}
              className="w-full h-full object-cover md:group-hover:scale-105 transition duration-500 will-change-transform"
            />
          </div>
        )}

        {/* 🌑 overlay（讓字清楚） */}
        {image && (
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/60 transition" />
        )}

        {/* 📝 內容 */}
        <div className="relative p-6 md:p-8 flex items-end h-full">
          {children}
        </div>
      </div>
    );
  };

  const data = {
      Events: [
        { title: "Mall Activation", desc: "TOYOTA", image: "/images/project/toyota/2.jpg" },
        //{ quote: "Let’s build your next campaign ↗", author: "Retail Brand",image: "/images/project/Chevrolet/1.jpeg" },
        { title: "Brand Media Launch", desc: "Chevrolet",image: "/images/project/Chevrolet/1.jpeg" },
        { quote: "Turn brand activations and media launches into unforgettable experiences. " },
        { quote: "Event Services" , author: "See how we support your brand ↗"},
        { title: "More..." ,image: "/images/project/ads/proxes.jpg"},
      ],

      Advertising: [
        { title: "Communication", desc: "Chun-Ciou Hot Pot Malaysia",image: "/images/project/ads/1.jpg" },
        { title: "Creative Advertising", desc: "Alliance Bank" ,image: "/images/project/Alliance Bank/3.jpeg"},
        { quote: "Blend strategic communication with bold creative design to turn your brand’s message into high-impact advertising." },
        // { quote: "Blend strategic communication with bold creative design to turn your brand’s message into an unforgettable experience." },
        { quote: "Creative Services", author: "See how we support your brand ↗" },
        { title: "More...",image: "/images/project/ads/segi2.jpg"},
      ],

      "Sound & Light": [
        { title: "LIVE SOUND, LIGHT & SCREEN", desc: "Music Festival" ,image: "/images/project/pa/1.jpeg" },
        { title: "STAGE SETUP", desc: "Full Technical Support" ,image: "/images/project/pa/10.jpeg"  },
        { quote: "Blend strategic communication with bold creative design to turn your brand’s message into an unforgettable experience."},
        { quote: "Audio-Visual Services", author: "See how we support your brand ↗"},
        { title: "More...",image: "/images/project/pa/9.jpeg" },
      ],
    };

  const current = data[active as keyof typeof data];

    // 👉 保證至少 6 個位置（不足補 null）
  // const slots = [...current];
  //   while (slots.length < 6) slots.push(null);

  const layoutType =
  current.length === 5 ? "five" :
  current.length === 6 ? "six" :
  "seven";

    // 👉 render function
  const render = (item?: any) => {
    if (!item) return null;

    if (item.quote) {
      const shouldLinkToWorks =
        typeof item.author === "string" && /see how we support/i.test(item.author);

      return (
        <div className="flex flex-col justify-between h-full">
          <p className="text-lg leading-relaxed">{item.quote}</p>
          {item.author ? (
            shouldLinkToWorks ? (
              <Link
                href="/works"
                className="text-sm mt-6 opacity-70 underline underline-offset-4 hover:opacity-100 transition"
              >
                {item.author}
              </Link>
            ) : (
              <p className="text-sm mt-6 opacity-70">{item.author}</p>
            )
          ) : null}
        </div>
      );
    }

    return (
      <div>
        <h3 className="text-xl font-medium">{item.title}</h3>
        {item.desc && (
          <p className="text-sm opacity-60 mt-1">{item.desc}</p>
        )}
      </div>
    );
  };


  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <SiteNav />

      {/* HERO */}
      <section className="pt-40 md:pt-60 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl leading-tight font-medium">
              We turn creative vision into{" "}
              <span className="text-lime-400">experiences</span>,{" "}
              <span className="text-blue-500">content</span>, &{" "}
              <span className="text-pink-300">design </span> that define your brand.
            </h1>
          </div>

          <div className="max-w-sm text-gray-400">
            <p>
              From space to screen to sound — we design how your brand stands out.
            </p>
            <a
              href="#contact"
              className="inline-block mt-6 border-b border-white pb-1 text-white"
            >
              Start Your Project
            </a>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex gap-3 mt-12 flex-wrap">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-4 py-2 text-sm border rounded-full transition
              ${
                active === item
                  ? "bg-white text-black"
                  : "border-white/20 hover:bg-white hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-20">

  {/* 🔥 5 layout */}
{layoutType === "five" && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] bg-black">

    {/* 1️⃣ 大 */}
    <BaseCard variant="highlight" className="md:col-span-2 h-[320px]" image={current[0]?.image}>
      {render(current[0])}
    </BaseCard>

    {/* 2️⃣ 白（quote） */}
    <BaseCard variant="highlight" className="h-[320px] items-start" image={current[1]?.image}>
      {render(current[1])}
    </BaseCard>

    {/* 3️⃣ 左下（All Services） */}
    <BaseCard variant="light" className="h-[200px] items-start" image={current[2]?.image}>
      {render(current[2])}
    </BaseCard>

    {/* 4️⃣ 中間（CTA） */}
    <BaseCard variant="bluelight" className="h-[200px] items-center" image={current[3]?.image} >
      {render(current[3])}
    </BaseCard>

    {/* 5️⃣ 右下（EXTRA 🔥） */}
    <BaseCard variant="highlight" className="h-[200px]" image={current[4]?.image}>
      {render(current[4])}
    </BaseCard>

  </div>
)}

      </section>

      <TrustedBy />

      {/* WHO WE ARE */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-32 md:mt-48">

        <p className="text-[18px] md:text-[26px] text-white mb-8 tracking-[0.08em]">
          ▪ Who We Are
        </p>

        <div
          ref={whoWrapRef}
          className="who-wrap relative"
          style={{ ["--who-lines" as any]: whoLines?.length ?? 1 }}
        >
          {/* hidden measurer (must share same width constraints) */}
          <p
            ref={whoMeasureRef}
            className={`${titillium.className} who-text who-measure text-[clamp(32px,5vw,84px)] leading-[1.02] font-[400] tracking-[-0.03em]`}
            aria-hidden="true"
          >
            {whoTokens.map((t, i) => {
              if (t.kind === "icon") {
                return (
                  <img
                    key={i}
                    data-who-token
                    src={t.src}
                    alt={t.alt ?? ""}
                    className="inline-icon"
                  />
                );
              }
              return (
                <span key={i} data-who-token>
                  {t.text}
                </span>
              );
            })}
          </p>

          {/* actual reveal text */}
          <p
            ref={whoObserverRef}
            className={`${titillium.className} who-text who-reveal text-[clamp(32px,5vw,84px)] leading-[1.02] font-[400] tracking-[-0.03em]`}
          >
            {whoLines
              ? whoLines.map((line, li) => (
                  <span key={li} className="who-line" style={{ ["--i" as any]: li }}>
                    {line.map((tokenIndex) => {
                      const t = whoTokens[tokenIndex];
                      if (!t) return null;
                      if (t.kind === "icon") {
                        return (
                          <img
                            key={tokenIndex}
                            src={t.src}
                            alt={t.alt ?? ""}
                            className="inline-icon"
                          />
                        );
                      }
                      return <span key={tokenIndex}>{t.text}</span>;
                    })}
                  </span>
                ))
              : // fallback: no animation until measured
                whoTokens.map((t, i) =>
                  t.kind === "icon" ? (
                    <img key={i} src={t.src} alt={t.alt ?? ""} className="inline-icon" />
                  ) : (
                    <span key={i}>{t.text}</span>
                  )
                )}
          </p>
        </div>
        <div className="mt-10 mb-6 md:mb-8 flex justify-end">
          <Link
            href="/about"
            className="inline-block border border-white/20 px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            About Us
          </Link>
        </div>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-white text-black px-6 md:px-12 py-4 md:py-4 pb-24 md:pb-32 font-apple"
      >
        <div className="max-w-7xl mx-auto">

          {/* TOP CENTER LOGO */}
          <div className="flex justify-center mb-12">
            <img
              src="/images/logo.png"
              alt="Trenta Logo"
              width={300}
              height={140}
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* LEFT */}
            <div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em] mb-12">
                Let’s Get in Touch
              </h2>

              {/* PHONE */}
              <div className="mb-8">
                <p className="text-3xl font-semibold mb-2">Phone</p>
                <p className="text-lg md:text-xl text-black/70 font-medium">
                  +6011 1153 7996
                </p>
              </div>

              {/* EMAIL */}
              <div className="mb-8">
                <p className="text-3xl font-semibold mb-2">Email</p>
                <p className="text-lg md:text-xl text-black/70 font-medium">
                  trentainformation@gmail.com
                </p>
              </div>

              {/* ADDRESS */}
              <div>
                <p className="text-3xl font-semibold mb-2">Address</p>
                <p className="text-lg md:text-xl text-black/70 font-medium leading-relaxed">
                  26 A, Jln Selayang Segar 1,
                  <br />
                  Taman Selayang Segar,
                  <br />
                  68100 Batu Caves, Selangor
                </p>
              </div>
            </div>

            {/* RIGHT MAP */}
            <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-black/10">
              <iframe
                src="https://maps.google.com/maps?q=26%20Jln%20Selayang%20Segar%201%20Batu%20Caves&z=15&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                title="Map"
              />
            </div>

          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-black text-black px-6 md:px-12 pt-8 md:pt-10 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT TEXT */}
          <div className="space-y-12">
            <div>

              <h2 className="text-4xl md:text-6xl leading-[1.05] font-medium tracking-[-0.02em]">
                <span className="block text-white">Clients come to us for what we do,</span>
                <span className="block text-white/50">but they stick with us for how we do it.</span>
              </h2>
            </div>

          </div>

          {/* RIGHT VIDEO */}
          <div className="relative">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
              <video
                src="/video/Alliance Bank.mp4"
                className="w-full h-full object-cover opacity-80"
                muted
                loop
                autoPlay
                playsInline
              />

              {/* PLAY BUTTON */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute bottom-6 left-6 bg-lime-400 text-black px-5 py-3 rounded-full text-sm font-medium hover:scale-105 transition"
              >
                ▶ Play Agency Reel
              </button>
            </div>
          </div>
        </div>
      </section>

      {videoOpen && (
        <div className="fixed inset-0 bg-black z-[100]">
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <div className="relative w-full max-w-5xl">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-10 right-0 text-white text-2xl md:text-3xl"
                aria-label="Close video"
              >
                ✕
              </button>

              {/* VIDEO */}
              <video
                src="/video/Alliance Bank.mp4"
                controls
                autoPlay
                playsInline
                className="w-full max-h-[80vh] md:max-h-[85vh] rounded-lg bg-black"
              />
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black text-white px-6 md:px-12 pt-8 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">

          {/* LEFT */}
          <div className="space-y-4">
            <p className="text-sm text-white/60">
              © 2026 Trenta. Creating events, content & experiences.
            </p>

            {/* COMPANY INFO */}
            <div className="text-xs text-white/40 leading-relaxed space-y-1">
              <p>TRENTA ENTERPRISE · Since 2015</p>
              <p>201503347216 (002496057-M)</p>
            </div>

            {/* MANAGED BY */}
            <p className="text-xs text-white/30 pt-2">
              Managed by{" "}
              <a
                href="https://magmanet.my"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/70 transition"
              >
                magmanet.my
              </a>
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex gap-6">
            <a
              href="https://www.youtube.com/@trentainformation"
              target="_blank"
              rel="noreferrer"
              className="opacity-80 hover:opacity-100 transition"
              aria-label="YouTube"
            >
              <img
                src="/images/youtube.png"
                alt="YouTube"
                className="h-10 md:h-14 w-auto object-contain"
              />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
