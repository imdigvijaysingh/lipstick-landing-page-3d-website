import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--f-display" });
const body = Manrope({ subsets: ["latin"], variable: "--f-body" });

const SITE = "https://maisonrouge.example"; // TODO: your domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Maison Rouge | Long-wear luxury lipsticks",
  description:
    "Creamy, smudge-proof luxury lipsticks in four signature shades. Beauty that stays, boldness that slays.",
  keywords: ["luxury lipstick", "long-wear lipstick", "red lipstick", "matte lipstick"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: SITE, siteName: "Maison Rouge",
    title: "Maison Rouge | Long-wear luxury lipsticks",
    description: "Beauty that stays, boldness that slays.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Maison Rouge lipstick" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#4a070c" };

import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
