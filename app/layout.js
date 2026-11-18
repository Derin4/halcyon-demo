import { Bodoni_Moda, Jost } from "next/font/google";
import "../app/_styles/globals.css";
import Header from "../app/_components/Header";
import Footer from "../app/_components/Footer";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Halcyon Photography Studio",
  description: "A fictitious demo photography studio website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${bodoni.variable} ${jost.variable}`}>
      <body className='font-body text-ink2 bg-greige min-h-screen flex flex-col overflow-x-clip'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
