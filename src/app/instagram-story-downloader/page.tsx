import { Metadata } from "next";
import { Suspense } from "react";
import InstagramDownloaderView from "@/components/InstagramDownloaderView";

export const metadata: Metadata = {
  title:
    "Instagram Story Downloader — Save Stories Anonymously in HD Free",
  description:
    "Download Instagram Stories and Highlights anonymously without logging in. Save stories in original HD quality to your phone or PC. 100% free, fast, and private — the uploader will never know you viewed or saved their story.",
  keywords: [
    "instagram story downloader",
    "download instagram stories",
    "instagram story saver",
    "save instagram stories",
    "instagram story download online",
    "anonymous instagram story viewer",
    "instagram story downloader without login",
    "download ig stories",
    "instagram highlights downloader",
    "save instagram stories anonymously",
    "instagram story saver online free",
    "how to download instagram stories",
    "insta story downloader",
    "download instagram story video",
    "instagram story download HD",
    "save ig stories to phone",
    "instagram story viewer anonymous",
    "download stories from instagram free",
    "instagram story saver without account",
    "ig story download online",
    "best instagram story downloader 2025",
    "download instagram highlights",
    "anonymous story saver instagram",
    "instagram story download app alternative",
    "save someone else instagram story",
    "instagram story saver HD quality",
    "download insta story without login",
    "free instagram story downloader online",
    "instagram story download without app",
    "view and save instagram stories",
  ],
  alternates: {
    canonical: "/instagram-story-downloader",
  },
  openGraph: {
    title: "Instagram Story Downloader — Save Stories Anonymously HD",
    description:
      "Download Instagram Stories anonymously in HD. No login needed. The best free online Instagram Story saver.",
    url: "https://reels.sayan.studio/instagram-story-downloader",
    siteName: "AnyClip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Story Downloader — Anonymous & Free",
    description:
      "Save Instagram Stories anonymously in HD quality. Free, fast, no login required.",
  },
};

export default function InstagramStoryDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Instagram Story Downloader",
    url: "https://reels.sayan.studio/instagram-story-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    description:
      "Free anonymous Instagram Story downloader. Save Stories and Highlights in original HD quality without logging in. The uploader won't know you saved their story.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Download Instagram Stories anonymously",
      "Save Highlights in HD quality",
      "No login or Instagram account required",
      "Story uploader is not notified",
      "Works on all devices",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to download Instagram Stories anonymously?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Copy the story link from Instagram (tap the three dots on the story and select 'Link'), paste it into AnyClip's Story Downloader, and click 'Fetch Story'. The story will be saved to your device without notifying the uploader.",
        },
      },
      {
        "@type": "Question",
        name: "Will the person know I downloaded their story?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AnyClip downloads stories server-side, so the story owner will not receive any view notification from your download. It is completely anonymous.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download expired Instagram Stories?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, Instagram Stories expire after 24 hours and cannot be recovered once they disappear. However, you can download Highlights which are saved permanently on the profile.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download stories from private accounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, only stories from public Instagram accounts can be downloaded. Private account stories require authentication which AnyClip does not use for your privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What format are downloaded stories saved in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Video stories are saved as MP4 files and photo stories are saved as JPG files, both in their original HD resolution.",
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
        name: "Instagram Story Downloader",
        item: "https://reels.sayan.studio/instagram-story-downloader",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
          </div>
        }
      >
        <InstagramDownloaderView defaultTab="story" />
      </Suspense>
    </>
  );
}
