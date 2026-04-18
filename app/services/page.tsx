"use client";

import { SiteNav } from "@/app/components/SiteNav";
import { TrustedBy } from "@/app/components/TrustedBy";
import ServicesGrid from "@/app/components/ServicesGrid";
import SignatureSolutions from "../components/SignatureSolutions";

export default function ServicesPage() {
  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <SiteNav />

    {/* HERO */}
    <section className="pt-56 md:pt-72 pb-0 flex flex-col items-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-5">
        Services
      </p>

      <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-6">
        Trenta+
      </h1>

      <p className="max-w-3xl text-xl md:text-3xl leading-tight text-white/90">
        Full-service event production, advertising solutions, lighting systems
        and professional PA setup - all under one roof.
      </p>
    </section>

    {/* TRUSTED BY */}
    <TrustedBy className="pt-0 mt-0 pb-20 md:pb-24" />

    <ServicesGrid/>
    <SignatureSolutions/>

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
