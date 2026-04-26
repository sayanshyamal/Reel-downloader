import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "AnyClip | Multi-Platform Video Downloader",
    template: "%s | AnyClip",
  },
  description: "Fast, secure, and free multi-platform video downloader for Instagram, Facebook, and YouTube.",
  openGraph: {
    title: "AnyClip | Multi-Platform Video Downloader",
    description: "Fast, secure, and free multi-platform video downloader for Instagram, Facebook, and YouTube.",
    url: "https://yourdomain.com",
    siteName: "AnyClip",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnyClip | Multi-Platform Video Downloader",
    description: "Fast, secure, and free multi-platform video downloader for Instagram, Facebook, and YouTube.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
