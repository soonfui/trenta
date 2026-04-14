"use client";

import { SiteNav } from "@/app/components/SiteNav";
import { StorySimple } from "@/app/components/StorySimple";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black font-sans text-white">
      <SiteNav />

      <StorySimple />

      <section className="bg-black px-6 py-24 text-white md:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:items-stretch">
          {/* LEFT CONTENT */}
          <div className="space-y-6 md:col-span-1">
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              From ideas to impact — <br /> we create what brands remember.
            </h2>

            <p className="text-[16px] leading-relaxed text-white">
              In 2015, Trenta was founded by an award-winning director with a passion for impactful
              storytelling and high-quality execution.
            </p>

            <p className="text-[16px] leading-relaxed text-white">
              At a time when content was everywhere, we believed what brands truly needed wasn&apos;t
              just production — but ideas that connect, inspire, and leave a lasting impression.
            </p>

            <p className="text-[16px] leading-relaxed text-white">
              We specialize in creative development, design, and full-scale production — supported by
              our in-house studio for photography and videography.
            </p>

            <p className="text-[16px] leading-relaxed text-white">
              Beyond content, we bring brands to life through activations, roadshows, exhibitions, and
              carpentry builds — powered by our own PA system.
            </p>

            <p className="text-[16px] leading-relaxed text-white">
              At Trenta, we don&apos;t just create — we craft experiences that move people.
            </p>

            <button
              type="button"
              className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Start a project with us
            </button>
          </div>

          {/* TIMELINE — needs column stretch so absolute line gets full row height (items-start made this ~40px tall) */}
          <div className="relative hidden md:flex md:flex-col md:items-center">

          {/* line */}
          <div className="absolute inset-y-0 left-1/2 w-[4px] -translate-x-1/2 
            bg-gradient-to-b 
            from-transparent 
            via-red-500/60 
            to-transparent" />

          {/* dot */}
          <div className="relative z-10 mt-12 flex flex-col items-center">
            <div className="mb-2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#ff2d2d]"></div>
            <span className="text-[10px] tracking-[0.2em] text-gray-500">
              2015
            </span>
          </div>

          </div>

          {/* RIGHT TEAM */}
          <div className="relative md:col-span-1">

          {/* Tommy */}
          <div className="mb-16">
          <div className="bg-lime-400 pt-5 px-5 pb-0 rounded-2xl w-[85%] ml-auto hover:scale-105 transition duration-300">
              <img
                src="images/people/Tommy.png"
                alt="Tommy"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 ml-auto w-[85%]">
              <h3 className="text-lg font-semibold">Tommy</h3>
              <p className="text-sm text-gray-400">Chief Ideation Officer</p>
            </div>
          </div>

          {/* U-Cheong */}
          <div className="ml-0">
            <div className="bg-blue-600 p-5 px-5 pb-0 rounded-2xl w-[85%] hover:scale-105 transition duration-300">
              <img
                src="images/people/Uchoengc.png"
                alt="U-Cheong"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 w-[85%]">
              <h3 className="text-lg font-semibold">U-Cheong</h3>
              <p className="text-sm text-gray-400">
                Creative Extraordinaire & Dreamer
              </p>
            </div>
          </div>

        </div>
        </div>
      </section>
    </main>
  );
}
