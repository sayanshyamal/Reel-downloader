import { Metadata } from "next";
import { Suspense } from "react";
import InstagramDownloaderView from "@/components/InstagramDownloaderView";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Instagram Reels, Story, Photo & Video Downloader — Fast & Free HD",
  description:
    "Download Instagram Reels, Stories, Photos, Videos, and Audio instantly in 1080p HD. 100% free, anonymous, and no login required.",
  keywords: [
    "instagram downloader",
    "instagram reel downloader",
    "instagram story downloader",
    "instagram photo downloader",
    "instagram video downloader",
    "download instagram reels",
    "instagram audio downloader",
    "save instagram stories",
    "instagram carousel download",
    "ig downloader",
    "ig reel downloader",
    "instagram downloader HD",
    "free instagram downloader",
  ],
  alternates: {
    canonical: "/instagram-downloader",
  },
  openGraph: {
    title: "Instagram Downloader — Reels, Stories, Photos & Videos in HD",
    description:
      "Save Instagram Reels, Stories, Photos, and Videos in highest quality online for free. No login needed.",
    url: "https://reels.sayan.studio/instagram-downloader",
  },
};

export default function InstagramDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Instagram Downloader",
    url: "https://reels.sayan.studio/instagram-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    description:
      "Free online tool to download Instagram Reels, Stories, Photos, and Videos in HD without watermark.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to download Instagram Reels, Stories & Photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Select your desired tab (Reels, Story, Photo, Video, or Audio), paste the link into AnyClip, and click Download.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download multi-photo Instagram carousel albums?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! AnyClip automatically extracts all images and videos from carousel posts, allowing you to download each one individually or all at once.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download Instagram Stories anonymously?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can download public stories anonymously without logging into your Instagram account.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500" />
          </div>
        }
      >
        <InstagramDownloaderView />
      </Suspense>
    </>
  );
}
