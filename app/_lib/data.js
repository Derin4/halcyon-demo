// Fictitious data for the Halcyon Photography Studio demo.
// `tone` drives a gradient placeholder "photo". Every image slot also has a
// `pic` key: add a file for that key in _lib/pictures.js and the real
// photograph replaces the placeholder (see that file for sizes).
// `ratio` is the image's shape (width / height) so mixed portrait and
// landscape frames sit together without cropping.

export const categories = ["Weddings", "Portraits", "Events", "Products"];

export const portfolio = [
  {
    id: 1,
    category: "Weddings",
    title: "Amara & Nile",
    tone: ["#C97B63", "#1C1B1A"],
    ratio: "4/5",
    pic: "p-1",
  },
  {
    id: 2,
    category: "Weddings",
    title: "Sofia & Daniel",
    tone: ["#B8B2AA", "#1C1B1A"],
    ratio: "3/2",
    pic: "p-2",
  },
  {
    id: 3,
    category: "Weddings",
    title: "The Whitfield Wedding",
    tone: ["#1C1B1A", "#C97B63"],
    ratio: "2/3",
    pic: "p-3",
  },
  {
    id: 4,
    category: "Portraits",
    title: "Studio Session — Kalu",
    tone: ["#B8B2AA", "#F7F5F2"],
    ratio: "4/5",
    pic: "p-4",
  },
  {
    id: 5,
    category: "Portraits",
    title: "Golden Hour — Renee",
    tone: ["#C97B63", "#B8B2AA"],
    ratio: "3/2",
    pic: "p-5",
  },
  {
    id: 6,
    category: "Portraits",
    title: "Family Portrait — The Osei Family",
    tone: ["#1C1B1A", "#B8B2AA"],
    ratio: "4/3",
    pic: "p-6",
  },
  {
    id: 7,
    category: "Events",
    title: "Millbrook Gala 2026",
    tone: ["#B8B2AA", "#C97B63"],
    ratio: "3/2",
    pic: "p-7",
  },
  {
    id: 8,
    category: "Events",
    title: "Foundry Co. Product Launch",
    tone: ["#1C1B1A", "#F7F5F2"],
    ratio: "4/5",
    pic: "p-8",
  },
  {
    id: 9,
    category: "Products",
    title: "Marlow & Rue Catalog",
    tone: ["#C97B63", "#F7F5F2"],
    ratio: "1/1",
    pic: "p-9",
  },
  {
    id: 10,
    category: "Products",
    title: "Cedarbrook Ceramics",
    tone: ["#B8B2AA", "#1C1B1A"],
    ratio: "4/5",
    pic: "p-10",
  },
];

export const packages = [
  {
    id: "mini",
    name: "Mini Session",
    price: 275,
    duration: "30 min, 1 location",
    features: [
      "15 edited digital images",
      "Online gallery, 30-day access",
      "Print release included",
    ],
  },
  {
    id: "signature",
    name: "Signature Session",
    price: 550,
    duration: "90 min, up to 2 locations",
    highlighted: true,
    features: [
      "40 edited digital images",
      "Online gallery, 90-day access",
      "Print release included",
      "1 outfit change",
    ],
  },
  {
    id: "full-day",
    name: "Full Day Coverage",
    price: 2400,
    duration: "Up to 8 hours",
    features: [
      "300+ edited digital images",
      "Online gallery, 1-year access",
      "Second shooter included",
      "Engagement session included",
    ],
  },
];

export const sessionTypes = ["Wedding", "Portrait", "Event", "Product"];

// Which session type each package suggests when it is picked on /packages.
export const packageSessionType = {
  mini: "Portrait",
  signature: "Portrait",
  "full-day": "Wedding",
};

export const testimonials = [
  {
    name: "Amara O.",
    note: "Wedding, Old Mill Foundry",
    quote:
      "Every photo from our wedding looked like a moment we actually remembered, not a posed recreation of one.",
  },
  {
    name: "Foundry Co.",
    note: "Product launch and catalog",
    quote:
      "Turnaround on the product catalog was three days, fully edited, exactly to the shot list we sent over.",
  },
  {
    name: "Renee K.",
    note: "Golden hour portraits",
    quote:
      "We booked thirty minutes and walked away with the family photo we had been trying to get for ten years.",
  },
  {
    name: "Marlow & Rue",
    note: "Seasonal catalog",
    quote:
      "Our catalog finally looks the way the product feels in the hand. Quiet, warm, and exact.",
  },
];

/* ------------------------------------------------------------------ */
/* Homepage content (all fictitious)                                   */
/* ------------------------------------------------------------------ */

export const HERO_SLIDES = [
  {
    pic: "hero-1",
    tone: ["#C97B63", "#1C1B1A"],
    caption: "Amara & Nile",
    place: "The Foundry Hall",
  },
  {
    pic: "hero-2",
    tone: ["#B8B2AA", "#3a2a24"],
    caption: "Golden hour",
    place: "Renee, Harbour Row",
  },
  {
    pic: "hero-3",
    tone: ["#1C1B1A", "#B8704F"],
    caption: "Millbrook Gala",
    place: "Old Mill District",
  },
  {
    pic: "hero-4",
    tone: ["#8b8279", "#1C1B1A"],
    caption: "The Osei Family",
    place: "Cedar Hill",
  },
];

// Press quotes. The publications are fictitious.
export const PRESS = [
  {
    quote: "The most quietly confident wedding photography in the district.",
    by: "The Millbrook Courier",
  },
  {
    quote: "Pictures that feel remembered rather than staged.",
    by: "Foundry & Fern Magazine",
  },
  {
    quote: "Edited by hand, delivered in days, and worth every one.",
    by: "Old Mill Weddings Journal",
  },
];

// Stories shown in the hover list. `id` points at an item in `portfolio`.
export const STORIES = [
  {
    id: 1,
    names: "Amara & Nile",
    venue: "The Foundry Hall",
    place: "Old Mill District",
    year: "2026",
  },
  {
    id: 2,
    names: "Sofia & Daniel",
    venue: "Lakeshore Conservatory",
    place: "Harbour Row",
    year: "2026",
  },
  {
    id: 3,
    names: "The Whitfield Wedding",
    venue: "Cedar Hill Estate",
    place: "Cedar Hill",
    year: "2025",
  },
  {
    id: 6,
    names: "The Osei Family",
    venue: "Family portraits",
    place: "Cedar Hill",
    year: "2026",
  },
  {
    id: 7,
    names: "Millbrook Gala",
    venue: "The Millbrook Rooms",
    place: "Old Mill District",
    year: "2026",
  },
];

export const STEPS = [
  {
    title: "Inquire",
    body: "Tell us the date, the place and what matters most. We reply within a day.",
  },
  {
    title: "Plan",
    body: "A short call to talk through locations, light and timing, then a written quote.",
  },
  {
    title: "Shoot",
    body: "A relaxed session with direction when you want it and quiet when you don't.",
  },
  {
    title: "Gallery",
    body: "Hand-edited images in a private online gallery, usually within two weeks.",
  },
];

export const STATS = [
  { to: 212, suffix: "", label: "sessions photographed" },
  { to: 14, suffix: "", label: "day average gallery delivery" },
  { to: 100, suffix: "%", label: "of every gallery edited by hand" },
];
