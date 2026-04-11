"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export function SiteNav() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const logoSize = isMobile
    ? scrollY < 20
      ? "text-[64px]"
      : scrollY < 60
        ? "text-[40px]"
        : "text-[0px]"
    : scrollY < 50
      ? "text-[120px]"
      : scrollY < 150
        ? "text-[60px]"
        : "text-[0px]";

  const hideNav = isMobile ? scrollY > 60 : scrollY > 150;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div
          className={clsx(
            "max-w-7xl mx-auto relative flex items-start justify-end px-6 md:px-12 py-6 transition-all duration-500",
            hideNav ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={clsx(
              "absolute left-6 md:left-12 top-6 font-bold tracking-tight transition-all duration-500 leading-none z-0 text-inherit hover:opacity-80",
              logoSize
            )}
            aria-label="Trenta — home"
          >
            trenta.
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[14px] relative z-10">
            <Link href="/about">About</Link>
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

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <div className="space-y-1">
              <div className="w-6 h-[2px] bg-white" />
              <div className="w-6 h-[2px] bg-white" />
            </div>
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-[55] flex flex-col items-center justify-center gap-8 text-xl">
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <a onClick={() => setMenuOpen(false)}>Advertising</a>
          <a onClick={() => setMenuOpen(false)}>Event</a>

          <a
            href="https://wa.me/601123280082"
            target="_blank"
            className="border px-6 py-3 rounded-full"
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}
