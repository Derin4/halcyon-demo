"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
];

// Transparent over the home hero, solid elsewhere. Slides away when you
// scroll down and returns when you scroll up.
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > lastY.current + 6 && y > 240) setHidden(true);
      else if (y < lastY.current - 6 || y < 240) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const clear = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-[4.75rem] transition-[transform,background-color,color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          open
            ? "border-b border-transparent bg-ink2 text-greige"
            : clear
              ? "border-b border-transparent text-greige"
              : "border-b border-stone/40 bg-greige/95 text-ink2 backdrop-blur"
        }`}
      >
        <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-6'>
          <Link
            href='/'
            onClick={() => setOpen(false)}
            className='font-display text-3xl italic font-medium tracking-tight'
          >
            Halcyon
          </Link>

          <nav className='hidden items-center gap-10 text-[13px] uppercase tracking-[0.22em] sm:flex'>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative py-1 ${
                  pathname === l.href ? "" : "opacity-80 hover:opacity-100"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ${
                    pathname === l.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <Link
              href='/booking'
              className={`border px-5 py-2.5 transition-colors duration-300 ${
                clear
                  ? "border-greige/70 hover:bg-greige hover:text-ink2"
                  : "border-ink2 hover:bg-ink2 hover:text-greige"
              }`}
            >
              Book a Session
            </Link>
          </nav>

          <button
            type='button'
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className='relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-[7px] sm:hidden'
          >
            <span
              className={`h-px w-7 bg-current transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px bg-current transition-all duration-300 ${
                open ? "w-7 -translate-y-[4px] -rotate-45" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-30 flex flex-col justify-center bg-ink2 px-8 text-greige transition-opacity duration-500 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className='flex flex-col gap-5'>
          {[...LINKS, { href: "/booking", label: "Book a Session" }].map(
            (l, i) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                className={`font-display text-5xl italic transition-all duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <p className='mt-14 text-xs uppercase tracking-[0.25em] text-stone'>
          Halcyon Photography Studio · Demo site
        </p>
      </div>
    </>
  );
}
