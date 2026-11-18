"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import { HERO_SLIDES } from "../_lib/data";

const AUTO_MS = 6500;

export default function HeroSlides() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tabOn, setTabOn] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [hover, setHover] = useState(false);
  const root = useRef(null);
  const n = HERO_SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    const raf = requestAnimationFrame(sync);
    mq.addEventListener("change", sync);
    const onVis = () => setTabOn(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.25,
    });
    if (root.current) io.observe(root.current);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  const playing = visible && tabOn && !reduced && !hover;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), AUTO_MS);
    return () => clearTimeout(t);
  }, [playing, i, n]);

  const go = useCallback((k) => setI((k + n) % n), [n]);
  const slide = HERO_SLIDES[i];

  return (
    <section
      ref={root}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-roledescription='carousel'
      aria-label='Featured photographs'
      className='relative -mt-[4.75rem] h-[100svh] min-h-[560px] overflow-hidden bg-ink2 text-greige'
    >
      {HERO_SLIDES.map((s, k) => (
        <div
          key={s.pic}
          className='slide absolute inset-0'
          data-active={k === i}
          aria-hidden={k !== i}
        >
          <Photo
            pic={s.pic}
            tone={s.tone}
            priority={k === 0}
            sizes='100vw'
            className='h-full w-full'
            imgClassName='slide-img'
          />
        </div>
      ))}

      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-ink2/85 via-ink2/15 to-ink2/45' />

      <div className='absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-14 md:pb-16'>
        <p
          className='fade-up text-xs uppercase tracking-[0.35em] text-greige/80'
          style={{ "--d": "200ms" }}
        >
          Weddings &mdash; Portraits &mdash; Events &mdash; Products
        </p>
        <h1
          className='fade-up mt-5 max-w-4xl font-display text-5xl font-medium italic leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]'
          style={{ "--d": "350ms" }}
        >
          Photographs you&rsquo;ll still want to look at in twenty years.
        </h1>

        <div
          className='fade-up mt-10 flex flex-wrap items-end justify-between gap-8'
          style={{ "--d": "550ms" }}
        >
          <Link
            href='/booking'
            className='border border-greige/70 px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-greige hover:text-ink2'
          >
            Book a session
          </Link>

          <div className='flex items-center gap-6'>
            <p
              key={i}
              className='num-in hidden text-right text-xs uppercase tracking-[0.2em] text-greige/80 sm:block'
              aria-live='polite'
            >
              {slide.caption}
              <span className='block text-stone'>{slide.place}</span>
            </p>
            <div className='flex items-center gap-4'>
              <button
                type='button'
                onClick={() => go(i - 1)}
                aria-label='Previous photograph'
                className='h-10 w-10 border border-greige/40 transition-colors hover:bg-greige hover:text-ink2'
              >
                ←
              </button>
              <span className='min-w-16 whitespace-nowrap text-center font-display text-lg italic'>
                {String(i + 1).padStart(2, "0")}
                <span className='text-stone'>
                  {" "}
                  / {String(n).padStart(2, "0")}
                </span>
              </span>
              <button
                type='button'
                onClick={() => go(i + 1)}
                aria-label='Next photograph'
                className='h-10 w-10 border border-greige/40 transition-colors hover:bg-greige hover:text-ink2'
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          className='mt-8 flex gap-2'
          role='tablist'
          aria-label='Choose photograph'
        >
          {HERO_SLIDES.map((s, k) => (
            <button
              key={s.pic}
              type='button'
              role='tab'
              aria-selected={k === i}
              aria-label={`Show ${s.caption}`}
              onClick={() => go(k)}
              className='h-5 flex-1 py-2'
            >
              <span className='relative block h-px w-full bg-greige/30'>
                {k === i && (
                  <span
                    key={`${i}-${playing}`}
                    className='absolute inset-y-0 left-0 block h-px bg-greige'
                    style={{
                      width: playing ? "100%" : reduced ? "100%" : "0%",
                      transition: playing
                        ? `width ${AUTO_MS}ms linear`
                        : "none",
                      animation: playing
                        ? `bar-grow ${AUTO_MS}ms linear both`
                        : "none",
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes bar-grow{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}
