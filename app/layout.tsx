import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://arnob.ndscbd.net"),
  title: { default: "Notre Dame Science Club (NDSC) | Official Website", template: "%s | NDSC" },
  description: "Official website of Notre Dame Science Club (NDSC), founded in 1955 — the first college-level science club in the Indian Subcontinent. Olympiads, workshops, publications, and more.",
  keywords: ["Notre Dame Science Club","NDSC","ndscbd","Notre Dame College","science club Bangladesh","science olympiad Bangladesh","NDSC Dhaka"],
  authors: [{ name: "Notre Dame Science Club" }],
  openGraph: {
    title: "Notre Dame Science Club (NDSC)",
    description: "The first college-level science club in the Indian Subcontinent. Founded 1955.",
    url: "https://arnob.ndscbd.net",
    siteName: "Notre Dame Science Club",
    images: [{ url: "/images/cropped-logo.png", width: 512, height: 512, alt: "NDSC Logo" }],
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Notre Dame Science Club (NDSC)", description: "The first college-level science club in the Indian Subcontinent.", images: ["/images/cropped-logo.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/images/cropped-logo.png", apple: "/images/cropped-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollReveal />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
