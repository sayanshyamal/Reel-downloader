import { Metadata } from "next";
import DownloaderClient from "@/components/DownloaderClient";
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
    "mainEntity": [{
      "@type": "Question",
      "name": "How to download YouTube Videos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the YouTube Video URL into the input field above and click 'Download'."
      }
    }]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Script id="json-ld-app-yt" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="json-ld-faq-yt" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          YouTube <span className="text-red-600">Downloader</span>
        </h1>
        <p className="text-lg text-slate-600">
          Download high-quality YouTube Videos and Shorts instantly.
        </p>
      </div>

      <DownloaderClient 
        endpoint="/api/download/youtube" 
        placeholder="Paste YouTube Video URL here (e.g., https://www.youtube.com/watch?v=...)" 
      />
    </div>
  );
}
