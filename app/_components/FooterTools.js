"use client";

import { useState } from "react";

export function BackToTop() {
  return (
    <button
      type='button'
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className='group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-stone transition-colors hover:text-greige'
    >
      Back to top
      <span className='inline-block transition-transform duration-300 group-hover:-translate-y-1'>
        ↑
      </span>
    </button>
  );
}

// Demo only: nothing is sent anywhere.
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!consent) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className='fade-up font-display text-2xl italic text-greige'>
        Thank you — this is a demo, so nothing was sent.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      <div className='flex border-b border-stone/60 focus-within:border-greige'>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          aria-label='Email address'
          className='w-full bg-transparent py-3 text-greige placeholder:text-stone/70 focus:outline-none'
        />
        <button
          type='submit'
          disabled={!consent}
          className='px-2 text-xs uppercase tracking-[0.22em] text-greige transition-opacity disabled:opacity-40'
        >
          Join
        </button>
      </div>
      <label className='flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-stone'>
        <input
          type='checkbox'
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className='mt-0.5 accent-terracotta'
        />
        I agree to receive the occasional studio note. Demo only; nothing is
        stored or sent.
      </label>
    </form>
  );
}
