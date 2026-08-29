import { Metadata } from "next";
import { Suspense } from "react";
import InstagramDownloaderView from "@/components/InstagramDownloaderView";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Instagram Photo Downloader — Save Photos & Carousels in Original HD Free",
  description:
    "Download Instagram photos and carousel albums in original full-resolution quality. Save single photos, multi-image posts, and profile pictures as HD JPG/PNG. Free, no login, no watermark — works on all devices.",
  keywords: [
    "instagram photo downloader",
    "download instagram photos",
    "instagram image downloader",
    "save instagram photos",
    "instagram picture downloader",
    "download instagram post",
    "instagram carousel downloader",
    "download instagram album",
    "instagram photo saver",
    "download ig photos",
    "instagram photo download HD",
    "save instagram pictures to phone",
    "instagram image download online",
    "download instagram photos full size",
    "instagram photo download without app",
    "how to download instagram photos",
    "insta photo downloader online",
    "download instagram carousel photos",
    "instagram multiple photo download",
    "instagram photo download original quality",
    "save instagram photos to gallery",
    "download instagram post photos",
    "ig photo saver online free",
    "best instagram photo downloader 2025",
    "instagram dp downloader",
    "download instagram profile picture",
    "instagram photo downloader HD quality",
    "save insta photos without login",
    "download all photos from instagram post",
    "instagram image saver online free",
  ],
  alternates: {
    canonical: "/instagram-photo-downloader",
  },
  openGraph: {
    title: "Instagram Photo Downloader — Save Photos & Carousels HD Free",
    description:
      "Download Instagram photos, carousel albums, and profile pictures in original HD quality. No login, no watermark.",
    url: "https://reels.sayan.studio/instagram-photo-downloader",
    siteName: "AnyClip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Photo Downloader — Original HD Quality",
    description:
      "Save Instagram photos and carousels in full resolution. Free, fast, no login required.",
  },
};

export default function InstagramPhotoDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Instagram Photo Downloader",
    url: "https://reels.sayan.studio/instagram-photo-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    description:
      "Free online tool to download Instagram photos, carousel albums, and profile pictures in original full-resolution HD quality. No watermark, no login.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Download single photos in original HD resolution",
      "Save entire carousel/album posts with all images",
      "Download All button for multi-photo posts",
      "No watermark added to downloaded images",
      "JPG and PNG format support",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to download Instagram photos in HD?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Copy the Instagram post link, paste it into AnyClip's Photo Downloader, and click 'Fetch Photo'. The image will be downloaded in its original full-resolution quality as a JPG file.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download all photos from an Instagram carousel post?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! AnyClip automatically detects carousel/album posts and displays all images individually. You can download each one separately or use 'Download All' to save the entire album at once.",
        },
      },
      {
        "@type": "Question",
        name: "Are downloaded photos in original quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, photos are downloaded in their original uploaded resolution. AnyClip does not compress or resize images — you get the exact quality the creator uploaded.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download Instagram profile pictures (DP)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AnyClip can extract and download Instagram profile pictures in higher resolution than what is normally visible on the app.",
        },
      },
      {
        "@type": "Question",
        name: "What format are Instagram photos downloaded in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Instagram photos are downloaded as JPG (JPEG) files by default. Some photos may be in PNG or WebP format depending on how they were originally uploaded.",
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
        name: "Instagram Photo Downloader",
        item: "https://reels.sayan.studio/instagram-photo-downloader",
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-app-photo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-faq-photo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="json-ld-breadcrumb-photo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" />
          </div>
        }
      >
        <InstagramDownloaderView defaultTab="photo" />
      </Suspense>
    </>
  );
}
