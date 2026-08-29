import { Metadata } from "next";
import { Suspense } from "react";
import InstagramDownloaderView from "@/components/InstagramDownloaderView";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Instagram Video Downloader — Download IGTV & Feed Videos MP4 Free HD",
  description:
    "Download Instagram videos, IGTV episodes, and feed video posts in HD MP4 quality. Save any public Instagram video directly to your device. Free, fast, no login or app required.",
  keywords: [
    "instagram video downloader",
    "download instagram video",
    "instagram video saver",
    "save instagram video",
    "instagram video download online",
    "download ig video",
    "instagram video download HD",
    "instagram video downloader online free",
    "how to download instagram video",
    "instagram igtv downloader",
    "download igtv video",
    "instagram video download without app",
    "save instagram video to phone",
    "instagram video download mp4",
    "ig video downloader online",
    "insta video download",
    "download instagram feed video",
    "instagram video saver online",
    "best instagram video downloader 2025",
    "instagram video download free HD",
    "download video from instagram online",
    "instagram clip downloader",
    "save ig video to gallery",
    "instagram video download without login",
    "free instagram video downloader",
    "instagram post video download",
    "insta video saver HD",
    "download instagram video mp4 free",
    "instagram video download original quality",
    "ig video download online free",
  ],
  alternates: {
    canonical: "/instagram-video-downloader",
  },
  openGraph: {
    title: "Instagram Video Downloader — Download IGTV & Videos HD Free",
    description:
      "Save Instagram videos and IGTV episodes in HD MP4 quality. No login, no app required.",
    url: "https://reels.sayan.studio/instagram-video-downloader",
    siteName: "AnyClip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Video Downloader — HD MP4 Free",
    description:
      "Download Instagram videos and IGTV in HD. Free, fast, no login required.",
  },
};

export default function InstagramVideoDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Instagram Video Downloader",
    url: "https://reels.sayan.studio/instagram-video-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    description:
      "Free online tool to download Instagram videos, IGTV episodes, and feed video posts in HD MP4 quality. No login required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Download Instagram feed videos in HD",
      "Save IGTV episodes as MP4",
      "Original quality video preservation",
      "No app installation needed",
      "Works on Android, iOS, PC, Mac",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to download Instagram videos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open the Instagram post with the video, tap the three dots menu and select 'Link' or 'Copy Link', paste it into AnyClip's Video Downloader, and click Download. The video will save as an MP4 file.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download IGTV videos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! AnyClip supports IGTV (Instagram TV) videos. Just paste the IGTV link and the full-length video will be downloaded in HD quality.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Reel and Video downloads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reels are short-form vertical videos (similar to TikTok) while Videos include longer feed posts and IGTV episodes. AnyClip handles both — use Reel Downloader for Reels and Video Downloader for feed videos and IGTV.",
        },
      },
      {
        "@type": "Question",
        name: "What quality are videos downloaded in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Videos are downloaded in the highest available quality — typically 720p or 1080p HD, depending on the original upload resolution. The audio track is included.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download videos from private accounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, only videos from public Instagram accounts can be downloaded. AnyClip does not access private content for security and privacy reasons.",
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
        name: "Instagram Video Downloader",
        item: "https://reels.sayan.studio/instagram-video-downloader",
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-app-video"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-faq-video"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="json-ld-breadcrumb-video"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        }
      >
        <InstagramDownloaderView defaultTab="video" />
      </Suspense>
    </>
  );
}
