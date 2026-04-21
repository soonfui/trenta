// components/ServicesGrid.tsx

"use client";

import { useRouter } from "next/navigation";

export default function ServicesGrid() {
  const router = useRouter();

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
      onClick={() => router.push("/works")}
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
            desc="Corporate launches, brand roadshows and live experiences."
            border="border-lime-400"
            hover="hover:bg-lime-400 hover:text-black"
          />

          {/* ADVERTISING */}
          <Card
            title="Advertising"
            desc="Creative Ideas, Brand Communication, Photo & Video Production."
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
            desc="Performance Stage, Indoor & Outdoor Sound System, Stage Lighting Design and LED screens"
            border="border-red-500"
            hover="hover:bg-red-500 hover:text-white"
          />

          {/* STATIC TEXT */}
          <div className="border border-white/15 p-8 flex items-end">
            <p className="text-2xl leading-snug text-white/90">
              Built for Attention. Made for Impact.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}