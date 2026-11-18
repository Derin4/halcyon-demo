import Photo from "../_components/Photo";
import Reveal from "../_components/Reveal";
import CountUp from "../_components/CountUp";
import { STATS } from "../_lib/data";

export const metadata = {
  title: "About — Halcyon Photography Studio",
  description: "The story of a fictitious demo photography studio.",
};

const POINTS = [
  [
    "Be present",
    "We arrive early, stay quiet, and let the day move at its own pace.",
  ],
  [
    "Edit by hand",
    "Every frame is graded individually. No presets applied in bulk.",
  ],
  [
    "Deliver on time",
    "Galleries arrive in about two weeks, sooner for products and events.",
  ],
];

export default function AboutPage() {
  return (
    <div className='mx-auto w-full max-w-7xl px-6 pb-28 pt-16 md:pt-24'>
      <div className='grid items-start gap-14 md:grid-cols-12'>
        <div className='md:col-span-5'>
          <Reveal curtain>
            <Photo
              pic='about'
              tone={["#B8B2AA", "#C97B63"]}
              ratio='4/5'
              sizes='(min-width:768px) 40vw, 90vw'
              className='w-full'
            />
          </Reveal>
        </div>
        <div className='md:col-span-6 md:col-start-7 md:pt-10'>
          <p className='fade-up text-xs uppercase tracking-[0.35em] text-terracotta'>
            About the studio
          </p>
          <h1
            className='fade-up mt-4 font-display text-5xl font-medium italic leading-tight md:text-6xl'
            style={{ "--d": "100ms" }}
          >
            Started with weddings, stayed for the people.
          </h1>
          <div className='mt-8 space-y-5 leading-relaxed text-ink2/75'>
            <Reveal>
              <p>
                Halcyon started as a wedding-only studio. Over time, the same
                approach, patient, quiet and attentive, turned out to suit
                portraits, events and product work just as well.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Every gallery is hand-edited, one photograph at a time. It takes
                longer, and it is the reason the pictures look the way they do.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                We work from the Old Mill District and travel for weddings.
                Halcyon is a fictitious studio created for this demonstration.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <section className='mt-28 grid gap-10 border-y border-ink2/15 py-14 text-center md:grid-cols-3'>
        {STATS.map((s) => (
          <div key={s.label}>
            <p className='font-display text-7xl italic'>
              <CountUp to={s.to} suffix={s.suffix} />
            </p>
            <p className='mt-2 text-xs uppercase tracking-[0.25em] text-stone'>
              {s.label}
            </p>
          </div>
        ))}
      </section>

      <section className='mt-24 grid gap-12 md:grid-cols-3'>
        {POINTS.map(([t, b], k) => (
          <Reveal key={t} delay={k * 140}>
            <h2 className='font-display text-3xl italic'>{t}</h2>
            <p className='mt-3 leading-relaxed text-ink2/70'>{b}</p>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
