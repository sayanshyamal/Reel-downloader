import { Metadata } from "next";
import DownloaderClient from "@/components/DownloaderClient";
import HowToDownload from "@/components/HowToDownload";
import BlogSection from "@/components/BlogSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Facebook Video Downloader - Fast & Free HD Download",
  description: "Download Facebook videos and reels instantly in HD without any app. Secure, fast, and completely free online Facebook video downloader.",
  alternates: {
    canonical: "/facebook-video-downloader",
  },
  openGraph: {
    title: "Facebook Video Downloader - Fast & Free HD Download",
    description: "Download Facebook videos and reels instantly in HD without any app. Secure, fast, and completely free online Facebook video downloader.",
    url: "https://yourdomain.com/facebook-video-downloader",
  },
};

export default function FacebookDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AnyClip Facebook Downloader",
    "url": "https://yourdomain.com/facebook-video-downloader",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "description": "A free tool to download Facebook videos securely.",
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
        "name": "How to download Facebook Videos?",
        "acceptedAnswer": { "@type": "Answer", "text": "Copy the Facebook video link, paste it into AnyClip's input field, and click Download." }
      },
      {
        "@type": "Question",
        "name": "Can I download Facebook videos in HD?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! AnyClip downloads Facebook videos in the highest available quality including 720p and 1080p." }
      },
      {
        "@type": "Question",
        "name": "Can I download from private profiles?",
        "acceptedAnswer": { "@type": "Answer", "text": "No, only videos from public Facebook posts and pages can be downloaded." }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center" id="top">
      <Script id="json-ld-app-fb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="json-ld-faq-fb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* Hero + Downloader */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-blue-50 via-cyan-50/30 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-sm font-medium mb-6 border border-blue-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Videos • Reels • Watch • Live
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
              Facebook <span className="text-blue-600">Downloader</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Download high-quality Facebook Videos and Reels instantly. Free, fast, and no account needed.
            </p>
          </div>
          <DownloaderClient 
            endpoint="/api/download/facebook" 
            placeholder="Paste Facebook Video URL here (e.g., https://www.facebook.com/...)" 
          />
        </div>
      </section>

      {/* How to Download Section */}
      <HowToDownload platform="facebook" />

      {/* Blog Section */}
      <BlogSection platform="facebook" />
    </div>
  );
}
