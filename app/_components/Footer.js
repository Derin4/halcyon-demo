import Link from "next/link";
import { BackToTop, NewsletterForm } from "./FooterTools";

export default function Footer() {
  return (
    <footer className='overflow-hidden bg-ink2 text-greige'>
      <div className='mx-auto max-w-7xl px-6 pt-20'>
        <div className='grid gap-14 md:grid-cols-12'>
          <div className='md:col-span-5'>
            <p className='font-display text-3xl italic leading-snug md:text-4xl'>
              Let&rsquo;s make the pictures you&rsquo;ll still love in twenty
              years.
            </p>
            <Link
              href='/booking'
              className='mt-8 inline-block border border-greige/60 px-6 py-3 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-greige hover:text-ink2'
            >
              Book a session
            </Link>
          </div>

          <div className='md:col-span-3 md:col-start-7'>
            <h3 className='text-xs uppercase tracking-[0.25em] text-stone'>
              Studio
            </h3>
            <p className='mt-4 leading-relaxed text-greige/90'>
              36 Foundry Lane, Studio 2
              <br />
              Old Mill District
              <br />
              By appointment
            </p>
            <ul className='mt-6 space-y-2 text-greige/90'>
              <li>
                <Link href='/portfolio' className='hover:text-terracotta'>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href='/packages' className='hover:text-terracotta'>
                  Packages
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:text-terracotta'>
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-3'>
            <h3 className='text-xs uppercase tracking-[0.25em] text-stone'>
              Studio notes
            </h3>
            <div className='mt-4'>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <p
          aria-hidden='true'
          className='mt-20 select-none whitespace-nowrap text-center font-display text-[26vw] italic font-medium leading-[0.8] tracking-tight text-greige/[0.07] md:text-[19vw]'
        >
          Halcyon
        </p>

        <div className='flex flex-col gap-4 border-t border-greige/15 py-8 text-xs text-stone md:flex-row md:items-center md:justify-between'>
          <p className='max-w-2xl leading-relaxed'>
            Halcyon Photography Studio is a fictitious business created as a
            demonstration website. The people, places, prices and reviews are
            invented, and no bookings are taken.
          </p>
          <div className='flex items-center gap-8'>
            <span>© Halcyon Photography Studio — demo site</span>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
