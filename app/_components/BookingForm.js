"use client";

import { useState } from "react";
import { packages, packageSessionType, sessionTypes } from "../_lib/data";

const field =
  "w-full border-0 border-b border-ink2/25 bg-transparent py-3 text-ink2 placeholder:text-stone focus:border-terracotta focus:outline-none transition-colors";
const label = "block text-xs uppercase tracking-[0.25em] text-ink2/60";

export default function BookingForm({ initialPackage = "" }) {
  const startPkg = packages.some((p) => p.id === initialPackage)
    ? initialPackage
    : "";
  const [type, setType] = useState(packageSessionType[startPkg] || "Wedding");
  const [pkg, setPkg] = useState(startPkg);
  const [code, setCode] = useState(null);
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName(String(data.get("name") || ""));
    setCode(`HC-${Math.floor(1000 + Math.random() * 9000)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (code) {
    return (
      <div className='fade-up mx-auto max-w-xl border border-ink2/20 bg-paper'>
        <div className='p-10 text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-terracotta'>
            Inquiry received
          </p>
          <h2 className='mt-4 font-display text-4xl italic font-medium'>
            Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
          </h2>
          <p className='mt-4 text-ink2/70'>
            We would reply within one working day with availability. This is a
            demo: nothing was sent and nothing is booked.
          </p>
        </div>
        <div className='relative border-t border-dashed border-ink2/30 p-8 text-center'>
          <span className='absolute -left-3 -top-3 h-6 w-6 rounded-full bg-greige' />
          <span className='absolute -right-3 -top-3 h-6 w-6 rounded-full bg-greige' />
          <p className='text-xs uppercase tracking-[0.3em] text-stone'>
            Reference
          </p>
          <p className='mt-2 font-display text-4xl italic'>{code}</p>
          <p className='mt-2 text-sm text-ink2/60'>
            {type}
            {pkg ? ` · ${packages.find((p) => p.id === pkg)?.name}` : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className='space-y-10'>
      <fieldset>
        <legend className={label}>Type of session</legend>
        <div className='mt-4 flex flex-wrap gap-3'>
          {sessionTypes.map((t) => (
            <button
              key={t}
              type='button'
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={`border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                type === t
                  ? "border-ink2 bg-ink2 text-greige"
                  : "border-ink2/25 hover:border-ink2"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className='grid gap-10 sm:grid-cols-2'>
        <div>
          <label htmlFor='package' className={label}>
            Package
          </label>
          <select
            id='package'
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
            className={field}
          >
            <option value=''>Not sure yet</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ${p.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='date' className={label}>
            Preferred date
          </label>
          <input id='date' name='date' type='date' className={field} />
        </div>
        <div>
          <label htmlFor='name' className={label}>
            Name
          </label>
          <input
            id='name'
            name='name'
            required
            className={field}
            placeholder='Your full name'
          />
        </div>
        <div>
          <label htmlFor='email' className={label}>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className={field}
            placeholder='you@example.com'
          />
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor='phone' className={label}>
            Phone (optional)
          </label>
          <input
            id='phone'
            name='phone'
            type='tel'
            className={field}
            placeholder='(000) 000-0000'
          />
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor='notes' className={label}>
            Tell us about it
          </label>
          <textarea
            id='notes'
            name='notes'
            rows={4}
            className={`${field} resize-none`}
            placeholder='Place, people, mood, anything that matters.'
          />
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-6'>
        <button
          type='submit'
          className='group border border-ink2 bg-ink2 px-9 py-4 text-xs uppercase tracking-[0.25em] text-greige transition-colors hover:bg-terracotta hover:border-terracotta'
        >
          Send inquiry
          <span className='ml-3 inline-block transition-transform group-hover:translate-x-1'>
            →
          </span>
        </button>
        <p className='text-xs text-stone'>
          Demo form: nothing is sent or stored.
        </p>
      </div>
    </form>
  );
}
