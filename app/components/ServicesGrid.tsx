// components/ServicesGrid.tsx

"use client";

import { useState } from "react";

export default function ServicesGrid() {
  const [open, setOpen] = useState<string | null>(null);

  const Card = ({
    title,
    desc,
    border,
    hover,
  }: {
    title: string;
    desc: string;
    border: string;
    hover: string;
  }) => (
    <button
      onClick={() => setOpen(title)}
      className={`relative text-left border ${border} p-8 h-[360px] transition duration-300 ${hover} group`}
    >
      {/* TITLE TOP */}
      <h3 className="absolute top-8 left-8 right-8 text-4xl font-medium leading-tight">
        {title}
      </h3>
  
      {/* DESCRIPTION BOTTOM */}
      <p className="absolute bottom-8 left-8 right-8 text-lg text-white/90 leading-snug">
        {desc}
      </p>
    </button>
  );
  
  return (
    <>
      <section className="bg-black text-white px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[360px]">

          {/* TEXT */}
          <div className="border border-white/15 p-8 flex items-end">
            <h2 className="text-5xl leading-[1.05] font-medium">
              One Team.
              <br />
              3 Services.
              <br />
              No Limits.
            </h2>
          </div>

          {/* EVENT */}
          <Card
            title="Event"
            desc="Corporate launches, weddings, roadshows and live experiences."
            border="border-lime-400"
            hover="hover:bg-lime-400 hover:text-black"
          />

          {/* ADVERTISING */}
          <Card
            title="Advertising"
            desc="Campaign ideas, social content, branding and promotions."
            border="border-blue-500"
            hover="hover:bg-blue-500 hover:text-white"
          />

          {/* IMAGE */}
          <div className="overflow-hidden">
            <img
              src="/images/project/ads/maybank.jpg"
              className="w-full h-full object-cover"
            />
          </div>

          {/* BIG IMAGE */}
          <div className="md:col-span-2 overflow-hidden">
            <img
              src="/images/project/toyota/3.jpg"
              className="w-full h-full object-cover"
            />
          </div>

          {/* LIGHT */}
          <Card
            title="Light & Sound"
            desc="Stage lighting, PA systems, microphones and technical crew."
            border="border-red-500"
            hover="hover:bg-red-500 hover:text-white"
          />

          {/* STATIC TEXT */}
          <div className="border border-white/15 p-8 flex items-end">
            <p className="text-2xl leading-snug text-white/90">
              Professional systems built for memorable experiences.
            </p>
          </div>

        </div>
      </section>

      {/* POPUP */}
      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black max-w-xl w-full rounded-2xl p-10"
          >
            <h3 className="text-4xl font-semibold mb-4">{open}</h3>

            <p className="text-lg text-black/70 mb-8">
              Learn more about our {open} service solutions.
            </p>

            <button
              onClick={() => setOpen(null)}
              className="px-6 py-3 rounded-full bg-black text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}