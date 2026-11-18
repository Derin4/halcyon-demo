"use client";

import { useEffect, useRef } from "react";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { portfolio } from "../_lib/data";

const L = portfolio[0];
const R = portfolio[4];

// Two photographs that drift past each other as you scroll.
export default function Diptych() {
  const root = useRef(null);
  const a = useRef(null);
  const b = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = root.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh / 2 - (rect.top + rect.height / 2)) / vh; // -1..1ish
      const k = Math.max(-1, Math.min(1, p));
      if (a.current)
        a.current.style.transform = `translate3d(0, ${k * -70}px, 0)`;
      if (b.current)
        b.current.style.transform = `translate3d(0, ${k * 90}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} className='overflow-x-clip py-24 md:py-36'>
      <div className='mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12'>
        <div ref={a} className='will-change-transform md:col-span-4'>
          <Reveal curtain>
            <Photo
              pic={L.pic}
              tone={L.tone}
              ratio={L.ratio}
              sizes='(min-width:768px) 30vw, 80vw'
              className='w-full'
            />
          </Reveal>
          <p className='mt-3 text-xs uppercase tracking-[0.25em] text-stone'>
            {L.title}
          </p>
        </div>

        <div className='text-center md:col-span-4'>
          <Reveal>
            <p className='text-xs uppercase tracking-[0.35em] text-terracotta'>
              Our approach
            </p>
            <h2 className='mt-6 font-display text-4xl font-medium italic leading-tight md:text-5xl'>
              Quiet, honest, and edited by hand.
            </h2>
            <p className='mt-6 leading-relaxed text-ink2/75'>
              We keep the camera out of the way so the day can happen. Then we
              spend the time afterwards, one frame at a time, so every
              photograph still feels like the moment.
            </p>
          </Reveal>
        </div>

        <div ref={b} className='will-change-transform md:col-span-4 md:mt-24'>
          <Reveal curtain delay={150}>
            <Photo
              pic={R.pic}
              tone={R.tone}
              ratio='4/5'
              sizes='(min-width:768px) 30vw, 80vw'
              className='w-full'
            />
          </Reveal>
          <p className='mt-3 text-xs uppercase tracking-[0.25em] text-stone'>
            {R.title}
          </p>
        </div>
      </div>
    </section>
  );
}
