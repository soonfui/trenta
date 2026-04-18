import { SiteNav } from "@/app/components/SiteNav";
import Image from "next/image";

const works = Array.from({ length: 26 }, (_, index) => `/images/pdf/${index + 1}.png`);

export default function WorksPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <SiteNav />

      <section className="h-screen flex flex-col items-center justify-center px-6 text-center border-b border-zinc-800">
        <p className="uppercase tracking-[0.3em] text-sm text-black mb-8 font-normal">
          Portfolio
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] max-w-5xl text-black tracking-tight">
          We create{" "}
          <span className="text-blue-500">experiences</span>{" "}
          people{" "}
          <span className="text-lime-500">remember</span>.
        </h1>
      </section>

      <section className="bg-black px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto space-y-24">
          {works.map((img, index) => (
            <div key={img} className="w-full">
              <Image
                src={img}
                alt={`work-${index + 1}`}
                width={1600}
                height={2200}
                className="w-full h-auto rounded-xl object-cover shadow-2xl"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

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
    </main>
  );
}
