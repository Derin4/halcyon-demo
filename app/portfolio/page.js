import PortfolioGallery from "../_components/PortfolioGallery";

export const metadata = {
  title: "Portfolio — Halcyon Photography Studio",
  description:
    "Weddings, portraits, events and product photography. A fictitious demo studio.",
};

export default function PortfolioPage() {
  return (
    <div className='mx-auto w-full max-w-7xl px-6 pb-28 pt-16 md:pt-24'>
      <p className='fade-up text-xs uppercase tracking-[0.35em] text-terracotta'>
        Selected work
      </p>
      <h1
        className='fade-up mt-4 font-display text-5xl font-medium italic md:text-7xl'
        style={{ "--d": "100ms" }}
      >
        Portfolio
      </h1>
      <div className='mt-14'>
        <PortfolioGallery />
      </div>
    </div>
  );
}
