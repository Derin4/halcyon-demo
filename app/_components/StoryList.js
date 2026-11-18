"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import { portfolio, STORIES } from "../_lib/data";

// Hover a row on desktop and its photograph follows the cursor.
export default function StoryList() {
  const [active, setActive] = useState(null);
  const [fine, setFine] = useState(false);
  const preview = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    const r = requestAnimationFrame(sync);
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(r);
      mq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!fine) return;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (preview.current) {
        preview.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [fine]);

  const onMove = (e) => {
    target.current = { x: e.clientX + 36, y: e.clientY - 150 };
  };

  const shown = STORIES.find((s) => s.id === active);
  const item = shown && portfolio.find((p) => p.id === shown.id);

  return (
    <div onMouseMove={fine ? onMove : undefined}>
      <ul className='border-t border-ink2/15'>
        {STORIES.map((s, k) => (
          <li key={s.id} className='border-b border-ink2/15'>
            <Link
              href='/portfolio'
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(s.id)}
              onBlur={() => setActive(null)}
              className='group grid grid-cols-12 items-baseline gap-4 py-7 transition-all duration-500 hover:pl-4 md:py-9'
            >
              <span className='col-span-2 text-xs uppercase tracking-[0.25em] text-stone md:col-span-1'>
                {String(k + 1).padStart(2, "0")}
              </span>
              <span className='col-span-10 font-display text-3xl italic font-medium leading-tight transition-colors group-hover:text-terracotta md:col-span-6 md:text-5xl'>
                {s.names}
              </span>
              <span className='col-span-10 col-start-3 text-sm text-ink2/70 md:col-span-3 md:col-start-auto'>
                {s.venue}
                <span className='block text-xs uppercase tracking-[0.2em] text-stone'>
                  {s.place}
                </span>
              </span>
              <span className='hidden text-right text-sm text-stone md:col-span-2 md:block'>
                {s.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fine && (
        <div
          ref={preview}
          aria-hidden='true'
          className='pointer-events-none fixed left-0 top-0 z-30 w-56'
          style={{
            opacity: item ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          {item && (
            <Photo
              key={item.id}
              pic={item.pic}
              tone={item.tone}
              ratio={item.ratio}
              sizes='224px'
              className='w-full shadow-2xl'
            />
          )}
        </div>
      )}
    </div>
  );
}
