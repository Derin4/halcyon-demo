"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import { portfolio } from "../_lib/data";

const FRAMES = portfolio.slice(0, 8);
const AUTO_MS = 4200;

// A row of frames that glides along by itself. Hover, touch or drag pauses it;
// arrows and swipe still work. Clicking a frame opens the lightbox.
export default function Filmstrip() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [open, setOpen] = useState(null);
  const [visible, setVisible] = useState(true);
  const [tabOn, setTabOn] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    const raf = requestAnimationFrame(sync);
    mq.addEventListener("change", sync);
    const onVis = () => setTabOn(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.3,
    });
    if (root.current) io.observe(root.current);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  // Progress line follows the scroll position (written straight to the DOM).
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const onScroll = () => {
      const max = t.scrollWidth - t.clientWidth;
      if (bar.current)
        bar.current.style.transform = `scaleX(${max > 0 ? t.scrollLeft / max : 0})`;
    };
    onScroll();
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, []);

  const step = useCallback((dir) => {
    const t = track.current;
    if (!t) return;
    const items = [...t.children];
    const max = t.scrollWidth - t.clientWidth;
    const cur = t.scrollLeft;
    let left;
    if (dir > 0) {
      if (cur >= max - 4) left = 0;
      else {
        const nxt = items.find(
          (el) => el.offsetLeft - items[0].offsetLeft > cur + 8,
        );
        left = nxt ? nxt.offsetLeft - items[0].offsetLeft : max;
      }
    } else {
      const prv = [...items]
        .reverse()
        .find((el) => el.offsetLeft - items[0].offsetLeft < cur - 8);
      left = cur <= 4 ? max : prv ? prv.offsetLeft - items[0].offsetLeft : 0;
    }
    t.scrollTo({ left: Math.min(left, max), behavior: "smooth" });
  }, []);

  const playing =
    visible && tabOn && !reduced && !hover && !touched && open == null;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => step(1), AUTO_MS);
    return () => clearInterval(id);
  }, [playing, step]);

  // After a touch, resume autoplay a few seconds later.
  useEffect(() => {
    if (!touched) return;
    const id = setTimeout(() => setTouched(false), 6000);
    return () => clearTimeout(id);
  }, [touched]);

  return (
    <section
      ref={root}
      aria-label='Selected photographs'
      aria-roledescription='carousel'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className='relative bg-ink2 py-20 text-greige'
    >
      <div className='mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-6'>
        <h2 className='font-display text-4xl font-medium italic md:text-6xl'>
          Recent frames
        </h2>
        <div className='flex items-center gap-5'>
          <button
            type='button'
            onClick={() => step(-1)}
            aria-label='Previous frame'
            className='h-10 w-10 border border-greige/40 transition-colors hover:bg-greige hover:text-ink2'
          >
            ←
          </button>
          <button
            type='button'
            onClick={() => step(1)}
            className='group text-xs uppercase tracking-[0.25em] text-stone transition-colors hover:text-greige'
          >
            Keep scrolling
            <span className='ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1'>
              →
            </span>
          </button>
        </div>
      </div>

      <div
        ref={track}
        onTouchStart={() => setTouched(true)}
        onPointerDown={(e) => e.pointerType !== "mouse" && setTouched(true)}
        className='no-scrollbar flex snap-x snap-mandatory scroll-pl-6 items-start gap-6 overflow-x-auto px-6 md:gap-10'
      >
        {FRAMES.map((f, k) => {
          const [w, h] = f.ratio.split("/").map(Number);
          return (
            <button
              key={f.id}
              type='button'
              onClick={() => setOpen(k)}
              aria-label={`Open ${f.title}`}
              className='group block shrink-0 snap-start text-left'
            >
              <div
                className='overflow-hidden'
                style={{
                  height: "min(52vh, 440px)",
                  aspectRatio: `${w} / ${h}`,
                }}
              >
                <Photo
                  pic={f.pic}
                  tone={f.tone}
                  sizes={w < h ? "30vw" : "45vw"}
                  className='frame-hover h-full w-full'
                />
              </div>
              <p className='mt-3 text-xs uppercase tracking-[0.22em] text-stone transition-colors group-hover:text-greige'>
                {String(k + 1).padStart(2, "0")} &nbsp; {f.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className='mx-auto mt-10 max-w-7xl px-6'>
        <div className='h-px bg-greige/20'>
          <div
            ref={bar}
            className='h-px origin-left bg-terracotta'
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {open != null && (
        <Lightbox
          images={FRAMES}
          initialIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
