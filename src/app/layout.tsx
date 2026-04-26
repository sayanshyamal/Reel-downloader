import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://reels.sayan.studio"),
  title: {
    default: "AnyClip — Free Video Downloader for Instagram, Facebook & YouTube",
    template: "%s | AnyClip",
  },
  description: "Download videos from Instagram, Facebook, and YouTube for free in HD. No login, no app — just paste the link and save. Works on any device.",
  keywords: [
    // ─── Core / Generic ───
    "video downloader", "free video downloader", "online video downloader",
    "HD video downloader", "mp4 downloader", "video saver", "download video online",
    "save video from url", "video downloader online free", "best video downloader",
    "download any video", "all in one video downloader", "multi platform video downloader",
    // ─── Instagram ───
    "instagram downloader", "instagram reel downloader", "instagram video downloader",
    "download instagram reels", "save instagram video", "instagram reel saver",
    "ig downloader", "ig reel downloader", "instagram reels download online",
    "download reels from instagram", "insta video downloader", "insta reel download",
    "instagram story downloader", "download instagram video online free",
    "instagram reel download without app", "save reels without watermark",
    "instagram video saver online", "how to download instagram reels",
    "instagram photo downloader", "download instagram post",
    // ─── Facebook ───
    "facebook video downloader", "fb video downloader", "download facebook video",
    "facebook reel downloader", "fb reel downloader", "download fb video online",
    "facebook video download online free", "save facebook video",
    "fb video saver", "download facebook reels", "facebook video downloader HD",
    "facebook watch downloader", "fb video downloader online free",
    "download video from facebook", "how to download facebook video",
    "facebook video download without app", "facebook mp4 downloader",
    // ─── YouTube ───
    "youtube downloader", "youtube video downloader", "download youtube video",
    "youtube shorts downloader", "yt downloader", "youtube mp4 downloader",
    "download youtube shorts", "youtube video download online free",
    "save youtube video", "youtube video saver", "youtube downloader free",
    "download youtube video without app", "youtube HD downloader",
    "youtube to mp4", "how to download youtube video", "yt video downloader",
    "youtube shorts download online", "youtube clip downloader",
  ],
  authors: [{ name: "AnyClip", url: "https://reels.sayan.studio" }],
  creator: "AnyClip",
  publisher: "AnyClip",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AnyClip — Free Video Downloader for Instagram, Facebook & YouTube",
    description: "Download videos from Instagram, Facebook, and YouTube for free in HD. No login, no app — just paste the link and save.",
    url: "https://reels.sayan.studio",
    siteName: "AnyClip",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnyClip — Free Video Downloader",
    description: "Download videos from Instagram, Facebook, and YouTube for free in HD. No login required.",
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
