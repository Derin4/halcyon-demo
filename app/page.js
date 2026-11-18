import Link from "next/link";
import HeroSlides from "./_components/HeroSlides";
import Diptych from "./_components/Diptych";
import StoryList from "./_components/StoryList";
import Filmstrip from "./_components/Filmstrip";
import Reveal from "./_components/Reveal";
import Photo from "./_components/Photo";
import { packages, PRESS, testimonials } from "./_lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSlides />

      {/* Press strip (publications are fictitious) */}
      <section className='border-b border-ink2/10 bg-paper'>
        <div className='mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3'>
          {PRESS.map((p, k) => (
            <Reveal key={p.by} delay={k * 120}>
              <p className='font-display text-2xl italic leading-snug'>
                &ldquo;{p.quote}&rdquo;
              </p>
              <p className='mt-4 text-xs uppercase tracking-[0.25em] text-stone'>
                {p.by}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <Diptych />

      {/* Stories */}
      <section className='mx-auto max-w-7xl px-6 pb-28'>
        <Reveal>
          <div className='mb-12 flex items-end justify-between gap-6'>
            <h2 className='font-display text-4xl font-medium italic md:text-6xl'>
              Recent stories
            </h2>
            <Link
              href='/portfolio'
              className='text-xs uppercase tracking-[0.25em] text-ink2/70 underline-offset-8 hover:underline'
            >
              Full portfolio →
            </Link>
          </div>
        </Reveal>
        <StoryList />
      </section>

      <Filmstrip />

      {/* Packages */}
      <section className='mx-auto max-w-7xl px-6 py-28'>
        <Reveal>
          <p className='text-xs uppercase tracking-[0.35em] text-terracotta'>
            Investment
          </p>
          <h2 className='mt-4 font-display text-4xl font-medium italic md:text-6xl'>
            Three simple ways to begin
          </h2>
        </Reveal>
        <div className='mt-14 grid border-t border-ink2/15 md:grid-cols-3'>
          {packages.map((p, k) => (
            <Reveal key={p.id} delay={k * 120}>
              <Link
                href={`/booking?package=${p.id}`}
                className='group block h-full border-b border-ink2/15 p-8 transition-colors duration-500 hover:bg-ink2 hover:text-greige md:border-b-0 md:border-r md:last:border-r-0'
              >
                <span className='font-display text-7xl italic text-stone transition-colors group-hover:text-terracotta'>
                  {String(k + 1).padStart(2, "0")}
                </span>
                <h3 className='mt-8 font-display text-3xl italic'>{p.name}</h3>
                <p className='mt-1 text-sm text-stone'>{p.duration}</p>
                <p className='mt-8 text-2xl'>${p.price.toLocaleString()}</p>
                <p className='mt-6 text-xs uppercase tracking-[0.25em]'>
                  Choose this
                  <span className='ml-2 inline-block transition-transform group-hover:translate-x-2'>
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials (reviews are fictitious) */}
      <section className='bg-paper py-28'>
        <div className='mx-auto max-w-7xl px-6'>
          <Reveal>
            <h2 className='font-display text-4xl font-medium italic md:text-6xl'>
              Kind words
            </h2>
          </Reveal>
          <div className='mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2'>
            {testimonials.map((t, k) => (
              <Reveal key={t.name} delay={(k % 2) * 140}>
                <figure>
                  <span className='font-display text-6xl leading-none text-terracotta'>
                    &ldquo;
                  </span>
                  <blockquote className='-mt-2 font-display text-2xl italic leading-snug md:text-3xl'>
                    {t.quote}
                  </blockquote>
                  <figcaption className='mt-5 text-xs uppercase tracking-[0.25em] text-stone'>
                    {t.name} · {t.note}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className='relative overflow-hidden bg-ink2 text-greige'>
        <Photo
          pic='cta'
          tone={["#C97B63", "#1C1B1A"]}
          sizes='100vw'
          className='absolute inset-0 h-full w-full opacity-50'
        />
        <div className='relative mx-auto max-w-4xl px-6 py-32 text-center'>
          <Reveal>
            <h2 className='font-display text-5xl font-medium italic leading-tight md:text-7xl'>
              Tell us about your day.
            </h2>
            <Link
              href='/booking'
              className='mt-10 inline-block border border-greige/70 px-9 py-4 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-greige hover:text-ink2'
            >
              Start an inquiry
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
