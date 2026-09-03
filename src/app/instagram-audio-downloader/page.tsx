import { Metadata } from "next";
import { Suspense } from "react";
import InstagramDownloaderView from "@/components/InstagramDownloaderView";

export const metadata: Metadata = {
  title:
    "Instagram Audio Downloader — Extract & Download Reel Music MP3 Free",
  description:
    "Extract and download audio, music, and songs from Instagram Reels as MP3 files. Save trending Reel sounds, background music, and voice tracks directly to your phone or PC. Free, fast, and no login required.",
  keywords: [
    "instagram audio downloader",
    "download instagram audio",
    "instagram reel audio download",
    "extract audio from instagram reel",
    "instagram music downloader",
    "download reel music",
    "instagram reel song download",
    "ig audio downloader",
    "instagram reel to mp3",
    "download instagram reel sound",
    "instagram audio extractor",
    "save reel audio",
    "instagram background music download",
    "download trending reel audio",
    "instagram reel music download free",
    "extract music from instagram",
    "instagram reel sound downloader",
    "download instagram reel audio mp3",
    "ig reel audio extractor",
    "instagram song download online",
    "save instagram reel music",
    "instagram audio download online free",
    "how to download audio from instagram",
    "instagram reels music extractor",
    "download reel background music",
    "instagram audio saver",
    "best instagram audio downloader 2025",
    "instagram reel audio download without app",
    "extract audio from ig reel",
    "trending instagram audio download",
  ],
  alternates: {
    canonical: "/instagram-audio-downloader",
  },
  openGraph: {
    title: "Instagram Audio Downloader — Extract Reel Music as MP3 Free",
    description:
      "Download audio and music from Instagram Reels as MP3. Extract trending sounds, songs, and voice tracks. Free and no login required.",
    url: "https://reels.sayan.studio/instagram-audio-downloader",
    siteName: "AnyClip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Audio Downloader — Reel Music MP3 Free",
    description:
      "Extract and download audio from Instagram Reels as MP3. Free, fast, no login required.",
  },
};

export default function InstagramAudioDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Instagram Audio Downloader",
    url: "https://reels.sayan.studio/instagram-audio-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    description:
      "Free online tool to extract and download audio tracks, music, and songs from Instagram Reels as MP3 files. Save trending sounds directly to your device.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Extract audio from Instagram Reels",
      "Download trending Reel sounds as MP3",
      "Save background music and voice tracks",
      "No login or account required",
      "High-quality audio extraction",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to download audio from Instagram Reels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Copy the Instagram Reel link, paste it into AnyClip's Audio Downloader, and click 'Extract Audio'. The audio track will be extracted from the Reel and saved as an MP3 file to your device.",
        },
      },
      {
        "@type": "Question",
        name: "What format is the audio downloaded in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Audio is extracted and downloaded in MP3 format (or M4A depending on the source). MP3 is universally compatible with all music players, phones, and computers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download trending Reel sounds and music?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Paste the link of any Reel that uses the trending sound and AnyClip will extract the audio track including the background music, dialogue, and sound effects.",
        },
      },
      {
        "@type": "Question",
        name: "Is the audio quality good?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AnyClip extracts the original audio stream from the Reel video. The quality depends on the original upload but is typically high-quality stereo audio.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use the downloaded audio as my ringtone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the MP3 file can be used as a ringtone, alarm tone, or notification sound. Please ensure you respect copyright and fair use policies when using downloaded audio.",
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
        name: "Instagram Audio Downloader",
        item: "https://reels.sayan.studio/instagram-audio-downloader",
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
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
          </div>
        }
      >
        <InstagramDownloaderView defaultTab="audio" />
      </Suspense>
    </>
  );
}
