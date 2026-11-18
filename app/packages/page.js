import Link from "next/link";
import Reveal from "../_components/Reveal";
import { packages, STEPS } from "../_lib/data";

export const metadata = {
  title: "Packages — Halcyon Photography Studio",
  description: "Session packages and pricing for a fictitious demo studio.",
};

export default function PackagesPage() {
  return (
    <div className='mx-auto w-full max-w-7xl px-6 pb-28 pt-16 md:pt-24'>
      <p className='fade-up text-xs uppercase tracking-[0.35em] text-terracotta'>
        Investment
      </p>
      <h1
        className='fade-up mt-4 font-display text-5xl font-medium italic md:text-7xl'
        style={{ "--d": "100ms" }}
      >
        Packages
      </h1>

      <div className='mt-16 grid gap-6 md:grid-cols-3'>
        {packages.map((p, k) => (
          <Reveal key={p.id} delay={k * 120}>
            <article
              className={`group flex h-full flex-col p-8 transition-all duration-500 hover:-translate-y-2 ${
                p.highlighted
                  ? "bg-terracotta text-greige"
                  : "border border-ink2/20 hover:border-ink2"
              }`}
            >
              {p.highlighted && (
                <p className='mb-4 text-xs uppercase tracking-[0.3em]'>
                  Most booked
                </p>
              )}
              <h2 className='font-display text-3xl italic'>{p.name}</h2>
              <p
                className={`mt-1 text-sm ${p.highlighted ? "text-greige/80" : "text-stone"}`}
              >
                {p.duration}
              </p>
              <p className='mt-8 font-display text-5xl'>
                ${p.price.toLocaleString()}
              </p>
              <ul className='mt-8 flex-1 space-y-3 text-sm'>
                {p.features.map((f) => (
                  <li key={f} className='flex gap-3'>
                    <span aria-hidden='true'>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/booking?package=${p.id}`}
                className={`mt-10 block border px-6 py-3.5 text-center text-xs uppercase tracking-[0.25em] transition-colors ${
                  p.highlighted
                    ? "border-greige hover:bg-greige hover:text-ink2"
                    : "border-ink2 hover:bg-ink2 hover:text-greige"
                }`}
              >
                Book this
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      {/* How it works */}
      <section className='mt-28'>
        <Reveal>
          <h2 className='font-display text-4xl font-medium italic md:text-5xl'>
            How it works
          </h2>
        </Reveal>
        <Reveal className='mt-14'>
          <div className='hidden h-px bg-ink2/10 md:block'>
            <div className='draw-line h-px bg-terracotta' />
          </div>
        </Reveal>
        <div className='mt-8 grid gap-10 md:grid-cols-4'>
          {STEPS.map((s, k) => (
            <Reveal key={s.title} delay={k * 140}>
              <p className='font-display text-5xl italic text-stone'>
                {String(k + 1).padStart(2, "0")}
              </p>
              <h3 className='mt-3 font-display text-2xl italic'>{s.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-ink2/70'>
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
