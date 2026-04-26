import { Metadata } from "next";
import DownloaderClient from "@/components/DownloaderClient";
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
    "mainEntity": [{
      "@type": "Question",
      "name": "How to download Instagram Reels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the Instagram Reel URL into the input field above and click 'Download'."
      }
    }]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Script id="json-ld-app" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="json-ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          Instagram <span className="text-indigo-500">Downloader</span>
        </h1>
        <p className="text-lg text-slate-600">
          Download high-quality Instagram Reels and Videos instantly.
        </p>
      </div>

      <DownloaderClient 
        endpoint="/api/download/instagram" 
        placeholder="Paste Instagram URL here (e.g., https://www.instagram.com/reel/...)" 
      />
    </div>
  );
}
