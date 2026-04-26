import { Metadata } from "next";
import DownloaderClient from "@/components/DownloaderClient";
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
    "mainEntity": [{
      "@type": "Question",
      "name": "How to download Facebook Videos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the Facebook Video URL into the input field above and click 'Download'."
      }
    }]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Script id="json-ld-app-fb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="json-ld-faq-fb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          Facebook <span className="text-blue-600">Downloader</span>
        </h1>
        <p className="text-lg text-slate-600">
          Download high-quality Facebook Videos and Reels instantly.
        </p>
      </div>

      <DownloaderClient 
        endpoint="/api/download/facebook" 
        placeholder="Paste Facebook Video URL here (e.g., https://www.facebook.com/...)" 
      />
    </div>
  );
}
