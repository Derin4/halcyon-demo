"use client";

import { useState } from "react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import { categories, portfolio } from "../_lib/data";

export default function PortfolioGallery() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);

  const items =
    cat === "All" ? portfolio : portfolio.filter((p) => p.category === cat);

  return (
    <div>
      <div
        className='flex flex-wrap gap-x-8 gap-y-3'
        role='tablist'
        aria-label='Filter by category'
      >
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type='button'
            role='tab'
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`relative pb-2 text-xs uppercase tracking-[0.25em] transition-colors ${
              cat === c ? "text-ink2" : "text-stone hover:text-ink2"
            }`}
          >
            {c}
            <span
              className={`absolute bottom-0 left-0 h-px w-full origin-left bg-terracotta transition-transform duration-500 ${
                cat === c ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div
        key={cat}
        className='mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3'
      >
        {items.map((p, k) => (
          <button
            key={p.id}
            type='button'
            onClick={() => setOpen(k)}
            aria-label={`Open ${p.title}`}
            className='fade-up group mb-6 block w-full break-inside-avoid text-left'
            style={{ "--d": `${k * 70}ms` }}
          >
            <div className='overflow-hidden'>
              <Photo
                pic={p.pic}
                tone={p.tone}
                ratio={p.ratio}
                sizes='(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'
                className='frame-hover w-full'
              />
            </div>
            <div className='mt-3 flex items-baseline justify-between gap-4'>
              <p className='font-display text-xl italic'>{p.title}</p>
              <p className='text-xs uppercase tracking-[0.22em] text-stone'>
                {p.category}
              </p>
            </div>
          </button>
        ))}
      </div>

      {open != null && (
        <Lightbox
          images={items}
          initialIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
