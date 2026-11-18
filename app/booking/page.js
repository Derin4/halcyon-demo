import { Suspense } from "react";
import BookingFormFromUrl from "../_components/BookingFormFromUrl";
import Photo from "../_components/Photo";

export const metadata = {
  title: "Book a Session — Halcyon Photography Studio",
  description: "Send an inquiry to a fictitious demo photography studio.",
};

export default function BookingPage() {
  return (
    <div className='mx-auto grid w-full max-w-7xl gap-16 px-6 pb-28 pt-16 md:grid-cols-12 md:pt-24'>
      <div className='md:col-span-5'>
        <p className='fade-up text-xs uppercase tracking-[0.35em] text-terracotta'>
          Inquiries
        </p>
        <h1
          className='fade-up mt-4 font-display text-5xl font-medium italic md:text-7xl'
          style={{ "--d": "100ms" }}
        >
          Book a Session
        </h1>
        <p
          className='fade-up mt-6 max-w-md leading-relaxed text-ink2/70'
          style={{ "--d": "200ms" }}
        >
          This sends an inquiry, not a locked booking. We reply within a working
          day to confirm availability and talk through the details.
        </p>
        <Photo
          tone={["#B8B2AA", "#1C1B1A"]}
          pic='about'
          ratio='4/5'
          sizes='(min-width:768px) 30vw, 80vw'
          className='fade-up mt-12 hidden w-3/4 md:block'
        />
      </div>
      <div className='md:col-span-7 md:pt-4'>
        <Suspense fallback={null}>
          <BookingFormFromUrl />
        </Suspense>
      </div>
    </div>
  );
}
