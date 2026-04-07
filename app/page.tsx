"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState("Events");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filters = ["Events", "Advertising", "PA System"];
  type Variant = "dark" | "light" | "highlight";
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
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
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
        { title: "TOYOTA", desc: "Mall Activation", image: "/images/toyota.png" },
        { quote: "Massive engagement within hours.", author: "Retail Brand" },
        { title: "All Services", desc: "See how we support your brand →" },
        { title: "Let’s build your next campaign →", image: "/images/event.png" },
        { title: "EXTRA 1" ,image: "/images/event1.png"},
      ],

      Advertising: [
        { title: "FOOD & LIFESTYLE", desc: "Content Campaigns",image: "/images/ads2.png" },
        { title: "SOCIAL VIDEO", desc: "TikTok · IG · 小紅書" },
        { quote: "Boosted reach across platforms.", author: "F&B Brand" },
        { title: "All Services", desc: "See how we support your brand →",image: "/images/ads3.png" },
        { title: "Let’s build your next campaign →",image: "/images/ads4.png" },
      ],

      "PA System": [
        { title: "LIVE SOUND", desc: "Event Audio System" ,image: "/images/paevent.png" },
        { title: "STAGE SETUP", desc: "Full Technical Support" },
        { quote: "Crystal clear sound.", author: "Organizer"},
        { title: "All Services", desc: "See how we support your brand →",image: "/images/pa.png" },
        { title: "Let’s build your next campaign →",image: "/images/pa1.png" },
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
      return (
        <div className="flex flex-col justify-between h-full">
          <p className="text-lg leading-relaxed">{item.quote}</p>
          <p className="text-sm mt-6 opacity-70">{item.author}</p>
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
      {/* NAV */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div
          className={clsx(
            "max-w-7xl mx-auto relative flex items-start justify-end px-6 md:px-12 py-6 transition-all duration-500",
            scrollY > 150 ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div
            className={clsx(
              "absolute left-6 md:left-12 top-6 font-bold tracking-tight transition-all duration-500 leading-none",
              scrollY < 50
                ? "text-[120px]"
                : scrollY < 150
                ? "text-[60px]"
                : "text-[0px]"
            )}
          >
            trenta.
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[14px]">
            <a href="#">About</a>
            <a href="#">Advertising</a>
            <a href="#">Event</a>
            <a
              href="https://wa.me/601123280082"
              target="_blank"
              className="bg-white text-black px-5 py-2 rounded-full"
            >
              Contact
            </a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <div className="space-y-1">
              <div className="w-6 h-[2px] bg-white" />
              <div className="w-6 h-[2px] bg-white" />
            </div>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-40 md:pt-60 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl leading-tight font-medium">
              We create{" "}
              <span className="text-lime-400">events</span>,{" "}
              <span className="text-blue-500">content</span>, &{" "}
              <span className="text-pink-300">experiences</span> that bring your brand to life.
            </h1>
          </div>

          <div className="max-w-sm text-gray-400">
            <p>
              From mall activations to social campaigns and sound systems — we help brands show up and stand out.
            </p>
            <a
              href="https://wa.me/601123280082"
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
    <BaseCard variant="light" className="h-[320px] items-start" image={current[1]?.image}>
      {render(current[1])}
    </BaseCard>

    {/* 3️⃣ 左下（All Services） */}
    <BaseCard variant="light" className="h-[200px] items-start" image={current[2]?.image}>
      {render(current[2])}
    </BaseCard>

    {/* 4️⃣ 中間（CTA） */}
    <BaseCard className="h-[200px] items-center" image={current[3]?.image} >
      {render(current[3])}
    </BaseCard>

    {/* 5️⃣ 右下（EXTRA 🔥） */}
    <BaseCard variant="highlight" className="h-[200px]" image={current[4]?.image}>
      {render(current[4])}
    </BaseCard>

  </div>
)}

</section>

      <div className="h-[200vh]" />
    </div>
  );
}