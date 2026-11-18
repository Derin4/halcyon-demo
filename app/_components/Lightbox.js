"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo, { ratioToNumber } from "./Photo";

export default function Lightbox({ images, initialIndex = 0, onClose }) {
  const [i, setI] = useState(initialIndex);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const n = images.length;

  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, next, prev]);

  const img = images[i];
  const r = ratioToNumber(img.ratio);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={`${img.title}, photograph ${i + 1} of ${n}`}
      className='fixed inset-0 z-[60] flex flex-col bg-ink2/97 text-greige backdrop-blur-sm'
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className='flex items-center justify-between px-6 py-5'>
        <p className='font-display text-lg italic'>
          {img.title}
          {img.category && (
            <span className='ml-4 font-body text-xs not-italic uppercase tracking-[0.25em] text-stone'>
              {img.category}
            </span>
          )}
        </p>
        <button
          ref={closeRef}
          type='button'
          onClick={onClose}
          className='text-xs uppercase tracking-[0.25em] hover:text-terracotta'
        >
          Close ✕
        </button>
      </div>

      <div className='relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20'>
        <button
          type='button'
          onClick={prev}
          aria-label='Previous photograph'
          className='absolute left-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 border border-greige/30 bg-ink2/40 hover:bg-greige hover:text-ink2 sm:left-6'
        >
          ←
        </button>

        <div
          key={img.id ?? i}
          className='lb-img w-full'
          style={{
            maxWidth: `min(100%, calc(72vh * ${r}))`,
          }}
        >
          <Photo
            pic={img.pic}
            tone={img.tone}
            ratio={img.ratio}
            sizes='90vw'
            priority
            className='w-full'
          />
        </div>

        <button
          type='button'
          onClick={next}
          aria-label='Next photograph'
          className='absolute right-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 border border-greige/30 bg-ink2/40 hover:bg-greige hover:text-ink2 sm:right-6'
        >
          →
        </button>
      </div>

      <div className='flex items-center justify-between gap-6 px-6 py-5'>
        <p className='font-display text-lg italic'>
          {String(i + 1).padStart(2, "0")}
          <span className='text-stone'> / {String(n).padStart(2, "0")}</span>
        </p>
        <div className='no-scrollbar flex max-w-[70vw] gap-2 overflow-x-auto'>
          {images.map((t, k) => (
            <button
              key={t.id ?? k}
              type='button'
              onClick={() => setI(k)}
              aria-label={`Show ${t.title}`}
              aria-current={k === i}
              className={`h-12 w-10 shrink-0 overflow-hidden transition-opacity ${
                k === i
                  ? "opacity-100 ring-1 ring-greige"
                  : "opacity-40 hover:opacity-80"
              }`}
            >
              <Photo
                pic={t.pic}
                tone={t.tone}
                sizes='60px'
                className='h-full w-full'
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
