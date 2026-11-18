# Halcyon Photography Studio

A demo website for a fictional photography studio, built by [MyClickAid](https://myclickaid.com) for its portfolio gallery.

**Live demo:** https://halcyon-demo.derin-obasa.workers.dev/

> **A fictional studio.** Halcyon Photography Studio, its clients, press quotes, reviews and prices are made up for this demo. No form sends any data.

## What it shows

- **Full-screen hero slideshow:** four captioned slides.
- **Home page:** a press strip, a diptych feature, a hover list of recent stories, a filmstrip, three session packages and testimonials.
- **Portfolio:** a gallery filtered by category (weddings, portraits, events, products) with a lightbox. Images of mixed shapes sit together without cropping.
- **Packages:** three session packages with prices. Choosing one opens the booking form with that package selected.
- **Booking:** an inquiry form that reads the chosen package and session type from the link, with a demo confirmation.
- **About:** the studio and how it works.
- **Details:** animated counters, scroll animations, a footer toolbar and keyboard-friendly menus.

## Built with

- [Next.js](https://nextjs.org/) (App Router, JavaScript, static export)
- [Tailwind CSS](https://tailwindcss.com/) v4
- Fonts: Bodoni Moda and Jost, loaded with `next/font/google`
- Hosted on Cloudflare

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To create the production build (a static site in the `out` folder):

```bash
npm run build
```

## Project structure

```
app/
  _components/   Header, Footer, HeroSlides, Diptych, StoryList, Filmstrip, PortfolioGallery, Lightbox, BookingForm, ...
  _lib/          data.js, pictures.js, helpers
  _styles/       globals.css
  portfolio/  packages/  booking/  about/
public/          Photos (.webp)
```

## Photos

Photos are optional. Every slot works as a coloured placeholder until you add an image. Put the files in `public/` and register them in `app/_lib/pictures.js`.

| Slot           | File                                 | Size                                           |
| -------------- | ------------------------------------ | ---------------------------------------------- |
| Hero slideshow | `hw-hero-1.webp` to `hw-hero-4.webp` | 2400 × 1500, landscape                         |
| Portfolio      | `hw-p1.webp` to `hw-p10.webp`        | Shape follows each item's `ratio` in `data.js` |
| About          | `hw-about.webp`                      | 1100 × 1400, portrait                          |
| Closing banner | `hw-cta.webp`                        | 2400 × 1400, landscape                         |

## Deployment

The site is a static export (`output: "export"` in `next.config.mjs`) and deploys to Cloudflare from this repository. Every push to the main branch rebuilds and redeploys it.

## About MyClickAid

MyClickAid is a bespoke web design studio. This site is one of several demo projects that show what a custom-designed website can look like for different kinds of businesses.
