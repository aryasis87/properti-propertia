import "./globals.css";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata = {
  title: "Propertia — Temukan Rumah Impianmu",
  description: "Marketplace properti tepercaya: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
