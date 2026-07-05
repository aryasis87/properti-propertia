import "./globals.css";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

const __jsonld = {"@context":"https://schema.org","@type":"RealEstateAgent","name":"Propertia","description":"Marketplace properti tepercaya","url":"https://propertia.pintuweb.com","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://propertia.pintuweb.com"),
  title: "Propertia — Temukan Rumah Impianmu",
  description: "Marketplace properti tepercaya: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
  applicationName: "Propertia",
  keywords: ["marketplace properti", "rumah dijual", "sewa apartemen", "properti", "real estate"],
  authors: [{ name: "Propertia" }],
  creator: "Propertia",
  publisher: "Propertia",
  alternates: { canonical: "https://propertia.pintuweb.com" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://propertia.pintuweb.com",
    siteName: "Propertia",
    title: "Propertia — Temukan Rumah Impianmu",
    description: "Marketplace properti tepercaya: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Propertia — Temukan Rumah Impianmu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propertia — Temukan Rumah Impianmu",
    description: "Marketplace properti tepercaya: jual, beli, dan sewa rumah, apartemen, ruko, tanah, dan villa di seluruh Indonesia.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
