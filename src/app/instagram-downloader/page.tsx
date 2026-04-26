import { Metadata } from "next";
import DownloaderClient from "@/components/DownloaderClient";
import HowToDownload from "@/components/HowToDownload";
import BlogSection from "@/components/BlogSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Instagram Reel & Video Downloader - Fast & Free",
  description: "Download Instagram Reels and Videos instantly without any app in 1080p. Secure, fast, and completely free online Instagram downloader.",
  alternates: {
    canonical: "/instagram-downloader",
  },
  openGraph: {
    title: "Instagram Reel & Video Downloader - Fast & Free",
    description: "Download Instagram Reels and Videos instantly without any app in 1080p. Secure, fast, and completely free online Instagram downloader.",
    url: "https://yourdomain.com/instagram-downloader",
  },
};

export default function InstagramDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AnyClip Instagram Downloader",
    "url": "https://yourdomain.com/instagram-downloader",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "description": "A free tool to download Instagram reels and videos securely.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to download Instagram Reels?",
        "acceptedAnswer": { "@type": "Answer", "text": "Copy the Instagram Reel link, paste it into AnyClip's input field, and click Download." }
      },
      {
        "@type": "Question",
        "name": "Can I download Instagram Reels in HD?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! AnyClip downloads Instagram Reels in the highest available quality, typically 1080p Full HD." }
      },
      {
        "@type": "Question",
        "name": "Is it free to use?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, AnyClip is completely free with no hidden charges. Download unlimited Instagram videos." }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center" id="top">
      <Script id="json-ld-app" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="json-ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* Hero + Downloader */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-pink-50 via-purple-50/30 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-sm font-medium mb-6 border border-pink-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Reels • IGTV • Videos • Photos
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
              Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">Downloader</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Download high-quality Instagram Reels, Videos and Photos instantly. Free, fast, and no login required.
            </p>
          </div>
          <DownloaderClient 
            endpoint="/api/download/instagram" 
            placeholder="Paste Instagram URL here (e.g., https://www.instagram.com/reel/...)" 
          />
        </div>
      </section>

      {/* How to Download Section */}
      <HowToDownload platform="instagram" />

      {/* Blog Section */}
      <BlogSection platform="instagram" />
    </div>
  );
}
