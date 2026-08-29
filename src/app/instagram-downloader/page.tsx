import { Metadata } from "next";
import { Suspense } from "react";
import InstagramDownloaderView from "@/components/InstagramDownloaderView";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Instagram Reel Downloader — Download Reels in 1080p HD Free Online",
  description:
    "Download Instagram Reels in Full HD 1080p MP4 quality instantly. No watermark, no login, no app required. The fastest free Instagram Reel saver online — paste the link and save directly to your phone or PC.",
  keywords: [
    "instagram reel downloader",
    "download instagram reels",
    "instagram reel saver",
    "ig reel downloader",
    "instagram reels download online",
    "download reels from instagram",
    "insta reel download",
    "instagram reel download without app",
    "save reels without watermark",
    "how to download instagram reels",
    "instagram reel to mp4",
    "copy paste instagram reel downloader",
    "best instagram reel downloader",
    "instagram reel download 1080p",
    "reel download kaise kare",
    "instagram reel downloader online",
    "save instagram reels to phone",
    "download reel without login",
    "free instagram reel downloader 2025",
    "instagram reels video download",
    "insta reels saver online free",
    "download ig reels HD",
    "instagram reels downloader no watermark",
    "save reels to gallery",
    "instagram reel download app alternative",
    "online reel saver free",
    "download instagram reels mp4",
    "reel download online free HD",
    "instagram reel video saver",
    "fast reel downloader",
  ],
  alternates: {
    canonical: "/instagram-downloader",
  },
  openGraph: {
    title: "Instagram Reel Downloader — Download Reels HD 1080p Free",
    description:
      "Save Instagram Reels instantly in Full HD 1080p. No app, no login, no watermark. Fastest free online Instagram Reel downloader.",
    url: "https://reels.sayan.studio/instagram-downloader",
    siteName: "AnyClip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reel Downloader — HD 1080p Free",
    description:
      "Download Instagram Reels in 1080p HD. Free, fast, no watermark. Just paste the link and save.",
  },
};

export default function InstagramDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Instagram Reel Downloader",
    url: "https://reels.sayan.studio/instagram-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    description:
      "Free online tool to download Instagram Reels in Full HD 1080p MP4 without watermark. Works on any device — no login required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Download Instagram Reels in 1080p HD",
      "No watermark on downloaded videos",
      "No login or account required",
      "Works on PC, Mac, Android, iOS",
      "Unlimited free downloads",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to download Instagram Reels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open the Instagram Reel, tap the three dots or 'Share' button, copy the link, paste it into AnyClip, and click Download. The video will be saved directly to your device in HD quality.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download Instagram Reels in 1080p HD quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! AnyClip downloads Instagram Reels in the highest available quality, typically 1080p Full HD MP4. The original resolution and audio are preserved without compression.",
        },
      },
      {
        "@type": "Question",
        name: "Is downloading Instagram Reels free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AnyClip is completely free with no hidden charges, no subscriptions, and no download limits. Save unlimited Instagram Reels at no cost.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install any app to download Reels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AnyClip works entirely in your browser. No app installation needed — just visit the website, paste the link, and download.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download Reels without watermark?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AnyClip saves Instagram Reels without any added watermark. You get the original video exactly as uploaded by the creator.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://reels.sayan.studio",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Instagram Reel Downloader",
        item: "https://reels.sayan.studio/instagram-downloader",
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
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
