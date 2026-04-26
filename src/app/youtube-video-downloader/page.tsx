import { Metadata } from "next";
import DownloaderClient from "@/components/DownloaderClient";
import HowToDownload from "@/components/HowToDownload";
import BlogSection from "@/components/BlogSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "YouTube Video Downloader - Fast & Free MP4 Download",
  description: "Download YouTube videos and shorts instantly in high quality. Secure, fast, and completely free online YouTube downloader.",
  alternates: {
    canonical: "/youtube-video-downloader",
  },
  openGraph: {
    title: "YouTube Video Downloader - Fast & Free MP4 Download",
    description: "Download YouTube videos and shorts instantly in high quality. Secure, fast, and completely free online YouTube downloader.",
    url: "https://yourdomain.com/youtube-video-downloader",
  },
};

export default function YouTubeDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AnyClip YouTube Downloader",
    "url": "https://yourdomain.com/youtube-video-downloader",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "description": "A free tool to download YouTube videos securely.",
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
        "name": "How to download YouTube Videos?",
        "acceptedAnswer": { "@type": "Answer", "text": "Copy the YouTube video URL, paste it into AnyClip's input field, and click Download." }
      },
      {
        "@type": "Question",
        "name": "Can I download YouTube Shorts?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! AnyClip fully supports downloading YouTube Shorts in their original vertical format and quality." }
      },
      {
        "@type": "Question",
        "name": "What format are videos downloaded in?",
        "acceptedAnswer": { "@type": "Answer", "text": "YouTube videos are downloaded in MP4 format, which works on all devices." }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center" id="top">
      <Script id="json-ld-app-yt" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="json-ld-faq-yt" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* Hero + Downloader */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-red-50 via-orange-50/30 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100/80 text-red-700 text-sm font-medium mb-6 border border-red-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Videos • Shorts • Music • Tutorials
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
              YouTube <span className="text-red-600">Downloader</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Download high-quality YouTube Videos and Shorts as MP4 instantly. Free, fast, and no registration needed.
            </p>
          </div>
          <DownloaderClient 
            endpoint="/api/download/youtube" 
            placeholder="Paste YouTube Video URL here (e.g., https://www.youtube.com/watch?v=...)" 
          />
        </div>
      </section>

      {/* How to Download Section */}
      <HowToDownload platform="youtube" />

      {/* Blog Section */}
      <BlogSection platform="youtube" />
    </div>
  );
}
